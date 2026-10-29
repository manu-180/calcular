import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { itsMensuel, REQ_ITS } from "../lib/its";

export default definirCalculadora({
  id: "bj.avantages-en-nature",
  mercado: "bj",
  concepto: "propio",
  slug: "avantages-en-nature",
  estado: "publicado",
  requiere: { ...REQ_ITS, "bj.avantages-nature-logement": "numero", "bj.avantages-nature-forfaits": "mapa" },
  campos: [
    { id: "base", tipo: "moneda", etiqueta: "Salaire de base mensuel", min: 0, porDefecto: 400000 },
    { id: "autres", tipo: "moneda", etiqueta: "Primes et indemnités imposables du mois (hors avantages en nature)", min: 0, porDefecto: 50000 },
    {
      id: "profil",
      tipo: "opcion",
      etiqueta: "Catégorie du salarié",
      opciones: [
        { valor: "cadre", etiqueta: "Dirigeant ou cadre supérieur" },
        { valor: "employe", etiqueta: "Employé" },
      ],
      porDefecto: "cadre",
    },
    { id: "logement", tipo: "si-no", etiqueta: "Logement fourni par l'employeur", porDefecto: true },
    { id: "electricite", tipo: "si-no", etiqueta: "Électricité payée par l'employeur", porDefecto: false },
    { id: "eau", tipo: "si-no", etiqueta: "Eau payée par l'employeur", porDefecto: false },
    { id: "telephone", tipo: "si-no", etiqueta: "Téléphone payé par l'employeur", porDefecto: false },
    { id: "nourriture", tipo: "si-no", etiqueta: "Nourriture fournie", porDefecto: false },
    {
      id: "vehicule",
      tipo: "opcion",
      etiqueta: "Véhicule mis à disposition",
      opciones: [
        { valor: "aucun", etiqueta: "Aucun" },
        { valor: "4", etiqueta: "Véhicule à 4 roues" },
        { valor: "2", etiqueta: "Véhicule à 2 roues" },
      ],
      porDefecto: "aucun",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.base <= 0) throw new ErrorEntrada("Indiquez un salaire de base supérieur à zéro.", "base");
    const f = v["bj.avantages-nature-forfaits"];
    const s = e.profil === "cadre" ? "cadre" : "employe";
    const logement = e.logement ? redondear(porcentaje(e.base, v["bj.avantages-nature-logement"])) : 0;
    const electricite = e.electricite ? f[`electricite-${s}`] : 0;
    const eau = e.eau ? f[`eau-${s}`] : 0;
    const telephone = e.telephone ? f[`telephone-${s}`] : 0;
    const nourriture = e.nourriture ? f[`nourriture-${s}`] : 0;
    const vehicule = e.vehicule === "aucun" ? 0 : f[`vehicule-${e.vehicule}-${s}`];
    const total = redondear(logement + electricite + eau + telephone + nourriture + vehicule);
    const sans = itsMensuel(e.base + e.autres, "autre", v, redondear).impot;
    const avec = itsMensuel(e.base + e.autres + total, "autre", v, redondear).impot;
    return { total, logement, electricite, eau, telephone, nourriture, vehicule, baseImposable: redondear(e.base + e.autres + total), supplement: redondear(avec - sans) };
  },
  resultado: [
    { clave: "total", etiqueta: "Avantages en nature à ajouter au salaire imposable", formato: "moneda", destacada: true },
    { clave: "logement", etiqueta: "Logement", formato: "moneda", ocultarSiCero: true },
    { clave: "electricite", etiqueta: "Électricité", formato: "moneda", ocultarSiCero: true },
    { clave: "eau", etiqueta: "Eau", formato: "moneda", ocultarSiCero: true },
    { clave: "telephone", etiqueta: "Téléphone", formato: "moneda", ocultarSiCero: true },
    { clave: "nourriture", etiqueta: "Nourriture", formato: "moneda", ocultarSiCero: true },
    { clave: "vehicule", etiqueta: "Véhicule", formato: "moneda", ocultarSiCero: true },
    { clave: "baseImposable", etiqueta: "Salaire mensuel imposable avec les avantages", formato: "moneda" },
    { clave: "supplement", etiqueta: "ITS supplémentaire dû aux avantages (mois ordinaire)", formato: "moneda" },
  ],
});
