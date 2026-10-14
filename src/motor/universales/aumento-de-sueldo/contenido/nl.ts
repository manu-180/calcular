import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const sueldo = montoEjemplo(ctx, 4000);
  return {
    h1: "Salarisverhoging berekenen",
    title: tituloQueEntre(`Salarisverhoging berekenen in ${ctx.nombrePais}`, "Salarisverhoging berekenen"),
    description: "Bereken je nieuwe salaris na een verhoging, het verschil per maand en per jaar, en of je er na inflatie echt op vooruitgaat.",
    intro: [
      "Je krijgt een loonsverhoging aangeboden, of je gaat er zelf om vragen. Vul je salaris en de verhoging in, als percentage of als bedrag, en zie wat er per maand en per jaar verandert.",
      "Vul ook de inflatie van die periode in en je ziet of je er echt in koopkracht op vooruitgaat of alleen bijbeent.",
    ],
    comoSeCalcula: [
      "Nieuw salaris = huidig salaris × (1 + verhoging ÷ 100).",
      "Verschil per jaar = verschil per maand × aantal salarissen per jaar.",
      "Reële verhoging = (1 + verhoging) ÷ (1 + inflatie) − 1.",
    ],
    ejemplo: [
      `Een salaris van ${m(sueldo)} per maand met 5% verhoging wordt ${m(sueldo * 1.05)}. Dat is ${m(sueldo * 0.05)} meer per maand en ${m(sueldo * 0.05 * 12)} meer per jaar.`,
      `Was de inflatie in die periode 3%, dan is je reële verhoging ${p(aumentoReal(5, 3))}. Bij 6% inflatie is het ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "Wat is een reële loonsverhoging?",
        respuesta: "Dat is je verhoging na inflatie. Je ziet ermee of je met je nieuwe salaris meer of minder kunt kopen dan eerst.",
      },
      {
        pregunta: "Waarom trek je de inflatie niet gewoon van de verhoging af?",
        respuesta: `Omdat je de twee percentages vermenigvuldigt, niet optelt. Bij 5% verhoging en 3% inflatie is je reële verhoging ${p(aumentoReal(5, 3))}, geen 2%. Bij hoge inflatie wordt dat verschil veel groter.`,
      },
      {
        pregunta: "Hoeveel loonsverhoging kun je vragen?",
        respuesta: "Minstens de inflatie sinds je vorige verhoging, zodat je er niet op achteruitgaat. Daarboven telt wat andere werkgevers voor een functie als de jouwe betalen en hoe je werk gegroeid is.",
      },
    ],
    glosario: [
      { termino: "Nominale verhoging", definicion: "De verhoging zoals die op je loonstrook staat, zonder rekening te houden met inflatie." },
      { termino: "Koopkracht", definicion: "Wat je met je salaris kunt kopen." },
    ],
  };
};
