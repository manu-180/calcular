import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { limpo } from "../lib/folha";

export default definirCalculadora({
  id: "br.inss-autonomo",
  mercado: "br",
  concepto: "propio",
  slug: "inss-autonomo",
  estado: "publicado",
  requiere: {
    "br.salario-minimo": "numero",
    "br.teto-inss": "numero",
    "br.inss-individual": "numero",
    "br.inss-simplificado": "numero",
    "br.inss-mei": "numero",
  },
  campos: [
    {
      id: "plano",
      tipo: "opcion",
      etiqueta: "Plano de contribuição",
      opciones: [
        { valor: "normal", etiqueta: "Plano normal" },
        { valor: "simplificado", etiqueta: "Plano simplificado (sobre o salário mínimo)" },
        { valor: "baixa-renda", etiqueta: "Facultativo de baixa renda" },
      ],
      porDefecto: "normal",
    },
    { id: "valor", tipo: "moneda", etiqueta: "Quanto quer declarar como salário de contribuição", min: 0, porDefecto: 3000, ayuda: "Só vale no plano normal. Fica entre o salário mínimo e o teto." },
  ],
  calcular(entrada, valores, contexto) {
    const redondear = (n: number) => contexto.redondear(limpo(n));
    const minimo = valores["br.salario-minimo"];
    const teto = valores["br.teto-inss"];
    const observaciones: string[] = [];
    let base = minimo;
    let aliquota: number;
    if (entrada.plano === "normal") {
      base = Math.min(teto, Math.max(minimo, entrada.valor));
      aliquota = valores["br.inss-individual"];
      if (entrada.valor < minimo) observaciones.push("O salário de contribuição não pode ficar abaixo do salário mínimo.");
      if (entrada.valor > teto) observaciones.push("O salário de contribuição para no teto do INSS.");
      observaciones.push("No plano normal, o valor dos benefícios acompanha o salário de contribuição declarado.");
    } else if (entrada.plano === "simplificado") {
      aliquota = valores["br.inss-simplificado"];
      observaciones.push("O plano simplificado não dá direito à aposentadoria por tempo de contribuição e o benefício fica em um salário mínimo.");
    } else {
      aliquota = valores["br.inss-mei"];
      observaciones.push("A alíquota reduzida é só para quem não tem renda própria, está no CadÚnico e tem renda familiar de até dois salários mínimos.");
    }
    return {
      base,
      aliquota,
      mensal: redondear(porcentaje(base, aliquota)),
      anual: redondear(porcentaje(base, aliquota) * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "base", etiqueta: "Salário de contribuição", formato: "moneda" },
    { clave: "aliquota", etiqueta: "Alíquota", formato: "porcentaje" },
    { clave: "mensal", etiqueta: "Contribuição mensal (GPS)", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Total no ano", formato: "moneda" },
  ],
});
