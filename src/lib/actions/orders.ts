"use server";

import { prisma } from "@/lib/db";

interface CreateOrderInput {
  serviceId: string;
  specialistId: string;
  description: string;
  amount: number; // in EUR cents
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

  // Generate order number
  const lastOrder = await prisma.order.findFirst({
    orderBy: { createdAt: "desc" },
  });

  const lastNum = lastOrder?.orderNumber
    ? parseInt(lastOrder.orderNumber.replace("ORD-", ""), 10)
    : 0;
  const orderNumber = `ORD-${String(lastNum + 1).padStart(3, "0")}`;

  const order = await prisma.order.create({
    data: {
      orderNumber,
      clientId: testClient.id,
      specialistId: input.specialistId,
      serviceId: input.serviceId,
      description: input.description || null,
      amount: input.amount,
      status: "NEW",
      escrowHeld: true,
      escrowReleased: false,
    },
  });

  return { success: true, orderNumber: order.orderNumber, orderId: order.id };
}

export async function getServiceForOrder(serviceId: string) {
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    include: {
      specialist: {
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
    title: service.title as Record<string, string>,
    description: service.description as Record<string, string>,
    price: service.price,
    priceType: service.priceType,
    deliveryDays: service.deliveryDays,
    specialistId: service.specialistId,
    specialistName: `${service.specialist.user.firstName} ${service.specialist.user.lastName}`,
    specialistTitle: service.specialist.title as Record<string, string>,
    specialistRating: service.specialist.rating,
    specialistVerified: service.specialist.verified,
  };
}
