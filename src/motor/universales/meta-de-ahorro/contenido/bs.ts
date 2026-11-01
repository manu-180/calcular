import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoBs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  return {
    h1: "Kalkulator štednje za cilj",
    title: tituloQueEntre(`Štednja za cilj: kalkulator ${GRAMATICA.bs.para(ctx.nombrePais)}`, "Kalkulator štednje za cilj", "Štednja za cilj"),
    description: "Saznajte koliko mjesečno trebate odvajati kako biste na vrijeme uštedjeli potreban iznos, uz ono što već imate i kamatu na ušteđevinu.",
    intro: [
      "Ljetovanje, automobil, učešće za stan ili rezerva za nepredviđene troškove. Cilj s iznosom i rokom puno se lakše ostvaruje.",
      "Unesite koliko želite uštedjeti i za koliko mjeseci. Kalkulator pokazuje koliko trebate odvajati mjesečno i koliko sedmično.",
    ],
    comoSeCalcula: [
      "Najprije se računa koliko će vaša dosadašnja ušteđevina narasti do kraja perioda.",
      "Ono što još nedostaje dijeli se na jednake mjesečne uplate.",
      "Ako ušteđevina donosi kamatu, donosi je i svaka uplata, pa je dovoljno uplaćivati nešto manje.",
    ],
    ejemplo: [
      `Da biste za 24 mjeseca bez kamate uštedjeli ${m(meta)}, trebate odvajati ${m(meta / 24)} mjesečno.`,
      `Ako već imate ${m(actual)} i ušteđevina donosi 5 % godišnje, dovoljno je ${m(aporteNecesario(meta, actual, 24, 5))} mjesečno.`,
    ],
    faq: [
      {
        pregunta: "Kako se držati cilja?",
        respuesta: "Odvojite novac odmah nakon plate, prije nego što počnete trošiti. Ako možete, namjestite trajni nalog na poseban štedni račun.",
      },
      {
        pregunta: "Šta ako je mjesečni iznos previsok?",
        respuesta: "Dajte si više vremena ili smanjite cilj. Možete i početi s onim što možete, pa povećati uplatu kada vam porastu prihodi.",
      },
      {
        pregunta: "Trebam li računati s inflacijom?",
        respuesta: "Ako je cilj nekoliko godina daleko, dodajte iznosu očekivanu inflaciju. Ono što danas košta 100 za nekoliko godina može koštati primjetno više.",
      },
    ],
    glosario: [
      { termino: "Uplata", definicion: "Novac koji svakog mjeseca odvajate za cilj." },
      { termino: "Prinos", definicion: "Koliko vaša ušteđevina donosi na računu ili u ulaganju." },
    ],
  };
};
