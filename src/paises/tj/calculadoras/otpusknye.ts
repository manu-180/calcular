import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// Трудовой кодекс: ст. 93 (минимум дней), ст. 112 (оплата не ниже среднего заработка).
export default definirCalculadora({
  id: "tj.otpusknye",
  mercado: "tj",
  concepto: "vacaciones",
  slug: "otpusknye",
  estado: "publicado",
  requiere: { "tj.otpusk-dney": "numero" },
  campos: [
    { id: "zarabotok", tipo: "moneda", etiqueta: "Средний дневной заработок", min: 0, porDefecto: 200 },
    { id: "dney", tipo: "entero", etiqueta: "Календарных дней отпуска", min: 1, max: 365, porDefecto: 24 },
  ],
  calcular(e, v, { redondear }) {
    if (e.zarabotok <= 0) throw new ErrorEntrada("Введите средний дневной заработок больше нуля.", "zarabotok");
    const observaciones: string[] = [];
    if (e.dney < v["tj.otpusk-dney"]) observaciones.push("Это меньше минимальной продолжительности ежегодного отпуска для большинства работников.");
    return { otpusknye: redondear(e.zarabotok * e.dney), minimumDney: v["tj.otpusk-dney"], observaciones };
  },
  resultado: [
    { clave: "otpusknye", etiqueta: "Отпускные", formato: "moneda", destacada: true },
    { clave: "minimumDney", etiqueta: "Минимальный ежегодный отпуск, дней", formato: "numero", decimales: 0 },
  ],
});
