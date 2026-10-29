import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

// La tabla de la ZRA va de kwacha entero en kwacha entero (1 a 150, 151 a 300...): un monto con
// ngwee por encima del límite de una fila cae en la siguiente.
function cargo(tabla: readonly FilaEscala[], monto: number): number {
  const fila = tabla.find((f) => f.hasta === null || monto <= f.hasta) ?? tabla[tabla.length - 1];
  return fila.cuotaFija ?? 0;
}

export default definirCalculadora({
  id: "zm.mobile-money-levy-calculator",
  mercado: "zm",
  concepto: "propio",
  slug: "mobile-money-levy-calculator",
  estado: "publicado",
  requiere: {
    "zm.mmtl-bands": "escala",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount you send", min: 0, porDefecto: 500 },
    { id: "veces", tipo: "entero", etiqueta: "Transactions of this size in a month", min: 1, max: 1000, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto < 1) throw new ErrorEntrada("Enter an amount of at least K1.", "monto");
    const levy = cargo(v["zm.mmtl-bands"], e.monto);
    return { levy, mensual: redondear(levy * e.veces), porcentaje: (levy / e.monto) * 100 };
  },
  resultado: [
    { clave: "levy", etiqueta: "Levy on each transaction", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Levy for the month", formato: "moneda" },
    { clave: "porcentaje", etiqueta: "Levy as a share of the amount", formato: "porcentaje", decimales: 2 },
  ],
});
