import { formatearMonto, montoEjemplo, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const quien = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "buying" : "renting");
  return {
    h1: "Rent vs buy calculator",
    title: `Rent vs buy calculator for ${ctx.nombrePais}`,
    description: "Compare renting with buying a home over the years you choose. See which one leaves you better off, from which year, and by how much.",
    intro: [
      "Comparing the mortgage payment with the rent is not enough. Buyers pay interest, upkeep and property tax, but they end up owning the home. Renters can keep the down payment invested.",
      "This calculator adds all of that up year by year and tells you which option leaves you with more net worth.",
    ],
    comoSeCalcula: [
      "Buying: each month you pay the mortgage and the owner costs. Your net worth is the home's value minus what you still owe.",
      "Renting: the down payment and buying costs stay invested at the alternative return, and rent rises every year.",
      "Each month, whoever spends less invests the difference, so both options come out of the same budget.",
      "The better option is the one with more net worth at the end.",
    ],
    ejemplo: [
      `A home of ${m(precio)} with 20% down and a 7% mortgage over 25 years, against rent of ${m(alquiler)} a month.`,
      `Over 10 years, ${quien(a10)} comes out ahead by ${m(Math.abs(a10.comprar - a10.alquilar))}. Over 3 years, ${quien(a3)} comes out ahead by ${m(Math.abs(a3.comprar - a3.alquilar))}.`,
    ],
    faq: [
      {
        pregunta: "Is renting throwing money away?",
        respuesta:
          "Not quite. Buyers also pay costs they never get back: interest, property tax and upkeep. What matters is how much you own at the end in each case.",
      },
      {
        pregunta: "Why does the answer change with the number of years?",
        respuesta:
          "Buying has big costs up front (closing costs and early interest) that take time to recover. If you plan to move soon, renting usually comes out ahead.",
      },
      {
        pregunta: "Which input matters most?",
        respuesta:
          "The ratio between price and rent, the mortgage rate and how fast home prices grow. Try changing price growth and the investment return to see how much the answer moves.",
      },
    ],
    glosario: [
      { termino: "Net worth", definicion: "What you own minus what you owe." },
      { termino: "Price growth", definicion: "How much the home's value rises each year." },
      { termino: "Opportunity cost", definicion: "What the down payment would have earned if you had invested it." },
    ],
  };
};
