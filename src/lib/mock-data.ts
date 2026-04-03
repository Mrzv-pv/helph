import type { Locale } from "./i18n";

// Localized specialist data
interface SpecialistData {
  id: string;
  name: Record<Locale, string>;
  avatar: null;
  title: Record<Locale, string>;
  rating: number;
  reviewsCount: number;
  priceFrom: number;
  category: string;
  verified: boolean;
  online: boolean;
  skills: Record<Locale, string[]>;
  bio: Record<Locale, string>;
  responseTime: number;
  ordersCount: number;
}

export const specialistsData: SpecialistData[] = [
  {
    id: "1",
    name: { sl: "Ana Novak", en: "Anna Petrova", ru: "Анна Петрова", de: "Anna Novak" },
    avatar: null,
    title: { sl: "Odvetnica za korporativno pravo", en: "Corporate law attorney", ru: "Юрист по корпоративному праву", de: "Anwältin für Gesellschaftsrecht" },
    rating: 4.9, reviewsCount: 47, priceFrom: 120, category: "cat.law", verified: true, online: true,
    skills: { sl: ["Korporativno pravo", "Pogodbe", "Registracija d.o.o.", "Skrbni pregled"], en: ["Corporate law", "Contracts", "LLC Registration", "Due Diligence"], ru: ["Корпоративное право", "Договоры", "Регистрация ООО", "Due Diligence"], de: ["Gesellschaftsrecht", "Verträge", "GmbH-Gründung", "Due Diligence"] },
    bio: { sl: "10 let izkušenj na področju korporativnega prava. Specializirana za posle M&A, korporativno upravljanje in pogodbeno delo.", en: "10 years of corporate law experience. Specializing in M&A deals, corporate governance and contract work.", ru: "10 лет опыта в корпоративном праве. Специализируюсь на сделках M&A, корпоративном управлении и договорной работе.", de: "10 Jahre Erfahrung im Gesellschaftsrecht. Spezialisiert auf M&A-Transaktionen, Corporate Governance und Vertragsarbeit." },
    responseTime: 2, ordersCount: 124,
  },
  {
    id: "2",
    name: { sl: "Luka Krajnc", en: "Dmitry Kozlov", ru: "Дмитрий Козлов", de: "Lukas Krajnc" },
    avatar: null,
    title: { sl: "Finančni svetovalec", en: "Financial consultant", ru: "Финансовый консультант", de: "Finanzberater" },
    rating: 4.8, reviewsCount: 32, priceFrom: 90, category: "cat.finance", verified: true, online: false,
    skills: { sl: ["Naložbe", "Davčno načrtovanje", "Finančna revizija"], en: ["Investments", "Tax planning", "Financial audit"], ru: ["Инвестиции", "Налоговое планирование", "Финансовый аудит"], de: ["Investitionen", "Steuerplanung", "Finanzprüfung"] },
    bio: { sl: "Pomagam podjetjem optimizirati finance in zmanjšati davčno breme. Izkušnje v Big 4.", en: "Helping businesses optimize finances and reduce tax burden. Big 4 experience.", ru: "Помогаю бизнесу оптимизировать финансы и снижать налоговую нагрузку. Опыт работы в Big 4.", de: "Ich helfe Unternehmen, Finanzen zu optimieren und Steuerlast zu senken. Big-4-Erfahrung." },
    responseTime: 4, ordersCount: 89,
  },
  {
    id: "3",
    name: { sl: "Maja Horvat", en: "Maria Ivanova", ru: "Мария Иванова", de: "Maja Horvat" },
    avatar: null,
    title: { sl: "UX/UI Oblikovalka", en: "UX/UI Designer", ru: "UX/UI Дизайнер", de: "UX/UI Designerin" },
    rating: 5.0, reviewsCount: 61, priceFrom: 150, category: "cat.design", verified: true, online: true,
    skills: { sl: ["Figma", "UI-oblikovanje", "UX-raziskave", "Prototipiranje", "Design Systems"], en: ["Figma", "UI Design", "UX Research", "Prototyping", "Design Systems"], ru: ["Figma", "UI-дизайн", "UX-исследования", "Прототипирование", "Design Systems"], de: ["Figma", "UI-Design", "UX-Forschung", "Prototyping", "Design Systems"] },
    bio: { sl: "Ustvarjam vmesnike, ki jih uporabniki obožujejo. Sodelovala s Petrol, Triglav, NLB.", en: "Creating interfaces users love. Worked with top brands.", ru: "Создаю интерфейсы, которые любят пользователи. Работала с Яндекс, Сбер, Тинькофф.", de: "Ich gestalte Interfaces, die Nutzer lieben. Zusammenarbeit mit Top-Marken." },
    responseTime: 1, ordersCount: 203,
  },
  {
    id: "4",
    name: { sl: "Žiga Vidmar", en: "Alexey Smirnov", ru: "Алексей Смирнов", de: "Žiga Vidmar" },
    avatar: null,
    title: { sl: "Tržnik · Performance", en: "Marketer · Performance", ru: "Маркетолог · Performance", de: "Vermarkter · Performance" },
    rating: 4.7, reviewsCount: 28, priceFrom: 200, category: "cat.marketing", verified: false, online: true,
    skills: { sl: ["Kontekstualno oglaševanje", "Google Ads", "Meta Ads", "Analitika"], en: ["Contextual advertising", "Google Ads", "Meta Ads", "Analytics"], ru: ["Контекстная реклама", "Яндекс.Директ", "Google Ads", "Аналитика"], de: ["Kontextwerbung", "Google Ads", "Meta Ads", "Analytik"] },
    bio: { sl: "Pridobivam stranke za podjetja prek plačanega prometa. Povprečni ROI x3.", en: "Acquiring clients through paid traffic. Average ROI x3.", ru: "Привлекаю клиентов для бизнеса через платный трафик. ROI в среднем x3.", de: "Kundengewinnung über bezahlten Traffic. Durchschnittlicher ROI x3." },
    responseTime: 3, ordersCount: 56,
  },
  {
    id: "5",
    name: { sl: "Nina Zupančič", en: "Elena Volkova", ru: "Елена Волкова", de: "Nina Zupančič" },
    avatar: null,
    title: { sl: "Računovodkinja · s.p. in d.o.o.", en: "Accountant · SMB", ru: "Бухгалтер · ИП и ООО", de: "Buchhalterin · KMU" },
    rating: 4.9, reviewsCount: 85, priceFrom: 60, category: "cat.finance", verified: true, online: false,
    skills: { sl: ["Računovodstvo", "Davčno poročanje", "e-Računi", "s.p."], en: ["Accounting", "Tax reporting", "Invoicing", "SMB"], ru: ["Бухгалтерский учёт", "Налоговая отчётность", "1С", "ИП"], de: ["Buchhaltung", "Steuererklärung", "Rechnungsstellung", "KMU"] },
    bio: { sl: "Vodim računovodstvo za mala podjetja. Več kot 200 zadovoljnih strank.", en: "Managing accounting for small businesses. Over 200 happy clients.", ru: "Веду бухгалтерию для малого бизнеса. Более 200 довольных клиентов.", de: "Buchhaltung für Kleinunternehmen. Über 200 zufriedene Kunden." },
    responseTime: 6, ordersCount: 312,
  },
  {
    id: "6",
    name: { sl: "Jan Kovač", en: "Igor Novikov", ru: "Игорь Новиков", de: "Jan Kovač" },
    avatar: null,
    title: { sl: "Fullstack razvijalec", en: "Fullstack developer", ru: "Fullstack-разработчик", de: "Fullstack-Entwickler" },
    rating: 4.6, reviewsCount: 19, priceFrom: 180, category: "cat.it", verified: false, online: true,
    skills: { sl: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"], en: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"], ru: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"], de: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"] },
    bio: { sl: "Razvijam spletne aplikacije od ideje do produkcije. 7 let v IT.", en: "Building web apps from idea to production. 7 years in IT.", ru: "Разрабатываю веб-приложения от идеи до продакшена. 7 лет в IT.", de: "Entwicklung von Webanwendungen von der Idee bis zur Produktion. 7 Jahre IT-Erfahrung." },
    responseTime: 2, ordersCount: 41,
  },
];

// Helper to get localized specialist list
export function getSpecialists(locale: import("./i18n").Locale) {
  return specialistsData.map((s) => ({
    id: s.id,
    name: s.name[locale],
    avatar: s.avatar,
    title: s.title[locale],
    rating: s.rating,
    reviewsCount: s.reviewsCount,
    priceFrom: s.priceFrom,
    category: s.category,
    verified: s.verified,
    online: s.online,
    skills: s.skills[locale],
    bio: s.bio[locale],
    responseTime: s.responseTime,
    ordersCount: s.ordersCount,
  }));
}

export const categories = [
  { nameKey: "cat.law" as const, icon: "Scale", count: 234, slug: "law" },
  { nameKey: "cat.finance" as const, icon: "Calculator", count: 189, slug: "finance" },
  { nameKey: "cat.design" as const, icon: "Palette", count: 312, slug: "design" },
  { nameKey: "cat.marketing" as const, icon: "TrendingUp", count: 156, slug: "marketing" },
  { nameKey: "cat.it" as const, icon: "Code", count: 278, slug: "it" },
  { nameKey: "cat.consulting" as const, icon: "MessageSquare", count: 98, slug: "consulting" },
  { nameKey: "cat.hr" as const, icon: "Users", count: 67, slug: "hr" },
  { nameKey: "cat.translation" as const, icon: "Globe", count: 145, slug: "translation" },
];

export function getServices(locale: import("./i18n").Locale) {
  const data: Record<import("./i18n").Locale, { id: string; title: string; description: string; price: number; priceType: "fixed" | "hourly"; deliveryDays: number }[]> = {
    sl: [
      { id: "s1", title: "Registracija d.o.o. na ključ", description: "Popolno spremljanje registracije: priprava dokumentov, oddaja na AJPES, pridobitev davčne številke.", price: 350, priceType: "fixed", deliveryDays: 7 },
      { id: "s2", title: "Priprava pogodbe", description: "Razvoj pravno ustrezne pogodbe, prilagojene specifiki vašega podjetja.", price: 120, priceType: "fixed", deliveryDays: 3 },
      { id: "s3", title: "Pravno svetovanje", description: "Svetovanje o vseh vprašanjih korporativnega prava. Video klic 60 minut.", price: 80, priceType: "hourly", deliveryDays: 1 },
      { id: "s4", title: "Skrbni pregled podjetja", description: "Popoln pregled pravne čistosti podjetja pred transakcijo.", price: 1200, priceType: "fixed", deliveryDays: 14 },
    ],
    en: [
      { id: "s1", title: "LLC Registration (turnkey)", description: "Full registration support: document preparation, filing, tax ID acquisition.", price: 350, priceType: "fixed", deliveryDays: 7 },
      { id: "s2", title: "Contract Drafting", description: "Development of a legally sound contract tailored to your business.", price: 120, priceType: "fixed", deliveryDays: 3 },
      { id: "s3", title: "Legal Consultation", description: "Consultation on any corporate law matters. 60-minute video call.", price: 80, priceType: "hourly", deliveryDays: 1 },
      { id: "s4", title: "Company Due Diligence", description: "Complete legal review of a company before a transaction.", price: 1200, priceType: "fixed", deliveryDays: 14 },
    ],
    ru: [
      { id: "s1", title: "Регистрация ООО под ключ", description: "Полное сопровождение регистрации: подготовка документов, подача в ФНС, получение ИНН и ОГРН.", price: 15000, priceType: "fixed", deliveryDays: 7 },
      { id: "s2", title: "Составление договора", description: "Разработка юридически грамотного договора с учётом специфики вашего бизнеса.", price: 5000, priceType: "fixed", deliveryDays: 3 },
      { id: "s3", title: "Юридическая консультация", description: "Консультация по любым вопросам корпоративного права. Видеозвонок 60 минут.", price: 3000, priceType: "hourly", deliveryDays: 1 },
      { id: "s4", title: "Due Diligence компании", description: "Полная проверка юридической чистоты компании перед сделкой.", price: 50000, priceType: "fixed", deliveryDays: 14 },
    ],
    de: [
      { id: "s1", title: "GmbH-Gründung (schlüsselfertig)", description: "Vollständige Registrierungsunterstützung: Dokumentenvorbereitung, Einreichung, Steuernummernbeschaffung.", price: 350, priceType: "fixed", deliveryDays: 7 },
      { id: "s2", title: "Vertragsentwurf", description: "Entwicklung eines rechtssicheren Vertrags, zugeschnitten auf Ihr Unternehmen.", price: 120, priceType: "fixed", deliveryDays: 3 },
      { id: "s3", title: "Rechtsberatung", description: "Beratung zu allen Fragen des Gesellschaftsrechts. 60-Minuten-Videoanruf.", price: 80, priceType: "hourly", deliveryDays: 1 },
      { id: "s4", title: "Due Diligence des Unternehmens", description: "Vollständige rechtliche Prüfung eines Unternehmens vor einer Transaktion.", price: 1200, priceType: "fixed", deliveryDays: 14 },
    ],
  };
  return data[locale];
}

export function getReviews(locale: import("./i18n").Locale) {
  const data: Record<import("./i18n").Locale, { id: string; reviewerName: string; rating: number; comment: string; date: string; serviceName: string }[]> = {
    sl: [
      { id: "r1", reviewerName: "Tomaž Kovač", rating: 5, comment: "Odlično delo! Ana je pripravila vse dokumente hitro in kakovostno. Zelo priporočam.", date: "2024-03-15", serviceName: "Registracija d.o.o. na ključ" },
      { id: "r2", reviewerName: "Maja Zupan", rating: 5, comment: "Profesionalen pristop. Pogodba je bila pripravljena celo pred rokom.", date: "2024-03-08", serviceName: "Priprava pogodbe" },
      { id: "r3", reviewerName: "Andrej Breznik", rating: 4, comment: "Dobro svetovanje, dobil sem odgovore na vsa vprašanja. Edino — želel bi pisni povzetek.", date: "2024-02-20", serviceName: "Pravno svetovanje" },
    ],
    en: [
      { id: "r1", reviewerName: "Thomas Smith", rating: 5, comment: "Excellent work! Anna prepared all documents quickly and with great quality. Highly recommended.", date: "2024-03-15", serviceName: "LLC Registration (turnkey)" },
      { id: "r2", reviewerName: "Sarah Johnson", rating: 5, comment: "Professional approach. The contract was ready even before the deadline.", date: "2024-03-08", serviceName: "Contract Drafting" },
      { id: "r3", reviewerName: "Andrew Brown", rating: 4, comment: "Good consultation, got answers to all questions. Only wish — would've liked a written summary.", date: "2024-02-20", serviceName: "Legal Consultation" },
    ],
    ru: [
      { id: "r1", reviewerName: "Олег Тарасов", rating: 5, comment: "Отличная работа! Анна подготовила все документы быстро и качественно. Очень рекомендую.", date: "2024-03-15", serviceName: "Регистрация ООО под ключ" },
      { id: "r2", reviewerName: "Светлана Морозова", rating: 5, comment: "Профессиональный подход к делу. Договор был готов даже раньше срока.", date: "2024-03-08", serviceName: "Составление договора" },
      { id: "r3", reviewerName: "Андрей Белов", rating: 4, comment: "Хорошая консультация, получил ответы на все вопросы. Единственное — хотелось бы получить письменное резюме.", date: "2024-02-20", serviceName: "Юридическая консультация" },
    ],
    de: [
      { id: "r1", reviewerName: "Thomas Müller", rating: 5, comment: "Ausgezeichnete Arbeit! Anna hat alle Dokumente schnell und qualitativ hochwertig vorbereitet. Sehr empfehlenswert.", date: "2024-03-15", serviceName: "GmbH-Gründung (schlüsselfertig)" },
      { id: "r2", reviewerName: "Sabine Weber", rating: 5, comment: "Professioneller Ansatz. Der Vertrag war sogar vor dem Termin fertig.", date: "2024-03-08", serviceName: "Vertragsentwurf" },
      { id: "r3", reviewerName: "Andreas Fischer", rating: 4, comment: "Gute Beratung, alle Fragen beantwortet. Einziger Wunsch — hätte gern eine schriftliche Zusammenfassung gehabt.", date: "2024-02-20", serviceName: "Rechtsberatung" },
    ],
  };
  return data[locale];
}

export function getTestimonials(locale: import("./i18n").Locale) {
  const data: Record<import("./i18n").Locale, { name: string; role: string; text: string }[]> = {
    sl: [
      { name: "Tomaž Kovač", role: "Lastnik podjetja", text: "Odvetnika za registracijo d.o.o. sem našel v 10 minutah. Vse je bilo opravljeno kakovostno in pravočasno. Zdaj samo prek HELPH." },
      { name: "Maja Zupan", role: "Vodja projekta", text: "Odlična platforma! Priročno iskanje, pregledne cene, varno plačilo. Priporočam vsem, ki cenijo svoj čas." },
      { name: "Andrej Breznik", role: "Startup ustanovitelj", text: "Najel sem oblikovalca in tržnika za zagon izdelka. Oba strokovnjaka — pravi profesionalci. Hvala HELPH!" },
    ],
    en: [
      { name: "Thomas Smith", role: "Business owner", text: "Found a lawyer for LLC registration in 10 minutes. Everything was done with quality and on time. Now only through HELPH." },
      { name: "Sarah Johnson", role: "Project manager", text: "Great platform! Convenient search, transparent pricing, secure payment. Recommend to everyone who values their time." },
      { name: "Andrew Brown", role: "Startup founder", text: "Hired a designer and marketer for product launch. Both specialists are true professionals. Thanks HELPH!" },
    ],
    ru: [
      { name: "Олег Тарасов", role: "Владелец бизнеса", text: "Нашёл юриста для регистрации ООО за 10 минут. Всё было сделано качественно и в срок. Теперь только через HELPH." },
      { name: "Светлана Морозова", role: "Менеджер проекта", text: "Отличная платформа! Удобный поиск, прозрачные цены, безопасная оплата. Рекомендую всем, кто ценит своё время." },
      { name: "Андрей Белов", role: "Стартапер", text: "Нанял дизайнера и маркетолога для запуска продукта. Оба специалиста — настоящие профессионалы. Спасибо HELPH!" },
    ],
    de: [
      { name: "Thomas Müller", role: "Geschäftsinhaber", text: "Einen Anwalt für die GmbH-Gründung in 10 Minuten gefunden. Alles wurde qualitativ und pünktlich erledigt. Jetzt nur noch über HELPH." },
      { name: "Sabine Weber", role: "Projektmanagerin", text: "Tolle Plattform! Bequeme Suche, transparente Preise, sichere Zahlung. Empfehle ich jedem, der seine Zeit schätzt." },
      { name: "Andreas Fischer", role: "Startup-Gründer", text: "Designer und Vermarkter für den Produktstart engagiert. Beide Spezialisten sind echte Profis. Danke HELPH!" },
    ],
  };
  return data[locale];
}
