import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lv.vecaku-pabalsts",
  mercado: "lv",
  concepto: "propio",
  slug: "vecaku-pabalsts",
  estado: "borrador",
  requiere: { "lv.vecaku-pabalsts": "mapa", "lv.vecaku-pabalsts-stradajot": "numero" },
  campos: [
    { id: "alga", tipo: "moneda", etiqueta: "Vidējā apdrošināšanas iemaksu alga mēnesī", min: 0, porDefecto: 1500 },
    { id: "variants", tipo: "opcion-dato", dato: "lv.vecaku-pabalsts", etiqueta: "Pabalsta periods", porDefecto: "13-menesi" },
    { id: "stradajat", tipo: "si-no", etiqueta: "Strādājat bērna kopšanas laikā", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.alga <= 0) throw new ErrorEntrada("Ievadiet algu, kas lielāka par nulli.", "alga");
    const pilns = porcentaje(e.alga, enMapa(v["lv.vecaku-pabalsts"], e.variants));
    return { pabalsts: redondear(e.stradajat ? porcentaje(pilns, v["lv.vecaku-pabalsts-stradajot"]) : pilns) };
  },
  resultado: [
    { clave: "pabalsts", etiqueta: "Vecāku pabalsts mēnesī", formato: "moneda", destacada: true },
  ],
});
