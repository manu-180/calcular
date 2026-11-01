import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  const g = GRAMATICA.sl;
  return {
    h1: `Izračun DDV ${g.para(ctx.nombrePais)}`,
    title: tituloQueEntre(`Izračun DDV (${tasa}) ${g.para(ctx.nombrePais)}`, `Kalkulator DDV (${tasa}) ${g.en(ctx.nombrePais)}`, `Izračun DDV (${tasa})`),
    description: `Dodajte ali izločite DDV po stopnji ${tasa} pri kateri koli ceni v enem koraku: cena brez DDV, znesek davka in cena z DDV, zaokroženo na dve decimalki.`,
    intro: [
      `Splošna stopnja, s katero kalkulator računa ${g.en(ctx.nombrePais)}, je ${tasa}.`,
      "Izberite, ali DDV dodajate ceni ali ga izločate iz cene, ki ga že vsebuje, nato vnesite znesek.",
    ],
    comoSeCalcula: [
      "Dodajanje DDV: davek = cena brez DDV × stopnja ÷ 100. Cena z DDV = cena brez DDV + davek.",
      "Izločanje DDV: cena brez DDV = cena z DDV ÷ (1 + stopnja ÷ 100). Davek je razlika med obema cenama.",
      "Če ima blago posebno stopnjo, jo vnesite v polje „Druga stopnja DDV“.",
    ],
    ejemplo: [
      `Če želite ceni ${precio} dodati DDV, jo pomnožite s stopnjo ${tasa} in rezultat prištejte ceni.`,
      `Koliko DDV vsebuje cena ${precio}, izveste tako, da jo delite z vsoto 1 in stopnje, rezultat pa odštejete od cene.`,
    ],
    faq: [
      {
        pregunta: "Kako izločim DDV iz cene?",
        respuesta: "Ceno delite z vsoto 1 in stopnje, zapisane kot decimalno število. Rezultat je cena brez DDV, razlika pa je davek.",
      },
      {
        pregunta: "Zakaj ne zadošča, da od cene z DDV odštejem odstotek stopnje?",
        respuesta: "Ker je davek obračunan od nižje cene, tiste brez DDV. Če odstotek odštejete od cene z DDV, odštejete več, kot davek v resnici znaša.",
      },
      {
        pregunta: `Ali se DDV po stopnji ${tasa} plača za vse?`,
        respuesta: "Ne vedno. Nekatera živila, zdravila ali storitve imajo posebno, nižjo stopnjo ali so oproščeni davka. Takrat uporabite polje „Druga stopnja DDV“.",
      },
    ],
    glosario: [
      { termino: "DDV", definicion: "Davek na dodano vrednost. Prišteje se k ceni blaga in storitev, obračuna in plača pa ga zavezanec za DDV." },
      { termino: "Cena brez DDV", definicion: "Cena pred dodajanjem davka, v računovodstvu davčna osnova." },
    ],
  };
};
