import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoBs: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  // Ocjene kao u školi: petica 20 %, četvorka 30 %, trojka 50 %.
  const ponderado = (5 * 20 + 4 * 30 + 3 * 50) / (20 + 30 + 50);
  const simple = (5 + 4 + 3) / 3;
  return {
    h1: "Kalkulator prosjeka ocjena",
    title: tituloQueEntre(
      `Kalkulator prosjeka ocjena ${GRAMATICA.bs.para(ctx.nombrePais)}`,
      "Kalkulator prosjeka ocjena: ponderirani prosjek",
      "Kalkulator prosjeka",
    ),
    description: "Izračunajte prosjek ocjena, obični i ponderirani, za najviše 10 vrijednosti i s težinom svake od njih: u procentima, bodovima ili broju ponavljanja.",
    intro: [
      "Unesite svaku ocjenu i njenu težinu. Dobijate ponderirani prosjek, a uz njega i obični prosjek.",
      "Korisno za ocjene u osnovnoj i srednjoj školi i na fakultetu, kao i za svaki prosjek u kojem neke vrijednosti vrijede više od drugih.",
    ],
    comoSeCalcula: [
      "Obični prosjek = zbir vrijednosti ÷ broj vrijednosti.",
      "Ponderirani prosjek = zbir (vrijednost × težina) ÷ zbir težina.",
      "Težine ne moraju u zbiru davati 100: račun dijeli njihovim zbirom.",
    ],
    ejemplo: [
      `Petica s težinom od 20 %, četvorka s težinom od 30 % i trojka s težinom od 50 % daju ponderirani prosjek ${n(ponderado)}.`,
      `Obični prosjek tih triju ocjena je ${n(simple, 0)}: trojka ima najveću težinu i zato spušta ponderirani prosjek.`,
    ],
    faq: [
      {
        pregunta: "Kako se računa ponderirani prosjek?",
        respuesta: "Svaku vrijednost pomnožite njezinom težinom, rezultate saberite i zbir podijelite zbirom težina.",
      },
      {
        pregunta: "Šta ako težine u zbiru ne daju 100 %?",
        respuesta: "To nije problem. Ako jedan predmet nosi 6 bodova, a drugi 4, unesite 6 i 4. Račun dijeli ukupnom težinom.",
      },
      {
        pregunta: "Koja je razlika između običnog i ponderiranog prosjeka?",
        respuesta: "U običnom prosjeku svaka vrijednost vrijedi jednako. U ponderiranom se svaka vrijednost računa prema svojoj težini.",
      },
    ],
    glosario: [
      { termino: "Težina", definicion: "Koliki uticaj vrijednost ima na konačan prosjek." },
      { termino: "Ponderirani prosjek", definicion: "Prosjek u kojem se svaka vrijednost množi svojom težinom." },
    ],
  };
};
