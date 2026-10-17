import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ng.fixed-deposit-calculator",
  mercado: "ng",
  concepto: "plazo-fijo",
  slug: "fixed-deposit-calculator",
  estado: "publicado",
  requiere: {},
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount deposited", min: 0, porDefecto: 1000000 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Interest rate a year", min: 0, max: 60, porDefecto: 15 },
    { id: "dias", tipo: "entero", etiqueta: "Tenor in days", min: 1, max: 3650, porDefecto: 90 },
    { id: "renovaciones", tipo: "entero", etiqueta: "Times you roll it over with the interest", min: 0, max: 40, porDefecto: 0 },
  ],
  calcular(entrada, _v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter the amount deposited.", "monto");
    let saldo = entrada.monto;
    let primero = 0;
    for (let i = 0; i <= entrada.renovaciones; i++) {
      const interes = (saldo * entrada.tasa * entrada.dias) / 36500;
      if (i === 0) primero = interes;
      saldo += interes;
    }
    return {
      madurez: redondear(saldo),
      interes: redondear(saldo - entrada.monto),
      primero: redondear(primero),
      dias: entrada.dias * (entrada.renovaciones + 1),
    };
  },
  resultado: [
    { clave: "madurez", etiqueta: "Amount at maturity", formato: "moneda", destacada: true },
    { clave: "interes", etiqueta: "Total interest", formato: "moneda" },
    { clave: "primero", etiqueta: "Interest on the first tenor", formato: "moneda" },
    { clave: "dias", etiqueta: "Total days", formato: "dias" },
  ],
});
