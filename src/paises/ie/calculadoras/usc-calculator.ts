import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { euros, usc } from "../lib/impuestos";

export default definirCalculadora({
  id: "ie.usc-calculator",
  mercado: "ie",
  concepto: "propio",
  slug: "usc-calculator",
  estado: "publicado",
  requiere: {
    "ie.usc-bands": "escala",
    "ie.usc-reduced-bands": "escala",
    "ie.usc-reduced-income-limit": "numero",
    "ie.usc-exemption": "numero",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Your total yearly income", min: 0, porDefecto: 50000 },
    { id: "reducida", tipo: "si-no", etiqueta: "You are 70 or over, or have a full medical card", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso < 0) throw new ErrorEntrada("Income cannot be negative.", "ingreso");
    const r = usc(entrada.ingreso, entrada.reducida, {
      escala: v["ie.usc-bands"],
      escalaReducida: v["ie.usc-reduced-bands"],
      exencion: v["ie.usc-exemption"],
      limiteReducida: v["ie.usc-reduced-income-limit"],
    });
    const anual = redondear(r.usc);
    const escala = r.reducida ? v["ie.usc-reduced-bands"] : v["ie.usc-bands"];
    let marginal = 0;
    if (!r.exento) for (const f of escala) if (entrada.ingreso > f.desde) marginal = f.tasa;
    const observaciones: string[] = [];
    if (r.exento) observaciones.push(`Your income is ${euros(v["ie.usc-exemption"])} or less, so you pay no USC.`);
    if (entrada.reducida && !r.reducida && !r.exento) {
      observaciones.push(`Reduced rates only apply if your income is ${euros(v["ie.usc-reduced-income-limit"])} or less, so the standard rates are used.`);
    }
    if (entrada.ingreso > 100000) {
      observaciones.push("If more than €100,000 of your income is non-PAYE income, such as self-employed income, a 3% USC surcharge also applies. It is not included here.");
    }
    return {
      anual,
      mensual: redondear(anual / 12),
      semanal: redondear(anual / 52),
      efectiva: entrada.ingreso > 0 ? (anual / entrada.ingreso) * 100 : 0,
      marginal,
      tipo: r.exento ? "Exempt" : r.reducida ? "Reduced rates" : "Standard rates",
      observaciones,
    };
  },
  resultado: [
    { clave: "anual", etiqueta: "USC for the year", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "USC a month", formato: "moneda" },
    { clave: "semanal", etiqueta: "USC a week", formato: "moneda" },
    { clave: "tipo", etiqueta: "Rates used", formato: "texto" },
    { clave: "efectiva", etiqueta: "Share of your income", formato: "porcentaje", decimales: 2 },
    { clave: "marginal", etiqueta: "USC rate on your top euro", formato: "porcentaje", decimales: 1 },
  ],
});
