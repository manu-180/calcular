import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "Nullpunktsberegning: regn ut nullpunktsomsetningen",
    title: tituloQueEntre(
      `Nullpunktsberegning: regn ut nullpunktsomsetningen | ${ctx.nombrePais}`,
      `Nullpunktsberegning | ${ctx.nombrePais}`,
      "Nullpunktsberegning",
    ),
    description: "Regn ut hvor mange enheter du må selge og hvilken omsetning du trenger hver måned for å dekke kostnadene og nå ønsket overskudd.",
    intro: [
      "Nullpunktet (break even) er salget der bedriften verken går med overskudd eller underskudd. Under det taper du penger, over det begynner du å tjene.",
      "Fyll inn de faste kostnadene, prisen og kostnaden for hver enhet. Du får vite hvor mye du må selge for å dekke kostnadene og nå målet ditt.",
    ],
    comoSeCalcula: [
      "Dekningsbidrag = salgspris − variable kostnader per enhet.",
      "Antall enheter til nullpunktet = faste kostnader ÷ dekningsbidrag, rundet opp.",
      "Nullpunktsomsetning = faste kostnader ÷ (dekningsbidrag ÷ salgspris).",
      "For et ønsket overskudd legger du det til de faste kostnadene og regner på samme måte.",
    ],
    ejemplo: [
      `Med ${m(fijos)} i faste kostnader, en pris på ${m(precio)} og variable kostnader på ${m(variable)} gir hvert salg et dekningsbidrag på ${m(precio - variable)}.`,
      `Du må selge ${formatearNumero(ctx, base.unidades)} enheter (${m(base.facturacion)}) for å dekke kostnadene og ${formatearNumero(ctx, meta.unidades)} for å tjene ${m(objetivo)} i måneden.`,
    ],
    faq: [
      {
        pregunta: "Hva er faste og variable kostnader?",
        respuesta: "Faste kostnader er de samme selv om du ikke selger noe: husleie, faste lønninger, strøm. Variable kostnader øker med hvert salg: innkjøp, materialer, provisjon og frakt.",
      },
      {
        pregunta: "Hvordan får jeg ned nullpunktet?",
        respuesta: "Det finnes tre måter: øke prisen, senke de variable kostnadene per enhet eller kutte i de faste kostnadene. Prisen gjør som regel størst forskjell.",
      },
      {
        pregunta: "Fungerer det også for en tjenestebedrift?",
        respuesta: "Ja. En enhet kan være en time, et oppdrag eller en kunde i måneden. Bruk det det koster deg å levere hver enhet, som variabel kostnad.",
      },
    ],
    glosario: [
      { termino: "Nullpunkt", definicion: "Salgsnivået der inntektene er like store som kostnadene." },
      { termino: "Dekningsbidrag", definicion: "Det hvert salg bidrar med til å betale de faste kostnadene." },
    ],
  };
};
