"use server";

import { prisma } from "@/lib/db";

export async function getSpecialistByOldId(oldId: string) {
  // Map old mock IDs (1-6) to DB specialists by creation order
  const specialists = await prisma.specialistProfile.findMany({
    orderBy: { createdAt: "asc" },
    include: {
      user: { select: { firstName: true, lastName: true } },
      services: { where: { active: true }, orderBy: { createdAt: "asc" } },
    },
  });

  const idx = parseInt(oldId, 10) - 1;
  if (idx < 0 || idx >= specialists.length) return null;

  const spec = specialists[idx];
  return {
    id: spec.id,
    userId: spec.userId,
    name: `${spec.user.firstName} ${spec.user.lastName}`,
    title: spec.title as Record<string, string>,
    bio: spec.bio as Record<string, string>,
    skills: spec.skills as Record<string, string[]>,
    category: spec.category,
    priceFrom: spec.priceFrom,
    verified: spec.verified,
    online: spec.online,
    responseTime: spec.responseTime,
    rating: spec.rating,
    reviewsCount: spec.reviewsCount,
    ordersCount: spec.ordersCount,
    services: spec.services.map((s) => ({
      id: s.id,
      title: s.title as Record<string, string>,
      description: s.description as Record<string, string>,
      price: s.price,
      priceType: s.priceType,
      deliveryDays: s.deliveryDays,
    })),
  };
}
