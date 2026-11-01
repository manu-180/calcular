import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { cotisationsCnss, REQ_CNSS } from "../lib/cnss";

export default definirCalculadora({
  id: "bj.cout-employeur",
  mercado: "bj",
  concepto: "costo-empleador",
  slug: "cout-employeur",
  estado: "publicado",
  requiere: { ...REQ_CNSS, "bj.vps-taux": "mapa" },
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "Salaire brut mensuel", min: 0, porDefecto: 300000 },
    {
      id: "tauxRisques",
      tipo: "porcentaje",
      etiqueta: "Taux risques professionnels de l'entreprise",
      min: 0,
      max: 20,
      porDefecto: 0,
      ayuda: "Le taux notifié par la CNSS selon votre activité.",
    },
    {
      id: "vps",
      tipo: "opcion",
      etiqueta: "Versement patronal sur salaires",
      opciones: [
        { valor: "general", etiqueta: "Dû au taux normal" },
        { valor: "enseignement-prive", etiqueta: "Établissement d'enseignement privé" },
        { valor: "exonere", etiqueta: "Exonéré (TPS, premier emploi, domestique déclaré...)" },
      ],
      porDefecto: "general",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez un salaire supérieur à zéro.", "brut");
    const c = cotisationsCnss(entrada.brut, entrada.tauxRisques, v, redondear);
    const tauxVps = entrada.vps === "exonere" ? 0 : v["bj.vps-taux"][entrada.vps];
    const vps = redondear(porcentaje(entrada.brut, tauxVps));
    const cout = redondear(entrada.brut + c.totalEmployeur + vps);
    return {
      cout,
      cnss: c.totalEmployeur,
      vps,
      charges: redondear(cout - entrada.brut),
      tauxCharges: redondear(((cout - entrada.brut) / entrada.brut) * 10000) / 100,
      coutAnnuel: redondear(cout * 12),
    };
  },
  resultado: [
    { clave: "cout", etiqueta: "Coût mensuel pour l'employeur", formato: "moneda", destacada: true },
    { clave: "cnss", etiqueta: "Cotisations CNSS patronales", formato: "moneda" },
    { clave: "vps", etiqueta: "Versement patronal sur salaires (VPS)", formato: "moneda", ocultarSiCero: true },
    { clave: "charges", etiqueta: "Total des charges patronales", formato: "moneda" },
    { clave: "tauxCharges", etiqueta: "Charges en pourcentage du brut", formato: "porcentaje", decimales: 2 },
    { clave: "coutAnnuel", etiqueta: "Coût sur 12 mois", formato: "moneda" },
  ],
});
