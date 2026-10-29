import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "dz.cotisations-cnas",
  mercado: "dz",
  concepto: "aportes-seguridad-social",
  slug: "cotisations-cnas",
  estado: "publicado",
  requiere: { "dz.cnas": "mapa" },
  campos: [{ id: "assiette", tipo: "moneda", etiqueta: "Salaire mensuel soumis à cotisation", min: 0, porDefecto: 60000 }],
  calcular(e, v, { redondear }) {
    if (e.assiette <= 0) throw new ErrorEntrada("Indiquez un salaire supérieur à zéro.", "assiette");
    const t = v["dz.cnas"];
    const salarie = redondear(porcentaje(e.assiette, t.salarie));
    const employeur = redondear(porcentaje(e.assiette, t.employeur));
    const oeuvres = redondear(porcentaje(e.assiette, t["oeuvres-sociales"]));
    return {
      total: redondear(salarie + employeur + oeuvres),
      salarie,
      employeur,
      oeuvres,
      tauxGlobal: t.salarie + t.employeur + t["oeuvres-sociales"],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Cotisation totale versée à la CNAS", formato: "moneda", destacada: true },
    { clave: "salarie", etiqueta: "Part retenue sur votre salaire", formato: "moneda" },
    { clave: "employeur", etiqueta: "Part de l'employeur", formato: "moneda" },
    { clave: "oeuvres", etiqueta: "Quote-part du fonds des œuvres sociales", formato: "moneda" },
    { clave: "tauxGlobal", etiqueta: "Taux global", formato: "porcentaje", decimales: 1 },
  ],
});
