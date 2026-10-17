import { definirCalculadora } from "@/motor/calculo";
import { CAMPOS_FAMILIA, cotizacionTrabajador, datosIrpf, OPCIONES_CONTRATO, REQUIERE_COTIZACION, REQUIERE_IRPF, retencionIrpf } from "../lib/nomina";

export default definirCalculadora({
  id: "es.retencion-irpf",
  mercado: "es",
  concepto: "impuesto-renta",
  slug: "retencion-irpf",
  estado: "publicado",
  requiere: { ...REQUIERE_COTIZACION, ...REQUIERE_IRPF },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Sueldo bruto anual", min: 0, porDefecto: 30000, ayuda: "Con las pagas extra, los pluses fijos y la retribución en especie." },
    {
      id: "cotizaciones",
      tipo: "moneda",
      etiqueta: "Seguridad Social que pagas al año",
      min: 0,
      requerido: false,
      ayuda: "Si lo dejas vacío, lo calculamos con los tipos de 2026 a partir de tu sueldo.",
    },
    { id: "contrato", tipo: "opcion", etiqueta: "Tipo de contrato", opciones: OPCIONES_CONTRATO, porDefecto: "indefinido" },
    ...CAMPOS_FAMILIA,
  ],
  calcular(entrada, valores, { redondear }) {
    const cotizaciones =
      entrada.cotizaciones ??
      redondear(
        cotizacionTrabajador(entrada.bruto / 12, entrada.contrato, valores["es.cotizacion-trabajador"], valores["es.base-maxima-cotizacion"], valores["es.solidaridad-trabajador"], redondear).total * 12,
      );
    const r = retencionIrpf(
      {
        retribucion: entrada.bruto,
        cotizaciones,
        situacion: entrada.situacion,
        hijos: entrada.hijos,
        hijosMenores3: entrada.hijosMenores3,
        hijosPorEntero: entrada.hijosPorEntero,
        edad: entrada.edad,
        contrato: entrada.contrato,
      },
      datosIrpf(valores),
      redondear,
    );
    const observaciones: string[] = [];
    if (r.exento) observaciones.push("Tu sueldo no llega al mínimo a partir del cual hay que retener: tu tipo es del 0 %.");
    if (entrada.contrato === "temporal-corto" && !r.exento) observaciones.push("En contratos de menos de un año el tipo no puede bajar del mínimo legal.");
    observaciones.push("Si vives en el País Vasco o en Navarra, se aplican las tablas forales y el resultado puede cambiar.");
    return {
      tipo: r.tipo,
      importeAnual: r.importe,
      mensual12: redondear(r.importe / 12),
      mensual14: redondear(r.importe / 14),
      cotizaciones: redondear(cotizaciones),
      reduccionTrabajo: r.reduccionTrabajo,
      base: r.base,
      minimo: r.minimoPersonalFamiliar,
      cuota: r.cuota,
      observaciones,
    };
  },
  resultado: [
    { clave: "tipo", etiqueta: "Tipo de retención", formato: "porcentaje", decimales: 2, destacada: true },
    { clave: "importeAnual", etiqueta: "Retención al año", formato: "moneda" },
    { clave: "mensual12", etiqueta: "Retención al mes en 12 pagas", formato: "moneda" },
    { clave: "mensual14", etiqueta: "Retención por paga en 14 pagas", formato: "moneda" },
    { clave: "cotizaciones", etiqueta: "Seguridad Social del año", formato: "moneda" },
    { clave: "reduccionTrabajo", etiqueta: "Reducción por rendimientos del trabajo", formato: "moneda", ocultarSiCero: true },
    { clave: "base", etiqueta: "Base para calcular el tipo", formato: "moneda" },
    { clave: "minimo", etiqueta: "Mínimo personal y familiar", formato: "moneda" },
    { clave: "cuota", etiqueta: "Cuota de retención", formato: "moneda" },
  ],
});
