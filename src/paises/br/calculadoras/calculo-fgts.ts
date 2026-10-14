import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "br.calculo-fgts",
  mercado: "br",
  concepto: "fondo-cesantia",
  slug: "calculo-fgts",
  estado: "publicado",
  requiere: {
    "br.fgts-aliquota": "numero",
    "br.fgts-aliquota-aprendiz": "numero",
    "br.fgts-multa": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salário bruto mensal", min: 0, porDefecto: 3000 },
    { id: "meses", tipo: "entero", etiqueta: "Meses de trabalho", min: 1, max: 600, porDefecto: 12 },
    { id: "aprendiz", tipo: "si-no", etiqueta: "Contrato de aprendiz", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const aliquota = entrada.aprendiz ? valores["br.fgts-aliquota-aprendiz"] : valores["br.fgts-aliquota"];
    const mensal = redondear(porcentaje(entrada.salario, aliquota));
    const salarios = redondear(mensal * entrada.meses);
    const decimo = redondear(porcentaje((entrada.salario * entrada.meses) / 12, aliquota));
    const terco = redondear(porcentaje((entrada.salario / 3) * (entrada.meses / 12), aliquota));
    const total = redondear(salarios + decimo + terco);
    return {
      aliquota,
      mensal,
      salarios,
      decimo,
      terco,
      total,
      multa: redondear(porcentaje(total, valores["br.fgts-multa"])),
      observaciones: [
        "O FGTS também incide sobre o 13º e sobre o terço das férias, por isso eles entram na conta.",
        "Não estão somados os rendimentos da conta (juros, atualização e distribuição de lucros), então o saldo real fica maior.",
      ],
    };
  },
  resultado: [
    { clave: "aliquota", etiqueta: "Alíquota do depósito", formato: "porcentaje" },
    { clave: "mensal", etiqueta: "Depósito por mês", formato: "moneda" },
    { clave: "salarios", etiqueta: "Depósitos sobre os salários", formato: "moneda" },
    { clave: "decimo", etiqueta: "Depósito sobre o 13º", formato: "moneda" },
    { clave: "terco", etiqueta: "Depósito sobre o terço de férias", formato: "moneda" },
    { clave: "total", etiqueta: "Total depositado no período", formato: "moneda", destacada: true },
    { clave: "multa", etiqueta: "Multa na demissão sem justa causa", formato: "moneda" },
  ],
});
