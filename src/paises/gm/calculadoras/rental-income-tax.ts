import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gm.rental-income-tax",
  mercado: "gm",
  concepto: "propio",
  slug: "rental-income-tax",
  estado: "publicado",
  requiere: {
    "gm.rental-tax-rates": "mapa",
  },
  campos: [
    { id: "residencial", tipo: "moneda", etiqueta: "Residential rent received in the year", min: 0, porDefecto: 600000 },
    { id: "comercial", tipo: "moneda", etiqueta: "Commercial rent received in the year", min: 0, porDefecto: 0, ayuda: "Shops, offices, hotels, guest houses and similar places." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.residencial + entrada.comercial <= 0) throw new ErrorEntrada("Enter the rent you received.", "residencial");
    const tasas = v["gm.rental-tax-rates"];
    const residencial = redondear(porcentaje(entrada.residencial, tasas.residential));
    const comercial = redondear(porcentaje(entrada.comercial, tasas.commercial));
    const total = redondear(residencial + comercial);
    return { total, residencial, comercial, trimestral: redondear(total / 4), neto: redondear(entrada.residencial + entrada.comercial - total) };
  },
  resultado: [
    { clave: "total", etiqueta: "Rental income tax for the year", formato: "moneda", destacada: true },
    { clave: "residencial", etiqueta: "On residential rent", formato: "moneda", ocultarSiCero: true },
    { clave: "comercial", etiqueta: "On commercial rent", formato: "moneda", ocultarSiCero: true },
    { clave: "trimestral", etiqueta: "Quarterly payment", formato: "moneda" },
    { clave: "neto", etiqueta: "Rent left after tax", formato: "moneda" },
  ],
});
