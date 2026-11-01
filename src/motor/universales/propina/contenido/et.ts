import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.1;
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Jootraha kalkulaator",
    title: tituloQueEntre(
      `Jootraha kalkulaator: arvuta jootraha ja jaga arve | ${ctx.nombrePais}`,
      `Jootraha kalkulaator | ${ctx.nombrePais}`,
      "Jootraha kalkulaator",
    ),
    description: "Arvuta jootraha, lõppsumma ja iga inimese osa, kui arve jagatakse mitme peale. Soovi korral saad iga osa ümardada ülespoole ümmarguseks summaks.",
    intro: [
      "Sisesta arve summa, jootraha protsent ja maksjate arv. Näed jootraha, lõppsummat ja iga inimese osa.",
      "Kui tahad ümmargusi summasid, ümardatakse iga osa ülespoole ja ülejääk läheb jootrahaks.",
    ],
    comoSeCalcula: [
      "Jootraha = arve summa × jootraha protsent ÷ 100.",
      "Kokku = arve summa + jootraha.",
      "Iga inimese osa on lõppsumma jagatud maksjate arvuga.",
    ],
    ejemplo: [
      `Kui arve on ${m(cuenta)}, on 10% jootraha ${m(propina)} ja lõppsumma ${m(cuenta + propina)}.`,
      `Kui arve jagatakse kolme peale, maksab igaüks ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Kui palju jootraha peaks andma?",
        respuesta: "See oleneb kohalikest tavadest. Põhjamaades ja paljudes teistes riikides sisaldub teenindus hinnas, seega on jootraha vabatahtlik ja keegi seda ei eelda. Kui teenindus oli hea, piisab summa ülespoole ümardamisest. Reisil tasub vaadata kohalikku tava ja seda, kas arvele on juba lisatud teenustasu.",
      },
      {
        pregunta: "Kas jootraha arvutatakse summast enne käibemaksu või pärast seda?",
        respuesta: "Enamasti arvutatakse see arve lõppsummast. Kui tahad arvutada käibemaksuta summast, sisesta see arve summaks.",
      },
      {
        pregunta: "Kuidas arvutada kiiresti 10% jootraha?",
        respuesta: `Jaga arve summa kümnega. Kui arve on ${n(450)}, on jootraha ${n(450 / 10)}.`,
      },
    ],
    glosario: [
      { termino: "Jootraha", definicion: "Vabatahtlik lisasumma, mille annad teeninduse eest hinnale lisaks." },
      { termino: "Teenustasu", definicion: "Tasu, mille restoran või muu koht on teeninduse eest juba arvele lisanud." },
    ],
  };
};
