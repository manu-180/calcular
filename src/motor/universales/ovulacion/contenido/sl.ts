import { pluralSl } from "../../../i18n/plural";
import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  // Intl da la fecha en nominativo: siempre tras dos puntos, nunca tras una preposición.
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "Izračun ovulacije in plodnih dni",
    title: tituloQueEntre(
      `Izračun ovulacije in plodnih dni (${ctx.nombrePais})`,
      "Izračun ovulacije in plodnih dni",
      "Izračun ovulacije",
    ),
    description: "Izračunajte dan ovulacije, plodne dneve in datum naslednje menstruacije ter tri cikle, ki sledijo.",
    intro: [
      "Vnesite prvi dan zadnje menstruacije in dolžino cikla. Videli boste predvideni dan ovulacije, plodne dneve in naslednjo menstruacijo.",
      "To je ocena za reden cikel. Ni metoda kontracepcije in ne nadomešča nasveta zdravnika ali ginekologa.",
    ],
    comoSeCalcula: [
      `Ovulacija običajno nastopi ${pluralSl(FASE_LUTEA, "dan", "dneva", "dni", "dni")} pred naslednjo menstruacijo: prvi dan zadnje menstruacije + dolžina cikla − ${FASE_LUTEA}.`,
      "Plodni dnevi trajajo od 5 dni pred ovulacijo do dneva po njej, ker lahko semenčice preživijo do 5 dni.",
      "Naslednja menstruacija je pričakovana en cikel po zadnji.",
    ],
    ejemplo: [
      `Zadnja menstruacija: ${f(fum)}. Predvidena ovulacija pri 28-dnevnem ciklu: ${f(aFecha(v.ovulacion))}.`,
      `Začetek plodnih dni: ${f(aFecha(v.desde))}. Konec plodnih dni: ${f(aFecha(v.hasta))}. Naslednja menstruacija je pričakovana okoli tega datuma: ${f(aFecha(v.proxima))}.`,
    ],
    faq: [
      {
        pregunta: "Kateri dnevi so najbolj plodni?",
        respuesta: "Dva do tri dni pred ovulacijo in sam dan ovulacije. Celotno plodno obdobje traja približno 6 dni.",
      },
      {
        pregunta: "Ali izračun velja tudi pri nerednem ciklu?",
        respuesta: "Izračun da okvirno sliko, vendar manj natančno. Pri nerednem ciklu se lahko ovulacija iz meseca v mesec premakne za nekaj dni.",
      },
      {
        pregunta: "Ali lahko to uporabim za preprečevanje nosečnosti?",
        respuesta: "Ne. Ocena je približna, ovulacija pa lahko nastopi prej ali pozneje. Za zaščito pred nosečnostjo uporabljajte kontracepcijo in se posvetujte z zdravnikom.",
      },
    ],
    glosario: [
      { termino: "Ovulacija", definicion: "Sprostitev jajčne celice iz jajčnika." },
      { termino: "Plodni dnevi", definicion: "Dnevi cikla, v katerih lahko zanosite." },
    ],
  };
};
