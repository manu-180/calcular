import { definirCalculadora } from "@/motor/calculo";
import { aliquotaEfetiva, inssEmpregado, limpo } from "../lib/folha";

export default definirCalculadora({
  id: "br.calculo-inss",
  mercado: "br",
  concepto: "aportes-seguridad-social",
  slug: "calculo-inss",
  estado: "publicado",
  requiere: {
    "br.inss-empregado": "escala",
    "br.teto-inss": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salário de contribuição do mês", min: 0, porDefecto: 3500, ayuda: "Salário bruto mais horas extras e adicionais. Se tiver mais de um emprego, some os salários." },
  ],
  calcular(entrada, valores, contexto) {
    const redondear = (n: number) => contexto.redondear(limpo(n));
    const tabela = valores["br.inss-empregado"];
    const teto = valores["br.teto-inss"];
    const base = Math.min(entrada.salario, teto);
    const porFaixa = tabela.map((f) => {
      const topo = f.hasta === null ? base : Math.min(base, f.hasta);
      return topo > f.desde ? redondear(((topo - f.desde) * f.tasa) / 100) : 0;
    });
    const total = inssEmpregado(entrada.salario, tabela, teto, redondear);
    const observaciones: string[] = [];
    if (entrada.salario > teto) observaciones.push("O salário passa do teto: a contribuição para no valor máximo e o que sobra não paga INSS.");
    observaciones.push("Cada faixa paga a sua alíquota só sobre a parte do salário que cai nela.");
    return {
      base,
      faixa1: porFaixa[0] ?? 0,
      faixa2: porFaixa[1] ?? 0,
      faixa3: porFaixa[2] ?? 0,
      faixa4: porFaixa[3] ?? 0,
      total,
      aliquota: aliquotaEfetiva(total, entrada.salario),
      observaciones,
    };
  },
  resultado: [
    { clave: "base", etiqueta: "Salário considerado (até o teto)", formato: "moneda" },
    { clave: "faixa1", etiqueta: "Primeira faixa", formato: "moneda" },
    { clave: "faixa2", etiqueta: "Segunda faixa", formato: "moneda", ocultarSiCero: true },
    { clave: "faixa3", etiqueta: "Terceira faixa", formato: "moneda", ocultarSiCero: true },
    { clave: "faixa4", etiqueta: "Quarta faixa", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Desconto do INSS", formato: "moneda", destacada: true },
    { clave: "aliquota", etiqueta: "Alíquota efetiva", formato: "porcentaje", decimales: 2 },
  ],
});
