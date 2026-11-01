import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bn.capital-allowance-calculator",
  mercado: "bn",
  concepto: "propio",
  slug: "capital-allowance-calculator",
  estado: "publicado",
  requiere: {
    "bn.capital-industrial-initial": "numero",
    "bn.capital-industrial-annual": "numero",
    "bn.capital-plant-initial": "numero",
    "bn.capital-plant-annual-low": "numero",
    "bn.capital-plant-annual-high": "numero",
    "bn.capital-plant-accelerated": "numero",
  },
  campos: [
    { id: "costo", tipo: "moneda", etiqueta: "Qualifying capital expenditure", min: 0, porDefecto: 200000 },
    {
      id: "activo",
      tipo: "opcion",
      etiqueta: "Asset",
      porDefecto: "plant",
      opciones: [
        { valor: "industrial", etiqueta: "Industrial building or structure (straight line)" },
        { valor: "plant", etiqueta: "Plant and machinery (reducing value)" },
      ],
    },
    { id: "tasaPlanta", tipo: "porcentaje", etiqueta: "Annual allowance rate set for the plant (3% to 25%)", min: 0, max: 100, porDefecto: 10, visibleSi: { activo: ["plant"] } },
    { id: "anios", tipo: "entero", etiqueta: "Years of annual allowance already claimed", min: 0, max: 60, porDefecto: 2 },
  ],
  calcular(e, v, { redondear }) {
    if (e.costo <= 0) throw new ErrorEntrada("Enter the qualifying expenditure.", "costo");
    const industrial = e.activo === "industrial";
    let tasa = v["bn.capital-industrial-annual"];
    if (!industrial) {
      tasa = e.tasaPlanta ?? 0;
      if (tasa < v["bn.capital-plant-annual-low"] || tasa > v["bn.capital-plant-annual-high"]) {
        throw new ErrorEntrada("The Collector of Income Tax sets plant rates from 3% to 25%. Enter a rate in that range.", "tasaPlanta");
      }
    }
    const inicial = redondear(porcentaje(e.costo, industrial ? v["bn.capital-industrial-initial"] : v["bn.capital-plant-initial"]));
    let reclamado = 0;
    let anual = 0;
    if (industrial) {
      anual = redondear(porcentaje(e.costo, tasa));
      reclamado = Math.min(anual * e.anios, e.costo - inicial);
    } else {
      const base = e.costo - inicial;
      reclamado = base * (1 - Math.pow(1 - tasa / 100, e.anios));
      anual = porcentaje(base - reclamado, tasa);
    }
    reclamado = redondear(reclamado);
    return {
      inicial,
      reclamado,
      residual: redondear(e.costo - inicial - reclamado),
      anualProximo: redondear(Math.min(anual, e.costo - inicial - reclamado)),
    };
  },
  resultado: [
    { clave: "inicial", etiqueta: "Initial allowance", formato: "moneda", destacada: true },
    { clave: "reclamado", etiqueta: "Annual allowances claimed so far", formato: "moneda" },
    { clave: "residual", etiqueta: "Tax written-down value", formato: "moneda" },
    { clave: "anualProximo", etiqueta: "Annual allowance for the next year", formato: "moneda" },
  ],
});
