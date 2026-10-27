import { definirCalculadora } from "@/motor/calculo";
import { tempoDeServico } from "../lib/datas";

export default definirCalculadora({
  id: "mz.rescisao-com-justa-causa",
  mercado: "mz",
  concepto: "propio",
  slug: "rescisao-com-justa-causa",
  estado: "publicado",
  requiere: {
    "mz.indemnizacao-justa-causa": "numero",
    "mz.aviso-justa-causa": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salário base mensal com o bónus de antiguidade", min: 0, porDefecto: 30000 },
    { id: "admissao", tipo: "fecha", etiqueta: "Data de admissão", min: "1970-01-01", porDefecto: "2023-01-02" },
    { id: "cessacao", tipo: "fecha", etiqueta: "Data da rescisão", min: "1970-01-01", porDefecto: "hoy" },
    { id: "avisou", tipo: "si-no", etiqueta: "Comunicou a rescisão com a antecedência da lei", porDefecto: true },
  ],
  calcular(entrada, valores, { redondear }) {
    const t = tempoDeServico(entrada.admissao, entrada.cessacao, "cessacao");
    const anos = t.anos + t.meses / 12;
    const valorDia = entrada.salario / 30;
    const bruta = redondear(anos * valores["mz.indemnizacao-justa-causa"] * valorDia);
    const multa = entrada.avisou ? 0 : redondear(valores["mz.aviso-justa-causa"] * valorDia);
    return {
      indemnizacao: redondear(bruta - multa),
      bruta,
      multa,
      anos,
      observaciones: [
        "Vale para contratos por tempo indeterminado. Num contrato a prazo certo a indemnização são as remunerações que se venceriam até ao fim do prazo.",
        "A fracção de ano conta em meses completos, de forma proporcional.",
      ],
    };
  },
  resultado: [
    { clave: "indemnizacao", etiqueta: "Indemnização a receber", formato: "moneda", destacada: true },
    { clave: "bruta", etiqueta: "Indemnização antes da multa", formato: "moneda" },
    { clave: "multa", etiqueta: "Multa por falta de aviso", formato: "moneda", ocultarSiCero: true },
    { clave: "anos", etiqueta: "Tempo de serviço em anos", formato: "numero", decimales: 2 },
  ],
});
