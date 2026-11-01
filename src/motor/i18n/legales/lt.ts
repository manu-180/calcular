import type { DiccionarioLegal } from "./tipos";

// Lituano (ADR 0002, D29): «jūs» en minúscula y el imperativo de segunda del plural.
export const lt: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "Apie mus | CalcularYa",
      description: "CalcularYa kuria darbo, pinigų ir kasdienių reikalų skaičiuokles kiekvienai šaliai, su skaičiais iš oficialių šaltinių.",
      h1: "Apie mus",
      bajada: "Skaičiuoklės kiekvienai šaliai, kiekviena su savo oficialiais duomenimis.",
      bloques: [
        {
          parrafos: [
            "CalcularYa yra svetainė su kasdienių skaičiavimų skaičiuoklėmis: atlyginimas, paskolos, mokesčiai, datos ir daug kitų.",
            "Ją kuria Manuel Navarro, kuris taip pat prižiūri calcular.ar, skaičiuoklių svetainę Argentinai.",
          ],
        },
        {
          titulo: "Kaip dirbame",
          parrafos: [
            "Kai skaičiavimas priklauso nuo teisės akto (minimalaus atlyginimo, įmokos tarifo, ribos), reikšmę imame iš oficialaus tos šalies šaltinio: teisės aktų registro, ministerijos, centrinio banko arba mokesčių administratoriaus.",
            "Išsaugome nuorodą ir patikrinimo datą ir rodome jas prie kiekvienos skaičiuoklės.",
            "Jei reikšmės nepavyksta patvirtinti oficialiame šaltinyje, ją naudojanti skaičiuoklė neskelbiama.",
            "Kai teisės aktas pasikeičia, pasikeičia ir skaičiuoklė, o pakeitimą įrašome į tos šalies naujienas.",
          ],
        },
        { titulo: "Nemokamai", parrafos: ["Skaičiuoklės yra nemokamos, paskyros nereikia."] },
      ],
    },
    contacto: {
      title: "Kontaktai | CalcularYa",
      description: "Parašykite mums, jei kuris nors skaičius pasenęs, rezultatas ne toks, kokio tikėjotės, arba trūksta skaičiuoklės ar šalies.",
      h1: "Kontaktai",
      bajada: `Mūsų el. paštas: ${mail}.`,
      bloques: [
        {
          parrafos: [
            "Labai padėsite, jei pranešite apie pasenusį skaičių, netikėtą rezultatą arba trūkstamą skaičiuoklę ar šalį.",
            "Jei klausimas dėl skaičiaus, nurodykite šalį ir puslapį, kuriame jį matėte.",
            "Atsako tikras žmogus. Tai gali užtrukti kelias dienas.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Privatumas | CalcularYa",
      description: "Kokius duomenis naudoja CalcularYa: tai, ką įvedate į skaičiuoklę, apdorojama jūsų naršyklėje ir nesaugoma.",
      h1: "Privatumas",
      bajada: `Paskutinį kartą atnaujinta: ${actualizado}.`,
      bloques: [
        {
          titulo: "Ką įvedate į skaičiuoklę",
          parrafos: ["Skaičiuojama jūsų naršyklėje. Tai, ką įvedate, nesiunčiama į jokį serverį ir nesaugoma."],
        },
        {
          titulo: "Jūsų šalis",
          parrafos: [
            "Kad pasiūlytume tinkamos šalies skaičiuokles, nustatome, iš kurios šalies jungiatės. Tai pagal jūsų IP adresą nustato mūsų prieglobos paslaugų teikėjas.",
            "Jūsų IP adreso nesaugome. Atsakymas lieka jūsų naršyklėje apsilankymo metu.",
          ],
        },
        {
          titulo: "Ką išsaugo jūsų naršyklė",
          parrafos: [
            "Naršyklės seanso saugykla, kuri išvaloma uždarius kortelę, įsimena apsilankymo šalį, ar uždarėte ją siūlantį pranešimą ir, jei atėjote per bendrinamą nuorodą, tos nuorodos kodą.",
            "Vietinė saugykla, kuri lieka, kol jos neišvalote naršyklėje, saugo pačių pasirinktą šalį, atsitiktinį skaičių apsilankymams skaičiuoti ir dizaino bandymo versiją, kurią matote, kad svetainė atrodytų taip pat kiekvieną kartą grįžus. Niekas iš to neatskleidžia, kas esate.",
            "Nenaudojame reklaminių ar sekimo slapukų.",
          ],
        },
        {
          titulo: "Svetainės priegloba",
          parrafos: ["Svetainė veikia Vercel platformoje. Kaip ir bet kuris serveris, ji registruoja kiekvieno apsilankymo techninius duomenis (IP adresą ir naršyklę), kad svetainė veiktų ir būtų saugi."],
        },
        {
          titulo: "Kaip skaičiuojame apsilankymus",
          parrafos: [
            "Svetainės naudojimą matuojame savo įrankiu: kokie puslapiai atidaromi ir kaip dažnai, iš kokios svetainės atėjote, įrenginio tipą ir šalį. Atsitiktinis skaičius, kurį išsaugo jūsų naršyklė, atskiria naują apsilankymą nuo pakartotinio. Nesaugome nei jūsų IP adreso, nei to, ką įvedate į skaičiuoklę.",
            "Iš svetainės bendrinamose nuorodose yra atsitiktinis kodas, kaskart kitas, kad galėtume suskaičiuoti, kiek apsilankymų atneša kiekviena nuoroda. Šis kodas nieko neidentifikuoja.",
            "Į skaičiuoklę įvestos sumos niekada nepalieka jūsų naršyklės kaip nuorodos dalis.",
          ],
        },
        {
          titulo: "Pakeitimai ir klausimai",
          parrafos: [
            "Jei kas nors iš to pasikeis (pavyzdžiui, jei pridėsime reklamą), apie tai pranešime šiame puslapyje dar prieš įsigaliojant pakeitimui.",
            `Dėl bet kokio klausimo apie savo duomenis rašykite ${mail}.`,
          ],
        },
        {
          titulo: "Atlyginimai, kuriais dalijasi žmonės",
          parrafos: [
            "Puslapyje „Tikri atlyginimai“ kiekvienas gali anonimiškai pridėti atlyginimą, tik pažymėjęs aiškų sutikimą. Saugome šalį, profesiją (iš nustatyto sąrašo), patirties intervalą, mėnesinį atlyginimą „ant popieriaus“, suapvalintą iki dviejų reikšminių skaitmenų, ir mėnesį. Nesaugome nei IP adreso, nei naršyklės, nei paskyros. Iki kitos dienos atnaujinimo papildomai laikome įvedimo dieną ir ryšio atspaudą, užšifruotą kasdien besikeičiančiu raktu, iš kurio IP adreso atkurti neįmanoma; abu ištrinami, kai diena užbaigiama.",
            "Skaičius skelbiame kartą per dieną. Profesija pasirodo, kai ji turi bent 10 įrašų, įvestų skirtingomis dienomis ir bent dviem skirtingais mėnesiais. Rodome tik suapvalintą medianą, intervalą ir įrašų skaičių intervalais, kad niekas negalėtų apskaičiuoti konkretaus žmogaus atlyginimo, lygindamas puslapį dvi dienas. Pavienio atlyginimo nerodome niekada.",
            "Kad ta pati šalis nebūtų pridėta du kartus per mėnesį, naršyklė vietinėje saugykloje įsimena įrašo šalį ir mėnesį, bet niekada ne sumą.",
            "Kadangi įrašas su niekuo nesusietas, vėliau jo surasti ir ištrinti neįmanoma.",
          ],
        },
      ],
    },
    terminos: {
      title: "Naudojimo sąlygos | CalcularYa",
      description: "CalcularYa skaičiuoklės pateikia orientacinį rezultatą pagal galiojančius oficialius duomenis. Tai gairė, o ne profesionali konsultacija.",
      h1: "Naudojimo sąlygos",
      bajada: `Paskutinį kartą atnaujinta: ${actualizado}.`,
      bloques: [
        {
          titulo: "Kam skirtos skaičiuoklės",
          parrafos: [
            "Rezultatai yra orientaciniai ir paremti galiojančiais oficialiais duomenimis. Naudokite juos kaip gairę.",
            "Jie nepakeičia darbdavio, buhalterio ar teisininko skaičiavimo ir atsakingos institucijos nuomonės.",
          ],
        },
        {
          titulo: "Iš kur duomenys",
          parrafos: [
            "Kiekviena skaičiuoklė rodo savo reikšmių oficialų šaltinį ir patikrinimo datą.",
            "Stengiamės juos atnaujinti, bet teisės aktas gali pasikeisti anksčiau, nei jį įtrauksime.",
          ],
        },
        {
          titulo: "Svetainės naudojimas",
          parrafos: ["Svetainė yra nemokama. Galite ja naudotis ir dalytis jos nuorodomis. Masiškai kopijuoti turinį arba apsimesti CalcularYa draudžiama."],
        },
        {
          titulo: "Atsakomybė",
          parrafos: ["Neatsakome už sprendimus, priimtus remiantis vien šios svetainės rezultatu. Prieš ką nors pasirašydami, mokėdami ar reikšdami reikalavimą, pasitikrinkite skaičius pas atsakingą asmenį arba instituciją."],
        },
        { titulo: "Kontaktai", parrafos: [`Mūsų el. paštas: ${mail}.`] },
      ],
    },
  },
});
