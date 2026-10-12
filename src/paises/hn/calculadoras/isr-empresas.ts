import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "hn.isr-empresas",
  mercado: "hn",
  concepto: "propio",
  slug: "isr-empresas",
  estado: "publicado",
  requiere: {
    "hn.isr-personas-juridicas": "numero",
    "hn.aportacion-solidaria-tasa": "numero",
    "hn.aportacion-solidaria-exento": "numero",
  },
  campos: [
    {
      id: "renta",
      tipo: "moneda",
      etiqueta: "Renta neta gravable del año",
      ayuda: "Ingresos gravados menos costos y gastos deducibles.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const isr = redondear(porcentaje(entrada.renta, valores["hn.isr-personas-juridicas"]));
    const excedente = Math.max(0, entrada.renta - valores["hn.aportacion-solidaria-exento"]);
    const aportacion = redondear(porcentaje(excedente, valores["hn.aportacion-solidaria-tasa"]));
    const total = redondear(isr + aportacion);
    return {
      isr,
      excedente: redondear(excedente),
      aportacion,
      total,
      tasaEfectiva: entrada.renta > 0 ? redondear((total / entrada.renta) * 100) : 0,
      observaciones: [
        "Si los ingresos brutos del año anterior pasaron de L1,000 millones, el ISR no puede ser menor que el 1 % de los ingresos brutos (artículo 22-A).",
        "El impuesto al activo neto se compara con este resultado y se paga el mayor. Esta calculadora no lo incluye.",
      ],
    };
  },
  resultado: [
    { clave: "isr", etiqueta: "ISR", formato: "moneda" },
    { clave: "excedente", etiqueta: "Renta que paga aportación solidaria", formato: "moneda" },
    { clave: "aportacion", etiqueta: "Aportación solidaria", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total a pagar", formato: "moneda", destacada: true },
    { clave: "tasaEfectiva", etiqueta: "Tasa efectiva", formato: "porcentaje" },
  ],
});
