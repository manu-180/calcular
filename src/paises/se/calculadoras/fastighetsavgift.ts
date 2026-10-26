import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "se.fastighetsavgift",
  mercado: "se",
  concepto: "propio",
  slug: "fastighetsavgift",
  estado: "publicado",
  requiere: { "se.fastighetsavgift": "mapa" },
  campos: [
    { id: "taxeringsvarde", tipo: "moneda", etiqueta: "Taxeringsvärde för småhuset", min: 0, porDefecto: 2000000 },
    { id: "vardear", tipo: "entero", etiqueta: "Värdeår (ungefär byggår)", min: 1800, max: 2100, porDefecto: 1985, ayuda: "Värdeåret står på beslutet om fastighetstaxering." },
  ],
  calcular(e, v, { fecha, redondear }) {
    if (e.taxeringsvarde <= 0) throw new ErrorEntrada("Skriv taxeringsvärdet.", "taxeringsvarde");
    const f = v["se.fastighetsavgift"];
    const ar = Number(fecha.slice(0, 4));
    const fria = enMapa(f, "fria-ar");
    const nytt = e.vardear >= 2012 && ar - e.vardear < fria;
    const procent = Math.floor((e.taxeringsvarde * enMapa(f, "sats")) / 100);
    const avgift = nytt ? 0 : Math.min(procent, enMapa(f, "tak"));
    const observaciones: string[] = [];
    if (nytt) observaciones.push(`Hus med värdeår 2012 eller senare är avgiftsfria de första ${fria} åren.`);
    else if (avgift < procent) observaciones.push("Avgiften når taket, så den blir inte högre trots ett högre taxeringsvärde.");
    observaciones.push("Avgiften gäller småhus. För ägarlägenheter och bostadsrätter gäller andra belopp.");
    return { avgift, perManad: redondear(avgift / 12), procent, tak: enMapa(f, "tak"), observaciones };
  },
  resultado: [
    { clave: "avgift", etiqueta: "Kommunal fastighetsavgift per år", formato: "moneda", decimales: 0, destacada: true },
    { clave: "perManad", etiqueta: "Per månad", formato: "moneda" },
    { clave: "procent", etiqueta: "Avgift enligt procentsatsen", formato: "moneda", decimales: 0 },
    { clave: "tak", etiqueta: "Högsta avgift", formato: "moneda", decimales: 0 },
  ],
});
