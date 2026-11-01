import { GRAMATICA } from "../../../i18n/gramatica";
import { formaSk } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  // «1 hodina», «3 hodiny», «8 hodín», «7,75 hodiny» (las fracciones van en genitivo singular).
  const h = (x: number, decimales = 0) => `${n(x, decimales)} ${formaSk(x, "hodina", "hodiny", "hodín", "hodiny")}`;
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "Kalkulačka odpracovaných hodín",
    title: tituloQueEntre(
      `Odpracované hodiny: kalkulačka pracovného času ${GRAMATICA.sk.para(ctx.nombrePais)}`,
      `Odpracované hodiny ${GRAMATICA.sk.para(ctx.nombrePais)}`,
      "Kalkulačka odpracovaných hodín",
    ),
    description: "Spočítajte hodiny odpracované za týždeň podľa začiatku, konca a prestávok a vypočítajte mzdu vrátane nadčasov.",
    intro: [
      "Pri každom dni vyberte začiatok a koniec, neplatenú prestávku a hodinovú mzdu. Ukážeme vám celkový počet hodín, nadčasy a mzdu za týždeň.",
      "Hodí sa na kontrolu výplaty, na vyplnenie dochádzky alebo na fakturáciu práce platenej od hodiny.",
    ],
    comoSeCalcula: [
      "Hodiny za deň = koniec − začiatok − prestávka. Ak je koniec skôr ako začiatok, zmena sa končí nasledujúci deň.",
      "Nadčasy = celkový počet hodín za týždeň − bežné hodiny, ak ich celkový počet prekročí.",
      "Mzda = bežné hodiny × hodinová mzda + nadčasové hodiny × hodinová mzda × (1 + príplatok).",
    ],
    ejemplo: [
      `Od ${hora("09:00")} do ${hora("17:30")} s prestávkou 30 minút vychádza ${h(jornada)} denne. Od pondelka do piatka je to ${h(jornada * 5)}: pri mzde ${m(pago)} za hodinu to robí ${m(jornada * 5 * pago)}.`,
      `Od ${hora("08:00")} do ${hora("18:00")} s hodinovou prestávkou vychádza ${h(larga * 5)} týždenne, z toho ${h(extra)} nadčasu. S príplatkom 50 % je to ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "Ako vypočítať odpracované hodiny?",
        respuesta: "Od času konca odpočítajte čas začiatku a potom prestávku. Nakoniec spočítajte všetky dni v týždni.",
      },
      {
        pregunta: "Ako previesť minúty na desatinné hodiny?",
        respuesta: `Minúty vydeľte číslom 60. Pol hodiny je ${n(0.5, 1)}, 15 minút ${n(0.25, 2)} a 45 minút ${n(0.75, 2)}. Takže 7 hodín a 45 minút je ${h(7.75, 2)}.`,
      },
      {
        pregunta: "Koľko nadčasov je povolených a ako sa platia?",
        respuesta: "Závisí to od zákonov krajiny, kde pracujete, a od vašej zmluvy. Kalkulačka použije príplatok a bežné hodiny, ktoré zadáte, bez konkrétneho zákonného pravidla.",
      },
    ],
    glosario: [
      { termino: "Nadčas", definicion: "Práca nad bežný pracovný čas, za ktorú sa platí príplatok." },
      { termino: "Jedenapolnásobok", definicion: "Mzda za nadčas o polovicu vyššia ako bežná, teda s príplatkom 50 %." },
    ],
  };
};
