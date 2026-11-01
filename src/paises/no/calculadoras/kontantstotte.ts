import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "no.kontantstotte",
  mercado: "no",
  concepto: "propio",
  slug: "kontantstotte",
  estado: "publicado",
  requiere: {
    "no.kontantstotte": "numero",
    "no.kontantstotte-andel": "mapa",
    "no.kontantstotte-maaneder": "numero",
  },
  campos: [
    { id: "barnehage", tipo: "opcion-dato", dato: "no.kontantstotte-andel", etiqueta: "Avtalt tid i barnehage", porDefecto: "ingen" },
    { id: "maneder", tipo: "entero", etiqueta: "Antall måneder med kontantstøtte", min: 1, max: 12, porDefecto: 7 },
  ],
  calcular(e, v, { redondear }) {
    const maks = v["no.kontantstotte-maaneder"];
    if (e.maneder < 1 || e.maneder > maks) throw new ErrorEntrada(`Du kan få kontantstøtte i 1 til ${maks} måneder.`, "maneder");
    const andel = enMapa(v["no.kontantstotte-andel"], e.barnehage);
    const perManed = redondear((v["no.kontantstotte"] * andel) / 100);
    const observaciones: string[] = [];
    if (andel === 0) observaciones.push("Med 33 timer eller mer i barnehage i uken gis det ikke kontantstøtte.");
    return { perManed, totalt: redondear(perManed * e.maneder), andel, full: v["no.kontantstotte"], observaciones };
  },
  resultado: [
    { clave: "perManed", etiqueta: "Kontantstøtte per måned", formato: "moneda", destacada: true },
    { clave: "totalt", etiqueta: "Kontantstøtte for hele perioden", formato: "moneda" },
    { clave: "andel", etiqueta: "Andel av full kontantstøtte", formato: "porcentaje", decimales: 0 },
    { clave: "full", etiqueta: "Full kontantstøtte per måned", formato: "moneda" },
  ],
});
