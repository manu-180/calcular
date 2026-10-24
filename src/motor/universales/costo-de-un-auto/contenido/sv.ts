import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoSv: ContenidoUniversal = (ctx) => {
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
    h1: "Bilkostnad: vad kostar bilen per månad?",
    title: tituloQueEntre(
      `Bilkostnad: vad kostar bilen per månad? | ${ctx.nombrePais}`,
      `Bilkostnad | ${ctx.nombrePais}`,
      "Bilkostnad",
    ),
    description: `Räkna ut vad bilen verkligen kostar per månad, per år och per ${unidad}: bränsle, försäkring, underhåll, parkering och värdeminskning.`,
    intro: [
      "De flesta vet vad de lägger på bränsle. Färre räknar med försäkring, underhåll, parkering och framför allt värdet som bilen tappar varje år.",
      "Fyll i dina kostnader så ser du vad bilen faktiskt kostar dig. Det hjälper dig att bestämma om du ska köpa, byta eller ta dig fram på annat sätt.",
    ],
    comoSeCalcula: [
      imperial
        ? "Bränsle per månad = engelska mil per månad ÷ engelska mil per gallon × pris per gallon."
        : "Bränsle per månad = kilometer per månad × liter per 100 km ÷ 100 × pris per liter.",
      "Värdeminskning per månad = bilens värde × värdeminskning per år ÷ 12.",
      "Verklig kostnad = bränsle + försäkring + underhåll + parkering + andra kostnader + värdeminskning.",
      `Kostnad per ${unidad} = verklig kostnad per månad ÷ sträckan du kör på en månad.`,
    ],
    ejemplo: [
      `En bil värd ${m(g.precio)} som körs ${formatearNumero(ctx, g.distancia)} ${imperial ? "engelska mil" : "km"} i månaden kostar ${m(mensual)} per månad, värdeminskningen inräknad.`,
      `Det blir ${m(mensual * 12)} per år och ${formatearMonto(ctx, mensual / g.distancia)} per ${unidad}.`,
    ],
    faq: [
      {
        pregunta: "Vad är värdeminskning på en bil?",
        respuesta: "Det är det värde bilen tappar med tiden. Du betalar det inte varje månad, men du märker det när du säljer. För en ny bil är det ofta den största kostnaden.",
      },
      {
        pregunta: "Varför räknas inte avbetalningen på billånet med?",
        respuesta:
          "En del av avbetalningen betalar själva bilen, och den räknas redan som värdeminskning. Tar du med båda räknas bilen två gånger. Räntan på lånet är en extra kostnad utöver det.",
      },
      {
        pregunta: "Hur sänker jag bilkostnaden?",
        respuesta:
          "Jämför försäkringar varje år, håll koll på däcktryck och service och byt inte bil för ofta. Det är de första åren som bilen tappar mest i värde.",
      },
    ],
    glosario: [
      { termino: "Värdeminskning", definicion: "Det värde bilen tappar med tid och användning." },
      { termino: `Kostnad per ${unidad}`, definicion: `Vad varje ${unidad} kostar i snitt när alla kostnader är med.` },
    ],
  };
};
