import type { ClaveFamilia } from "../ofertas-intl";
import type { DiccionarioVenta, TextosFamilia } from "./tipos";

// Checo (ADR 0002, D19): un solo registro, el de Finanční správa, ČSOB y Česká spořitelna. Vykání
// con «vy» en minúscula y el imperativo cortés de segunda del plural («stáhněte», «zkontrolujte»),
// nunca tykání; los botones en infinitivo («Získat přehled»). Las cartas del informe van en primera
// persona formal. Los textos de las familias sirven a cualquier país: nada de organismos de un solo
// país. El país llega en el marcador {pais} sin declinar, así que va en nominativo entre paréntesis.
// Comillas checas „ “.
const PRO_VASE_ZAZNAMY = { titulo: "Pro vaše záznamy", texto: "S datem hodnot, které výpočet použil." };
const JINE_CASTKY = { titulo: "S jinými částkami", explica: "Stejný výpočet s trochu nižšími a trochu vyššími částkami." };
const JINE_SAZBY = { titulo: "S jinými sazbami", explica: "Stejná čísla s trochu nižšími a trochu vyššími úrokovými sazbami." };

const familias: Record<ClaveFamilia, TextosFamilia> = {
  liquidacion: {
    nombre: "Přehled vyúčtování při skončení pracovního poměru",
    tituloCorto: "přehled vyúčtování při odchodu",
    paraQuien: "Abyste si mohli zkontrolovat vyúčtování při odchodu ze zaměstnání ještě před podpisem nebo si ho vyžádat, s vašimi čísly a podle předpisů vaší země",
    descripcion: [
      "PDF přehled s vyúčtováním rozepsaným po jednotlivých položkách: kolik vám u každé náleží, jak se spočítala a jaké úřední hodnoty se použily, každá se zdrojem.",
      "Součástí je seznam toho, co si ověřit před podpisem, a dopis s už vyplněnou částkou, kterým si platbu písemně vyžádáte.",
    ],
    gancho: "Mějte vyúčtování při odchodu písemně a zkontrolujte ho ještě před podpisem",
    incluye: [
      { titulo: "Každá položka s výpočtem", texto: "Abyste ji mohli řádek po řádku porovnat s tím, co nabízí zaměstnavatel." },
      { titulo: "Úřední zdroje na očích", texto: "Každá hodnota s institucí, která ji zveřejňuje, a s datem naší kontroly." },
      { titulo: "Hotový dopis s žádostí", texto: "Vyplněný vaší částkou, abyste si platbu mohli vyžádat písemně." },
    ],
    pasos: {
      titulo: "Před podpisem",
      items: [
        "Porovnejte každou položku v tomto přehledu s dokumentem, který máte podepsat. Pokud něco chybí, zeptejte se proč, ještě než podepíšete.",
        "Ověřte, že mzda a data, se kterými počítá zaměstnavatel, odpovídají těm, které jste zadali tady. Jiné datum nástupu změní skoro všechny částky.",
        "Vyžádejte si kopii všeho, co podepisujete, a uschovejte si výplatní pásky za poslední měsíce.",
        "Pokud je rozdíl velký nebo vás propustili, ukažte tento přehled inspekci práce ve vaší zemi nebo advokátovi pro pracovní právo. Ušetříte jim první hodinu počítání.",
      ],
    },
    nota: {
      titulo: "Žádost o vyplacení",
      uso: "Vyplňte, podepište a předejte spolu s kopií pro sebe. Požádejte, aby vám na kopii potvrdili převzetí podpisem a datem.",
      pedido: "Žádám o vyplacení částek, které mi náleží v souvislosti se skončením pracovního poměru a které podle výpočtu v přiloženém přehledu činí",
      cierre: "Přiložený výpočet uvádí každou položku spočítanou podle úředních hodnot platných k uvedenému datu. Prosím o sdělení data výplaty.",
    },
  },
  "pagos-laborales": {
    nombre: "Přehled pracovních plateb",
    tituloCorto: "přehled pracovních plateb",
    paraQuien: "Abyste měli jistotu, že vám správně spočítali prémii, náhradu za dovolenou, přesčasy nebo podíl na zisku, a když ne, mohli si rozdíl vyžádat",
    descripcion: [
      "PDF přehled s vaším výpočtem krok za krokem a s vašimi čísly: jaký základ se použil, jak se počítá a jaké úřední hodnoty platí, každá se zdrojem.",
      "Hodí se pro kteroukoli platbu ze seznamu. Ukáže vám, jak ji ověřit na výplatní pásce, a obsahuje dopis, kterým si rozdíl písemně vyžádáte.",
    ],
    gancho: "Mějte tento výpočet písemně a porovnejte ho s výplatní páskou",
    incluye: [
      { titulo: "Výpočet krok za krokem", texto: "S vašimi údaji a s každou úřední hodnotou, kterou používá." },
      { titulo: "Co hledat na výplatní pásce", texto: "Abyste za minutu poznali, jestli vám zaplatili správně." },
      { titulo: "Dopis s žádostí o doplatek", texto: "Vyplněný vaší částkou, připravený k předání." },
    ],
    pasos: {
      titulo: "Jak platbu ověřit",
      items: [
        "Najděte tuto platbu na výplatní pásce a porovnejte ji s částkou v tomto přehledu.",
        "Pokud nesedí, nejdřív si ověřte, že údaje, které jste zadali, odpovídají těm, se kterými počítá zaměstnavatel.",
        "Pokud ani pak nesedí, použijte dopis níže a vyžádejte si rozdíl písemně. Kopii si nechte.",
      ],
    },
    nota: {
      titulo: "Žádost o doplatek",
      uso: "Vyplňte, podepište a předejte spolu s kopií pro sebe.",
      pedido: "Žádám o vyplacení částky uvedené v přiloženém přehledu, která podle výpočtu s platnými úředními hodnotami činí",
      cierre: "Pokud byla vyplacená částka jiná, prosím o písemné vysvětlení, jak byla spočítána.",
    },
    escenarios: { titulo: "Když se změní počet hodin", explica: "Stejný výpočet s jiným počtem hodin, abyste mohli kontrolovat každý měsíc bez nového počítání." },
  },
  impuesto: {
    nombre: "Přehled daně z příjmů",
    tituloCorto: "přehled daně z příjmů",
    paraQuien: "Abyste věděli, kolik daně vám strhávají, mohli zkontrolovat výplatní pásku a viděli, co se stane, když se příjem změní",
    descripcion: [
      "PDF přehled s vaší daní spočítanou krok za krokem, s úřední tabulkou, která se uplatní, a se zdrojem každé hodnoty.",
      "Součástí je tabulka daně při jiných příjmech, abyste dopředu věděli, kolik vám zůstane po zvýšení mzdy nebo při změně práce.",
    ],
    gancho: "Mějte vysvětlení své daně písemně a podívejte se, co se stane, když se příjem změní",
    incluye: [
      { titulo: "Výpočet podle úřední tabulky", texto: "Krok za krokem, se zdrojem každé hodnoty." },
      { titulo: "Vaše daň při jiných příjmech", texto: "Abyste o zvýšení mzdy jednali s vědomím, kolik vám zůstane." },
      { titulo: "Co zkontrolovat na výplatní pásce", texto: "Abyste se zaměstnavatelem nebo účetní mluvili řečí čísel." },
    ],
    pasos: {
      titulo: "Jak ověřit sraženou daň",
      items: [
        "Najděte sraženou daň na výplatní pásce a porovnejte ji s částkou v tomto přehledu.",
        "Pokud nesedí, zeptejte se zaměstnavatele, s jakým příjmem a jakými slevami počítá.",
        "Uschovejte si tento přehled pro roční zúčtování nebo daňové přiznání, pokud se ve vaší zemi podává.",
      ],
    },
    escenarios: { titulo: "Když se příjem změní", explica: "Stejný výpočet s trochu nižším a trochu vyšším příjmem, se stejnými úředními hodnotami." },
  },
  contratacion: {
    nombre: "Rozpočet nákladů na zaměstnance",
    tituloCorto: "rozpočet nákladů na zaměstnance",
    paraQuien: "Abyste věděli, kolik vás nový zaměstnanec skutečně stojí i se všemi odvody, ještě než se domluvíte na mzdě",
    descripcion: [
      "PDF rozpočet s celkovými náklady na zaměstnance rozepsanými po částech: mzda, odvody zaměstnance a zaměstnavatele a rezervy, každá hodnota s úředním zdrojem.",
      "Obsahuje tabulku nákladů při jiných mzdách, abyste nabídku dávali s vědomím, kolik vás každé zvýšení mzdy opravdu stojí, a je připravený k předání společníkovi nebo účetní.",
    ],
    gancho: "Udělejte z těchto nákladů rozpočet a rozhodněte se o přijetí zaměstnance",
    incluye: [
      { titulo: "Každý odvod zvlášť", texto: "S pravidlem a úředním zdrojem u každého." },
      { titulo: "Náklady při jiných mzdách", texto: "Abyste jednali s vědomím, kolik přidá každý krok nahoru." },
      { titulo: "Připravené k předání", texto: "Společníkovi, účetní nebo do vašich záznamů." },
    ],
    pasos: {
      titulo: "Než někoho přijmete",
      items: [
        "Ověřte si u účetní, jestli ve vašem oboru neplatí kolektivní smlouva nebo minimální mzda vyšší než obecná.",
        "Rezervy z tohoto rozpočtu si odkládejte každý měsíc: jsou to platby, které se sejdou na konci roku nebo při skončení smlouvy.",
        "Zaměstnance přihlaste od prvního dne: náklady v tomto rozpočtu už počítají s povinnými odvody.",
      ],
    },
    escenarios: { titulo: "Náklady při jiných mzdách", explica: "Stejný výpočet s nižšími a vyššími mzdami, se stejnými úředními hodnotami." },
  },
  "ajuste-inflacion": {
    nombre: "Dopis o valorizaci podle inflace",
    tituloCorto: "dopis o valorizaci",
    paraQuien: "Abyste mohli požádat o valorizaci nebo ji oznámit u nájemného, splátky, honoráře nebo mzdy podle úředního indexu",
    descripcion: [
      "Dopis připravený k předání, vyplněný vaší novou částkou a s doložením výpočtu: úřední index ke každému datu, instituce, která ho zveřejňuje, a odkaz na zdroj.",
      "Když je doložení na očích, druhá strana si číslo ověří za minutu a mluví se o indexu, ne o počítání.",
    ],
    gancho: "Udělejte z této valorizace hotový dopis s úředním indexem jako doložením",
    incluye: [
      { titulo: "Vyplněný dopis", texto: "S vaší novou částkou, k vytištění nebo odeslání." },
      { titulo: "Úřední index jako doložení", texto: "S institucí, datem a odkazem na zdroj." },
      { titulo: "Výpočet na očích", texto: "Aby si ho druhá strana mohla ověřit sama." },
    ],
    nota: {
      titulo: "Oznámení o valorizaci",
      uso: "Vyplňte údaji ze smlouvy a předejte spolu s výpočtem.",
      pedido: "Oznamuji úpravu sjednané částky podle vývoje úředního cenového indexu, jak uvádí přiložený výpočet. Upravená částka činí",
      cierre: "Výpočet používá index, který zveřejňuje úřední instituce uvedená v příloze, a lze si ho ověřit v uvedeném zdroji.",
    },
  },
  regimen: {
    nombre: "Přehled zjednodušeného daňového režimu",
    tituloCorto: "přehled zjednodušeného režimu",
    paraQuien: "Abyste věděli, kolik ve zjednodušeném režimu platíte a co se stane, když příjem vzroste nebo klesne",
    descripcion: [
      "PDF přehled s vaší zálohou nebo daní ve zjednodušeném režimu, spočítanou krok za krokem podle úřední tabulky a se zdrojem každé hodnoty.",
      "Součástí je tabulka toho, kolik byste platili při jiných příjmech, abyste dopředu viděli přechod do jiného pásma.",
    ],
    gancho: "Mějte svůj výpočet písemně a podívejte se, co se stane, když se příjem změní",
    incluye: [
      { titulo: "Váš výpočet podle úřední tabulky", texto: "Krok za krokem, se zdrojem každé hodnoty." },
      { titulo: "Kolik byste platili při jiných příjmech", texto: "Abyste přechod do jiného pásma viděli dopředu." },
      PRO_VASE_ZAZNAMY,
    ],
    escenarios: { titulo: "Když se příjem změní", explica: "Stejný výpočet s nižším a vyšším příjmem, se stejnými úředními hodnotami." },
  },
  deposito: {
    nombre: "Srovnání termínovaných vkladů",
    tituloCorto: "srovnání vkladů",
    paraQuien: "Abyste svůj vklad porovnali na různé doby, než se rozhodnete, kam a na jak dlouho peníze uložit",
    descripcion: ["PDF přehled s výnosem vašeho vkladu a s tabulkou stejného vkladu na jiné doby, vše stejným výpočtem jako v kalkulačce."],
    gancho: "Porovnejte vklad na několik dob v jednom přehledu",
    incluye: [
      { titulo: "Váš vklad na několik dob", texto: "V jedné tabulce, abyste vybrali na první pohled." },
      { titulo: "Výpočet krok za krokem", texto: "Se zdrojem každé hodnoty, kterou používá." },
      PRO_VASE_ZAZNAMY,
    ],
    escenarios: { titulo: "Váš vklad na jiné doby", explica: "Stejný výpočet s jinými dobami uložení." },
  },
  alimentos: {
    nombre: "Přehled výživného",
    tituloCorto: "přehled výživného",
    paraQuien: "Abyste na mediaci nebo na jednání o výživném přišli s podloženou částkou",
    descripcion: ["PDF přehled s orientační výší výživného, krok za krokem, s úředními hodnotami a jejich zdrojem a s tabulkou částky při jiných příjmech."],
    gancho: "Přijďte na mediaci s tímto výpočtem písemně",
    incluye: [
      { titulo: "Podložený výpočet", texto: "Krok za krokem, se zdrojem každé hodnoty." },
      { titulo: "Částka při jiných příjmech", texto: "Abyste jednali a viděli různé možnosti." },
      { titulo: "Pro vašeho advokáta nebo mediátora", texto: "Ušetříte jim první hodinu počítání." },
    ],
    escenarios: { titulo: "Při jiných příjmech", explica: "Stejný výpočet s nižšími a vyššími příjmy." },
  },
  jubilacion: {
    nombre: "Odhad důchodu",
    tituloCorto: "odhad důchodu",
    paraQuien: "Abyste důchod plánovali s písemným odhadem a viděli, co se změní, když budete platit vyšší pojistné",
    descripcion: ["PDF přehled s orientační výší důchodu krok za krokem, s úředními hodnotami a jejich zdrojem a s tabulkou odhadu při jiných mzdách."],
    gancho: "Mějte odhad svého důchodu písemně",
    incluye: [
      { titulo: "Odhad krok za krokem", texto: "Se zdrojem každé hodnoty." },
      { titulo: "Při jiných mzdách", texto: "Abyste viděli, co se změní, když budete platit vyšší pojistné." },
      PRO_VASE_ZAZNAMY,
    ],
    escenarios: { titulo: "Při jiných mzdách", explica: "Stejný výpočet s nižšími a vyššími mzdami." },
  },
  "plan-prestamo": {
    nombre: "Plán úvěru",
    tituloCorto: "plán úvěru",
    paraQuien: "Abyste věděli, kolik vás úvěr skutečně stojí, a porovnali nabídky ještě před podpisem",
    descripcion: [
      "PDF přehled s celým vaším úvěrem: splátka, celková částka, kterou zaplatíte, a kolik z ní tvoří úroky.",
      "Pokud jste počítali splátku, přehled obsahuje každou splátku zvlášť. Stejná čísla jsou spočítaná i s jinými sazbami, abyste nabídky bank porovnávali na skutečných číslech.",
    ],
    gancho: "Porovnejte nabídky úvěru na svých číslech ještě před podpisem",
    incluye: [
      { titulo: "Váš úvěr s jinými sazbami", texto: "Abyste viděli, co s ním udělá jeden procentní bod nahoru nebo dolů." },
      { titulo: "Celková cena na očích", texto: "Kolik zaplatíte na úrocích, bez drobného písma." },
      { titulo: "Seznam před podpisem", texto: "Otázky, které stojí za to položit věřiteli." },
    ],
    pasos: {
      titulo: "Než podepíšete úvěrovou smlouvu",
      items: [
        "Ptejte se na RPSN, tedy roční procentní sazbu nákladů se všemi poplatky, ne jen na úrokovou sazbu. Porovnávat se vyplatí právě ji.",
        "Zeptejte se na poplatek za poskytnutí, povinné pojištění a poplatek za předčasné splacení.",
        "Porovnejte aspoň tři nabídky podle tabulky s jinými sazbami v tomto přehledu.",
        "Vyberte si splátku, kterou zvládnete platit i v horším měsíci. Orientačně méně než třetinu příjmu.",
      ],
    },
    escenarios: JINE_SAZBY,
  },
  "plan-hipoteca": {
    nombre: "Plán hypotéky",
    tituloCorto: "plán hypotéky",
    paraQuien: "Abyste se o hypotéce rozhodli se všemi čísly před sebou: splátka, úroky a co se stane, když se sazba změní",
    descripcion: [
      "PDF přehled s celou vaší hypotékou: splátka, celková částka, kterou zaplatíte, a kolik z ní za ta léta půjde na úroky.",
      "Obsahuje celé tabulky vašeho výpočtu (bezplatná stránka ukazuje jen první řádky) a stejná čísla s jinými sazbami. Pokud jste porovnávali nájem a koupi, máte srovnání písemně a můžete se rozhodnout s celou rodinou.",
    ],
    gancho: "Přijďte do banky s úplnou tabulkou hypotéky a s jinými sazbami",
    incluye: [
      { titulo: "Úplná tabulka", texto: "Všechny řádky, ne jen ty první." },
      { titulo: "Vaše hypotéka s jinými sazbami", texto: "Abyste viděli, co se splátkou udělá jeden procentní bod nahoru nebo dolů." },
      { titulo: "Otázky pro banku", texto: "Co si ověřit před podpisem." },
    ],
    pasos: {
      titulo: "Než podepíšete hypoteční smlouvu",
      items: [
        "Vyžádejte si nabídku písemně se sazbou, dobou splácení a celkovými náklady včetně pojištění a poplatků.",
        "Zeptejte se, na jak dlouho je sazba zafixovaná a co se stane se splátkou, když po skončení fixace vzroste.",
        "Zjistěte, kolik stojí předčasné splacení a jestli můžete mimořádně splácet bez sankce.",
        "Ke splátce přičtěte náklady na bydlení (daň z nemovitosti, pojištění, údržbu), než se rozhodnete, kolik si můžete dovolit.",
      ],
    },
    escenarios: JINE_SAZBY,
  },
  "plan-inversion": {
    nombre: "Plán spoření a investic",
    tituloCorto: "plán spoření",
    paraQuien: "Abyste viděli, jak vaše úspory rostou v čase a co se změní, když budete ukládat víc nebo dostanete jinou sazbu",
    descripcion: [
      "PDF přehled s odhadem vašich úspor: kolik vložíte, kolik získáte na úrocích a kolik budete mít na konci.",
      "Obsahuje celé tabulky vašeho výpočtu a stejná čísla s jinými sazbami, abyste vybírali, kde spořit, na skutečných číslech.",
    ],
    gancho: "Mějte plán spoření písemně, rok po roku",
    incluye: [
      { titulo: "Úplný odhad", texto: "Všechny řádky tabulky, ne jen ty první." },
      { titulo: "S jinými sazbami", texto: "Abyste možnosti porovnali, než si vyberete." },
      { titulo: "Plán, který se dá dodržet", texto: "Kroky, díky kterým se z předsevzetí stanou úspory." },
    ],
    pasos: {
      titulo: "Aby plán fungoval",
      items: [
        "Nastavte si trvalý příkaz na den výplaty: co nevidíte, to neutratíte.",
        "Porovnejte sazbu s inflací: když je sazba nižší, vaše peníze ztrácejí hodnotu, i když číslo roste.",
        "Jednou za rok si tento přehled znovu otevřete a aktualizujte svá čísla.",
      ],
    },
    escenarios: JINE_SAZBY,
  },
  "plan-deudas": {
    nombre: "Plán splacení kreditní karty",
    tituloCorto: "plán splacení karty",
    paraQuien: "Abyste věděli, kdy kartu splatíte, kolik vás to bude stát na úrocích a jak to zvládnout dřív",
    descripcion: [
      "PDF přehled s vaším dluhem měsíc po měsíci: kolik platíte, kolik jde na úroky a jak rychle zůstatek klesá.",
      "Obsahuje úplnou tabulku až do poslední splátky a stejná čísla s jinými splátkami, abyste viděli, kolik ušetříte, když budete každý měsíc platit o trochu víc.",
    ],
    gancho: "Podívejte se měsíc po měsíci, kdy kartu splatíte",
    incluye: [
      { titulo: "Měsíc po měsíci až do poslední splátky", texto: "S úroky, které každý měsíc zaplatíte." },
      { titulo: "S jinými splátkami", texto: "Abyste viděli, o kolik dřív skončíte, když budete platit o trochu víc." },
      { titulo: "Cesta z dluhu", texto: "Kroky, abyste se do dluhů znovu nedostali." },
    ],
    pasos: {
      titulo: "Jak se dostat z dluhu",
      items: [
        "Kartu během splácení nepoužívejte: každý nový nákup tabulku prodlouží.",
        "Plaťte vždy víc než minimální splátku. Pomůže i málo a tabulka s jinými splátkami ukáže kolik.",
        "Pokud máte víc dluhů, splácejte nejdřív ten s nejvyšší sazbou a u ostatních plaťte minimum.",
        "Zeptejte se své banky na konsolidaci s nižší sazbou a porovnejte ji s tímto přehledem.",
      ],
    },
    escenarios: { titulo: "S jinými měsíčními splátkami", explica: "Stejný dluh, když budete každý měsíc platit o trochu méně a o trochu víc." },
  },
  "plan-presupuesto": {
    nombre: "Plán rozpočtu",
    tituloCorto: "plán rozpočtu",
    paraQuien: "Abyste si měsíc uspořádali podle jasného plánu: kolik jde na potřeby, přání a úspory",
    descripcion: [
      "PDF přehled, který z vašeho výpočtu udělá plán: kolik odložit na každou položku, ve vaší měně a s vašimi čísly.",
      "Obsahuje stejný plán s jinými částkami, abyste dopředu věděli, co se změní v měsíci s více nebo méně penězi, a kroky, jak ho dodržet.",
    ],
    gancho: "Udělejte z tohoto výpočtu plán svého měsíce",
    incluye: [
      { titulo: "Váš plán s vašimi čísly", texto: "Kolik kam jde, připravené k použití." },
      { titulo: "S jinými částkami", texto: "Abyste plán upravili, když se měsíc změní." },
      { titulo: "Kroky, jak plán dodržet", texto: "Co pomůže, aby rozpočet vydržel déle než první měsíc." },
    ],
    pasos: {
      titulo: "Aby rozpočet fungoval",
      items: [
        "Úspory si odložte v den výplaty, ještě před výdaji. Co zbude, můžete utratit.",
        "Během měsíce si zapisujte výdaje, klidně do telefonu, a porovnejte je s tímto plánem.",
        "Nejdřív si vytvořte finanční rezervu, aby neočekávaný výdaj neskončil na kreditní kartě.",
      ],
    },
    escenarios: JINE_CASTKY,
  },
  "plan-negocio": {
    nombre: "Přehled s čísly podnikání",
    tituloCorto: "přehled pro podnikání",
    paraQuien: "Abyste o cenách, marži nebo investici rozhodovali podle jasných čísel, připravených pro společníka",
    descripcion: [
      "PDF přehled s vaším výpočtem vysvětleným krok za krokem: jaké údaje se použily, jak se počítá a jaký vychází výsledek.",
      "Součástí je tabulka se stejným výpočtem pro jiné částky, abyste viděli, jak se výsledek změní, když vzrostou náklady nebo snížíte cenu.",
    ],
    gancho: "Udělejte z těchto čísel přehled pro rozhodnutí nebo pro společníka",
    incluye: [
      { titulo: "Vysvětlený výpočet", texto: "Abyste mu rozuměli a obhájili ho před společníkem nebo bankou." },
      { titulo: "S jinými částkami", texto: "Abyste dopředu viděli dopad změny ceny nebo nákladů." },
      { titulo: "Otázky před rozhodnutím", texto: "Co si ověřit, než změníte cenu." },
    ],
    pasos: {
      titulo: "Před rozhodnutím",
      items: [
        "Ověřte si, že v nákladech máte všechno: dopravu, poplatky, daně i svůj vlastní čas.",
        "Než cenu změníte, porovnejte ji se dvěma nebo třemi konkurenty.",
        "Podívejte se na nejhorší variantu v tabulce: když ji podnikání ustojí, je rozhodnutí bezpečnější.",
      ],
    },
    escenarios: JINE_CASTKY,
  },
  "kit-freelance": {
    nombre: "Balíček pro hodinovou sazbu na volné noze",
    tituloCorto: "balíček pro hodinovou sazbu",
    paraQuien: "Abyste si za práci řekli tolik, kolik má cenu, a svou sazbu uváděli s jistotou",
    descripcion: [
      "PDF přehled s vysvětlením vaší hodinové sazby: příjem, ke kterému míříte, hodiny, které se dají skutečně vyfakturovat, a náklady, které sazba pokrývá.",
      "Obsahuje sazbu pro jiné cílové příjmy a hotový dopis pro klienta s vaší hodinovou sazbou.",
    ],
    gancho: "Uvádějte svou sazbu s čísly, ne s omluvami",
    incluye: [
      { titulo: "Vysvětlení vaší sazby", texto: "Pro chvíli, kdy se někdo zeptá, proč právě tolik." },
      { titulo: "Pro jiné cílové příjmy", texto: "Sazba, kterou potřebujete pro každý z nich." },
      { titulo: "Hotový dopis se sazbou", texto: "Vyplněný vaším číslem, k odeslání klientům." },
    ],
    pasos: {
      titulo: "Abyste si účtovali, kolik máte",
      items: [
        "Počítejte jen hodiny, které můžete vyfakturovat: schůzky, nabídky a upomínky o platbu jsou také práce.",
        "Když to jde, nabízejte cenu za projekt: klient kupuje výsledek, ne hodiny.",
        "Sazbu přehodnoťte jednou za rok, nebo dřív, když vám vzrostou náklady.",
      ],
    },
    nota: {
      titulo: "Dopis se sazbou",
      uso: "Vyplňte údaji klienta a pošlete spolu se svou nabídkou.",
      pedido: "Na základě našeho rozhovoru vám zasílám svou sazbu za domluvené odborné služby. Moje hodinová sazba činí",
      cierre: "Sazba pokrývá pracovní čas i náklady na provoz mé činnosti. Na přání připravím i nabídku s cenou za celý projekt.",
    },
    escenarios: { titulo: "Pro jiné cílové příjmy", explica: "Stejný výpočet s nižšími a vyššími cílovými příjmy." },
  },
  "plan-sueldo": {
    nombre: "Přehled mzdy",
    tituloCorto: "přehled mzdy",
    paraQuien: "Abyste o mzdě, nabídce nebo zvýšení jednali s vědomím, kolik to dělá za hodinu, za měsíc a za rok",
    descripcion: [
      "PDF přehled s vysvětlením výpočtu vaší mzdy, s vašimi čísly a s každou hodnotou, kterou používá.",
      "Součástí je tabulka s jinými částkami, abyste mohli porovnávat nabídky nebo žádat o zvýšení s jasnými čísly.",
    ],
    gancho: "Jednejte o mzdě s čísly v ruce",
    incluye: [
      { titulo: "Váš úplný výpočet", texto: "S každou hodnotou, kterou jste zadali." },
      { titulo: "S jinými částkami", texto: "Abyste porovnali dvě nabídky za minutu." },
      { titulo: "Tipy pro vyjednávání", texto: "Co říct a o co požádat kromě samotného čísla." },
    ],
    pasos: {
      titulo: "Jak se domluvit",
      items: [
        "Když porovnáváte nabídky, mluvte o částkách za rok nebo za hodinu: měsíční čísla rozdíl schovají.",
        "Žádejte i o to, co není mzda: dovolenou navíc, práci z domova, vzdělávání nebo prémie.",
        "Přijďte s konkrétním číslem a jeho zdůvodněním: vaše zkušenosti, trh nebo to, co se změnilo ve vaší práci.",
      ],
    },
    escenarios: JINE_CASTKY,
  },
  "kit-calculos": {
    nombre: "Výpočet s vysvětlením krok za krokem",
    tituloCorto: "výpočet s vysvětlením",
    paraQuien: "Abyste měli výpočet vyřešený a vysvětlený, připravený k vytištění, ke studiu nebo k předání",
    descripcion: [
      "PDF přehled s vaším výpočtem, postupem řešení a výsledkem, s vašimi čísly.",
      "Použijte ho ke studiu, jako záznam výpočtu nebo abyste ho mohli někomu ukázat bez dalšího vysvětlování.",
    ],
    gancho: "Vezměte si výpočet s sebou, s vysvětlením krok za krokem",
    incluye: [
      { titulo: "Vyřešený výpočet", texto: "S vašimi údaji a výsledkem." },
      { titulo: "Jak se počítá", texto: "Abyste viděli, odkud se bere každé číslo." },
      { titulo: "Připravené k tisku", texto: "Nebo k uložení jako PDF a sdílení." },
    ],
    pasos: {
      titulo: "Jak výpočet ověřit",
      items: ["Spočítejte to pozpátku: od výsledku se vraťte k výchozí hodnotě.", "Zaokrouhlujte až na konci: zaokrouhlování v každém kroku výsledek změní."],
    },
    escenarios: JINE_CASTKY,
  },
  "kit-gastos-grupo": {
    nombre: "Souhrn společných výdajů",
    tituloCorto: "souhrn výdajů",
    paraQuien: "Aby každý věděl, kolik dluží, bez dohadování a počítání na ubrousku",
    descripcion: [
      "PDF souhrn společného účtu: celková částka, kolik platí každý a případně kdo komu dluží.",
      "Pošlete ho do skupinového chatu nebo ho vytiskněte, aby to nikdo nemusel přepočítávat.",
    ],
    gancho: "Rozdělte účet s ostatními jasně a bez dohadování",
    incluye: [
      { titulo: "Kolik platí každý", texto: "S celkovou částkou a podrobnostmi na očích." },
      { titulo: "Připravené ke sdílení", texto: "V PDF, abyste ho poslali ostatním." },
      { titulo: "S jinými celkovými částkami", texto: "Kdyby se k účtu něco přidalo." },
    ],
    pasos: {
      titulo: "Jak se vyrovnat",
      items: ["Pošlete souhrn ostatním dřív, než někdo zaplatí: předejdete nedorozuměním.", "Domluvte se na způsobu platby a na datu, do kdy se vyrovnáte."],
    },
    escenarios: { titulo: "S jinými celkovými částkami", explica: "Stejné rozdělení, když je celková částka o trochu nižší nebo vyšší." },
  },
  "kit-estudio": {
    nombre: "Přehled průměru známek",
    tituloCorto: "přehled průměru",
    paraQuien: "Abyste měli svůj průměr jasně a písemně, s váhou každé známky",
    descripcion: [
      "PDF přehled s vaším průměrem: každá známka, její váha a jak vychází výsledek.",
      "Použijte ho k ověření známky, k plánování další zkoušky nebo abyste výpočet ukázali tomu, kdo ho potřebuje.",
    ],
    gancho: "Mějte vysvětlení svého průměru písemně",
    incluye: [
      { titulo: "Každá známka s její váhou", texto: "Abyste viděli, která má největší vliv." },
      { titulo: "Výpočet krok za krokem", texto: "Abyste ho mohli ověřit nebo ukázat." },
      { titulo: "Nápady na další zkoušku", texto: "Jak průměr využít k lepší organizaci." },
    ],
    pasos: {
      titulo: "Pro další zkoušku",
      items: ["Podívejte se, která známka má největší váhu, a věnujte tomu předmětu nebo zkoušce víc času.", "Pokud se zdá, že je známka spočítaná špatně, ukažte tento přehled vyučujícímu."],
    },
  },
  "kit-fechas": {
    nombre: "Přehled dat a lhůt",
    tituloCorto: "přehled dat",
    paraQuien: "Abyste měli spočítané datum nebo lhůtu písemně, připravené k doložení nebo abyste na ně nezapomněli",
    descripcion: [
      "PDF přehled s výpočtem data: data, která jste zadali, výsledek a jak se spočítal.",
      "Použijte ho k dokumentům, ke smlouvě, ke lhůtě splatnosti nebo jen jako záznam.",
    ],
    gancho: "Mějte toto datum písemně, připravené k doložení",
    incluye: [
      { titulo: "Vysvětlený výpočet", texto: "S daty a s tím, jak se počítají dny." },
      { titulo: "Připravené k doložení", texto: "K dokumentům nebo jako příloha smlouvy." },
      { titulo: "Pro vaše záznamy", texto: "S datem, kdy byl vytvořen." },
    ],
    pasos: {
      titulo: "Než datum použijete v dokumentech",
      items: [
        "Ověřte si, jestli se lhůta počítá v kalendářních, nebo v pracovních dnech: na tom výsledek závisí.",
        "Podívejte se, jestli poslední den nepřipadá na svátek nebo na víkend.",
        "Zapište si konečné datum do kalendáře s připomenutím pár dní předem.",
      ],
    },
  },
  "plan-salud": {
    nombre: "Přehled BMI a kalorií",
    tituloCorto: "přehled BMI a kalorií",
    paraQuien: "Abyste měli své hodnoty hmotnosti a energie písemně a mohli je vzít k lékaři",
    descripcion: [
      "PDF přehled s vysvětlením vašeho výsledku: co měří, jak se spočítal a do jakého rozmezí spadá, s vašimi údaji.",
      "Jde o obecné informace pro rozhovor se zdravotníkem. Nejde o diagnózu a nenahrazuje to návštěvu lékaře.",
    ],
    gancho: "Vezměte své hodnoty k lékaři, vysvětlené a písemně",
    incluye: [
      { titulo: "Váš výsledek s vysvětlením", texto: "Co měří a jak se spočítal." },
      { titulo: "Otázky pro lékaře", texto: "Abyste z návštěvy vytěžili víc." },
      { titulo: "Ke sledování změn", texto: "Každý přehled si uschovejte a porovnávejte v čase." },
    ],
    pasos: {
      titulo: "Jak o tom mluvit s odborníkem",
      items: [
        "Vezměte tento přehled s sebou a zeptejte se, jaké rozmezí je zdravé právě pro vás vzhledem k věku a zdravotní historii.",
        "Řekněte, jak jíte, kolik se hýbete a jak spíte: samotná čísla neukážou všechno.",
        "Výrazné změny jídelníčku nebo pohybu nedělejte, dokud se neporadíte s odborníkem.",
      ],
    },
    aviso: "Obecné informace. Nenahrazují konzultaci se zdravotníkem.",
  },
  "plan-embarazo": {
    nombre: "Přehled plodnosti a těhotenství",
    tituloCorto: "přehled plodnosti a těhotenství",
    paraQuien: "Abyste měli orientační data písemně a mohli je vzít na další prohlídku",
    descripcion: [
      "PDF přehled s orientačními daty a s tím, jak se každé spočítalo, z údajů, které jste zadali.",
      "Data jsou orientační: každé tělo i každé těhotenství je jiné. Pomohou vám s organizací a s rozhovorem se zdravotníkem, ale prohlídku nenahrazují.",
    ],
    gancho: "Mějte svá data písemně do další prohlídky",
    incluye: [
      { titulo: "Vaše orientační data", texto: "S tím, jak se každé spočítalo." },
      { titulo: "Otázky na prohlídku", texto: "Abyste z návštěvy vytěžili co nejvíc." },
      { titulo: "Pro vaše záznamy", texto: "S údaji, které jste použili." },
    ],
    pasos: {
      titulo: "Na další prohlídku",
      items: [
        "Vezměte s sebou tento přehled a datum prvního dne poslední menstruace.",
        "Zeptejte se, jaká vyšetření jsou potřeba ve vašem týdnu a kdy je další prohlídka.",
        "Pokud vás trápí jakýkoli příznak, obraťte se na lékaře a nečekejte na data z přehledu.",
      ],
    },
    aviso: "Obecné informace. Data jsou orientační a nenahrazují péči zdravotníka.",
  },
  "plan-entrenamiento": {
    nombre: "Přehled tempa běhu",
    tituloCorto: "přehled tempa",
    paraQuien: "Abyste na trénink vyráželi se znalostí cílového tempa a věděli, jak si rozložit síly",
    descripcion: [
      "PDF přehled s vysvětlením vašeho tempa, času a rychlosti, z údajů, které jste zadali.",
      "Obsahuje celé tabulky výpočtu a tipy, jak tempo využít při tréninku.",
    ],
    gancho: "Mějte své tempo písemně na den závodu",
    incluye: [
      { titulo: "Vaše tempo s vysvětlením", texto: "S časem a rychlostí." },
      { titulo: "K vytištění a s sebou", texto: "Do kapsy nebo na lednici." },
      { titulo: "Tipy pro trénink", texto: "Jak tempo používat a nezranit se." },
    ],
    pasos: {
      titulo: "Jak tempo používat",
      items: [
        "První minuty běžte o trochu pomaleji než cílovým tempem: v cíli to oceníte.",
        "Většinu týdenních tréninků běhejte lehkým tempem, při kterém se dá ještě mluvit.",
        "Když vás něco bolí, zastavte se a poraďte se s odborníkem: tempo počká.",
      ],
    },
    aviso: "Obecné informace. Nenahrazují konzultaci se zdravotníkem ani se sportovním odborníkem.",
  },
  "kit-viaje": {
    nombre: "Rozpočet na palivo na cestu",
    tituloCorto: "rozpočet na palivo",
    paraQuien: "Abyste věděli, kolik utratíte za palivo, a rozdělili částku mezi všechny, kdo jedou",
    descripcion: [
      "PDF přehled s cenou paliva na vaši cestu, s vašimi čísly: vzdálenost, spotřeba a cena.",
      "Součástí je tabulka s jinými cenami paliva pro případ, že se do odjezdu změní, a seznam ostatních výdajů na cestu.",
    ],
    gancho: "Mějte cenu cesty písemně ještě před odjezdem",
    incluye: [
      { titulo: "Cena cesty", texto: "Se vzdáleností, spotřebou a cenou." },
      { titulo: "Při jiných cenách", texto: "Pro případ, že palivo do odjezdu podraží." },
      { titulo: "Seznam pro zbytek cesty", texto: "Dálniční poplatky, parkování a jídlo." },
    ],
    pasos: {
      titulo: "Jak sestavit rozpočet cesty",
      items: [
        "K ceně paliva přičtěte dálniční poplatky, parkování a jídlo.",
        "Pokud jede víc lidí, rozdělte celkovou částku a dejte všem vědět ještě před odjezdem.",
        "Zkontrolujte tlak v pneumatikách: s podhuštěnými pneumatikami auto spotřebuje víc paliva.",
      ],
    },
    escenarios: { titulo: "Při jiných cenách", explica: "Stejná cesta s trochu levnějším a trochu dražším palivem." },
  },
  "kit-hogar": {
    nombre: "Přehled nákladů na elektřinu",
    tituloCorto: "přehled nákladů na elektřinu",
    paraQuien: "Abyste věděli, kolik stojí každý spotřebič a kde se dá na účtu za elektřinu ušetřit",
    descripcion: [
      "PDF přehled s tím, kolik vás stojí váš spotřebič, s vašimi údaji o používání a cenou elektřiny.",
      "Součástí je tabulka s jinými cenami elektřiny a seznam nápadů, jak účet snížit.",
    ],
    gancho: "Zjistěte, kolik vás tento spotřebič stojí a jak to snížit",
    incluye: [
      { titulo: "Náklady při vašem používání", texto: "S vysvětlením krok za krokem." },
      { titulo: "Při jiných cenách", texto: "Pro případ, že tarif zdraží." },
      { titulo: "Nápady na úspory", texto: "Ty, které jsou na účtu nejvíc vidět." },
    ],
    pasos: {
      titulo: "Jak účet snížit",
      items: [
        "Spotřebiče v pohotovostním režimu vytáhněte ze zásuvky: elektřinu berou, i když jsou vypnuté.",
        "Nejvýkonnější spotřebiče zapínejte v době nízkého tarifu, pokud ho máte.",
        "Porovnejte tento přehled se svým vyúčtováním, abyste viděli, jakou část celkové částky tento spotřebič tvoří.",
      ],
    },
    escenarios: { titulo: "Při jiných cenách", explica: "Stejné používání s trochu levnější a trochu dražší elektřinou." },
  },
  "kit-obra": {
    nombre: "Seznam stavebního materiálu",
    tituloCorto: "seznam materiálu",
    paraQuien: "Abyste materiál nakoupili ve správném množství, aby nic nechybělo a nic nezbylo",
    descripcion: [
      "PDF přehled s výpočtem materiálu: rozměry, množství a jak se spočítalo, připravený k odnesení do obchodu.",
      "Součástí je seznam, jak nakoupit správně: rezerva na odpad, na co se zeptat a co ověřit před začátkem prací.",
    ],
    gancho: "Přijďte do obchodu se seznamem materiálu v ruce",
    incluye: [
      { titulo: "Rozměry a množství", texto: "Všechno, co jste spočítali, na jedné stránce." },
      { titulo: "K ukázání v obchodě", texto: "Aby vám spočítali přesně to, co potřebujete." },
      { titulo: "Seznam pro správný nákup", texto: "Rezerva na odpad a co ověřit." },
    ],
    pasos: {
      titulo: "Před nákupem",
      items: [
        "Přidejte 5 až 10 % na prořez a rozbití, u složitých tvarů víc.",
        "Kupujte všechno z jedné výrobní šarže: barva a odstín se mezi šaržemi můžou lišit.",
        "Zeptejte se na spotřebu zvoleného materiálu: u různých výrobců se liší.",
        "Uschovejte si účtenku a neotevřené balení: mnoho obchodů je vezme zpět.",
      ],
    },
  },
  "kit-facturacion": {
    nombre: "Přehled DPH a daně z prodeje",
    tituloCorto: "přehled DPH",
    paraQuien: "Abyste mohli vystavit fakturu nebo ověřit cenu s jasně odděleným DPH, připravené pro vaše záznamy nebo účetní",
    descripcion: [
      "PDF přehled s vaším výpočtem: cena bez daně, daň a celková částka, se sazbou, která se uplatní, a s jejím zdrojem.",
      "Součástí je tabulka s jinými částkami, která se hodí k sestavení ceníku s daní i bez ní.",
    ],
    gancho: "Mějte cenu s daní i bez ní písemně",
    incluye: [
      { titulo: "Daň zvlášť", texto: "Částka bez daně, daň a celková částka podle platné sazby." },
      { titulo: "S jinými částkami", texto: "Abyste ceník sestavili najednou." },
      { titulo: "Pro vaši účetní", texto: "Se zdrojem sazby a s datem." },
    ],
    pasos: {
      titulo: "Než vystavíte fakturu",
      items: [
        "Ověřte si, jestli se na vaše zboží nebo službu vztahuje základní, nebo snížená sazba.",
        "Ujistěte se, že faktura uvádí zvlášť základ daně a daň, pokud se to vyžaduje.",
        "Tento přehled si uložte spolu s fakturou do svých záznamů.",
      ],
    },
    escenarios: JINE_CASTKY,
  },
  "informe-calculo": {
    nombre: "Přehled výpočtu",
    tituloCorto: "přehled výpočtu",
    paraQuien: "Abyste měli tento výpočet písemně, s vašimi čísly, předpoklady a zdrojem každé úřední hodnoty",
    descripcion: [
      "PDF přehled výpočtu, který jste právě udělali, krok za krokem s vašimi údaji: výsledek, předpoklady, na kterých stojí, a každá úřední hodnota se zdrojem a datem kontroly.",
      "Uložte si ho do svých dokumentů nebo ho předejte účetní, zaměstnavateli či komukoli, kdo ho má zkontrolovat, aniž byste museli každé číslo znovu vysvětlovat.",
    ],
    gancho: "Mějte tento výpočet písemně, se zdroji",
    incluye: [
      { titulo: "Váš výsledek", texto: "Přesně tak, jak jste ho spočítali, připravený k tisku." },
      { titulo: "Jak vznikl", texto: "Kroky a předpoklady, aby se dalo dohledat každé číslo." },
      { titulo: "Úřední zdroje", texto: "Každá hodnota s institucí, odkazem a datem kontroly." },
    ],
    pasos: {
      titulo: "Než ho použijete",
      items: [
        "Zkontrolujte, že údaje nahoře jsou vaše: výsledek na nich závisí.",
        "Pokud se úřední hodnota změnila, spočítejte to znovu: přehled používá hodnoty platné v den nákupu.",
      ],
    },
  },
};

export const cs: DiccionarioVenta = {
  familias,
  general: { si: "Ano", no: "Ne" },
  tarjeta: {
    cejaInforme: "PDF přehled",
    cejaPlanilla: "Tabulka v Excelu",
    pagoUnico: "jednorázová platba",
    comprarInforme: "Získat přehled",
    comprarPlanilla: "Získat tabulku",
    confianza: "Platba přes PayPal nebo kartou. Pokud vám přehled nebude k užitku, do 7 dnů vám peníze vrátíme.",
    verDetalle: "Co obsahuje",
    tambien: "Mohlo by se vám hodit také:",
    tablasOficiales: "Úřední tabulky",
    bajadaInforme: "Přehled rozepíše výpočet krok za krokem s vašimi čísly a se zdrojem každé hodnoty, připravený k tisku nebo k uložení jako PDF.",
    bajadaPlanilla: "Tabulka obsahuje tento výpočet s vašimi čísly a s viditelnými vzorci, takže si můžete změnit cokoli.",
    bajadaPlanillaHoja: "Tabulka obsahuje tento výpočet na listu „{hoja}“ s vašimi čísly a s viditelnými vzorci, takže si můžete změnit cokoli.",
    equivale: "Zhruba {monto} podle dnešního kurzu.",
    cobroDolares: "Platí se v amerických dolarech.",
  },
  aviso: {
    pronto: "Připravujeme",
    titulo: "Dejte mi vědět, až to bude",
    ayuda: "Napíšeme vám jen jednou, až začneme prodávat.",
    boton: "Dát mi vědět",
    listo: "Hotovo. Jakmile začneme prodávat, napíšeme vám e-mail.",
    error: "Vaši adresu se nepodařilo uložit. Zkontrolujte, jestli je napsaná správně, a zkuste to znovu.",
    correo: "Váš e-mail",
  },
  planilla: {
    gancho: "Přeneste tento výpočet do Excelu, s už vyplněnými údaji",
    incluye: [
      { titulo: "Vaše údaje jsou už vyplněné", texto: "Změňte žlutou buňku a všechno se přepočítá." },
      { titulo: "Mzda, prémie a vyúčtování při odchodu", texto: "V jednom souboru, který můžete používat celý rok." },
      { titulo: "Aktualizace s každou úřední změnou", texto: "Na stejném odkazu nová verze, bez další platby." },
    ],
  },
  informe: {
    tusDatos: "Vaše údaje",
    resultado: "Výsledek",
    corregir: "Opravit moje údaje",
    actualizar: "Aktualizovat přehled",
    imprimir: "Vytisknout nebo uložit jako PDF",
    imprimirAyuda: "V okně tisku zvolte „Uložit jako PDF“ a získáte soubor.",
    sinResultado: "Vyplňte své údaje v části „Opravit moje údaje“ a přehled se vytvoří.",
    lugar: "Místo a datum",
    destinatario: "Komu",
    firma: "Podpis",
    nombre: "Jméno a příjmení",
    documento: "Číslo dokladu",
    etiquetaEnMinuscula: true,
    comoSeCalcula: "Jak se počítá",
    fuentes: "Úřední zdroje",
    verificado: "ověřeno",
    emitido: "Datum vystavení",
    valores: "Úřední hodnoty platné k",
    numero: "Přehled",
    elegir: "Vyberte výpočet pro přehled:",
    legal:
      "Tento přehled je odhad podle uvedených pravidel a úředních hodnot k uvedenému datu. Nenahrazuje radu odborníka ani rozhodnutí příslušného úřadu. Pokud se některý váš údaj liší, výsledek se změní: opravte ho a vytiskněte přehled znovu.",
    legalSinFuentes: "Tento přehled je odhad podle údajů, které jste zadali, k uvedenému datu. Nenahrazuje radu odborníka. Pokud se některý údaj změní, změní se i výsledek: opravte ho a vytiskněte přehled znovu.",
    errorTitulo: "Tento přehled se nepodařilo otevřít",
    error: "Platbu k tomuto odkazu se nepodařilo potvrdit. Pokud vám peníze z účtu odešly, napište nám a vše vyřešíme. Pokud nákup neproběhl, můžete ho zopakovat.",
    verificar: "Platbu se teď nepodařilo ověřit. Zkuste to za pár minut: znovu platit nemusíte.",
    cupo: "Příliš mnoho pokusů za sebou. Počkejte pár minut a odkaz otevřete znovu.",
  },
  // {normas} doplňuje země ve 2. pádě („podle zákoníku práce“) a {incluye} ve 4. pádě („čistou
  // mzdu, prémii a...“).
  catalogo: {
    tituloProducto: "{nombre} ({pais})",
    disparadorInforme: "Pokaždé, když se změní úřední hodnota, kterou výpočet používá",
    planillaDescripcion: "Hotová tabulka v Excelu: zadejte své údaje do žlutých buněk a výpočet proběhne sám, se vzorci podle {normas}.",
    planillaIncluye: "Obsahuje {incluye}. Na každém listu jsou vidět kroky a na listu s úředními tabulkami je každá hodnota se zdrojem a s datem naší kontroly.",
  },
  planillas: {
    migaPlanillas: "Tabulky a přehledy",
    catalogoTitulo: "Tabulky a přehledy ({pais})",
    catalogoBajada: "Tabulky v Excelu a PDF přehledy s vašimi čísly a s úředními údaji země. Jednorázová platba, bez předplatného.",
    seccionPlanillas: "Tabulky v Excelu",
    seccionInformes: "PDF přehledy",
    catalogoVacio: "Tabulky pro tuto zemi ({pais}) připravujeme. Kalkulačky jsou zatím zdarma.",
    verCalculadoras: "Zobrazit kalkulačky",
    comprar: "Koupit za {precio}",
    pronto: "Připravujeme",
    incluye: "Co obsahuje",
    incluyeInforme: [
      "Přehled s vašimi čísly na stránce, kterou můžete vytisknout nebo uložit jako PDF.",
      "Odkaz bez omezení platnosti: údaje můžete kdykoli opravit a přehled znovu vytisknout.",
      "Pokud vám přehled nebude k užitku, do 7 dnů vám peníze vrátíme.",
    ],
    incluyePlanilla: [
      "Soubor .xlsx, který otevřete v Excelu i v Tabulkách Google.",
      "Aktualizace: {disparador}, tabulku aktualizujeme a na stejném odkazu si stáhnete novou verzi.",
      "Pokud vám tabulka nebude k užitku, do 7 dnů vám peníze vrátíme.",
    ],
    pagoUnico: "Jednorázová platba přes PayPal. Zaplatit můžete z účtu nebo kartou.",
    comprarPlanilla: "Koupit: {titulo}",
    comprarBajadaInforme: "Jakmile se platba potvrdí, pošleme vám na tuto adresu odkaz na váš přehled.",
    comprarBajadaPlanilla: "Jakmile se platba potvrdí, pošleme vám tabulku na tuto adresu.",
    etiquetaEmail: "Váš e-mail",
    seguirPago: "Pokračovat k platbě",
    privacidad: "Vaši adresu použijeme jen k zaslání nákupu a jeho aktualizací.",
    datosTitulo: "S čísly z vašeho výpočtu",
    datosUsar: "Použít tato čísla v mém nákupu. Ukládají se jen kvůli přípravě nákupu.",
    errores: {
      email: "Zkontrolujte e-mailovou adresu: zdá se, že v ní něco chybí.",
      error: "Platbu se nepodařilo zahájit. Nic jsme vám nestrhli. Zkuste to za pár minut.",
      cancelado: "Platbu jste zrušili. Nic jsme vám nestrhli.",
      fallido: "PayPal platbu nepotvrdil. Můžete zkusit jinou kartu.",
      pronto: "Prodej zatím nezačal.",
    },
    graciasTitulo: "Děkujeme za nákup",
    graciasListoInforme: "Platba je potvrzená. Svůj nákup už můžete otevřít: {titulo}. Odkaz jsme vám poslali i e-mailem a jeho platnost nevyprší.",
    graciasListoPlanilla: "Platba je potvrzená. Svůj nákup už si můžete stáhnout: {titulo}. Poslali jsme vám ho i e-mailem s odkazem, jehož platnost nevyprší.",
    graciasPendiente: "Čekáme na potvrzení od PayPalu. Jakmile dorazí, pošleme vám nákup e-mailem.",
    muestraIntro: "Toto je list „{hoja}“ s ukázkovými údaji, se kterými se otevře. Výpočet je dnešní, s platnými úředními hodnotami.",
    muestraLeyenda: ["vyplňujete vy", "počítá tabulka"],
    comprobar: "Ověřte si to před platbou: bezplatná kalkulačka dává stejná čísla. Zkuste stejný případ a porovnejte.",
    comprobarEnlace: "Přejít na bezplatnou kalkulačku",
    faqTitulo: "Časté otázky",
    faq: {
      sheets: {
        pregunta: "Funguje v Tabulkách Google i v Excelu?",
        respuesta: "Ano. Je to soubor .xlsx: otevřete ho v Excelu i v Tabulkách Google (nahrajte ho na svůj Disk a otevřete ho tam). Výpočet používá běžné vzorce, bez maker.",
      },
      recibo: {
        pregunta: "Jak ji dostanu?",
        respuesta: "Jakmile se platba potvrdí, pošleme vám ji e-mailem s odkazem ke stažení, jehož platnost nevyprší. Stáhnout si ji můžete i ze stránky, která se otevře po platbě.",
      },
      dolares: {
        pregunta: "Platí se v amerických dolarech?",
        respuesta: "Ano. Cena je v amerických dolarech (USD) a platíte přes PayPal, z účtu nebo kartou.",
        conReferencia: "Výše ukazujeme přibližnou částku ve vaší měně podle dnešního kurzu jen pro orientaci: konečná částka závisí na kurzu vaší banky nebo karty.",
        sinReferencia: "Pokud je vaše karta v jiné měně, převod provede vaše banka.",
      },
      devolucion: { pregunta: "Můžu dostat peníze zpět?", respuesta: "Ano. Pokud vám tabulka nebude k užitku, odpovězte do 7 dnů na e-mail s nákupem a peníze vám vrátíme." },
      actualiza: { pregunta: "Aktualizuje se, když se změní úřední hodnoty?", respuesta: "Ano. {disparador}, tabulku aktualizujeme a na stejném odkazu si stáhnete novou verzi." },
    },
    descargar: "Stáhnout tabulku (.xlsx)",
    abrirInforme: "Otevřít můj přehled",
    fuentes: "Úřední zdroje, které používá",
    calculadoras: "Funguje s těmito kalkulačkami",
    muestra: "Jak vypadá",
  },
  correo: {
    asuntoInforme: "Váš nákup na CalcularYa: {titulo}",
    asuntoPlanilla: "{titulo}: stažení a aktualizace",
    mismosNumeros: "Čísla jsou stejná jako v {enlace}, s úředními údaji.",
    enlaceCalculadora: "bezplatné kalkulačce CalcularYa",
    comprobante: "Toto je potvrzení vašeho nákupu na {marca}.",
    informe: {
      encabezado: "Přehled je připravený k otevření",
      intro: "Děkujeme za nákup ({titulo}). Otevřete ho tady:",
      boton: "Otevřít můj přehled",
      abre: "Přehled se otevře v prohlížeči. Odtud ho můžete vytisknout nebo uložit jako PDF.",
      guarda: "Tento e-mail si uschovejte",
      vence: "Odkaz je váš a jeho platnost nevyprší. Přehled používá úřední hodnoty platné v den nákupu a údaje můžete kdykoli opravit a přehled znovu vytisknout.",
      devolucion: "Pokud vám přehled nebude k užitku, odpovězte do 7 dnů na tento e-mail a peníze vám vrátíme.",
      ayuda: "Máte problém? Odpovězte na tento e-mail nebo nám napište na {contacto}.",
    },
    planilla: {
      encabezado: "Tabulka je připravená ke stažení",
      intro: "Děkujeme za nákup ({titulo}). Stáhněte si ji tady:",
      boton: "Stáhnout tabulku (.xlsx)",
      abre: "Otevřete ji v Excelu i v Tabulkách Google.",
      guarda: "Tento e-mail si uschovejte",
      vence: "Odkaz je váš a jeho platnost nevyprší. {disparador}, tabulku aktualizujeme a na stejném odkazu dostanete aktuální verzi. Znovu platit nemusíte.",
      devolucion: "Pokud vám tabulka nebude k užitku, odpovězte do 7 dnů na tento e-mail a peníze vám vrátíme.",
      ayuda: "Máte problém? Odpovězte na tento e-mail nebo nám napište na {contacto}.",
    },
  },
};
