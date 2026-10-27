import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mg.avantages-en-nature",
  mercado: "mg",
  concepto: "propio",
  slug: "avantages-en-nature",
  estado: "publicado",
  requiere: { "mg.avantages-nature": "mapa" },
  campos: [
    { id: "remunerationFixe", tipo: "moneda", etiqueta: "Rémunération fixe mensuelle en numéraire", min: 0, porDefecto: 2000000, ayuda: "Sert au plafond de l'avantage logement." },
    { id: "loyer", tipo: "moneda", etiqueta: "Loyer réel du logement fourni", min: 0, porDefecto: 0 },
    { id: "vehicule", tipo: "moneda", etiqueta: "Dépenses mensuelles du véhicule de fonction", min: 0, porDefecto: 0, ayuda: "Assurance, carburant, entretien et réparations payés par l'employeur." },
    { id: "telephone", tipo: "moneda", etiqueta: "Dépenses mensuelles de téléphone", min: 0, porDefecto: 0 },
    { id: "autres", tipo: "moneda", etiqueta: "Autres avantages (valeur réelle)", min: 0, porDefecto: 0, ayuda: "Domestique, électricité, eau : imposés en totalité." },
    { id: "retenues", tipo: "moneda", etiqueta: "Retenues sur salaire pour ces avantages", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    const t = v["mg.avantages-nature"];
    if (e.loyer + e.vehicule + e.telephone + e.autres <= 0) throw new ErrorEntrada("Indiquez au moins un avantage.", "loyer");
    const logementBrut = porcentaje(e.loyer, t.logement);
    const plafond = porcentaje(e.remunerationFixe, t["logement-plafond"]);
    const logement = redondear(Math.min(logementBrut, plafond));
    const vehicule = redondear(porcentaje(e.vehicule, t.vehicule));
    const telephone = redondear(porcentaje(e.telephone, t.telephone));
    const brut = logement + vehicule + telephone + e.autres;
    const total = redondear(Math.max(0, brut - Math.min(e.retenues, brut)));
    return {
      total,
      logement,
      vehicule,
      telephone,
      autres: e.autres,
      observaciones: logementBrut > plafond ? ["L'avantage logement est limité à 25 % de la rémunération fixe."] : [],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Avantages en nature à ajouter au brut imposable", formato: "moneda", destacada: true },
    { clave: "logement", etiqueta: "Logement", formato: "moneda", ocultarSiCero: true },
    { clave: "vehicule", etiqueta: "Véhicule", formato: "moneda", ocultarSiCero: true },
    { clave: "telephone", etiqueta: "Téléphone", formato: "moneda", ocultarSiCero: true },
    { clave: "autres", etiqueta: "Autres avantages", formato: "moneda", ocultarSiCero: true },
  ],
});
