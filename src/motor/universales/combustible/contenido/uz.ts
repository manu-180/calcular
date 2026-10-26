import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `Bir gallonda 30 mil yuradigan avtomobil 150 millik yoʻlga borib-qaytishi uchun ${formatearNumero(ctx, galones)} gallon yoqilgʻi sarflaydi.`,
          `1 gallon narxi ${m(precio)} boʻlsa, jami xarajat: ${m(galones * precio)}. Ikki kishiga boʻlinsa, har biri ${m((galones * precio) / 2)} toʻlaydi.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const litros = (600 * 8) / 100;
        return [
          `Sarfi 8 litr/100 km boʻlgan avtomobil 300 km yoʻlga borib-qaytishi uchun ${formatearNumero(ctx, litros)} litr yoqilgʻi kerak boʻladi.`,
          `1 litr narxi ${m(precio)} boʻlsa, jami xarajat: ${m(litros * precio)}. Ikki kishiga boʻlinsa, har biri ${m((litros * precio) / 2)} toʻlaydi.`,
        ];
      })();
  return {
    h1: "Yoqilgʻi sarfi kalkulyatori",
    title: tituloQueEntre(`Yoqilgʻi sarfi kalkulyatori: ${ctx.nombrePais}`, "Yoqilgʻi sarfi kalkulyatori", "Benzin sarfini hisoblash"),
    description: "Masofa, avtomobil sarfi va yoqilgʻi narxi boʻyicha safar uchun yoqilgʻi xarajatini va har bir kishi qancha toʻlashini hisoblang.",
    intro: [
      `Masofani, avtomobilingiz yoqilgʻi sarfini va 1 ${imperial ? "gallon" : "litr"} narxini kiriting. Qancha yoqilgʻi kerakligini va safar qanchaga tushishini koʻrasiz.`,
      imperial ? "Sarf gallonga mil hisobida kiritiladi, xuddi avtomobil yorligʻidagi kabi." : "Sarfni litr/100 km yoki km/litr hisobida kiritish mumkin.",
    ],
    comoSeCalcula: imperial
      ? ["Gallon = masofa ÷ bir gallonga mil.", "Xarajat = gallon × 1 gallon narxi. Borish va qaytishda masofa ikki baravar boʻladi."]
      : [
          "litr/100 km bilan: litr = masofa × sarf ÷ 100.",
          "km/litr bilan: litr = masofa ÷ sarf.",
          "Xarajat = litr × 1 litr narxi. Borish va qaytishda masofa ikki baravar boʻladi.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "Mil/gallon qiymatini litr/100 km koʻrinishiga qanday oʻtkazaman?",
        respuesta: `${formatearNumero(ctx, 235.215, 1)} sonini mil/gallon qiymatiga (AQSh galloni) boʻling. Bir gallonda 30 mil yuradigan avtomobil 100 km uchun taxminan ${formatearNumero(ctx, 235.215 / 30, 1)} litr sarflaydi.`,
      },
      {
        pregunta: "Pullik yoʻllar ham hisobga olinadimi?",
        respuesta: "Yoʻq. Faqat yoqilgʻi hisoblanadi. Pullik yoʻl va avtoturargoh xarajatlarini alohida qoʻshing.",
      },
      {
        pregunta: "Nega shaharda yoqilgʻi koʻproq sarflanadi?",
        respuesta: "Toʻxtab-yurish trassada bir maromda yurishdan koʻra koʻproq energiya talab qiladi, shuning uchun shahardagi sarf odatda yuqoriroq.",
      },
    ],
    glosario: [
      { termino: "Yoqilgʻi sarfi", definicion: "Avtomobil maʼlum miqdordagi yoqilgʻi bilan qancha masofa yurishi." },
      { termino: "litr/100 km", definicion: "100 km yoʻl uchun necha litr yoqilgʻi ketishi. Qanchalik past boʻlsa, shuncha tejamkor." },
    ],
  };
};
