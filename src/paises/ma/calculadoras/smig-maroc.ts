import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "ma.smig-maroc",
  mercado: "ma",
  concepto: "salario-minimo",
  slug: "smig-maroc",
  estado: "borrador",
  requiere: {
    "ma.smig-horaire": "numero",
    "ma.duree-travail": "mapa",
  },
  campos: [{ id: "heures", tipo: "numero", etiqueta: "Heures travaillées par semaine", min: 1, max: 44, porDefecto: 44 }],
  calcular(entrada, v, { redondear }) {
    const horaire = v["ma.smig-horaire"];
    const parMois = redondear((horaire * v["ma.duree-travail"].annuelle * (entrada.heures / v["ma.duree-travail"].hebdomadaire)) / 12);
    return { horaire, parMois, parAn: redondear(parMois * 12) };
  },
  resultado: [
    { clave: "parMois", etiqueta: "SMIG mensuel brut", formato: "moneda", destacada: true },
    { clave: "horaire", etiqueta: "SMIG horaire", formato: "moneda" },
    { clave: "parAn", etiqueta: "Par an", formato: "moneda" },
  ],
});
