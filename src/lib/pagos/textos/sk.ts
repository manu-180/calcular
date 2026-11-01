import type { ClaveFamilia } from "../ofertas-intl";
import type { DiccionarioVenta, TextosFamilia } from "./tipos";

// Eslovaco (ADR 0002, D25): un solo registro, el de Finančná správa y Tatra banka. Vykanie con
// "vy" en minúscula y el imperativo cortés de segunda del plural ("stiahnite", "skontrolujte"),
// nunca tykanie; los botones en infinitivo ("Získať prehľad"). Las cartas del informe van en primera
// persona formal. Los textos de las familias sirven a cualquier país: nada de organismos de un solo
// país. El país llega en el marcador {pais} sin declinar, así que va en nominativo entre paréntesis.
// Comillas eslovacas „ “.
const PRE_VASE_ZAZNAMY = { titulo: "Pre vaše záznamy", texto: "S dátumom hodnôt, ktoré výpočet použil." };
const INE_SUMY = { titulo: "S inými sumami", explica: "Rovnaký výpočet s trochu nižšími a trochu vyššími sumami." };
const INE_SADZBY = { titulo: "S inými sadzbami", explica: "Rovnaké čísla s trochu nižšími a trochu vyššími úrokovými sadzbami." };

const familias: Record<ClaveFamilia, TextosFamilia> = {
  liquidacion: {
    nombre: "Prehľad vyúčtovania pri skončení pracovného pomeru",
    tituloCorto: "prehľad vyúčtovania pri odchode",
    paraQuien: "Aby ste si mohli skontrolovať vyúčtovanie pri odchode zo zamestnania ešte pred podpisom alebo si ho vyžiadať, s vašimi číslami a podľa predpisov vašej krajiny",
    descripcion: [
      "PDF prehľad s vyúčtovaním rozpísaným po jednotlivých položkách: koľko vám pri každej patrí, ako sa vypočítala a aké oficiálne hodnoty sa použili, každá so zdrojom.",
      "Súčasťou je zoznam toho, čo si overiť pred podpisom, a list s už vyplnenou sumou, ktorým si platbu písomne vyžiadate.",
    ],
    gancho: "Majte vyúčtovanie pri odchode písomne a skontrolujte ho ešte pred podpisom",
    incluye: [
      { titulo: "Každá položka s výpočtom", texto: "Aby ste ju mohli riadok po riadku porovnať s tým, čo ponúka zamestnávateľ." },
      { titulo: "Oficiálne zdroje priamo v prehľade", texto: "Každá hodnota s inštitúciou, ktorá ju zverejňuje, a s dátumom našej kontroly." },
      { titulo: "Hotový list so žiadosťou", texto: "Vyplnený vašou sumou, aby ste si platbu mohli vyžiadať písomne." },
    ],
    pasos: {
      titulo: "Pred podpisom",
      items: [
        "Porovnajte každú položku v tomto prehľade s dokumentom, ktorý máte podpísať. Ak niečo chýba, opýtajte sa prečo, ešte predtým, ako podpíšete.",
        "Overte, že mzda a dátumy, s ktorými počíta zamestnávateľ, zodpovedajú tým, ktoré ste zadali tu. Iný dátum nástupu zmení takmer všetky sumy.",
        "Vyžiadajte si kópiu všetkého, čo podpisujete, a uschovajte si výplatné pásky za posledné mesiace.",
        "Ak je rozdiel veľký alebo vás prepustili, ukážte tento prehľad inšpektorátu práce vo vašej krajine alebo advokátovi so zameraním na pracovné právo. Ušetríte im prvú hodinu počítania.",
      ],
    },
    nota: {
      titulo: "Žiadosť o vyplatenie",
      uso: "Vyplňte, podpíšte a odovzdajte spolu s kópiou pre seba. Požiadajte, aby vám na kópii potvrdili prevzatie podpisom a dátumom.",
      pedido: "Žiadam o vyplatenie súm, ktoré mi patria v súvislosti so skončením pracovného pomeru a ktoré podľa výpočtu v priloženom prehľade predstavujú",
      cierre: "Priložený výpočet uvádza každú položku vypočítanú podľa oficiálnych hodnôt platných k uvedenému dátumu. Prosím o oznámenie dátumu výplaty.",
    },
  },
  "pagos-laborales": {
    nombre: "Prehľad pracovných platieb",
    tituloCorto: "prehľad pracovných platieb",
    paraQuien: "Aby ste mali istotu, že vám správne vypočítali prémiu, náhradu za dovolenku, nadčasy alebo podiel na zisku, a ak nie, mohli si rozdiel vyžiadať",
    descripcion: [
      "PDF prehľad s vaším výpočtom krok za krokom a s vašimi číslami: aký základ sa použil, ako sa počíta a aké oficiálne hodnoty platia, každá so zdrojom.",
      "Hodí sa pre ktorúkoľvek platbu zo zoznamu. Ukáže vám, ako ju overiť na výplatnej páske, a obsahuje list, ktorým si rozdiel písomne vyžiadate.",
    ],
    gancho: "Majte tento výpočet písomne a porovnajte ho s výplatnou páskou",
    incluye: [
      { titulo: "Výpočet krok za krokom", texto: "S vašimi údajmi a s každou oficiálnou hodnotou, ktorú používa." },
      { titulo: "Čo hľadať na výplatnej páske", texto: "Aby ste za minútu zistili, či vám zaplatili správne." },
      { titulo: "List so žiadosťou o doplatok", texto: "Vyplnený vašou sumou, pripravený na odovzdanie." },
    ],
    pasos: {
      titulo: "Ako platbu overiť",
      items: [
        "Nájdite túto platbu na výplatnej páske a porovnajte ju so sumou v tomto prehľade.",
        "Ak nesedí, najprv si overte, že údaje, ktoré ste zadali, zodpovedajú tým, s ktorými počíta zamestnávateľ.",
        "Ak nesedí ani potom, použite list nižšie a vyžiadajte si rozdiel písomne. Kópiu si nechajte.",
      ],
    },
    nota: {
      titulo: "Žiadosť o doplatok",
      uso: "Vyplňte, podpíšte a odovzdajte spolu s kópiou pre seba.",
      pedido: "Žiadam o vyplatenie sumy uvedenej v priloženom prehľade, ktorá podľa výpočtu s platnými oficiálnymi hodnotami predstavuje",
      cierre: "Ak bola vyplatená suma iná, prosím o písomné vysvetlenie, ako bola vypočítaná.",
    },
    escenarios: { titulo: "Keď sa zmení počet hodín", explica: "Rovnaký výpočet s iným počtom hodín, aby ste mohli kontrolovať každý mesiac bez nového počítania." },
  },
  impuesto: {
    nombre: "Prehľad dane z príjmov",
    tituloCorto: "prehľad dane z príjmov",
    paraQuien: "Aby ste vedeli, koľko dane vám zrážajú, mohli skontrolovať výplatnú pásku a videli, čo sa stane, keď sa príjem zmení",
    descripcion: [
      "PDF prehľad s vašou daňou vypočítanou krok za krokom, s oficiálnou tabuľkou, ktorá sa uplatňuje, a so zdrojom každej hodnoty.",
      "Súčasťou je tabuľka dane pri iných príjmoch, aby ste vopred vedeli, koľko vám zostane po zvýšení mzdy alebo pri zmene práce.",
    ],
    gancho: "Majte vysvetlenie svojej dane písomne a pozrite sa, čo sa stane, keď sa príjem zmení",
    incluye: [
      { titulo: "Výpočet podľa oficiálnej tabuľky", texto: "Krok za krokom, so zdrojom každej hodnoty." },
      { titulo: "Vaša daň pri iných príjmoch", texto: "Aby ste o zvýšení mzdy rokovali s vedomím, koľko vám zostane." },
      { titulo: "Čo skontrolovať na výplatnej páske", texto: "Aby ste so zamestnávateľom alebo účtovníkom hovorili rečou čísel." },
    ],
    pasos: {
      titulo: "Ako overiť zrazenú daň",
      items: [
        "Nájdite zrazenú daň na výplatnej páske a porovnajte ju so sumou v tomto prehľade.",
        "Ak nesedí, opýtajte sa zamestnávateľa, s akým príjmom a akými úľavami počíta.",
        "Uschovajte si tento prehľad na ročné zúčtovanie alebo daňové priznanie, ak sa vo vašej krajine podáva.",
      ],
    },
    escenarios: { titulo: "Keď sa príjem zmení", explica: "Rovnaký výpočet s trochu nižším a trochu vyšším príjmom, s rovnakými oficiálnymi hodnotami." },
  },
  contratacion: {
    nombre: "Rozpočet nákladov na zamestnanca",
    tituloCorto: "rozpočet nákladov na zamestnanca",
    paraQuien: "Aby ste vedeli, koľko vás nový zamestnanec skutočne stojí aj so všetkými odvodmi, ešte predtým, ako sa dohodnete na mzde",
    descripcion: [
      "PDF rozpočet s celkovými nákladmi na zamestnanca rozpísanými po častiach: mzda, odvody zamestnanca a zamestnávateľa a rezervy, každá hodnota s oficiálnym zdrojom.",
      "Obsahuje tabuľku nákladov pri iných mzdách, aby ste ponuku dávali s vedomím, koľko vás každé zvýšenie mzdy naozaj stojí, a je pripravený na odovzdanie spoločníkovi alebo účtovníkovi.",
    ],
    gancho: "Urobte z týchto nákladov rozpočet a rozhodnite sa o prijatí zamestnanca",
    incluye: [
      { titulo: "Každý odvod osobitne", texto: "S pravidlom a oficiálnym zdrojom pri každom." },
      { titulo: "Náklady pri iných mzdách", texto: "Aby ste rokovali s vedomím, koľko pridá každý krok nahor." },
      { titulo: "Pripravené na odovzdanie", texto: "Spoločníkovi, účtovníkovi alebo do vašich záznamov." },
    ],
    pasos: {
      titulo: "Skôr ako niekoho prijmete",
      items: [
        "Overte si u účtovníka, či vo vašom odbore neplatí kolektívna zmluva alebo minimálna mzda vyššia ako všeobecná.",
        "Rezervy z tohto rozpočtu si odkladajte každý mesiac: sú to platby, ktoré sa nazbierajú na konci roka alebo pri skončení zmluvy.",
        "Zamestnanca prihláste od prvého dňa: náklady v tomto rozpočte už počítajú s povinnými odvodmi.",
      ],
    },
    escenarios: { titulo: "Náklady pri iných mzdách", explica: "Rovnaký výpočet s nižšími a vyššími mzdami, s rovnakými oficiálnymi hodnotami." },
  },
  "ajuste-inflacion": {
    nombre: "List o valorizácii podľa inflácie",
    tituloCorto: "list o valorizácii",
    paraQuien: "Aby ste mohli požiadať o valorizáciu alebo ju oznámiť pri nájomnom, splátke, honorári alebo mzde podľa oficiálneho indexu",
    descripcion: [
      "List pripravený na odovzdanie, vyplnený vašou novou sumou a s doložením výpočtu: oficiálny index ku každému dátumu, inštitúcia, ktorá ho zverejňuje, a odkaz na zdroj.",
      "Keď je doloženie priamo v liste, druhá strana si číslo overí za minútu a hovorí sa o indexe, nie o počítaní.",
    ],
    gancho: "Urobte z tejto valorizácie hotový list s oficiálnym indexom ako doložením",
    incluye: [
      { titulo: "Vyplnený list", texto: "S vašou novou sumou, na vytlačenie alebo odoslanie." },
      { titulo: "Oficiálny index ako doloženie", texto: "S inštitúciou, dátumom a odkazom na zdroj." },
      { titulo: "Viditeľný výpočet", texto: "Aby si ho druhá strana mohla overiť sama." },
    ],
    nota: {
      titulo: "Oznámenie o valorizácii",
      uso: "Vyplňte údajmi zo zmluvy a odovzdajte spolu s výpočtom.",
      pedido: "Oznamujem úpravu dohodnutej sumy podľa vývoja oficiálneho cenového indexu, ako uvádza priložený výpočet. Upravená suma predstavuje",
      cierre: "Výpočet používa index, ktorý zverejňuje oficiálna inštitúcia uvedená v prílohe, a možno si ho overiť v uvedenom zdroji.",
    },
  },
  regimen: {
    nombre: "Prehľad zjednodušeného daňového režimu",
    tituloCorto: "prehľad zjednodušeného režimu",
    paraQuien: "Aby ste vedeli, koľko v zjednodušenom režime platíte a čo sa stane, keď príjem vzrastie alebo klesne",
    descripcion: [
      "PDF prehľad s vaším preddavkom alebo daňou v zjednodušenom režime, vypočítaný krok za krokom podľa oficiálnej tabuľky a so zdrojom každej hodnoty.",
      "Súčasťou je tabuľka toho, koľko by ste platili pri iných príjmoch, aby ste vopred videli prechod do iného pásma.",
    ],
    gancho: "Majte svoj výpočet písomne a pozrite sa, čo sa stane, keď sa príjem zmení",
    incluye: [
      { titulo: "Váš výpočet podľa oficiálnej tabuľky", texto: "Krok za krokom, so zdrojom každej hodnoty." },
      { titulo: "Koľko by ste platili pri iných príjmoch", texto: "Aby ste prechod do iného pásma videli vopred." },
      PRE_VASE_ZAZNAMY,
    ],
    escenarios: { titulo: "Keď sa príjem zmení", explica: "Rovnaký výpočet s nižším a vyšším príjmom, s rovnakými oficiálnymi hodnotami." },
  },
  deposito: {
    nombre: "Porovnanie termínovaných vkladov",
    tituloCorto: "porovnanie vkladov",
    paraQuien: "Aby ste svoj vklad porovnali na rôzne obdobia, skôr ako sa rozhodnete, kam a na ako dlho peniaze uložiť",
    descripcion: ["PDF prehľad s výnosom vášho vkladu a s tabuľkou rovnakého vkladu na iné obdobia, všetko rovnakým výpočtom ako v kalkulačke."],
    gancho: "Porovnajte vklad na niekoľko období v jednom prehľade",
    incluye: [
      { titulo: "Váš vklad na niekoľko období", texto: "V jednej tabuľke, aby ste vybrali na prvý pohľad." },
      { titulo: "Výpočet krok za krokom", texto: "So zdrojom každej hodnoty, ktorú používa." },
      PRE_VASE_ZAZNAMY,
    ],
    escenarios: { titulo: "Váš vklad na iné obdobia", explica: "Rovnaký výpočet s inými obdobiami uloženia." },
  },
  alimentos: {
    nombre: "Prehľad výživného",
    tituloCorto: "prehľad výživného",
    paraQuien: "Aby ste na mediáciu alebo na pojednávanie o výživnom prišli s podloženou sumou",
    descripcion: ["PDF prehľad s orientačnou výškou výživného, krok za krokom, s oficiálnymi hodnotami a ich zdrojom a s tabuľkou sumy pri iných príjmoch."],
    gancho: "Príďte na mediáciu s týmto výpočtom v písomnej podobe",
    incluye: [
      { titulo: "Podložený výpočet", texto: "Krok za krokom, so zdrojom každej hodnoty." },
      { titulo: "Suma pri iných príjmoch", texto: "Aby ste rokovali a videli rôzne možnosti." },
      { titulo: "Pre vášho advokáta alebo mediátora", texto: "Ušetríte im prvú hodinu počítania." },
    ],
    escenarios: { titulo: "Pri iných príjmoch", explica: "Rovnaký výpočet s nižšími a vyššími príjmami." },
  },
  jubilacion: {
    nombre: "Odhad dôchodku",
    tituloCorto: "odhad dôchodku",
    paraQuien: "Aby ste dôchodok plánovali s písomným odhadom a videli, čo sa zmení, keď budete platiť vyššie poistné",
    descripcion: ["PDF prehľad s orientačnou výškou dôchodku krok za krokom, s oficiálnymi hodnotami a ich zdrojom a s tabuľkou odhadu pri iných mzdách."],
    gancho: "Majte odhad svojho dôchodku písomne",
    incluye: [
      { titulo: "Odhad krok za krokom", texto: "So zdrojom každej hodnoty." },
      { titulo: "Pri iných mzdách", texto: "Aby ste videli, čo sa zmení, keď budete platiť vyššie poistné." },
      PRE_VASE_ZAZNAMY,
    ],
    escenarios: { titulo: "Pri iných mzdách", explica: "Rovnaký výpočet s nižšími a vyššími mzdami." },
  },
  "plan-prestamo": {
    nombre: "Plán úveru",
    tituloCorto: "plán úveru",
    paraQuien: "Aby ste vedeli, koľko vás úver skutočne stojí, a porovnali ponuky ešte pred podpisom",
    descripcion: [
      "PDF prehľad s celým vaším úverom: splátka, celková suma, ktorú zaplatíte, a koľko z nej tvoria úroky.",
      "Ak ste počítali splátku, prehľad obsahuje každú splátku osobitne. Rovnaké čísla sú vypočítané aj s inými sadzbami, aby ste ponuky bánk porovnávali na skutočných číslach.",
    ],
    gancho: "Porovnajte ponuky úveru na svojich číslach ešte pred podpisom",
    incluye: [
      { titulo: "Váš úver s inými sadzbami", texto: "Aby ste videli, čo s ním urobí jeden percentuálny bod nahor alebo nadol." },
      { titulo: "Jasná celková cena", texto: "Koľko zaplatíte na úrokoch, bez drobného písma." },
      { titulo: "Zoznam pred podpisom", texto: "Otázky, ktoré sa oplatí položiť veriteľovi." },
    ],
    pasos: {
      titulo: "Skôr ako podpíšete úverovú zmluvu",
      items: [
        "Pýtajte sa na RPMN, teda ročnú percentuálnu mieru nákladov so všetkými poplatkami, nielen na úrokovú sadzbu. Porovnávať sa oplatí práve ju.",
        "Opýtajte sa na poplatok za poskytnutie, povinné poistenie a poplatok za predčasné splatenie.",
        "Porovnajte aspoň tri ponuky podľa tabuľky s inými sadzbami v tomto prehľade.",
        "Vyberte si splátku, ktorú zvládnete platiť aj v horšom mesiaci. Orientačne menej ako tretinu príjmu.",
      ],
    },
    escenarios: INE_SADZBY,
  },
  "plan-hipoteca": {
    nombre: "Plán hypotéky",
    tituloCorto: "plán hypotéky",
    paraQuien: "Aby ste sa o hypotéke rozhodli so všetkými číslami pred sebou: splátka, úroky a čo sa stane, keď sa sadzba zmení",
    descripcion: [
      "PDF prehľad s celou vašou hypotékou: splátka, celková suma, ktorú zaplatíte, a koľko z nej za tie roky pôjde na úroky.",
      "Obsahuje celé tabuľky vášho výpočtu (bezplatná stránka ukazuje len prvé riadky) a rovnaké čísla s inými sadzbami. Ak ste porovnávali nájom a kúpu, máte porovnanie písomne a môžete sa rozhodnúť s celou rodinou.",
    ],
    gancho: "Príďte do banky s úplnou tabuľkou hypotéky a s inými sadzbami",
    incluye: [
      { titulo: "Úplná tabuľka", texto: "Všetky riadky, nielen tie prvé." },
      { titulo: "Vaša hypotéka s inými sadzbami", texto: "Aby ste videli, čo so splátkou urobí jeden percentuálny bod nahor alebo nadol." },
      { titulo: "Otázky pre banku", texto: "Čo si overiť pred podpisom." },
    ],
    pasos: {
      titulo: "Skôr ako podpíšete hypotekárnu zmluvu",
      items: [
        "Vyžiadajte si ponuku písomne so sadzbou, dobou splácania a celkovými nákladmi vrátane poistenia a poplatkov.",
        "Opýtajte sa, na ako dlho je sadzba zafixovaná a čo sa stane so splátkou, keď po skončení fixácie vzrastie.",
        "Zistite, koľko stojí predčasné splatenie a či môžete mimoriadne splácať bez sankcie.",
        "K splátke pripočítajte náklady na bývanie (daň z nehnuteľnosti, poistenie, údržbu), skôr ako sa rozhodnete, koľko si môžete dovoliť.",
      ],
    },
    escenarios: INE_SADZBY,
  },
  "plan-inversion": {
    nombre: "Plán sporenia a investícií",
    tituloCorto: "plán sporenia",
    paraQuien: "Aby ste videli, ako vaše úspory rastú v čase a čo sa zmení, keď budete ukladať viac alebo dostanete inú sadzbu",
    descripcion: [
      "PDF prehľad s odhadom vašich úspor: koľko vložíte, koľko získate na úrokoch a koľko budete mať na konci.",
      "Obsahuje celé tabuľky vášho výpočtu a rovnaké čísla s inými sadzbami, aby ste vyberali, kde sporiť, na skutočných číslach.",
    ],
    gancho: "Majte plán sporenia písomne, rok po roku",
    incluye: [
      { titulo: "Úplný odhad", texto: "Všetky riadky tabuľky, nielen tie prvé." },
      { titulo: "S inými sadzbami", texto: "Aby ste možnosti porovnali, skôr ako si vyberiete." },
      { titulo: "Plán, ktorý sa dá dodržať", texto: "Kroky, vďaka ktorým sa z predsavzatia stanú úspory." },
    ],
    pasos: {
      titulo: "Aby plán fungoval",
      items: [
        "Nastavte si trvalý príkaz na deň výplaty: čo nevidíte, to neminiete.",
        "Porovnajte sadzbu s infláciou: keď je sadzba nižšia, vaše peniaze strácajú hodnotu, aj keď číslo rastie.",
        "Raz za rok si tento prehľad znova otvorte a aktualizujte svoje čísla.",
      ],
    },
    escenarios: INE_SADZBY,
  },
  "plan-deudas": {
    nombre: "Plán splatenia kreditnej karty",
    tituloCorto: "plán splatenia karty",
    paraQuien: "Aby ste vedeli, kedy kartu splatíte, koľko vás to bude stáť na úrokoch a ako to zvládnuť skôr",
    descripcion: [
      "PDF prehľad s vaším dlhom mesiac po mesiaci: koľko platíte, koľko ide na úroky a ako rýchlo zostatok klesá.",
      "Obsahuje úplnú tabuľku až do poslednej splátky a rovnaké čísla s inými splátkami, aby ste videli, koľko ušetríte, keď budete každý mesiac platiť o trochu viac.",
    ],
    gancho: "Pozrite sa mesiac po mesiaci, kedy kartu splatíte",
    incluye: [
      { titulo: "Mesiac po mesiaci až do poslednej splátky", texto: "S úrokmi, ktoré každý mesiac zaplatíte." },
      { titulo: "S inými splátkami", texto: "Aby ste videli, o koľko skôr skončíte, keď budete platiť o trochu viac." },
      { titulo: "Cesta z dlhu", texto: "Kroky, aby ste sa do dlhov znova nedostali." },
    ],
    pasos: {
      titulo: "Ako sa dostať z dlhu",
      items: [
        "Kartu počas splácania nepoužívajte: každý nový nákup tabuľku predĺži.",
        "Plaťte vždy viac ako minimálnu splátku. Pomôže aj málo a tabuľka s inými splátkami ukáže koľko.",
        "Ak máte viac dlhov, splácajte najprv ten s najvyššou sadzbou a pri ostatných plaťte minimum.",
        "Opýtajte sa svojej banky na konsolidáciu s nižšou sadzbou a porovnajte ju s týmto prehľadom.",
      ],
    },
    escenarios: { titulo: "S inými mesačnými splátkami", explica: "Rovnaký dlh, keď budete každý mesiac platiť o trochu menej a o trochu viac." },
  },
  "plan-presupuesto": {
    nombre: "Plán rozpočtu",
    tituloCorto: "plán rozpočtu",
    paraQuien: "Aby ste si mesiac usporiadali podľa jasného plánu: koľko ide na potreby, priania a úspory",
    descripcion: [
      "PDF prehľad, ktorý z vášho výpočtu urobí plán: koľko odložiť na každú položku, vo vašej mene a s vašimi číslami.",
      "Obsahuje rovnaký plán s inými sumami, aby ste vopred vedeli, čo sa zmení v mesiaci s viac alebo menej peniazmi, a kroky, ako ho dodržať.",
    ],
    gancho: "Urobte z tohto výpočtu plán svojho mesiaca",
    incluye: [
      { titulo: "Váš plán s vašimi číslami", texto: "Koľko kam ide, pripravené na použitie." },
      { titulo: "S inými sumami", texto: "Aby ste plán upravili, keď sa mesiac zmení." },
      { titulo: "Kroky, ako plán dodržať", texto: "Čo pomôže, aby rozpočet vydržal dlhšie ako prvý mesiac." },
    ],
    pasos: {
      titulo: "Aby rozpočet fungoval",
      items: [
        "Úspory si odložte v deň výplaty, ešte pred výdavkami. Čo zvýši, môžete minúť.",
        "Počas mesiaca si zapisujte výdavky, pokojne do telefónu, a porovnajte ich s týmto plánom.",
        "Najprv si vytvorte finančnú rezervu, aby neočakávaný výdavok neskončil na kreditnej karte.",
      ],
    },
    escenarios: INE_SUMY,
  },
  "plan-negocio": {
    nombre: "Prehľad s číslami podnikania",
    tituloCorto: "prehľad pre podnikanie",
    paraQuien: "Aby ste o cenách, marži alebo investícii rozhodovali podľa jasných čísel, pripravených pre spoločníka",
    descripcion: [
      "PDF prehľad s vaším výpočtom vysvetleným krok za krokom: aké údaje sa použili, ako sa počíta a aký vychádza výsledok.",
      "Súčasťou je tabuľka s rovnakým výpočtom pre iné sumy, aby ste videli, ako sa výsledok zmení, keď vzrastú náklady alebo znížite cenu.",
    ],
    gancho: "Urobte z týchto čísel prehľad na rozhodnutie alebo pre spoločníka",
    incluye: [
      { titulo: "Vysvetlený výpočet", texto: "Aby ste mu rozumeli a obhájili ho pred spoločníkom alebo bankou." },
      { titulo: "S inými sumami", texto: "Aby ste vopred videli dosah zmeny ceny alebo nákladov." },
      { titulo: "Otázky pred rozhodnutím", texto: "Čo si overiť, skôr ako zmeníte cenu." },
    ],
    pasos: {
      titulo: "Pred rozhodnutím",
      items: [
        "Overte si, že v nákladoch máte všetko: dopravu, poplatky, dane aj svoj vlastný čas.",
        "Skôr ako cenu zmeníte, porovnajte ju s dvoma alebo tromi konkurentmi.",
        "Pozrite sa na najhorší variant v tabuľke: keď ho podnikanie ustojí, rozhodnutie je bezpečnejšie.",
      ],
    },
    escenarios: INE_SUMY,
  },
  "kit-freelance": {
    nombre: "Balík pre hodinovú sadzbu na voľnej nohe",
    tituloCorto: "balík pre hodinovú sadzbu",
    paraQuien: "Aby ste si za prácu pýtali toľko, koľko má cenu, a svoju sadzbu uvádzali s istotou",
    descripcion: [
      "PDF prehľad s vysvetlením vašej hodinovej sadzby: príjem, ku ktorému smerujete, hodiny, ktoré sa dajú skutočne vyfakturovať, a náklady, ktoré sadzba pokrýva.",
      "Obsahuje sadzbu pre iné cieľové príjmy a hotový list pre klienta s vašou hodinovou sadzbou.",
    ],
    gancho: "Uvádzajte svoju sadzbu s číslami, nie s ospravedlneniami",
    incluye: [
      { titulo: "Vysvetlenie vašej sadzby", texto: "Pre chvíľu, keď sa niekto opýta, prečo práve toľko." },
      { titulo: "Pre iné cieľové príjmy", texto: "Sadzba, ktorú potrebujete pre každý z nich." },
      { titulo: "Hotový list so sadzbou", texto: "Vyplnený vaším číslom, na odoslanie klientom." },
    ],
    pasos: {
      titulo: "Aby ste si účtovali toľko, koľko máte",
      items: [
        "Počítajte len hodiny, ktoré môžete vyfakturovať: stretnutia, ponuky a upomienky o platbu sú tiež práca.",
        "Keď sa dá, ponúkajte cenu za projekt: klient kupuje výsledok, nie hodiny.",
        "Sadzbu prehodnoťte raz za rok alebo skôr, keď vám vzrastú náklady.",
      ],
    },
    nota: {
      titulo: "List so sadzbou",
      uso: "Vyplňte údajmi klienta a pošlite spolu so svojou ponukou.",
      pedido: "Na základe nášho rozhovoru vám zasielam svoju sadzbu za dohodnuté odborné služby. Moja hodinová sadzba predstavuje",
      cierre: "Sadzba pokrýva pracovný čas aj náklady na prevádzku mojej činnosti. Na požiadanie pripravím aj ponuku s cenou za celý projekt.",
    },
    escenarios: { titulo: "Pre iné cieľové príjmy", explica: "Rovnaký výpočet s nižšími a vyššími cieľovými príjmami." },
  },
  "plan-sueldo": {
    nombre: "Prehľad mzdy",
    tituloCorto: "prehľad mzdy",
    paraQuien: "Aby ste o mzde, ponuke alebo zvýšení rokovali s vedomím, koľko to robí za hodinu, za mesiac a za rok",
    descripcion: [
      "PDF prehľad s vysvetlením výpočtu vašej mzdy, s vašimi číslami a s každou hodnotou, ktorú používa.",
      "Súčasťou je tabuľka s inými sumami, aby ste mohli porovnávať ponuky alebo žiadať o zvýšenie s jasnými číslami.",
    ],
    gancho: "Rokujte o mzde s číslami v ruke",
    incluye: [
      { titulo: "Váš úplný výpočet", texto: "S každou hodnotou, ktorú ste zadali." },
      { titulo: "S inými sumami", texto: "Aby ste porovnali dve ponuky za minútu." },
      { titulo: "Tipy na vyjednávanie", texto: "Čo povedať a o čo požiadať okrem samotného čísla." },
    ],
    pasos: {
      titulo: "Ako sa dohodnúť",
      items: [
        "Keď porovnávate ponuky, hovorte o sumách za rok alebo za hodinu: mesačné čísla rozdiel skryjú.",
        "Žiadajte aj o to, čo nie je mzda: dovolenku navyše, prácu z domu, vzdelávanie alebo prémie.",
        "Príďte s konkrétnym číslom a jeho zdôvodnením: vaše skúsenosti, trh alebo to, čo sa zmenilo vo vašej práci.",
      ],
    },
    escenarios: INE_SUMY,
  },
  "kit-calculos": {
    nombre: "Výpočet s vysvetlením krok za krokom",
    tituloCorto: "výpočet s vysvetlením",
    paraQuien: "Aby ste mali výpočet vyriešený a vysvetlený, pripravený na vytlačenie, na štúdium alebo na odovzdanie",
    descripcion: [
      "PDF prehľad s vaším výpočtom, postupom riešenia a výsledkom, s vašimi číslami.",
      "Použite ho na štúdium, ako záznam výpočtu alebo aby ste ho mohli niekomu ukázať bez ďalšieho vysvetľovania.",
    ],
    gancho: "Vezmite si výpočet so sebou, s vysvetlením krok za krokom",
    incluye: [
      { titulo: "Vyriešený výpočet", texto: "S vašimi údajmi a výsledkom." },
      { titulo: "Ako sa počíta", texto: "Aby ste videli, odkiaľ sa berie každé číslo." },
      { titulo: "Pripravené na tlač", texto: "Alebo na uloženie ako PDF a zdieľanie." },
    ],
    pasos: {
      titulo: "Ako výpočet overiť",
      items: ["Vypočítajte to odzadu: od výsledku sa vráťte k východiskovej hodnote.", "Zaokrúhľujte až na konci: zaokrúhľovanie v každom kroku výsledok zmení."],
    },
    escenarios: INE_SUMY,
  },
  "kit-gastos-grupo": {
    nombre: "Súhrn spoločných výdavkov",
    tituloCorto: "súhrn výdavkov",
    paraQuien: "Aby každý vedel, koľko dlhuje, bez dohadovania a počítania na servítke",
    descripcion: [
      "PDF súhrn spoločného účtu: celková suma, koľko platí každý a prípadne kto komu dlhuje.",
      "Pošlite ho do skupinového četu alebo ho vytlačte, aby to nikto nemusel prepočítavať.",
    ],
    gancho: "Rozdeľte účet s ostatnými jasne a bez dohadovania",
    incluye: [
      { titulo: "Koľko platí každý", texto: "S celkovou sumou a všetkými podrobnosťami." },
      { titulo: "Pripravené na zdieľanie", texto: "V PDF, aby ste ho poslali ostatným." },
      { titulo: "S inými celkovými sumami", texto: "Keby sa k účtu niečo pridalo." },
    ],
    pasos: {
      titulo: "Ako sa vyrovnať",
      items: ["Pošlite súhrn ostatným skôr, ako niekto zaplatí: predídete nedorozumeniam.", "Dohodnite sa na spôsobe platby a na dátume, do ktorého sa vyrovnáte."],
    },
    escenarios: { titulo: "S inými celkovými sumami", explica: "Rovnaké rozdelenie, keď je celková suma o trochu nižšia alebo vyššia." },
  },
  "kit-estudio": {
    nombre: "Prehľad priemeru známok",
    tituloCorto: "prehľad priemeru",
    paraQuien: "Aby ste mali svoj priemer jasne a písomne, s váhou každej známky",
    descripcion: [
      "PDF prehľad s vaším priemerom: každá známka, jej váha a ako vychádza výsledok.",
      "Použite ho na overenie známky, na plánovanie ďalšej skúšky alebo aby ste výpočet ukázali tomu, kto ho potrebuje.",
    ],
    gancho: "Majte vysvetlenie svojho priemeru písomne",
    incluye: [
      { titulo: "Každá známka s jej váhou", texto: "Aby ste videli, ktorá má najväčší vplyv." },
      { titulo: "Výpočet krok za krokom", texto: "Aby ste ho mohli overiť alebo ukázať." },
      { titulo: "Nápady na ďalšiu skúšku", texto: "Ako priemer využiť na lepšiu organizáciu." },
    ],
    pasos: {
      titulo: "Na ďalšiu skúšku",
      items: ["Pozrite sa, ktorá známka má najväčšiu váhu, a venujte tomu predmetu alebo skúške viac času.", "Ak sa zdá, že je známka vypočítaná nesprávne, ukážte tento prehľad vyučujúcemu."],
    },
  },
  "kit-fechas": {
    nombre: "Prehľad dátumov a lehôt",
    tituloCorto: "prehľad dátumov",
    paraQuien: "Aby ste mali vypočítaný dátum alebo lehotu písomne, pripravené na doloženie alebo aby ste na ne nezabudli",
    descripcion: [
      "PDF prehľad s výpočtom dátumu: dátumy, ktoré ste zadali, výsledok a ako sa vypočítal.",
      "Použite ho k dokumentom, k zmluve, pri lehote splatnosti alebo len ako záznam.",
    ],
    gancho: "Majte tento dátum písomne, pripravený na doloženie",
    incluye: [
      { titulo: "Vysvetlený výpočet", texto: "S dátumami a s tým, ako sa počítajú dni." },
      { titulo: "Pripravené na doloženie", texto: "K dokumentom alebo ako príloha zmluvy." },
      { titulo: "Pre vaše záznamy", texto: "S dátumom, keď bol vytvorený." },
    ],
    pasos: {
      titulo: "Skôr ako dátum použijete v dokumentoch",
      items: [
        "Overte si, či sa lehota počíta v kalendárnych, alebo v pracovných dňoch: od toho výsledok závisí.",
        "Pozrite sa, či posledný deň nepripadá na sviatok alebo na víkend.",
        "Zapíšte si konečný dátum do kalendára s pripomenutím pár dní vopred.",
      ],
    },
  },
  "plan-salud": {
    nombre: "Prehľad BMI a kalórií",
    tituloCorto: "prehľad BMI a kalórií",
    paraQuien: "Aby ste mali svoje hodnoty hmotnosti a energie písomne a mohli ich vziať k lekárovi",
    descripcion: [
      "PDF prehľad s vysvetlením vášho výsledku: čo meria, ako sa vypočítal a do akého rozpätia spadá, s vašimi údajmi.",
      "Ide o všeobecné informácie na rozhovor so zdravotníkom. Nejde o diagnózu a nenahrádza to návštevu lekára.",
    ],
    gancho: "Vezmite svoje hodnoty k lekárovi, vysvetlené a písomne",
    incluye: [
      { titulo: "Váš výsledok s vysvetlením", texto: "Čo meria a ako sa vypočítal." },
      { titulo: "Otázky pre lekára", texto: "Aby ste z návštevy vyťažili viac." },
      { titulo: "Na sledovanie zmien", texto: "Každý prehľad si uschovajte a porovnávajte v čase." },
    ],
    pasos: {
      titulo: "Ako o tom hovoriť s odborníkom",
      items: [
        "Vezmite tento prehľad so sebou a opýtajte sa, aké rozpätie je zdravé práve pre vás vzhľadom na vek a zdravotnú históriu.",
        "Povedzte, ako jete, koľko sa hýbete a ako spíte: samotné čísla neukážu všetko.",
        "Výrazné zmeny jedálnička alebo pohybu nerobte, kým sa neporadíte s odborníkom.",
      ],
    },
    aviso: "Všeobecné informácie. Nenahrádzajú konzultáciu so zdravotníkom.",
  },
  "plan-embarazo": {
    nombre: "Prehľad plodnosti a tehotenstva",
    tituloCorto: "prehľad plodnosti a tehotenstva",
    paraQuien: "Aby ste mali orientačné dátumy písomne a mohli ich vziať na ďalšiu prehliadku",
    descripcion: [
      "PDF prehľad s orientačnými dátumami a s tým, ako sa každý vypočítal, z údajov, ktoré ste zadali.",
      "Dátumy sú orientačné: každé telo aj každé tehotenstvo je iné. Pomôžu vám s organizáciou a s rozhovorom so zdravotníkom, ale prehliadku nenahrádzajú.",
    ],
    gancho: "Majte svoje dátumy písomne do ďalšej prehliadky",
    incluye: [
      { titulo: "Vaše orientačné dátumy", texto: "S tým, ako sa každý vypočítal." },
      { titulo: "Otázky na prehliadku", texto: "Aby ste z návštevy vyťažili čo najviac." },
      { titulo: "Pre vaše záznamy", texto: "S údajmi, ktoré ste použili." },
    ],
    pasos: {
      titulo: "Na ďalšiu prehliadku",
      items: [
        "Vezmite so sebou tento prehľad a dátum prvého dňa poslednej menštruácie.",
        "Opýtajte sa, aké vyšetrenia sú potrebné vo vašom týždni a kedy je ďalšia prehliadka.",
        "Ak vás trápi akýkoľvek príznak, obráťte sa na lekára a nečakajte na dátumy z prehľadu.",
      ],
    },
    aviso: "Všeobecné informácie. Dátumy sú orientačné a nenahrádzajú starostlivosť zdravotníka.",
  },
  "plan-entrenamiento": {
    nombre: "Prehľad tempa behu",
    tituloCorto: "prehľad tempa",
    paraQuien: "Aby ste na tréning vyrážali so znalosťou cieľového tempa a vedeli, ako si rozložiť sily",
    descripcion: [
      "PDF prehľad s vysvetlením vášho tempa, času a rýchlosti, z údajov, ktoré ste zadali.",
      "Obsahuje celé tabuľky výpočtu a tipy, ako tempo využiť pri tréningu.",
    ],
    gancho: "Majte svoje tempo písomne na deň pretekov",
    incluye: [
      { titulo: "Vaše tempo s vysvetlením", texto: "S časom a rýchlosťou." },
      { titulo: "Na vytlačenie a so sebou", texto: "Do vrecka alebo na chladničku." },
      { titulo: "Tipy na tréning", texto: "Ako tempo používať a nezraniť sa." },
    ],
    pasos: {
      titulo: "Ako tempo používať",
      items: [
        "Prvé minúty bežte o trochu pomalšie, ako je cieľové tempo: v cieli to oceníte.",
        "Väčšinu týždenných tréningov behajte ľahkým tempom, pri ktorom sa dá ešte rozprávať.",
        "Keď vás niečo bolí, zastavte sa a poraďte sa s odborníkom: tempo počká.",
      ],
    },
    aviso: "Všeobecné informácie. Nenahrádzajú konzultáciu so zdravotníkom ani so športovým odborníkom.",
  },
  "kit-viaje": {
    nombre: "Rozpočet na palivo na cestu",
    tituloCorto: "rozpočet na palivo",
    paraQuien: "Aby ste vedeli, koľko miniete na palivo, a rozdelili sumu medzi všetkých, ktorí idú",
    descripcion: [
      "PDF prehľad s cenou paliva na vašu cestu, s vašimi číslami: vzdialenosť, spotreba a cena.",
      "Súčasťou je tabuľka s inými cenami paliva pre prípad, že sa do odchodu zmenia, a zoznam ostatných výdavkov na cestu.",
    ],
    gancho: "Majte cenu cesty písomne ešte pred odchodom",
    incluye: [
      { titulo: "Cena cesty", texto: "So vzdialenosťou, spotrebou a cenou." },
      { titulo: "Pri iných cenách", texto: "Pre prípad, že palivo do odchodu zdražie." },
      { titulo: "Zoznam pre zvyšok cesty", texto: "Diaľničné poplatky, parkovanie a jedlo." },
    ],
    pasos: {
      titulo: "Ako zostaviť rozpočet cesty",
      items: [
        "K cene paliva pripočítajte diaľničné poplatky, parkovanie a jedlo.",
        "Ak ide viac ľudí, rozdeľte celkovú sumu a dajte všetkým vedieť ešte pred odchodom.",
        "Skontrolujte tlak v pneumatikách: s podhustenými pneumatikami auto spotrebuje viac paliva.",
      ],
    },
    escenarios: { titulo: "Pri iných cenách", explica: "Rovnaká cesta s trochu lacnejším a trochu drahším palivom." },
  },
  "kit-hogar": {
    nombre: "Prehľad nákladov na elektrinu",
    tituloCorto: "prehľad nákladov na elektrinu",
    paraQuien: "Aby ste vedeli, koľko stojí každý spotrebič a kde sa dá na účte za elektrinu ušetriť",
    descripcion: [
      "PDF prehľad s tým, koľko vás stojí váš spotrebič, s vašimi údajmi o používaní a cenou elektriny.",
      "Súčasťou je tabuľka s inými cenami elektriny a zoznam nápadov, ako účet znížiť.",
    ],
    gancho: "Zistite, koľko vás tento spotrebič stojí a ako to znížiť",
    incluye: [
      { titulo: "Náklady pri vašom používaní", texto: "S vysvetlením krok za krokom." },
      { titulo: "Pri iných cenách", texto: "Pre prípad, že tarifa zdražie." },
      { titulo: "Nápady na úspory", texto: "Tie, ktoré sú na účte najviac vidieť." },
    ],
    pasos: {
      titulo: "Ako účet znížiť",
      items: [
        "Spotrebiče v pohotovostnom režime vytiahnite zo zásuvky: elektrinu berú, aj keď sú vypnuté.",
        "Najvýkonnejšie spotrebiče zapínajte v čase nízkej tarify, ak ju máte.",
        "Porovnajte tento prehľad so svojím vyúčtovaním, aby ste videli, akú časť celkovej sumy tento spotrebič tvorí.",
      ],
    },
    escenarios: { titulo: "Pri iných cenách", explica: "Rovnaké používanie s trochu lacnejšou a trochu drahšou elektrinou." },
  },
  "kit-obra": {
    nombre: "Zoznam stavebného materiálu",
    tituloCorto: "zoznam materiálu",
    paraQuien: "Aby ste materiál nakúpili v správnom množstve, aby nič nechýbalo a nič nezvýšilo",
    descripcion: [
      "PDF prehľad s výpočtom materiálu: rozmery, množstvá a ako sa vypočítali, pripravený na odnesenie do obchodu.",
      "Súčasťou je zoznam, ako nakúpiť správne: rezerva na odpad, na čo sa opýtať a čo overiť pred začiatkom prác.",
    ],
    gancho: "Príďte do obchodu so zoznamom materiálu v ruke",
    incluye: [
      { titulo: "Rozmery a množstvá", texto: "Všetko, čo ste vypočítali, na jednej strane." },
      { titulo: "Na ukázanie v obchode", texto: "Aby vám vypočítali presne to, čo potrebujete." },
      { titulo: "Zoznam na správny nákup", texto: "Rezerva na odpad a čo overiť." },
    ],
    pasos: {
      titulo: "Pred nákupom",
      items: [
        "Pridajte 5 až 10 % na prerez a rozbitie, pri zložitých tvaroch viac.",
        "Kupujte všetko z jednej výrobnej šarže: farba a odtieň sa medzi šaržami môžu líšiť.",
        "Opýtajte sa na spotrebu zvoleného materiálu: u rôznych výrobcov sa líši.",
        "Uschovajte si pokladničný doklad a neotvorené balenia: mnohé obchody ich zoberú späť.",
      ],
    },
  },
  "kit-facturacion": {
    nombre: "Prehľad DPH a dane z predaja",
    tituloCorto: "prehľad DPH",
    paraQuien: "Aby ste mohli vystaviť faktúru alebo overiť cenu s jasne oddelenou DPH, pripravené pre vaše záznamy alebo účtovníka",
    descripcion: [
      "PDF prehľad s vaším výpočtom: cena bez dane, daň a celková suma, so sadzbou, ktorá sa uplatňuje, a s jej zdrojom.",
      "Súčasťou je tabuľka s inými sumami, ktorá sa hodí na zostavenie cenníka s daňou aj bez nej.",
    ],
    gancho: "Majte cenu s daňou aj bez nej písomne",
    incluye: [
      { titulo: "Daň osobitne", texto: "Suma bez dane, daň a celková suma podľa platnej sadzby." },
      { titulo: "S inými sumami", texto: "Aby ste cenník zostavili naraz." },
      { titulo: "Pre vášho účtovníka", texto: "So zdrojom sadzby a s dátumom." },
    ],
    pasos: {
      titulo: "Skôr ako vystavíte faktúru",
      items: [
        "Overte si, či sa na váš tovar alebo službu vzťahuje základná, alebo znížená sadzba.",
        "Uistite sa, že faktúra uvádza osobitne základ dane a daň, ak sa to vyžaduje.",
        "Tento prehľad si uložte spolu s faktúrou do svojich záznamov.",
      ],
    },
    escenarios: INE_SUMY,
  },
  "informe-calculo": {
    nombre: "Prehľad výpočtu",
    tituloCorto: "prehľad výpočtu",
    paraQuien: "Aby ste mali tento výpočet písomne, s vašimi číslami, predpokladmi a zdrojom každej oficiálnej hodnoty",
    descripcion: [
      "PDF prehľad výpočtu, ktorý ste práve urobili, krok za krokom s vašimi údajmi: výsledok, predpoklady, na ktorých stojí, a každá oficiálna hodnota so zdrojom a dátumom kontroly.",
      "Uložte si ho do svojich dokumentov alebo ho odovzdajte účtovníkovi, zamestnávateľovi či komukoľvek, kto ho má skontrolovať, bez toho, aby ste museli každé číslo znova vysvetľovať.",
    ],
    gancho: "Majte tento výpočet písomne, so zdrojmi",
    incluye: [
      { titulo: "Váš výsledok", texto: "Presne tak, ako ste ho vypočítali, pripravený na tlač." },
      { titulo: "Ako vznikol", texto: "Kroky a predpoklady, aby sa dalo dohľadať každé číslo." },
      { titulo: "Oficiálne zdroje", texto: "Každá hodnota s inštitúciou, odkazom a dátumom kontroly." },
    ],
    pasos: {
      titulo: "Skôr ako ho použijete",
      items: [
        "Skontrolujte, že údaje hore sú vaše: výsledok od nich závisí.",
        "Ak sa oficiálna hodnota zmenila, vypočítajte to znova: prehľad používa hodnoty platné v deň nákupu.",
      ],
    },
  },
};

export const sk: DiccionarioVenta = {
  familias,
  general: { si: "Áno", no: "Nie" },
  tarjeta: {
    cejaInforme: "PDF prehľad",
    cejaPlanilla: "Tabuľka v Exceli",
    pagoUnico: "jednorazová platba",
    comprarInforme: "Získať prehľad",
    comprarPlanilla: "Získať tabuľku",
    confianza: "Platba cez PayPal alebo kartou. Ak vám prehľad nebude užitočný, do 7 dní vám peniaze vrátime.",
    verDetalle: "Čo obsahuje",
    tambien: "Mohlo by sa vám hodiť aj:",
    tablasOficiales: "Oficiálne tabuľky",
    bajadaInforme: "Prehľad rozpíše výpočet krok za krokom s vašimi číslami a so zdrojom každej hodnoty, pripravený na tlač alebo na uloženie ako PDF.",
    bajadaPlanilla: "Tabuľka obsahuje tento výpočet s vašimi číslami a s viditeľnými vzorcami, takže si môžete zmeniť čokoľvek.",
    bajadaPlanillaHoja: "Tabuľka obsahuje tento výpočet na hárku „{hoja}“ s vašimi číslami a s viditeľnými vzorcami, takže si môžete zmeniť čokoľvek.",
    equivale: "Približne {monto} podľa dnešného kurzu.",
    cobroDolares: "Platí sa v amerických dolároch.",
  },
  aviso: {
    pronto: "Pripravujeme",
    titulo: "Dajte mi vedieť, keď to bude",
    ayuda: "Napíšeme vám len raz, keď začneme predávať.",
    boton: "Dať mi vedieť",
    listo: "Hotovo. Hneď ako začneme predávať, napíšeme vám e-mail.",
    error: "Vašu adresu sa nepodarilo uložiť. Skontrolujte, či je napísaná správne, a skúste to znova.",
    correo: "Váš e-mail",
  },
  planilla: {
    gancho: "Preneste tento výpočet do Excelu, s už vyplnenými údajmi",
    incluye: [
      { titulo: "Vaše údaje sú už vyplnené", texto: "Zmeňte žltú bunku a všetko sa prepočíta." },
      { titulo: "Mzda, prémie a vyúčtovanie pri odchode", texto: "V jednom súbore, ktorý môžete používať celý rok." },
      { titulo: "Aktualizácia pri každej oficiálnej zmene", texto: "Na rovnakom odkaze nová verzia, bez ďalšej platby." },
    ],
  },
  informe: {
    tusDatos: "Vaše údaje",
    resultado: "Výsledok",
    corregir: "Opraviť moje údaje",
    actualizar: "Aktualizovať prehľad",
    imprimir: "Vytlačiť alebo uložiť ako PDF",
    imprimirAyuda: "V okne tlače zvoľte „Uložiť ako PDF“ a získate súbor.",
    sinResultado: "Vyplňte svoje údaje v časti „Opraviť moje údaje“ a prehľad sa vytvorí.",
    lugar: "Miesto a dátum",
    destinatario: "Komu",
    firma: "Podpis",
    nombre: "Meno a priezvisko",
    documento: "Číslo dokladu",
    etiquetaEnMinuscula: true,
    comoSeCalcula: "Ako sa počíta",
    fuentes: "Oficiálne zdroje",
    verificado: "overené",
    emitido: "Dátum vystavenia",
    valores: "Oficiálne hodnoty platné k",
    numero: "Prehľad",
    elegir: "Vyberte výpočet pre prehľad:",
    legal:
      "Tento prehľad je odhad podľa uvedených pravidiel a oficiálnych hodnôt k uvedenému dátumu. Nenahrádza radu odborníka ani rozhodnutie príslušného úradu. Ak sa niektorý váš údaj líši, výsledok sa zmení: opravte ho a vytlačte prehľad znova.",
    legalSinFuentes: "Tento prehľad je odhad podľa údajov, ktoré ste zadali, k uvedenému dátumu. Nenahrádza radu odborníka. Ak sa niektorý údaj zmení, zmení sa aj výsledok: opravte ho a vytlačte prehľad znova.",
    errorTitulo: "Tento prehľad sa nepodarilo otvoriť",
    error: "Platbu k tomuto odkazu sa nepodarilo potvrdiť. Ak vám peniaze z účtu odišli, napíšte nám a všetko vyriešime. Ak nákup neprebehol, môžete ho zopakovať.",
    verificar: "Platbu sa teraz nepodarilo overiť. Skúste to o pár minút: znova platiť nemusíte.",
    cupo: "Príliš veľa pokusov za sebou. Počkajte pár minút a odkaz otvorte znova.",
  },
  // {normas} completa el país en genitivo ("podľa Zákonníka práce") e {incluye} en acusativo
  // ("čistú mzdu, prémiu a...").
  catalogo: {
    tituloProducto: "{nombre} ({pais})",
    disparadorInforme: "Zakaždým, keď sa zmení oficiálna hodnota, ktorú výpočet používa",
    planillaDescripcion: "Hotová tabuľka v Exceli: zadajte svoje údaje do žltých buniek a výpočet prebehne automaticky, so vzorcami podľa {normas}.",
    planillaIncluye: "Obsahuje {incluye}. Na každom hárku sú vidieť kroky a na hárku s oficiálnymi tabuľkami je každá hodnota so zdrojom a s dátumom našej kontroly.",
  },
  planillas: {
    migaPlanillas: "Tabuľky a prehľady",
    catalogoTitulo: "Tabuľky a prehľady ({pais})",
    catalogoBajada: "Tabuľky v Exceli a PDF prehľady s vašimi číslami a s oficiálnymi údajmi krajiny. Jednorazová platba, bez predplatného.",
    seccionPlanillas: "Tabuľky v Exceli",
    seccionInformes: "PDF prehľady",
    catalogoVacio: "Tabuľky pre túto krajinu ({pais}) pripravujeme. Kalkulačky sú zatiaľ zadarmo.",
    verCalculadoras: "Zobraziť kalkulačky",
    comprar: "Kúpiť za {precio}",
    pronto: "Pripravujeme",
    incluye: "Čo obsahuje",
    incluyeInforme: [
      "Prehľad s vašimi číslami na stránke, ktorú môžete vytlačiť alebo uložiť ako PDF.",
      "Odkaz bez obmedzenia platnosti: údaje môžete kedykoľvek opraviť a prehľad znova vytlačiť.",
      "Ak vám prehľad nebude užitočný, do 7 dní vám peniaze vrátime.",
    ],
    incluyePlanilla: [
      "Súbor .xlsx, ktorý otvoríte v Exceli aj v Tabuľkách Google.",
      "Aktualizácie: {disparador}, tabuľku aktualizujeme a na rovnakom odkaze si stiahnete novú verziu.",
      "Ak vám tabuľka nebude užitočná, do 7 dní vám peniaze vrátime.",
    ],
    pagoUnico: "Jednorazová platba cez PayPal. Zaplatiť môžete z účtu alebo kartou.",
    comprarPlanilla: "Kúpiť: {titulo}",
    comprarBajadaInforme: "Hneď ako sa platba potvrdí, pošleme vám na túto adresu odkaz na váš prehľad.",
    comprarBajadaPlanilla: "Hneď ako sa platba potvrdí, pošleme vám tabuľku na túto adresu.",
    etiquetaEmail: "Váš e-mail",
    seguirPago: "Pokračovať na platbu",
    privacidad: "Vašu adresu použijeme len na zaslanie nákupu a jeho aktualizácií.",
    datosTitulo: "S číslami z vášho výpočtu",
    datosUsar: "Použiť tieto čísla v mojom nákupe. Ukladajú sa len kvôli príprave nákupu.",
    errores: {
      email: "Skontrolujte e-mailovú adresu: zdá sa, že v nej niečo chýba.",
      error: "Platbu sa nepodarilo začať. Nič sme vám nestiahli. Skúste to o pár minút.",
      cancelado: "Platbu ste zrušili. Nič sme vám nestiahli.",
      fallido: "PayPal platbu nepotvrdil. Môžete skúsiť inú kartu.",
      pronto: "Predaj sa zatiaľ nezačal.",
    },
    graciasTitulo: "Ďakujeme za nákup",
    graciasListoInforme: "Platba je potvrdená. Svoj nákup už môžete otvoriť: {titulo}. Odkaz sme vám poslali aj e-mailom a jeho platnosť nevyprší.",
    graciasListoPlanilla: "Platba je potvrdená. Svoj nákup si už môžete stiahnuť: {titulo}. Poslali sme vám ho aj e-mailom s odkazom, ktorého platnosť nevyprší.",
    graciasPendiente: "Čakáme na potvrdenie od PayPalu. Hneď ako príde, pošleme vám nákup e-mailom.",
    muestraIntro: "Toto je hárok „{hoja}“ s ukážkovými údajmi, s ktorými sa otvorí. Výpočet je dnešný, s platnými oficiálnymi hodnotami.",
    muestraLeyenda: ["vypĺňate vy", "počíta tabuľka"],
    comprobar: "Overte si to pred platbou: bezplatná kalkulačka dáva rovnaké čísla. Vyskúšajte rovnaký prípad a porovnajte.",
    comprobarEnlace: "Prejsť na bezplatnú kalkulačku",
    faqTitulo: "Časté otázky",
    faq: {
      sheets: {
        pregunta: "Funguje v Tabuľkách Google aj v Exceli?",
        respuesta: "Áno. Je to súbor .xlsx: otvoríte ho v Exceli aj v Tabuľkách Google (nahrajte ho na svoj Disk a otvorte ho tam). Výpočet používa bežné vzorce, bez makier.",
      },
      recibo: {
        pregunta: "Ako ju dostanem?",
        respuesta: "Hneď ako sa platba potvrdí, pošleme vám ju e-mailom s odkazom na stiahnutie, ktorého platnosť nevyprší. Stiahnuť si ju môžete aj zo stránky, ktorá sa otvorí po platbe.",
      },
      dolares: {
        pregunta: "Platí sa v amerických dolároch?",
        respuesta: "Áno. Cena je v amerických dolároch (USD) a platíte cez PayPal, z účtu alebo kartou.",
        conReferencia: "Vyššie uvádzame približnú sumu vo vašej mene podľa dnešného kurzu len pre orientáciu: konečná suma závisí od kurzu vašej banky alebo karty.",
        sinReferencia: "Ak je vaša karta v inej mene, prevod urobí vaša banka.",
      },
      devolucion: { pregunta: "Môžem dostať peniaze späť?", respuesta: "Áno. Ak vám tabuľka nebude užitočná, odpovedzte do 7 dní na e-mail s nákupom a peniaze vám vrátime." },
      actualiza: { pregunta: "Aktualizuje sa, keď sa zmenia oficiálne hodnoty?", respuesta: "Áno. {disparador}, tabuľku aktualizujeme a na rovnakom odkaze si stiahnete novú verziu." },
    },
    descargar: "Stiahnuť tabuľku (.xlsx)",
    abrirInforme: "Otvoriť môj prehľad",
    fuentes: "Oficiálne zdroje, ktoré používa",
    calculadoras: "Funguje s týmito kalkulačkami",
    muestra: "Ako vyzerá",
  },
  correo: {
    asuntoInforme: "Váš nákup na CalcularYa: {titulo}",
    asuntoPlanilla: "{titulo}: stiahnutie a aktualizácie",
    mismosNumeros: "Čísla sú rovnaké ako v {enlace}, s oficiálnymi údajmi.",
    enlaceCalculadora: "bezplatnej kalkulačke CalcularYa",
    comprobante: "Toto je potvrdenie vášho nákupu na {marca}.",
    informe: {
      encabezado: "Prehľad je pripravený na otvorenie",
      intro: "Ďakujeme za nákup ({titulo}). Otvorte ho tu:",
      boton: "Otvoriť môj prehľad",
      abre: "Prehľad sa otvorí v prehliadači. Odtiaľ ho môžete vytlačiť alebo uložiť ako PDF.",
      guarda: "Tento e-mail si uschovajte",
      vence: "Odkaz je váš a jeho platnosť nevyprší. Prehľad používa oficiálne hodnoty platné v deň nákupu a údaje môžete kedykoľvek opraviť a prehľad znova vytlačiť.",
      devolucion: "Ak vám prehľad nebude užitočný, odpovedzte do 7 dní na tento e-mail a peniaze vám vrátime.",
      ayuda: "Máte problém? Odpovedzte na tento e-mail alebo nám napíšte na {contacto}.",
    },
    planilla: {
      encabezado: "Tabuľka je pripravená na stiahnutie",
      intro: "Ďakujeme za nákup ({titulo}). Stiahnite si ju tu:",
      boton: "Stiahnuť tabuľku (.xlsx)",
      abre: "Otvoríte ju v Exceli aj v Tabuľkách Google.",
      guarda: "Tento e-mail si uschovajte",
      vence: "Odkaz je váš a jeho platnosť nevyprší. {disparador}, tabuľku aktualizujeme a na rovnakom odkaze dostanete aktuálnu verziu. Znova platiť nemusíte.",
      devolucion: "Ak vám tabuľka nebude užitočná, odpovedzte do 7 dní na tento e-mail a peniaze vám vrátime.",
      ayuda: "Máte problém? Odpovedzte na tento e-mail alebo nám napíšte na {contacto}.",
    },
  },
};
