import type { DiccionarioLegal } from "./tipos";

// Eslovaco (ADR 0002, D25): vykanie con vy en minúscula y el imperativo cortés.
export const sk: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "O nás | CalcularYa",
      description: "CalcularYa vytvára kalkulačky pre prácu, peniaze a každodenný život v každej krajine, s číslami z oficiálnych zdrojov.",
      h1: "O nás",
      bajada: "Kalkulačky pre každú krajinu, každá s vlastnými oficiálnymi údajmi.",
      bloques: [
        {
          parrafos: [
            "CalcularYa je web s kalkulačkami na bežné výpočty: mzda, úvery, dane, dátumy a mnoho ďalšieho.",
            "Vytvára ho Manuel Navarro, ktorý prevádzkuje aj calcular.ar, web s kalkulačkami pre Argentínu.",
          ],
        },
        {
          titulo: "Ako pracujeme",
          parrafos: [
            "Keď výpočet závisí od predpisu (minimálnej mzdy, sadzby odvodov, limitu), berieme hodnotu z oficiálneho zdroja danej krajiny: zo zbierky zákonov, z ministerstva, z centrálnej banky alebo z daňovej správy.",
            "Ukladáme si odkaz a dátum overenia a zobrazujeme ich pri každej kalkulačke.",
            "Ak hodnotu nemožno potvrdiť v oficiálnom zdroji, kalkulačka, ktorá ju používa, sa nezverejní.",
            "Keď sa predpis zmení, zmení sa s ním aj kalkulačka a zmenu zapíšeme do noviniek danej krajiny.",
          ],
        },
        { titulo: "Zadarmo", parrafos: ["Kalkulačky sú zadarmo a nevyžadujú účet."] },
      ],
    },
    contacto: {
      title: "Kontakt | CalcularYa",
      description: "Napíšte nám, ak je niektoré číslo neaktuálne, výsledok nezodpovedá tomu, čo ste čakali, alebo vám chýba kalkulačka či krajina.",
      h1: "Kontakt",
      bajada: `Náš e-mail: ${mail}.`,
      bloques: [
        {
          parrafos: [
            "Pomôže nám, keď nám dáte vedieť o neaktuálnom čísle, neočakávanom výsledku alebo o kalkulačke či krajine, ktorá chýba.",
            "Ak ide o číslo, uveďte krajinu a stránku, kde ste ho videli.",
            "Odpovedá skutočný človek. Môže to trvať niekoľko dní.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Ochrana osobných údajov | CalcularYa",
      description: "Aké údaje CalcularYa používa: to, čo zadáte do kalkulačky, sa spracuje vo vašom prehliadači a neukladáme to.",
      h1: "Ochrana osobných údajov",
      bajada: `Posledná aktualizácia: ${actualizado}.`,
      bloques: [
        {
          titulo: "Čo zadávate do kalkulačky",
          parrafos: ["Výpočet prebieha vo vašom prehliadači. To, čo zadáte, sa neposiela na žiadny server a neukladáme to."],
        },
        {
          titulo: "Vaša krajina",
          parrafos: [
            "Aby sme vám ponúkli kalkulačky správnej krajiny, zisťujeme, z akej krajiny sa pripájate. Náš poskytovateľ hostingu to určí podľa vašej IP adresy.",
            "Vašu IP adresu neukladáme. Odpoveď zostáva vo vašom prehliadači počas návštevy.",
          ],
        },
        {
          titulo: "Čo si ukladá váš prehliadač",
          parrafos: [
            "Úložisko relácie vášho prehliadača, ktoré sa vymaže, keď zavriete kartu, si pamätá krajinu návštevy, či ste zavreli upozornenie, ktoré ju ponúka, a ak ste prišli cez zdieľaný odkaz, kód tohto odkazu.",
            "Miestne úložisko, ktoré zostáva, kým ho v prehliadači nevymažete, uchováva krajinu, ktorú ste si vybrali, náhodné číslo na počítanie návštev a verziu testu vzhľadu, ktorú vidíte, aby web vyzeral rovnako zakaždým, keď sa vrátite. Nič z toho neprezrádza, kto ste.",
            "Nepoužívame reklamné súbory cookie ani súbory cookie na sledovanie.",
          ],
        },
        {
          titulo: "Webhosting",
          parrafos: ["Web beží na Verceli. Ako každý server zaznamenáva technické údaje o každej návšteve (IP adresu a prehliadač), aby web fungoval a bol zabezpečený."],
        },
        {
          titulo: "Ako počítame návštevy",
          parrafos: [
            "Používanie webu meriame vlastným nástrojom: ktoré stránky sa otvárajú a ako často, z akého webu ste prišli, typ zariadenia a krajinu. Náhodné číslo, ktoré si ukladá váš prehliadač, odlíši novú návštevu od opakovanej. Neukladáme vašu IP adresu ani to, čo zadáte do kalkulačky.",
            "Odkazy zdieľané z webu obsahujú náhodný kód, zakaždým iný, aby sme mohli spočítať, koľko návštev každý prinesie. Tento kód nikoho neidentifikuje.",
            "Sumy, ktoré zadáte do kalkulačky, nikdy neopustia váš prehliadač ako súčasť odkazu.",
          ],
        },
        {
          titulo: "Zmeny a otázky",
          parrafos: [
            "Ak sa niečo z toho zmení (napríklad ak pridáme reklamu), oznámime to na tejto stránke skôr, než zmena začne platiť.",
            `S akoukoľvek otázkou k vašim údajom nám napíšte na ${mail}.`,
          ],
        },
        {
          titulo: "Mzdy, ktoré zdieľajú ľudia",
          parrafos: [
            "Na stránke „Skutočné mzdy“ môže ktokoľvek anonymne pridať mzdu, a to až po tom, ako zaškrtne výslovný súhlas. Ukladáme krajinu, povolanie (z pevného zoznamu), rozpätie praxe, mesačnú hrubú mzdu zaokrúhlenú na dve platné číslice a mesiac. Neukladáme IP adresu, prehliadač ani účet. Do aktualizácie nasledujúceho dňa si navyše držíme deň zadania a odtlačok pripojenia zašifrovaný kľúčom, ktorý sa každý deň mení a z ktorého nemožno IP adresu obnoviť; oboje sa vymaže, hneď ako sa deň uzavrie.",
            "Čísla zverejňujeme raz denne. Povolanie sa objaví, keď má 10 a viac záznamov zadaných v rôzne dni a najmenej v dvoch rôznych mesiacoch. Zobrazujeme iba zaokrúhlený medián a rozpätie a počet záznamov v rozpätiach, aby nikto nemohol dopočítať mzdu konkrétneho človeka porovnaním stránky v dvoch dňoch. Jednotlivú mzdu nezobrazujeme nikdy.",
            "Aby sa rovnaká krajina nepridala dvakrát za mesiac, prehliadač si v miestnom úložisku pamätá krajinu a mesiac záznamu, nikdy však sumu.",
            "Keďže záznam nie je s nikým spojený, nemožno ho neskôr dohľadať a vymazať.",
          ],
        },
      ],
    },
    terminos: {
      title: "Podmienky používania | CalcularYa",
      description: "Kalkulačky CalcularYa dávajú orientačný výsledok podľa platných oficiálnych údajov. Ide o pomôcku, nie o odborné poradenstvo.",
      h1: "Podmienky používania",
      bajada: `Posledná aktualizácia: ${actualizado}.`,
      bloques: [
        {
          titulo: "Na čo kalkulačky slúžia",
          parrafos: [
            "Výsledky sú orientačné a vychádzajú z platných oficiálnych údajov. Používajte ich ako pomôcku.",
            "Nenahrádzajú výpočet zamestnávateľa, účtovníka alebo právnika ani stanovisko príslušného úradu.",
          ],
        },
        {
          titulo: "Odkiaľ sú údaje",
          parrafos: [
            "Každá kalkulačka ukazuje oficiálny zdroj svojich hodnôt a dátum, kedy sme ich overili.",
            "Snažíme sa ich udržiavať aktuálne, ale predpis sa môže zmeniť skôr, než ho doplníme.",
          ],
        },
        {
          titulo: "Používanie webu",
          parrafos: ["Web je zadarmo. Môžete ho používať a zdieľať jeho odkazy. Hromadné kopírovanie obsahu alebo vydávanie sa za CalcularYa nie je dovolené."],
        },
        {
          titulo: "Zodpovednosť",
          parrafos: ["Nezodpovedáme za rozhodnutia urobené iba na základe výsledku z tohto webu. Skôr než niečo podpíšete, zaplatíte alebo uplatníte nárok, overte si čísla u príslušnej osoby alebo na úrade."],
        },
        { titulo: "Kontakt", parrafos: [`Náš e-mail: ${mail}.`] },
      ],
    },
  },
});
