import { pluralLt } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const plyteles = (k: number) => pluralLt(k, "plytelė", "plytelės", "plytelių");
  const dezes = (k: number) => pluralLt(k, "dėžė", "dėžės", "dėžių");
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `Kai plotas yra 150 ft², plytelės dydis 12 × 12 in (vienos plotas 1 ft²), o atsarga 10 %, reikia: ${plyteles(piezas)}.`,
          `Jei dėžėje yra 10 plytelių, pirkti reikia: ${dezes(Math.ceil(piezas / 10))}.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `Kai plotas yra 20 m², plytelės dydis 60 × 60 cm (vienos plotas ${n(pieza)} m²), o atsarga 10 %, reikia: ${plyteles(piezas)}.`,
          `Jei dėžėje yra 4 plytelės, pirkti reikia: ${dezes(Math.ceil(piezas / 4))}.`,
        ];
      })();
  return {
    h1: "Plytelių skaičiuoklė grindims ir sienoms",
    title: tituloQueEntre(
      `Plytelių skaičiuoklė (${ctx.nombrePais})`,
      "Plytelių skaičiuoklė: kiek dėžių pirkti",
      "Plytelių skaičiuoklė",
    ),
    description: "Apskaičiuokite, kiek plytelių reikia grindims ar sienai, įskaitant atsargą pjovimui, ir kiek dėžių pirkti.",
    intro: [
      "Įveskite plotą, vienos plytelės matmenis ir plytelių skaičių dėžėje. Pamatysite, kiek plytelių ir dėžių reikia pirkti.",
      "Atsarga pjovimui padengia plyteles, pjaunamas prie kraštų, ir tas, kurios dirbant sutrūksta.",
    ],
    comoSeCalcula: [
      `Vienos plytelės plotas = ilgis × plotis, ${imperial ? "kvadratinėmis pėdomis" : "kvadratiniais metrais"}.`,
      "Plytelių skaičius = plotas × (1 + atsarga ÷ 100) ÷ vienos plytelės plotas, suapvalinta į didesnę pusę.",
      "Dėžės = plytelių skaičius ÷ plytelės dėžėje, suapvalinta į didesnę pusę.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Kokią atsargą pjovimui skaičiuoti?",
        respuesta: "Klojant tiesiai reikia 10 %. Klojant įstrižai, eglute arba patalpose, kur daug pjovimų, reikia nuo 15 iki 20 %.",
      },
      {
        pregunta: "Ar reikia skaičiuoti siūles?",
        respuesta: "Ne. Siūlės yra vos kelių milimetrų, o atsarga pjovimui šį skirtumą padengia.",
      },
      {
        pregunta: "Ar verta pirkti šiek tiek daugiau?",
        respuesta: "Taip, pasilikite kelias plyteles iš tos pačios partijos. Jei vėliau kuri nors sutrūktų, tokio pat atspalvio rasti gali būti sunku.",
      },
    ],
    glosario: [
      { termino: "Atsarga pjovimui", definicion: "Procentas plytelių, perkamų papildomai pjovimui ir sudužusioms plytelėms." },
      { termino: "Partija", definicion: "Gamybos serija. Skirtingų partijų plytelių atspalvis gali šiek tiek skirtis." },
    ],
  };
};
