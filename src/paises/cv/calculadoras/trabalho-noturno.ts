import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { salarioHora } from "../lib/folha";

export default definirCalculadora({
  id: "cv.trabalho-noturno",
  mercado: "cv",
  concepto: "propio",
  slug: "trabalho-noturno",
  estado: "publicado",
  requiere: {
    "cv.subsidio-noturno": "numero",
    "cv.noturno-inicio": "numero",
    "cv.noturno-fim": "numero",
    "cv.semanas-ano": "numero",
    "cv.horas-semanais": "numero",
  },
  campos: [
    { id: "salarioBase", tipo: "moneda", etiqueta: "Salário base mensal", min: 0, porDefecto: 120000 },
    { id: "horasSemanais", tipo: "numero", etiqueta: "Horas do período normal de trabalho por semana", min: 1, max: 60, porDefecto: 44 },
    { id: "horasNoturnas", tipo: "numero", etiqueta: "Horas de trabalho noturno no mês", min: 0, max: 300, porDefecto: 80 },
  ],
  calcular(entrada, valores, { redondear }) {
    const hora = salarioHora(entrada.salarioBase, entrada.horasSemanais, valores["cv.semanas-ano"]);
    const porHora = porcentaje(hora, valores["cv.subsidio-noturno"]);
    const subsidio = redondear(porHora * entrada.horasNoturnas);
    return {
      subsidio,
      hora: redondear(hora),
      porHora: redondear(porHora),
      total: redondear(entrada.salarioBase + subsidio),
      observaciones: [
        "O Código Laboral fala em subsídio não inferior a 25 % do salário base para quem trabalha em regime noturno. A calculadora aplica essa percentagem à hora normal de cada hora noturna. O contrato ou a convenção coletiva podem dar mais.",
        "Quem trabalha por turnos tem um subsídio de valor a acordar entre as partes.",
      ],
    };
  },
  resultado: [
    { clave: "subsidio", etiqueta: "Subsídio de trabalho noturno do mês", formato: "moneda", destacada: true },
    { clave: "hora", etiqueta: "Valor da hora normal", formato: "moneda" },
    { clave: "porHora", etiqueta: "Acréscimo por hora noturna", formato: "moneda" },
    { clave: "total", etiqueta: "Salário base mais subsídio noturno", formato: "moneda" },
  ],
});
