import type { DiccionarioLegal } from "./tipos";

// Serbio en latinica y ekavski (ADR 0002, D23): «vi» en minúscula e imperativo de segunda del plural.
export const sr: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "O nama | CalcularYa",
      description: "CalcularYa pravi kalkulatore za posao, novac i svakodnevni život u svakoj zemlji, sa brojevima iz zvaničnih izvora.",
      h1: "O nama",
      bajada: "Kalkulatori za svaku zemlju, svaki sa svojim zvaničnim podacima.",
      bloques: [
        {
          parrafos: [
            "CalcularYa je sajt sa kalkulatorima za svakodnevne obračune: plata, krediti, porezi, datumi i mnogo toga još.",
            "Pravi ga Manuel Navarro, koji vodi i calcular.ar, sajt sa kalkulatorima za Argentinu.",
          ],
        },
        {
          titulo: "Kako radimo",
          parrafos: [
            "Kada obračun zavisi od propisa (minimalne zarade, stope doprinosa, nekog limita), vrednost uzimamo iz zvaničnog izvora te zemlje: iz službenog glasila, od ministarstva, centralne banke ili poreskog organa.",
            "Čuvamo link i datum provere i prikazujemo ih uz svaki kalkulator.",
            "Ako vrednost ne može da se potvrdi u zvaničnom izvoru, kalkulator koji je koristi se ne objavljuje.",
            "Kada se propis promeni, menja se i kalkulator, a promenu beležimo u novostima te zemlje.",
          ],
        },
        { titulo: "Besplatno", parrafos: ["Kalkulatori su besplatni i ne zahtevaju nalog."] },
      ],
    },
    contacto: {
      title: "Kontakt | CalcularYa",
      description: "Pišite nam ako je neki broj zastareo, ako rezultat nije ono što ste očekivali ili ako vam nedostaje kalkulator ili zemlja.",
      h1: "Kontakt",
      bajada: `Naša e-adresa: ${mail}.`,
      bloques: [
        {
          parrafos: [
            "Pomaže nam kada nam javite za zastareo broj, neočekivan rezultat ili kalkulator ili zemlju koja nedostaje.",
            "Ako se radi o broju, navedite zemlju i stranicu na kojoj ste ga videli.",
            "Odgovara stvarna osoba. Može da potraje nekoliko dana.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Zaštita podataka o ličnosti | CalcularYa",
      description: "Koje podatke CalcularYa koristi: ono što unesete u kalkulator obrađuje se u vašem pregledaču i ne čuvamo ga.",
      h1: "Zaštita podataka o ličnosti",
      bajada: `Poslednja izmena: ${actualizado}.`,
      bloques: [
        {
          titulo: "Šta unosite u kalkulator",
          parrafos: ["Obračun se radi u vašem pregledaču. Ono što unesete ne šalje se ni na jedan server i ne čuvamo ga."],
        },
        {
          titulo: "Vaša zemlja",
          parrafos: [
            "Da bismo vam ponudili kalkulatore prave zemlje, utvrđujemo iz koje zemlje se povezujete. Naš pružalac hostinga to određuje prema vašoj IP adresi.",
            "Vašu IP adresu ne čuvamo. Odgovor ostaje u vašem pregledaču tokom posete.",
          ],
        },
        {
          titulo: "Šta čuva vaš pregledač",
          parrafos: [
            "Skladište sesije vašeg pregledača, koje se briše kada zatvorite karticu, pamti zemlju posete, da li ste zatvorili obaveštenje koje je nudi i, ako ste došli preko podeljenog linka, kod tog linka.",
            "Lokalno skladište, koje ostaje dok ga ne obrišete u pregledaču, čuva zemlju koju ste sami izabrali, nasumičan broj za brojanje poseta i verziju testa izgleda koju vidite, da bi sajt izgledao isto svaki put kada se vratite. Ništa od toga ne otkriva ko ste.",
            "Ne koristimo kolačiće za oglašavanje ni kolačiće za praćenje.",
          ],
        },
        {
          titulo: "Hosting sajta",
          parrafos: ["Sajt radi na Vercelu. Kao i svaki server, beleži tehničke podatke o svakoj poseti (IP adresu i pregledač), da bi sajt radio i bio bezbedan."],
        },
        {
          titulo: "Kako brojimo posete",
          parrafos: [
            "Korišćenje sajta merimo sopstvenim alatom: koje se stranice otvaraju i koliko često, sa kog sajta ste došli, vrstu uređaja i zemlju. Nasumičan broj koji čuva vaš pregledač razlikuje novu posetu od ponovljene. Ne čuvamo vašu IP adresu ni ono što unesete u kalkulator.",
            "Linkovi podeljeni sa sajta sadrže nasumičan kod, svaki put drugačiji, da bismo izbrojali koliko poseta donosi svaki od njih. Taj kod nikoga ne identifikuje.",
            "Iznosi koje unesete u kalkulator nikada ne napuštaju vaš pregledač kao deo linka.",
          ],
        },
        {
          titulo: "Izmene i pitanja",
          parrafos: [
            "Ako se nešto od ovoga promeni (na primer, ako uvedemo oglase), objavićemo to na ovoj stranici pre nego što izmena počne da važi.",
            `Za svako pitanje o vašim podacima pišite nam na ${mail}.`,
          ],
        },
        {
          titulo: "Plate koje ljudi dele",
          parrafos: [
            "Na stranici „Stvarne plate“ svako može anonimno da doda svoju platu, i to tek kada označi izričitu saglasnost. Čuvamo zemlju, zanimanje (sa unapred zadate liste), raspon radnog iskustva, mesečnu bruto platu zaokruženu na dve značajne cifre i mesec. Ne čuvamo IP adresu, pregledač ni nalog. Do ažuriranja narednog dana čuvamo još i dan unosa i otisak veze šifrovan ključem koji se menja svakog dana i iz kog ne može da se povrati IP adresa; oboje se briše kada se dan zatvori.",
            "Brojeve objavljujemo jednom dnevno. Zanimanje se pojavljuje kada ima 10 ili više unosa iz različitih dana i iz najmanje dva različita meseca. Prikazujemo samo zaokruženu medijanu i raspon i broj unosa u rasponima, da niko ne bi mogao da izračuna platu određene osobe poređenjem stranice u dva dana. Pojedinačnu platu ne prikazujemo nikada.",
            "Da se ista zemlja ne bi dodala dva puta u istom mesecu, pregledač u lokalnom skladištu pamti zemlju i mesec unosa, ali nikada iznos.",
            "Pošto unos nije povezan ni sa kim, kasnije ne može da se pronađe i obriše.",
          ],
        },
      ],
    },
    terminos: {
      title: "Uslovi korišćenja | CalcularYa",
      description: "Kalkulatori CalcularYa daju informativan rezultat na osnovu važećih zvaničnih podataka. To je smernica, a ne stručni savet.",
      h1: "Uslovi korišćenja",
      bajada: `Poslednja izmena: ${actualizado}.`,
      bloques: [
        {
          titulo: "Čemu kalkulatori služe",
          parrafos: [
            "Rezultati su informativni i zasnovani na važećim zvaničnim podacima. Koristite ih kao smernicu.",
            "Ne zamenjuju obračun poslodavca, knjigovođe ili advokata, niti stav nadležnog organa.",
          ],
        },
        {
          titulo: "Odakle su podaci",
          parrafos: [
            "Svaki kalkulator prikazuje zvanični izvor svojih vrednosti i datum kada smo ih proverili.",
            "Trudimo se da ih održavamo ažurnim, ali propis može da se promeni pre nego što ga unesemo.",
          ],
        },
        {
          titulo: "Korišćenje sajta",
          parrafos: ["Sajt je besplatan. Možete da ga koristite i delite njegove linkove. Masovno kopiranje sadržaja ili predstavljanje u ime CalcularYa nije dozvoljeno."],
        },
        {
          titulo: "Odgovornost",
          parrafos: ["Ne odgovaramo za odluke donete samo na osnovu rezultata sa ovog sajta. Pre nego što nešto potpišete, platite ili zatražite neko pravo, proverite brojeve kod nadležne osobe ili organa."],
        },
        { titulo: "Kontakt", parrafos: [`Naša e-adresa: ${mail}.`] },
      ],
    },
  },
});
