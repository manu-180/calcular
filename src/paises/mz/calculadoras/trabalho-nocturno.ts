import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { NOTA_VALOR_HORA, valorHora } from "../lib/hora";

export default definirCalculadora({
  id: "mz.trabalho-nocturno",
  mercado: "mz",
  concepto: "propio",
  slug: "trabalho-nocturno",
  estado: "publicado",
  requiere: {
    "mz.trabalho-nocturno": "numero",
    "mz.extra-noite": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salário mensal", min: 0, porDefecto: 30000 },
    { id: "horasSemanais", tipo: "numero", etiqueta: "Horas do período normal de trabalho por semana", min: 1, max: 56, porDefecto: 48 },
    { id: "horas", tipo: "numero", etiqueta: "Horas nocturnas no mês", min: 0, porDefecto: 40, ayuda: "Horas normais feitas entre as 20 horas e o início do período de trabalho do dia seguinte." },
  ],
  calcular(entrada, valores, { redondear }) {
    const hora = valorHora(entrada.salario, entrada.horasSemanais);
    const acrescimo = redondear(entrada.horas * porcentaje(hora, valores["mz.trabalho-nocturno"]));
    return {
      acrescimo,
      hora: redondear(hora),
      horaNocturna: redondear(hora + porcentaje(hora, valores["mz.trabalho-nocturno"])),
      observaciones: [
        "O trabalho em regime de turnos tem regras próprias e o instrumento colectivo pode definir outro horário nocturno.",
        NOTA_VALOR_HORA,
      ],
    };
  },
  resultado: [
    { clave: "acrescimo", etiqueta: "Acréscimo nocturno a receber no mês", formato: "moneda", destacada: true },
    { clave: "hora", etiqueta: "Valor da hora normal", formato: "moneda" },
    { clave: "horaNocturna", etiqueta: "Valor da hora nocturna", formato: "moneda" },
  ],
});
