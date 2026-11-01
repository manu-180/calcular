import type { DiccionarioLegal } from "./tipos";

// Húngaro (ADR 0002, D21): tegezés sobria, como en el resto del sitio. La fecha de actualización ya
// termina en punto («2026. október 24.»), así que va al final sin otro punto.
export const hu: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "Rólunk | CalcularYa",
      description: "A CalcularYa kalkulátorokat készít munkához, pénzhez és a mindennapokhoz, minden országhoz, hivatalos forrásokból vett számokkal.",
      h1: "Rólunk",
      bajada: "Kalkulátorok minden országhoz, mindegyik a saját hivatalos adataival.",
      bloques: [
        {
          parrafos: [
            "A CalcularYa a hétköznapi számítások oldala: fizetés, hitel, adók, dátumok és még sok más.",
            "Manuel Navarro készíti, aki a calcular.ar oldalt is működteti, az argentin kalkulátorok oldalát.",
          ],
        },
        {
          titulo: "Hogyan dolgozunk",
          parrafos: [
            "Ha egy számítás jogszabálytól függ (minimálbér, járulékkulcs, értékhatár), az értéket az adott ország hivatalos forrásából vesszük: a hivatalos közlönyből, a minisztériumtól, a jegybanktól vagy az adóhatóságtól.",
            "Elmentjük a hivatkozást és az ellenőrzés dátumát, és mindkettőt megmutatjuk minden kalkulátor mellett.",
            "Ha egy értéket nem tudunk hivatalos forrásban megerősíteni, az azt használó kalkulátor nem jelenik meg.",
            "Ha egy jogszabály változik, a kalkulátor is vele változik, a változást pedig felírjuk az adott ország újdonságai közé.",
          ],
        },
        { titulo: "Ingyenes", parrafos: ["A kalkulátorok ingyenesek, és nem kell hozzájuk fiók."] },
      ],
    },
    contacto: {
      title: "Kapcsolat | CalcularYa",
      description: "Írj nekünk, ha egy szám elavult, ha egy eredmény nem az, amire számítottál, vagy ha hiányzik egy kalkulátor vagy egy ország.",
      h1: "Kapcsolat",
      bajada: `E-mail-címünk: ${mail}`,
      bloques: [
        {
          parrafos: [
            "Sokat segítesz, ha szólsz egy elavult számról, egy váratlan eredményről vagy egy hiányzó kalkulátorról vagy országról.",
            "Ha egy számról van szó, írd meg az országot és az oldalt, ahol láttad.",
            "Egy valódi ember válaszol. Ez néhány napig is eltarthat.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Adatvédelmi tájékoztató | CalcularYa",
      description: "Milyen adatokat használ a CalcularYa: amit a kalkulátorba írsz, azt a böngésződ dolgozza fel, és nem tároljuk.",
      h1: "Adatvédelmi tájékoztató",
      bajada: `Utolsó frissítés: ${actualizado}`,
      bloques: [
        {
          titulo: "Amit a kalkulátorba írsz",
          parrafos: ["A számítás a böngésződben fut. Amit beírsz, az nem kerül el semmilyen szerverre, és nem tároljuk."],
        },
        {
          titulo: "Az országod",
          parrafos: [
            "Hogy a megfelelő ország kalkulátorait kínáljuk, megnézzük, melyik országból csatlakozol. Ezt a tárhelyszolgáltatónk az IP-címed alapján állapítja meg.",
            "Az IP-címedet nem tároljuk. A válasz a látogatás idejére a böngésződben marad.",
          ],
        },
        {
          titulo: "Amit a böngésződ tárol",
          parrafos: [
            "A böngésző munkamenet-tárhelye, amely a lap bezárásakor törlődik, megjegyzi a látogatás országát, azt, hogy bezártad-e az ezt felajánló értesítést, és ha megosztott hivatkozáson keresztül érkeztél, a hivatkozás kódját.",
            "A helyi tárhely, amely addig marad, amíg ki nem törlöd a böngészőben, megőrzi az általad választott országot, egy véletlen számot a látogatások számlálásához és a megjelenési teszt változatát, amelyet látsz, hogy az oldal minden visszatéréskor ugyanúgy nézzen ki. Ezek egyike sem árulja el, ki vagy.",
            "Nem használunk reklám- vagy követő sütiket.",
          ],
        },
        {
          titulo: "Tárhely",
          parrafos: ["Az oldal a Vercelen fut. Mint minden szerver, minden látogatásról technikai adatokat rögzít (IP-cím és böngésző), hogy az oldal működjön és biztonságos legyen."],
        },
        {
          titulo: "Hogyan számoljuk a látogatásokat",
          parrafos: [
            "Az oldal használatát saját eszközzel mérjük: mely oldalakat nyitják meg és milyen gyakran, melyik oldalról érkeztél, milyen eszközt használsz és melyik országból jöttél. A böngésződ által tárolt véletlen szám különbözteti meg az új látogatást a visszatérőtől. Nem tároljuk sem az IP-címedet, sem azt, amit a kalkulátorba írsz.",
            "Az oldalról megosztott hivatkozások egy véletlen kódot tartalmaznak, minden alkalommal mást, hogy megszámolhassuk, mennyi látogatást hoz mindegyik. Ez a kód senkit sem azonosít.",
            "A kalkulátorba beírt összegek soha nem hagyják el a böngésződet egy hivatkozás részeként.",
          ],
        },
        {
          titulo: "Változások és kérdések",
          parrafos: [
            "Ha ezek közül bármi változik (például ha hirdetéseket vezetünk be), ezen az oldalon jelezzük, mielőtt a változás életbe lép.",
            `Ha bármilyen kérdésed van az adataiddal kapcsolatban, írj nekünk: ${mail}`,
          ],
        },
        {
          titulo: "Az emberek által megosztott fizetések",
          parrafos: [
            "A „Valódi fizetések” oldalon bárki névtelenül megadhat egy fizetést, de csak azután, hogy kifejezett hozzájárulását bejelölte. Tároljuk az országot, a foglalkozást (egy rögzített listából), a tapasztalati sávot, a havi bruttó fizetést két értékes jegyre kerekítve és a hónapot. Nem tároljuk az IP-címet, a böngészőt vagy a fiókot. A következő napi frissítésig emellett megőrizzük a bejegyzés napját és a kapcsolat egy olyan kulccsal titkosított ujjlenyomatát, amely minden nap változik, és amelyből az IP-cím nem állítható vissza. A nap lezárásakor mindkettő törlődik.",
            "A számokat naponta egyszer tesszük közzé. Egy foglalkozás akkor jelenik meg, ha legalább 10 bejegyzés van hozzá, különböző napokon és legalább két különböző hónapban megadva. Csak a kerekített mediánt és sávot, valamint a bejegyzések számát mutatjuk sávokban, hogy senki ne tudja kiszámolni egy adott ember fizetését az oldal két napi állapotának összevetésével. Egyetlen fizetést sem mutatunk soha külön.",
            "Hogy ugyanaz az ország egy hónapban ne kerüljön be kétszer, a böngésző a helyi tárhelyen megjegyzi a bejegyzés országát és hónapját, az összeget azonban soha.",
            "Mivel a bejegyzés senkihez sem kapcsolódik, később nem lehet megtalálni és törölni.",
          ],
        },
      ],
    },
    terminos: {
      title: "Felhasználási feltételek | CalcularYa",
      description: "A CalcularYa kalkulátorai az érvényes hivatalos adatok alapján tájékoztató eredményt adnak. Útmutatásnak szánjuk, nem szakmai tanácsadásnak.",
      h1: "Felhasználási feltételek",
      bajada: `Utolsó frissítés: ${actualizado}`,
      bloques: [
        {
          titulo: "Mire valók a kalkulátorok",
          parrafos: [
            "Az eredmények tájékoztató jellegűek, és az érvényes hivatalos adatokon alapulnak. Útmutatásként használd őket.",
            "Nem helyettesítik a munkáltatód, a könyvelőd vagy az ügyvéded számítását, sem az illetékes hivatal állásfoglalását.",
          ],
        },
        {
          titulo: "Honnan származnak az adatok",
          parrafos: [
            "Minden kalkulátor megmutatja az értékei hivatalos forrását és az ellenőrzés dátumát.",
            "Igyekszünk naprakészen tartani őket, de egy jogszabály változhat, mielőtt bevezetjük.",
          ],
        },
        {
          titulo: "Az oldal használata",
          parrafos: ["Az oldal ingyenes. Használhatod, és megoszthatod a hivatkozásait. A tartalom tömeges másolása és a CalcularYa nevében való fellépés nem megengedett."],
        },
        {
          titulo: "Felelősség",
          parrafos: ["Nem felelünk azokért a döntésekért, amelyeket kizárólag az oldal egy eredménye alapján hozol. Mielőtt aláírsz, fizetsz vagy igényt érvényesítesz, ellenőrizd a számokat az illetékes személlyel vagy hivatallal."],
        },
        { titulo: "Kapcsolat", parrafos: [`E-mail-címünk: ${mail}`] },
      ],
    },
  },
});
