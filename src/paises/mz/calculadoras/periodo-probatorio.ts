import { definirCalculadora } from "@/motor/calculo";
import { somarDias, somarMeses } from "../lib/datas";

export default definirCalculadora({
  id: "mz.periodo-probatorio",
  mercado: "mz",
  concepto: "propio",
  slug: "periodo-probatorio",
  estado: "publicado",
  requiere: {
    "mz.probatorio-geral": "numero",
    "mz.probatorio-medio": "numero",
    "mz.probatorio-superior": "numero",
    "mz.probatorio-prazo-longo": "numero",
    "mz.probatorio-prazo-medio": "numero",
    "mz.probatorio-prazo-curto": "numero",
  },
  campos: [
    {
      id: "contrato",
      tipo: "opcion",
      etiqueta: "Tipo de contrato",
      opciones: [
        { valor: "indeterminado", etiqueta: "Por tempo indeterminado" },
        { valor: "prazo", etiqueta: "A prazo certo" },
        { valor: "incerto", etiqueta: "A termo incerto (90 dias ou mais previstos)" },
      ],
      porDefecto: "indeterminado",
    },
    {
      id: "funcao",
      tipo: "opcion",
      etiqueta: "Função",
      opciones: [
        { valor: "geral", etiqueta: "Outros trabalhadores" },
        { valor: "medio", etiqueta: "Técnico de nível médio" },
        { valor: "superior", etiqueta: "Técnico de nível superior, chefia ou direcção" },
      ],
      porDefecto: "geral",
      visibleSi: { contrato: ["indeterminado"] },
    },
    { id: "duracao", tipo: "entero", etiqueta: "Duração do contrato em meses", min: 1, porDefecto: 12, visibleSi: { contrato: ["prazo"] } },
    { id: "inicio", tipo: "fecha", etiqueta: "Data de início do contrato", min: "2024-02-21", porDefecto: "hoy" },
  ],
  calcular(entrada, valores) {
    let meses = 0;
    let dias = 0;
    if (entrada.contrato === "indeterminado") {
      meses = entrada.funcao === "superior" ? valores["mz.probatorio-superior"] : entrada.funcao === "medio" ? valores["mz.probatorio-medio"] : valores["mz.probatorio-geral"];
    } else if (entrada.contrato === "prazo" && (entrada.duracao ?? 0) > 12) {
      meses = valores["mz.probatorio-prazo-longo"];
    } else if (entrada.contrato === "prazo" && (entrada.duracao ?? 0) > 6) {
      meses = valores["mz.probatorio-prazo-medio"];
    } else {
      dias = valores["mz.probatorio-prazo-curto"];
    }
    const fim = meses > 0 ? somarDias(somarMeses(entrada.inicio, meses), -1) : somarDias(entrada.inicio, dias - 1);
    return {
      duracao: meses > 0 ? `${meses} ${meses === 1 ? "mês" : "meses"}` : `${dias} dias`,
      fim,
      observaciones: [
        "É o máximo da lei. O contrato ou o instrumento colectivo pode fixar um período mais curto.",
        "Se o período probatório não ficou escrito no contrato, presume-se que as partes o excluíram.",
      ],
    };
  },
  resultado: [
    { clave: "fim", etiqueta: "Último dia possível do período probatório", formato: "fecha", destacada: true },
    { clave: "duracao", etiqueta: "Duração máxima", formato: "texto" },
  ],
});
