import type { DiccionarioLegal } from "./tipos";

// Tournures impersonnelles presque partout : le même texte sert au tutoiement et au vouvoiement,
// seule la page de contact change.
export const fr: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "Qui sommes-nous | CalcularYa",
      description: "CalcularYa conçoit des calculateurs pour le travail, l'argent et le quotidien dans chaque pays, avec des données issues de sources officielles.",
      h1: "Qui sommes-nous",
      bajada: "Des calculateurs pour chaque pays, avec les données officielles de chacun.",
      bloques: [
        {
          parrafos: [
            "CalcularYa est un site de calculateurs pour les calculs du quotidien : salaire, crédit, impôts, dates et bien plus.",
            "Il est conçu par Manuel Navarro, qui édite aussi calcular.ar, le site de calculateurs pour l'Argentine.",
          ],
        },
        {
          titulo: "Notre méthode",
          parrafos: [
            "Quand un calcul dépend d'une règle (un salaire minimum, un taux de cotisation, un plafond), nous lisons la valeur dans la source officielle du pays : journal officiel, ministère, banque centrale ou administration fiscale.",
            "Nous gardons le lien et la date de notre vérification, et les affichons à côté de chaque calculateur.",
            "Si une valeur n'a pas pu être confirmée dans la source officielle, le calculateur qui l'utilise n'est pas publié.",
            "Quand une règle change, le calculateur suit, et le changement est noté dans les nouveautés de chaque pays.",
          ],
        },
        { titulo: "Gratuit", parrafos: ["Les calculateurs sont gratuits et ne demandent aucune inscription."] },
      ],
    },
    contacto: {
      title: "Contact | CalcularYa",
      description: "Écris-nous si une donnée n'est plus à jour, si un résultat te surprend ou s'il manque un calculateur ou un pays.",
      h1: "Contact",
      bajada: `Notre adresse : ${mail}.`,
      bloques: [
        {
          parrafos: [
            "C'est utile de savoir quand une donnée n'est plus à jour, quand un résultat ne correspond pas à ce que tu attendais ou quand il manque un calculateur ou un pays.",
            "S'il s'agit d'une donnée, indique le pays et la page concernée.",
            "Une vraie personne répond. Cela peut prendre quelques jours.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Confidentialité | CalcularYa",
      description: "Les données utilisées par CalcularYa : ce qui est saisi dans un calculateur est traité dans le navigateur et n'est pas conservé.",
      h1: "Confidentialité",
      bajada: `Dernière mise à jour : ${actualizado}.`,
      bloques: [
        {
          titulo: "Ce qui est saisi dans un calculateur",
          parrafos: ["Le calcul se fait dans le navigateur. Les valeurs saisies ne sont envoyées à aucun serveur et nous ne les conservons pas."],
        },
        {
          titulo: "Le pays de la visite",
          parrafos: [
            "Pour suggérer les calculateurs du bon pays, nous regardons de quel pays vient la visite. Notre hébergeur le déduit de l'adresse IP.",
            "Nous ne conservons pas l'adresse IP. L'information reste dans le navigateur le temps de la visite.",
          ],
        },
        {
          titulo: "Ce que conserve le navigateur",
          parrafos: [
            "Le stockage de session du navigateur, effacé à la fermeture de l'onglet, retient le pays de la visite, si le message qui le suggère a été fermé et, quand la visite arrive par un lien partagé, le code de ce lien.",
            "Le stockage local, conservé jusqu'à ce qu'il soit effacé depuis le navigateur, garde le pays choisi à la main, un nombre aléatoire qui sert à compter les visites et la version affichée d'un test de design, pour que le site reste le même d'une visite à l'autre. Rien de tout cela ne dit qui est la personne.",
            "Nous n'utilisons ni cookies publicitaires ni cookies de suivi.",
          ],
        },
        {
          titulo: "Hébergement",
          parrafos: ["Le site est hébergé par Vercel. Comme tout serveur, il enregistre des données techniques à chaque visite (adresse IP et navigateur) pour que le site fonctionne et reste sûr."],
        },
        {
          titulo: "Comment nous comptons les visites",
          parrafos: [
            "Nous mesurons l'usage du site avec un outil maison : les pages ouvertes et leur utilisation, le site d'où vient la visite, le type d'appareil et le pays. Le nombre aléatoire conservé par le navigateur permet de distinguer une nouvelle visite d'un retour. Nous ne conservons ni l'adresse IP ni ce qui est saisi dans un calculateur.",
            "Les liens partagés depuis le site portent un code aléatoire, différent à chaque partage, pour compter combien de visites chacun apporte. Ce code n'identifie personne.",
            "Les montants saisis dans un calculateur ne quittent jamais le navigateur dans un lien.",
          ],
        },
        {
          titulo: "Changements et questions",
          parrafos: [
            "Si quelque chose change (par exemple l'arrivée de publicité), nous l'annoncerons sur cette page avant que cela s'applique.",
            `Pour toute question sur les données personnelles, notre adresse est ${mail}.`,
          ],
        },
        {
          titulo: "Les salaires partagés",
          parrafos: [
            "Sur « Salaires réels », il est possible d'ajouter un salaire de façon anonyme et facultative, uniquement après un consentement explicite. Nous enregistrons le pays, le métier (choisi dans une liste fermée), la tranche d'années d'expérience, le salaire brut mensuel arrondi à deux chiffres significatifs et le mois. Ni l'adresse IP, ni le navigateur, ni un compte, ni la date exacte ne sont enregistrés.",
            "Nous ne publions que la médiane et la fourchette de groupes de 10 personnes ou plus. Aucun salaire individuel n'est affiché.",
            "Pour éviter d'ajouter deux fois le même pays dans le même mois, le navigateur garde en stockage local le pays et le mois de la contribution, jamais le montant.",
            "Comme une contribution n'est liée à personne, il n'est pas possible de la retrouver ensuite pour la supprimer.",
          ],
        },
      ],
    },
    terminos: {
      title: "Conditions d'utilisation | CalcularYa",
      description: "Les calculateurs de CalcularYa donnent une estimation avec les données officielles en vigueur. Ils servent de repère et ne remplacent pas un conseil.",
      h1: "Conditions d'utilisation",
      bajada: `Dernière mise à jour : ${actualizado}.`,
      bloques: [
        {
          titulo: "À quoi servent les calculateurs",
          parrafos: [
            "Les résultats sont une estimation établie avec les données officielles en vigueur. Ils servent de repère.",
            "Ils ne remplacent ni le calcul d'un employeur, d'un comptable ou d'un avocat, ni la position de l'organisme officiel.",
          ],
        },
        {
          titulo: "D'où viennent les données",
          parrafos: [
            "Chaque calculateur indique la source officielle de ses valeurs et la date de notre vérification.",
            "Nous faisons de notre mieux pour les tenir à jour, mais une règle peut changer avant que nous l'intégrions.",
          ],
        },
        {
          titulo: "Utilisation du site",
          parrafos: ["Le site est gratuit. Il est permis de l'utiliser et d'en partager les liens. Il est interdit d'en copier le contenu de façon massive ou de se faire passer pour CalcularYa."],
        },
        {
          titulo: "Responsabilité",
          parrafos: ["Nous ne sommes pas responsables des décisions prises sur la seule base d'un résultat du site. Avant de signer, de payer ou de faire une réclamation, mieux vaut faire confirmer le calcul par la bonne personne."],
        },
        { titulo: "Contact", parrafos: [`Notre adresse : ${mail}.`] },
      ],
    },
  },
  usted: {
    contacto: {
      description: "Écrivez-nous si une donnée n'est plus à jour, si un résultat vous surprend ou s'il manque un calculateur ou un pays.",
      bloques: [
        {
          parrafos: [
            "C'est utile de savoir quand une donnée n'est plus à jour, quand un résultat ne correspond pas à ce que vous attendiez ou quand il manque un calculateur ou un pays.",
            "S'il s'agit d'une donnée, indiquez le pays et la page concernée.",
            "Une vraie personne répond. Cela peut prendre quelques jours.",
          ],
        },
      ],
    },
  },
});
