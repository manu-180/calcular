import { definirCalculadora, ErrorEntrada, porcentaje, porRegion } from "@/motor/calculo";

const NOMBRE_PST: Readonly<Record<string, string>> = { bc: "PST", mb: "RST", qc: "QST", sk: "PST" };

export default definirCalculadora({
  id: "ca.sales-tax-calculator",
  mercado: "ca",
  concepto: "iva",
  slug: "sales-tax-calculator",
  estado: "publicado",
  requiere: {
    "ca.gst-hst": "numero-por-region",
    "ca.pst": "numero-por-region",
  },
  campos: [
    { id: "region", tipo: "region", etiqueta: "Province or territory", porDefecto: "on" },
    {
      id: "operacion",
      tipo: "opcion",
      etiqueta: "What you want to do",
      opciones: [
        { valor: "agregar", etiqueta: "Add tax to a price" },
        { valor: "quitar", etiqueta: "Take tax out of a total" },
      ],
      porDefecto: "agregar",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter an amount above zero.", "monto");
    const federal = porRegion(v["ca.gst-hst"], entrada.region);
    const provincial = porRegion(v["ca.pst"], entrada.region);
    const tasaTotal = federal + provincial;
    const antes = entrada.operacion === "quitar" ? redondear(entrada.monto / (1 + tasaTotal / 100)) : redondear(entrada.monto);
    const impuestoFederal = redondear(porcentaje(antes, federal));
    const impuestoProvincial = redondear(porcentaje(antes, provincial));
    const total = entrada.operacion === "quitar" ? redondear(entrada.monto) : redondear(antes + impuestoFederal + impuestoProvincial);
    const hst = federal > 5;
    const nombreFederal = hst ? "HST" : "GST";
    const nombreProvincial = NOMBRE_PST[entrada.region] ?? "PST";
    return {
      total,
      antes,
      impuestoFederal,
      impuestoProvincial,
      impuestos: redondear(total - antes),
      tasaTotal,
      tipo: provincial > 0 ? `GST ${federal}% + ${nombreProvincial} ${provincial}%` : `${nombreFederal} ${federal}%`,
      observaciones: hst ? ["HST combines the federal GST and the provincial part in a single tax."] : [],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total with tax", formato: "moneda", destacada: true },
    { clave: "antes", etiqueta: "Price before tax", formato: "moneda" },
    { clave: "impuestoFederal", etiqueta: "GST or HST", formato: "moneda" },
    { clave: "impuestoProvincial", etiqueta: "Provincial sales tax", formato: "moneda", ocultarSiCero: true },
    { clave: "impuestos", etiqueta: "Total sales tax", formato: "moneda" },
    { clave: "tasaTotal", etiqueta: "Combined rate", formato: "porcentaje", decimales: 3 },
    { clave: "tipo", etiqueta: "Taxes that apply", formato: "texto" },
  ],
});
