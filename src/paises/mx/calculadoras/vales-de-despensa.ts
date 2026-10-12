import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mx.vales-de-despensa",
  mercado: "mx",
  concepto: "propio",
  slug: "vales-de-despensa",
  estado: "publicado",
  requiere: {
    "mx.despensa-no-integra": "numero",
    "mx.uma-diaria": "numero",
  },
  campos: [
    { id: "vales", tipo: "moneda", etiqueta: "Vales de despensa del mes", min: 0 },
    { id: "dias", tipo: "entero", etiqueta: "Días del periodo", min: 1, max: 31, porDefecto: 30 },
  ],
  calcular(entrada, valores, { redondear }) {
    const topeDiario = porcentaje(valores["mx.uma-diaria"], valores["mx.despensa-no-integra"]);
    const tope = redondear(topeDiario * entrada.dias);
    const integra = redondear(Math.max(0, entrada.vales - tope));
    return {
      topeDiario: redondear(topeDiario),
      tope,
      noIntegra: redondear(entrada.vales - integra),
      integra,
      integraDiario: redondear(integra / entrada.dias),
      observaciones: ["Este cálculo es para el salario base de cotización del IMSS. Para el ISR, los vales son previsión social y tienen otras reglas."],
    };
  },
  resultado: [
    { clave: "topeDiario", etiqueta: "Tope diario que no integra", formato: "moneda" },
    { clave: "tope", etiqueta: "Tope del periodo", formato: "moneda" },
    { clave: "noIntegra", etiqueta: "Parte que no integra al SBC", formato: "moneda" },
    { clave: "integra", etiqueta: "Parte que sí integra al SBC", formato: "moneda", destacada: true },
    { clave: "integraDiario", etiqueta: "Lo que suma a tu SBC por día", formato: "moneda" },
  ],
});
