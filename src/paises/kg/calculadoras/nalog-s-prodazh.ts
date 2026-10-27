import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kg.nalog-s-prodazh",
  mercado: "kg",
  concepto: "propio",
  slug: "nalog-s-prodazh",
  estado: "publicado",
  requiere: { "kg.nalog-s-prodazh": "mapa" },
  campos: [
    { id: "vyruchka", tipo: "moneda", etiqueta: "Выручка без НДС и налога с продаж", min: 0, porDefecto: 1000000 },
    { id: "vid", tipo: "opcion-dato", dato: "kg.nalog-s-prodazh", etiqueta: "Вид деятельности", porDefecto: "prochee-nds" },
  ],
  calcular(e, v, { redondear }) {
    if (e.vyruchka <= 0) throw new ErrorEntrada("Введите выручку больше нуля.", "vyruchka");
    const stavka = enMapa(v["kg.nalog-s-prodazh"], e.vid);
    const nalog = redondear((e.vyruchka * stavka) / 100);
    return { nalog, stavka, sNalogom: redondear(e.vyruchka + nalog) };
  },
  resultado: [
    { clave: "nalog", etiqueta: "Налог с продаж", formato: "moneda", destacada: true },
    { clave: "stavka", etiqueta: "Ставка", formato: "porcentaje" },
    { clave: "sNalogom", etiqueta: "Выручка с налогом с продаж", formato: "moneda" },
  ],
});
