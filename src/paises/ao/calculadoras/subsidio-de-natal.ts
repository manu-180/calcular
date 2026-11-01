import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { complementoAnual } from "../lib/complementos";

export default definirCalculadora({
  id: "ao.subsidio-de-natal",
  mercado: "ao",
  concepto: "bono-semestral",
  slug: "subsidio-de-natal",
  estado: "publicado",
  requiere: {
    "ao.subsidio-natal": "numero",
    "ao.inss-trabalhador": "numero",
  },
  campos: [
    { id: "salarioBase", tipo: "moneda", etiqueta: "Salário base mensal", min: 0, porDefecto: 350000 },
    { id: "meses", tipo: "entero", etiqueta: "Meses completos de serviço no ano", min: 1, max: 12, porDefecto: 12, ayuda: "12 se trabalhou o ano inteiro. Menos se entrou durante o ano, se o contrato esteve suspenso ou se terminou." },
    { id: "percentagem", tipo: "porcentaje", etiqueta: "Percentagem do salário base no contrato", min: 0, max: 100, porDefecto: 50, ayuda: "Vem com o mínimo da lei. Use a do contrato ou da convenção se for maior." },
  ],
  calcular(entrada, valores, { redondear }) {
    const r = complementoAnual(entrada.salarioBase, entrada.percentagem, valores["ao.subsidio-natal"], entrada.meses);
    const subsidio = redondear(r.valor);
    const inss = redondear(porcentaje(subsidio, valores["ao.inss-trabalhador"]));
    return {
      subsidio,
      percentagem: r.percentagem,
      inss,
      depoisInss: redondear(subsidio - inss),
      observaciones: r.observaciones,
    };
  },
  resultado: [
    { clave: "subsidio", etiqueta: "Subsídio de Natal (bruto)", formato: "moneda", destacada: true },
    { clave: "percentagem", etiqueta: "Percentagem aplicada", formato: "porcentaje" },
    { clave: "inss", etiqueta: "Desconto para o INSS", formato: "moneda" },
    { clave: "depoisInss", etiqueta: "Depois do INSS (antes do IRT)", formato: "moneda" },
  ],
});
