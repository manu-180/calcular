import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "nz.nz-super-calculator",
  mercado: "nz",
  concepto: "jubilacion",
  slug: "nz-super-calculator",
  estado: "publicado",
  requiere: {
    "nz.nz-super-gross": "mapa",
    "nz.nz-super-net-m": "mapa",
  },
  campos: [{ id: "situacion", tipo: "opcion-dato", dato: "nz.nz-super-gross", etiqueta: "Your living situation", porDefecto: "single-alone" }],
  calcular(entrada, v, { redondear }) {
    const bruto = enMapa(v["nz.nz-super-gross"], entrada.situacion);
    const neto = enMapa(v["nz.nz-super-net-m"], entrada.situacion);
    const observaciones = ["The after-tax amounts use the M tax code. With other income your tax code may be S, SH, ST or SA, and you get less."];
    if (entrada.situacion === "couple-each") observaciones.push("This is for each partner who qualifies. A couple where both qualify gets twice this.");
    return {
      neto,
      bruto,
      semanal: redondear(neto / 2),
      anualNeto: redondear(neto * 26),
      anualBruto: redondear(bruto * 26),
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "NZ Super a fortnight after tax (M code)", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "A fortnight before tax", formato: "moneda" },
    { clave: "semanal", etiqueta: "About a week after tax", formato: "moneda" },
    { clave: "anualNeto", etiqueta: "A year after tax", formato: "moneda" },
    { clave: "anualBruto", etiqueta: "A year before tax", formato: "moneda" },
  ],
});
