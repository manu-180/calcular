import { definirCalculadora } from "@/motor/calculo";
import { linhaIrps, OPCOES_DEPENDENTES, REQUISITOS_IRPS, retencaoIrps } from "../lib/irps";

export default definirCalculadora({
  id: "mz.calcular-irps",
  mercado: "mz",
  concepto: "impuesto-renta",
  slug: "calcular-irps",
  estado: "publicado",
  requiere: REQUISITOS_IRPS,
  campos: [
    { id: "remuneracao", tipo: "moneda", etiqueta: "Remuneração bruta do mês", min: 0, porDefecto: 50000 },
    { id: "dependentes", tipo: "opcion", etiqueta: "Dependentes a cargo", opciones: OPCOES_DEPENDENTES, porDefecto: "0" },
  ],
  calcular(entrada, valores, { redondear }) {
    const irps = redondear(retencaoIrps(valores, entrada.dependentes, entrada.remuneracao));
    const fila = linhaIrps(valores, entrada.dependentes, entrada.remuneracao);
    const isento = fila.tasa === 0;
    return {
      irps,
      limite: isento ? null : fila.desde,
      fixo: isento ? null : (fila.cuotaFija ?? 0),
      coeficiente: isento ? null : fila.tasa,
      efectiva: entrada.remuneracao > 0 ? (irps / entrada.remuneracao) * 100 : 0,
      depois: redondear(entrada.remuneracao - irps),
      observaciones: isento ? ["Neste intervalo da tabela não há IRPS a reter."] : [],
    };
  },
  resultado: [
    { clave: "irps", etiqueta: "IRPS a reter no mês", formato: "moneda", destacada: true },
    { clave: "limite", etiqueta: "Limite inferior do intervalo", formato: "moneda" },
    { clave: "fixo", etiqueta: "Valor fixo do intervalo", formato: "moneda" },
    { clave: "coeficiente", etiqueta: "Coeficiente sobre a diferença", formato: "porcentaje" },
    { clave: "efectiva", etiqueta: "Taxa efectiva", formato: "porcentaje", decimales: 2 },
    { clave: "depois", etiqueta: "Remuneração depois do IRPS", formato: "moneda" },
  ],
});
