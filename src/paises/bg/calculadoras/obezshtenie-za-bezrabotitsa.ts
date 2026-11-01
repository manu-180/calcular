import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bg.obezshtenie-za-bezrabotitsa",
  mercado: "bg",
  concepto: "propio",
  slug: "obezshtenie-za-bezrabotitsa",
  estado: "publicado",
  requiere: { "bg.bezrabotitsa-protsent": "numero", "bg.bezrabotitsa-min": "numero", "bg.bezrabotitsa-maks": "numero", "bg.bezrabotitsa-srok": "mapa", "bg.bezrabotitsa-min-srok": "numero" },
  campos: [
    { id: "dohod", tipo: "moneda", etiqueta: "Среден брутен месечен доход за последните 24 месеца", min: 0, porDefecto: 1500 },
    { id: "dniMesets", tipo: "entero", etiqueta: "Работни дни средно в месец", min: 15, max: 23, porDefecto: 21 },
    { id: "stazh", tipo: "opcion-dato", etiqueta: "Осигурителен стаж за безработица след 2001 г.", dato: "bg.bezrabotitsa-srok", porDefecto: "do7" },
    { id: "sobstveno", tipo: "si-no", etiqueta: "Договорът е прекратен по Ваше желание, с Ваше съгласие или по Ваша вина", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.dohod <= 0) throw new ErrorEntrada("Въведете доход над нула.", "dohod");
    const min = v["bg.bezrabotitsa-min"];
    const maks = v["bg.bezrabotitsa-maks"];
    const izchisleno = redondear(((e.dohod / e.dniMesets) * v["bg.bezrabotitsa-protsent"]) / 100);
    const den = e.sobstveno ? min : Math.min(maks, Math.max(min, izchisleno));
    const mesetsi = e.sobstveno ? v["bg.bezrabotitsa-min-srok"] : enMapa(v["bg.bezrabotitsa-srok"], e.stazh);
    const mesechno = redondear(den * e.dniMesets);
    return { mesechno, den, mesetsi, obshto: redondear(mesechno * mesetsi) };
  },
  resultado: [
    { clave: "mesechno", etiqueta: "Обезщетение на месец", formato: "moneda", destacada: true },
    { clave: "den", etiqueta: "Дневно обезщетение", formato: "moneda" },
    { clave: "mesetsi", etiqueta: "Срок", formato: "meses" },
    { clave: "obshto", etiqueta: "Общо за срока", formato: "moneda" },
  ],
});
