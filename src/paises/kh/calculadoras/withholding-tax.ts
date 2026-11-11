import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "kh.withholding-tax",
  mercado: "kh",
  concepto: "retencion-honorarios",
  slug: "withholding-tax",
  estado: "publicado",
  requiere: { "kh.wht-rates": "mapa" },
  campos: [
    { id: "tipo", tipo: "opcion-dato", dato: "kh.wht-rates", etiqueta: "ប្រភេទការទូទាត់", porDefecto: "service" },
    { id: "monto", tipo: "moneda", etiqueta: "ចំនួនទូទាត់សរុប (រៀល)", min: 0, porDefecto: 1000000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto <= 0) throw new ErrorEntrada("សូមបញ្ចូលចំនួនទឹកប្រាក់។", "monto");
    const tasa = enMapa(v["kh.wht-rates"], e.tipo);
    const retencion = redondear(porcentaje(e.monto, tasa));
    return { retencion, neto: redondear(e.monto - retencion), tasa };
  },
  resultado: [
    { clave: "retencion", etiqueta: "ពន្ធកាត់ទុក", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "ប្រាក់ដែលអ្នកទទួលនៅសល់", formato: "moneda" },
    { clave: "tasa", etiqueta: "អត្រា", formato: "porcentaje" },
  ],
});
