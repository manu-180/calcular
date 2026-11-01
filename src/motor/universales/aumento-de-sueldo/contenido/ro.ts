import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const sueldo = montoEjemplo(ctx, 4000);
  return {
    h1: "Calculator mărire de salariu",
    title: tituloQueEntre(`Calculator mărire de salariu: ${ctx.nombrePais}`, "Calculator mărire de salariu", "Mărire de salariu"),
    description: "Calculați salariul nou după o mărire, diferența pe lună și pe an și dacă mărirea reală bate inflația.",
    intro: [
      "Ați primit o ofertă de mărire sau urmează să cereți una. Introduceți salariul și mărirea, în procente sau ca sumă, și vedeți cât se schimbă pe lună și pe an.",
      "Adăugați inflația din perioadă și vă spunem dacă puterea de cumpărare chiar crește sau doar recuperați ce ați pierdut.",
    ],
    comoSeCalcula: [
      "Salariul nou = salariul actual × (1 + mărirea ÷ 100).",
      "Diferența pe an = diferența pe lună × numărul de salarii pe an.",
      "Mărirea reală = (1 + mărirea) ÷ (1 + inflația) − 1.",
    ],
    ejemplo: [
      `Un salariu de ${m(sueldo)} pe lună cu o mărire de 5% devine ${m(sueldo * 1.05)}: cu ${m(sueldo * 0.05)} mai mult pe lună și cu ${m(sueldo * 0.05 * 12)} mai mult pe an.`,
      `Dacă inflația din perioadă a fost de 3%, mărirea reală este ${p(aumentoReal(5, 3))}. Cu o inflație de 6%, este ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "Ce este mărirea reală de salariu?",
        respuesta: "Este mărirea după inflație. Arată dacă salariul nou cumpără mai mult sau mai puțin decât înainte.",
      },
      {
        pregunta: "De ce nu se scade pur și simplu inflația din mărire?",
        respuesta: `Pentru că cele două procente se înmulțesc, nu se adună. Cu o mărire de 5% și o inflație de 3%, mărirea reală este ${p(aumentoReal(5, 3))}, nu 2%. Când inflația este mare, diferența crește mult.`,
      },
      {
        pregunta: "Ce mărire de salariu să cer?",
        respuesta: "Cel puțin inflația de la ultima mărire, ca să nu pierdeți putere de cumpărare. Peste atât contează cât plătesc alți angajatori pentru un post ca al dumneavoastră și cât a crescut rolul dumneavoastră.",
      },
    ],
    glosario: [
      { termino: "Mărire nominală", definicion: "Mărirea așa cum apare pe fluturașul de salariu, înainte de inflație." },
      { termino: "Putere de cumpărare", definicion: "Ce puteți cumpăra cu salariul." },
    ],
  };
};
