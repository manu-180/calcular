import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  return {
    h1: "Kalkulator marže i nacene",
    title: tituloQueEntre(`Kalkulator marže ${GRAMATICA.sr.para(ctx.nombrePais)}`, "Kalkulator marže i nacene", "Kalkulator marže"),
    description: "Izračunajte maržu i nacenu iz troška i prodajne cene, ili prodajnu cenu kojom postižete maržu koju želite.",
    intro: [
      "Marža i nacena se često mešaju, a ta razlika može da vas košta. Obe mere istu zaradu, samo u odnosu na drugu osnovicu.",
      "Unesite trošak i prodajnu cenu i videćete oba broja. Ili zadajte maržu, a kalkulator će vam reći po kojoj ceni da prodajete.",
    ],
    comoSeCalcula: [
      "Zarada = prodajna cena − trošak.",
      "Marža = zarada ÷ prodajna cena × 100.",
      "Nacena = zarada ÷ trošak × 100.",
      "Cena za željenu maržu = trošak ÷ (1 − marža ÷ 100).",
    ],
    ejemplo: [
      `Proizvod sa troškom od ${m(costo)} koji prodajete po ${m(precio)} donosi zaradu od ${m(precio - costo)}: marža je ${p(((precio - costo) / precio) * 100)}, a nacena ${p(((precio - costo) / costo) * 100)}.`,
      `Za maržu od 50% uz isti trošak treba da prodajete po ${m(precioConMargen(costo, 50))}. Ako na trošak samo dodate 50%, marža će biti svega ${p(100 / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Koja je razlika između marže i nacene?",
        respuesta: "Marža je zarada u odnosu na prodajnu cenu. Nacena je zarada u odnosu na trošak. Za istu zaradu nacena je uvek veći broj.",
      },
      {
        pregunta: "Kako odrediti cenu za željenu maržu?",
        respuesta: `Trošak podelite sa (1 − marža). Za maržu od 30% trošak podelite sa ${formatearNumero(ctx, 0.7, 2)}. Nemojte samo dodati 30% na trošak: zaradićete manje nego što očekujete.`,
      },
      {
        pregunta: "Da li trošak treba da sadrži poreze?",
        respuesta: "Računajte trošak i cenu bez poreza koje prenosite na kupca, na primer bez PDV-a. U suprotnom marža izlazi veća nego što stvarno jeste.",
      },
    ],
    glosario: [
      { termino: "Marža", definicion: "Zarada u procentima od prodajne cene." },
      { termino: "Nacena", definicion: "Zarada u procentima od troška, ono što se dodaje na nabavnu cenu." },
    ],
  };
};
