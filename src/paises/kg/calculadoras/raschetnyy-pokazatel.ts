import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kg.raschetnyy-pokazatel",
  mercado: "kg",
  concepto: "conversor-unidad",
  slug: "raschetnyy-pokazatel",
  estado: "publicado",
  requiere: { "kg.rp": "numero" },
  campos: [
    {
      id: "napravlenie",
      tipo: "opcion",
      etiqueta: "Перевести",
      opciones: [
        { valor: "v-somy", etiqueta: "Расчетные показатели в сомы" },
        { valor: "v-rp", etiqueta: "Сомы в расчетные показатели" },
      ],
      porDefecto: "v-somy",
    },
    { id: "kolichestvo", tipo: "numero", etiqueta: "Количество", min: 0, porDefecto: 10 },
  ],
  calcular(e, v, { redondear }) {
    if (e.kolichestvo <= 0) throw new ErrorEntrada("Введите количество больше нуля.", "kolichestvo");
    const rp = v["kg.rp"];
    const vSomy = e.napravlenie === "v-somy";
    return {
      somy: vSomy ? redondear(e.kolichestvo * rp) : e.kolichestvo,
      pokazateli: vSomy ? e.kolichestvo : e.kolichestvo / rp,
      rp,
    };
  },
  resultado: [
    { clave: "somy", etiqueta: "Сумма в сомах", formato: "moneda", destacada: true },
    { clave: "pokazateli", etiqueta: "Расчетных показателей", formato: "numero", decimales: 2 },
    { clave: "rp", etiqueta: "Размер расчетного показателя", formato: "moneda" },
  ],
});
