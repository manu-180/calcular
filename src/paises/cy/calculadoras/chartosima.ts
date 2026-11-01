import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "cy.chartosima",
  mercado: "cy",
  concepto: "propio",
  slug: "chartosima",
  estado: "publicado",
  requiere: { "cy.chartosima": "escala", "cy.chartosima-anotato": "numero" },
  campos: [{ id: "axia", tipo: "moneda", etiqueta: "Αξία της σύμβασης", min: 0, porDefecto: 200000 }],
  calcular(e, v, { redondear }) {
    if (e.axia <= 0) throw new ErrorEntrada("Εισάγετε αξία μεγαλύτερη από το μηδέν.", "axia");
    // Πρώτο Παράρτημα: «για κάθε ποσό €1.000 ή μέρος των €1.000» de cada tramo.
    let chartosima = 0;
    for (const f of v["cy.chartosima"]) {
      const meros = Math.max(0, Math.min(e.axia, f.hasta ?? Infinity) - f.desde);
      chartosima += (Math.ceil(meros / 1000) * 1000 * f.tasa) / 100;
    }
    const anotato = v["cy.chartosima-anotato"];
    const observaciones: string[] = [];
    if (chartosima > anotato) observaciones.push("Το τέλος χαρτοσήμου φτάνει το ανώτατο ποσό ανά σύμβαση.");
    return { chartosima: redondear(Math.min(chartosima, anotato)), observaciones };
  },
  resultado: [{ clave: "chartosima", etiqueta: "Τέλος χαρτοσήμου", formato: "moneda", destacada: true }],
});
