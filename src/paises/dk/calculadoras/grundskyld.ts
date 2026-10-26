import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "dk.grundskyld",
  mercado: "dk",
  concepto: "propio",
  slug: "grundskyld",
  estado: "publicado",
  requiere: {
    "dk.grundskyld": "mapa",
    "dk.beskatningsgrundlag-andel": "numero",
  },
  campos: [
    { id: "kommune", tipo: "opcion-dato", dato: "dk.grundskyld", etiqueta: "Kommune", porDefecto: "koebenhavn" },
    {
      id: "type",
      tipo: "opcion",
      etiqueta: "Hvilket beløb har du?",
      opciones: [
        { valor: "grundvaerdi", etiqueta: "Grundværdien fra vurderingen" },
        { valor: "grundlag", etiqueta: "Beskatningsgrundlaget fra ejendomsskattebilletten" },
      ],
      porDefecto: "grundvaerdi",
    },
    { id: "beloeb", tipo: "moneda", etiqueta: "Beløb", min: 0, porDefecto: 1500000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.beloeb <= 0) throw new ErrorEntrada("Skriv et beløb, der er større end 0.", "beloeb");
    const promille = enMapa(v["dk.grundskyld"], e.kommune);
    const grundlag = e.type === "grundvaerdi" ? redondear(porcentaje(e.beloeb, v["dk.beskatningsgrundlag-andel"])) : e.beloeb;
    const skat = redondear((grundlag * promille) / 1000);
    return {
      skat,
      maaned: redondear(skat / 12),
      grundlag,
      promille,
      observaciones:
        e.type === "grundvaerdi"
          ? ["Er grundværdien steget meget, kan dit beskatningsgrundlag være lavere på grund af stigningsbegrænsning eller skatterabat. Brug beløbet fra din ejendomsskattebillet for et præcist tal."]
          : [],
    };
  },
  resultado: [
    { clave: "skat", etiqueta: "Grundskyld om året", formato: "moneda", destacada: true },
    { clave: "maaned", etiqueta: "Grundskyld pr. måned", formato: "moneda" },
    { clave: "grundlag", etiqueta: "Beskatningsgrundlag", formato: "moneda" },
    { clave: "promille", etiqueta: "Grundskyldspromille i kommunen", formato: "numero", decimales: 2 },
  ],
});
