import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ml.cotisation-amo",
  mercado: "ml",
  concepto: "propio",
  slug: "cotisation-amo",
  estado: "publicado",
  requiere: { "ml.amo-taux": "mapa", "ml.smig": "numero" },
  campos: [
    {
      id: "salaire",
      tipo: "moneda",
      etiqueta: "Salaire brut mensuel soumis à cotisation",
      min: 0,
      porDefecto: 200000,
      ayuda: "Salaire de base, primes et indemnités imposables, sans les remboursements de frais ni les prestations familiales.",
    },
    {
      id: "employeur",
      tipo: "opcion",
      etiqueta: "Employeur",
      opciones: [
        { valor: "prive", etiqueta: "Entreprise ou employeur privé" },
        { valor: "public", etiqueta: "État ou collectivité territoriale" },
      ],
      porDefecto: "prive",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire <= 0) throw new ErrorEntrada("Indiquez un salaire supérieur à zéro.", "salaire");
    const t = v["ml.amo-taux"];
    // Le salaire retenu pour les cotisations AMO ne peut pas être inférieur au SMIG.
    const assiette = Math.max(entrada.salaire, v["ml.smig"]);
    const salarie = redondear(porcentaje(assiette, t["salarie"]));
    const employeur = redondear(porcentaje(assiette, entrada.employeur === "prive" ? t["employeur-prive"] : t["employeur-public"]));
    return {
      total: redondear(salarie + employeur),
      salarie,
      employeur,
      assiette,
      observaciones: assiette > entrada.salaire ? ["Le salaire indiqué est inférieur au SMIG : la cotisation se calcule sur le SMIG."] : [],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Cotisation AMO totale du mois", formato: "moneda", destacada: true },
    { clave: "salarie", etiqueta: "Part retenue sur le salaire", formato: "moneda" },
    { clave: "employeur", etiqueta: "Part de l'employeur", formato: "moneda" },
    { clave: "assiette", etiqueta: "Salaire retenu pour le calcul", formato: "moneda" },
  ],
});
