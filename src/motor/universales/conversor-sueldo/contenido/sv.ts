import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const mensual = montoEjemplo(ctx, 4000);
  const hora = montoEjemplo(ctx, 20);
  const horasAnio = 40 * 52;
  const horasMes = horasAnio / 12;
  return {
    h1: "Timlön till månadslön och tvärtom",
    title: tituloQueEntre(
      `Timlön till månadslön: räkna om din lön | ${ctx.nombrePais}`,
      `Timlön till månadslön | ${ctx.nombrePais}`,
      "Timlön till månadslön",
    ),
    description: "Räkna om lönen mellan timlön, dagslön, veckolön, månadslön och årslön, med dina egna arbetstimmar och betalda veckor.",
    intro: [
      "Vad blir din månadslön per timme? Vad ger en timlön i månaden eller på ett år? Fyll i ett belopp, välj period så ser du alla de andra.",
      "Använd den för att jämföra jobberbjudanden, räkna på extratimmar eller se vad din tid är värd.",
    ],
    comoSeCalcula: [
      "Först räknas allt om till en årslön.",
      "Timlön = årslön ÷ (timmar per vecka × betalda veckor).",
      "Dagslön = årslön ÷ (dagar per vecka × betalda veckor). Veckolön = årslön ÷ betalda veckor.",
      "Månadslön = årslön ÷ 12. Lön per halvmånad = årslön ÷ 24.",
    ],
    ejemplo: [
      `En månadslön på ${m(mensual)} vid 40 timmar i veckan motsvarar ${m((mensual * 12) / horasAnio)} i timmen och ${m(mensual * 12)} om året.`,
      `En timlön på ${m(hora)} på heltid blir ${m(hora * horasMes)} i månaden och ${m(hora * horasAnio)} om året.`,
    ],
    faq: [
      {
        pregunta: "Hur många arbetstimmar är det på ett år?",
        respuesta: `Med 40 timmar i veckan och 52 betalda veckor blir det ${formatearNumero(ctx, horasAnio)} timmar, eller ${formatearNumero(ctx, horasMes, 1)} timmar i månaden.`,
      },
      {
        pregunta: "Hur räknar jag om timlön till månadslön?",
        respuesta: `Multiplicera timlönen med antal timmar per vecka och med 52, och dela med 12. På heltid är det samma sak som att gånga timlönen med ${formatearNumero(ctx, horasMes, 1)}.`,
      },
      {
        pregunta: "Varför blir veckolönen gånger 4 inte månadslönen?",
        respuesta: `Därför att en månad i snitt har ${formatearNumero(ctx, 52 / 12, 2)} veckor, inte 4. För att gå från veckolön till månadslön multiplicerar du med 52 och delar med 12.`,
      },
      {
        pregunta: "Räknas skatt eller tillägg med?",
        respuesta: "Nej. Kalkylatorn räknar om samma bruttolön mellan perioder. Har du tillägg eller bonus, lägg till dem separat när du jämför erbjudanden.",
      },
    ],
    glosario: [
      { termino: "Bruttolön", definicion: "Lönen före skatt och andra avdrag." },
      { termino: "Heltid", definicion: "Full arbetstid, här räknat som 40 timmar i veckan." },
    ],
  };
};
