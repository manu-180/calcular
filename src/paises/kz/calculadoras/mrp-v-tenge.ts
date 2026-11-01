import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kz.mrp-v-tenge",
  mercado: "kz",
  concepto: "conversor-unidad",
  slug: "mrp-v-tenge",
  estado: "publicado",
  requiere: {
    "kz.mrp": "numero",
    "kz.mzp": "numero",
    "kz.prozhitochnyy-minimum": "numero",
  },
  campos: [
    {
      id: "napravlenie",
      tipo: "opcion",
      etiqueta: "Что перевести",
      opciones: [
        { valor: "v-tenge", etiqueta: "МРП в тенге" },
        { valor: "v-mrp", etiqueta: "Тенге в МРП" },
      ],
      porDefecto: "v-tenge",
    },
    { id: "kolichestvo", tipo: "numero", etiqueta: "Количество (МРП или тенге)", min: 0, porDefecto: 10 },
  ],
  calcular(e, v, { redondear }) {
    if (e.kolichestvo <= 0) throw new ErrorEntrada("Введите число больше нуля.", "kolichestvo");
    const mrp = v["kz.mrp"];
    const vTenge = e.napravlenie === "v-tenge";
    return {
      tenge: vTenge ? redondear(e.kolichestvo * mrp) : e.kolichestvo,
      mrpKolichestvo: vTenge ? e.kolichestvo : redondear(e.kolichestvo / mrp),
      mrp,
      mzp: v["kz.mzp"],
      prozhitochnyy: v["kz.prozhitochnyy-minimum"],
    };
  },
  resultado: [
    { clave: "tenge", etiqueta: "Сумма в тенге", formato: "moneda", destacada: true },
    { clave: "mrpKolichestvo", etiqueta: "Сумма в МРП", formato: "numero", decimales: 2 },
    { clave: "mrp", etiqueta: "Действующий МРП", formato: "moneda" },
    { clave: "mzp", etiqueta: "Действующая МЗП", formato: "moneda" },
    { clave: "prozhitochnyy", etiqueta: "Прожиточный минимум", formato: "moneda" },
  ],
});
