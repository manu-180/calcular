import { definirCalculadora, porcentaje } from "@/motor/calculo";

const CLASSES = [
  { valor: "moins-5", etiqueta: "Moins de 5 CV" },
  { valor: "5-7", etiqueta: "5 à 7 CV" },
  { valor: "8-11", etiqueta: "8 à 11 CV" },
  { valor: "12-15", etiqueta: "12 à 15 CV" },
  { valor: "16-20", etiqueta: "16 à 20 CV" },
  { valor: "plus-20", etiqueta: "Plus de 20 CV" },
] as const;

export default definirCalculadora({
  id: "tg.vignette-auto",
  mercado: "tg",
  concepto: "propio",
  slug: "vignette-auto",
  estado: "publicado",
  requiere: { "tg.tvm-tarifs": "mapa", "tg.tvm-reduction-tpu": "numero" },
  campos: [
    {
      id: "vehicule",
      tipo: "opcion",
      etiqueta: "Véhicule",
      opciones: [
        { valor: "p", etiqueta: "Voiture ou véhicule de transport de personnes" },
        { valor: "m", etiqueta: "Camion ou véhicule de transport de marchandises" },
        { valor: "moto-125", etiqueta: "Motocyclette de plus de 125 cm3" },
        { valor: "moto-3-roues", etiqueta: "Motocyclette à trois roues" },
      ],
      porDefecto: "p",
    },
    { id: "puissance", tipo: "opcion", etiqueta: "Puissance fiscale", opciones: CLASSES, porDefecto: "5-7", visibleSi: { vehicule: ["p", "m"] } },
    {
      id: "transporteurTpu",
      tipo: "si-no",
      etiqueta: "Transporteur routier soumis à la TPU",
      porDefecto: false,
      visibleSi: { vehicule: ["p", "m"] },
    },
  ],
  calcular(entrada, v, { redondear }) {
    const tarifs = v["tg.tvm-tarifs"];
    const moto = entrada.vehicule === "moto-125" || entrada.vehicule === "moto-3-roues";
    const tarif = moto ? tarifs[entrada.vehicule] : tarifs[`${entrada.vehicule}-${entrada.puissance ?? "moins-5"}`];
    const reduction = !moto && entrada.transporteurTpu ? redondear(porcentaje(tarif, v["tg.tvm-reduction-tpu"])) : 0;
    return {
      montant: tarif - reduction,
      tarif,
      reduction,
      observaciones: moto
        ? ["Pour une motocyclette, la taxe se paie une seule fois, à l'immatriculation."]
        : ["Pour un véhicule acquis en cours d'année, la taxe est due au prorata du temps restant."],
    };
  },
  resultado: [
    { clave: "montant", etiqueta: "Taxe sur les véhicules à moteur à payer", formato: "moneda", destacada: true },
    { clave: "tarif", etiqueta: "Tarif plein", formato: "moneda" },
    { clave: "reduction", etiqueta: "Réduction transporteur à la TPU", formato: "moneda", ocultarSiCero: true },
  ],
});
