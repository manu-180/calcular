import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "rw.tourism-tax-calculator",
  mercado: "rw",
  concepto: "propio",
  slug: "tourism-tax-calculator",
  estado: "publicado",
  requiere: {
    "rw.tourism-tax": "numero",
  },
  campos: [
    { id: "tarifa", tipo: "moneda", etiqueta: "Room rate a night, without VAT", min: 0, porDefecto: 80000 },
    { id: "noches", tipo: "entero", etiqueta: "Nights", min: 1, porDefecto: 3 },
  ],
  calcular(e, v, { redondear }) {
    if (e.tarifa <= 0) throw new ErrorEntrada("Enter the room rate.", "tarifa");
    if (e.noches < 1) throw new ErrorEntrada("Enter at least one night.", "noches");
    const alojamiento = e.tarifa * e.noches;
    const impuesto = redondear(porcentaje(alojamiento, v["rw.tourism-tax"]));
    return { impuesto, alojamiento, total: alojamiento + impuesto };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Tourism tax", formato: "moneda", destacada: true },
    { clave: "alojamiento", etiqueta: "Accommodation without VAT", formato: "moneda" },
    { clave: "total", etiqueta: "Accommodation plus tourism tax (before VAT)", formato: "moneda" },
  ],
});
