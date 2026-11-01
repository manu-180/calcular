import type { DiccionarioLegal } from "./tipos";

// Bosnio (ADR 0002, D39): «vi» en minúscula e imperativo de segunda del plural.
export const bs: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "O nama | CalcularYa",
      description: "CalcularYa izrađuje kalkulatore za posao, novac i svakodnevni život u svakoj zemlji, s brojevima iz službenih izvora.",
      h1: "O nama",
      bajada: "Kalkulatori za svaku zemlju, svaki sa svojim službenim podacima.",
      bloques: [
        {
          parrafos: [
            "CalcularYa je web-stranica s kalkulatorima za svakodnevne izračune: plata, krediti, porezi, datumi i još mnogo toga.",
            "Izrađuje je Manuel Navarro, koji vodi i calcular.ar, stranicu s kalkulatorima za Argentinu.",
          ],
        },
        {
          titulo: "Kako radimo",
          parrafos: [
            "Kada izračun ovisi o propisu (minimalnoj plati, stopi doprinosa, nekom ograničenju), vrijednost uzimamo iz službenog izvora te zemlje: iz službenog glasila, od ministarstva, središnje banke ili porezne uprave.",
            "Čuvamo link i datum provjere te ih prikazujemo uz svaki kalkulator.",
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
      title: "Zaštita ličnih podataka | CalcularYa",
      description: "Koje podatke CalcularYa koristi: ono što unesete u kalkulator obrađuje se u vašem pretraživaču i ne čuvamo ga.",
      h1: "Zaštita ličnih podataka",
      bajada: `Posljednja izmjena: ${actualizado}.`,
      bloques: [
        {
          titulo: "Šta unosite u kalkulator",
          parrafos: ["Izračun se radi u vašem pretraživaču. Ono što unesete ne šalje se ni na jedan server i ne čuvamo ga."],
        },
        {
          titulo: "Vaša zemlja",
          parrafos: [
            "Kako bismo vam ponudili kalkulatore prave zemlje, utvrđujemo iz koje se zemlje povezujete. Naš pružalac hostinga to određuje prema vašoj IP adresi.",
            "Vašu IP adresu ne čuvamo. Odgovor ostaje u vašem pretraživaču tokom posjeta.",
          ],
        },
        {
          titulo: "Šta čuva vaš pretraživač",
          parrafos: [
            "Čuvanje sesije vašeg pretraživača, koja se briše kada zatvorite karticu, pamti zemlju posjeta, da li ste zatvorili obavijest koja je nudi i, ako ste došli preko podijeljenog linka, kod tog linka.",
            "Lokalno čuvanje, koje ostaje dok je ne obrišete u pretraživaču, čuva zemlju koju ste sami izabrali, nasumičan broj za brojanje posjeta i verziju testa izgleda koju vidite, kako bi stranica izgledala jednako svaki put kada se vratite. Ništa od toga ne otkriva ko ste.",
            "Ne koristimo kolačiće za oglašavanje ni kolačiće za praćenje.",
          ],
        },
        {
          titulo: "Hosting stranice",
          parrafos: ["Stranica radi na Vercelu. Kao i svaki server, bilježi tehničke podatke o svakom posjetu (IP adresu i pretraživač), kako bi stranica radila i bila sigurna."],
        },
        {
          titulo: "Kako brojimo posjete",
          parrafos: [
            "Korištenje stranice mjerimo vlastitim alatom: koje se stranice otvaraju i koliko često, s koje ste stranice došli, vrstu uređaja i zemlju. Nasumičan broj koji čuva vaš pretraživač razlikuje novi posjet od ponovljenog. Ne čuvamo vašu IP adresu ni ono što unesete u kalkulator.",
            "Linkovi podijeljeni sa stranice sadrže nasumičan kod, svaki put drugačiji, kako bismo izbrojili koliko posjeta donosi svaka od njih. Taj kod nikoga ne identifikuje.",
            "Iznosi koje unesete u kalkulator nikada ne napuštaju vaš pretraživač kao dio linka.",
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
          titulo: "Plate koje ljudi dijele",
          parrafos: [
            "Na stranici „Stvarne plate” svako može anonimno dodati svoju platu, i to tek kada označi izričitu saglasnost. Čuvamo zemlju, zanimanje (s unaprijed zadanog popisa), raspon radnog iskustva, mjesečnu bruto platu zaokruženu na dvije značajne cifre i mjesec. Ne čuvamo IP adresu, pretraživač ni račun. Do ažuriranja sljedećeg dana čuvamo još i dan unosa i otisak veze šifriran ključem koji se mijenja svakog dana i iz kojeg se IP adresa ne može vratiti; oboje se briše kada se dan zatvori.",
            "Brojeve objavljujemo jednom dnevno. Zanimanje se pojavljuje kada ima 10 ili više unosa iz različitih dana i iz najmanje dva različita mjeseca. Prikazujemo samo zaokruženi medijan i raspon te broj unosa u rasponima, kako niko ne bi mogao izračunati platu određene osobe poređenjem stranice u dva dana. Pojedinačnu platu ne prikazujemo nikada.",
            "Kako se ista zemlja ne bi dodala dvaput u istom mjesecu, pretraživač u lokalnoj čuvanju pamti zemlju i mjesec unosa, ali nikada iznos.",
            "Budući da unos nije povezan ni s kim, kasnije se ne može pronaći ni obrisati.",
          ],
        },
      ],
    },
    terminos: {
      title: "Uslovi korištenja | CalcularYa",
      description: "Kalkulatori CalcularYa daju informativan rezultat na temelju važećih službenih podataka. To je smjernica, a ne stručni savjet.",
      h1: "Uslovi korištenja",
      bajada: `Posljednja izmjena: ${actualizado}.`,
      bloques: [
        {
          titulo: "Čemu kalkulatori služe",
          parrafos: [
            "Rezultati su informativni i temelje se na važećim službenim podacima. Koristite ih kao smjernicu.",
            "Ne zamjenjuju izračun poslodavca, knjigovođe ili advokata ni stav nadležnog tijela.",
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
          parrafos: ["Stranica je besplatna. Možete je koristiti i dijeliti njene linkove. Masovno kopiranje sadržaja ili predstavljanje u ime CalcularYa nije dozvoljeno."],
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
