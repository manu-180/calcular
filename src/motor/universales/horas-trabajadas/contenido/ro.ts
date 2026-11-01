import { deRo } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  // «8 ore», «40 de ore», «7,5 ore»: el «de» sale de la regla de plural del rumano.
  const ore = (x: number) => `${n(x)} ${deRo(n(x))}ore`;
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "Calculator ore lucrate",
    title: tituloQueEntre(`Calculator ore lucrate și pontaj: ${ctx.nombrePais}`, `Calculator ore lucrate: ${ctx.nombrePais}`, "Calculator ore lucrate"),
    description: "Adunați orele lucrate în săptămână după ora de început, ora de sfârșit și pauze și calculați plata, inclusiv orele suplimentare.",
    intro: [
      "Alegeți ora de început și de sfârșit pentru fiecare zi, pauza neplătită și plata pe oră. Vedeți totalul de ore, orele suplimentare și plata pe săptămână.",
      "Vă ajută să verificați fluturașul de salariu, să completați pontajul sau să facturați munca plătită cu ora.",
    ],
    comoSeCalcula: [
      "Ore pe zi = ora de sfârșit − ora de început − pauza. Dacă sfârșitul este mai devreme decât începutul, tura se termină a doua zi.",
      "Ore suplimentare = totalul săptămânii − orele normale, când totalul le depășește.",
      "Plata = ore normale × plata pe oră + ore suplimentare × plata pe oră × (1 + spor).",
    ],
    ejemplo: [
      `De la ${hora("09:00")} la ${hora("17:30")}, cu o pauză de 30 de minute, înseamnă ${ore(jornada)} pe zi. De luni până vineri, ${ore(jornada * 5)}: la ${m(pago)} pe oră, ${m(jornada * 5 * pago)}.`,
      `De la ${hora("08:00")} la ${hora("18:00")}, cu o oră de pauză, înseamnă ${ore(larga * 5)} pe săptămână, dintre care ${n(extra)} sunt suplimentare. Cu un spor de 50%, plata este ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "Cum calculez orele lucrate?",
        respuesta: "Scădeți ora de început din ora de sfârșit și scoateți pauza. Apoi adunați toate zilele din săptămână.",
      },
      {
        pregunta: "Cum transform minutele în ore cu zecimale?",
        respuesta: `Împărțiți minutele la 60. O jumătate de oră înseamnă ${n(0.5, 1)}; 15 minute, ${n(0.25, 2)}; 45 de minute, ${n(0.75, 2)}. Așadar, 7 ore și 45 de minute înseamnă ${n(7.75, 2)} ore.`,
      },
      {
        pregunta: "Câte ore suplimentare pot lucra și cum se plătesc?",
        respuesta: "Depinde de legea din locul în care lucrați și de contractul de muncă. Acest calculator folosește sporul și orele normale pe care le introduceți, fără să aplice o regulă anume.",
      },
    ],
    glosario: [
      { termino: "Ore suplimentare", definicion: "Orele lucrate peste programul normal, plătite cu un spor." },
      { termino: "Pontaj", definicion: "Evidența orelor de început și de sfârșit lucrate în fiecare zi." },
    ],
  };
};
