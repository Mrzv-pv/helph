import "dotenv/config";
import { PrismaClient, OrderStatus, PaymentStatus, NotificationType, MessageType } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database (TZ v2 — 15 tables)...\n");

  // ── 1. Categories ─────────────────────────────────────────────
  const cats = [
    { slug: "law", nameSl: "Pravo", nameRu: "Право", nameEn: "Law", nameDe: "Recht", icon: "Scale", sortOrder: 1, performersCount: 1 },
    { slug: "finance", nameSl: "Finance", nameRu: "Финансы", nameEn: "Finance", nameDe: "Finanzen", icon: "Calculator", sortOrder: 2, performersCount: 2 },
    { slug: "design", nameSl: "Oblikovanje", nameRu: "Дизайн", nameEn: "Design", nameDe: "Design", icon: "Palette", sortOrder: 3, performersCount: 1 },
    { slug: "marketing", nameSl: "Trženje", nameRu: "Маркетинг", nameEn: "Marketing", nameDe: "Marketing", icon: "TrendingUp", sortOrder: 4, performersCount: 1 },
    { slug: "it", nameSl: "IT", nameRu: "IT", nameEn: "IT", nameDe: "IT", icon: "Code", sortOrder: 5, performersCount: 1 },
    { slug: "consulting", nameSl: "Svetovanje", nameRu: "Консалтинг", nameEn: "Consulting", nameDe: "Beratung", icon: "MessageSquare", sortOrder: 6 },
    { slug: "hr", nameSl: "Kadri", nameRu: "HR", nameEn: "HR", nameDe: "Personal", icon: "Users", sortOrder: 7 },
    { slug: "translation", nameSl: "Prevajanje", nameRu: "Переводы", nameEn: "Translation", nameDe: "Übersetzung", icon: "Globe", sortOrder: 8 },
  ];

  const categoryMap: Record<string, string> = {};
  for (const c of cats) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: c,
      create: c,
    });
    categoryMap[c.slug] = cat.id;
  }
  console.log(`  ✓ ${cats.length} categories`);

  // ── 2. Users (performers) ─────────────────────────────────────
  const performers = [
    { email: "ana.novak@helph.si", firstName: "Ana", lastName: "Novak", catSlug: "law",
      bio: "10 let izkušenj v korporativnem pravu", specialization: "Korporativno pravo",
      titleLocalized: { sl: "Odvetnica za korporativno pravo", en: "Corporate law attorney", ru: "Юрист по корпоративному праву", de: "Anwältin für Gesellschaftsrecht" },
      bioLocalized: { sl: "10 let izkušenj na področju korporativnega prava.", en: "10 years of corporate law experience.", ru: "10 лет опыта в корпоративном праве.", de: "10 Jahre Erfahrung im Gesellschaftsrecht." },
      skillsLocalized: { sl: ["Korporativno pravo", "Pogodbe", "Registracija d.o.o.", "Skrbni pregled"], en: ["Corporate law", "Contracts", "LLC Registration", "Due Diligence"], ru: ["Корпоративное право", "Договоры", "Регистрация ООО", "Due Diligence"], de: ["Gesellschaftsrecht", "Verträge", "GmbH-Gründung", "Due Diligence"] },
      skills: ["Korporativno pravo", "Pogodbe", "Registracija d.o.o.", "Skrbni pregled"],
      priceFrom: 8000, isVerified: true, avgRating: 4.90, totalReviews: 47, totalOrdersCompleted: 124, responseTimeHours: 2,
      services: [
        { title: "Registracija d.o.o. na ključ", titleL: { sl: "Registracija d.o.o. na ključ", en: "LLC Registration (turnkey)", ru: "Регистрация ООО под ключ", de: "GmbH-Gründung (schlüsselfertig)" }, desc: "Popolno spremljanje registracije", descL: { sl: "Popolno spremljanje registracije: priprava dokumentov, oddaja na AJPES.", en: "Full registration support: document preparation, filing.", ru: "Полное сопровождение регистрации.", de: "Vollständige Registrierungsunterstützung." }, price: 350, days: 7 },
        { title: "Priprava pogodbe", titleL: { sl: "Priprava pogodbe", en: "Contract Drafting", ru: "Составление договора", de: "Vertragsentwurf" }, desc: "Pravno ustrezna pogodba", descL: { sl: "Razvoj pravno ustrezne pogodbe.", en: "Legally sound contract.", ru: "Юридически грамотный договор.", de: "Rechtssicherer Vertrag." }, price: 120, days: 3 },
        { title: "Pravno svetovanje", titleL: { sl: "Pravno svetovanje", en: "Legal Consultation", ru: "Юридическая консультация", de: "Rechtsberatung" }, desc: "Video klic 60 min", descL: { sl: "Svetovanje. Video klic 60 minut.", en: "Consultation. 60-minute video call.", ru: "Консультация. Видеозвонок 60 мин.", de: "Beratung. 60-Minuten-Videoanruf." }, price: 80, days: 1 },
        { title: "Skrbni pregled podjetja", titleL: { sl: "Skrbni pregled podjetja", en: "Company Due Diligence", ru: "Due Diligence компании", de: "Due Diligence" }, desc: "Popoln pregled pravne čistosti", descL: { sl: "Popoln pregled pravne čistosti.", en: "Complete legal review.", ru: "Полная проверка юридической чистоты.", de: "Vollständige rechtliche Prüfung." }, price: 1200, days: 14 },
      ],
    },
    { email: "luka.krajnc@helph.si", firstName: "Luka", lastName: "Krajnc", catSlug: "finance",
      bio: "Finančno svetovanje za podjetja", specialization: "Finančno svetovanje",
      titleLocalized: { sl: "Finančni svetovalec", en: "Financial consultant", ru: "Финансовый консультант", de: "Finanzberater" },
      bioLocalized: { sl: "Pomagam podjetjem optimizirati finance.", en: "Helping businesses optimize finances.", ru: "Помогаю бизнесу оптимизировать финансы.", de: "Ich helfe Unternehmen, Finanzen zu optimieren." },
      skillsLocalized: { sl: ["Naložbe", "Davčno načrtovanje", "Finančna revizija"], en: ["Investments", "Tax planning", "Financial audit"], ru: ["Инвестиции", "Налоговое планирование", "Финансовый аудит"], de: ["Investitionen", "Steuerplanung", "Finanzprüfung"] },
      skills: ["Naložbe", "Davčno načrtovanje", "Finančna revizija"],
      priceFrom: 9000, isVerified: true, avgRating: 4.80, totalReviews: 32, totalOrdersCompleted: 89, responseTimeHours: 4,
      services: [
        { title: "Davčno načrtovanje", titleL: { sl: "Davčno načrtovanje", en: "Tax Planning", ru: "Налоговое планирование", de: "Steuerplanung" }, desc: "Optimizacija davčne obremenitve", descL: { sl: "Optimizacija davčne obremenitve.", en: "Tax burden optimization.", ru: "Оптимизация налоговой нагрузки.", de: "Steuerbelastungsoptimierung." }, price: 150, days: 5 },
        { title: "Finančna revizija", titleL: { sl: "Finančna revizija", en: "Financial Audit", ru: "Финансовый аудит", de: "Finanzprüfung" }, desc: "Popolna revizija finančnega stanja", descL: { sl: "Popolna revizija finančnega stanja.", en: "Complete financial audit.", ru: "Полный финансовый аудит.", de: "Vollständige Finanzprüfung." }, price: 250, days: 10 },
      ],
    },
    { email: "maja.horvat@helph.si", firstName: "Maja", lastName: "Horvat", catSlug: "design",
      bio: "UX/UI oblikovalka", specialization: "UX/UI Design",
      titleLocalized: { sl: "UX/UI Oblikovalka", en: "UX/UI Designer", ru: "UX/UI Дизайнер", de: "UX/UI Designerin" },
      bioLocalized: { sl: "Ustvarjam vmesnike, ki jih uporabniki obožujejo.", en: "Creating interfaces users love.", ru: "Создаю интерфейсы, которые любят пользователи.", de: "Ich gestalte Interfaces, die Nutzer lieben." },
      skillsLocalized: { sl: ["Figma", "UI-oblikovanje", "UX-raziskave", "Prototipiranje"], en: ["Figma", "UI Design", "UX Research", "Prototyping"], ru: ["Figma", "UI-дизайн", "UX-исследования", "Прототипирование"], de: ["Figma", "UI-Design", "UX-Forschung", "Prototyping"] },
      skills: ["Figma", "UI-oblikovanje", "UX-raziskave", "Prototipiranje"],
      priceFrom: 15000, isVerified: true, avgRating: 5.00, totalReviews: 61, totalOrdersCompleted: 203, responseTimeHours: 1,
      services: [
        { title: "Oblikovanje logotipa", titleL: { sl: "Oblikovanje logotipa", en: "Logo Design", ru: "Дизайн логотипа", de: "Logo-Design" }, desc: "Unikatna vizualna identiteta", descL: { sl: "Unikatna vizualna identiteta.", en: "Unique visual identity.", ru: "Уникальная визуальная идентичность.", de: "Einzigartige visuelle Identität." }, price: 200, days: 5 },
        { title: "UX/UI oblikovanje", titleL: { sl: "UX/UI oblikovanje spletne strani", en: "Website UX/UI Design", ru: "UX/UI дизайн сайта", de: "Website UX/UI Design" }, desc: "Od wireframe do prototipa", descL: { sl: "Od wireframe do prototipa v Figma.", en: "From wireframe to Figma prototype.", ru: "От вайрфрейма до прототипа.", de: "Vom Wireframe zum Figma-Prototyp." }, price: 450, days: 14 },
      ],
    },
    { email: "ziga.vidmar@helph.si", firstName: "Žiga", lastName: "Vidmar", catSlug: "marketing",
      bio: "Performance marketing", specialization: "Performance Marketing",
      titleLocalized: { sl: "Tržnik · Performance", en: "Marketer · Performance", ru: "Маркетолог · Performance", de: "Vermarkter · Performance" },
      bioLocalized: { sl: "Pridobivam stranke prek plačanega prometa. ROI x3.", en: "Acquiring clients through paid traffic. ROI x3.", ru: "Привлекаю клиентов через платный трафик. ROI x3.", de: "Kundengewinnung über bezahlten Traffic. ROI x3." },
      skillsLocalized: { sl: ["Google Ads", "Meta Ads", "Analitika"], en: ["Google Ads", "Meta Ads", "Analytics"], ru: ["Google Ads", "Яндекс.Директ", "Аналитика"], de: ["Google Ads", "Meta Ads", "Analytik"] },
      skills: ["Google Ads", "Meta Ads", "Analitika"],
      priceFrom: 20000, isVerified: false, avgRating: 4.70, totalReviews: 28, totalOrdersCompleted: 56, responseTimeHours: 3,
      services: [
        { title: "Google Ads kampanja", titleL: { sl: "Google Ads kampanja", en: "Google Ads Campaign", ru: "Кампания Google Ads", de: "Google Ads Kampagne" }, desc: "Nastavitev in optimizacija kampanje", descL: { sl: "Nastavitev in optimizacija za ROI.", en: "Campaign setup for maximum ROI.", ru: "Настройка кампании для ROI.", de: "Kampagneneinrichtung für ROI." }, price: 300, days: 7 },
      ],
    },
    { email: "nina.zupancic@helph.si", firstName: "Nina", lastName: "Zupančič", catSlug: "finance",
      bio: "Računovodstvo za s.p. in d.o.o.", specialization: "Računovodstvo",
      titleLocalized: { sl: "Računovodkinja · s.p. in d.o.o.", en: "Accountant · SMB", ru: "Бухгалтер · ИП и ООО", de: "Buchhalterin · KMU" },
      bioLocalized: { sl: "Vodim računovodstvo za mala podjetja.", en: "Managing accounting for small businesses.", ru: "Веду бухгалтерию для малого бизнеса.", de: "Buchhaltung für Kleinunternehmen." },
      skillsLocalized: { sl: ["Računovodstvo", "Davčno poročanje", "e-Računi"], en: ["Accounting", "Tax reporting", "Invoicing"], ru: ["Бухгалтерский учёт", "Налоговая отчётность", "1С"], de: ["Buchhaltung", "Steuererklärung", "Rechnungsstellung"] },
      skills: ["Računovodstvo", "Davčno poročanje", "e-Računi"],
      priceFrom: 6000, isVerified: true, avgRating: 4.90, totalReviews: 85, totalOrdersCompleted: 312, responseTimeHours: 6,
      services: [
        { title: "Mesečno računovodstvo", titleL: { sl: "Mesečno računovodstvo s.p.", en: "Monthly Accounting", ru: "Ежемесячная бухгалтерия", de: "Monatliche Buchhaltung" }, desc: "Vodenje evidenc in poročil", descL: { sl: "Vodenje vseh računovodskih evidenc.", en: "Managing all accounting records.", ru: "Ведение бухгалтерских записей.", de: "Führung aller Buchhaltungsunterlagen." }, price: 60, days: 30 },
        { title: "Davčna napoved", titleL: { sl: "Davčna napoved", en: "Tax Return Filing", ru: "Налоговая декларация", de: "Steuererklärung" }, desc: "Priprava letne davčne napovedi", descL: { sl: "Priprava in oddaja davčne napovedi.", en: "Annual tax return filing.", ru: "Годовая налоговая декларация.", de: "Jährliche Steuererklärung." }, price: 100, days: 5 },
      ],
    },
    { email: "jan.kovac@helph.si", firstName: "Jan", lastName: "Kovač", catSlug: "it",
      bio: "Fullstack razvijalec · 7 let", specialization: "Fullstack Development",
      titleLocalized: { sl: "Fullstack razvijalec", en: "Fullstack developer", ru: "Fullstack-разработчик", de: "Fullstack-Entwickler" },
      bioLocalized: { sl: "Razvijam spletne aplikacije od ideje do produkcije.", en: "Building web apps from idea to production.", ru: "Разрабатываю веб-приложения от идеи до продакшена.", de: "Webanwendungen von der Idee bis zur Produktion." },
      skillsLocalized: { sl: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"], en: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"], ru: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"], de: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"] },
      skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
      priceFrom: 18000, isVerified: false, avgRating: 4.60, totalReviews: 19, totalOrdersCompleted: 41, responseTimeHours: 2,
      services: [
        { title: "Razvoj spletne aplikacije", titleL: { sl: "Razvoj spletne aplikacije", en: "Web App Development", ru: "Разработка веб-приложения", de: "Webanwendungsentwicklung" }, desc: "Od koncepta do produkcije", descL: { sl: "Od koncepta do delujoče aplikacije.", en: "From concept to working app.", ru: "От концепта до приложения.", de: "Vom Konzept zur funktionierenden App." }, price: 1800, days: 30 },
        { title: "Tehnično svetovanje", titleL: { sl: "Tehnično svetovanje", en: "Technical Consulting", ru: "Техническая консультация", de: "Technische Beratung" }, desc: "Pregled arhitekture, code review", descL: { sl: "Pregled arhitekture in code review.", en: "Architecture review, code review.", ru: "Ревью архитектуры и код-ревью.", de: "Architekturüberprüfung, Code-Review." }, price: 180, days: 1 },
      ],
    },
  ];

  // ── 3. Test clients ───────────────────────────────────────────
  const clients = [
    { email: "tomaz.kovac@gmail.com", firstName: "Tomaž", lastName: "Kovač" },
    { email: "maja.zupan@gmail.com", firstName: "Maja", lastName: "Zupan" },
    { email: "andrej.breznik@gmail.com", firstName: "Andrej", lastName: "Breznik" },
  ];

  const clientUsers = [];
  for (const c of clients) {
    const user = await prisma.user.upsert({
      where: { email: c.email },
      update: {},
      create: {
        email: c.email,
        passwordHash: "$2b$10$test_hash_placeholder",
        firstName: c.firstName,
        lastName: c.lastName,
        role: "CLIENT",
        language: "sl",
        isEmailVerified: true,
      },
    });
    // Create client profile
    await prisma.clientProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id },
    });
    clientUsers.push(user);
  }
  console.log(`  ✓ ${clients.length} clients + profiles`);

  // ── 4. Create performers with profiles, skills, services ──────
  const perfProfiles = [];
  for (const p of performers) {
    const user = await prisma.user.upsert({
      where: { email: p.email },
      update: {},
      create: {
        email: p.email,
        passwordHash: "$2b$10$test_hash_placeholder",
        firstName: p.firstName,
        lastName: p.lastName,
        role: "PERFORMER",
        language: "sl",
        isEmailVerified: true,
      },
    });

    const profile = await prisma.performerProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        bio: p.bio,
        specialization: p.specialization,
        titleLocalized: p.titleLocalized,
        bioLocalized: p.bioLocalized,
        skillsLocalized: p.skillsLocalized,
        category: `cat.${p.catSlug}`,
        priceFrom: p.priceFrom,
        isVerified: p.isVerified,
        verificationStatus: p.isVerified ? "APPROVED" : "NONE",
        avgRating: p.avgRating,
        totalReviews: p.totalReviews,
        totalOrdersCompleted: p.totalOrdersCompleted,
        responseTimeHours: p.responseTimeHours,
        isAvailable: true,
      },
    });

    // Skills
    for (let i = 0; i < p.skills.length; i++) {
      await prisma.performerSkill.create({
        data: { performerId: profile.id, skillName: p.skills[i], sortOrder: i },
      });
    }

    // Services
    for (const svc of p.services) {
      await prisma.service.create({
        data: {
          performerId: profile.id,
          categoryId: categoryMap[p.catSlug],
          title: svc.title,
          titleLocalized: svc.titleL,
          description: svc.desc,
          descLocalized: svc.descL,
          price: svc.price,
          deliveryDays: svc.days,
          status: "active",
        },
      });
    }

    perfProfiles.push({ ...profile, userId: user.id });
  }
  console.log(`  ✓ ${performers.length} performers + profiles + skills + services`);

  // ── 5. Sample orders ──────────────────────────────────────────
  const anaServices = await prisma.service.findMany({
    where: { performerId: perfProfiles[0].id },
    take: 3,
  });
  const lukaServices = await prisma.service.findMany({
    where: { performerId: perfProfiles[1].id },
    take: 1,
  });
  const majaServices = await prisma.service.findMany({
    where: { performerId: perfProfiles[2].id },
    take: 1,
  });

  const sampleOrders = [
    { num: "ORD-001", client: 0, perf: perfProfiles[0].userId, svc: anaServices[0], status: OrderStatus.IN_PROGRESS, startedAt: new Date("2026-03-25") },
    { num: "ORD-002", client: 1, perf: perfProfiles[0].userId, svc: anaServices[1], status: OrderStatus.NEW },
    { num: "ORD-003", client: 2, perf: perfProfiles[0].userId, svc: anaServices[2], status: OrderStatus.COMPLETED, completedAt: new Date("2026-03-20") },
    { num: "ORD-004", client: 0, perf: perfProfiles[1].userId, svc: lukaServices[0], status: OrderStatus.AWAITING_REVIEW },
    { num: "ORD-005", client: 1, perf: perfProfiles[2].userId, svc: majaServices[0], status: OrderStatus.IN_PROGRESS, startedAt: new Date("2026-03-28") },
    { num: "ORD-006", client: 2, perf: perfProfiles[0].userId, svc: anaServices[0], status: OrderStatus.CANCELLED, cancelledAt: new Date("2026-03-05") },
  ];

  for (const o of sampleOrders) {
    const svcPrice = Number(o.svc.price);
    const feePct = 10;
    const feeAmount = Math.round(svcPrice * feePct) / 100;
    const total = svcPrice + feeAmount;

    const order = await prisma.order.create({
      data: {
        orderNumber: o.num,
        clientId: clientUsers[o.client].id,
        performerId: o.perf,
        serviceId: o.svc.id,
        status: o.status,
        serviceTitle: o.svc.title,
        servicePrice: svcPrice,
        platformFeePct: feePct,
        platformFeeAmount: feeAmount,
        totalAmount: total,
        startedAt: o.startedAt,
        completedAt: o.completedAt,
        cancelledAt: o.cancelledAt,
      },
    });

    // Payment for each order
    await prisma.payment.create({
      data: {
        orderId: order.id,
        amount: svcPrice,
        platformFee: feeAmount,
        totalCharged: total,
        currency: "EUR",
        paymentMethod: "card",
        paymentStatus: o.status === "COMPLETED" ? "RELEASED" :
                       o.status === "CANCELLED" ? "REFUNDED" : "CAPTURED",
        capturedAt: new Date(),
        releasedAt: o.status === "COMPLETED" ? o.completedAt : undefined,
        refundedAt: o.status === "CANCELLED" ? o.cancelledAt : undefined,
        refundAmount: o.status === "CANCELLED" ? total : undefined,
      },
    });
  }
  console.log(`  ✓ ${sampleOrders.length} orders + payments`);

  // ── 6. Review for completed order ─────────────────────────────
  const completedOrder = await prisma.order.findFirst({ where: { status: "COMPLETED" } });
  if (completedOrder) {
    await prisma.review.create({
      data: {
        orderId: completedOrder.id,
        reviewerId: completedOrder.clientId,
        performerId: completedOrder.performerId,
        rating: 5,
        text: "Odlično delo! Ana je pripravila vse dokumente hitro in kakovostno.",
        isPublished: true,
      },
    });
    console.log("  ✓ 1 review");
  }

  // ── 7. Favorites ──────────────────────────────────────────────
  await prisma.favorite.create({ data: { clientId: clientUsers[0].id, performerId: perfProfiles[0].id } });
  await prisma.favorite.create({ data: { clientId: clientUsers[0].id, performerId: perfProfiles[2].id } });
  console.log("  ✓ 2 favorites");

  // ── 8. Sample messages ────────────────────────────────────────
  const activeOrder = await prisma.order.findFirst({ where: { status: "IN_PROGRESS" } });
  if (activeOrder) {
    await prisma.message.create({
      data: { orderId: activeOrder.id, senderId: activeOrder.clientId, messageType: "TEXT", content: "Pozdravljeni! Kdaj lahko pričakujem osnutek?", isRead: true },
    });
    await prisma.message.create({
      data: { orderId: activeOrder.id, senderId: activeOrder.performerId, messageType: "TEXT", content: "Pozdravljeni! Osnutek bo pripravljen do petka.", isRead: false },
    });
    console.log("  ✓ 2 messages");
  }

  // ── 9. Sample notifications ───────────────────────────────────
  await prisma.notification.create({
    data: { userId: clientUsers[0].id, type: "NEW_ORDER", title: "Naročilo #ORD-001 sprejeto", body: "Strokovnjak Ana N. je sprejel vaše naročilo.", relatedOrderId: activeOrder?.id },
  });
  await prisma.notification.create({
    data: { userId: clientUsers[0].id, type: "MESSAGE", title: "Novo sporočilo", body: "Ana N.: Osnutek bo pripravljen do petka.", isRead: false },
  });
  console.log("  ✓ 2 notifications");

  console.log("\n✅ Done! 15 tables seeded.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
