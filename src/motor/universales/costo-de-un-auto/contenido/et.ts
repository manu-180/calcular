import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoEt: ContenidoUniversal = (ctx) => {
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
  const unidad = imperial ? "miili" : "kilomeetri";
  return {
    h1: "Auto kulud: kui palju auto kuus maksab?",
    title: tituloQueEntre(
      `Auto kulud: kui palju auto kuus maksab? | ${ctx.nombrePais}`,
      `Auto kulud kuus | ${ctx.nombrePais}`,
      `Auto kulud | ${ctx.nombrePais}`,
      "Auto kulud",
    ),
    description: `Arvuta, mis auto päriselt maksab kuus, aastas ja ${unidad} kohta: kütus, kindlustus, hooldus, parkimine ja väärtuse langus.`,
    intro: [
      "Enamik inimesi teab, kui palju kütusele läheb. Vähesed arvestavad juurde kindlustuse, hoolduse, parkimise ja eelkõige väärtuse, mille auto igal aastal kaotab.",
      "Sisesta oma kulud ja näed, mis auto sulle päriselt maksab. See aitab otsustada, kas osta, vahetada või liikuda kuidagi teisiti.",
    ],
    comoSeCalcula: [
      imperial
        ? "Kütus kuus = miilid kuus ÷ miili galloni kohta × galloni hind."
        : "Kütus kuus = kilomeetrid kuus × liitrit / 100 km ÷ 100 × liitri hind.",
      "Väärtuse langus kuus = auto väärtus × väärtuse langus aastas ÷ 12.",
      "Tegelikud kulud = kütus + kindlustus + hooldus + parkimine + muud kulud + väärtuse langus.",
      `Kulu ${unidad} kohta = tegelikud kulud kuus ÷ kuus läbitud teekond.`,
    ],
    ejemplo: [
      `Auto väärtusega ${m(g.precio)}, millega sõidetakse ${formatearNumero(ctx, g.distancia)} ${imperial ? "miili" : "km"} kuus, maksab koos väärtuse langusega kuus ${m(mensual)}.`,
      `See teeb aastas ${m(mensual * 12)} ja ${unidad} kohta ${formatearMonto(ctx, mensual / g.distancia)}.`,
    ],
    faq: [
      {
        pregunta: "Mida auto väärtuse langus tähendab?",
        respuesta: "See on väärtus, mille auto aja jooksul kaotab. Sa ei maksa seda iga kuu, aga märkad seda auto müümisel. Uue auto puhul on see sageli suurim üksik kulu.",
      },
      {
        pregunta: "Miks autolaenu põhiosa arvesse ei võeta?",
        respuesta:
          "Põhiosaga maksad auto enda eest ja see sisaldub juba väärtuse languses. Kui arvestad mõlemat, läheb auto arvesse kaks korda. Laenu intress on sellele lisaks eraldi kulu.",
      },
      {
        pregunta: "Kuidas auto kulusid vähendada?",
        respuesta:
          "Võrdle kindlustuse hindu igal aastal, hoia rehvirõhk ja hooldused korras ning ära vaheta autot liiga tihti. Kõige rohkem kaotab auto väärtust esimestel aastatel.",
      },
    ],
    glosario: [
      { termino: "Väärtuse langus", definicion: "Väärtus, mille auto aja ja kasutamise jooksul kaotab." },
      { termino: `Kulu ${unidad} kohta`, definicion: `Keskmine summa ${unidad} kohta, kui kõik kulud on arvesse võetud.` },
    ],
  };
};
