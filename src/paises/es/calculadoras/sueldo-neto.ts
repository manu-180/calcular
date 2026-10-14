import { definirCalculadora } from "@/motor/calculo";
import { CAMPOS_FAMILIA, cotizacionTrabajador, datosIrpf, OPCIONES_CONTRATO, OPCIONES_PAGAS, REQUIERE_COTIZACION, REQUIERE_IRPF, retencionIrpf } from "../lib/nomina";

export default definirCalculadora({
  id: "es.sueldo-neto",
  mercado: "es",
  concepto: "sueldo-neto",
  slug: "sueldo-neto",
  estado: "publicado",
  requiere: { ...REQUIERE_COTIZACION, ...REQUIERE_IRPF },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Sueldo bruto anual", min: 0, porDefecto: 25000, ayuda: "Todo lo que cobras en el año antes de impuestos, con las pagas extra incluidas." },
    { id: "pagas", tipo: "opcion", etiqueta: "Número de pagas", opciones: OPCIONES_PAGAS, porDefecto: "14" },
    { id: "contrato", tipo: "opcion", etiqueta: "Tipo de contrato", opciones: OPCIONES_CONTRATO, porDefecto: "indefinido" },
    ...CAMPOS_FAMILIA,
  ],
  calcular(entrada, valores, { redondear }) {
    const anual = entrada.bruto;
    const pagas = entrada.pagas === "12" ? 12 : 14;
    const cot = cotizacionTrabajador(anual / 12, entrada.contrato, valores["es.cotizacion-trabajador"], valores["es.base-maxima-cotizacion"], valores["es.solidaridad-trabajador"], redondear);
    const cotizacionAnual = redondear(cot.total * 12);
    const ret = retencionIrpf(
      {
        retribucion: anual,
        cotizaciones: cotizacionAnual,
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
    const brutoPaga = redondear(anual / pagas);
    const irpfPaga = redondear((brutoPaga * ret.tipo) / 100);
    const netoMensual = redondear(brutoPaga - cot.total - irpfPaga);
    const netoPagaExtra = pagas === 14 ? redondear(brutoPaga - irpfPaga) : null;
    const netoAnual = redondear(anual - cotizacionAnual - ret.importe);
    const observaciones: string[] = [];
    if (ret.exento) observaciones.push("Con este sueldo y tu situación familiar no se te practica retención de IRPF.");
    if (anual / 12 > valores["es.base-maxima-cotizacion"]) observaciones.push("Tu sueldo supera la base máxima: cotizas por la base máxima y, por lo que la pasa, la cotización de solidaridad.");
    observaciones.push("En el País Vasco y Navarra la retención sigue sus propias normas forales y puede ser distinta.");
    return {
      brutoPaga,
      cotizacion: cot.total,
      irpfPaga,
      netoMensual,
      netoPagaExtra,
      netoAnual,
      tipoIrpf: ret.tipo,
      cotizacionAnual,
      irpfAnual: ret.importe,
      observaciones,
    };
  },
  resultado: [
    { clave: "netoMensual", etiqueta: "Sueldo neto al mes", formato: "moneda", destacada: true },
    { clave: "netoPagaExtra", etiqueta: "Neto de cada paga extra", formato: "moneda" },
    { clave: "netoAnual", etiqueta: "Sueldo neto al año", formato: "moneda" },
    { clave: "brutoPaga", etiqueta: "Bruto de cada paga", formato: "moneda" },
    { clave: "cotizacion", etiqueta: "Seguridad Social al mes", formato: "moneda" },
    { clave: "irpfPaga", etiqueta: "Retención de IRPF de cada paga", formato: "moneda" },
    { clave: "tipoIrpf", etiqueta: "Tipo de retención de IRPF", formato: "porcentaje", decimales: 2 },
    { clave: "cotizacionAnual", etiqueta: "Seguridad Social al año", formato: "moneda" },
    { clave: "irpfAnual", etiqueta: "IRPF retenido al año", formato: "moneda" },
  ],
});
