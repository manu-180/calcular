import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { OPCOES_DEPENDENTES, REQUISITOS_IRPS, retencaoIrps } from "../lib/irps";

export default definirCalculadora({
  id: "mz.salario-liquido",
  mercado: "mz",
  concepto: "sueldo-neto",
  slug: "salario-liquido",
  estado: "publicado",
  requiere: {
    ...REQUISITOS_IRPS,
    "mz.inss-trabalhador": "numero",
    "mz.inss-empregador": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salário bruto mensal", min: 0, porDefecto: 30000 },
    { id: "outros", tipo: "moneda", etiqueta: "Subsídios, prémios e horas extraordinárias do mês", min: 0, porDefecto: 0, ayuda: "Tudo o que é pago como remuneração do trabalho além do salário base." },
    { id: "dependentes", tipo: "opcion", etiqueta: "Dependentes a cargo", opciones: OPCOES_DEPENDENTES, porDefecto: "0" },
  ],
  calcular(entrada, valores, { redondear }) {
    const bruto = redondear(entrada.salario + entrada.outros);
    const inss = redondear(porcentaje(bruto, valores["mz.inss-trabalhador"]));
    const irps = redondear(retencaoIrps(valores, entrada.dependentes, bruto));
    const liquido = redondear(bruto - inss - irps);
    return {
      liquido,
      bruto,
      inss,
      irps,
      descontos: bruto > 0 ? ((inss + irps) / bruto) * 100 : 0,
      observaciones: [
        "A tabela de retenção do IRPS aplica-se ao salário bruto mensal, como diz o artigo 65-A do Código do IRPS.",
        "A contribuição da entidade empregadora para o INSS é paga por cima do salário e não sai do líquido.",
      ],
    };
  },
  resultado: [
    { clave: "liquido", etiqueta: "Salário líquido do mês", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Remuneração bruta", formato: "moneda" },
    { clave: "inss", etiqueta: "Segurança social (INSS)", formato: "moneda" },
    { clave: "irps", etiqueta: "IRPS retido na fonte", formato: "moneda" },
    { clave: "descontos", etiqueta: "Peso dos descontos na remuneração", formato: "porcentaje", decimales: 1 },
  ],
  mundo: { bruto: "salario", periodoBruto: "mes", neto: "liquido", periodoNeto: "mes", pagasAnuales: 12, entrada: { dependentes: "0", outros: 0 } },
});
