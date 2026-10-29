import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "bj.taxe-vehicules-a-moteur",
  mercado: "bj",
  concepto: "propio",
  slug: "taxe-vehicules-a-moteur",
  estado: "publicado",
  requiere: {
    "bj.tvm-prive": "mapa",
    "bj.tvm-societes": "mapa",
    "bj.tvm-public-personnes": "mapa",
    "bj.tvm-public-marchandises": "mapa",
    "bj.tvm-trois-roues": "numero",
  },
  campos: [
    {
      id: "categorie",
      tipo: "opcion",
      etiqueta: "Type de véhicule",
      opciones: [
        { valor: "prive", etiqueta: "Véhicule privé d'un particulier" },
        { valor: "societe", etiqueta: "Véhicule de transport privé de personnes d'une société" },
        { valor: "public-personnes", etiqueta: "Transport public de personnes" },
        { valor: "public-marchandises", etiqueta: "Transport public de marchandises" },
        { valor: "trois-roues", etiqueta: "Véhicule à trois roues" },
      ],
      porDefecto: "prive",
    },
    {
      id: "puissancePrive",
      tipo: "opcion",
      etiqueta: "Puissance fiscale",
      opciones: [
        { valor: "jusqu-7", etiqueta: "7 CV ou moins" },
        { valor: "8-10", etiqueta: "De 8 à 10 CV" },
        { valor: "11-15", etiqueta: "De 11 à 15 CV" },
        { valor: "plus-15", etiqueta: "Plus de 15 CV" },
      ],
      porDefecto: "jusqu-7",
      visibleSi: { categorie: ["prive"] },
    },
    {
      id: "puissanceSociete",
      tipo: "opcion",
      etiqueta: "Puissance fiscale",
      opciones: [
        { valor: "jusqu-7", etiqueta: "7 CV ou moins" },
        { valor: "plus-7", etiqueta: "Plus de 7 CV" },
      ],
      porDefecto: "jusqu-7",
      visibleSi: { categorie: ["societe"] },
    },
    {
      id: "places",
      tipo: "opcion",
      etiqueta: "Nombre de places",
      opciones: [
        { valor: "0-9", etiqueta: "De 0 à 9 places" },
        { valor: "10-20", etiqueta: "De 10 à 20 places" },
        { valor: "plus-20", etiqueta: "Plus de 20 places" },
      ],
      porDefecto: "0-9",
      visibleSi: { categorie: ["public-personnes"] },
    },
    {
      id: "tonnage",
      tipo: "opcion",
      etiqueta: "Charge utile",
      opciones: [
        { valor: "jusqu-2-5", etiqueta: "Jusqu'à 2,5 tonnes" },
        { valor: "2-6-5", etiqueta: "De 2,6 à 5 tonnes" },
        { valor: "5-10", etiqueta: "De 5,01 à 10 tonnes" },
        { valor: "plus-10", etiqueta: "Plus de 10 tonnes" },
      ],
      porDefecto: "jusqu-2-5",
      visibleSi: { categorie: ["public-marchandises"] },
    },
    { id: "nombre", tipo: "entero", etiqueta: "Nombre de véhicules identiques", min: 1, max: 500, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    let taxe = 0;
    if (e.categorie === "prive") taxe = v["bj.tvm-prive"][e.puissancePrive ?? "jusqu-7"];
    if (e.categorie === "societe") taxe = v["bj.tvm-societes"][e.puissanceSociete ?? "jusqu-7"];
    if (e.categorie === "public-personnes") taxe = v["bj.tvm-public-personnes"][e.places ?? "0-9"];
    if (e.categorie === "public-marchandises") taxe = v["bj.tvm-public-marchandises"][e.tonnage ?? "jusqu-2-5"];
    if (e.categorie === "trois-roues") taxe = v["bj.tvm-trois-roues"];
    return { total: redondear(taxe * e.nombre), parVehicule: taxe };
  },
  resultado: [
    { clave: "total", etiqueta: "Taxe annuelle à payer", formato: "moneda", destacada: true },
    { clave: "parVehicule", etiqueta: "Taxe par véhicule", formato: "moneda" },
  ],
});
