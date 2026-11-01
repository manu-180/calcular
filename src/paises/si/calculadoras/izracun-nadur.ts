import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "si.izracun-nadur",
  mercado: "si",
  concepto: "horas-extra",
  slug: "izracun-nadur",
  estado: "publicado",
  requiere: { "si.nadure-meje": "mapa" },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Mesečna bruto plača", min: 0, porDefecto: 2000 },
    { id: "ure", tipo: "numero", etiqueta: "Delovne ure v mesecu", min: 1, max: 300, porDefecto: 174, ayuda: "Število ur v mesecu je zapisano na plačilni listi." },
    { id: "nadure", tipo: "numero", etiqueta: "Nadure v mesecu", min: 0, max: 200, porDefecto: 10 },
    { id: "dodatek", tipo: "porcentaje", etiqueta: "Dodatek za nadurno delo iz vaše kolektivne pogodbe", min: 0, max: 200, porDefecto: 30, ayuda: "Višino določa kolektivna pogodba dejavnosti. Vnesite odstotek iz svoje." },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Vnesite bruto plačo, večjo od nič.", "bruto");
    if (e.ure <= 0) throw new ErrorEntrada("Vnesite število ur v mesecu.", "ure");
    const urna = e.bruto / e.ure;
    const dodatek = redondear(porcentaje(urna * e.nadure, e.dodatek));
    const osnovno = redondear(urna * e.nadure);
    const opombe: string[] = [];
    if (e.nadure > enMapa(v["si.nadure-meje"], "mesec")) opombe.push("Nadur je več od mesečne meje iz 144. člena ZDR-1. Meja se lahko računa kot povprečje v daljšem obdobju.");
    return { placilo: redondear(osnovno + dodatek), urna: redondear(urna), osnovno, dodatek, observaciones: opombe };
  },
  resultado: [
    { clave: "placilo", etiqueta: "Bruto plačilo za nadure", formato: "moneda", destacada: true },
    { clave: "urna", etiqueta: "Bruto urna postavka", formato: "moneda" },
    { clave: "osnovno", etiqueta: "Plačilo ur brez dodatka", formato: "moneda" },
    { clave: "dodatek", etiqueta: "Dodatek za nadure", formato: "moneda" },
  ],
});
