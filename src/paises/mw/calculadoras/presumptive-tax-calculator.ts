import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mw.presumptive-tax-calculator",
  mercado: "mw",
  concepto: "regimen-simplificado",
  slug: "presumptive-tax-calculator",
  estado: "publicado",
  requiere: {
    "mw.presumptive-tax": "escala",
  },
  campos: [{ id: "ventas", tipo: "moneda", etiqueta: "Turnover for the year", min: 0, porDefecto: 8000000 }],
  calcular(e, v, { redondear }) {
    if (e.ventas < 0) throw new ErrorEntrada("Turnover cannot be negative.", "ventas");
    const tabla = v["mw.presumptive-tax"];
    const techo = tabla[tabla.length - 1].hasta ?? 0;
    if (e.ventas > techo) {
      throw new ErrorEntrada(
        `Presumptive tax is only for businesses with a turnover up to MK ${techo.toLocaleString("en-MW")} a year. Above that the normal income tax rules apply.`,
        "ventas",
      );
    }
    // Cada fila de la MRA va «above X but not exceeding Y»: el límite de arriba pertenece a la fila.
    const fila = tabla.find((f) => f.hasta !== null && e.ventas <= f.hasta) ?? tabla[tabla.length - 1];
    const anual = redondear(fila.cuotaFija ?? 0);
    return { anual, trimestral: redondear(anual / 4) };
  },
  resultado: [
    { clave: "anual", etiqueta: "Presumptive tax for the year", formato: "moneda", destacada: true },
    { clave: "trimestral", etiqueta: "Quarterly instalment", formato: "moneda" },
  ],
});
