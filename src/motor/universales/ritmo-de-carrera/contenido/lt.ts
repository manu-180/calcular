import { GRAMATICA } from "../../../i18n/gramatica";
import { formaLt } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "vienai myliai" : "vienam kilometrui";
  const corto = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  const millasMaraton = DISTANCIAS_KM.maraton / KM_POR_MILLA;
  return {
    h1: "Bėgimo tempo skaičiuoklė",
    title: tituloQueEntre(
      `Bėgimo tempo skaičiuoklė ${GRAMATICA.lt.en(ctx.nombrePais)}`,
      `Bėgimo tempo skaičiuoklė: tempas min/${corto}`,
      "Bėgimo tempo skaičiuoklė",
    ),
    description: `Apskaičiuokite tempą ${u}, finišo laiką arba atstumą 5 km, 10 km, pusmaratonio ar maratono bėgimui.`,
    intro: [
      "Įveskite bet kuriuos du iš trijų duomenų (atstumą, laiką ar tempą), o trečiąjį apskaičiuos skaičiuoklė. Tai praverčia planuojant varžybas ar tikrinant treniruotę.",
      "5 km, 10 km, pusmaratonio ir maratono atstumai jau yra sąraše.",
    ],
    comoSeCalcula: [
      `Tempas = laikas ÷ atstumas, minutėmis ir sekundėmis ${u}.`,
      "Laikas = tempas × atstumas.",
      "Atstumas = laikas ÷ tempas. Vidutinis greitis yra atstumas, padalytas iš valandų skaičiaus.",
    ],
    ejemplo: imperial
      ? [
          `Kai 3 mylios įveikiamos per 27 min, tempas yra 9:00/mi, o greitis ${formatearNumero(ctx, 20 / 3, 2)} mph.`,
          `Pusmaratonio (${formatearNumero(ctx, media, 2)} mi) laikas, bėgant ${ritmoTexto(ritmoMedia)}/mi tempu, yra ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          "Kai 10 km įveikiama per 50 min, tempas yra 5:00/km, o greitis 12 km/h.",
          `Pusmaratonio (${formatearNumero(ctx, media, 1)} ${corto}) laikas, bėgant ${ritmoTexto(ritmoMedia)}/km tempu, yra ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Kaip apskaičiuoti tempą ${u}?`,
        respuesta: imperial
          ? `Laiką paverskite minutėmis ir padalykite iš mylių skaičiaus. Kai 3 mylios įveikiamos per 28 min 30 s, tempas yra ${formatearNumero(ctx, 9.5, 1)} min/mi, tai yra 9:30.`
          : `Laiką paverskite minutėmis ir padalykite iš kilometrų skaičiaus. Kai 10 km įveikiama per 55 min, tempas yra ${formatearNumero(ctx, 5.5, 1)} min/km, tai yra 5:30.`,
      },
      {
        pregunta: "Koks tempas tinka pradedantiesiems?",
        respuesta: "Toks, kuriuo bėgant galite kalbėtis. Gerėjant fizinei formai, tempas pamažu greitėja.",
      },
      {
        pregunta: "Koks maratono ilgis?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} km (${formatearNumero(ctx, millasMaraton, 1)} ${formaLt(millasMaraton, "mylia", "mylios", "mylių", "mylios")}). Pusmaratonis yra perpus trumpesnis.`,
      },
    ],
    glosario: [
      { termino: "Tempas", definicion: "Per kiek laiko įveikiate vieną kilometrą ar vieną mylią." },
      { termino: "Vidutinis greitis", definicion: "Atstumas, įveikiamas per valandą." },
    ],
  };
};
