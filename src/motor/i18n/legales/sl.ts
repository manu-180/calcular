import type { DiccionarioLegal } from "./tipos";

// Esloveno (ADR 0002, D32): «vi» en minúscula e imperativo de segunda del plural.
export const sl: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "O nas | CalcularYa",
      description: "CalcularYa izdeluje kalkulatorje za delo, denar in vsakdanje življenje v vsaki državi, s številkami iz uradnih virov.",
      h1: "O nas",
      bajada: "Kalkulatorji za vsako državo, vsak s svojimi uradnimi podatki.",
      bloques: [
        {
          parrafos: [
            "CalcularYa je spletna stran s kalkulatorji za vsakdanje izračune: plača, krediti, davki, datumi in še veliko več.",
            "Izdeluje jo Manuel Navarro, ki vodi tudi calcular.ar, stran s kalkulatorji za Argentino.",
          ],
        },
        {
          titulo: "Kako delamo",
          parrafos: [
            "Kadar je izračun odvisen od predpisa (minimalne plače, prispevne stopnje, kakšne omejitve), vrednost vzamemo iz uradnega vira te države: iz uradnega lista, od ministrstva, centralne banke ali davčne uprave.",
            "Hranimo povezavo in datum preverjanja ter ju prikažemo pri vsakem kalkulatorju.",
            "Če vrednosti ni mogoče potrditi v uradnem viru, kalkulator, ki jo uporablja, ni objavljen.",
            "Ko se predpis spremeni, se spremeni tudi kalkulator, spremembo pa zabeležimo med novostmi te države.",
          ],
        },
        { titulo: "Brezplačno", parrafos: ["Kalkulatorji so brezplačni in ne zahtevajo uporabniškega računa."] },
      ],
    },
    contacto: {
      title: "Kontakt | CalcularYa",
      description: "Pišite nam, če je kakšna številka zastarela, če rezultat ni takšen, kot ste pričakovali, ali če pogrešate kalkulator ali državo.",
      h1: "Kontakt",
      bajada: `Naš e-naslov: ${mail}.`,
      bloques: [
        {
          parrafos: [
            "V pomoč nam je, če nam sporočite zastarelo številko, nepričakovan rezultat ali kalkulator oziroma državo, ki manjka.",
            "Če gre za številko, navedite državo in stran, kjer ste jo videli.",
            "Odgovori resnična oseba. Lahko traja nekaj dni.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Varstvo osebnih podatkov | CalcularYa",
      description: "Katere podatke uporablja CalcularYa: kar vnesete v kalkulator, se obdela v vašem brskalniku in tega ne hranimo.",
      h1: "Varstvo osebnih podatkov",
      bajada: `Zadnja sprememba: ${actualizado}.`,
      bloques: [
        {
          titulo: "Kaj vnesete v kalkulator",
          parrafos: ["Izračun poteka v vašem brskalniku. Kar vnesete, se ne pošlje na noben strežnik in tega ne hranimo."],
        },
        {
          titulo: "Vaša država",
          parrafos: [
            "Da vam lahko ponudimo kalkulatorje prave države, ugotovimo, iz katere države se povezujete. Naš ponudnik gostovanja to določi po vašem naslovu IP.",
            "Vašega naslova IP ne hranimo. Odgovor med obiskom ostane v vašem brskalniku.",
          ],
        },
        {
          titulo: "Kaj hrani vaš brskalnik",
          parrafos: [
            "Shramba seje vašega brskalnika, ki se izbriše, ko zaprete zavihek, si zapomni državo obiska, ali ste zaprli obvestilo, ki jo ponuja, in, če ste prišli prek deljene povezave, kodo te povezave.",
            "Lokalna shramba, ki ostane, dokler je ne izbrišete v brskalniku, hrani državo, ki ste jo sami izbrali, naključno število za štetje obiskov in različico preizkusa videza, ki jo vidite, da je stran ob vsaki vrnitvi videti enako. Nič od tega ne razkrije, kdo ste.",
            "Ne uporabljamo piškotkov za oglaševanje ali sledenje.",
          ],
        },
        {
          titulo: "Gostovanje strani",
          parrafos: ["Stran deluje na Vercelu. Kot vsak strežnik beleži tehnične podatke o vsakem obisku (naslov IP in brskalnik), da stran deluje in je varna."],
        },
        {
          titulo: "Kako štejemo obiske",
          parrafos: [
            "Uporabo strani merimo z lastnim orodjem: katere strani se odpirajo in kako pogosto, s katere strani ste prišli, vrsto naprave in državo. Naključno število, ki ga hrani vaš brskalnik, loči nov obisk od ponovnega. Ne hranimo vašega naslova IP niti tega, kar vnesete v kalkulator.",
            "Povezave, deljene s strani, vsebujejo naključno kodo, vsakič drugo, da lahko preštejemo, koliko obiskov prinese vsaka od njih. Ta koda nikogar ne razkrije.",
            "Zneski, ki jih vnesete v kalkulator, nikoli ne zapustijo vašega brskalnika kot del povezave.",
          ],
        },
        {
          titulo: "Spremembe in vprašanja",
          parrafos: [
            "Če se kaj od tega spremeni (na primer, če uvedemo oglase), bomo to objavili na tej strani, preden sprememba začne veljati.",
            `Za vsako vprašanje o vaših podatkih nam pišite na ${mail}.`,
          ],
        },
        {
          titulo: "Plače, ki jih delijo ljudje",
          parrafos: [
            "Na strani „Dejanske plače“ lahko vsakdo anonimno doda svojo plačo, in to šele, ko označi izrecno privolitev. Hranimo državo, poklic (s prednastavljenega seznama), razpon delovnih izkušenj, mesečno bruto plačo, zaokroženo na dve pomembni števki, in mesec. Ne hranimo naslova IP, brskalnika ali računa. Do posodobitve naslednjega dne hranimo še dan vnosa in prstni odtis povezave, šifriran s ključem, ki se spreminja vsak dan in iz katerega naslova IP ni mogoče obnoviti; oboje se izbriše, ko se dan zaključi.",
            "Številke objavljamo enkrat na dan. Poklic se prikaže, ko ima 10 ali več vnosov iz različnih dni in iz vsaj dveh različnih mesecev. Prikazujemo samo zaokroženo mediano in razpon ter število vnosov v razponih, da nihče ne more izračunati plače določene osebe s primerjavo strani v dveh dneh. Posamezne plače ne prikazujemo nikoli.",
            "Da se ista država ne bi dodala dvakrat v istem mesecu, si brskalnik v lokalni shrambi zapomni državo in mesec vnosa, nikoli pa zneska.",
            "Ker vnos ni povezan z nikomer, ga pozneje ni mogoče najti ali izbrisati.",
          ],
        },
      ],
    },
    terminos: {
      title: "Pogoji uporabe | CalcularYa",
      description: "Kalkulatorji CalcularYa dajejo informativen rezultat na podlagi veljavnih uradnih podatkov. To je smernica, ne strokovni nasvet.",
      h1: "Pogoji uporabe",
      bajada: `Zadnja sprememba: ${actualizado}.`,
      bloques: [
        {
          titulo: "Čemu so namenjeni kalkulatorji",
          parrafos: [
            "Rezultati so informativni in temeljijo na veljavnih uradnih podatkih. Uporabljajte jih kot smernico.",
            "Ne nadomeščajo izračuna delodajalca, računovodje ali odvetnika niti stališča pristojnega organa.",
          ],
        },
        {
          titulo: "Od kod so podatki",
          parrafos: [
            "Vsak kalkulator prikazuje uradni vir svojih vrednosti in datum, ko smo jih preverili.",
            "Trudimo se, da so ažurni, vendar se lahko predpis spremeni, preden ga vnesemo.",
          ],
        },
        {
          titulo: "Uporaba strani",
          parrafos: ["Stran je brezplačna. Lahko jo uporabljate in delite njene povezave. Množično kopiranje vsebine ali predstavljanje v imenu CalcularYa ni dovoljeno."],
        },
        {
          titulo: "Odgovornost",
          parrafos: ["Ne odgovarjamo za odločitve, sprejete samo na podlagi rezultatov s te strani. Preden kaj podpišete, plačate ali uveljavljate kakšno pravico, preverite številke pri pristojni osebi ali organu."],
        },
        { titulo: "Kontakt", parrafos: [`Naš e-naslov: ${mail}.`] },
      ],
    },
  },
});
