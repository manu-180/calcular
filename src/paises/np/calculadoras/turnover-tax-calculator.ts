import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "np.turnover-tax-calculator",
  mercado: "np",
  concepto: "regimen-simplificado",
  slug: "turnover-tax-calculator",
  estado: "publicado",
  requiere: {
    "np.turnover-fixed-tax": "mapa",
    "np.turnover-rate-3-5m": "mapa",
    "np.turnover-rate-5-10m": "mapa",
    "np.turnover-limit-low": "numero",
    "np.turnover-limit-mid": "numero",
    "np.turnover-limit-high": "numero",
  },
  campos: [
    { id: "ventas", tipo: "moneda", etiqueta: "Turnover for the year", min: 0, porDefecto: 4000000 },
    { id: "zona", tipo: "opcion-dato", etiqueta: "Where the business operates", dato: "np.turnover-fixed-tax", porDefecto: "metro" },
    { id: "actividad", tipo: "opcion-dato", etiqueta: "Type of business", dato: "np.turnover-rate-3-5m", porDefecto: "goods" },
  ],
  calcular(e, v, { redondear }) {
    const bajo = v["np.turnover-limit-low"];
    const medio = v["np.turnover-limit-mid"];
    const alto = v["np.turnover-limit-high"];
    if (e.ventas <= 0) throw new ErrorEntrada("Enter your turnover for the year.", "ventas");
    if (e.ventas > alto) throw new ErrorEntrada("Turnover above NPR 1 crore is outside the turnover tax.", "ventas");
    const fijo = enMapa(v["np.turnover-fixed-tax"], e.zona);
    const tramo1 = e.ventas > bajo ? redondear(porcentaje(Math.min(e.ventas, medio) - bajo, enMapa(v["np.turnover-rate-3-5m"], e.actividad))) : 0;
    const tramo2 = e.ventas > medio ? redondear(porcentaje(e.ventas - medio, enMapa(v["np.turnover-rate-5-10m"], e.actividad))) : 0;
    const total = redondear(fijo + tramo1 + tramo2);
    return {
      total,
      fijo,
      tramo1,
      tramo2,
      efectiva: (total / e.ventas) * 100,
      observaciones: ["The turnover tax is for resident individuals whose business income is NPR 10 lakh or less and who earn nothing from professional or expert services."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Turnover tax for the year", formato: "moneda", destacada: true },
    { clave: "fijo", etiqueta: "Fixed amount for turnover up to NPR 30 lakh", formato: "moneda" },
    { clave: "tramo1", etiqueta: "On turnover from NPR 30 lakh to 50 lakh", formato: "moneda", ocultarSiCero: true },
    { clave: "tramo2", etiqueta: "On turnover from NPR 50 lakh to 1 crore", formato: "moneda", ocultarSiCero: true },
    { clave: "efectiva", etiqueta: "Tax as a share of turnover", formato: "porcentaje", decimales: 2 },
  ],
});
