import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const quien = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "koupě" : "nájem");
  return {
    h1: "Nájem, nebo koupě bytu: kalkulačka",
    title: tituloQueEntre(`Nájem, nebo vlastní bydlení? (${ctx.nombrePais})`, "Nájem, nebo koupě bytu: co se vyplatí", "Nájem, nebo koupě bytu"),
    description: "Porovnejte nájem a koupi bytu na hypotéku za zvolený počet let. Zjistěte, co se vyplatí víc, od kterého roku a o kolik.",
    intro: [
      "Porovnat splátku hypotéky s nájmem nestačí. Vlastník platí úroky, údržbu a daň z nemovitých věcí, ale na konci mu byt patří. Nájemník může mít vlastní zdroje dál investované.",
      "Kalkulačka to všechno spočítá rok po roku a ukáže, která možnost vám nechá větší majetek.",
    ],
    comoSeCalcula: [
      "Koupě: každý měsíc splácíte hypotéku a nesete náklady vlastníka. Váš majetek je hodnota bytu minus zbývající dluh.",
      "Nájem: vlastní zdroje a náklady na koupi zůstávají investované s alternativním výnosem a nájem každý rok zdražuje.",
      "Každý měsíc ta možnost, která stojí méně, investuje rozdíl, takže obě vycházejí ze stejného rozpočtu.",
      "Výhodnější je ta možnost, u které je majetek na konci vyšší.",
    ],
    ejemplo: [
      `Byt za ${m(precio)} s 20 % vlastních zdrojů a hypotékou s úrokem 7 % na 25 let proti nájmu za ${m(alquiler)} měsíčně.`,
      `Za 10 let vychází líp ${quien(a10)}, rozdíl je ${m(Math.abs(a10.comprar - a10.alquilar))}. Za 3 roky vychází líp ${quien(a3)}, rozdíl je ${m(Math.abs(a3.comprar - a3.alquilar))}.`,
    ],
    faq: [
      {
        pregunta: "Je nájem vyhozené peníze?",
        respuesta:
          "Tak docela ne. I vlastník platí to, co se mu nikdy nevrátí: úroky, daň z nemovitých věcí a údržbu. Důležité je, kolik budete mít na konci v každé z možností.",
      },
      {
        pregunta: "Proč výsledek závisí na počtu let?",
        respuesta:
          "Koupě má vysoké počáteční náklady (poplatky a úroky v prvních letech), které se nevrátí hned. Pokud se chystáte brzy stěhovat, nájem obvykle vychází líp.",
      },
      {
        pregunta: "Co má na výsledek největší vliv?",
        respuesta:
          "Poměr ceny bytu a nájmu, úroková sazba hypotéky a to, jak rychle byty zdražují. Změňte růst cen a výnos investic a uvidíte, jak moc se odpověď mění.",
      },
    ],
    glosario: [
      { termino: "Majetek", definicion: "To, co vlastníte, minus to, co dlužíte." },
      { termino: "Růst ceny bytu", definicion: "O kolik byt každý rok zdraží." },
      { termino: "Náklady obětované příležitosti", definicion: "Kolik by vlastní zdroje vynesly, kdybyste je investovali." },
    ],
  };
};
