import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "Calculator ovulație",
    title: tituloQueEntre(`Calculator ovulație: ${ctx.nombrePais}`, "Calculator ovulație și zile fertile", "Calculator ovulație"),
    description: "Aflați ziua estimată a ovulației, zilele fertile și data următoarei menstruații, cu următoarele trei cicluri.",
    intro: [
      "Introduceți prima zi a ultimei menstruații și durata ciclului. Vedeți ovulația estimată, zilele fertile și următoarea menstruație.",
      "Este o estimare pentru cicluri regulate, cu scop informativ. Nu este o metodă contraceptivă și nu înlocuiește consultul unui medic.",
    ],
    comoSeCalcula: [
      `Ovulația are loc de obicei cu ${FASE_LUTEA} zile înainte de următoarea menstruație: prima zi a ultimei menstruații + durata ciclului − ${FASE_LUTEA}.`,
      "Zilele fertile încep cu 5 zile înainte de ovulație și țin până a doua zi după ea, pentru că spermatozoizii pot trăi până la 5 zile.",
      "Următoarea menstruație este așteptată la un ciclu după ultima.",
    ],
    ejemplo: [
      `Cu ultima menstruație pe ${f(fum)} și un ciclu de 28 de zile, ovulația estimată este pe ${f(aFecha(v.ovulacion))}.`,
      `Zilele fertile sunt între ${f(aFecha(v.desde))} și ${f(aFecha(v.hasta))}, iar următoarea menstruație este așteptată pe ${f(aFecha(v.proxima))}.`,
    ],
    faq: [
      {
        pregunta: "Care sunt cele mai fertile zile?",
        respuesta: "Cele două sau trei zile dinaintea ovulației și ziua ovulației. Toată fereastra fertilă durează în jur de 6 zile.",
      },
      {
        pregunta: "Funcționează dacă ciclul este neregulat?",
        respuesta: "Vă dă o idee, dar mai puțin precisă. La ciclurile neregulate, ovulația se poate muta cu câteva zile de la o lună la alta.",
      },
      {
        pregunta: "Se poate folosi pentru a evita o sarcină?",
        respuesta: "Nu. Estimarea este aproximativă, iar ovulația poate veni mai devreme sau mai târziu. Pentru a preveni o sarcină, folosiți o metodă contraceptivă și cereți sfatul medicului.",
      },
    ],
    glosario: [
      { termino: "Ovulație", definicion: "Momentul în care un ovar eliberează un ovul." },
      { termino: "Zile fertile", definicion: "Zilele din ciclu în care este posibilă o sarcină." },
    ],
  };
};
