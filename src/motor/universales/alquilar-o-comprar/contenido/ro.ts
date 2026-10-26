import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const quien = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "cumpărarea" : "chiria");
  return {
    h1: "Calculator chirie sau cumpărare locuință",
    title: tituloQueEntre(`Chirie sau cumpărare locuință: ${ctx.nombrePais}`, "Chirie sau cumpărare locuință", "Chirie sau cumpărare"),
    description: "Comparați chiria cu cumpărarea unei locuințe pe câți ani alegeți. Vedeți care variantă vă lasă mai multă avere, din ce an și cu cât.",
    intro: [
      "Nu ajunge să comparați rata creditului cu chiria. Cine cumpără plătește dobândă, întreținere și impozit pe clădire, dar la final are locuința. Cine stă cu chirie poate ține avansul investit.",
      "Calculatorul adună toate acestea an cu an și vă arată care variantă vă lasă cu o avere netă mai mare.",
    ],
    comoSeCalcula: [
      "Cumpărare: în fiecare lună plătiți rata creditului ipotecar și costurile de proprietar. Averea netă este valoarea locuinței minus ce mai datorați băncii.",
      "Chirie: avansul și costurile de cumpărare rămân investite la randamentul alternativ, iar chiria crește în fiecare an.",
      "Lunar, varianta care cheltuie mai puțin investește diferența, așa că ambele pornesc de la același buget.",
      "Varianta mai bună este cea cu averea netă mai mare la final.",
    ],
    ejemplo: [
      `O locuință de ${m(precio)} cu avans de 20% și un credit ipotecar cu dobândă de 7% pe 25 de ani, comparată cu o chirie de ${m(alquiler)} pe lună.`,
      `Pe 10 ani iese mai bine ${quien(a10)}, cu ${m(Math.abs(a10.comprar - a10.alquilar))}. Pe 3 ani iese mai bine ${quien(a3)}, cu ${m(Math.abs(a3.comprar - a3.alquilar))}.`,
    ],
    faq: [
      {
        pregunta: "Chiria înseamnă bani aruncați?",
        respuesta:
          "Nu chiar. Și cine cumpără plătește costuri pe care nu le mai recuperează: dobânda, impozitul pe clădire și întreținerea. Contează cât aveți la final în fiecare caz.",
      },
      {
        pregunta: "De ce se schimbă răspunsul în funcție de numărul de ani?",
        respuesta:
          "Cumpărarea are costuri mari la început (costurile de cumpărare și dobânda din primii ani), care se recuperează în timp. Dacă vă mutați curând, de obicei chiria iese mai bine.",
      },
      {
        pregunta: "Ce valoare contează cel mai mult?",
        respuesta:
          "Raportul dintre preț și chirie, dobânda creditului și cât de repede cresc prețurile locuințelor. Schimbați creșterea prețului și randamentul investiției și vedeți cât se mișcă rezultatul.",
      },
    ],
    glosario: [
      { termino: "Avere netă", definicion: "Ce aveți minus ce datorați." },
      { termino: "Creșterea prețului", definicion: "Cât crește valoarea locuinței în fiecare an." },
      { termino: "Cost de oportunitate", definicion: "Cât ar fi adus avansul dacă l-ați fi investit." },
    ],
  };
};
