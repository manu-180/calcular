import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tg.retenue-a-la-source",
  mercado: "tg",
  concepto: "retencion-honorarios",
  slug: "retenue-a-la-source",
  estado: "publicado",
  requiere: { "tg.retenue-prestations": "mapa" },
  campos: [
    {
      id: "montant",
      tipo: "moneda",
      etiqueta: "Montant des honoraires ou commissions",
      min: 0,
      porDefecto: 500000,
      ayuda: "La somme versée au prestataire pour le service rendu.",
    },
    { id: "situation", tipo: "opcion-dato", etiqueta: "Situation fiscale du prestataire", dato: "tg.retenue-prestations", porDefecto: "nif" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.montant <= 0) throw new ErrorEntrada("Indiquez un montant supérieur à zéro.", "montant");
    const taux = v["tg.retenue-prestations"][entrada.situation];
    const retenue = redondear(porcentaje(entrada.montant, taux));
    return { retenue, taux, net: redondear(entrada.montant - retenue) };
  },
  resultado: [
    { clave: "retenue", etiqueta: "Retenue à la source", formato: "moneda", destacada: true },
    { clave: "net", etiqueta: "Montant versé au prestataire", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux appliqué", formato: "porcentaje" },
  ],
});
