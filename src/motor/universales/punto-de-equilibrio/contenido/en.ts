import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "Break-even calculator",
    title: tituloQueEntre(`Break-even calculator for ${ctx.nombrePais}`, `Break-even in ${ctx.nombrePais}`, "Break-even calculator"),
    description: "Find out how many units you need to sell and how much revenue you need each month to cover your costs, and to reach your target profit.",
    intro: [
      "The break-even point is the level of sales where a business neither makes nor loses money. Below it you lose, above it you start to profit.",
      "Enter your fixed costs, the price and the cost of each unit. We tell you how much to sell to cover costs and to hit your goal.",
    ],
    comoSeCalcula: [
      "Contribution margin = price − variable cost per unit.",
      "Break-even units = fixed costs ÷ contribution margin, rounded up.",
      "Break-even sales = fixed costs ÷ (contribution margin ÷ price).",
      "For a target profit, add it to fixed costs and run the same math.",
    ],
    ejemplo: [
      `With ${m(fijos)} in fixed costs, a price of ${m(precio)} and a variable cost of ${m(variable)}, each sale leaves ${m(precio - variable)}.`,
      `You need to sell ${formatearNumero(ctx, base.unidades)} units (${m(base.facturacion)}) to cover costs, and ${formatearNumero(ctx, meta.unidades)} to make ${m(objetivo)} a month.`,
    ],
    faq: [
      {
        pregunta: "What are fixed and variable costs?",
        respuesta: "Fixed costs stay the same even if you sell nothing: rent, fixed salaries, utilities. Variable costs grow with each sale: stock, materials, commissions, shipping.",
      },
      {
        pregunta: "How do I lower my break-even point?",
        respuesta: "There are three levers: raise the price, cut the variable cost per unit or trim fixed costs. Price usually moves the needle the most.",
      },
      {
        pregunta: "Does it work for a service business?",
        respuesta: "Yes. A unit can be an hour, a session or a client per month. Use what it costs you to deliver each one as the variable cost.",
      },
    ],
    glosario: [
      { termino: "Break-even point", definicion: "The sales level where revenue equals costs." },
      { termino: "Contribution margin", definicion: "What each sale leaves to pay fixed costs." },
    ],
  };
};
