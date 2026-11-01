import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { somarDias } from "../lib/datas";

export default definirCalculadora({
  id: "mz.licenca-de-maternidade",
  mercado: "mz",
  concepto: "propio",
  slug: "licenca-de-maternidade",
  estado: "publicado",
  requiere: {
    "mz.licenca-maternidade": "numero",
    "mz.maternidade-antes-parto": "numero",
    "mz.licenca-paternidade": "numero",
  },
  campos: [
    {
      id: "licenca",
      tipo: "opcion",
      etiqueta: "Licença",
      opciones: [
        { valor: "maternidade", etiqueta: "Licença por maternidade" },
        { valor: "paternidade", etiqueta: "Licença por paternidade" },
      ],
      porDefecto: "maternidade",
    },
    { id: "data", tipo: "fecha", etiqueta: "Data provável do parto ou data do nascimento", min: "2024-01-01", porDefecto: "hoy" },
    { id: "antes", tipo: "entero", etiqueta: "Dias antes do parto em que quer começar a licença", min: 0, porDefecto: 0, visibleSi: { licenca: ["maternidade"] } },
  ],
  calcular(entrada, valores) {
    if (entrada.licenca === "paternidade") {
      const dias = valores["mz.licenca-paternidade"];
      const inicio = somarDias(entrada.data, 1);
      return {
        dias,
        inicio,
        fim: somarDias(inicio, dias - 1),
        observaciones: ["A licença começa no dia seguinte ao nascimento e é comunicada por escrito ao empregador. Não pode ser gozada de novo antes de passar um ano e seis meses."],
      };
    }
    const antes = entrada.antes ?? 0;
    if (antes > valores["mz.maternidade-antes-parto"]) {
      throw new ErrorEntrada(`A licença pode começar no máximo ${valores["mz.maternidade-antes-parto"]} dias antes da data provável do parto.`, "antes");
    }
    const dias = valores["mz.licenca-maternidade"];
    const inicio = somarDias(entrada.data, -antes);
    return {
      dias,
      inicio,
      fim: somarDias(inicio, dias - 1),
      observaciones: [
        "Os dias são seguidos e somam-se às férias normais. A licença suspende-se se a mãe ou a criança ficarem internadas.",
        "Durante a licença a remuneração é paga pelo regime da segurança social obrigatória.",
      ],
    };
  },
  resultado: [
    { clave: "inicio", etiqueta: "Primeiro dia da licença", formato: "fecha" },
    { clave: "fim", etiqueta: "Último dia da licença", formato: "fecha", destacada: true },
    { clave: "dias", etiqueta: "Duração", formato: "dias" },
  ],
});
