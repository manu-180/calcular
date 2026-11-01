import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "Výpočet termínu pôrodu",
    title: tituloQueEntre(`Výpočet termínu pôrodu: ${ctx.nombrePais}`, "Výpočet termínu pôrodu a týždňa tehotenstva", "Výpočet termínu pôrodu"),
    description: "Vypočítajte predpokladaný termín pôrodu podľa poslednej menštruácie alebo dátumu počatia a zistite, v ktorom týždni tehotenstva ste dnes.",
    intro: [
      "Zadajte prvý deň poslednej menštruácie (alebo dátum počatia, ak ho poznáte). Uvidíte predpokladaný termín pôrodu, týždeň tehotenstva a aktuálny trimester.",
      "Ide o orientačný odhad. Najpresnejší termín určia prehliadky u lekára alebo pôrodnej asistentky a ultrazvuk; tento výpočet nenahrádza konzultáciu s odborníkom.",
    ],
    comoSeCalcula: [
      "Používa sa Naegeleho pravidlo: k prvému dňu poslednej menštruácie sa pripočíta 280 dní (40 týždňov).",
      "Ak je váš cyklus dlhší alebo kratší ako 28 dní, termín sa posunie o tento rozdiel.",
      "Od dátumu počatia sa pripočíta 266 dní (38 týždňov).",
      "Týždne tehotenstva sa počítajú od poslednej menštruácie, nie od počatia.",
    ],
    ejemplo: [
      `Ak posledná menštruácia začala ${f(fum)} a cyklus trvá 28 dní, predpokladaný termín pôrodu je ${f(fpp)}.`,
      `Pri cykle 32 dní sa termín posunie o 4 dni: ${f(fpp32)}.`,
    ],
    faq: [
      {
        pregunta: "Ako sa počíta termín pôrodu?",
        respuesta: "K prvému dňu poslednej menštruácie sa pripočíta 280 dní. Jednoduchý postup, ktorý dá takmer rovnaký dátum: k dňu pripočítajte 7, od mesiaca odpočítajte 3 a k roku pripočítajte 1.",
      },
      {
        pregunta: "Prečo sa týždne počítajú od poslednej menštruácie?",
        respuesta: "Pretože tento dátum pozná takmer každá žena. Preto v 2. týždni ešte k počatiu nedošlo.",
      },
      {
        pregunta: "Koľko detí sa narodí presne v termíne?",
        respuesta: "Veľmi málo. Väčšina sa narodí medzi 37. a 42. týždňom, takže termín je orientačný, nie presný deň.",
      },
    ],
    glosario: [
      { termino: "Posledná menštruácia", definicion: "Prvý deň posledného menštruačného krvácania." },
      { termino: "Naegeleho pravidlo", definicion: "Spôsob, ako určiť predpokladaný termín pôrodu pripočítaním 280 dní k prvému dňu poslednej menštruácie." },
    ],
  };
};
