import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  return {
    h1: "Szabadúszó óradíj kalkulátor",
    title: tituloQueEntre(`Szabadúszó óradíj kalkulátor (${ctx.nombrePais})`, `Óradíj számítás (${ctx.nombrePais})`, "Szabadúszó óradíj kalkulátor"),
    description: "Mennyi legyen az óradíjad? Számold ki szabadúszóként az óradíjat és a napidíjat a kívánt jövedelemből, a költségekből, az adókból és a számlázható órákból.",
    intro: [
      "A szabadúszók leggyakoribb hibája, hogy a kívánt alkalmazotti fizetést elosztják 160 órával. Ebből kimaradnak az adók, a költségek, a szabadság és minden óra, amelyet nem lehet kiszámlázni.",
      "Ez a kalkulátor abból indul ki, mennyit szeretnél hazavinni, és megmondja, mennyit kell kérned ehhez.",
    ],
    comoSeCalcula: [
      "Szükséges számlázás = hazavitt jövedelem ÷ (1 − adókulcs) + vállalkozási költségek.",
      "Munkanapok = 52 hét × heti munkanapok − szabadnapok.",
      "Számlázható órák évente = munkanapok × napi számlázható órák.",
      "Óradíj = szükséges számlázás ÷ éves számlázható órák.",
    ],
    ejemplo: [
      `Ha évente ennyit szeretnél hazavinni: ${m(ingreso)}, a költségeid ${m(gastos)}, az adók pedig 25 százalékot visznek el, ennyit kell kiszámláznod: ${m(r.facturado)}.`,
      `30 szabadnappal és heti 25 számlázható órával ez évi ${formatearNumero(ctx, Math.round(r.horas))} óra. Az óradíj így ${m(r.hora)}, a napidíj ${m(r.dia)}.`,
    ],
    faq: [
      {
        pregunta: "Hány órát tudok hetente kiszámlázni?",
        respuesta: "Kevesebbet, mint amennyit dolgozol. Az ügyfélszerzés, az e-mailek, a számlázás és a tanulás olyan idő, amelyet senki nem fizet meg. 40 órából általában 20 és 30 között számlázható.",
      },
      {
        pregunta: "Órára vagy projektre kérjek pénzt?",
        respuesta: "Mindkettő működik. Ha projektárat adsz, akkor is becsüld meg az órákat, és szorozd meg ezzel az óradíjjal, hogy ne járj rosszul.",
      },
      {
        pregunta: "Milyen adókulccsal számoljak?",
        respuesta: "Attól függ, melyik országban és milyen formában vállalkozol. Add össze a jövedelemadót és a járulékokat. Ha nem vagy biztos benne, kérdezz meg egy könyvelőt.",
      },
    ],
    glosario: [
      { termino: "Számlázható óra", definicion: "Munkaóra, amelyet kiszámlázol az ügyfélnek." },
      { termino: "Hazavitt jövedelem", definicion: "Ami az adók és a vállalkozási költségek után marad." },
    ],
  };
};
