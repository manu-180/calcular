import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  const tundi = (x: number) => `${n(x)} ${x === 1 ? "tund" : "tundi"}`;
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "Töötundide kalkulaator: tunnid ja nädala palk",
    title: tituloQueEntre(
      `Töötundide kalkulaator: tunnid, pausid ja ületunnid | ${ctx.nombrePais}`,
      `Töötundide kalkulaator | ${ctx.nombrePais}`,
      "Töötundide kalkulaator",
    ),
    description: "Arvuta nädala töötunnid algus- ja lõpuaja ning pauside põhjal ja vaata oma palka koos ületundidega.",
    intro: [
      "Vali iga päeva jaoks algus ja lõpp, tasustamata paus ja tunnipalk. Näed tunde kokku, ületunde ja nädala palka.",
      "Kasuta kalkulaatorit palgateatise kontrollimiseks, tunnitabeli täitmiseks või tunnitöö eest arve esitamiseks.",
    ],
    comoSeCalcula: [
      "Tunnid päevas = lõpuaeg − algusaeg − paus. Kui lõpp on varasem kui algus, lõpeb vahetus järgmisel päeval.",
      "Ületunnid = nädala tunnid − tavaline tööaeg, kui nädala tunde on rohkem.",
      "Palk = tavalised tunnid × tunnipalk + ületunnid × tunnipalk × (1 + lisatasu).",
    ],
    ejemplo: [
      `Tööpäev, mis algab kell ${hora("09:00")} ja lõpeb kell ${hora("17:30")}, annab 30 minuti pikkuse pausiga päevas ${tundi(jornada)}. Esmaspäevast reedeni on see ${tundi(jornada * 5)}. Kui tunnipalk on ${m(pago)}, on nädala palk ${m(jornada * 5 * pago)}.`,
      `Tööpäev, mis algab kell ${hora("08:00")} ja lõpeb kell ${hora("18:00")}, annab tunnise pausiga nädalas ${tundi(larga * 5)}, millest ${n(extra)} on ületunnid. Kui ületundide lisatasu on 50%, on palk ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "Kuidas töötatud tunde arvutatakse?",
        respuesta: "Lahuta lõpuajast algusaeg ja lahuta paus. Seejärel liida kokku nädala kõik päevad.",
      },
      {
        pregunta: "Kuidas muuta minutid kümnendtundideks?",
        respuesta: `Jaga minutid arvuga 60. Pool tundi on ${n(0.5, 1)}, 15 minutit on ${n(0.25, 2)} ja 45 minutit on ${n(0.75, 2)}. Seega 7 tundi ja 45 minutit on ${n(7.75, 2)} tundi.`,
      },
      {
        pregunta: "Kui palju ületunde tohib teha ja kuidas nende eest makstakse?",
        respuesta: "See sõltub selle riigi seadusest, kus töötad, kollektiivlepingust ja sinu töölepingust. Kalkulaator kasutab sinu sisestatud lisatasu ja tavalist tööaega ega rakenda ühtegi kindlat reeglit.",
      },
    ],
    glosario: [
      { termino: "Ületunnitöö", definicion: "Tavalist tööaega ületavad tunnid, mille eest makstakse kõrgemat palka." },
      { termino: "Paus", definicion: "Vaheaeg töös, mil oled vaba ja mille eest tavaliselt palka ei maksta." },
    ],
  };
};
