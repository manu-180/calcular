import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `En terrasse på 10 × 10 ft og 4 in tykk trenger ${n(ft3)} ft³ betong, altså ${n(ft3 / 27)} kubikkyard.`,
          `Med referanseblandingen blir det omtrent ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} lb sement.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `En plate på 4 × 3 m og 10 cm tykk trenger ${n(volumen, 1)} m³ betong.`,
          `Med referanseblandingen blir det omtrent ${n(MEZCLA.cementoKg * volumen, 0)} kg sement, ${n(MEZCLA.arenaM3 * volumen)} m³ sand og ${n(MEZCLA.piedraM3 * volumen)} m³ pukk.`,
        ];
      })();
  return {
    h1: "Betongkalkulator: hvor mye betong trenger jeg?",
    title: tituloQueEntre(
      `Betongkalkulator: hvor mye betong trenger jeg? | ${ctx.nombrePais}`,
      `Betongkalkulator | ${ctx.nombrePais}`,
      "Betongkalkulator",
    ),
    description: `Regn ut hvor mye betong du trenger til et støp, i ${imperial ? "kubikkyard" : "kubikkmeter"}, og omtrent hvor mye sement, sand og pukk du må kjøpe.`,
    intro: [
      "Fyll inn lengde, bredde og tykkelse. Du ser mengden betong og omtrent hvor mye materiale som går med til blandingen.",
      "Mengdene avhenger av reseptet. Kalkulatoren tar utgangspunkt i en vanlig blanding 1:2:3.",
    ],
    comoSeCalcula: [
      imperial
        ? "Mengde = lengde × bredde × tykkelse, med tykkelsen i fot. Del kubikkfot på 27 for å få kubikkyard."
        : "Mengde = lengde × bredde × tykkelse, med tykkelsen i meter.",
      "Deretter legges tillegget for ujevnt underlag og svinn til.",
      `Per m³: omtrent ${n(MEZCLA.cementoKg, 0)} kg sement, ${n(MEZCLA.arenaM3)} m³ sand, ${n(MEZCLA.piedraM3, 1)} m³ pukk og ${n(MEZCLA.aguaL, 0)} liter vann.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Hvordan regner jeg ut hvor mye betong som går med?",
        respuesta: `Gang lengde, bredde og tykkelse i meter. En plate på 4 × 3 m og 10 cm tykk gir ${n(4 * 3 * 0.1, 1)} m³.`,
      },
      {
        pregunta: "Hvor mye sement går det til en kubikkmeter betong?",
        respuesta: `Med en blanding 1:2:3 omtrent ${n(MEZCLA.cementoKg, 0)} kg. Sterkere betong krever mer sement.`,
      },
      {
        pregunta: "Bør jeg bestille ferdigbetong?",
        respuesta: "Ved store støp blir det som regel jevnere og går raskere. Til mindre jobber er det vanlig å blande selv med disse mengdene.",
      },
    ],
    glosario: [
      { termino: "Blandingsforhold", definicion: "Forholdet mellom sement, sand, pukk og vann i blandingen." },
      { termino: "Støp", definicion: "Når betongen helles i forskalingen og får herde." },
    ],
  };
};
