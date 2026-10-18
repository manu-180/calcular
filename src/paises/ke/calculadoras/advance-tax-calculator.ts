import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ke.advance-tax-calculator",
  mercado: "ke",
  concepto: "propio",
  slug: "advance-tax-calculator",
  estado: "publicado",
  requiere: {
    "ke.advance-tax-per-ton": "numero",
    "ke.advance-tax-per-passenger": "numero",
    "ke.advance-tax-minimum": "numero",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Type of vehicle",
      opciones: [
        { valor: "goods", etiqueta: "Van, pick-up, truck, prime mover, trailer or lorry" },
        { valor: "passenger", etiqueta: "Saloon, station wagon, minibus, bus or coach" },
      ],
      porDefecto: "goods",
    },
    { id: "toneladas", tipo: "numero", etiqueta: "Load capacity in tons", min: 0, porDefecto: 10, visibleSi: { tipo: ["goods"] } },
    { id: "pasajeros", tipo: "entero", etiqueta: "Passenger capacity", min: 0, porDefecto: 14, visibleSi: { tipo: ["passenger"] } },
  ],
  calcular(e, v, { redondear }) {
    const minimo = v["ke.advance-tax-minimum"];
    let calculado: number;
    if (e.tipo === "goods") {
      if (e.toneladas === null || e.toneladas <= 0) throw new ErrorEntrada("Enter the load capacity in tons.", "toneladas");
      calculado = e.toneladas * v["ke.advance-tax-per-ton"];
    } else {
      if (e.pasajeros === null || e.pasajeros <= 0) throw new ErrorEntrada("Enter the passenger capacity.", "pasajeros");
      calculado = e.pasajeros * v["ke.advance-tax-per-passenger"] * 12;
    }
    const anual = redondear(Math.max(calculado, minimo));
    const observaciones: string[] = [];
    if (calculado < minimo) observaciones.push("The rate gives less than the yearly minimum, so the minimum applies.");
    observaciones.push("Advance tax is not a final tax. Declare it in your yearly return and pay any extra tax due.");
    return { anual, calculado: redondear(calculado), mensual: redondear(anual / 12), observaciones };
  },
  resultado: [
    { clave: "anual", etiqueta: "Advance tax for the year", formato: "moneda", destacada: true },
    { clave: "calculado", etiqueta: "Amount from the rate", formato: "moneda" },
    { clave: "mensual", etiqueta: "Equivalent a month", formato: "moneda" },
  ],
});
