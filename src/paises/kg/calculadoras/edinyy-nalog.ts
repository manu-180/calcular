import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kg.edinyy-nalog",
  mercado: "kg",
  concepto: "regimen-simplificado",
  slug: "edinyy-nalog",
  estado: "publicado",
  requiere: { "kg.edinyy-nalog": "mapa" },
  campos: [
    { id: "vyruchka", tipo: "moneda", etiqueta: "Выручка за квартал", min: 0, porDefecto: 1500000 },
    { id: "vid", tipo: "opcion-dato", dato: "kg.edinyy-nalog", etiqueta: "Вид деятельности и форма оплаты", porDefecto: "prochee-beznal" },
  ],
  calcular(e, v, { redondear }) {
    if (e.vyruchka <= 0) throw new ErrorEntrada("Введите выручку больше нуля.", "vyruchka");
    const stavka = enMapa(v["kg.edinyy-nalog"], e.vid);
    const nalog = redondear((e.vyruchka * stavka) / 100);
    return { nalog, stavka, ostaetsya: redondear(e.vyruchka - nalog) };
  },
  resultado: [
    { clave: "nalog", etiqueta: "Единый налог за квартал", formato: "moneda", destacada: true },
    { clave: "stavka", etiqueta: "Ставка", formato: "porcentaje", decimales: 2 },
    { clave: "ostaetsya", etiqueta: "Выручка после налога", formato: "moneda" },
  ],
});
