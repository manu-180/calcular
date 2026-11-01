import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kg.bolnichnye",
  mercado: "kg",
  concepto: "propio",
  slug: "bolnichnye",
  estado: "publicado",
  requiere: {
    "kg.rp": "numero",
    "kg.bolnichnye-stazh": "mapa",
    "kg.bolnichnye-dney-rabotodatel": "numero",
    "kg.bolnichnye-rp": "numero",
    "kg.bolnichnye-porog-rp": "numero",
  },
  campos: [
    { id: "zarabotok", tipo: "moneda", etiqueta: "Начисленная зарплата за 3 месяца до болезни", min: 0, porDefecto: 150000 },
    { id: "rabDney3", tipo: "entero", etiqueta: "Рабочих дней в этих 3 месяцах", min: 1, max: 80, porDefecto: 63 },
    { id: "dneyBolezni", tipo: "entero", etiqueta: "Рабочих дней по больничному листу", min: 1, max: 200, porDefecto: 15 },
    { id: "stazh", tipo: "opcion-dato", dato: "kg.bolnichnye-stazh", etiqueta: "Общий трудовой стаж", porDefecto: "bolee-8" },
    {
      id: "polnostyu",
      tipo: "si-no",
      etiqueta: "Положено 100 % за все дни (трудовое увечье, высокогорье, онкология, донор, госнаграда и другие случаи из пункта 37)",
      porDefecto: false,
    },
    { id: "rabDneyMesyatsa", tipo: "entero", etiqueta: "Рабочих дней в месяце болезни", min: 1, max: 31, porDefecto: 21, ayuda: "Нужно для оплаты с 11-го рабочего дня, которая идет из расчета в месяц." },
  ],
  calcular(e, v, { redondear }) {
    if (e.zarabotok <= 0) throw new ErrorEntrada("Введите зарплату за 3 месяца больше нуля.", "zarabotok");
    const sredniy = redondear(e.zarabotok / e.rabDney3);
    const vMesyats = e.zarabotok / 3;
    const nizkaya = vMesyats <= v["kg.bolnichnye-porog-rp"] * v["kg.rp"];
    const pervye = v["kg.bolnichnye-dney-rabotodatel"];
    if (e.polnostyu || nizkaya) {
      const posobie = redondear(sredniy * e.dneyBolezni);
      const observaciones = nizkaya && !e.polnostyu ? ["Зарплата не больше 100 расчетных показателей в месяц, поэтому больничный оплачивается в размере 100 % среднего заработка за все дни."] : [];
      return { posobie, sredniy, zaPervye: posobie, zaOstalnye: 0, protsent: 100, observaciones };
    }
    const protsent = enMapa(v["kg.bolnichnye-stazh"], e.stazh);
    const zaPervye = redondear((sredniy * Math.min(e.dneyBolezni, pervye) * protsent) / 100);
    const vDen = redondear((v["kg.bolnichnye-rp"] * v["kg.rp"]) / e.rabDneyMesyatsa);
    const zaOstalnye = redondear(vDen * Math.max(0, e.dneyBolezni - pervye));
    return { posobie: redondear(zaPervye + zaOstalnye), sredniy, zaPervye, zaOstalnye, protsent, observaciones: [] };
  },
  resultado: [
    { clave: "posobie", etiqueta: "Пособие по временной нетрудоспособности", formato: "moneda", destacada: true },
    { clave: "zaPervye", etiqueta: "За первые 10 рабочих дней (или все дни при полной оплате)", formato: "moneda" },
    { clave: "zaOstalnye", etiqueta: "С 11-го рабочего дня", formato: "moneda", ocultarSiCero: true },
    { clave: "protsent", etiqueta: "Процент среднего заработка за первые дни", formato: "porcentaje" },
    { clave: "sredniy", etiqueta: "Средний дневной заработок", formato: "moneda" },
  ],
});
