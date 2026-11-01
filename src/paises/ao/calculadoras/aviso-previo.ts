import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { somarDias } from "../lib/folha";

function diasEntre(a: string, b: string): number {
  return Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86400000);
}

export default definirCalculadora({
  id: "ao.aviso-previo",
  mercado: "ao",
  concepto: "preaviso",
  slug: "aviso-previo",
  estado: "publicado",
  requiere: {
    "ao.aviso-previo-trabalhador": "numero",
    "ao.aviso-previo-empregador": "numero",
  },
  campos: [
    {
      id: "quem",
      tipo: "opcion",
      etiqueta: "Quem termina o contrato",
      opciones: [
        { valor: "trabalhador", etiqueta: "O trabalhador demite-se (denúncia)" },
        { valor: "empregador", etiqueta: "O empregador despede por causas objectivas" },
      ],
      porDefecto: "trabalhador",
    },
    { id: "aviso", tipo: "fecha", etiqueta: "Data em que o aviso é entregue", min: "2000-01-01", porDefecto: "hoy" },
    { id: "saida", tipo: "fecha", etiqueta: "Último dia de trabalho pretendido", min: "2000-01-01", requerido: false, visibleSi: { quem: ["trabalhador"] }, ayuda: "Deixe em branco para cumprir o aviso todo." },
    { id: "salario", tipo: "moneda", etiqueta: "Salário mensal", min: 0, porDefecto: 350000, visibleSi: { quem: ["trabalhador"] } },
  ],
  calcular(entrada, valores, { redondear }) {
    const prazo = entrada.quem === "trabalhador" ? valores["ao.aviso-previo-trabalhador"] : valores["ao.aviso-previo-empregador"];
    const cessacao = somarDias(entrada.aviso, prazo);
    if (entrada.quem === "empregador") {
      return { prazo, cessacao, falta: null, compensacao: null, observaciones: ["O aviso deve indicar o motivo, a data da cessação e o valor, a forma e o momento de pagamento da compensação."] };
    }
    const saida = entrada.saida ?? cessacao;
    const cumpridos = diasEntre(entrada.aviso, saida);
    if (cumpridos < 0) throw new ErrorEntrada("O último dia não pode ser anterior à data do aviso.", "saida");
    const falta = Math.max(0, prazo - cumpridos);
    return {
      prazo,
      cessacao,
      falta,
      compensacao: redondear(((entrada.salario ?? 0) * falta) / prazo),
      observaciones: falta > 0 ? ["Sem justa causa, o trabalhador que não cumpre o aviso paga ao empregador o salário dos dias em falta."] : [],
    };
  },
  resultado: [
    { clave: "prazo", etiqueta: "Aviso prévio mínimo", formato: "dias" },
    { clave: "cessacao", etiqueta: "Data mais cedo para a cessação", formato: "fecha", destacada: true },
    { clave: "falta", etiqueta: "Dias de aviso em falta", formato: "dias" },
    { clave: "compensacao", etiqueta: "Valor a compensar ao empregador", formato: "moneda" },
  ],
});
