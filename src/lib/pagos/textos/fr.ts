import type { ClaveFamilia } from "../ofertas-intl";
import { F, type DiccionarioVenta, type TextosFamilia } from "./tipos";

const ARCHIVES = { titulo: F("Pour tes archives", "Pour vos archives"), texto: "Avec la date des valeurs utilisées." };
const AUTRES_MONTANTS = { titulo: "Avec d'autres montants", explica: "Le même calcul avec des montants un peu plus bas et plus élevés." };
const AUTRES_TAUX = { titulo: "Avec d'autres taux", explica: "Le même calcul avec des taux un peu plus bas et plus élevés." };

const familias: Record<ClaveFamilia, TextosFamilia> = {
  liquidacion: {
    nombre: "Rapport de solde de tout compte",
    tituloCorto: "rapport de solde de tout compte",
    paraQuien: F(
      "Pour vérifier ton solde de tout compte avant de signer ou pour le réclamer, avec tes chiffres et la loi de ton pays",
      "Pour vérifier votre solde de tout compte avant de signer ou pour le réclamer, avec vos chiffres et la loi de votre pays",
    ),
    descripcion: [
      F(
        "Un rapport PDF avec ton solde détaillé poste par poste : ce qui te revient pour chaque élément, comment il se calcule et avec quelles valeurs officielles, chacune avec sa source.",
        "Un rapport PDF avec votre solde détaillé poste par poste : ce qui vous revient pour chaque élément, comment il se calcule et avec quelles valeurs officielles, chacune avec sa source.",
      ),
      F(
        "Il comprend la liste de ce qu'il faut vérifier avant de signer et une lettre prête pour demander le paiement par écrit, déjà remplie avec ton montant.",
        "Il comprend la liste de ce qu'il faut vérifier avant de signer et une lettre prête pour demander le paiement par écrit, déjà remplie avec votre montant.",
      ),
    ],
    gancho: F("Garde ton solde de tout compte par écrit, prêt à vérifier avant de signer", "Gardez votre solde de tout compte par écrit, prêt à vérifier avant de signer"),
    incluye: [
      { titulo: "Chaque poste avec son calcul", texto: F("Pour comparer ligne par ligne avec ce que propose ton employeur.", "Pour comparer ligne par ligne avec ce que propose votre employeur.") },
      { titulo: "Les sources officielles visibles", texto: "Chaque valeur avec l'organisme qui la publie et la date à laquelle nous l'avons vérifiée." },
      { titulo: "Lettre de réclamation prête", texto: F("Remplie avec ton montant, pour demander le paiement par écrit.", "Remplie avec votre montant, pour demander le paiement par écrit.") },
    ],
    pasos: {
      titulo: "Avant de signer",
      items: [
        F(
          "Compare chaque poste de ce rapport avec le document qu'on te demande de signer. S'il en manque un, demande pourquoi avant de signer.",
          "Comparez chaque poste de ce rapport avec le document qu'on vous demande de signer. S'il en manque un, demandez pourquoi avant de signer.",
        ),
        F(
          "Vérifie que le salaire et les dates utilisés par l'employeur sont ceux que tu as saisis ici. Une date d'embauche différente change presque tous les montants.",
          "Vérifiez que le salaire et les dates utilisés par l'employeur sont ceux que vous avez saisis ici. Une date d'embauche différente change presque tous les montants.",
        ),
        F("Demande une copie de tout ce que tu signes et garde tes fiches de paie des derniers mois.", "Demandez une copie de tout ce que vous signez et gardez vos fiches de paie des derniers mois."),
        F(
          "Si l'écart est important ou s'il y a eu licenciement, apporte ce rapport à l'inspection du travail de ton pays ou à un avocat en droit du travail : cela leur épargne la première heure de calculs.",
          "Si l'écart est important ou s'il y a eu licenciement, apportez ce rapport à l'inspection du travail de votre pays ou à un avocat en droit du travail : cela leur épargne la première heure de calculs.",
        ),
      ],
    },
    nota: {
      titulo: "Lettre de demande de paiement",
      uso: F(
        "Remplis-la, signe-la et remets-la avec une copie pour toi. Fais signer ta copie avec la date de réception.",
        "Remplissez-la, signez-la et remettez-la avec une copie pour vous. Faites signer votre copie avec la date de réception.",
      ),
      pedido: "Par la présente, je demande le paiement de mon solde de tout compte suite à la fin de mon contrat de travail, qui selon le calcul détaillé dans le rapport ci-joint s'élève à",
      cierre: "Vous trouverez ci-joint le détail de chaque poste, calculé avec les valeurs officielles en vigueur à la date indiquée. Dans l'attente de la date de paiement, je vous prie d'agréer mes salutations.",
    },
  },
  "pagos-laborales": {
    nombre: "Rapport de paiements du travail",
    tituloCorto: "rapport de paiements du travail",
    paraQuien: F(
      "Pour vérifier que ta prime, tes congés payés, tes heures supplémentaires ou ta participation ont été bien payés, et réclamer la différence sinon",
      "Pour vérifier que votre prime, vos congés payés, vos heures supplémentaires ou votre participation ont été bien payés, et réclamer la différence sinon",
    ),
    descripcion: [
      F(
        "Un rapport PDF avec ton calcul, étape par étape et avec tes chiffres : la base utilisée, la façon de compter et les valeurs officielles, chacune avec sa source.",
        "Un rapport PDF avec votre calcul, étape par étape et avec vos chiffres : la base utilisée, la façon de compter et les valeurs officielles, chacune avec sa source.",
      ),
      F(
        "Il convient à tous les paiements de la liste. Il montre comment le vérifier sur ta fiche de paie et inclut une lettre prête pour réclamer la différence par écrit.",
        "Il convient à tous les paiements de la liste. Il montre comment le vérifier sur votre fiche de paie et inclut une lettre prête pour réclamer la différence par écrit.",
      ),
    ],
    gancho: F("Garde ce calcul par écrit pour le comparer avec ta fiche de paie", "Gardez ce calcul par écrit pour le comparer avec votre fiche de paie"),
    incluye: [
      { titulo: "Le calcul étape par étape", texto: F("Avec tes données et chaque valeur officielle utilisée.", "Avec vos données et chaque valeur officielle utilisée.") },
      { titulo: "Quoi regarder sur la fiche de paie", texto: "Pour savoir en une minute si le paiement est juste." },
      { titulo: "Lettre pour réclamer la différence", texto: F("Remplie avec ton montant, prête à remettre.", "Remplie avec votre montant, prête à remettre.") },
    ],
    pasos: {
      titulo: F("Pour vérifier ton paiement", "Pour vérifier votre paiement"),
      items: [
        F("Cherche cet élément sur ta fiche de paie et compare-le avec le montant de ce rapport.", "Cherchez cet élément sur votre fiche de paie et comparez-le avec le montant de ce rapport."),
        F(
          "Si ça ne correspond pas, vérifie d'abord que tes données sont les mêmes que celles de l'employeur.",
          "Si cela ne correspond pas, vérifiez d'abord que vos données sont les mêmes que celles de l'employeur.",
        ),
        F(
          "Si ça ne correspond toujours pas, utilise la lettre ci-dessous pour réclamer la différence par écrit et garde une copie.",
          "Si cela ne correspond toujours pas, utilisez la lettre ci-dessous pour réclamer la différence par écrit et gardez une copie.",
        ),
      ],
    },
    nota: {
      titulo: "Lettre de demande de paiement",
      uso: F("Remplis-la, signe-la et remets-la avec une copie pour toi.", "Remplissez-la, signez-la et remettez-la avec une copie pour vous."),
      pedido: "Par la présente, je demande le paiement de l'élément détaillé dans le rapport ci-joint, qui selon le calcul avec les valeurs officielles en vigueur s'élève à",
      cierre: "Si le montant versé était différent, je vous demande de m'indiquer par écrit comment il a été calculé.",
    },
    escenarios: { titulo: F("Si tes heures changent", "Si vos heures changent"), explica: "Le même calcul avec d'autres nombres d'heures, pour vérifier chaque mois sans tout recalculer." },
  },
  impuesto: {
    nombre: "Rapport d'impôt sur le revenu",
    tituloCorto: "rapport d'impôt",
    paraQuien: F(
      "Pour comprendre combien d'impôt est prélevé, vérifier ta fiche de paie et voir ce qui change si ton revenu évolue",
      "Pour comprendre combien d'impôt est prélevé, vérifier votre fiche de paie et voir ce qui change si votre revenu évolue",
    ),
    descripcion: [
      F(
        "Un rapport PDF avec ton impôt calculé étape par étape, avec le barème officiel appliqué et la source de chaque valeur.",
        "Un rapport PDF avec votre impôt calculé étape par étape, avec le barème officiel appliqué et la source de chaque valeur.",
      ),
      F(
        "Il ajoute un tableau avec ton impôt pour d'autres revenus, pour savoir à l'avance ce qu'il te reste après une augmentation ou un changement de poste.",
        "Il ajoute un tableau avec votre impôt pour d'autres revenus, pour savoir à l'avance ce qu'il vous reste après une augmentation ou un changement de poste.",
      ),
    ],
    gancho: F("Garde ton impôt expliqué par écrit, et ce qui change si ton revenu évolue", "Gardez votre impôt expliqué par écrit, et ce qui change si votre revenu évolue"),
    incluye: [
      { titulo: "Le calcul avec le barème officiel", texto: "Étape par étape, avec la source de chaque valeur." },
      { titulo: "L'impôt avec d'autres revenus", texto: F("Pour négocier une augmentation en sachant ce qu'il te reste.", "Pour négocier une augmentation en sachant ce qu'il vous reste.") },
      { titulo: "Quoi vérifier sur la fiche de paie", texto: F("Pour parler chiffres avec ton employeur ou ton comptable.", "Pour parler chiffres avec votre employeur ou votre comptable.") },
    ],
    pasos: {
      titulo: "Pour vérifier le prélèvement",
      items: [
        F("Cherche le prélèvement d'impôt sur ta fiche de paie et compare-le avec celui de ce rapport.", "Cherchez le prélèvement d'impôt sur votre fiche de paie et comparez-le avec celui de ce rapport."),
        F("Si ça ne correspond pas, demande à ton employeur quels revenus et déductions il prend en compte.", "Si cela ne correspond pas, demandez à votre employeur quels revenus et déductions il prend en compte."),
        F("Garde ce rapport pour ta déclaration annuelle, si ton pays en exige une.", "Gardez ce rapport pour votre déclaration annuelle, si votre pays en exige une."),
      ],
    },
    escenarios: { titulo: F("Si ton revenu change", "Si votre revenu change"), explica: "Le même calcul avec un revenu un peu plus bas et plus élevé, avec les mêmes valeurs officielles." },
  },
  contratacion: {
    nombre: "Budget d'embauche",
    tituloCorto: "budget d'embauche",
    paraQuien: "Pour savoir ce que coûte vraiment une embauche, avec chaque cotisation, avant de fixer le salaire",
    descripcion: [
      "Un budget PDF avec le coût de l'embauche détaillé : salaire, cotisations salariales et patronales et provisions, chaque valeur avec sa source officielle.",
      F(
        "Il inclut un tableau du coût pour d'autres salaires, pour faire ton offre en sachant ce que pèse chaque hausse, et il est prêt à présenter à ton associé ou à ton comptable.",
        "Il inclut un tableau du coût pour d'autres salaires, pour faire votre offre en sachant ce que pèse chaque hausse, et il est prêt à présenter à votre associé ou à votre comptable.",
      ),
    ],
    gancho: F("Transforme ce coût en budget pour décider de l'embauche", "Transformez ce coût en budget pour décider de l'embauche"),
    incluye: [
      { titulo: "Chaque cotisation séparément", texto: "Avec la règle et la source officielle de chacune." },
      { titulo: "Le coût avec d'autres salaires", texto: "Pour négocier en sachant ce que coûte chaque hausse." },
      { titulo: "Prêt à présenter", texto: F("À ton associé, à ton comptable ou pour tes archives.", "À votre associé, à votre comptable ou pour vos archives.") },
    ],
    pasos: {
      titulo: "Avant d'embaucher",
      items: [
        F(
          "Vérifie avec ton comptable si ton secteur a une convention collective ou un minimum supérieur au minimum légal.",
          "Vérifiez avec votre comptable si votre secteur a une convention collective ou un minimum supérieur au minimum légal.",
        ),
        F(
          "Mets de côté chaque mois les provisions du budget : ce sont des paiements qui tombent ensemble en fin d'année ou en fin de contrat.",
          "Mettez de côté chaque mois les provisions du budget : ce sont des paiements qui tombent ensemble en fin d'année ou en fin de contrat.",
        ),
        F("Déclare la personne dès le premier jour : le coût de ce budget inclut déjà les cotisations légales.", "Déclarez la personne dès le premier jour : le coût de ce budget inclut déjà les cotisations légales."),
      ],
    },
    escenarios: { titulo: "Le coût avec d'autres salaires", explica: "Le même calcul avec des salaires plus bas et plus élevés, avec les mêmes valeurs officielles." },
  },
  "ajuste-inflacion": {
    nombre: "Lettre de révision selon l'inflation",
    tituloCorto: "lettre de révision",
    paraQuien: "Pour demander ou annoncer la révision d'un loyer, d'une mensualité, d'honoraires ou d'un salaire avec l'indice officiel",
    descripcion: [
      F(
        "Une lettre prête à remettre, remplie avec ton montant actualisé, et la justification du calcul : l'indice officiel de chaque date, l'organisme qui le publie et le lien vers la source.",
        "Une lettre prête à remettre, remplie avec votre montant actualisé, et la justification du calcul : l'indice officiel de chaque date, l'organisme qui le publie et le lien vers la source.",
      ),
      "Avec la justification sous les yeux, l'autre partie vérifie le chiffre en une minute et la discussion porte sur l'indice, pas sur le calcul.",
    ],
    gancho: F("Transforme cette révision en lettre prête à envoyer, avec l'indice officiel à l'appui", "Transformez cette révision en lettre prête à envoyer, avec l'indice officiel à l'appui"),
    incluye: [
      { titulo: "La lettre remplie", texto: F("Avec ton montant actualisé, à imprimer ou à envoyer.", "Avec votre montant actualisé, à imprimer ou à envoyer.") },
      { titulo: "L'indice officiel à l'appui", texto: "Avec l'organisme, la date et le lien vers la source." },
      { titulo: "Le calcul visible", texto: "Pour que l'autre partie le vérifie seule." },
    ],
    nota: {
      titulo: "Lettre de révision",
      uso: F("Remplis-la avec les données de l'accord et remets-la avec le détail du calcul.", "Remplissez-la avec les données de l'accord et remettez-la avec le détail du calcul."),
      pedido: "Par la présente, je vous informe de la révision du montant convenu selon la variation de l'indice officiel des prix, comme détaillé dans le calcul ci-joint. Le montant révisé est de",
      cierre: "Le calcul utilise l'indice publié par l'organisme officiel indiqué dans le détail, consultable à la source citée.",
    },
  },
  regimen: {
    nombre: "Rapport de régime simplifié",
    tituloCorto: "rapport de régime simplifié",
    paraQuien: F(
      "Pour savoir ce que tu paies dans ton régime simplifié et ce qui change si ton chiffre d'affaires monte ou baisse",
      "Pour savoir ce que vous payez dans votre régime simplifié et ce qui change si votre chiffre d'affaires monte ou baisse",
    ),
    descripcion: [
      F(
        "Un rapport PDF avec tes cotisations ou ton impôt du régime simplifié, calculés étape par étape avec le barème officiel et la source de chaque valeur.",
        "Un rapport PDF avec vos cotisations ou votre impôt du régime simplifié, calculés étape par étape avec le barème officiel et la source de chaque valeur.",
      ),
      F(
        "Il ajoute un tableau de ce que tu paierais avec d'autres chiffres d'affaires, pour anticiper un changement de seuil.",
        "Il ajoute un tableau de ce que vous paieriez avec d'autres chiffres d'affaires, pour anticiper un changement de seuil.",
      ),
    ],
    gancho: F("Garde ton régime par écrit et vois ce qui change si ton activité évolue", "Gardez votre régime par écrit et voyez ce qui change si votre activité évolue"),
    incluye: [
      { titulo: "Le calcul avec le barème officiel", texto: "Étape par étape, avec la source de chaque valeur." },
      { titulo: "Avec d'autres chiffres d'affaires", texto: "Pour voir venir un changement de seuil." },
      ARCHIVES,
    ],
    escenarios: { titulo: "Avec d'autres chiffres d'affaires", explica: "Le même calcul avec des chiffres plus bas et plus élevés, avec les mêmes valeurs officielles." },
  },
  deposito: {
    nombre: "Comparateur de dépôt à terme",
    tituloCorto: "comparateur de dépôt",
    paraQuien: F(
      "Pour comparer ton dépôt sur différentes durées avant de choisir où et pour combien de temps placer",
      "Pour comparer votre dépôt sur différentes durées avant de choisir où et pour combien de temps placer",
    ),
    descripcion: [
      F(
        "Un rapport PDF avec le rendement de ton dépôt et un tableau du même dépôt sur d'autres durées, avec le même calcul que la calculatrice.",
        "Un rapport PDF avec le rendement de votre dépôt et un tableau du même dépôt sur d'autres durées, avec le même calcul que la calculatrice.",
      ),
    ],
    gancho: F("Compare ton dépôt sur plusieurs durées dans un seul rapport", "Comparez votre dépôt sur plusieurs durées dans un seul rapport"),
    incluye: [
      { titulo: "Le dépôt sur plusieurs durées", texto: "Dans un tableau, pour choisir d'un coup d'œil." },
      { titulo: "Le calcul étape par étape", texto: "Avec la source de chaque valeur utilisée." },
      ARCHIVES,
    ],
    escenarios: { titulo: "Le dépôt sur d'autres durées", explica: "Le même calcul avec d'autres durées." },
  },
  alimentos: {
    nombre: "Rapport de pension alimentaire",
    tituloCorto: "rapport de pension alimentaire",
    paraQuien: "Pour arriver à la médiation, ou à la discussion sur la pension alimentaire, avec un chiffre étayé",
    descripcion: ["Un rapport PDF avec le calcul indicatif de la pension, étape par étape, avec les valeurs officielles et leur source, et un tableau du montant pour d'autres revenus."],
    gancho: F("Arrive à la médiation avec ce calcul par écrit", "Arrivez à la médiation avec ce calcul par écrit"),
    incluye: [
      { titulo: "Un calcul étayé", texto: "Étape par étape, avec la source de chaque valeur." },
      { titulo: "Le montant avec d'autres revenus", texto: "Pour négocier avec les scénarios sous les yeux." },
      { titulo: F("Pour ton avocat ou ton médiateur", "Pour votre avocat ou votre médiateur"), texto: "Cela leur épargne la première heure de calculs." },
    ],
    escenarios: { titulo: "Avec d'autres revenus", explica: "Le même calcul avec des revenus plus bas et plus élevés." },
  },
  jubilacion: {
    nombre: "Projection de retraite",
    tituloCorto: "projection de retraite",
    paraQuien: F(
      "Pour préparer ta retraite avec une projection écrite et voir ce qui change si tu cotises davantage",
      "Pour préparer votre retraite avec une projection écrite et voir ce qui change si vous cotisez davantage",
    ),
    descripcion: [
      F(
        "Un rapport PDF avec l'estimation de ta pension étape par étape, avec les valeurs officielles et leur source, et un tableau de la projection pour d'autres salaires.",
        "Un rapport PDF avec l'estimation de votre pension étape par étape, avec les valeurs officielles et leur source, et un tableau de la projection pour d'autres salaires.",
      ),
    ],
    gancho: F("Garde ta projection de retraite par écrit", "Gardez votre projection de retraite par écrit"),
    incluye: [
      { titulo: "L'estimation étape par étape", texto: "Avec la source de chaque valeur." },
      { titulo: "Avec d'autres salaires", texto: F("Pour voir ce qui change si tu cotises davantage.", "Pour voir ce qui change si vous cotisez davantage.") },
      ARCHIVES,
    ],
    escenarios: { titulo: "Avec d'autres salaires", explica: "Le même calcul avec des salaires plus bas et plus élevés." },
  },
  "plan-prestamo": {
    nombre: "Plan de prêt",
    tituloCorto: "plan de prêt",
    paraQuien: F("Pour savoir ce que te coûte vraiment un prêt et comparer les offres avant de signer", "Pour savoir ce que vous coûte vraiment un prêt et comparer les offres avant de signer"),
    descripcion: [
      F(
        "Un rapport PDF avec ton prêt complet : la mensualité, le total que tu vas rembourser et la part d'intérêts.",
        "Un rapport PDF avec votre prêt complet : la mensualité, le total que vous allez rembourser et la part d'intérêts.",
      ),
      F(
        "Si tu as calculé la mensualité, il liste toutes les échéances une par une. Il refait aussi le calcul avec d'autres taux, pour comparer les offres des banques avec des chiffres.",
        "Si vous avez calculé la mensualité, il liste toutes les échéances une par une. Il refait aussi le calcul avec d'autres taux, pour comparer les offres des banques avec des chiffres.",
      ),
    ],
    gancho: F("Compare les offres de prêt avec tes chiffres, avant de signer", "Comparez les offres de prêt avec vos chiffres, avant de signer"),
    incluye: [
      { titulo: "Le prêt avec d'autres taux", texto: "Pour voir ce que change un point de plus ou de moins." },
      { titulo: "Le coût total visible", texto: F("Ce que tu paies en intérêts, sans petits caractères.", "Ce que vous payez en intérêts, sans petits caractères.") },
      { titulo: "Liste avant de signer", texto: "Les questions à poser à la banque." },
    ],
    pasos: {
      titulo: "Avant de signer le prêt",
      items: [
        F(
          "Demande le taux annuel effectif global, frais compris, et pas seulement le taux nominal : c'est lui qui sert à comparer.",
          "Demandez le taux annuel effectif global, frais compris, et pas seulement le taux nominal : c'est lui qui sert à comparer.",
        ),
        F("Demande s'il y a des frais de dossier, une assurance obligatoire ou des pénalités de remboursement anticipé.", "Demandez s'il y a des frais de dossier, une assurance obligatoire ou des pénalités de remboursement anticipé."),
        F("Compare au moins trois offres avec le tableau des autres taux de ce rapport.", "Comparez au moins trois offres avec le tableau des autres taux de ce rapport."),
        F(
          "Choisis une mensualité que tu peux payer même un mauvais mois. En repère, pas plus d'un tiers de ton revenu.",
          "Choisissez une mensualité que vous pouvez payer même un mauvais mois. En repère, pas plus d'un tiers de votre revenu.",
        ),
      ],
    },
    escenarios: AUTRES_TAUX,
  },
  "plan-hipoteca": {
    nombre: "Plan de prêt immobilier",
    tituloCorto: "plan de prêt immobilier",
    paraQuien: "Pour choisir un prêt immobilier avec tous les chiffres sous les yeux : mensualité, intérêts et ce qui se passe si le taux change",
    descripcion: [
      F(
        "Un rapport PDF avec ton prêt immobilier complet : la mensualité, le total que tu vas payer et la part qui part en intérêts au fil des années.",
        "Un rapport PDF avec votre prêt immobilier complet : la mensualité, le total que vous allez payer et la part qui part en intérêts au fil des années.",
      ),
      F(
        "Il contient tous les tableaux de ton calcul en entier (la page gratuite n'affiche que les premières lignes) et le même calcul avec d'autres taux. Si tu as comparé louer et acheter, il met la comparaison par écrit pour décider en famille.",
        "Il contient tous les tableaux de votre calcul en entier (la page gratuite n'affiche que les premières lignes) et le même calcul avec d'autres taux. Si vous avez comparé louer et acheter, il met la comparaison par écrit pour décider en famille.",
      ),
    ],
    gancho: F("Va à la banque avec le tableau complet et d'autres taux", "Allez à la banque avec le tableau complet et d'autres taux"),
    incluye: [
      { titulo: "Le tableau complet", texto: "Toutes les lignes, pas seulement les premières." },
      { titulo: "Le prêt avec d'autres taux", texto: "Pour voir ce que change un point de plus ou de moins sur la mensualité." },
      { titulo: "Questions pour la banque", texto: "Ce qu'il faut confirmer avant de signer." },
    ],
    pasos: {
      titulo: "Avant de signer le prêt immobilier",
      items: [
        F("Demande l'offre par écrit avec le taux, la durée et le coût total, assurance et frais compris.", "Demandez l'offre par écrit avec le taux, la durée et le coût total, assurance et frais compris."),
        F("Demande si le taux est fixe ou variable et ce que devient la mensualité s'il monte.", "Demandez si le taux est fixe ou variable et ce que devient la mensualité s'il monte."),
        F(
          "Vérifie combien coûte un remboursement anticipé et si tu peux faire des versements en plus sans pénalité.",
          "Vérifiez combien coûte un remboursement anticipé et si vous pouvez faire des versements en plus sans pénalité.",
        ),
        F(
          "Ajoute à la mensualité les frais du logement (taxes, assurance, entretien) avant de décider combien tu peux payer.",
          "Ajoutez à la mensualité les frais du logement (taxes, assurance, entretien) avant de décider combien vous pouvez payer.",
        ),
      ],
    },
    escenarios: AUTRES_TAUX,
  },
  "plan-inversion": {
    nombre: "Plan d'épargne et de placement",
    tituloCorto: "plan d'épargne",
    paraQuien: F(
      "Pour voir combien ton épargne grandit avec le temps et ce qui change si tu verses plus ou obtiens un autre taux",
      "Pour voir combien votre épargne grandit avec le temps et ce qui change si vous versez plus ou obtenez un autre taux",
    ),
    descripcion: [
      F(
        "Un rapport PDF avec la projection de ton épargne : ce que tu verses, ce que tu gagnes en intérêts et ce que tu as à la fin.",
        "Un rapport PDF avec la projection de votre épargne : ce que vous versez, ce que vous gagnez en intérêts et ce que vous avez à la fin.",
      ),
      F(
        "Il contient tous les tableaux de ton calcul en entier et le même calcul avec d'autres taux, pour choisir où épargner avec des chiffres.",
        "Il contient tous les tableaux de votre calcul en entier et le même calcul avec d'autres taux, pour choisir où épargner avec des chiffres.",
      ),
    ],
    gancho: F("Garde ton plan d'épargne par écrit, année par année", "Gardez votre plan d'épargne par écrit, année par année"),
    incluye: [
      { titulo: "La projection complète", texto: "Toutes les lignes du tableau, pas seulement les premières." },
      { titulo: "Avec d'autres taux", texto: "Pour comparer les options avant de choisir." },
      { titulo: "Un plan à tenir", texto: "Les étapes pour que l'épargne ne reste pas une intention." },
    ],
    pasos: {
      titulo: "Pour tenir le plan",
      items: [
        F("Programme le versement le jour de ta paie : ce que tu ne vois pas, tu ne le dépenses pas.", "Programmez le versement le jour de votre paie : ce que vous ne voyez pas, vous ne le dépensez pas."),
        F(
          "Compare le taux avec l'inflation : si le taux est plus bas, ton argent perd de la valeur même si le chiffre augmente.",
          "Comparez le taux avec l'inflation : si le taux est plus bas, votre argent perd de la valeur même si le chiffre augmente.",
        ),
        F("Rouvre ce rapport une fois par an et mets tes données à jour.", "Rouvrez ce rapport une fois par an et mettez vos données à jour."),
      ],
    },
    escenarios: AUTRES_TAUX,
  },
  "plan-deudas": {
    nombre: "Plan pour rembourser la carte",
    tituloCorto: "plan de remboursement de la carte",
    paraQuien: F(
      "Pour savoir quand tu auras fini de rembourser ta carte, ce que ça coûte en intérêts et comment finir plus tôt",
      "Pour savoir quand vous aurez fini de rembourser votre carte, ce que cela coûte en intérêts et comment finir plus tôt",
    ),
    descripcion: [
      F(
        "Un rapport PDF avec ta dette mois par mois : ce que tu paies, la part d'intérêts et la baisse du solde.",
        "Un rapport PDF avec votre dette mois par mois : ce que vous payez, la part d'intérêts et la baisse du solde.",
      ),
      F(
        "Il contient le tableau complet jusqu'au dernier paiement et le même calcul avec d'autres versements, pour voir ce que tu économises en payant un peu plus chaque mois.",
        "Il contient le tableau complet jusqu'au dernier paiement et le même calcul avec d'autres versements, pour voir ce que vous économisez en payant un peu plus chaque mois.",
      ),
    ],
    gancho: F("Vois mois par mois quand ta carte sera remboursée", "Voyez mois par mois quand votre carte sera remboursée"),
    incluye: [
      { titulo: "Mois par mois jusqu'au dernier paiement", texto: "Avec les intérêts de chaque mois." },
      { titulo: "Avec d'autres versements", texto: F("Pour voir combien plus tôt tu finis en payant un peu plus.", "Pour voir combien plus tôt vous finissez en payant un peu plus.") },
      { titulo: "Un plan de sortie", texto: "Les étapes pour ne pas retomber dans les dettes." },
    ],
    pasos: {
      titulo: "Pour sortir de la dette",
      items: [
        F("Arrête d'utiliser la carte pendant le remboursement : chaque nouvel achat allonge le tableau.", "Arrêtez d'utiliser la carte pendant le remboursement : chaque nouvel achat allonge le tableau."),
        F(
          "Paie toujours plus que le minimum. Même un peu : le tableau avec d'autres versements montre ce que tu économises.",
          "Payez toujours plus que le minimum. Même un peu : le tableau avec d'autres versements montre ce que vous économisez.",
        ),
        F("Si tu as plusieurs dettes, rembourse d'abord celle au taux le plus élevé et le minimum sur les autres.", "Si vous avez plusieurs dettes, remboursez d'abord celle au taux le plus élevé et le minimum sur les autres."),
        F("Demande à ta banque un rachat de crédit à un taux plus bas et compare-le avec ce rapport.", "Demandez à votre banque un rachat de crédit à un taux plus bas et comparez-le avec ce rapport."),
      ],
    },
    escenarios: { titulo: "Avec d'autres versements mensuels", explica: "La même dette en payant un peu moins et un peu plus chaque mois." },
  },
  "plan-presupuesto": {
    nombre: "Plan de budget",
    tituloCorto: "plan de budget",
    paraQuien: F(
      "Pour organiser ton mois avec un plan clair : combien pour les dépenses fixes, les envies et l'épargne",
      "Pour organiser votre mois avec un plan clair : combien pour les dépenses fixes, les envies et l'épargne",
    ),
    descripcion: [
      F(
        "Un rapport PDF qui transforme ton calcul en plan : combien consacrer à chaque poste, dans ta monnaie et avec tes chiffres.",
        "Un rapport PDF qui transforme votre calcul en plan : combien consacrer à chaque poste, dans votre monnaie et avec vos chiffres.",
      ),
      "Il inclut le même plan avec d'autres montants, pour savoir à l'avance ce qui change un mois avec plus ou moins d'argent, et les étapes pour le tenir.",
    ],
    gancho: F("Transforme ce calcul en plan pour ton mois", "Transformez ce calcul en plan pour votre mois"),
    incluye: [
      { titulo: F("Ton plan avec tes chiffres", "Votre plan avec vos chiffres"), texto: "Combien pour chaque poste, prêt à suivre." },
      { titulo: "Avec d'autres montants", texto: "Pour ajuster le plan si le mois change." },
      { titulo: "Les étapes pour le tenir", texto: "Ce qui fait durer un budget au-delà du premier mois." },
    ],
    pasos: {
      titulo: "Pour que le budget fonctionne",
      items: [
        F(
          "Mets l'épargne de côté le jour de la paie, avant de dépenser. Ce qui reste, c'est ce que tu peux dépenser.",
          "Mettez l'épargne de côté le jour de la paie, avant de dépenser. Ce qui reste, c'est ce que vous pouvez dépenser.",
        ),
        F("Note tes dépenses pendant un mois, même sur ton téléphone, et compare-les avec ce plan.", "Notez vos dépenses pendant un mois, même sur votre téléphone, et comparez-les avec ce plan."),
        F("Constitue d'abord une épargne de précaution : une surprise ne finira pas sur la carte.", "Constituez d'abord une épargne de précaution : une surprise ne finira pas sur la carte."),
      ],
    },
    escenarios: AUTRES_MONTANTS,
  },
  "plan-negocio": {
    nombre: "Rapport chiffré pour l'entreprise",
    tituloCorto: "rapport d'entreprise",
    paraQuien: "Pour décider de prix, de marges ou d'un investissement avec des chiffres clairs, prêts à montrer à un associé",
    descripcion: [
      F(
        "Un rapport PDF avec ton calcul expliqué étape par étape : les données utilisées, la méthode et le résultat.",
        "Un rapport PDF avec votre calcul expliqué étape par étape : les données utilisées, la méthode et le résultat.",
      ),
      F(
        "Il ajoute un tableau du même calcul pour d'autres montants, pour voir l'effet d'un coût qui monte ou d'un prix que tu baisses.",
        "Il ajoute un tableau du même calcul pour d'autres montants, pour voir l'effet d'un coût qui monte ou d'un prix que vous baissez.",
      ),
    ],
    gancho: F("Transforme ces chiffres en rapport pour décider ou pour convaincre", "Transformez ces chiffres en rapport pour décider ou pour convaincre"),
    incluye: [
      { titulo: "Le calcul expliqué", texto: "Pour le comprendre et le défendre devant un associé ou une banque." },
      { titulo: "Avec d'autres montants", texto: "Pour voir à l'avance l'effet d'un changement de prix ou de coût." },
      { titulo: "Questions pour décider", texto: "Ce qu'il faut vérifier avant de toucher à un prix." },
    ],
    pasos: {
      titulo: "Avant de décider",
      items: [
        F("Vérifie que les coûts incluent tout : livraison, commissions, taxes et ton propre temps.", "Vérifiez que les coûts incluent tout : livraison, commissions, taxes et votre propre temps."),
        F("Compare ton prix avec celui de deux ou trois concurrents avant de le changer.", "Comparez votre prix avec celui de deux ou trois concurrents avant de le changer."),
        F("Regarde le pire cas du tableau : si l'activité tient là, la décision est plus sûre.", "Regardez le pire cas du tableau : si l'activité tient là, la décision est plus sûre."),
      ],
    },
    escenarios: AUTRES_MONTANTS,
  },
  "kit-freelance": {
    nombre: "Kit de tarif freelance",
    tituloCorto: "kit de tarif freelance",
    paraQuien: F("Pour facturer ton travail à sa juste valeur et présenter ton tarif avec assurance", "Pour facturer votre travail à sa juste valeur et présenter votre tarif avec assurance"),
    descripcion: [
      F(
        "Un rapport PDF avec ton tarif horaire expliqué : le revenu que tu vises, les heures que tu factures vraiment et les frais qu'il couvre.",
        "Un rapport PDF avec votre tarif horaire expliqué : le revenu que vous visez, les heures que vous facturez vraiment et les frais qu'il couvre.",
      ),
      F(
        "Il donne le tarif pour d'autres objectifs de revenu et une lettre prête à envoyer à un client avec ton tarif horaire.",
        "Il donne le tarif pour d'autres objectifs de revenu et une lettre prête à envoyer à un client avec votre tarif horaire.",
      ),
    ],
    gancho: F("Présente ton tarif avec des chiffres, pas avec des excuses", "Présentez votre tarif avec des chiffres, pas avec des excuses"),
    incluye: [
      { titulo: F("Ton tarif expliqué", "Votre tarif expliqué"), texto: F("Pour répondre quand on te demande pourquoi ce prix.", "Pour répondre quand on vous demande pourquoi ce prix.") },
      { titulo: "Pour d'autres objectifs de revenu", texto: "Le tarif nécessaire pour chacun." },
      { titulo: "Lettre de tarif prête", texto: F("Remplie avec ton chiffre, à envoyer à tes clients.", "Remplie avec votre chiffre, à envoyer à vos clients.") },
    ],
    pasos: {
      titulo: "Pour facturer au juste prix",
      items: [
        F("Ne compte que les heures facturables : réunions, devis et relances sont aussi du travail.", "Ne comptez que les heures facturables : réunions, devis et relances sont aussi du travail."),
        F("Quand c'est possible, propose un prix au projet : le client achète un résultat, pas des heures.", "Quand c'est possible, proposez un prix au projet : le client achète un résultat, pas des heures."),
        F("Revois ton tarif une fois par an, ou plus tôt si tes frais augmentent.", "Revoyez votre tarif une fois par an, ou plus tôt si vos frais augmentent."),
      ],
    },
    nota: {
      titulo: "Lettre de tarif",
      uso: F("Remplis-la avec les données du client et envoie-la avec ta proposition.", "Remplissez-la avec les données du client et envoyez-la avec votre proposition."),
      pedido: "Suite à notre échange, voici mon tarif pour les prestations dont nous avons parlé. Mon tarif horaire est de",
      cierre: "Ce tarif couvre le temps de travail et les frais propres à l'activité. Je reste à votre disposition pour établir une proposition au projet.",
    },
    escenarios: { titulo: "Pour d'autres objectifs de revenu", explica: "Le même calcul avec des objectifs de revenu plus bas et plus élevés." },
  },
  "plan-sueldo": {
    nombre: "Rapport de salaire",
    tituloCorto: "rapport de salaire",
    paraQuien: "Pour négocier un salaire, une offre ou une augmentation en sachant ce que cela fait à l'heure, au mois et à l'année",
    descripcion: [
      F("Un rapport PDF avec ton calcul de salaire expliqué, avec tes chiffres et chaque donnée utilisée.", "Un rapport PDF avec votre calcul de salaire expliqué, avec vos chiffres et chaque donnée utilisée."),
      "Il ajoute un tableau avec d'autres montants, pour comparer des offres ou demander une augmentation avec des chiffres clairs.",
    ],
    gancho: F("Négocie ton salaire avec les chiffres par écrit", "Négociez votre salaire avec les chiffres par écrit"),
    incluye: [
      { titulo: F("Ton calcul complet", "Votre calcul complet"), texto: F("Avec chaque donnée que tu as saisie.", "Avec chaque donnée que vous avez saisie.") },
      { titulo: "Avec d'autres montants", texto: "Pour comparer deux offres en une minute." },
      { titulo: "Idées pour négocier", texto: "Quoi dire et quoi demander en plus du chiffre." },
    ],
    pasos: {
      titulo: "Pour négocier",
      items: [
        F(
          "Parle en montants annuels ou horaires pour comparer des offres : les montants mensuels cachent des écarts.",
          "Parlez en montants annuels ou horaires pour comparer des offres : les montants mensuels cachent des écarts.",
        ),
        F("Demande aussi ce qui n'est pas du salaire : jours de congé, télétravail, formation ou prime.", "Demandez aussi ce qui n'est pas du salaire : jours de congé, télétravail, formation ou prime."),
        F(
          "Arrive avec un chiffre précis et sa raison : ton expérience, le marché ou ce qui a changé dans ton poste.",
          "Arrivez avec un chiffre précis et sa raison : votre expérience, le marché ou ce qui a changé dans votre poste.",
        ),
      ],
    },
    escenarios: AUTRES_MONTANTS,
  },
  "kit-calculos": {
    nombre: "Calcul expliqué étape par étape",
    tituloCorto: "calcul expliqué",
    paraQuien: "Pour avoir le calcul résolu et expliqué, prêt à imprimer, réviser ou montrer",
    descripcion: [
      F("Un rapport PDF avec ton calcul, la façon de le résoudre et le résultat, avec tes chiffres.", "Un rapport PDF avec votre calcul, la façon de le résoudre et le résultat, avec vos chiffres."),
      "Il sert à réviser, à garder une trace d'un calcul ou à le montrer à quelqu'un sans avoir à l'expliquer.",
    ],
    gancho: F("Garde le calcul expliqué étape par étape", "Gardez le calcul expliqué étape par étape"),
    incluye: [
      { titulo: "Le calcul résolu", texto: F("Avec tes données et le résultat.", "Avec vos données et le résultat.") },
      { titulo: "Comment il se calcule", texto: "Pour comprendre d'où vient chaque chiffre." },
      { titulo: "Prêt à imprimer", texto: "Ou à enregistrer en PDF et partager." },
    ],
    pasos: {
      titulo: "Pour le vérifier",
      items: [
        F("Fais le calcul à l'envers : pars du résultat et reviens à la donnée de départ.", "Faites le calcul à l'envers : partez du résultat et revenez à la donnée de départ."),
        F("N'arrondis qu'à la fin : arrondir à chaque étape change le résultat.", "N'arrondissez qu'à la fin : arrondir à chaque étape change le résultat."),
      ],
    },
    escenarios: AUTRES_MONTANTS,
  },
  "kit-gastos-grupo": {
    nombre: "Récapitulatif des dépenses du groupe",
    tituloCorto: "récapitulatif des dépenses",
    paraQuien: "Pour que chacun sache ce qu'il doit, sans dispute ni calcul sur un coin de nappe",
    descripcion: [
      "Un récapitulatif PDF des dépenses du groupe : le total, la part de chacun et, si besoin, qui doit combien à qui.",
      "Il se partage par message ou s'imprime : personne n'a à refaire le calcul.",
    ],
    gancho: F("Partage le compte avec le groupe, clair et sans dispute", "Partagez le compte avec le groupe, clair et sans dispute"),
    incluye: [
      { titulo: "La part de chacun", texto: "Avec le total et le détail sous les yeux." },
      { titulo: "Prêt à partager", texto: "En PDF, à envoyer au groupe." },
      { titulo: "Avec d'autres totaux", texto: "Au cas où quelque chose s'ajoute." },
    ],
    pasos: {
      titulo: "Pour solder les comptes",
      items: [
        F("Envoie le récapitulatif au groupe avant que quelqu'un paie : ça évite les malentendus.", "Envoyez le récapitulatif au groupe avant que quelqu'un paie : cela évite les malentendus."),
        "Mettez-vous d'accord sur un moyen de paiement et une date pour régler.",
      ],
    },
    escenarios: { titulo: "Avec d'autres totaux", explica: "Le même partage si le total est un peu plus bas ou plus élevé." },
  },
  "kit-estudio": {
    nombre: "Rapport de moyenne",
    tituloCorto: "rapport de moyenne",
    paraQuien: F("Pour avoir ta moyenne claire et par écrit, avec le poids de chaque note", "Pour avoir votre moyenne claire et par écrit, avec le poids de chaque note"),
    descripcion: [
      F("Un rapport PDF avec ta moyenne : chaque note, son coefficient et comment on arrive au résultat.", "Un rapport PDF avec votre moyenne : chaque note, son coefficient et comment on arrive au résultat."),
      "Il sert à vérifier une note, préparer le prochain examen ou présenter le calcul à qui de droit.",
    ],
    gancho: F("Garde ta moyenne expliquée par écrit", "Gardez votre moyenne expliquée par écrit"),
    incluye: [
      { titulo: "Chaque note avec son coefficient", texto: "Pour voir laquelle pèse le plus." },
      { titulo: "Le calcul étape par étape", texto: "Pour le vérifier ou le montrer." },
      { titulo: "Idées pour le prochain examen", texto: "Comment utiliser la moyenne pour s'organiser." },
    ],
    pasos: {
      titulo: "Pour le prochain examen",
      items: [
        F("Regarde quelle note pèse le plus et consacre plus de temps à cette matière ou à cet examen.", "Regardez quelle note pèse le plus et consacrez plus de temps à cette matière ou à cet examen."),
        F("Si une note semble mal calculée, montre ce rapport à ton enseignant.", "Si une note semble mal calculée, montrez ce rapport à votre enseignant."),
      ],
    },
  },
  "kit-fechas": {
    nombre: "Rapport de dates et délais",
    tituloCorto: "rapport de dates",
    paraQuien: "Pour avoir une date ou un délai calculé par écrit, prêt à présenter ou à ne pas oublier",
    descripcion: [
      F(
        "Un rapport PDF avec ton calcul de dates : les dates saisies, le résultat et la façon de compter.",
        "Un rapport PDF avec votre calcul de dates : les dates saisies, le résultat et la façon de compter.",
      ),
      "Il sert pour une démarche, un contrat, une échéance ou simplement pour garder l'information.",
    ],
    gancho: F("Garde cette date par écrit, prête à présenter", "Gardez cette date par écrit, prête à présenter"),
    incluye: [
      { titulo: "Le calcul expliqué", texto: "Avec les dates et la façon de compter les jours." },
      { titulo: "Prêt à présenter", texto: "Pour une démarche ou joint à un contrat." },
      { titulo: F("Pour tes archives", "Pour vos archives"), texto: "Avec la date à laquelle il a été fait." },
    ],
    pasos: {
      titulo: "Avant d'utiliser une date pour une démarche",
      items: [
        F("Vérifie si le délai se compte en jours calendaires ou ouvrés : le résultat change.", "Vérifiez si le délai se compte en jours calendaires ou ouvrés : le résultat change."),
        F("Regarde si le dernier jour tombe un jour férié ou un week-end.", "Regardez si le dernier jour tombe un jour férié ou un week-end."),
        F("Note l'échéance dans ton agenda avec un rappel quelques jours avant.", "Notez l'échéance dans votre agenda avec un rappel quelques jours avant."),
      ],
    },
  },
  "plan-salud": {
    nombre: "Rapport IMC et calories",
    tituloCorto: "rapport IMC et calories",
    paraQuien: F("Pour avoir tes chiffres de poids et d'énergie par écrit et les apporter en consultation", "Pour avoir vos chiffres de poids et d'énergie par écrit et les apporter en consultation"),
    descripcion: [
      F(
        "Un rapport PDF avec ton résultat expliqué : ce qu'il mesure, comment il se calcule et dans quelle plage il se situe, avec tes données.",
        "Un rapport PDF avec votre résultat expliqué : ce qu'il mesure, comment il se calcule et dans quelle plage il se situe, avec vos données.",
      ),
      "C'est une information générale pour en parler avec un professionnel de santé. Ce n'est pas un diagnostic et cela ne remplace pas une consultation.",
    ],
    gancho: F("Apporte tes chiffres en consultation, expliqués et par écrit", "Apportez vos chiffres en consultation, expliqués et par écrit"),
    incluye: [
      { titulo: F("Ton résultat expliqué", "Votre résultat expliqué"), texto: "Ce qu'il mesure et comment il se calcule." },
      { titulo: "Questions pour la consultation", texto: "Pour mieux profiter du rendez-vous." },
      { titulo: "Pour suivre l'évolution", texto: F("Garde chaque rapport et compare dans le temps.", "Gardez chaque rapport et comparez dans le temps.") },
    ],
    pasos: {
      titulo: "Pour en parler avec un professionnel",
      items: [
        F(
          "Apporte ce rapport et demande quelle plage est saine pour toi, selon ton âge et tes antécédents.",
          "Apportez ce rapport et demandez quelle plage est saine pour vous, selon votre âge et vos antécédents.",
        ),
        F(
          "Explique comment tu manges, combien tu bouges et comment tu dors : les chiffres seuls ne disent pas tout.",
          "Expliquez comment vous mangez, combien vous bougez et comment vous dormez : les chiffres seuls ne disent pas tout.",
        ),
        F("Ne change pas fortement ton alimentation ou ton activité sans avis préalable.", "Ne changez pas fortement votre alimentation ou votre activité sans avis préalable."),
      ],
    },
    aviso: "Information générale. Elle ne remplace pas l'avis d'un professionnel de santé.",
  },
  "plan-embarazo": {
    nombre: "Rapport fertilité et grossesse",
    tituloCorto: "rapport fertilité et grossesse",
    paraQuien: F("Pour avoir tes dates estimées par écrit et les apporter à ton prochain rendez-vous", "Pour avoir vos dates estimées par écrit et les apporter à votre prochain rendez-vous"),
    descripcion: [
      F(
        "Un rapport PDF avec tes dates estimées et la façon dont chacune est calculée, avec les données saisies.",
        "Un rapport PDF avec vos dates estimées et la façon dont chacune est calculée, avec les données saisies.",
      ),
      "Les dates sont des estimations : chaque corps et chaque grossesse sont différents. Elles servent à s'organiser et à en parler avec un professionnel de santé, sans remplacer le suivi.",
    ],
    gancho: F("Garde tes dates par écrit pour ton prochain rendez-vous", "Gardez vos dates par écrit pour votre prochain rendez-vous"),
    incluye: [
      { titulo: F("Tes dates estimées", "Vos dates estimées"), texto: "Avec la façon dont chacune est calculée." },
      { titulo: "Questions pour le rendez-vous", texto: "Pour en profiter au mieux." },
      { titulo: F("Pour tes archives", "Pour vos archives"), texto: "Avec les données utilisées." },
    ],
    pasos: {
      titulo: F("Pour ton prochain rendez-vous", "Pour votre prochain rendez-vous"),
      items: [
        F("Apporte ce rapport et la date de tes dernières règles au rendez-vous.", "Apportez ce rapport et la date de vos dernières règles au rendez-vous."),
        F("Demande quels examens sont prévus selon la semaine et quand a lieu le prochain rendez-vous.", "Demandez quels examens sont prévus selon la semaine et quand a lieu le prochain rendez-vous."),
        F("Au moindre symptôme inquiétant, consulte sans attendre les dates du rapport.", "Au moindre symptôme inquiétant, consultez sans attendre les dates du rapport."),
      ],
    },
    aviso: "Information générale. Les dates sont des estimations et ne remplacent pas le suivi par un professionnel de santé.",
  },
  "plan-entrenamiento": {
    nombre: "Rapport d'allure de course",
    tituloCorto: "rapport d'allure",
    paraQuien: F("Pour partir courir en connaissant ton allure cible et comment répartir l'effort", "Pour partir courir en connaissant votre allure cible et comment répartir l'effort"),
    descripcion: [
      F(
        "Un rapport PDF avec ton allure, ton temps et ta vitesse expliqués, avec les données saisies.",
        "Un rapport PDF avec votre allure, votre temps et votre vitesse expliqués, avec les données saisies.",
      ),
      "Il contient tous les tableaux du calcul en entier et des conseils pour utiliser l'allure à l'entraînement.",
    ],
    gancho: F("Garde ton allure par écrit pour le jour de la course", "Gardez votre allure par écrit pour le jour de la course"),
    incluye: [
      { titulo: F("Ton allure expliquée", "Votre allure expliquée"), texto: "Avec le temps et la vitesse." },
      { titulo: "À imprimer et emporter", texto: "Dans la poche ou sur le frigo." },
      { titulo: "Conseils d'entraînement", texto: "Comment utiliser l'allure sans se blesser." },
    ],
    pasos: {
      titulo: "Pour utiliser l'allure",
      items: [
        F("Pars les premières minutes un peu plus lentement que l'objectif : la fin te remerciera.", "Partez les premières minutes un peu plus lentement que l'objectif : la fin vous remerciera."),
        F("Entraîne-toi la plupart de la semaine à une allure confortable, où tu peux parler.", "Entraînez-vous la plupart de la semaine à une allure confortable, où vous pouvez parler."),
        F("Si tu as mal, arrête-toi et consulte : l'allure peut attendre.", "Si vous avez mal, arrêtez-vous et consultez : l'allure peut attendre."),
      ],
    },
    aviso: "Information générale. Elle ne remplace pas l'avis d'un professionnel de santé ou du sport.",
  },
  "kit-viaje": {
    nombre: "Budget carburant du trajet",
    tituloCorto: "budget carburant",
    paraQuien: F("Pour savoir ce que tu vas dépenser en carburant et le partager entre les voyageurs", "Pour savoir ce que vous allez dépenser en carburant et le partager entre les voyageurs"),
    descripcion: [
      F(
        "Un rapport PDF avec le coût en carburant de ton trajet, avec tes chiffres : distance, consommation et prix.",
        "Un rapport PDF avec le coût en carburant de votre trajet, avec vos chiffres : distance, consommation et prix.",
      ),
      "Il ajoute un tableau avec d'autres prix du carburant, au cas où ils changent avant le départ, et une liste pour budgéter le reste du voyage.",
    ],
    gancho: F("Garde le coût du trajet par écrit avant de partir", "Gardez le coût du trajet par écrit avant de partir"),
    incluye: [
      { titulo: "Le coût du trajet", texto: "Avec distance, consommation et prix." },
      { titulo: "Avec d'autres prix", texto: "Au cas où le carburant augmente avant le départ." },
      { titulo: "Liste pour le reste du voyage", texto: "Péages, parking et repas." },
    ],
    pasos: {
      titulo: "Pour budgéter le voyage",
      items: [
        F("Ajoute péages, parking et repas au coût du carburant.", "Ajoutez péages, parking et repas au coût du carburant."),
        F("Si vous voyagez à plusieurs, divise le total et préviens tout le monde avant de partir.", "Si vous voyagez à plusieurs, divisez le total et prévenez tout le monde avant de partir."),
        F("Vérifie la pression des pneus : sous-gonflée, la voiture consomme plus.", "Vérifiez la pression des pneus : sous-gonflée, la voiture consomme plus."),
      ],
    },
    escenarios: { titulo: "Avec d'autres prix", explica: "Le même trajet avec un carburant un peu moins cher et un peu plus cher." },
  },
  "kit-hogar": {
    nombre: "Rapport de consommation électrique",
    tituloCorto: "rapport de consommation électrique",
    paraQuien: F("Pour savoir ce que te coûte chaque appareil et où économiser sur ta facture d'électricité", "Pour savoir ce que vous coûte chaque appareil et où économiser sur votre facture d'électricité"),
    descripcion: [
      F("Un rapport PDF avec le coût de ton appareil, avec tes chiffres d'utilisation et le prix de l'électricité.", "Un rapport PDF avec le coût de votre appareil, avec vos chiffres d'utilisation et le prix de l'électricité."),
      "Il ajoute un tableau avec d'autres prix de l'électricité et une liste d'idées pour baisser la facture.",
    ],
    gancho: F("Découvre ce que te coûte cet appareil et comment réduire la note", "Découvrez ce que vous coûte cet appareil et comment réduire la note"),
    incluye: [
      { titulo: "Le coût selon l'utilisation", texto: "Expliqué étape par étape." },
      { titulo: "Avec d'autres prix", texto: "Au cas où le tarif augmente." },
      { titulo: "Idées pour économiser", texto: "Celles qui se voient le plus sur la facture." },
    ],
    pasos: {
      titulo: "Pour baisser la facture",
      items: [
        F("Débranche ce qui reste en veille : les appareils éteints consomment aussi.", "Débranchez ce qui reste en veille : les appareils éteints consomment aussi."),
        F("Utilise les appareils gourmands aux heures creuses, si ton contrat en prévoit.", "Utilisez les appareils gourmands aux heures creuses, si votre contrat en prévoit."),
        F("Compare ce rapport avec ta facture pour voir quelle part du total représente cet appareil.", "Comparez ce rapport avec votre facture pour voir quelle part du total représente cet appareil."),
      ],
    },
    escenarios: { titulo: "Avec d'autres prix", explica: "La même consommation avec une électricité un peu moins chère et un peu plus chère." },
  },
  "kit-obra": {
    nombre: "Liste de matériaux pour les travaux",
    tituloCorto: "liste de matériaux",
    paraQuien: "Pour acheter les matériaux en juste quantité, sans manque ni surplus",
    descripcion: [
      F(
        "Un rapport PDF avec ton calcul de matériaux : mesures, quantités et méthode, prêt à emporter au magasin.",
        "Un rapport PDF avec votre calcul de matériaux : mesures, quantités et méthode, prêt à emporter au magasin.",
      ),
      "Il comprend une liste pour bien acheter : la marge pour les pertes, quoi demander et quoi vérifier avant de commencer.",
    ],
    gancho: F("Arrive au magasin avec ta liste de matériaux en main", "Arrivez au magasin avec votre liste de matériaux en main"),
    incluye: [
      { titulo: "Mesures et quantités", texto: F("Tout ce que tu as calculé, sur une page.", "Tout ce que vous avez calculé, sur une page.") },
      { titulo: "À montrer au magasin", texto: F("Pour qu'on te fasse un devis juste.", "Pour qu'on vous fasse un devis juste.") },
      { titulo: "Liste pour bien acheter", texto: "Marge pour les pertes et points à vérifier." },
    ],
    pasos: {
      titulo: "Avant d'acheter",
      items: [
        F("Ajoute 5 à 10 % pour les coupes et la casse, ou plus si la forme est irrégulière.", "Ajoutez 5 à 10 % pour les coupes et la casse, ou plus si la forme est irrégulière."),
        F("Achète tout dans le même lot : la couleur et la teinte peuvent changer d'un lot à l'autre.", "Achetez tout dans le même lot : la couleur et la teinte peuvent changer d'un lot à l'autre."),
        F("Fais confirmer le rendement du produit choisi : il varie selon les marques.", "Faites confirmer le rendement du produit choisi : il varie selon les marques."),
        F("Garde le ticket et les restes non ouverts : beaucoup de magasins les reprennent.", "Gardez le ticket et les restes non ouverts : beaucoup de magasins les reprennent."),
      ],
    },
  },
  "kit-facturacion": {
    nombre: "Rapport de TVA",
    tituloCorto: "rapport de TVA",
    paraQuien: F(
      "Pour facturer ou vérifier un prix avec la taxe bien séparée, prêt pour tes archives ou ton comptable",
      "Pour facturer ou vérifier un prix avec la taxe bien séparée, prêt pour vos archives ou votre comptable",
    ),
    descripcion: [
      F("Un rapport PDF avec ton calcul : prix HT, TVA et TTC, avec le taux appliqué et sa source.", "Un rapport PDF avec votre calcul : prix HT, TVA et TTC, avec le taux appliqué et sa source."),
      "Il ajoute un tableau avec d'autres montants, pratique pour établir une grille de prix HT et TTC.",
    ],
    gancho: F("Garde le prix HT et TTC par écrit", "Gardez le prix HT et TTC par écrit"),
    incluye: [
      { titulo: "La taxe séparée", texto: "HT, TVA et TTC, avec le taux en vigueur." },
      { titulo: "Avec d'autres montants", texto: "Pour établir une grille de prix d'un coup." },
      { titulo: F("Pour ton comptable", "Pour votre comptable"), texto: "Avec la source du taux et la date." },
    ],
    pasos: {
      titulo: "Avant de facturer",
      items: [
        F("Vérifie si ton produit ou service relève du taux normal ou d'un taux réduit.", "Vérifiez si votre produit ou service relève du taux normal ou d'un taux réduit."),
        F("Vérifie que la facture affiche le HT et la TVA séparément, si c'est obligatoire.", "Vérifiez que la facture affiche le HT et la TVA séparément, si c'est obligatoire."),
        F("Garde ce rapport avec la facture pour ta comptabilité.", "Gardez ce rapport avec la facture pour votre comptabilité."),
      ],
    },
    escenarios: AUTRES_MONTANTS,
  },
  "informe-calculo": {
    nombre: "Rapport de calcul",
    tituloCorto: "rapport de calcul",
    paraQuien: F(
      "Pour avoir ce calcul par écrit, avec tes chiffres, ses hypothèses et la source de chaque valeur officielle",
      "Pour avoir ce calcul par écrit, avec vos chiffres, ses hypothèses et la source de chaque valeur officielle",
    ),
    descripcion: [
      F(
        "Un rapport PDF du calcul que tu viens de faire, étape par étape et avec tes données : le résultat, les hypothèses retenues et chaque valeur officielle avec sa source et la date de vérification.",
        "Un rapport PDF du calcul que vous venez de faire, étape par étape et avec vos données : le résultat, les hypothèses retenues et chaque valeur officielle avec sa source et la date de vérification.",
      ),
      F(
        "À garder dans tes dossiers ou à montrer à ton comptable, à ton employeur ou à toute personne qui doit le vérifier, sans tout réexpliquer.",
        "À garder dans vos dossiers ou à montrer à votre comptable, à votre employeur ou à toute personne qui doit le vérifier, sans tout réexpliquer.",
      ),
    ],
    gancho: F("Garde ce calcul par écrit, avec ses sources", "Gardez ce calcul par écrit, avec ses sources"),
    incluye: [
      { titulo: "Le résultat avec tes données", texto: F("Tel que tu l'as calculé, prêt à imprimer.", "Tel que vous l'avez calculé, prêt à imprimer.") },
      { titulo: "Comment il se calcule", texto: "Les étapes et les hypothèses, pour retrouver l'origine de chaque chiffre." },
      { titulo: "Les sources officielles", texto: "Chaque valeur avec l'organisme, le lien et la date de vérification." },
    ],
    pasos: {
      titulo: "Avant de l'utiliser",
      items: [
        F("Vérifie que les données en haut sont bien les tiennes : le résultat en dépend.", "Vérifiez que les données en haut sont bien les vôtres : le résultat en dépend."),
        F(
          "Si une valeur officielle a changé, refais le calcul : le rapport utilise celles en vigueur le jour de l'achat.",
          "Si une valeur officielle a changé, refaites le calcul : le rapport utilise celles en vigueur le jour de l'achat.",
        ),
      ],
    },
  },
};

export const fr: DiccionarioVenta = {
  familias,
  general: { si: "Oui", no: "Non" },
  tarjeta: {
    cejaInforme: "Rapport PDF",
    cejaPlanilla: "Tableur Excel",
    pagoUnico: "paiement unique",
    comprarInforme: "Je veux mon rapport",
    comprarPlanilla: "Je veux mon tableur",
    confianza: F(
      "Tu paies avec PayPal ou par carte. Si ça ne te sert pas, on te rembourse sous 7 jours.",
      "Vous payez avec PayPal ou par carte. Si cela ne vous sert pas, nous vous remboursons sous 7 jours.",
    ),
    verDetalle: "Voir le contenu",
    tambien: F("Ceci peut aussi t'être utile :", "Ceci peut aussi vous être utile :"),
    tablasOficiales: "Barèmes officiels",
    bajadaInforme: F(
      "Le rapport le détaille étape par étape avec tes chiffres et la source de chaque valeur, prêt à imprimer ou enregistrer en PDF.",
      "Le rapport le détaille étape par étape avec vos chiffres et la source de chaque valeur, prêt à imprimer ou enregistrer en PDF.",
    ),
    bajadaPlanilla: F(
      "Le tableur le reprend avec tes chiffres et les formules visibles, pour changer ce que tu veux.",
      "Le tableur le reprend avec vos chiffres et les formules visibles, pour changer ce que vous voulez.",
    ),
    bajadaPlanillaHoja: F(
      "Le tableur le reprend dans l'onglet « {hoja} » avec tes chiffres et les formules visibles, pour changer ce que tu veux.",
      "Le tableur le reprend dans l'onglet « {hoja} » avec vos chiffres et les formules visibles, pour changer ce que vous voulez.",
    ),
    equivale: "Environ {monto} au taux de change du jour.",
    cobroDolares: "Facturé en dollars américains.",
  },
  aviso: {
    pronto: "Bientôt en vente",
    titulo: F("Préviens-moi quand ce sera disponible", "Prévenez-moi quand ce sera disponible"),
    ayuda: F("On t'écrit une seule fois, quand ce sera en vente.", "Nous vous écrivons une seule fois, quand ce sera en vente."),
    boton: "Me prévenir",
    listo: F("C'est noté. On te prévient à cette adresse dès que c'est en vente.", "C'est noté. Nous vous prévenons à cette adresse dès que c'est en vente."),
    error: F(
      "Impossible d'enregistrer l'adresse. Vérifie qu'elle est bien écrite et réessaie.",
      "Impossible d'enregistrer l'adresse. Vérifiez qu'elle est bien écrite et réessayez.",
    ),
    correo: F("Ton e-mail", "Votre e-mail"),
  },
  planilla: {
    gancho: F("Emporte ce calcul dans Excel, avec tes données déjà saisies", "Emportez ce calcul dans Excel, avec vos données déjà saisies"),
    incluye: [
      { titulo: F("Tes données déjà saisies", "Vos données déjà saisies"), texto: "Une cellule jaune change et tout se recalcule." },
      { titulo: "Salaire, primes et fin de contrat", texto: "Dans un seul fichier utile toute l'année." },
      { titulo: "À jour à chaque changement officiel", texto: "Le même lien donne la nouvelle version, sans repayer." },
    ],
  },
  informe: {
    tusDatos: F("Tes données", "Vos données"),
    resultado: "Résultat",
    corregir: "Corriger mes données",
    actualizar: "Mettre à jour le rapport",
    imprimir: "Imprimer ou enregistrer en PDF",
    imprimirAyuda: F("Dans la fenêtre d'impression, choisis « Enregistrer au format PDF » pour avoir le fichier.", "Dans la fenêtre d'impression, choisissez « Enregistrer au format PDF » pour avoir le fichier."),
    sinResultado: F("Complète tes données dans « Corriger mes données » pour établir le rapport.", "Complétez vos données dans « Corriger mes données » pour établir le rapport."),
    lugar: "Lieu et date",
    destinatario: "À l'attention de",
    firma: "Signature",
    nombre: "Nom",
    documento: "Pièce d'identité",
    etiquetaEnMinuscula: true,
    comoSeCalcula: "Comment c'est calculé",
    fuentes: "Sources officielles",
    verificado: "vérifié le",
    emitido: "Établi le",
    valores: "Valeurs officielles en vigueur au",
    numero: "Rapport",
    elegir: F("Choisis le calcul du rapport :", "Choisissez le calcul du rapport :"),
    legal: F(
      "Ce rapport est une estimation établie avec les règles et les valeurs officielles indiquées, à la date indiquée. Il ne remplace pas l'avis d'un professionnel ni la décision de l'autorité compétente. Si une de tes données est différente, le résultat change : corrige-la et imprime à nouveau.",
      "Ce rapport est une estimation établie avec les règles et les valeurs officielles indiquées, à la date indiquée. Il ne remplace pas l'avis d'un professionnel ni la décision de l'autorité compétente. Si une de vos données est différente, le résultat change : corrigez-la et imprimez à nouveau.",
    ),
    legalSinFuentes: F(
      "Ce rapport est une estimation établie avec les données que tu as saisies, à la date indiquée. Il ne remplace pas l'avis d'un professionnel. Si une donnée change, le résultat aussi : corrige-la et imprime à nouveau.",
      "Ce rapport est une estimation établie avec les données que vous avez saisies, à la date indiquée. Il ne remplace pas l'avis d'un professionnel. Si une donnée change, le résultat aussi : corrigez-la et imprimez à nouveau.",
    ),
    errorTitulo: "Impossible d'ouvrir ce rapport",
    error: F(
      "Nous n'avons pas pu confirmer le paiement de ce lien. Si l'argent a quitté ton compte, écris-nous et nous réglons ça. Si l'achat n'a pas abouti, tu peux le refaire.",
      "Nous n'avons pas pu confirmer le paiement de ce lien. Si l'argent a quitté votre compte, écrivez-nous et nous réglons cela. Si l'achat n'a pas abouti, vous pouvez le refaire.",
    ),
    verificar: F(
      "Nous n'avons pas pu vérifier le paiement pour l'instant. Réessaie dans quelques minutes : inutile de payer à nouveau.",
      "Nous n'avons pas pu vérifier le paiement pour l'instant. Réessayez dans quelques minutes : inutile de payer à nouveau.",
    ),
    cupo: F("Trop de tentatives d'affilée. Attends quelques minutes et rouvre le lien.", "Trop de tentatives d'affilée. Attendez quelques minutes et rouvrez le lien."),
  },
  catalogo: {
    tituloProducto: "{nombre} ({pais})",
    disparadorInforme: "Chaque fois qu'une valeur officielle utilisée par le calcul change",
    planillaDescripcion: F(
      "Un tableur Excel prêt à l'emploi : tu saisis tes données dans les cellules jaunes et les calculs se font seuls, avec des formules qui suivent {normas}.",
      "Un tableur Excel prêt à l'emploi : vous saisissez vos données dans les cellules jaunes et les calculs se font seuls, avec des formules qui suivent {normas}.",
    ),
    planillaIncluye: "Il comprend {incluye}. Chaque onglet montre les étapes, et l'onglet des barèmes officiels donne chaque valeur avec sa source et la date de vérification.",
  },
  planillas: {
    migaPlanillas: "Tableurs et rapports",
    catalogoTitulo: "Tableurs et rapports pour {pais}",
    catalogoBajada: F(
      "Des tableurs Excel et des rapports PDF avec tes chiffres et les données officielles du pays. Tu paies une fois, sans abonnement.",
      "Des tableurs Excel et des rapports PDF avec vos chiffres et les données officielles du pays. Vous payez une fois, sans abonnement.",
    ),
    seccionPlanillas: "Tableurs Excel",
    seccionInformes: "Rapports PDF",
    catalogoVacio: F(
      "Bientôt, tu trouveras ici des tableurs pour {pais}. En attendant, les calculatrices sont gratuites.",
      "Bientôt, vous trouverez ici des tableurs pour {pais}. En attendant, les calculatrices sont gratuites.",
    ),
    verCalculadoras: "Voir les calculatrices",
    comprar: "Acheter pour {precio}",
    pronto: "Bientôt en vente",
    incluye: "Ce qui est inclus",
    incluyeInforme: [
      F("Le rapport avec tes chiffres, sur une page que tu imprimes ou enregistres en PDF.", "Le rapport avec vos chiffres, sur une page que vous imprimez ou enregistrez en PDF."),
      F(
        "Un lien qui n'expire pas : tu peux corriger tes données et le réimprimer quand tu veux.",
        "Un lien qui n'expire pas : vous pouvez corriger vos données et le réimprimer quand vous voulez.",
      ),
      F("Si ça ne te sert pas, on te rembourse sous 7 jours.", "Si cela ne vous sert pas, nous vous remboursons sous 7 jours."),
    ],
    incluyePlanilla: [
      "Le fichier .xlsx, qui s'ouvre dans Excel et Google Sheets.",
      "Les mises à jour : {disparador}, nous le mettons à jour et le même lien télécharge la nouvelle version.",
      F("Si ça ne te sert pas, on te rembourse sous 7 jours.", "Si cela ne vous sert pas, nous vous remboursons sous 7 jours."),
    ],
    pagoUnico: F("Paiement unique avec PayPal. Tu peux payer avec ton compte ou par carte.", "Paiement unique avec PayPal. Vous pouvez payer avec votre compte ou par carte."),
    comprarPlanilla: "Acheter le {titulo}",
    comprarBajadaInforme: F("On t'envoie le lien du rapport à cette adresse dès que le paiement est confirmé.", "Nous vous envoyons le lien du rapport à cette adresse dès que le paiement est confirmé."),
    comprarBajadaPlanilla: F("On t'envoie le tableur à cette adresse dès que le paiement est confirmé.", "Nous vous envoyons le tableur à cette adresse dès que le paiement est confirmé."),
    etiquetaEmail: F("Ton e-mail", "Votre e-mail"),
    seguirPago: "Continuer vers le paiement",
    privacidad: F("Nous utilisons ton e-mail uniquement pour t'envoyer ton achat et ses mises à jour.", "Nous utilisons votre e-mail uniquement pour vous envoyer votre achat et ses mises à jour."),
    datosTitulo: F("Avec les chiffres de ton calcul", "Avec les chiffres de votre calcul"),
    datosUsar: F(
      "Utiliser ces chiffres dans mon achat. Ils sont gardés uniquement pour préparer ton achat.",
      "Utiliser ces chiffres dans mon achat. Ils sont gardés uniquement pour préparer votre achat.",
    ),
    errores: {
      email: F("Vérifie l'adresse : il semble manquer quelque chose.", "Vérifiez l'adresse : il semble manquer quelque chose."),
      error: F(
        "Impossible de lancer le paiement. Rien n'a été débité. Réessaie dans quelques minutes.",
        "Impossible de lancer le paiement. Rien n'a été débité. Réessayez dans quelques minutes.",
      ),
      cancelado: F("Tu as annulé le paiement. Rien n'a été débité.", "Vous avez annulé le paiement. Rien n'a été débité."),
      fallido: F("PayPal n'a pas accepté le paiement. Tu peux essayer avec une autre carte.", "PayPal n'a pas accepté le paiement. Vous pouvez essayer avec une autre carte."),
      pronto: "Pas encore en vente.",
    },
    graciasTitulo: F("Merci pour ton achat", "Merci pour votre achat"),
    graciasListoInforme: F(
      "Ton paiement est confirmé. Tu peux ouvrir ton {titulo} dès maintenant. On t'a aussi envoyé le lien par e-mail, et il n'expire pas.",
      "Votre paiement est confirmé. Vous pouvez ouvrir votre {titulo} dès maintenant. Nous vous avons aussi envoyé le lien par e-mail, et il n'expire pas.",
    ),
    graciasListoPlanilla: F(
      "Ton paiement est confirmé. Tu peux télécharger le {titulo} dès maintenant. On te l'a aussi envoyé par e-mail, avec un lien qui n'expire pas.",
      "Votre paiement est confirmé. Vous pouvez télécharger le {titulo} dès maintenant. Nous vous l'avons aussi envoyé par e-mail, avec un lien qui n'expire pas.",
    ),
    graciasPendiente: F(
      "Nous attendons la confirmation de PayPal. Dès qu'elle arrive, on t'envoie ton achat par e-mail.",
      "Nous attendons la confirmation de PayPal. Dès qu'elle arrive, nous vous envoyons votre achat par e-mail.",
    ),
    muestraIntro: "Voici l'onglet « {hoja} » avec les données d'exemple qu'il contient à l'ouverture. Les calculs sont ceux du jour, avec les valeurs officielles en vigueur.",
    muestraLeyenda: [F("c'est toi qui remplis", "c'est vous qui remplissez"), "le tableur le calcule"],
    comprobar: F(
      "Vérifie avant de payer : la calculatrice gratuite donne les mêmes chiffres. Essaie ce même cas et compare.",
      "Vérifiez avant de payer : la calculatrice gratuite donne les mêmes chiffres. Essayez ce même cas et comparez.",
    ),
    comprobarEnlace: "Aller à la calculatrice gratuite",
    faqTitulo: "Questions fréquentes",
    faq: {
      sheets: {
        pregunta: "Est-ce que ça marche dans Google Sheets et Excel ?",
        respuesta: F(
          "Oui. C'est un fichier .xlsx : il s'ouvre dans Excel et Google Sheets (tu le déposes dans ton Drive et tu l'ouvres là). Les calculs sont des formules classiques, sans macros.",
          "Oui. C'est un fichier .xlsx : il s'ouvre dans Excel et Google Sheets (vous le déposez dans votre Drive et vous l'ouvrez là). Les calculs sont des formules classiques, sans macros.",
        ),
      },
      recibo: {
        pregunta: "Comment je le reçois ?",
        respuesta: F(
          "Dès que le paiement est confirmé, on te l'envoie par e-mail, avec un lien de téléchargement qui n'expire pas. Tu peux aussi le télécharger depuis la page qui s'ouvre après le paiement.",
          "Dès que le paiement est confirmé, nous vous l'envoyons par e-mail, avec un lien de téléchargement qui n'expire pas. Vous pouvez aussi le télécharger depuis la page qui s'ouvre après le paiement.",
        ),
      },
      dolares: {
        pregunta: "Est-ce facturé en dollars ?",
        respuesta: F(
          "Oui. Le prix est en dollars américains (USD) et le paiement se fait avec PayPal, avec ton compte ou par carte.",
          "Oui. Le prix est en dollars américains (USD) et le paiement se fait avec PayPal, avec votre compte ou par carte.",
        ),
        conReferencia: F(
          "Plus haut, on t'indique un équivalent dans ta monnaie au taux du jour, à titre indicatif : le montant final dépend du taux de ta banque ou de ta carte.",
          "Plus haut, nous vous indiquons un équivalent dans votre monnaie au taux du jour, à titre indicatif : le montant final dépend du taux de votre banque ou de votre carte.",
        ),
        sinReferencia: F("Si ta carte est dans une autre monnaie, ta banque fait la conversion.", "Si votre carte est dans une autre monnaie, votre banque fait la conversion."),
      },
      devolucion: {
        pregunta: "Puis-je être remboursé ?",
        respuesta: F(
          "Oui. Si le tableur ne te sert pas, réponds à l'e-mail de livraison sous 7 jours et on te rembourse.",
          "Oui. Si le tableur ne vous sert pas, répondez à l'e-mail de livraison sous 7 jours et nous vous remboursons.",
        ),
      },
      actualiza: { pregunta: "Est-il mis à jour quand les valeurs officielles changent ?", respuesta: "Oui. {disparador}, nous le mettons à jour et le même lien télécharge la nouvelle version." },
    },
    descargar: "Télécharger le tableur (.xlsx)",
    abrirInforme: "Ouvrir mon rapport",
    fuentes: "Sources officielles utilisées",
    calculadoras: "Fonctionne avec ces calculatrices",
    muestra: "Aperçu",
  },
  correo: {
    asuntoInforme: F("Ton achat sur CalcularYa : {titulo}", "Votre achat sur CalcularYa : {titulo}"),
    asuntoPlanilla: "{titulo} : téléchargement et mises à jour",
    mismosNumeros: "Les chiffres sont les mêmes que dans la {enlace}, avec la donnée officielle.",
    enlaceCalculadora: "calculatrice gratuite de CalcularYa",
    comprobante: F("Ceci est le justificatif de ton achat sur {marca}.", "Ceci est le justificatif de votre achat sur {marca}."),
    informe: {
      encabezado: F("Ton rapport est prêt", "Votre rapport est prêt"),
      intro: F("Merci pour ton achat : {titulo}. Ouvre-le ici :", "Merci pour votre achat : {titulo}. Ouvrez-le ici :"),
      boton: "Ouvrir mon rapport",
      abre: F("Il s'ouvre dans ton navigateur. De là, tu l'imprimes ou tu l'enregistres en PDF.", "Il s'ouvre dans votre navigateur. De là, vous l'imprimez ou vous l'enregistrez en PDF."),
      guarda: F("Garde cet e-mail", "Gardez cet e-mail"),
      vence: F(
        "Le lien est à toi et n'expire pas. Le rapport utilise les valeurs officielles en vigueur le jour de ton achat, et tu peux corriger tes données et le réimprimer quand tu veux.",
        "Le lien est à vous et n'expire pas. Le rapport utilise les valeurs officielles en vigueur le jour de votre achat, et vous pouvez corriger vos données et le réimprimer quand vous voulez.",
      ),
      devolucion: F(
        "Si le rapport ne te sert pas, réponds à cet e-mail sous 7 jours et on te rembourse.",
        "Si le rapport ne vous sert pas, répondez à cet e-mail sous 7 jours et nous vous remboursons.",
      ),
      ayuda: F("Un souci ? Réponds à cet e-mail ou écris-nous à {contacto}.", "Un souci ? Répondez à cet e-mail ou écrivez-nous à {contacto}."),
    },
    planilla: {
      encabezado: F("Ton tableur est prêt", "Votre tableur est prêt"),
      intro: F("Merci pour l'achat du {titulo}. Télécharge-le ici :", "Merci pour l'achat du {titulo}. Téléchargez-le ici :"),
      boton: "Télécharger le tableur (.xlsx)",
      abre: "S'ouvre dans Excel et Google Sheets.",
      guarda: F("Garde cet e-mail", "Gardez cet e-mail"),
      vence: F(
        "Le lien est à toi et n'expire pas. {disparador}, nous mettons le tableur à jour et le même lien te donne la version actuelle. Tu n'as pas à repayer.",
        "Le lien est à vous et n'expire pas. {disparador}, nous mettons le tableur à jour et le même lien vous donne la version actuelle. Vous n'avez pas à repayer.",
      ),
      devolucion: F(
        "Si le tableur ne te sert pas, réponds à cet e-mail sous 7 jours et on te rembourse.",
        "Si le tableur ne vous sert pas, répondez à cet e-mail sous 7 jours et nous vous remboursons.",
      ),
      ayuda: F("Un souci ? Réponds à cet e-mail ou écris-nous à {contacto}.", "Un souci ? Répondez à cet e-mail ou écrivez-nous à {contacto}."),
    },
  },
};
