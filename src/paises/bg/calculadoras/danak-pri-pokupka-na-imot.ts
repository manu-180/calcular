import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bg.danak-pri-pokupka-na-imot",
  mercado: "bg",
  concepto: "propio",
  slug: "danak-pri-pokupka-na-imot",
  estado: "publicado",
  requiere: { "bg.danak-pridobivane-sofia": "numero" },
  campos: [
    { id: "otsenka", tipo: "moneda", etiqueta: "Оценка на имота", min: 0, porDefecto: 100000 },
    {
      id: "obshtina",
      tipo: "opcion",
      etiqueta: "Община",
      opciones: [
        { valor: "sofia", etiqueta: "Столична община" },
        { valor: "druga", etiqueta: "Друга община (въведете ставката)" },
      ],
      porDefecto: "sofia",
    },
    { id: "stavka", tipo: "porcentaje", etiqueta: "Ставка на Вашата община", min: 0, max: 10, porDefecto: 2.5, visibleSi: { obshtina: ["druga"] }, ayuda: "Вижте наредбата за местните данъци на съответната община." },
  ],
  calcular(e, v, { redondear }) {
    if (e.otsenka <= 0) throw new ErrorEntrada("Въведете оценка над нула.", "otsenka");
    const stavka = e.obshtina === "sofia" ? v["bg.danak-pridobivane-sofia"] : (e.stavka ?? 0);
    return { danak: redondear((e.otsenka * stavka) / 100), stavka };
  },
  resultado: [
    { clave: "danak", etiqueta: "Данък при придобиване", formato: "moneda", destacada: true },
    { clave: "stavka", etiqueta: "Ставка", formato: "porcentaje", decimales: 2 },
  ],
});
