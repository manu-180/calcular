import { definirCalculadora, enMapa, ErrorEntrada, porcentaje, porRegion } from "@/motor/calculo";
import { DIAS_PERIODO, diasDeVacaciones, OPCIONES_PERIODO_NOMINA, retencionIsr, salarioDiario } from "../nomina";

export default definirCalculadora({
  id: "mx.sueldo-neto",
  mercado: "mx",
  concepto: "sueldo-neto",
  slug: "sueldo-neto",
  estado: "publicado",
  requiere: {
    "mx.tarifa-isr-semanal": "escala",
    "mx.tarifa-isr-decenal": "escala",
    "mx.tarifa-isr-quincenal": "escala",
    "mx.tarifa-isr-mensual": "escala",
    "mx.uma-diaria": "numero",
    "mx.uma-mensual": "numero",
    "mx.subsidio-empleo": "numero",
    "mx.subsidio-empleo-limite": "numero",
    "mx.salario-minimo": "numero-por-region",
    "mx.cuotas-imss-obrero": "mapa",
    "mx.tope-sbc-imss": "numero",
    "mx.umbral-excedente-imss": "numero",
    "mx.dias-aguinaldo": "numero",
    "mx.prima-vacacional": "numero",
    "mx.vacaciones-primer-anio": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo bruto del periodo", min: 0 },
    { id: "periodo", tipo: "opcion", etiqueta: "Cada cuánto te pagan", opciones: OPCIONES_PERIODO_NOMINA, porDefecto: "quincenal" },
    { id: "region", tipo: "region", etiqueta: "Dónde trabajas", porDefecto: "general" },
    { id: "antiguedad", tipo: "entero", etiqueta: "Años que llevas en la empresa", min: 0, max: 60, porDefecto: 1, ayuda: "Sirve para estimar tu salario base de cotización del IMSS." },
    { id: "sbc", tipo: "moneda", etiqueta: "Salario base de cotización diario", min: 0, requerido: false, ayuda: "Viene en tu recibo de nómina como SBC. Si lo dejas vacío, lo estimamos con las prestaciones mínimas de ley." },
  ],
  calcular(entrada, valores, { redondear }) {
    const periodo = entrada.periodo;
    if (!(periodo in DIAS_PERIODO)) throw new ErrorEntrada({ codigo: "opcion-invalida" });
    const dias = DIAS_PERIODO[periodo];
    const tarifa = valores[`mx.tarifa-isr-${periodo}`];
    const diario = redondear(salarioDiario(entrada.sueldo, periodo));
    const minimo = porRegion(valores["mx.salario-minimo"], entrada.region);
    const ganaMinimo = diario <= minimo;

    const subsidioMensual = (valores["mx.uma-mensual"] * valores["mx.subsidio-empleo"]) / 100;
    const subsidioPeriodo = periodo === "mensual" ? subsidioMensual : (subsidioMensual / DIAS_PERIODO.mensual) * dias;
    const ingresoMensual = periodo === "mensual" ? entrada.sueldo : (entrada.sueldo / dias) * DIAS_PERIODO.mensual;
    const isr = ganaMinimo
      ? { isr: 0, subsidio: 0, retener: 0 }
      : retencionIsr(entrada.sueldo, tarifa, subsidioPeriodo, ingresoMensual, valores["mx.subsidio-empleo-limite"], redondear);

    const vacaciones = diasDeVacaciones(Math.max(1, entrada.antiguedad), valores["mx.vacaciones-primer-anio"]);
    const factor = 1 + (valores["mx.dias-aguinaldo"] + porcentaje(vacaciones, valores["mx.prima-vacacional"])) / 365;
    const uma = valores["mx.uma-diaria"];
    const sbcSinTope = entrada.sbc ?? redondear(diario * factor);
    const sbc = Math.min(Math.max(sbcSinTope, minimo), valores["mx.tope-sbc-imss"] * uma);
    const cuotas = valores["mx.cuotas-imss-obrero"];
    const sobreSbc =
      enMapa(cuotas, "prestaciones-dinero") + enMapa(cuotas, "gastos-medicos-pensionados") + enMapa(cuotas, "invalidez-vida") + enMapa(cuotas, "cesantia-vejez");
    const excedente = Math.max(0, sbc - valores["mx.umbral-excedente-imss"] * uma);
    const imssDiario = porcentaje(sbc, sobreSbc) + porcentaje(excedente, enMapa(cuotas, "excedente-eym"));
    const imss = ganaMinimo ? 0 : redondear(imssDiario * dias);

    const observaciones: string[] = [];
    if (ganaMinimo) observaciones.push("Ganas el salario mínimo: no te retienen ISR y tu empresa paga tus cuotas del IMSS.");
    if (isr.subsidio > 0) observaciones.push("Te toca el subsidio para el empleo, que baja el ISR que te retienen.");
    if (sbcSinTope > sbc && !ganaMinimo) observaciones.push("Tu salario base de cotización pasa el tope del IMSS, así que las cuotas se calculan con el tope.");
    return {
      diario,
      sbc: redondear(sbc),
      isr: isr.isr,
      subsidio: isr.subsidio,
      isrRetenido: isr.retener,
      imss,
      neto: redondear(entrada.sueldo - isr.retener - imss),
      observaciones,
    };
  },
  resultado: [
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "sbc", etiqueta: "Salario base de cotización (IMSS)", formato: "moneda" },
    { clave: "isr", etiqueta: "ISR según la tarifa", formato: "moneda" },
    { clave: "subsidio", etiqueta: "Subsidio para el empleo", formato: "moneda", ocultarSiCero: true },
    { clave: "isrRetenido", etiqueta: "ISR que te retienen", formato: "moneda" },
    { clave: "imss", etiqueta: "Cuotas del IMSS", formato: "moneda" },
    { clave: "neto", etiqueta: "Sueldo neto", formato: "moneda", destacada: true },
  ],
});
