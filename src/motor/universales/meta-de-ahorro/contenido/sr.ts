import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  return {
    h1: "Kalkulator štednje za cilj",
    title: tituloQueEntre(`Štednja za cilj: kalkulator ${GRAMATICA.sr.para(ctx.nombrePais)}`, "Kalkulator štednje za cilj", "Štednja za cilj"),
    description: "Saznajte koliko mesečno da odvajate da biste na vreme uštedeli potreban iznos, uz ono što već imate i kamatu na ušteđevinu.",
    intro: [
      "Letovanje, automobil, učešće za stan ili rezerva za nepredviđene troškove. Cilj sa iznosom i rokom mnogo se lakše ostvaruje.",
      "Unesite koliko želite da uštedite i za koliko meseci. Kalkulator pokazuje koliko treba da odvajate mesečno i koliko nedeljno.",
    ],
    comoSeCalcula: [
      "Prvo se računa koliko će vaša dosadašnja ušteđevina narasti do kraja perioda.",
      "Ono što još nedostaje deli se na jednake mesečne uplate.",
      "Ako ušteđevina donosi kamatu, donosi je i svaka uplata, pa je dovoljno uplaćivati nešto manje.",
    ],
    ejemplo: [
      `Da biste za 24 meseca bez kamate uštedeli ${m(meta)}, treba da odvajate ${m(meta / 24)} mesečno.`,
      `Ako već imate ${m(actual)} i ušteđevina donosi 5% godišnje, dovoljno je ${m(aporteNecesario(meta, actual, 24, 5))} mesečno.`,
    ],
    faq: [
      {
        pregunta: "Kako da se držim cilja?",
        respuesta: "Odvojite novac odmah posle plate, pre nego što počnete da trošite. Ako možete, podesite trajni nalog na poseban štedni račun.",
      },
      {
        pregunta: "Šta ako je mesečni iznos previsok?",
        respuesta: "Dajte sebi više vremena ili smanjite cilj. Možete i da počnete sa onim što možete, pa da povećate uplatu kada vam porastu prihodi.",
      },
      {
        pregunta: "Da li da računam sa inflacijom?",
        respuesta: "Ako je cilj nekoliko godina daleko, dodajte iznosu očekivanu inflaciju. Ono što danas košta 100 za nekoliko godina može da košta primetno više.",
      },
    ],
    glosario: [
      { termino: "Uplata", definicion: "Novac koji svakog meseca odvajate za cilj." },
      { termino: "Prinos", definicion: "Koliko vaša ušteđevina donosi na računu ili u ulaganju." },
    ],
  };
};
