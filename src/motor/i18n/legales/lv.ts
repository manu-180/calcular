import type { DiccionarioLegal } from "./tipos";

// Letón (ADR 0002, D35): «jūs» en minúscula y el imperativo de segunda del plural.
export const lv: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "Par mums | CalcularYa",
      description: "CalcularYa veido kalkulatorus darbam, naudai un ikdienai katrai valstij, ar skaitļiem no oficiāliem avotiem.",
      h1: "Par mums",
      bajada: "Kalkulatori katrai valstij, katrs ar saviem oficiālajiem datiem.",
      bloques: [
        {
          parrafos: [
            "CalcularYa ir vietne ar kalkulatoriem ikdienas aprēķiniem: alga, kredīti, nodokļi, datumi un daudz kas cits.",
            "To veido Manuel Navarro, kurš uztur arī calcular.ar, kalkulatoru vietni Argentīnai.",
          ],
        },
        {
          titulo: "Kā mēs strādājam",
          parrafos: [
            "Ja aprēķins ir atkarīgs no normatīvā akta (minimālās algas, iemaksu likmes, robežas), vērtību ņemam no attiecīgās valsts oficiālā avota: likumu reģistra, ministrijas, centrālās bankas vai nodokļu administrācijas.",
            "Saglabājam saiti un pārbaudes datumu un rādām tos pie katra kalkulatora.",
            "Ja vērtību oficiālā avotā apstiprināt neizdodas, kalkulators, kas to izmanto, netiek publicēts.",
            "Kad normatīvais akts mainās, mainās arī kalkulators, un izmaiņu ierakstām attiecīgās valsts jaunumos.",
          ],
        },
        { titulo: "Bez maksas", parrafos: ["Kalkulatori ir bez maksas, konts nav vajadzīgs."] },
      ],
    },
    contacto: {
      title: "Kontakti | CalcularYa",
      description: "Rakstiet mums, ja kāds skaitlis ir novecojis, rezultāts nav tāds, kādu gaidījāt, vai trūkst kalkulatora vai valsts.",
      h1: "Kontakti",
      bajada: `Mūsu e-pasts: ${mail}.`,
      bloques: [
        {
          parrafos: [
            "Ļoti palīdzēsiet, ja paziņosiet par novecojušu skaitli, negaidītu rezultātu vai trūkstošu kalkulatoru vai valsti.",
            "Ja jautājums ir par skaitli, norādiet valsti un lapu, kurā to redzējāt.",
            "Atbild īsts cilvēks. Tas var aizņemt dažas dienas.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Privātums | CalcularYa",
      description: "Kādus datus izmanto CalcularYa: tas, ko ievadāt kalkulatorā, tiek apstrādāts jūsu pārlūkprogrammā un netiek glabāts.",
      h1: "Privātums",
      bajada: `Pēdējo reizi atjaunināts: ${actualizado}.`,
      bloques: [
        {
          titulo: "Ko ievadāt kalkulatorā",
          parrafos: ["Aprēķins notiek jūsu pārlūkprogrammā. Tas, ko ievadāt, netiek sūtīts uz serveri un netiek glabāts."],
        },
        {
          titulo: "Jūsu valsts",
          parrafos: [
            "Lai piedāvātu pareizās valsts kalkulatorus, nosakām, no kuras valsts pieslēdzaties. To pēc jūsu IP adreses nosaka mūsu mitināšanas pakalpojumu sniedzējs.",
            "Jūsu IP adresi neglabājam. Atbilde apmeklējuma laikā paliek jūsu pārlūkprogrammā.",
          ],
        },
        {
          titulo: "Ko saglabā jūsu pārlūkprogramma",
          parrafos: [
            "Pārlūkprogrammas sesijas krātuve, kas tiek notīrīta, aizverot cilni, atceras apmeklējuma valsti, to, vai aizvērāt paziņojumu, kas to piedāvā, un, ja atnācāt pa kopīgotu saiti, šīs saites kodu.",
            "Lokālā krātuve, kas paliek, līdz to notīrāt pārlūkprogrammā, glabā pašu izvēlēto valsti, nejaušu skaitli apmeklējumu uzskaitei un dizaina izmēģinājuma versiju, ko redzat, lai vietne izskatītos vienādi katru reizi, kad atgriežaties. Nekas no tā neatklāj, kas jūs esat.",
            "Neizmantojam reklāmas vai izsekošanas sīkdatnes.",
          ],
        },
        {
          titulo: "Vietnes mitināšana",
          parrafos: ["Vietne darbojas Vercel platformā. Tāpat kā jebkurš serveris, tā reģistrē katra apmeklējuma tehniskos datus (IP adresi un pārlūkprogrammu), lai vietne darbotos un būtu droša."],
        },
        {
          titulo: "Kā uzskaitām apmeklējumus",
          parrafos: [
            "Vietnes lietojumu mērām ar savu rīku: kuras lapas tiek atvērtas un cik bieži, no kuras vietnes atnācāt, ierīces veidu un valsti. Nejaušais skaitlis, ko saglabā jūsu pārlūkprogramma, atšķir jaunu apmeklējumu no atkārtota. Neglabājam ne jūsu IP adresi, ne to, ko ievadāt kalkulatorā.",
            "Saitēs, ko kopīgo no vietnes, ir nejaušs kods, katru reizi cits, lai varētu saskaitīt, cik apmeklējumu atnes katra saite. Šis kods neko neidentificē.",
            "Kalkulatorā ievadītās summas nekad neatstāj jūsu pārlūkprogrammu kā saites daļa.",
          ],
        },
        {
          titulo: "Izmaiņas un jautājumi",
          parrafos: [
            "Ja kaut kas no tā mainīsies (piemēram, ja pievienosim reklāmu), par to paziņosim šajā lapā vēl pirms izmaiņu stāšanās spēkā.",
            `Par jebkuru jautājumu saistībā ar saviem datiem rakstiet uz ${mail}.`,
          ],
        },
        {
          titulo: "Algas, ar kurām dalās cilvēki",
          parrafos: [
            "Lapā „Reālās algas“ ikviens var anonīmi pievienot algu, tikai atzīmējot skaidru piekrišanu. Glabājam valsti, profesiju (no noteikta saraksta), pieredzes intervālu, mēneša bruto algu, noapaļotu līdz diviem nozīmīgajiem cipariem, un mēnesi. Neglabājam ne IP adresi, ne pārlūkprogrammu, ne kontu. Līdz nākamās dienas atjauninājumam papildus turam ievades dienu un savienojuma nospiedumu, kas šifrēts ar katru dienu mainīgu atslēgu un no kura IP adresi atjaunot nav iespējams; abi tiek dzēsti, kad diena noslēgta.",
            "Skaitļus publicējam reizi dienā. Profesija parādās, kad tai ir vismaz 10 ierakstu, kas ievadīti dažādās dienās un vismaz divos dažādos mēnešos. Rādām tikai noapaļotu mediānu, intervālu un ierakstu skaitu intervālos, lai neviens nevarētu aprēķināt konkrēta cilvēka algu, salīdzinot lapu divās dienās. Atsevišķu algu nerādām nekad.",
            "Lai to pašu valsti nepievienotu divreiz mēnesī, pārlūkprogramma lokālajā krātuvē atceras ieraksta valsti un mēnesi, bet nekad summu.",
            "Tā kā ieraksts nav ne ar ko saistīts, vēlāk to atrast un dzēst nav iespējams.",
          ],
        },
      ],
    },
    terminos: {
      title: "Lietošanas noteikumi | CalcularYa",
      description: "CalcularYa kalkulatori sniedz orientējošu rezultātu pēc spēkā esošajiem oficiālajiem datiem. Tas ir atskaites punkts, nevis profesionāla konsultācija.",
      h1: "Lietošanas noteikumi",
      bajada: `Pēdējo reizi atjaunināts: ${actualizado}.`,
      bloques: [
        {
          titulo: "Kam domāti kalkulatori",
          parrafos: [
            "Rezultāti ir orientējoši un balstīti uz spēkā esošiem oficiāliem datiem. Izmantojiet tos kā atskaites punktu.",
            "Tie neaizstāj darba devēja, grāmatveža vai jurista aprēķinu un atbildīgās iestādes viedokli.",
          ],
        },
        {
          titulo: "No kurienes ir dati",
          parrafos: [
            "Katrs kalkulators rāda savu vērtību oficiālo avotu un pārbaudes datumu.",
            "Cenšamies tos atjaunināt, taču normatīvais akts var mainīties ātrāk, nekā to iekļausim.",
          ],
        },
        {
          titulo: "Vietnes lietošana",
          parrafos: ["Vietne ir bez maksas. Varat to lietot un dalīties ar tās saitēm. Masveidā kopēt saturu vai uzdoties par CalcularYa ir aizliegts."],
        },
        {
          titulo: "Atbildība",
          parrafos: ["Neatbildam par lēmumiem, kas pieņemti, balstoties tikai uz šīs vietnes rezultātu. Pirms kaut ko parakstāt, maksājat vai izvirzāt prasību, pārbaudiet skaitļus pie atbildīgās personas vai iestādē."],
        },
        { titulo: "Kontakti", parrafos: [`Mūsu e-pasts: ${mail}.`] },
      ],
    },
  },
});
