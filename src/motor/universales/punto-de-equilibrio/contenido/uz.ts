import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "Zararsizlik nuqtasi kalkulyatori",
    title: tituloQueEntre(`Zararsizlik nuqtasi kalkulyatori, ${ctx.nombrePais}`, `Zararsizlik nuqtasi, ${ctx.nombrePais}`, "Zararsizlik nuqtasi kalkulyatori"),
    description: "Xarajatlarni qoplash va koʻzlangan foydaga yetish uchun har oy necha dona sotish va qancha tushum olish kerakligini hisoblang.",
    intro: [
      "Zararsizlik nuqtasi biznes na foyda, na zarar koʻradigan sotuv hajmi. Undan past boʻlsa zarar koʻrasiz, undan oshsa foyda boshlanadi.",
      "Doimiy xarajatlaringizni, narxni va bir donaning xarajatini kiriting. Xarajatlarni qoplash va maqsadingizga yetish uchun qancha sotish kerakligini aytamiz.",
    ],
    comoSeCalcula: [
      "Marjinal daromad = narx − bir donaga oʻzgaruvchan xarajat.",
      "Zararsizlik uchun dona soni = doimiy xarajatlar ÷ marjinal daromad, yuqoriga yaxlitlangan.",
      "Zararsizlik uchun tushum = doimiy xarajatlar ÷ (marjinal daromad ÷ narx).",
      "Koʻzlangan foyda uchun uni doimiy xarajatlarga qoʻshing va xuddi shunday hisoblang.",
    ],
    ejemplo: [
      `Doimiy xarajatlar ${m(fijos)}, narx ${m(precio)} va oʻzgaruvchan xarajat ${m(variable)} boʻlsa, har bir sotuv ${m(precio - variable)} qoldiradi.`,
      `Xarajatlarni qoplash uchun ${formatearNumero(ctx, base.unidades)} dona sotish kerak (tushum: ${m(base.facturacion)}). Oyiga ${m(objetivo)} foyda olish uchun esa ${formatearNumero(ctx, meta.unidades)} dona.`,
    ],
    faq: [
      {
        pregunta: "Doimiy va oʻzgaruvchan xarajatlar nima?",
        respuesta: "Doimiy xarajatlar hech narsa sotmasangiz ham oʻzgarmaydi: ijara, doimiy ish haqi, kommunal xizmatlar. Oʻzgaruvchan xarajatlar har bir sotuv bilan oshadi: tovar, xomashyo, komissiya, yetkazib berish.",
      },
      {
        pregunta: "Zararsizlik nuqtasini qanday pasaytirish mumkin?",
        respuesta: "Uchta yoʻl bor: narxni oshirish, bir donaga oʻzgaruvchan xarajatni kamaytirish yoki doimiy xarajatlarni qisqartirish. Odatda narx eng katta taʼsir koʻrsatadi.",
      },
      {
        pregunta: "Xizmat koʻrsatadigan biznes uchun ham ishlaydimi?",
        respuesta: "Ha. Bir dona sifatida bir soat, bir seans yoki oyiga bitta mijozni olish mumkin. Oʻzgaruvchan xarajat sifatida har birini bajarish sizga qanchaga tushishini yozing.",
      },
    ],
    glosario: [
      { termino: "Zararsizlik nuqtasi", definicion: "Tushum xarajatlarga teng boʻladigan sotuv hajmi." },
      { termino: "Marjinal daromad", definicion: "Har bir sotuv doimiy xarajatlarni qoplash uchun qoldiradigan summa." },
    ],
  };
};
