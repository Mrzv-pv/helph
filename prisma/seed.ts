import "dotenv/config";
import { PrismaClient, UserRole, PriceType, OrderStatus } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // ── Categories ────────────────────────────────────────────────
  const cats = [
    { slug: "law", key: "cat.law", icon: "Scale", sort: 1 },
    { slug: "finance", key: "cat.finance", icon: "Calculator", sort: 2 },
    { slug: "design", key: "cat.design", icon: "Palette", sort: 3 },
    { slug: "marketing", key: "cat.marketing", icon: "TrendingUp", sort: 4 },
    { slug: "it", key: "cat.it", icon: "Code", sort: 5 },
    { slug: "consulting", key: "cat.consulting", icon: "MessageSquare", sort: 6 },
    { slug: "hr", key: "cat.hr", icon: "Users", sort: 7 },
    { slug: "translation", key: "cat.translation", icon: "Globe", sort: 8 },
  ];

  for (const c of cats) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: c,
      create: c,
    });
  }
  console.log(`  ✓ ${cats.length} categories`);

  // ── Specialists (as Users + SpecialistProfile) ────────────────
  const specialists = [
    {
      email: "ana.novak@helph.si",
      firstName: "Ana",
      lastName: "Novak",
      title: { sl: "Odvetnica za korporativno pravo", en: "Corporate law attorney", ru: "Юрист по корпоративному праву", de: "Anwältin für Gesellschaftsrecht" },
      bio: { sl: "10 let izkušenj na področju korporativnega prava. Specializirana za posle M&A, korporativno upravljanje in pogodbeno delo.", en: "10 years of corporate law experience. Specializing in M&A deals, corporate governance and contract work.", ru: "10 лет опыта в корпоративном праве. Специализируюсь на сделках M&A, корпоративном управлении и договорной работе.", de: "10 Jahre Erfahrung im Gesellschaftsrecht. Spezialisiert auf M&A-Transaktionen, Corporate Governance und Vertragsarbeit." },
      skills: { sl: ["Korporativno pravo", "Pogodbe", "Registracija d.o.o.", "Skrbni pregled"], en: ["Corporate law", "Contracts", "LLC Registration", "Due Diligence"], ru: ["Корпоративное право", "Договоры", "Регистрация ООО", "Due Diligence"], de: ["Gesellschaftsrecht", "Verträge", "GmbH-Gründung", "Due Diligence"] },
      category: "cat.law", priceFrom: 8000, verified: true, online: true, responseTime: 2, rating: 4.9, reviewsCount: 47, ordersCount: 124,
      services: [
        { title: { sl: "Registracija d.o.o. na ključ", en: "LLC Registration (turnkey)", ru: "Регистрация ООО под ключ", de: "GmbH-Gründung (schlüsselfertig)" }, description: { sl: "Popolno spremljanje registracije: priprava dokumentov, oddaja na AJPES, pridobitev davčne številke.", en: "Full registration support: document preparation, filing, tax ID acquisition.", ru: "Полное сопровождение регистрации: подготовка документов, подача в ФНС, получение ИНН и ОГРН.", de: "Vollständige Registrierungsunterstützung: Dokumentenvorbereitung, Einreichung, Steuernummernbeschaffung." }, price: 35000, priceType: PriceType.FIXED, deliveryDays: 7 },
        { title: { sl: "Priprava pogodbe", en: "Contract Drafting", ru: "Составление договора", de: "Vertragsentwurf" }, description: { sl: "Razvoj pravno ustrezne pogodbe, prilagojene specifiki vašega podjetja.", en: "Development of a legally sound contract tailored to your business.", ru: "Разработка юридически грамотного договора с учётом специфики вашего бизнеса.", de: "Entwicklung eines rechtssicheren Vertrags, zugeschnitten auf Ihr Unternehmen." }, price: 12000, priceType: PriceType.FIXED, deliveryDays: 3 },
        { title: { sl: "Pravno svetovanje", en: "Legal Consultation", ru: "Юридическая консультация", de: "Rechtsberatung" }, description: { sl: "Svetovanje o vseh vprašanjih korporativnega prava. Video klic 60 minut.", en: "Consultation on any corporate law matters. 60-minute video call.", ru: "Консультация по любым вопросам корпоративного права. Видеозвонок 60 минут.", de: "Beratung zu allen Fragen des Gesellschaftsrechts. 60-Minuten-Videoanruf." }, price: 8000, priceType: PriceType.HOURLY, deliveryDays: 1 },
        { title: { sl: "Skrbni pregled podjetja", en: "Company Due Diligence", ru: "Due Diligence компании", de: "Due Diligence des Unternehmens" }, description: { sl: "Popoln pregled pravne čistosti podjetja pred transakcijo.", en: "Complete legal review of a company before a transaction.", ru: "Полная проверка юридической чистоты компании перед сделкой.", de: "Vollständige rechtliche Prüfung eines Unternehmens vor einer Transaktion." }, price: 120000, priceType: PriceType.FIXED, deliveryDays: 14 },
      ],
    },
    {
      email: "luka.krajnc@helph.si",
      firstName: "Luka",
      lastName: "Krajnc",
      title: { sl: "Finančni svetovalec", en: "Financial consultant", ru: "Финансовый консультант", de: "Finanzberater" },
      bio: { sl: "Pomagam podjetjem optimizirati finance in zmanjšati davčno breme. Izkušnje v Big 4.", en: "Helping businesses optimize finances and reduce tax burden. Big 4 experience.", ru: "Помогаю бизнесу оптимизировать финансы и снижать налоговую нагрузку. Опыт работы в Big 4.", de: "Ich helfe Unternehmen, Finanzen zu optimieren und Steuerlast zu senken. Big-4-Erfahrung." },
      skills: { sl: ["Naložbe", "Davčno načrtovanje", "Finančna revizija"], en: ["Investments", "Tax planning", "Financial audit"], ru: ["Инвестиции", "Налоговое планирование", "Финансовый аудит"], de: ["Investitionen", "Steuerplanung", "Finanzprüfung"] },
      category: "cat.finance", priceFrom: 9000, verified: true, online: false, responseTime: 4, rating: 4.8, reviewsCount: 32, ordersCount: 89,
      services: [
        { title: { sl: "Davčno načrtovanje", en: "Tax Planning", ru: "Налоговое планирование", de: "Steuerplanung" }, description: { sl: "Optimizacija davčne obremenitve za vaše podjetje.", en: "Tax burden optimization for your business.", ru: "Оптимизация налоговой нагрузки для вашего бизнеса.", de: "Optimierung der Steuerbelastung für Ihr Unternehmen." }, price: 15000, priceType: PriceType.FIXED, deliveryDays: 5 },
        { title: { sl: "Finančna revizija", en: "Financial Audit", ru: "Финансовый аудит", de: "Finanzprüfung" }, description: { sl: "Popolna revizija finančnega stanja podjetja.", en: "Complete audit of company financial status.", ru: "Полный аудит финансового состояния компании.", de: "Vollständige Prüfung der finanziellen Lage des Unternehmens." }, price: 25000, priceType: PriceType.FIXED, deliveryDays: 10 },
      ],
    },
    {
      email: "maja.horvat@helph.si",
      firstName: "Maja",
      lastName: "Horvat",
      title: { sl: "UX/UI Oblikovalka", en: "UX/UI Designer", ru: "UX/UI Дизайнер", de: "UX/UI Designerin" },
      bio: { sl: "Ustvarjam vmesnike, ki jih uporabniki obožujejo. Sodelovala s Petrol, Triglav, NLB.", en: "Creating interfaces users love. Worked with top brands.", ru: "Создаю интерфейсы, которые любят пользователи. Работала с Яндекс, Сбер, Тинькофф.", de: "Ich gestalte Interfaces, die Nutzer lieben. Zusammenarbeit mit Top-Marken." },
      skills: { sl: ["Figma", "UI-oblikovanje", "UX-raziskave", "Prototipiranje", "Design Systems"], en: ["Figma", "UI Design", "UX Research", "Prototyping", "Design Systems"], ru: ["Figma", "UI-дизайн", "UX-исследования", "Прототипирование", "Design Systems"], de: ["Figma", "UI-Design", "UX-Forschung", "Prototyping", "Design Systems"] },
      category: "cat.design", priceFrom: 15000, verified: true, online: true, responseTime: 1, rating: 5.0, reviewsCount: 61, ordersCount: 203,
      services: [
        { title: { sl: "Oblikovanje logotipa", en: "Logo Design", ru: "Дизайн логотипа", de: "Logo-Design" }, description: { sl: "Unikatna vizualna identiteta za vaš brand.", en: "Unique visual identity for your brand.", ru: "Уникальная визуальная идентичность для вашего бренда.", de: "Einzigartige visuelle Identität für Ihre Marke." }, price: 20000, priceType: PriceType.FIXED, deliveryDays: 5 },
        { title: { sl: "UX/UI oblikovanje spletne strani", en: "Website UX/UI Design", ru: "UX/UI дизайн сайта", de: "Website UX/UI Design" }, description: { sl: "Od wireframe do interaktivnega prototipa v Figma.", en: "From wireframe to interactive Figma prototype.", ru: "От вайрфрейма до интерактивного прототипа в Figma.", de: "Vom Wireframe zum interaktiven Figma-Prototyp." }, price: 45000, priceType: PriceType.FIXED, deliveryDays: 14 },
      ],
    },
    {
      email: "ziga.vidmar@helph.si",
      firstName: "Žiga",
      lastName: "Vidmar",
      title: { sl: "Tržnik · Performance", en: "Marketer · Performance", ru: "Маркетолог · Performance", de: "Vermarkter · Performance" },
      bio: { sl: "Pridobivam stranke za podjetja prek plačanega prometa. Povprečni ROI x3.", en: "Acquiring clients through paid traffic. Average ROI x3.", ru: "Привлекаю клиентов для бизнеса через платный трафик. ROI в среднем x3.", de: "Kundengewinnung über bezahlten Traffic. Durchschnittlicher ROI x3." },
      skills: { sl: ["Kontekstualno oglaševanje", "Google Ads", "Meta Ads", "Analitika"], en: ["Contextual advertising", "Google Ads", "Meta Ads", "Analytics"], ru: ["Контекстная реклама", "Яндекс.Директ", "Google Ads", "Аналитика"], de: ["Kontextwerbung", "Google Ads", "Meta Ads", "Analytik"] },
      category: "cat.marketing", priceFrom: 20000, verified: false, online: true, responseTime: 3, rating: 4.7, reviewsCount: 28, ordersCount: 56,
      services: [
        { title: { sl: "Google Ads kampanja", en: "Google Ads Campaign", ru: "Кампания Google Ads", de: "Google Ads Kampagne" }, description: { sl: "Nastavitev in optimizacija kampanje za maksimalen ROI.", en: "Campaign setup and optimization for maximum ROI.", ru: "Настройка и оптимизация кампании для максимального ROI.", de: "Kampagneneinrichtung und -optimierung für maximalen ROI." }, price: 30000, priceType: PriceType.FIXED, deliveryDays: 7 },
      ],
    },
    {
      email: "nina.zupancic@helph.si",
      firstName: "Nina",
      lastName: "Zupančič",
      title: { sl: "Računovodkinja · s.p. in d.o.o.", en: "Accountant · SMB", ru: "Бухгалтер · ИП и ООО", de: "Buchhalterin · KMU" },
      bio: { sl: "Vodim računovodstvo za mala podjetja. Več kot 200 zadovoljnih strank.", en: "Managing accounting for small businesses. Over 200 happy clients.", ru: "Веду бухгалтерию для малого бизнеса. Более 200 довольных клиентов.", de: "Buchhaltung für Kleinunternehmen. Über 200 zufriedene Kunden." },
      skills: { sl: ["Računovodstvo", "Davčno poročanje", "e-Računi", "s.p."], en: ["Accounting", "Tax reporting", "Invoicing", "SMB"], ru: ["Бухгалтерский учёт", "Налоговая отчётность", "1С", "ИП"], de: ["Buchhaltung", "Steuererklärung", "Rechnungsstellung", "KMU"] },
      category: "cat.finance", priceFrom: 6000, verified: true, online: false, responseTime: 6, rating: 4.9, reviewsCount: 85, ordersCount: 312,
      services: [
        { title: { sl: "Mesečno računovodstvo s.p.", en: "Monthly Accounting (sole trader)", ru: "Ежемесячная бухгалтерия ИП", de: "Monatliche Buchhaltung (Einzelunternehmer)" }, description: { sl: "Vodenje vseh računovodskih evidenc in oddaja poročil.", en: "Managing all accounting records and filing reports.", ru: "Ведение всех бухгалтерских записей и сдача отчётности.", de: "Führung aller Buchhaltungsunterlagen und Berichtseinreichung." }, price: 6000, priceType: PriceType.FIXED, deliveryDays: 30 },
        { title: { sl: "Davčna napoved", en: "Tax Return Filing", ru: "Налоговая декларация", de: "Steuererklärung" }, description: { sl: "Priprava in oddaja letne davčne napovedi.", en: "Preparation and filing of annual tax return.", ru: "Подготовка и сдача годовой налоговой декларации.", de: "Vorbereitung und Einreichung der jährlichen Steuererklärung." }, price: 10000, priceType: PriceType.FIXED, deliveryDays: 5 },
      ],
    },
    {
      email: "jan.kovac@helph.si",
      firstName: "Jan",
      lastName: "Kovač",
      title: { sl: "Fullstack razvijalec", en: "Fullstack developer", ru: "Fullstack-разработчик", de: "Fullstack-Entwickler" },
      bio: { sl: "Razvijam spletne aplikacije od ideje do produkcije. 7 let v IT.", en: "Building web apps from idea to production. 7 years in IT.", ru: "Разрабатываю веб-приложения от идеи до продакшена. 7 лет в IT.", de: "Entwicklung von Webanwendungen von der Idee bis zur Produktion. 7 Jahre IT-Erfahrung." },
      skills: { sl: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"], en: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"], ru: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"], de: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"] },
      category: "cat.it", priceFrom: 18000, verified: false, online: true, responseTime: 2, rating: 4.6, reviewsCount: 19, ordersCount: 41,
      services: [
        { title: { sl: "Razvoj spletne aplikacije", en: "Web Application Development", ru: "Разработка веб-приложения", de: "Webanwendungsentwicklung" }, description: { sl: "Od koncepta do delujoče aplikacije z Next.js, React in PostgreSQL.", en: "From concept to working app with Next.js, React and PostgreSQL.", ru: "От концепта до работающего приложения на Next.js, React и PostgreSQL.", de: "Vom Konzept zur funktionierenden App mit Next.js, React und PostgreSQL." }, price: 180000, priceType: PriceType.FIXED, deliveryDays: 30 },
        { title: { sl: "Tehnično svetovanje", en: "Technical Consulting", ru: "Техническая консультация", de: "Technische Beratung" }, description: { sl: "Pregled arhitekture, code review, načrt za izboljšave.", en: "Architecture review, code review, improvement plan.", ru: "Ревью архитектуры, код-ревью, план улучшений.", de: "Architekturüberprüfung, Code-Review, Verbesserungsplan." }, price: 18000, priceType: PriceType.HOURLY, deliveryDays: 1 },
      ],
    },
  ];

  // ── Test clients ──────────────────────────────────────────────
  const clients = [
    { email: "tomaz.kovac@gmail.com", firstName: "Tomaž", lastName: "Kovač" },
    { email: "maja.zupan@gmail.com", firstName: "Maja", lastName: "Zupan" },
    { email: "andrej.breznik@gmail.com", firstName: "Andrej", lastName: "Breznik" },
  ];

  // Create clients
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
        role: UserRole.CLIENT,
        emailVerified: true,
      },
    });
    clientUsers.push(user);
  }
  console.log(`  ✓ ${clients.length} test clients`);

  // Create specialists with profiles and services
  const specProfiles = [];
  for (const spec of specialists) {
    const user = await prisma.user.upsert({
      where: { email: spec.email },
      update: {},
      create: {
        email: spec.email,
        passwordHash: "$2b$10$test_hash_placeholder",
        firstName: spec.firstName,
        lastName: spec.lastName,
        role: UserRole.SPECIALIST,
        emailVerified: true,
      },
    });

    const profile = await prisma.specialistProfile.upsert({
      where: { userId: user.id },
      update: {
        title: spec.title,
        bio: spec.bio,
        skills: spec.skills,
        category: spec.category,
        priceFrom: spec.priceFrom,
        verified: spec.verified,
        online: spec.online,
        responseTime: spec.responseTime,
        rating: spec.rating,
        reviewsCount: spec.reviewsCount,
        ordersCount: spec.ordersCount,
      },
      create: {
        userId: user.id,
        title: spec.title,
        bio: spec.bio,
        skills: spec.skills,
        category: spec.category,
        priceFrom: spec.priceFrom,
        verified: spec.verified,
        online: spec.online,
        responseTime: spec.responseTime,
        rating: spec.rating,
        reviewsCount: spec.reviewsCount,
        ordersCount: spec.ordersCount,
      },
    });

    // Create services
    for (const svc of spec.services) {
      await prisma.service.create({
        data: {
          specialistId: profile.id,
          title: svc.title,
          description: svc.description,
          price: svc.price,
          priceType: svc.priceType,
          deliveryDays: svc.deliveryDays,
        },
      });
    }

    specProfiles.push(profile);
  }
  console.log(`  ✓ ${specialists.length} specialists with services`);

  // ── Sample orders ─────────────────────────────────────────────
  // Get first specialist's services
  const anaServices = await prisma.service.findMany({
    where: { specialistId: specProfiles[0].id },
    take: 3,
  });

  const lukaServices = await prisma.service.findMany({
    where: { specialistId: specProfiles[1].id },
    take: 1,
  });

  const majaServices = await prisma.service.findMany({
    where: { specialistId: specProfiles[2].id },
    take: 1,
  });

  const sampleOrders = [
    { orderNumber: "ORD-001", clientId: clientUsers[0].id, specialistId: specProfiles[0].id, serviceId: anaServices[0].id, amount: 35000, status: OrderStatus.IN_PROGRESS, clientConfirmed: true },
    { orderNumber: "ORD-002", clientId: clientUsers[1].id, specialistId: specProfiles[0].id, serviceId: anaServices[1].id, amount: 12000, status: OrderStatus.NEW, clientConfirmed: true },
    { orderNumber: "ORD-003", clientId: clientUsers[2].id, specialistId: specProfiles[0].id, serviceId: anaServices[2].id, amount: 8000, status: OrderStatus.COMPLETED, clientConfirmed: true, completedAt: new Date("2026-03-20") },
    { orderNumber: "ORD-004", clientId: clientUsers[0].id, specialistId: specProfiles[1].id, serviceId: lukaServices[0].id, amount: 15000, status: OrderStatus.AWAITING_REVIEW, clientConfirmed: false },
    { orderNumber: "ORD-005", clientId: clientUsers[1].id, specialistId: specProfiles[2].id, serviceId: majaServices[0].id, amount: 20000, status: OrderStatus.IN_PROGRESS, clientConfirmed: true },
    { orderNumber: "ORD-006", clientId: clientUsers[2].id, specialistId: specProfiles[0].id, serviceId: anaServices[0].id, amount: 35000, status: OrderStatus.CANCELLED, clientConfirmed: false, cancelledAt: new Date("2026-03-05") },
  ];

  for (const o of sampleOrders) {
    await prisma.order.create({ data: o });
  }
  console.log(`  ✓ ${sampleOrders.length} sample orders`);

  // ── Sample reviews (for completed orders) ─────────────────────
  const completedOrder = await prisma.order.findFirst({
    where: { status: OrderStatus.COMPLETED },
  });

  if (completedOrder) {
    await prisma.review.create({
      data: {
        orderId: completedOrder.id,
        authorId: completedOrder.clientId,
        specialistId: completedOrder.specialistId,
        rating: 5,
        comment: "Odlično delo! Ana je pripravila vse dokumente hitro in kakovostno. Zelo priporočam.",
      },
    });
    console.log("  ✓ 1 sample review");
  }

  // ── Favorites ─────────────────────────────────────────────────
  await prisma.favorite.create({
    data: { userId: clientUsers[0].id, specialistId: specProfiles[0].id },
  });
  await prisma.favorite.create({
    data: { userId: clientUsers[0].id, specialistId: specProfiles[2].id },
  });
  console.log("  ✓ 2 sample favorites");

  console.log("\nDone!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
