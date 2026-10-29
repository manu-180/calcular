import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Черновик: ставка 12 % взята из справочной страницы, размер личного вычета не найден.
export default definirCalculadora({
  id: "tj.podokhodnyy-nalog",
  mercado: "tj",
  concepto: "impuesto-renta",
  slug: "podokhodnyy-nalog",
  estado: "borrador",
  requiere: {
    "tj.podokhodnyy-stavka": "numero",
    "tj.lichnyy-vychet": "numero",
  },
  campos: [{ id: "dokhod", tipo: "moneda", etiqueta: "Доход по основному месту работы за месяц", min: 0, porDefecto: 5000 }],
  calcular(e, v, { redondear }) {
    if (e.dokhod <= 0) throw new ErrorEntrada("Введите доход больше нуля.", "dokhod");
    const vychet = Math.min(e.dokhod, v["tj.lichnyy-vychet"]);
    const baza = redondear(e.dokhod - vychet);
    const nalog = redondear(porcentaje(baza, v["tj.podokhodnyy-stavka"]));
    return { vychet, baza, nalog, stavka: v["tj.podokhodnyy-stavka"], nalogZaGod: redondear(nalog * 12) };
  },
  resultado: [
    { clave: "nalog", etiqueta: "Подоходный налог за месяц", formato: "moneda", destacada: true },
    { clave: "baza", etiqueta: "Облагаемый доход", formato: "moneda" },
    { clave: "vychet", etiqueta: "Личный вычет", formato: "moneda", ocultarSiCero: true },
    { clave: "stavka", etiqueta: "Ставка", formato: "porcentaje" },
    { clave: "nalogZaGod", etiqueta: "Налог за год при таком доходе", formato: "moneda" },
  ],
});
