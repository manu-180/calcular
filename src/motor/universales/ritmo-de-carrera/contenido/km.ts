import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoKm: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ម៉ាយ" : "គីឡូម៉ែត្រ";
  const corto = imperial ? "ម៉ាយ" : "គ.ម";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "គណនាល្បឿនរត់",
    title: tituloQueEntre(`គណនាល្បឿនរត់ ពេលវេលា និងចម្ងាយ | ${ctx.nombrePais}`, "គណនាល្បឿនរត់ ពេលវេលា និងចម្ងាយ", "គណនាល្បឿនរត់"),
    description: `គណនាល្បឿនរត់ក្នុងមួយ${u} ពេលវេលាដល់ទី ឬចម្ងាយ សម្រាប់ការរត់ 5 គ.ម 10 គ.ម កន្លះម៉ារ៉ាតុង និងម៉ារ៉ាតុង។`,
    intro: [
      "ពេលមានលេខពីរក្នុងចំណោមបី (ចម្ងាយ ពេលវេលា និងល្បឿនរត់) អាចរកលេខទីបីបាន។ អាចប្រើរៀបផែនការរត់ប្រណាំង ឬពិនិត្យការហ្វឹកហាត់។",
      "មានចម្ងាយ 5 គ.ម 10 គ.ម កន្លះម៉ារ៉ាតុង និងម៉ារ៉ាតុងឱ្យជ្រើសរើសភ្លាមៗ។",
    ],
    comoSeCalcula: [
      `ល្បឿនរត់ = ពេលវេលា ÷ ចម្ងាយ ជានាទី និងវិនាទីក្នុងមួយ${u}។`,
      "ពេលវេលា = ល្បឿនរត់ × ចម្ងាយ",
      "ចម្ងាយ = ពេលវេលា ÷ ល្បឿនរត់។ ល្បឿនមធ្យមគឺចម្ងាយចែកនឹងចំនួនម៉ោង។",
    ],
    ejemplo: imperial
      ? [
          `រត់ 3 ម៉ាយក្នុង 27 នាទី គឺល្បឿនរត់ 9:00 ក្នុងមួយម៉ាយ ឬល្បឿន ${formatearNumero(ctx, 20 / 3, 2)} ម៉ាយក្នុងមួយម៉ោង។`,
          `កន្លះម៉ារ៉ាតុង (${formatearNumero(ctx, media, 2)} ម៉ាយ) ដោយល្បឿនរត់ ${ritmoTexto(ritmoMedia)} ក្នុងមួយម៉ាយ នឹងដល់ទីក្នុងពេល ${reloj(ritmoMedia * media)}។`,
        ]
      : [
          "រត់ 10 គ.ម ក្នុង 50 នាទី គឺល្បឿនរត់ 5:00 ក្នុងមួយគីឡូម៉ែត្រ ឬល្បឿន 12 គ.ម/ម៉ោង។",
          `កន្លះម៉ារ៉ាតុង (${formatearNumero(ctx, media, 1)} ${corto}) ដោយល្បឿនរត់ ${ritmoTexto(ritmoMedia)} ក្នុងមួយគីឡូម៉ែត្រ នឹងដល់ទីក្នុងពេល ${reloj(ritmoMedia * media)}។`,
        ],
    faq: [
      {
        pregunta: `តើគណនាល្បឿនរត់ក្នុងមួយ${u}ដោយរបៀបណា?`,
        respuesta: imperial
          ? `បំប្លែងពេលវេលាជានាទី រួចចែកនឹងចំនួនម៉ាយ។ រត់ 3 ម៉ាយក្នុង 28 នាទី 30 វិនាទី ស្មើនឹង ${formatearNumero(ctx, 9.5, 1)} នាទីក្នុងមួយម៉ាយ ឬ 9:30។`
          : `បំប្លែងពេលវេលាជានាទី រួចចែកនឹងចំនួនគីឡូម៉ែត្រ។ រត់ 10 គ.ម ក្នុង 55 នាទី ស្មើនឹង ${formatearNumero(ctx, 5.5, 1)} នាទីក្នុងមួយគីឡូម៉ែត្រ ឬ 5:30។`,
      },
      {
        pregunta: "តើអ្នកចាប់ផ្តើមថ្មីគួររត់ល្បឿនប៉ុន្មាន?",
        respuesta: "ល្បឿនដែលនៅតែអាចនិយាយបានពេលកំពុងរត់។ ពេលរាងកាយរឹងមាំឡើង ល្បឿនរត់នឹងលឿនឡើងដោយខ្លួនឯង។",
      },
      {
        pregunta: "តើម៉ារ៉ាតុងវែងប៉ុន្មានគីឡូម៉ែត្រ?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} គ.ម (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} ម៉ាយ)។ កន្លះម៉ារ៉ាតុងវែងពាក់កណ្តាលនៃចម្ងាយនេះ។`,
      },
    ],
    glosario: [
      { termino: "ល្បឿនរត់", definicion: "ពេលវេលាដែលប្រើរត់មួយគីឡូម៉ែត្រ ឬមួយម៉ាយ។" },
      { termino: "ល្បឿនមធ្យម", definicion: "ចម្ងាយដែលរត់បានក្នុងមួយម៉ោង។" },
    ],
  };
};
