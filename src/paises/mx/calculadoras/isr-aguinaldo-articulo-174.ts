import { aplicarEscala, definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "mx.isr-aguinaldo-articulo-174",
  mercado: "mx",
  concepto: "propio",
  slug: "isr-aguinaldo-articulo-174",
  estado: "publicado",
  requiere: {
    "mx.tarifa-isr-mensual": "escala",
    "mx.factor-mensual-174": "numero",
    "mx.exencion-aguinaldo": "numero",
    "mx.exencion-ptu": "numero",
    "mx.exencion-prima-vacacional": "numero",
  },
  campos: [
    { id: "gravado", tipo: "moneda", etiqueta: "Parte gravada del pago", min: 0, ayuda: "Aguinaldo, PTU, prima vacacional o dominical, ya sin la parte exenta." },
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo mensual ordinario", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tarifa = valores["mx.tarifa-isr-mensual"];
    const fraccion = (entrada.gravado / 365) * valores["mx.factor-mensual-174"];
    const isrOrdinario = aplicarEscala(tarifa, entrada.sueldo);
    const diferencia = aplicarEscala(tarifa, entrada.sueldo + fraccion) - isrOrdinario;
    const tasa = fraccion > 0 ? (diferencia / fraccion) * 100 : 0;
    const retencion = redondear((entrada.gravado * tasa) / 100);
    const normal = redondear(aplicarEscala(tarifa, entrada.sueldo + entrada.gravado) - isrOrdinario);
    return {
      fraccion: redondear(fraccion),
      tasa,
      retencion,
      normal,
      ahorro: redondear(normal - retencion),
      observaciones: ["Es una opción de tu empresa: puede retenerte así o sumando el pago a tu sueldo del mes."],
    };
  },
  resultado: [
    { clave: "fraccion", etiqueta: "Parte mensual del pago", formato: "moneda" },
    { clave: "tasa", etiqueta: "Tasa de retención", formato: "porcentaje", decimales: 4 },
    { clave: "retencion", etiqueta: "ISR con el artículo 174", formato: "moneda", destacada: true },
    { clave: "normal", etiqueta: "ISR si se suma al sueldo del mes", formato: "moneda" },
    { clave: "ahorro", etiqueta: "Diferencia a tu favor", formato: "moneda" },
  ],
});
