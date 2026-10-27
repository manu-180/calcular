import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "rw.road-maintenance-levy-calculator",
  mercado: "rw",
  concepto: "propio",
  slug: "road-maintenance-levy-calculator",
  estado: "publicado",
  requiere: {
    "rw.road-levy": "mapa",
  },
  campos: [
    { id: "categoria", tipo: "opcion-dato", etiqueta: "Vehicle category", dato: "rw.road-levy", porDefecto: "car" },
    { id: "cantidad", tipo: "entero", etiqueta: "Number of vehicles", min: 1, porDefecto: 1 },
  ],
  calcular(e, v) {
    if (e.cantidad < 1) throw new ErrorEntrada("Enter at least one vehicle.", "cantidad");
    const porVehiculo = enMapa(v["rw.road-levy"], e.categoria);
    return {
      total: porVehiculo * e.cantidad,
      porVehiculo,
      observaciones: ["Declare and pay by 31 December each year. Government, diplomatic and exempt international organisation vehicles do not pay."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Road maintenance levy for the year", formato: "moneda", destacada: true },
    { clave: "porVehiculo", etiqueta: "Per vehicle", formato: "moneda" },
  ],
});
