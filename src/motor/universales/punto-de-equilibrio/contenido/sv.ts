import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "Break even-kalkyl: räkna ut din nollpunkt",
    title: tituloQueEntre(
      `Break even-kalkyl: räkna ut nollpunkten | ${ctx.nombrePais}`,
      `Break even-kalkyl | ${ctx.nombrePais}`,
      "Break even-kalkyl",
    ),
    description: "Räkna ut hur många enheter du behöver sälja och vilken omsättning du behöver varje månad för att täcka kostnaderna och nå din vinst.",
    intro: [
      "Nollpunkten (break even) är den försäljning där verksamheten varken går med vinst eller förlust. Under den förlorar du pengar, över den börjar du tjäna.",
      "Fyll i dina fasta kostnader, priset och kostnaden för varje enhet. Du får veta hur mycket du måste sälja för att täcka kostnaderna och nå ditt mål.",
    ],
    comoSeCalcula: [
      "Täckningsbidrag = pris − rörlig kostnad per styck.",
      "Antal enheter till nollpunkten = fasta kostnader ÷ täckningsbidrag, avrundat uppåt.",
      "Omsättning vid nollpunkten = fasta kostnader ÷ (täckningsbidrag ÷ pris).",
      "För en önskad vinst lägger du till den på de fasta kostnaderna och räknar på samma sätt.",
    ],
    ejemplo: [
      `Med ${m(fijos)} i fasta kostnader, ett pris på ${m(precio)} och en rörlig kostnad på ${m(variable)} lämnar varje försäljning ${m(precio - variable)}.`,
      `Du behöver sälja ${formatearNumero(ctx, base.unidades)} enheter (${m(base.facturacion)}) för att täcka kostnaderna och ${formatearNumero(ctx, meta.unidades)} för att tjäna ${m(objetivo)} i månaden.`,
    ],
    faq: [
      {
        pregunta: "Vad är fasta och rörliga kostnader?",
        respuesta: "Fasta kostnader är desamma även om du inte säljer något: hyra, fasta löner, el. Rörliga kostnader ökar med varje försäljning: inköp, material, provision och frakt.",
      },
      {
        pregunta: "Hur sänker jag min nollpunkt?",
        respuesta: "Det finns tre sätt: höja priset, sänka den rörliga kostnaden per styck eller minska de fasta kostnaderna. Priset brukar göra störst skillnad.",
      },
      {
        pregunta: "Fungerar det för ett tjänsteföretag?",
        respuesta: "Ja. En enhet kan vara en timme, ett pass eller en kund per månad. Använd det det kostar dig att leverera varje enhet som rörlig kostnad.",
      },
    ],
    glosario: [
      { termino: "Nollpunkt", definicion: "Den försäljningsnivå där intäkterna är lika stora som kostnaderna." },
      { termino: "Täckningsbidrag", definicion: "Det varje försäljning lämnar för att betala de fasta kostnaderna." },
    ],
  };
};
