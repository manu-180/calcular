import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "tz.transport-presumptive-tax",
  mercado: "tz",
  concepto: "propio",
  slug: "transport-presumptive-tax",
  estado: "publicado",
  requiere: {
    "tz.presumptive-transport": "mapa",
  },
  campos: [
    { id: "tipo", tipo: "opcion-dato", etiqueta: "Type of vehicle and capacity", dato: "tz.presumptive-transport", porDefecto: "psv-15" },
    { id: "vehiculos", tipo: "entero", etiqueta: "Number of vehicles of this type", min: 1, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.vehiculos < 1) throw new ErrorEntrada("Enter at least one vehicle.", "vehiculos");
    const porVehiculo = enMapa(v["tz.presumptive-transport"], e.tipo);
    const total = redondear(porVehiculo * e.vehiculos);
    return { total, porVehiculo };
  },
  resultado: [
    { clave: "total", etiqueta: "Income tax for the year", formato: "moneda", destacada: true },
    { clave: "porVehiculo", etiqueta: "Tax for each vehicle", formato: "moneda" },
  ],
});
