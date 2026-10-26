import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  return {
    h1: "Foyda marjasi kalkulyatori",
    title: tituloQueEntre(`Foyda marjasi kalkulyatori, ${ctx.nombrePais}`, `Foyda marjasi, ${ctx.nombrePais}`, "Foyda marjasi kalkulyatori"),
    description: "Tannarx va narx boʻyicha foyda marjasi va ustamani hisoblang yoki kerakli marjaga erishish uchun qanday narx qoʻyish kerakligini bilib oling.",
    intro: [
      "Marja va ustama tez-tez adashtiriladi, bu esa pul yoʻqotishga olib kelishi mumkin. Ikkalasi bir xil foydani oʻlchaydi, lekin turli asosga nisbatan.",
      "Tannarx va narxni kiriting, ikkalasini ham koʻrsatamiz. Yoki marjani tanlang, qancha narx qoʻyish kerakligini aytamiz.",
    ],
    comoSeCalcula: [
      "Foyda = narx − tannarx.",
      "Marja = foyda ÷ narx × 100.",
      "Ustama = foyda ÷ tannarx × 100.",
      "Kerakli marja uchun narx = tannarx ÷ (1 − marja ÷ 100).",
    ],
    ejemplo: [
      `Tannarxi ${m(costo)} boʻlgan mahsulot ${m(precio)} narxda sotilsa, foyda ${m(precio - costo)} boʻladi. Marja: ${p(((precio - costo) / precio) * 100)}, ustama: ${p(((precio - costo) / costo) * 100)}.`,
      `Shu tannarxda 50 foiz marja olish uchun sotish narxi ${m(precioConMargen(costo, 50))} boʻlishi kerak. Tannarxga 50 foiz qoʻshish esa atigi ${p(100 / 3)} marja beradi.`,
    ],
    faq: [
      {
        pregunta: "Marja va ustama oʻrtasida qanday farq bor?",
        respuesta: "Marja foydaning sotish narxiga nisbati. Ustama foydaning tannarxga nisbati. Bir xil foydada ustama har doim kattaroq son boʻladi.",
      },
      {
        pregunta: "Kerakli marja uchun narx qanday belgilanadi?",
        respuesta: `Tannarxni (1 − marja) ifodasiga boʻling. 30 foiz marja uchun tannarxni ${formatearNumero(ctx, 0.7, 2)} soniga boʻling. Tannarxga 30 foiz qoʻshmang: kutganingizdan kam foyda olasiz.`,
      },
      {
        pregunta: "Tannarxga soliqlar kiradimi?",
        respuesta: "Tannarx va narxni xaridorga oʻtkaziladigan soliqlarsiz, masalan, QQSsiz oling. Aks holda marja aslidagidan katta koʻrinadi.",
      },
    ],
    glosario: [
      { termino: "Foyda marjasi", definicion: "Foydaning sotish narxiga nisbatan foizi." },
      { termino: "Ustama", definicion: "Foydaning tannarxga nisbatan foizi." },
    ],
  };
};
