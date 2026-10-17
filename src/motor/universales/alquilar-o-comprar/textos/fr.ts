import { conVariantes } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiAlquilarOComprar } from "../definicion";

const base: TextosUi<UiAlquilarOComprar> = {
  slug: "louer-ou-acheter",
  ui: () => ({
    precio: "Prix du logement",
    entrada: "Apport personnel (% du prix)",
    gastosCompra: "Frais d’achat (% du prix)",
    gastosCompraAyuda: "Frais de notaire, droits de mutation, frais d’agence et de garantie.",
    tasa: "Taux du prêt immobilier (% par an)",
    aniosHipoteca: "Durée du prêt en années",
    alquiler: "Loyer mensuel d’un logement équivalent",
    aumentoAlquiler: "Hausse annuelle du loyer (%)",
    gastosPropietario: "Frais de propriétaire par an (% de la valeur)",
    gastosPropietarioAyuda: "Entretien, taxe foncière et assurance habitation. On compte souvent 1 % à 2 %.",
    revalorizacion: "Hausse annuelle des prix de l’immobilier (%)",
    rendimiento: "Rendement d’un placement alternatif (% par an)",
    rendimientoAyuda: "Ce que rapporterait l’apport si vous le placiez au lieu d’acheter.",
    horizonte: "Nombre d’années à comparer",
    veredicto: "Résultat",
    patrimonioComprar: "Patrimoine final si vous achetez",
    patrimonioAlquilar: "Patrimoine final si vous louez",
    diferencia: "Écart",
    anioDesde: "Année où l’achat devient gagnant",
    pagadoAlquilando: "Total des loyers payés",
    pagadoComprando: "Total des mensualités et frais de propriétaire",
    tabla: "Comparaison année par année",
    colAnio: "Année",
    colComprar: "Achat",
    colAlquilar: "Location",
    colDiferencia: "Écart",
    errorPrecio: "Saisissez le prix du logement.",
    errorAlquiler: "Saisissez le loyer d’un logement équivalent.",
    convieneComprar: (anios, diferencia) => `L’achat l’emporte : au bout de ${anios} ans, vous auriez ${diferencia} de plus.`,
    convieneAlquilar: (anios, diferencia) => `La location l’emporte : au bout de ${anios} ans, vous auriez ${diferencia} de plus.`,
    empate: (anios) => `Au bout de ${anios} ans, les deux options se valent.`,
    observacionDesde: (anio) => `L’achat passe devant la location à partir de l’année ${anio} et garde l’avantage.`,
    observacionMetodo:
      "Le calcul compare ce que vous posséderiez dans chaque cas. Si vous louez, l’apport et ce que vous économisez chaque mois restent placés. Les frais de revente ne sont pas déduits.",
  }),
};

const canada = (): Partial<UiAlquilarOComprar> => ({
  entrada: "Mise de fonds (% du prix)",
  gastosCompraAyuda: "Notaire, taxe de bienvenue, inspection et frais de courtage.",
  tasa: "Taux du prêt hypothécaire (% par an)",
  gastosPropietarioAyuda: "Entretien, taxes municipales et scolaires et assurance habitation. On compte souvent 1 % à 2 %.",
  rendimientoAyuda: "Ce que rapporterait la mise de fonds si vous la placiez au lieu d’acheter.",
  pagadoComprando: "Total des versements et frais de propriétaire",
  observacionMetodo:
    "Le calcul compare ce que vous posséderiez dans chaque cas. Si vous louez, la mise de fonds et ce que vous économisez chaque mois restent placés. Les frais de revente ne sont pas déduits.",
});

export const textosFr = conVariantes(base, { "fr-CA": canada });
