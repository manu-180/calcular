import { definirCalculadora } from "@/motor/calculo";
import { cotizacionEmpresa, cotizacionTrabajador, OPCIONES_CONTRATO } from "../lib/nomina";

export default definirCalculadora({
  id: "es.cotizacion-seguridad-social",
  mercado: "es",
  concepto: "aportes-seguridad-social",
  slug: "cotizacion-seguridad-social",
  estado: "publicado",
  requiere: {
    "es.cotizacion-trabajador": "mapa",
    "es.cotizacion-empresa": "mapa",
    "es.base-maxima-cotizacion": "numero",
    "es.solidaridad-trabajador": "escala",
    "es.solidaridad-empresa": "escala",
  },
  campos: [
    {
      id: "mensual",
      tipo: "moneda",
      etiqueta: "Sueldo bruto mensual con pagas extra prorrateadas",
      min: 0,
      porDefecto: 2000,
      ayuda: "Si cobras 14 pagas, divide tu bruto anual entre 12.",
    },
    { id: "contrato", tipo: "opcion", etiqueta: "Tipo de contrato", opciones: OPCIONES_CONTRATO, porDefecto: "indefinido" },
    {
      id: "accidentes",
      tipo: "porcentaje",
      etiqueta: "Tipo de accidentes de trabajo de la empresa",
      min: 0,
      max: 10,
      porDefecto: 1.5,
      ayuda: "Depende de la actividad de la empresa (tarifa de primas por CNAE). Solo cambia la parte de la empresa.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const max = valores["es.base-maxima-cotizacion"];
    const t = cotizacionTrabajador(entrada.mensual, entrada.contrato, valores["es.cotizacion-trabajador"], max, valores["es.solidaridad-trabajador"], redondear);
    const e = cotizacionEmpresa(entrada.mensual, entrada.contrato, valores["es.cotizacion-empresa"], entrada.accidentes, max, valores["es.solidaridad-empresa"], redondear);
    return {
      base: t.base,
      trabajadorCC: t.contingenciasComunes,
      trabajadorDesempleo: t.desempleo,
      trabajadorFormacion: t.formacion,
      trabajadorMei: t.mei,
      trabajadorSolidaridad: t.solidaridad,
      trabajadorTotal: t.total,
      empresaCC: e.contingenciasComunes,
      empresaDesempleo: e.desempleo,
      empresaFogasa: e.fogasa,
      empresaFormacion: e.formacion,
      empresaMei: e.mei,
      empresaAccidentes: e.accidentes,
      empresaSolidaridad: e.solidaridad,
      empresaTotal: e.total,
      total: redondear(t.total + e.total),
    };
  },
  resultado: [
    { clave: "trabajadorTotal", etiqueta: "Lo que te descuentan a ti", formato: "moneda", destacada: true },
    { clave: "empresaTotal", etiqueta: "Lo que paga la empresa", formato: "moneda" },
    { clave: "total", etiqueta: "Cotización total al mes", formato: "moneda" },
    { clave: "base", etiqueta: "Base de cotización", formato: "moneda" },
    { clave: "trabajadorCC", etiqueta: "Tú: contingencias comunes", formato: "moneda" },
    { clave: "trabajadorDesempleo", etiqueta: "Tú: desempleo", formato: "moneda" },
    { clave: "trabajadorFormacion", etiqueta: "Tú: formación profesional", formato: "moneda" },
    { clave: "trabajadorMei", etiqueta: "Tú: MEI", formato: "moneda" },
    { clave: "trabajadorSolidaridad", etiqueta: "Tú: cotización de solidaridad", formato: "moneda", ocultarSiCero: true },
    { clave: "empresaCC", etiqueta: "Empresa: contingencias comunes", formato: "moneda" },
    { clave: "empresaDesempleo", etiqueta: "Empresa: desempleo", formato: "moneda" },
    { clave: "empresaFogasa", etiqueta: "Empresa: FOGASA", formato: "moneda" },
    { clave: "empresaFormacion", etiqueta: "Empresa: formación profesional", formato: "moneda" },
    { clave: "empresaMei", etiqueta: "Empresa: MEI", formato: "moneda" },
    { clave: "empresaAccidentes", etiqueta: "Empresa: accidentes de trabajo", formato: "moneda" },
    { clave: "empresaSolidaridad", etiqueta: "Empresa: cotización de solidaridad", formato: "moneda", ocultarSiCero: true },
  ],
});
