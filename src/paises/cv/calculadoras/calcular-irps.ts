import { definirCalculadora, enMapa } from "@/motor/calculo";
import { retencaoIrps } from "../lib/folha";

export default definirCalculadora({
  id: "cv.calcular-irps",
  mercado: "cv",
  concepto: "impuesto-renta",
  slug: "calcular-irps",
  estado: "publicado",
  redondeo: { decimales: 0, modo: "mitad-arriba" },
  requiere: {
    "cv.irps-taxas": "mapa",
    "cv.irps-parcelas": "mapa",
    "cv.irps-limites": "mapa",
    "cv.irps-limite-retencao": "numero",
    "cv.irps-retencao-minima": "numero",
  },
  campos: [{ id: "bruto", tipo: "moneda", etiqueta: "Remuneração bruta mensal", min: 0, porDefecto: 120000 }],
  calcular(entrada, valores, { redondear }) {
    const { retencao, escalao } = retencaoIrps(entrada.bruto, {
      taxas: valores["cv.irps-taxas"],
      parcelas: valores["cv.irps-parcelas"],
      limites: valores["cv.irps-limites"],
      limiteRetencao: valores["cv.irps-limite-retencao"],
      minima: valores["cv.irps-retencao-minima"],
    });
    const irps = redondear(retencao);
    const observaciones: string[] = [];
    if (escalao === null) observaciones.push("A remuneração não passa do limite de retenção. Não há IRPS a reter no mês.");
    else if (retencao === valores["cv.irps-retencao-minima"]) observaciones.push("A fórmula deu menos do que o mínimo, por isso retém-se o valor mínimo.");
    observaciones.push("Vale para trabalhadores dependentes. Pensionistas, rendas, juros e honorários têm regras próprias.");
    return {
      irps,
      taxaFormula: escalao === null ? 0 : enMapa(valores["cv.irps-taxas"], escalao),
      parcela: escalao === null ? 0 : enMapa(valores["cv.irps-parcelas"], escalao),
      taxaEfetiva: entrada.bruto > 0 ? (irps / entrada.bruto) * 100 : 0,
      anual: redondear(irps * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "irps", etiqueta: "IRPS retido por mês", formato: "moneda", destacada: true },
    { clave: "taxaFormula", etiqueta: "Taxa do escalão", formato: "porcentaje", decimales: 0, ocultarSiCero: true },
    { clave: "parcela", etiqueta: "Parcela a abater", formato: "moneda", ocultarSiCero: true },
    { clave: "taxaEfetiva", etiqueta: "Taxa efetiva sobre o bruto", formato: "porcentaje", decimales: 2 },
    { clave: "anual", etiqueta: "IRPS retido em 12 meses", formato: "moneda" },
  ],
});
