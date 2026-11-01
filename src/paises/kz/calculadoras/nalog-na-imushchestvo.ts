import { aplicarEscala, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kz.nalog-na-imushchestvo",
  mercado: "kz",
  concepto: "propio",
  slug: "nalog-na-imushchestvo",
  estado: "publicado",
  requiere: { "kz.nalog-na-imushchestvo": "escala" },
  campos: [
    {
      id: "stoimost",
      tipo: "moneda",
      etiqueta: "Стоимость квартиры, дома или другого строения для налогообложения",
      min: 0,
      porDefecto: 15000000,
      ayuda: "Ее определяет Государственная корпорация по формуле Налогового кодекса.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.stoimost <= 0) throw new ErrorEntrada("Введите стоимость больше нуля.", "stoimost");
    const shkala = v["kz.nalog-na-imushchestvo"];
    const nalog = redondear(aplicarEscala(shkala, e.stoimost));
    let stavka = shkala[0].tasa;
    for (const f of shkala) if (e.stoimost > f.desde) stavka = f.tasa;
    return { nalog, stavka, srednyaya: (nalog / e.stoimost) * 100 };
  },
  resultado: [
    { clave: "nalog", etiqueta: "Налог на имущество за год", formato: "moneda", destacada: true },
    { clave: "stavka", etiqueta: "Ставка для суммы сверх нижней границы", formato: "porcentaje", decimales: 2 },
    { clave: "srednyaya", etiqueta: "Налог от стоимости", formato: "porcentaje", decimales: 3 },
  ],
});
