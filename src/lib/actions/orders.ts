"use server";

import { prisma } from "@/lib/db";

interface CreateOrderInput {
  serviceId: string;
  performerId: string; // PerformerProfile.userId (the User id)
  description: string;
  amount: number; // in EUR cents (servicePrice)
}

export async function createOrder(input: CreateOrderInput) {
  // For now, use the first test client (no auth yet)
  const testClient = await prisma.user.findFirst({
    where: { role: "CLIENT" },
    orderBy: { createdAt: "asc" },
  });

  if (!testClient) {
    return { success: false, error: "No test client found" };
  }

  // Get service details for snapshot
  const service = await prisma.service.findUnique({
    where: { id: input.serviceId },
  });

  if (!service) {
    return { success: false, error: "Service not found" };
  }

  // Generate order number: #ORD-000001
  const lastOrder = await prisma.order.findFirst({
    orderBy: { createdAt: "desc" },
  });

  const lastNum = lastOrder?.orderNumber
    ? parseInt(lastOrder.orderNumber.replace("#ORD-", "").replace("ORD-", ""), 10)
    : 0;
  const orderNumber = `#ORD-${String(lastNum + 1).padStart(6, "0")}`;

  // Financial breakdown
  const servicePrice = Number(service.price);
  const platformFeePct = 10.0; // 10%
  const platformFeeAmount = Math.round(servicePrice * platformFeePct) / 100;
  const totalAmount = servicePrice + platformFeeAmount;

  const order = await prisma.order.create({
    data: {
      orderNumber,
      clientId: testClient.id,
      performerId: input.performerId,
      serviceId: input.serviceId,
      status: "NEW",

      // Snapshot
      serviceTitle: service.title,
      servicePrice: servicePrice,

      // Financial
      platformFeePct,
      platformFeeAmount,
      totalAmount,

      // Content
      clientComment: input.description || null,

      // Status history
      statusHistory: {
        create: {
          fromStatus: null,
          toStatus: "NEW",
          changedById: testClient.id,
          note: "Order created",
        },
      },

      // Payment record
      payment: {
        create: {
          amount: servicePrice,
          platformFee: platformFeeAmount,
          totalCharged: totalAmount,
          currency: "EUR",
          paymentMethod: "card",
          paymentStatus: "PENDING",
        },
      },
    },
  });

  return { success: true, orderNumber: order.orderNumber, orderId: order.id };
}

export async function getServiceForOrder(serviceId: string) {
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    include: {
      performer: {
        include: {
          user: {
            select: { firstName: true, lastName: true },
          },
        },
      },
    },
  });

  if (!service) return null;

  return {
    id: service.id,
    title: (service.titleLocalized ?? { sl: service.title }) as Record<string, string>,
    description: (service.descLocalized ?? { sl: service.description ?? "" }) as Record<string, string>,
    price: Number(service.price) * 100, // convert to cents for frontend
    priceType: "FIXED" as const,
    deliveryDays: service.deliveryDays,
    performerUserId: service.performer.userId,
    specialistName: `${service.performer.user.firstName} ${service.performer.user.lastName}`,
    specialistTitle: (service.performer.titleLocalized ?? {}) as Record<string, string>,
    specialistRating: Number(service.performer.avgRating),
    specialistVerified: service.performer.isVerified,
  };
}
