import { GRAMATICA } from "../../../i18n/gramatica";
import { formaSk } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const mesiace = (n: number) => `${formatearNumero(ctx, n)} ${formaSk(n, "mesiac", "mesiace", "mesiacov")}`;
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "Kalkulačka splácania kreditnej karty",
    title: tituloQueEntre(
      `Splácanie kreditnej karty: kalkulačka ${GRAMATICA.sk.para(ctx.nombrePais)}`,
      "Splácanie kreditnej karty: kalkulačka úrokov",
      "Kalkulačka splácania kreditnej karty",
    ),
    description: "Zistite, za koľko mesiacov splatíte kreditnú kartu a koľko zaplatíte na úrokoch, pri pevnej aj pri minimálnej splátke.",
    intro: [
      "Kreditná karta býva najdrahší dlh, aký máte. Keď splácate len minimum, splácanie sa ťahá roky a úroky narastajú.",
      "Zadajte dlh, ročnú úrokovú sadzbu a koľko môžete mesačne splácať. Ukážeme, kedy budete mať splatené, koľko zaplatíte na úrokoch, a plán po mesiacoch.",
    ],
    comoSeCalcula: [
      "Každý mesiac sa pripíše úrok: zostatok × ročná sadzba ÷ 12.",
      "Potom sa odpočíta splátka. Pri minimálnej splátke je to percento z dlhu, ale najmenej stanovená suma.",
      "To sa opakuje, kým zostatok neklesne na nulu. Ak splátka nie je vyššia ako úrok, dlh nikdy neklesne.",
    ],
    ejemplo: [
      `Dlh ${m(saldo)} s úrokom 22 % ročne pri splátke ${m(fijo)} mesačne splatíte za ${mesiace(conFijo.meses)} a na úrokoch zaplatíte ${m(conFijo.intereses)}.`,
      `Keď platíte len minimálnu splátku 3 %, trvá splácanie ${mesiace(conMinimo.meses)} a úroky vzrastú na ${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "Čo sa stane, keď budem splácať len minimum?",
        respuesta:
          "Minimálna splátka sa zmenšuje spolu s dlhom, takže každý mesiac platíte menej a dlh sa ťahá roky. Ak môžete, splácajte vyššiu pevnú sumu, aj keď len o trochu.",
      },
      {
        pregunta: "Oplatí sa previesť dlh z karty na spotrebný úver?",
        respuesta:
          "Ak je úroková sadzba úveru výrazne nižšia ako pri karte, zvyčajne áno. Porovnajte celkové náklady oboch možností vrátane poplatkov, najlepšie podľa RPMN.",
      },
      {
        pregunta: "Ktorú kartu splatiť ako prvú?",
        respuesta: "Na všetkých plaťte minimum a zvyšok dávajte na tú s najvyššou úrokovou sadzbou. Tak zaplatíte na úrokoch celkovo najmenej.",
      },
    ],
    glosario: [
      { termino: "Minimálna splátka", definicion: "Najmenšia suma, ktorú môžete za mesiac zaplatiť bez sankcie. Dlh tým nesplatíte." },
      { termino: "Ročná úroková sadzba", definicion: "Sadzba, ktorú karta ročne účtuje z nesplateného zostatku." },
      { termino: "Bezúročné obdobie", definicion: "Čas, počas ktorého z nákupov neplatíte úrok, ak dlh včas splatíte celý." },
    ],
  };
};
