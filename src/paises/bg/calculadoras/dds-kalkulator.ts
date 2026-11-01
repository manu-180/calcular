import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bg.dds-kalkulator",
  mercado: "bg",
  concepto: "iva",
  slug: "dds-kalkulator",
  estado: "publicado",
  requiere: { "bg.dds": "mapa" },
  campos: [
    { id: "suma", tipo: "moneda", etiqueta: "Сума", min: 0, porDefecto: 100 },
    { id: "stavka", tipo: "opcion-dato", etiqueta: "Ставка на ДДС", dato: "bg.dds", porDefecto: "osnovna" },
    {
      id: "posoka",
      tipo: "opcion",
      etiqueta: "Сумата е",
      opciones: [
        { valor: "bez", etiqueta: "без ДДС: добавяне на данък" },
        { valor: "s", etiqueta: "с ДДС: отделяне на данък" },
      ],
      porDefecto: "bez",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.suma <= 0) throw new ErrorEntrada("Въведете сума над нула.", "suma");
    const s = enMapa(v["bg.dds"], e.stavka);
    const bez = e.posoka === "bez" ? e.suma : redondear(e.suma / (1 + s / 100));
    const sDds = e.posoka === "bez" ? redondear(e.suma * (1 + s / 100)) : e.suma;
    return { danak: redondear(sDds - bez), bez, sDds, stavka: s };
  },
  resultado: [
    { clave: "danak", etiqueta: "ДДС", formato: "moneda", destacada: true },
    { clave: "bez", etiqueta: "Сума без ДДС", formato: "moneda" },
    { clave: "sDds", etiqueta: "Сума с ДДС", formato: "moneda" },
    { clave: "stavka", etiqueta: "Ставка", formato: "porcentaje" },
  ],
});
