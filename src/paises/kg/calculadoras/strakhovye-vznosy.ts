import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { chislo, tyiyny, vznosyRabotodatelya } from "../lib/zarplata";

export default definirCalculadora({
  id: "kg.strakhovye-vznosy",
  mercado: "kg",
  concepto: "aportes-seguridad-social",
  slug: "strakhovye-vznosy",
  estado: "publicado",
  requiere: {
    "kg.sf-rabotnik": "numero",
    "kg.sf-rabotodatel": "mapa",
    "kg.sf-predelnaya-baza": "numero",
    "kg.sf-minimum-dolya": "mapa",
  },
  campos: [
    { id: "zarplata", tipo: "moneda", etiqueta: "Начисленная зарплата за месяц", min: 0, porDefecto: 50000 },
    { id: "kategoriya", tipo: "opcion-dato", dato: "kg.sf-rabotodatel", etiqueta: "Работодатель", porDefecto: "predprinimatel" },
    {
      id: "srednyaya",
      tipo: "moneda",
      etiqueta: "Среднемесячная зарплата по району на этот год (необязательно)",
      min: 0,
      requerido: false,
      ayuda: "Нужна, чтобы проверить минимальные взносы работодателя. Ее публикует Нацстатком по районам и городам.",
    },
  ],
  calcular(e, v) {
    if (e.zarplata <= 0) throw new ErrorEntrada("Введите зарплату больше нуля.", "zarplata");
    const predel = v["kg.sf-predelnaya-baza"];
    const stavka = enMapa(v["kg.sf-rabotodatel"], e.kategoriya);
    const r = vznosyRabotodatelya(e.zarplata, stavka, predel, enMapa(v["kg.sf-minimum-dolya"], e.kategoriya), e.srednyaya);
    const sfRabotnik = tyiyny((r.baza * v["kg.sf-rabotnik"]) / 100);
    const observaciones: string[] = [];
    if (e.zarplata > predel) observaciones.push(`Взносы считаются с предельной базы ${chislo(predel)} сомов, а не со всей зарплаты.`);
    if (r.minimumPrimenen) observaciones.push("Работодатель платит минимальную сумму взносов, рассчитанную от среднемесячной зарплаты по району. Взносы работника считаются с фактической зарплаты.");
    return {
      vsego: tyiyny(sfRabotnik + r.sfRabotodatel),
      sfRabotnik,
      sfRabotodatel: r.sfRabotodatel,
      stavkaRabotodatelya: stavka,
      baza: r.baza,
      observaciones,
    };
  },
  resultado: [
    { clave: "vsego", etiqueta: "Всего страховых взносов за месяц", formato: "moneda", destacada: true },
    { clave: "sfRabotnik", etiqueta: "Удерживается из зарплаты работника", formato: "moneda" },
    { clave: "sfRabotodatel", etiqueta: "Платит работодатель сверх зарплаты", formato: "moneda" },
    { clave: "stavkaRabotodatelya", etiqueta: "Ставка работодателя", formato: "porcentaje" },
    { clave: "baza", etiqueta: "База для взносов", formato: "moneda" },
  ],
});
