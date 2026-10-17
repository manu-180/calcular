import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ph.separation-pay",
  mercado: "ph",
  concepto: "indemnizacion-despido",
  slug: "separation-pay",
  estado: "publicado",
  requiere: {
    "ph.separation-pay": "mapa",
  },
  campos: [
    { id: "mensual", tipo: "moneda", etiqueta: "Your monthly pay", min: 0, porDefecto: 25000 },
    { id: "causa", tipo: "opcion-dato", etiqueta: "Reason for the termination", dato: "ph.separation-pay", porDefecto: "redundancy" },
    { id: "anios", tipo: "entero", etiqueta: "Full years of service", min: 0, max: 60, porDefecto: 5 },
    { id: "meses", tipo: "entero", etiqueta: "Extra months of service", min: 0, max: 11, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.mensual <= 0) throw new ErrorEntrada("Enter your monthly pay.", "mensual");
    if (entrada.meses > 11) throw new ErrorEntrada("Enter 11 months at most; full years go in the field above.", "meses");
    const porAnio = enMapa(v["ph.separation-pay"], entrada.causa);
    const anios = entrada.anios + (entrada.meses >= 6 ? 1 : 0);
    const porServicio = redondear(entrada.mensual * porAnio * anios);
    const minimo = redondear(entrada.mensual);
    const total = Math.max(porServicio, minimo);
    const observaciones: string[] = [];
    if (total === minimo && porServicio < minimo) observaciones.push("The law guarantees at least one month of pay, which is higher than the amount per year of service in your case.");
    if (entrada.meses >= 6) observaciones.push("Your extra months count as one more full year, since they are 6 or more.");
    return { total, porServicio, minimo, anios, mesesPorAnio: porAnio };
  },
  resultado: [
    { clave: "total", etiqueta: "Separation pay", formato: "moneda", destacada: true },
    { clave: "porServicio", etiqueta: "Pay for years of service", formato: "moneda" },
    { clave: "minimo", etiqueta: "Minimum of one month of pay", formato: "moneda" },
    { clave: "anios", etiqueta: "Years of service counted", formato: "anios" },
    { clave: "mesesPorAnio", etiqueta: "Months of pay per year of service", formato: "meses", decimales: 1 },
  ],
});
