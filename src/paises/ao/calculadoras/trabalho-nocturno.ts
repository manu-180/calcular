import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { salarioHora } from "../lib/folha";

export default definirCalculadora({
  id: "ao.trabalho-nocturno",
  mercado: "ao",
  concepto: "propio",
  slug: "trabalho-nocturno",
  estado: "publicado",
  requiere: {
    "ao.nocturno-adicional": "numero",
    "ao.semanas-ano": "numero",
  },
  campos: [
    { id: "salarioBase", tipo: "moneda", etiqueta: "Salário base mensal", min: 0, porDefecto: 350000 },
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "Quanto do trabalho é nocturno",
      opciones: [
        { valor: "todo", etiqueta: "Todo o horário é nocturno" },
        { valor: "horas", etiqueta: "Só algumas horas no mês" },
      ],
      porDefecto: "todo",
    },
    { id: "horas", tipo: "numero", etiqueta: "Horas nocturnas no mês", min: 0, max: 300, porDefecto: 40, visibleSi: { modo: ["horas"] } },
    { id: "horasSemanais", tipo: "numero", etiqueta: "Horário normal por semana (horas)", min: 1, max: 54, porDefecto: 44, visibleSi: { modo: ["horas"] } },
  ],
  calcular(entrada, valores, { redondear }) {
    const taxa = valores["ao.nocturno-adicional"];
    if (entrada.modo === "todo") {
      return { adicional: redondear(porcentaje(entrada.salarioBase, taxa)), hora: null, horaNocturna: null };
    }
    const hora = salarioHora(entrada.salarioBase, entrada.horasSemanais ?? 0, valores["ao.semanas-ano"]);
    const extra = porcentaje(hora, taxa);
    return {
      adicional: redondear((entrada.horas ?? 0) * extra),
      hora: redondear(hora),
      horaNocturna: redondear(hora + extra),
    };
  },
  resultado: [
    { clave: "adicional", etiqueta: "Adicional nocturno do mês", formato: "moneda", destacada: true },
    { clave: "hora", etiqueta: "Valor da hora normal", formato: "moneda" },
    { clave: "horaNocturna", etiqueta: "Valor da hora nocturna", formato: "moneda" },
  ],
});
