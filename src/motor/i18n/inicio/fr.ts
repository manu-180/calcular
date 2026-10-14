import { GRAMATICA } from "../gramatica";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.fr;

const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Tu es ${g.en(pais)}`,
    resumen: (calculadoras) => `${calculadoras} avec les valeurs officielles en vigueur.`,
    ultimoDato: "Dernière valeur chargée",
    ir: (pais) => `Voir ${g.nombre(pais)}`,
    otro: "Choisir un autre pays",
    argentina: "Tes calculateurs sont sur calcular.ar, avec les données officielles de l'Argentine.",
    argentinaIr: "Aller sur calcular.ar",
    neutroTitulo: (paises) => `${paises} pays, chacun avec ses lois et sa monnaie`,
    neutroTexto: "Nous consultons les sources officielles chaque jour.",
    neutroIr: "Voir les pays",
  },
  selector: {
    buscar: "Rechercher un pays",
    sinResultados: (q) => `Aucun pays ne correspond à « ${q} »`,
    ubicacion: "Position actuelle",
    mismaCalculadora: "Même calculateur",
    paises: "Pays",
  },
  aviso: { mismaCalculadora: (pais) => `Faire le calcul avec les données ${g.de(pais)}` },
  vivo: {
    titulo: "Données officielles, mises à jour automatiquement",
    vigilado: "Un processus automatique consulte les sources officielles chaque jour. Les changements de règles sont intégrés après vérification.",
    sinVigilar: "Chaque valeur a sa source officielle et la date de notre vérification.",
    verificado: "Dernière vérification des règles",
    automatico: "Dernière valeur automatique",
    fuentes: "Sources officielles",
    nFuentes: (n) => (n === 1 ? "1 document officiel" : `${n} documents officiels`),
    verFuentes: "Voir les sources",
    verNovedades: "Voir les nouveautés",
    hoy: "aujourd'hui",
    ayer: "hier",
    elDia: (fecha) => `le ${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Données vérifiées à la source officielle le ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie} : mis à jour ${cuando}, avec la dernière valeur publiée par ${organismo}.`,
    diario: "Nous consultons automatiquement les sources officielles chaque jour.",
    actualizado: "Mis à jour",
  },
  novedades: {
    pildora: "Nouveautés",
    titulo: (pais) => `Ce qui a changé dans les données officielles ${g.de(pais)}`,
    acento: "le jour du changement",
    bajada: "Chaque nouvelle valeur qui arrive dans les calculateurs est notée ici : ce qui a changé, depuis quand et d'où elle vient.",
    ultimoCambio: "Dernier changement",
    revision: "Vérification des sources",
    diaria: "Tous les jours",
    porNorma: "À chaque nouvelle règle",
    siguiendo: "Sources suivies",
    masOrganismos: (n) => `et ${n} de plus`,
    proximos: "Déjà publié, bientôt en vigueur",
    proximosTexto: "Valeurs officielles déjà chargées qui entrent en vigueur dans les prochains jours.",
    registro: "Historique des changements",
    rss: "Suivre par RSS",
    vacio: "Aucun changement enregistré pour ce pays pour l'instant.",
    etiqueta: { editorial: "Règle", dato: "Nouvelle valeur", proximo: "Bientôt en vigueur", serie: "Automatique", revision: "Vérification" },
    rige: (fecha) => `En vigueur depuis le ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `En vigueur du ${desde} au ${hasta}`,
    antes: (valor, fecha) => `Avant : ${valor} (${fecha})`,
    revisados: (n) => (n === 1 ? "1 valeur vérifiée à la source officielle" : `${n} valeurs vérifiées à la source officielle`),
    revisadosTexto: (organismos) => `Les valeurs en vigueur ont été confirmées auprès de ${organismos}.`,
    verDatos: (n) => (n === 1 ? "Voir la valeur" : `Voir les ${n} valeurs`),
    calculadoras: "Utilisé par",
    rango: (min, max, zonas) => `de ${min} à ${max} selon la zone (${zonas} zones)`,
    tabla: (filas) => `barème de ${filas} tranches`,
    valores: (n) => `${n} valeurs`,
    pasosTitulo: "Comment tout reste à jour",
    pasos: [
      { titulo: "Un organisme publie", texto: "Un texte, un indice ou un taux de change paraît dans la source officielle." },
      { titulo: "Vérifié avant usage", texto: "Indices et taux de change arrivent automatiquement, avec des contrôles de plage. Les règles sont saisies avec le texte officiel sous les yeux." },
      { titulo: "Les calculs suivent", texto: "Les calculateurs passent à la nouvelle valeur, et le changement est noté ici avec sa source." },
    ],
    feedTitulo: (pais) => `Nouveautés ${g.para(pais)} sur CalcularYa`,
    feedSubtitulo: (pais) => `Changements dans les données officielles des calculateurs ${g.para(pais)}, avec leur date d'effet et leur source.`,
  },
};

export const fr: Diccionario<TextosInicio> = {
  base,
  usted: {
    arranque: {
      estasEn: (pais) => `Vous êtes ${g.en(pais)}`,
      argentina: "Vos calculateurs sont sur calcular.ar, avec les données officielles de l'Argentine.",
    },
  },
};
