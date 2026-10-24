import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Calculator reducere",
    title: tituloQueEntre(`Calculator reducere: ${ctx.nombrePais}`, "Calculator reducere și preț final", "Calculator reducere"),
    description: "Calculați prețul redus și cât economisiți, inclusiv la reduceri succesive, cum ar fi 30% plus încă 10%.",
    intro: [
      "Introduceți prețul și reducerea și vedeți imediat cât plătiți și cât economisiți.",
      "Dacă oferta are o reducere suplimentară, adăugați-o și pe aceasta: două reduceri la rând nu se adună niciodată pur și simplu.",
    ],
    comoSeCalcula: [
      "Prețul redus = prețul inițial × (1 − reducerea ÷ 100).",
      "Reducerea suplimentară se aplică la prețul care are deja prima reducere.",
      "Economia este prețul inițial minus prețul redus.",
    ],
    ejemplo: [
      `Un produs care costă ${m(precio)} cu 25% reducere ajunge la ${m(precio * 0.75)}.`,
      `Cu 30% reducere și apoi încă 10%, ajunge la ${m(precio * 0.7 * 0.9)}: o reducere totală de 37%, nu de 40%.`,
    ],
    faq: [
      {
        pregunta: "Cum se calculează o reducere?",
        respuesta: "Înmulțiți prețul cu procentul și împărțiți la 100. Rezultatul este economia. Scădeți-o din preț și aflați cât plătiți.",
      },
      {
        pregunta: "30% plus 10% înseamnă 40% reducere?",
        respuesta: "Nu. A doua reducere se aplică la prețul deja redus, așa că reducerea totală este de 37%.",
      },
      {
        pregunta: "Cum aflu prețul inițial din prețul redus?",
        respuesta: `Împărțiți prețul redus la (1 − reducerea ÷ 100). La 25% reducere, împărțiți la ${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Reducere", definicion: "Procentul scăzut din prețul inițial." },
      { termino: "Reducere efectivă", definicion: "Procentul total pe care îl economisiți când se aplică mai multe reduceri." },
    ],
  };
};
