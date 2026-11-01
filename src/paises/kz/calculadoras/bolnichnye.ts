import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kz.bolnichnye",
  mercado: "kz",
  concepto: "propio",
  slug: "bolnichnye",
  estado: "publicado",
  requiere: {
    "kz.mrp": "numero",
    "kz.bolnichnye-limit-mrp": "numero",
  },
  campos: [
    { id: "zarabotok", tipo: "moneda", etiqueta: "Начисленная зарплата за 12 месяцев до болезни", min: 0, porDefecto: 3000000 },
    { id: "dneyRaboty", tipo: "entero", etiqueta: "Рабочих дней за эти 12 месяцев (по балансу рабочего времени)", min: 1, max: 366, porDefecto: 247 },
    { id: "dneyBolezni", tipo: "entero", etiqueta: "Рабочих дней по больничному листу в этом месяце", min: 1, max: 31, porDefecto: 5 },
  ],
  calcular(e, v, { redondear }) {
    if (e.zarabotok <= 0) throw new ErrorEntrada("Введите зарплату за 12 месяцев больше нуля.", "zarabotok");
    const sredniy = redondear(e.zarabotok / e.dneyRaboty);
    const raschetnoe = redondear(sredniy * e.dneyBolezni);
    const limit = redondear(v["kz.bolnichnye-limit-mrp"] * v["kz.mrp"]);
    const posobie = Math.min(raschetnoe, limit);
    const observaciones: string[] = [];
    if (raschetnoe > limit) observaciones.push("Пособие за месяц ограничено пределом. Если больничный длится несколько месяцев, предел применяется к каждому месяцу отдельно.");
    return { posobie, sredniy, raschetnoe, limit, observaciones };
  },
  resultado: [
    { clave: "posobie", etiqueta: "Пособие по временной нетрудоспособности", formato: "moneda", destacada: true },
    { clave: "sredniy", etiqueta: "Средний дневной заработок", formato: "moneda" },
    { clave: "raschetnoe", etiqueta: "Пособие без ограничения", formato: "moneda" },
    { clave: "limit", etiqueta: "Наибольшее пособие за месяц", formato: "moneda" },
  ],
});
