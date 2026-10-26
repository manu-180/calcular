import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `En uteplats på 10 × 10 ft och 4 in tjock behöver ${n(ft3)} ft³ betong, alltså ${n(ft3 / 27)} kubikyard.`,
          `Med referensblandningen blir det ungefär ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} lb cement.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `En platta på 4 × 3 m och 10 cm tjock behöver ${n(volumen, 1)} m³ betong.`,
          `Med referensblandningen blir det ungefär ${n(MEZCLA.cementoKg * volumen, 0)} kg cement, ${n(MEZCLA.arenaM3 * volumen)} m³ sand och ${n(MEZCLA.piedraM3 * volumen)} m³ sten.`,
        ];
      })();
  return {
    h1: "Betongkalkylator: hur mycket betong behöver jag?",
    title: tituloQueEntre(
      `Betongkalkylator: hur mycket betong behöver jag? | ${ctx.nombrePais}`,
      `Betongkalkylator | ${ctx.nombrePais}`,
      "Betongkalkylator",
    ),
    description: `Räkna ut hur mycket betong du behöver till en gjutning, i ${imperial ? "kubikyard" : "kubikmeter"}, och ungefär hur mycket cement, sand och sten du ska köpa.`,
    intro: [
      "Fyll i längd, bredd och tjocklek. Du ser betongvolymen och ungefär hur mycket material som går åt till blandningen.",
      "Materialmängderna beror på receptet. Kalkylatorn utgår från en allmän blandning 1:2:3.",
    ],
    comoSeCalcula: [
      imperial
        ? "Volym = längd × bredd × tjocklek, med tjockleken i fot. Dela kubikfot med 27 för att få kubikyard."
        : "Volym = längd × bredd × tjocklek, med tjockleken i meter.",
      "Sedan läggs marginalen för ojämn mark och spill till.",
      `Per m³: ungefär ${n(MEZCLA.cementoKg, 0)} kg cement, ${n(MEZCLA.arenaM3)} m³ sand, ${n(MEZCLA.piedraM3, 1)} m³ sten och ${n(MEZCLA.aguaL, 0)} liter vatten.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Hur räknar jag ut hur mycket betong som går åt?",
        respuesta: `Multiplicera längd, bredd och tjocklek i meter. En platta på 4 × 3 m och 10 cm tjock blir ${n(4 * 3 * 0.1, 1)} m³.`,
      },
      {
        pregunta: "Hur mycket cement går det åt per kubikmeter betong?",
        respuesta: `Med en blandning 1:2:3 ungefär ${n(MEZCLA.cementoKg, 0)} kg. Starkare betong kräver mer cement.`,
      },
      {
        pregunta: "Ska jag beställa fabriksbetong?",
        respuesta: "Vid stora gjutningar blir det oftast jämnare och går snabbare. För mindre jobb är det vanligt att blanda själv med de här mängderna.",
      },
    ],
    glosario: [
      { termino: "Blandningsförhållande", definicion: "Förhållandet mellan cement, sand, sten och vatten i blandningen." },
      { termino: "Gjutning", definicion: "När betongen hälls i formen och får härda." },
    ],
  };
};
