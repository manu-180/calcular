import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { impostoTabela, limpo, reducao } from "../lib/folha";

export default definirCalculadora({
  id: "br.imposto-de-renda-anual",
  mercado: "br",
  concepto: "propio",
  slug: "simulador-imposto-de-renda",
  estado: "publicado",
  requiere: {
    "br.irpf-anual": "escala",
    "br.irpf-dependente-anual": "numero",
    "br.irpf-desconto-simplificado-anual": "numero",
    "br.irpf-desconto-simplificado-percentual": "numero",
    "br.irpf-limite-instrucao": "numero",
    "br.previdencia-privada-limite": "numero",
    "br.reducao-anual-isencao": "numero",
    "br.reducao-anual-limite": "numero",
    "br.reducao-anual-constante": "numero",
    "br.reducao-anual-fator": "numero",
  },
  campos: [
    { id: "rendimentos", tipo: "moneda", etiqueta: "Rendimentos tributáveis no ano", min: 0, porDefecto: 72000, ayuda: "Salários, férias, aluguéis e outros rendimentos tributáveis de 2026. O 13º fica fora." },
    { id: "inss", tipo: "moneda", etiqueta: "INSS pago no ano", min: 0, porDefecto: 0 },
    { id: "dependentes", tipo: "entero", etiqueta: "Dependentes", min: 0, max: 20, porDefecto: 0 },
    { id: "saude", tipo: "moneda", etiqueta: "Despesas médicas", min: 0, porDefecto: 0 },
    { id: "instrucao", tipo: "moneda", etiqueta: "Despesas com instrução", min: 0, porDefecto: 0 },
    { id: "pensao", tipo: "moneda", etiqueta: "Pensão alimentícia judicial paga", min: 0, porDefecto: 0 },
    { id: "pgbl", tipo: "moneda", etiqueta: "Previdência privada (PGBL)", min: 0, porDefecto: 0 },
    { id: "retido", tipo: "moneda", etiqueta: "Imposto retido na fonte no ano", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, valores, contexto) {
    const redondear = (n: number) => contexto.redondear(limpo(n));
    const renda = entrada.rendimentos;
    const instrucao = Math.min(entrada.instrucao, valores["br.irpf-limite-instrucao"] * (1 + entrada.dependentes));
    const pgbl = Math.min(entrada.pgbl, porcentaje(renda, valores["br.previdencia-privada-limite"]));
    const legais = redondear(entrada.inss + entrada.dependentes * valores["br.irpf-dependente-anual"] + entrada.saude + instrucao + entrada.pensao + pgbl);
    const simplificado = redondear(Math.min(porcentaje(renda, valores["br.irpf-desconto-simplificado-percentual"]), valores["br.irpf-desconto-simplificado-anual"]));
    const regra = {
      isencao: valores["br.reducao-anual-isencao"],
      limite: valores["br.reducao-anual-limite"],
      constante: valores["br.reducao-anual-constante"],
      fator: valores["br.reducao-anual-fator"],
    };
    const devido = (deducao: number) => {
      const imposto = impostoTabela(valores["br.irpf-anual"], Math.max(0, renda - deducao), redondear);
      return redondear(imposto - reducao(renda, imposto, regra, redondear));
    };
    const devidoCompleta = devido(legais);
    const devidoSimplificada = devido(simplificado);
    const usaSimplificada = devidoSimplificada <= devidoCompleta;
    const devidoFinal = usaSimplificada ? devidoSimplificada : devidoCompleta;
    const saldo = redondear(devidoFinal - entrada.retido);
    const observaciones = ["Simulação da declaração de 2027, ano-calendário 2026, com a tabela anual e a redução da Lei nº 15.270/2025."];
    if (entrada.instrucao > instrucao) observaciones.push("As despesas com instrução foram limitadas ao teto por pessoa.");
    if (entrada.pgbl > pgbl) observaciones.push("A previdência privada foi limitada ao teto da lei sobre os rendimentos tributáveis.");
    return {
      legais,
      simplificado,
      devidoCompleta,
      devidoSimplificada,
      modelo: usaSimplificada ? "Simplificada" : "Completa",
      devido: devidoFinal,
      pagar: saldo > 0 ? saldo : 0,
      restituir: saldo < 0 ? -saldo : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "legais", etiqueta: "Deduções legais (declaração completa)", formato: "moneda" },
    { clave: "simplificado", etiqueta: "Desconto simplificado", formato: "moneda" },
    { clave: "devidoCompleta", etiqueta: "Imposto na declaração completa", formato: "moneda" },
    { clave: "devidoSimplificada", etiqueta: "Imposto na declaração simplificada", formato: "moneda" },
    { clave: "modelo", etiqueta: "Modelo mais vantajoso", formato: "texto" },
    { clave: "devido", etiqueta: "Imposto devido no ano", formato: "moneda" },
    { clave: "pagar", etiqueta: "Imposto a pagar", formato: "moneda", destacada: true, ocultarSiCero: true },
    { clave: "restituir", etiqueta: "Imposto a restituir", formato: "moneda", destacada: true, ocultarSiCero: true },
  ],
});
