import type { DiccionarioLegal } from "./tipos";

// Checo (ADR 0002, D19): vykání con «vy» en minúscula y el imperativo cortés.
export const cs: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "O nás | CalcularYa",
      description: "CalcularYa vytváří kalkulačky pro práci, peníze a každodenní život v každé zemi, s čísly z oficiálních zdrojů.",
      h1: "O nás",
      bajada: "Kalkulačky pro každou zemi, každá s vlastními oficiálními údaji.",
      bloques: [
        {
          parrafos: [
            "CalcularYa je web s kalkulačkami pro běžné výpočty: mzda, úvěry, daně, data a mnoho dalšího.",
            "Vytváří ho Manuel Navarro, který provozuje také calcular.ar, web s kalkulačkami pro Argentinu.",
          ],
        },
        {
          titulo: "Jak pracujeme",
          parrafos: [
            "Když výpočet závisí na předpisu (minimální mzdě, sazbě pojistného, limitu), bereme hodnotu z oficiálního zdroje dané země: ze sbírky zákonů, z ministerstva, z centrální banky nebo z daňové správy.",
            "Ukládáme si odkaz a datum ověření a zobrazujeme je u každé kalkulačky.",
            "Pokud hodnotu nejde potvrdit v oficiálním zdroji, kalkulačka, která ji používá, se nezveřejní.",
            "Když se předpis změní, změní se s ním i kalkulačka a změnu zapíšeme do novinek dané země.",
          ],
        },
        { titulo: "Zdarma", parrafos: ["Kalkulačky jsou zdarma a nevyžadují účet."] },
      ],
    },
    contacto: {
      title: "Kontakt | CalcularYa",
      description: "Napište nám, pokud je některé číslo zastaralé, výsledek neodpovídá tomu, co jste čekali, nebo vám chybí kalkulačka či země.",
      h1: "Kontakt",
      bajada: `Náš e-mail: ${mail}.`,
      bloques: [
        {
          parrafos: [
            "Pomůže nám, když nám dáte vědět o zastaralém čísle, nečekaném výsledku nebo o kalkulačce či zemi, která chybí.",
            "Pokud jde o číslo, uveďte zemi a stránku, kde jste ho viděli.",
            "Odpovídá skutečný člověk. Může to trvat několik dní.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Ochrana osobních údajů | CalcularYa",
      description: "Jaké údaje CalcularYa používá: to, co zadáte do kalkulačky, se zpracuje ve vašem prohlížeči a neukládáme to.",
      h1: "Ochrana osobních údajů",
      bajada: `Poslední aktualizace: ${actualizado}.`,
      bloques: [
        {
          titulo: "Co zadáváte do kalkulačky",
          parrafos: ["Výpočet probíhá ve vašem prohlížeči. To, co zadáte, se neposílá na žádný server a neukládáme to."],
        },
        {
          titulo: "Vaše země",
          parrafos: [
            "Abychom vám nabídli kalkulačky správné země, zjišťujeme, z jaké země se připojujete. Náš poskytovatel hostingu to určí podle vaší IP adresy.",
            "Vaši IP adresu neukládáme. Odpověď zůstává ve vašem prohlížeči po dobu návštěvy.",
          ],
        },
        {
          titulo: "Co si ukládá váš prohlížeč",
          parrafos: [
            "Úložiště relace vašeho prohlížeče, které se vymaže, když zavřete kartu, si pamatuje zemi návštěvy, zda jste zavřeli upozornění, které ji nabízí, a pokud jste přišli přes sdílený odkaz, kód tohoto odkazu.",
            "Místní úložiště, které zůstává, dokud ho v prohlížeči nevymažete, uchovává zemi, kterou jste si sami vybrali, náhodné číslo pro počítání návštěv a verzi testu vzhledu, kterou vidíte, aby web vypadal stejně pokaždé, když se vrátíte. Nic z toho neprozrazuje, kdo jste.",
            "Nepoužíváme reklamní soubory cookie ani soubory cookie ke sledování.",
          ],
        },
        {
          titulo: "Webhosting",
          parrafos: ["Web běží na Vercelu. Jako každý server zaznamenává technické údaje o každé návštěvě (IP adresu a prohlížeč), aby web fungoval a byl zabezpečený."],
        },
        {
          titulo: "Jak počítáme návštěvy",
          parrafos: [
            "Používání webu měříme vlastním nástrojem: které stránky se otevírají a jak často, z jakého webu jste přišli, typ zařízení a zemi. Náhodné číslo, které si ukládá váš prohlížeč, odliší novou návštěvu od opakované. Neukládáme vaši IP adresu ani to, co zadáte do kalkulačky.",
            "Odkazy sdílené z webu obsahují náhodný kód, pokaždé jiný, abychom mohli spočítat, kolik návštěv každý přinese. Tento kód nikoho neidentifikuje.",
            "Částky, které zadáte do kalkulačky, nikdy neopustí váš prohlížeč jako součást odkazu.",
          ],
        },
        {
          titulo: "Změny a dotazy",
          parrafos: [
            "Pokud se něco z toho změní (například pokud přidáme reklamu), oznámíme to na této stránce dříve, než změna začne platit.",
            `S jakýmkoli dotazem k vašim údajům nám napište na ${mail}.`,
          ],
        },
        {
          titulo: "Mzdy, které sdílejí lidé",
          parrafos: [
            "Na stránce „Skutečné mzdy“ může kdokoli anonymně přidat mzdu, a to až poté, co zaškrtne výslovný souhlas. Ukládáme zemi, povolání (z pevného seznamu), rozmezí praxe, měsíční hrubou mzdu zaokrouhlenou na dvě platné číslice a měsíc. Neukládáme IP adresu, prohlížeč ani účet. Do aktualizace následujícího dne si navíc držíme den zadání a otisk připojení zašifrovaný klíčem, který se každý den mění a ze kterého nejde IP adresu obnovit; obojí se smaže, jakmile se den uzavře.",
            "Čísla zveřejňujeme jednou denně. Povolání se objeví, když má 10 a více záznamů zadaných v různé dny a nejméně ve dvou různých měsících. Zobrazujeme jen zaokrouhlený medián a rozpětí a počet záznamů v rozmezích, aby nikdo nemohl dopočítat mzdu konkrétního člověka porovnáním stránky ve dvou dnech. Jednotlivou mzdu nezobrazujeme nikdy.",
            "Aby se stejná země nepřidala dvakrát za měsíc, prohlížeč si v místním úložišti pamatuje zemi a měsíc záznamu, nikdy však částku.",
            "Protože záznam není s nikým spojený, nejde ho později dohledat a smazat.",
          ],
        },
      ],
    },
    terminos: {
      title: "Podmínky použití | CalcularYa",
      description: "Kalkulačky CalcularYa dávají orientační výsledek podle platných oficiálních údajů. Jde o vodítko, ne o odborné poradenství.",
      h1: "Podmínky použití",
      bajada: `Poslední aktualizace: ${actualizado}.`,
      bloques: [
        {
          titulo: "K čemu kalkulačky slouží",
          parrafos: [
            "Výsledky jsou orientační a vycházejí z platných oficiálních údajů. Používejte je jako vodítko.",
            "Nenahrazují výpočet zaměstnavatele, účetního nebo právníka ani stanovisko příslušného úřadu.",
          ],
        },
        {
          titulo: "Odkud jsou údaje",
          parrafos: [
            "Každá kalkulačka ukazuje oficiální zdroj svých hodnot a datum, kdy jsme je ověřili.",
            "Snažíme se je udržovat aktuální, ale předpis se může změnit dříve, než ho doplníme.",
          ],
        },
        {
          titulo: "Používání webu",
          parrafos: ["Web je zdarma. Můžete ho používat a sdílet jeho odkazy. Hromadné kopírování obsahu nebo vydávání se za CalcularYa není dovoleno."],
        },
        {
          titulo: "Odpovědnost",
          parrafos: ["Neodpovídáme za rozhodnutí učiněná jen na základě výsledku z tohoto webu. Než něco podepíšete, zaplatíte nebo uplatníte nárok, ověřte si čísla u příslušné osoby nebo úřadu."],
        },
        { titulo: "Kontakt", parrafos: [`Náš e-mail: ${mail}.`] },
      ],
    },
  },
});
