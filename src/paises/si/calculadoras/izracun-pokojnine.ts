import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "si.izracun-pokojnine",
  mercado: "si",
  concepto: "jubilacion",
  slug: "izracun-pokojnine",
  estado: "publicado",
  requiere: { "si.pokojnina-odstotek": "mapa", "si.pokojninska-osnova": "mapa", "si.pokojnina-doba": "numero", "si.pokojnina-starost": "numero" },
  campos: [
    { id: "osnova", tipo: "moneda", etiqueta: "Ocena pokojninske osnove (neto, na mesec)", min: 0, porDefecto: 1700, ayuda: "To je povprečje neto osnov iz najboljših zaporednih 40 let. Točen podatek izračuna ZPIZ." },
    { id: "doba", tipo: "numero", etiqueta: "Pokojninska doba v letih", min: 15, max: 60, porDefecto: 40 },
  ],
  calcular(e, v, { redondear }) {
    if (e.doba < v["si.pokojnina-doba"]) throw new ErrorEntrada("Za starostno pokojnino je potrebnih vsaj 15 let zavarovalne dobe.", "doba");
    const m = v["si.pokojnina-odstotek"];
    const p = v["si.pokojninska-osnova"];
    const odstotek = redondear(enMapa(m, "zacetek") + (e.doba - v["si.pokojnina-doba"]) * enMapa(m, "na-leto"));
    const osnova = Math.min(enMapa(p, "najvisja"), Math.max(enMapa(p, "najnizja"), e.osnova));
    return { pokojnina: redondear(porcentaje(osnova, odstotek)), odstotek, osnova: redondear(osnova), starost: v["si.pokojnina-starost"] };
  },
  resultado: [
    { clave: "pokojnina", etiqueta: "Okvirna starostna pokojnina na mesec", formato: "moneda", destacada: true },
    { clave: "odstotek", etiqueta: "Odmerni odstotek", formato: "porcentaje", decimales: 2 },
    { clave: "osnova", etiqueta: "Upoštevana pokojninska osnova", formato: "moneda" },
    { clave: "starost", etiqueta: "Starost za pokojnino pri 15 letih dobe", formato: "anios" },
  ],
});
