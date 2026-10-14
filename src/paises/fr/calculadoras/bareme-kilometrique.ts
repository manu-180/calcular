import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "fr.bareme-kilometrique",
  mercado: "fr",
  concepto: "propio",
  slug: "bareme-kilometrique",
  estado: "publicado",
  requiere: {
    "fr.bk-jusqua-5000": "mapa",
    "fr.bk-5001-20000-coef": "mapa",
    "fr.bk-5001-20000-fixe": "mapa",
    "fr.bk-plus-20000": "mapa",
    "fr.bk-majoration-electrique": "numero",
  },
  campos: [
    { id: "puissance", tipo: "opcion-dato", etiqueta: "Puissance fiscale du véhicule", dato: "fr.bk-jusqua-5000", porDefecto: "cv5" },
    { id: "distance", tipo: "numero", etiqueta: "Kilomètres parcourus à titre professionnel dans l'année", min: 0, porDefecto: 8000 },
    { id: "electrique", tipo: "si-no", etiqueta: "Véhicule 100 % électrique", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const d = entrada.distance;
    if (d <= 0) throw new ErrorEntrada("Indiquez une distance supérieure à zéro.", "distance");
    const cv = entrada.puissance;
    let bareme: number;
    let tranche: string;
    if (d <= 5000) {
      bareme = d * enMapa(valores["fr.bk-jusqua-5000"], cv);
      tranche = "Jusqu'à 5 000 km";
    } else if (d <= 20000) {
      bareme = d * enMapa(valores["fr.bk-5001-20000-coef"], cv) + enMapa(valores["fr.bk-5001-20000-fixe"], cv);
      tranche = "De 5 001 à 20 000 km";
    } else {
      bareme = d * enMapa(valores["fr.bk-plus-20000"], cv);
      tranche = "Au-delà de 20 000 km";
    }
    const majoration = entrada.electrique ? porcentaje(bareme, valores["fr.bk-majoration-electrique"]) : 0;
    const total = redondear(bareme + majoration);
    return {
      tranche,
      bareme: redondear(bareme),
      majoration: redondear(majoration),
      total,
      parKm: redondear(total / d),
    };
  },
  resultado: [
    { clave: "tranche", etiqueta: "Tranche de distance", formato: "texto" },
    { clave: "bareme", etiqueta: "Montant selon le barème", formato: "moneda" },
    { clave: "majoration", etiqueta: "Majoration véhicule électrique", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Frais kilométriques déductibles", formato: "moneda", destacada: true },
    { clave: "parKm", etiqueta: "Soit par kilomètre", formato: "moneda" },
  ],
});
