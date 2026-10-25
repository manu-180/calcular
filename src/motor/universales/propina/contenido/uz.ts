import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.15;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Choychaqa kalkulyatori",
    title: tituloQueEntre(`Choychaqa kalkulyatori: ${ctx.nombrePais}`, "Choychaqa kalkulyatori", "Choychaqa hisoblash"),
    description: "Choychaqani, umumiy hisobni va hisob boʻlinganda har bir kishi qancha toʻlashini hisoblang. Ulushlarni butun summaga yaxlitlash mumkin.",
    intro: [
      "Hisob summasini, choychaqa foizini va necha kishi toʻlashini kiriting. Choychaqa, jami summa va har bir ulush koʻrinadi.",
      "Yaxlit sonlarni afzal koʻrsangiz, har bir ulush yuqoriga yaxlitlanadi va ortgan qism choychaqaga qoʻshiladi.",
    ],
    comoSeCalcula: [
      "Choychaqa = hisob summasi × choychaqa foizi ÷ 100.",
      "Jami = hisob summasi + choychaqa.",
      "Har bir ulush = jami summa ÷ kishilar soni.",
    ],
    ejemplo: [
      `Hisob ${m(cuenta)} boʻlsa, 15% choychaqa ${m(propina)} qiladi. Jami summa: ${m(cuenta + propina)}.`,
      `Hisob 3 kishi orasida boʻlinsa, har biri ${m((cuenta + propina) / 3)} toʻlaydi.`,
    ],
    faq: [
      {
        pregunta: "Qancha choychaqa qoldirish kerak?",
        respuesta: `Bu mahalliy odatga bogʻliq. ${GRAMATICA.uz.en(ctx.nombrePais)} qanday odat borligini va hisobga xizmat haqi allaqachon qoʻshilgan-qoʻshilmaganini tekshiring.`,
      },
      {
        pregunta: "Choychaqa soliqdan oldingi yoki keyingi summadan hisoblanadimi?",
        respuesta: "Koʻpchilik hisobdagi umumiy summadan hisoblaydi. Soliqsiz summadan hisoblamoqchi boʻlsangiz, oʻsha summani kiriting.",
      },
      {
        pregunta: "15% choychaqani tez qanday hisoblayman?",
        respuesta: "Hisobni oʻnga boʻling, bu 10% boʻladi. Keyin uning yarmini qoʻshing. Hisob 40 boʻlsa: 4 va 2, jami 6.",
      },
    ],
    glosario: [
      { termino: "Choychaqa", definicion: "Narxdan tashqari xizmat uchun qoldiriladigan qoʻshimcha summa." },
      { termino: "Xizmat haqi", definicion: "Muassasa hisobga allaqachon qoʻshgan xizmat toʻlovi." },
    ],
  };
};
