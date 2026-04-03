"use server";

import { prisma } from "@/lib/db";

export async function getSpecialistByOldId(oldId: string) {
  // Map old mock IDs (1-6) to DB performers by creation order
  const performers = await prisma.performerProfile.findMany({
    orderBy: { createdAt: "asc" },
    include: {
      user: { select: { firstName: true, lastName: true } },
      services: {
        where: { status: "active" },
        orderBy: { createdAt: "asc" },
        include: { category: true },
      },
      skills: { orderBy: { sortOrder: "asc" } },
    },
  });

  const idx = parseInt(oldId, 10) - 1;
  if (idx < 0 || idx >= performers.length) return null;

  const perf = performers[idx];
  return {
    id: perf.id,
    userId: perf.userId,
    name: `${perf.user.firstName} ${perf.user.lastName}`,
    title: (perf.titleLocalized ?? {}) as Record<string, string>,
    bio: (perf.bioLocalized ?? {}) as Record<string, string>,
    skills: (perf.skillsLocalized ?? {}) as Record<string, string[]>,
    skillTags: perf.skills.map((s) => s.skillName),
    category: perf.category,
    priceFrom: perf.priceFrom,
    verified: perf.isVerified,
    online: perf.isAvailable,
    responseTime: perf.responseTimeHours ? Number(perf.responseTimeHours) : null,
    rating: Number(perf.avgRating),
    reviewsCount: perf.totalReviews,
    ordersCount: perf.totalOrdersCompleted,
    services: perf.services.map((s) => ({
      id: s.id,
      title: (s.titleLocalized ?? { sl: s.title }) as Record<string, string>,
      description: (s.descLocalized ?? { sl: s.description ?? "" }) as Record<string, string>,
      price: Number(s.price) * 100, // convert EUR to cents for frontend
      priceType: "FIXED" as const,
      deliveryDays: s.deliveryDays,
    })),
  };
}
