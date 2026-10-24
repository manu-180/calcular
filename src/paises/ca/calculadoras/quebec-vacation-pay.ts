import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ca.quebec-vacation-pay",
  mercado: "ca",
  concepto: "propio",
  slug: "quebec-vacation-pay",
  estado: "borrador",
  requiere: {
    "ca.qc-vacation-pay": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Gross wages earned in the reference year", min: 0, porDefecto: 50000 },
    { id: "anios", tipo: "entero", etiqueta: "Years of continuous service at the end of the reference year", min: 0, max: 60, porDefecto: 2 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter the wages you earned in the reference year.", "salario");
    const reglas = v["ca.qc-vacation-pay"];
    const tasa = entrada.anios >= reglas["years-1"] ? reglas["rate-1"] : reglas["rate-0"];
    const observaciones: string[] = [];
    if (entrada.anios < 1) observaciones.push("With less than one year of service, the leave is one day for each full month of service, up to two weeks.");
    return {
      pago: redondear(porcentaje(entrada.salario, tasa)),
      tasa,
      semanas: entrada.anios >= reglas["years-1"] ? 3 : entrada.anios >= 1 ? 2 : null,
      observaciones,
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "Vacation pay", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Vacation pay rate", formato: "porcentaje", decimales: 0 },
    { clave: "semanas", etiqueta: "Weeks of vacation", formato: "semanas" },
  ],
});
