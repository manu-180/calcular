"""Contenido de las calculadoras de ch en francés (ch-fr). Mismas afirmaciones que la versión alemana, que
se verificaron en fedlex y en los organismos citados en datos.json."""

CONTENIDO = {
    "brutto-netto-rechner": {
        "h1": "Calcul du salaire net en Suisse",
        "title": "Salaire brut-net Suisse 2026 : calculer les déductions",
        "description": "Du salaire brut au salaire net : AVS/AI/APG, AC, caisse de pension et ANP avec les taux 2026. Par mois et par an, pour 12 ou 13 salaires mensuels.",
        "intro": [
            "En Suisse, le salaire brut supporte les cotisations AVS, AI et APG, l'assurance-chômage, la caisse de pension et la prime d'assurance contre les accidents non professionnels. L'employeur et le salarié paient chacun la moitié de l'AVS/AI/APG ({{ch.ahv-iv-eo-beitragssatz}}) et de l'AC ({{ch.alv-beitragssatz}}).",
            "Le calculateur indique votre salaire net avant impôts. Un éventuel impôt à la source n'est pas déduit.",
        ],
        "como": [
            "AVS/AI/APG : la moitié de {{ch.ahv-iv-eo-beitragssatz}} sur tout le salaire brut.",
            "AC : la moitié de {{ch.alv-beitragssatz}}, mais seulement jusqu'au gain maximal assuré de {{ch.hoechster-versicherter-verdienst}} par an.",
            "Caisse de pension : si le salaire annuel dépasse {{ch.bvg-eintrittsschwelle}}, le salaire coordonné est assuré, soit le salaire annuel jusqu'à {{ch.bvg-obere-grenze}} moins {{ch.bvg-koordinationsabzug}}. La bonification de vieillesse légale va de 7 à 18 % selon l'âge. Sans votre indication, le calculateur en retient la moitié comme votre part.",
            "ANP et perte de gain maladie : le taux que vous indiquez.",
        ],
        "ejemplo": [
            "Pour 6500 francs bruts, 13 salaires mensuels et 35 ans, il faut déduire chaque mois environ 345 francs d'AVS/AI/APG, 72 francs d'AC, 242 francs de caisse de pension et 65 francs d'ANP. Il reste environ 5777 francs nets.",
        ],
        "faq": [
            (
                "Quelles déductions sont fixes et lesquelles ne le sont pas ?",
                "L'AVS/AI/APG avec la moitié de {{ch.ahv-iv-eo-beitragssatz}} et l'AC avec la moitié de {{ch.alv-beitragssatz}} sont fixes. La cotisation à la caisse de pension dépend de l'âge et du règlement, la prime ANP de l'assureur-accidents.",
            ),
            (
                "Pourquoi est-ce que je paie moins de caisse de pension avant 25 ans ?",
                "Les bonifications de vieillesse légales commencent à 25 ans. Avant, la caisse de pension ne vous assure que contre les risques de décès et d'invalidité.",
            ),
            (
                "Le 13e salaire est-il soumis aux déductions ?",
                "Oui. Les gratifications et rémunérations semblables font partie du salaire soumis à l'AVS. Pour la LPP, le 13e salaire compte dans le salaire annuel.",
            ),
            (
                "Pourquoi l'AC est-elle plus basse que prévu pour les hauts salaires ?",
                "L'AC n'est perçue que jusqu'au gain maximal assuré de {{ch.hoechster-versicherter-verdienst}} par an. Au-delà, il n'y a pas de cotisation AC.",
            ),
        ],
        "glosario": [
            ("Salaire coordonné", "Part du salaire annuel assurée obligatoirement dans la caisse de pension."),
            (
                "ANP",
                "Assurance contre les accidents non professionnels. Les personnes qui travaillent au moins huit heures par semaine chez le même employeur y sont assurées. La prime est à la charge du salarié, sauf accord plus favorable.",
            ),
            ("Certificat de salaire", "Attestation annuelle de l'employeur avec le salaire brut, les déductions et le salaire net, pour la déclaration d'impôt."),
        ],
    },
    "netto-brutto-rechner": {
        "h1": "Calculer le salaire brut à partir du net",
        "title": "Salaire net en brut Suisse : le brut pour votre net",
        "description": "Quel salaire brut donne le salaire net souhaité ? Avec AVS/AI/APG, AC, caisse de pension et ANP selon les taux 2026, pour 12 ou 13 salaires mensuels.",
        "intro": [
            "Si vous avez un montant net en tête pour une négociation salariale, il vous faut le salaire brut correspondant. Le calculateur indique le salaire brut nécessaire pour qu'il vous reste le montant souhaité.",
            "Le calcul tient compte des cotisations sociales sans les impôts : AVS/AI/APG, AC, la caisse de pension légale et la prime ANP que vous indiquez.",
        ],
        "como": [
            "Le calculateur cherche le salaire brut pour lequel les déductions du calcul brut-net donnent exactement votre salaire net.",
            "L'AVS/AI/APG et l'AC vous coûtent chacune la moitié de {{ch.ahv-iv-eo-beitragssatz}} et de {{ch.alv-beitragssatz}}. La caisse de pension est comptée avec la moitié de la bonification de vieillesse légale.",
            "Si le salaire annuel dépasse {{ch.bvg-eintrittsschwelle}}, la déduction LPP s'ajoute. C'est pourquoi le salaire brut nécessaire fait un saut à ce seuil.",
        ],
        "ejemplo": ["Pour 5777 francs nets avec 13 salaires mensuels et 35 ans, il faut environ 6500 francs bruts par mois."],
        "faq": [
            (
                "Pourquoi la caisse de pension n'est-elle qu'estimée ?",
                "Chaque caisse de pension a son propre règlement. Le calculateur retient le minimum légal, votre déduction peut être plus élevée.",
            ),
            ("Les impôts sont-ils pris en compte ?", "Non. L'impôt sur le revenu dépend du canton et de la commune. Pour l'impôt fédéral direct, il existe le calculateur de l'impôt fédéral direct."),
            (
                "Que change le 13e salaire ?",
                "Il augmente le salaire annuel. Le salaire coordonné pour la caisse de pension augmente donc lui aussi, et avec lui la déduction LPP mensuelle.",
            ),
        ],
        "glosario": [("Salaire brut", "Salaire avant déduction des cotisations sociales et d'un éventuel impôt à la source.")],
    },
    "lohnkosten-rechner": {
        "h1": "Coût employeur en Suisse : ce que coûte un poste",
        "title": "Coût employeur Suisse : cotisations patronales 2026",
        "description": "Que coûte un salaire brut à l'employeur ? AVS/AI/APG, AC, caisse de pension, caisse d'allocations familiales et accidents professionnels par mois et par an.",
        "intro": [
            "Au salaire brut s'ajoutent pour l'employeur ses propres cotisations sociales. Il paie la moitié de l'AVS/AI/APG et de l'AC, au moins la moitié de la caisse de pension et toute la prime d'assurance contre les accidents professionnels.",
            "La cotisation à la caisse d'allocations familiales varie selon le canton. Indiquez le taux de votre caisse ainsi que la prime de votre assureur-accidents.",
        ],
        "como": [
            "AVS/AI/APG : la moitié de {{ch.ahv-iv-eo-beitragssatz}} sur le salaire brut.",
            "AC : la moitié de {{ch.alv-beitragssatz}} jusqu'au gain maximal assuré de {{ch.hoechster-versicherter-verdienst}} par an.",
            "Caisse de pension : l'employeur paie au moins autant que l'ensemble de ses salariés. Sans votre indication, le calculateur retient la moitié de la bonification de vieillesse légale sur le salaire coordonné.",
            "CAF et accidents professionnels : le taux indiqué. Comme l'AC, la prime AP ne s'applique que jusqu'au gain maximal assuré.",
        ],
        "ejemplo": [
            "Un salaire de 6500 francs (13 salaires mensuels, 35 ans) coûte environ 7288 francs par mois avec 1,5 % de CAF et 0,5 % d'AP. Sur l'année, cela fait environ 94 500 francs.",
        ],
        "faq": [
            (
                "Qui paie l'assurance contre les accidents professionnels ?",
                "Les primes de l'assurance des accidents et maladies professionnels sont à la charge de l'employeur. La prime des accidents non professionnels est à la charge du salarié, sauf accord plus favorable.",
            ),
            (
                "L'employeur doit-il payer la moitié de la caisse de pension ?",
                "Il doit payer au moins autant que l'ensemble de ses salariés. Il peut payer davantage s'il y consent.",
            ),
            (
                "Que manque-t-il dans ce calcul ?",
                "Les frais d'administration de la caisse de compensation AVS, les cotisations prévues par une convention collective et les prestations volontaires. Vérifiez-les dans vos contrats.",
            ),
        ],
        "glosario": [
            ("CAF", "Caisse d'allocations familiales. Elle verse les allocations familiales et perçoit pour cela des cotisations sur les salaires."),
            ("AP", "Assurance contre les accidents professionnels. Sa prime est à la charge de l'employeur."),
        ],
    },
    "bundessteuer-rechner": {
        "h1": "Calcul de l'impôt fédéral direct",
        "title": "Impôt fédéral direct 2026 : calculer l'IFD",
        "description": "Impôt fédéral direct 2026 pour personnes seules, couples mariés et familles : barème de l'art. 36 LIFD, réduction de {{ch.dbst-kinderermaessigung}} par enfant, taux marginal.",
        "intro": [
            "L'impôt fédéral direct est la part de l'impôt sur le revenu qui revient à la Confédération. Le canton et la commune perçoivent leurs propres impôts en plus, qui ne sont pas compris ici.",
            "Le barème est le même dans tout le pays. Le Département fédéral des finances adapte les tranches en raison de la progression à froid, en dernier lieu pour 2026 et 2027. Le calculateur prend le barème de l'année où vous calculez.",
        ],
        "como": [
            "La base est le revenu imposable après toutes les déductions. Le calcul se fait par tranches entières de 100 francs.",
            "Les personnes seules sans enfant paient selon le barème de l'art. 36, al. 1, LIFD. Les personnes mariées et toutes celles qui vivent avec des enfants dans le même ménage et assument l'essentiel de leur entretien paient selon le barème plus bas de l'al. 2.",
            "Avec des enfants, l'impôt diminue de {{ch.dbst-kinderermaessigung}} par enfant. Les montants inférieurs à {{ch.dbst-mindestbetrag}} ne sont pas perçus.",
            "À partir d'un revenu élevé, un taux fixe de 11,5 % s'applique à tout le revenu.",
        ],
        "ejemplo": [
            "Une personne seule avec un revenu imposable de 80 000 francs paie environ 1378 francs d'impôt fédéral direct, soit environ 1,7 % du revenu. Chaque tranche supplémentaire de 100 francs coûte 5,94 francs de plus.",
        ],
        "faq": [
            (
                "Qu'est-ce que le revenu imposable ?",
                "Le revenu après toutes les déductions, par exemple les frais professionnels, les versements au pilier 3a et les primes d'assurance. Il figure dans votre taxation de l'impôt fédéral direct. Il peut différer du revenu imposable cantonal.",
            ),
            (
                "Pourquoi suis-je imposé selon le barème des personnes mariées avec un enfant ?",
                "La loi applique ce barème aussi aux personnes célibataires, divorcées ou veuves qui vivent avec des enfants dans le même ménage et assument l'essentiel de leur entretien. En plus, l'impôt diminue de {{ch.dbst-kinderermaessigung}} par enfant.",
            ),
            (
                "Qu'est-ce que le taux marginal ?",
                "La part d'impôt fédéral que vous payez sur 100 francs de revenu supplémentaires. Il montre combien une déduction, par exemple un versement au pilier 3a, fait économiser sur l'impôt fédéral.",
            ),
            (
                "Quel est le taux maximal de l'impôt fédéral direct ?",
                "11,5 % du revenu imposable. À partir d'une limite fixée dans le barème, de 794 000 francs (personnes seules) et 941 400 francs (personnes mariées) en 2026, ce taux s'applique à tout le revenu.",
            ),
        ],
        "glosario": [
            ("LIFD", "Loi fédérale sur l'impôt fédéral direct."),
            ("Progression à froid", "Charge supplémentaire lorsque les salaires augmentent seulement en raison du renchérissement. La Confédération la compense en adaptant les tranches du barème."),
        ],
    },
    "mwst-rechner": {
        "h1": "Calcul de la TVA en Suisse : {{ch.mwst-normalsatz}}, {{ch.mwst-reduziert}} et {{ch.mwst-beherbergung}}",
        "title": "Calcul TVA Suisse : ajouter ou extraire {{ch.mwst-normalsatz}}",
        "description": "TVA suisse au taux de {{ch.mwst-normalsatz}}, {{ch.mwst-reduziert}} ou {{ch.mwst-beherbergung}} : montant hors TVA et TVA comprise, au centime près.",
        "intro": [
            "En Suisse, la TVA s'élève à {{ch.mwst-normalsatz}}. Les denrées alimentaires, les médicaments, les livres et les journaux sont soumis au taux réduit de {{ch.mwst-reduziert}}. Pour l'hébergement avec petit-déjeuner, le taux spécial est de {{ch.mwst-beherbergung}}.",
            "Avec le calculateur, vous ajoutez la TVA à un montant ou vous l'extrayez d'un prix TVA comprise.",
        ],
        "como": [
            "Ajouter : le montant multiplié par le taux donne la TVA. Montant plus TVA donne le prix TVA comprise.",
            "Extraire : le prix TVA comprise divisé par 1,081 (ou 1,026 et 1,038) donne le montant hors TVA. La différence est la taxe.",
            "Ne déduisez pas simplement {{ch.mwst-normalsatz}} du prix final : vous obtiendriez trop de taxe.",
        ],
        "ejemplo": ["Une offre de 2000 francs hors TVA coûte 2162 francs au taux normal. Elle contient 162 francs de TVA."],
        "faq": [
            (
                "Comment extraire la TVA d'un montant brut ?",
                "Divisez le montant TVA comprise par 1,081. De 108,10 francs, il reste 100 francs hors TVA, la taxe s'élève à 8,10 francs.",
            ),
            (
                "Qu'est-ce qui est soumis au taux réduit ?",
                "Entre autres l'eau amenée par des conduites, les denrées alimentaires sauf les boissons alcooliques, les médicaments, les journaux, les revues et les livres. La liste complète figure à l'art. 25, al. 2, de la loi sur la TVA.",
            ),
            (
                "Le taux réduit s'applique-t-il au restaurant ?",
                "Non. Les mets et boissons servis au restaurant sont soumis au taux normal. Les denrées alimentaires à l'emporter sont soumises au taux réduit, sauf les boissons alcooliques.",
            ),
            (
                "Jusqu'à quand vaut le taux spécial pour l'hébergement ?",
                "La loi le prévoit jusqu'au 31 décembre 2027 au plus tard. Il s'applique aux nuitées avec petit-déjeuner, même si celui-ci est facturé à part.",
            ),
        ],
        "glosario": [
            ("TVA", "Taxe sur la valeur ajoutée, perçue par l'Administration fédérale des contributions."),
            ("Impôt préalable", "La TVA qu'une entreprise paie sur ses achats et qu'elle peut déduire dans son décompte."),
        ],
    },
    "saeule-3a-rechner": {
        "h1": "Pilier 3a : montant maximal et économie d'impôt",
        "title": "Calcul pilier 3a 2026 : maximum et économie d'impôt",
        "description": "Pilier 3a 2026 : jusqu'à {{ch.saeule-3a-mit-pk}} avec caisse de pension, jusqu'à {{ch.saeule-3a-ohne-pk}} sans. Maximum et économie d'impôt fédéral direct.",
        "intro": [
            "Les versements au pilier 3a se déduisent du revenu imposable, auprès de la Confédération, du canton et de la commune. Les personnes affiliées à une caisse de pension peuvent verser {{ch.saeule-3a-mit-pk}} par an.",
            "Sans caisse de pension, la limite est de {{ch.saeule-3a-ohne-pk-satz}} du revenu de l'activité lucrative, au plus {{ch.saeule-3a-ohne-pk}}. Le calculateur indique votre maximum et l'économie d'impôt fédéral direct.",
        ],
        "como": [
            "Avec caisse de pension : 8 % de la limite supérieure LPP, arrondis à {{ch.saeule-3a-mit-pk}}.",
            "Sans caisse de pension : {{ch.saeule-3a-ohne-pk-satz}} du revenu de l'activité lucrative, au plus 40 % de la limite supérieure LPP, soit {{ch.saeule-3a-ohne-pk}}.",
            "Économie : impôt fédéral sur le revenu imposable moins impôt fédéral sur le revenu après déduction du versement, avec les barèmes en vigueur.",
        ],
        "ejemplo": [
            "Une personne seule affiliée à une caisse de pension, avec 80 000 francs de revenu imposable, verse le maximum. Son impôt fédéral direct baisse d'environ 330 francs. L'économie au canton et à la commune s'y ajoute.",
        ],
        "faq": [
            (
                "Combien puis-je verser au pilier 3a en 2026 ?",
                "Avec caisse de pension {{ch.saeule-3a-mit-pk}}. Sans caisse de pension {{ch.saeule-3a-ohne-pk-satz}} du revenu de l'activité lucrative, au plus {{ch.saeule-3a-ohne-pk}}. Dès 2027, les montants passent à 7373 et 36 864 francs.",
            ),
            (
                "Puis-je rattraper des années manquées ?",
                "Oui, à certaines conditions. Vous pouvez combler les lacunes des dix dernières années si vous avez versé la cotisation ordinaire complète l'année du rachat et si vous aviez le droit de cotiser les années concernées. Le rachat annuel est limité au petit montant maximal.",
            ),
            (
                "Jusqu'à quand puis-je verser ?",
                "Au plus jusqu'à cinq ans après l'âge de référence, tant que vous exercez une activité lucrative. L'année où vous cessez de travailler, la cotisation entière est encore possible.",
            ),
            ("Les deux conjoints peuvent-ils verser ?", "Oui. S'ils exercent tous deux une activité lucrative, chacun peut verser et déduire jusqu'à son propre maximum."),
        ],
        "glosario": [
            (
                "Pilier 3a",
                "Prévoyance individuelle liée. Le versement est possible au plus tôt cinq ans avant l'âge de référence, avant seulement dans des cas prévus par la loi, comme l'acquisition d'un logement pour ses propres besoins.",
            ),
            ("Limite supérieure LPP", "Le salaire annuel le plus élevé assuré dans la prévoyance professionnelle obligatoire : {{ch.bvg-obere-grenze}}."),
        ],
    },
    "bvg-rechner": {
        "h1": "Calcul LPP : avoir de vieillesse et rente de la caisse de pension",
        "title": "Calcul LPP : avoir de vieillesse et rente à 65 ans",
        "description": "Combien aurez-vous dans votre caisse de pension à 65 ans ? Bonifications LPP, intérêt {{ch.bvg-mindestzins}} et taux de conversion {{ch.bvg-umwandlungssatz}} : capital et rente.",
        "intro": [
            "Dans la caisse de pension, vous épargnez chaque année une bonification de vieillesse sur le salaire coordonné. Avec les intérêts, elle forme l'avoir de vieillesse, converti en rente au moment de la retraite.",
            "Le calculateur montre le minimum légal selon la LPP. Si votre certificat de prévoyance indique un avoir plus élevé, votre caisse assure davantage que la loi.",
        ],
        "como": [
            "Salaire coordonné : salaire annuel jusqu'à {{ch.bvg-obere-grenze}} moins {{ch.bvg-koordinationsabzug}}, au moins {{ch.bvg-min-koordinierter-lohn}}. N'est assuré que celui qui gagne plus de {{ch.bvg-eintrittsschwelle}}.",
            "Bonification de vieillesse : 7 % de 25 à 34 ans, 10 % de 35 à 44 ans, 15 % de 45 à 54 ans et 18 % de 55 à 65 ans.",
            "Chaque année, l'intérêt sur l'avoir précédent s'ajoute, puis la nouvelle bonification. Sans votre indication, le taux minimal de {{ch.bvg-mindestzins}} s'applique.",
            "Rente : avoir de vieillesse multiplié par le taux de conversion de {{ch.bvg-umwandlungssatz}} à l'âge de référence de 65 ans.",
        ],
        "ejemplo": [
            "Une personne assurée de 45 à 65 ans avec un salaire annuel de 80 000 francs atteint selon la loi un avoir de vieillesse d'environ 198 200 francs. Cela donne une rente d'environ 1123 francs par mois.",
        ],
        "faq": [
            (
                "Qu'est-ce que le taux de conversion ?",
                "Le pourcentage qui convertit l'avoir de vieillesse en rente annuelle. Pour la part obligatoire, il s'élève au moins à {{ch.bvg-umwandlungssatz}} à l'âge de référence de 65 ans.",
            ),
            ("Qui paie les bonifications de vieillesse ?", "L'employeur et les salariés ensemble. L'employeur doit payer au moins autant que l'ensemble des salariés."),
            (
                "Pourquoi mon certificat de prévoyance diffère-t-il ?",
                "Votre caisse peut assurer davantage que la loi ne l'exige ou appliquer ses propres taux. Ce calculateur ne montre que le minimum prescrit par la LPP.",
            ),
        ],
        "glosario": [
            ("Avoir de vieillesse", "Le capital épargné dans la caisse de pension à partir des bonifications de vieillesse et des intérêts."),
            ("Certificat de prévoyance", "Aperçu annuel de la caisse de pension avec l'avoir, le salaire assuré et la rente prévue."),
        ],
    },
    "ahv-rentenrechner": {
        "h1": "Calcul de la rente AVS selon l'échelle 44",
        "title": "Calcul rente AVS 2026 : rente de vieillesse et 13e rente",
        "description": "Calculer la rente de vieillesse AVS : rente complète selon l'échelle 44 entre {{ch.ahv-minimalrente}} et le double, plafonnement pour les couples et 13e rente.",
        "intro": [
            "La rente de vieillesse AVS dépend du revenu annuel moyen déterminant. Pour une durée de cotisation complète, elle s'élève au moins à {{ch.ahv-minimalrente}} et au plus au double par mois.",
            "Depuis 2026, toutes les personnes qui touchent une rente de vieillesse en décembre reçoivent en plus une 13e rente de vieillesse. Le calculateur indique la rente mensuelle, la 13e rente et le montant annuel.",
        ],
        "como": [
            "Le revenu est arrondi à la valeur supérieure de la table des rentes.",
            "Jusqu'à 36 fois la rente minimale : 74 % de la rente minimale plus 13/600 du revenu. Au-delà : 104 % de la rente minimale plus 8/600 du revenu. Le résultat se situe toujours entre la rente minimale et la rente maximale.",
            "Couples : les deux rentes ensemble ne peuvent pas dépasser 150 % de la rente maximale. Sinon, elles sont réduites proportionnellement.",
            "La 13e rente de vieillesse correspond à un douzième de la rente touchée dans l'année et est versée en décembre.",
        ],
        "ejemplo": [
            "Un revenu déterminant de 46 268 francs est arrondi à 46 872 francs et donne une rente de 1935 francs par mois. Si l'épouse touche aussi une rente de 1915 francs, les deux rentes sont plafonnées à 3780 francs ensemble : 1900 et 1880 francs.",
        ],
        "faq": [
            (
                "À combien s'élève la rente AVS en 2026 ?",
                "Pour une durée de cotisation complète, entre {{ch.ahv-minimalrente}} et le double par mois. Dès le 1er janvier 2027, la rente minimale passe à 1280 francs et la rente maximale à 2560 francs.",
            ),
            (
                "Qu'est-ce que le revenu annuel moyen déterminant ?",
                "La moyenne de vos revenus de l'activité lucrative, revalorisés par un facteur tenant compte de l'évolution des salaires, plus d'éventuelles bonifications pour tâches éducatives et d'assistance. Votre caisse de compensation peut vous l'indiquer dans un calcul anticipé de la rente.",
            ),
            (
                "Quand ai-je droit à une rente complète ?",
                "Si vous avez autant d'années de cotisation que votre classe d'âge. S'il manque des années, vous touchez une rente partielle, plus basse que le montant de ce calculateur.",
            ),
            (
                "À combien s'élève la 13e rente AVS ?",
                "Un douzième de la rente de vieillesse touchée durant l'année civile, arrondi au franc. Elle est versée en décembre avec la rente de décembre.",
            ),
        ],
        "glosario": [
            ("Échelle 44", "Table des rentes complètes pour une durée de cotisation complète."),
            ("Plafonnement", "Limitation des deux rentes de vieillesse d'un couple à 150 % de la rente maximale."),
        ],
    },
    "ahv-beitraege-selbststaendige": {
        "h1": "Calcul des cotisations AVS des indépendants",
        "title": "Cotisations AVS indépendants 2026 : barème dégressif",
        "description": "Cotisations AVS/AI/APG des indépendants en 2026 : barème dégressif jusqu'à 60 500 francs, taux plein au-delà et cotisation minimale de {{ch.ahv-mindestbeitrag-selbststaendige}}.",
        "intro": [
            "Les indépendants paient seuls leurs cotisations AVS, AI et APG. Pour les revenus plus bas, un taux réduit s'applique : c'est le barème dégressif.",
            "Les personnes qui gagnent très peu paient la cotisation minimale de {{ch.ahv-mindestbeitrag-selbststaendige}} par an.",
        ],
        "como": [
            "Le calculateur cherche la tranche du barème dans laquelle se situe votre revenu annuel et applique son taux à tout le revenu.",
            "À partir de 60 500 francs, le taux plein de 10 % s'applique : AVS 8,1 %, AI 1,4 % et APG 0,5 %.",
            "Si le revenu est inférieur à la tranche la plus basse, la cotisation minimale est due.",
        ],
        "ejemplo": ["Pour un revenu de 50 000 francs, le taux est de 7,84 %. La cotisation annuelle s'élève à 3920 francs, environ 327 francs par mois."],
        "faq": [
            (
                "Quel revenu compte ?",
                "La caisse de compensation fixe les cotisations définitives sur la base de la taxation fiscale. Elle ajoute au revenu net les cotisations personnelles AVS/AI/APG et déduit un intérêt sur le capital propre engagé dans l'entreprise.",
            ),
            ("Y a-t-il des frais en plus ?", "Oui. Les caisses de compensation perçoivent des contributions aux frais d'administration de 5 % au plus des cotisations."),
            (
                "Dois-je aussi cotiser à l'assurance-chômage ?",
                "Non. Les salariés et les employeurs sont tenus de cotiser à l'AC, pas le revenu d'une activité indépendante.",
            ),
        ],
        "glosario": [
            ("Barème dégressif", "Taux AVS/AI/APG plus bas pour les indépendants dont le revenu est modeste."),
            ("Caisse de compensation", "Organe qui perçoit les cotisations AVS et verse les rentes."),
        ],
    },
    "kapitalbezug-steuer-rechner": {
        "h1": "Retrait en capital : impôt fédéral sur la caisse de pension et le pilier 3a",
        "title": "Impôt sur le retrait en capital : LPP et pilier 3a",
        "description": "Impôt fédéral direct sur le retrait du capital de la caisse de pension ou du pilier 3a : un cinquième du barème selon l'art. 38 LIFD.",
        "intro": [
            "Les personnes qui retirent leur capital de la caisse de pension ou du pilier 3a paient un impôt séparé. Il est perçu séparément des autres revenus, pour l'année du versement.",
            "Le calculateur montre la part de la Confédération. Le canton et la commune imposent aussi le retrait.",
        ],
        "como": [
            "L'impôt fédéral sur les prestations en capital provenant de la prévoyance correspond à un cinquième de l'impôt ordinaire selon le barème du revenu (art. 38 LIFD).",
            "Le barème pour personnes seules ou pour personnes mariées s'applique. Les personnes vivant avec des enfants dans le même ménage utilisent le barème des personnes mariées, mais sans la réduction par enfant.",
            "Aucune déduction sociale n'est accordée. Le calcul se fait par tranches entières de 100 francs.",
        ],
        "ejemplo": ["Pour un capital de 200 000 francs, une personne seule paie environ 2581 francs d'impôt fédéral direct, soit environ 1,3 % du montant."],
        "faq": [
            (
                "Le retrait en capital s'additionne-t-il au salaire ?",
                "Non. Les prestations en capital provenant de la prévoyance sont imposées séparément. Elles ne s'ajoutent pas aux autres revenus de l'année.",
            ),
            ("Cela vaut-il aussi pour le pilier 3a ?", "Oui. Le capital de la prévoyance individuelle liée est imposé comme celui de la caisse de pension."),
            (
                "Pourquoi le canton n'est-il pas compris ?",
                "Chaque canton a ses propres barèmes et règles pour les prestations en capital. Pour l'impôt cantonal, utilisez le calculateur d'impôt de votre canton.",
            ),
        ],
        "glosario": [("Prestation en capital provenant de la prévoyance", "Versement de l'avoir de la caisse de pension ou du pilier 3a en une seule fois au lieu d'une rente.")],
    },
    "arbeitslosengeld-rechner": {
        "h1": "Calcul de l'indemnité de chômage en Suisse",
        "title": "Indemnité de chômage Suisse : calculer l'indemnité AC",
        "description": "Calculer l'indemnité de chômage : {{ch.alv-taggeld-reduziert}} ou {{ch.alv-taggeld-voll}} du gain assuré, indemnité journalière, montant mensuel et nombre maximal d'indemnités selon la LACI.",
        "intro": [
            "Les personnes au chômage qui ont cotisé au moins douze mois au cours des deux dernières années touchent des indemnités journalières de l'assurance-chômage. Une indemnité s'élève à {{ch.alv-taggeld-voll}} ou {{ch.alv-taggeld-reduziert}} du gain assuré.",
            "Le calculateur indique l'indemnité journalière, le montant mensuel et le nombre maximal d'indemnités. Votre caisse de chômage décide de manière contraignante.",
        ],
        "como": [
            "Gain assuré : votre salaire mensuel moyen des six ou douze derniers mois de cotisation, la valeur la plus élevée compte. Au plus {{ch.hoechster-versicherter-verdienst}} par an.",
            "Gain journalier : gain mensuel divisé par {{ch.alv-tage-pro-monat}}.",
            "Ont droit à {{ch.alv-taggeld-voll}} les personnes avec obligation d'entretien envers des enfants de moins de 25 ans, avec une rente AI d'un taux d'invalidité d'au moins 40 % ou avec une indemnité entière ne dépassant pas {{ch.alv-schwelle-volles-taggeld}}. Les autres reçoivent {{ch.alv-taggeld-reduziert}}.",
            "Nombre maximal : 260 indemnités dès 12 mois de cotisation, 400 dès 18, 520 dès 22 mois pour les personnes de 55 ans ou plus ou avec rente AI. Avant 25 ans sans enfant, 200 au plus.",
        ],
        "ejemplo": [
            "Pour un gain assuré de 6000 francs sans enfant, l'indemnité journalière s'élève à environ 194 francs, environ 4200 francs bruts par mois. Avec 24 mois de cotisation et 35 ans, il y a au plus 400 indemnités.",
        ],
        "faq": [
            (
                "Combien vais-je toucher ?",
                "{{ch.alv-taggeld-reduziert}} du gain assuré, ou {{ch.alv-taggeld-voll}} si vous entretenez des enfants de moins de 25 ans, touchez une rente AI d'au moins 40 % ou si votre indemnité entière ne dépasse pas {{ch.alv-schwelle-volles-taggeld}}.",
            ),
            (
                "Pendant combien de temps vais-je toucher des indemnités ?",
                "Cela dépend de la période de cotisation et de l'âge : 260, 400 ou 520 indemnités en deux ans. Avant 25 ans et sans obligation d'entretien, 200 indemnités au plus.",
            ),
            (
                "Qu'est-ce qui est déduit de l'indemnité ?",
                "Les cotisations AVS/AI/APG, une cotisation à la prévoyance professionnelle pour les risques de décès et d'invalidité et au plus deux tiers de la prime d'assurance contre les accidents non professionnels.",
            ),
            ("Comment un mois est-il compté ?", "Un mois correspond à {{ch.alv-tage-pro-monat}} indemnités. Cinq indemnités sont versées par semaine."),
        ],
        "glosario": [
            ("Gain assuré", "Le salaire moyen sur lequel l'indemnité est calculée, au plus jusqu'au montant maximal de l'assurance-accidents."),
            ("Délai-cadre", "Période de deux ans pour la période de cotisation et pour le versement des indemnités."),
        ],
    },
    "13-monatslohn-rechner": {
        "h1": "Calcul du 13e salaire",
        "title": "Calcul du 13e salaire : au prorata en cas d'entrée",
        "description": "Combien de 13e salaire vous revient-il ? Part pour une année entière ou en cas d'entrée et de départ en cours d'année, par mois et par an.",
        "intro": [
            "Si un 13e salaire est convenu, il correspond pour une année entière à un salaire mensuel supplémentaire.",
            "Le calculateur montre la part si vous n'avez pas travaillé toute l'année. Ce que prévoit votre contrat pour les entrées et les départs est déterminant.",
        ],
        "como": [
            "13e salaire = salaire mensuel × mois travaillés / 12.",
            "Chaque mois travaillé donne un douzième de salaire mensuel.",
            "Le 13e salaire subit les mêmes déductions sociales que le salaire normal.",
        ],
        "ejemplo": ["Une personne qui commence mi-mai avec un salaire mensuel de 6500 francs travaille 7,5 mois jusqu'à la fin de l'année. Son 13e salaire s'élève alors à 4062,50 francs."],
        "faq": [
            (
                "Ai-je droit à un 13e salaire ?",
                "Seulement s'il est convenu, dans le contrat de travail, dans une convention collective ou dans un contrat-type de travail. La loi ne l'impose pas.",
            ),
            (
                "Quelle est la différence avec une gratification ?",
                "Une gratification est une rétribution spéciale accordée à certaines occasions. En cas de départ avant cette occasion, une part n'est due que si elle a été convenue.",
            ),
            ("Faut-il payer l'AVS sur le 13e salaire ?", "Oui. Il fait partie du salaire soumis à l'AVS. Le calcul du salaire net vous indique les déductions."),
        ],
        "glosario": [("Gratification", "Rétribution spéciale accordée à certaines occasions, par exemple à Noël. Elle n'est due que si elle a été convenue.")],
    },
    "ferienrechner": {
        "h1": "Calcul des vacances en Suisse : droit aux vacances",
        "title": "Calcul des vacances Suisse : jours et indemnité",
        "description": "Combien de jours de vacances avez-vous ? Au moins {{ch.ferien-wochen}} semaines par an, jusqu'à 20 ans {{ch.ferien-wochen-jugendliche}}. Au prorata en cas de temps partiel, d'entrée ou de départ.",
        "intro": [
            "En Suisse, les salariés ont droit à au moins {{ch.ferien-wochen}} semaines de vacances par année de service. Jusqu'à 20 ans révolus, ils en ont {{ch.ferien-wochen-jugendliche}}.",
            "Le calculateur convertit les semaines en jours de vacances, aussi en cas de temps partiel ou si vous n'êtes pas employé toute l'année de service.",
        ],
        "como": [
            "Jours de vacances par an = semaines de vacances × jours de travail par semaine.",
            "Pour une année de service incomplète, les vacances sont proportionnelles à la durée de l'emploi : jours de vacances × mois / 12.",
            "Le supplément vacances théorique pour un salaire horaire correspond aux semaines de vacances divisées par les autres semaines de l'année : 4 / 48 ou 5 / 47.",
        ],
        "ejemplo": ["Avec une semaine de 3 jours et une demi-année de service, 4 semaines de vacances donnent 6 jours de vacances."],
        "faq": [
            (
                "Combien de jours de vacances ai-je à temps partiel ?",
                "Autant de semaines que les personnes à plein temps. En jours, c'est moins : 4 semaines à raison de 3 jours de travail par semaine donnent 12 jours de vacances.",
            ),
            (
                "L'employeur peut-il payer les vacances au lieu de les accorder ?",
                "Non, tant que durent les rapports de travail. Pendant ce temps, les vacances ne peuvent pas être remplacées par des prestations en argent ou d'autres avantages.",
            ),
            (
                "Qui fixe la date des vacances ?",
                "L'employeur fixe la date et tient compte de vos souhaits dans la mesure compatible avec les intérêts de l'entreprise. Deux semaines de vacances au moins doivent être consécutives.",
            ),
        ],
        "glosario": [("Année de service", "L'année qui commence au début des rapports de travail, et non l'année civile.")],
    },
    "ueberstunden-rechner": {
        "h1": "Calcul des heures supplémentaires en Suisse",
        "title": "Heures supplémentaires Suisse : supplément de {{ch.ueberstunden-zuschlag}}",
        "description": "Payer les heures supplémentaires selon le Code des obligations : salaire normal plus un supplément d'au moins {{ch.ueberstunden-zuschlag}}. À partir du salaire mensuel ou horaire.",
        "intro": [
            "Les heures supplémentaires sont les heures au-delà de la durée de travail convenue ou usuelle. Si elles ne sont pas compensées par un congé, l'employeur doit le salaire normal plus un supplément d'au moins {{ch.ueberstunden-zuschlag}}.",
            "Ce supplément s'applique sauf accord écrit contraire ou disposition d'un contrat-type ou d'une convention collective.",
        ],
        "como": [
            "Salaire horaire à partir du salaire mensuel : salaire mensuel × 12 / 52 / heures par semaine.",
            "Salaire normal pour les heures supplémentaires : salaire horaire × nombre d'heures.",
            "Supplément : {{ch.ueberstunden-zuschlag}} du salaire normal, ou le taux de votre contrat.",
        ],
        "ejemplo": ["Avec un salaire mensuel de 6500 francs et 42 heures par semaine, 10 heures supplémentaires avec supplément coûtent environ 446 francs."],
        "faq": [
            (
                "Dois-je faire des heures supplémentaires ?",
                "Oui, si elles sont nécessaires, dans la mesure où vous pouvez vous en acquitter et où on peut équitablement l'exiger de vous.",
            ),
            (
                "L'employeur peut-il compenser les heures supplémentaires par un congé ?",
                "Oui, avec votre accord et dans un délai convenable. Le congé doit être au moins de même durée que les heures supplémentaires.",
            ),
            (
                "Le supplément peut-il être supprimé ?",
                "Oui, si cela est convenu par écrit ou prévu par un contrat-type ou une convention collective. Sans un tel accord, le supplément d'au moins {{ch.ueberstunden-zuschlag}} s'applique.",
            ),
        ],
        "glosario": [("Heures supplémentaires", "Travail au-delà de la durée de travail convenue ou usuelle, lorsqu'il est nécessaire.")],
    },
    "kuendigungsfrist-rechner": {
        "h1": "Calcul du délai de congé en Suisse",
        "title": "Délai de congé Suisse : dernier jour de travail selon le CO",
        "description": "Délai de congé selon le CO : 7 jours pendant le temps d'essai, puis 1, 2 ou 3 mois selon l'année de service, pour la fin d'un mois. Dernier jour de travail.",
        "intro": [
            "Sans autre accord, les délais de congé du Code des obligations s'appliquent en Suisse. Ils dépendent de l'année de service et courent jusqu'à la fin d'un mois.",
            "Le calculateur compte à partir du jour où le congé parvient au destinataire. La date d'envoi ne joue aucun rôle dans ce calcul.",
        ],
        "como": [
            "Temps d'essai : congé possible à tout moment avec un délai de 7 jours. Sans accord, le premier mois est le temps d'essai. Il peut être prolongé à trois mois au plus.",
            "Après le temps d'essai : 1 mois pendant la première année de service, 2 mois de la deuxième à la neuvième année, puis 3 mois.",
            "Le délai commence le lendemain de la réception. Les rapports de travail prennent fin le dernier jour du mois au cours duquel le délai expire.",
        ],
        "ejemplo": ["Une personne employée depuis mars 2020 qui reçoit son congé le 14 octobre 2026 est dans sa 7e année de service. Avec un délai de 2 mois, les rapports de travail prennent fin le 31 décembre 2026."],
        "faq": [
            (
                "Jusqu'à quand le congé doit-il parvenir ?",
                "Selon le calcul de ce calculateur, le délai doit expirer entièrement avant la fin du mois souhaitée. Avec un délai d'un mois, le congé doit parvenir au plus tard le dernier jour du mois précédent.",
            ),
            (
                "D'autres délais peuvent-ils être convenus ?",
                "Oui, par écrit, dans un contrat-type ou dans une convention collective. Un délai de moins d'un mois n'est possible que par convention collective et seulement pendant la première année de service.",
            ),
            (
                "Qu'est-ce qu'une période de protection ?",
                "Après le temps d'essai, l'employeur ne peut pas résilier, par exemple, pendant une maladie ou un accident non fautif, pendant la grossesse et les 16 semaines qui suivent l'accouchement. En cas de maladie ou d'accident, la protection dure 30 jours la première année de service, 90 jours de la deuxième à la cinquième année, puis 180 jours.",
            ),
        ],
        "glosario": [
            ("Temps d'essai", "Les premières semaines d'un emploi, avec un délai de congé court. Sans accord, c'est le premier mois."),
            ("Période de protection", "Période pendant laquelle l'employeur ne peut pas résilier après le temps d'essai."),
        ],
    },
    "kinderzulagen-rechner": {
        "h1": "Calcul des allocations familiales : enfants et formation",
        "title": "Allocations familiales Suisse 2026 : calcul",
        "description": "Allocations familiales en Suisse : allocation pour enfant d'au moins {{ch.kinderzulage}}, de formation d'au moins {{ch.ausbildungszulage}} par mois. Avec les taux de votre canton.",
        "intro": [
            "Pour les enfants, il existe en Suisse des allocations familiales. La loi fédérale fixe des montants minimaux : {{ch.kinderzulage}} d'allocation pour enfant et {{ch.ausbildungszulage}} d'allocation de formation professionnelle par mois.",
            "Les cantons peuvent prévoir des taux plus élevés. Indiquez les taux de votre canton si vous les connaissez. Sinon, le calculateur retient le minimum.",
        ],
        "como": [
            "Allocation pour enfant : du mois de la naissance jusqu'à la fin du mois au cours duquel l'enfant atteint 16 ans.",
            "Allocation de formation : dès le début d'une formation postobligatoire, au plus tôt dès le mois où l'enfant atteint 15 ans, jusqu'à la fin de la formation, au plus tard jusqu'à la fin du mois où il atteint 25 ans.",
            "Allocations par mois : nombre d'enfants × allocation pour enfant plus nombre d'enfants en formation × allocation de formation.",
        ],
        "ejemplo": ["Deux enfants de moins de 16 ans et un enfant en apprentissage donnent au moins 698 francs par mois, 8376 francs par an."],
        "faq": [
            (
                "À combien s'élève l'allocation pour enfant en 2026 ?",
                "Au moins {{ch.kinderzulage}} par enfant et par mois, l'allocation de formation au moins {{ch.ausbildungszulage}}. Les cantons peuvent prévoir des taux minimaux plus élevés ainsi que des allocations de naissance et d'adoption.",
            ),
            ("Jusqu'à quand l'allocation de formation est-elle versée ?", "Jusqu'à la fin de la formation, au plus tard jusqu'à la fin du mois au cours duquel l'enfant atteint 25 ans."),
            (
                "Y a-t-il une allocation pour un enfant incapable d'exercer une activité lucrative ?",
                "Oui. Pour un enfant incapable d'exercer une activité lucrative, l'allocation pour enfant est versée jusqu'à la fin du mois au cours duquel il atteint 20 ans.",
            ),
        ],
        "glosario": [
            ("Allocation pour enfant", "Allocation familiale pour les enfants jusqu'à la fin du mois où ils atteignent 16 ans."),
            ("Allocation de formation professionnelle", "Allocation familiale pour les enfants en formation postobligatoire, au plus jusqu'à 25 ans."),
        ],
    },
    "mutterschaftsentschaedigung-rechner": {
        "h1": "Calcul de l'allocation de maternité",
        "title": "Allocation de maternité : calcul de l'indemnité APG 2026",
        "description": "Allocation de maternité APG : {{ch.eo-taggeld-satz}} du revenu, au plus {{ch.eo-hoechstbetrag-taggeld}} par jour, pendant {{ch.mutterschaft-tage}} jours. Indemnité et montant total.",
        "intro": [
            "Après la naissance, les mères exerçant une activité lucrative reçoivent une allocation de maternité du régime des allocations pour perte de gain (APG). Elle s'élève à {{ch.eo-taggeld-satz}} du revenu moyen avant la naissance, au plus {{ch.eo-hoechstbetrag-taggeld}} par jour.",
            "L'allocation est versée pendant {{ch.mutterschaft-tage}} jours consécutifs, dès le jour de l'accouchement.",
        ],
        "como": [
            "Salariées : salaire mensuel avant la naissance divisé par 30, ce qui donne le revenu par jour.",
            "Indépendantes : revenu annuel soumis à l'AVS divisé par 360.",
            "Indemnité : {{ch.eo-taggeld-satz}} de ce montant, au plus {{ch.eo-hoechstbetrag-taggeld}}. Montant total : indemnité × {{ch.mutterschaft-tage}} jours.",
        ],
        "ejemplo": ["Pour un salaire mensuel de 5250 francs, l'indemnité journalière s'élève à 140 francs. Pour 98 jours, cela fait 13 720 francs. À partir d'un salaire mensuel de 8250 francs, l'indemnité maximale est atteinte."],
        "faq": [
            ("À combien s'élève l'allocation de maternité ?", "{{ch.eo-taggeld-satz}} du revenu moyen de l'activité lucrative avant la naissance, au plus {{ch.eo-hoechstbetrag-taggeld}} par jour."),
            (
                "Combien dure le congé de maternité ?",
                "Selon le Code des obligations, au moins 14 semaines. L'allocation est versée pendant {{ch.mutterschaft-tage}} jours dès le jour de l'accouchement.",
            ),
            (
                "Que se passe-t-il si le nouveau-né doit rester à l'hôpital ?",
                "Si l'enfant reste à l'hôpital au moins deux semaines juste après la naissance, l'allocation est prolongée de la durée de l'hospitalisation, au plus de 56 jours. La mère doit prouver qu'elle avait l'intention de reprendre une activité après le congé.",
            ),
            (
                "Des cotisations sont-elles déduites ?",
                "Oui. Des cotisations AVS/AI/APG sont perçues sur l'allocation et, pour les salariées, aussi la cotisation à l'assurance-chômage.",
            ),
        ],
        "glosario": [("APG", "Régime des allocations pour perte de gain. Il verse les allocations en cas de maternité, de paternité et de service.")],
    },
    "vaterschaftsentschaedigung-rechner": {
        "h1": "Calcul de l'allocation de paternité",
        "title": "Congé de paternité : calcul de l'allocation APG 2026",
        "description": "Allocation pour le congé de l'autre parent : {{ch.eo-taggeld-satz}} du revenu, au plus {{ch.eo-hoechstbetrag-taggeld}} par jour, pour {{ch.vaterschaft-taggelder}} indemnités journalières.",
        "intro": [
            "L'autre parent, le plus souvent le père, a droit à deux semaines de congé après la naissance. Le régime des APG verse pour cela une allocation de {{ch.eo-taggeld-satz}} du revenu, au plus {{ch.eo-hoechstbetrag-taggeld}} par jour.",
            "Au total, il y a {{ch.vaterschaft-taggelder}} indemnités journalières. Le congé peut être pris dans les six mois qui suivent la naissance, par semaines ou par jours.",
        ],
        "como": [
            "Salariés : salaire mensuel divisé par 30. Indépendants : revenu annuel divisé par 360.",
            "Indemnité : {{ch.eo-taggeld-satz}} de ce montant, au plus {{ch.eo-hoechstbetrag-taggeld}}.",
            "Allocation : indemnité × {{ch.vaterschaft-taggelder}} indemnités journalières. En cas de congé par semaines, 7 indemnités sont versées par semaine. Par jours, 2 indemnités s'ajoutent pour 5 jours pris.",
        ],
        "ejemplo": ["Pour un salaire mensuel de 6000 francs, l'indemnité journalière s'élève à 160 francs. Pour 14 indemnités, cela fait 2240 francs."],
        "faq": [
            (
                "À combien s'élève l'allocation de paternité ?",
                "{{ch.eo-taggeld-satz}} du revenu moyen avant la naissance, au plus {{ch.eo-hoechstbetrag-taggeld}} par jour, pour {{ch.vaterschaft-taggelder}} indemnités journalières au plus.",
            ),
            ("Jusqu'à quand dois-je prendre le congé ?", "Dans les six mois qui suivent la naissance de l'enfant. Vous pouvez le prendre en une fois, par semaines ou par jours."),
            (
                "Qui y a droit ?",
                "Le père légal au moment de la naissance ou dans les six mois qui suivent, ainsi que l'épouse de la mère si elle est l'autre parent légal au moment de la naissance.",
            ),
        ],
        "glosario": [("Congé de l'autre parent", "Deux semaines de congé payé après la naissance, le plus souvent appelé congé de paternité.")],
    },
    "teuerungsrechner": {
        "h1": "Calcul du renchérissement avec l'indice des prix à la consommation",
        "title": "Calcul du renchérissement Suisse : convertir avec l'IPC",
        "description": "Que vaut aujourd'hui un montant d'autrefois ? Calculer le renchérissement depuis 2000 avec l'indice suisse des prix à la consommation de l'OFS, mois par mois.",
        "intro": [
            "L'indice suisse des prix à la consommation (IPC) mesure l'évolution des prix des biens et services achetés par les ménages en Suisse. L'Office fédéral de la statistique le publie chaque mois.",
            "Avec le calculateur, vous convertissez un montant vers un autre mois, par exemple pour adapter un salaire, un loyer ou une contribution d'entretien au renchérissement.",
        ],
        "como": [
            "Montant adapté = montant × IPC du mois de fin / IPC du mois de départ.",
            "Le calcul utilise l'IPC base décembre 2025 = 100, arrondi à une décimale. Les mois plus anciens sont convertis dans cette base.",
            "Si le mois de fin n'est pas encore publié, le calculateur prend le dernier mois disponible.",
        ],
        "ejemplo": ["1000 francs de janvier 2020 correspondent en septembre 2026 à environ 1079 francs. Le renchérissement sur cette période s'élève à environ 7,9 %."],
        "faq": [
            (
                "Quel est le renchérissement en Suisse ?",
                "C'est ce que montre le renchérissement annuel : la variation de l'IPC par rapport au même mois de l'année précédente. Le calculateur l'indique pour le mois de fin que vous choisissez.",
            ),
            (
                "D'où viennent les chiffres ?",
                "De l'Office fédéral de la statistique. La série provient du portail de données de la Banque nationale suisse, qui reprend l'IPC de l'OFS, et est mise à jour après chaque publication.",
            ),
            (
                "Pourquoi le résultat diffère-t-il légèrement d'autres calculateurs ?",
                "D'autres calculateurs peuvent utiliser une autre base d'indice ou plus de décimales. Il en résulte de petites différences d'arrondi.",
            ),
        ],
        "glosario": [
            ("IPC", "Indice suisse des prix à la consommation de l'Office fédéral de la statistique."),
            ("Renchérissement", "Hausse des prix à la consommation sur une période."),
        ],
    },
    "mietzinsrechner": {
        "h1": "Calcul du loyer : taux de référence et renchérissement",
        "title": "Calcul du loyer Suisse : taux de référence {{ch.referenzzinssatz}}",
        "description": "Calculer l'adaptation du loyer : taux de référence {{ch.referenzzinssatz}}, {{ch.mietzins-hypothekarzins}} par quart de point et {{ch.mietzins-teuerungsanteil}} du renchérissement selon l'OBLF.",
        "intro": [
            "En Suisse, le loyer dépend du taux d'intérêt de référence hypothécaire, que l'Office fédéral du logement publie chaque trimestre. Il s'élève actuellement à {{ch.referenzzinssatz}}.",
            "Si le taux a baissé depuis la dernière adaptation de votre loyer, vous pouvez demander une baisse. S'il augmente, le bailleur peut augmenter le loyer. Le calculateur indique de combien.",
        ],
        "como": [
            "Taux de référence : par quart de point de hausse, le loyer augmente au plus de {{ch.mietzins-hypothekarzins}} pour des taux inférieurs à 5 %. En cas de baisse, le calculateur fait l'inverse : loyer divisé par 1,03 par quart de point, soit environ 2,91 % de moins.",
            "Renchérissement : le bailleur peut reporter {{ch.mietzins-teuerungsanteil}} de la hausse de l'indice suisse des prix à la consommation depuis la dernière adaptation.",
            "Les hausses générales des coûts, par exemple pour l'entretien, ne s'ajoutent que si elles sont invoquées. Le calculateur additionne les trois parts.",
        ],
        "ejemplo": [
            "Un loyer de 2000 francs, adapté pour la dernière fois à 1,75 % et avec l'indice de décembre 2023, baisse d'environ 97 francs à environ 1903 francs avec un taux de référence de 1,25 %.",
        ],
        "faq": [
            (
                "Quand le taux de référence est-il publié ?",
                "L'Office fédéral du logement le publie chaque trimestre, début mars, juin, septembre et décembre.",
            ),
            (
                "Puis-je demander une baisse de loyer ?",
                "Oui, par écrit auprès du bailleur et pour le prochain terme de résiliation. Il doit prendre position dans les 30 jours. Sinon, vous pouvez saisir l'autorité de conciliation dans les 30 jours. Le bailleur peut compenser l'économie avec des hausses de coûts intervenues entre-temps.",
            ),
            ("Quelle part du renchérissement peut être reportée sur le loyer ?", "Au plus {{ch.mietzins-teuerungsanteil}} de la hausse de l'indice suisse des prix à la consommation."),
        ],
        "glosario": [
            ("Taux de référence", "Taux d'intérêt moyen des hypothèques en Suisse, arrondi au quart de point. Il sert de base aux adaptations de loyer."),
            ("Loyer net", "Loyer sans les frais accessoires."),
        ],
    },
    "verzugszinsrechner": {
        "h1": "Calcul de l'intérêt moratoire en Suisse : {{ch.verzugszins}} selon le CO",
        "title": "Intérêt moratoire Suisse : {{ch.verzugszins}} selon l'art. 104 CO",
        "description": "Calculer l'intérêt moratoire d'une facture impayée : {{ch.verzugszins}} par an selon l'art. 104 CO ou un intérêt contractuel plus élevé, au jour près.",
        "intro": [
            "Le débiteur qui ne paie pas une dette d'argent à temps doit des intérêts dès la demeure. Le Code des obligations fixe l'intérêt moratoire à {{ch.verzugszins}} par an, même si un intérêt contractuel plus bas a été convenu.",
            "Si un intérêt plus élevé a été convenu, il peut aussi être exigé pendant la demeure.",
        ],
        "como": [
            "Intérêt moratoire = montant × taux × jours de demeure / jours d'intérêt par an.",
            "Le calcul compte les jours civils du début de la demeure jusqu'à la date choisie.",
            "Vous choisissez si l'année compte 365 ou 360 jours d'intérêt. Avec 360 jours, l'intérêt est un peu plus élevé.",
        ],
        "ejemplo": ["Pour 5000 francs en demeure depuis 213 jours, l'intérêt moratoire s'élève à environ 146 francs."],
        "faq": [
            (
                "Quel est le taux de l'intérêt moratoire en Suisse ?",
                "{{ch.verzugszins}} par an, si rien de plus élevé n'a été convenu. Entre commerçants, un taux plus élevé peut s'appliquer lorsque l'escompte bancaire usuel au lieu du paiement dépasse cette valeur.",
            ),
            (
                "À partir de quand l'intérêt moratoire court-il ?",
                "Dès la demeure. Si la dette est exigible, le débiteur est mis en demeure par l'interpellation du créancier. Si un jour d'échéance a été convenu, il est en demeure dès l'expiration de ce jour.",
            ),
            (
                "Peut-on demander des intérêts sur les intérêts moratoires ?",
                "Non. Il n'est pas permis de calculer des intérêts moratoires sur des intérêts moratoires. Le calculateur ne porte intérêt que sur le montant d'origine.",
            ),
        ],
        "glosario": [
            ("Demeure", "Le débiteur ne paie pas une dette exigible malgré l'interpellation ou après le jour d'échéance convenu."),
            ("Jour d'échéance", "Jour convenu auquel un paiement doit être effectué au plus tard."),
        ],
    },
    "saron-hypothek-rechner": {
        "h1": "Calcul d'une hypothèque SARON avec le SARON actuel",
        "title": "Hypothèque SARON : coût des intérêts avec le SARON actuel",
        "description": "Coût d'une hypothèque SARON : SARON actuel publié par la BNS plus votre marge, par mois, trimestre et année. Avec le taux directeur de la BNS.",
        "intro": [
            "Pour une hypothèque SARON, le taux se compose du SARON et d'une marge fixe de la banque. Le SARON est un taux au jour le jour garanti en francs.",
            "Le calculateur prend le dernier SARON publié sur le portail de données de la BNS et indique ce que votre hypothèque coûte avec ce taux.",
        ],
        "como": [
            "Taux = SARON + marge. Si le SARON est négatif, vous calculez selon votre contrat avec 0 % ou avec la valeur publiée.",
            "Intérêt par an = montant de l'hypothèque × taux. Par mois un douzième, par trimestre un quart.",
        ],
        "ejemplo": ["Une hypothèque de 600 000 francs avec une marge de 0,8 % coûte environ 400 francs par mois avec un SARON proche de zéro."],
        "faq": [
            ("Qu'est-ce que le SARON ?", "Le Swiss Average Rate Overnight, un taux de référence pour l'argent au jour le jour en francs. Il est fixé chaque jour."),
            (
                "Quel est le lien entre le SARON et le taux directeur ?",
                "La Banque nationale vise à maintenir les taux à court terme garantis du marché monétaire en francs proches du taux directeur de la BNS. Le calculateur affiche les deux valeurs côte à côte pour que vous voyiez l'écart.",
            ),
            ("Mon taux vaut-il pour toute la durée ?", "Non. Seule la marge est fixe. La part SARON change à chaque nouvelle valeur."),
        ],
        "glosario": [
            ("Marge", "Supplément fixe de la banque sur le SARON, convenu dans le contrat hypothécaire."),
            ("Taux directeur", "Taux avec lequel la Banque nationale suisse met en œuvre sa politique monétaire."),
        ],
    },
}
