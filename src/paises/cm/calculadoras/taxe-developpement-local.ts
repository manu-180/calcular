import { aplicarEscala, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "cm.taxe-developpement-local",
  mercado: "cm",
  concepto: "propio",
  slug: "taxe-developpement-local",
  estado: "publicado",
  requiere: { "cm.tdl-bareme": "escala" },
  campos: [
    {
      id: "base",
      tipo: "moneda",
      etiqueta: "Salaire de base mensuel",
      min: 0,
      porDefecto: 150000,
      ayuda: "Le salaire de base du bulletin, sans les primes ni les indemnités.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.base < 0) throw new ErrorEntrada("Le salaire ne peut pas être négatif.", "base");
    const annee = aplicarEscala(v["cm.tdl-bareme"], entrada.base);
    return { annee, mois: redondear(annee / 12) };
  },
  resultado: [
    { clave: "annee", etiqueta: "Taxe de développement local de l'année", formato: "moneda", destacada: true },
    { clave: "mois", etiqueta: "Retenue mensuelle (un douzième)", formato: "moneda" },
  ],
});
