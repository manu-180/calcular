import { definirCalculadora, enMapa } from "@/motor/calculo";
import { formatarData, somarDias } from "../lib/datas";

export default definirCalculadora({
  id: "pt.aviso-previo",
  mercado: "pt",
  concepto: "preaviso",
  slug: "aviso-previo",
  estado: "publicado",
  requiere: {
    "pt.ct-aviso-previo-trabalhador": "mapa",
  },
  campos: [
    {
      id: "contrato",
      tipo: "opcion",
      etiqueta: "Tipo de contrato",
      opciones: [
        { valor: "sem-termo", etiqueta: "Sem termo (efetivo)" },
        { valor: "termo", etiqueta: "A termo (certo ou incerto)" },
      ],
      porDefecto: "sem-termo",
    },
    {
      id: "meses",
      tipo: "entero",
      etiqueta: "Antiguidade ou duração do contrato, em meses",
      min: 0,
      max: 600,
      porDefecto: 12,
      ayuda: "No contrato sem termo conta a antiguidade. No contrato a termo conta a duração do contrato (no termo incerto, a já decorrida).",
    },
    { id: "comunicacao", tipo: "fecha", etiqueta: "Data em que entrega a carta de denúncia", porDefecto: "hoy" },
  ],
  calcular(entrada, valores) {
    const m = valores["pt.ct-aviso-previo-trabalhador"];
    const chave =
      entrada.contrato === "sem-termo" ? (entrada.meses > 24 ? "mais-2-anos" : "ate-2-anos") : entrada.meses >= 6 ? "termo-6-meses" : "termo-menos-6-meses";
    const dias = enMapa(m, chave);
    return {
      dias,
      ultimoDia: formatarData(somarDias(entrada.comunicacao, dias)),
      observaciones: [
        "Prazo mínimo para o trabalhador que se demite sem justa causa (artigo 400.º do Código do Trabalho). Em cargos de direção ou de responsabilidade, o contrato ou a convenção coletiva podem alargá-lo até seis meses.",
      ],
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Aviso prévio mínimo", formato: "dias", destacada: true },
    { clave: "ultimoDia", etiqueta: "O contrato termina, no mínimo, a", formato: "texto" },
  ],
});
