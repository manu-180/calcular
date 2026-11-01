import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `150 ft² maydon, 12 × 12 in kafel (har biri 1 ft²) va 10% zaxira bilan kerakli kafellar soni: ${piezas}.`,
          `Bir qutida 10 dona kafel boʻlsa, sotib olinadigan qutilar soni: ${Math.ceil(piezas / 10)}.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `20 m² maydon, 60 × 60 cm kafel (har biri ${n(pieza)} m²) va 10% zaxira bilan kerakli kafellar soni: ${piezas}.`,
          `Bir qutida 4 dona kafel boʻlsa, sotib olinadigan qutilar soni: ${Math.ceil(piezas / 4)}.`,
        ];
      })();
  return {
    h1: "Kafel kalkulyatori",
    title: tituloQueEntre(`Kafel kalkulyatori: ${ctx.nombrePais}`, "Kafel hisoblash kalkulyatori", "Kafel kalkulyatori"),
    description: "Pol yoki devor uchun zaxirani hisobga olgan holda qancha kafel kerakligini va necha quti sotib olishni hisoblang.",
    intro: [
      "Maydonni, bitta kafel oʻlchamini va bir qutida nechta kafel borligini kiriting. Qancha kafel va necha quti olish kerakligini koʻrasiz.",
      "Zaxira chetlardagi kesishlar va ayrim siniq kafellar uchun qoʻshiladi.",
    ],
    comoSeCalcula: [
      `Bitta kafel maydoni = uzunlik × eni, ${imperial ? "kvadrat futga" : "kvadrat metrga"} oʻtkazilgan holda.`,
      "Kafellar soni = maydon × (1 + zaxira ÷ 100) ÷ bitta kafel maydoni, yuqoriga yaxlitlanadi.",
      "Qutilar soni = kafellar soni ÷ bir qutidagi kafellar, yuqoriga yaxlitlanadi.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Qancha zaxira qoldirish kerak?",
        respuesta: "Toʻgʻri terishda 10%. Diagonal yoki «archa» usulida, yoki kesish koʻp boʻladigan xonalarda 15% yoki 20%.",
      },
      {
        pregunta: "Choklarni hisobga olish kerakmi?",
        respuesta: "Yoʻq. Choklar bir necha millimetr keladi, bu farqni zaxira qoplaydi.",
      },
      {
        pregunta: "Ortiqcha kafel olib qoʻyish kerakmi?",
        respuesta: "Ha, bir xil partiyadan bir nechta ortiqcha kafel oling. Keyinroq biri sinsa, xuddi shu rangini topish qiyin boʻlishi mumkin.",
      },
    ],
    glosario: [
      { termino: "Zaxira", definicion: "Kesish va sinish uchun qoʻshimcha olinadigan foiz." },
      { termino: "Partiya", definicion: "Bir martada ishlab chiqarilgan kafellar. Turli partiyalar rangi biroz farq qilishi mumkin." },
    ],
  };
};
