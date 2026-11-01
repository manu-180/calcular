import type { ClaveFamilia } from "../ofertas-intl";
import type { DiccionarioVenta, TextosFamilia } from "./tipos";

// Esloveno (ADR 0002): un solo registro, el de FURS eDavki, NLB y SKB. Vikanje con „vi“ y „vaš“ en
// minúscula y el imperativo de segunda del plural en la prosa („vnesite“, „preverite“), nunca tuteo;
// los botones en la forma corta de las interfaces eslovenas („Prenesi“, „Kupi“). Las cartas del
// informe van en primera persona formal. Los textos de las familias sirven a cualquier país: nada de
// organismos de un solo país. El país llega en el marcador {pais} sin declinar, así que va en
// nominativo entre paréntesis. Las fechas y los marcadores cuyo caso no se conoce van tras dos puntos.
// Comillas „ “.
const ZA_VASO_EVIDENCO = { titulo: "Za vašo evidenco", texto: "Z datumom vrednosti, ki jih je izračun uporabil." };
const DRUGI_ZNESKI = { titulo: "Z drugimi zneski", explica: "Enak izračun z nekoliko manjšimi in nekoliko večjimi zneski." };
const DRUGE_OBRESTI = { titulo: "Z drugimi obrestnimi merami", explica: "Enake številke z nekoliko nižjimi in nekoliko višjimi obrestnimi merami." };

const familias: Record<ClaveFamilia, TextosFamilia> = {
  liquidacion: {
    nombre: "Poročilo o končnem obračunu ob prenehanju delovnega razmerja",
    tituloCorto: "poročilo o končnem obračunu",
    paraQuien: "Da preverite končni obračun ob odhodu iz službe, preden ga podpišete ali zahtevate, z vašimi številkami in po predpisih vaše države",
    descripcion: [
      "Poročilo PDF z obračunom po postavkah: koliko vam pripada za vsako, kako je izračunano in katere uradne vrednosti so uporabljene, vsaka z virom.",
      "Poleg tega dobite seznam stvari, ki jih je treba preveriti pred podpisom, in dopis z že vpisanim zneskom, s katerim izplačilo zahtevate pisno.",
    ],
    gancho: "Imejte končni obračun v pisni obliki in ga preverite pred podpisom",
    incluye: [
      { titulo: "Vsaka postavka z izračunom", texto: "Za primerjavo z delodajalčevo ponudbo, vrstico za vrstico." },
      { titulo: "Uradni viri na vpogled", texto: "Vsaka vrednost z ustanovo, ki jo objavlja, in datumom našega preverjanja." },
      { titulo: "Pripravljen dopis z zahtevo", texto: "Z vpisanim zneskom, za pisno zahtevo za izplačilo." },
    ],
    pasos: {
      titulo: "Pred podpisom",
      items: [
        "Primerjajte vsako postavko iz tega poročila z dokumentom, ki ga morate podpisati. Če kaj manjka, pred podpisom vprašajte, zakaj.",
        "Preverite, ali se plača in datumi, s katerimi računa delodajalec, ujemajo s tistimi, ki ste jih vnesli tukaj. Drug datum zaposlitve spremeni skoraj vse zneske.",
        "Zahtevajte izvod vsega, kar podpisujete, in shranite plačilne liste za zadnje mesece.",
        "Če je razlika velika ali ste dobili odpoved, pokažite to poročilo inšpekciji dela v svoji državi ali odvetniku za delovno pravo. Tako prihranite prvo uro računanja.",
      ],
    },
    nota: {
      titulo: "Zahteva za izplačilo",
      uso: "Izpolnite, podpišite in oddajte skupaj z izvodom zase. Prosite, naj vam na vašem izvodu s podpisom in datumom potrdijo prejem.",
      pedido: "Prosim za izplačilo zneskov, ki mi pripadajo ob prenehanju delovnega razmerja in ki po izračunu v priloženem poročilu znašajo",
      cierre: "Priloženi izračun navaja vsako postavko, izračunano po uradnih vrednostih, veljavnih na navedeni datum. Prosim, da me obvestite o datumu izplačila.",
    },
  },
  "pagos-laborales": {
    nombre: "Poročilo o izplačilih iz delovnega razmerja",
    tituloCorto: "poročilo o izplačilih",
    paraQuien: "Da se prepričate, ali so vam božičnica, regres, nadure ali delež dobička pravilno obračunani, in če niso, zahtevate razliko",
    descripcion: [
      "Poročilo PDF z vašim izračunom korak za korakom in z vašimi številkami: katera osnova je uporabljena, kako se računa in katere uradne vrednosti veljajo, vsaka z virom.",
      "Velja za vsako izplačilo s seznama. Pokaže, kako ga preverite na plačilni listi, in vsebuje dopis, s katerim razliko zahtevate pisno.",
    ],
    gancho: "Imejte ta izračun v pisni obliki in ga primerjajte s plačilno listo",
    incluye: [
      { titulo: "Izračun korak za korakom", texto: "Z vašimi podatki in vsako uradno vrednostjo, ki jo uporablja." },
      { titulo: "Kaj iskati na plačilni listi", texto: "Da v minuti vidite, ali ste pravilno plačani." },
      { titulo: "Dopis z zahtevo za razliko", texto: "Z vpisanim zneskom, pripravljen za oddajo." },
    ],
    pasos: {
      titulo: "Kako preverite izplačilo",
      items: [
        "Poiščite to izplačilo na plačilni listi in ga primerjajte z zneskom iz tega poročila.",
        "Če se ne ujema, najprej preverite, ali se podatki, ki ste jih vnesli, ujemajo s tistimi, s katerimi računa delodajalec.",
        "Če se tudi potem ne ujema, uporabite spodnji dopis in razliko zahtevajte pisno. Izvod shranite.",
      ],
    },
    nota: {
      titulo: "Zahteva za izplačilo razlike",
      uso: "Izpolnite, podpišite in oddajte skupaj z izvodom zase.",
      pedido: "Prosim za izplačilo zneska, navedenega v priloženem poročilu, ki po izračunu z veljavnimi uradnimi vrednostmi znaša",
      cierre: "Če je bil izplačani znesek drugačen, prosim za pisno pojasnilo, kako je bil obračunan.",
    },
    escenarios: { titulo: "Ko se število ur spremeni", explica: "Enak izračun z drugim številom ur, da vsak mesec preverite brez novega računanja." },
  },
  impuesto: {
    nombre: "Poročilo o dohodnini",
    tituloCorto: "poročilo o dohodnini",
    paraQuien: "Da veste, koliko dohodnine vam odtegnejo, preverite plačilno listo in vidite, kaj se zgodi, ko se dohodek spremeni",
    descripcion: [
      "Poročilo PDF z vašo dohodnino, izračunano korak za korakom, z uradno lestvico, ki se uporablja, in virom vsake vrednosti.",
      "Poleg tega dobite tabelo davka za druge zneske dohodka, da vnaprej veste, koliko vam ostane po povišici ali menjavi službe.",
    ],
    gancho: "Imejte pojasnilo svoje dohodnine v pisni obliki in poglejte, kaj se zgodi, ko se dohodek spremeni",
    incluye: [
      { titulo: "Izračun po uradni lestvici", texto: "Korak za korakom, z virom vsake vrednosti." },
      { titulo: "Vaš davek pri drugih dohodkih", texto: "Da se o povišici pogajate in veste, koliko vam ostane." },
      { titulo: "Kaj preveriti na plačilni listi", texto: "Da se z delodajalcem ali računovodjo pogovarjate v jeziku številk." },
    ],
    pasos: {
      titulo: "Kako preverite odtegnjeni davek",
      items: [
        "Poiščite odtegnjeni davek na plačilni listi in ga primerjajte z zneskom iz tega poročila.",
        "Če se ne ujema, vprašajte delodajalca, s katerim dohodkom in katerimi olajšavami računa.",
        "Shranite to poročilo za letno davčno napoved, če jo v vaši državi oddajate.",
      ],
    },
    escenarios: { titulo: "Ko se dohodek spremeni", explica: "Enak izračun z nekoliko manjšim in nekoliko večjim dohodkom ter enakimi uradnimi vrednostmi." },
  },
  contratacion: {
    nombre: "Izračun stroškov zaposlenega",
    tituloCorto: "izračun stroškov zaposlenega",
    paraQuien: "Da veste, koliko vas novi zaposleni v resnici stane, z vsemi prispevki, preden se dogovorite za plačo",
    descripcion: [
      "Izračun PDF s skupnimi stroški zaposlenega po delih: plača, prispevki v breme zaposlenega in delodajalca ter rezervacije, vsaka vrednost z uradnim virom.",
      "Vsebuje tabelo stroškov pri drugih plačah, da ponudbo daste in veste, koliko vas vsaka povišica v resnici stane, ter je pripravljen za pošiljanje poslovnemu partnerju ali računovodji.",
    ],
    gancho: "Spremenite te stroške v pisni izračun in se odločite o zaposlitvi",
    incluye: [
      { titulo: "Vsak prispevek posebej", texto: "S pravilom in uradnim virom za vsakega." },
      { titulo: "Stroški pri drugih plačah", texto: "Da se pogajate in veste, koliko doda vsak korak navzgor." },
      { titulo: "Pripravljeno za pošiljanje", texto: "Poslovnemu partnerju, računovodji ali za vašo evidenco." },
    ],
    pasos: {
      titulo: "Preden koga zaposlite",
      items: [
        "Z računovodjo preverite, ali v vaši dejavnosti velja kolektivna pogodba ali minimalna plača, višja od splošne.",
        "Rezervacije iz tega izračuna odvajajte vsak mesec: to so izplačila, ki se naberejo ob koncu leta ali ob prenehanju pogodbe.",
        "Zaposlenega prijavite od prvega dne: stroški v tem izračunu že upoštevajo obvezne prispevke.",
      ],
    },
    escenarios: { titulo: "Stroški pri drugih plačah", explica: "Enak izračun z nižjimi in višjimi plačami ter enakimi uradnimi vrednostmi." },
  },
  "ajuste-inflacion": {
    nombre: "Dopis o uskladitvi z inflacijo",
    tituloCorto: "dopis o uskladitvi",
    paraQuien: "Da zahtevate ali napoveste uskladitev najemnine, obroka, honorarja ali plače po uradnem indeksu",
    descripcion: [
      "Dopis, pripravljen za oddajo, z vpisanim novim zneskom in dokazilom o izračunu: uradni indeks za vsak datum, ustanova, ki ga objavlja, in povezava do vira.",
      "Ko je dokazilo na vpogled, druga stran številko potrdi v minuti in pogovor teče o indeksu, ne o računanju.",
    ],
    gancho: "Spremenite to uskladitev v pripravljen dopis z uradnim indeksom kot dokazilom",
    incluye: [
      { titulo: "Izpolnjen dopis", texto: "Z novim zneskom, za tiskanje ali pošiljanje." },
      { titulo: "Uradni indeks kot dokazilo", texto: "Z ustanovo, datumom in povezavo do vira." },
      { titulo: "Izračun na vpogled", texto: "Da druga stran sama pride do enake številke." },
    ],
    nota: {
      titulo: "Obvestilo o uskladitvi",
      uso: "Izpolnite s podatki iz pogodbe in oddajte skupaj z izračunom.",
      pedido: "Obveščam vas o uskladitvi dogovorjenega zneska z gibanjem uradnega indeksa cen življenjskih potrebščin, kot navaja priloženi izračun. Usklajeni znesek je",
      cierre: "Izračun uporablja indeks, ki ga objavlja uradna ustanova, navedena v prilogi, in ga je mogoče preveriti v navedenem viru.",
    },
  },
  regimen: {
    nombre: "Poročilo o poenostavljeni obdavčitvi",
    tituloCorto: "poročilo o poenostavljeni obdavčitvi",
    paraQuien: "Da veste, koliko plačujete v sistemu poenostavljene obdavčitve in kaj se zgodi, ko se prihodki povečajo ali zmanjšajo",
    descripcion: [
      "Poročilo PDF z vašo akontacijo ali davkom v poenostavljenem sistemu, izračunano korak za korakom po uradni lestvici in z virom vsake vrednosti.",
      "Poleg tega dobite tabelo z zneski, ki bi jih plačevali pri drugih prihodkih, da prehod v drug razred vidite vnaprej.",
    ],
    gancho: "Imejte svoj izračun v pisni obliki in poglejte, kaj se zgodi, ko se prihodki spremenijo",
    incluye: [
      { titulo: "Vaš izračun po uradni lestvici", texto: "Korak za korakom, z virom vsake vrednosti." },
      { titulo: "Koliko bi plačevali pri drugih prihodkih", texto: "Da prehod v drug razred vidite vnaprej." },
      ZA_VASO_EVIDENCO,
    ],
    escenarios: { titulo: "Ko se prihodki spremenijo", explica: "Enak izračun z nižjimi in višjimi prihodki ter enakimi uradnimi vrednostmi." },
  },
  deposito: {
    nombre: "Primerjava vezanih depozitov",
    tituloCorto: "primerjava depozitov",
    paraQuien: "Da primerjate svoj vezani depozit na različne roke, preden se odločite, kje in za koliko časa boste pustili denar",
    descripcion: ["Poročilo PDF z donosom vašega vezanega depozita in tabelo enakega zneska na druge roke, vse z enakim izračunom kot v kalkulatorju."],
    gancho: "Primerjajte depozit na več rokov v enem poročilu",
    incluye: [
      { titulo: "Vaš depozit na več rokov", texto: "V eni tabeli, da izberete na prvi pogled." },
      { titulo: "Izračun korak za korakom", texto: "Z virom vsake vrednosti, ki jo uporablja." },
      ZA_VASO_EVIDENCO,
    ],
    escenarios: { titulo: "Vaš depozit na druge roke", explica: "Enak izračun z drugimi roki vezave." },
  },
  alimentos: {
    nombre: "Poročilo o preživnini",
    tituloCorto: "poročilo o preživnini",
    paraQuien: "Da na mediacijo ali pogajanja o preživnini pridete z utemeljenim zneskom",
    descripcion: ["Poročilo PDF z okvirnim zneskom preživnine, korak za korakom, z uradnimi vrednostmi in njihovim virom ter s tabelo zneskov pri drugih dohodkih."],
    gancho: "Pridite na mediacijo s tem izračunom v pisni obliki",
    incluye: [
      { titulo: "Utemeljen izračun", texto: "Korak za korakom, z virom vsake vrednosti." },
      { titulo: "Znesek pri drugih dohodkih", texto: "Da se pogajate in vidite različne možnosti." },
      { titulo: "Za vašega odvetnika ali mediatorja", texto: "Tako prihranite prvo uro računanja." },
    ],
    escenarios: { titulo: "Pri drugih dohodkih", explica: "Enak izračun z nižjimi in višjimi dohodki." },
  },
  jubilacion: {
    nombre: "Ocena pokojnine",
    tituloCorto: "ocena pokojnine",
    paraQuien: "Da pokojnino načrtujete s pisno oceno in vidite, kaj se spremeni, če plačujete višje prispevke",
    descripcion: ["Poročilo PDF z okvirnim zneskom pokojnine korak za korakom, z uradnimi vrednostmi in njihovim virom ter s tabelo ocene pri drugih plačah."],
    gancho: "Imejte oceno svoje pokojnine v pisni obliki",
    incluye: [
      { titulo: "Ocena korak za korakom", texto: "Z virom vsake vrednosti." },
      { titulo: "Pri drugih plačah", texto: "Da vidite, kaj se spremeni, če plačujete višje prispevke." },
      ZA_VASO_EVIDENCO,
    ],
    escenarios: { titulo: "Pri drugih plačah", explica: "Enak izračun z nižjimi in višjimi plačami." },
  },
  "plan-prestamo": {
    nombre: "Načrt odplačila kredita",
    tituloCorto: "načrt odplačila kredita",
    paraQuien: "Da veste, koliko vas kredit v resnici stane, in primerjate ponudbe pred podpisom",
    descripcion: [
      "Poročilo PDF s celotnim kreditom: obrok, skupni znesek, ki ga boste plačali, in koliko od tega so obresti.",
      "Če ste računali obrok, poročilo vsebuje vsak obrok posebej. Enake številke so izračunane tudi z drugimi obrestnimi merami, da ponudbe bank primerjate na resničnih številkah.",
    ],
    gancho: "Primerjajte ponudbe kreditov na svojih številkah pred podpisom",
    incluye: [
      { titulo: "Vaš kredit z drugimi merami", texto: "Da vidite, kaj naredi ena odstotna točka gor ali dol." },
      { titulo: "Skupna cena na vpogled", texto: "Koliko plačate obresti, brez drobnega tiska." },
      { titulo: "Seznam pred podpisom", texto: "Vprašanja, ki jih je vredno postaviti banki." },
    ],
    pasos: {
      titulo: "Preden podpišete kreditno pogodbo",
      items: [
        "Vprašajte za efektivno obrestno mero (EOM), ki zajema vse stroške, ne samo za nominalno. Ponudbe je vredno primerjati prav po njej.",
        "Vprašajte za strošek odobritve kredita, obvezno zavarovanje in nadomestilo za predčasno odplačilo.",
        "Primerjajte vsaj tri ponudbe po tabeli z drugimi obrestnimi merami iz tega poročila.",
        "Izberite obrok, ki ga lahko plačujete tudi v slabšem mesecu. Okvirno manj kot tretjino dohodka.",
      ],
    },
    escenarios: DRUGE_OBRESTI,
  },
  "plan-hipoteca": {
    nombre: "Načrt stanovanjskega kredita",
    tituloCorto: "načrt stanovanjskega kredita",
    paraQuien: "Da se o stanovanjskem kreditu odločite z vsemi številkami pred seboj: obrok, obresti in kaj se zgodi, ko se obrestna mera spremeni",
    descripcion: [
      "Poročilo PDF s celotnim stanovanjskim kreditom: obrok, skupni znesek, ki ga boste plačali, in koliko od tega v letih odplačevanja odide za obresti.",
      "Vsebuje celotne tabele vašega izračuna (brezplačna stran prikaže samo prve vrstice) in enake številke z drugimi obrestnimi merami. Če ste primerjali najem in nakup, imate primerjavo v pisni obliki in se lahko odločite skupaj z družino.",
    ],
    gancho: "Pridite v banko s celotno tabelo stanovanjskega kredita in drugimi obrestnimi merami",
    incluye: [
      { titulo: "Celotna tabela", texto: "Vse vrstice, ne samo prve." },
      { titulo: "Vaš stanovanjski kredit z drugimi merami", texto: "Da vidite, kaj z obrokom naredi ena odstotna točka gor ali dol." },
      { titulo: "Vprašanja za banko", texto: "Kaj preveriti pred podpisom." },
    ],
    pasos: {
      titulo: "Preden podpišete pogodbo o stanovanjskem kreditu",
      items: [
        "Zahtevajte pisno ponudbo z obrestno mero, rokom odplačila in skupnimi stroški, skupaj z zavarovanjem in nadomestili.",
        "Vprašajte, ali je obrestna mera fiksna ali spremenljiva in kaj se zgodi z obrokom, če se referenčna mera zviša.",
        "Pozanimajte se, koliko stane predčasno odplačilo in ali lahko izredno odplačujete brez dodatnih stroškov.",
        "Obroku prištejte stroške stanovanja (davek na nepremičnine, zavarovanje, vzdrževanje), preden se odločite, koliko si lahko privoščite.",
      ],
    },
    escenarios: DRUGE_OBRESTI,
  },
  "plan-inversion": {
    nombre: "Načrt varčevanja in naložb",
    tituloCorto: "načrt varčevanja",
    paraQuien: "Da vidite, kako vaši prihranki rastejo s časom in kaj se spremeni, če odvajate več ali dobite drugo obrestno mero",
    descripcion: [
      "Poročilo PDF z oceno vaših prihrankov: koliko vplačujete, koliko dobite iz obresti in koliko boste imeli na koncu.",
      "Vsebuje celotne tabele vašega izračuna in enake številke z drugimi obrestnimi merami, da o tem, kje varčevati, odločate na resničnih številkah.",
    ],
    gancho: "Imejte načrt varčevanja v pisni obliki, leto za letom",
    incluye: [
      { titulo: "Celotna ocena", texto: "Vse vrstice tabele, ne samo prve." },
      { titulo: "Z drugimi merami", texto: "Da primerjate možnosti, preden izberete." },
      { titulo: "Načrt, ki ga je mogoče izvesti", texto: "Koraki, s katerimi namen postane prihranek." },
    ],
    pasos: {
      titulo: "Da bo načrt uspel",
      items: [
        "Nastavite trajni nalog za dan izplačila plače: česar ne vidite, tega ne porabite.",
        "Primerjajte obrestno mero z inflacijo: ko je mera nižja, vaš denar izgublja vrednost, čeprav številka raste.",
        "Enkrat na leto znova odprite to poročilo in posodobite svoje številke.",
      ],
    },
    escenarios: DRUGE_OBRESTI,
  },
  "plan-deudas": {
    nombre: "Načrt odplačila kreditne kartice",
    tituloCorto: "načrt odplačila kartice",
    paraQuien: "Da veste, kdaj boste odplačali kartico, koliko vas bo to stalo v obrestih in kako to storite prej",
    descripcion: [
      "Poročilo PDF z vašim dolgom mesec za mesecem: koliko plačate, koliko odide za obresti in kako hitro se dolg zmanjšuje.",
      "Vsebuje celotno tabelo do zadnjega plačila in enake številke z drugimi mesečnimi plačili, da vidite, koliko prihranite, če vsak mesec plačate malo več.",
    ],
    gancho: "Poglejte mesec za mesecem, kdaj boste odplačali kartico",
    incluye: [
      { titulo: "Mesec za mesecem do zadnjega plačila", texto: "Z obrestmi, ki jih plačate vsak mesec." },
      { titulo: "Z drugimi plačili", texto: "Da vidite, koliko prej končate, če plačujete malo več." },
      { titulo: "Pot iz dolga", texto: "Koraki, da znova ne zaidete v dolgove." },
    ],
    pasos: {
      titulo: "Kako se rešite dolga",
      items: [
        "Med odplačevanjem kartice ne uporabljajte: vsak nov nakup podaljša tabelo.",
        "Vedno plačajte več od najnižjega zneska. Pomaga tudi malo, tabela z drugimi plačili pa pokaže, koliko.",
        "Če imate več dolgov, najprej odplačujte tistega z najvišjo obrestno mero, za ostale pa plačujte najnižji znesek.",
        "Banko vprašajte za refinanciranje z nižjo obrestno mero in ga primerjajte s tem poročilom.",
      ],
    },
    escenarios: { titulo: "Z drugimi mesečnimi plačili", explica: "Enak dolg, če vsak mesec plačate malo manj in malo več." },
  },
  "plan-presupuesto": {
    nombre: "Načrt družinskega proračuna",
    tituloCorto: "načrt proračuna",
    paraQuien: "Da mesec organizirate po jasnem načrtu: koliko gre za potrebe, želje in varčevanje",
    descripcion: [
      "Poročilo PDF, ki iz vašega izračuna naredi načrt: koliko nameniti za vsako postavko, v vaši valuti in z vašimi številkami.",
      "Vsebuje enak načrt z drugimi zneski, da vnaprej veste, kaj se spremeni v mesecu z več ali manj denarja, ter korake, da se ga držite.",
    ],
    gancho: "Spremenite ta izračun v načrt svojega meseca",
    incluye: [
      { titulo: "Vaš načrt z vašimi številkami", texto: "Koliko gre kam, pripravljeno za uporabo." },
      { titulo: "Z drugimi zneski", texto: "Da načrt prilagodite, ko bo mesec drugačen." },
      { titulo: "Koraki, da se načrta držite", texto: "Kaj pomaga, da proračun zdrži dlje od prvega meseca." },
    ],
    pasos: {
      titulo: "Da bo proračun uspel",
      items: [
        "Prihranke odvojite na dan izplačila plače, pred stroški. Kar ostane, lahko porabite.",
        "Med mesecem si zapisujte stroške, četudi v telefon, in jih primerjajte s tem načrtom.",
        "Najprej ustvarite rezervo za nujne primere, da nepričakovan strošek ne konča na kreditni kartici.",
      ],
    },
    escenarios: DRUGI_ZNESKI,
  },
  "plan-negocio": {
    nombre: "Poročilo s številkami vašega posla",
    tituloCorto: "poročilo za vaš posel",
    paraQuien: "Da o cenah, marži ali naložbi odločate na podlagi jasnih številk, pripravljenih za poslovnega partnerja",
    descripcion: [
      "Poročilo PDF z vašim izračunom, pojasnjenim korak za korakom: kateri podatki so uporabljeni, kako se računa in kakšen je rezultat.",
      "Poleg tega dobite tabelo z enakim izračunom za druge zneske, da vidite, kako se rezultat spremeni, ko se stroški zvišajo ali ko znižate ceno.",
    ],
    gancho: "Spremenite te številke v poročilo za odločitev ali za poslovnega partnerja",
    incluye: [
      { titulo: "Pojasnjen izračun", texto: "Da ga razumete in zagovarjate pred partnerjem ali banko." },
      { titulo: "Z drugimi zneski", texto: "Da vnaprej vidite učinek spremembe cene ali stroškov." },
      { titulo: "Vprašanja pred odločitvijo", texto: "Kaj preveriti, preden spremenite ceno." },
    ],
    pasos: {
      titulo: "Pred odločitvijo",
      items: [
        "Preverite, ali ste v stroške vključili vse: prevoz, provizije, davke in lastni čas.",
        "Preden spremenite ceno, jo primerjajte z dvema ali tremi konkurenti.",
        "Poglejte najslabši scenarij v tabeli: če ga posel prenese, je odločitev varnejša.",
      ],
    },
    escenarios: DRUGI_ZNESKI,
  },
  "kit-freelance": {
    nombre: "Paket za urno postavko samozaposlenih",
    tituloCorto: "paket za urno postavko",
    paraQuien: "Da za svoje delo zahtevate toliko, kot je vredno, in urno postavko navajate samozavestno",
    descripcion: [
      "Poročilo PDF s pojasnilom vaše urne postavke: dohodek, ki ga želite doseči, ure, ki jih je res mogoče zaračunati, in stroški, ki jih postavka pokrije.",
      "Vsebuje urno postavko za druge ciljne dohodke in pripravljen dopis za stranko z vašo postavko.",
    ],
    gancho: "Navajajte svojo urno postavko s številkami, ne z opravičili",
    incluye: [
      { titulo: "Pojasnilo vaše urne postavke", texto: "Za trenutek, ko kdo vpraša, zakaj ravno toliko." },
      { titulo: "Za druge ciljne dohodke", texto: "Urna postavka, ki jo potrebujete za vsakega od njih." },
      { titulo: "Pripravljen dopis z urno postavko", texto: "Z vpisano številko, za pošiljanje strankam." },
    ],
    pasos: {
      titulo: "Da zaračunate, kolikor je treba",
      items: [
        "Računajte samo ure, ki jih lahko zaračunate: tudi sestanki, ponudbe in opomniki za plačilo so delo.",
        "Ko je mogoče, ponudite ceno za projekt: stranka kupi rezultat, ne ur.",
        "Urno postavko preglejte enkrat na leto ali prej, če se vam stroški zvišajo.",
      ],
    },
    nota: {
      titulo: "Dopis z urno postavko",
      uso: "Izpolnite s podatki stranke in pošljite skupaj s svojo ponudbo.",
      pedido: "Na podlagi najinega pogovora vam pošiljam svojo ceno za dogovorjene strokovne storitve. Moja urna postavka znaša",
      cierre: "Urna postavka pokriva delovni čas in stroške opravljanja moje dejavnosti. Na željo pripravim tudi ponudbo s ceno za celoten projekt.",
    },
    escenarios: { titulo: "Za druge ciljne dohodke", explica: "Enak izračun z nižjimi in višjimi ciljnimi dohodki." },
  },
  "plan-sueldo": {
    nombre: "Poročilo o plači",
    tituloCorto: "poročilo o plači",
    paraQuien: "Da se o plači, ponudbi ali povišici pogajate in veste, koliko to znese na uro, na mesec in na leto",
    descripcion: [
      "Poročilo PDF s pojasnilom izračuna vaše plače, z vašimi številkami in vsako vrednostjo, ki jo uporablja.",
      "Poleg tega dobite tabelo z drugimi zneski, da primerjate ponudbe ali zahtevate povišico z jasnimi številkami.",
    ],
    gancho: "Pogajajte se o plači s številkami v roki",
    incluye: [
      { titulo: "Vaš celoten izračun", texto: "Z vsako vrednostjo, ki ste jo vnesli." },
      { titulo: "Z drugimi zneski", texto: "Da v minuti primerjate dve ponudbi." },
      { titulo: "Nasveti za pogajanja", texto: "Kaj reči in kaj zahtevati poleg same številke." },
    ],
    pasos: {
      titulo: "Kako se dogovorite",
      items: [
        "Ko primerjate ponudbe, govorite o letnih zneskih ali zneskih na uro: mesečne številke skrijejo razliko.",
        "Zahtevajte tudi tisto, kar ni plača: dodatne dneve dopusta, delo od doma, izobraževanja ali nagrade.",
        "Pridite s konkretno številko in utemeljitvijo: vaše izkušnje, trg ali to, kar se je spremenilo pri vašem delu.",
      ],
    },
    escenarios: DRUGI_ZNESKI,
  },
  "kit-calculos": {
    nombre: "Izračun s pojasnilom korak za korakom",
    tituloCorto: "izračun s pojasnilom",
    paraQuien: "Da imate izračun rešen in pojasnjen, pripravljen za tiskanje, učenje ali oddajo",
    descripcion: [
      "Poročilo PDF z vašim izračunom, postopkom reševanja in rezultatom, z vašimi številkami.",
      "Uporabite ga za učenje, kot zapis izračuna ali da ga komu pokažete brez dodatnega pojasnjevanja.",
    ],
    gancho: "Vzemite izračun s seboj, s pojasnilom korak za korakom",
    incluye: [
      { titulo: "Rešen izračun", texto: "Z vašimi podatki in rezultatom." },
      { titulo: "Kako se računa", texto: "Da vidite, kako nastane vsaka številka." },
      { titulo: "Pripravljeno za tiskanje", texto: "Ali za shranjevanje kot PDF in deljenje." },
    ],
    pasos: {
      titulo: "Kako preverite izračun",
      items: ["Izračunajte nazaj: od rezultata se vrnite do začetne vrednosti.", "Zaokrožujte šele na koncu: zaokroževanje pri vsakem koraku spremeni rezultat."],
    },
    escenarios: DRUGI_ZNESKI,
  },
  "kit-gastos-grupo": {
    nombre: "Pregled skupnih stroškov",
    tituloCorto: "pregled stroškov",
    paraQuien: "Da vsak ve, koliko dolguje, brez prerekanja in računanja na prtičku",
    descripcion: [
      "Pregled PDF skupnega računa: skupni znesek, koliko plača vsak in po potrebi kdo komu dolguje.",
      "Pošljite ga v skupinski klepet ali ga natisnite, da nikomur ni treba znova računati.",
    ],
    gancho: "Razdelite račun z ostalimi jasno in brez prerekanja",
    incluye: [
      { titulo: "Koliko plača vsak", texto: "S skupnim zneskom in podrobnostmi na vpogled." },
      { titulo: "Pripravljeno za deljenje", texto: "V PDF-ju, za pošiljanje ostalim." },
      { titulo: "Z drugimi skupnimi zneski", texto: "Če se računu kaj doda." },
    ],
    pasos: {
      titulo: "Kako poravnate račun",
      items: ["Pošljite pregled ostalim, preden kdo plača: tako se izognete nesporazumom.", "Dogovorite se za način plačila in datum poravnave."],
    },
    escenarios: { titulo: "Z drugimi skupnimi zneski", explica: "Enaka delitev, ko je skupni znesek malo manjši ali večji." },
  },
  "kit-estudio": {
    nombre: "Poročilo o povprečju ocen",
    tituloCorto: "poročilo o povprečju",
    paraQuien: "Da imate svoje povprečje jasno in v pisni obliki, z utežjo vsake ocene",
    descripcion: [
      "Poročilo PDF z vašim povprečjem: vsaka ocena, njena utež in kako se pride do rezultata.",
      "Uporabite ga, da preverite oceno, načrtujete naslednji izpit ali izračun pokažete tistemu, ki ga potrebuje.",
    ],
    gancho: "Imejte pojasnilo svojega povprečja v pisni obliki",
    incluye: [
      { titulo: "Vsaka ocena s svojo utežjo", texto: "Da vidite, katera najbolj vpliva." },
      { titulo: "Izračun korak za korakom", texto: "Za preverjanje ali predstavitev." },
      { titulo: "Zamisli za naslednji izpit", texto: "Kako povprečje uporabite za boljšo organizacijo." },
    ],
    pasos: {
      titulo: "Za naslednji izpit",
      items: ["Poglejte, katera ocena ima največjo utež, in temu predmetu ali izpitu namenite več časa.", "Če se vam zdi, da je ocena napačno izračunana, pokažite to poročilo učitelju."],
    },
  },
  "kit-fechas": {
    nombre: "Poročilo o datumih in rokih",
    tituloCorto: "poročilo o datumih",
    paraQuien: "Da imate izračunani datum ali rok v pisni obliki, pripravljen kot dokazilo ali da ga ne pozabite",
    descripcion: [
      "Poročilo PDF z izračunom datuma: datumi, ki ste jih vnesli, rezultat in kako je izračunan.",
      "Uporabite ga pri dokumentih, pogodbi, roku zapadlosti ali samo kot zapis.",
    ],
    gancho: "Imejte ta datum v pisni obliki, pripravljen kot dokazilo",
    incluye: [
      { titulo: "Pojasnjen izračun", texto: "Z datumi in načinom štetja dni." },
      { titulo: "Pripravljeno kot dokazilo", texto: "Pri dokumentih ali kot priloga k pogodbi." },
      { titulo: "Za vašo evidenco", texto: "Z datumom izdelave." },
    ],
    pasos: {
      titulo: "Preden datum uporabite v dokumentih",
      items: [
        "Preverite, ali se rok šteje v koledarskih ali delovnih dneh: od tega je odvisen rezultat.",
        "Poglejte, ali zadnji dan pade na praznik ali konec tedna.",
        "Končni datum vpišite v koledar, z opomnikom nekaj dni prej.",
      ],
    },
  },
  "plan-salud": {
    nombre: "Poročilo o ITM in kalorijah",
    tituloCorto: "poročilo o ITM in kalorijah",
    paraQuien: "Da imate svoje vrednosti telesne mase in energije v pisni obliki in jih odnesete k zdravniku",
    descripcion: [
      "Poročilo PDF s pojasnilom vašega rezultata: kaj meri, kako je izračunan in v kateri razpon spada, z vašimi podatki.",
      "To so splošne informacije za pogovor z zdravstvenim delavcem. Niso diagnoza in ne nadomeščajo zdravniškega pregleda.",
    ],
    gancho: "Odnesite svoje vrednosti k zdravniku, pojasnjene in v pisni obliki",
    incluye: [
      { titulo: "Vaš rezultat s pojasnilom", texto: "Kaj meri in kako je izračunan." },
      { titulo: "Vprašanja za zdravnika", texto: "Da od pregleda dobite več." },
      { titulo: "Za spremljanje sprememb", texto: "Shranite vsako poročilo in jih sčasoma primerjajte." },
    ],
    pasos: {
      titulo: "Kako se o tem pogovorite s strokovnjakom",
      items: [
        "Vzemite s seboj to poročilo in vprašajte, kateri razpon je zdrav prav za vas glede na starost in zdravstveno zgodovino.",
        "Povejte, kako se prehranjujete, koliko se gibate in kako spite: same številke ne pokažejo vsega.",
        "Ne delajte velikih sprememb v prehrani ali telesni dejavnosti, dokler se ne posvetujete s strokovnjakom.",
      ],
    },
    aviso: "Splošne informacije. Ne nadomeščajo nasveta zdravstvenega delavca.",
  },
  "plan-embarazo": {
    nombre: "Poročilo o plodnosti in nosečnosti",
    tituloCorto: "poročilo o plodnosti in nosečnosti",
    paraQuien: "Da imate okvirne datume v pisni obliki in jih vzamete s seboj na naslednji pregled",
    descripcion: [
      "Poročilo PDF z okvirnimi datumi in načinom, kako je bil vsak izračunan iz podatkov, ki ste jih vnesli.",
      "Datumi so okvirni: vsako telo in vsaka nosečnost sta drugačna. Pomagajo pri organizaciji in pogovoru z zdravstvenim delavcem, vendar ne nadomeščajo pregleda.",
    ],
    gancho: "Imejte svoje datume v pisni obliki do naslednjega pregleda",
    incluye: [
      { titulo: "Vaši okvirni datumi", texto: "Z načinom, kako je bil vsak izračunan." },
      { titulo: "Vprašanja za pregled", texto: "Da od obiska dobite čim več." },
      { titulo: "Za vašo evidenco", texto: "S podatki, ki ste jih uporabili." },
    ],
    pasos: {
      titulo: "Za naslednji pregled",
      items: [
        "Vzemite s seboj to poročilo in datum prvega dne zadnje menstruacije.",
        "Vprašajte, kateri pregledi so potrebni v vašem tednu nosečnosti in kdaj je naslednji pregled.",
        "Če vas skrbi kateri koli simptom, se obrnite na zdravnika in ne čakajte na datume iz poročila.",
      ],
    },
    aviso: "Splošne informacije. Datumi so okvirni in ne nadomeščajo oskrbe zdravstvenega delavca.",
  },
  "plan-entrenamiento": {
    nombre: "Poročilo o tempu teka",
    tituloCorto: "poročilo o tempu",
    paraQuien: "Da na trening greste z znanim ciljnim tempom in veste, kako razporediti moči",
    descripcion: [
      "Poročilo PDF s pojasnilom vašega tempa, časa in hitrosti iz podatkov, ki ste jih vnesli.",
      "Vsebuje celotne tabele izračuna in nasvete, kako tempo uporabite na treningu.",
    ],
    gancho: "Imejte svoj tempo v pisni obliki za dan tekme",
    incluye: [
      { titulo: "Vaš tempo s pojasnilom", texto: "S časom in hitrostjo." },
      { titulo: "Za tiskanje in s seboj", texto: "V žep ali na hladilnik." },
      { titulo: "Nasveti za trening", texto: "Kako tempo uporabite brez poškodb." },
    ],
    pasos: {
      titulo: "Kako uporabite tempo",
      items: [
        "Prvih nekaj minut tecite malo počasneje od ciljnega tempa: na cilju se bo to poznalo.",
        "Večino tedenskih treningov tecite v lahkem tempu, pri katerem se še lahko pogovarjate.",
        "Če vas kaj boli, se ustavite in se posvetujte s strokovnjakom: tempo lahko počaka.",
      ],
    },
    aviso: "Splošne informacije. Ne nadomeščajo nasveta zdravstvenega delavca ali športnega strokovnjaka.",
  },
  "kit-viaje": {
    nombre: "Izračun stroškov goriva za pot",
    tituloCorto: "izračun stroškov goriva",
    paraQuien: "Da veste, koliko boste porabili za gorivo, in znesek razdelite z vsemi, ki potujejo",
    descripcion: [
      "Poročilo PDF s ceno goriva za vašo pot, z vašimi številkami: razdalja, poraba in cena.",
      "Poleg tega dobite tabelo z drugimi cenami goriva, če bi se do odhoda spremenile, in seznam ostalih stroškov poti.",
    ],
    gancho: "Imejte ceno poti v pisni obliki pred odhodom",
    incluye: [
      { titulo: "Cena poti", texto: "Z razdaljo, porabo in ceno." },
      { titulo: "Pri drugih cenah", texto: "Če se gorivo do odhoda podraži." },
      { titulo: "Seznam za preostanek poti", texto: "Cestnina, parkiranje in hrana." },
    ],
    pasos: {
      titulo: "Kako pripravite izračun poti",
      items: [
        "Ceni goriva prištejte cestnino, parkiranje in hrano.",
        "Če potuje več ljudi, razdelite skupni znesek in vsem sporočite pred odhodom.",
        "Preverite tlak v pnevmatikah: z napol praznimi pnevmatikami avto porabi več goriva.",
      ],
    },
    escenarios: { titulo: "Pri drugih cenah", explica: "Enaka pot z malo cenejšim in malo dražjim gorivom." },
  },
  "kit-hogar": {
    nombre: "Poročilo o stroških elektrike",
    tituloCorto: "poročilo o stroških elektrike",
    paraQuien: "Da veste, koliko stane vsaka naprava in kje lahko na računu za elektriko prihranite",
    descripcion: [
      "Poročilo PDF s tem, koliko vas stane vaša naprava, z vašimi podatki o uporabi in ceno elektrike.",
      "Poleg tega dobite tabelo z drugimi cenami elektrike in seznam zamisli, kako znižate račun.",
    ],
    gancho: "Ugotovite, koliko vas ta naprava stane in kako to znižate",
    incluye: [
      { titulo: "Strošek pri vaši uporabi", texto: "S pojasnilom korak za korakom." },
      { titulo: "Pri drugih cenah", texto: "Če se elektrika podraži." },
      { titulo: "Zamisli za prihranek", texto: "Tiste, ki se na računu najbolj poznajo." },
    ],
    pasos: {
      titulo: "Kako znižate račun",
      items: [
        "Naprave v stanju pripravljenosti izključite iz vtičnice: elektriko porabljajo tudi, ko so ugasnjene.",
        "Najmočnejše naprave vklapljajte v času nižje tarife, če jo imate.",
        "Primerjajte to poročilo s svojim računom, da vidite, kolikšen del skupnega zneska predstavlja ta naprava.",
      ],
    },
    escenarios: { titulo: "Pri drugih cenah", explica: "Enaka uporaba z malo cenejšo in malo dražjo elektriko." },
  },
  "kit-obra": {
    nombre: "Seznam gradbenega materiala",
    tituloCorto: "seznam materiala",
    paraQuien: "Da material kupite v pravi količini, da nič ne manjka in nič ne ostane",
    descripcion: [
      "Poročilo PDF z izračunom materiala: mere, količine in kako je izračunano, pripravljeno, da ga vzamete s seboj v trgovino.",
      "Poleg tega dobite seznam za pravilen nakup: rezerva za odpadek, kaj vprašati in kaj preveriti pred začetkom del.",
    ],
    gancho: "Pridite v trgovino s seznamom materiala v roki",
    incluye: [
      { titulo: "Mere in količine", texto: "Vse, kar ste izračunali, na eni strani." },
      { titulo: "Da pokažete v trgovini", texto: "Da vam izračunajo točno to, kar potrebujete." },
      { titulo: "Seznam za pravilen nakup", texto: "Rezerva za odpadek in kaj preveriti." },
    ],
    pasos: {
      titulo: "Pred nakupom",
      items: [
        "Prištejte 5 do 10 % za razrez in lom, pri zahtevnih oblikah pa več.",
        "Kupite vse iz iste proizvodne serije: barva in odtenek se lahko med serijami razlikujeta.",
        "Vprašajte za porabo izbranega materiala: pri različnih proizvajalcih je različna.",
        "Shranite račun in neodprta pakiranja: številne trgovine jih vzamejo nazaj.",
      ],
    },
  },
  "kit-facturacion": {
    nombre: "Poročilo o DDV in prometnem davku",
    tituloCorto: "poročilo o DDV",
    paraQuien: "Da izdate račun ali preverite ceno z jasno ločenim DDV, pripravljeno za vašo evidenco ali računovodjo",
    descripcion: [
      "Poročilo PDF z vašim izračunom: cena brez davka, davek in skupni znesek, s stopnjo, ki se uporablja, in njenim virom.",
      "Poleg tega dobite tabelo z drugimi zneski, uporabno za cenik z davkom in brez njega.",
    ],
    gancho: "Imejte ceno z davkom in brez njega v pisni obliki",
    incluye: [
      { titulo: "Davek posebej", texto: "Znesek brez davka, davek in skupni znesek po veljavni stopnji." },
      { titulo: "Z drugimi zneski", texto: "Da cenik pripravite naenkrat." },
      { titulo: "Za vašega računovodjo", texto: "Z virom stopnje in datumom." },
    ],
    pasos: {
      titulo: "Preden izdate račun",
      items: [
        "Preverite, ali za vaš izdelek ali storitev velja splošna ali znižana stopnja.",
        "Preverite, ali račun posebej navaja osnovo in davek, če se to zahteva.",
        "Shranite to poročilo skupaj z računom v svoji evidenci.",
      ],
    },
    escenarios: DRUGI_ZNESKI,
  },
  "informe-calculo": {
    nombre: "Poročilo o izračunu",
    tituloCorto: "poročilo o izračunu",
    paraQuien: "Da imate ta izračun v pisni obliki, z vašimi številkami, predpostavkami in virom vsake uradne vrednosti",
    descripcion: [
      "Poročilo PDF o izračunu, ki ste ga pravkar naredili, korak za korakom z vašimi podatki: rezultat, predpostavke, na katerih temelji, in vsaka uradna vrednost z virom in datumom preverjanja.",
      "Shranite ga med svoje dokumente ali ga izročite računovodji, delodajalcu ali komur koli, ki ga mora pregledati, ne da bi morali znova pojasnjevati vsako številko.",
    ],
    gancho: "Imejte ta izračun v pisni obliki, z viri",
    incluye: [
      { titulo: "Vaš rezultat", texto: "Točno tak, kot ste ga izračunali, pripravljen za tiskanje." },
      { titulo: "Kako je nastal", texto: "Koraki in predpostavke, da lahko preverite vsako številko." },
      { titulo: "Uradni viri", texto: "Vsaka vrednost z ustanovo, povezavo in datumom preverjanja." },
    ],
    pasos: {
      titulo: "Preden ga uporabite",
      items: [
        "Preverite, ali so podatki na vrhu vaši: rezultat je odvisen od njih.",
        "Če se je uradna vrednost medtem spremenila, izračunajte znova: poročilo uporablja vrednosti, veljavne na dan nakupa.",
      ],
    },
  },
};

export const sl: DiccionarioVenta = {
  familias,
  general: { si: "Da", no: "Ne" },
  tarjeta: {
    cejaInforme: "Poročilo PDF",
    cejaPlanilla: "Predloga Excel",
    pagoUnico: "enkratno plačilo",
    comprarInforme: "Prenesi poročilo",
    comprarPlanilla: "Prenesi predlogo",
    confianza: "Plačilo prek PayPala ali s kartico. Če vam poročilo ne bo koristilo, vam denar vrnemo v 7 dneh.",
    verDetalle: "Kaj vsebuje",
    tambien: "Morda vam bo koristilo tudi:",
    tablasOficiales: "Uradne tabele",
    bajadaInforme: "Poročilo razčleni izračun korak za korakom z vašimi številkami in virom vsake vrednosti, pripravljeno za tiskanje ali shranjevanje kot PDF.",
    bajadaPlanilla: "Predloga vsebuje ta izračun z vašimi številkami in vidnimi formulami, zato lahko spremenite, kar želite.",
    bajadaPlanillaHoja: "Predloga vsebuje ta izračun na listu „{hoja}“ z vašimi številkami in vidnimi formulami, zato lahko spremenite, kar želite.",
    equivale: "Približno {monto} po današnjem tečaju.",
    cobroDolares: "Plačilo je v ameriških dolarjih.",
  },
  aviso: {
    pronto: "Kmalu",
    titulo: "Obvestite me, ko bo na voljo",
    ayuda: "Pisali vam bomo samo enkrat, ko začnemo prodajati.",
    boton: "Obvesti me",
    listo: "Urejeno. Takoj ko začnemo prodajati, vam pošljemo e-sporočilo.",
    error: "Vašega e-naslova nismo mogli shraniti. Preverite, ali je pravilno napisan, in poskusite znova.",
    correo: "Vaš e-naslov",
  },
  planilla: {
    gancho: "Prenesite ta izračun v Excel, z že vpisanimi podatki",
    incluye: [
      { titulo: "Vaši podatki so že vpisani", texto: "Spremenite rumeno celico in vse se znova izračuna." },
      { titulo: "Plača, nagrade in končni obračun", texto: "V eni datoteki, ki jo lahko uporabljate vse leto." },
      { titulo: "Posodobitev ob vsaki uradni spremembi", texto: "Na isti povezavi nova različica, brez novega plačila." },
    ],
  },
  informe: {
    tusDatos: "Vaši podatki",
    resultado: "Rezultat",
    corregir: "Popravi moje podatke",
    actualizar: "Posodobi poročilo",
    imprimir: "Natisni ali shrani kot PDF",
    imprimirAyuda: "V oknu za tiskanje izberite „Shrani kot PDF“ in dobili boste datoteko.",
    sinResultado: "Vnesite svoje podatke v razdelku „Popravi moje podatke“ in poročilo se bo pripravilo.",
    lugar: "Kraj in datum",
    destinatario: "Prejemnik",
    firma: "Podpis",
    nombre: "Ime in priimek",
    documento: "Številka osebnega dokumenta",
    etiquetaEnMinuscula: true,
    comoSeCalcula: "Kako se računa",
    fuentes: "Uradni viri",
    verificado: "preverjeno:",
    emitido: "Datum izdaje:",
    valores: "Uradne vrednosti, stanje:",
    numero: "Poročilo",
    elegir: "Izberite izračun za poročilo:",
    legal:
      "To poročilo je ocena po navedenih pravilih in uradnih vrednostih na navedeni datum. Ne nadomešča strokovnega nasveta ali odločitve pristojnega organa. Če je kateri od vaših podatkov drugačen, se rezultat spremeni: popravite ga in znova natisnite poročilo.",
    legalSinFuentes: "To poročilo je ocena po podatkih, ki ste jih vnesli, na navedeni datum. Ne nadomešča strokovnega nasveta. Če se kateri od podatkov spremeni, se spremeni tudi rezultat: popravite ga in znova natisnite poročilo.",
    errorTitulo: "Tega poročila ni bilo mogoče odpreti",
    error: "Plačila za to povezavo nismo mogli potrditi. Če je bil denar odtegnjen z vašega računa, nam pišite in vse bomo uredili. Če nakup ni uspel, ga lahko ponovite.",
    verificar: "Plačila trenutno ne moremo preveriti. Poskusite znova čez nekaj minut: znova vam ni treba plačati.",
    cupo: "Preveč poskusov zapored. Počakajte nekaj minut in znova odprite povezavo.",
  },
  // {normas} e {incluye} los completa cada país y su caso no se conoce aquí: van tras dos puntos.
  catalogo: {
    tituloProducto: "{nombre} ({pais})",
    disparadorInforme: "Vsakič, ko se spremeni uradna vrednost, ki jo izračun uporablja",
    planillaDescripcion: "Pripravljena predloga Excel: vnesite svoje podatke v rumene celice in izračun teče sam. Formule sledijo tem predpisom: {normas}.",
    planillaIncluye: "Vsebuje: {incluye}. Na vsakem listu so vidni koraki, na listu z uradnimi tabelami pa je vsaka vrednost z virom in datumom našega preverjanja.",
  },
  planillas: {
    migaPlanillas: "Predloge in poročila",
    catalogoTitulo: "Predloge in poročila ({pais})",
    catalogoBajada: "Predloge Excel in poročila PDF z vašimi številkami in uradnimi podatki države. Enkratno plačilo, brez naročnine.",
    seccionPlanillas: "Predloge Excel",
    seccionInformes: "Poročila PDF",
    catalogoVacio: "Predloge za to državo ({pais}) še pripravljamo. Kalkulatorji so zaenkrat brezplačni.",
    verCalculadoras: "Prikaži kalkulatorje",
    comprar: "Kupi za {precio}",
    pronto: "Kmalu",
    incluye: "Kaj vsebuje",
    incluyeInforme: [
      "Poročilo z vašimi številkami na strani, ki jo lahko natisnete ali shranite kot PDF.",
      "Povezava brez roka veljavnosti: podatke lahko popravite, kadar želite, in znova natisnete poročilo.",
      "Če vam poročilo ne bo koristilo, vam denar vrnemo v 7 dneh.",
    ],
    incluyePlanilla: [
      "Datoteka .xlsx, ki se odpre v Excelu in v Google Preglednicah.",
      "Posodobitev: {disparador}, predlogo posodobimo, novo različico pa prenesete na isti povezavi.",
      "Če vam predloga ne bo koristila, vam denar vrnemo v 7 dneh.",
    ],
    pagoUnico: "Enkratno plačilo prek PayPala. Plačate lahko z računom PayPal ali s kartico.",
    comprarPlanilla: "Nakup: {titulo}",
    comprarBajadaInforme: "Takoj ko je plačilo potrjeno, na ta naslov pošljemo povezavo do vašega poročila.",
    comprarBajadaPlanilla: "Takoj ko je plačilo potrjeno, na ta naslov pošljemo predlogo.",
    etiquetaEmail: "Vaš e-naslov",
    seguirPago: "Nadaljuj na plačilo",
    privacidad: "Vaš e-naslov uporabimo samo za pošiljanje kupljenega in njegovih posodobitev.",
    datosTitulo: "S številkami iz vašega izračuna",
    datosUsar: "Uporabi te številke pri mojem nakupu. Hranimo jih samo za pripravo kupljenega.",
    errores: {
      email: "Preverite e-naslov: zdi se, da v njem nekaj manjka.",
      error: "Plačila ni bilo mogoče začeti. Ničesar vam nismo zaračunali. Poskusite znova čez nekaj minut.",
      cancelado: "Plačilo ste preklicali. Ničesar vam nismo zaračunali.",
      fallido: "PayPal plačila ni potrdil. Lahko poskusite z drugo kartico.",
      pronto: "Prodaja se še ni začela.",
    },
    graciasTitulo: "Hvala za nakup",
    graciasListoInforme: "Plačilo je potrjeno. Svoj nakup že lahko odprete: {titulo}. Povezavo smo vam poslali tudi po e-pošti in ne poteče.",
    graciasListoPlanilla: "Plačilo je potrjeno. Svoj nakup že lahko prenesete: {titulo}. Poslali smo vam ga tudi po e-pošti, s povezavo, ki ne poteče.",
    graciasPendiente: "Čakamo na potrditev PayPala. Takoj ko prispe, vam kupljeno pošljemo po e-pošti.",
    muestraIntro: "To je list „{hoja}“ s primerom podatkov, s katerimi se odpre. Izračun je današnji, z veljavnimi uradnimi vrednostmi.",
    muestraLeyenda: ["vnesete vi", "izračuna predloga"],
    comprobar: "Preverite pred plačilom: brezplačni kalkulator da enake številke. Preizkusite enak primer in primerjajte.",
    comprobarEnlace: "Pojdi na brezplačni kalkulator",
    faqTitulo: "Pogosta vprašanja",
    faq: {
      sheets: {
        pregunta: "Ali deluje v Google Preglednicah in v Excelu?",
        respuesta: "Da. To je datoteka .xlsx: odpre se v Excelu in v Google Preglednicah (naložite jo na svoj Google Drive in jo odprite tam). Izračun uporablja navadne formule, brez makrov.",
      },
      recibo: {
        pregunta: "Kako jo dobim?",
        respuesta: "Takoj ko je plačilo potrjeno, vam jo pošljemo po e-pošti s povezavo za prenos, ki ne poteče. Prenesete jo lahko tudi s strani, ki se odpre po plačilu.",
      },
      dolares: {
        pregunta: "Ali se plača v ameriških dolarjih?",
        respuesta: "Da. Cena je v ameriških dolarjih (USD), plačate pa prek PayPala, z računom ali s kartico.",
        conReferencia: "Zgoraj prikazujemo približen znesek v vaši valuti po današnjem tečaju, samo okvirno: končni znesek je odvisen od tečaja vaše banke ali kartice.",
        sinReferencia: "Če je vaša kartica v drugi valuti, pretvorbo opravi vaša banka.",
      },
      devolucion: { pregunta: "Ali lahko dobim denar nazaj?", respuesta: "Da. Če vam predloga ne bo koristila, v 7 dneh odgovorite na e-sporočilo o nakupu in vrnili vam bomo denar." },
      actualiza: { pregunta: "Ali se posodobi, ko se uradne vrednosti spremenijo?", respuesta: "Da. {disparador}, predlogo posodobimo, novo različico pa prenesete na isti povezavi." },
    },
    descargar: "Prenesi predlogo (.xlsx)",
    abrirInforme: "Odpri moje poročilo",
    fuentes: "Uradni viri, ki jih uporablja",
    calculadoras: "Deluje s temi kalkulatorji",
    muestra: "Kako je videti",
  },
  correo: {
    asuntoInforme: "Vaš nakup pri CalcularYa: {titulo}",
    asuntoPlanilla: "{titulo}: prenos in posodobitve",
    mismosNumeros: "Številke so enake kot v {enlace}, z uradnimi podatki.",
    enlaceCalculadora: "brezplačnem kalkulatorju CalcularYa",
    comprobante: "To je potrdilo o vašem nakupu pri {marca}.",
    informe: {
      encabezado: "Poročilo je pripravljeno",
      intro: "Hvala za nakup ({titulo}). Odprite ga tukaj:",
      boton: "Odpri moje poročilo",
      abre: "Poročilo se odpre v brskalniku. Od tam ga lahko natisnete ali shranite kot PDF.",
      guarda: "Shranite to sporočilo",
      vence: "Povezava je vaša in ne poteče. Poročilo uporablja uradne vrednosti, veljavne na dan nakupa, podatke pa lahko popravite, kadar želite, in znova natisnete poročilo.",
      devolucion: "Če vam poročilo ne bo koristilo, v 7 dneh odgovorite na to sporočilo in vrnili vam bomo denar.",
      ayuda: "Imate težavo? Odgovorite na to sporočilo ali nam pišite na {contacto}.",
    },
    planilla: {
      encabezado: "Predloga je pripravljena za prenos",
      intro: "Hvala za nakup ({titulo}). Prenesite jo tukaj:",
      boton: "Prenesi predlogo (.xlsx)",
      abre: "Odpre se v Excelu in v Google Preglednicah.",
      guarda: "Shranite to sporočilo",
      vence: "Povezava je vaša in ne poteče. {disparador}, predlogo posodobimo, na isti povezavi pa dobite najnovejšo različico. Znova vam ni treba plačati.",
      devolucion: "Če vam predloga ne bo koristila, v 7 dneh odgovorite na to sporočilo in vrnili vam bomo denar.",
      ayuda: "Imate težavo? Odgovorite na to sporočilo ali nam pišite na {contacto}.",
    },
  },
};
