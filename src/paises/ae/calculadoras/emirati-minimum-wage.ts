import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ae.emirati-minimum-wage",
  mercado: "ae",
  concepto: "salario-minimo",
  slug: "emirati-minimum-wage",
  estado: "publicado",
  requiere: {
    "ae.emirati-minimum-wage": "numero",
  },
  campos: [{ id: "salario", tipo: "moneda", etiqueta: "Monthly wage of the Emirati employee", min: 0, porDefecto: 5500 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter the monthly wage.", "salario");
    const minimo = v["ae.emirati-minimum-wage"];
    const faltante = redondear(Math.max(0, minimo - entrada.salario));
    return {
      minimo,
      faltante,
      anual: redondear(faltante * 12),
      observaciones: [faltante > 0 ? "The wage is below the minimum set by MoHRE for Emiratis in the private sector." : "The wage meets the minimum for Emiratis in the private sector."],
    };
  },
  resultado: [
    { clave: "faltante", etiqueta: "Amount below the minimum each month", formato: "moneda", destacada: true },
    { clave: "minimo", etiqueta: "Minimum monthly wage for Emiratis", formato: "moneda" },
    { clave: "anual", etiqueta: "Shortfall over 12 months", formato: "moneda" },
  ],
});
