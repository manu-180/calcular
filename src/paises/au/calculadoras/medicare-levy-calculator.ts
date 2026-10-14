import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { dolares, medicare } from "../lib/impuestos";

export default definirCalculadora({
  id: "au.medicare-levy-calculator",
  mercado: "au",
  concepto: "propio",
  slug: "medicare-levy-calculator",
  estado: "publicado",
  requiere: {
    "au.medicare-levy": "numero",
    "au.medicare-umbrales": "mapa",
    "au.medicare-tasa-reduccion": "numero",
  },
  campos: [{ id: "ingreso", tipo: "moneda", etiqueta: "Taxable income for the year", min: 0, porDefecto: 60000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso < 0) throw new ErrorEntrada("Enter an income of zero or more.", "ingreso");
    const u = v["au.medicare-umbrales"];
    const tasa = v["au.medicare-levy"];
    const levy = redondear(medicare(entrada.ingreso, { tasa, umbral: u.umbral, limite: u.limite, tasaReduccion: v["au.medicare-tasa-reduccion"] }));
    const pleno = redondear((entrada.ingreso * tasa) / 100);
    const situacion =
      entrada.ingreso <= u.umbral
        ? `No Medicare levy: your income is ${dolares(u.umbral)} or less.`
        : entrada.ingreso <= u.limite
          ? "Reduced Medicare levy for a low income."
          : "Full Medicare levy.";
    return { levy, pleno, ahorro: redondear(pleno - levy), situacion };
  },
  resultado: [
    { clave: "levy", etiqueta: "Medicare levy you pay", formato: "moneda", destacada: true },
    { clave: "situacion", etiqueta: "Your situation", formato: "texto" },
    { clave: "pleno", etiqueta: "Full levy without the reduction", formato: "moneda" },
    { clave: "ahorro", etiqueta: "Reduction", formato: "moneda", ocultarSiCero: true },
  ],
});
