import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { chislo } from "../lib/zarplata";

export default definirCalculadora({
  id: "kz.sverkhurochnye",
  mercado: "kz",
  concepto: "horas-extra",
  slug: "sverkhurochnye",
  estado: "publicado",
  requiere: {
    "kz.sverkhurochnye-koeffitsient": "numero",
    "kz.sverkhurochnye-limity": "mapa",
  },
  campos: [
    { id: "oklad", tipo: "moneda", etiqueta: "Оклад за месяц", min: 0, porDefecto: 500000 },
    { id: "normaChasov", tipo: "numero", etiqueta: "Норма рабочих часов в этом месяце", min: 1, max: 300, porDefecto: 168 },
    { id: "chasy", tipo: "numero", etiqueta: "Часов сверхурочно, в выходной, праздник или ночью", min: 0, max: 300, porDefecto: 10 },
    { id: "koeffitsient", tipo: "numero", etiqueta: "Коэффициент оплаты по договору", min: 1, max: 10, porDefecto: 1.5, ayuda: "Трудовой или коллективный договор может установить больше, но не меньше полуторного размера." },
  ],
  calcular(e, v, { redondear }) {
    if (e.oklad <= 0) throw new ErrorEntrada("Введите оклад больше нуля.", "oklad");
    if (e.chasy <= 0) throw new ErrorEntrada("Введите количество часов больше нуля.", "chasy");
    const minK = v["kz.sverkhurochnye-koeffitsient"];
    if (e.koeffitsient < minK) throw new ErrorEntrada(`По Трудовому кодексу коэффициент не может быть меньше ${chislo(minK)}.`, "koeffitsient");
    const stavkaChasa = e.oklad / e.normaChasov;
    const doplata = redondear(stavkaChasa * e.chasy * e.koeffitsient);
    const limitMesyats = enMapa(v["kz.sverkhurochnye-limity"], "mesyats");
    const observaciones: string[] = [];
    if (e.chasy > limitMesyats) {
      observaciones.push(`По Трудовому кодексу сверхурочно можно работать не больше ${chislo(enMapa(v["kz.sverkhurochnye-limity"], "sutki"))} ч в сутки и ${chislo(limitMesyats)} ч в месяц.`);
    }
    return { doplata, stavkaChasa: redondear(stavkaChasa), itogo: redondear(e.oklad + doplata), observaciones };
  },
  resultado: [
    { clave: "doplata", etiqueta: "Оплата этих часов", formato: "moneda", destacada: true },
    { clave: "stavkaChasa", etiqueta: "Часовая ставка", formato: "moneda" },
    { clave: "itogo", etiqueta: "Оклад вместе с оплатой часов", formato: "moneda" },
  ],
});
