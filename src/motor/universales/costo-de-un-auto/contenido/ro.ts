import { deRo } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoRo: ContenidoUniversal = (ctx) => {
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
  const unidad = imperial ? "milă" : "kilometru";
  const distancia = imperial ? `${formatearNumero(ctx, g.distancia)} ${deRo(g.distancia)}mile` : `${formatearNumero(ctx, g.distancia)} km`;
  return {
    h1: "Calculator cost întreținere mașină",
    title: tituloQueEntre(`Cost întreținere mașină: ${ctx.nombrePais}`, "Calculator cost întreținere mașină", "Cost întreținere mașină"),
    description: `Calculați cât vă costă de fapt mașina pe lună, pe an și pe ${unidad}: combustibil, asigurare, întreținere, parcare și valoarea pe care o pierde.`,
    intro: [
      "Mulți știu cât dau pe combustibil. Puțini adună asigurarea, întreținerea, parcarea și, mai ales, valoarea pe care mașina o pierde în fiecare an.",
      "Completați costurile și vă arătăm cât vă costă cu adevărat mașina. Vă ajută să decideți dacă o cumpărați, o schimbați sau vă deplasați altfel.",
    ],
    comoSeCalcula: [
      imperial
        ? "Combustibil pe lună = mile pe lună ÷ mile pe galon × prețul pe galon."
        : "Combustibil pe lună = kilometri pe lună × litri la 100 km ÷ 100 × prețul pe litru.",
      "Valoare pierdută pe lună = valoarea mașinii × pierderea anuală ÷ 12.",
      "Cost real = combustibil + asigurare + întreținere + parcare + alte costuri + valoare pierdută.",
      `Cost pe ${unidad} = costul real lunar ÷ distanța parcursă în lună.`,
    ],
    ejemplo: [
      `O mașină de ${m(g.precio)} cu care parcurgeți ${distancia} pe lună costă ${m(mensual)} pe lună, cu tot cu valoarea pe care o pierde.`,
      `Asta înseamnă ${m(mensual * 12)} pe an și ${formatearMonto(ctx, mensual / g.distancia)} pe ${unidad}.`,
    ],
    faq: [
      {
        pregunta: "Ce este deprecierea mașinii?",
        respuesta: "Este valoarea pe care o pierde mașina în timp. Nu o plătiți lunar, dar o simțiți când o vindeți. La o mașină nouă este adesea cel mai mare cost.",
      },
      {
        pregunta: "De ce nu se adaugă rata creditului auto?",
        respuesta:
          "O parte din rată plătește chiar mașina, care este deja socotită ca valoare pierdută. Dacă le-am aduna pe amândouă, mașina ar fi numărată de două ori. Dobânda creditului este un cost în plus.",
      },
      {
        pregunta: "Cum pot reduce costul mașinii?",
        respuesta:
          "Comparați ofertele de asigurare în fiecare an, țineți la zi presiunea în anvelope și reviziile și nu schimbați mașina des: în primii ani pierde cea mai mare parte din valoare.",
      },
    ],
    glosario: [
      { termino: "Depreciere", definicion: "Valoarea pe care o pierde mașina cu timpul și cu folosirea." },
      { termino: `Cost pe ${unidad}`, definicion: `Costul mediu al fiecărui ${unidad} parcurs, cu toate costurile incluse.` },
    ],
  };
};
