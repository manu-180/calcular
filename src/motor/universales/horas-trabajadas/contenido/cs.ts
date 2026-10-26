import { GRAMATICA } from "../../../i18n/gramatica";
import { formaCs } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  // «1 hodina», «3 hodiny», «8 hodin», «7,75 hodiny» (las fracciones van en genitivo singular).
  const h = (x: number, decimales = 0) => `${n(x, decimales)} ${formaCs(x, "hodina", "hodiny", "hodin", "hodiny")}`;
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "Kalkulačka odpracovaných hodin",
    title: tituloQueEntre(
      `Odpracované hodiny: kalkulačka pracovní doby ${GRAMATICA.cs.para(ctx.nombrePais)}`,
      `Odpracované hodiny ${GRAMATICA.cs.para(ctx.nombrePais)}`,
      "Kalkulačka odpracovaných hodin",
    ),
    description: "Sečtěte hodiny odpracované za týden podle začátku, konce a přestávek a spočítejte mzdu včetně přesčasů.",
    intro: [
      "U každého dne vyberte začátek a konec, neplacenou přestávku a hodinovou mzdu. Ukážeme vám celkový počet hodin, přesčasy a mzdu za týden.",
      "Hodí se ke kontrole výplaty, k vyplnění docházky nebo k fakturaci práce placené od hodiny.",
    ],
    comoSeCalcula: [
      "Hodiny za den = konec − začátek − přestávka. Pokud je konec dřív než začátek, směna končí následující den.",
      "Přesčasy = celkový počet hodin za týden − běžné hodiny, pokud je celkový počet překročí.",
      "Mzda = běžné hodiny × hodinová mzda + přesčasové hodiny × hodinová mzda × (1 + příplatek).",
    ],
    ejemplo: [
      `Od ${hora("09:00")} do ${hora("17:30")} s přestávkou 30 minut vychází ${h(jornada)} denně. Od pondělí do pátku je to ${h(jornada * 5)}: při mzdě ${m(pago)} za hodinu to dělá ${m(jornada * 5 * pago)}.`,
      `Od ${hora("08:00")} do ${hora("18:00")} s hodinovou přestávkou vychází ${h(larga * 5)} týdně, z toho ${h(extra)} přesčasu. S příplatkem 50 % je to ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "Jak spočítat odpracované hodiny?",
        respuesta: "Od času konce odečtěte čas začátku a potom přestávku. Nakonec sečtěte všechny dny v týdnu.",
      },
      {
        pregunta: "Jak převést minuty na desetinné hodiny?",
        respuesta: `Vydělte minuty 60. Půl hodiny je ${n(0.5, 1)}, 15 minut ${n(0.25, 2)} a 45 minut ${n(0.75, 2)}. Takže 7 hodin a 45 minut je ${h(7.75, 2)}.`,
      },
      {
        pregunta: "Kolik přesčasů je dovoleno a jak se platí?",
        respuesta: "Záleží na zákonech země, kde pracujete, a na vaší smlouvě. Kalkulačka použije příplatek a běžné hodiny, které zadáte, bez konkrétního zákonného pravidla.",
      },
    ],
    glosario: [
      { termino: "Přesčas", definicion: "Práce nad běžnou délku pracovní doby, za kterou se platí příplatek." },
      { termino: "Jedenapůlnásobek", definicion: "Mzda za přesčas o polovinu vyšší než běžná, tedy s příplatkem 50 %." },
    ],
  };
};
