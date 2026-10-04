import type { Dictionary } from "./index";

const uz: Dictionary = {
  meta: {
    title: "CaravanHouse — Oʻzbekistondagi biznes uchun Telegram-botlar, saytlar va Mini Apps",
    description:
      "Oʻzbekistondagi kichik va oʻrta biznes uchun Telegram-botlar, lendinglar, korporativ saytlar va Telegram Mini Apps ishlab chiqamiz. Qatʼiy narx, aniq muddat va ishga tushirilgandan keyin qoʻllab-quvvatlash.",
    ogAlt: "CaravanHouse — Telegram-botlar, saytlar va Mini Apps",
    ogTagline: "Telegram-botlar, saytlar va Mini\u00a0Apps —",
    ogTaglineAccent: "mijoz olib keladigan yechimlar",
    ogFooter: "Oʻzbekistondagi biznes uchun",
  },
  a11y: {
    skipToContent: "Asosiy mazmunga oʻtish",
    home: "CaravanHouse — bosh sahifa",
    openMenu: "Menyuni ochish",
    closeMenu: "Menyuni yopish",
    mainNav: "Asosiy navigatsiya",
    language: "Sayt tili",
    opensInTelegram: "Telegramda ochiladi",
  },
  nav: {
    services: "Xizmatlar",
    process: "Qanday ishlaymiz",
    projects: "Loyihalar",
    prices: "Narxlar",
    faq: "Savollar",
    contacts: "Aloqa",
  },
  cta: {
    telegram: "Telegramda yozish",
    telegramShort: "Yozish",
  },
  hero: {
    badge: "Oʻzbekistondagi biznes uchun IT-studiya",
    titleBefore: "",
    titleAccent: "Mijoz olib keladigan",
    titleAfter: " Telegram-botlar, saytlar va Mini\u00a0Apps yaratamiz",
    subtitle:
      "Vazifani toʻliq oʻz zimmamizga olamiz: gʻoya va dizayndan tortib ishga tushirish va qoʻllab-quvvatlashgacha. Siz shunchaki chiroyli rasm emas, balki ishlaydigan savdo vositasini olasiz.",
    primary: "Loyihani muhokama qilish",
    secondary: "Narxni 1 daqiqada hisoblang",
    points: ["Bepul maslahat", "Boshlashdan oldin qatʼiy narx", "Ishga tushgandan keyin yordam"],
    mockup: {
      botName: "CaravanHouse Bot",
      botStatus: "bot",
      typing: "yozmoqda",
      greeting: "Assalomu alaykum! Qanday yordam bera olamiz?",
      userMessage: "Ertaga yozilmoqchiman",
      botReply: "Ajoyib! Qulay vaqtni tanlang:",
      slots: ["10:00", "14:30", "18:00"],
      confirm: "Tayyor! Siz 14:30 ga yozildingiz ✓",
      orderLabel: "Yangi ariza",
      orderValue: "+1 mijoz",
    },
  },
  services: {
    eyebrow: "Xizmatlar",
    title: "Savdolaringiz uchun ishlaydigan uchta vosita",
    subtitle:
      "Bitta yoʻnalishni tanlang yoki toʻliq bogʻlamani yigʻamiz: sayt mijozni olib keladi, bot arizani qabul qiladi, Mini App sotadi.",
    includesLabel: "Nimalar kiradi",
    items: [
      {
        id: "bots",
        title: "Telegram-botlar",
        description:
          "Buyurtmalar, yozilish, savdo va mijozlarni qoʻllab-quvvatlashni 24/7 avtomatlashtiradi. Mijoz bir soniyada javob oladi, siz esa jamoaning Telegram-chatida tayyor arizani.",
        features: [
          "Buyurtma qabul qilish va onlayn yozilish",
          "Jamoa uchun holat tugmalari bilan arizalar",
          "Xabarnomalar va mijozlarni segmentlash",
          "Toʻgʻridan-toʻgʻri Telegramdagi admin panel",
        ],
      },
      {
        id: "websites",
        title: "Veb-saytlar",
        description:
          "Telefonda bir zumda ochiladigan va tashrif buyuruvchilarni arizaga aylantiradigan lendinglar, korporativ saytlar va veb-platformalar.",
        features: [
          "Reklama va aksiyalar uchun lendinglar",
          "Katalogli korporativ saytlar",
          "Veb-platformalar va shaxsiy kabinetlar",
          "SEO asosi, analitika va ikki til (RU/UZ)",
        ],
      },
      {
        id: "miniapps",
        title: "Telegram Mini Apps",
        description:
          "Toʻgʻridan-toʻgʻri Telegram ichidagi toʻlaqonli ilova: katalog, savat, buyurtmalar va shaxsiy kabinet — App Store va Google Playdan yuklab olmasdan.",
        features: [
          "Internet-doʻkon va yetkazib berish menyusi",
          "Onlayn yozilish va sodiqlik dasturlari",
          "Telegram orqali bir bosishda kirish",
          "Native ilovadan tezroq va arzonroq",
        ],
      },
    ],
    integrations: {
      title: "Texnologiyalar va integratsiyalar",
      now: "Hozir qilamiz",
      nowItems: ["Node.js + grammY asosidagi Telegram-botlar", "Next.js asosidagi veb-saytlar", "Telegram Mini Apps"],
      onRequest: "Buyurtma asosida — muddatini kelishamiz",
      onRequestItems: ["amoCRM", "Bitrix24", "Eskiz SMS", "Yetkazib berish", "AI-yordamchi", "Click va Payme orqali toʻlov"],
    },
  },
  prices: {
    eyebrow: "Narxlar",
    title: "Qancha turadi",
    subtitle: "Boshlangʻich narxlar. Aniq narxni ish boshlanishidan oldin kelishib olamiz — vazifa oʻzgarmasa, narx ham oʻzgarmaydi.",
    // {price} — calc.caravanhouse.uz kalkulyatoridagi narx (yagona manba)
    pricePattern: "{price} soʻmdan",
    items: {
      landing: { title: "Lending", note: "Reklama yoki aksiya uchun bir sahifali sayt" },
      bot: { title: "Telegram-bot", note: "Arizalar, yozilish va mijozlarga 24/7 javob" },
      corporate: { title: "Korporativ sayt", note: "Katalogli koʻp sahifali sayt" },
      miniapp: { title: "Telegram Mini App", note: "Telegram ichidagi doʻkon yoki servis" },
    },
    payment: "Toʻlov: boshlashdan oldin {pre}% oldindan toʻlov, topshirilgandan keyin {post}%. Qoʻllab-quvvatlash: birinchi oy bepul, keyin oyiga {support} soʻmdan.",
    calcCta: "Narxni 1 daqiqada hisoblang",
    calcNote: "Kalkulyator vazifangiz uchun taxminiy narx oraligʻini koʻrsatadi",
    offerTitle: "Dastlabki uchta mijozga — 15–20% chegirma",
    offerText: "Fikr-mulohaza va loyihani portfolioda koʻrsatishga ruxsat evaziga.",
  },
  advantages: {
    eyebrow: "Nega biz",
    title: "Siz xotirjam boʻlishingiz uchun ishlaymiz",
    items: [
      {
        id: "deadlines",
        title: "Muddatlarga rioya qilamiz",
        description:
          "Ishni aniq sanali bosqichlarga boʻlamiz. Har hafta natijani koʻrsatamiz — ishga tushirish qachon boʻlishini doim bilasiz.",
      },
      {
        id: "support",
        title: "Ishga tushgandan keyin yordam",
        description:
          "Topshirgandan keyin gʻoyib boʻlmaymiz: xatolarni tuzatamiz, qoʻshimcha ishlarda yordam beramiz va hammasi barqaror ishlashini kuzatamiz.",
      },
      {
        id: "tech",
        title: "Zamonaviy texnologiyalar",
        description:
          "Next.js, TypeScript, Python va Node.js. Keyinchalik oson rivojlantiriladigan tez va xavfsiz yechimlar.",
      },
      {
        id: "price",
        title: "Shaffof narx",
        description:
          "Narx va ishlar tarkibini boshlashdan oldin kelishib olamiz. Yashirin toʻlovlar va «kutilmagan» qoʻshimcha haqlar yoʻq.",
      },
    ],
  },
  process: {
    eyebrow: "Qanday ishlaymiz",
    title: "Telegramdagi xabardan ishlaydigan mahsulotgacha",
    stepLabel: "Qadam",
    steps: [
      {
        title: "Ariza",
        description: "Telegramda vazifangiz haqida bir-ikki soʻz yozasiz. Oʻsha kuniyoq javob beramiz.",
      },
      {
        title: "Muhokama va TZ",
        description:
          "15–30 daqiqalik qoʻngʻiroqda maqsadlarni aniqlaymiz va narx hamda muddatlar koʻrsatilgan tushunarli TZ tayyorlaymiz.",
      },
      {
        title: "Dizayn va ishlab chiqish",
        description:
          "Dizaynni kelishib olamiz, soʻng ishlab chiqamiz. Oraliq natijani har hafta koʻrsatamiz.",
      },
      {
        title: "Ishga tushirish",
        description:
          "Test qilamiz, joylashtiramiz, domen, toʻlov va analitikani ulaymiz. Jamoangizni oʻrgatamiz.",
      },
      {
        title: "Qoʻllab-quvvatlash",
        description:
          "Loyihani ishga tushgandan keyin ham kuzatib boramiz: tuzatishlar, yangilanishlar va biznes oʻsishi bilan yangi funksiyalar.",
      },
    ],
  },
  projects: {
    eyebrow: "Loyihalar",
    title: "Demo-loyihalar",
    subtitle:
      "Biz qiladigan ishlarning ishlaydigan namunalari: Telegramdagi doʻkon, botlar va arizalar qabul qiladigan sayt. Kartochkani bosing va oʻzingiz sinab koʻring.",
    badge: "Demo",
    askCta: "Shunga oʻxshash loyiha kerak",
    openTelegram: "Telegramda ochish",
    openWeb: "Saytni ochish",
    demoSoon: "Demo tez orada ishga tushadi",
    codeNote: "Barcha demolarning manba kodi ochiq:",
    codeLinkLabel: "GitHub CaravanHouse",
    stackLabel: "Texnologiyalar",
    // Tartib, havolalar, stek va skrinshotlar — lib/projects.ts faylida
    items: [
      {
        id: "shop-miniapp",
        category: "Telegram Mini App",
        title: "Telegramdagi gul doʻkoni",
        imageAlt: "Telegramdagi gul doʻkoni katalogi: narxli guldastalar va savat tugmasi",
        description:
          "Katalog, savat va buyurtma berish toʻgʻridan-toʻgʻri Telegramda, ilova oʻrnatmasdan. Egasi buyurtma holatini botdagi tugmalar bilan oʻzgartiradi, mijoz bildirishnomalar oladi.",
      },
      {
        id: "configurator",
        category: "Sayt + bot",
        title: "Smeta konfiguratori",
        imageAlt: "Konfigurator: funksiyalari bilan Telegram-bot tanlangan, oʻngda taxminiy narx va muddat",
        description:
          "Mijoz nima kerakligini belgilaydi va darhol taxminiy narx hamda muddatni koʻradi. Ariza Telegramga holatni boshqarish tugmalari bilan keladi.",
      },
      {
        id: "quiz-bot",
        category: "Telegram-bot",
        title: "Arizalar uchun kviz-bot",
        imageAlt: "Kviz-bot bilan chat: nimani avtomatlashtirish haqidagi savol va javob variantlari tugmalari",
        description:
          "Beshta savol: bot biznesga mos mahsulotni tavsiya qiladi, soʻng telefon raqami bilan ariza yigʻadi. Voronka /stats buyrugʻi orqali koʻrinadi.",
      },
      {
        id: "focus-garden-tg",
        category: "Mini App + bot",
        title: "Fokus bogʻi",
        imageAlt: "Fokus bogʻi: oʻsayotgan archa tasvirlangan taymer va vazifalar roʻyxati",
        description:
          "Telegramdagi samaradorlik taymeri: ish sessiyasi davom etayotganda daraxt oʻsadi. Bot tashlab ketilgan sessiyalarni eslatadi va reyting yuritadi.",
      },
    ],
  },
  team: {
    eyebrow: "Jamoa",
    title: "CaravanHouse asoschilari",
    subtitle:
      "Har bir loyihani oʻzimiz yuritamiz: birinchi xabardan ishga tushirishgacha. Siz mahsulotingizni yaratayotganlar bilan bevosita muloqot qilasiz.",
    photoAlt: "Surat",
    // TODO: ismlar, rollar va tavsiflarni tekshiring — aniqlariga almashtiring
    members: [
      {
        id: "umid",
        name: "Umid",
        role: "Founder",
        bio: "Full Stack dasturchi: Telegram-botlar, server qismi va veb-interfeyslar.",
      },
      {
        id: "aslam",
        name: "Arslan",
        role: "Founder",
        bio: "Loyihalarni va mijozlar bilan muloqotni olib boradi, muddat va natija uchun javob beradi.",
      },
      {
        id: "behruz",
        name: "Behruz",
        role: "Founder",
        bio: "Veb-ishlab chiqish va Mini Apps interfeyslari.",
      },
    ],
  },
  faq: {
    eyebrow: "Savollar",
    title: "Koʻp beriladigan savollar",
    // Условия согласованы с командой (сроки, оплата 50/50, код и домен клиенту, хостинг у клиента).
    // {support} — narx kalkulyatordan (calc.caravanhouse.uz/api/prices)
    items: [
      {
        question: "Ishlab chiqish qancha vaqt oladi?",
        answer:
          "Oddiy bot yoki lending — 5–7 ish kunidan. Korporativ sayt — 2–4 hafta. Mini App yoki veb-platforma — 3–4 haftadan. Aniq muddatni ish boshlanishidan oldin TZda belgilaymiz.",
      },
      {
        question: "Loyiha qancha turadi?",
        answer:
          "Boshlangʻich narxlar — «Narxlar» boʻlimida, vazifangiz uchun taxminiy oraliqni esa kalkulyatorda bir daqiqada hisoblash mumkin. Qisqa muhokamadan soʻng narxni kelishib olamiz — vazifa oʻzgarmasa, narx ham oʻzgarmaydi.",
      },
      {
        question: "Ishga tushirilgandan keyin nima boʻladi?",
        answer:
          "Birinchi oy qoʻllab-quvvatlash bepul: xatolarni tuzatamiz va oʻzgartirishlar kiritamiz. Keyin — xohishingizga koʻra oyiga {support} soʻmdan qoʻllab-quvvatlash: oʻzgartirishlar va xatolarni tuzatish. Yangi funksiyalar alohida toʻlanadi.",
      },
      {
        question: "Oʻzgartirishlar kiritish mumkinmi?",
        answer:
          "Ha. Dizayn bosqichida — tasdiqlaguningizcha kerakli miqdorda. Ishlab chiqishda TZ doirasidagi tuzatishlar narxga kiradi, yangi funksiyalarni esa alohida va oldindan baholaymiz.",
      },
      {
        question: "Toʻlov qanday amalga oshiriladi?",
        answer:
          "Ikki bosqichda: boshlashdan oldin 50% oldindan toʻlov va loyiha topshirilgandan keyin 50%. Katta loyihalarni bosqichlarga boʻlish mumkin.",
      },
      {
        question: "Kod va domen kimga tegishli?",
        answer:
          "Sizga. Toʻliq toʻlovdan soʻng kod va barcha kirish maʼlumotlarini topshiramiz, domenni esa boshidanoq sizning nomingizga roʻyxatdan oʻtkazamiz.",
      },
      {
        question: "Hosting uchun kim toʻlaydi?",
        answer:
          "Hostingni oʻz akkauntingizda provayderga oʻzingiz toʻlaysiz — shunda sayt yoki bot doim sizning nazoratingizda boʻladi. Biz hammasini tanlab, sozlab beramiz.",
      },
      {
        question: "Kichik biznes bilan ishlaysizmi?",
        answer:
          "Albatta — aynan kichik va oʻrta biznes uchun ishlaymiz: doʻkonlar, salonlar, kafelar, oʻquv markazlari. Byudjetingiz va vazifangizga mos yechim tanlaymiz.",
      },
    ],
  },
  finalCta: {
    title: "Gʻoyangiz bormi? 15 daqiqada muhokama qilamiz",
    subtitle:
      "Telegramda yozing — bir nechta savol beramiz, yechim taklif qilamiz va taxminiy narxni aytamiz. Bepul va hech narsaga majburlamaydi.",
    button: "Telegramda yozish",
    orCall: "yoki qoʻngʻiroq qiling",
    or: "yoki",
    form: {
      title: "Ariza qoldirish",
      name: "Ism",
      namePlaceholder: "Sizga qanday murojaat qilaylik",
      contact: "Telefon yoki Telegram",
      contactPlaceholder: "+998… yoki @username",
      service: "Nima kerak",
      services: { bot: "Telegram-bot", site: "Sayt", miniapp: "Mini App", other: "Boshqa" },
      message: "Vazifa haqida qisqacha (ixtiyoriy)",
      submit: "Arizani yuborish",
      sending: "Yuborilmoqda…",
      success: "Rahmat! №{id} ariza yuborildi — tez orada siz bilan bogʻlanamiz.",
      successNoId: "Rahmat! Ariza yuborildi — tez orada siz bilan bogʻlanamiz.",
      errorName: "Ismingizni kiriting",
      errorContact: "Telefon yoki Telegramni kiriting",
      errorRate: "Bu qurilmadan juda koʻp ariza. Keyinroq urinib koʻring yoki Telegramda yozing.",
      errorFailed: "Yuborib boʻlmadi. Telegramda yozing yoki qoʻngʻiroq qiling — tez javob beramiz.",
      consent: "Arizani yuborib, koʻrsatilgan kontakt orqali siz bilan bogʻlanishimizga rozilik bildirasiz.",
    },
  },
  footer: {
    team: "CaravanHouse jamoasi · Toshkent",
    response: "09:00 dan 21:00 gacha ishlaymiz",
    tagline: "Oʻzbekistondagi biznes uchun Telegram-botlar, veb-saytlar va Telegram Mini Apps.",
    contactsTitle: "Aloqa",
    navTitle: "Navigatsiya",
    socialTitle: "Ijtimoiy tarmoqlar",
    rights: "Barcha huquqlar himoyalangan.",
  },
  floating: {
    label: "Telegramda yozish",
  },
};

export default uz;
