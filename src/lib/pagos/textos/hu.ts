import type { ClaveFamilia } from "../ofertas-intl";
import type { DiccionarioVenta, TextosFamilia } from "./tipos";

// Húngaro (ADR 0002, D21): un solo registro, la tegezés de OTP, K&H, Revolut y los portales de
// calculadoras. Imperativo de segunda del singular («töltsd le», «ellenőrizd»), nunca magázás ni
// «Ön»; los botones con el verbo en primera persona o el sustantivo de acción («Kérem a
// kimutatást»). Las cartas del informe van en primera persona, en el registro neutro de una carta
// formal. Los textos de las familias sirven a cualquier país: nada de organismos de un solo país. El
// país llega en el marcador {pais} sin sufijo, así que va en nominativo entre paréntesis. Ningún
// sufijo se pega a un marcador ni a una cifra: van tras dos puntos o con posposición («{normas}
// szerint»). Comillas húngaras „ ”.
const NYILVANTARTAS = { titulo: "A saját nyilvántartásodhoz", texto: "A számításhoz használt értékek dátumával együtt." };
const MAS_OSSZEGEK = { titulo: "Más összegekkel", explica: "Ugyanez a számítás valamivel kisebb és valamivel nagyobb összegekkel." };
const MAS_KAMATOK = { titulo: "Más kamatokkal", explica: "Ugyanezek a számok valamivel alacsonyabb és valamivel magasabb kamattal." };

const familias: Record<ClaveFamilia, TextosFamilia> = {
  liquidacion: {
    nombre: "Kilépési elszámolás kimutatása",
    tituloCorto: "kilépési elszámolás",
    paraQuien: "Hogy aláírás előtt ellenőrizni tudd a munkaviszony végén járó elszámolást, vagy írásban kérhesd, a saját számaiddal és az országod szabályai szerint",
    descripcion: [
      "PDF-kimutatás tételesen bontott elszámolással: mennyi jár az egyes tételekre, hogyan jött ki az összeg, és milyen hivatalos értékekkel számoltunk, mindegyik forrással.",
      "Tartalmaz egy listát arról, mit nézz meg aláírás előtt, és egy kitöltött összegű levelet, amellyel írásban kérheted a kifizetést.",
    ],
    gancho: "Legyen meg írásban a kilépési elszámolásod, és ellenőrizd még aláírás előtt",
    incluye: [
      { titulo: "Minden tétel számítással", texto: "Hogy soronként össze tudd vetni azzal, amit a munkáltató ajánl." },
      { titulo: "Hivatalos források szem előtt", texto: "Minden érték a közzétevő intézménnyel és az ellenőrzésünk dátumával." },
      { titulo: "Kész kérelem levélben", texto: "A te összegeddel kitöltve, hogy írásban kérhesd a kifizetést." },
    ],
    pasos: {
      titulo: "Aláírás előtt",
      items: [
        "Vesd össze a kimutatás minden tételét azzal a dokumentummal, amelyet alá kellene írnod. Ha valami hiányzik, kérdezz rá, még mielőtt aláírod.",
        "Nézd meg, hogy a munkáltató ugyanazzal a bérrel és ugyanazokkal a dátumokkal számol-e, mint amiket itt megadtál. Egy másik belépési dátum szinte minden összeget megváltoztat.",
        "Kérj másolatot mindenről, amit aláírsz, és őrizd meg az utolsó hónapok bérjegyzékeit.",
        "Ha nagy az eltérés, vagy elbocsátottak, mutasd meg ezt a kimutatást az országod munkaügyi hatóságának vagy egy munkajogi ügyvédnek. Megspórolod nekik az első óra számolást.",
      ],
    },
    nota: {
      titulo: "Kérelem a kifizetésre",
      uso: "Töltsd ki, írd alá, és add át egy saját példánnyal együtt. Kérd, hogy a te példányodon aláírással és dátummal igazolják az átvételt.",
      pedido: "Kérem a munkaviszonyom megszűnésével kapcsolatban nekem járó összegek kifizetését. A mellékelt kimutatás számítása szerint ezek összege:",
      cierre: "A mellékelt számítás minden tételt a megadott napon hatályos hivatalos értékekkel számol. Kérem, közöljék velem a kifizetés időpontját.",
    },
  },
  "pagos-laborales": {
    nombre: "Munkahelyi kifizetések kimutatása",
    tituloCorto: "munkahelyi kifizetések",
    paraQuien: "Hogy biztos legyél benne, jól számolták-e a jutalmat, a szabadságmegváltást, a túlórát vagy a nyereségrészesedést, és ha nem, kérhesd a különbözetet",
    descripcion: [
      "PDF-kimutatás a számításoddal lépésről lépésre, a saját számaiddal: milyen alapból indul, hogyan számoljuk, és milyen hivatalos értékek érvényesek, mindegyik forrással.",
      "A lista bármelyik kifizetéséhez használható. Megmutatja, hogyan ellenőrizd a bérjegyzéken, és tartalmaz egy levelet, amellyel írásban kérheted a különbözetet.",
    ],
    gancho: "Legyen meg írásban ez a számítás, és vesd össze a bérjegyzékkel",
    incluye: [
      { titulo: "Számítás lépésről lépésre", texto: "A te adataiddal és minden hivatalos értékkel, amelyet használ." },
      { titulo: "Mit keress a bérjegyzéken", texto: "Hogy egy perc alatt lásd, jól fizettek-e." },
      { titulo: "Levél a különbözet kéréséhez", texto: "A te összegeddel kitöltve, átadásra készen." },
    ],
    pasos: {
      titulo: "Így ellenőrizd a kifizetést",
      items: [
        "Keresd meg ezt a kifizetést a bérjegyzéken, és vesd össze a kimutatásban szereplő összeggel.",
        "Ha nem egyezik, először nézd meg, hogy a megadott adataid megegyeznek-e azokkal, amelyekkel a munkáltató számol.",
        "Ha így sem egyezik, használd az alábbi levelet, és kérd írásban a különbözetet. A másolatot tartsd meg.",
      ],
    },
    nota: {
      titulo: "Kérelem a különbözet kifizetésére",
      uso: "Töltsd ki, írd alá, és add át egy saját példánnyal együtt.",
      pedido: "Kérem a mellékelt kimutatásban szereplő összeg kifizetését. A hatályos hivatalos értékekkel végzett számítás szerint az összeg:",
      cierre: "Ha a kifizetett összeg ettől eltért, kérem, írásban tájékoztassanak arról, hogyan számolták.",
    },
    escenarios: { titulo: "Ha változik az órák száma", explica: "Ugyanez a számítás más óraszámmal, hogy minden hónapban újraszámolás nélkül ellenőrizhesd." },
  },
  impuesto: {
    nombre: "Jövedelemadó-kimutatás",
    tituloCorto: "jövedelemadó-kimutatás",
    paraQuien: "Hogy tudd, mennyi adót vonnak le tőled, ellenőrizni tudd a bérjegyzéket, és lásd, mi történik, ha változik a jövedelmed",
    descripcion: [
      "PDF-kimutatás a lépésről lépésre kiszámolt adóddal, az alkalmazandó hivatalos adótáblával és minden érték forrásával.",
      "Tartalmaz egy táblázatot az adóról más jövedelmek mellett, hogy előre tudd, mennyi marad egy béremelés vagy munkahelyváltás után.",
    ],
    gancho: "Legyen meg írásban, hogyan jön ki az adód, és nézd meg, mi történik, ha változik a jövedelmed",
    incluye: [
      { titulo: "Számítás a hivatalos tábla szerint", texto: "Lépésről lépésre, minden érték forrásával." },
      { titulo: "Az adód más jövedelmek mellett", texto: "Hogy úgy tárgyalj a béremelésről, hogy tudod, mennyi marad." },
      { titulo: "Mit nézz meg a bérjegyzéken", texto: "Hogy a munkáltatóval vagy a könyvelővel a számok nyelvén beszélj." },
    ],
    pasos: {
      titulo: "Így ellenőrizd a levont adót",
      items: [
        "Keresd meg a levont adót a bérjegyzéken, és vesd össze a kimutatásban szereplő összeggel.",
        "Ha nem egyezik, kérdezd meg a munkáltatót, milyen jövedelemmel és milyen kedvezményekkel számol.",
        "Őrizd meg ezt a kimutatást az éves adóbevalláshoz, ha az országodban kell ilyet benyújtani.",
      ],
    },
    escenarios: { titulo: "Ha változik a jövedelmed", explica: "Ugyanez a számítás valamivel kisebb és valamivel nagyobb jövedelemmel, ugyanazokkal a hivatalos értékekkel." },
  },
  contratacion: {
    nombre: "Munkavállaló költségkalkulációja",
    tituloCorto: "munkavállaló költségkalkulációja",
    paraQuien: "Hogy még a bérmegállapodás előtt tudd, mennyibe kerül valójában egy új munkatárs az összes járulékkal együtt",
    descripcion: [
      "PDF-kalkuláció a munkavállaló teljes költségével, részenként bontva: bér, a munkavállaló és a munkáltató járulékai és a tartalékok, minden érték hivatalos forrással.",
      "Tartalmaz egy táblázatot a költségről más bérek mellett, hogy úgy tegyél ajánlatot, hogy tudod, mennyibe kerül valójában minden emelés, és átadhatod a társadnak vagy a könyvelődnek.",
    ],
    gancho: "Készíts ebből a költségből kalkulációt, és dönts a felvételről",
    incluye: [
      { titulo: "Minden járulék külön", texto: "Mindegyik a szabállyal és a hivatalos forrással." },
      { titulo: "Költség más bérek mellett", texto: "Hogy úgy tárgyalj, hogy tudod, mennyit tesz hozzá minden lépés felfelé." },
      { titulo: "Átadásra készen", texto: "A társadnak, a könyvelődnek vagy a saját nyilvántartásodba." },
    ],
    pasos: {
      titulo: "Mielőtt felveszel valakit",
      items: [
        "Kérdezd meg a könyvelődet, van-e az ágazatodban kollektív szerződés vagy az általánosnál magasabb bérminimum.",
        "A kalkuláció tartalékait tedd félre minden hónapban: ezek olyan kifizetések, amelyek az év végén vagy a szerződés megszűnésekor egyszerre jönnek.",
        "A munkavállalót az első naptól jelentsd be: a kalkuláció költségei már a kötelező járulékokkal számolnak.",
      ],
    },
    escenarios: { titulo: "Költség más bérek mellett", explica: "Ugyanez a számítás kisebb és nagyobb bérekkel, ugyanazokkal a hivatalos értékekkel." },
  },
  "ajuste-inflacion": {
    nombre: "Levél az inflációkövető emelésről",
    tituloCorto: "levél az emelésről",
    paraQuien: "Hogy hivatalos index alapján kérhesd vagy jelezhesd a bérleti díj, a részlet, a megbízási díj vagy a bér inflációkövető emelését",
    descripcion: [
      "Átadásra kész levél, az új összegeddel kitöltve és a számítás igazolásával: a hivatalos index minden dátumra, a közzétevő intézmény és a forrás linkje.",
      "Ha az igazolás ott van a szeme előtt, a másik fél egy perc alatt ellenőrzi a számot, és az indexről esik szó, nem a számolásról.",
    ],
    gancho: "Készíts ebből az emelésből kész levelet, a hivatalos indexszel mint igazolással",
    incluye: [
      { titulo: "Kitöltött levél", texto: "Az új összegeddel, nyomtatásra vagy elküldésre." },
      { titulo: "Hivatalos index igazolásként", texto: "Az intézménnyel, a dátummal és a forrás linkjével." },
      { titulo: "A számítás szem előtt", texto: "Hogy a másik fél maga is ellenőrizhesse." },
    ],
    nota: {
      titulo: "Értesítés az emelésről",
      uso: "Töltsd ki a szerződés adataival, és add át a számítással együtt.",
      pedido: "Értesítem, hogy a megállapodott összeget a hivatalos fogyasztói árindex alakulása szerint módosítom, ahogy a mellékelt számítás mutatja. A módosított összeg:",
      cierre: "A számítás a mellékletben megnevezett hivatalos intézmény által közzétett indexet használja, és a megadott forrásban ellenőrizhető.",
    },
  },
  regimen: {
    nombre: "Egyszerűsített adózás kimutatása",
    tituloCorto: "egyszerűsített adózás",
    paraQuien: "Hogy tudd, mennyit fizetsz az egyszerűsített adózásban, és mi történik, ha nő vagy csökken a bevételed",
    descripcion: [
      "PDF-kimutatás az egyszerűsített adózás szerinti előleggel vagy adóval, lépésről lépésre a hivatalos tábla szerint, minden érték forrásával.",
      "Tartalmaz egy táblázatot arról, mennyit fizetnél más bevétel mellett, hogy előre lásd, mikor kerülsz másik sávba.",
    ],
    gancho: "Legyen meg írásban a számításod, és nézd meg, mi történik, ha változik a bevételed",
    incluye: [
      { titulo: "A számításod a hivatalos tábla szerint", texto: "Lépésről lépésre, minden érték forrásával." },
      { titulo: "Mennyit fizetnél más bevétel mellett", texto: "Hogy előre lásd, mikor kerülsz másik sávba." },
      NYILVANTARTAS,
    ],
    escenarios: { titulo: "Ha változik a bevételed", explica: "Ugyanez a számítás kisebb és nagyobb bevétellel, ugyanazokkal a hivatalos értékekkel." },
  },
  deposito: {
    nombre: "Lekötött betétek összehasonlítása",
    tituloCorto: "betétek összehasonlítása",
    paraQuien: "Hogy különböző futamidőkre összehasonlítsd a betétedet, mielőtt eldöntöd, hová és mennyi időre teszed a pénzed",
    descripcion: ["PDF-kimutatás a betéted hozamával és egy táblázattal ugyanarról a betétről más futamidőkre, mindez ugyanazzal a számítással, mint a kalkulátorban."],
    gancho: "Hasonlítsd össze a betétedet több futamidőre egyetlen kimutatásban",
    incluye: [
      { titulo: "A betéted több futamidőre", texto: "Egy táblázatban, hogy első ránézésre választhass." },
      { titulo: "Számítás lépésről lépésre", texto: "Minden felhasznált érték forrásával." },
      NYILVANTARTAS,
    ],
    escenarios: { titulo: "A betéted más futamidőkre", explica: "Ugyanez a számítás más lekötési időkkel." },
  },
  alimentos: {
    nombre: "Gyerektartás kimutatása",
    tituloCorto: "gyerektartás kimutatása",
    paraQuien: "Hogy megalapozott összeggel menj a mediációra vagy a tartásdíjról szóló egyeztetésre",
    descripcion: ["PDF-kimutatás a tartásdíj irányadó összegével, lépésről lépésre, a hivatalos értékekkel és forrásukkal, és egy táblázattal az összegről más jövedelmek mellett."],
    gancho: "Menj a mediációra ezzel a számítással írásban",
    incluye: [
      { titulo: "Megalapozott számítás", texto: "Lépésről lépésre, minden érték forrásával." },
      { titulo: "Az összeg más jövedelmek mellett", texto: "Hogy több lehetőséget látva tárgyalj." },
      { titulo: "Az ügyvédednek vagy a mediátornak", texto: "Megspórolod nekik az első óra számolást." },
    ],
    escenarios: { titulo: "Más jövedelmek mellett", explica: "Ugyanez a számítás kisebb és nagyobb jövedelmekkel." },
  },
  jubilacion: {
    nombre: "Nyugdíjbecslés",
    tituloCorto: "nyugdíjbecslés",
    paraQuien: "Hogy írásos becsléssel tervezd a nyugdíjad, és lásd, mi változik, ha magasabb járulékot fizetsz",
    descripcion: ["PDF-kimutatás a nyugdíj irányadó összegével lépésről lépésre, a hivatalos értékekkel és forrásukkal, és egy táblázattal a becslésről más bérek mellett."],
    gancho: "Legyen meg írásban a nyugdíjbecslésed",
    incluye: [
      { titulo: "Becslés lépésről lépésre", texto: "Minden érték forrásával." },
      { titulo: "Más bérek mellett", texto: "Hogy lásd, mi változik, ha magasabb járulékot fizetsz." },
      NYILVANTARTAS,
    ],
    escenarios: { titulo: "Más bérek mellett", explica: "Ugyanez a számítás kisebb és nagyobb bérekkel." },
  },
  "plan-prestamo": {
    nombre: "Hitelterv",
    tituloCorto: "hitelterv",
    paraQuien: "Hogy tudd, mennyibe kerül valójában a hitel, és még aláírás előtt összehasonlítsd az ajánlatokat",
    descripcion: [
      "PDF-kimutatás a teljes hiteledről: a törlesztőrészlet, a visszafizetendő teljes összeg, és mennyi ebből a kamat.",
      "Ha a törlesztőrészletet számoltad, a kimutatás minden részletet külön tartalmaz. Ugyanezeket a számokat más kamatokkal is kiszámoltuk, hogy a bankok ajánlatait valódi számokon hasonlítsd össze.",
    ],
    gancho: "Hasonlítsd össze a hitelajánlatokat a saját számaidon, még aláírás előtt",
    incluye: [
      { titulo: "A hiteled más kamatokkal", texto: "Hogy lásd, mit tesz vele egy százalékpont fel vagy le." },
      { titulo: "A teljes költség szem előtt", texto: "Mennyit fizetsz kamatra, apró betűk nélkül." },
      { titulo: "Lista aláírás előtt", texto: "Kérdések, amelyeket érdemes feltenni a hitelezőnek." },
    ],
    pasos: {
      titulo: "Mielőtt aláírod a hitelszerződést",
      items: [
        "A THM-et (teljes hiteldíj mutató) kérdezd meg, ne csak a kamatot: ez tartalmazza az összes díjat, ezt érdemes összehasonlítani.",
        "Kérdezz rá a folyósítási díjra, a kötelező biztosításra és az előtörlesztés díjára.",
        "Hasonlíts össze legalább három ajánlatot a kimutatás más kamatokkal számolt táblázata alapján.",
        "Olyan törlesztőrészletet válassz, amelyet egy rosszabb hónapban is ki tudsz fizetni. Irányadóként a jövedelmed harmadánál kevesebbet.",
      ],
    },
    escenarios: MAS_KAMATOK,
  },
  "plan-hipoteca": {
    nombre: "Lakáshitel-terv",
    tituloCorto: "lakáshitel-terv",
    paraQuien: "Hogy az összes számmal a szemed előtt dönts a lakáshitelről: törlesztőrészlet, kamat, és mi történik, ha változik a kamat",
    descripcion: [
      "PDF-kimutatás a teljes lakáshiteledről: a törlesztőrészlet, a visszafizetendő teljes összeg, és mennyi megy ebből az évek alatt kamatra.",
      "Tartalmazza a számításod teljes táblázatait (az ingyenes oldal csak az első sorokat mutatja) és ugyanezeket a számokat más kamatokkal. Ha a bérlést és a vásárlást hasonlítottad össze, írásban is megvan, és az egész családdal együtt dönthettek.",
    ],
    gancho: "Menj a bankba a lakáshitel teljes táblázatával és más kamatokkal",
    incluye: [
      { titulo: "Teljes táblázat", texto: "Az összes sor, nem csak az elsők." },
      { titulo: "A lakáshiteled más kamatokkal", texto: "Hogy lásd, mit tesz a törlesztőrészlettel egy százalékpont fel vagy le." },
      { titulo: "Kérdések a banknak", texto: "Mit nézz meg aláírás előtt." },
    ],
    pasos: {
      titulo: "Mielőtt aláírod a lakáshitel-szerződést",
      items: [
        "Kérd írásban az ajánlatot a kamattal, a futamidővel és a teljes költséggel, a biztosításokat és a díjakat is beleértve.",
        "Kérdezd meg, mennyi időre rögzített a kamat, és mi lesz a törlesztőrészlettel, ha a kamatperiódus végén emelkedik.",
        "Tudd meg, mennyibe kerül az előtörlesztés, és törleszthetsz-e rendkívüli összeget díj nélkül.",
        "A törlesztőrészlethez add hozzá a lakás fenntartási költségeit (adó, biztosítás, karbantartás), mielőtt eldöntöd, mennyit engedhetsz meg magadnak.",
      ],
    },
    escenarios: MAS_KAMATOK,
  },
  "plan-inversion": {
    nombre: "Megtakarítási és befektetési terv",
    tituloCorto: "megtakarítási terv",
    paraQuien: "Hogy lásd, hogyan nő a megtakarításod az időben, és mi változik, ha többet teszel félre, vagy más kamatot kapsz",
    descripcion: [
      "PDF-kimutatás a megtakarításod becslésével: mennyit fizetsz be, mennyit kapsz kamatként, és mennyi lesz a végén.",
      "Tartalmazza a számításod teljes táblázatait és ugyanezeket a számokat más kamatokkal, hogy valódi számok alapján válaszd ki, hol takarékoskodj.",
    ],
    gancho: "Legyen meg írásban a megtakarítási terved, évről évre",
    incluye: [
      { titulo: "Teljes becslés", texto: "A táblázat összes sora, nem csak az elsők." },
      { titulo: "Más kamatokkal", texto: "Hogy összehasonlítsd a lehetőségeket, mielőtt választasz." },
      { titulo: "Betartható terv", texto: "Lépések, amelyekkel a fogadalomból valódi megtakarítás lesz." },
    ],
    pasos: {
      titulo: "Hogy működjön a terv",
      items: [
        "Állíts be rendszeres átutalást a fizetés napjára: amit nem látsz, azt nem költöd el.",
        "Vesd össze a kamatot az inflációval: ha a kamat alacsonyabb, a pénzed értéke csökken, még ha a szám nő is.",
        "Évente egyszer nyisd meg újra ezt a kimutatást, és frissítsd a számaidat.",
      ],
    },
    escenarios: MAS_KAMATOK,
  },
  "plan-deudas": {
    nombre: "Hitelkártya-törlesztési terv",
    tituloCorto: "kártyatörlesztési terv",
    paraQuien: "Hogy tudd, mikor fizeted vissza a kártyát, mennyibe kerül kamatban, és hogyan végezhetsz vele hamarabb",
    descripcion: [
      "PDF-kimutatás a tartozásodról hónapról hónapra: mennyit fizetsz, mennyi megy kamatra, és milyen gyorsan csökken az egyenleg.",
      "Tartalmazza a teljes táblázatot az utolsó részletig és ugyanezeket a számokat más törlesztőrészletekkel, hogy lásd, mennyit spórolsz, ha minden hónapban egy kicsit többet fizetsz.",
    ],
    gancho: "Nézd meg hónapról hónapra, mikor fizeted vissza a kártyát",
    incluye: [
      { titulo: "Hónapról hónapra az utolsó részletig", texto: "A kamattal, amelyet havonta fizetsz." },
      { titulo: "Más törlesztőrészletekkel", texto: "Hogy lásd, mennyivel hamarabb végzel, ha egy kicsit többet fizetsz." },
      { titulo: "Kiút az adósságból", texto: "Lépések, hogy ne kerülj újra adósságba." },
    ],
    pasos: {
      titulo: "Így juthatsz ki az adósságból",
      items: [
        "A törlesztés alatt ne használd a kártyát: minden új vásárlás meghosszabbítja a táblázatot.",
        "Mindig a minimumnál többet fizess. Egy kevés is segít, és a más törlesztőrészletekkel számolt táblázat megmutatja, mennyit.",
        "Ha több tartozásod van, először a legmagasabb kamatút fizesd vissza, a többinél a minimumot fizesd.",
        "Kérdezd meg a bankodat, van-e alacsonyabb kamatú hitelkiváltás, és vesd össze ezzel a kimutatással.",
      ],
    },
    escenarios: { titulo: "Más havi törlesztőrészletekkel", explica: "Ugyanaz a tartozás, ha havonta egy kicsit kevesebbet vagy egy kicsit többet fizetsz." },
  },
  "plan-presupuesto": {
    nombre: "Költségvetési terv",
    tituloCorto: "költségvetési terv",
    paraQuien: "Hogy világos terv szerint szervezd meg a hónapod: mennyi megy a szükségletekre, a vágyakra és a megtakarításra",
    descripcion: [
      "PDF-kimutatás, amely a számításodból tervet készít: mennyit tegyél félre az egyes tételekre, a saját pénznemedben és a saját számaiddal.",
      "Tartalmazza ugyanezt a tervet más összegekkel, hogy előre tudd, mi változik egy több vagy kevesebb pénzt hozó hónapban, és a lépéseket, hogy be is tartsd.",
    ],
    gancho: "Készíts ebből a számításból tervet a hónapodra",
    incluye: [
      { titulo: "A terved a saját számaiddal", texto: "Mennyi hová megy, használatra készen." },
      { titulo: "Más összegekkel", texto: "Hogy módosíthasd a tervet, ha változik a hónap." },
      { titulo: "Lépések a terv betartásához", texto: "Mi segít, hogy a költségvetés tovább kitartson az első hónapnál." },
    ],
    pasos: {
      titulo: "Hogy működjön a költségvetés",
      items: [
        "A megtakarítást a fizetés napján tedd félre, még a kiadások előtt. Amit utána megmarad, azt elköltheted.",
        "A hónap során írd fel a kiadásaidat, akár a telefonodba, és vesd össze ezzel a tervvel.",
        "Először építs fel egy vésztartalékot, hogy egy váratlan kiadás ne a hitelkártyán kössön ki.",
      ],
    },
    escenarios: MAS_OSSZEGEK,
  },
  "plan-negocio": {
    nombre: "Vállalkozási számok kimutatása",
    tituloCorto: "vállalkozási kimutatás",
    paraQuien: "Hogy világos számok alapján dönts az árakról, az árrésről vagy egy befektetésről, a társad számára is érthetően",
    descripcion: [
      "PDF-kimutatás a számításod lépésről lépésre elmagyarázva: milyen adatokkal számoltunk, hogyan, és mi az eredmény.",
      "Tartalmaz egy táblázatot ugyanazzal a számítással más összegekre, hogy lásd, hogyan változik az eredmény, ha nőnek a költségek, vagy csökkented az árat.",
    ],
    gancho: "Készíts ezekből a számokból kimutatást a döntéshez vagy a társadnak",
    incluye: [
      { titulo: "Elmagyarázott számítás", texto: "Hogy értsd, és meg tudd védeni a társad vagy a bank előtt." },
      { titulo: "Más összegekkel", texto: "Hogy előre lásd egy ár- vagy költségváltozás hatását." },
      { titulo: "Kérdések a döntés előtt", texto: "Mit nézz meg, mielőtt árat változtatsz." },
    ],
    pasos: {
      titulo: "A döntés előtt",
      items: [
        "Nézd meg, hogy minden benne van-e a költségekben: szállítás, díjak, adók és a saját időd is.",
        "Mielőtt árat változtatsz, vesd össze két-három versenytárséval.",
        "Nézd meg a táblázat legrosszabb változatát: ha a vállalkozás azt is kibírja, biztonságosabb a döntés.",
      ],
    },
    escenarios: MAS_OSSZEGEK,
  },
  "kit-freelance": {
    nombre: "Csomag a szabadúszó óradíjhoz",
    tituloCorto: "óradíjcsomag",
    paraQuien: "Hogy annyit kérj a munkádért, amennyit ér, és magabiztosan mondd meg az óradíjadat",
    descripcion: [
      "PDF-kimutatás az óradíjad magyarázatával: a jövedelem, amelyet el akarsz érni, a ténylegesen kiszámlázható órák és a költségek, amelyeket az óradíj fedez.",
      "Tartalmazza az óradíjat más célzott jövedelmekhez és egy kész levelet az ügyfélnek az óradíjaddal.",
    ],
    gancho: "Számokkal mondd meg az óradíjad, ne mentegetőzéssel",
    incluye: [
      { titulo: "Az óradíjad magyarázata", texto: "Arra az esetre, ha valaki megkérdezi, miért pont ennyi." },
      { titulo: "Más célzott jövedelmekhez", texto: "Az óradíj, amelyre mindegyikhez szükséged van." },
      { titulo: "Kész levél az óradíjjal", texto: "A te számoddal kitöltve, elküldhető az ügyfeleknek." },
    ],
    pasos: {
      titulo: "Hogy annyit kérj, amennyi jár",
      items: [
        "Csak a kiszámlázható órákkal számolj: a megbeszélés, az ajánlatírás és a fizetési felszólítás is munka.",
        "Ha lehet, projektárat adj: az ügyfél az eredményt veszi meg, nem az órákat.",
        "Évente egyszer vizsgáld felül az óradíjad, vagy hamarabb, ha nőnek a költségeid.",
      ],
    },
    nota: {
      titulo: "Levél az óradíjról",
      uso: "Töltsd ki az ügyfél adataival, és küldd el az ajánlatoddal együtt.",
      pedido: "Megbeszélésünk alapján elküldöm a megállapodott szakmai szolgáltatások díját. Az óradíjam:",
      cierre: "Az óradíj fedezi a munkaidőt és a tevékenységem működési költségeit. Kérésre a teljes projektre szóló árajánlatot is készítek.",
    },
    escenarios: { titulo: "Más célzott jövedelmekhez", explica: "Ugyanez a számítás kisebb és nagyobb célzott jövedelemmel." },
  },
  "plan-sueldo": {
    nombre: "Bérkimutatás",
    tituloCorto: "bérkimutatás",
    paraQuien: "Hogy úgy tárgyalj a bérről, egy ajánlatról vagy egy emelésről, hogy tudod, mennyi ez óránként, havonta és évente",
    descripcion: [
      "PDF-kimutatás a béred számításának magyarázatával, a saját számaiddal és minden felhasznált értékkel.",
      "Tartalmaz egy táblázatot más összegekkel, hogy világos számokkal hasonlíthasd össze az ajánlatokat, vagy kérhess emelést.",
    ],
    gancho: "Számokkal a kezedben tárgyalj a béredről",
    incluye: [
      { titulo: "A teljes számításod", texto: "Minden értékkel, amelyet megadtál." },
      { titulo: "Más összegekkel", texto: "Hogy egy perc alatt összehasonlíts két ajánlatot." },
      { titulo: "Tanácsok a tárgyaláshoz", texto: "Mit mondj, és mit kérj a számon kívül." },
    ],
    pasos: {
      titulo: "Hogyan állapodj meg",
      items: [
        "Ha ajánlatokat hasonlítasz össze, éves vagy órára vetített összegekről beszélj: a havi számok elrejtik a különbséget.",
        "Kérj olyat is, ami nem bér: több szabadságot, otthoni munkát, képzést vagy jutalmat.",
        "Konkrét számmal és indoklással érkezz: a tapasztalatod, a piac vagy az, ami a munkádban megváltozott.",
      ],
    },
    escenarios: MAS_OSSZEGEK,
  },
  "kit-calculos": {
    nombre: "Számítás lépésről lépésre magyarázva",
    tituloCorto: "magyarázott számítás",
    paraQuien: "Hogy a számítás megoldva és elmagyarázva meglegyen, nyomtatásra, tanuláshoz vagy átadásra készen",
    descripcion: [
      "PDF-kimutatás a számításoddal, a megoldás menetével és az eredménnyel, a saját számaiddal.",
      "Használd tanuláshoz, a számítás nyilvántartásaként, vagy hogy valakinek további magyarázat nélkül megmutathasd.",
    ],
    gancho: "Vidd magaddal a számítást, lépésről lépésre elmagyarázva",
    incluye: [
      { titulo: "Megoldott számítás", texto: "A te adataiddal és az eredménnyel." },
      { titulo: "Hogyan számoljuk", texto: "Hogy lásd, honnan jön minden szám." },
      { titulo: "Nyomtatásra készen", texto: "Vagy PDF-ként mentve és megosztva." },
    ],
    pasos: {
      titulo: "Így ellenőrizd a számítást",
      items: ["Számold vissza: az eredménytől haladj vissza a kiinduló értékig.", "Csak a végén kerekíts: ha minden lépésben kerekítesz, megváltozik az eredmény."],
    },
    escenarios: MAS_OSSZEGEK,
  },
  "kit-gastos-grupo": {
    nombre: "Közös kiadások összesítése",
    tituloCorto: "kiadások összesítése",
    paraQuien: "Hogy mindenki tudja, mennyivel tartozik, vita és szalvétán számolgatás nélkül",
    descripcion: [
      "PDF-összesítés a közös számláról: a teljes összeg, mennyit fizet egy-egy ember, és ha kell, ki kinek tartozik.",
      "Küldd el a csoportos chatbe, vagy nyomtasd ki, hogy senkinek ne kelljen újraszámolnia.",
    ],
    gancho: "Oszd el a számlát világosan és vita nélkül",
    incluye: [
      { titulo: "Mennyit fizet egy-egy ember", texto: "A teljes összeggel és a részletekkel szem előtt." },
      { titulo: "Megosztásra készen", texto: "PDF-ben, hogy elküldhesd a többieknek." },
      { titulo: "Más teljes összegekkel", texto: "Arra az esetre, ha még valami kerül a számlára." },
    ],
    pasos: {
      titulo: "Hogyan számoljatok el",
      items: ["Küldd el az összesítést a többieknek, mielőtt bárki fizet: így elkerülitek a félreértéseket.", "Állapodjatok meg a fizetés módjában és a határidőben."],
    },
    escenarios: { titulo: "Más teljes összegekkel", explica: "Ugyanez a felosztás, ha a teljes összeg valamivel kisebb vagy nagyobb." },
  },
  "kit-estudio": {
    nombre: "Jegyátlag-kimutatás",
    tituloCorto: "jegyátlag-kimutatás",
    paraQuien: "Hogy világosan és írásban meglegyen az átlagod, minden jegy súlyával",
    descripcion: [
      "PDF-kimutatás az átlagoddal: minden jegy, a súlya, és hogyan jön ki az eredmény.",
      "Használd egy jegy ellenőrzéséhez, a következő vizsga megtervezéséhez, vagy hogy megmutasd a számítást annak, akinek szüksége van rá.",
    ],
    gancho: "Legyen meg írásban, hogyan jön ki az átlagod",
    incluye: [
      { titulo: "Minden jegy a súlyával", texto: "Hogy lásd, melyik számít a legtöbbet." },
      { titulo: "Számítás lépésről lépésre", texto: "Hogy ellenőrizhesd vagy megmutathasd." },
      { titulo: "Ötletek a következő vizsgához", texto: "Hogyan használd az átlagot a jobb szervezéshez." },
    ],
    pasos: {
      titulo: "A következő vizsgához",
      items: ["Nézd meg, melyik jegynek a legnagyobb a súlya, és arra a tárgyra vagy vizsgára szánj több időt.", "Ha úgy tűnik, hogy egy jegyet rosszul számoltak, mutasd meg ezt a kimutatást a tanárnak."],
    },
  },
  "kit-fechas": {
    nombre: "Dátumok és határidők kimutatása",
    tituloCorto: "dátumkimutatás",
    paraQuien: "Hogy a kiszámolt dátum vagy határidő írásban meglegyen, igazolásra készen, vagy hogy ne felejtsd el",
    descripcion: [
      "PDF-kimutatás a dátum számításával: a megadott dátumok, az eredmény, és hogyan számoltuk.",
      "Használd iratokhoz, szerződéshez, fizetési határidőhöz, vagy egyszerűen nyilvántartásként.",
    ],
    gancho: "Legyen meg írásban ez a dátum, igazolásra készen",
    incluye: [
      { titulo: "Elmagyarázott számítás", texto: "A dátumokkal, és azzal, hogyan számoljuk a napokat." },
      { titulo: "Igazolásra készen", texto: "Iratokhoz vagy egy szerződés mellékleteként." },
      { titulo: "A saját nyilvántartásodhoz", texto: "A készítés dátumával." },
    ],
    pasos: {
      titulo: "Mielőtt iratokban használod a dátumot",
      items: [
        "Nézd meg, hogy a határidő naptári vagy munkanapokban számít-e: ezen múlik az eredmény.",
        "Ellenőrizd, hogy az utolsó nap nem esik-e ünnepnapra vagy hétvégére.",
        "Írd be a végső dátumot a naptáradba, néhány nappal korábbi emlékeztetővel.",
      ],
    },
  },
  "plan-salud": {
    nombre: "BMI- és kalóriakimutatás",
    tituloCorto: "BMI- és kalóriakimutatás",
    paraQuien: "Hogy a testsúlyoddal és energiaszükségleteddel kapcsolatos értékeid írásban meglegyenek, és elvihesd őket az orvoshoz",
    descripcion: [
      "PDF-kimutatás az eredményed magyarázatával: mit mér, hogyan számoltuk, és melyik tartományba esik, a saját adataiddal.",
      "Általános tájékoztatás az egészségügyi szakemberrel folytatott beszélgetéshez. Nem diagnózis, és nem helyettesíti az orvosi vizsgálatot.",
    ],
    gancho: "Vidd el az értékeidet az orvoshoz, elmagyarázva és írásban",
    incluye: [
      { titulo: "Az eredményed magyarázattal", texto: "Mit mér, és hogyan számoltuk." },
      { titulo: "Kérdések az orvosnak", texto: "Hogy többet hozz ki a vizsgálatból." },
      { titulo: "A változások követéséhez", texto: "Minden kimutatást őrizz meg, és hasonlítsd össze őket az időben." },
    ],
    pasos: {
      titulo: "Hogyan beszélj róla szakemberrel",
      items: [
        "Vidd magaddal ezt a kimutatást, és kérdezd meg, milyen tartomány egészséges éppen neked, az életkorod és a kórtörténeted alapján.",
        "Mondd el, hogyan étkezel, mennyit mozogsz és hogyan alszol: a számok önmagukban nem mutatnak meg mindent.",
        "Ne változtass jelentősen az étrendeden vagy a mozgáson, amíg nem beszéltél szakemberrel.",
      ],
    },
    aviso: "Általános tájékoztatás. Nem helyettesíti az egészségügyi szakemberrel folytatott konzultációt.",
  },
  "plan-embarazo": {
    nombre: "Termékenységi és terhességi kimutatás",
    tituloCorto: "termékenységi és terhességi kimutatás",
    paraQuien: "Hogy az irányadó dátumok írásban meglegyenek, és elvihesd őket a következő vizsgálatra",
    descripcion: [
      "PDF-kimutatás az irányadó dátumokkal, és azzal, hogyan számoltuk ki mindegyiket a megadott adataidból.",
      "A dátumok tájékoztató jellegűek: minden test és minden terhesség más. Segítenek a szervezésben és az egészségügyi szakemberrel folytatott beszélgetésben, de a vizsgálatot nem helyettesítik.",
    ],
    gancho: "Legyenek meg írásban a dátumaid a következő vizsgálatig",
    incluye: [
      { titulo: "Az irányadó dátumaid", texto: "Azzal, hogyan számoltuk ki mindegyiket." },
      { titulo: "Kérdések a vizsgálatra", texto: "Hogy a legtöbbet hozd ki a látogatásból." },
      { titulo: "A saját nyilvántartásodhoz", texto: "A felhasznált adatokkal." },
    ],
    pasos: {
      titulo: "A következő vizsgálatra",
      items: [
        "Vidd magaddal ezt a kimutatást és az utolsó menstruációd első napjának dátumát.",
        "Kérdezd meg, milyen vizsgálatok szükségesek a terhességed jelenlegi hetében, és mikor lesz a következő vizsgálat.",
        "Ha bármilyen tünet aggaszt, fordulj orvoshoz, és ne várj a kimutatás dátumaira.",
      ],
    },
    aviso: "Általános tájékoztatás. A dátumok tájékoztató jellegűek, és nem helyettesítik az egészségügyi szakember ellátását.",
  },
  "plan-entrenamiento": {
    nombre: "Futótempó-kimutatás",
    tituloCorto: "tempókimutatás",
    paraQuien: "Hogy a célzott tempó ismeretében indulj edzésre, és tudd, hogyan oszd be az erődet",
    descripcion: [
      "PDF-kimutatás a tempód, az időd és a sebességed magyarázatával, a megadott adataidból.",
      "Tartalmazza a számítás teljes táblázatait és tanácsokat ahhoz, hogyan használd a tempót edzés közben.",
    ],
    gancho: "Legyen meg írásban a tempód a verseny napjára",
    incluye: [
      { titulo: "A tempód magyarázattal", texto: "Az idővel és a sebességgel." },
      { titulo: "Nyomtatható, magaddal viheted", texto: "A zsebedbe vagy a hűtőre." },
      { titulo: "Edzéstanácsok", texto: "Hogyan használd a tempót sérülés nélkül." },
    ],
    pasos: {
      titulo: "Hogyan használd a tempót",
      items: [
        "Az első perceket fusd egy kicsit lassabban a célzott tempónál: a célban meghálálja magát.",
        "A heti edzések nagy részét könnyű tempóban fusd, amelyben még beszélgetni is tudsz.",
        "Ha valami fáj, állj meg, és kérj tanácsot szakembertől: a tempó megvár.",
      ],
    },
    aviso: "Általános tájékoztatás. Nem helyettesíti az egészségügyi vagy sportszakemberrel folytatott konzultációt.",
  },
  "kit-viaje": {
    nombre: "Üzemanyag-költségvetés az utazáshoz",
    tituloCorto: "üzemanyag-költségvetés",
    paraQuien: "Hogy tudd, mennyit költesz üzemanyagra, és elosszátok az összeget mindenki között, aki utazik",
    descripcion: [
      "PDF-kimutatás az utad üzemanyagköltségével, a saját számaiddal: távolság, fogyasztás és ár.",
      "Tartalmaz egy táblázatot más üzemanyagárakkal arra az esetre, ha indulásig változnak, és egy listát az utazás többi kiadásáról.",
    ],
    gancho: "Legyen meg írásban az út költsége még indulás előtt",
    incluye: [
      { titulo: "Az út költsége", texto: "A távolsággal, a fogyasztással és az árral." },
      { titulo: "Más árak mellett", texto: "Arra az esetre, ha indulásig drágul az üzemanyag." },
      { titulo: "Lista az út többi részéhez", texto: "Útdíj, parkolás és étkezés." },
    ],
    pasos: {
      titulo: "Hogyan állítsd össze az út költségvetését",
      items: [
        "Az üzemanyag árához add hozzá az útdíjat, a parkolást és az étkezést.",
        "Ha többen utaztok, osszátok el a teljes összeget, és szólj mindenkinek még indulás előtt.",
        "Ellenőrizd a guminyomást: alacsony nyomású gumikkal az autó több üzemanyagot fogyaszt.",
      ],
    },
    escenarios: { titulo: "Más árak mellett", explica: "Ugyanez az út valamivel olcsóbb és valamivel drágább üzemanyaggal." },
  },
  "kit-hogar": {
    nombre: "Áramköltség-kimutatás",
    tituloCorto: "áramköltség-kimutatás",
    paraQuien: "Hogy tudd, mennyibe kerül az egyes készülékek használata, és hol lehet spórolni a villanyszámlán",
    descripcion: [
      "PDF-kimutatás arról, mennyibe kerül a készüléked, a saját használati adataiddal és az áram árával.",
      "Tartalmaz egy táblázatot más áramárakkal és egy listát ötletekkel a számla csökkentéséhez.",
    ],
    gancho: "Tudd meg, mennyibe kerül ez a készülék, és hogyan csökkentheted",
    incluye: [
      { titulo: "Költség a te használatod mellett", texto: "Lépésről lépésre elmagyarázva." },
      { titulo: "Más árak mellett", texto: "Arra az esetre, ha drágul a tarifa." },
      { titulo: "Spórolási ötletek", texto: "Azok, amelyek a legjobban látszanak a számlán." },
    ],
    pasos: {
      titulo: "Hogyan csökkentsd a számlát",
      items: [
        "A készenléti módban lévő készülékeket húzd ki a konnektorból: kikapcsolva is fogyasztanak áramot.",
        "A legnagyobb fogyasztású készülékeket a kedvezményes tarifájú időszakban kapcsold be, ha van ilyened.",
        "Vesd össze ezt a kimutatást a villanyszámláddal, hogy lásd, a teljes összeg mekkora része jut erre a készülékre.",
      ],
    },
    escenarios: { titulo: "Más árak mellett", explica: "Ugyanez a használat valamivel olcsóbb és valamivel drágább árammal." },
  },
  "kit-obra": {
    nombre: "Építőanyag-lista",
    tituloCorto: "anyaglista",
    paraQuien: "Hogy a megfelelő mennyiségben vedd meg az anyagot, ne hiányozzon semmi, és ne is maradjon",
    descripcion: [
      "PDF-kimutatás az anyagszükséglet számításával: méretek, mennyiségek, és hogyan számoltuk, a boltba vihető formában.",
      "Tartalmaz egy listát arról, hogyan vásárolj jól: ráhagyás a hulladékra, mit kérdezz meg, és mit ellenőrizz a munka megkezdése előtt.",
    ],
    gancho: "Az anyaglistával a kezedben menj a boltba",
    incluye: [
      { titulo: "Méretek és mennyiségek", texto: "Minden, amit kiszámoltál, egy oldalon." },
      { titulo: "Megmutathatod a boltban", texto: "Hogy pontosan azt számolják ki, amire szükséged van." },
      { titulo: "Lista a jó vásárláshoz", texto: "Ráhagyás a hulladékra, és mit ellenőrizz." },
    ],
    pasos: {
      titulo: "Vásárlás előtt",
      items: [
        "Számolj 5-10 százalék ráhagyással a vágási veszteségre és a törésre, bonyolult formáknál többel.",
        "Mindent ugyanabból a gyártási tételből vegyél: a szín és az árnyalat tételenként eltérhet.",
        "Kérdezz rá a választott anyag kiadósságára: gyártónként különbözik.",
        "Őrizd meg a blokkot és a bontatlan csomagokat: sok bolt visszaveszi őket.",
      ],
    },
  },
  "kit-facturacion": {
    nombre: "ÁFA- és forgalmiadó-kimutatás",
    tituloCorto: "ÁFA-kimutatás",
    paraQuien: "Hogy számlát állíthass ki, vagy ellenőrizhess egy árat világosan elkülönített adóval, a nyilvántartásodhoz vagy a könyvelődnek",
    descripcion: [
      "PDF-kimutatás a számításoddal: nettó ár, adó és bruttó végösszeg, az alkalmazandó adókulccsal és annak forrásával.",
      "Tartalmaz egy táblázatot más összegekkel, amely jól jön egy adóval és adó nélkül is feltüntetett árlista összeállításához.",
    ],
    gancho: "Legyen meg írásban az ár adóval és adó nélkül",
    incluye: [
      { titulo: "Az adó külön", texto: "Nettó összeg, adó és bruttó végösszeg a hatályos kulcs szerint." },
      { titulo: "Más összegekkel", texto: "Hogy egyszerre állítsd össze az árlistát." },
      { titulo: "A könyvelődnek", texto: "Az adókulcs forrásával és a dátummal." },
    ],
    pasos: {
      titulo: "Mielőtt kiállítod a számlát",
      items: [
        "Nézd meg, hogy a terméked vagy szolgáltatásod az általános vagy a kedvezményes adókulcs alá esik-e.",
        "Győződj meg róla, hogy a számla külön feltünteti az adóalapot és az adót, ha ez kötelező.",
        "Ezt a kimutatást a számlával együtt tedd el a nyilvántartásodba.",
      ],
    },
    escenarios: MAS_OSSZEGEK,
  },
  "informe-calculo": {
    nombre: "Számítási kimutatás",
    tituloCorto: "számítási kimutatás",
    paraQuien: "Hogy ez a számítás írásban meglegyen, a saját számaiddal, a feltételezésekkel és minden hivatalos érték forrásával",
    descripcion: [
      "PDF-kimutatás az imént elvégzett számításodról, lépésről lépésre a saját adataiddal: az eredmény, a feltételezések, amelyekre épül, és minden hivatalos érték a forrásával és az ellenőrzés dátumával.",
      "Tedd el az irataid közé, vagy add át a könyvelődnek, a munkáltatódnak vagy bárkinek, akinek ellenőriznie kell, anélkül hogy minden számot újra el kellene magyaráznod.",
    ],
    gancho: "Legyen meg írásban ez a számítás, forrásokkal",
    incluye: [
      { titulo: "Az eredményed", texto: "Pontosan úgy, ahogy kiszámoltad, nyomtatásra készen." },
      { titulo: "Hogyan jött ki", texto: "A lépések és a feltételezések, hogy minden szám visszakövethető legyen." },
      { titulo: "Hivatalos források", texto: "Minden érték az intézménnyel, a linkkel és az ellenőrzés dátumával." },
    ],
    pasos: {
      titulo: "Mielőtt felhasználod",
      items: [
        "Nézd meg, hogy a fenti adatok a tieid-e: az eredmény ezeken múlik.",
        "Ha egy hivatalos érték megváltozott, számold újra: a kimutatás a vásárlás napján hatályos értékeket használja.",
      ],
    },
  },
};

export const hu: DiccionarioVenta = {
  familias,
  general: { si: "Igen", no: "Nem" },
  tarjeta: {
    cejaInforme: "PDF-kimutatás",
    cejaPlanilla: "Excel-táblázat",
    pagoUnico: "egyszeri díj",
    comprarInforme: "Kérem a kimutatást",
    comprarPlanilla: "Kérem a táblázatot",
    confianza: "Fizetés PayPallal vagy bankkártyával. Ha nem veszed hasznát a kimutatásnak, 7 napon belül visszaadjuk a pénzed.",
    verDetalle: "Mit tartalmaz",
    tambien: "Ez is hasznos lehet:",
    tablasOficiales: "Hivatalos táblák",
    bajadaInforme: "A kimutatás lépésről lépésre bontja a számítást a saját számaiddal és minden érték forrásával, nyomtatásra vagy PDF-ként mentésre készen.",
    bajadaPlanilla: "A táblázat ezt a számítást tartalmazza a saját számaiddal és látható képletekkel, így bármit átírhatsz.",
    bajadaPlanillaHoja: "A táblázat ezt a számítást tartalmazza a saját számaiddal és látható képletekkel, így bármit átírhatsz. Munkalap: „{hoja}”.",
    equivale: "Mai árfolyamon nagyjából {monto}.",
    cobroDolares: "A fizetés amerikai dollárban történik.",
  },
  aviso: {
    pronto: "Hamarosan",
    titulo: "Szólj, ha elérhető",
    ayuda: "Csak egyszer írunk, amikor elindul az értékesítés.",
    boton: "Kérek értesítést",
    listo: "Kész. Amint elindul az értékesítés, írunk egy e-mailt.",
    error: "Nem sikerült elmenteni a címedet. Nézd meg, jól írtad-e, és próbáld újra.",
    correo: "Az e-mail-címed",
  },
  planilla: {
    gancho: "Vidd át ezt a számítást Excelbe, már kitöltött adatokkal",
    incluye: [
      { titulo: "Az adataid már ki vannak töltve", texto: "Írd át a sárga cellát, és minden újraszámolódik." },
      { titulo: "Bér, jutalom és kilépési elszámolás", texto: "Egyetlen fájlban, amelyet egész évben használhatsz." },
      { titulo: "Frissítés minden hivatalos változáskor", texto: "Ugyanazon a linken az új verzió, további fizetés nélkül." },
    ],
  },
  informe: {
    tusDatos: "Az adataid",
    resultado: "Eredmény",
    corregir: "Adataim javítása",
    actualizar: "Kimutatás frissítése",
    imprimir: "Nyomtatás vagy mentés PDF-ként",
    imprimirAyuda: "A nyomtatási ablakban válaszd a „Mentés PDF-ként” lehetőséget, és megkapod a fájlt.",
    sinResultado: "Töltsd ki az adataidat az „Adataim javítása” részben, és elkészül a kimutatás.",
    lugar: "Hely és dátum",
    destinatario: "Címzett",
    firma: "Aláírás",
    nombre: "Név",
    documento: "Személyazonosító okmány száma",
    etiquetaEnMinuscula: true,
    comoSeCalcula: "Hogyan számoljuk",
    fuentes: "Hivatalos források",
    verificado: "ellenőrizve:",
    emitido: "Kiállítás dátuma:",
    valores: "Hivatalos értékek hatálya:",
    numero: "Kimutatás száma:",
    elegir: "Válaszd ki a kimutatás számítását:",
    legal:
      "Ez a kimutatás becslés a feltüntetett szabályok és a megadott napon hatályos hivatalos értékek alapján. Nem helyettesíti szakember tanácsát vagy az illetékes hatóság döntését. Ha valamelyik adatod eltér, az eredmény is változik: javítsd ki, és nyomtasd ki újra a kimutatást.",
    legalSinFuentes: "Ez a kimutatás becslés a megadott adataid alapján, a feltüntetett napon. Nem helyettesíti szakember tanácsát. Ha valamelyik adat változik, az eredmény is változik: javítsd ki, és nyomtasd ki újra a kimutatást.",
    errorTitulo: "Nem sikerült megnyitni ezt a kimutatást",
    error: "Nem sikerült igazolni a linkhez tartozó fizetést. Ha a pénzt levonták a számládról, írj nekünk, és megoldjuk. Ha a vásárlás nem jött létre, megismételheted.",
    verificar: "Most nem sikerült ellenőrizni a fizetést. Próbáld újra néhány perc múlva: nem kell újra fizetned.",
    cupo: "Túl sok próbálkozás egymás után. Várj néhány percet, és nyisd meg újra a linket.",
  },
  // {normas} a «szerint» posposición delante («a munka törvénykönyve és az szja-törvény szerint») y
  // {incluye} va tras dos puntos, así que los dos quedan en nominativo.
  catalogo: {
    tituloProducto: "{nombre} ({pais})",
    disparadorInforme: "Valahányszor megváltozik egy hivatalos érték, amelyet a számítás használ",
    planillaDescripcion: "Kész Excel-táblázat: írd be az adataidat a sárga cellákba, és a számítás magától elkészül. A képletek alapja: {normas}.",
    planillaIncluye: "Tartalma: {incluye}. Minden munkalapon látszanak a lépések, a hivatalos táblák munkalapján pedig minden érték szerepel a forrásával és az ellenőrzésünk dátumával.",
  },
  planillas: {
    migaPlanillas: "Táblázatok és kimutatások",
    catalogoTitulo: "Táblázatok és kimutatások ({pais})",
    catalogoBajada: "Excel-táblázatok és PDF-kimutatások a saját számaiddal és az ország hivatalos adataival. Egyszeri díj, előfizetés nélkül.",
    seccionPlanillas: "Excel-táblázatok",
    seccionInformes: "PDF-kimutatások",
    catalogoVacio: "Ennek az országnak ({pais}) a táblázatain még dolgozunk. Addig a kalkulátorok ingyenesek.",
    verCalculadoras: "Kalkulátorok megtekintése",
    comprar: "Megveszem: {precio}",
    pronto: "Hamarosan",
    incluye: "Mit tartalmaz",
    incluyeInforme: [
      "Kimutatás a saját számaiddal egy oldalon, amelyet kinyomtathatsz vagy PDF-ként menthetsz.",
      "Lejárat nélküli link: az adataidat bármikor javíthatod, és újra kinyomtathatod a kimutatást.",
      "Ha nem veszed hasznát a kimutatásnak, 7 napon belül visszaadjuk a pénzed.",
    ],
    incluyePlanilla: [
      "Egy .xlsx fájl, amely Excelben és a Google Táblázatokban is megnyílik.",
      "Frissítés: {disparador}, frissítjük a táblázatot, és ugyanazon a linken letöltheted az új verziót.",
      "Ha nem veszed hasznát a táblázatnak, 7 napon belül visszaadjuk a pénzed.",
    ],
    pagoUnico: "Egyszeri fizetés PayPallal. Fizethetsz a PayPal-egyenlegedből vagy bankkártyával.",
    comprarPlanilla: "Vásárlás: {titulo}",
    comprarBajadaInforme: "Amint a fizetés megerősítést nyer, erre a címre küldjük a kimutatásod linkjét.",
    comprarBajadaPlanilla: "Amint a fizetés megerősítést nyer, erre a címre küldjük a táblázatot.",
    etiquetaEmail: "Az e-mail-címed",
    seguirPago: "Tovább a fizetéshez",
    privacidad: "A címedet csak a vásárlás és a frissítései elküldésére használjuk.",
    datosTitulo: "A számításod számaival",
    datosUsar: "A vásárlásomban ezeket a számokat szeretném használni. Csak a vásárlás elkészítéséhez tároljuk őket.",
    errores: {
      email: "Nézd meg az e-mail-címet: úgy tűnik, hiányzik belőle valami.",
      error: "Nem sikerült elindítani a fizetést. Semmit nem vontunk le. Próbáld újra néhány perc múlva.",
      cancelado: "Megszakítottad a fizetést. Semmit nem vontunk le.",
      fallido: "A PayPal nem erősítette meg a fizetést. Megpróbálhatod egy másik kártyával.",
      pronto: "Az értékesítés még nem indult el.",
    },
    graciasTitulo: "Köszönjük a vásárlást",
    graciasListoInforme: "A fizetés megerősítve. Már megnyithatod, amit vettél: {titulo}. A linket e-mailben is elküldtük, és nem jár le.",
    graciasListoPlanilla: "A fizetés megerősítve. Már letöltheted, amit vettél: {titulo}. E-mailben is elküldtük, egy lejárat nélküli linkkel.",
    graciasPendiente: "Várjuk a PayPal megerősítését. Amint megérkezik, e-mailben elküldjük, amit vettél.",
    muestraIntro: "Ez a munkalap azokkal a mintaadatokkal, amelyekkel megnyílik: „{hoja}”. A számítás mai, a hatályos hivatalos értékekkel.",
    muestraLeyenda: ["ezt te töltöd ki", "ezt a táblázat számolja"],
    comprobar: "Ellenőrizd fizetés előtt: az ingyenes kalkulátor ugyanazokat a számokat adja. Próbáld ki ugyanazt az esetet, és hasonlítsd össze.",
    comprobarEnlace: "Tovább az ingyenes kalkulátorhoz",
    faqTitulo: "Gyakori kérdések",
    faq: {
      sheets: {
        pregunta: "Működik a Google Táblázatokban és Excelben is?",
        respuesta: "Igen. Ez egy .xlsx fájl: Excelben és a Google Táblázatokban is megnyílik (töltsd fel a Drive-odra, és nyisd meg ott). A számítás szokásos képleteket használ, makrók nélkül.",
      },
      recibo: {
        pregunta: "Hogyan kapom meg?",
        respuesta: "Amint a fizetés megerősítést nyer, e-mailben elküldjük egy lejárat nélküli letöltési linkkel. A fizetés után megnyíló oldalról is letöltheted.",
      },
      dolares: {
        pregunta: "Amerikai dollárban kell fizetni?",
        respuesta: "Igen. Az ár amerikai dollárban (USD) van megadva, és PayPallal fizetsz, a PayPal-egyenlegedből vagy bankkártyával.",
        conReferencia: "Fent tájékoztatásul mutatjuk a hozzávetőleges összeget a saját pénznemedben, a mai árfolyamon: a végső összeg a bankod vagy a kártyád árfolyamától függ.",
        sinReferencia: "Ha a kártyád más pénznemben van, az átváltást a bankod végzi.",
      },
      devolucion: { pregunta: "Visszakaphatom a pénzem?", respuesta: "Igen. Ha nem veszed hasznát a táblázatnak, 7 napon belül válaszolj a vásárlásról szóló e-mailre, és visszaadjuk a pénzed." },
      actualiza: { pregunta: "Frissül, ha változnak a hivatalos értékek?", respuesta: "Igen. {disparador}, frissítjük a táblázatot, és ugyanazon a linken letöltheted az új verziót." },
    },
    descargar: "Táblázat letöltése (.xlsx)",
    abrirInforme: "Kimutatásom megnyitása",
    fuentes: "A felhasznált hivatalos források",
    calculadoras: "Ezekkel a kalkulátorokkal működik",
    muestra: "Így néz ki",
  },
  correo: {
    asuntoInforme: "Vásárlásod a CalcularYa oldalon: {titulo}",
    asuntoPlanilla: "{titulo}: letöltés és frissítések",
    mismosNumeros: "Ugyanezeket a számokat adja {enlace} is, a hivatalos adatokkal.",
    enlaceCalculadora: "a CalcularYa ingyenes kalkulátora",
    comprobante: "Ez a vásárlásod igazolása. Eladó: {marca}.",
    informe: {
      encabezado: "A kimutatásod megnyitható",
      intro: "Köszönjük a vásárlást ({titulo}). Itt nyithatod meg:",
      boton: "Kimutatásom megnyitása",
      abre: "A kimutatás a böngésződben nyílik meg. Onnan kinyomtathatod vagy PDF-ként mentheted.",
      guarda: "Őrizd meg ezt az e-mailt",
      vence: "A link a tiéd, és nem jár le. A kimutatás a vásárlás napján hatályos hivatalos értékeket használja, az adataidat pedig bármikor javíthatod, és újra kinyomtathatod a kimutatást.",
      devolucion: "Ha nem veszed hasznát a kimutatásnak, 7 napon belül válaszolj erre az e-mailre, és visszaadjuk a pénzed.",
      ayuda: "Gondod van? Válaszolj erre az e-mailre, vagy írj nekünk ide: {contacto}.",
    },
    planilla: {
      encabezado: "A táblázatod letölthető",
      intro: "Köszönjük a vásárlást ({titulo}). Itt töltheted le:",
      boton: "Táblázat letöltése (.xlsx)",
      abre: "Excelben és a Google Táblázatokban is megnyithatod.",
      guarda: "Őrizd meg ezt az e-mailt",
      vence: "A link a tiéd, és nem jár le. {disparador}, frissítjük a táblázatot, és ugyanazon a linken megkapod a friss verziót. Nem kell újra fizetned.",
      devolucion: "Ha nem veszed hasznát a táblázatnak, 7 napon belül válaszolj erre az e-mailre, és visszaadjuk a pénzed.",
      ayuda: "Gondod van? Válaszolj erre az e-mailre, vagy írj nekünk ide: {contacto}.",
    },
  },
};
