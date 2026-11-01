import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "lk.stamp-duty-calculator",
  mercado: "lk",
  concepto: "propio",
  slug: "stamp-duty-calculator",
  estado: "publicado",
  requiere: {
    "lk.stamp-duty-per-1000": "mapa",
    "lk.stamp-duty-lease-max-years": "numero",
  },
  campos: [
    { id: "instrumento", tipo: "opcion-dato", dato: "lk.stamp-duty-per-1000", etiqueta: "Instrument", porDefecto: "lease" },
    { id: "importe", tipo: "moneda", etiqueta: "Value of the instrument", min: 0, porDefecto: 1200000, ayuda: "For a lease, the monthly rent if you fill in the term below; otherwise the total value." },
    { id: "anios", tipo: "numero", etiqueta: "Lease term in years", min: 0, max: 99, porDefecto: 2, visibleSi: { instrumento: ["lease"] }, ayuda: "Leave it at 0 if you entered the aggregate rent above." },
  ],
  calcular(e, v, { redondear }) {
    if (e.importe <= 0) throw new ErrorEntrada("Enter the value of the instrument.", "importe");
    const tasa = enMapa(v["lk.stamp-duty-per-1000"], e.instrumento);
    const observaciones: string[] = [];
    let base = e.importe;
    if (e.instrumento === "lease" && e.anios) {
      const tope = v["lk.stamp-duty-lease-max-years"];
      const anios = Math.min(e.anios, tope);
      if (e.anios > tope) observaciones.push(`Only the rent for the first ${tope} years of the lease is counted.`);
      base = e.importe * 12 * anios;
    }
    const tramos = Math.ceil(base / 1000);
    return { derecho: redondear(tramos * tasa), base: redondear(base), tasa, tramos, observaciones };
  },
  resultado: [
    { clave: "derecho", etiqueta: "Stamp duty", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Amount the duty is charged on", formato: "moneda" },
    { clave: "tasa", etiqueta: "Duty for every Rs. 1,000 or part of it", formato: "moneda" },
    { clave: "tramos", etiqueta: "Blocks of Rs. 1,000", formato: "numero", decimales: 0 },
  ],
});
