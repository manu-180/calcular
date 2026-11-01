import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { NOTA_VALOR_HORA, valorHora } from "../lib/hora";

export default definirCalculadora({
  id: "mz.horas-extraordinarias",
  mercado: "mz",
  concepto: "horas-extra",
  slug: "horas-extraordinarias",
  estado: "publicado",
  requiere: {
    "mz.extra-diurno": "numero",
    "mz.extra-noite": "numero",
    "mz.extra-max-semana": "numero",
    "mz.extra-max-trimestre": "numero",
    "mz.extra-max-ano": "numero",
    "mz.periodo-normal-semanal": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salário mensal", min: 0, porDefecto: 30000 },
    { id: "horasSemanais", tipo: "numero", etiqueta: "Horas do período normal de trabalho por semana", min: 1, max: 56, porDefecto: 48 },
    { id: "horasDia", tipo: "numero", etiqueta: "Horas extraordinárias feitas até às 20 horas", min: 0, porDefecto: 8 },
    { id: "horasNoite", tipo: "numero", etiqueta: "Horas extraordinárias feitas depois das 20 horas", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const hora = valorHora(entrada.salario, entrada.horasSemanais);
    const dia = redondear(entrada.horasDia * (hora + porcentaje(hora, valores["mz.extra-diurno"])));
    const noite = redondear(entrada.horasNoite * (hora + porcentaje(hora, valores["mz.extra-noite"])));
    const observaciones = [
      `Limites da lei: até ${valores["mz.extra-max-semana"]} horas extraordinárias por semana, ${valores["mz.extra-max-trimestre"]} por trimestre e ${valores["mz.extra-max-ano"]} por ano.`,
      NOTA_VALOR_HORA,
    ];
    if (entrada.horasSemanais > valores["mz.periodo-normal-semanal"]) {
      observaciones.unshift(`O período normal de trabalho não pode passar de ${valores["mz.periodo-normal-semanal"]} horas por semana, salvo instrumento colectivo.`);
    }
    return { total: redondear(dia + noite), hora: redondear(hora), dia, noite, observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "Total das horas extraordinárias", formato: "moneda", destacada: true },
    { clave: "hora", etiqueta: "Valor da hora normal", formato: "moneda" },
    { clave: "dia", etiqueta: "Horas até às 20 horas", formato: "moneda" },
    { clave: "noite", etiqueta: "Horas depois das 20 horas", formato: "moneda" },
  ],
});
