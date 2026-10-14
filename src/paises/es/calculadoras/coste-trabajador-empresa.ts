import { definirCalculadora } from "@/motor/calculo";
import { cotizacionEmpresa, OPCIONES_CONTRATO } from "../lib/nomina";

export default definirCalculadora({
  id: "es.coste-trabajador",
  mercado: "es",
  concepto: "costo-empleador",
  slug: "coste-trabajador-empresa",
  estado: "publicado",
  requiere: {
    "es.cotizacion-empresa": "mapa",
    "es.base-maxima-cotizacion": "numero",
    "es.solidaridad-empresa": "escala",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Sueldo bruto anual del trabajador", min: 0, porDefecto: 25000 },
    { id: "contrato", tipo: "opcion", etiqueta: "Tipo de contrato", opciones: OPCIONES_CONTRATO, porDefecto: "indefinido" },
    {
      id: "accidentes",
      tipo: "porcentaje",
      etiqueta: "Tipo de accidentes de trabajo",
      min: 0,
      max: 10,
      porDefecto: 1.5,
      ayuda: "Depende de la actividad de la empresa según la tarifa de primas (código CNAE).",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const e = cotizacionEmpresa(
      entrada.bruto / 12,
      entrada.contrato,
      valores["es.cotizacion-empresa"],
      entrada.accidentes,
      valores["es.base-maxima-cotizacion"],
      valores["es.solidaridad-empresa"],
      redondear,
    );
    const cotizacionAnual = redondear(e.total * 12);
    const costeAnual = redondear(entrada.bruto + cotizacionAnual);
    return {
      costeAnual,
      costeMensual: redondear(costeAnual / 12),
      cotizacionMensual: e.total,
      cotizacionAnual,
      porcentajeSobreBruto: entrada.bruto > 0 ? redondear((cotizacionAnual / entrada.bruto) * 100) : 0,
      observaciones: ["No incluye bonificaciones, pluses de convenio, prevención de riesgos ni otros gastos de la empresa."],
    };
  },
  resultado: [
    { clave: "costeAnual", etiqueta: "Coste total al año", formato: "moneda", destacada: true },
    { clave: "costeMensual", etiqueta: "Coste medio al mes", formato: "moneda" },
    { clave: "cotizacionMensual", etiqueta: "Seguridad Social de la empresa al mes", formato: "moneda" },
    { clave: "cotizacionAnual", etiqueta: "Seguridad Social de la empresa al año", formato: "moneda" },
    { clave: "porcentajeSobreBruto", etiqueta: "Sobrecoste sobre el sueldo bruto", formato: "porcentaje" },
  ],
});
