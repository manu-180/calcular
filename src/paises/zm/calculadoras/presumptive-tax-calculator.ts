import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "zm.presumptive-tax-calculator",
  mercado: "zm",
  concepto: "propio",
  slug: "presumptive-tax-calculator",
  estado: "publicado",
  requiere: {
    "zm.presumptive-tax": "mapa",
  },
  campos: [
    { id: "asientos", tipo: "opcion-dato", dato: "zm.presumptive-tax", etiqueta: "Seating capacity", porDefecto: "18-21" },
    { id: "vehiculos", tipo: "entero", etiqueta: "Number of vehicles", min: 1, max: 500, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    const porVehiculo = enMapa(v["zm.presumptive-tax"], e.asientos);
    const anual = redondear(porVehiculo * e.vehiculos);
    return { anual, porVehiculo, trimestral: redondear(anual / 4), mensual: redondear(anual / 12) };
  },
  resultado: [
    { clave: "anual", etiqueta: "Presumptive tax for the year", formato: "moneda", destacada: true },
    { clave: "porVehiculo", etiqueta: "Per vehicle for the year", formato: "moneda" },
    { clave: "trimestral", etiqueta: "Per quarter", formato: "moneda" },
    { clave: "mensual", etiqueta: "Per month", formato: "moneda" },
  ],
});
