import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ca.land-transfer-tax",
  mercado: "ca",
  concepto: "propio",
  slug: "land-transfer-tax",
  estado: "publicado",
  requiere: {
    "ca.on-land-transfer-tax": "escala",
    "ca.on-ltt-first-time-refund": "numero",
    "ca.toronto-mltt": "escala",
    "ca.toronto-mltt-first-time-rebate": "numero",
    "ca.bc-property-transfer-tax": "escala",
    "ca.bc-ptt-surcharge-threshold": "numero",
    "ca.bc-ptt-surcharge-rate": "numero",
  },
  campos: [
    {
      id: "lugar",
      tipo: "opcion",
      etiqueta: "Where the home is",
      opciones: [
        { valor: "on", etiqueta: "Ontario, outside Toronto" },
        { valor: "toronto", etiqueta: "City of Toronto" },
        { valor: "bc", etiqueta: "British Columbia" },
      ],
      porDefecto: "on",
    },
    { id: "precio", tipo: "moneda", etiqueta: "Purchase price", min: 0, porDefecto: 700000 },
    { id: "primeraVez", tipo: "si-no", etiqueta: "You are a first-time home buyer (Ontario and Toronto refunds)", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.precio <= 0) throw new ErrorEntrada("Enter the purchase price.", "precio");
    const p = entrada.precio;
    let provincial = 0;
    let municipal = 0;
    let rebaja = 0;
    if (entrada.lugar === "bc") {
      provincial = aplicarEscalaMarginal(v["ca.bc-property-transfer-tax"], p) + porcentaje(Math.max(0, p - v["ca.bc-ptt-surcharge-threshold"]), v["ca.bc-ptt-surcharge-rate"]);
    } else {
      provincial = aplicarEscalaMarginal(v["ca.on-land-transfer-tax"], p);
      if (entrada.lugar === "toronto") municipal = aplicarEscalaMarginal(v["ca.toronto-mltt"], p);
      if (entrada.primeraVez) {
        rebaja = Math.min(provincial, v["ca.on-ltt-first-time-refund"]);
        if (entrada.lugar === "toronto") rebaja += Math.min(municipal, v["ca.toronto-mltt-first-time-rebate"]);
      }
    }
    provincial = redondear(provincial);
    municipal = redondear(municipal);
    rebaja = redondear(rebaja);
    const total = redondear(provincial + municipal - rebaja);
    return {
      total,
      provincial,
      municipal,
      rebaja,
      efectiva: (total / p) * 100,
      observaciones:
        entrada.lugar === "bc"
          ? ["BC rates shown are the general property transfer tax for a home. The first time home buyers' exemption is not included yet, and foreign buyers can owe an additional tax."]
          : ["Rates shown are for a home with one or two single family residences."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Land transfer tax to pay", formato: "moneda", destacada: true },
    { clave: "provincial", etiqueta: "Provincial tax before rebates", formato: "moneda" },
    { clave: "municipal", etiqueta: "Toronto municipal tax before rebates", formato: "moneda", ocultarSiCero: true },
    { clave: "rebaja", etiqueta: "First-time buyer refund or exemption", formato: "moneda", ocultarSiCero: true },
    { clave: "efectiva", etiqueta: "Tax as a share of the price", formato: "porcentaje", decimales: 2 },
  ],
});
