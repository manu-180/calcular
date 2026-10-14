import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { limpo } from "../lib/folha";

export default definirCalculadora({
  id: "br.das-mei",
  mercado: "br",
  concepto: "regimen-simplificado",
  slug: "das-mei",
  estado: "publicado",
  requiere: {
    "br.salario-minimo": "numero",
    "br.inss-mei": "numero",
    "br.mei-icms": "numero",
    "br.mei-iss": "numero",
    "br.mei-limite": "numero",
  },
  campos: [
    {
      id: "atividade",
      tipo: "opcion",
      etiqueta: "Atividade do MEI",
      opciones: [
        { valor: "comercio", etiqueta: "Comércio ou indústria" },
        { valor: "servicos", etiqueta: "Prestação de serviços" },
        { valor: "ambos", etiqueta: "Comércio e serviços" },
      ],
      porDefecto: "servicos",
    },
    { id: "faturamento", tipo: "moneda", etiqueta: "Faturamento previsto no ano (opcional)", min: 0, requerido: false },
  ],
  calcular(entrada, valores, contexto) {
    const redondear = (n: number) => contexto.redondear(limpo(n));
    const inss = redondear(porcentaje(valores["br.salario-minimo"], valores["br.inss-mei"]));
    const icms = entrada.atividade === "servicos" ? 0 : valores["br.mei-icms"];
    const iss = entrada.atividade === "comercio" ? 0 : valores["br.mei-iss"];
    const mensal = redondear(inss + icms + iss);
    const observaciones = ["O DAS vence no dia 20 de cada mês, mesmo sem faturamento."];
    const limite = valores["br.mei-limite"];
    if (entrada.faturamento !== null && entrada.faturamento > limite) {
      observaciones.push("O faturamento passa do limite anual do MEI. Converse com um contador sobre o desenquadramento para microempresa.");
    }
    return { inss, icms, iss, mensal, anual: redondear(mensal * 12), observaciones };
  },
  resultado: [
    { clave: "inss", etiqueta: "INSS sobre o salário mínimo", formato: "moneda" },
    { clave: "icms", etiqueta: "ICMS", formato: "moneda", ocultarSiCero: true },
    { clave: "iss", etiqueta: "ISS", formato: "moneda", ocultarSiCero: true },
    { clave: "mensal", etiqueta: "DAS mensal", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Total no ano", formato: "moneda" },
  ],
});
