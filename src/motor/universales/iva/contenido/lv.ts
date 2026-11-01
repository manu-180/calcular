import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  const g = GRAMATICA.lv;
  return {
    h1: `PVN kalkulators ${g.en(ctx.nombrePais)}`,
    title: tituloQueEntre(`PVN kalkulators (${tasa}) ${g.en(ctx.nombrePais)}`, `PVN aprēķins (${tasa}) ${g.en(ctx.nombrePais)}`, `PVN kalkulators (${tasa})`),
    description: `Pieskaitiet ${tasa} PVN jebkurai cenai vai atskaitiet to vienā darbībā: cena bez PVN, pats nodoklis un cena ar PVN.`,
    intro: [
      `Standarta likme, ko kalkulators piemēro ${g.en(ctx.nombrePais)}, ir ${tasa}.`,
      "Izvēlieties, vai PVN vēlaties pieskaitīt cenai vai atskaitīt no cenas ar PVN, un ievadiet summu.",
    ],
    comoSeCalcula: [
      "PVN pieskaitīšana: nodoklis = cena bez PVN × likme ÷ 100. Cena ar PVN = cena bez PVN + nodoklis.",
      "PVN atskaitīšana: cena bez PVN = cena ar PVN ÷ (1 + likme ÷ 100). Nodoklis ir abu cenu starpība.",
      "Ja precei piemēro samazināto likmi, ievadiet to laukā „Cita PVN likme“.",
    ],
    ejemplo: [
      `Lai pieskaitītu PVN cenai ${precio}, reiziniet to ar likmi (${tasa}) un rezultātu pieskaitiet cenai.`,
      `Lai uzzinātu, cik PVN ir cenā ${precio}, daliet to ar vieninieka un likmes summu un rezultātu atņemiet no cenas.`,
    ],
    faq: [
      {
        pregunta: "Kā atskaitīt PVN no cenas?",
        respuesta: "Daliet cenu ar vieninieka un decimālskaitlī izteiktas likmes summu. Rezultāts ir cena bez PVN, bet starpība ir pats nodoklis.",
      },
      {
        pregunta: "Kāpēc nevar vienkārši atņemt likmes procentus no cenas ar PVN?",
        respuesta: "Tāpēc, ka nodokli rēķināja no mazākās cenas bez PVN. Ja procentus atņemsiet no cenas ar PVN, atņemsiet vairāk, nekā ir nodoklis.",
      },
      {
        pregunta: `Vai ${tasa} PVN piemēro visam?`,
        respuesta: "Ne vienmēr. Dažiem pārtikas produktiem, zālēm vai pakalpojumiem piemēro samazināto likmi vai tie netiek aplikti ar nodokli. Tādā gadījumā izmantojiet lauku „Cita PVN likme“.",
      },
    ],
    glosario: [
      { termino: "PVN", definicion: "Pievienotās vērtības nodoklis. To pieskaita preču un pakalpojumu cenai, un budžetā to iemaksā PVN maksātājs." },
      { termino: "Cena bez PVN", definicion: "Cena pirms nodokļa pieskaitīšanas, grāmatvedībā saukta arī par apliekamo vērtību." },
    ],
  };
};
