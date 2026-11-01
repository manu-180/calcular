import { formaIs } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  const stundir = (x: number) => `${n(x)} ${formaIs(x, "stund", "stundir")}`;
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "Reiknaðu vinnustundir og laun vikunnar",
    title: tituloQueEntre(
      `Vinnustundir: reiknaðu tíma, hlé og yfirvinnu | ${ctx.nombrePais}`,
      `Vinnustundir | ${ctx.nombrePais}`,
      "Vinnustundir",
    ),
    description: "Leggðu saman vinnustundir vikunnar út frá upphafstíma, lokatíma og hléi og reiknaðu launin með yfirvinnu.",
    intro: [
      "Veldu byrjun og lok fyrir hvern dag, ólaunað hlé og tímakaupið þitt. Þú sérð stundirnar alls, yfirvinnuna og laun vikunnar.",
      "Notaðu reiknivélina til að yfirfara launaseðilinn, fylla út tímaskýrslu eða rukka fyrir tímavinnu.",
    ],
    comoSeCalcula: [
      "Stundir á dag = lokatími − upphafstími − hlé. Ef lokatíminn er á undan upphafstímanum endar vaktin daginn eftir.",
      "Yfirvinna = stundir vikunnar − venjulegur vinnutími, þegar stundir vikunnar eru fleiri.",
      "Laun = venjulegar stundir × tímakaup + yfirvinnustundir × tímakaup × (1 + yfirvinnuálag).",
    ],
    ejemplo: [
      `Frá ${hora("09:00")} til ${hora("17:30")} með 30 mínútna hléi gerir ${stundir(jornada)} á dag. Frá mánudegi til föstudags gerir það ${stundir(jornada * 5)}, og með ${m(pago)} á tímann ${m(jornada * 5 * pago)}.`,
      `Frá ${hora("08:00")} til ${hora("18:00")} með klukkustundar hléi gerir ${stundir(larga * 5)} á viku og af þeim eru ${stundir(extra)} yfirvinna. Með 50% yfirvinnuálagi verða launin ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "Hvernig reikna ég unnar vinnustundir?",
        respuesta: "Dragðu upphafstímann frá lokatímanum og síðan hléið. Leggðu svo saman alla daga vikunnar.",
      },
      {
        pregunta: "Hvernig breyti ég mínútum í klukkustundir með aukastöfum?",
        respuesta: `Deildu mínútunum með 60. Hálftími er ${n(0.5, 1)}, 15 mínútur eru ${n(0.25, 2)} og 45 mínútur eru ${n(0.75, 2)}. Þannig eru 7 klukkustundir og 45 mínútur ${n(7.75, 2)} klukkustundir.`,
      },
      {
        pregunta: "Hversu mikla yfirvinnu má ég vinna og hvernig er hún greidd?",
        respuesta: "Það fer eftir lögum þar sem þú vinnur, kjarasamningi og ráðningarsamningi þínum. Reiknivélin notar það álag og þann vinnutíma sem þú slærð inn, án þess að beita neinni sérstakri reglu.",
      },
    ],
    glosario: [
      { termino: "Yfirvinna", definicion: "Stundir umfram venjulegan vinnutíma, sem eru greiddar með hærri launum." },
      { termino: "Hlé", definicion: "Vinnuhlé þar sem þú ert laus og sem er oftast ekki greitt." },
    ],
  };
};
