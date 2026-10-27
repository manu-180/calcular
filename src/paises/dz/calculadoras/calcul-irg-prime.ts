import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "dz.calcul-irg-prime",
  mercado: "dz",
  concepto: "propio",
  slug: "calcul-irg-prime",
  estado: "publicado",
  requiere: { "dz.irg-primes": "numero", "dz.cnas": "mapa" },
  campos: [
    { id: "prime", tipo: "moneda", etiqueta: "Montant brut de la prime ou du rappel", min: 0, porDefecto: 30000 },
    {
      id: "cotisable",
      tipo: "si-no",
      etiqueta: "La prime est soumise à cotisation de sécurité sociale",
      porDefecto: true,
      ayuda: "Décochez si votre bulletin de paie n'applique pas de cotisation sur cette prime.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.prime <= 0) throw new ErrorEntrada("Indiquez un montant supérieur à zéro.", "prime");
    const cnas = e.cotisable ? redondear(porcentaje(e.prime, v["dz.cnas"].salarie)) : 0;
    const imposable = redondear(e.prime - cnas);
    const irg = redondear(porcentaje(imposable, v["dz.irg-primes"]));
    return {
      net: redondear(e.prime - cnas - irg),
      cnas: e.cotisable ? cnas : null,
      imposable,
      irg,
    };
  },
  resultado: [
    { clave: "net", etiqueta: "Prime nette", formato: "moneda", destacada: true },
    { clave: "cnas", etiqueta: "Moins : cotisation de sécurité sociale", formato: "moneda" },
    { clave: "imposable", etiqueta: "Montant imposable", formato: "moneda" },
    { clave: "irg", etiqueta: "Moins : IRG au taux fixe", formato: "moneda" },
  ],
});
