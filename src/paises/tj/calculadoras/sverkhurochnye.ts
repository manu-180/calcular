import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// Черновик: норма 40 часов, двойная оплата и предел 120 часов взяты из пересказа Трудового кодекса.
export default definirCalculadora({
  id: "tj.sverkhurochnye",
  mercado: "tj",
  concepto: "horas-extra",
  slug: "sverkhurochnye",
  estado: "borrador",
  requiere: {
    "tj.nedelya-chasov": "numero",
    "tj.sverkhurochnye-mnozhitel": "numero",
    "tj.sverkhurochnye-chasov-v-god": "numero",
  },
  campos: [
    { id: "oklad", tipo: "moneda", etiqueta: "Оклад за месяц", min: 0, porDefecto: 5000 },
    { id: "chasy", tipo: "numero", etiqueta: "Сверхурочных часов за месяц", min: 0, max: 200, porDefecto: 10 },
  ],
  calcular(e, v, { redondear }) {
    if (e.oklad <= 0) throw new ErrorEntrada("Введите оклад больше нуля.", "oklad");
    const chasovVMesyatse = (v["tj.nedelya-chasov"] * 52) / 12;
    const stavkaChasa = redondear(e.oklad / chasovVMesyatse);
    const observaciones: string[] = [];
    if (e.chasy * 12 > v["tj.sverkhurochnye-chasov-v-god"]) {
      observaciones.push(`При таком темпе за год наберется больше ${v["tj.sverkhurochnye-chasov-v-god"]} часов, а это предел для одного работника.`);
    }
    return { stavkaChasa, doplata: redondear(stavkaChasa * e.chasy * v["tj.sverkhurochnye-mnozhitel"]), mnozhitel: v["tj.sverkhurochnye-mnozhitel"], observaciones };
  },
  resultado: [
    { clave: "doplata", etiqueta: "Оплата сверхурочных", formato: "moneda", destacada: true },
    { clave: "stavkaChasa", etiqueta: "Обычная ставка за час", formato: "moneda" },
    { clave: "mnozhitel", etiqueta: "Множитель оплаты", formato: "numero", decimales: 1 },
  ],
});
