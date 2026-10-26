import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ug.stamp-duty-calculator",
  mercado: "ug",
  concepto: "propio",
  slug: "stamp-duty-calculator",
  // Borrador: la tasa sobre transferencias después de la Stamp Duty (Amendment) Act, 2026 no se pudo
  // leer en una fuente primaria (ver motivo en datos.json).
  estado: "borrador",
  requiere: {
    "ug.stamp-duty-transfer": "numero",
  },
  campos: [{ id: "valor", tipo: "moneda", etiqueta: "Value of the land or property transferred", min: 0, porDefecto: 100000000 }],
  calcular(e, v, { redondear }) {
    if (e.valor <= 0) throw new ErrorEntrada("Enter the value of the transfer.", "valor");
    const tasa = v["ug.stamp-duty-transfer"];
    return { duty: redondear(porcentaje(e.valor, tasa)), tasa };
  },
  resultado: [
    { clave: "duty", etiqueta: "Stamp duty on the transfer", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Rate", formato: "porcentaje", decimales: 1 },
  ],
});
