import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  return {
    h1: "Nominālās procentu likmes pārrēķins uz efektīvo",
    title: tituloQueEntre(
      `Efektīvā procentu likme ${GRAMATICA.lv.en(ctx.nombrePais)}`,
      "Efektīvā procentu likme: kalkulators",
      "Efektīvā procentu likme",
    ),
    description: "Pārrēķiniet nominālo gada likmi uz efektīvo gada likmi un otrādi, ja procentus pieskaita katru mēnesi, ceturksni, pusgadu vai dienu.",
    intro: [
      "Divi piedāvājumi ar vienu un to pašu likmi var maksāt dažādi. Atšķirība ir tajā, cik bieži procentus rēķina vai pieskaita.",
      "Efektīvā gada likme visus piedāvājumus izlīdzina: parāda, cik gadā patiešām samaksāsiet vai nopelnīsiet. Izvēlieties likmi, kas jums ir, un parādīsim otru.",
    ],
    comoSeCalcula: [
      "Efektīvā likme = (1 + nominālā likme ÷ m) pakāpē m, mīnus 1. Skaitlis m parāda, cik reižu gadā pieskaita procentus: 12, ja katru mēnesi, un 4, ja katru ceturksni.",
      "Nominālā likme = m × ((1 + efektīvā likme) pakāpē (1 ÷ m), mīnus 1).",
      "Perioda likme ir nominālā likme, izdalīta ar m.",
    ],
    ejemplo: [
      `Nominālā gada likme 12%, ja procentus pieskaita katru mēnesi, atbilst efektīvajai likmei ${p(aEfectiva(12, 12))}.`,
      `Efektīvā likme 10% atbilst nominālajai likmei ${p(aNominal(10, 12))}, ja procentus pieskaita katru mēnesi.`,
    ],
    faq: [
      {
        pregunta: "Ar ko atšķiras nominālā un efektīvā procentu likme?",
        respuesta:
          "Nominālā likme ir gada likme bez procentu pieskaitīšanas ietekmes. Efektīvā ņem vērā arī to, ka procentus rēķina no jau pieskaitītiem procentiem. Tāpēc efektīvā likme vienmēr ir vienāda ar nominālo vai lielāka par to.",
      },
      {
        pregunta: "Kuru likmi izmantot, salīdzinot piedāvājumus?",
        respuesta:
          "Krājot salīdziniet efektīvo likmi, jo tā parāda, cik patiešām nopelnīsiet. Ņemot kredītu, salīdziniet GPL, kas bez procentiem ietver arī komisijas maksas.",
      },
      {
        pregunta: "Kāpēc biežāka pieskaitīšana palielina efektīvo likmi?",
        respuesta:
          "Procenti ātrāk pievienojas atlikumam un paši sāk nest procentus. Ja procentus pieskaita reizi gadā, nominālā un efektīvā likme sakrīt.",
      },
    ],
    glosario: [
      { termino: "Nominālā likme", definicion: "Gada likme bez procentu pieskaitīšanas ietekmes." },
      { termino: "Efektīvā likme", definicion: "Gada likme, ņemot vērā saliktos procentus." },
      { termino: "Procentu pieskaitīšana", definicion: "Brīdis, kad procentus pievieno atlikumam." },
      { termino: "GPL", definicion: "Gada procentu likme: procenti un visas kredīta komisijas maksas vienā skaitlī." },
    ],
  };
};
