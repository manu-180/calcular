import type { DiccionarioLegal } from "./tipos";

// Albanés (ADR 0002, D31): «ju» en minúscula con la 2.ª del plural. Textos neutrales: no nombran una
// autoridad ni una ley de un solo país.
export const sq: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "Rreth nesh | CalcularYa",
      description: "CalcularYa bën kalkulatorë për punën, paratë dhe jetën e përditshme në çdo vend, me vlera të marra nga burime zyrtare.",
      h1: "Rreth nesh",
      bajada: "Kalkulatorë për çdo vend, secili me të dhënat e veta zyrtare.",
      bloques: [
        {
          parrafos: [
            "CalcularYa është një faqe kalkulatorësh për llogaritjet e përditshme: paga, kredi, tatime, data dhe shumë të tjera.",
            "E bën Manuel Navarro, i cili bën edhe calcular.ar, një faqe kalkulatorësh për Argjentinën.",
          ],
        },
        {
          titulo: "Si punojmë",
          parrafos: [
            "Kur një llogaritje varet nga një rregull (një pagë minimale, një normë sigurimesh, një tavan), e lexojmë vlerën në burimin zyrtar të vendit: fletoren zyrtare, ministrinë, bankën qendrore ose administratën tatimore.",
            "Ruajmë lidhjen dhe datën kur e verifikuam dhe i shfaqim të dyja pranë çdo kalkulatori.",
            "Nëse një vlerë nuk mund të konfirmohet në burimin zyrtar, kalkulatori që e përdor nuk publikohet.",
            "Kur ndryshon një rregull, ndryshon edhe kalkulatori dhe ndryshimi shfaqet te të rejat e çdo vendi.",
          ],
        },
        { titulo: "Falas", parrafos: ["Kalkulatorët janë falas dhe nuk kërkojnë llogari."] },
      ],
    },
    contacto: {
      title: "Kontakt | CalcularYa",
      description: "Na shkruani nëse një vlerë nuk është më e përditësuar, nëse një rezultat nuk është ai që prisnit ose nëse dëshironi një kalkulator apo një vend të ri.",
      h1: "Kontakt",
      bajada: `Adresa jonë e e-mailit është ${mail}.`,
      bloques: [
        {
          parrafos: [
            "Na ndihmon të dimë kur një vlerë nuk është më e përditësuar, kur një rezultat nuk është ai që pritej ose kur mungon një kalkulator apo një vend.",
            "Nëse bëhet fjalë për një vlerë, tregoni vendin dhe faqen ku e patë.",
            "Ju përgjigjet një njeri. Mund të duhen disa ditë.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Privatësia | CalcularYa",
      description: "Cilat të dhëna përdor CalcularYa: ajo që vendosni në një kalkulator përpunohet në shfletues dhe nuk e ruajmë.",
      h1: "Privatësia",
      bajada: `Përditësimi i fundit: ${actualizado}.`,
      bloques: [
        {
          titulo: "Ajo që vendosni në një kalkulator",
          parrafos: ["Llogaritja bëhet në shfletuesin tuaj. Ajo që vendosni nuk dërgohet në asnjë server dhe këto të dhëna nuk i ruajmë."],
        },
        {
          titulo: "Vendi juaj",
          parrafos: [
            "Për t'ju propozuar kalkulatorët e vendit të duhur, marrim vesh nga cili vend vjen vizita. Ofruesi i strehimit e nxjerr nga adresa IP.",
            "Adresën IP nuk e ruajmë. Përgjigjja mbetet në shfletues gjatë vizitës.",
          ],
        },
        {
          titulo: "Çfarë ruan shfletuesi",
          parrafos: [
            "Hapësira e sesionit në shfletues, që zbrazet kur mbyllni skedën, mban vendin e vizitës, nëse e keni mbyllur mesazhin që e propozon dhe, nëse keni ardhur nga një lidhje e shpërndarë, kodin e asaj lidhjeje.",
            "Hapësira lokale, që mbetet derisa ta fshini nga shfletuesi, ruan vendin që keni zgjedhur vetë, një numër të rastësishëm për numërimin e vizitave dhe variantin e një prove dizajni që ju shfaqet, që faqja të duket njësoj sa herë ktheheni. Asgjë nga këto nuk tregon se kush jeni.",
            "Nuk përdorim cookies reklamash ose ndjekjeje.",
          ],
        },
        {
          titulo: "Strehimi",
          parrafos: ["Faqja strehohet në Vercel. Si çdo server, regjistron të dhëna teknike për çdo vizitë (adresën IP dhe shfletuesin), që faqja të funksionojë dhe të mbetet e sigurt."],
        },
        {
          titulo: "Si i numërojmë vizitat",
          parrafos: [
            "Mënyrën si përdoret faqja e matim me një mjet tonin: cilat faqe hapen dhe sa përdoren, nga cila faqe keni ardhur, llojin e pajisjes dhe vendin. Numri i rastësishëm që ruan shfletuesi dallon një vizitë të re nga një e përsëritur. Nuk ruajmë as adresën IP, as atë që vendosni në një kalkulator.",
            "Lidhjet e shpërndara nga faqja kanë një kod të rastësishëm, të ndryshëm në çdo shpërndarje, që të numërojmë sa vizita sjell secila. Kodi nuk identifikon askënd.",
            "Shumat që vendosni në një kalkulator nuk dalin kurrë nga shfletuesi në një lidhje.",
          ],
        },
        {
          titulo: "Ndryshime dhe pyetje",
          parrafos: [
            "Nëse ndryshon diçka nga këto (për shembull, nëse shtojmë reklama), do ta themi në këtë faqe para se të zbatohet.",
            `Për çdo pyetje rreth të dhënave tuaja, na shkruani në ${mail}.`,
          ],
        },
        {
          titulo: "Pagat që ndajnë njerëzit",
          parrafos: [
            "Te “Pagat reale” kushdo mund të shtojë një pagë në mënyrë anonime, vetëm pasi të shënojë një kuti pëlqimi të shprehur. Ruajmë vendin, profesionin (nga një listë e caktuar), intervalin e përvojës, pagën bruto mujore të rrumbullakosur në dy shifra domethënëse dhe muajin. Nuk ruajmë adresën IP, shfletuesin ose një llogari. Deri në përditësimin e ditës pasardhëse ruajmë edhe ditën e regjistrimit dhe një gjurmë të lidhjes, të koduar me një çelës që ndryshon çdo ditë dhe që nuk mund të kthehet në adresën IP; të dyja fshihen në mbyllje të ditës.",
            "Shifrat publikohen një herë në ditë. Një profesion shfaqet kur ka të paktën 10 regjistrime, të bëra në disa ditë dhe në të paktën dy muaj të ndryshëm. Shfaqim vetëm medianën dhe intervalin, të rrumbullakosura, dhe numrin e regjistrimeve sipas intervaleve, që askush të mos mund të nxjerrë pagën e një personi duke krahasuar faqen e dy ditëve. Nuk shfaqet kurrë një pagë individuale.",
            "Që i njëjti vend të mos shtohet dy herë në të njëjtin muaj, shfletuesi ruan në hapësirën lokale vendin dhe muajin e regjistrimit, kurrë shumën.",
            "Meqë një regjistrim nuk lidhet me askënd, nuk ka mënyrë për ta gjetur më vonë që të fshihet.",
          ],
        },
      ],
    },
    terminos: {
      title: "Kushtet e përdorimit | CalcularYa",
      description: "Kalkulatorët e CalcularYa japin një përllogaritje me të dhënat zyrtare në fuqi. Janë një orientim, jo një këshillë profesionale.",
      h1: "Kushtet e përdorimit",
      bajada: `Përditësimi i fundit: ${actualizado}.`,
      bloques: [
        {
          titulo: "Për çfarë shërbejnë kalkulatorët",
          parrafos: [
            "Rezultatet janë përllogaritje të bëra me të dhënat zyrtare në fuqi. Përdorini si orientim.",
            "Nuk zëvendësojnë llogaritjen e një punëdhënësi, të një kontabilisti ose të një avokati, as atë që thotë institucioni zyrtar.",
          ],
        },
        {
          titulo: "Nga vijnë të dhënat",
          parrafos: [
            "Çdo kalkulator tregon burimin zyrtar të vlerave të tij dhe datën kur i verifikuam.",
            "Bëjmë çmos t'i mbajmë të përditësuara, por një rregull mund të ndryshojë para se ta shtojmë.",
          ],
        },
        {
          titulo: "Përdorimi i faqes",
          parrafos: ["Faqja është falas. Mund ta përdorni dhe të shpërndani lidhjet e saj. Nuk lejohen kopjimi masiv i përmbajtjes dhe paraqitja në emër të CalcularYa."],
        },
        {
          titulo: "Përgjegjësia",
          parrafos: ["Nuk mbajmë përgjegjësi për vendime të marra vetëm mbi bazën e një rezultati nga kjo faqe. Para se të nënshkruani, të paguani ose të paraqitni një kërkesë, konfirmoni shifrat me personin ose institucionin e duhur."],
        },
        { titulo: "Kontakt", parrafos: [`Adresa jonë e e-mailit është ${mail}.`] },
      ],
    },
  },
});
