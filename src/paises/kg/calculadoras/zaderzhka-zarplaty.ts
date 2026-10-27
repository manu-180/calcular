import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kg.zaderzhka-zarplaty",
  mercado: "kg",
  concepto: "propio",
  slug: "zaderzhka-zarplaty",
  estado: "publicado",
  requiere: { "kg.zaderzhka-zarplaty": "numero" },
  campos: [
    { id: "summa", tipo: "moneda", etiqueta: "Невыплаченная сумма (зарплата, отпускные или расчет при увольнении)", min: 0, porDefecto: 50000 },
    { id: "dney", tipo: "entero", etiqueta: "Календарных дней задержки", min: 1, max: 3650, porDefecto: 10 },
  ],
  calcular(e, v, { redondear }) {
    if (e.summa <= 0) throw new ErrorEntrada("Введите сумму больше нуля.", "summa");
    if (e.dney <= 0) throw new ErrorEntrada("Укажите хотя бы один день задержки.", "dney");
    const zaDen = redondear((e.summa * v["kg.zaderzhka-zarplaty"]) / 100);
    const kompensatsiya = redondear((e.summa * v["kg.zaderzhka-zarplaty"] * e.dney) / 100);
    return { kompensatsiya, zaDen, vsego: redondear(e.summa + kompensatsiya) };
  },
  resultado: [
    { clave: "kompensatsiya", etiqueta: "Компенсация за задержку", formato: "moneda", destacada: true },
    { clave: "zaDen", etiqueta: "За один день", formato: "moneda" },
    { clave: "vsego", etiqueta: "Всего к выплате", formato: "moneda" },
  ],
});
