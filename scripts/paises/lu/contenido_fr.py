"""Contenido de las calculadoras de lu en francés. Cada afirmación sale de las fuentes citadas en datos.json
(CCSS, guichet.lu, ACD, AED, Code du travail en legilux, STATEC)."""

CONTENIDO = {
    "salaire-brut-net": {
        "h1": "Calcul du salaire net au Luxembourg",
        "title": "Salaire brut net Luxembourg 2026 : calcul du net",
        "description": "Du brut au net au Luxembourg : cotisations maladie, pension et dépendance 2026, retenue d'impôt selon la classe 1, 1a ou 2, crédits CIS et CI-CO2.",
        "intro": [
            "Au Luxembourg, le salaire brut supporte les cotisations sociales du salarié (maladie, pension, dépendance) et la retenue d'impôt sur les salaires. Le crédit d'impôt pour salariés (CIS) et le CI-CO2 viennent ensuite réduire la retenue.",
            "Le calculateur applique les taux de cotisation 2026 publiés par le Centre commun de la sécurité sociale et les formules de retenue de l'Administration des contributions directes.",
        ],
        "como": [
            "Maladie : la moitié de {{lu.cotisation-maladie-soins}} et de {{lu.cotisation-maladie-especes}}. Pension : la moitié de {{lu.cotisation-pension}}. Les deux s'arrêtent au maximum cotisable de {{lu.plafond-cotisable}} par mois.",
            "Dépendance : {{lu.cotisation-dependance}} sur tout le salaire, diminué d'un abattement de {{lu.abattement-dependance}}.",
            "Retenue d'impôt : le salaire moins les cotisations, arrondi aux 5 euros inférieurs, passe dans la formule de la classe d'impôt. L'impôt est ensuite majoré pour le fonds pour l'emploi.",
            "Crédits : le CIS et le CI-CO2 dépendent du salaire brut annuel et disparaissent à partir de 80.000 euros par an.",
        ],
        "ejemplo": ["Pour 5.000 euros bruts en classe 1, les cotisations s'élèvent à environ 638 euros et la retenue à environ 696 euros. Avec 34 euros de crédits, il reste environ 3.700 euros nets."],
        "faq": [
            (
                "Quelle classe d'impôt choisir ?",
                "La classe figure sur votre fiche de retenue d'impôt. La classe 1 vise en général les personnes seules, la classe 2 les personnes mariées ou partenaires, la classe 1a notamment les parents seuls et les personnes de 65 ans et plus.",
            ),
            (
                "Quelles cotisations le salarié paie-t-il ?",
                "La moitié des cotisations maladie et pension, et toute la contribution dépendance. Les assurances accident et santé au travail sont à charge de l'employeur.",
            ),
            (
                "Pourquoi le résultat diffère-t-il de ma fiche de paie ?",
                "La fiche de retenue peut contenir des modérations, comme des frais de déplacement ou des abattements. Les avantages en nature et les primes changent aussi le calcul. La fiche de retenue fait foi.",
            ),
        ],
        "glosario": [
            ("Fiche de retenue d'impôt", "Document de l'ACD qui fixe la classe d'impôt et les modérations appliquées par l'employeur."),
            ("CIS", "Crédit d'impôt pour salariés, versé avec le salaire et dégressif à partir de 40.000 euros bruts par an."),
        ],
    },
    "impot-sur-le-revenu": {
        "h1": "Calcul de l'impôt sur le revenu au Luxembourg",
        "title": "Impôt sur le revenu Luxembourg : calcul par classe",
        "description": "Impôt sur le revenu au Luxembourg selon le barème de l'ACD : classes 1, 1a et 2, contribution au fonds pour l'emploi de 7 % ou 9 % et taux moyen.",
        "intro": [
            "Le barème de l'impôt sur le revenu dépend de la classe d'impôt. Il monte par tranches jusqu'à 42 %. Une contribution au fonds pour l'emploi s'ajoute à l'impôt.",
            "Le calculateur part du revenu imposable, c'est-à-dire du revenu après les frais d'obtention, les dépenses spéciales et les abattements.",
        ],
        "como": [
            "Le revenu imposable est arrondi aux 50 euros inférieurs.",
            "Impôt = taux de la tranche x revenu, moins la déduction de la tranche, arrondi à l'euro inférieur. Les formules sont celles de l'Administration des contributions directes.",
            "Fonds pour l'emploi : l'impôt est majoré de 7 %. Au-delà de 150.000 euros (300.000 euros en classe 2), la majoration passe à 9 % avec une déduction.",
        ],
        "ejemplo": ["Une personne en classe 1 avec 60.000 euros de revenu imposable paie 11.164 euros d'impôt, soit 11.945 euros avec la contribution au fonds pour l'emploi."],
        "faq": [
            (
                "Qu'est-ce que la classe 2 ?",
                "La classe des personnes mariées ou partenaires imposées collectivement. Son barème s'applique au revenu commun du ménage.",
            ),
            ("Quel est le taux maximal ?", "La dernière tranche du barème est imposée à 42 %, avant la contribution au fonds pour l'emploi."),
            (
                "Les crédits d'impôt sont-ils compris ?",
                "Non. Ce calculateur donne l'impôt du barème. Les crédits comme le CIS se déduisent ensuite de l'impôt dû.",
            ),
        ],
        "glosario": [
            ("Fonds pour l'emploi", "Contribution ajoutée à l'impôt sur le revenu, de 7 % ou 9 % selon le revenu."),
            ("Revenu imposable", "Revenu après déduction des frais d'obtention, des dépenses spéciales et des abattements."),
        ],
    },
    "cotisations-sociales": {
        "h1": "Calcul des cotisations sociales du salarié au Luxembourg",
        "title": "Cotisations sociales Luxembourg 2026 : part salarié",
        "description": "Cotisations sociales 2026 du salarié au Luxembourg : maladie, pension et dépendance sur le salaire brut, avec le maximum cotisable de {{lu.plafond-cotisable}}.",
        "intro": [
            "Le salarié paie la moitié des cotisations maladie et pension et toute la contribution dépendance. En 2026, la cotisation pension passe à {{lu.cotisation-pension}} au total.",
            "Le calculateur donne le détail par mois et sur douze mois.",
        ],
        "como": [
            "Maladie : (soins {{lu.cotisation-maladie-soins}} + prestations en espèces {{lu.cotisation-maladie-especes}}) / 2.",
            "Pension : {{lu.cotisation-pension}} / 2. Maladie et pension ne dépassent pas le maximum cotisable de {{lu.plafond-cotisable}} par mois.",
            "Dépendance : {{lu.cotisation-dependance}} du salaire, sans plafond, après un abattement de {{lu.abattement-dependance}}.",
        ],
        "ejemplo": ["Sur 5.000 euros bruts, le salarié paie 152,50 euros de maladie, 425 euros de pension et 60,30 euros de dépendance, soit 637,80 euros par mois."],
        "faq": [
            ("Qu'est-ce que le maximum cotisable ?", "Le plafond de l'assiette de cotisation, égal à cinq fois le salaire social minimum. Au-delà, il n'y a plus de cotisation maladie ni pension."),
            ("La dépendance est-elle plafonnée ?", "Non. Elle s'applique sur tout le salaire, diminué d'un abattement d'un quart du salaire social minimum."),
            ("Qui paie l'assurance accident ?", "L'employeur. Il paie aussi la santé au travail et la Mutualité des employeurs."),
        ],
        "glosario": [
            ("Assiette de cotisation", "Montant du salaire sur lequel les cotisations sont calculées."),
            ("CCSS", "Centre commun de la sécurité sociale, qui perçoit les cotisations."),
        ],
    },
    "cout-employeur": {
        "h1": "Coût employeur au Luxembourg : charges patronales",
        "title": "Coût employeur Luxembourg 2026 : charges patronales",
        "description": "Ce que coûte un salaire à l'employeur au Luxembourg : maladie, pension, accident, santé au travail et Mutualité des employeurs selon les taux 2026.",
        "intro": [
            "Au salaire brut s'ajoutent les charges patronales : la moitié des cotisations maladie et pension, l'assurance accident, la santé au travail et la Mutualité des employeurs.",
            "Le taux de la Mutualité dépend de la classe de l'entreprise. Choisissez la vôtre.",
        ],
        "como": [
            "Maladie : la moitié de {{lu.cotisation-maladie-soins}} et de {{lu.cotisation-maladie-especes}}. Pension : la moitié de {{lu.cotisation-pension}}.",
            "Accident {{lu.cotisation-accident}}, santé au travail {{lu.cotisation-sante-travail}} et Mutualité selon la classe, entièrement à charge de l'employeur.",
            "Toutes ces cotisations s'arrêtent au maximum cotisable de {{lu.plafond-cotisable}} par mois.",
        ],
        "ejemplo": ["Un salaire de 5.000 euros coûte 5.664,50 euros par mois à un employeur en classe 2 de la Mutualité."],
        "faq": [
            ("L'assurance accident a-t-elle un taux unique ?", "Oui, mais il est multiplié par un facteur bonus-malus propre à l'entreprise. Le calculateur utilise le taux unique."),
            ("La dépendance est-elle à charge de l'employeur ?", "Non. La contribution dépendance est entièrement à charge du salarié."),
            ("Que manque-t-il dans ce calcul ?", "Les avantages en nature, les primes et les coûts prévus par une convention collective. Vérifiez-les dans vos contrats."),
        ],
        "glosario": [("Mutualité des employeurs", "Régime qui rembourse aux employeurs une partie des salaires versés pendant les absences pour maladie, financé par cotisations selon des classes.")],
    },
    "salaire-social-minimum": {
        "h1": "Salaire social minimum au Luxembourg",
        "title": "Salaire social minimum Luxembourg 2026 : montants",
        "description": "Salaire social minimum au Luxembourg depuis le 1er juin 2026 : {{lu.ssm-non-qualifie}} non qualifié, {{lu.ssm-qualifie}} qualifié, montants horaires et adolescents.",
        "intro": [
            "Le salaire social minimum (SSM) est le salaire le plus bas qu'un employeur peut verser. Il s'élève à {{lu.ssm-non-qualifie}} par mois pour un salarié non qualifié de 18 ans et plus.",
            "Un salarié qualifié a droit à 20 % de plus, soit {{lu.ssm-qualifie}}. Pour les adolescents, le minimum est réduit.",
        ],
        "como": [
            "Montant mensuel : celui de la catégorie, pour un temps plein de {{lu.heures-par-mois}} heures par mois.",
            "Montant horaire : le mensuel divisé par {{lu.heures-par-mois}}, à quatre décimales.",
            "Temps partiel : le montant horaire multiplié par les heures prestées.",
        ],
        "ejemplo": ["Un salarié qualifié à temps plein touche au moins 3.325,59 euros bruts par mois, soit 19,2231 euros de l'heure."],
        "faq": [
            (
                "Qui est un salarié qualifié ?",
                "Celui qui exerce une profession qui demande une qualification sanctionnée par un certificat officiel au moins du niveau DAP ou CATP. D'autres certificats avec une pratique de 2 ou 5 ans, ou une pratique de 10 ans sans certificat, peuvent aussi donner droit au minimum qualifié.",
            ),
            ("Combien touche un adolescent ?", "{{lu.ssm-jeunes[17-18]}} du minimum non qualifié entre 17 et 18 ans, {{lu.ssm-jeunes[15-17]}} entre 15 et 17 ans."),
            (
                "Quand le salaire social minimum augmente-t-il ?",
                "Avec chaque tranche indiciaire, et lorsque la loi le relève. Le gouvernement présente tous les deux ans un rapport sur son évolution.",
            ),
        ],
        "glosario": [
            ("SSM", "Salaire social minimum."),
            ("Tranche indiciaire", "Adaptation des salaires de 2,5 % à l'évolution du coût de la vie."),
        ],
    },
    "conges-payes": {
        "h1": "Calcul des congés payés au Luxembourg",
        "title": "Congés payés Luxembourg : jours et indemnité",
        "description": "Combien de jours de congé au Luxembourg ? Au moins {{lu.conges-jours}} jours ouvrables par an, au prorata des mois travaillés, et indemnité de congé par jour.",
        "intro": [
            "Au Luxembourg, le congé annuel dure au moins {{lu.conges-jours}} jours ouvrables par an, quel que soit l'âge du salarié.",
            "La première année et l'année du départ, le congé est dû à raison d'un douzième par mois de travail entier.",
        ],
        "como": [
            "Jours acquis = jours de congé de l'année x mois entiers / 12.",
            "Indemnité : le salaire mensuel brut divisé par {{lu.heures-par-mois}} heures donne le salaire horaire, multiplié par les heures d'une journée.",
        ],
        "ejemplo": ["Avec 4.325 euros bruts et des journées de 8 heures, un jour de congé vaut 200 euros. Les 26 jours d'une année complète valent 5.200 euros."],
        "faq": [
            ("Les jours fériés sont-ils compris ?", "Non. Le congé annuel s'ajoute aux jours fériés légaux."),
            ("Le congé peut-il être reporté ?", "Il doit en principe être pris pendant l'année. Le congé proportionnel de la première année peut être reporté à l'année suivante à la demande du salarié."),
            ("Le contrat peut-il prévoir plus de jours ?", "Oui. Un contrat ou une convention collective peut prévoir plus, jamais moins que le minimum légal."),
        ],
        "glosario": [("Jours ouvrables", "Jours de la semaine qui ne sont ni des dimanches ni des jours fériés légaux.")],
    },
    "heures-supplementaires": {
        "h1": "Calcul des heures supplémentaires au Luxembourg",
        "title": "Heures supplémentaires Luxembourg : majoration de {{lu.majoration-heures-sup}}",
        "description": "Heures supplémentaires au Luxembourg : repos d'une heure et demie par heure, ou paiement majoré de {{lu.majoration-heures-sup}} si la récupération est impossible.",
        "intro": [
            "Au Luxembourg, une heure supplémentaire se compense d'abord par une heure et demie de repos rémunéré, ou sur un compte épargne temps.",
            "Si la récupération est impossible ou si le salarié quitte l'entreprise avant de récupérer, chaque heure est payée au salaire horaire majoré de {{lu.majoration-heures-sup}}.",
        ],
        "como": [
            "Salaire horaire = salaire mensuel brut / {{lu.heures-par-mois}}.",
            "Paiement = salaire horaire x heures x (100 % + {{lu.majoration-heures-sup}}).",
            "Repos = heures x 1,5.",
        ],
        "ejemplo": ["Avec 5.190 euros par mois, soit 30 euros de l'heure, 10 heures supplémentaires valent 420 euros, ou 15 heures de repos rémunéré."],
        "faq": [
            (
                "Les heures supplémentaires sont-elles imposées ?",
                "Le paiement de 140 % est exempt d'impôts et de cotisations sociales, à l'exception des cotisations pour prestations en nature sur l'heure non majorée.",
            ),
            ("Qui fixe les modalités ?", "Une convention collective applicable fixe les modalités. Sinon, les règles du Code du travail s'appliquent."),
            ("Les cadres supérieurs sont-ils concernés ?", "Non. Ces règles de rémunération ne s'appliquent pas aux salariés qui ont la qualité de cadres supérieurs."),
        ],
        "glosario": [("Compte épargne temps", "Compte sur lequel les heures supplémentaires sont créditées au même taux pour être récupérées plus tard.")],
    },
    "preavis-licenciement": {
        "h1": "Calcul du préavis de licenciement au Luxembourg",
        "title": "Préavis de licenciement Luxembourg : date de fin",
        "description": "Préavis au Luxembourg selon l'ancienneté : 2, 4 ou 6 mois en cas de licenciement, la moitié en cas de démission. Début le 15 ou le 1er du mois.",
        "intro": [
            "En cas de licenciement, le préavis dépend de l'ancienneté : 2 mois avant 5 ans, 4 mois de 5 à moins de 10 ans, 6 mois à partir de 10 ans.",
            "En cas de démission, le préavis est de la moitié : 1, 2 ou 3 mois.",
        ],
        "como": [
            "Si la résiliation est notifiée avant le 15 du mois, le préavis commence le 15. Sinon, il commence le 1er du mois suivant.",
            "La fin du contrat tombe la veille du même jour, un, deux, quatre ou six mois plus tard.",
            "Le calculateur compte l'ancienneté en années complètes jusqu'à la date de notification.",
        ],
        "ejemplo": ["Un licenciement notifié le 10 octobre 2026 après 6 ans d'ancienneté fait courir un préavis de 4 mois du 15 octobre 2026 au 14 février 2027."],
        "faq": [
            ("Comment le licenciement doit-il être notifié ?", "Par lettre recommandée à la poste. La signature du salarié sur le double de la lettre vaut accusé de réception."),
            ("Et en cas de démission ?", "Le salarié résilie aussi par lettre recommandée. Son préavis est égal à la moitié de celui de l'employeur."),
            (
                "Une petite entreprise peut-elle prolonger le préavis ?",
                "Un employeur de moins de vingt salariés peut choisir un préavis prolongé au lieu de verser l'indemnité de départ, à partir de cinq ans d'ancienneté.",
            ),
        ],
        "glosario": [("Préavis", "Délai entre la notification de la résiliation et la fin du contrat de travail.")],
    },
    "indemnite-de-depart": {
        "h1": "Calcul de l'indemnité de départ au Luxembourg",
        "title": "Indemnité de départ Luxembourg : calcul selon l'ancienneté",
        "description": "Indemnité de départ minimale au Luxembourg : de 1 à 12 mois de salaire selon l'ancienneté à partir de 5 ans, calculée sur les douze derniers mois.",
        "intro": [
            "Le salarié en contrat à durée indéterminée licencié par l'employeur a droit à une indemnité de départ à partir de cinq années d'ancienneté.",
            "Elle va d'un mois de salaire après 5 ans à douze mois après 30 ans.",
        ],
        "como": [
            "Ancienneté : appréciée à la date d'expiration du préavis.",
            "Mois dus : 1 mois dès 5 ans, 2 dès 10, 3 dès 15, 6 dès 20, 9 dès 25 et 12 dès 30 ans.",
            "Base : les salaires bruts des douze derniers mois, sans heures supplémentaires ni gratifications.",
        ],
        "ejemplo": ["Après 12 ans avec un salaire moyen de 4.000 euros, l'indemnité minimale est de 2 mois, soit 8.000 euros."],
        "faq": [
            ("Quand l'indemnité est-elle payée ?", "Au moment où le salarié quitte effectivement le travail."),
            ("Quels salaires comptent ?", "Les salaires bruts des douze derniers mois, y compris les indemnités de maladie et les primes courantes, mais sans heures supplémentaires ni gratifications."),
            ("Une petite entreprise doit-elle la verser ?", "Un employeur de moins de vingt salariés peut opter à la place pour un préavis prolongé."),
        ],
        "glosario": [("Ancienneté", "Durée des services continus chez le même employeur.")],
    },
    "allocations-familiales": {
        "h1": "Calcul des allocations familiales au Luxembourg (CAE)",
        "title": "Allocations familiales Luxembourg 2026 : montants",
        "description": "Allocations familiales au Luxembourg : {{lu.allocation-familiale}} par enfant et par mois, majorations d'âge et allocation de rentrée scolaire.",
        "intro": [
            "Depuis le 1er juin 2026, l'allocation familiale s'élève à {{lu.allocation-familiale}} par enfant et par mois. Une majoration s'ajoute à partir de 6 ans, puis à partir de 12 ans.",
            "Une allocation de rentrée scolaire est versée une fois par an pour les enfants de 6 ans et plus.",
        ],
        "como": [
            "Par mois : {{lu.allocation-familiale}} par enfant, plus {{lu.majoration-age[6-11]}} de 6 à 11 ans ou {{lu.majoration-age[12-plus]}} à partir de 12 ans.",
            "Rentrée scolaire : {{lu.allocation-rentree[6-11]}} de 6 à 11 ans, {{lu.allocation-rentree[12-plus]}} à partir de 12 ans.",
        ],
        "ejemplo": ["Pour trois enfants de 4, 8 et 14 ans, les allocations s'élèvent à 1.028,37 euros par mois et la rentrée scolaire à 350 euros."],
        "faq": [
            ("Le montant dépend-il du nombre d'enfants ?", "Non, dans le système en vigueur depuis le 1er août 2016 : le montant est le même pour chaque enfant."),
            ("Qui verse les allocations ?", "La Caisse pour l'avenir des enfants (CAE), aussi appelée Zukunftskeess."),
            ("Existe-t-il une allocation de naissance ?", "Oui, en trois tranches. Ce calculateur ne la compte pas."),
        ],
        "glosario": [("CAE", "Caisse pour l'avenir des enfants, ou Zukunftskeess, qui verse les prestations familiales.")],
    },
    "droits-enregistrement": {
        "h1": "Calcul des droits d'enregistrement et du Bëllegen Akt",
        "title": "Droits d'enregistrement Luxembourg : Bëllegen Akt 2026",
        "description": "Frais d'achat d'un logement au Luxembourg : 6 % d'enregistrement et 1 % de transcription, moins le crédit d'impôt Bëllegen Akt de {{lu.bellegen-akt}} par acquéreur.",
        "intro": [
            "À l'achat d'une maison, d'un appartement ou d'un terrain à bâtir, les droits s'élèvent à 7 % : {{lu.droits-enregistrement}} d'enregistrement et {{lu.droits-transcription}} de transcription.",
            "Pour son habitation personnelle, chaque acquéreur peut demander le crédit d'impôt Bëllegen Akt, limité à {{lu.bellegen-akt}}.",
        ],
        "como": [
            "Droits = prix x ({{lu.droits-enregistrement}} + {{lu.droits-transcription}}).",
            "Crédit d'impôt : jusqu'à {{lu.bellegen-akt}} par acquéreur. L'administration perçoit dans tous les cas au moins {{lu.droits-minimum}}.",
        ],
        "ejemplo": ["Pour un achat de 750.000 euros, les droits s'élèvent à 52.500 euros. Seul acquéreur, vous payez 12.500 euros après le crédit de 40.000 euros. À deux, il reste 100 euros à payer."],
        "faq": [
            (
                "Quelles conditions pour le Bëllegen Akt ?",
                "Occuper personnellement le bien dans les 2 ans (4 ans pour un terrain ou un immeuble en construction) et pendant au moins 2 ans sans interruption. Le notaire fait la demande dans l'acte.",
            ),
            ("Le crédit vaut-il pour un bien locatif ?", "Non. Les résidences secondaires, les maisons de week-end et les immeubles destinés à la location ou au commerce sont exclus."),
            ("Les non-résidents y ont-ils droit ?", "Oui, s'ils s'engagent à s'installer au Luxembourg dans le bien acquis."),
        ],
        "glosario": [("Bëllegen Akt", "Nom luxembourgeois du crédit d'impôt sur les actes notariés.")],
    },
    "calcul-inflation": {
        "h1": "Calcul de l'inflation au Luxembourg avec l'IPCN",
        "title": "Calcul inflation Luxembourg : convertir avec l'IPCN",
        "description": "Que vaut aujourd'hui un montant d'autrefois ? Calculez l'inflation depuis 2000 avec l'indice des prix à la consommation national (IPCN) de STATEC.",
        "intro": [
            "L'indice des prix à la consommation national (IPCN) mesure l'évolution des prix au Luxembourg. STATEC le publie chaque mois.",
            "Avec le calculateur, vous convertissez un montant vers un autre mois, par exemple pour comparer un loyer ou un prix dans le temps.",
        ],
        "como": [
            "Montant ajusté = montant x IPCN du mois de fin / IPCN du mois de départ.",
            "Le calcul utilise l'IPCN en base 100 au 1er janvier 1948, tel que STATEC le publie.",
            "Si le mois de fin n'est pas encore publié, le calculateur prend le dernier mois disponible.",
        ],
        "ejemplo": ["1.000 euros de janvier 2020 correspondent en septembre 2026 à environ 1.227,50 euros."],
        "faq": [
            ("Quelle est la différence entre IPCN et IPCH ?", "L'IPCN est l'indice national qui sert à l'échelle mobile des salaires. L'IPCH est l'indice harmonisé européen."),
            ("D'où viennent les chiffres ?", "De la base de données LUSTAT de STATEC, mise à jour après chaque publication."),
            ("L'IPCN sert-il à indexer les salaires ?", "Oui, à travers sa moyenne semestrielle. Le calculateur d'indexation des salaires montre où en est la prochaine tranche."),
        ],
        "glosario": [("IPCN", "Indice des prix à la consommation national de STATEC.")],
    },
    "indexation-salaires": {
        "h1": "Indexation des salaires au Luxembourg : prochaine tranche",
        "title": "Indexation des salaires Luxembourg : prochaine tranche",
        "description": "Où en est la prochaine tranche indiciaire au Luxembourg ? Moyenne semestrielle de l'IPCN, cote d'échéance et votre salaire après une hausse de 2,5 %.",
        "intro": [
            "Au Luxembourg, les salaires sont indexés à l'évolution du coût de la vie. Lorsque l'indice augmente de 2,5 %, les salaires sont adaptés dans la même proportion.",
            "Le calculateur compare la dernière moyenne semestrielle de l'IPCN à la prochaine cote d'échéance et montre votre salaire après la tranche.",
        ],
        "como": [
            "Prochaine cote : la cote d'échéance actuelle, {{lu.cote-echeance}}, majorée de 2,5 %.",
            "Reste à parcourir : écart entre la prochaine cote et la dernière moyenne semestrielle publiée par STATEC.",
            "Salaire après la tranche : salaire actuel x 1,025. Le nombre indice applicable est actuellement de {{lu.nombre-indice}}.",
        ],
        "ejemplo": ["En septembre 2026, la moyenne semestrielle de l'IPCN était de 1.058,56 pour une prochaine cote de 1.064,75. Un salaire de 5.000 euros passerait à 5.125 euros."],
        "faq": [
            ("Quand a eu lieu la dernière tranche ?", "Au 1er juin 2026. Le nombre indice applicable est passé à {{lu.nombre-indice}}."),
            ("Tous les salaires sont-ils indexés ?", "Oui, les salaires, traitements et prestations sociales, y compris le salaire social minimum. Pour les salariés détachés au Luxembourg, seul le salaire minimum est indexé."),
            ("Qu'est-ce que le salaire à l'indice 100 ?", "Le salaire ramené à la base de l'échelle mobile : salaire x 100 / nombre indice."),
        ],
        "glosario": [
            ("Cote d'échéance", "Valeur de la moyenne semestrielle de l'IPCN qui déclenche une tranche indiciaire."),
            ("Nombre indice", "Coefficient appliqué aux salaires exprimés à l'indice 100."),
        ],
    },
    "calcul-tva": {
        "h1": "Calcul de la TVA au Luxembourg : 17, 14, 8 et 3 %",
        "title": "Calcul TVA Luxembourg : ajouter ou extraire la TVA",
        "description": "TVA luxembourgeoise au taux normal de {{lu.tva-normal}}, intermédiaire de {{lu.tva-intermediaire}}, réduit de {{lu.tva-reduit}} ou super-réduit de {{lu.tva-super-reduit}}.",
        "intro": [
            "Au Luxembourg, la TVA s'élève à {{lu.tva-normal}} au taux normal. Il existe aussi un taux intermédiaire de {{lu.tva-intermediaire}}, un taux réduit de {{lu.tva-reduit}} et un taux super-réduit de {{lu.tva-super-reduit}}.",
            "Avec le calculateur, vous ajoutez la TVA à un montant ou vous l'extrayez d'un prix TVA comprise.",
        ],
        "como": [
            "Ajouter : le montant multiplié par le taux donne la TVA.",
            "Extraire : le prix TVA comprise divisé par 1,17 (ou 1,14, 1,08 et 1,03) donne le montant hors TVA.",
        ],
        "ejemplo": ["Une facture de 1.000 euros hors TVA coûte 1.170 euros au taux normal."],
        "faq": [
            ("Quels biens relèvent des taux réduits ?", "Ceux énumérés aux annexes A (taux réduit), B (taux super-réduit) et C (taux intermédiaire) de la loi TVA. Les autres opérations relèvent du taux normal."),
            ("La baisse de 2023 s'applique-t-elle encore ?", "Non. Elle valait du 1er janvier au 31 décembre 2023. Les taux de 17, 14 et 8 % s'appliquent de nouveau."),
            ("Qui perçoit la TVA ?", "L'Administration de l'enregistrement, des domaines et de la TVA (AED)."),
        ],
        "glosario": [("AED", "Administration de l'enregistrement, des domaines et de la TVA.")],
    },
}
