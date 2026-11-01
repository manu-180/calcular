import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { tempoDeServico } from "../lib/datas";

export default definirCalculadora({
  id: "mz.indemnizacao-por-despedimento",
  mercado: "mz",
  concepto: "indemnizacion-despido",
  slug: "indemnizacao-por-despedimento",
  estado: "publicado",
  requiere: {
    "mz.indemnizacao-ate-7": "numero",
    "mz.indemnizacao-ate-18": "numero",
    "mz.indemnizacao-mais-18": "numero",
    "mz.indemnizacao-limite-1": "numero",
    "mz.indemnizacao-limite-2": "numero",
    "mz.aviso-empregador": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salário base mensal com o bónus de antiguidade", min: 0, porDefecto: 20000 },
    { id: "minimo", tipo: "moneda", etiqueta: "Salário mínimo do seu sector de actividade", min: 1, porDefecto: 8400, ayuda: "O valor em vigor para o sector, fixado pelo Governo todos os anos." },
    { id: "admissao", tipo: "fecha", etiqueta: "Data de admissão", min: "1970-01-01", porDefecto: "2020-03-01" },
    { id: "cessacao", tipo: "fecha", etiqueta: "Data da cessação do contrato", min: "1970-01-01", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.minimo <= 0) throw new ErrorEntrada("Indique o salário mínimo do sector.", "minimo");
    const t = tempoDeServico(entrada.admissao, entrada.cessacao, "cessacao");
    const salariosMinimos = entrada.salario / entrada.minimo;
    const diasPorAno =
      salariosMinimos <= valores["mz.indemnizacao-limite-1"]
        ? valores["mz.indemnizacao-ate-7"]
        : salariosMinimos <= valores["mz.indemnizacao-limite-2"]
          ? valores["mz.indemnizacao-ate-18"]
          : valores["mz.indemnizacao-mais-18"];
    const valorDia = entrada.salario / 30;
    const observaciones = ["Aplica-se à rescisão por motivos estruturais, tecnológicos ou de mercado. O contrato ou o instrumento colectivo pode prever uma indemnização maior."];
    if (t.meses > 0 || t.dias > 0) observaciones.push("A lei fala em dias de salário por cada ano de serviço; a calculadora conta só os anos completos.");
    return {
      indemnizacao: redondear(t.anos * diasPorAno * valorDia),
      salariosMinimos,
      diasPorAno,
      anos: t.anos,
      valorDia: redondear(valorDia),
      observaciones,
    };
  },
  resultado: [
    { clave: "indemnizacao", etiqueta: "Indemnização", formato: "moneda", destacada: true },
    { clave: "salariosMinimos", etiqueta: "Salário em salários mínimos do sector", formato: "numero", decimales: 2 },
    { clave: "diasPorAno", etiqueta: "Dias de salário por ano de serviço", formato: "dias" },
    { clave: "anos", etiqueta: "Anos completos de serviço", formato: "anios" },
    { clave: "valorDia", etiqueta: "Valor de um dia de salário (salário ÷ 30)", formato: "moneda" },
  ],
});
