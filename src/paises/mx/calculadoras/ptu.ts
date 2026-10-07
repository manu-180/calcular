import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mx.ptu",
  mercado: "mx",
  concepto: "reparto-utilidades",
  slug: "ptu",
  estado: "publicado",
  requiere: {
    "mx.tope-ptu-meses": "numero",
    "mx.dias-minimos-ptu-eventual": "numero",
    "mx.exencion-ptu": "numero",
    "mx.uma-diaria": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "PTU total que reparte la empresa", min: 0, ayuda: "Sale en el proyecto de reparto que la empresa tiene que mostrar a sus trabajadores." },
    { id: "totalDias", tipo: "numero", etiqueta: "Suma de días trabajados por todo el personal", min: 1 },
    { id: "totalSalarios", tipo: "moneda", etiqueta: "Suma de salarios de todo el personal en el año", min: 0.01 },
    { id: "dias", tipo: "entero", etiqueta: "Días que trabajaste en el año", min: 0, max: 366 },
    { id: "salarioAnual", tipo: "moneda", etiqueta: "Tu salario del año (sin horas extra ni bonos)", min: 0 },
    { id: "salarioDiario", tipo: "moneda", etiqueta: "Tu salario diario", min: 0 },
    { id: "promedio", tipo: "moneda", etiqueta: "Promedio de la PTU que recibiste en los últimos tres años", min: 0, requerido: false, ayuda: "Opcional. Sirve para el tope: se usa el que más te convenga." },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Tipo de contrato",
      opciones: [
        { valor: "planta", etiqueta: "De planta" },
        { valor: "eventual", etiqueta: "Eventual" },
      ],
      porDefecto: "planta",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.dias > entrada.totalDias) throw new ErrorEntrada("Tus días no pueden ser más que la suma de días de todo el personal.", "dias");
    if (entrada.salarioAnual > entrada.totalSalarios) throw new ErrorEntrada("Tu salario no puede ser mayor que la suma de salarios de todo el personal.", "salarioAnual");
    const minimoEventual = valores["mx.dias-minimos-ptu-eventual"];
    if (entrada.tipo === "eventual" && entrada.dias < minimoEventual) {
      return {
        porDias: 0,
        porSalarios: 0,
        calculada: 0,
        tope: 0,
        ptu: 0,
        exenta: 0,
        observaciones: [`Como eventual, recibes PTU solo si trabajaste al menos ${minimoEventual} días en el año.`],
      };
    }
    const mitad = entrada.monto / 2;
    const porDias = redondear((mitad * entrada.dias) / entrada.totalDias);
    const porSalarios = redondear((mitad * entrada.salarioAnual) / entrada.totalSalarios);
    const calculada = redondear(porDias + porSalarios);
    const tresMeses = redondear(entrada.salarioDiario * valores["mx.tope-ptu-meses"] * 30);
    const tope = Math.max(tresMeses, entrada.promedio ?? 0);
    const ptu = Math.min(calculada, tope);
    const exenta = Math.min(ptu, redondear(valores["mx.exencion-ptu"] * valores["mx.uma-diaria"]));
    const observaciones = calculada > tope ? ["Tu PTU pasa el tope de ley, así que recibes el tope."] : [];
    return { porDias, porSalarios, calculada, tope, ptu, exenta, observaciones };
  },
  resultado: [
    { clave: "porDias", etiqueta: "Parte por días trabajados", formato: "moneda" },
    { clave: "porSalarios", etiqueta: "Parte por salario", formato: "moneda" },
    { clave: "calculada", etiqueta: "PTU antes del tope", formato: "moneda" },
    { clave: "tope", etiqueta: "Tope de ley", formato: "moneda" },
    { clave: "ptu", etiqueta: "PTU que te toca", formato: "moneda", destacada: true },
    { clave: "exenta", etiqueta: "Parte que no paga ISR", formato: "moneda" },
  ],
});
