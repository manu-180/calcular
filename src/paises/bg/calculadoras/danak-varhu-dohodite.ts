import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bg.danak-varhu-dohodite",
  mercado: "bg",
  concepto: "impuesto-renta",
  slug: "danak-varhu-dohodite",
  estado: "publicado",
  requiere: { "bg.danak-dohodi": "numero" },
  campos: [
    { id: "dohod", tipo: "moneda", etiqueta: "Брутен доход от трудови правоотношения", min: 0, porDefecto: 18000 },
    { id: "vnoski", tipo: "moneda", etiqueta: "Удържани осигуровки за Ваша сметка", min: 0, porDefecto: 2480.4 },
    { id: "udarzhan", tipo: "moneda", etiqueta: "Вече удържан данък (ако има)", min: 0, porDefecto: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.dohod <= 0) throw new ErrorEntrada("Въведете доход над нула.", "dohod");
    if (e.vnoski > e.dohod) throw new ErrorEntrada("Осигуровките не могат да са повече от дохода.", "vnoski");
    const osnova = redondear(e.dohod - e.vnoski);
    const danak = redondear((osnova * v["bg.danak-dohodi"]) / 100);
    return { danak, osnova, ostatak: redondear(danak - (e.udarzhan ?? 0)), sled: redondear(e.dohod - e.vnoski - danak) };
  },
  resultado: [
    { clave: "danak", etiqueta: "Данък върху дохода", formato: "moneda", destacada: true },
    { clave: "osnova", etiqueta: "Данъчна основа", formato: "moneda" },
    { clave: "ostatak", etiqueta: "Разлика след вече удържания данък", formato: "moneda" },
    { clave: "sled", etiqueta: "Остава след осигуровки и данък", formato: "moneda" },
  ],
});
