import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "uz.bhm-kalkulyatori",
  mercado: "uz",
  concepto: "conversor-unidad",
  slug: "bhm-kalkulyatori",
  estado: "publicado",
  requiere: {
    "uz.bhm": "numero",
  },
  campos: [
    {
      id: "yonalish",
      tipo: "opcion",
      etiqueta: "Nimani hisoblaysiz?",
      opciones: [
        { valor: "bhm-som", etiqueta: "BHM soni → soʻm (jarima, yigʻim, boj)" },
        { valor: "som-bhm", etiqueta: "Soʻm → necha BHM" },
      ],
      porDefecto: "bhm-som",
    },
    { id: "bhm", tipo: "numero", etiqueta: "BHM soni", min: 0, porDefecto: 1, visibleSi: { yonalish: ["bhm-som"] } },
    { id: "som", tipo: "moneda", etiqueta: "Summa", min: 0, porDefecto: 1000000, visibleSi: { yonalish: ["som-bhm"] } },
  ],
  calcular(e, v, { redondear }) {
    const bhm = v["uz.bhm"];
    if (e.yonalish === "bhm-som") {
      if (e.bhm === null || e.bhm <= 0) throw new ErrorEntrada("BHM sonini kiriting.", "bhm");
      return { summa: redondear(e.bhm * bhm), soni: e.bhm, bhm };
    }
    if (e.som === null || e.som <= 0) throw new ErrorEntrada("Summani kiriting.", "som");
    return { summa: e.som, soni: Math.round((e.som / bhm) * 100) / 100, bhm };
  },
  resultado: [
    { clave: "summa", etiqueta: "Summa", formato: "moneda", decimales: 0, destacada: true },
    { clave: "soni", etiqueta: "BHM soni", formato: "numero", decimales: 2 },
    { clave: "bhm", etiqueta: "1 BHM", formato: "moneda", decimales: 0 },
  ],
});
