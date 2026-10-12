import { aplicarEscala, definirCalculadora } from "@/motor/calculo";
import { REQUIERE_DEDUCCIONES, topeDeducciones } from "../deducciones";

export default definirCalculadora({
  id: "mx.deducciones-personales",
  mercado: "mx",
  concepto: "propio",
  slug: "deducciones-personales",
  estado: "publicado",
  requiere: REQUIERE_DEDUCCIONES,
  campos: [
    { id: "ingresos", tipo: "moneda", etiqueta: "Tus ingresos del año", min: 0, ayuda: "Incluye también los ingresos exentos: cuentan para el tope del 15 %." },
    { id: "gastos", tipo: "moneda", etiqueta: "Gastos deducibles con factura", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tope = redondear(topeDeducciones(entrada.ingresos, valores["mx.uma-mensual"], valores["mx.tope-deducciones-uma"], valores["mx.tope-deducciones-porcentaje"]));
    const deducible = Math.min(entrada.gastos, tope);
    const tarifa = valores["mx.tarifa-isr-anual"];
    const sin = redondear(aplicarEscala(tarifa, entrada.ingresos));
    const con = redondear(aplicarEscala(tarifa, Math.max(0, entrada.ingresos - deducible)));
    return {
      topeUma: redondear(valores["mx.tope-deducciones-uma"] * valores["mx.uma-mensual"] * 12),
      tope,
      deducible,
      noDeducible: redondear(entrada.gastos - deducible),
      ahorro: redondear(sin - con),
      observaciones: ["El ahorro es aproximado: supone que todos tus ingresos pagan ISR con la tarifa anual."],
    };
  },
  resultado: [
    { clave: "topeUma", etiqueta: "Tope en UMA anuales", formato: "moneda" },
    { clave: "tope", etiqueta: "Tu tope de deducciones", formato: "moneda" },
    { clave: "deducible", etiqueta: "Lo que puedes deducir", formato: "moneda", destacada: true },
    { clave: "noDeducible", etiqueta: "Gastos que pasan el tope", formato: "moneda", ocultarSiCero: true },
    { clave: "ahorro", etiqueta: "ISR que te ahorras (aproximado)", formato: "moneda", destacada: true },
  ],
});
