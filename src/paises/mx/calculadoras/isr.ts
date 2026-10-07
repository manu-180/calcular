import { definirCalculadora, ErrorEntrada, porRegion } from "@/motor/calculo";
import { DIAS_PERIODO, OPCIONES_PERIODO_NOMINA, retencionIsr, salarioDiario } from "../nomina";

export default definirCalculadora({
  id: "mx.isr",
  mercado: "mx",
  concepto: "impuesto-renta",
  slug: "isr",
  estado: "publicado",
  requiere: {
    "mx.tarifa-isr-semanal": "escala",
    "mx.tarifa-isr-decenal": "escala",
    "mx.tarifa-isr-quincenal": "escala",
    "mx.tarifa-isr-mensual": "escala",
    "mx.uma-mensual": "numero",
    "mx.subsidio-empleo": "numero",
    "mx.subsidio-empleo-limite": "numero",
    "mx.salario-minimo": "numero-por-region",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo bruto del periodo", min: 0, ayuda: "Todo lo que paga ISR en ese periodo, antes de descuentos." },
    { id: "periodo", tipo: "opcion", etiqueta: "Periodo de pago", opciones: OPCIONES_PERIODO_NOMINA, porDefecto: "quincenal" },
    { id: "region", tipo: "region", etiqueta: "Dónde trabajas", porDefecto: "general" },
  ],
  calcular(entrada, valores, { redondear }) {
    const periodo = entrada.periodo;
    if (!(periodo in DIAS_PERIODO)) throw new ErrorEntrada({ codigo: "opcion-invalida" });
    const dias = DIAS_PERIODO[periodo];
    const tarifa = valores[`mx.tarifa-isr-${periodo}`];
    const diario = salarioDiario(entrada.sueldo, periodo);
    const ganaMinimo = redondear(diario) <= porRegion(valores["mx.salario-minimo"], entrada.region);

    let fila = tarifa[0];
    for (const f of tarifa) if (entrada.sueldo >= f.desde) fila = f;
    const excedente = redondear(Math.max(0, entrada.sueldo - fila.desde));
    const marginal = redondear((excedente * fila.tasa) / 100);

    const subsidioMensual = (valores["mx.uma-mensual"] * valores["mx.subsidio-empleo"]) / 100;
    const subsidioPeriodo = periodo === "mensual" ? subsidioMensual : (subsidioMensual / DIAS_PERIODO.mensual) * dias;
    const ingresoMensual = periodo === "mensual" ? entrada.sueldo : (entrada.sueldo / dias) * DIAS_PERIODO.mensual;
    const r = ganaMinimo
      ? { isr: 0, subsidio: 0, retener: 0 }
      : retencionIsr(entrada.sueldo, tarifa, subsidioPeriodo, ingresoMensual, valores["mx.subsidio-empleo-limite"], redondear);
    return {
      limiteInferior: entrada.sueldo > 0 ? fila.desde : 0,
      tasa: fila.tasa,
      marginal: ganaMinimo ? 0 : marginal,
      cuotaFija: ganaMinimo ? 0 : (fila.cuotaFija ?? 0),
      isr: r.isr,
      subsidio: r.subsidio,
      retener: r.retener,
      tasaEfectiva: entrada.sueldo > 0 ? redondear((r.retener / entrada.sueldo) * 100) : 0,
      observaciones: ganaMinimo ? ["Ganas el salario mínimo: la ley dice que no se te retiene ISR."] : [],
    };
  },
  resultado: [
    { clave: "limiteInferior", etiqueta: "Límite inferior de tu renglón de la tarifa", formato: "moneda" },
    { clave: "tasa", etiqueta: "Porcentaje sobre el excedente", formato: "porcentaje" },
    { clave: "marginal", etiqueta: "Impuesto sobre el excedente", formato: "moneda" },
    { clave: "cuotaFija", etiqueta: "Cuota fija", formato: "moneda" },
    { clave: "isr", etiqueta: "ISR según la tarifa", formato: "moneda" },
    { clave: "subsidio", etiqueta: "Subsidio para el empleo", formato: "moneda", ocultarSiCero: true },
    { clave: "retener", etiqueta: "ISR que te retienen", formato: "moneda", destacada: true },
    { clave: "tasaEfectiva", etiqueta: "Porcentaje real de tu sueldo que se va en ISR", formato: "porcentaje" },
  ],
});
