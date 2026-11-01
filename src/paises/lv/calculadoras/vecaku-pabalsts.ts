import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lv.vecaku-pabalsts",
  mercado: "lv",
  concepto: "propio",
  slug: "vecaku-pabalsts",
  estado: "publicado",
  requiere: { "lv.vecaku-pabalsts": "mapa", "lv.vecaku-pabalsts-stradajot": "numero" },
  campos: [
    { id: "alga", tipo: "moneda", etiqueta: "Vidējā apdrošināšanas iemaksu alga mēnesī", min: 0, porDefecto: 1500 },
    { id: "variants", tipo: "opcion-dato", dato: "lv.vecaku-pabalsts", etiqueta: "Pabalsta periods", porDefecto: "m13" },
    { id: "ienakumi", tipo: "si-no", etiqueta: "Pamata daļas laikā strādājat vai gūstat ienākumus", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.alga <= 0) throw new ErrorEntrada("Ievadiet algu, kas lielāka par nulli.", "alga");
    const pilns = redondear(porcentaje(e.alga, enMapa(v["lv.vecaku-pabalsts"], e.variants)));
    const menesi = e.variants === "m13" ? 13 : 19;
    const pamataMenesi = menesi - 4;
    const mazaks = e.ienakumi ? redondear(porcentaje(pilns, v["lv.vecaku-pabalsts-stradajot"])) : pilns;
    return { pabalsts: mazaks, pilns, kopa: redondear(mazaks * pamataMenesi + pilns * 4), menesi };
  },
  resultado: [
    { clave: "pabalsts", etiqueta: "Pamata daļa mēnesī", formato: "moneda", destacada: true },
    { clave: "pilns", etiqueta: "Nenododamā daļa mēnesī", formato: "moneda" },
    { clave: "kopa", etiqueta: "Kopā par visu periodu", formato: "moneda" },
    { clave: "menesi", etiqueta: "Pabalsta periods", formato: "meses" },
  ],
});
