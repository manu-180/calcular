import { GRAMATICA } from "../../../i18n/gramatica";
import { formaSk } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  const horas = Math.round(r.horas);
  return {
    h1: "Kalkulačka hodinovej sadzby freelancera",
    title: tituloQueEntre(
      `Hodinová sadzba freelancera: kalkulačka ${GRAMATICA.sk.para(ctx.nombrePais)}`,
      "Koľko si účtovať za hodinu: kalkulačka sadzby",
      "Kalkulačka hodinovej sadzby",
    ),
    description:
      "Vypočítajte si hodinovú a dennú sadzbu na voľnej nohe podľa toho, koľko chcete zarobiť, a podľa výdavkov, daní, voľna a fakturovateľných hodín.",
    intro: [
      "Najčastejšia chyba na voľnej nohe je vziať mzdu, akú by ste chceli ako zamestnanci, a vydeliť ju 160 hodinami. Chýbajú v tom dane, výdavky, dovolenka a všetky hodiny, ktoré nemôžete vyfakturovať.",
      "Táto kalkulačka vychádza z toho, koľko chcete mať čistého, a povie vám, koľko si musíte účtovať.",
    ],
    comoSeCalcula: [
      "Potrebná fakturácia = čistý príjem ÷ (1 − sadzba daní) + výdavky na podnikanie.",
      "Pracovné dni = 52 týždňov × dni v týždni − dni voľna.",
      "Fakturovateľné hodiny za rok = pracovné dni × fakturovateľné hodiny za deň.",
      "Hodinová sadzba = potrebná fakturácia ÷ fakturovateľné hodiny za rok.",
    ],
    ejemplo: [
      `Aby ste mali čistého ${m(ingreso)} za rok, pri výdavkoch ${m(gastos)} a daniach 25 % potrebujete vyfakturovať ${m(r.facturado)}.`,
      `Pri 30 dňoch voľna a 25 fakturovateľných hodinách týždenne je to ${formatearNumero(ctx, horas)} ${formaSk(horas, "hodina", "hodiny", "hodín")} za rok: sadzba ${m(r.hora)} za hodinu alebo ${m(r.dia)} za deň.`,
    ],
    faq: [
      {
        pregunta: "Koľko hodín týždenne môžem fakturovať?",
        respuesta:
          "Menej, ako odpracujete. Zháňanie klientov, e-maily, fakturácia a vzdelávanie zaberú čas, ktorý vám nikto nezaplatí. Zvyčajne je to 20 až 30 fakturovateľných hodín zo 40.",
      },
      {
        pregunta: "Mám si účtovať za hodinu, alebo za projekt?",
        respuesta: "Funguje oboje. Aj keď nacenujete celý projekt, odhadnite počet hodín a vynásobte ho touto sadzbou, aby ste neprišli skrátka.",
      },
      {
        pregunta: "Akú sadzbu daní mám použiť?",
        respuesta:
          "Záleží na krajine a na forme podnikania. Spočítajte daň z príjmov a sociálne a zdravotné poistenie. Ak máte pochybnosti, opýtajte sa účtovníka.",
      },
    ],
    glosario: [
      { termino: "Fakturovateľné hodiny", definicion: "Pracovné hodiny, ktoré účtujete klientovi." },
      { termino: "Čistý príjem", definicion: "Čo vám zostane po daniach a výdavkoch na podnikanie." },
    ],
  };
};
