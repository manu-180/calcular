import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoHr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  return {
    h1: "Kalkulator marže i markupa",
    title: tituloQueEntre(`Kalkulator marže ${GRAMATICA.hr.para(ctx.nombrePais)}`, "Kalkulator marže i markupa", "Kalkulator marže"),
    description: "Izračunajte maržu i markup iz troška i prodajne cijene ili prodajnu cijenu kojom postižete maržu koju želite.",
    intro: [
      "Marža i markup često se miješaju, a ta vas razlika može skupo stajati. Oba mjere istu dobit, samo u odnosu na drugu osnovicu.",
      "Unesite trošak i prodajnu cijenu i vidjet ćete oba broja. Ili zadajte maržu, a kalkulator će vam reći po kojoj cijeni prodavati.",
    ],
    comoSeCalcula: [
      "Dobit = prodajna cijena − trošak.",
      "Marža = dobit ÷ prodajna cijena × 100.",
      "Markup = dobit ÷ trošak × 100.",
      "Cijena za željenu maržu = trošak ÷ (1 − marža ÷ 100).",
    ],
    ejemplo: [
      `Proizvod s troškom od ${m(costo)} koji prodajete po ${m(precio)} donosi dobit od ${m(precio - costo)}: marža je ${p(((precio - costo) / precio) * 100)}, a markup ${p(((precio - costo) / costo) * 100)}.`,
      `Za maržu od 50 % uz isti trošak trebate prodavati po ${m(precioConMargen(costo, 50))}. Ako na trošak samo dodate 50 %, marža će biti samo ${p(100 / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Koja je razlika između marže i markupa?",
        respuesta: "Marža je dobit u odnosu na prodajnu cijenu. Markup je dobit u odnosu na trošak. Za istu dobit markup je uvijek veći broj.",
      },
      {
        pregunta: "Kako odrediti cijenu za željenu maržu?",
        respuesta: `Trošak podijelite s (1 − marža). Za maržu od 30 % trošak podijelite s ${formatearNumero(ctx, 0.7, 2)}. Nemojte samo dodati 30 % na trošak: zaradit ćete manje nego što očekujete.`,
      },
      {
        pregunta: "Treba li trošak sadržavati poreze?",
        respuesta: "Računajte trošak i cijenu bez poreza koje prenosite na kupca, na primjer bez PDV-a. U suprotnom marža ispada veća nego što stvarno jest.",
      },
    ],
    glosario: [
      { termino: "Marža", definicion: "Dobit kao postotak prodajne cijene." },
      { termino: "Markup", definicion: "Dobit kao postotak troška, ono što se dodaje na nabavnu cijenu." },
    ],
  };
};
