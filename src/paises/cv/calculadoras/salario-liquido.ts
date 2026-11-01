import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";
import { retencaoIrps } from "../lib/folha";

export default definirCalculadora({
  id: "cv.salario-liquido",
  mercado: "cv",
  concepto: "sueldo-neto",
  slug: "salario-liquido",
  estado: "publicado",
  redondeo: { decimales: 0, modo: "mitad-arriba" },
  requiere: {
    "cv.inps-trabalhador": "numero",
    "cv.inps-empregador": "numero",
    "cv.irps-taxas": "mapa",
    "cv.irps-parcelas": "mapa",
    "cv.irps-limites": "mapa",
    "cv.irps-limite-retencao": "numero",
    "cv.irps-retencao-minima": "numero",
  },
  campos: [{ id: "bruto", tipo: "moneda", etiqueta: "Remuneração bruta mensal", min: 0, porDefecto: 100000 }],
  calcular(entrada, valores, { redondear }) {
    const inps = redondear(porcentaje(entrada.bruto, valores["cv.inps-trabalhador"]));
    const { retencao, escalao } = retencaoIrps(entrada.bruto, {
      taxas: valores["cv.irps-taxas"],
      parcelas: valores["cv.irps-parcelas"],
      limites: valores["cv.irps-limites"],
      limiteRetencao: valores["cv.irps-limite-retencao"],
      minima: valores["cv.irps-retencao-minima"],
    });
    const irps = redondear(retencao);
    const liquido = redondear(entrada.bruto - inps - irps);
    const observaciones: string[] = [];
    if (escalao === null) observaciones.push("Abaixo do limite de retenção, a remuneração não paga IRPS no mês. Só há desconto para o INPS.");
    observaciones.push("O subsídio de férias, o de Natal e os prémios têm retenção autónoma de IRPS e não entram neste cálculo.");
    return {
      liquido,
      bruto: redondear(entrada.bruto),
      inps,
      irps,
      taxaFormula: escalao === null ? 0 : enMapa(valores["cv.irps-taxas"], escalao),
      descontos: entrada.bruto > 0 ? ((inps + irps) / entrada.bruto) * 100 : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "liquido", etiqueta: "Salário líquido do mês", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Remuneração bruta", formato: "moneda" },
    { clave: "inps", etiqueta: "Quotização para o INPS", formato: "moneda" },
    { clave: "irps", etiqueta: "IRPS retido", formato: "moneda" },
    { clave: "taxaFormula", etiqueta: "Taxa do escalão da fórmula do IRPS", formato: "porcentaje", decimales: 0, ocultarSiCero: true },
    { clave: "descontos", etiqueta: "Peso dos descontos na remuneração", formato: "porcentaje", decimales: 1 },
  ],
  mundo: { bruto: "bruto", periodoBruto: "mes", neto: "liquido", periodoNeto: "mes" },
});
