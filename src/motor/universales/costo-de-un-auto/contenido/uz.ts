import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const g: GastosAuto = {
    precio: montoEjemplo(ctx, 25000),
    depreciacion: 15,
    seguro: montoEjemplo(ctx, 100),
    distancia: 1000,
    consumo: imperial ? 28 : 8,
    precioCombustible: montoEjemplo(ctx, imperial ? 3.5 : 1.2),
    mantenimiento: montoEjemplo(ctx, 60),
    estacionamiento: 0,
    otros: 0,
  };
  const mensual = costoMensual(g, imperial);
  const unidad = imperial ? "mil" : "kilometr";
  return {
    h1: "Avtomobil xarajatlari kalkulyatori",
    title: tituloQueEntre(
      `Avtomobil xarajatlari kalkulyatori, ${ctx.nombrePais}`,
      `Avtomobil xarajatlari, ${ctx.nombrePais}`,
      "Avtomobil xarajatlari kalkulyatori",
    ),
    description: `Avtomobilingiz oyiga, yiliga va har bir ${unidad} uchun qanchaga tushishini hisoblang: yoqilgʻi, sugʻurta, texnik xizmat, avtoturargoh va qiymat pasayishi.`,
    intro: [
      "Koʻpchilik yoqilgʻiga qancha sarflashini biladi. Lekin sugʻurta, texnik xizmat, avtoturargoh va eng muhimi, avtomobil har yili yoʻqotadigan qiymatni qoʻshib hisoblaydiganlar kam.",
      "Xarajatlaringizni kiriting, avtomobil sizga aslida qanchaga tushishini koʻrsatamiz. Bu sotib olish, almashtirish yoki boshqa transportni tanlash haqida qaror qilishda yordam beradi.",
    ],
    comoSeCalcula: [
      imperial
        ? "Oylik yoqilgʻi = oylik mil ÷ bir gallon uchun mil × bir gallon narxi."
        : "Oylik yoqilgʻi = oylik kilometr × har 100 km uchun litr ÷ 100 × bir litr narxi.",
      "Oylik qiymat pasayishi = avtomobil qiymati × yillik pasayish ÷ 12.",
      "Haqiqiy xarajat = yoqilgʻi + sugʻurta + texnik xizmat + avtoturargoh + boshqa xarajatlar + qiymat pasayishi.",
      `Bir ${unidad} xarajati = oylik haqiqiy xarajat ÷ oy davomida bosib oʻtilgan masofa.`,
    ],
    ejemplo: [
      `Qiymati ${m(g.precio)} boʻlgan va oyiga ${formatearNumero(ctx, g.distancia)} ${imperial ? "mil" : "km"} yuradigan avtomobilning qiymat pasayishi bilan birga oylik xarajati: ${m(mensual)}.`,
      `Bu yiliga ${m(mensual * 12)}, bir ${unidad} uchun esa ${formatearMonto(ctx, mensual / g.distancia)} degani.`,
    ],
    faq: [
      {
        pregunta: "Avtomobil qiymatining pasayishi nima?",
        respuesta:
          "Bu avtomobilning vaqt oʻtishi bilan yoʻqotadigan qiymati. Uni har oy toʻlamaysiz, lekin sotayotganda sezasiz. Yangi avtomobilda bu koʻpincha eng katta xarajat boʻladi.",
      },
      {
        pregunta: "Nega kredit toʻlovim qoʻshilmaydi?",
        respuesta:
          "Toʻlovning bir qismi avtomobilning oʻzi uchun ketadi va u allaqachon qiymat pasayishi sifatida hisoblangan. Ikkalasini qoʻshish avtomobilni ikki marta hisoblash boʻlardi. Kredit foizi esa qoʻshimcha xarajat.",
      },
      {
        pregunta: "Avtomobil xarajatlarini qanday kamaytirish mumkin?",
        respuesta:
          "Sugʻurta takliflarini har yili solishtiring, shinalar bosimi va texnik xizmatni oʻz vaqtida bajaring, avtomobilni tez-tez almashtirmang: qiymat eng koʻp birinchi yillarda yoʻqotiladi.",
      },
    ],
    glosario: [
      { termino: "Qiymat pasayishi", definicion: "Avtomobilning vaqt va foydalanish natijasida yoʻqotadigan qiymati." },
      { termino: `Bir ${unidad} xarajati`, definicion: `Barcha xarajatlarni hisobga olgan holda bosib oʻtilgan har bir ${unidad} uchun oʻrtacha xarajat.` },
    ],
  };
};
