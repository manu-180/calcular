import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { diasEntre, somarDias, tempoDeServico } from "../lib/datas";

export default definirCalculadora({
  id: "mz.aviso-previo",
  mercado: "mz",
  concepto: "preaviso",
  slug: "aviso-previo",
  estado: "publicado",
  requiere: {
    "mz.aviso-trabalhador-curto": "numero",
    "mz.aviso-trabalhador-longo": "numero",
    "mz.aviso-prazo-certo": "numero",
    "mz.aviso-empregador": "numero",
  },
  campos: [
    {
      id: "caso",
      tipo: "opcion",
      etiqueta: "Quem termina o contrato",
      opciones: [
        { valor: "trabalhador", etiqueta: "O trabalhador despede-se (contrato por tempo indeterminado)" },
        { valor: "prazo", etiqueta: "O trabalhador despede-se (contrato a prazo certo)" },
        { valor: "empregador", etiqueta: "O empregador rescinde por motivos económicos" },
      ],
      porDefecto: "trabalhador",
    },
    { id: "admissao", tipo: "fecha", etiqueta: "Data de admissão", min: "1970-01-01", porDefecto: "2022-01-03", visibleSi: { caso: ["trabalhador"] } },
    { id: "aviso", tipo: "fecha", etiqueta: "Data em que o aviso é entregue", min: "2000-01-01", porDefecto: "hoy" },
    { id: "saida", tipo: "fecha", etiqueta: "Último dia de trabalho pretendido", min: "2000-01-01", requerido: false, ayuda: "Deixe em branco para cumprir o aviso todo." },
    { id: "salario", tipo: "moneda", etiqueta: "Salário mensal", min: 0, porDefecto: 30000 },
  ],
  calcular(entrada, valores, { redondear }) {
    let prazo: number;
    const observaciones: string[] = ["Os prazos contam em dias seguidos de calendário."];
    if (entrada.caso === "trabalhador") {
      const t = tempoDeServico(entrada.admissao ?? entrada.aviso, entrada.aviso, "aviso");
      const meses = t.anos * 12 + t.meses + (t.dias > 0 ? 1 : 0);
      if (meses <= 6) {
        return {
          prazo: 0,
          cessacao: entrada.aviso,
          falta: 0,
          compensacao: 0,
          observaciones: ["A Lei do Trabalho só fixa prazo de aviso prévio para quem tem mais de seis meses de serviço. Confirme o que diz o seu contrato."],
        };
      }
      prazo = t.anos >= 3 && (t.anos > 3 || t.meses > 0 || t.dias > 0) ? valores["mz.aviso-trabalhador-longo"] : valores["mz.aviso-trabalhador-curto"];
    } else if (entrada.caso === "prazo") {
      prazo = valores["mz.aviso-prazo-certo"];
      observaciones.push("O contrato pode fixar outro prazo. Sem aviso, o empregador pode pedir até um mês de remuneração por danos.");
    } else {
      prazo = valores["mz.aviso-empregador"];
      observaciones.push("A comunicação vai por escrito ao trabalhador, ao órgão sindical e ao Ministério do Trabalho.");
    }
    const cessacao = somarDias(entrada.aviso, prazo);
    const saida = entrada.saida ?? cessacao;
    const cumpridos = diasEntre(entrada.aviso, saida);
    if (cumpridos < 0) throw new ErrorEntrada("O último dia não pode ser anterior à data do aviso.", "saida");
    const falta = Math.max(0, prazo - cumpridos);
    let compensacao = redondear((entrada.salario / 30) * falta);
    if (entrada.caso === "prazo") compensacao = Math.min(compensacao, entrada.salario);
    if (entrada.caso !== "empregador" && falta > 0) observaciones.push("Quem não cumpre o aviso paga ao empregador a remuneração dos dias em falta.");
    return { prazo, cessacao, falta, compensacao: entrada.caso === "empregador" ? null : compensacao, observaciones };
  },
  resultado: [
    { clave: "prazo", etiqueta: "Aviso prévio mínimo", formato: "dias" },
    { clave: "cessacao", etiqueta: "Data mais cedo para a cessação", formato: "fecha", destacada: true },
    { clave: "falta", etiqueta: "Dias de aviso em falta", formato: "dias" },
    { clave: "compensacao", etiqueta: "Valor a pagar ao empregador pelo aviso em falta", formato: "moneda" },
  ],
});
