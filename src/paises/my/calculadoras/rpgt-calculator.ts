import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "my.rpgt-calculator",
  mercado: "my",
  concepto: "propio",
  slug: "rpgt-calculator",
  estado: "publicado",
  requiere: {
    "my.rpgt-citizen": "mapa",
    "my.rpgt-company": "mapa",
    "my.rpgt-foreigner": "mapa",
    "my.rpgt-exemption-amount": "numero",
    "my.rpgt-exemption-rate": "numero",
  },
  campos: [
    {
      id: "vendedor",
      tipo: "opcion",
      etiqueta: "Who is selling",
      opciones: [
        { valor: "citizen", etiqueta: "Malaysian citizen or permanent resident" },
        { valor: "company", etiqueta: "Company incorporated in Malaysia or trustee" },
        { valor: "foreigner", etiqueta: "Non-citizen individual" },
        { valor: "foreign-company", etiqueta: "Company not incorporated in Malaysia" },
      ],
      porDefecto: "citizen",
    },
    { id: "venta", tipo: "moneda", etiqueta: "Disposal price", min: 0, porDefecto: 600000 },
    { id: "gastosVenta", tipo: "moneda", etiqueta: "Costs of selling (agent and legal fees)", min: 0, porDefecto: 12000 },
    { id: "compra", tipo: "moneda", etiqueta: "Acquisition price", min: 0, porDefecto: 450000 },
    { id: "gastosCompra", tipo: "moneda", etiqueta: "Costs of buying and improvements (stamp duty, legal fees, renovations)", min: 0, porDefecto: 15000 },
    { id: "anios", tipo: "entero", etiqueta: "Years you held the property", min: 0, max: 100, porDefecto: 4, ayuda: "Count from the acquisition date to the disposal date. 3 means the sale is in the 4th year." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.venta <= 0) throw new ErrorEntrada("Enter the disposal price.", "venta");
    if (entrada.anios < 0) throw new ErrorEntrada("Years held cannot be negative.", "anios");
    const clave = entrada.anios < 3 ? "y1-3" : entrada.anios < 4 ? "y4" : entrada.anios < 5 ? "y5" : "y6";
    const mapa = entrada.vendedor === "citizen" ? v["my.rpgt-citizen"] : entrada.vendedor === "company" ? v["my.rpgt-company"] : v["my.rpgt-foreigner"];
    const tasa = enMapa(mapa, clave);
    const ganancia = entrada.venta - entrada.gastosVenta - (entrada.compra + entrada.gastosCompra);
    const individuo = entrada.vendedor === "citizen" || entrada.vendedor === "foreigner";
    const exencion = !individuo || ganancia <= 0 ? 0 : Math.min(ganancia, Math.max(v["my.rpgt-exemption-amount"], (ganancia * v["my.rpgt-exemption-rate"]) / 100));
    const gravable = Math.max(0, ganancia - exencion);
    const impuesto = redondear((gravable * tasa) / 100);
    return {
      impuesto,
      ganancia: redondear(ganancia),
      exencion: redondear(exencion),
      gravable: redondear(gravable),
      tasa,
      neto: redondear(entrada.venta - entrada.gastosVenta - impuesto),
      observaciones:
        entrada.vendedor === "citizen"
          ? ["A Malaysian citizen or permanent resident can claim a once-in-a-lifetime exemption on the disposal of one private residence. If you claim it, the RPGT on that home is zero."]
          : ([] as string[]),
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "RPGT payable", formato: "moneda", destacada: true },
    { clave: "ganancia", etiqueta: "Chargeable gain", formato: "moneda" },
    { clave: "exencion", etiqueta: "Exemption", formato: "moneda", ocultarSiCero: true },
    { clave: "gravable", etiqueta: "Gain after exemption", formato: "moneda" },
    { clave: "tasa", etiqueta: "RPGT rate", formato: "porcentaje", decimales: 0 },
    { clave: "neto", etiqueta: "Net proceeds after RPGT and selling costs", formato: "moneda" },
  ],
});
