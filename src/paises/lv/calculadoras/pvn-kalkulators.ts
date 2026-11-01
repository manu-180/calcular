import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "lv.pvn-kalkulators",
  mercado: "lv",
  concepto: "iva",
  slug: "pvn-kalkulators",
  estado: "publicado",
  requiere: { "lv.pvn": "mapa", "lv.pvn-slieksnis": "numero" },
  campos: [
    {
      id: "virziens",
      tipo: "opcion",
      etiqueta: "Ko vēlaties aprēķināt?",
      opciones: [
        { valor: "pieskaitit", etiqueta: "Pieskaitīt PVN summai bez nodokļa" },
        { valor: "izdalit", etiqueta: "Izdalīt PVN no summas ar nodokli" },
      ],
      porDefecto: "pieskaitit",
    },
    { id: "summa", tipo: "moneda", etiqueta: "Summa", min: 0, porDefecto: 100 },
    { id: "likme", tipo: "opcion-dato", dato: "lv.pvn", etiqueta: "PVN likme", porDefecto: "standarta" },
  ],
  calcular(e, v, { redondear }) {
    if (e.summa <= 0) throw new ErrorEntrada("Ievadiet summu, kas lielāka par nulli.", "summa");
    const likme = enMapa(v["lv.pvn"], e.likme);
    const bezPvn = e.virziens === "pieskaitit" ? e.summa : redondear(e.summa / (1 + likme / 100));
    const pvn = e.virziens === "pieskaitit" ? redondear((bezPvn * likme) / 100) : redondear(e.summa - bezPvn);
    return { pvn, bezPvn, arPvn: redondear(bezPvn + pvn), likme };
  },
  resultado: [
    { clave: "pvn", etiqueta: "PVN summa", formato: "moneda", destacada: true },
    { clave: "bezPvn", etiqueta: "Summa bez PVN", formato: "moneda" },
    { clave: "arPvn", etiqueta: "Summa ar PVN", formato: "moneda" },
    { clave: "likme", etiqueta: "Piemērotā likme", formato: "porcentaje" },
  ],
});
