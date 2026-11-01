import { definirCalculadora, ErrorEntrada, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "mk.kalkulator-za-godishen-odmor",
  mercado: "mk",
  concepto: "vacaciones",
  slug: "kalkulator-za-godishen-odmor",
  estado: "publicado",
  requiere: { "mk.godishen-odmor": "mapa" },
  campos: [
    { id: "denovi", tipo: "entero", etiqueta: "Денови годишен одмор во договорот", min: 20, max: 26, porDefecto: 20 },
    { id: "meseci", tipo: "entero", etiqueta: "Непрекинати месеци работа кај работодавачот", min: 0, porDefecto: 12 },
    {
      id: "dopolnitelni",
      tipo: "si-no",
      etiqueta: "Имате право на дополнителни денови",
      ayuda: "Повозрасен работник, инвалид, работник со најмалку 60 % телесно оштетување или работник што негува дете со телесен или душевен недостаток.",
      porDefecto: false,
    },
  ],
  calcular(e, v) {
    const o = v["mk.godishen-odmor"];
    if (e.denovi < enMapa(o, "minimum") || e.denovi > enMapa(o, "maksimum")) throw new ErrorEntrada("Годишниот одмор е од 20 до 26 работни денови.", "denovi");
    const celo = e.denovi + (e.dopolnitelni ? enMapa(o, "dopolnitelni") : 0);
    const imaPravo = e.meseci >= 6;
    const proporcionalni = Math.min(e.meseci * enMapa(o, "po-mesec"), celo);
    return {
      denovi: imaPravo ? celo : proporcionalni,
      celo,
      proporcionalni,
      observaciones: imaPravo ? [] : ["Цел одмор се стекнува по шест месеци непрекината работа. Пред тоа важат пропорционалните денови."],
    };
  },
  resultado: [
    { clave: "denovi", etiqueta: "Денови годишен одмор", formato: "dias", destacada: true },
    { clave: "celo", etiqueta: "Цел годишен одмор", formato: "dias" },
    { clave: "proporcionalni", etiqueta: "Пропорционален дел по месеци", formato: "dias" },
  ],
});
