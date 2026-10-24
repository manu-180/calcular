import { aplicarEscalaMarginal, definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ae.dewa-bill-calculator",
  mercado: "ae",
  concepto: "propio",
  slug: "dewa-bill-calculator",
  estado: "publicado",
  requiere: {
    "ae.dewa-electricity-residential": "escala",
    "ae.dewa-electricity-industrial": "escala",
    "ae.dewa-water-residential": "escala",
    "ae.dewa-water-commercial": "escala",
    "ae.dewa-meter-charge": "mapa",
    "ae.dewa-fuel-surcharge": "mapa",
    "ae.vat": "numero",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Account type",
      opciones: [
        { valor: "residential", etiqueta: "Residential" },
        { valor: "commercial", etiqueta: "Commercial" },
        { valor: "industrial", etiqueta: "Industrial" },
      ],
      porDefecto: "residential",
    },
    { id: "kwh", tipo: "numero", etiqueta: "Electricity used in the month (kWh)", min: 0, max: 1000000, porDefecto: 2500 },
    { id: "agua", tipo: "numero", etiqueta: "Water used in the month (cubic metres)", min: 0, max: 100000, porDefecto: 30 },
    {
      id: "medidorLuz",
      tipo: "opcion",
      etiqueta: "Electricity meter type",
      opciones: [
        { valor: "electricity-1", etiqueta: "Type 1" },
        { valor: "electricity-2", etiqueta: "Type 2" },
        { valor: "electricity-3", etiqueta: "Type 3" },
      ],
      porDefecto: "electricity-1",
    },
    {
      id: "medidorAgua",
      tipo: "opcion",
      etiqueta: "Water meter type",
      opciones: [
        { valor: "water-1", etiqueta: "Type 1" },
        { valor: "water-2", etiqueta: "Type 2" },
      ],
      porDefecto: "water-1",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.kwh + entrada.agua <= 0) throw new ErrorEntrada("Enter the electricity or water you used.", "kwh");
    const escalaLuz = entrada.tipo === "industrial" ? v["ae.dewa-electricity-industrial"] : v["ae.dewa-electricity-residential"];
    const escalaAgua = entrada.tipo === "residential" ? v["ae.dewa-water-residential"] : v["ae.dewa-water-commercial"];
    const recargo = v["ae.dewa-fuel-surcharge"];
    const medidores = v["ae.dewa-meter-charge"];
    const luz = aplicarEscalaMarginal(escalaLuz, entrada.kwh);
    const agua = aplicarEscalaMarginal(escalaAgua, entrada.agua);
    const combustible = (entrada.kwh * enMapa(recargo, "electricity") + entrada.agua * enMapa(recargo, "water")) / 100;
    const cargos = enMapa(medidores, entrada.medidorLuz) + enMapa(medidores, entrada.medidorAgua);
    const subtotal = luz + agua + combustible + cargos;
    const iva = porcentaje(subtotal, v["ae.vat"]);
    return {
      total: redondear(subtotal + iva),
      luz: redondear(luz),
      agua: redondear(agua),
      combustible: redondear(combustible),
      cargos: redondear(cargos),
      iva: redondear(iva),
      observaciones: [
        "Each slab's rate is applied to the consumption inside that slab. Your bill may include other charges not counted here.",
      ],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Estimated DEWA bill", formato: "moneda", destacada: true },
    { clave: "luz", etiqueta: "Electricity", formato: "moneda" },
    { clave: "agua", etiqueta: "Water", formato: "moneda" },
    { clave: "combustible", etiqueta: "Fuel surcharge", formato: "moneda" },
    { clave: "cargos", etiqueta: "Meter service charges", formato: "moneda" },
    { clave: "iva", etiqueta: "VAT", formato: "moneda" },
  ],
});
