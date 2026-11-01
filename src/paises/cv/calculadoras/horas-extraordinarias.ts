import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { salarioHora } from "../lib/folha";

export default definirCalculadora({
  id: "cv.horas-extraordinarias",
  mercado: "cv",
  concepto: "horas-extra",
  slug: "horas-extraordinarias",
  estado: "publicado",
  requiere: {
    "cv.he-adicional": "numero",
    "cv.subsidio-noturno": "numero",
    "cv.semanas-ano": "numero",
    "cv.horas-semanais": "numero",
    "cv.he-limite-dia": "numero",
    "cv.he-limite-ano": "numero",
    "cv.he-limite-ano-consentimento": "numero",
  },
  campos: [
    { id: "salarioBase", tipo: "moneda", etiqueta: "Salário base mensal", min: 0, porDefecto: 100000 },
    { id: "horasSemanais", tipo: "numero", etiqueta: "Horas do período normal de trabalho por semana", min: 1, max: 60, porDefecto: 44 },
    { id: "horas", tipo: "numero", etiqueta: "Horas extraordinárias no mês", min: 0, max: 300, porDefecto: 10 },
    {
      id: "horasNoturnas",
      tipo: "numero",
      etiqueta: "Dessas horas, quantas entre as 22 horas e as 6 horas",
      min: 0,
      max: 300,
      porDefecto: 0,
      ayuda: "O acréscimo do trabalho noturno soma-se ao do trabalho extraordinário.",
    },
    { id: "jaFeitas", tipo: "numero", etiqueta: "Horas extraordinárias já feitas no ano, sem as deste mês", min: 0, max: 600, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.horasNoturnas > entrada.horas) {
      throw new ErrorEntrada("As horas noturnas não podem ser mais do que as horas extraordinárias do mês.", "horasNoturnas");
    }
    const hora = salarioHora(entrada.salarioBase, entrada.horasSemanais, valores["cv.semanas-ano"]);
    const horaExtra = hora + porcentaje(hora, valores["cv.he-adicional"]);
    const valorHoras = redondear(horaExtra * entrada.horas);
    const noturno = redondear(porcentaje(hora, valores["cv.subsidio-noturno"]) * entrada.horasNoturnas);
    const observaciones: string[] = [];
    const noAno = entrada.jaFeitas + entrada.horas;
    if (noAno > valores["cv.he-limite-ano-consentimento"]) {
      observaciones.push(`Com estas horas o ano chega a ${noAno}, acima do limite de ${valores["cv.he-limite-ano-consentimento"]} horas que o Código Laboral admite mesmo com consentimento escrito.`);
    } else if (noAno > valores["cv.he-limite-ano"]) {
      observaciones.push(`Com estas horas o ano chega a ${noAno}. Acima de ${valores["cv.he-limite-ano"]} horas só com consentimento escrito do trabalhador.`);
    }
    observaciones.push(`Por dia, o limite é de ${valores["cv.he-limite-dia"]} horas extraordinárias. Trabalho em dia de descanso ou feriado tem outro acréscimo e não se soma a este.`);
    return {
      total: redondear(valorHoras + noturno),
      hora: redondear(hora),
      horaExtra: redondear(horaExtra),
      valorHoras,
      noturno,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total a receber pelas horas extraordinárias", formato: "moneda", destacada: true },
    { clave: "hora", etiqueta: "Valor da hora normal", formato: "moneda" },
    { clave: "horaExtra", etiqueta: "Valor da hora extraordinária", formato: "moneda" },
    { clave: "valorHoras", etiqueta: "Horas extraordinárias com o acréscimo", formato: "moneda" },
    { clave: "noturno", etiqueta: "Acréscimo do trabalho noturno", formato: "moneda", ocultarSiCero: true },
  ],
});
