import { aplicarEscala, definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { deduccionEducativa } from "../lib/isr";

export default definirCalculadora({
  id: "do.isr-persona-fisica",
  mercado: "do",
  concepto: "propio",
  slug: "isr-persona-fisica",
  estado: "publicado",
  requiere: {
    "do.isr-asalariados": "escala",
    "do.gastos-educativos-tope-ingreso": "numero",
    "do.gastos-educativos-tope-exento": "numero",
    "do.gastos-educativos-tope-discapacidad": "numero",
  },
  campos: [
    { id: "ingresos", tipo: "moneda", etiqueta: "Ingresos brutos del año", ayuda: "Honorarios, comisiones, alquileres y demás ingresos que declaras en el IR-1.", min: 0 },
    { id: "gastos", tipo: "moneda", etiqueta: "Costos y gastos deducibles del año", ayuda: "Solo los respaldados con comprobante fiscal.", min: 0, porDefecto: 0 },
    { id: "educativos", tipo: "moneda", etiqueta: "Gastos educativos del año", min: 0, porDefecto: 0 },
    { id: "retenciones", tipo: "moneda", etiqueta: "Retenciones y anticipos ya pagados", ayuda: "Lo que te retuvieron las empresas que te pagaron y los anticipos que pagaste.", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.gastos > entrada.ingresos) throw new ErrorEntrada("Los gastos no pueden pasar de los ingresos.", "gastos");
    const escala = valores["do.isr-asalariados"];
    const rentaNeta = redondear(entrada.ingresos - entrada.gastos);
    const deduccion = redondear(
      deduccionEducativa(entrada.educativos, rentaNeta, false, escala, {
        topeIngreso: valores["do.gastos-educativos-tope-ingreso"],
        topeExento: valores["do.gastos-educativos-tope-exento"],
        topeDiscapacidad: valores["do.gastos-educativos-tope-discapacidad"],
      }),
    );
    const imponible = redondear(rentaNeta - deduccion);
    const impuesto = redondear(aplicarEscala(escala, imponible));
    const saldo = redondear(impuesto - entrada.retenciones);
    const observaciones: string[] = [];
    if (impuesto === 0) observaciones.push("Tu renta neta queda dentro del monto exento: no pagas ISR.");
    if (saldo < 0) observaciones.push("Te retuvieron más de lo que te toca pagar: tienes saldo a favor.");
    observaciones.push("Las retenciones por alquileres desde el 1 de julio de 2026 son pago definitivo: esos alquileres no se declaran ni se restan aquí.");
    return {
      rentaNeta,
      deduccion,
      imponible,
      impuesto,
      retenciones: entrada.retenciones,
      aPagar: Math.max(0, saldo),
      aFavor: Math.max(0, -saldo),
      observaciones,
    };
  },
  resultado: [
    { clave: "rentaNeta", etiqueta: "Renta neta", formato: "moneda" },
    { clave: "deduccion", etiqueta: "Deducción por gastos educativos", formato: "moneda", ocultarSiCero: true },
    { clave: "imponible", etiqueta: "Renta neta imponible", formato: "moneda" },
    { clave: "impuesto", etiqueta: "ISR del año", formato: "moneda", destacada: true },
    { clave: "retenciones", etiqueta: "Retenciones y anticipos", formato: "moneda", ocultarSiCero: true },
    { clave: "aPagar", etiqueta: "Saldo a pagar", formato: "moneda", ocultarSiCero: true },
    { clave: "aFavor", etiqueta: "Saldo a favor", formato: "moneda", ocultarSiCero: true },
  ],
});
