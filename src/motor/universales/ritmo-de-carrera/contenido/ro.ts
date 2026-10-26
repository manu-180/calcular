import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "milă" : "kilometru";
  const corto = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "Calculator ritm de alergare",
    title: tituloQueEntre(`Calculator ritm de alergare: ${ctx.nombrePais}`, "Calculator ritm de alergare (min/km)", "Calculator ritm de alergare"),
    description: `Calculați ritmul pe ${u}, timpul final sau distanța pentru o cursă de 5 km, 10 km, semimaraton sau maraton.`,
    intro: [
      "Cu două dintre cele trei valori (distanța, timpul și ritmul) aflați a treia. Folosiți calculatorul ca să planificați o cursă sau să verificați un antrenament.",
      "Distanțele de 5 km, 10 km, semimaraton și maraton sunt deja incluse.",
    ],
    comoSeCalcula: [
      `Ritm = timp ÷ distanță, în minute și secunde pe ${u}.`,
      "Timp = ritm × distanță.",
      "Distanță = timp ÷ ritm. Viteza medie este distanța împărțită la numărul de ore.",
    ],
    ejemplo: imperial
      ? [
          `3 mile în 27 de minute înseamnă un ritm de 9:00 pe milă, adică ${formatearNumero(ctx, 20 / 3, 2)} mph.`,
          `Un semimaraton (${formatearNumero(ctx, media, 2)} mi) alergat cu ${ritmoTexto(ritmoMedia)} pe milă se termină în ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          "10 km în 50 de minute înseamnă un ritm de 5:00 pe kilometru, adică 12 km/h.",
          `Un semimaraton (${formatearNumero(ctx, media, 1)} ${corto}) alergat cu ${ritmoTexto(ritmoMedia)} pe kilometru se termină în ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Cum se calculează ritmul pe ${u}?`,
        respuesta: imperial
          ? `Transformați timpul în minute și împărțiți-l la numărul de mile. 3 mile în 28 de minute și 30 de secunde înseamnă ${formatearNumero(ctx, 9.5, 1)} minute pe milă, adică 9:30.`
          : `Transformați timpul în minute și împărțiți-l la numărul de kilometri. 10 km în 55 de minute înseamnă ${formatearNumero(ctx, 5.5, 1)} minute pe kilometru, adică 5:30.`,
      },
      {
        pregunta: "Care este un ritm bun pentru începători?",
        respuesta: "Unul la care puteți încă vorbi în timp ce alergați. Ritmul scade pe măsură ce vă îmbunătățiți condiția fizică.",
      },
      {
        pregunta: "Câți kilometri are un maraton?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} km (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} mile). Semimaratonul are jumătate din această distanță.`,
      },
    ],
    glosario: [
      { termino: "Ritm de alergare", definicion: "Cât timp vă ia să parcurgeți un kilometru sau o milă." },
      { termino: "Viteză medie", definicion: "Distanța parcursă într-o oră." },
    ],
  };
};
