import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { irtGrupoA } from "../lib/irt";

export default definirCalculadora({
  id: "ao.salario-liquido",
  mercado: "ao",
  concepto: "sueldo-neto",
  slug: "salario-liquido",
  estado: "publicado",
  requiere: {
    "ao.irt-grupo-a": "escala",
    "ao.inss-trabalhador": "numero",
    "ao.irt-subsidio-alimentacao": "numero",
    "ao.irt-subsidio-transporte": "numero",
  },
  campos: [
    { id: "salarioBase", tipo: "moneda", etiqueta: "Salário base mensal", min: 0, porDefecto: 350000 },
    { id: "alimentacao", tipo: "moneda", etiqueta: "Subsídio de alimentação por mês", min: 0, porDefecto: 0 },
    { id: "transporte", tipo: "moneda", etiqueta: "Subsídio de transporte por mês", min: 0, porDefecto: 0 },
    { id: "outros", tipo: "moneda", etiqueta: "Outros subsídios e prémios do mês", min: 0, porDefecto: 0, ayuda: "Subsídio de turno, de chefia, de isenção de horário, comissões." },
  ],
  calcular(entrada, valores, { redondear }) {
    const bruto = redondear(entrada.salarioBase + entrada.alimentacao + entrada.transporte + entrada.outros);
    const inss = redondear(porcentaje(bruto, valores["ao.inss-trabalhador"]));
    const naoSujeito = redondear(
      Math.min(entrada.alimentacao, valores["ao.irt-subsidio-alimentacao"]) + Math.min(entrada.transporte, valores["ao.irt-subsidio-transporte"]),
    );
    const materia = redondear(Math.max(0, bruto - inss - naoSujeito));
    const irt = redondear(irtGrupoA(valores["ao.irt-grupo-a"], materia));
    const liquido = redondear(bruto - inss - irt);
    const observaciones: string[] = [];
    if (entrada.alimentacao + entrada.transporte > naoSujeito) {
      observaciones.push("A parte dos subsídios de alimentação e de transporte acima do limite mensal paga IRT como o resto do salário.");
    }
    observaciones.push("O subsídio de férias e o subsídio de Natal são pagos à parte e não entram neste mês.");
    return {
      liquido,
      bruto,
      inss,
      naoSujeito,
      materia,
      irt,
      descontos: bruto > 0 ? ((inss + irt) / bruto) * 100 : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "liquido", etiqueta: "Salário líquido do mês", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Remuneração bruta", formato: "moneda" },
    { clave: "inss", etiqueta: "Segurança social (INSS)", formato: "moneda" },
    { clave: "naoSujeito", etiqueta: "Subsídios não sujeitos a IRT", formato: "moneda", ocultarSiCero: true },
    { clave: "materia", etiqueta: "Rendimento colectável para o IRT", formato: "moneda" },
    { clave: "irt", etiqueta: "IRT retido", formato: "moneda" },
    { clave: "descontos", etiqueta: "Peso dos descontos na remuneração", formato: "porcentaje", decimales: 1 },
  ],
  mundo: { bruto: "salarioBase", periodoBruto: "mes", neto: "liquido", periodoNeto: "mes", pagasAnuales: 13 },
});
