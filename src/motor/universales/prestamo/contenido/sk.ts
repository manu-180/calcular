import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "Kalkulačka úveru a pôžičky",
    title: tituloQueEntre(`Kalkulačka úveru ${GRAMATICA.sk.para(ctx.nombrePais)}`, "Kalkulačka úveru a pôžičky", "Kalkulačka úveru"),
    description: "Vypočítajte mesačnú splátku úveru, úroky spolu a celý splátkový kalendár. Uvidíte, koľko ušetríte mimoriadnymi splátkami.",
    intro: [
      "Predtým, ako podpíšete zmluvu o úvere, rozhodujú dve čísla: koľko budete platiť mesačne a koľko vás pôžička bude stáť na úrokoch.",
      "Zadajte výšku úveru, ročnú sadzbu a dobu splácania. Ak plánujete každý mesiac splácať niečo navyše, pridajte to a uvidíte, o koľko skôr dlh splatíte.",
    ],
    comoSeCalcula: [
      "Počíta sa s pevnou mesačnou splátkou (anuitné splácanie), bežnou pri spotrebných úveroch, pôžičkách na auto aj hypotékach.",
      "Mesačná sadzba = ročná sadzba ÷ 12.",
      "Splátka = výška úveru × mesačná sadzba ÷ (1 − (1 + mesačná sadzba) na mínus počet splátok).",
      "Každý mesiac sa úrok počíta z toho, čo ešte dlhujete. Zvyšok splátky znižuje istinu.",
    ],
    ejemplo: [
      `Úver ${m(monto)} so sadzbou 12 % ročne na 36 mesiacov má splátku ${m(cuota36)}. Na úrokoch zaplatíte spolu ${m(interesesTotales(monto, 12, 36))}.`,
      `Pri predĺžení na 60 mesiacov klesne splátka na ${m(cuota60)}, ale úroky vzrastú na ${m(interesesTotales(monto, 12, 60))}.`,
    ],
    faq: [
      {
        pregunta: "Ako sa počíta splátka úveru?",
        respuesta:
          "Podľa vzorca pre anuitné splácanie. Všetky splátky sú rovnaké, ale na začiatku tvorí väčšinu splátky úrok a ku koncu istina. Preto dlh spočiatku klesá pomaly.",
      },
      {
        pregunta: "Oplatí sa splatiť úver predčasne?",
        respuesta:
          "Zvyčajne áno, ak za to veriteľ nežiada vysoký poplatok. Peniaze navyše idú rovno na istinu a z nej sa už úrok nepočíta. Čím skôr splatíte, tým viac ušetríte.",
      },
      {
        pregunta: "Je dlhšia doba splácania výhodnejšia?",
        respuesta: "Splátka je nižšia, ale na úrokoch zaplatíte spolu oveľa viac. Skôr ako sa rozhodnete, porovnajte obe čísla.",
      },
      {
        pregunta: "Prečo mi banka uvádza inú splátku?",
        respuesta:
          "Banky a iní veritelia často pripočítavajú poistenie, poplatky za vedenie úveru alebo počítajú s inou sadzbou, ako inzerujú. Ponuky porovnávajte podľa RPMN a celkovej sumy, nielen podľa úrokovej sadzby.",
      },
    ],
    glosario: [
      { termino: "Istina", definicion: "Časť dlhu, ktorú ste ešte nesplatili." },
      { termino: "RPMN", definicion: "Ročná percentuálna miera nákladov. Zahŕňa úrok aj poplatky, takže ukazuje skutočnú cenu úveru." },
      { termino: "Úmor", definicion: "Časť každej splátky, ktorá znižuje dlh." },
    ],
  };
};
