"""Contenido de las calculadoras de ch en italiano (ch-it, registro tu). Mismas afirmaciones que la versión
alemana, que se verificaron en fedlex y en los organismos citados en datos.json."""

CONTENIDO = {
    "brutto-netto-rechner": {
        "h1": "Calcolo dello stipendio netto in Svizzera",
        "title": "Stipendio lordo-netto Svizzera 2026: calcola le deduzioni",
        "description": "Dal salario lordo al netto: AVS/AI/IPG, AD, cassa pensioni e AINP con le aliquote 2026. Al mese e all'anno, per 12 o 13 mensilità.",
        "intro": [
            "In Svizzera dal salario lordo si deducono i contributi AVS, AI e IPG, l'assicurazione contro la disoccupazione, la cassa pensioni e il premio per gli infortuni non professionali. Datore di lavoro e dipendente pagano ciascuno metà dell'AVS/AI/IPG ({{ch.ahv-iv-eo-beitragssatz}}) e dell'AD ({{ch.alv-beitragssatz}}).",
            "Il calcolatore mostra il tuo salario netto prima delle imposte. Un'eventuale imposta alla fonte non è dedotta.",
        ],
        "como": [
            "AVS/AI/IPG: metà di {{ch.ahv-iv-eo-beitragssatz}} su tutto il salario lordo.",
            "AD: metà di {{ch.alv-beitragssatz}}, ma solo fino al guadagno massimo assicurato di {{ch.hoechster-versicherter-verdienst}} all'anno.",
            "Cassa pensioni: se il salario annuo supera {{ch.bvg-eintrittsschwelle}}, è assicurato il salario coordinato, cioè il salario annuo fino a {{ch.bvg-obere-grenze}} meno {{ch.bvg-koordinationsabzug}}. L'accredito di vecchiaia legale va dal 7 al 18 % secondo l'età. Senza la tua indicazione, il calcolatore ne considera la metà come tua quota.",
            "AINP e perdita di guadagno malattia: l'aliquota che inserisci.",
        ],
        "ejemplo": [
            "Con 6500 franchi lordi, 13 mensilità e 35 anni si deducono ogni mese circa 345 franchi di AVS/AI/IPG, 72 franchi di AD, 242 franchi di cassa pensioni e 65 franchi di AINP. Restano circa 5777 franchi netti.",
        ],
        "faq": [
            (
                "Quali deduzioni sono fisse e quali no?",
                "Sono fisse l'AVS/AI/IPG con metà di {{ch.ahv-iv-eo-beitragssatz}} e l'AD con metà di {{ch.alv-beitragssatz}}. Il contributo alla cassa pensioni dipende dall'età e dal regolamento, il premio AINP dall'assicuratore infortuni.",
            ),
            (
                "Perché prima dei 25 anni pago meno cassa pensioni?",
                "Gli accrediti di vecchiaia legali iniziano a 25 anni. Prima la cassa pensioni ti assicura solo per i rischi di morte e invalidità.",
            ),
            (
                "Anche la tredicesima è soggetta alle deduzioni?",
                "Sì. Le gratifiche e le rimunerazioni simili fanno parte del salario soggetto all'AVS. Per la LPP la tredicesima conta nel salario annuo.",
            ),
            (
                "Perché con salari alti l'AD è più bassa del previsto?",
                "L'AD è riscossa solo fino al guadagno massimo assicurato di {{ch.hoechster-versicherter-verdienst}} all'anno. Sulla parte che supera questo importo non c'è contributo AD.",
            ),
        ],
        "glosario": [
            ("Salario coordinato", "La parte del salario annuo assicurata obbligatoriamente nella cassa pensioni."),
            (
                "AINP",
                "Assicurazione contro gli infortuni non professionali. Chi lavora almeno otto ore alla settimana presso lo stesso datore di lavoro è assicurato anche contro gli infortuni non professionali. Il premio è a carico del dipendente, salvo accordi più favorevoli.",
            ),
            ("Certificato di salario", "Attestazione annua del datore di lavoro con salario lordo, deduzioni e salario netto, per la dichiarazione d'imposta."),
        ],
    },
    "netto-brutto-rechner": {
        "h1": "Calcolare il lordo partendo dal netto",
        "title": "Stipendio netto-lordo Svizzera: il lordo per il tuo netto",
        "description": "Quale salario lordo dà il netto che desideri? Con AVS/AI/IPG, AD, cassa pensioni e AINP secondo le aliquote 2026, per 12 o 13 mensilità.",
        "intro": [
            "Se per una trattativa salariale hai in mente un importo netto, ti serve il salario lordo corrispondente. Il calcolatore mostra quanto deve essere il lordo perché ti resti l'importo desiderato.",
            "Il calcolo considera i contributi sociali senza le imposte: AVS/AI/IPG, AD, la cassa pensioni legale e il premio AINP che inserisci.",
        ],
        "como": [
            "Il calcolatore cerca il salario lordo con cui le deduzioni del calcolo lordo-netto portano esattamente al tuo netto.",
            "AVS/AI/IPG e AD ti costano metà di {{ch.ahv-iv-eo-beitragssatz}} e di {{ch.alv-beitragssatz}}. La cassa pensioni è calcolata con metà dell'accredito di vecchiaia legale.",
            "Se il salario annuo supera {{ch.bvg-eintrittsschwelle}}, si aggiunge la deduzione LPP. Per questo il lordo necessario fa un salto a questa soglia.",
        ],
        "ejemplo": ["Per 5777 franchi netti con 13 mensilità e 35 anni servono circa 6500 franchi lordi al mese."],
        "faq": [
            (
                "Perché la cassa pensioni è solo stimata?",
                "Ogni cassa pensioni ha il proprio regolamento. Il calcolatore usa il minimo legale, la tua deduzione può essere più alta.",
            ),
            ("Le imposte sono considerate?", "No. L'imposta sul reddito dipende dal cantone e dal comune. Per l'imposta federale diretta c'è il calcolatore dedicato."),
            (
                "Che cosa cambia la tredicesima?",
                "Aumenta il salario annuo. Di conseguenza aumenta il salario coordinato per la cassa pensioni e con esso la deduzione LPP mensile.",
            ),
        ],
        "glosario": [("Salario lordo", "Salario prima della deduzione dei contributi sociali e di un'eventuale imposta alla fonte.")],
    },
    "lohnkosten-rechner": {
        "h1": "Costo del datore di lavoro in Svizzera: quanto costa un posto",
        "title": "Costo datore di lavoro Svizzera: contributi 2026",
        "description": "Quanto costa un salario lordo al datore di lavoro? AVS/AI/IPG, AD, cassa pensioni, cassa per assegni familiari e infortuni professionali al mese e all'anno.",
        "intro": [
            "Al salario lordo il datore di lavoro aggiunge i propri contributi sociali. Paga metà dell'AVS/AI/IPG e dell'AD, almeno metà della cassa pensioni e tutto il premio per gli infortuni professionali.",
            "Il contributo alla cassa di compensazione per assegni familiari varia da cantone a cantone. Inserisci l'aliquota della tua cassa e il premio del tuo assicuratore infortuni.",
        ],
        "como": [
            "AVS/AI/IPG: metà di {{ch.ahv-iv-eo-beitragssatz}} sul salario lordo.",
            "AD: metà di {{ch.alv-beitragssatz}} fino al guadagno massimo assicurato di {{ch.hoechster-versicherter-verdienst}} all'anno.",
            "Cassa pensioni: il datore di lavoro paga almeno quanto tutti i dipendenti insieme. Senza la tua indicazione, il calcolatore usa metà dell'accredito di vecchiaia legale sul salario coordinato.",
            "CAF e infortuni professionali: l'aliquota inserita. Come l'AD, il premio AIP vale solo fino al guadagno massimo assicurato.",
        ],
        "ejemplo": [
            "Un salario di 6500 franchi (13 mensilità, 35 anni) costa circa 7288 franchi al mese con l'1.5 % di CAF e lo 0.5 % di AIP. Sull'anno sono circa 94’500 franchi.",
        ],
        "faq": [
            (
                "Chi paga l'assicurazione contro gli infortuni professionali?",
                "I premi per gli infortuni e le malattie professionali sono a carico del datore di lavoro. Il premio per gli infortuni non professionali è a carico del dipendente, salvo accordi più favorevoli.",
            ),
            (
                "Il datore di lavoro deve pagare metà della cassa pensioni?",
                "Deve pagare almeno quanto tutti i suoi dipendenti insieme. Può pagare di più, se è d'accordo.",
            ),
            (
                "Che cosa manca in questo calcolo?",
                "Le spese di amministrazione della cassa di compensazione AVS, i contributi previsti da un contratto collettivo di lavoro e le prestazioni volontarie. Verificali nei tuoi contratti.",
            ),
        ],
        "glosario": [
            ("CAF", "Cassa di compensazione per assegni familiari. Versa gli assegni familiari e riscuote per questo contributi sui salari."),
            ("AIP", "Assicurazione contro gli infortuni professionali. Il premio è a carico del datore di lavoro."),
        ],
    },
    "bundessteuer-rechner": {
        "h1": "Calcolo dell'imposta federale diretta",
        "title": "Imposta federale diretta 2026: calcola l'IFD",
        "description": "Imposta federale diretta 2026 per persone sole, coniugi e famiglie: tariffa dell'art. 36 LIFD, riduzione di {{ch.dbst-kinderermaessigung}} per figlio, aliquota marginale.",
        "intro": [
            "L'imposta federale diretta è la parte dell'imposta sul reddito che spetta alla Confederazione. Cantone e comune riscuotono in aggiunta le proprie imposte, che qui non sono comprese.",
            "La tariffa è uguale in tutto il Paese. Il Dipartimento federale delle finanze adegua gli scaglioni a causa della progressione a freddo, da ultimo per il 2026 e il 2027. Il calcolatore usa la tariffa dell'anno in cui calcoli.",
        ],
        "como": [
            "La base è il reddito imponibile dopo tutte le deduzioni. Il calcolo avviene per scaglioni interi di 100 franchi.",
            "Le persone sole senza figli pagano secondo la tariffa dell'art. 36 cpv. 1 LIFD. I coniugi e chi vive con figli nella stessa economia domestica provvedendo in modo preponderante al loro mantenimento pagano secondo la tariffa più bassa del cpv. 2.",
            "Con figli l'imposta diminuisce di {{ch.dbst-kinderermaessigung}} per figlio. Gli importi inferiori a {{ch.dbst-mindestbetrag}} non sono riscossi.",
            "A partire da un reddito elevato si applica un'aliquota fissa dell'11.5 % su tutto il reddito.",
        ],
        "ejemplo": [
            "Una persona sola con 80’000 franchi di reddito imponibile paga circa 1378 franchi d'imposta federale diretta, cioè circa l'1.7 % del reddito. Ogni 100 franchi in più costano 5.94 franchi in più.",
        ],
        "faq": [
            (
                "Che cos'è il reddito imponibile?",
                "Il reddito dopo tutte le deduzioni, per esempio le spese professionali, i versamenti nel pilastro 3a e i premi assicurativi. Lo trovi nella tassazione dell'imposta federale diretta. Può differire dal reddito imponibile cantonale.",
            ),
            (
                "Perché con un figlio sono tassato secondo la tariffa per coniugi?",
                "La legge applica questa tariffa anche a celibi, nubili, divorziati e vedovi che vivono con figli nella stessa economia domestica e provvedono in modo preponderante al loro mantenimento. Inoltre l'imposta diminuisce di {{ch.dbst-kinderermaessigung}} per figlio.",
            ),
            (
                "Che cos'è l'aliquota marginale?",
                "La quota d'imposta federale che paghi su 100 franchi di reddito in più. Mostra quanto ti fa risparmiare una deduzione, per esempio un versamento nel pilastro 3a.",
            ),
            (
                "Qual è l'aliquota massima dell'imposta federale diretta?",
                "L'11.5 % del reddito imponibile. Da un limite fissato nella tariffa, nel 2026 794’000 franchi per le persone sole e 941’400 franchi per i coniugi, questa aliquota vale su tutto il reddito.",
            ),
        ],
        "glosario": [
            ("LIFD", "Legge federale sull'imposta federale diretta."),
            ("Progressione a freddo", "Aggravio quando i salari aumentano solo per effetto del rincaro. La Confederazione la compensa adeguando gli scaglioni della tariffa."),
        ],
    },
    "mwst-rechner": {
        "h1": "Calcolo dell'IVA in Svizzera: {{ch.mwst-normalsatz}}, {{ch.mwst-reduziert}} e {{ch.mwst-beherbergung}}",
        "title": "Calcolo IVA Svizzera: aggiungi o scorpora il {{ch.mwst-normalsatz}}",
        "description": "IVA svizzera con aliquota del {{ch.mwst-normalsatz}}, {{ch.mwst-reduziert}} o {{ch.mwst-beherbergung}}: importo senza IVA e IVA inclusa, al centesimo.",
        "intro": [
            "In Svizzera l'IVA ammonta al {{ch.mwst-normalsatz}}. Alimenti, medicamenti, libri e giornali sono soggetti all'aliquota ridotta del {{ch.mwst-reduziert}}. Per l'alloggio con colazione vale l'aliquota speciale del {{ch.mwst-beherbergung}}.",
            "Con il calcolatore aggiungi l'IVA a un importo oppure la scorpori da un prezzo IVA inclusa.",
        ],
        "como": [
            "Aggiungere: l'importo moltiplicato per l'aliquota dà l'IVA. Importo più IVA dà il prezzo IVA inclusa.",
            "Scorporare: il prezzo IVA inclusa diviso per 1.081 (o 1.026 e 1.038) dà l'importo senza IVA. La differenza è l'imposta.",
            "Non togliere semplicemente il {{ch.mwst-normalsatz}} dal prezzo finale: otterresti troppa imposta.",
        ],
        "ejemplo": ["Un'offerta di 2000 franchi senza IVA costa 2162 franchi con l'aliquota normale. Contiene 162 franchi di IVA."],
        "faq": [
            (
                "Come scorporo l'IVA da un importo lordo?",
                "Dividi l'importo IVA inclusa per 1.081. Da 108.10 franchi restano 100 franchi senza IVA, l'imposta ammonta a 8.10 franchi.",
            ),
            (
                "Che cosa è soggetto all'aliquota ridotta?",
                "Tra l'altro l'acqua erogata in condotte, gli alimenti tranne le bevande alcoliche, i medicamenti, i giornali, le riviste e i libri. L'elenco completo è all'art. 25 cpv. 2 della legge sull'IVA.",
            ),
            (
                "Al ristorante vale l'aliquota ridotta?",
                "No. Per cibi e bevande serviti al ristorante vale l'aliquota normale. Gli alimenti da asporto sono soggetti all'aliquota ridotta, tranne le bevande alcoliche.",
            ),
            (
                "Fino a quando vale l'aliquota speciale per l'alloggio?",
                "La legge la prevede al più tardi fino al 31 dicembre 2027. Si applica ai pernottamenti con colazione, anche se la colazione è fatturata a parte.",
            ),
        ],
        "glosario": [
            ("IVA", "Imposta sul valore aggiunto, riscossa dall'Amministrazione federale delle contribuzioni."),
            ("Imposta precedente", "L'IVA che un'impresa paga sugli acquisti e che può dedurre nel suo rendiconto."),
        ],
    },
    "saeule-3a-rechner": {
        "h1": "Pilastro 3a: importo massimo e risparmio d'imposta",
        "title": "Calcolo pilastro 3a 2026: massimo e risparmio d'imposta",
        "description": "Pilastro 3a 2026: fino a {{ch.saeule-3a-mit-pk}} con cassa pensioni, fino a {{ch.saeule-3a-ohne-pk}} senza. Massimo e risparmio sull'imposta federale diretta.",
        "intro": [
            "I versamenti nel pilastro 3a si deducono dal reddito imponibile, per la Confederazione, il cantone e il comune. Chi è affiliato a una cassa pensioni può versare {{ch.saeule-3a-mit-pk}} all'anno.",
            "Senza cassa pensioni il limite è il {{ch.saeule-3a-ohne-pk-satz}} del reddito da attività lucrativa, al massimo {{ch.saeule-3a-ohne-pk}}. Il calcolatore mostra il tuo massimo e il risparmio sull'imposta federale diretta.",
        ],
        "como": [
            "Con cassa pensioni: l'8 % del limite superiore LPP, arrotondato a {{ch.saeule-3a-mit-pk}}.",
            "Senza cassa pensioni: il {{ch.saeule-3a-ohne-pk-satz}} del reddito da attività lucrativa, al massimo il 40 % del limite superiore LPP, cioè {{ch.saeule-3a-ohne-pk}}.",
            "Risparmio: imposta federale sul reddito imponibile meno imposta federale sul reddito dopo la deduzione del versamento, con le tariffe in vigore.",
        ],
        "ejemplo": [
            "Una persona sola affiliata a una cassa pensioni, con 80’000 franchi di reddito imponibile, versa il massimo. La sua imposta federale diretta scende di circa 330 franchi. Il risparmio su cantone e comune si aggiunge.",
        ],
        "faq": [
            (
                "Quanto posso versare nel pilastro 3a nel 2026?",
                "Con cassa pensioni {{ch.saeule-3a-mit-pk}}. Senza cassa pensioni il {{ch.saeule-3a-ohne-pk-satz}} del reddito da attività lucrativa, al massimo {{ch.saeule-3a-ohne-pk}}. Dal 2027 gli importi salgono a 7373 e 36’864 franchi.",
            ),
            (
                "Posso recuperare gli anni mancati?",
                "Sì, a determinate condizioni. Puoi colmare le lacune degli ultimi dieci anni se nell'anno del riscatto hai versato tutto il contributo ordinario e negli anni interessati avevi diritto di versare. Il riscatto annuo è limitato al piccolo importo massimo.",
            ),
            (
                "Fino a quando posso versare?",
                "Al massimo fino a cinque anni dopo l'età di riferimento, finché eserciti un'attività lucrativa. Nell'anno in cui smetti di lavorare puoi ancora versare il contributo intero.",
            ),
            ("Possono versare entrambi i coniugi?", "Sì. Se entrambi esercitano un'attività lucrativa, ciascuno può versare e dedurre fino al proprio massimo."),
        ],
        "glosario": [
            (
                "Pilastro 3a",
                "Previdenza individuale vincolata. Il versamento è possibile al più presto cinque anni prima dell'età di riferimento, prima solo nei casi previsti dalla legge, come l'acquisto di un'abitazione ad uso proprio.",
            ),
            ("Limite superiore LPP", "Il salario annuo più alto assicurato nella previdenza professionale obbligatoria: {{ch.bvg-obere-grenze}}."),
        ],
    },
    "bvg-rechner": {
        "h1": "Calcolo LPP: avere di vecchiaia e rendita della cassa pensioni",
        "title": "Calcolo LPP: avere di vecchiaia e rendita a 65 anni",
        "description": "Quanto avrai nella cassa pensioni a 65 anni? Accrediti LPP, interesse {{ch.bvg-mindestzins}} e aliquota di conversione {{ch.bvg-umwandlungssatz}}: capitale e rendita.",
        "intro": [
            "Nella cassa pensioni risparmi ogni anno un accredito di vecchiaia sul salario coordinato. Con gli interessi diventa l'avere di vecchiaia, che al pensionamento è convertito in rendita.",
            "Il calcolatore mostra il minimo legale secondo la LPP. Se il tuo certificato di previdenza indica un avere più alto, la tua cassa assicura più della legge.",
        ],
        "como": [
            "Salario coordinato: salario annuo fino a {{ch.bvg-obere-grenze}} meno {{ch.bvg-koordinationsabzug}}, almeno {{ch.bvg-min-koordinierter-lohn}}. È assicurato solo chi guadagna più di {{ch.bvg-eintrittsschwelle}}.",
            "Accredito di vecchiaia: 7 % da 25 a 34 anni, 10 % da 35 a 44, 15 % da 45 a 54 e 18 % da 55 a 65.",
            "Ogni anno si aggiunge l'interesse sull'avere precedente, poi il nuovo accredito. Senza la tua indicazione vale il tasso minimo del {{ch.bvg-mindestzins}}.",
            "Rendita: avere di vecchiaia moltiplicato per l'aliquota di conversione del {{ch.bvg-umwandlungssatz}} all'età di riferimento di 65 anni.",
        ],
        "ejemplo": [
            "Chi è assicurato dai 45 ai 65 anni con un salario annuo di 80’000 franchi raggiunge per legge un avere di vecchiaia di circa 198’200 franchi. Ne risulta una rendita di circa 1123 franchi al mese.",
        ],
        "faq": [
            (
                "Che cos'è l'aliquota di conversione?",
                "La percentuale con cui l'avere di vecchiaia è convertito in rendita annua. Per la parte obbligatoria ammonta almeno al {{ch.bvg-umwandlungssatz}} all'età di riferimento di 65 anni.",
            ),
            ("Chi paga gli accrediti di vecchiaia?", "Datore di lavoro e dipendenti insieme. Il datore di lavoro deve pagare almeno quanto tutti i dipendenti insieme."),
            (
                "Perché il mio certificato di previdenza è diverso?",
                "La tua cassa può assicurare più di quanto chiede la legge o applicare aliquote proprie. Questo calcolatore mostra solo il minimo prescritto dalla LPP.",
            ),
        ],
        "glosario": [
            ("Avere di vecchiaia", "Il capitale risparmiato nella cassa pensioni con gli accrediti di vecchiaia e gli interessi."),
            ("Certificato di previdenza", "Riepilogo annuo della cassa pensioni con avere, salario assicurato e rendita prevista."),
        ],
    },
    "ahv-rentenrechner": {
        "h1": "Calcolo della rendita AVS con la scala 44",
        "title": "Calcolo rendita AVS 2026: rendita di vecchiaia e 13a",
        "description": "Calcola la rendita di vecchiaia AVS: rendita completa secondo la scala 44 tra {{ch.ahv-minimalrente}} e il doppio, plafonamento per le coppie e 13a rendita.",
        "intro": [
            "La rendita di vecchiaia AVS dipende dal reddito annuo medio determinante. Con una durata di contribuzione completa ammonta almeno a {{ch.ahv-minimalrente}} e al massimo al doppio al mese.",
            "Dal 2026 chi riceve una rendita di vecchiaia a dicembre ottiene in più una 13a rendita di vecchiaia. Il calcolatore mostra la rendita mensile, la 13a rendita e l'importo annuo.",
        ],
        "como": [
            "Il reddito è arrotondato al valore superiore della tabella delle rendite.",
            "Fino a 36 volte la rendita minima: 74 % della rendita minima più 13/600 del reddito. Oltre: 104 % della rendita minima più 8/600 del reddito. Il risultato è sempre compreso tra la rendita minima e quella massima.",
            "Coppie: le due rendite insieme non possono superare il 150 % della rendita massima. Altrimenti sono ridotte proporzionalmente.",
            "La 13a rendita di vecchiaia corrisponde a un dodicesimo della rendita ricevuta nell'anno ed è versata a dicembre.",
        ],
        "ejemplo": [
            "Un reddito determinante di 46’268 franchi è arrotondato a 46’872 franchi e dà una rendita di 1935 franchi al mese. Se anche la moglie riceve una rendita di 1915 franchi, le due rendite sono plafonate a 3780 franchi insieme: 1900 e 1880 franchi.",
        ],
        "faq": [
            (
                "A quanto ammonta la rendita AVS nel 2026?",
                "Con una durata di contribuzione completa tra {{ch.ahv-minimalrente}} e il doppio al mese. Dal 1° gennaio 2027 la rendita minima sale a 1280 franchi e quella massima a 2560 franchi.",
            ),
            (
                "Che cos'è il reddito annuo medio determinante?",
                "La media dei tuoi redditi da attività lucrativa, rivalutati con un fattore che tiene conto dell'evoluzione dei salari, più eventuali accrediti per compiti educativi e assistenziali. La tua cassa di compensazione può indicartelo in un calcolo anticipato della rendita.",
            ),
            (
                "Quando ho diritto a una rendita completa?",
                "Se hai tanti anni di contribuzione quanti la tua classe d'età. Se mancano anni, ricevi una rendita parziale, più bassa dell'importo di questo calcolatore.",
            ),
            (
                "A quanto ammonta la 13a rendita AVS?",
                "Un dodicesimo della rendita di vecchiaia ricevuta nell'anno civile, arrotondato al franco. È versata a dicembre insieme alla rendita di dicembre.",
            ),
        ],
        "glosario": [
            ("Scala 44", "Tabella delle rendite complete con durata di contribuzione completa."),
            ("Plafonamento", "Limitazione delle due rendite di vecchiaia di una coppia al 150 % della rendita massima."),
        ],
    },
    "ahv-beitraege-selbststaendige": {
        "h1": "Calcolo dei contributi AVS degli indipendenti",
        "title": "Contributi AVS indipendenti 2026: tavola scalare",
        "description": "Contributi AVS/AI/IPG degli indipendenti nel 2026: tavola scalare decrescente fino a 60’500 franchi, aliquota piena oltre e contributo minimo di {{ch.ahv-mindestbeitrag-selbststaendige}}.",
        "intro": [
            "Gli indipendenti pagano da soli i contributi AVS, AI e IPG. Per i redditi più bassi vale un'aliquota ridotta: la tavola scalare decrescente.",
            "Chi guadagna molto poco paga il contributo minimo di {{ch.ahv-mindestbeitrag-selbststaendige}} all'anno.",
        ],
        "como": [
            "Il calcolatore cerca lo scaglione della tavola in cui rientra il tuo reddito annuo e applica la sua aliquota a tutto il reddito.",
            "Da 60’500 franchi vale l'aliquota piena del 10 %: AVS 8.1 %, AI 1.4 % e IPG 0.5 %.",
            "Se il reddito è inferiore allo scaglione più basso, è dovuto il contributo minimo.",
        ],
        "ejemplo": ["Con un reddito di 50’000 franchi l'aliquota è del 7.84 %. Il contributo annuo ammonta a 3920 franchi, circa 327 franchi al mese."],
        "faq": [
            (
                "Quale reddito conta?",
                "La cassa di compensazione fissa i contributi definitivi sulla base della tassazione fiscale. Aggiunge al reddito netto i contributi personali AVS/AI/IPG e deduce un interesse sul capitale proprio investito nell'azienda.",
            ),
            ("Ci sono costi aggiuntivi?", "Sì. Le casse di compensazione riscuotono contributi alle spese di amministrazione fino al 5 % dei contributi."),
            (
                "Devo versare anche all'assicurazione contro la disoccupazione?",
                "No. All'AD sono tenuti a contribuire i dipendenti e i datori di lavoro, non il reddito da attività indipendente.",
            ),
        ],
        "glosario": [
            ("Tavola scalare decrescente", "Aliquote AVS/AI/IPG più basse per gli indipendenti con reddito modesto."),
            ("Cassa di compensazione", "Organo che riscuote i contributi AVS e versa le rendite."),
        ],
    },
    "kapitalbezug-steuer-rechner": {
        "h1": "Prelievo di capitale: imposta federale su cassa pensioni e pilastro 3a",
        "title": "Imposta sul prelievo di capitale: LPP e pilastro 3a",
        "description": "Imposta federale diretta sul prelievo del capitale della cassa pensioni o del pilastro 3a: un quinto della tariffa secondo l'art. 38 LIFD.",
        "intro": [
            "Chi preleva il capitale dalla cassa pensioni o dal pilastro 3a paga un'imposta a parte. È riscossa separatamente dagli altri redditi, per l'anno del versamento.",
            "Il calcolatore mostra la parte della Confederazione. Anche cantone e comune tassano il prelievo.",
        ],
        "como": [
            "L'imposta federale sulle prestazioni in capitale provenienti dalla previdenza corrisponde a un quinto dell'imposta ordinaria secondo la tariffa del reddito (art. 38 LIFD).",
            "Si applica la tariffa per persone sole o per coniugi. Chi vive con figli nella stessa economia domestica usa la tariffa per coniugi, ma senza la riduzione per figlio.",
            "Non sono concesse deduzioni sociali. Il calcolo avviene per scaglioni interi di 100 franchi.",
        ],
        "ejemplo": ["Per un capitale di 200’000 franchi una persona sola paga circa 2581 franchi d'imposta federale diretta, circa l'1.3 % dell'importo."],
        "faq": [
            (
                "Il prelievo di capitale si somma al salario?",
                "No. Le prestazioni in capitale provenienti dalla previdenza sono tassate separatamente. Non si sommano agli altri redditi dell'anno.",
            ),
            ("Vale anche per il pilastro 3a?", "Sì. Il capitale della previdenza individuale vincolata è tassato come quello della cassa pensioni."),
            (
                "Perché il cantone non è compreso?",
                "Ogni cantone ha tariffe e regole proprie per le prestazioni in capitale. Per l'imposta cantonale usa il calcolatore fiscale del tuo cantone.",
            ),
        ],
        "glosario": [("Prestazione in capitale dalla previdenza", "Versamento dell'avere della cassa pensioni o del pilastro 3a in una sola volta invece di una rendita.")],
    },
    "arbeitslosengeld-rechner": {
        "h1": "Calcolo dell'indennità di disoccupazione in Svizzera",
        "title": "Indennità di disoccupazione Svizzera: calcola l'indennità AD",
        "description": "Calcola l'indennità di disoccupazione: {{ch.alv-taggeld-reduziert}} o {{ch.alv-taggeld-voll}} del guadagno assicurato, indennità giornaliera, importo mensile e numero massimo secondo la LADI.",
        "intro": [
            "Chi è disoccupato e negli ultimi due anni ha versato contributi per almeno dodici mesi riceve indennità giornaliere dell'assicurazione contro la disoccupazione. Un'indennità ammonta all'{{ch.alv-taggeld-voll}} o al {{ch.alv-taggeld-reduziert}} del guadagno assicurato.",
            "Il calcolatore mostra l'indennità giornaliera, l'importo mensile e il numero massimo di indennità. Decide in modo vincolante la tua cassa di disoccupazione.",
        ],
        "como": [
            "Guadagno assicurato: il tuo salario mensile medio degli ultimi sei o dodici mesi di contribuzione, conta il valore più alto. Al massimo {{ch.hoechster-versicherter-verdienst}} all'anno.",
            "Guadagno giornaliero: guadagno mensile diviso per {{ch.alv-tage-pro-monat}}.",
            "Hanno diritto all'{{ch.alv-taggeld-voll}} le persone con obbligo di mantenimento verso figli sotto i 25 anni, con una rendita AI per un grado d'invalidità di almeno il 40 % o con un'indennità intera che non supera {{ch.alv-schwelle-volles-taggeld}}. Gli altri ricevono il {{ch.alv-taggeld-reduziert}}.",
            "Numero massimo: 260 indennità da 12 mesi di contribuzione, 400 da 18, 520 da 22 mesi per chi ha almeno 55 anni o una rendita AI. Sotto i 25 anni senza figli, al massimo 200.",
        ],
        "ejemplo": [
            "Con un guadagno assicurato di 6000 franchi e senza figli l'indennità giornaliera è di circa 194 franchi, circa 4200 franchi lordi al mese. Con 24 mesi di contribuzione e 35 anni ci sono al massimo 400 indennità.",
        ],
        "faq": [
            (
                "Quanto ricevo?",
                "Il {{ch.alv-taggeld-reduziert}} del guadagno assicurato, oppure l'{{ch.alv-taggeld-voll}} se mantieni figli sotto i 25 anni, ricevi una rendita AI di almeno il 40 % o se la tua indennità intera non supera {{ch.alv-schwelle-volles-taggeld}}.",
            ),
            (
                "Per quanto tempo ricevo le indennità?",
                "Dipende dal periodo di contribuzione e dall'età: 260, 400 o 520 indennità in due anni. Sotto i 25 anni senza obbligo di mantenimento, al massimo 200 indennità.",
            ),
            (
                "Che cosa si deduce dall'indennità?",
                "I contributi AVS/AI/IPG, un contributo alla previdenza professionale per i rischi di morte e invalidità e al massimo due terzi del premio per gli infortuni non professionali.",
            ),
            ("Come si calcola un mese?", "Un mese corrisponde a {{ch.alv-tage-pro-monat}} indennità. Per settimana sono versate cinque indennità."),
        ],
        "glosario": [
            ("Guadagno assicurato", "Il salario medio su cui si calcola l'indennità, al massimo fino all'importo massimo dell'assicurazione contro gli infortuni."),
            ("Termine quadro", "Periodo di due anni per il periodo di contribuzione e per la riscossione delle indennità."),
        ],
    },
    "13-monatslohn-rechner": {
        "h1": "Calcolo della tredicesima",
        "title": "Calcolo tredicesima: pro rata in caso di entrata o uscita",
        "description": "Quanta tredicesima ti spetta? Quota per un anno intero o in caso di entrata e uscita durante l'anno, al mese e all'anno.",
        "intro": [
            "Se è pattuita una tredicesima, per un anno intero corrisponde a una mensilità in più.",
            "Il calcolatore mostra la quota se non hai lavorato tutto l'anno. Conta quello che il tuo contratto prevede per entrate e uscite.",
        ],
        "como": [
            "Tredicesima = salario mensile × mesi lavorati / 12.",
            "Ogni mese lavorato dà un dodicesimo di salario mensile.",
            "Sulla tredicesima si deducono gli stessi contributi sociali del salario normale.",
        ],
        "ejemplo": ["Chi inizia a metà maggio con un salario mensile di 6500 franchi lavora 7.5 mesi fino a fine anno. La tredicesima ammonta allora a 4062.50 franchi."],
        "faq": [
            (
                "Ho diritto alla tredicesima?",
                "Solo se è pattuita, nel contratto di lavoro, in un contratto collettivo o in un contratto normale di lavoro. La legge non la prescrive.",
            ),
            (
                "Che differenza c'è con la gratificazione?",
                "La gratificazione è una retribuzione speciale per determinate occasioni. Se il rapporto termina prima di quell'occasione, una quota è dovuta solo se è stata pattuita.",
            ),
            ("Sulla tredicesima si paga l'AVS?", "Sì. Fa parte del salario soggetto all'AVS. Il calcolo dello stipendio netto ti mostra le deduzioni."),
        ],
        "glosario": [("Gratificazione", "Retribuzione speciale per determinate occasioni, per esempio a Natale. È dovuta solo se è stata pattuita.")],
    },
    "ferienrechner": {
        "h1": "Calcolo delle vacanze in Svizzera: diritto alle vacanze",
        "title": "Calcolo vacanze Svizzera: giorni e supplemento",
        "description": "Quanti giorni di vacanza hai? Almeno {{ch.ferien-wochen}} settimane all'anno, fino ai 20 anni {{ch.ferien-wochen-jugendliche}}. Pro rata con tempo parziale, entrata o uscita.",
        "intro": [
            "In Svizzera i dipendenti hanno diritto ad almeno {{ch.ferien-wochen}} settimane di vacanza per anno di servizio. Fino ai 20 anni compiuti sono {{ch.ferien-wochen-jugendliche}}.",
            "Il calcolatore converte le settimane in giorni di vacanza, anche a tempo parziale o se non sei impiegato per tutto l'anno di servizio.",
        ],
        "como": [
            "Giorni di vacanza all'anno = settimane di vacanza × giorni di lavoro alla settimana.",
            "Per un anno di servizio incompleto le vacanze sono proporzionali alla durata del rapporto: giorni di vacanza × mesi / 12.",
            "Il supplemento vacanze teorico per il salario orario corrisponde alle settimane di vacanza divise per le altre settimane dell'anno: 4 / 48 o 5 / 47.",
        ],
        "ejemplo": ["Con una settimana di 3 giorni e mezzo anno di servizio, 4 settimane di vacanza danno 6 giorni di vacanza."],
        "faq": [
            (
                "Quanti giorni di vacanza ho a tempo parziale?",
                "Tante settimane quanto chi lavora a tempo pieno. In giorni sono meno: 4 settimane con 3 giorni di lavoro alla settimana danno 12 giorni di vacanza.",
            ),
            (
                "Il datore di lavoro può pagare le vacanze invece di concederle?",
                "No, finché dura il rapporto di lavoro. In questo periodo le vacanze non possono essere compensate con denaro o altre prestazioni.",
            ),
            (
                "Chi decide quando vado in vacanza?",
                "Il datore di lavoro fissa la data e tiene conto dei tuoi desideri nella misura compatibile con gli interessi dell'azienda. Almeno due settimane di vacanza devono essere consecutive.",
            ),
        ],
        "glosario": [("Anno di servizio", "L'anno che inizia con il rapporto di lavoro, non l'anno civile.")],
    },
    "ueberstunden-rechner": {
        "h1": "Calcolo del lavoro straordinario in Svizzera",
        "title": "Lavoro straordinario Svizzera: supplemento del {{ch.ueberstunden-zuschlag}}",
        "description": "Retribuire il lavoro straordinario secondo il Codice delle obbligazioni: salario normale più un supplemento di almeno il {{ch.ueberstunden-zuschlag}}. Da salario mensile o orario.",
        "intro": [
            "Il lavoro straordinario sono le ore oltre l'orario convenuto o usuale. Se non è compensato con congedo, il datore di lavoro deve il salario normale più un supplemento di almeno il {{ch.ueberstunden-zuschlag}}.",
            "Il supplemento vale salvo accordo scritto diverso o disposizione di un contratto normale o collettivo di lavoro.",
        ],
        "como": [
            "Salario orario dal salario mensile: salario mensile × 12 / 52 / ore settimanali.",
            "Salario normale per il lavoro straordinario: salario orario × numero di ore.",
            "Supplemento: il {{ch.ueberstunden-zuschlag}} del salario normale, o l'aliquota del tuo contratto.",
        ],
        "ejemplo": ["Con un salario mensile di 6500 franchi e 42 ore settimanali, 10 ore di lavoro straordinario con supplemento costano circa 446 franchi."],
        "faq": [
            (
                "Devo prestare lavoro straordinario?",
                "Sì, se è necessario, nella misura in cui puoi prestarlo e lo si può ragionevolmente pretendere da te secondo le regole della buona fede.",
            ),
            (
                "Il datore di lavoro può compensare il lavoro straordinario con congedo?",
                "Sì, con il tuo consenso e entro un periodo adeguato. Il congedo deve durare almeno quanto il lavoro straordinario.",
            ),
            (
                "Il supplemento può essere escluso?",
                "Sì, se è pattuito per scritto o previsto da un contratto normale o collettivo di lavoro. Senza un tale accordo vale il supplemento di almeno il {{ch.ueberstunden-zuschlag}}.",
            ),
        ],
        "glosario": [("Lavoro straordinario", "Lavoro oltre l'orario convenuto o usuale, quando è necessario.")],
    },
    "kuendigungsfrist-rechner": {
        "h1": "Calcolo del termine di disdetta in Svizzera",
        "title": "Termine di disdetta Svizzera: ultimo giorno secondo il CO",
        "description": "Termine di disdetta secondo il CO: 7 giorni nel periodo di prova, poi 1, 2 o 3 mesi secondo l'anno di servizio, per la fine di un mese. Calcola l'ultimo giorno.",
        "intro": [
            "Senza altri accordi, in Svizzera valgono i termini di disdetta del Codice delle obbligazioni. Dipendono dall'anno di servizio e scadono alla fine di un mese.",
            "Il calcolatore conta dal giorno in cui la disdetta giunge al destinatario. La data d'invio non ha importanza per questo calcolo.",
        ],
        "como": [
            "Periodo di prova: disdetta possibile in ogni momento con un termine di 7 giorni. Senza accordo, il primo mese è il periodo di prova. Può essere prolungato fino a tre mesi al massimo.",
            "Dopo il periodo di prova: 1 mese nel primo anno di servizio, 2 mesi dal secondo al nono anno, poi 3 mesi.",
            "Il termine inizia il giorno dopo la ricezione. Il rapporto di lavoro termina l'ultimo giorno del mese in cui il termine scade.",
        ],
        "ejemplo": ["Chi è impiegato da marzo 2020 e riceve la disdetta il 14 ottobre 2026 è nel 7° anno di servizio. Con 2 mesi di termine il rapporto di lavoro termina il 31 dicembre 2026."],
        "faq": [
            (
                "Entro quando deve giungere la disdetta?",
                "Secondo il calcolo di questo calcolatore, il termine deve scadere interamente entro la fine del mese desiderata. Con un termine di un mese, la disdetta deve giungere al più tardi l'ultimo giorno del mese precedente.",
            ),
            (
                "Si possono pattuire altri termini?",
                "Sì, per scritto, in un contratto normale o in un contratto collettivo di lavoro. Meno di un mese è possibile solo con un contratto collettivo e solo nel primo anno di servizio.",
            ),
            (
                "Che cos'è un periodo di protezione?",
                "Dopo il periodo di prova il datore di lavoro non può disdire, per esempio, durante una malattia o un infortunio non colpevole, durante la gravidanza e nelle 16 settimane dopo il parto. In caso di malattia o infortunio la protezione dura 30 giorni nel primo anno di servizio, 90 giorni dal secondo al quinto anno e poi 180 giorni.",
            ),
        ],
        "glosario": [
            ("Periodo di prova", "Le prime settimane di un impiego, con un termine di disdetta breve. Senza accordo, è il primo mese."),
            ("Periodo di protezione", "Periodo in cui il datore di lavoro non può disdire dopo il periodo di prova."),
        ],
    },
    "kinderzulagen-rechner": {
        "h1": "Calcolo degli assegni familiari: figli e formazione",
        "title": "Assegni familiari Svizzera 2026: calcolo",
        "description": "Assegni familiari in Svizzera: assegno per i figli di almeno {{ch.kinderzulage}}, assegno di formazione di almeno {{ch.ausbildungszulage}} al mese. Con le aliquote del tuo cantone.",
        "intro": [
            "Per i figli in Svizzera esistono gli assegni familiari. La legge federale fissa importi minimi: {{ch.kinderzulage}} di assegno per i figli e {{ch.ausbildungszulage}} di assegno di formazione al mese.",
            "I cantoni possono prevedere aliquote più alte. Inserisci le aliquote del tuo cantone se le conosci. Altrimenti il calcolatore usa il minimo.",
        ],
        "como": [
            "Assegno per i figli: dal mese di nascita fino alla fine del mese in cui il figlio compie 16 anni.",
            "Assegno di formazione: dall'inizio di una formazione postobbligatoria, al più presto dal mese in cui il figlio compie 15 anni, fino alla fine della formazione, al più tardi fino alla fine del mese in cui compie 25 anni.",
            "Assegni al mese: numero di figli × assegno per i figli più numero di figli in formazione × assegno di formazione.",
        ],
        "ejemplo": ["Due figli sotto i 16 anni e uno in apprendistato danno almeno 698 franchi al mese, 8376 franchi all'anno."],
        "faq": [
            (
                "A quanto ammonta l'assegno per i figli nel 2026?",
                "Almeno {{ch.kinderzulage}} per figlio al mese, l'assegno di formazione almeno {{ch.ausbildungszulage}}. I cantoni possono prevedere aliquote minime più alte e assegni di nascita e di adozione.",
            ),
            ("Fino a quando c'è l'assegno di formazione?", "Fino alla fine della formazione, al più tardi fino alla fine del mese in cui il figlio compie 25 anni."),
            (
                "C'è l'assegno anche per un figlio incapace di esercitare un'attività lucrativa?",
                "Sì. Per un figlio incapace di esercitare un'attività lucrativa l'assegno per i figli è versato fino alla fine del mese in cui compie 20 anni.",
            ),
        ],
        "glosario": [
            ("Assegno per i figli", "Assegno familiare per i figli fino alla fine del mese in cui compiono 16 anni."),
            ("Assegno di formazione", "Assegno familiare per i figli in formazione postobbligatoria, al massimo fino ai 25 anni."),
        ],
    },
    "mutterschaftsentschaedigung-rechner": {
        "h1": "Calcolo dell'indennità di maternità",
        "title": "Indennità di maternità: calcolo dell'indennità IPG 2026",
        "description": "Indennità di maternità IPG: l'{{ch.eo-taggeld-satz}} del reddito, al massimo {{ch.eo-hoechstbetrag-taggeld}} al giorno, per {{ch.mutterschaft-tage}} giorni. Indennità e importo totale.",
        "intro": [
            "Dopo il parto le madri che esercitano un'attività lucrativa ricevono un'indennità di maternità dalle indennità di perdita di guadagno (IPG). Ammonta all'{{ch.eo-taggeld-satz}} del reddito medio prima del parto, al massimo {{ch.eo-hoechstbetrag-taggeld}} al giorno.",
            "L'indennità è versata per {{ch.mutterschaft-tage}} giorni consecutivi, dal giorno del parto.",
        ],
        "como": [
            "Dipendenti: salario mensile prima del parto diviso per 30, che dà il reddito al giorno.",
            "Indipendenti: reddito annuo soggetto all'AVS diviso per 360.",
            "Indennità: l'{{ch.eo-taggeld-satz}} di questo importo, al massimo {{ch.eo-hoechstbetrag-taggeld}}. Importo totale: indennità × {{ch.mutterschaft-tage}} giorni.",
        ],
        "ejemplo": ["Con un salario mensile di 5250 franchi l'indennità giornaliera è di 140 franchi. Per 98 giorni sono 13’720 franchi. Da un salario mensile di 8250 franchi si raggiunge l'indennità massima."],
        "faq": [
            ("A quanto ammonta l'indennità di maternità?", "All'{{ch.eo-taggeld-satz}} del reddito medio da attività lucrativa prima del parto, al massimo {{ch.eo-hoechstbetrag-taggeld}} al giorno."),
            (
                "Quanto dura il congedo di maternità?",
                "Secondo il Codice delle obbligazioni almeno 14 settimane. L'indennità è versata per {{ch.mutterschaft-tage}} giorni dal giorno del parto.",
            ),
            (
                "Che cosa succede se il neonato deve restare in ospedale?",
                "Se il bambino resta in ospedale almeno due settimane subito dopo la nascita, l'indennità si prolunga della durata del ricovero, al massimo di 56 giorni. La madre deve dimostrare che intendeva riprendere un'attività dopo il congedo.",
            ),
            (
                "Si deducono contributi?",
                "Sì. Sull'indennità sono riscossi contributi AVS/AI/IPG e, per le lavoratrici dipendenti, anche il contributo all'assicurazione contro la disoccupazione.",
            ),
        ],
        "glosario": [("IPG", "Indennità di perdita di guadagno. Versano le indennità in caso di maternità, paternità e servizio.")],
    },
    "vaterschaftsentschaedigung-rechner": {
        "h1": "Calcolo dell'indennità di paternità",
        "title": "Congedo di paternità: calcolo dell'indennità IPG 2026",
        "description": "Indennità per il congedo dell'altro genitore: l'{{ch.eo-taggeld-satz}} del reddito, al massimo {{ch.eo-hoechstbetrag-taggeld}} al giorno, per {{ch.vaterschaft-taggelder}} indennità giornaliere.",
        "intro": [
            "L'altro genitore, di solito il padre, ha diritto a due settimane di congedo dopo la nascita. Le IPG versano per questo un'indennità dell'{{ch.eo-taggeld-satz}} del reddito, al massimo {{ch.eo-hoechstbetrag-taggeld}} al giorno.",
            "In totale ci sono {{ch.vaterschaft-taggelder}} indennità giornaliere. Il congedo può essere preso entro sei mesi dalla nascita, a settimane o a giorni.",
        ],
        "como": [
            "Dipendenti: salario mensile diviso per 30. Indipendenti: reddito annuo diviso per 360.",
            "Indennità: l'{{ch.eo-taggeld-satz}} di questo importo, al massimo {{ch.eo-hoechstbetrag-taggeld}}.",
            "Indennità totale: indennità × {{ch.vaterschaft-taggelder}} indennità giornaliere. Se il congedo è preso a settimane, sono versate 7 indennità per settimana. A giorni, per ogni 5 giorni presi si aggiungono 2 indennità.",
        ],
        "ejemplo": ["Con un salario mensile di 6000 franchi l'indennità giornaliera è di 160 franchi. Per 14 indennità sono 2240 franchi."],
        "faq": [
            (
                "A quanto ammonta l'indennità di paternità?",
                "All'{{ch.eo-taggeld-satz}} del reddito medio prima della nascita, al massimo {{ch.eo-hoechstbetrag-taggeld}} al giorno, per al massimo {{ch.vaterschaft-taggelder}} indennità giornaliere.",
            ),
            ("Entro quando devo prendere il congedo?", "Entro sei mesi dalla nascita del figlio. Puoi prenderlo tutto insieme, a settimane o a giorni."),
            (
                "Chi ne ha diritto?",
                "Il padre legale al momento della nascita o nei sei mesi successivi, e la moglie della madre se al momento della nascita è l'altro genitore legale.",
            ),
        ],
        "glosario": [("Congedo dell'altro genitore", "Due settimane di congedo pagato dopo la nascita, di solito chiamato congedo di paternità.")],
    },
    "teuerungsrechner": {
        "h1": "Calcolo del rincaro con l'indice nazionale dei prezzi al consumo",
        "title": "Calcolo del rincaro Svizzera: converti con l'IPC",
        "description": "Quanto vale oggi un importo di allora? Calcola il rincaro dal 2000 con l'indice nazionale dei prezzi al consumo dell'UST, mese per mese.",
        "intro": [
            "L'indice nazionale dei prezzi al consumo (IPC) misura l'evoluzione dei prezzi dei beni e servizi acquistati dalle economie domestiche in Svizzera. L'Ufficio federale di statistica lo pubblica ogni mese.",
            "Con il calcolatore converti un importo in un altro mese, per esempio per adeguare al rincaro un salario, una pigione o un contributo di mantenimento.",
        ],
        "como": [
            "Importo adeguato = importo × IPC del mese finale / IPC del mese iniziale.",
            "Il calcolo usa l'IPC base dicembre 2025 = 100, arrotondato a un decimale. I mesi più vecchi sono convertiti in questa base.",
            "Se il mese finale non è ancora pubblicato, il calcolatore usa l'ultimo mese disponibile.",
        ],
        "ejemplo": ["1000 franchi di gennaio 2020 corrispondono a settembre 2026 a circa 1079 franchi. Il rincaro in questo periodo è di circa il 7.9 %."],
        "faq": [
            (
                "Qual è il rincaro in Svizzera?",
                "Lo mostra il rincaro annuo: la variazione dell'IPC rispetto allo stesso mese dell'anno precedente. Il calcolatore lo indica per il mese finale che scegli.",
            ),
            (
                "Da dove vengono i dati?",
                "Dall'Ufficio federale di statistica. La serie proviene dal portale dei dati della Banca nazionale svizzera, che riprende l'IPC dell'UST, ed è aggiornata dopo ogni pubblicazione.",
            ),
            (
                "Perché il risultato è un po' diverso da altri calcolatori?",
                "Altri calcolatori possono usare un'altra base dell'indice o più decimali. Ne risultano piccole differenze di arrotondamento.",
            ),
        ],
        "glosario": [
            ("IPC", "Indice nazionale dei prezzi al consumo dell'Ufficio federale di statistica."),
            ("Rincaro", "Aumento dei prezzi al consumo in un periodo."),
        ],
    },
    "mietzinsrechner": {
        "h1": "Calcolo della pigione: tasso di riferimento e rincaro",
        "title": "Calcolo pigione Svizzera: tasso di riferimento {{ch.referenzzinssatz}}",
        "description": "Calcola l'adeguamento della pigione: tasso di riferimento {{ch.referenzzinssatz}}, {{ch.mietzins-hypothekarzins}} per quarto di punto e {{ch.mietzins-teuerungsanteil}} del rincaro secondo l'OLAL.",
        "intro": [
            "In Svizzera la pigione dipende dal tasso d'interesse di riferimento ipotecario, che l'Ufficio federale delle abitazioni pubblica ogni trimestre. Attualmente è dell'{{ch.referenzzinssatz}}.",
            "Se il tasso è sceso dall'ultimo adeguamento della tua pigione, puoi chiedere una riduzione. Se sale, il locatore può aumentare la pigione. Il calcolatore mostra di quanto.",
        ],
        "como": [
            "Tasso di riferimento: per ogni quarto di punto di aumento la pigione cresce al massimo del {{ch.mietzins-hypothekarzins}} con tassi sotto il 5 %. In caso di riduzione il calcolatore fa l'inverso: pigione divisa per 1.03 per quarto di punto, cioè circa il 2.91 % in meno.",
            "Rincaro: il locatore può trasferire il {{ch.mietzins-teuerungsanteil}} dell'aumento dell'indice nazionale dei prezzi al consumo dall'ultimo adeguamento.",
            "Gli aumenti generali dei costi, per esempio per la manutenzione, si aggiungono solo se sono fatti valere. Il calcolatore somma le tre parti.",
        ],
        "ejemplo": [
            "Una pigione di 2000 franchi, adeguata l'ultima volta all'1.75 % e con l'indice di dicembre 2023, scende di circa 97 franchi a circa 1903 franchi con un tasso di riferimento dell'1.25 %.",
        ],
        "faq": [
            (
                "Quando è pubblicato il tasso di riferimento?",
                "L'Ufficio federale delle abitazioni lo pubblica ogni trimestre, all'inizio di marzo, giugno, settembre e dicembre.",
            ),
            (
                "Posso chiedere una riduzione della pigione?",
                "Sì, per scritto al locatore e per il prossimo termine di disdetta. Il locatore deve prendere posizione entro 30 giorni. Altrimenti puoi rivolgerti all'autorità di conciliazione entro 30 giorni. Il locatore può compensare il risparmio con aumenti dei costi intervenuti nel frattempo.",
            ),
            ("Quanta parte del rincaro può essere trasferita sulla pigione?", "Al massimo il {{ch.mietzins-teuerungsanteil}} dell'aumento dell'indice nazionale dei prezzi al consumo."),
        ],
        "glosario": [
            ("Tasso di riferimento", "Tasso d'interesse medio delle ipoteche in Svizzera, arrotondato al quarto di punto. Serve da base per gli adeguamenti della pigione."),
            ("Pigione netta", "Pigione senza le spese accessorie."),
        ],
    },
    "verzugszinsrechner": {
        "h1": "Calcolo degli interessi di mora in Svizzera: {{ch.verzugszins}} secondo il CO",
        "title": "Interessi di mora Svizzera: {{ch.verzugszins}} secondo l'art. 104 CO",
        "description": "Calcola gli interessi di mora di una fattura non pagata: {{ch.verzugszins}} all'anno secondo l'art. 104 CO o un interesse contrattuale più alto, al giorno.",
        "intro": [
            "Il debitore che non paga in tempo un debito pecuniario deve gli interessi dalla mora. Il Codice delle obbligazioni fissa l'interesse di mora al {{ch.verzugszins}} all'anno, anche se è stato pattuito un interesse contrattuale più basso.",
            "Se è stato pattuito un interesse più alto, può essere chiesto anche durante la mora.",
        ],
        "como": [
            "Interessi di mora = importo × tasso × giorni di mora / giorni d'interesse all'anno.",
            "Il calcolo conta i giorni civili dall'inizio della mora fino alla data scelta.",
            "Scegli se l'anno conta 365 o 360 giorni d'interesse. Con 360 giorni l'interesse è un po' più alto.",
        ],
        "ejemplo": ["Per 5000 franchi in mora da 213 giorni, gli interessi di mora ammontano a circa 146 franchi."],
        "faq": [
            (
                "Quanto sono gli interessi di mora in Svizzera?",
                "Il {{ch.verzugszins}} all'anno, se non è stato pattuito nulla di più alto. Tra commercianti può valere un tasso più alto quando lo sconto bancario usuale nel luogo del pagamento supera questo valore.",
            ),
            (
                "Da quando decorrono gli interessi di mora?",
                "Dalla mora. Se il debito è scaduto, il debitore è messo in mora con l'interpellazione del creditore. Se è stato pattuito un giorno di scadenza, è in mora già allo spirare di quel giorno.",
            ),
            (
                "Si possono chiedere interessi sugli interessi di mora?",
                "No. Non si possono calcolare interessi di mora sugli interessi di mora. Il calcolatore applica gli interessi solo all'importo originale.",
            ),
        ],
        "glosario": [
            ("Mora", "Il debitore non paga un debito scaduto nonostante l'interpellazione o dopo il giorno di scadenza pattuito."),
            ("Giorno di scadenza", "Giorno pattuito entro il quale un pagamento deve essere effettuato."),
        ],
    },
    "saron-hypothek-rechner": {
        "h1": "Calcolo di un'ipoteca SARON con il SARON attuale",
        "title": "Ipoteca SARON: costo degli interessi con il SARON attuale",
        "description": "Costo di un'ipoteca SARON: SARON attuale pubblicato dalla BNS più il tuo margine, al mese, al trimestre e all'anno. Con il tasso guida della BNS.",
        "intro": [
            "In un'ipoteca SARON il tasso è composto dal SARON e da un margine fisso della banca. Il SARON è un tasso overnight garantito in franchi.",
            "Il calcolatore usa l'ultimo SARON pubblicato nel portale dei dati della BNS e mostra quanto costa la tua ipoteca con questo tasso.",
        ],
        "como": [
            "Tasso = SARON + margine. Se il SARON è negativo, calcoli secondo il tuo contratto con 0 % o con il valore pubblicato.",
            "Interesse annuo = importo dell'ipoteca × tasso. Al mese un dodicesimo, al trimestre un quarto.",
        ],
        "ejemplo": ["Un'ipoteca di 600’000 franchi con un margine dello 0.8 % costa circa 400 franchi al mese con un SARON vicino a zero."],
        "faq": [
            ("Che cos'è il SARON?", "Lo Swiss Average Rate Overnight, un tasso di riferimento per il denaro overnight in franchi. È fissato ogni giorno."),
            (
                "Che legame c'è tra SARON e tasso guida?",
                "La Banca nazionale vuole mantenere i tassi a breve termine garantiti del mercato monetario in franchi vicini al tasso guida della BNS. Il calcolatore mostra i due valori uno accanto all'altro, così vedi la differenza.",
            ),
            ("Il mio tasso vale per tutta la durata?", "No. Solo il margine è fisso. La parte SARON cambia con ogni nuovo valore."),
        ],
        "glosario": [
            ("Margine", "Supplemento fisso della banca sul SARON, pattuito nel contratto ipotecario."),
            ("Tasso guida", "Tasso con cui la Banca nazionale svizzera attua la sua politica monetaria."),
        ],
    },
}
