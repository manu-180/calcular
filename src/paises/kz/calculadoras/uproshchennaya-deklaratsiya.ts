import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { chislo } from "../lib/zarplata";

export default definirCalculadora({
  id: "kz.uproshchennaya-deklaratsiya",
  mercado: "kz",
  concepto: "regimen-simplificado",
  slug: "uproshchennaya-deklaratsiya",
  estado: "publicado",
  requiere: {
    "kz.mrp": "numero",
    "kz.uproshchenka-stavka": "numero",
    "kz.uproshchenka-korrektirovka": "numero",
    "kz.uproshchenka-predel-mrp": "numero",
  },
  campos: [
    { id: "dokhod", tipo: "moneda", etiqueta: "Доход за полугодие (без вычета расходов)", min: 0, porDefecto: 10000000 },
    { id: "svoyaStavka", tipo: "si-no", etiqueta: "Маслихат вашего региона изменил ставку", porDefecto: false },
    { id: "stavka", tipo: "porcentaje", etiqueta: "Ставка, установленная маслихатом", min: 0, max: 100, porDefecto: 3, visibleSi: { svoyaStavka: [true] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.dokhod <= 0) throw new ErrorEntrada("Введите доход больше нуля.", "dokhod");
    const bazovaya = v["kz.uproshchenka-stavka"];
    const k = v["kz.uproshchenka-korrektirovka"];
    let stavka = bazovaya;
    if (e.svoyaStavka && e.stavka !== null) {
      const min = (bazovaya * (100 - k)) / 100;
      const maks = (bazovaya * (100 + k)) / 100;
      if (e.stavka < min - 1e-9 || e.stavka > maks + 1e-9) {
        throw new ErrorEntrada(`Маслихат может установить ставку только от ${chislo(min)} до ${chislo(maks)} %.`, "stavka");
      }
      stavka = e.stavka;
    }
    const predel = v["kz.uproshchenka-predel-mrp"] * v["kz.mrp"];
    const observaciones: string[] = [];
    if (e.dokhod > predel) {
      observaciones.push(`Доход превышает предельный годовой доход для режима (${chislo(predel)} тенге). Нужно перейти на общеустановленный порядок.`);
    } else if (e.dokhod * 2 > predel) {
      observaciones.push(`Если во втором полугодии доход будет таким же, за год он превысит предел ${chislo(predel)} тенге.`);
    }
    const nalog = redondear((e.dokhod * stavka) / 100);
    return { nalog, stavka, predel, ostatok: redondear(e.dokhod - nalog), observaciones };
  },
  resultado: [
    { clave: "nalog", etiqueta: "Налог за полугодие (ИПН или КПН)", formato: "moneda", destacada: true },
    { clave: "stavka", etiqueta: "Ставка", formato: "porcentaje" },
    { clave: "ostatok", etiqueta: "Доход после налога", formato: "moneda" },
    { clave: "predel", etiqueta: "Предельный доход за год для режима", formato: "moneda" },
  ],
});
