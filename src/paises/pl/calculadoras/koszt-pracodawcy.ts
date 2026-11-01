import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { doGroszy } from "../lib/podatki";

export default definirCalculadora({
  id: "pl.koszt-pracodawcy",
  mercado: "pl",
  concepto: "costo-empleador",
  slug: "koszt-pracodawcy",
  estado: "publicado",
  requiere: {
    "pl.skladki-platnika": "mapa",
    "pl.skladka-wypadkowa": "numero",
    "pl.fundusze": "mapa",
  },
  campos: [
    { id: "brutto", tipo: "moneda", etiqueta: "Wynagrodzenie brutto pracownika", min: 0, porDefecto: 8000 },
    {
      id: "wypadkowa",
      tipo: "porcentaje",
      etiqueta: "Stopa składki wypadkowej",
      min: 0.4,
      max: 8.12,
      requerido: false,
      ayuda: "Zostaw puste, żeby przyjąć stawkę, której ZUS używa w swoich wyliczeniach. Stawka Twojej firmy jest w informacji z ZUS.",
    },
    { id: "fpFs", tipo: "si-no", etiqueta: "Płacisz składki na Fundusz Pracy i Fundusz Solidarnościowy", porDefecto: true, ayuda: "Nie płaci się ich między innymi za kobiety po 55. i mężczyzn po 60. roku życia." },
    { id: "fgsp", tipo: "si-no", etiqueta: "Płacisz składkę na Fundusz Gwarantowanych Świadczeń Pracowniczych", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.brutto <= 0) throw new ErrorEntrada("Wpisz wynagrodzenie brutto większe od zera.", "brutto");
    const p = v["pl.skladki-platnika"];
    const f = v["pl.fundusze"];
    const stopaWypadkowa = e.wypadkowa ?? v["pl.skladka-wypadkowa"];
    const emerytalne = doGroszy((e.brutto * enMapa(p, "emerytalne")) / 100);
    const rentowe = doGroszy((e.brutto * enMapa(p, "rentowe")) / 100);
    const wypadkowe = doGroszy((e.brutto * stopaWypadkowa) / 100);
    const fp = e.fpFs ? doGroszy((e.brutto * enMapa(f, "fp")) / 100) : 0;
    const fs = e.fpFs ? doGroszy((e.brutto * enMapa(f, "fs")) / 100) : 0;
    const fgsp = e.fgsp ? doGroszy((e.brutto * enMapa(f, "fgsp")) / 100) : 0;
    const narzut = redondear(emerytalne + rentowe + wypadkowe + fp + fs + fgsp);
    return {
      koszt: redondear(e.brutto + narzut),
      narzut,
      procent: (narzut / e.brutto) * 100,
      emerytalne,
      rentowe,
      wypadkowe,
      stopaWypadkowa,
      fp,
      fs,
      fgsp,
      observaciones: ["Składki emerytalną i rentową płaci się do rocznego limitu 30-krotności prognozowanego wynagrodzenia. Kalkulator liczy jeden miesiąc bez tego limitu i bez wpłat do PPK."],
    };
  },
  resultado: [
    { clave: "koszt", etiqueta: "Całkowity koszt pracodawcy", formato: "moneda", destacada: true },
    { clave: "narzut", etiqueta: "Składki płacone przez pracodawcę", formato: "moneda" },
    { clave: "procent", etiqueta: "Narzut na pensję brutto", formato: "porcentaje", decimales: 2 },
    { clave: "emerytalne", etiqueta: "Składka emerytalna", formato: "moneda" },
    { clave: "rentowe", etiqueta: "Składka rentowa", formato: "moneda" },
    { clave: "wypadkowe", etiqueta: "Składka wypadkowa", formato: "moneda" },
    { clave: "stopaWypadkowa", etiqueta: "Przyjęta stopa wypadkowa", formato: "porcentaje", decimales: 2 },
    { clave: "fp", etiqueta: "Fundusz Pracy", formato: "moneda", ocultarSiCero: true },
    { clave: "fs", etiqueta: "Fundusz Solidarnościowy", formato: "moneda", ocultarSiCero: true },
    { clave: "fgsp", etiqueta: "FGŚP", formato: "moneda", ocultarSiCero: true },
  ],
});
