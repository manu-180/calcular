import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const quien = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "kúpa" : "nájom");
  return {
    h1: "Nájom alebo kúpa bytu: kalkulačka",
    title: tituloQueEntre(`Nájom alebo vlastné bývanie? (${ctx.nombrePais})`, "Nájom alebo kúpa bytu: čo sa oplatí", "Nájom alebo kúpa bytu"),
    description: "Porovnajte nájom a kúpu bytu na hypotéku za zvolený počet rokov. Zistite, čo sa oplatí viac, od ktorého roka a o koľko.",
    intro: [
      "Porovnať splátku hypotéky s nájmom nestačí. Vlastník platí úroky, údržbu a daň z nehnuteľností, ale na konci mu byt patrí. Nájomca môže mať vlastné zdroje ďalej investované.",
      "Kalkulačka to všetko vypočíta rok po roku a ukáže, ktorá možnosť vám nechá väčší majetok.",
    ],
    comoSeCalcula: [
      "Kúpa: každý mesiac splácate hypotéku a znášate náklady vlastníka. Váš majetok je hodnota bytu mínus zostávajúci dlh.",
      "Nájom: vlastné zdroje a náklady na kúpu zostávajú investované s alternatívnym výnosom a nájom každý rok zdražuje.",
      "Každý mesiac tá možnosť, ktorá stojí menej, investuje rozdiel, takže obe vychádzajú z rovnakého rozpočtu.",
      "Výhodnejšia je tá možnosť, pri ktorej je majetok na konci vyšší.",
    ],
    ejemplo: [
      `Byt za ${m(precio)} s 20 % vlastných zdrojov a hypotékou s úrokom 7 % na 25 rokov oproti nájmu za ${m(alquiler)} mesačne.`,
      `Po 10 rokoch vychádza lepšie ${quien(a10)}, rozdiel je ${m(Math.abs(a10.comprar - a10.alquilar))}. Po 3 rokoch vychádza lepšie ${quien(a3)}, rozdiel je ${m(Math.abs(a3.comprar - a3.alquilar))}.`,
    ],
    faq: [
      {
        pregunta: "Sú peniaze za nájom vyhodené?",
        respuesta:
          "Nie celkom. Aj vlastník platí to, čo sa mu nikdy nevráti: úroky, daň z nehnuteľností a údržbu. Dôležité je, koľko budete mať na konci v každej z možností.",
      },
      {
        pregunta: "Prečo výsledok závisí od počtu rokov?",
        respuesta:
          "Kúpa má vysoké počiatočné náklady (poplatky a úroky v prvých rokoch), ktoré sa nevrátia hneď. Ak sa chystáte čoskoro sťahovať, nájom zvyčajne vychádza lepšie.",
      },
      {
        pregunta: "Čo má na výsledok najväčší vplyv?",
        respuesta:
          "Pomer ceny bytu a nájmu, úroková sadzba hypotéky a to, ako rýchlo byty zdražujú. Zmeňte rast cien a výnos investícií a uvidíte, ako veľmi sa odpoveď mení.",
      },
    ],
    glosario: [
      { termino: "Majetok", definicion: "To, čo vlastníte, mínus to, čo dlhujete." },
      { termino: "Rast ceny bytu", definicion: "O koľko byt každý rok zdražie." },
      { termino: "Náklady obetovanej príležitosti", definicion: "Koľko by vlastné zdroje vyniesli, keby ste ich investovali." },
    ],
  };
};
