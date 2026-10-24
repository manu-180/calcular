import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const g: GastosAuto = {
    precio: montoEjemplo(ctx, 25000),
    depreciacion: 15,
    seguro: montoEjemplo(ctx, 100),
    distancia: 1000,
    consumo: imperial ? 28 : 8,
    precioCombustible: montoEjemplo(ctx, imperial ? 3.5 : 1.2),
    mantenimiento: montoEjemplo(ctx, 60),
    estacionamiento: 0,
    otros: 0,
  };
  const mensual = costoMensual(g, imperial);
  const naJednotku = imperial ? "na jednu míli" : "na jeden kilometr";
  return {
    h1: "Kalkulačka nákladů na auto",
    title: tituloQueEntre(
      `Kolik stojí provoz auta: kalkulačka ${GRAMATICA.cs.para(ctx.nombrePais)}`,
      `Náklady na provoz auta ${GRAMATICA.cs.en(ctx.nombrePais)}`,
      "Kalkulačka nákladů na auto",
    ),
    description: "Spočítejte, kolik vás auto doopravdy stojí za měsíc, za rok i na kilometr: palivo, pojištění, údržba a ztráta hodnoty.",
    intro: [
      "Většina řidičů ví, kolik utratí za palivo. Málokdo ale připočte pojištění, údržbu, parkování a hlavně hodnotu, kterou auto každý rok ztrácí.",
      "Zadejte své výdaje a ukážeme vám, kolik vás auto skutečně stojí. Pomůže vám to rozhodnout, jestli auto koupit, vyměnit, nebo se přepravovat jinak.",
    ],
    comoSeCalcula: [
      imperial
        ? "Palivo za měsíc = míle za měsíc ÷ míle na galon × cena za galon."
        : "Palivo za měsíc = kilometry za měsíc × litry na 100 km ÷ 100 × cena za litr.",
      "Ztráta hodnoty za měsíc = hodnota auta × roční ztráta ÷ 12.",
      "Skutečné náklady = palivo + pojištění + údržba + parkování + další výdaje + ztráta hodnoty.",
      `Náklady ${naJednotku} = skutečné náklady za měsíc ÷ ujetá vzdálenost za měsíc.`,
    ],
    ejemplo: [
      `Auto v hodnotě ${m(g.precio)}, které najede ${formatearNumero(ctx, g.distancia)} ${imperial ? "mil" : "km"} měsíčně, vás stojí ${m(mensual)} za měsíc včetně ztráty hodnoty.`,
      `To je ${m(mensual * 12)} za rok a ${formatearMonto(ctx, mensual / g.distancia)} za každ${imperial ? "ou míli" : "ý kilometr"}.`,
    ],
    faq: [
      {
        pregunta: "Co je amortizace auta?",
        respuesta: "Je to hodnota, kterou auto časem ztrácí. Neplatíte ji každý měsíc, ale poznáte ji při prodeji. U nového auta to bývá největší položka.",
      },
      {
        pregunta: "Proč se nepočítá se splátkou úvěru?",
        respuesta:
          "Část splátky platí samotné auto, a to už je započtené jako ztráta hodnoty. Kdyby se sečetlo obojí, auto by se počítalo dvakrát. Úroky z úvěru jsou výdaj navíc.",
      },
      {
        pregunta: "Jak snížit náklady na auto?",
        respuesta:
          "Každý rok porovnejte nabídky povinného ručení a havarijního pojištění, hlídejte tlak v pneumatikách, choďte včas na servis a neměňte auto příliš často: nejvíc hodnoty ztrácí v prvních letech.",
      },
    ],
    glosario: [
      { termino: "Amortizace", definicion: "Hodnota, kterou auto ztrácí časem a používáním." },
      { termino: `Náklady ${naJednotku}`, definicion: "Průměrné náklady na každou ujetou jednotku vzdálenosti se započtením všech výdajů." },
    ],
  };
};
