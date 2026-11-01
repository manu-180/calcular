import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { bazaPlafonata, NOTA_PLAFON, REQ_PLAFON } from "../lib/cnas";

export default definirCalculadora({
  id: "md.indemnizatie-de-maternitate",
  mercado: "md",
  concepto: "propio",
  slug: "indemnizatie-de-maternitate",
  estado: "publicado",
  requiere: { ...REQ_PLAFON, "md.maternitate-procent": "numero", "md.maternitate-zile": "mapa" },
  campos: [
    { id: "venit", tipo: "moneda", etiqueta: "Venitul mediu lunar asigurat din ultimele 12 luni", min: 0, porDefecto: 15000, ayuda: "Pentru soția aflată la întreținerea soțului asigurat, venitul soțului." },
    {
      id: "nastere",
      tipo: "opcion",
      etiqueta: "Tipul nașterii",
      opciones: [
        { valor: "normala", etiqueta: "Naștere fără complicații, un copil" },
        { valor: "complicata", etiqueta: "Naștere complicată sau doi copii" },
      ],
      porDefecto: "normala",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.venit <= 0) throw new ErrorEntrada("Introduceți un venit mai mare decât zero.", "venit");
    const b = bazaPlafonata(e.venit, v);
    return {
      lunar: redondear((b.baza * v["md.maternitate-procent"]) / 100),
      zile: enMapa(v["md.maternitate-zile"], e.nastere),
      baza: b.baza,
      plafon: b.plafon,
      observaciones: b.plafonat ? [NOTA_PLAFON] : [],
    };
  },
  resultado: [
    { clave: "lunar", etiqueta: "Indemnizația de maternitate pe lună", formato: "moneda", destacada: true },
    { clave: "zile", etiqueta: "Durata concediului de maternitate", formato: "dias" },
    { clave: "baza", etiqueta: "Baza de calcul", formato: "moneda" },
    { clave: "plafon", etiqueta: "Plafonul lunar al venitului asigurat", formato: "moneda" },
  ],
});
