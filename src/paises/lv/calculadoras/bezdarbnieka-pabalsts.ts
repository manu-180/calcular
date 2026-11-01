import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lv.bezdarbnieka-pabalsts",
  mercado: "lv",
  concepto: "propio",
  slug: "bezdarbnieka-pabalsts",
  estado: "publicado",
  requiere: { "lv.bezdarbnieka-stazs": "mapa", "lv.bezdarbnieka-posmi": "mapa" },
  campos: [
    { id: "alga", tipo: "moneda", etiqueta: "Vidējā apdrošināšanas iemaksu alga mēnesī", min: 0, porDefecto: 1500 },
    { id: "stazs", tipo: "opcion-dato", dato: "lv.bezdarbnieka-stazs", etiqueta: "Apdrošināšanas stāžs", porDefecto: "1-9" },
  ],
  calcular(e, v, { redondear }) {
    if (e.alga <= 0) throw new ErrorEntrada("Ievadiet algu, kas lielāka par nulli.", "alga");
    const pamata = porcentaje(e.alga, enMapa(v["lv.bezdarbnieka-stazs"], e.stazs));
    const posms = (k: string) => redondear(porcentaje(pamata, enMapa(v["lv.bezdarbnieka-posmi"], k)));
    const [m12, m34, m56, m78] = [posms("1-2"), posms("3-4"), posms("5-6"), posms("7-8")];
    return { m12, m34, m56, m78, kopa: redondear((m12 + m34 + m56 + m78) * 2) };
  },
  resultado: [
    { clave: "m12", etiqueta: "1. un 2. mēnesī", formato: "moneda", destacada: true },
    { clave: "m34", etiqueta: "3. un 4. mēnesī", formato: "moneda" },
    { clave: "m56", etiqueta: "5. un 6. mēnesī", formato: "moneda" },
    { clave: "m78", etiqueta: "7. un 8. mēnesī", formato: "moneda" },
    { clave: "kopa", etiqueta: "Kopā par astoņiem mēnešiem", formato: "moneda" },
  ],
});
