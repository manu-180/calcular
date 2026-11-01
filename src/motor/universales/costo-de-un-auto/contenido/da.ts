import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoDa: ContenidoUniversal = (ctx) => {
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
  const unidad = imperial ? "engelsk mil" : "kilometer";
  return {
    h1: "Biludgifter: hvad koster bilen om måneden?",
    title: tituloQueEntre(
      `Biludgifter: hvad koster bilen om måneden? | ${ctx.nombrePais}`,
      `Biludgifter | ${ctx.nombrePais}`,
      "Biludgifter",
    ),
    description: `Beregn, hvad bilen reelt koster om måneden, om året og pr. ${unidad}: brændstof, forsikring, vedligeholdelse, parkering og værditab.`,
    intro: [
      "De fleste ved, hvad de bruger på brændstof. Færre regner forsikring, vedligeholdelse, parkering og især det værditab med, som bilen har hvert år.",
      "Skriv dine udgifter, så ser du, hvad bilen faktisk koster dig. Det hjælper dig med at beslutte, om du skal købe, skifte eller komme rundt på en anden måde.",
    ],
    comoSeCalcula: [
      imperial
        ? "Brændstof om måneden = engelske mil om måneden ÷ engelske mil pr. gallon × pris pr. gallon."
        : "Brændstof om måneden = kilometer om måneden × liter pr. 100 km ÷ 100 × pris pr. liter.",
      "Værditab om måneden = bilens værdi × værditab om året ÷ 12.",
      "Reelle udgifter = brændstof + forsikring + vedligeholdelse + parkering + andre udgifter + værditab.",
      `Udgift pr. ${unidad} = reelle udgifter om måneden ÷ den strækning, du kører på en måned.`,
    ],
    ejemplo: [
      `En bil til ${m(g.precio)}, der kører ${formatearNumero(ctx, g.distancia)} ${imperial ? "engelske mil" : "km"} om måneden, koster ${m(mensual)} om måneden, når værditabet er regnet med.`,
      `Det giver ${m(mensual * 12)} om året og ${formatearMonto(ctx, mensual / g.distancia)} pr. ${unidad}.`,
    ],
    faq: [
      {
        pregunta: "Hvad er værditab på en bil?",
        respuesta: "Det er den værdi, bilen taber med tiden. Du betaler det ikke hver måned, men du mærker det, når du sælger. For en ny bil er det ofte den største udgift.",
      },
      {
        pregunta: "Hvorfor tæller ydelsen på billånet ikke med?",
        respuesta:
          "En del af ydelsen betaler selve bilen, og den tæller allerede med som værditab. Tager du begge med, tæller bilen to gange. Renten på lånet er en ekstra udgift oven i.",
      },
      {
        pregunta: "Hvordan sænker jeg mine biludgifter?",
        respuesta:
          "Sammenlign forsikringer hvert år, hold øje med dæktryk og service, og skift ikke bil for tit. Det er i de første år, bilen taber mest i værdi.",
      },
    ],
    glosario: [
      { termino: "Værditab", definicion: "Den værdi, bilen taber med tid og brug." },
      { termino: `Udgift pr. ${unidad}`, definicion: `Hvad hver ${unidad} koster i gennemsnit, når alle udgifter er med.` },
    ],
  };
};
