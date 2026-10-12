import { aplicarEscala, definirCalculadora } from "@/motor/calculo";
import { REQUIERE_DEDUCCIONES, topeDeducciones } from "../deducciones";

export default definirCalculadora({
  id: "mx.declaracion-anual",
  mercado: "mx",
  concepto: "propio",
  slug: "declaracion-anual",
  estado: "publicado",
  requiere: REQUIERE_DEDUCCIONES,
  campos: [
    { id: "ingresos", tipo: "moneda", etiqueta: "Ingresos gravados del año", min: 0, ayuda: "Suma de sueldos y demás ingresos gravados de tus constancias de retenciones." },
    { id: "retenido", tipo: "moneda", etiqueta: "ISR que te retuvieron en el año", min: 0, porDefecto: 0 },
    { id: "deducciones", tipo: "moneda", etiqueta: "Deducciones personales", min: 0, requerido: false, ayuda: "Gastos médicos, dentales, colegiaturas, intereses de crédito hipotecario y otros con factura." },
  ],
  calcular(entrada, valores, { redondear }) {
    const tope = redondear(topeDeducciones(entrada.ingresos, valores["mx.uma-mensual"], valores["mx.tope-deducciones-uma"], valores["mx.tope-deducciones-porcentaje"]));
    const deducible = Math.min(entrada.deducciones ?? 0, tope);
    const base = Math.max(0, entrada.ingresos - deducible);
    const isr = redondear(aplicarEscala(valores["mx.tarifa-isr-anual"], base));
    const saldo = redondear(isr - entrada.retenido);
    const observaciones: string[] = [];
    if ((entrada.deducciones ?? 0) > tope) observaciones.push("Tus deducciones pasan el tope: solo se descuenta hasta el tope.");
    observaciones.push("Se usa la tarifa anual del año en curso. Las aportaciones voluntarias al retiro tienen su propio límite y no cuentan para este tope.");
    return {
      tope,
      deducible,
      base: redondear(base),
      isr,
      aCargo: saldo > 0 ? saldo : 0,
      aFavor: saldo < 0 ? -saldo : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "tope", etiqueta: "Tope de deducciones personales", formato: "moneda" },
    { clave: "deducible", etiqueta: "Deducciones que se aplican", formato: "moneda" },
    { clave: "base", etiqueta: "Base del impuesto", formato: "moneda" },
    { clave: "isr", etiqueta: "ISR del año", formato: "moneda" },
    { clave: "aFavor", etiqueta: "Saldo a favor (devolución)", formato: "moneda", destacada: true, ocultarSiCero: true },
    { clave: "aCargo", etiqueta: "Saldo a cargo (por pagar)", formato: "moneda", destacada: true, ocultarSiCero: true },
  ],
});
