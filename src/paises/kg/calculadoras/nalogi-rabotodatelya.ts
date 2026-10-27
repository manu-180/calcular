import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { parametry, TREBUET_RABOTNIK, tyiyny, uderzhaniya, vznosyRabotodatelya } from "../lib/zarplata";

export default definirCalculadora({
  id: "kg.nalogi-rabotodatelya",
  mercado: "kg",
  concepto: "costo-empleador",
  slug: "nalogi-rabotodatelya",
  estado: "publicado",
  requiere: { ...TREBUET_RABOTNIK, "kg.sf-rabotodatel": "mapa", "kg.sf-minimum-dolya": "mapa" },
  campos: [
    { id: "zarplata", tipo: "moneda", etiqueta: "Начисленная зарплата работника за месяц", min: 0, porDefecto: 50000 },
    { id: "kategoriya", tipo: "opcion-dato", dato: "kg.sf-rabotodatel", etiqueta: "Работодатель", porDefecto: "predprinimatel" },
    {
      id: "srednyaya",
      tipo: "moneda",
      etiqueta: "Среднемесячная зарплата по району на этот год (необязательно)",
      min: 0,
      requerido: false,
      ayuda: "Если зарплата ниже нее, работодатель доплачивает подоходный налог и минимальные взносы.",
    },
  ],
  calcular(e, v) {
    if (e.zarplata <= 0) throw new ErrorEntrada("Введите зарплату больше нуля.", "zarplata");
    const m = uderzhaniya(e.zarplata, parametry(v, 0, true));
    const r = vznosyRabotodatelya(e.zarplata, enMapa(v["kg.sf-rabotodatel"], e.kategoriya), v["kg.sf-predelnaya-baza"], enMapa(v["kg.sf-minimum-dolya"], e.kategoriya), e.srednyaya);
    // Налоговый кодекс, статья 200, часть 5: если облагаемый доход меньше среднемесячной зарплаты,
    // налог с разницы работодатель платит из своих средств.
    const doplataPn = e.srednyaya !== null && e.srednyaya > m.baza ? tyiyny(((e.srednyaya - m.baza) * v["kg.podokhodnyy-nalog"]) / 100) : 0;
    const vsego = tyiyny(e.zarplata + r.sfRabotodatel + doplataPn);
    const observaciones: string[] = [];
    if (e.srednyaya === null) observaciones.push("Без среднемесячной зарплаты по району калькулятор не проверяет минимальные взносы и доплату подоходного налога.");
    return {
      vsego,
      sfRabotodatel: r.sfRabotodatel,
      doplataPn,
      zarplata: e.zarplata,
      nettoRabotnika: m.netto,
      uderzhanoURabotnika: tyiyny(m.sf + m.pn),
      dolya: (m.netto / vsego) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "vsego", etiqueta: "Расходы работодателя за месяц", formato: "moneda", destacada: true },
    { clave: "zarplata", etiqueta: "Начисленная зарплата", formato: "moneda" },
    { clave: "sfRabotodatel", etiqueta: "Страховые взносы работодателя", formato: "moneda" },
    { clave: "doplataPn", etiqueta: "Подоходный налог за счет работодателя", formato: "moneda", ocultarSiCero: true },
    { clave: "uderzhanoURabotnika", etiqueta: "Удерживается у работника (взносы и налог)", formato: "moneda" },
    { clave: "nettoRabotnika", etiqueta: "Работник получает на руки", formato: "moneda" },
    { clave: "dolya", etiqueta: "Доля на руки в расходах работодателя", formato: "porcentaje", decimales: 1 },
  ],
});
