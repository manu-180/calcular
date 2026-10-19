import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tz.stamp-duty-calculator",
  mercado: "tz",
  concepto: "propio",
  slug: "stamp-duty-calculator",
  estado: "publicado",
  requiere: {
    "tz.stamp-lease-rate": "numero",
    "tz.stamp-share-transfer-rate": "numero",
    "tz.stamp-agreement": "numero",
    "tz.stamp-memorandum": "numero",
  },
  campos: [
    {
      id: "documento",
      tipo: "opcion",
      etiqueta: "Document",
      opciones: [
        { valor: "lease", etiqueta: "Lease (on the annual rent)" },
        { valor: "shares", etiqueta: "Transfer of shares" },
        { valor: "agreement", etiqueta: "Agreement, affidavit or power of attorney" },
        { valor: "memorandum", etiqueta: "Memorandum of association of a company" },
      ],
      porDefecto: "lease",
    },
    { id: "valor", tipo: "moneda", etiqueta: "Annual rent or value of the shares", min: 0, porDefecto: 12000000, visibleSi: { documento: ["lease", "shares"] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.documento === "agreement") return { impuesto: v["tz.stamp-agreement"] };
    if (e.documento === "memorandum") return { impuesto: v["tz.stamp-memorandum"] };
    if (e.valor === null || e.valor <= 0) throw new ErrorEntrada("Enter the annual rent or the value of the shares.", "valor");
    const tasa = e.documento === "lease" ? v["tz.stamp-lease-rate"] : v["tz.stamp-share-transfer-rate"];
    return { impuesto: redondear(porcentaje(e.valor, tasa)) };
  },
  resultado: [{ clave: "impuesto", etiqueta: "Stamp duty", formato: "moneda", destacada: true }],
});
