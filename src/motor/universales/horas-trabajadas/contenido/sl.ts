import { GRAMATICA } from "../../../i18n/gramatica";
import { formaSl } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  // Primeri: 1 ura, 2 uri, 3 ure, 8 ur, pri decimalkah 7,75 ure.
  const h = (x: number, decimales = 0) => `${n(x, decimales)} ${formaSl(x, "ura", "uri", "ure", "ur")}`;
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "Izračun delovnih ur",
    title: tituloQueEntre(
      `Izračun delovnih ur: delovni čas ${GRAMATICA.sl.para(ctx.nombrePais)}`,
      `Izračun delovnih ur ${GRAMATICA.sl.para(ctx.nombrePais)}`,
      "Izračun delovnih ur",
    ),
    description: "Seštejte delovne ure v tednu glede na začetek, konec in odmore ter izračunajte znesek za izplačilo, skupaj z nadurami.",
    intro: [
      "Za vsak dan izberite začetek in konec, neplačan odmor in urno postavko. Pokazali vam bomo skupno število ur, nadure in znesek za teden.",
      "Uporabno je za preverjanje plače, za evidenco delovnega časa ali za izdajo računa pri delu, ki se plačuje na uro.",
    ],
    comoSeCalcula: [
      "Ure na dan = konec − začetek − odmor. Če je konec pred začetkom, se izmena konča naslednji dan.",
      "Nadure = skupne ure v tednu − redne ure, če skupne ure presežejo redne.",
      "Znesek = redne ure × urna postavka + nadure × urna postavka × (1 + dodatek).",
    ],
    ejemplo: [
      `Od ${hora("09:00")} do ${hora("17:30")} z odmorom 30 minut je to ${h(jornada)} na dan. Od ponedeljka do petka je to ${h(jornada * 5)}: pri urni postavki ${m(pago)} znesek znaša ${m(jornada * 5 * pago)}.`,
      `Od ${hora("08:00")} do ${hora("18:00")} z enournim odmorom je to ${h(larga * 5)} na teden, od tega nadure: ${h(extra)}. Pri dodatku 50 % znesek znaša ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "Kako se izračunajo delovne ure?",
        respuesta: "Od časa konca odštejte čas začetka in nato še odmor. Na koncu seštejte vse dni v tednu.",
      },
      {
        pregunta: "Kako minute pretvorim v decimalne ure?",
        respuesta: `Minute delite s 60. Pol ure je ${n(0.5, 1)}, 15 minut je ${n(0.25, 2)}, 45 minut pa ${n(0.75, 2)}. Tako je 7 ur in 45 minut skupaj ${h(7.75, 2)}.`,
      },
      {
        pregunta: "Koliko nadur je dovoljenih in kako se plačajo?",
        respuesta: "Odvisno je od zakona države, v kateri delate, in od vaše pogodbe. Izračun uporablja dodatek in redne ure, ki jih vnesete, brez konkretnega zakonskega pravila.",
      },
    ],
    glosario: [
      { termino: "Nadure", definicion: "Delo nad rednim delovnim časom, za katero se plača dodatek." },
      { termino: "Ura in pol", definicion: "Znesek za naduro, ki je za polovico večji od redne ure, torej z dodatkom 50 %." },
    ],
  };
};
