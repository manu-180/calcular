import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoNb: ContenidoUniversal = (ctx) => {
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
  const unidad = imperial ? "mile" : "kilometer";
  return {
    h1: "Bilkostnader: hva koster bilen per måned?",
    title: tituloQueEntre(
      `Bilkostnader: hva koster bilen per måned? | ${ctx.nombrePais}`,
      `Bilkostnader | ${ctx.nombrePais}`,
      "Bilkostnader",
    ),
    description: `Regn ut hva bilen faktisk koster per måned, per år og per ${unidad}: drivstoff, forsikring, vedlikehold, parkering og verditap.`,
    intro: [
      "De fleste vet hva de bruker på drivstoff. Færre regner med forsikring, vedlikehold, parkering og særlig verditapet bilen har hvert år.",
      "Fyll inn kostnadene dine, så ser du hva bilen egentlig koster deg. Det gjør det lettere å bestemme om du skal kjøpe, bytte eller reise på en annen måte.",
    ],
    comoSeCalcula: [
      imperial
        ? "Drivstoff per måned = miles per måned ÷ miles per gallon × pris per gallon."
        : "Drivstoff per måned = kilometer per måned × liter per 100 km ÷ 100 × pris per liter.",
      "Verditap per måned = bilens verdi × verditap per år ÷ 12.",
      "Faktiske kostnader = drivstoff + forsikring + vedlikehold + parkering + andre kostnader + verditap.",
      `Kostnad per ${unidad} = faktiske kostnader per måned ÷ strekningen du kjører på en måned.`,
    ],
    ejemplo: [
      `En bil til ${m(g.precio)} som kjører ${formatearNumero(ctx, g.distancia)} ${imperial ? "miles" : "km"} i måneden, koster ${m(mensual)} per måned når verditapet er regnet med.`,
      `Det blir ${m(mensual * 12)} i året og ${formatearMonto(ctx, mensual / g.distancia)} per ${unidad}.`,
    ],
    faq: [
      {
        pregunta: "Hva er verditap på bil?",
        respuesta: "Det er verdien bilen mister over tid. Du betaler det ikke hver måned, men du merker det når du selger. For en ny bil er det ofte den største kostnaden.",
      },
      {
        pregunta: "Hvorfor er ikke terminbeløpet på billånet med?",
        respuesta:
          "En del av terminbeløpet betaler selve bilen, og det er allerede med som verditap. Tar du med begge, telles bilen to ganger. Renten på lånet kommer i tillegg.",
      },
      {
        pregunta: "Hvordan får jeg ned bilkostnadene?",
        respuesta:
          "Sammenlign forsikringer hvert år, følg med på dekktrykk og service, og ikke bytt bil for ofte. Det er de første årene bilen taper mest verdi.",
      },
    ],
    glosario: [
      { termino: "Verditap", definicion: "Verdien bilen mister med tid og bruk." },
      { termino: `Kostnad per ${unidad}`, definicion: `Hva hver ${unidad} koster i snitt når alle kostnader er med.` },
    ],
  };
};
