import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "cv.liquidacao-final",
  mercado: "cv",
  concepto: "liquidacion-final",
  slug: "liquidacao-final",
  estado: "publicado",
  requiere: {
    "cv.ferias-dias": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Retribuição mensal", min: 0, porDefecto: 60000 },
    { id: "diasSalario", tipo: "entero", etiqueta: "Dias de salário do mês da saída por receber", min: 0, max: 31, porDefecto: 10 },
    { id: "meses", tipo: "entero", etiqueta: "Meses de serviço no ano da saída", min: 0, max: 12, porDefecto: 6 },
    { id: "gozadas", tipo: "numero", etiqueta: "Dias úteis de férias já gozados no ano da saída", min: 0, max: 44, porDefecto: 0 },
    { id: "vencidas", tipo: "numero", etiqueta: "Dias úteis de férias vencidas e não gozadas", min: 0, max: 44, porDefecto: 0 },
    { id: "indemnizacao", tipo: "moneda", etiqueta: "Indemnização por despedimento, se houver", min: 0, porDefecto: 0, ayuda: "Calcule-a na calculadora de indemnização e escreva aqui o valor." },
    { id: "diasAviso", tipo: "entero", etiqueta: "Dias de aviso prévio em falta", min: 0, max: 90, porDefecto: 0 },
    {
      id: "divisor",
      tipo: "entero",
      etiqueta: "Dias do mês para o valor do dia",
      min: 20,
      max: 31,
      porDefecto: 30,
      ayuda: "A lei não fixa o divisor. Trinta é o mais usado nas folhas de salário.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const diasAnuais = valores["cv.ferias-dias"];
    const valorDia = entrada.salario / entrada.divisor;
    const valorDiaFerias = entrada.salario / diasAnuais;
    const diasProporcionais = Math.max(0, (diasAnuais * entrada.meses) / 12 - entrada.gozadas);
    const salarioDias = redondear(valorDia * entrada.diasSalario);
    const feriasProporcionais = redondear(valorDiaFerias * diasProporcionais);
    const feriasVencidas = redondear(valorDiaFerias * entrada.vencidas);
    const aviso = redondear(valorDia * entrada.diasAviso);
    const indemnizacao = redondear(entrada.indemnizacao);
    return {
      total: redondear(salarioDias + feriasProporcionais + feriasVencidas + aviso + indemnizacao),
      salarioDias,
      diasProporcionais: redondear(diasProporcionais),
      feriasProporcionais,
      feriasVencidas,
      aviso,
      indemnizacao,
      observaciones: [
        "Considera-se que os dias úteis de férias de um ano valem um mês de retribuição, por isso cada dia vale a retribuição mensal a dividir por esses dias.",
        "Os valores são brutos. O INPS e o IRPS ainda se descontam, e o IRPS dos subsídios tem retenção autónoma.",
      ],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total bruto da liquidação final", formato: "moneda", destacada: true },
    { clave: "salarioDias", etiqueta: "Salário dos dias do mês da saída", formato: "moneda", ocultarSiCero: true },
    { clave: "diasProporcionais", etiqueta: "Dias de férias proporcionais por pagar", formato: "dias" },
    { clave: "feriasProporcionais", etiqueta: "Férias proporcionais ao ano da saída", formato: "moneda", ocultarSiCero: true },
    { clave: "feriasVencidas", etiqueta: "Férias vencidas e não gozadas", formato: "moneda", ocultarSiCero: true },
    { clave: "aviso", etiqueta: "Aviso prévio em falta", formato: "moneda", ocultarSiCero: true },
    { clave: "indemnizacao", etiqueta: "Indemnização", formato: "moneda", ocultarSiCero: true },
  ],
});
