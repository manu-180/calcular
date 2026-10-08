import { definirCalculadora, ErrorEntrada, porRegion } from "@/motor/calculo";
import { DIAS_PERIODO, OPCIONES_PERIODO, retencionIsr, salarioDiario } from "../nomina";

export default definirCalculadora({
  id: "mx.aguinaldo",
  mercado: "mx",
  concepto: "bono-semestral",
  slug: "aguinaldo",
  estado: "publicado",
  requiere: {
    "mx.dias-aguinaldo": "numero",
    "mx.exencion-aguinaldo": "numero",
    "mx.uma-diaria": "numero",
    "mx.uma-mensual": "numero",
    "mx.salario-minimo": "numero-por-region",
    "mx.tarifa-isr-mensual": "escala",
    "mx.subsidio-empleo": "numero",
    "mx.subsidio-empleo-limite": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Tu sueldo bruto", min: 0 },
    { id: "periodo", tipo: "opcion", etiqueta: "Ese sueldo es", opciones: OPCIONES_PERIODO, porDefecto: "mensual" },
    { id: "diasTrabajados", tipo: "entero", etiqueta: "Días que trabajaste este año", min: 1, max: 366, porDefecto: 365, ayuda: "Si entraste a mitad de año, cuenta desde tu primer día." },
    { id: "diasAguinaldo", tipo: "entero", etiqueta: "Días de aguinaldo que da tu empresa", min: 1, requerido: false, ayuda: "Déjalo vacío si no lo sabes: se usa el mínimo de ley." },
    { id: "region", tipo: "region", etiqueta: "Dónde trabajas", porDefecto: "general" },
  ],
  calcular(entrada, valores, { redondear }) {
    const minimoLegal = valores["mx.dias-aguinaldo"];
    const dias = entrada.diasAguinaldo ?? minimoLegal;
    if (dias < minimoLegal) throw new ErrorEntrada(`La ley pide al menos ${minimoLegal} días de aguinaldo.`, "diasAguinaldo");
    if (entrada.diasTrabajados > 366) throw new ErrorEntrada("Un año tiene 366 días como máximo.", "diasTrabajados");
    const diario = redondear(salarioDiario(entrada.sueldo, entrada.periodo));
    const proporcion = Math.min(entrada.diasTrabajados, 365) / 365;
    const aguinaldo = redondear(diario * dias * proporcion);
    const minimo = porRegion(valores["mx.salario-minimo"], entrada.region);
    const ganaMinimo = diario <= minimo;
    const topeExento = redondear(valores["mx.exencion-aguinaldo"] * valores["mx.uma-diaria"]);
    const exento = ganaMinimo ? aguinaldo : Math.min(aguinaldo, topeExento);
    const gravado = redondear(aguinaldo - exento);

    const mensual = redondear(diario * DIAS_PERIODO.mensual);
    const subsidio = (valores["mx.uma-mensual"] * valores["mx.subsidio-empleo"]) / 100;
    const r = (base: number) => retencionIsr(base, valores["mx.tarifa-isr-mensual"], subsidio, base, valores["mx.subsidio-empleo-limite"], redondear).retener;
    const isr = gravado > 0 ? redondear(Math.max(0, r(mensual + gravado) - r(mensual))) : 0;

    const observaciones: string[] = [];
    if (ganaMinimo) observaciones.push("Ganas el salario mínimo, así que tu aguinaldo no paga ISR.");
    if (entrada.diasTrabajados < 365) observaciones.push("Como no trabajaste el año completo, te toca la parte proporcional.");
    observaciones.push("El ISR es una estimación: tu empresa puede calcularlo con otro método que permite la ley y el monto cambia un poco.");
    return {
      diario,
      dias,
      aguinaldo,
      exento,
      gravado,
      isr,
      neto: redondear(aguinaldo - isr),
      observaciones,
    };
  },
  resultado: [
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "dias", etiqueta: "Días de aguinaldo por año completo", formato: "dias" },
    { clave: "aguinaldo", etiqueta: "Aguinaldo bruto", formato: "moneda" },
    { clave: "exento", etiqueta: "Parte que no paga ISR", formato: "moneda" },
    { clave: "gravado", etiqueta: "Parte que paga ISR", formato: "moneda", ocultarSiCero: true },
    { clave: "isr", etiqueta: "ISR estimado", formato: "moneda", ocultarSiCero: true },
    { clave: "neto", etiqueta: "Aguinaldo que recibes", formato: "moneda", destacada: true },
  ],
});
