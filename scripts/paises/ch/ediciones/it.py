"""Textos de las calculadoras de ch en italiano de Ticino (ch-it, registro tu). Términos de fedlex en italiano."""

EDICION = "ch-it"
IMPORTS_COMUNES = {"COMUN"}

ALTER = "Età (anno civile meno anno di nascita)"
NBU = {"e": "Premio infortuni non professionali (AINP)", "a": "Lo trovi sul conteggio del salario. Dipende dall'assicuratore e dal ramo."}

TEXTOS = {
    "brutto-netto-rechner": {
        "slug": "calcolo-stipendio-netto",
        "importa": ["ANZAHL"],
        "campos": {
            "monatslohn": "Salario lordo mensile",
            "anzahl": {"e": "Numero di mensilità all'anno", "o": "ANZAHL"},
            "alter": ALTER,
            "nbu": NBU,
            "ktg": "Contributo perdita di guadagno in caso di malattia (se dedotto)",
            "bvgMonat": {"e": "Deduzione LPP mensile secondo il conteggio del salario", "a": "Lascia vuoto: il calcolatore stima il contributo minimo legale."},
        },
        "filas": {
            "netto": "Salario netto mensile",
            "ahv": "AVS/AI/IPG",
            "alv": "Assicurazione contro la disoccupazione (AD)",
            "bvg": "Cassa pensioni (LPP)",
            "nbu": "Infortuni non professionali (AINP)",
            "ktg": "Perdita di guadagno malattia",
            "total": "Deduzioni totali al mese",
            "jahreslohn": "Salario lordo annuo",
            "nettoJahr": "Salario netto annuo",
            "koordinierterLohn": "Salario coordinato (LPP)",
        },
    },
    "netto-brutto-rechner": {
        "slug": "stipendio-netto-lordo",
        "importa": ["ANZAHL"],
        "campos": {
            "netto": "Salario netto mensile desiderato",
            "anzahl": {"e": "Numero di mensilità all'anno", "o": "ANZAHL"},
            "alter": ALTER,
            "nbu": "Premio infortuni non professionali (AINP)",
            "ktg": "Contributo perdita di guadagno in caso di malattia (se dedotto)",
        },
        "filas": {
            "brutto": "Salario lordo mensile necessario",
            "netto": "Salario netto con questo lordo",
            "abzuege": "Deduzioni al mese",
            "jahreslohn": "Salario lordo annuo",
        },
    },
    "lohnkosten-rechner": {
        "slug": "costo-datore-di-lavoro",
        "importa": ["ANZAHL"],
        "campos": {
            "monatslohn": "Salario lordo mensile",
            "anzahl": {"e": "Numero di mensilità all'anno", "o": "ANZAHL"},
            "alter": "Età della persona dipendente",
            "fak": {"e": "Aliquota della cassa di compensazione per assegni familiari (CAF)", "a": "L'aliquota dipende dal cantone e dalla cassa."},
            "bu": {"e": "Premio infortuni professionali (AIP)", "a": "Secondo la polizza del tuo assicuratore infortuni."},
            "ktg": "Quota del datore di lavoro per la perdita di guadagno malattia",
            "bvgMonat": {"e": "Contributo LPP del datore di lavoro al mese", "a": "Lascia vuoto: il calcolatore usa metà dell'accredito di vecchiaia legale."},
        },
        "filas": {
            "kostenMonat": "Costo salariale al mese",
            "ahv": "AVS/AI/IPG quota del datore di lavoro",
            "alv": "AD quota del datore di lavoro",
            "bvg": "Cassa pensioni quota del datore di lavoro",
            "fak": "Cassa di compensazione per assegni familiari",
            "bu": "Infortuni professionali",
            "ktg": "Perdita di guadagno malattia",
            "beitraege": "Contributi del datore di lavoro al mese",
            "zuschlag": "Supplemento sul salario lordo",
            "kostenJahr": "Costo salariale all'anno",
        },
    },
    "bundessteuer-rechner": {
        "slug": "imposta-federale-diretta",
        "importa": ["ZIVILSTAND"],
        "campos": {
            "einkommen": {"e": "Reddito imponibile (imposta federale diretta)", "a": "Reddito dopo tutte le deduzioni, come risulta dalla tassazione dell'imposta federale diretta."},
            "zivilstand": {"e": "Stato civile", "o": "ZIVILSTAND"},
            "kinder": "Figli nella stessa economia domestica al cui mantenimento provvedi in modo preponderante",
        },
        "filas": {
            "steuer": "Imposta federale diretta all'anno",
            "tarifsteuer": "Imposta secondo la tariffa",
            "ermaessigung": "Riduzione per figli",
            "durchschnitt": "Aliquota media",
            "grenzsatz": "Aliquota marginale (sui prossimi 100 franchi)",
            "tarif": "Tariffa applicata",
        },
    },
    "mwst-rechner": {
        "slug": "calcolo-iva",
        "campos": {
            "betrag": "Importo in franchi",
            "richtung": {"e": "Che cosa vuoi calcolare?", "o": {"zuschlagen": "Aggiungere l'IVA (importo senza IVA)", "herausrechnen": "Scorporare l'IVA (importo IVA inclusa)"}},
            "satz": {
                "e": "Aliquota",
                "o": {
                    "normal": "Aliquota normale",
                    "reduziert": "Aliquota ridotta (per esempio alimenti, medicamenti, libri)",
                    "beherbergung": "Aliquota speciale per l'alloggio (pernottamento con colazione)",
                },
            },
        },
        "filas": {"mwst": "IVA", "netto": "Importo senza IVA", "brutto": "Importo IVA inclusa", "satz": "Aliquota"},
    },
    "saeule-3a-rechner": {
        "slug": "pilastro-3a",
        "importa": ["ZIVILSTAND"],
        "campos": {
            "mitPk": "Sono assicurato in una cassa pensioni",
            "erwerbseinkommen": "Reddito annuo da attività lucrativa (solo senza cassa pensioni)",
            "beitrag": {"e": "Versamento previsto nel pilastro 3a", "a": "Lascia vuoto: il calcolatore usa il massimo."},
            "steuerbar": "Reddito imponibile prima del versamento (imposta federale diretta)",
            "zivilstand": {"e": "Stato civile", "o": "ZIVILSTAND"},
            "kinder": "Figli nella stessa economia domestica",
        },
        "filas": {
            "maximum": "Versamento massimo quest'anno",
            "abziehbar": "Versamento deducibile",
            "ersparnis": "Risparmio sull'imposta federale diretta",
            "vorher": "Imposta federale senza versamento",
            "nachher": "Imposta federale con versamento",
        },
    },
    "bvg-rechner": {
        "slug": "calcolo-lpp",
        "campos": {
            "jahreslohn": "Salario annuo AVS",
            "alter": "Età quest'anno (anno civile meno anno di nascita)",
            "guthaben": {"e": "Avere di vecchiaia LPP attuale", "a": "Lo trovi sul certificato di previdenza (parte obbligatoria)."},
            "zins": {"e": "Interesse annuo", "a": "Lascia vuoto: vale il tasso d'interesse minimo LPP."},
        },
        "filas": {
            "kapital": "Avere di vecchiaia a 65 anni",
            "renteMonat": "Rendita di vecchiaia LPP al mese",
            "renteJahr": "Rendita di vecchiaia LPP all'anno",
            "koordinierterLohn": "Salario coordinato",
            "gutschriftHeute": "Accredito di vecchiaia quest'anno",
            "summeGutschriften": "Totale degli accrediti futuri",
            "zins": "Interesse usato",
        },
        "tablas": {"plan": "Avere di vecchiaia anno per anno"},
    },
    "ahv-rentenrechner": {
        "slug": "rendita-avs",
        "campos": {
            "einkommen": {
                "e": "Reddito annuo medio determinante",
                "a": "Media dei redditi rivalutati, più gli accrediti per compiti educativi e assistenziali. La tua cassa di compensazione lo indica in un calcolo anticipato della rendita.",
            },
            "verheiratet": "Coniugato, entrambi i coniugi ricevono una rendita di vecchiaia",
            "einkommenPartner": "Reddito annuo determinante del coniuge",
        },
        "filas": {
            "rente": "Rendita di vecchiaia AVS al mese",
            "ungekuerzt": "Rendita prima del plafonamento",
            "partner": "Rendita del coniuge al mese",
            "summe": "Rendite della coppia insieme",
            "dreizehnte": "13a rendita di vecchiaia a dicembre",
            "jahr": "Rendita di vecchiaia all'anno",
            "tabellenwert": "Reddito determinante (arrotondato al valore della tabella)",
        },
    },
    "ahv-beitraege-selbststaendige": {
        "slug": "contributi-avs-indipendenti",
        "campos": {"einkommen": "Reddito annuo da attività indipendente"},
        "filas": {"beitrag": "Contributo AVS/AI/IPG all'anno", "satz": "Aliquota di contribuzione", "monat": "Al mese"},
    },
    "kapitalbezug-steuer-rechner": {
        "slug": "imposta-prelievo-capitale",
        "importa": ["ZIVILSTAND"],
        "campos": {
            "kapital": "Prelievo di capitale dalla cassa pensioni o dal pilastro 3a",
            "zivilstand": {"e": "Stato civile", "o": "ZIVILSTAND"},
            "mitKindern": "Con figli nella stessa economia domestica",
        },
        "filas": {
            "steuer": "Imposta federale diretta sul prelievo",
            "satz": "Quota del capitale",
            "vollerTarif": "Imposta secondo la tariffa intera (prima della divisione per cinque)",
            "netto": "Capitale dopo l'imposta federale",
        },
    },
    "arbeitslosengeld-rechner": {
        "slug": "indennita-di-disoccupazione",
        "campos": {
            "verdienst": {"e": "Salario mensile medio degli ultimi 6 o 12 mesi", "a": "Conta la più alta delle due medie."},
            "unterhalt": "Obbligo di mantenimento verso figli sotto i 25 anni",
            "ivRente": "Rendita AI per un grado d'invalidità di almeno il 40 %",
            "alter": "Età",
            "beitragsmonate": "Mesi di contribuzione negli ultimi due anni",
        },
        "filas": {
            "taggeld": "Indennità giornaliera lorda",
            "satz": "Quota del guadagno assicurato",
            "monat": "Al mese lordo (21.7 indennità)",
            "versichert": "Guadagno assicurato al mese",
            "anzahl": "Numero massimo di indennità giornaliere",
            "gesamt": "Totale se ricevi tutte le indennità",
        },
    },
    "13-monatslohn-rechner": {
        "slug": "tredicesima",
        "campos": {"monatslohn": "Salario lordo mensile", "monate": {"e": "Mesi lavorati nell'anno civile", "a": "Inserisci mezzo mese come 0.5."}},
        "filas": {
            "anteil": "Tredicesima (pro rata)",
            "proMonat": "Quota per mese lavorato",
            "jahreslohn": "Salario lordo di questi mesi, tredicesima inclusa",
        },
    },
    "ferienrechner": {
        "slug": "calcolo-vacanze",
        "campos": {
            "alter": "Età",
            "tageProWoche": "Giorni di lavoro alla settimana",
            "monate": {"e": "Mesi nell'anno di servizio", "a": "Per un anno di servizio incompleto, per esempio in caso di entrata o uscita."},
            "vertragWochen": "Settimane di vacanza secondo il contratto (se più della legge)",
        },
        "filas": {
            "tage": "Giorni di vacanza per questo periodo",
            "wochen": "Settimane di vacanza per anno di servizio",
            "tageJahr": "Giorni di vacanza per un anno di servizio intero",
            "zuschlag": "Supplemento vacanze teorico per il salario orario",
        },
    },
    "ueberstunden-rechner": {
        "slug": "lavoro-straordinario",
        "campos": {
            "lohnart": {"e": "Tipo di salario", "o": {"monat": "Salario mensile", "stunde": "Salario orario"}},
            "lohn": "Salario lordo (al mese o all'ora)",
            "wochenstunden": "Orario di lavoro contrattuale alla settimana (ore)",
            "stunden": "Numero di ore di lavoro straordinario",
            "zuschlag": {"e": "Supplemento secondo il contratto", "a": "Lascia vuoto: vale il supplemento legale."},
        },
        "filas": {
            "total": "Retribuzione del lavoro straordinario",
            "grund": "Salario normale per queste ore",
            "zuschlag": "Supplemento",
            "satz": "Aliquota del supplemento",
            "stundenlohn": "Salario orario",
        },
    },
    "kuendigungsfrist-rechner": {
        "slug": "termine-di-disdetta",
        "campos": {
            "beginn": "Inizio del rapporto di lavoro",
            "zugang": "Giorno in cui la disdetta giunge al destinatario",
            "probezeit": {"e": "Periodo di prova in mesi", "a": "Senza accordo, il primo mese è il periodo di prova. Al massimo sono possibili tre mesi."},
            "vertragFrist": "Termine di disdetta secondo il contratto in mesi (se diverso)",
        },
        "filas": {
            "ende": "Ultimo giorno di lavoro (fine del rapporto di lavoro)",
            "frist": "Termine di disdetta",
            "dienstjahr": "Anno di servizio quando giunge la disdetta",
        },
    },
    "kinderzulagen-rechner": {
        "slug": "assegni-familiari",
        "campos": {
            "kinder": "Figli fino a 16 anni",
            "inAusbildung": "Figli in formazione (da 15 a 25 anni)",
            "kantonKinder": {"e": "Assegno per i figli nel tuo cantone (se più alto)", "a": "Lascia vuoto: vale il minimo legale."},
            "kantonAusbildung": "Assegno di formazione nel tuo cantone (se più alto)",
        },
        "filas": {
            "monat": "Assegni familiari al mese",
            "jahr": "All'anno",
            "kinderzulage": "Assegno per i figli per ogni figlio",
            "ausbildungszulage": "Assegno di formazione per ogni figlio",
        },
    },
    "mutterschaftsentschaedigung-rechner": {
        "slug": "indennita-di-maternita",
        "importa": ["ERWERBSART"],
        "campos": {
            "art": {"e": "Attività lucrativa", "o": "ERWERBSART"},
            "einkommen": "Reddito prima del parto (salario mensile o reddito annuo)",
        },
        "filas": {
            "taggeld": "Indennità giornaliera",
            "total": "Indennità di maternità totale",
            "tage": "Numero di indennità giornaliere",
            "tagesverdienst": "Reddito medio al giorno",
            "ungekuerzt": "Indennità prima di una riduzione",
        },
    },
    "vaterschaftsentschaedigung-rechner": {
        "slug": "congedo-di-paternita",
        "importa": ["ERWERBSART"],
        "campos": {
            "art": {"e": "Attività lucrativa", "o": "ERWERBSART"},
            "einkommen": "Reddito prima della nascita (salario mensile o reddito annuo)",
        },
        "filas": {
            "taggeld": "Indennità giornaliera",
            "total": "Indennità totale",
            "tage": "Numero di indennità giornaliere",
            "tagesverdienst": "Reddito medio al giorno",
            "ungekuerzt": "Indennità prima di una riduzione",
        },
    },
    "teuerungsrechner": {
        "slug": "calcolo-rincaro",
        "campos": {
            "betrag": "Importo in franchi",
            "von": {"e": "Mese dell'importo originale", "a": "Conta l'indice di quel mese, il giorno non ha importanza."},
            "bis": "Mese a cui vuoi convertire",
        },
        "filas": {
            "angepasst": "Importo con lo stesso potere d'acquisto",
            "differenz": "Differenza dovuta al rincaro",
            "gesamt": "Rincaro nel periodo",
            "vorjahr": "Rincaro annuo nel mese finale",
            "monatAnfang": "Mese iniziale",
            "indexAnfang": "IPC nel mese iniziale (dicembre 2025 = 100)",
            "monatEnde": "Mese finale",
            "indexEnde": "IPC nel mese finale",
        },
    },
    "mietzinsrechner": {
        "slug": "calcolo-pigione-tasso-di-riferimento",
        "campos": {
            "miete": "Pigione netta attuale al mese",
            "refAlt": {"e": "Tasso di riferimento all'ultimo adeguamento della pigione", "a": "Lo trovi nel contratto di locazione o nell'ultimo adeguamento della pigione."},
            "monatAlt": "Indice dei prezzi al consumo all'ultimo adeguamento (mese)",
            "kosten": "Aumento generale dei costi (se fatto valere)",
        },
        "filas": {
            "neu": "Pigione netta adeguata al mese",
            "differenz": "Variazione al mese",
            "total": "Variazione totale",
            "hypothek": "Quota del tasso di riferimento",
            "teuerung": "Quota del rincaro",
            "kosten": "Quota dell'aumento dei costi",
            "refNeu": "Tasso di riferimento attuale",
            "likMonat": "Indice fino a",
        },
    },
    "verzugszinsrechner": {
        "slug": "interessi-di-mora",
        "campos": {
            "betrag": "Importo dovuto",
            "von": "In mora dal (per esempio il giorno dopo la scadenza)",
            "bis": "Fino al",
            "satz": {"e": "Tasso contrattuale (se più alto)", "a": "Lascia vuoto: vale l'interesse di mora legale."},
            "basis": {"e": "Giorni d'interesse all'anno", "o": {"365": "365 giorni", "360": "360 giorni"}},
        },
        "filas": {"zins": "Interesse di mora", "total": "Importo con interesse di mora", "tage": "Giorni di mora", "satz": "Tasso d'interesse annuo"},
    },
    "saron-hypothek-rechner": {
        "slug": "ipoteca-saron",
        "campos": {
            "betrag": "Importo dell'ipoteca",
            "marge": {"e": "Margine della banca", "a": "Lo trovi nell'offerta o nel contratto ipotecario."},
            "negativ": {"e": "SARON negativo", "o": {"null": "Calcolare con 0 % (limite inferiore nel contratto)", "voll": "Calcolare con il valore pubblicato"}},
        },
        "filas": {
            "monat": "Interesse ipotecario al mese",
            "jahr": "Interesse ipotecario all'anno",
            "quartal": "Al trimestre",
            "satz": "Tasso (SARON più margine)",
            "saron": "SARON",
            "saronDatum": "SARON del",
            "leitzins": "Tasso guida della BNS",
        },
    },
}
