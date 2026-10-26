import type { ClaveFamilia } from "../ofertas-intl";
import type { DiccionarioVenta, TextosFamilia } from "./tipos";

// Uzbeko en escritura latina (ADR 0002, D16): un solo registro, el de soliq.uz, my.gov.uz y los bancos
// (Kapitalbank). «Siz» con las formas corteses («yuklab oling», «toʻlang», «hisobotingiz»), frases
// cortas y sin jerga. Los mercados van con "usted". oʻ y gʻ con U+02BB y la tutuq belgisi con U+02BC.
// Las cartas, en primera persona formal («soʻrayman»); la cifra va después de dos puntos, porque en
// uzbeko el verbo cierra la oración, y ningún sufijo se pega a una cifra ni a un {marcador}.
const HISOBINGIZ_UCHUN = { titulo: "Hujjatlaringiz uchun", texto: "Qoʻllangan qiymatlar sanasi bilan birga." };
const BOSHQA_SUMMALAR = { titulo: "Boshqa summalar bilan", explica: "Xuddi shu hisob-kitob, biroz kamroq va biroz koʻproq summalar bilan." };
const BOSHQA_FOIZLAR = { titulo: "Boshqa foiz stavkalari bilan", explica: "Xuddi shu raqamlar, biroz pastroq va biroz yuqoriroq foiz stavkalari bilan." };

const familias: Record<ClaveFamilia, TextosFamilia> = {
  liquidacion: {
    nombre: "Yakuniy hisob-kitob va ishdan boʻshatish nafaqasi hisoboti",
    tituloCorto: "yakuniy hisob-kitob hisoboti",
    paraQuien: "Imzolashdan oldin yakuniy hisob-kitobingiz va ishdan boʻshash bilan bogʻliq toʻlovlaringizni tekshirish yoki talab qilish uchun; oʻz raqamlaringiz va mamlakatingiz qoidalari bilan",
    descripcion: [
      "Ishdan boʻshash bilan bogʻliq har bir toʻlovni alohida koʻrsatadigan PDF hisobot: har bandda qancha olishingiz, qanday hisoblangani va qoʻllangan rasmiy qiymatlar, manbalari bilan.",
      "Imzolashdan oldingi tekshiruv roʻyxati va toʻlovni yozma talab qilish uchun summalaringiz bilan toʻldirilgan ariza ham bor.",
    ],
    gancho: "Hisob-kitobingizni yozma oling, imzolashdan oldin tekshirishga tayyor boʻlsin",
    incluye: [
      { titulo: "Har bir band hisobi bilan", texto: "Ish beruvchining taklifi bilan qatorma-qator solishtirish uchun." },
      { titulo: "Aniq rasmiy manbalar", texto: "Har bir qiymat uni eʼlon qilgan idora va biz tekshirgan sana bilan." },
      { titulo: "Foydalanishga tayyor ariza", texto: "Summalaringiz bilan toʻldirilgan, toʻlovni yozma soʻrash uchun." },
    ],
    pasos: {
      titulo: "Imzolashdan oldin",
      items: [
        "Ushbu hisobotdagi har bir bandni sizga imzolash uchun berilgan hujjat bilan solishtiring. Biror band yoʻq boʻlsa, imzolashdan oldin sababini soʻrang.",
        "Ish beruvchi qoʻllagan ish haqi va sanalar siz bu yerda kiritganlar bilan bir xil ekanini tekshiring. Ishga kirgan sana boshqacha boʻlsa, deyarli barcha summalar oʻzgaradi.",
        "Imzolagan har bir hujjatingiz nusxasini soʻrang va soʻnggi oylardagi ish haqi varaqalarini saqlab qoʻying.",
        "Farq katta boʻlsa yoki sizni ishdan boʻshatishgan boʻlsa, ushbu hisobotni mehnat huquqi boʻyicha advokatga yoki tegishli idoraga olib boring. Birinchi hisob-kitob tayyor boʻladi.",
      ],
    },
    nota: {
      titulo: "Toʻlovni talab qilish arizasi",
      uso: "Toʻldiring, imzolang va bir nusxasini oʻzingizda qoldirib topshiring. Qabul qilgan xodimdan nusxangizga sana qoʻyib imzolashini soʻrang.",
      pedido: "Mehnat munosabatlarim tugatilgani munosabati bilan menga tegishli toʻlovlarni toʻlab berishingizni soʻrayman. Ilova qilingan hisobotdagi hisob-kitobga koʻra umumiy summa:",
      cierre: "Ilova qilingan koʻchirma har bir bandni koʻrsatilgan sanada amalda boʻlgan rasmiy qiymatlar bilan hisoblangan holda koʻrsatadi. Toʻlov sanasi haqida maʼlum qilishingizni soʻrayman.",
    },
  },
  "pagos-laborales": {
    nombre: "Ish haqi toʻlovlari hisoboti",
    tituloCorto: "ish haqi toʻlovlari hisoboti",
    paraQuien: "Mukofot, taʼtil puli, qoʻshimcha ish soatlari yoki foydadagi ulushingiz toʻgʻri toʻlanganiga ishonch hosil qilish va toʻlanmagan boʻlsa farqni soʻrash uchun",
    descripcion: [
      "Hisob-kitobingizni oʻz raqamlaringiz bilan bosqichma-bosqich koʻrsatadigan PDF hisobot: qoʻllangan asos, hisoblash usuli va amaldagi rasmiy qiymatlar, manbalari bilan.",
      "Roʻyxatdagi har bir toʻlov uchun yaraydi. Ish haqi varaqangizda qanday tekshirishni koʻrsatadi va farqni yozma soʻrash uchun ariza ham bor.",
    ],
    gancho: "Bu hisob-kitobni ish haqi varaqangiz bilan solishtirish uchun yozma oling",
    incluye: [
      { titulo: "Bosqichma-bosqich hisob-kitob", texto: "Maʼlumotlaringiz va qoʻllangan har bir rasmiy qiymat bilan." },
      { titulo: "Ish haqi varaqasida nimaga qarash kerak", texto: "Toʻlov toʻgʻriligini bir daqiqada bilish uchun." },
      { titulo: "Farqni soʻrash uchun ariza", texto: "Summalaringiz bilan toʻldirilgan, topshirishga tayyor." },
    ],
    pasos: {
      titulo: "Toʻlovingizni tekshirish uchun",
      items: [
        "Bu bandni ish haqi varaqangizdan toping va ushbu hisobotdagi summa bilan solishtiring.",
        "Mos kelmasa, avval kiritgan maʼlumotlaringiz ish beruvchi qoʻllaganlar bilan bir xil ekanini tekshiring.",
        "Baribir mos kelmasa, farqni yozma soʻrash uchun quyidagi arizadan foydalaning va nusxasini saqlab qoʻying.",
      ],
    },
    nota: {
      titulo: "Toʻlovni talab qilish arizasi",
      uso: "Toʻldiring, imzolang va bir nusxasini oʻzingizda qoldirib topshiring.",
      pedido: "Ilova qilingan hisobotda batafsil koʻrsatilgan bandni toʻlab berishingizni soʻrayman. Amaldagi rasmiy qiymatlar bilan qilingan hisob-kitobga koʻra summa:",
      cierre: "Toʻlangan summa boshqacha boʻlsa, hisob-kitob qanday qilinganini yozma tushuntirib berishingizni soʻrayman.",
    },
    escenarios: { titulo: "Ish soatlaringiz oʻzgarsa", explica: "Xuddi shu hisob-kitob boshqa soatlar soni bilan; har oy qaytadan hisoblamasdan tekshirish uchun." },
  },
  impuesto: {
    nombre: "Daromad soligʻi hisoboti",
    tituloCorto: "daromad soligʻi hisoboti",
    paraQuien: "Qancha soliq ushlab qolinganini tushunish, ish haqi varaqangizni tekshirish va daromadingiz oʻzgarsa nima boʻlishini koʻrish uchun",
    descripcion: [
      "Soliq hisob-kitobingizni amaldagi rasmiy stavkalar va har bir qiymat manbasi bilan bosqichma-bosqich koʻrsatadigan PDF hisobot.",
      "Boshqa daromad darajalarida soligʻingiz jadvali ham bor. Shunda ish haqingiz oshganda yoki ish joyingizni oʻzgartirganda qoʻlingizga qancha tegishini oldindan bilasiz.",
    ],
    gancho: "Soligʻingiz izohini yozma oling; daromadingiz oʻzgarsa nima boʻlishi bilan birga",
    incluye: [
      { titulo: "Rasmiy stavkalar bilan hisob-kitob", texto: "Bosqichma-bosqich, har bir qiymat manbasi bilan." },
      { titulo: "Boshqa daromadlarda soligʻingiz", texto: "Ish haqi oshirilishi haqidagi suhbatga qoʻlingizga qancha tegishini bilib kirish uchun." },
      { titulo: "Ish haqi varaqasida nimaga qarash kerak", texto: "Ish beruvchingiz yoki buxgalteringiz bilan raqamlar asosida gaplashish uchun." },
    ],
    pasos: {
      titulo: "Soliq ushlanmasini tekshirish uchun",
      items: [
        "Ish haqi varaqangizdagi soliq ushlanmasini toping va ushbu hisobotdagi bilan solishtiring.",
        "Mos kelmasa, ish beruvchidan qaysi daromad va qaysi imtiyozlarni asos qilib olganini soʻrang.",
        "Mamlakatingizda yillik deklaratsiya topshirish kerak boʻlsa, ushbu hisobotni deklaratsiya uchun saqlab qoʻying.",
      ],
    },
    escenarios: { titulo: "Daromadingiz oʻzgarsa", explica: "Xuddi shu hisob-kitob, xuddi shu rasmiy qiymatlar bilan, biroz kamroq va biroz koʻproq daromad bilan." },
  },
  contratacion: {
    nombre: "Xodim yollash xarajatlari byudjeti",
    tituloCorto: "xodim yollash byudjeti",
    paraQuien: "Ish haqi boʻyicha kelishishdan oldin xodim yollashning barcha majburiy toʻlovlari bilan haqiqiy qiymatini bilish uchun",
    descripcion: [
      "Xodim yollashning toʻliq qiymatini band-band koʻrsatadigan PDF byudjet: ish haqi, xodim va ish beruvchi toʻlaydigan majburiy toʻlovlar hamda zaxiralar; har bir qiymat rasmiy manbasi bilan.",
      "Boshqa ish haqi darajalaridagi xarajatlar jadvali ham bor. Har bir oshirishning haqiqiy qiymatini bilib taklif bera olasiz, byudjetni hamkoringiz yoki buxgalteringiz bilan boʻlishasiz.",
    ],
    gancho: "Bu xarajatni yollash qarori uchun byudjetga aylantiring",
    incluye: [
      { titulo: "Har bir majburiy toʻlov alohida", texto: "Qoidasi va rasmiy manbasi bilan." },
      { titulo: "Boshqa ish haqlarida xarajat", texto: "Har bir oshirishning qoʻshimcha qiymatini bilib kelishish uchun." },
      { titulo: "Taqdim etishga tayyor", texto: "Hamkoringiz, buxgalteringiz yoki oʻz hujjatlaringiz uchun." },
    ],
    pasos: {
      titulo: "Xodim yollashdan oldin",
      items: [
        "Buxgalteringizdan sohangizda jamoa shartnomasi yoki umumiydan yuqori eng kam ish haqi bor-yoʻqligini soʻrang.",
        "Ushbu byudjetdagi zaxiralarni har oy ajratib boring: bular yil oxirida yoki shartnoma tugaganda birdaniga keladigan toʻlovlar.",
        "Xodimni birinchi kundan rasmiy roʻyxatdan oʻtkazing: ushbu byudjetdagi xarajat majburiy toʻlovlarni allaqachon oʻz ichiga oladi.",
      ],
    },
    escenarios: { titulo: "Boshqa ish haqlarida xarajat", explica: "Xuddi shu hisob-kitob, xuddi shu rasmiy qiymatlar bilan, pastroq va yuqoriroq ish haqi bilan." },
  },
  "ajuste-inflacion": {
    nombre: "Inflyatsiya boʻyicha qayta hisoblash xati",
    tituloCorto: "inflyatsiya boʻyicha qayta hisoblash xati",
    paraQuien: "Ijara haqi, toʻlov, xizmat haqi yoki ish haqini rasmiy indeks boʻyicha qayta hisoblashni soʻrash yoki maʼlum qilish uchun",
    descripcion: [
      "Yangilangan summangiz bilan toʻldirilgan, topshirishga tayyor xat va hisob-kitob asosi: har bir sanadagi rasmiy indeks, uni eʼlon qilgan idora va manba havolasi.",
      "Asos aniq boʻlsa, ikkinchi tomon raqamni bir daqiqada tekshiradi va gap hisob-kitob haqida emas, indeks haqida boradi.",
    ],
    gancho: "Bu qayta hisoblashni rasmiy indeksga asoslangan, yuborishga tayyor xatga aylantiring",
    incluye: [
      { titulo: "Toʻldirilgan xat", texto: "Yangilangan summangiz bilan, chop etish yoki yuborishga tayyor." },
      { titulo: "Asos sifatida rasmiy indeks", texto: "Idora, sana va manba havolasi bilan." },
      { titulo: "Ochiq hisob-kitob", texto: "Ikkinchi tomon oʻzi tekshira olishi uchun." },
    ],
    nota: {
      titulo: "Qayta hisoblash xati",
      uso: "Kelishuv tafsilotlari bilan toʻldiring va hisob-kitob koʻchirmasi bilan birga topshiring.",
      pedido: "Kelishilgan summa ilova qilingan hisob-kitobda batafsil koʻrsatilganidek, rasmiy isteʼmol narxlari indeksining oʻzgarishiga koʻra yangilanganini maʼlum qilaman. Yangilangan summa:",
      cierre: "Hisob-kitobda koʻchirmada nomi keltirilgan rasmiy idora eʼlon qilgan indeks qoʻllangan va uni koʻrsatilgan manbadan tekshirish mumkin.",
    },
  },
  regimen: {
    nombre: "Soddalashtirilgan soliq tartibi hisoboti",
    tituloCorto: "soddalashtirilgan soliq hisoboti",
    paraQuien: "Soddalashtirilgan soliq tartibida qancha toʻlashingizni va aylanmangiz oshsa yoki kamaysa nima boʻlishini bilish uchun",
    descripcion: [
      "Soddalashtirilgan tartibdagi soliq yoki majburiy toʻlovlaringizni rasmiy stavkalar va har bir qiymat manbasi bilan bosqichma-bosqich koʻrsatadigan PDF hisobot.",
      "Boshqa aylanma darajalarida qancha toʻlashingiz jadvali ham bor. Shunda boshqa toifaga oʻtishni oldindan koʻrasiz.",
    ],
    gancho: "Soliq tartibingiz hisob-kitobini yozma oling; aylanma oʻzgarsa nima boʻlishi bilan birga",
    incluye: [
      { titulo: "Rasmiy stavkalar bilan hisob-kitob", texto: "Bosqichma-bosqich, har bir qiymat manbasi bilan." },
      { titulo: "Boshqa aylanmalarda toʻlovingiz", texto: "Boshqa toifaga oʻtishni oldindan koʻrish uchun." },
      HISOBINGIZ_UCHUN,
    ],
    escenarios: { titulo: "Aylanmangiz oʻzgarsa", explica: "Xuddi shu hisob-kitob, xuddi shu rasmiy qiymatlar bilan, pastroq va yuqoriroq aylanma bilan." },
  },
  deposito: {
    nombre: "Omonatlarni solishtirish",
    tituloCorto: "omonatlarni solishtirish",
    paraQuien: "Pulingizni qayerga va qancha muddatga qoʻyishni tanlashdan oldin omonatingizni turli muddatlar bilan solishtirish uchun",
    descripcion: ["Omonatingiz daromadini va xuddi shu omonatning boshqa muddatlardagi jadvalini koʻrsatadigan PDF hisobot; barchasi kalkulyatordagi usul bilan."],
    gancho: "Omonatingizni bir nechta muddat bilan bitta hisobotda solishtiring",
    incluye: [
      { titulo: "Bir nechta muddatda omonatingiz", texto: "Oson tanlashingiz uchun bitta jadvalda." },
      { titulo: "Bosqichma-bosqich hisob-kitob", texto: "Qoʻllangan har bir qiymat manbasi bilan." },
      HISOBINGIZ_UCHUN,
    ],
    escenarios: { titulo: "Boshqa muddatlarda omonatingiz", explica: "Xuddi shu hisob-kitob, boshqa muddatlar bilan." },
  },
  alimentos: {
    nombre: "Aliment hisoboti",
    tituloCorto: "aliment hisoboti",
    paraQuien: "Mediatsiyaga yoki aliment boʻyicha muzokaraga asosli raqamlar bilan borish uchun",
    descripcion: ["Aliment taxminini rasmiy qiymatlar va ularning manbalari bilan bosqichma-bosqich koʻrsatadigan, boshqa daromad darajalaridagi summalar jadvali ham bor PDF hisobot."],
    gancho: "Mediatsiyaga bu hisob-kitob bilan yozma holda boring",
    incluye: [
      { titulo: "Asosli hisob-kitob", texto: "Bosqichma-bosqich, har bir qiymat manbasi bilan." },
      { titulo: "Boshqa daromadlarda summa", texto: "Bir nechta variant bilan muzokara qilish uchun." },
      { titulo: "Advokatingiz yoki mediatoringiz uchun", texto: "Birinchi hisob-kitob tayyor boʻladi." },
    ],
    escenarios: { titulo: "Boshqa daromadlarda", explica: "Xuddi shu hisob-kitob, pastroq va yuqoriroq daromad bilan." },
  },
  jubilacion: {
    nombre: "Pensiya prognozi",
    tituloCorto: "pensiya prognozi",
    paraQuien: "Pensiyangizni yozma prognoz bilan rejalashtirish va badallaringizni oshirsangiz nima oʻzgarishini koʻrish uchun",
    descripcion: ["Taxminiy pensiyangizni rasmiy qiymatlar va ularning manbalari bilan bosqichma-bosqich koʻrsatadigan, boshqa ish haqi darajalaridagi prognoz jadvali ham bor PDF hisobot."],
    gancho: "Pensiya prognozingizni yozma oling",
    incluye: [
      { titulo: "Bosqichma-bosqich taxmin", texto: "Har bir qiymat manbasi bilan." },
      { titulo: "Boshqa ish haqlarida", texto: "Badallaringizni oshirsangiz nima oʻzgarishini koʻrish uchun." },
      HISOBINGIZ_UCHUN,
    ],
    escenarios: { titulo: "Boshqa ish haqlarida", explica: "Xuddi shu hisob-kitob, pastroq va yuqoriroq ish haqi bilan." },
  },
  "plan-prestamo": {
    nombre: "Kredit rejasi",
    tituloCorto: "kredit rejasi",
    paraQuien: "Kreditning haqiqiy qiymatini bilish va imzolashdan oldin takliflarni solishtirish uchun",
    descripcion: [
      "Kreditingizni toʻliq koʻrsatadigan PDF hisobot: oylik toʻlov, qaytaradigan umumiy summangiz va uning qanchasi foiz ekani.",
      "Toʻlov jadvalini hisoblagan boʻlsangiz, har bir toʻlov alohida koʻrsatiladi. Xuddi shu raqamlar boshqa foiz stavkalari bilan ham hisoblanadi. Shunda banklarning takliflarini haqiqiy raqamlar bilan solishtira olasiz.",
    ],
    gancho: "Imzolashdan oldin kredit takliflarini oʻz raqamlaringiz bilan solishtiring",
    incluye: [
      { titulo: "Boshqa foiz stavkalarida kreditingiz", texto: "Stavka bir punktga oshsa yoki kamaysa qanday taʼsir qilishini koʻrish uchun." },
      { titulo: "Aniq umumiy qiymat", texto: "Foizga qancha toʻlashingiz, yashirin shartlarsiz." },
      { titulo: "Imzolashdan oldingi tekshiruv roʻyxati", texto: "Kredit beruvchiga beriladigan savollar." },
    ],
    pasos: {
      titulo: "Kreditni imzolashdan oldin",
      items: [
        "Faqat foiz stavkasini emas, barcha xarajatlarni oʻz ichiga olgan yillik samarali stavkani soʻrang. Solishtirish kerak boʻlgan raqam aynan shu.",
        "Kredit ajratish uchun komissiya, rasmiylashtirish xarajatlari, majburiy sugʻurta va muddatidan oldin yopish uchun toʻlov haqida soʻrang.",
        "Ushbu hisobotdagi boshqa foiz stavkalari jadvali bilan kamida uchta taklifni solishtiring.",
        "Qiyin oyda ham toʻlay oladigan oylik toʻlovni tanlang. Moʻljal sifatida daromadingizning uchdan biridan oshmaslikka harakat qiling.",
      ],
    },
    escenarios: BOSHQA_FOIZLAR,
  },
  "plan-hipoteca": {
    nombre: "Ipoteka rejasi",
    tituloCorto: "ipoteka rejasi",
    paraQuien: "Ipoteka boʻyicha qarorni barcha raqamlarni koʻrib qabul qilish uchun: oylik toʻlov, foiz va stavka oʻzgarsa nima boʻlishi",
    descripcion: [
      "Ipotekangizni toʻliq koʻrsatadigan PDF hisobot: oylik toʻlov, toʻlaydigan umumiy summangiz va yillar boʻyicha uning qanchasi foizga ketishi.",
      "Hisob-kitobingizdagi barcha jadvallar toʻliq beriladi (bepul sahifa faqat birinchi qatorlarni koʻrsatadi) va xuddi shu raqamlar boshqa foiz stavkalari bilan ham hisoblanadi. Ijara va uy sotib olishni solishtirgan boʻlsangiz, solishtiruv ham yozma keladi; oilangiz bilan birga qaror qabul qila olasiz.",
    ],
    gancho: "Ipoteka rejangizni toʻliq jadvallar va boshqa foiz stavkalari bilan bankka olib boring",
    incluye: [
      { titulo: "Toʻliq jadvallar", texto: "Faqat birinchi qatorlar emas, barcha qatorlar." },
      { titulo: "Boshqa foiz stavkalarida ipotekangiz", texto: "Stavka bir punktga oshsa yoki kamaysa oylik toʻlovga qanday taʼsir qilishini koʻrish uchun." },
      { titulo: "Bankka beriladigan savollar", texto: "Imzolashdan oldin aniqlashtirish kerak boʻlgan narsalar." },
    ],
    pasos: {
      titulo: "Ipotekani imzolashdan oldin",
      items: [
        "Foiz stavkasi, muddat hamda sugʻurta va boshqa xarajatlarni oʻz ichiga olgan umumiy qiymat koʻrsatilgan yozma taklif soʻrang.",
        "Stavka qatʼiymi yoki oʻzgaruvchanmi, oʻzgaruvchan boʻlsa stavka oshganda oylik toʻlov qancha boʻlishini soʻrang.",
        "Muddatidan oldin yopish uchun toʻlovni va jarimasiz qisman oldindan toʻlash mumkinligini bilib oling.",
        "Qancha toʻlay olishingizni hal qilishdan oldin uy xarajatlarini (mol-mulk soligʻi, sugʻurta, kommunal toʻlovlar, taʼmirlash) oylik toʻlovga qoʻshing.",
      ],
    },
    escenarios: BOSHQA_FOIZLAR,
  },
  "plan-inversion": {
    nombre: "Jamgʻarma va investitsiya rejasi",
    tituloCorto: "jamgʻarma rejasi",
    paraQuien: "Jamgʻarmangiz vaqt oʻtishi bilan qanday oʻsishini va qoʻyadigan summangiz yoki daromadlilik boshqacha boʻlsa nima oʻzgarishini koʻrish uchun",
    descripcion: [
      "Jamgʻarma prognozingizni koʻrsatadigan PDF hisobot: qancha qoʻyganingiz, qancha foiz olganingiz va oxirida qancha mablagʻingiz boʻlishi.",
      "Hisob-kitobingizdagi barcha jadvallar toʻliq beriladi va xuddi shu raqamlar boshqa foiz stavkalari bilan ham hisoblanadi. Shunda jamgʻarmangizni qayerga qoʻyishni haqiqiy raqamlar bilan tanlay olasiz.",
    ],
    gancho: "Jamgʻarma rejangizni yilma-yil yozma oling",
    incluye: [
      { titulo: "Toʻliq prognoz", texto: "Faqat birinchi qatorlar emas, jadvalning barcha qatorlari." },
      { titulo: "Boshqa foiz stavkalari bilan", texto: "Qaror qabul qilishdan oldin variantlarni solishtirish uchun." },
      { titulo: "Amalga oshiriladigan reja", texto: "Niyatni jamgʻarmaga aylantiradigan qadamlar." },
    ],
    pasos: {
      titulo: "Reja ishlashi uchun",
      items: [
        "Ish haqi tushadigan kunga avtomatik oʻtkazma oʻrnating: koʻrmagan pulingiz sarflanmaydi.",
        "Daromadlilikni inflyatsiya bilan solishtiring: pastroq boʻlsa, raqam oʻssa ham pulingizning qadri kamayadi.",
        "Ushbu hisobotni yiliga bir marta qayta oching va raqamlaringizni yangilang.",
      ],
    },
    escenarios: BOSHQA_FOIZLAR,
  },
  "plan-deudas": {
    nombre: "Kredit karta qarzini yopish rejasi",
    tituloCorto: "kredit karta qarzi rejasi",
    paraQuien: "Kredit karta qarzingiz qachon tugashini, foiz sizga qanchaga tushishini va qarzni qanday tezroq yopishni bilish uchun",
    descripcion: [
      "Qarzingizni oyma-oy koʻrsatadigan PDF hisobot: qancha toʻlayotganingiz, uning qanchasi foizga ketishi va qoldiq qanchalik tez kamayishi.",
      "Oxirgi toʻlovgacha toʻliq jadval va xuddi shu raqamlarning boshqa toʻlov summalari bilan hisobi ham bor. Har oy biroz koʻproq toʻlab qancha tejashingizni koʻrasiz.",
    ],
    gancho: "Kredit karta qarzingiz qachon tugashini oyma-oy koʻring",
    incluye: [
      { titulo: "Qarz tugaguncha oyma-oy", texto: "Har oy toʻlaydigan foizingiz bilan." },
      { titulo: "Boshqa toʻlov summalari bilan", texto: "Biroz koʻproq toʻlasangiz qarz qanchalik erta tugashini koʻrish uchun." },
      { titulo: "Chiqish yoʻli", texto: "Yana qarzga botmaslik uchun qadamlar." },
    ],
    pasos: {
      titulo: "Qarzdan chiqish uchun",
      items: [
        "Qarzni yopayotganda kartadan foydalanishni toʻxtating: har bir yangi xarid jadvalni uzaytiradi.",
        "Har doim eng kam toʻlovdan koʻproq toʻlang. Ozgina boʻlsa ham farq qiladi; boshqa toʻlovlar jadvali qanchalik farq qilishini koʻrsatadi.",
        "Bir nechta qarzingiz boʻlsa, avval foizi eng yuqorisini yoping, qolganlarida eng kam summani toʻlang.",
        "Bankingizdan pastroq foizli qayta moliyalash yoki qarzni qayta tuzish imkoniyatini soʻrang va ushbu hisobot bilan solishtiring.",
      ],
    },
    escenarios: { titulo: "Boshqa oylik toʻlovlar bilan", explica: "Xuddi shu qarz, har oy biroz kamroq va biroz koʻproq toʻlov bilan." },
  },
  "plan-presupuesto": {
    nombre: "Byudjet rejasi",
    tituloCorto: "byudjet rejasi",
    paraQuien: "Oylik byudjetingizni aniq reja bilan tartibga solish uchun: zarur narsalar, istaklar va jamgʻarmaga qancha ajratish",
    descripcion: [
      "Hisob-kitobingizni rejaga aylantiradigan PDF hisobot: har bir bandga qancha ajratishingiz, oʻz valyutangizda va oʻz raqamlaringiz bilan.",
      "Xuddi shu reja boshqa summalar bilan ham bor. Pul koʻproq yoki kamroq boʻlgan oylarda nima oʻzgarishini oldindan bilasiz; amalga oshirish uchun qadamlar bilan birga.",
    ],
    gancho: "Bu hisob-kitobni oylik byudjet rejangizga aylantiring",
    incluye: [
      { titulo: "Raqamlaringiz bilan reja", texto: "Har bir bandga qancha ajratish, amalga oshirishga tayyor." },
      { titulo: "Boshqa summalar bilan", texto: "Oy sharoiti oʻzgarganda rejani moslashtirish uchun." },
      { titulo: "Tartibni saqlash uchun qadamlar", texto: "Byudjetni birinchi oydan keyin ham ishlatadigan narsalar." },
    ],
    pasos: {
      titulo: "Byudjet ishlashi uchun",
      items: [
        "Jamgʻarmani ish haqi tushgan kuni, xarajatlardan oldin ajrating. Qolgani sarflashingiz mumkin boʻlgan summa.",
        "Bir oy davomida xarajatlaringizni yozib boring (telefonda boʻlsa ham yetadi) va ushbu reja bilan solishtiring.",
        "Avval favqulodda holatlar uchun zaxira jamgʻaring; kutilmagan xarajat kredit kartaga tushmasin.",
      ],
    },
    escenarios: BOSHQA_SUMMALAR,
  },
  "plan-negocio": {
    nombre: "Biznes raqamlari hisoboti",
    tituloCorto: "biznes hisoboti",
    paraQuien: "Narx, foyda marjasi yoki investitsiya boʻyicha qarorni aniq raqamlar bilan qabul qilish va hamkorlaringizga koʻrsatish uchun",
    descripcion: [
      "Hisob-kitobingizni bosqichma-bosqich tushuntiradigan PDF hisobot: qoʻllangan maʼlumotlar, hisoblash usuli va natija.",
      "Xuddi shu hisobning boshqa summalar bilan jadvali ham bor. Xarajatlar oshsa yoki narxni tushirsangiz natija qanday oʻzgarishini koʻrasiz.",
    ],
    gancho: "Bu raqamlarni qaror qabul qilish yoki boʻlishish uchun hisobotga aylantiring",
    incluye: [
      { titulo: "Tushuntirilgan hisob-kitob", texto: "Hamkorlaringizga yoki bankka tushuntirish va himoya qilish uchun." },
      { titulo: "Boshqa summalar bilan", texto: "Narx yoki xarajat oʻzgarishining taʼsirini oldindan koʻrish uchun." },
      { titulo: "Qarordan oldingi savollar", texto: "Narxni oʻzgartirishdan oldin tekshirish kerak boʻlgan narsalar." },
    ],
    pasos: {
      titulo: "Qaror qabul qilishdan oldin",
      items: [
        "Tannarx hamma narsani qamrab olganiga ishonch hosil qiling: yetkazib berish, komissiyalar, soliqlar va oʻz vaqtingiz.",
        "Narxingizni oʻzgartirishdan oldin ikki-uchta raqobatchingiz bilan solishtiring.",
        "Jadvaldagi eng yomon variantga qarang: biznes u yerda ham turib qolsa, qaror xavfsizroq.",
      ],
    },
    escenarios: BOSHQA_SUMMALAR,
  },
  "kit-freelance": {
    nombre: "Frilanser narxlari toʻplami",
    tituloCorto: "frilanser narxlari toʻplami",
    paraQuien: "Ishingiz qiymatiga mos haq olish va narxingizni ishonch bilan aytish uchun",
    descripcion: [
      "Soatlik narxingizni tushuntiradigan PDF hisobot: koʻzlagan daromadingiz, haqiqatan haq olinadigan soatlar va narx qoplaydigan xarajatlar.",
      "Boshqa daromad maqsadlari uchun narxlar va soatlik narxingiz yozilgan, mijozga yuborishga tayyor xat ham bor.",
    ],
    gancho: "Narxingizni uzr soʻrab emas, raqamlar bilan ayting",
    incluye: [
      { titulo: "Tushuntirilgan narxingiz", texto: "Kimdir narx nega shuncha ekanini soʻraganda." },
      { titulo: "Boshqa daromad maqsadlari uchun", texto: "Har biri uchun kerakli narx." },
      { titulo: "Foydalanishga tayyor narx taklifi xati", texto: "Raqamlaringiz bilan toʻldirilgan, mijozga yuborish uchun." },
    ],
    pasos: {
      titulo: "Narxingiz qiymatingizni aks ettirishi uchun",
      items: [
        "Faqat haq olish mumkin boʻlgan soatlarni hisoblang: uchrashuvlar, taklif tayyorlash va hisob-fakturalarni kuzatish ham ish.",
        "Iloji boʻlsa, loyiha uchun narx bering: mijoz soatni emas, natijani sotib oladi.",
        "Narxingizni yiliga bir marta, xarajatlaringiz oshsa undan ham oldin qayta koʻrib chiqing.",
      ],
    },
    nota: {
      titulo: "Narx taklifi xati",
      uso: "Mijoz maʼlumotlari bilan toʻldiring va taklifingiz bilan birga yuboring.",
      pedido: "Suhbatimizning davomi sifatida, kelishilgan professional xizmatlar uchun narxim haqida maʼlum qilaman. Soatlik narxim:",
      cierre: "Bu narx ish vaqtimni va ishim bilan bogʻliq xarajatlarni qoplaydi. Loyiha boʻyicha taklif ham tayyorlab bera olaman.",
    },
    escenarios: { titulo: "Boshqa daromad maqsadlari uchun", explica: "Xuddi shu hisob-kitob, pastroq va yuqoriroq daromad maqsadlari bilan." },
  },
  "plan-sueldo": {
    nombre: "Ish haqi hisoboti",
    tituloCorto: "ish haqi hisoboti",
    paraQuien: "Ish haqi, ish taklifi yoki ish haqini oshirish boʻyicha suhbatga uning soatlik, oylik va yillik qiymatini bilib kirish uchun",
    descripcion: [
      "Ish haqi hisob-kitobingizni oʻz raqamlaringiz va qoʻllangan har bir qiymat bilan tushuntiradigan PDF hisobot.",
      "Boshqa summalar bilan jadval ham bor. Takliflarni solishtirish yoki aniq raqamlar bilan ish haqini oshirishni soʻrash uchun.",
    ],
    gancho: "Ish haqi boʻyicha suhbatga yozma raqamlar bilan kiring",
    incluye: [
      { titulo: "Hisob-kitobingiz toʻliq", texto: "Kiritgan har bir raqamingiz bilan." },
      { titulo: "Boshqa summalar bilan", texto: "Ikki taklifni bir daqiqada solishtirish uchun." },
      { titulo: "Suhbat uchun maslahatlar", texto: "Raqamdan tashqari nimani aytish va nimani soʻrash kerak." },
    ],
    pasos: {
      titulo: "Suhbat uchun",
      items: [
        "Takliflarni yillik yoki soatlik summa bilan solishtiring: oylik raqam farqlarni yashiradi.",
        "Ish haqidan tashqari narsalarni ham soʻrang: taʼtil, masofaviy ish, oʻqish yoki mukofot.",
        "Aniq raqamni asosi bilan olib boring: tajribangiz, bozor sharoiti yoki vazifalaringizdagi oʻzgarishlar.",
      ],
    },
    escenarios: BOSHQA_SUMMALAR,
  },
  "kit-calculos": {
    nombre: "Bosqichma-bosqich tushuntirilgan hisob-kitob",
    tituloCorto: "tushuntirilgan hisob-kitob",
    paraQuien: "Yechilgan va tushuntirilgan hisobni chop etish, oʻrganish yoki boʻlishish uchun tayyor holda olish uchun",
    descripcion: [
      "Hisob-kitobingizni, u qanday yechilganini va natijasini oʻz raqamlaringiz bilan koʻrsatadigan PDF hisobot.",
      "Oʻrganish, hisobni hujjat sifatida saqlash yoki qayta tushuntirmasdan boshqa odamga koʻrsatish uchun foydalaning.",
    ],
    gancho: "Hisobni bosqichma-bosqich izohi bilan saqlab qoʻying",
    incluye: [
      { titulo: "Yechilgan hisob", texto: "Maʼlumotlaringiz va natijasi bilan." },
      { titulo: "Qanday hisoblangani", texto: "Har bir raqam qayerdan kelganini koʻrish uchun." },
      { titulo: "Chop etishga tayyor", texto: "Yoki PDF sifatida saqlab, boʻlishish uchun." },
    ],
    pasos: {
      titulo: "Qayta tekshirish uchun",
      items: ["Teskari tomonga hisoblang: natijadan boshlab dastlabki qiymatlarga qayting.", "Faqat oxirida yaxlitlang: har qadamda yaxlitlash natijani oʻzgartiradi."],
    },
    escenarios: BOSHQA_SUMMALAR,
  },
  "kit-gastos-grupo": {
    nombre: "Xarajatlarni boʻlish xulosasi",
    tituloCorto: "xarajatlarni boʻlish xulosasi",
    paraQuien: "Har kim oʻz ulushini bahs-munozarasiz va qogʻoz-qalamsiz bilishi uchun",
    descripcion: [
      "Umumiy xarajatning PDF xulosasi: jami summa, har kimning ulushi va kerak boʻlsa kim kimga qarzdorligi.",
      "Xabar orqali yuboring yoki chop eting; hech kim qaytadan hisoblashiga hojat qolmasin.",
    ],
    gancho: "Xarajatni guruhga tushunmovchiliksiz boʻlib bering",
    incluye: [
      { titulo: "Har kimning ulushi", texto: "Jami summa va tafsilotlari bilan." },
      { titulo: "Boʻlishishga tayyor", texto: "Guruhga yuborish uchun PDF koʻrinishida." },
      { titulo: "Boshqa jami summalar bilan", texto: "Hisobga qoʻshimcha xarajat qoʻshilsa." },
    ],
    pasos: {
      titulo: "Toʻlovlarni yakunlash uchun",
      items: ["Hech kim toʻlashdan oldin xulosani guruhga yuboring: tushunmovchilikning oldini oladi.", "Toʻlov usuli va oxirgi toʻlov sanasini kelishib oling."],
    },
    escenarios: { titulo: "Boshqa jami summalar bilan", explica: "Jami summa biroz kamroq yoki biroz koʻproq boʻlsa, xuddi shu taqsimot." },
  },
  "kit-estudio": {
    nombre: "Oʻrtacha baho hisoboti",
    tituloCorto: "oʻrtacha baho hisoboti",
    paraQuien: "Oʻrtacha bahongizni har bir bahoning vazni bilan aniq va yozma olish uchun",
    descripcion: [
      "Oʻrtacha bahongizni koʻrsatadigan PDF hisobot: har bir baho, uning vazni va natijaga qanday kelingani.",
      "Baholaringizni tekshirish, keyingi imtihonni rejalashtirish yoki hisobni kerakli odamga koʻrsatish uchun foydalaning.",
    ],
    gancho: "Oʻrtacha bahongiz izohini yozma oling",
    incluye: [
      { titulo: "Har bir baho vazni bilan", texto: "Qaysi biri koʻproq taʼsir qilishini koʻrish uchun." },
      { titulo: "Bosqichma-bosqich hisob-kitob", texto: "Tekshirish yoki koʻrsatish uchun." },
      { titulo: "Keyingi imtihon uchun gʻoyalar", texto: "Oʻrtacha bahoni oʻqish rejasiga aylantirish uchun." },
    ],
    pasos: {
      titulo: "Keyingi imtihon uchun",
      items: ["Vazni eng katta baholarga qarang va oʻsha fanga yoki imtihonga koʻproq vaqt ajrating.", "Biror baho notoʻgʻri hisoblangandek tuyulsa, ushbu hisobotni oʻqituvchingizga olib boring."],
    },
  },
  "kit-fechas": {
    nombre: "Sana va muddat hisoboti",
    tituloCorto: "sana hisoboti",
    paraQuien: "Sana yoki muddat hisob-kitobingizni yozma olish, topshirish yoki unutmaslik uchun",
    descripcion: [
      "Sana hisob-kitobingizni koʻrsatadigan PDF hisobot: kiritgan sanalaringiz, natija va u qanday hisoblangani.",
      "Rasmiy ishlar, shartnomalar, toʻlov muddatlari yoki shunchaki hujjat sifatida foydalaning.",
    ],
    gancho: "Bu sanani yozma saqlab qoʻying, topshirishga tayyor boʻlsin",
    incluye: [
      { titulo: "Tushuntirilgan hisob-kitob", texto: "Sanalar va kunlar qanday sanalgani bilan." },
      { titulo: "Topshirishga tayyor", texto: "Ariza hujjatlariga yoki shartnomaga ilova qilish uchun." },
      { titulo: "Hujjatlaringiz uchun", texto: "Tuzilgan sanasi bilan." },
    ],
    pasos: {
      titulo: "Sanani rasmiy ishda ishlatishdan oldin",
      items: [
        "Muddat kalendar kunlarida yoki ish kunlarida hisoblanganini tekshiring: natija har xil boʻladi.",
        "Oxirgi kun bayram yoki dam olish kuniga toʻgʻri kelmasligini tekshiring.",
        "Muddat sanasini bir necha kun oldin eslatma bilan kalendaringizga kiriting.",
      ],
    },
  },
  "plan-salud": {
    nombre: "Tana massasi indeksi va kaloriya hisoboti",
    tituloCorto: "TMI va kaloriya hisoboti",
    paraQuien: "Vazn va energiya ehtiyoji raqamlaringizni yozma olish va shifokor qabuliga olib borish uchun",
    descripcion: [
      "Natijalaringizni tushuntiradigan PDF hisobot: nima oʻlchangani, qanday hisoblangani va maʼlumotlaringizga koʻra qaysi oraliqqa toʻgʻri kelishi.",
      "Bu sogʻliqni saqlash mutaxassisi bilan gaplashish uchun umumiy maʼlumot. Tashxis emas va shifokor koʻrigining oʻrnini bosmaydi.",
    ],
    gancho: "Raqamlaringizni izohlari bilan birga shifokor qabuliga olib boring",
    incluye: [
      { titulo: "Tushuntirilgan natijalaringiz", texto: "Nima oʻlchangani va qanday hisoblangani." },
      { titulo: "Qabul uchun savollar", texto: "Shifokor bilan suhbatdan koʻproq foyda olish uchun." },
      { titulo: "Oʻzgarishni kuzatish uchun", texto: "Har bir hisobotni saqlang va vaqt oʻtishi bilan solishtiring." },
    ],
    pasos: {
      titulo: "Sogʻliqni saqlash mutaxassisiga murojaat qilish uchun",
      items: [
        "Ushbu hisobotni olib boring va yoshingiz hamda sogʻligʻingiz tarixiga koʻra siz uchun sogʻlom oraliq qanday ekanini soʻrang.",
        "Ovqatlanishingiz, jismoniy faolligingiz va uyqungiz haqida gapirib bering: raqamlarning oʻzi hamma narsani koʻrsatmaydi.",
        "Oldin maslahatlashmasdan ovqatlanish yoki mashgʻulotlaringizni keskin oʻzgartirmang.",
      ],
    },
    aviso: "Umumiy maʼlumot. Sogʻliqni saqlash mutaxassisining maslahati oʻrnini bosmaydi.",
  },
  "plan-embarazo": {
    nombre: "Homiladorlik va ovulyatsiya hisoboti",
    tituloCorto: "homiladorlik va ovulyatsiya hisoboti",
    paraQuien: "Taxminiy sanalaringizni yozma olish va keyingi koʻrikka olib borish uchun",
    descripcion: [
      "Taxminiy sanalaringizni va ularning har biri qanday hisoblanganini kiritgan maʼlumotlaringiz bilan koʻrsatadigan PDF hisobot.",
      "Bu sanalar faqat taxmin: har bir organizm va har bir homiladorlik boshqacha. Hisobot tayyorlanishingizga va doyangiz yoki shifokoringiz bilan gaplashishingizga yordam beradi, koʻrik oʻrnini bosmaydi.",
    ],
    gancho: "Taxminiy sanalaringizni keyingi koʻrik uchun yozma saqlab qoʻying",
    incluye: [
      { titulo: "Taxminiy sanalaringiz", texto: "Har biri qanday hisoblangani bilan." },
      { titulo: "Koʻrik uchun savollar", texto: "Shifokor bilan suhbatdan koʻproq foyda olish uchun." },
      { titulo: "Hujjatlaringiz uchun", texto: "Foydalangan maʼlumotlaringiz bilan." },
    ],
    pasos: {
      titulo: "Keyingi koʻrik uchun",
      items: [
        "Ushbu hisobotni va oxirgi hayz koʻrish davringizning birinchi kunini koʻrikka olib boring.",
        "Homiladorlik haftangizda qaysi tekshiruvlar qilinishi kerakligini va keyingi koʻrik qachon ekanini soʻrang.",
        "Sizni xavotirga solgan biror holat boʻlsa, hisobotdagi sanani kutmasdan darhol murojaat qiling.",
      ],
    },
    aviso: "Umumiy maʼlumot. Sanalar faqat taxmin va sogʻliqni saqlash mutaxassisi koʻrigining oʻrnini bosmaydi.",
  },
  "plan-entrenamiento": {
    nombre: "Yugurish tempi hisoboti",
    tituloCorto: "temp hisoboti",
    paraQuien: "Maqsadli tempingizni va kuchingizni qanday taqsimlashni bilib yugurish uchun",
    descripcion: [
      "Temp, vaqt va tezligingizni kiritgan maʼlumotlaringiz bilan tushuntiradigan PDF hisobot.",
      "Hisob-kitobning barcha jadvallari toʻliq beriladi; tempingizni mashgʻulotda qanday ishlatish boʻyicha maslahatlar bilan birga.",
    ],
    gancho: "Tempingizni musobaqa kuni uchun yozma saqlab qoʻying",
    incluye: [
      { titulo: "Tushuntirilgan tempingiz", texto: "Vaqt va tezlik bilan birga." },
      { titulo: "Chop etib oʻzingiz bilan olish uchun", texto: "Choʻntagingizda yoki muzlatkich eshigida." },
      { titulo: "Mashgʻulot maslahatlari", texto: "Tempingizni jarohatsiz qanday ishlatish." },
    ],
    pasos: {
      titulo: "Tempingizdan foydalanish uchun",
      items: [
        "Dastlabki bir necha daqiqani maqsadingizdan biroz sekinroq boshlang: kuchingiz masofa oxiriga qoladi.",
        "Haftalik mashgʻulotlarning asosiy qismini gaplasha oladigan yengil tempda qiling.",
        "Biror joyingiz ogʻrisa, toʻxtang va tekshirtiring: temp kutib turadi.",
      ],
    },
    aviso: "Umumiy maʼlumot. Sogʻliqni saqlash mutaxassisi yoki murabbiy maslahatining oʻrnini bosmaydi.",
  },
  "kit-viaje": {
    nombre: "Safar uchun yoqilgʻi byudjeti",
    tituloCorto: "yoqilgʻi byudjeti",
    paraQuien: "Safaringizning yoqilgʻi xarajatini bilish va hamrohlaringiz bilan boʻlishish uchun",
    descripcion: [
      "Safaringizning yoqilgʻi xarajatini oʻz raqamlaringiz bilan koʻrsatadigan PDF hisobot: masofa, sarf va narx.",
      "Yoʻlga chiqishdan oldin narx oʻzgarsa, boshqa yoqilgʻi narxlari bilan jadval va yoʻlning boshqa xarajatlarini hisoblash uchun tekshiruv roʻyxati ham bor.",
    ],
    gancho: "Yoʻlga chiqishdan oldin safar xarajatini yozma saqlab qoʻying",
    incluye: [
      { titulo: "Safar xarajati", texto: "Masofa, sarf va narx bilan." },
      { titulo: "Boshqa narxlar bilan", texto: "Yoʻlga chiqishdan oldin yoqilgʻi narxi oshsa." },
      { titulo: "Boshqa xarajatlar uchun roʻyxat", texto: "Pullik yoʻllar, avtoturargoh va ovqat." },
    ],
    pasos: {
      titulo: "Safar byudjeti uchun",
      items: [
        "Yoqilgʻi xarajatiga pullik yoʻllar, avtoturargoh va ovqatni qoʻshing.",
        "Bir necha kishi boradigan boʻlsa, jami summani boʻling va yoʻlga chiqishdan oldin hammaga ayting.",
        "Shina bosimini tekshiring: bosim past boʻlsa, avtomobil koʻproq yoqilgʻi sarflaydi.",
      ],
    },
    escenarios: { titulo: "Boshqa narxlar bilan", explica: "Xuddi shu safar, biroz arzonroq va biroz qimmatroq yoqilgʻi bilan." },
  },
  "kit-hogar": {
    nombre: "Elektr energiyasi xarajati hisoboti",
    tituloCorto: "elektr xarajati hisoboti",
    paraQuien: "Har bir qurilma sizga qanchaga tushishini va elektr toʻlovida qayerdan tejash mumkinligini bilish uchun",
    descripcion: [
      "Qurilmalaringiz xarajatini oʻz foydalanish raqamlaringiz va elektr tarifi bilan koʻrsatadigan PDF hisobot.",
      "Boshqa elektr tariflari bilan jadval va toʻlovni kamaytirish uchun gʻoyalar roʻyxati ham bor.",
    ],
    gancho: "Bu qurilma qanchaga tushishini va qanday tejashni bilib oling",
    incluye: [
      { titulo: "Foydalanishingiz boʻyicha xarajat", texto: "Bosqichma-bosqich tushuntirilgan." },
      { titulo: "Boshqa tariflar bilan", texto: "Elektr tarifi oshsa." },
      { titulo: "Tejash gʻoyalari", texto: "Toʻlovda eng koʻp farq qiladiganlari." },
    ],
    pasos: {
      titulo: "Toʻlovni kamaytirish uchun",
      items: [
        "Kutish rejimidagi qurilmalarni rozetkadan uzing: oʻchiqdek koʻringan qurilma ham elektr sarflaydi.",
        "Tarifingiz vaqtga qarab oʻzgarsa, eng koʻp sarflaydigan qurilmalarni eng arzon soatlarda ishlating.",
        "Bu qurilmaning umumiy toʻlovdagi ulushini koʻrish uchun hisobotni elektr toʻlovi kvitansiyangiz bilan solishtiring.",
      ],
    },
    escenarios: { titulo: "Boshqa tariflar bilan", explica: "Xuddi shu foydalanish, biroz arzonroq va biroz qimmatroq elektr tarifi bilan." },
  },
  "kit-obra": {
    nombre: "Qurilish materiallari roʻyxati",
    tituloCorto: "materiallar roʻyxati",
    paraQuien: "Materialni kam yoki ortiqcha emas, aynan kerakli miqdorda sotib olish uchun",
    descripcion: [
      "Material hisob-kitobingizni koʻrsatadigan PDF hisobot: oʻlchamlar, miqdorlar va ular qanday hisoblangani; qurilish doʻkoniga olib borishga tayyor.",
      "Toʻgʻri xarid uchun tekshiruv roʻyxati ham bor: chiqindi uchun zaxira, soʻrash kerak boʻlgan narsalar va ishni boshlashdan oldin tekshiriladiganlar.",
    ],
    gancho: "Qurilish doʻkoniga materiallar roʻyxatingiz bilan boring",
    incluye: [
      { titulo: "Oʻlchamlar va miqdorlar", texto: "Hisoblagan hamma narsangiz bitta sahifada." },
      { titulo: "Doʻkonda koʻrsatish uchun", texto: "Taklif ehtiyojingizga qarab tayyorlanishi uchun." },
      { titulo: "Xarid uchun tekshiruv roʻyxati", texto: "Chiqindi uchun zaxira va tekshiriladiganlar." },
    ],
    pasos: {
      titulo: "Sotib olishdan oldin",
      items: [
        "Kesish va sinish uchun 5 foizdan 10 foizgacha zaxira qoʻshing, xona tekis boʻlmasa koʻproq.",
        "Hammasini bitta partiyadan oling: rang va naqsh partiyadan partiyaga farq qilishi mumkin.",
        "Tanlagan mahsulotingizning sarf meʼyorini soʻrang: u brenddan brendga oʻzgaradi.",
        "Chekni va ochilmagan ortiqcha materiallarni saqlab qoʻying: koʻp doʻkonlar ularni qaytarib oladi.",
      ],
    },
  },
  "kit-facturacion": {
    nombre: "QQS hisoboti",
    tituloCorto: "QQS hisoboti",
    paraQuien: "Hisob-faktura yozish yoki narxlarni soliq alohida koʻrsatilgan holda tekshirish uchun; hujjatlaringizga yoki buxgalteringizga tayyor",
    descripcion: [
      "Hisob-kitobingizni koʻrsatadigan PDF hisobot: soliqsiz narx, soliq va jami; amaldagi stavka va uning manbasi bilan.",
      "Boshqa summalar bilan jadval ham bor. QQS bilan va QQSsiz narxlar roʻyxatini tayyorlash uchun qulay.",
    ],
    gancho: "QQS bilan va QQSsiz narxlarni yozma saqlab qoʻying",
    incluye: [
      { titulo: "Alohida koʻrsatilgan soliq", texto: "Soliq solinadigan baza, soliq va jami; amaldagi stavka bilan." },
      { titulo: "Boshqa summalar bilan", texto: "Narxlar roʻyxatini bir yoʻla tayyorlash uchun." },
      { titulo: "Buxgalteringiz uchun", texto: "Stavka manbasi va sanasi bilan." },
    ],
    pasos: {
      titulo: "Hisob-faktura yozishdan oldin",
      items: [
        "Mahsulotingiz yoki xizmatingizga umumiy stavka qoʻllanishini yoki imtiyozli stavka borligini tekshiring.",
        "Kerak boʻlsa, hisob-fakturada soliq solinadigan baza va soliq alohida yozilganiga ishonch hosil qiling.",
        "Ushbu hisobotni hisob-faktura bilan birga hujjatlaringizda saqlang.",
      ],
    },
    escenarios: BOSHQA_SUMMALAR,
  },
  "informe-calculo": {
    nombre: "Hisob-kitob hisoboti",
    tituloCorto: "hisob-kitob hisoboti",
    paraQuien: "Bu hisob-kitobni oʻz raqamlaringiz, farazlar va har bir rasmiy raqam qayerdan olingani bilan birga yozma olish uchun",
    descripcion: [
      "Hozirgina qilgan hisob-kitobingizning maʼlumotlaringiz bilan bosqichma-bosqich tayyorlangan PDF hisoboti: natija, uning ortidagi farazlar va har bir rasmiy raqam, manbasi va tekshirilgan sanasi bilan.",
      "Hujjat sifatida saqlang yoki har bir raqamni qayta tushuntirmasdan buxgalteringizga, ish beruvchingizga yoki tekshirishi kerak boʻlgan odamga bering.",
    ],
    gancho: "Bu hisob-kitobni manbalari bilan birga yozma oling",
    incluye: [
      { titulo: "Natijangiz", texto: "Aynan siz hisoblagandek, chop etishga tayyor." },
      { titulo: "Qanday hisoblangani", texto: "Har bir raqamni kuzatish mumkin boʻlishi uchun qadamlar va farazlar." },
      { titulo: "Rasmiy manbalar", texto: "Har bir raqam idorasi, havolasi va tekshirilgan sanasi bilan." },
    ],
    pasos: {
      titulo: "Foydalanishdan oldin",
      items: [
        "Yuqoridagi maʼlumotlar sizniki ekaniga ishonch hosil qiling: natija ularga bogʻliq.",
        "Biror rasmiy raqam oʻzgarsa, qaytadan hisoblang: hisobot xarid kunidagi amaldagi raqamlardan foydalanadi.",
      ],
    },
  },
};

export const uz: DiccionarioVenta = {
  familias,
  general: { si: "Ha", no: "Yoʻq" },
  tarjeta: {
    cejaInforme: "PDF hisobot",
    cejaPlanilla: "Excel jadvali",
    pagoUnico: "bir martalik toʻlov",
    comprarInforme: "Hisobotni olish",
    comprarPlanilla: "Excel jadvalini olish",
    confianza: "PayPal yoki karta orqali toʻlang. Foydasi boʻlmasa, 7 kun ichida pulingizni qaytaramiz.",
    verDetalle: "Tarkibini koʻrish",
    tambien: "Bu ham sizga foydali boʻlishi mumkin:",
    tablasOficiales: "Rasmiy jadvallar",
    bajadaInforme: "Bu hisobot hisob-kitobni oʻz raqamlaringiz va har bir qiymat manbasi bilan bosqichma-bosqich koʻrsatadi; chop etish yoki PDF sifatida saqlashga tayyor.",
    bajadaPlanilla: "Bu Excel jadvalida hisob-kitob raqamlaringiz va koʻrinadigan formulalar bilan berilgan; xohlagan narsangizni oʻzgartira olasiz.",
    bajadaPlanillaHoja: "Bu Excel jadvalida hisob-kitob «{hoja}» varagʻida raqamlaringiz va koʻrinadigan formulalar bilan berilgan; xohlagan narsangizni oʻzgartira olasiz.",
    equivale: "Bugungi kurs boʻyicha taxminan {monto}.",
    cobroDolares: "Toʻlov AQSh dollarida olinadi.",
  },
  aviso: {
    pronto: "Tez orada",
    titulo: "Sotuvga chiqqanda menga xabar bering",
    ayuda: "Faqat bitta xat yuboramiz: bu mahsulot sotuvga chiqqanda.",
    boton: "Xabar berish",
    listo: "Tayyor. Bu mahsulot sotuvga chiqishi bilan sizga xat yuboramiz.",
    error: "Elektron pochta manzilingizni saqlay olmadik. Toʻgʻri yozilganini tekshirib, qaytadan urinib koʻring.",
    correo: "Elektron pochta manzilingiz",
  },
  planilla: {
    gancho: "Bu hisob-kitobni maʼlumotlaringiz toʻldirilgan holda Excelga oʻtkazing",
    incluye: [
      { titulo: "Maʼlumotlaringiz tayyor", texto: "Sariq kataklarni oʻzgartiring, hammasi qaytadan hisoblanadi." },
      { titulo: "Ish haqi, mukofotlar va ishdan boʻshash toʻlovlari", texto: "Butun yil davomida foydalanadigan bitta faylda." },
      { titulo: "Rasmiy oʻzgarishlar bilan doim yangilanadi", texto: "Oʻsha havola qayta toʻlovsiz yangi versiyani beradi." },
    ],
  },
  informe: {
    tusDatos: "Maʼlumotlaringiz",
    resultado: "Natija",
    corregir: "Maʼlumotlarimni oʻzgartirish",
    actualizar: "Hisobotni yangilash",
    imprimir: "Chop etish yoki PDF sifatida saqlash",
    imprimirAyuda: "Faylni olish uchun chop etish oynasida «PDF sifatida saqlash» bandini tanlang.",
    sinResultado: "Hisobotni tayyorlash uchun «Maʼlumotlarimni oʻzgartirish» boʻlimida maʼlumotlaringizni kiriting.",
    lugar: "Joy va sana",
    destinatario: "Hurmatli",
    firma: "Imzo",
    nombre: "Familiya, ism, otasining ismi",
    documento: "Shaxsni tasdiqlovchi hujjat raqami",
    etiquetaEnMinuscula: true,
    comoSeCalcula: "Qanday hisoblanadi",
    fuentes: "Rasmiy manbalar",
    verificado: "tekshirilgan sana",
    emitido: "Tuzilgan sana",
    valores: "Quyidagi sanada amalda boʻlgan rasmiy qiymatlar",
    numero: "Hisobot",
    elegir: "Hisobot uchun hisob-kitobni tanlang:",
    legal:
      "Bu hisobot koʻrsatilgan qoidalar va rasmiy qiymatlarga asoslangan, yozilgan sanadagi holat boʻyicha qilingan taxmin. U mutaxassis maslahati yoki vakolatli idoralar qarorining oʻrnini bosmaydi. Maʼlumotlaringizdan biri boshqacha boʻlsa, natija oʻzgaradi: maʼlumotni tuzatib, qaytadan chop eting.",
    legalSinFuentes: "Bu hisobot siz kiritgan maʼlumotlarga asoslangan, yozilgan sanadagi holat boʻyicha qilingan taxmin. U mutaxassis maslahatining oʻrnini bosmaydi. Maʼlumotlardan biri oʻzgarsa, natija ham oʻzgaradi: maʼlumotni tuzatib, qaytadan chop eting.",
    errorTitulo: "Bu hisobotni ochib boʻlmayapti",
    error: "Bu havolaning toʻlovini hali tasdiqlay olmadik. Hisobingizdan pul yechilgan boʻlsa, bizga yozing, muammoni hal qilamiz. Xarid yakunlanmagan boʻlsa, qaytadan urinib koʻrishingiz mumkin.",
    verificar: "Toʻlovni hozir tasdiqlay olmayapmiz. Bir necha daqiqadan keyin qaytadan urinib koʻring: qayta toʻlashingiz shart emas.",
    cupo: "Ketma-ket juda koʻp urinish boʻldi. Bir necha daqiqa kutib, havolani qaytadan oching.",
  },
  catalogo: {
    tituloProducto: "{nombre} ({pais})",
    disparadorInforme: "Hisob-kitobdagi rasmiy qiymatlardan biri oʻzgarganda",
    planillaDescripcion: "Foydalanishga tayyor Excel jadvali: maʼlumotlaringizni sariq kataklarga kiriting, natija darhol chiqadi. Formulalar quyidagi meʼyoriy hujjatlarga mos: {normas}.",
    planillaIncluye: "Tarkibi: {incluye}. Har bir varaq qadamlarni koʻrsatadi; rasmiy jadvallar varagʻida har bir qiymat manbasi va biz tekshirgan sana bilan berilgan.",
  },
  planillas: {
    migaPlanillas: "Excel jadvallari va hisobotlar",
    catalogoTitulo: "{pais} uchun Excel jadvallari va hisobotlar",
    catalogoBajada: "Raqamlaringiz va mamlakatingizning rasmiy maʼlumotlari bilan Excel jadvallari va PDF hisobotlar. Bir martalik toʻlov, obunasiz.",
    seccionPlanillas: "Excel jadvallari",
    seccionInformes: "PDF hisobotlar",
    catalogoVacio: "{pais} uchun Excel jadvallari tez orada. Hozircha kalkulyatorlar bepul.",
    verCalculadoras: "Kalkulyatorlarni koʻrish",
    comprar: "Sotib olish, narxi {precio}",
    pronto: "Tez orada",
    incluye: "Nimalarni olasiz",
    incluyeInforme: [
      "Raqamlaringiz bilan tayyorlangan, chop etish yoki PDF sifatida saqlash mumkin boʻlgan bir sahifali hisobot.",
      "Muddatsiz havola: maʼlumotlaringizni istalgan vaqtda tuzatib, qaytadan chop etishingiz mumkin.",
      "Foydasi boʻlmasa, 7 kun ichida pulingizni qaytaramiz.",
    ],
    incluyePlanilla: [
      "Excel va Google Sheetsda ochiladigan .xlsx fayli.",
      "Yangilanishlar: {disparador} faylni yangilaymiz va oʻsha havola yangi versiyani yuklab beradi.",
      "Foydasi boʻlmasa, 7 kun ichida pulingizni qaytaramiz.",
    ],
    pagoUnico: "PayPal orqali bir martalik toʻlov. PayPal hisobingiz yoki karta bilan toʻlashingiz mumkin.",
    comprarPlanilla: "Sotib olish: {titulo}",
    comprarBajadaInforme: "Toʻlov tasdiqlanishi bilan hisobot havolasini shu manzilga yuboramiz.",
    comprarBajadaPlanilla: "Toʻlov tasdiqlanishi bilan Excel jadvalini shu manzilga yuboramiz.",
    etiquetaEmail: "Elektron pochta manzilingiz",
    seguirPago: "Toʻlovga oʻtish",
    privacidad: "Elektron pochta manzilingizdan faqat xaridingizni va uning yangilanishlarini yuborish uchun foydalanamiz.",
    datosTitulo: "Hisob-kitobingizdagi raqamlar bilan",
    datosUsar: "Bu raqamlar men sotib oladigan mahsulotda ishlatilsin. Raqamlar faqat xaridingizni tayyorlash uchun saqlanadi.",
    errores: {
      email: "Elektron pochta manzilingizni tekshiring: nimadir yetishmayotganga oʻxshaydi.",
      error: "Toʻlovni boshlab boʻlmadi. Sizdan pul yechilmadi. Bir necha daqiqadan keyin qaytadan urinib koʻring.",
      cancelado: "Toʻlovni bekor qildingiz. Sizdan pul yechilmadi.",
      fallido: "PayPal toʻlovni tasdiqlamadi. Boshqa kartani sinab koʻrishingiz mumkin.",
      pronto: "Bu mahsulot hali sotuvda yoʻq.",
    },
    graciasTitulo: "Xaridingiz uchun rahmat",
    graciasListoInforme: "Toʻlovingiz tasdiqlandi. Hoziroq ochishingiz mumkin: {titulo}. Havolani elektron pochtangizga ham yubordik; uning muddati tugamaydi.",
    graciasListoPlanilla: "Toʻlovingiz tasdiqlandi. Hoziroq yuklab olishingiz mumkin: {titulo}. Faylni muddatsiz havola bilan elektron pochtangizga ham yubordik.",
    graciasPendiente: "PayPal tasdigʻini kutyapmiz. Tasdiq kelishi bilan xaridingizni elektron pochtangizga yuboramiz.",
    muestraIntro: "Bu ochilganda koʻrinadigan namunaviy maʼlumotlar bilan «{hoja}» varagʻi. Hisob-kitobda bugun amalda boʻlgan rasmiy qiymatlar qoʻllanadi.",
    muestraLeyenda: ["Siz toʻldiradigan", "jadval hisoblaydigan"],
    comprobar: "Toʻlashdan oldin tekshiring: bepul kalkulyator xuddi shu raqamlarni beradi. Xuddi shu holatni sinab koʻrib, solishtiring.",
    comprobarEnlace: "Bepul kalkulyatorni ochish",
    faqTitulo: "Koʻp beriladigan savollar",
    faq: {
      sheets: {
        pregunta: "Google Sheets va Excelda ishlaydimi?",
        respuesta: "Ha. Fayl .xlsx formatida: Excel va Google Sheetsda ochiladi (Drive xotirangizga yuklab, oʻsha yerdan oching). Hisob-kitob makroslarsiz, oddiy formulalar bilan qilinadi.",
      },
      recibo: {
        pregunta: "Uni qanday olaman?",
        respuesta: "Toʻlov tasdiqlanishi bilan muddatsiz yuklab olish havolasini elektron pochtangizga yuboramiz. Toʻlovdan keyin ochiladigan sahifadan ham yuklab olishingiz mumkin.",
      },
      dolares: {
        pregunta: "Toʻlov AQSh dollarida olinadimi?",
        respuesta: "Ha. Narx AQSh dollarida (USD) koʻrsatilgan va siz PayPal orqali, PayPal hisobingiz yoki kartangiz bilan toʻlaysiz.",
        conReferencia: "Yuqorida faqat taxminiy tasavvur uchun oʻz valyutangizdagi bugungi kurs boʻyicha summani koʻrsatamiz: yakuniy summa bankingiz yoki kartangizni chiqargan tashkilot qoʻllaydigan kursga bogʻliq.",
        sinReferencia: "Kartangiz boshqa valyutada boʻlsa, konvertatsiyani bankingiz amalga oshiradi.",
      },
      devolucion: { pregunta: "Pulimni qaytarib olsam boʻladimi?", respuesta: "Ha. Excel jadvali foyda bermasa, 7 kun ichida yetkazib berish xatiga javob yozing, pulingizni qaytaramiz." },
      actualiza: { pregunta: "Rasmiy qiymatlar oʻzgarsa, jadval yangilanadimi?", respuesta: "Ha. {disparador} faylni yangilaymiz va oʻsha havola yangi versiyani yuklab beradi." },
    },
    descargar: "Excel jadvalini yuklab olish (.xlsx)",
    abrirInforme: "Hisobotni ochish",
    fuentes: "Foydalanilgan rasmiy manbalar",
    calculadoras: "Quyidagi kalkulyatorlar bilan birga ishlatiladi",
    muestra: "Koʻrinishi",
  },
  correo: {
    asuntoInforme: "CalcularYa xaridingiz: {titulo}",
    asuntoPlanilla: "{titulo}: yuklab olish havolasi va yangilanishlar",
    mismosNumeros: "Raqamlar rasmiy maʼlumotlar asosida {enlace} natijalari bilan bir xil.",
    enlaceCalculadora: "CalcularYa bepul kalkulyatorining",
    comprobante: "Bu xat {marca} saytidagi xaridingizni tasdiqlaydi.",
    informe: {
      encabezado: "Hisobotingiz ochishga tayyor",
      intro: "Xaridingiz uchun rahmat: {titulo}. Bu yerdan oching:",
      boton: "Hisobotni ochish",
      abre: "Hisobot brauzeringizda ochiladi. U yerdan chop etishingiz yoki PDF sifatida saqlashingiz mumkin.",
      guarda: "Bu xatni saqlab qoʻying",
      vence: "Bu havola sizniki va uning muddati tugamaydi. Hisobot xarid kunidagi amaldagi rasmiy qiymatlardan foydalanadi; maʼlumotlaringizni istalgan vaqtda tuzatib, qaytadan chop etishingiz mumkin.",
      devolucion: "Bu hisobot foyda bermasa, 7 kun ichida shu xatga javob yozing, pulingizni qaytaramiz.",
      ayuda: "Muammo bormi? Shu xatga javob yozing yoki biz bilan bogʻlaning: {contacto}.",
    },
    planilla: {
      encabezado: "Excel jadvalingiz tayyor",
      intro: "Xaridingiz uchun rahmat: {titulo}. Bu yerdan yuklab oling:",
      boton: "Excel jadvalini yuklab olish (.xlsx)",
      abre: "Excel va Google Sheetsda ochiladi.",
      guarda: "Bu xatni saqlab qoʻying",
      vence: "Bu havola sizniki va uning muddati tugamaydi. {disparador} jadvalni yangilaymiz va oʻsha havola sizga eng yangi versiyani beradi. Qayta toʻlashingiz shart emas.",
      devolucion: "Bu Excel jadvali foyda bermasa, 7 kun ichida shu xatga javob yozing, pulingizni qaytaramiz.",
      ayuda: "Muammo bormi? Shu xatga javob yozing yoki biz bilan bogʻlaning: {contacto}.",
    },
  },
};
