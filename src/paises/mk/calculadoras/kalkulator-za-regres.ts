import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mk.kalkulator-za-regres",
  mercado: "mk",
  concepto: "propio",
  slug: "kalkulator-za-regres",
  estado: "publicado",
  requiere: { "mk.regres-javen": "numero" },
  campos: [
    {
      id: "osnovica",
      tipo: "moneda",
      etiqueta: "Просечна месечна нето-плата од претходната година",
      ayuda: "Ја објавува Државниот завод за статистика. Таа е основицата според членот 21 од договорот.",
      min: 0,
      porDefecto: 45000,
    },
    { id: "meseci", tipo: "entero", etiqueta: "Месеци работа кај истиот работодавач оваа година", min: 0, max: 12, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.osnovica <= 0) throw new ErrorEntrada("Внесете основица поголема од нула.", "osnovica");
    const imaPravo = e.meseci >= 6;
    return {
      regres: imaPravo ? redondear(porcentaje(e.osnovica, v["mk.regres-javen"])) : 0,
      observaciones: imaPravo ? [] : ["Правото бара најмалку шест месеци работа во календарската година кај ист работодавач."],
    };
  },
  resultado: [{ clave: "regres", etiqueta: "Регрес за годишен одмор, најмалку", formato: "moneda", destacada: true }],
});
