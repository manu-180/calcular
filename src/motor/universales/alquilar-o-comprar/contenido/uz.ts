import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const quien = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "sotib olish" : "ijara");
  return {
    h1: "Ijara yoki uy sotib olish: kalkulyator",
    title: tituloQueEntre(
      `Ijara yoki uy sotib olish kalkulyatori, ${ctx.nombrePais}`,
      `Ijara yoki uy sotib olish, ${ctx.nombrePais}`,
      "Ijara yoki uy sotib olish kalkulyatori",
    ),
    description: "Tanlagan yillaringiz davomida ijarada yashash va uy sotib olishni solishtiring. Qaysi biri foydaliroq, qaysi yildan boshlab va qanchaga ekanini koʻring.",
    intro: [
      "Ipoteka toʻlovini ijara haqi bilan solishtirish yetarli emas. Uy sotib olgan kishi foiz, taʼmirlash va mol-mulk soligʻini toʻlaydi, lekin oxirida uy uniki boʻladi. Ijarada yashovchi esa boshlangʻich toʻlovni investitsiyada saqlashi mumkin.",
      "Bu kalkulyator bularning barchasini yilma-yil qoʻshib chiqadi va qaysi variantda mol-mulkingiz koʻproq boʻlishini aytadi.",
    ],
    comoSeCalcula: [
      "Sotib olish: har oy ipoteka toʻlovi va mulkdor xarajatlarini toʻlaysiz. Mol-mulkingiz uyning qiymatidan qolgan qarzni ayirganiga teng.",
      "Ijara: boshlangʻich toʻlov va sotib olish xarajatlari muqobil daromad stavkasida investitsiyada qoladi, ijara haqi esa har yili oshadi.",
      "Har oy kam sarflagan tomon farqni investitsiya qiladi, shunda ikkala variant bir xil byudjetdan chiqadi.",
      "Oxirida mol-mulki koʻproq boʻlgan variant foydaliroq.",
    ],
    ejemplo: [
      `Narxi ${m(precio)} boʻlgan uy, 20 foiz boshlangʻich toʻlov va 25 yilga yillik 7 foizli ipoteka bilan, oyiga ${m(alquiler)} ijara haqiga qarshi solishtiriladi.`,
      `10 yillik muddatda ${quien(a10)} foydaliroq, farq: ${m(Math.abs(a10.comprar - a10.alquilar))}. 3 yillik muddatda ${quien(a3)} foydaliroq, farq: ${m(Math.abs(a3.comprar - a3.alquilar))}.`,
    ],
    faq: [
      {
        pregunta: "Ijarada yashash pulni behuda sarflashmi?",
        respuesta:
          "Unchalik emas. Uy sotib olganlar ham qaytib kelmaydigan xarajatlarni toʻlaydi: foiz, mol-mulk soligʻi va taʼmirlash. Muhimi, har bir holatda oxirida sizda qancha mol-mulk boʻlishi.",
      },
      {
        pregunta: "Nega javob yillar soniga qarab oʻzgaradi?",
        respuesta:
          "Uy sotib olishning boshida katta xarajatlari bor (sotib olish xarajatlari va dastlabki foizlar), ularni qoplash uchun vaqt kerak. Tez orada koʻchib ketmoqchi boʻlsangiz, odatda ijara foydaliroq chiqadi.",
      },
      {
        pregunta: "Qaysi maʼlumot eng muhim?",
        respuesta:
          "Narx va ijara haqi nisbati, ipoteka stavkasi va uy narxlarining oʻsish surʼati. Uy narxining oʻsishi va investitsiya daromadini oʻzgartirib koʻring, javob qanchalik oʻzgarishini koʻrasiz.",
      },
    ],
    glosario: [
      { termino: "Mol-mulk (sof aktivlar)", definicion: "Sizga tegishli narsalardan qarzlaringiz ayirilgandan keyin qoladigan qiymat." },
      { termino: "Narx oʻsishi", definicion: "Uy qiymatining har yili qanchaga oshishi." },
      { termino: "Muqobil xarajat", definicion: "Boshlangʻich toʻlovni investitsiya qilganingizda olishingiz mumkin boʻlgan daromad." },
    ],
  };
};
