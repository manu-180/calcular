import type { DiccionarioLegal } from "./tipos";

// Rumano (ADR 0002, D18): «dumneavoastră» implícito y la 2.ª del plural. Textos neutrales entre
// Rumania y Moldavia: no nombran una autoridad ni una ley de un solo país.
export const ro: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "Despre noi | CalcularYa",
      description: "CalcularYa face calculatoare pentru muncă, bani și viața de zi cu zi în fiecare țară, cu valori luate din surse oficiale.",
      h1: "Despre noi",
      bajada: "Calculatoare pentru fiecare țară, fiecare cu datele ei oficiale.",
      bloques: [
        {
          parrafos: [
            "CalcularYa este un site de calculatoare pentru socotelile de fiecare zi: salariu, credite, impozite, date calendaristice și multe altele.",
            "Îl face Manuel Navarro, care face și calcular.ar, un site de calculatoare pentru Argentina.",
          ],
        },
        {
          titulo: "Cum lucrăm",
          parrafos: [
            "Când un calcul depinde de o reglementare (un salariu minim, o cotă de contribuție, un plafon), citim valoarea în sursa oficială a țării: monitorul oficial, ministerul, banca centrală sau autoritatea fiscală.",
            "Păstrăm linkul și data la care am verificat-o și le afișăm pe amândouă lângă fiecare calculator.",
            "Dacă o valoare nu poate fi confirmată în sursa oficială, calculatorul care o folosește nu se publică.",
            "Când se schimbă o reglementare, se schimbă și calculatorul, iar schimbarea apare în noutățile fiecărei țări.",
          ],
        },
        { titulo: "Gratuit", parrafos: ["Calculatoarele sunt gratuite și nu cer un cont."] },
      ],
    },
    contacto: {
      title: "Contact | CalcularYa",
      description: "Scrieți-ne dacă o valoare nu mai este la zi, dacă un rezultat nu este cel așteptat sau dacă doriți un calculator ori o țară nouă.",
      h1: "Contact",
      bajada: `Adresa noastră de e-mail este ${mail}.`,
      bloques: [
        {
          parrafos: [
            "Ne ajută să aflăm când o valoare nu mai este la zi, când un rezultat nu este cel așteptat sau când lipsește un calculator ori o țară.",
            "Dacă este vorba de o valoare, menționați țara și pagina pe care ați văzut-o.",
            "Vă răspunde un om. Poate dura câteva zile.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Confidențialitate | CalcularYa",
      description: "Ce date folosește CalcularYa: ce introduceți într-un calculator se prelucrează în browser și nu păstrăm.",
      h1: "Confidențialitate",
      bajada: `Ultima actualizare: ${actualizado}.`,
      bloques: [
        {
          titulo: "Ce introduceți într-un calculator",
          parrafos: ["Calculul se face în browserul dumneavoastră. Ce introduceți nu se trimite la niciun server și nu păstrăm aceste date."],
        },
        {
          titulo: "Țara dumneavoastră",
          parrafos: [
            "Ca să vă propunem calculatoarele țării potrivite, aflăm din ce țară vine vizita. Furnizorul de găzduire o deduce din adresa IP.",
            "Nu păstrăm adresa IP. Răspunsul rămâne în browser pe durata vizitei.",
          ],
        },
        {
          titulo: "Ce păstrează browserul",
          parrafos: [
            "Stocarea de sesiune a browserului, care se golește când închideți fila, reține țara vizitei, dacă ați închis mesajul care o propune și, dacă ați ajuns printr-un link distribuit, codul acelui link.",
            "Stocarea locală, care rămâne până când o ștergeți din browser, păstrează țara pe care ați ales-o singuri, un număr aleatoriu folosit la numărarea vizitelor și varianta unui test de design care vi se afișează, ca site-ul să arate la fel de fiecare dată când reveniți. Nimic din toate acestea nu spune cine sunteți.",
            "Nu folosim cookie-uri de publicitate sau de urmărire.",
          ],
        },
        {
          titulo: "Găzduire",
          parrafos: ["Site-ul este găzduit pe Vercel. Ca orice server, înregistrează date tehnice pentru fiecare vizită (adresa IP și browserul), ca site-ul să funcționeze și să rămână sigur."],
        },
        {
          titulo: "Cum numărăm vizitele",
          parrafos: [
            "Măsurăm felul în care este folosit site-ul cu un instrument propriu: ce pagini se deschid și cât sunt folosite, de pe ce site ați venit, tipul de dispozitiv și țara. Numărul aleatoriu păstrat de browser deosebește o vizită nouă de una repetată. Nu păstrăm adresa IP și nici ce introduceți într-un calculator.",
            "Linkurile distribuite de pe site au un cod aleatoriu, diferit la fiecare distribuire, ca să putem număra câte vizite aduce fiecare. Codul nu identifică pe nimeni.",
            "Sumele pe care le introduceți într-un calculator nu ies niciodată din browser într-un link.",
          ],
        },
        {
          titulo: "Schimbări și întrebări",
          parrafos: [
            "Dacă ceva din toate acestea se schimbă (de exemplu, dacă adăugăm publicitate), o vom spune pe această pagină înainte să se aplice.",
            `Pentru orice întrebare despre datele dumneavoastră, scrieți-ne la ${mail}.`,
          ],
        },
        {
          titulo: "Salariile pe care le împărtășesc oamenii",
          parrafos: [
            "În „Salarii reale” oricine poate adăuga un salariu anonim, numai după ce bifează o căsuță de consimțământ explicit. Păstrăm țara, ocupația (dintr-o listă fixă), intervalul de experiență, salariul brut lunar rotunjit la două cifre semnificative și luna. Nu păstrăm adresa IP, browserul sau un cont. Până la actualizarea din ziua următoare păstrăm și ziua înregistrării și o amprentă a conexiunii, criptată cu o cheie care se schimbă zilnic și care nu poate fi transformată înapoi în adresa IP; amândouă se șterg la închiderea zilei.",
            "Cifrele se publică o dată pe zi. O ocupație apare când are cel puțin 10 înregistrări, făcute în mai multe zile și în cel puțin două luni diferite. Afișăm numai mediana și intervalul, rotunjite, iar numărul de înregistrări pe intervale, ca nimeni să nu poată afla salariul unei persoane comparând pagina din două zile. Nu se afișează niciodată un salariu individual.",
            "Ca să nu se adauge aceeași țară de două ori în aceeași lună, browserul păstrează în stocarea locală țara și luna înregistrării, niciodată suma.",
            "Pentru că o înregistrare nu este legată de nimeni, nu există o cale de a o găsi mai târziu ca să fie ștearsă.",
          ],
        },
      ],
    },
    terminos: {
      title: "Termeni de utilizare | CalcularYa",
      description: "Calculatoarele CalcularYa dau o estimare cu datele oficiale în vigoare. Sunt un reper, nu un sfat profesional.",
      h1: "Termeni de utilizare",
      bajada: `Ultima actualizare: ${actualizado}.`,
      bloques: [
        {
          titulo: "La ce folosesc calculatoarele",
          parrafos: [
            "Rezultatele sunt estimări făcute cu datele oficiale în vigoare. Folosiți-le ca reper.",
            "Nu înlocuiesc calculul unui angajator, al unui contabil sau al unui avocat și nici ce spune instituția oficială.",
          ],
        },
        {
          titulo: "De unde provin datele",
          parrafos: [
            "Fiecare calculator arată sursa oficială a valorilor sale și data la care le-am verificat.",
            "Facem tot ce putem ca să le ținem la zi, dar o reglementare se poate schimba înainte să o adăugăm.",
          ],
        },
        {
          titulo: "Folosirea site-ului",
          parrafos: ["Site-ul este gratuit. Îl puteți folosi și îi puteți distribui linkurile. Nu sunt permise copierea conținutului în masă și prezentarea în numele CalcularYa."],
        },
        {
          titulo: "Răspundere",
          parrafos: ["Nu răspundem pentru decizii luate numai pe baza unui rezultat de pe acest site. Înainte să semnați, să plătiți sau să depuneți o cerere, confirmați cifrele cu persoana sau instituția potrivită."],
        },
        { titulo: "Contact", parrafos: [`Adresa noastră de e-mail este ${mail}.`] },
      ],
    },
  },
});
