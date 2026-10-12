import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { DIAS_MES } from "../prestaciones";

export default definirCalculadora({
  id: "ni.subsidio-por-enfermedad",
  mercado: "ni",
  concepto: "propio",
  slug: "subsidio-por-enfermedad",
  estado: "publicado",
  requiere: {
    "ni.subsidio-enfermedad": "numero",
    "ni.subsidio-enfermedad-dias-espera": "numero",
    "ni.subsidio-enfermedad-semanas-maximas": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual promedio", min: 0, ayuda: "El promedio de tus últimas ocho semanas cotizadas." },
    { id: "dias", tipo: "entero", etiqueta: "Días de reposo que te dieron", min: 1, porDefecto: 7 },
    { id: "hospital", tipo: "si-no", etiqueta: "Te hospitalizaron o fue un accidente", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const maximo = valores["ni.subsidio-enfermedad-semanas-maximas"] * 7;
    if (entrada.dias > maximo) throw new ErrorEntrada(`El subsidio se paga hasta ${maximo} días seguidos. Después decide la Comisión de Invalidez.`, "dias");
    const espera = entrada.hospital ? 0 : Math.min(entrada.dias, valores["ni.subsidio-enfermedad-dias-espera"]);
    const diasPagados = entrada.dias - espera;
    const diario = redondear(porcentaje(entrada.salario / DIAS_MES, valores["ni.subsidio-enfermedad"]));
    const observaciones = [
      "Es un cálculo estimado: el INSS usa la categoría salarial de tus últimas ocho cotizaciones semanales dentro de las 22 semanas anteriores.",
      "Cada orden de reposo es por 30 días como máximo. Para seguir cobrando necesitás una orden nueva.",
    ];
    if (espera > 0) observaciones.push(`Los primeros ${espera} días de reposo no los paga el INSS.`);
    return { espera, diasPagados, diario, total: redondear(diario * diasPagados), observaciones };
  },
  resultado: [
    { clave: "espera", etiqueta: "Días sin subsidio", formato: "dias" },
    { clave: "diasPagados", etiqueta: "Días que paga el INSS", formato: "dias" },
    { clave: "diario", etiqueta: "Subsidio por día", formato: "moneda" },
    { clave: "total", etiqueta: "Subsidio total", formato: "moneda", destacada: true },
  ],
});
