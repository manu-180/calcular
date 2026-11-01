import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { salarioHora } from "../lib/folha";

// Artigo 188.º, n.º 4: menos de 15 minutos não conta, de 15 a 44 minutos conta meia hora e de 45 em
// diante conta uma hora.
function horasPagas(horas: number, minutos: number): number {
  if (minutos >= 45) return horas + 1;
  if (minutos >= 15) return horas + 0.5;
  return horas;
}

export default definirCalculadora({
  id: "ao.horas-extraordinarias",
  mercado: "ao",
  concepto: "horas-extra",
  slug: "horas-extraordinarias",
  estado: "publicado",
  requiere: {
    "ao.horas-semanais": "numero",
    "ao.semanas-ano": "numero",
    "ao.he-adicional-1": "numero",
    "ao.he-limite-1": "numero",
    "ao.he-adicional-2": "numero",
    "ao.he-limite-mes": "numero",
    "ao.he-limite-ano": "numero",
  },
  campos: [
    { id: "salarioBase", tipo: "moneda", etiqueta: "Salário base mensal", min: 0, porDefecto: 350000 },
    { id: "horasSemanais", tipo: "numero", etiqueta: "Horário normal por semana (horas)", min: 1, max: 54, porDefecto: 44 },
    { id: "horas", tipo: "entero", etiqueta: "Horas extraordinárias no mês", min: 0, max: 400, porDefecto: 10 },
    { id: "minutos", tipo: "entero", etiqueta: "Minutos a mais", min: 0, max: 59, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const hora = salarioHora(entrada.salarioBase, entrada.horasSemanais, valores["ao.semanas-ano"]);
    const pagas = horasPagas(entrada.horas, entrada.minutos);
    const ate = Math.min(pagas, valores["ao.he-limite-1"]);
    const acima = Math.max(0, pagas - ate);
    const valor1 = ate * (hora + porcentaje(hora, valores["ao.he-adicional-1"]));
    const valor2 = acima * (hora + porcentaje(hora, valores["ao.he-adicional-2"]));
    const observaciones: string[] = [];
    if (pagas > valores["ao.he-limite-mes"]) {
      observaciones.push(`A lei limita o trabalho extraordinário a ${valores["ao.he-limite-mes"]} horas por mês, salvo nos casos previstos na lei ou com autorização da Inspecção Geral do Trabalho.`);
    }
    if (entrada.horasSemanais > valores["ao.horas-semanais"]) {
      observaciones.push(`Um horário normal acima de ${valores["ao.horas-semanais"]} horas por semana só é possível em turnos, horário modulado ou trabalho intermitente.`);
    }
    return {
      total: redondear(valor1 + valor2),
      hora: redondear(hora),
      pagas,
      ate,
      valor1: redondear(valor1),
      acima,
      valor2: redondear(valor2),
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total a receber pelas horas extraordinárias", formato: "moneda", destacada: true },
    { clave: "hora", etiqueta: "Valor da hora normal", formato: "moneda" },
    { clave: "pagas", etiqueta: "Horas pagas no mês", formato: "horas" },
    { clave: "ate", etiqueta: "Horas com o primeiro adicional", formato: "horas" },
    { clave: "valor1", etiqueta: "Valor das horas até ao limite", formato: "moneda" },
    { clave: "acima", etiqueta: "Horas com o adicional maior", formato: "horas", ocultarSiCero: true },
    { clave: "valor2", etiqueta: "Valor das horas acima do limite", formato: "moneda", ocultarSiCero: true },
  ],
});
