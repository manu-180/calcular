import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "pt.valor-ias",
  mercado: "pt",
  concepto: "conversor-unidad",
  slug: "valor-ias",
  estado: "publicado",
  requiere: {
    "pt.ias": "numero",
    "pt.desemprego-limites-ias": "mapa",
    "pt.irs-deducao-especifica-ias": "numero",
  },
  campos: [
    { id: "multiplo", tipo: "numero", etiqueta: "Número de IAS", min: 0, porDefecto: 1, ayuda: "Por exemplo, 2,5 para o máximo do subsídio de desemprego." },
  ],
  calcular(entrada, valores, { redondear }) {
    const ias = valores["pt.ias"];
    const mensal = redondear(entrada.multiplo * ias);
    return { mensal, anual12: redondear(mensal * 12), anual14: redondear(mensal * 14), ias };
  },
  resultado: [
    { clave: "mensal", etiqueta: "Valor em euros", formato: "moneda", destacada: true },
    { clave: "anual12", etiqueta: "Em 12 meses", formato: "moneda" },
    { clave: "anual14", etiqueta: "Em 14 meses", formato: "moneda" },
    { clave: "ias", etiqueta: "Valor do IAS", formato: "moneda" },
  ],
});
