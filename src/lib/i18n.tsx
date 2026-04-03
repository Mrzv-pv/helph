"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Locale = "sl" | "en" | "ru" | "de";

export const localeNames: Record<Locale, string> = {
  sl: "Slovenščina",
  en: "English",
  ru: "Русский",
  de: "Deutsch",
};

export const localeFlags: Record<Locale, string> = {
  sl: "🇸🇮",
  en: "🇬🇧",
  ru: "🇷🇺",
  de: "🇩🇪",
};

// ─── Translations ────────────────────────────────────────────────────────────

const translations = {
  // ── Nav & Common ───────────────────────────────────────────────
  "nav.specialists": { sl: "Strokovnjaki", en: "Specialists", ru: "Специалисты", de: "Spezialisten" },
  "nav.categories": { sl: "Kategorije", en: "Categories", ru: "Категории", de: "Kategorien" },
  "nav.howItWorks": { sl: "Kako deluje", en: "How it works", ru: "Как это работает", de: "So funktioniert's" },
  "nav.login": { sl: "Prijava", en: "Log in", ru: "Войти", de: "Anmelden" },
  "nav.register": { sl: "Registracija", en: "Sign up", ru: "Регистрация", de: "Registrieren" },

  // ── Hero ───────────────────────────────────────────────────────
  "hero.label": { sl: "Tržnica strokovnih storitev", en: "Professional services marketplace", ru: "Маркетплейс профессиональных услуг", de: "Marktplatz für professionelle Dienstleistungen" },
  "hero.title": { sl: "Poiščite preverjenega strokovnjaka za vašo nalogo", en: "Find a verified specialist for your task", ru: "Найдите проверенного специалиста для вашей задачи", de: "Finden Sie einen verifizierten Spezialisten für Ihre Aufgabe" },
  "hero.subtitle": { sl: "Odvetniki, finančniki, oblikovalci, tržniki — vse na enem mestu. Varne transakcije, pregledne ocene, zagotovljena kakovost.", en: "Lawyers, financiers, designers, marketers — all in one place. Secure transactions, transparent reviews, guaranteed quality.", ru: "Юристы, финансисты, дизайнеры, маркетологи — все в одном месте. Безопасные сделки, прозрачные отзывы, гарантия качества.", de: "Anwälte, Finanzberater, Designer, Vermarkter — alles an einem Ort. Sichere Transaktionen, transparente Bewertungen, garantierte Qualität." },
  "hero.searchPlaceholder": { sl: "Koga iščete? Npr.: odvetnik, oblikovalec...", en: "Who are you looking for? E.g.: lawyer, designer...", ru: "Кого вы ищете? Напр.: юрист, дизайнер...", de: "Wen suchen Sie? Z.B.: Anwalt, Designer..." },
  "hero.searchBtn": { sl: "Poišči", en: "Search", ru: "Найти", de: "Suchen" },
  "hero.specialists": { sl: "strokovnjakov", en: "specialists", ru: "специалистов", de: "Spezialisten" },
  "hero.projects": { sl: "projektov", en: "projects", ru: "проектов", de: "Projekte" },
  "hero.avgRating": { sl: "povprečna ocena", en: "average rating", ru: "средний рейтинг", de: "Durchschnittsbewertung" },

  // ── How it works ───────────────────────────────────────────────
  "howItWorks.label": { sl: "Kako deluje", en: "How it works", ru: "Как это работает", de: "So funktioniert's" },
  "howItWorks.title": { sl: "Trije preprosti koraki", en: "Three simple steps", ru: "Три простых шага", de: "Drei einfache Schritte" },
  "howItWorks.step1.title": { sl: "Poiščite strokovnjaka", en: "Find a specialist", ru: "Найдите специалиста", de: "Finden Sie einen Spezialisten" },
  "howItWorks.step1.desc": { sl: "Uporabite iskanje in filtre, da najdete ustreznega strokovnjaka iz preverjenega kataloga.", en: "Use search and filters to find the right professional from a verified catalog.", ru: "Используйте поиск и фильтры, чтобы найти подходящего профессионала из проверенного каталога.", de: "Nutzen Sie Suche und Filter, um den richtigen Fachmann aus einem verifizierten Katalog zu finden." },
  "howItWorks.step2.title": { sl: "Pogovorite se o nalogi", en: "Discuss the task", ru: "Обсудите задачу", de: "Besprechen Sie die Aufgabe" },
  "howItWorks.step2.desc": { sl: "Kontaktirajte strokovnjaka prek vgrajenega klepeta, razpravljajte o podrobnostih in se dogovorite o pogojih.", en: "Contact the specialist via built-in chat, discuss details and agree on terms.", ru: "Свяжитесь со специалистом через встроенный чат, обсудите детали и согласуйте условия.", de: "Kontaktieren Sie den Spezialisten über den integrierten Chat, besprechen Sie Details und vereinbaren Sie Bedingungen." },
  "howItWorks.step3.title": { sl: "Dobite rezultat", en: "Get results", ru: "Получите результат", de: "Erhalten Sie Ergebnisse" },
  "howItWorks.step3.desc": { sl: "Plačajte varno prek platforme. Sredstva se izvajalcu nakažejo šele po vaši potrditvi.", en: "Pay securely through the platform. Funds are transferred to the specialist only after your confirmation.", ru: "Оплатите безопасно через платформу. Средства переводятся исполнителю только после вашего подтверждения.", de: "Zahlen Sie sicher über die Plattform. Die Mittel werden erst nach Ihrer Bestätigung an den Spezialisten überwiesen." },
  "howItWorks.step": { sl: "Korak", en: "Step", ru: "Шаг", de: "Schritt" },

  // ── Categories ─────────────────────────────────────────────────
  "categories.label": { sl: "Kategorije storitev", en: "Service categories", ru: "Категории услуг", de: "Dienstkategorien" },
  "categories.title": { sl: "Poiščite pravega strokovnjaka", en: "Find the right specialist", ru: "Найдите нужного специалиста", de: "Finden Sie den richtigen Spezialisten" },
  "categories.specialists": { sl: "strokovnjakov", en: "specialists", ru: "специалистов", de: "Spezialisten" },
  "cat.law": { sl: "Pravo", en: "Law", ru: "Юриспруденция", de: "Recht" },
  "cat.finance": { sl: "Finance in računovodstvo", en: "Finance & Accounting", ru: "Финансы и бухгалтерия", de: "Finanzen & Buchhaltung" },
  "cat.design": { sl: "Oblikovanje", en: "Design", ru: "Дизайн", de: "Design" },
  "cat.marketing": { sl: "Trženje", en: "Marketing", ru: "Маркетинг", de: "Marketing" },
  "cat.it": { sl: "IT in razvoj", en: "IT & Development", ru: "IT и Разработка", de: "IT & Entwicklung" },
  "cat.consulting": { sl: "Svetovanje", en: "Consulting", ru: "Консалтинг", de: "Beratung" },
  "cat.hr": { sl: "Kadri in zaposlovanje", en: "HR & Recruiting", ru: "HR и Рекрутинг", de: "HR & Recruiting" },
  "cat.translation": { sl: "Prevajanje", en: "Translation", ru: "Переводы", de: "Übersetzung" },

  // ── Top Specialists ────────────────────────────────────────────
  "topSpecs.label": { sl: "Najboljši strokovnjaki", en: "Top specialists", ru: "Топ специалистов", de: "Top-Spezialisten" },
  "topSpecs.title": { sl: "Najboljši profesionalci", en: "Best professionals", ru: "Лучшие профессионалы", de: "Beste Fachleute" },
  "topSpecs.viewAll": { sl: "Vsi strokovnjaki", en: "All specialists", ru: "Все специалисты", de: "Alle Spezialisten" },

  // ── Testimonials ───────────────────────────────────────────────
  "testimonials.label": { sl: "Ocene", en: "Reviews", ru: "Отзывы", de: "Bewertungen" },
  "testimonials.title": { sl: "Kaj pravijo naše stranke", en: "What our clients say", ru: "Что говорят наши клиенты", de: "Was unsere Kunden sagen" },

  // ── CTA ────────────────────────────────────────────────────────
  "cta.title": { sl: "Pripravljeni začeti?", en: "Ready to start?", ru: "Готовы начать?", de: "Bereit anzufangen?" },
  "cta.subtitle": { sl: "Pridružite se tisočim profesionalcem in strankam na HELPH", en: "Join thousands of professionals and clients on HELPH", ru: "Присоединяйтесь к тысячам профессионалов и клиентов на HELPH", de: "Schließen Sie sich Tausenden von Fachleuten und Kunden auf HELPH an" },
  "cta.findSpecialist": { sl: "Poišči strokovnjaka", en: "Find a specialist", ru: "Найти специалиста", de: "Spezialisten finden" },
  "cta.becomeSpecialist": { sl: "Postani strokovnjak", en: "Become a specialist", ru: "Стать специалистом", de: "Spezialist werden" },

  // ── Footer ─────────────────────────────────────────────────────
  "footer.description": { sl: "Tržnica preverjenih strokovnjakov. Zaupanje, kakovost, rezultat.", en: "Marketplace of verified specialists. Trust, quality, results.", ru: "Маркетплейс проверенных специалистов. Доверие, качество, результат.", de: "Marktplatz verifizierter Spezialisten. Vertrauen, Qualität, Ergebnisse." },
  "footer.platform": { sl: "Platforma", en: "Platform", ru: "Платформа", de: "Plattform" },
  "footer.findSpecialist": { sl: "Poišči strokovnjaka", en: "Find a specialist", ru: "Найти специалиста", de: "Spezialisten finden" },
  "footer.becomeSpecialist": { sl: "Postani strokovnjak", en: "Become a specialist", ru: "Стать специалистом", de: "Spezialist werden" },
  "footer.serviceCategories": { sl: "Kategorije storitev", en: "Service categories", ru: "Категории услуг", de: "Dienstkategorien" },
  "footer.company": { sl: "Podjetje", en: "Company", ru: "Компания", de: "Unternehmen" },
  "footer.about": { sl: "O nas", en: "About us", ru: "О нас", de: "Über uns" },
  "footer.blog": { sl: "Blog", en: "Blog", ru: "Блог", de: "Blog" },
  "footer.support": { sl: "Podpora", en: "Support", ru: "Поддержка", de: "Support" },
  "footer.legal": { sl: "Pravne informacije", en: "Legal", ru: "Правовая информация", de: "Rechtliches" },
  "footer.terms": { sl: "Pogoji uporabe", en: "Terms of use", ru: "Условия использования", de: "Nutzungsbedingungen" },
  "footer.privacy": { sl: "Politika zasebnosti", en: "Privacy policy", ru: "Политика конфиденциальности", de: "Datenschutz" },
  "footer.cookie": { sl: "Piškotki", en: "Cookies", ru: "Cookie", de: "Cookies" },
  "footer.rights": { sl: "Vse pravice pridržane.", en: "All rights reserved.", ru: "Все права защищены.", de: "Alle Rechte vorbehalten." },

  // ── Catalog ────────────────────────────────────────────────────
  "catalog.home": { sl: "Domov", en: "Home", ru: "Главная", de: "Startseite" },
  "catalog.title": { sl: "Strokovnjaki", en: "Specialists", ru: "Специалисты", de: "Spezialisten" },
  "catalog.found": { sl: "najdeno", en: "found", ru: "найдено", de: "gefunden" },
  "catalog.searchPlaceholder": { sl: "Iskanje...", en: "Search...", ru: "Поиск...", de: "Suche..." },
  "catalog.categories": { sl: "Kategorije", en: "Categories", ru: "Категории", de: "Kategorien" },
  "catalog.rating": { sl: "Ocena", en: "Rating", ru: "Рейтинг", de: "Bewertung" },
  "catalog.ratingFrom": { sl: "od", en: "from", ru: "от", de: "ab" },
  "catalog.andAbove": { sl: "in več", en: "and above", ru: "и выше", de: "und höher" },
  "catalog.verifiedOnly": { sl: "Samo preverjeni", en: "Verified only", ru: "Только верифицированные", de: "Nur verifizierte" },
  "catalog.resetFilters": { sl: "Ponastavi filtre", en: "Reset filters", ru: "Сбросить фильтры", de: "Filter zurücksetzen" },
  "catalog.filters": { sl: "Filtri", en: "Filters", ru: "Фильтры", de: "Filter" },
  "catalog.sortRating": { sl: "Po oceni", en: "By rating", ru: "По рейтингу", de: "Nach Bewertung" },
  "catalog.sortPrice": { sl: "Po ceni", en: "By price", ru: "По цене", de: "Nach Preis" },
  "catalog.sortNew": { sl: "Novi", en: "New", ru: "Новые", de: "Neu" },
  "catalog.nothingFound": { sl: "Ni zadetkov", en: "Nothing found", ru: "Ничего не найдено", de: "Nichts gefunden" },
  "catalog.tryOtherQuery": { sl: "Poskusite z drugim iskalnim nizom ali ponastavite filtre", en: "Try a different query or reset filters", ru: "Попробуйте другой запрос или сбросьте фильтры", de: "Versuchen Sie eine andere Suche oder setzen Sie die Filter zurück" },

  // ── Specialist card ────────────────────────────────────────────
  "specialist.verified": { sl: "Preverjen", en: "Verified", ru: "Верифицирован", de: "Verifiziert" },
  "specialist.from": { sl: "od", en: "from", ru: "от", de: "ab" },
  "specialist.details": { sl: "Podrobnosti", en: "Details", ru: "Подробнее", de: "Details" },
  "specialist.online": { sl: "Na voljo", en: "Online", ru: "Онлайн", de: "Online" },
  "specialist.offline": { sl: "Nedosegljiv", en: "Offline", ru: "Офлайн", de: "Offline" },
  "specialist.contact": { sl: "Kontakt", en: "Contact", ru: "Связаться", de: "Kontaktieren" },
  "specialist.priceFrom": { sl: "Cena od", en: "Price from", ru: "Цена от", de: "Preis ab" },
  "specialist.responseTime": { sl: "Odzivni čas", en: "Response time", ru: "Время ответа", de: "Antwortzeit" },
  "specialist.hours": { sl: "ur", en: "h", ru: "ч", de: "Std" },
  "specialist.completedOrders": { sl: "Opravljenih naročil", en: "Completed orders", ru: "Выполнено заказов", de: "Abgeschlossene Aufträge" },
  "specialist.status": { sl: "Status", en: "Status", ru: "Статус", de: "Status" },
  "specialist.services": { sl: "Storitve", en: "Services", ru: "Услуги", de: "Dienstleistungen" },
  "specialist.reviews": { sl: "Ocene", en: "Reviews", ru: "Отзывы", de: "Bewertungen" },
  "specialist.order": { sl: "Naroči", en: "Order", ru: "Заказать", de: "Bestellen" },
  "specialist.days": { sl: "dni", en: "days", ru: "дн.", de: "Tage" },
  "specialist.perHour": { sl: "/ uro", en: "/ hour", ru: "/ час", de: "/ Stunde" },
  "specialist.escrow": { sl: "Varno poslovanje prek escrow računa. Plačilo se izvajalcu nakaže šele po vaši potrditvi.", en: "Secure transaction via escrow. Payment is transferred to the specialist only after your confirmation.", ru: "Безопасная сделка через эскроу. Оплата переводится исполнителю после вашего подтверждения.", de: "Sichere Transaktion über Treuhand. Die Zahlung wird erst nach Ihrer Bestätigung an den Spezialisten überwiesen." },

  // ── Auth ───────────────────────────────────────────────────────
  "auth.loginTitle": { sl: "Prijava v račun", en: "Log in to your account", ru: "Войти в аккаунт", de: "In Ihr Konto einloggen" },
  "auth.loginSubtitle": { sl: "Dobrodošli! Vnesite podatke za prijavo.", en: "Welcome! Enter your login details.", ru: "Добро пожаловать! Введите данные для входа.", de: "Willkommen! Geben Sie Ihre Anmeldedaten ein." },
  "auth.loginGoogle": { sl: "Prijava z Google", en: "Log in with Google", ru: "Войти через Google", de: "Mit Google anmelden" },
  "auth.or": { sl: "ali", en: "or", ru: "или", de: "oder" },
  "auth.email": { sl: "E-pošta", en: "E-mail", ru: "E-mail", de: "E-Mail" },
  "auth.password": { sl: "Geslo", en: "Password", ru: "Пароль", de: "Passwort" },
  "auth.passwordPlaceholder": { sl: "Vnesite geslo", en: "Enter password", ru: "Введите пароль", de: "Passwort eingeben" },
  "auth.rememberMe": { sl: "Zapomni si me", en: "Remember me", ru: "Запомнить", de: "Angemeldet bleiben" },
  "auth.forgotPassword": { sl: "Pozabljeno geslo?", en: "Forgot password?", ru: "Забыли пароль?", de: "Passwort vergessen?" },
  "auth.loginBtn": { sl: "Prijava", en: "Log in", ru: "Войти", de: "Anmelden" },
  "auth.noAccount": { sl: "Nimate računa?", en: "Don't have an account?", ru: "Нет аккаунта?", de: "Kein Konto?" },
  "auth.registerLink": { sl: "Registrirajte se", en: "Sign up", ru: "Зарегистрироваться", de: "Registrieren" },
  "auth.registerTitle": { sl: "Ustvarite račun", en: "Create an account", ru: "Создать аккаунт", de: "Konto erstellen" },
  "auth.registerSubtitle": { sl: "Pridružite se HELPH — brezplačno", en: "Join HELPH — it's free", ru: "Присоединяйтесь к HELPH — это бесплатно", de: "Treten Sie HELPH bei — es ist kostenlos" },
  "auth.registerGoogle": { sl: "Registracija z Google", en: "Sign up with Google", ru: "Регистрация через Google", de: "Mit Google registrieren" },
  "auth.firstName": { sl: "Ime", en: "First name", ru: "Имя", de: "Vorname" },
  "auth.lastName": { sl: "Priimek", en: "Last name", ru: "Фамилия", de: "Nachname" },
  "auth.passwordMin": { sl: "Najmanj 8 znakov", en: "At least 8 characters", ru: "Минимум 8 символов", de: "Mindestens 8 Zeichen" },
  "auth.termsAgree": { sl: "Sprejemam", en: "I accept the", ru: "Я принимаю", de: "Ich akzeptiere die" },
  "auth.termsLink": { sl: "pogoje uporabe", en: "terms of use", ru: "условия использования", de: "Nutzungsbedingungen" },
  "auth.and": { sl: "in", en: "and", ru: "и", de: "und" },
  "auth.privacyLink": { sl: "politiko zasebnosti", en: "privacy policy", ru: "политику конфиденциальности", de: "Datenschutzrichtlinie" },
  "auth.createAccount": { sl: "Ustvari račun", en: "Create account", ru: "Создать аккаунт", de: "Konto erstellen" },
  "auth.hasAccount": { sl: "Že imate račun?", en: "Already have an account?", ru: "Уже есть аккаунт?", de: "Bereits ein Konto?" },
  "auth.loginLink": { sl: "Prijavite se", en: "Log in", ru: "Войти", de: "Anmelden" },

  // ── Onboarding ─────────────────────────────────────────────────
  "onboarding.stepOf": { sl: "od", en: "of", ru: "из", de: "von" },
  "onboarding.step": { sl: "Korak", en: "Step", ru: "Шаг", de: "Schritt" },
  "onboarding.skip": { sl: "Preskoči", en: "Skip", ru: "Пропустить", de: "Überspringen" },
  "onboarding.continue": { sl: "Nadaljuj", en: "Continue", ru: "Продолжить", de: "Weiter" },
  "onboarding.back": { sl: "Nazaj", en: "Back", ru: "Назад", de: "Zurück" },

  "onboarding.role.title": { sl: "Kdo ste?", en: "Who are you?", ru: "Кто вы?", de: "Wer sind Sie?" },
  "onboarding.role.subtitle": { sl: "Od vaše izbire je odvisno, katere možnosti bodo na voljo", en: "Your choice determines which features will be available", ru: "От вашего выбора зависит, какие возможности будут доступны", de: "Ihre Wahl bestimmt, welche Funktionen verfügbar sind" },
  "onboarding.role.client": { sl: "Iščem strokovnjaka", en: "I'm looking for a specialist", ru: "Я ищу специалиста", de: "Ich suche einen Spezialisten" },
  "onboarding.role.clientDesc": { sl: "Želim najti strokovnjaka za rešitev moje naloge", en: "I want to find a professional to solve my task", ru: "Хочу найти профессионала для решения своей задачи", de: "Ich möchte einen Fachmann für meine Aufgabe finden" },
  "onboarding.role.specialist": { sl: "Sem strokovnjak", en: "I'm a specialist", ru: "Я специалист", de: "Ich bin Spezialist" },
  "onboarding.role.specialistDesc": { sl: "Želim ponujati svoje storitve in najti stranke", en: "I want to offer my services and find clients", ru: "Хочу предлагать свои услуги и находить клиентов", de: "Ich möchte meine Dienste anbieten und Kunden finden" },

  "onboarding.profile.title": { sl: "Povejte o sebi", en: "Tell us about yourself", ru: "Расскажите о себе", de: "Erzählen Sie uns von sich" },
  "onboarding.profile.subtitle": { sl: "Te informacije bodo prikazane v vašem profilu", en: "This information will be displayed in your profile", ru: "Эта информация будет отображаться в вашем профиле", de: "Diese Informationen werden in Ihrem Profil angezeigt" },
  "onboarding.profile.uploadPhoto": { sl: "Naloži fotografijo", en: "Upload photo", ru: "Загрузить фото", de: "Foto hochladen" },
  "onboarding.profile.photoFormat": { sl: "JPG, PNG do 5 MB", en: "JPG, PNG up to 5 MB", ru: "JPG, PNG до 5 MB", de: "JPG, PNG bis 5 MB" },
  "onboarding.profile.bio": { sl: "O meni", en: "About me", ru: "О себе", de: "Über mich" },
  "onboarding.profile.bioPlaceholder": { sl: "Na kratko povejte o sebi in svojih izkušnjah...", en: "Briefly tell us about yourself and your experience...", ru: "Расскажите коротко о себе и вашем опыте...", de: "Erzählen Sie kurz von sich und Ihrer Erfahrung..." },
  "onboarding.profile.specialization": { sl: "Specializacija", en: "Specialization", ru: "Специализация", de: "Spezialisierung" },
  "onboarding.profile.specPlaceholder": { sl: "Npr.: UX/UI oblikovalec", en: "E.g.: UX/UI designer", ru: "Например: UX/UI дизайнер", de: "Z.B.: UX/UI Designer" },
  "onboarding.profile.skills": { sl: "Ključne veščine", en: "Key skills", ru: "Ключевые навыки", de: "Schlüsselkompetenzen" },
  "onboarding.profile.addSkill": { sl: "Dodaj veščino...", en: "Add a skill...", ru: "Добавить навык...", de: "Fähigkeit hinzufügen..." },

  "onboarding.service.title": { sl: "Dodajte prvo storitev", en: "Add your first service", ru: "Добавьте первую услугу", de: "Fügen Sie Ihren ersten Service hinzu" },
  "onboarding.service.subtitle": { sl: "Pokažite strankam, kaj lahko ponudite", en: "Show clients what you can offer", ru: "Покажите клиентам, что вы можете предложить", de: "Zeigen Sie Kunden, was Sie anbieten können" },
  "onboarding.service.name": { sl: "Ime storitve", en: "Service name", ru: "Название услуги", de: "Dienstleistungsname" },
  "onboarding.service.namePlaceholder": { sl: "Npr.: Oblikovanje logotipa", en: "E.g.: Logo design", ru: "Напр.: Разработка логотипа", de: "Z.B.: Logo-Design" },
  "onboarding.service.category": { sl: "Kategorija", en: "Category", ru: "Категория", de: "Kategorie" },
  "onboarding.service.selectCategory": { sl: "Izberite kategorijo", en: "Select category", ru: "Выберите категорию", de: "Kategorie wählen" },
  "onboarding.service.price": { sl: "Cena (€)", en: "Price (€)", ru: "Цена (₽)", de: "Preis (€)" },
  "onboarding.service.deadline": { sl: "Rok (dni)", en: "Deadline (days)", ru: "Срок (дней)", de: "Frist (Tage)" },
  "onboarding.service.description": { sl: "Opis", en: "Description", ru: "Описание", de: "Beschreibung" },
  "onboarding.service.descPlaceholder": { sl: "Na kratko opišite, kaj vključuje storitev...", en: "Briefly describe what the service includes...", ru: "Коротко опишите, что входит в услугу...", de: "Beschreiben Sie kurz, was der Service beinhaltet..." },
  "onboarding.service.skipLater": { sl: "Preskočim, dodam pozneje", en: "Skip, I'll add later", ru: "Пропустить, добавлю позже", de: "Überspringen, füge ich später hinzu" },

  "onboarding.verify.title": { sl: "Verifikacija", en: "Verification", ru: "Верификация", de: "Verifizierung" },
  "onboarding.verify.subtitle": { sl: "Potrdite vaš e-poštni naslov in pridobite značko zaupanja", en: "Confirm your email and get a trust badge", ru: "Подтвердите ваш e-mail и получите бейдж доверия", de: "Bestätigen Sie Ihre E-Mail und erhalten Sie ein Vertrauensabzeichen" },
  "onboarding.verify.emailTitle": { sl: "Potrditev e-pošte", en: "Email confirmation", ru: "Подтверждение e-mail", de: "E-Mail-Bestätigung" },
  "onboarding.verify.emailSent": { sl: "Poslali smo kodo za potrditev na", en: "We sent a confirmation code to", ru: "Мы отправили код подтверждения на", de: "Wir haben einen Bestätigungscode gesendet an" },
  "onboarding.verify.enterCode": { sl: "Vnesite kodo", en: "Enter code", ru: "Введите код", de: "Code eingeben" },
  "onboarding.verify.confirm": { sl: "Potrdi", en: "Confirm", ru: "Подтвердить", de: "Bestätigen" },
  "onboarding.verify.docTitle": { sl: "Verifikacija dokumenta", en: "Document verification", ru: "Верификация документа", de: "Dokumentenverifizierung" },
  "onboarding.verify.optional": { sl: "neobvezno", en: "optional", ru: "опционально", de: "optional" },
  "onboarding.verify.docDesc": { sl: "Naložite dokument, ki potrjuje vašo kvalifikacijo. Pridobite značko »Preverjen« in višjo pozicijo v iskanju.", en: "Upload a document confirming your qualification. Get a \"Verified\" badge and higher search ranking.", ru: "Загрузите документ, подтверждающий вашу квалификацию. Получите бейдж «Верифицирован» и повышенную позицию в поиске.", de: "Laden Sie ein Dokument hoch, das Ihre Qualifikation bestätigt. Erhalten Sie ein \"Verifiziert\"-Abzeichen und ein höheres Suchranking." },
  "onboarding.verify.dragDrop": { sl: "Povlecite datoteko ali kliknite za nalaganje", en: "Drag a file or click to upload", ru: "Перетащите файл или нажмите для загрузки", de: "Datei ziehen oder zum Hochladen klicken" },
  "onboarding.verify.fileFormat": { sl: "PDF, JPG do 10 MB", en: "PDF, JPG up to 10 MB", ru: "PDF, JPG до 10 MB", de: "PDF, JPG bis 10 MB" },
  "onboarding.verify.processing": { sl: "Obdelava traja 24–48 ur", en: "Processing takes 24-48 hours", ru: "Обработка занимает 24-48 часов", de: "Bearbeitung dauert 24-48 Stunden" },

  "onboarding.welcome.title": { sl: "Dobrodošli v HELPH!", en: "Welcome to HELPH!", ru: "Добро пожаловать в HELPH!", de: "Willkommen bei HELPH!" },
  "onboarding.welcome.subtitle": { sl: "Vaš profil je ustvarjen. Zdaj lahko začnete delati na platformi.", en: "Your profile is created. You can now start working on the platform.", ru: "Ваш профиль создан. Теперь вы можете начать работу на платформе.", de: "Ihr Profil wurde erstellt. Sie können jetzt auf der Plattform arbeiten." },
  "onboarding.welcome.findSpecialist": { sl: "Poišči strokovnjaka", en: "Find a specialist", ru: "Найти специалиста", de: "Spezialisten finden" },
  "onboarding.welcome.openProfile": { sl: "Odpri moj profil", en: "Open my profile", ru: "Открыть мой профиль", de: "Mein Profil öffnen" },

  // ── Dashboard ──────────────────────────────────────────────────
  "dash.overview": { sl: "Pregled", en: "Overview", ru: "Обзор", de: "Übersicht" },
  "dash.orders": { sl: "Naročila", en: "Orders", ru: "Заказы", de: "Aufträge" },
  "dash.messages": { sl: "Sporočila", en: "Messages", ru: "Сообщения", de: "Nachrichten" },
  "dash.services": { sl: "Storitve", en: "Services", ru: "Услуги", de: "Dienstleistungen" },
  "dash.profile": { sl: "Profil", en: "Profile", ru: "Профиль", de: "Profil" },
  "dash.settings": { sl: "Nastavitve", en: "Settings", ru: "Настройки", de: "Einstellungen" },
  "dash.hello": { sl: "Živjo", en: "Hello", ru: "Привет", de: "Hallo" },
  "dash.activeOrders": { sl: "Aktivna naročila", en: "Active orders", ru: "Активные заказы", de: "Aktive Aufträge" },
  "dash.monthlyIncome": { sl: "Prihodek ta mesec", en: "Monthly income", ru: "Доход за месяц", de: "Monatseinkommen" },
  "dash.profileViews": { sl: "Ogledi profila", en: "Profile views", ru: "Просмотры профиля", de: "Profilaufrufe" },
  "dash.recentOrders": { sl: "Zadnja naročila", en: "Recent orders", ru: "Последние заказы", de: "Letzte Aufträge" },
  "dash.allOrders": { sl: "Vsa naročila", en: "All orders", ru: "Все заказы", de: "Alle Aufträge" },
  "dash.all": { sl: "Vse", en: "All", ru: "Все", de: "Alle" },
  "dash.updateProfile": { sl: "Posodobi profil", en: "Update profile", ru: "Обновить профиль", de: "Profil aktualisieren" },
  "dash.addService": { sl: "Dodaj storitev", en: "Add service", ru: "Добавить услугу", de: "Service hinzufügen" },
  "dash.statusNew": { sl: "Novo", en: "New", ru: "Новый", de: "Neu" },
  "dash.statusInProgress": { sl: "V delu", en: "In progress", ru: "В работе", de: "In Bearbeitung" },
  "dash.statusCompleted": { sl: "Zaključeno", en: "Completed", ru: "Завершён", de: "Abgeschlossen" },

  // ── Client Dashboard ──────────────────────────────────────────
  "client.overview": { sl: "Pregled", en: "Overview", ru: "Обзор", de: "Übersicht" },
  "client.myOrders": { sl: "Moja naročila", en: "My orders", ru: "Мои заказы", de: "Meine Aufträge" },
  "client.messages": { sl: "Sporočila", en: "Messages", ru: "Сообщения", de: "Nachrichten" },
  "client.favorites": { sl: "Priljubljeni", en: "Favorites", ru: "Избранное", de: "Favoriten" },
  "client.profile": { sl: "Profil", en: "Profile", ru: "Профиль", de: "Profil" },
  "client.settings": { sl: "Nastavitve", en: "Settings", ru: "Настройки", de: "Einstellungen" },
  "client.hello": { sl: "Živjo", en: "Hello", ru: "Привет", de: "Hallo" },
  "client.activeOrders": { sl: "Aktivna naročila", en: "Active orders", ru: "Активные заказы", de: "Aktive Aufträge" },
  "client.totalSpent": { sl: "Skupna poraba", en: "Total spent", ru: "Всего потрачено", de: "Gesamtausgaben" },
  "client.savedSpecs": { sl: "Shranjeni strokovnjaki", en: "Saved specialists", ru: "Сохранённые специалисты", de: "Gespeicherte Spezialisten" },
  "client.reviewsLeft": { sl: "Napisani odzivi", en: "Reviews left", ru: "Оставлено отзывов", de: "Abgegebene Bewertungen" },
  "client.recentOrders": { sl: "Zadnja naročila", en: "Recent orders", ru: "Последние заказы", de: "Letzte Aufträge" },
  "client.allOrders": { sl: "Vsa naročila", en: "All orders", ru: "Все заказы", de: "Alle Aufträge" },
  "client.findSpecialist": { sl: "Poišči strokovnjaka", en: "Find specialist", ru: "Найти специалиста", de: "Spezialisten finden" },
  "client.newOrder": { sl: "Novo naročilo", en: "New order", ru: "Новый заказ", de: "Neuer Auftrag" },
  "client.recommended": { sl: "Priporočeni strokovnjaki", en: "Recommended specialists", ru: "Рекомендуемые специалисты", de: "Empfohlene Spezialisten" },
  "client.viewAll": { sl: "Poglej vse", en: "View all", ru: "Смотреть все", de: "Alle anzeigen" },
  "client.statusPending": { sl: "Čaka", en: "Pending", ru: "Ожидание", de: "Ausstehend" },
  "client.statusInProgress": { sl: "V delu", en: "In progress", ru: "В работе", de: "In Bearbeitung" },
  "client.statusCompleted": { sl: "Zaključeno", en: "Completed", ru: "Завершён", de: "Abgeschlossen" },
  "client.statusReview": { sl: "Čaka na odziv", en: "Awaiting review", ru: "Ожидает отзыв", de: "Wartet auf Bewertung" },

  // ── Specialist Dashboard extras ───────────────────────────────
  "dash.completedOrders": { sl: "Zaključena naročila", en: "Completed orders", ru: "Выполненные заказы", de: "Abgeschlossene Aufträge" },
  "dash.responseTime": { sl: "Čas odziva", en: "Response time", ru: "Время ответа", de: "Antwortzeit" },
  "dash.myServices": { sl: "Moje storitve", en: "My services", ru: "Мои услуги", de: "Meine Dienstleistungen" },
  "dash.editService": { sl: "Uredi", en: "Edit", ru: "Редактировать", de: "Bearbeiten" },
  "dash.calendar": { sl: "Koledar", en: "Calendar", ru: "Календарь", de: "Kalender" },
  "dash.analytics": { sl: "Analitika", en: "Analytics", ru: "Аналитика", de: "Analytik" },
  "dash.totalEarned": { sl: "Skupni zaslužek", en: "Total earned", ru: "Всего заработано", de: "Gesamtverdienst" },
  "dash.repeatClients": { sl: "Ponovne stranke", en: "Repeat clients", ru: "Повторные клиенты", de: "Stammkunden" },
} as const;

type TranslationKey = keyof typeof translations;

// ─── Context ─────────────────────────────────────────────────────────────────

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("sl");

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") localStorage.setItem("helph-locale", l);
  }, []);

  const t = useCallback(
    (key: TranslationKey) => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[locale] || entry["sl"] || key;
    },
    [locale],
  );

  // Restore saved locale on mount
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("helph-locale") as Locale | null;
    if (saved && saved !== locale && localeNames[saved]) {
      // Use setTimeout to avoid state update during render
      setTimeout(() => setLocaleState(saved), 0);
    }
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
