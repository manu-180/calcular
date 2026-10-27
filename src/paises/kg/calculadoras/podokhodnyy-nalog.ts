import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { parametry, TREBUET_RABOTNIK, uderzhaniya } from "../lib/zarplata";

export default definirCalculadora({
  id: "kg.podokhodnyy-nalog",
  mercado: "kg",
  concepto: "impuesto-renta",
  slug: "podokhodnyy-nalog",
  estado: "publicado",
  requiere: TREBUET_RABOTNIK,
  campos: [
    { id: "dokhod", tipo: "moneda", etiqueta: "Зарплата за месяц до удержаний", min: 0, porDefecto: 50000 },
    { id: "izhdiventsy", tipo: "entero", etiqueta: "Иждивенцев", min: 0, max: 20, porDefecto: 0 },
    { id: "vychet", tipo: "si-no", etiqueta: "Основное место работы (персональный вычет и вычет на иждивенцев)", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.dokhod <= 0) throw new ErrorEntrada("Введите доход больше нуля.", "dokhod");
    const m = uderzhaniya(e.dokhod, parametry(v, e.izhdiventsy, e.vychet));
    return {
      pn: m.pn,
      sf: m.sf,
      vychet: m.vychet,
      baza: m.baza,
      effektivnaya: (m.pn / e.dokhod) * 100,
      pnZaGod: redondear(m.pn * 12),
      stavka: v["kg.podokhodnyy-nalog"],
    };
  },
  resultado: [
    { clave: "pn", etiqueta: "Подоходный налог за месяц", formato: "moneda", destacada: true },
    { clave: "sf", etiqueta: "Вычет страховых взносов", formato: "moneda" },
    { clave: "vychet", etiqueta: "Персональный вычет и вычет на иждивенцев", formato: "moneda", ocultarSiCero: true },
    { clave: "baza", etiqueta: "Облагаемый доход", formato: "moneda" },
    { clave: "stavka", etiqueta: "Ставка налога", formato: "porcentaje" },
    { clave: "effektivnaya", etiqueta: "Налог в процентах от зарплаты", formato: "porcentaje", decimales: 2 },
    { clave: "pnZaGod", etiqueta: "Подоходный налог за год", formato: "moneda" },
  ],
});
