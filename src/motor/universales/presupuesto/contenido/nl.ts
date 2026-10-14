import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  return {
    h1: "Budget maken met de 50/30/20-regel",
    title: tituloQueEntre(`50/30/20-regel: budget berekenen in ${ctx.nombrePais}`, `50/30/20-regel in ${ctx.nombrePais}`, "50/30/20-regel: budget berekenen"),
    description: "Verdeel je netto inkomen met de 50/30/20-regel: hoeveel naar vaste lasten gaat, naar leuke dingen en naar sparen. Pas de percentages aan als dat nodig is.",
    intro: [
      "De 50/30/20-regel is een simpele manier om je maand te plannen. De helft gaat naar wat moet, 30% naar wat je leuk vindt en 20% naar sparen.",
      "Vul je netto inkomen in en je ziet hoeveel er naar elk deel gaat. Is jouw situatie anders, bijvoorbeeld door een hoge huur, pas de percentages dan aan.",
    ],
    comoSeCalcula: [
      "Vaste lasten = inkomen × 50%.",
      "Leuke dingen = inkomen × 30%.",
      "Sparen = inkomen × 20%. De drie percentages moeten samen 100% zijn.",
    ],
    ejemplo: [
      `Bij ${m(ingreso)} per maand: ${m(ingreso * 0.5)} voor vaste lasten, ${m(ingreso * 0.3)} voor leuke dingen en ${m(ingreso * 0.2)} om te sparen.`,
      `In een jaar is die 20% samen ${m(ingreso * 0.2 * 12)} spaargeld.`,
    ],
    faq: [
      {
        pregunta: "Wat valt onder vaste lasten en wat onder leuke dingen?",
        respuesta:
          "Vaste lasten zijn rekeningen die je moet betalen: wonen, gewone boodschappen, energie, vervoer, zorg en de minimale aflossing op schulden. Leuke dingen zijn uitgaven die je kunt schrappen als het moet.",
      },
      {
        pregunta: "Wat als je vaste lasten meer dan 50% zijn?",
        respuesta: "Dat komt vaak voor, zeker met een hoge huur. Probeer 60/20/20 of 70/20/10 en zorg dat je spaardeel niet op nul komt.",
      },
      {
        pregunta: "Telt aflossen op schulden als sparen?",
        respuesta: "De minimale aflossing hoort bij je vaste lasten. Wat je extra aflost om sneller van een schuld af te zijn, telt als sparen, want je vermogen gaat er net zo goed op vooruit.",
      },
    ],
    glosario: [
      { termino: "Netto inkomen", definicion: "Wat je overhoudt na belastingen en inhoudingen." },
      { termino: "50/30/20-regel", definicion: "Een manier om je inkomen te verdelen over vaste lasten, leuke dingen en sparen." },
    ],
  };
};
