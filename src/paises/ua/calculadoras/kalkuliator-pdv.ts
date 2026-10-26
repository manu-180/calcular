import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ua.kalkuliator-pdv",
  mercado: "ua",
  concepto: "iva",
  slug: "kalkuliator-pdv",
  estado: "publicado",
  requiere: { "ua.pdv": "mapa" },
  campos: [
    {
      id: "operatsiia",
      tipo: "opcion",
      etiqueta: "Що потрібно порахувати",
      opciones: [
        { valor: "dodaty", etiqueta: "Нарахувати ПДВ на суму без ПДВ" },
        { valor: "vydilyty", etiqueta: "Виділити ПДВ із суми з ПДВ" },
      ],
      porDefecto: "dodaty",
    },
    { id: "stavka", tipo: "opcion-dato", dato: "ua.pdv", etiqueta: "Ставка ПДВ", porDefecto: "osnovna" },
    { id: "suma", tipo: "moneda", etiqueta: "Сума", min: 0, porDefecto: 10000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.suma <= 0) throw new ErrorEntrada("Введіть суму, більшу за нуль.", "suma");
    const s = enMapa(v["ua.pdv"], e.stavka);
    let bezPdv: number;
    let pdv: number;
    if (e.operatsiia === "dodaty") {
      bezPdv = e.suma;
      pdv = redondear(porcentaje(e.suma, s));
    } else {
      pdv = redondear((e.suma * s) / (100 + s));
      bezPdv = redondear(e.suma - pdv);
    }
    return { zPdv: redondear(bezPdv + pdv), pdv, bezPdv, stavka: s };
  },
  resultado: [
    { clave: "zPdv", etiqueta: "Сума з ПДВ", formato: "moneda", destacada: true },
    { clave: "pdv", etiqueta: "ПДВ", formato: "moneda" },
    { clave: "bezPdv", etiqueta: "Сума без ПДВ", formato: "moneda" },
    { clave: "stavka", etiqueta: "Ставка", formato: "porcentaje", decimales: 0 },
  ],
});
