import type { DiccionarioLegal } from "./tipos";

// Croata (ADR 0002, D27): «vi» en minúscula e imperativo de segunda del plural.
export const hr: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "O nama | CalcularYa",
      description: "CalcularYa izrađuje kalkulatore za posao, novac i svakodnevni život u svakoj zemlji, s brojevima iz službenih izvora.",
      h1: "O nama",
      bajada: "Kalkulatori za svaku zemlju, svaki sa svojim službenim podacima.",
      bloques: [
        {
          parrafos: [
            "CalcularYa je web-stranica s kalkulatorima za svakodnevne izračune: plaća, krediti, porezi, datumi i još mnogo toga.",
            "Izrađuje je Manuel Navarro, koji vodi i calcular.ar, stranicu s kalkulatorima za Argentinu.",
          ],
        },
        {
          titulo: "Kako radimo",
          parrafos: [
            "Kada izračun ovisi o propisu (minimalnoj plaći, stopi doprinosa, nekom ograničenju), vrijednost uzimamo iz službenog izvora te zemlje: iz službenog glasila, od ministarstva, središnje banke ili porezne uprave.",
            "Čuvamo poveznicu i datum provjere te ih prikazujemo uz svaki kalkulator.",
            "Ako se vrijednost ne može potvrditi u službenom izvoru, kalkulator koji je koristi ne objavljuje se.",
            "Kada se propis promijeni, mijenja se i kalkulator, a promjenu bilježimo u novostima te zemlje.",
          ],
        },
        { titulo: "Besplatno", parrafos: ["Kalkulatori su besplatni i ne zahtijevaju korisnički račun."] },
      ],
    },
    contacto: {
      title: "Kontakt | CalcularYa",
      description: "Pišite nam ako je neki broj zastario, ako rezultat nije ono što ste očekivali ili ako vam nedostaje kalkulator ili zemlja.",
      h1: "Kontakt",
      bajada: `Naša e-adresa: ${mail}.`,
      bloques: [
        {
          parrafos: [
            "Pomaže nam kada nam javite za zastario broj, neočekivan rezultat ili kalkulator ili zemlju koja nedostaje.",
            "Ako se radi o broju, navedite zemlju i stranicu na kojoj ste ga vidjeli.",
            "Odgovara stvarna osoba. Može potrajati nekoliko dana.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Zaštita osobnih podataka | CalcularYa",
      description: "Koje podatke CalcularYa koristi: ono što unesete u kalkulator obrađuje se u vašem pregledniku i ne čuvamo ga.",
      h1: "Zaštita osobnih podataka",
      bajada: `Posljednja izmjena: ${actualizado}.`,
      bloques: [
        {
          titulo: "Što unosite u kalkulator",
          parrafos: ["Izračun se radi u vašem pregledniku. Ono što unesete ne šalje se ni na jedan poslužitelj i ne čuvamo ga."],
        },
        {
          titulo: "Vaša zemlja",
          parrafos: [
            "Kako bismo vam ponudili kalkulatore prave zemlje, utvrđujemo iz koje se zemlje povezujete. Naš pružatelj hostinga to određuje prema vašoj IP adresi.",
            "Vašu IP adresu ne čuvamo. Odgovor ostaje u vašem pregledniku tijekom posjeta.",
          ],
        },
        {
          titulo: "Što čuva vaš preglednik",
          parrafos: [
            "Pohrana sesije vašeg preglednika, koja se briše kada zatvorite karticu, pamti zemlju posjeta, jeste li zatvorili obavijest koja je nudi i, ako ste došli preko podijeljene poveznice, kod te poveznice.",
            "Lokalna pohrana, koja ostaje dok je ne obrišete u pregledniku, čuva zemlju koju ste sami odabrali, nasumičan broj za brojanje posjeta i inačicu testa izgleda koju vidite, kako bi stranica izgledala jednako svaki put kada se vratite. Ništa od toga ne otkriva tko ste.",
            "Ne koristimo kolačiće za oglašavanje ni kolačiće za praćenje.",
          ],
        },
        {
          titulo: "Hosting stranice",
          parrafos: ["Stranica radi na Vercelu. Kao i svaki poslužitelj, bilježi tehničke podatke o svakom posjetu (IP adresu i preglednik), kako bi stranica radila i bila sigurna."],
        },
        {
          titulo: "Kako brojimo posjete",
          parrafos: [
            "Korištenje stranice mjerimo vlastitim alatom: koje se stranice otvaraju i koliko često, s koje ste stranice došli, vrstu uređaja i zemlju. Nasumičan broj koji čuva vaš preglednik razlikuje novi posjet od ponovljenog. Ne čuvamo vašu IP adresu ni ono što unesete u kalkulator.",
            "Poveznice podijeljene sa stranice sadrže nasumičan kod, svaki put drugačiji, kako bismo izbrojili koliko posjeta donosi svaka od njih. Taj kod nikoga ne identificira.",
            "Iznosi koje unesete u kalkulator nikada ne napuštaju vaš preglednik kao dio poveznice.",
          ],
        },
        {
          titulo: "Izmjene i pitanja",
          parrafos: [
            "Ako se nešto od ovoga promijeni (na primjer, ako uvedemo oglase), objavit ćemo to na ovoj stranici prije nego što izmjena počne vrijediti.",
            `Za svako pitanje o vašim podacima pišite nam na ${mail}.`,
          ],
        },
        {
          titulo: "Plaće koje ljudi dijele",
          parrafos: [
            "Na stranici „Stvarne plaće” svatko može anonimno dodati svoju plaću, i to tek kada označi izričitu privolu. Čuvamo zemlju, zanimanje (s unaprijed zadanog popisa), raspon radnog iskustva, mjesečnu bruto plaću zaokruženu na dvije značajne znamenke i mjesec. Ne čuvamo IP adresu, preglednik ni račun. Do ažuriranja sljedećeg dana čuvamo još i dan unosa i otisak veze šifriran ključem koji se mijenja svakog dana i iz kojeg se IP adresa ne može vratiti; oboje se briše kada se dan zatvori.",
            "Brojeve objavljujemo jednom dnevno. Zanimanje se pojavljuje kada ima 10 ili više unosa iz različitih dana i iz najmanje dva različita mjeseca. Prikazujemo samo zaokruženi medijan i raspon te broj unosa u rasponima, kako nitko ne bi mogao izračunati plaću određene osobe usporedbom stranice u dva dana. Pojedinačnu plaću ne prikazujemo nikada.",
            "Kako se ista zemlja ne bi dodala dvaput u istom mjesecu, preglednik u lokalnoj pohrani pamti zemlju i mjesec unosa, ali nikada iznos.",
            "Budući da unos nije povezan ni s kim, kasnije se ne može pronaći ni obrisati.",
          ],
        },
      ],
    },
    terminos: {
      title: "Uvjeti korištenja | CalcularYa",
      description: "Kalkulatori CalcularYa daju informativan rezultat na temelju važećih službenih podataka. To je smjernica, a ne stručni savjet.",
      h1: "Uvjeti korištenja",
      bajada: `Posljednja izmjena: ${actualizado}.`,
      bloques: [
        {
          titulo: "Čemu kalkulatori služe",
          parrafos: [
            "Rezultati su informativni i temelje se na važećim službenim podacima. Koristite ih kao smjernicu.",
            "Ne zamjenjuju izračun poslodavca, knjigovođe ili odvjetnika ni stav nadležnog tijela.",
          ],
        },
        {
          titulo: "Odakle su podaci",
          parrafos: [
            "Svaki kalkulator prikazuje službeni izvor svojih vrijednosti i datum kada smo ih provjerili.",
            "Trudimo se održavati ih ažurnima, ali propis se može promijeniti prije nego što ga unesemo.",
          ],
        },
        {
          titulo: "Korištenje stranice",
          parrafos: ["Stranica je besplatna. Možete je koristiti i dijeliti njezine poveznice. Masovno kopiranje sadržaja ili predstavljanje u ime CalcularYa nije dopušteno."],
        },
        {
          titulo: "Odgovornost",
          parrafos: ["Ne odgovaramo za odluke donesene samo na temelju rezultata s ove stranice. Prije nego što nešto potpišete, platite ili zatražite neko pravo, provjerite brojeve kod nadležne osobe ili tijela."],
        },
        { titulo: "Kontakt", parrafos: [`Naša e-adresa: ${mail}.`] },
      ],
    },
  },
});
