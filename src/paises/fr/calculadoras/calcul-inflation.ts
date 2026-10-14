import { definirCalculadora } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { nomMois, variationEntreMois } from "../lib/indice-prix";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "fr.ipc")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "fr.calcul-inflation",
  mercado: "fr",
  concepto: "inflacion",
  slug: "calcul-inflation",
  estado: "publicado",
  requiere: {
    "fr.ipc": "serie",
  },
  campos: [
    { id: "montant", tipo: "moneda", etiqueta: "Montant", min: 0, porDefecto: 1000 },
    { id: "desde", tipo: "fecha", etiqueta: "Mois de départ", min: "1996-01-01", ayuda: "On prend l'indice des prix de ce mois. Le jour n'a pas d'importance." },
    { id: "hasta", tipo: "fecha", etiqueta: "Mois d'arrivée", min: "1996-01-01", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    const v = variationEntreMois(IPC, valores["fr.ipc"], entrada.desde, entrada.hasta, { desde: "desde", hasta: "hasta" });
    return {
      montantActualise: redondear(entrada.montant * v.coefficient),
      difference: redondear(entrada.montant * v.coefficient - entrada.montant),
      cumulee: v.cumulee,
      coefficient: v.coefficient,
      annuelle: v.annuelle,
      mensuelle: v.mensuelle,
      moisInitial: nomMois(v.moisInitial),
      indiceInitial: v.indiceInitial,
      moisFinal: nomMois(v.moisFinal),
      indiceFinal: v.indiceFinal,
      observaciones: v.observaciones,
    };
  },
  resultado: [
    { clave: "montantActualise", etiqueta: "Montant équivalent", formato: "moneda", destacada: true },
    { clave: "difference", etiqueta: "Écart dû à l'inflation", formato: "moneda" },
    { clave: "cumulee", etiqueta: "Inflation cumulée sur la période", formato: "porcentaje", decimales: 2 },
    { clave: "coefficient", etiqueta: "Coefficient de revalorisation", formato: "numero", decimales: 4 },
    { clave: "annuelle", etiqueta: "Inflation sur un an (mois d'arrivée)", formato: "porcentaje", decimales: 2 },
    { clave: "mensuelle", etiqueta: "Variation sur un mois (mois d'arrivée)", formato: "porcentaje", decimales: 2 },
    { clave: "moisInitial", etiqueta: "Mois de départ", formato: "texto" },
    { clave: "indiceInitial", etiqueta: "Indice du mois de départ", formato: "numero", decimales: 2 },
    { clave: "moisFinal", etiqueta: "Mois d'arrivée", formato: "texto" },
    { clave: "indiceFinal", etiqueta: "Indice du mois d'arrivée", formato: "numero", decimales: 2 },
  ],
});
