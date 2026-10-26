import type { DiccionarioLegal } from "./tipos";

// Uzbeko latino con «Siz» (ADR 0002, D16). Texto propio, frases cortas, sin jerga legal copiada.
export const uz: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "Biz haqimizda | CalcularYa",
      description: "CalcularYa har bir mamlakat uchun ish, pul va kundalik hayot kalkulyatorlarini tayyorlaydi; raqamlar rasmiy manbalardan olinadi.",
      h1: "Biz haqimizda",
      bajada: "Har bir mamlakat uchun, oʻsha mamlakatning rasmiy maʼlumotlari bilan ishlaydigan kalkulyatorlar.",
      bloques: [
        {
          parrafos: [
            "CalcularYa kundalik hisob-kitoblar uchun kalkulyatorlar sayti: ish haqi, kredit, soliqlar, sanalar va boshqalar.",
            "Saytni Argentina uchun kalkulyatorlar sayti boʻlgan calcular.ar saytini ham yuritadigan Manuel Navarro tayyorlaydi.",
          ],
        },
        {
          titulo: "Qanday ishlaymiz",
          parrafos: [
            "Hisob qoidaga bogʻliq boʻlsa (eng kam ish haqi, badal stavkasi yoki chegara), qiymatni mamlakatning rasmiy manbasidan olamiz: rasmiy nashr, vazirlik, markaziy bank yoki soliq idorasi.",
            "Havolani va tekshirilgan sanani saqlaymiz va ikkalasini ham har bir kalkulyator yonida koʻrsatamiz.",
            "Qiymatni rasmiy manbada tasdiqlab boʻlmasa, uni ishlatadigan kalkulyator eʼlon qilinmaydi.",
            "Qoida oʻzgarsa, kalkulyator ham oʻzgaradi va bu oʻzgarish har bir mamlakatning yangilanishlar sahifasiga yoziladi.",
          ],
        },
        { titulo: "Bepul", parrafos: ["Barcha kalkulyatorlar bepul va hisob ochishni talab qilmaydi."] },
      ],
    },
    contacto: {
      title: "Aloqa | CalcularYa",
      description: "Eskirgan raqam, kutilmagan natija yoki yangi kalkulyator va mamlakat boʻyicha taklif uchun bizga yozing.",
      h1: "Aloqa",
      bajada: `Elektron pochtamiz: ${mail}.`,
      bloques: [
        {
          parrafos: [
            "Eskirgan raqam, kutilmagan natija yoki hali yoʻq kalkulyator va mamlakat haqida xabar bersangiz, bizga katta yordam boʻladi.",
            "Gap raqam haqida boʻlsa, mamlakatni va raqamni koʻrgan sahifangizni yozing.",
            "Javobni haqiqiy inson yozadi. Bu bir necha kun olishi mumkin.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Maxfiylik siyosati | CalcularYa",
      description: "CalcularYa qaysi maʼlumotlardan foydalanadi: kalkulyatorga kiritganlaringiz brauzeringizda ishlanadi va bizda saqlanmaydi.",
      h1: "Maxfiylik siyosati",
      bajada: `Oxirgi yangilanish: ${actualizado}.`,
      bloques: [
        {
          titulo: "Kalkulyatorga kiritgan maʼlumotlaringiz",
          parrafos: ["Hisob brauzeringizda bajariladi. Kiritganlaringiz hech qanday serverga yuborilmaydi va bizda saqlanmaydi."],
        },
        {
          titulo: "Mamlakatingiz",
          parrafos: [
            "Sizga kerakli mamlakat kalkulyatorlarini taklif qilish uchun tashrifingiz qaysi mamlakatdan kelganini aniqlaymiz. Buni xosting provayderimiz IP manzilingiz boʻyicha taxmin qiladi.",
            "IP manzilingizni saqlamaymiz. Natija faqat tashrif davomida brauzeringizda turadi.",
          ],
        },
        {
          titulo: "Brauzeringiz nimani saqlaydi",
          parrafos: [
            "Varaq yopilganda oʻchadigan sessiya xotirasi tashrifingiz mamlakatini, uni taklif qilgan xabarni yopganingiz yoki yopmaganingizni va ulashilgan havola orqali kelgan boʻlsangiz, oʻsha havolaning kodini eslab qoladi.",
            "Brauzerdan oʻzingiz tozalamaguningizcha turadigan mahalliy xotira oʻzingiz tanlagan mamlakatni, tashriflarni sanash uchun tasodifiy sonni va sizga koʻrsatilgan dizayn sinovining variantini saqlaydi. Shunda sayt har safar bir xil koʻrinadi. Bularning hech biri kimligingizni koʻrsatmaydi.",
            "Reklama yoki kuzatuv cookie fayllaridan foydalanmaymiz.",
          ],
        },
        {
          titulo: "Sayt serveri",
          parrafos: ["Sayt Vercel xostingida joylashgan. Har qanday server kabi Vercel ham sayt ishlashi va xavfsizligi uchun har bir tashrifning texnik maʼlumotlarini (IP manzil va brauzer) yozib boradi."],
        },
        {
          titulo: "Tashriflarni qanday sanaymiz",
          parrafos: [
            "Sayt qanday ishlatilishini oʻz vositamiz bilan oʻlchaymiz: qaysi sahifalar ochiladi va qanchalik koʻp ishlatiladi, qaysi saytdan kelgansiz, qurilma turi va mamlakatingiz. Brauzeringiz saqlaydigan tasodifiy son yangi tashrifni qaytgan tashrifdan ajratadi. IP manzilingizni va kalkulyatorga kiritganlaringizni saqlamaymiz.",
            "Saytdan ulashilgan havolalarda har safar oʻzgaradigan tasodifiy kod boʻladi. Shu orqali har bir havola qancha tashrif keltirganini sanaymiz. Bu kod hech kimni aniqlamaydi.",
            "Kalkulyatorga kiritgan summalaringiz hech qachon havola ichida brauzeringizdan chiqmaydi.",
          ],
        },
        {
          titulo: "Oʻzgarishlar va savollar",
          parrafos: [
            "Biror narsa oʻzgarsa (masalan, reklama qoʻshsak), buni kuchga kirishidan oldin shu sahifada eʼlon qilamiz.",
            `Maʼlumotlaringiz boʻyicha savollar uchun quyidagi manzilga yozing: ${mail}.`,
          ],
        },
        {
          titulo: "Odamlar ulashgan maoshlar",
          parrafos: [
            "«Haqiqiy maoshlar» sahifasida istalgan kishi maoshini anonim qoʻshishi mumkin, faqat rozilik belgisini aniq qoʻyganidan keyin. Biz mamlakatni, kasbni (tayyor roʻyxatdan), ish tajribasi oraligʻini, ikki muhim raqamgacha yaxlitlangan oylik yalpi maoshni va oyni saqlaymiz. IP manzil, brauzer yoki hisob saqlanmaydi. Keyingi kungi yangilanishgacha qoʻshilgan kunni va ulanishning izini ham saqlaymiz: u har kuni oʻzgaradigan kalit bilan shifrlanadi va undan IP manzilni tiklab boʻlmaydi. Kun yopilganda ikkalasi ham oʻchiriladi.",
            "Raqamlar kuniga bir marta eʼlon qilinadi. Kasb 10 va undan koʻp yozuvga ega boʻlganda chiqadi: yozuvlar bir necha kunda va kamida ikki xil oyda qoʻshilgan boʻlishi kerak. Faqat yaxlitlangan mediana va oraliqni, yozuvlar sonini esa oraliq bilan koʻrsatamiz. Shunda sahifani ikki kunda solishtirib, biror kishining maoshini bilib boʻlmaydi. Alohida maosh hech qachon koʻrsatilmaydi.",
            "Bir oyda bitta mamlakatni ikki marta qoʻshmaslik uchun brauzer mahalliy xotirada yozuvning mamlakati va oyini saqlaydi, summani hech qachon.",
            "Yozuv hech kimga bogʻlanmagani uchun uni keyin topib oʻchirishning iloji yoʻq.",
          ],
        },
      ],
    },
    terminos: {
      title: "Foydalanish shartlari | CalcularYa",
      description: "CalcularYa kalkulyatorlari amaldagi rasmiy maʼlumotlar bilan taxminiy hisob beradi. Natijalar yoʻl-yoʻriq, professional maslahat emas.",
      h1: "Foydalanish shartlari",
      bajada: `Oxirgi yangilanish: ${actualizado}.`,
      bloques: [
        {
          titulo: "Kalkulyatorlar nima uchun",
          parrafos: [
            "Natijalar amaldagi rasmiy maʼlumotlarga asoslangan taxminlar. Ulardan yoʻl-yoʻriq sifatida foydalaning.",
            "Ular ish beruvchingiz, buxgalteringiz yoki yuristingizning hisobi yoxud rasmiy idoralar qarori oʻrnini bosmaydi.",
          ],
        },
        {
          titulo: "Maʼlumotlar qayerdan olinadi",
          parrafos: [
            "Har bir kalkulyator oʻz qiymatlarining rasmiy manbasini va biz tekshirgan sanani koʻrsatadi.",
            "Maʼlumotlarni dolzarb saqlashga harakat qilamiz, lekin qoida biz qoʻshib ulgurmasdan oʻzgarishi mumkin.",
          ],
        },
        {
          titulo: "Saytdan foydalanish",
          parrafos: ["Sayt bepul. Undan foydalanishingiz va havolalarini ulashishingiz mumkin. Mazmunni ommaviy nusxalash yoki oʻzini CalcularYa deb tanishtirish taqiqlanadi."],
        },
        {
          titulo: "Javobgarlik",
          parrafos: ["Faqat shu saytdagi natijaga tayanib qabul qilingan qarorlar uchun javob bermaymiz. Imzolash, toʻlash yoki ariza berishdan oldin raqamlarni tegishli mutaxassis yoki idora bilan tekshirib oling."],
        },
        { titulo: "Aloqa", parrafos: [`Elektron pochtamiz: ${mail}.`] },
      ],
    },
  },
});
