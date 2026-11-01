import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "Lisa kuupäevale päevi",
    title: tituloQueEntre(
      `Lisa kuupäevale päevi: arvuta uus kuupäev | ${ctx.nombrePais}`,
      `Lisa kuupäevale päevi | ${ctx.nombrePais}`,
      "Lisa kuupäevale päevi",
    ),
    description: "Lisa kuupäevale kalendri- või tööpäevi või lahuta neid ja vaata, mis päev tuleb. Mugav tähtaegade ja maksepäevade jaoks.",
    intro: [
      "Vali kuupäev, päevade arv ja see, kas lisad või lahutad. Näed uut kuupäeva ja nädalapäeva.",
      "Tööpäevade puhul jätab kalkulaator laupäevad ja pühapäevad vahele.",
    ],
    comoSeCalcula: [
      "Kalendripäevade puhul liigub kuupäev kalendris iga sisestatud päeva kohta ühe päeva võrra.",
      "Tööpäevade puhul arvestatakse ainult päevi esmaspäevast reedeni. Alguskuupäeva ennast ei arvestata.",
      "Riigipühi maha ei arvata, sest need erinevad riigiti ja piirkonniti.",
    ],
    ejemplo: [
      `Alguskuupäev: ${f(inicio)}. Kui lisad 90 kalendripäeva, on tulemus ${f(mas90)}.`,
      `Kui lisad samale kuupäevale 15 tööpäeva, on tulemus ${f(aFecha(habil))}.`,
    ],
    faq: [
      {
        pregunta: "Kas alguskuupäev loetakse esimeseks päevaks?",
        respuesta: "Ei. Kui lisad esmaspäevale ühe päeva, on tulemus teisipäev. Nii arvutatakse enamik tähtaegu.",
      },
      {
        pregunta: "Mis juhtub, kui lisan tööpäevi alates laupäevast?",
        respuesta: "Esimene tööpäev on järgmine esmaspäev. Kui lisad laupäevale ühe tööpäeva, on tulemus esmaspäev.",
      },
      {
        pregunta: "Kas kalkulaator võtab liigaastaid arvesse?",
        respuesta: "Võtab. Kui perioodi jääb 29. veebruar, läheb see arvesse ühe päevana.",
      },
    ],
    glosario: [
      { termino: "Kalendripäevad", definicion: "Kõik kalendri päevad, midagi ei jäeta vahele." },
      { termino: "Tööpäevad", definicion: "Selles kalkulaatoris päevad esmaspäevast reedeni." },
    ],
  };
};
