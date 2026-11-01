import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { bazaPlafonata, NOTA_PLAFON, REQ_PLAFON } from "../lib/cnas";

export default definirCalculadora({
  id: "md.indemnizatie-crestere-copil",
  mercado: "md",
  concepto: "propio",
  slug: "indemnizatie-crestere-copil",
  estado: "publicado",
  requiere: { ...REQ_PLAFON, "md.crestere-copil": "mapa", "md.crestere-copil-minim": "numero", "md.ingrijire-copil-2-ani": "numero" },
  campos: [
    { id: "venit", tipo: "moneda", etiqueta: "Venitul mediu lunar asigurat din ultimele 12 luni", min: 0, porDefecto: 15000, ayuda: "Al părintelui cu venitul mai mare, dacă amândoi sunt asigurați." },
    {
      id: "optiune",
      tipo: "opcion",
      etiqueta: "Opțiunea aleasă",
      opciones: [
        { valor: "trei-ani", etiqueta: "Până la 3 ani ai copilului" },
        { valor: "24-luni", etiqueta: "24 de luni" },
        { valor: "12-luni", etiqueta: "12 luni" },
      ],
      porDefecto: "trei-ani",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.venit <= 0) throw new ErrorEntrada("Introduceți un venit mai mare decât zero.", "venit");
    const c = v["md.crestere-copil"];
    const minim = v["md.crestere-copil-minim"];
    const b = bazaPlafonata(e.venit, v);
    const parte = (procent: number, ori: number) => redondear(Math.max((b.baza * procent) / 100, ori * minim));
    const primele12 =
      e.optiune === "12-luni" ? parte(enMapa(c, "12-luni"), 3) : e.optiune === "24-luni" ? parte(enMapa(c, "24-luni"), 2) : parte(enMapa(c, "trei-ani"), 1);
    const urmatoarele = e.optiune === "12-luni" ? null : parte(enMapa(c, "trei-ani"), 1);
    return {
      primele12,
      urmatoarele,
      ingrijire: v["md.ingrijire-copil-2-ani"],
      baza: b.baza,
      minim,
      observaciones: b.plafonat ? [NOTA_PLAFON] : [],
    };
  },
  resultado: [
    { clave: "primele12", etiqueta: "Indemnizația lunară în primele 12 luni", formato: "moneda", destacada: true },
    { clave: "urmatoarele", etiqueta: "Indemnizația lunară după primele 12 luni", formato: "moneda" },
    { clave: "ingrijire", etiqueta: "Plus indemnizația lunară pentru îngrijirea copilului până la 2 ani", formato: "moneda" },
    { clave: "baza", etiqueta: "Baza de calcul", formato: "moneda" },
    { clave: "minim", etiqueta: "Indemnizația minimă pentru persoana asigurată", formato: "moneda" },
  ],
});
