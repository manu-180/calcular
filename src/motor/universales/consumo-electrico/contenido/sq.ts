import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhMes = (1000 * 4 * 30) / 1000;
  return {
    h1: "Kalkulator konsumi energjie elektrike",
    title: tituloQueEntre(`Kalkulator konsumi energjie elektrike: ${ctx.nombrePais}`, "Kalkulator konsumi energjie elektrike", "Kalkulator konsumi energjie"),
    description: "Llogaritni sa energji elektrike përdor një pajisje dhe sa kushton në ditë, në muaj dhe në vit, sipas fuqisë, orëve të përdorimit dhe çmimit për kWh.",
    intro: [
      "Vendosni fuqinë e pajisjes, sa orë e përdorni dhe çmimin për kWh nga fatura. Shikoni konsumin dhe koston.",
      "Kështu zbuloni cila pajisje rëndon më shumë në faturë: kondicioneri, një radiator, frigoriferi apo kompjuteri.",
    ],
    comoSeCalcula: [
      "kWh në ditë = vat × orë përdorimi ÷ 1000.",
      "kWh në muaj = kWh në ditë × ditët e përdorimit. Për një vit, muaji shumëzuar me 12.",
      "Kosto = kWh × çmimi për kWh.",
    ],
    ejemplo: [
      `Një pajisje 1000 W e përdorur 4 orë në ditë konsumon 4 kWh në ditë dhe ${formatearNumero(ctx, kwhMes)} kWh në muaj.`,
      `Me ${m(precio)} për kWh, kushton ${m(kwhMes * precio)} në muaj.`,
    ],
    faq: [
      {
        pregunta: "Çfarë është një kWh?",
        respuesta: "Një kilovat-orë është energjia që përdor një pajisje 1000 W që punon për një orë. Është njësia në faturën e energjisë elektrike.",
      },
      {
        pregunta: "A punon frigoriferi me fuqi të plotë gjithë ditën?",
        respuesta: "Jo. Kompresori ndizet dhe fiket. Për pajisje të tilla, përdorni nga 8 deri në 10 orë në ditë në vend të 24.",
      },
      {
        pregunta: "Pse fatura nuk del saktësisht njësoj?",
        respuesta: "Fatura shton abonimin, taksat dhe ndonjëherë çmime sipas shkallëve të konsumit. Kalkulatori tregon vetëm atë që konsumon pajisja.",
      },
    ],
    glosario: [
      { termino: "Vat (W)", definicion: "Njësi fuqie: sa energji përdor një pajisje në çdo sekondë." },
      { termino: "Kilovat-orë (kWh)", definicion: "1000 W për një orë. Është ajo që paguani në faturë." },
    ],
  };
};
