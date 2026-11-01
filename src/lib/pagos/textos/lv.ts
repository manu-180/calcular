import type { ClaveFamilia } from "../ofertas-intl";
import type { DiccionarioVenta, TextosFamilia } from "./tipos";

// Letón (ADR 0002, D35): un solo registro, el de VID (EDS) y latvija.gov.lv. «jūs» en minúscula y el
// imperativo de segunda del plural («ievadiet», «lejupielādējiet»), nunca «tu»; los botones cortos en
// infinitivo («Pirkt», «Lejupielādēt»). Sin participios ni adjetivos con género sobre la persona: «pirms
// parakstīšanas», no «pirms esat parakstījis». Las cartas del informe van en primera persona, también sin
// género. Los textos de las familias sirven a cualquier país: nada de organismos de un solo país. El país
// llega en el marcador {pais} sin declinar, así que va en nominativo entre paréntesis. Comillas „ “ y «%»
// sin espacio. Vocabulario: «bruto alga», «neto alga», «gada procentu likme (GPL)».
const JUSU_DOKUMENTIEM = { titulo: "Jūsu dokumentiem", texto: "Ar aprēķinā izmantoto vērtību datumu." };
const CITAS_SUMMAS = { titulo: "Ar citām summām", explica: "Tas pats aprēķins ar nedaudz mazākām un nedaudz lielākām summām." };
const CITAS_LIKMES = { titulo: "Ar citām procentu likmēm", explica: "Tie paši skaitļi ar nedaudz zemākām un nedaudz augstākām procentu likmēm." };

const familias: Record<ClaveFamilia, TextosFamilia> = {
  liquidacion: {
    nombre: "Gala norēķina atskaite",
    tituloCorto: "gala norēķina atskaite",
    paraQuien: "Lai varētu pārbaudīt gala norēķinu, aizejot no darba, vēl pirms parakstīšanas vai to pieprasīt, ar saviem skaitļiem un pēc savas valsts noteikumiem",
    descripcion: [
      "PDF atskaite, kurā norēķins sadalīts atsevišķās daļās: cik jums pienākas par katru, kā tas aprēķināts un kādas oficiālās vērtības izmantotas. Pie katras vērtības norādīts avots.",
      "Atradīsiet arī sarakstu, ko pārbaudīt pirms parakstīšanas, un vēstuli ar jau ierakstītu summu, ar kuru izmaksu varēsiet lūgt rakstiski.",
    ],
    gancho: "Saņemiet gala norēķinu rakstiski un pārbaudiet to pirms parakstīšanas",
    incluye: [
      { titulo: "Katra daļa ar aprēķinu", texto: "Lai varētu rindu pa rindai salīdzināt ar to, ko piedāvā darba devējs." },
      { titulo: "Redzami oficiālie avoti", texto: "Katra vērtība ar iestādi, kas to publicē, un mūsu pārbaudes datumu." },
      { titulo: "Sagatavots iesniegums", texto: "Ar ierakstītu jūsu summu, lai izmaksu varētu lūgt rakstiski." },
    ],
    pasos: {
      titulo: "Pirms parakstīšanas",
      items: [
        "Salīdziniet katru šīs atskaites daļu ar dokumentu, kas jāparaksta. Ja kaut kā trūkst, pajautājiet, kāpēc, vēl pirms parakstīšanas.",
        "Pārbaudiet, vai darba devēja izmantotā alga un datumi sakrīt ar tiem, ko ievadījāt šeit. Cits darba sākuma datums maina gandrīz visas summas.",
        "Palūdziet kopiju visam, ko parakstāt, un paturiet pēdējo mēnešu algas lapiņas.",
        "Ja starpība ir liela vai jūs atlaida no darba, parādiet šo atskaiti savas valsts darba inspekcijai vai darba tiesību juristam. Tā ietaupīsiet viņiem pirmo aprēķina stundu.",
      ],
    },
    nota: {
      titulo: "Iesniegums par summu izmaksu",
      uso: "Aizpildiet, parakstiet un iesniedziet kopā ar kopiju sev. Palūdziet, lai kopijā saņemšanu apstiprina ar parakstu un datumu.",
      pedido: "Lūdzu izmaksāt man pienākošās summas saistībā ar darba attiecību izbeigšanu. Saskaņā ar pievienotajā atskaitē sniegto aprēķinu tās ir",
      cierre: "Pievienotajā aprēķinā katra daļa aprēķināta pēc norādītajā dienā spēkā esošajām oficiālajām vērtībām. Lūdzu norādīt izmaksas datumu.",
    },
  },
  "pagos-laborales": {
    nombre: "Darba izmaksu atskaite",
    tituloCorto: "darba izmaksu atskaite",
    paraQuien: "Lai zinātu, vai prēmija, atvaļinājuma nauda, virsstundas vai peļņas daļa aprēķināta pareizi, un, ja nē, varētu lūgt starpību",
    descripcion: [
      "PDF atskaite ar jūsu aprēķinu soli pa solim un jūsu skaitļiem: kāds pamats izmantots, kā tiek rēķināts un kādas oficiālās vērtības piemērotas. Pie katras vērtības norādīts avots.",
      "Der jebkurai saraksta izmaksai. Parāda, kā to pārbaudīt algas lapiņā, un sniedz vēstuli, ar kuru starpību varēsiet lūgt rakstiski.",
    ],
    gancho: "Saņemiet šo aprēķinu rakstiski un salīdziniet to ar algas lapiņu",
    incluye: [
      { titulo: "Aprēķins soli pa solim", texto: "Ar jūsu datiem un katru izmantoto oficiālo vērtību." },
      { titulo: "Ko meklēt algas lapiņā", texto: "Lai minūtes laikā redzētu, vai samaksāts pareizi." },
      { titulo: "Vēstule par piemaksu", texto: "Ar ierakstītu jūsu summu, gatava iesniegšanai." },
    ],
    pasos: {
      titulo: "Kā pārbaudīt izmaksu",
      items: [
        "Atrodiet šo izmaksu algas lapiņā un salīdziniet to ar summu šajā atskaitē.",
        "Ja nesakrīt, vispirms pārbaudiet, vai jūsu ievadītie dati ir tādi paši kā tie, uz kuriem balstās darba devējs.",
        "Ja joprojām nesakrīt, izmantojiet zemāk sniegto vēstuli un lūdziet starpību rakstiski. Kopiju paturiet.",
      ],
    },
    nota: {
      titulo: "Iesniegums par piemaksu",
      uso: "Aizpildiet, parakstiet un iesniedziet kopā ar kopiju sev.",
      pedido: "Lūdzu izmaksāt pievienotajā atskaitē norādīto summu. Saskaņā ar aprēķinu ar spēkā esošajām oficiālajām vērtībām tā ir",
      cierre: "Ja izmaksātā summa bija citāda, lūdzu rakstiski paskaidrot, kā tā aprēķināta.",
    },
    escenarios: { titulo: "Kad mainās stundu skaits", explica: "Tas pats aprēķins ar citu stundu skaitu, lai katru mēnesi varētu pārbaudīt bez jauna aprēķina." },
  },
  impuesto: {
    nombre: "Ienākuma nodokļa atskaite",
    tituloCorto: "ienākuma nodokļa atskaite",
    paraQuien: "Lai zinātu, cik nodokļa tiek ieturēts, varētu pārbaudīt algas lapiņu un redzētu, kas notiek, mainoties ienākumiem",
    descripcion: [
      "PDF atskaite, kurā jūsu nodoklis aprēķināts soli pa solim, ar piemēroto oficiālo tabulu un katras vērtības avotu.",
      "Atradīsiet arī nodokļa tabulu ar citiem ienākumiem, lai jau iepriekš zinātu, cik paliks uz rokas, ja palielināsies alga vai mainīsiet darbu.",
    ],
    gancho: "Saņemiet sava nodokļa skaidrojumu rakstiski un paskatieties, kas notiek, mainoties ienākumiem",
    incluye: [
      { titulo: "Aprēķins pēc oficiālās tabulas", texto: "Soli pa solim, ar katras vērtības avotu." },
      { titulo: "Jūsu nodoklis ar citiem ienākumiem", texto: "Lai, runājot par lielāku algu, zinātu, cik paliks." },
      { titulo: "Ko pārbaudīt algas lapiņā", texto: "Lai ar darba devēju vai grāmatvedi runātu skaitļu valodā." },
    ],
    pasos: {
      titulo: "Kā pārbaudīt ieturēto nodokli",
      items: [
        "Atrodiet ieturēto nodokli algas lapiņā un salīdziniet to ar summu šajā atskaitē.",
        "Ja nesakrīt, pajautājiet darba devējam, kādus ienākumus un atvieglojumus viņš piemēro.",
        "Saglabājiet šo atskaiti gada deklarācijai, ja jūsu valstī tāda tiek iesniegta.",
      ],
    },
    escenarios: { titulo: "Kad mainās ienākumi", explica: "Tas pats aprēķins ar nedaudz mazākiem un nedaudz lielākiem ienākumiem, ar tām pašām oficiālajām vērtībām." },
  },
  contratacion: {
    nombre: "Darbinieka izmaksu tāme",
    tituloCorto: "darbinieka izmaksu tāme",
    paraQuien: "Lai zinātu, cik jauns darbinieks patiesībā izmaksā ar visām iemaksām, vēl pirms vienošanās par algu",
    descripcion: [
      "PDF tāme, kurā visas darbinieka izmaksas sadalītas daļās: bruto alga, darbinieka un darba devēja iemaksas, uzkrājumi. Pie katras vērtības norādīts oficiālais avots.",
      "Ir arī izmaksu tabula ar citām algām, lai pirms piedāvājuma zinātu, cik patiesībā maksā katrs pielikums. Tāmi varat uzreiz nodot partnerim vai grāmatvedim.",
    ],
    gancho: "Pārvērtiet šīs izmaksas tāmē un pieņemiet lēmumu par darbinieku",
    incluye: [
      { titulo: "Katra iemaksa atsevišķi", texto: "Ar noteikumu un oficiālo avotu." },
      { titulo: "Izmaksas ar citām algām", texto: "Lai, vienojoties par algu, zinātu, cik pieliek katrs solis uz augšu." },
      { titulo: "Gatava nodošanai", texto: "Partnerim, grāmatvedim vai jūsu dokumentiem." },
    ],
    pasos: {
      titulo: "Pirms darbinieka pieņemšanas",
      items: [
        "Pārrunājiet ar grāmatvedi, vai jūsu nozarē nav spēkā darba koplīgums vai par vispārējo lielāka minimālā alga.",
        "Šīs tāmes uzkrājumus atlieciet katru mēnesi: tie ir maksājumi, kas uzkrājas gada beigās vai līguma beigās.",
        "Darbinieku reģistrējiet no pirmās dienas: šīs tāmes izmaksas jau ietver obligātās iemaksas.",
      ],
    },
    escenarios: { titulo: "Izmaksas ar citām algām", explica: "Tas pats aprēķins ar mazākām un lielākām algām, ar tām pašām oficiālajām vērtībām." },
  },
  "ajuste-inflacion": {
    nombre: "Vēstule par indeksāciju pēc inflācijas",
    tituloCorto: "indeksācijas vēstule",
    paraQuien: "Lai varētu lūgt indeksāciju vai paziņot par to īres maksai, iemaksai, honorāram vai algai pēc oficiālā indeksa",
    descripcion: [
      "Iesniegšanai gatava vēstule ar jūsu jauno summu un aprēķina pamatojumu: oficiālais indekss katram datumam, iestāde, kas to publicē, un saite uz avotu.",
      "Kad pamatojums ir redzams, otra puse skaitli pārbauda minūtes laikā, un saruna ir par indeksu, nevis par aprēķinu.",
    ],
    gancho: "Pārvērtiet šo indeksāciju gatavā vēstulē ar oficiālo indeksu kā pamatojumu",
    incluye: [
      { titulo: "Aizpildīta vēstule", texto: "Ar jūsu jauno summu, gatava drukāšanai vai nosūtīšanai." },
      { titulo: "Oficiālais indekss kā pamatojums", texto: "Ar iestādi, datumu un saiti uz avotu." },
      { titulo: "Redzams aprēķins", texto: "Lai otra puse to varētu pārbaudīt pati." },
    ],
    nota: {
      titulo: "Paziņojums par indeksāciju",
      uso: "Ierakstiet līguma datus un iesniedziet kopā ar aprēķinu.",
      pedido: "Paziņoju, ka nolīgtā summa tiek mainīta atbilstoši oficiālā cenu indeksa izmaiņām, kā norādīts pievienotajā aprēķinā. Mainītā summa ir",
      cierre: "Aprēķinā izmantots pielikumā norādītās oficiālās iestādes publicētais indekss, ko var pārbaudīt norādītajā avotā.",
    },
  },
  regimen: {
    nombre: "Vienkāršotā nodokļu režīma atskaite",
    tituloCorto: "vienkāršotā režīma atskaite",
    paraQuien: "Lai zinātu, cik maksājat vienkāršotajā nodokļu režīmā un kas notiek, kad ienākumi aug vai samazinās",
    descripcion: [
      "PDF atskaite ar jūsu avansa maksājumu vai nodokli vienkāršotajā režīmā, aprēķinātu soli pa solim pēc oficiālās tabulas un ar katras vērtības avotu.",
      "Atradīsiet arī tabulu, cik maksātu ar citiem ienākumiem, lai pāreju uz citu pakāpi redzētu jau iepriekš.",
    ],
    gancho: "Saņemiet savu aprēķinu rakstiski un paskatieties, kas notiek, mainoties ienākumiem",
    incluye: [
      { titulo: "Jūsu aprēķins pēc oficiālās tabulas", texto: "Soli pa solim, ar katras vērtības avotu." },
      { titulo: "Cik maksātu ar citiem ienākumiem", texto: "Lai pāreju uz citu pakāpi redzētu jau iepriekš." },
      JUSU_DOKUMENTIEM,
    ],
    escenarios: { titulo: "Kad mainās ienākumi", explica: "Tas pats aprēķins ar mazākiem un lielākiem ienākumiem, ar tām pašām oficiālajām vērtībām." },
  },
  deposito: {
    nombre: "Termiņnoguldījumu salīdzinājums",
    tituloCorto: "noguldījumu salīdzinājums",
    paraQuien: "Lai salīdzinātu savu noguldījumu dažādiem termiņiem, pirms izlemt, kur un uz cik ilgu laiku noguldīt naudu",
    descripcion: ["PDF atskaite ar jūsu noguldījuma ienesīgumu un tā paša noguldījuma tabulu citiem termiņiem, viss aprēķināts tāpat kā kalkulatorā."],
    gancho: "Salīdziniet noguldījumu vairākiem termiņiem vienā atskaitē",
    incluye: [
      { titulo: "Jūsu noguldījums vairākiem termiņiem", texto: "Vienā tabulā, lai izvēlētos no pirmā acu uzmetiena." },
      { titulo: "Aprēķins soli pa solim", texto: "Ar katras izmantotās vērtības avotu." },
      JUSU_DOKUMENTIEM,
    ],
    escenarios: { titulo: "Jūsu noguldījums citiem termiņiem", explica: "Tas pats aprēķins ar citiem noguldījuma termiņiem." },
  },
  alimentos: {
    nombre: "Uzturlīdzekļu atskaite",
    tituloCorto: "uzturlīdzekļu atskaite",
    paraQuien: "Lai uz mediāciju vai sarunām par uzturlīdzekļiem bērnam ierastos ar pamatotu summu",
    descripcion: ["PDF atskaite ar orientējošu uzturlīdzekļu summu, soli pa solim, ar oficiālajām vērtībām un to avotiem, kā arī ar summas tabulu pie citiem ienākumiem."],
    gancho: "Ierodieties uz mediāciju ar šo aprēķinu rakstiski",
    incluye: [
      { titulo: "Pamatots aprēķins", texto: "Soli pa solim, ar katras vērtības avotu." },
      { titulo: "Summa pie citiem ienākumiem", texto: "Lai sarunās redzētu dažādas iespējas." },
      { titulo: "Jūsu juristam vai mediatoram", texto: "Tā ietaupīsiet viņiem pirmo aprēķina stundu." },
    ],
    escenarios: { titulo: "Pie citiem ienākumiem", explica: "Tas pats aprēķins ar mazākiem un lielākiem ienākumiem." },
  },
  jubilacion: {
    nombre: "Pensijas prognoze",
    tituloCorto: "pensijas prognoze",
    paraQuien: "Lai pensiju plānotu pēc prognozes rakstiski un redzētu, kas mainītos, veicot lielākas iemaksas",
    descripcion: ["PDF atskaite ar orientējošu pensijas summu soli pa solim, ar oficiālajām vērtībām un to avotiem, kā arī ar prognozes tabulu pie citām algām."],
    gancho: "Saņemiet savu pensijas prognozi rakstiski",
    incluye: [
      { titulo: "Prognoze soli pa solim", texto: "Ar katras vērtības avotu." },
      { titulo: "Pie citām algām", texto: "Lai redzētu, kas mainītos, veicot lielākas iemaksas." },
      JUSU_DOKUMENTIEM,
    ],
    escenarios: { titulo: "Pie citām algām", explica: "Tas pats aprēķins ar mazākām un lielākām algām." },
  },
  "plan-prestamo": {
    nombre: "Kredīta plāns",
    tituloCorto: "kredīta plāns",
    paraQuien: "Lai zinātu, cik kredīts patiesībā maksā, un salīdzinātu piedāvājumus vēl pirms parakstīšanas",
    descripcion: [
      "PDF atskaite ar visu jūsu kredītu: ikmēneša maksājums, visa summa, ko samaksāsiet, un cik no tās veido procenti.",
      "Ja rēķinājāt maksājumu, atskaitē atradīsiet katru maksājumu atsevišķi. Tie paši skaitļi aprēķināti arī ar citām procentu likmēm, lai banku piedāvājumus salīdzinātu pēc īstiem skaitļiem.",
    ],
    gancho: "Salīdziniet kredīta piedāvājumus pēc saviem skaitļiem vēl pirms parakstīšanas",
    incluye: [
      { titulo: "Jūsu kredīts ar citām procentu likmēm", texto: "Lai redzētu, ko maina viens procentpunkts uz augšu vai uz leju." },
      { titulo: "Redzamas visas izmaksas", texto: "Cik samaksāsiet procentos, bez sīkā šrifta." },
      { titulo: "Saraksts pirms parakstīšanas", texto: "Jautājumi, ko vērts uzdot kreditoram." },
    ],
    pasos: {
      titulo: "Pirms kredīta līguma parakstīšanas",
      items: [
        "Jautājiet ne tikai par procentu likmi, bet arī par gada procentu likmi (GPL), kas ietver visas maksas. Salīdzināt vērts tieši to.",
        "Pajautājiet par līguma noslēgšanas maksu, obligāto apdrošināšanu un maksu par pirmstermiņa atmaksu.",
        "Salīdziniet vismaz trīs piedāvājumus pēc šīs atskaites tabulas ar citām procentu likmēm.",
        "Izvēlieties maksājumu, ko varēsiet samaksāt arī sliktākā mēnesī. Orientieris: mazāk par trešdaļu ienākumu.",
      ],
    },
    escenarios: CITAS_LIKMES,
  },
  "plan-hipoteca": {
    nombre: "Mājokļa kredīta plāns",
    tituloCorto: "mājokļa kredīta plāns",
    paraQuien: "Lai par mājokļa kredītu lemtu ar visiem skaitļiem acu priekšā: maksājumu, procentiem un to, kas notiek, mainoties procentu likmei",
    descripcion: [
      "PDF atskaite ar visu jūsu mājokļa kredītu: ikmēneša maksājums, visa summa, ko samaksāsiet, un cik no tās šajos gados aizies procentiem.",
      "Tajā ir visas jūsu aprēķina tabulas (bezmaksas lapā rādītas tikai pirmās rindas) un tie paši skaitļi ar citām procentu likmēm. Ja salīdzinājāt īri un pirkšanu, salīdzinājums būs rakstiski, un lemt varēsiet kopā ar visu ģimeni.",
    ],
    gancho: "Ierodieties bankā ar pilnu mājokļa kredīta tabulu un citām procentu likmēm",
    incluye: [
      { titulo: "Pilna tabula", texto: "Visas rindas, ne tikai pirmās." },
      { titulo: "Jūsu mājokļa kredīts ar citām procentu likmēm", texto: "Lai redzētu, ko maksājumam nozīmē viens procentpunkts uz augšu vai uz leju." },
      { titulo: "Jautājumi bankai", texto: "Ko pārbaudīt pirms parakstīšanas." },
    ],
    pasos: {
      titulo: "Pirms mājokļa kredīta līguma parakstīšanas",
      items: [
        "Palūdziet piedāvājumu rakstiski ar procentu likmi, atmaksas termiņu un visām izmaksām, ieskaitot apdrošināšanu un maksas.",
        "Pajautājiet, uz cik ilgu laiku procentu likme tiek fiksēta un kas notiks ar maksājumu, ja pēc šī perioda likme pieaugs.",
        "Uzziniet, cik maksā pirmstermiņa atmaksa un vai varat atmaksāt vairāk bez soda.",
        "Pirms izlemt, kādu kredītu varat atļauties, pieskaitiet maksājumam mājokļa izdevumus (nekustamā īpašuma nodokli, apdrošināšanu, uzturēšanu).",
      ],
    },
    escenarios: CITAS_LIKMES,
  },
  "plan-inversion": {
    nombre: "Uzkrājumu un ieguldījumu plāns",
    tituloCorto: "uzkrājumu plāns",
    paraQuien: "Lai redzētu, kā jūsu uzkrājumi aug laika gaitā un kas mainās, atliekot vairāk vai pie citas procentu likmes",
    descripcion: [
      "PDF atskaite ar jūsu uzkrājumu prognozi: cik iemaksāsiet, cik saņemsiet procentos un cik būs beigās.",
      "Tajā ir visas jūsu aprēķina tabulas un tie paši skaitļi ar citām procentu likmēm, lai vietu uzkrājumiem izvēlētos pēc īstiem skaitļiem.",
    ],
    gancho: "Saņemiet uzkrājumu plānu rakstiski, gadu pēc gada",
    incluye: [
      { titulo: "Pilna prognoze", texto: "Visas tabulas rindas, ne tikai pirmās." },
      { titulo: "Ar citām procentu likmēm", texto: "Lai salīdzinātu iespējas pirms izvēles." },
      { titulo: "Plāns, kuru iespējams ievērot", texto: "Soļi, kas nodomu pārvērš uzkrājumos." },
    ],
    pasos: {
      titulo: "Lai plāns darbotos",
      items: [
        "Iestatiet regulāro maksājumu algas dienā: to, ko neredzat, neiztērējat.",
        "Salīdziniet procentu likmi ar inflāciju: ja likme ir zemāka, jūsu nauda zaudē vērtību, pat ja skaitlis aug.",
        "Reizi gadā atkal atveriet šo atskaiti un atjauniniet savus skaitļus.",
      ],
    },
    escenarios: CITAS_LIKMES,
  },
  "plan-deudas": {
    nombre: "Kredītkartes parāda atmaksas plāns",
    tituloCorto: "kartes parāda atmaksas plāns",
    paraQuien: "Lai zinātu, kad atmaksāsiet kartes parādu, cik tas izmaksās procentos un kā to izdarīt ātrāk",
    descripcion: [
      "PDF atskaite ar jūsu parādu mēnesi pēc mēneša: cik maksājat, cik aiziet procentiem un cik ātri samazinās atlikums.",
      "Tajā ir visa tabula līdz pēdējam maksājumam un tie paši skaitļi ar citiem maksājumiem, lai redzētu, cik ietaupīsiet, ja katru mēnesi maksāsiet nedaudz vairāk.",
    ],
    gancho: "Paskatieties mēnesi pēc mēneša, kad atmaksāsiet kartes parādu",
    incluye: [
      { titulo: "Mēnesi pēc mēneša līdz pēdējam maksājumam", texto: "Ar procentiem, ko samaksājat katru mēnesi." },
      { titulo: "Ar citiem maksājumiem", texto: "Lai redzētu, cik ātrāk pabeigsiet, ja maksāsiet nedaudz vairāk." },
      { titulo: "Ceļš ārā no parādiem", texto: "Soļi, lai parādos nenonāktu atkal." },
    ],
    pasos: {
      titulo: "Kā tikt ārā no parāda",
      items: [
        "Atmaksas laikā karti neizmantojiet: katrs jauns pirkums tabulu pagarina.",
        "Vienmēr maksājiet vairāk par minimālo maksājumu. Palīdz arī neliela summa, un tabula ar citiem maksājumiem parāda, cik daudz.",
        "Ja jums ir vairāki parādi, vispirms atmaksājiet to, kuram procentu likme ir visaugstākā, bet pārējiem maksājiet minimumu.",
        "Pajautājiet savai bankai par parādu apvienošanu ar zemāku procentu likmi un salīdziniet piedāvājumu ar šo atskaiti.",
      ],
    },
    escenarios: { titulo: "Ar citiem ikmēneša maksājumiem", explica: "Tas pats parāds, katru mēnesi maksājot nedaudz mazāk un nedaudz vairāk." },
  },
  "plan-presupuesto": {
    nombre: "Budžeta plāns",
    tituloCorto: "budžeta plāns",
    paraQuien: "Lai mēnesi sakārtotu pēc skaidra plāna: cik aiziet vajadzībām, vēlmēm un uzkrājumiem",
    descripcion: [
      "PDF atskaite, kas jūsu aprēķinu pārvērš plānā: cik atlikt katrai jomai, jūsu valūtā un ar jūsu skaitļiem.",
      "Tajā ir tas pats plāns ar citām summām, lai jau iepriekš zinātu, kas mainās mēnesī, kad naudas ir vairāk vai mazāk, un soļi, kā to ievērot.",
    ],
    gancho: "Pārvērtiet šo aprēķinu savā mēneša plānā",
    incluye: [
      { titulo: "Jūsu plāns ar jūsu skaitļiem", texto: "Cik kur aiziet, gatavs lietošanai." },
      { titulo: "Ar citām summām", texto: "Lai plānu pielāgotu, kad mēnesis mainās." },
      { titulo: "Soļi, kā ievērot plānu", texto: "Kas palīdz budžetam noturēties ilgāk par pirmo mēnesi." },
    ],
    pasos: {
      titulo: "Lai budžets darbotos",
      items: [
        "Uzkrājumus atlieciet algas dienā, vēl pirms izdevumiem. To, kas paliek, varat iztērēt.",
        "Mēneša laikā pierakstiet izdevumus, kaut vai telefonā, un salīdziniet tos ar šo plānu.",
        "Vispirms izveidojiet finanšu rezervi, lai negaidīts izdevums nenonāktu kredītkartē.",
      ],
    },
    escenarios: CITAS_SUMMAS,
  },
  "plan-negocio": {
    nombre: "Uzņēmuma skaitļu atskaite",
    tituloCorto: "uzņēmuma atskaite",
    paraQuien: "Lai par cenām, peļņas normu vai ieguldījumu lemtu pēc skaidriem skaitļiem, kas sagatavoti partnerim",
    descripcion: [
      "PDF atskaite ar jūsu aprēķinu, kas izskaidrots soli pa solim: kādi dati izmantoti, kā tiek rēķināts un kāds rezultāts iegūts.",
      "Atradīsiet arī tabulu ar to pašu aprēķinu citām summām, lai redzētu, kā mainās rezultāts, kad aug izmaksas vai samazināt cenu.",
    ],
    gancho: "Pārvērtiet šos skaitļus atskaitē lēmumam vai partnerim",
    incluye: [
      { titulo: "Izskaidrots aprēķins", texto: "Lai to saprastu un pamatotu partnerim vai bankai." },
      { titulo: "Ar citām summām", texto: "Lai jau iepriekš redzētu cenas vai izmaksu izmaiņu ietekmi." },
      { titulo: "Jautājumi pirms lēmuma", texto: "Ko pārbaudīt pirms cenas maiņas." },
    ],
    pasos: {
      titulo: "Pirms lēmuma pieņemšanas",
      items: [
        "Pārbaudiet, vai izmaksas ietver visu: transportu, nodokļus, komisijas un jūsu pašu laiku.",
        "Pirms cenas maiņas salīdziniet to ar diviem vai trim konkurentiem.",
        "Paskatieties uz sliktāko tabulas variantu: ja uzņēmums to iztur, lēmums ir drošāks.",
      ],
    },
    escenarios: CITAS_SUMMAS,
  },
  "kit-freelance": {
    nombre: "Pašnodarbinātā stundas likmes komplekts",
    tituloCorto: "stundas likmes komplekts",
    paraQuien: "Lai par darbu prasītu tik, cik tas ir vērts, un savu likmi nosauktu ar pārliecību",
    descripcion: [
      "PDF atskaite, kas izskaidro jūsu stundas likmi: kādus ienākumus vēlaties sasniegt, cik stundu patiesībā var iekļaut rēķinā un kādus izdevumus likme sedz.",
      "Tajā ir likme citiem vēlamajiem ienākumiem un sagatavota vēstule klientam ar jūsu stundas likmi.",
    ],
    gancho: "Nosauciet savu likmi ar skaitļiem, bez atvainošanās",
    incluye: [
      { titulo: "Jūsu likmes skaidrojums", texto: "Tam brīdim, kad kāds pajautās, kāpēc tieši tik." },
      { titulo: "Citiem vēlamajiem ienākumiem", texto: "Likme, kas vajadzīga katram gadījumam." },
      { titulo: "Sagatavota vēstule ar likmi", texto: "Ar jūsu skaitli, gatava sūtīšanai klientiem." },
    ],
    pasos: {
      titulo: "Lai prasītu tik, cik vajag",
      items: [
        "Skaitiet tikai tās stundas, par kurām varat izrakstīt rēķinu: tikšanās, piedāvājumi un atgādinājumi par maksājumu arī ir darbs.",
        "Kad iespējams, piedāvājiet cenu par projektu: klients pērk rezultātu, nevis stundas.",
        "Likmi pārskatiet reizi gadā vai ātrāk, ja jūsu izdevumi ir pieauguši.",
      ],
    },
    nota: {
      titulo: "Vēstule ar likmi",
      uso: "Ierakstiet klienta datus un nosūtiet kopā ar savu piedāvājumu.",
      pedido: "Pamatojoties uz mūsu sarunu, sūtu savu likmi par nolīgtajiem profesionālajiem pakalpojumiem. Mana stundas likme ir",
      cierre: "Likme ietver darba laiku un manas darbības izdevumus. Ja vēlaties, varu sagatavot arī piedāvājumu ar visa projekta cenas aprēķinu.",
    },
    escenarios: { titulo: "Citiem vēlamajiem ienākumiem", explica: "Tas pats aprēķins ar mazākiem un lielākiem vēlamajiem ienākumiem." },
  },
  "plan-sueldo": {
    nombre: "Algas atskaite",
    tituloCorto: "algas atskaite",
    paraQuien: "Lai, runājot par algu, piedāvājumu vai pielikumu, zinātu, cik tas ir stundā, mēnesī un gadā",
    descripcion: [
      "PDF atskaite, kas izskaidro jūsu algas aprēķinu, ar jūsu skaitļiem un katru izmantoto vērtību.",
      "Atradīsiet arī tabulu ar citām summām, lai varētu salīdzināt piedāvājumus vai lūgt lielāku algu pēc skaidriem skaitļiem.",
    ],
    gancho: "Runājiet par algu ar skaitļiem rokās",
    incluye: [
      { titulo: "Viss jūsu aprēķins", texto: "Ar katru ievadīto vērtību." },
      { titulo: "Ar citām summām", texto: "Lai divus piedāvājumus salīdzinātu minūtes laikā." },
      { titulo: "Padomi sarunām", texto: "Ko teikt un ko lūgt bez paša skaitļa." },
    ],
    pasos: {
      titulo: "Kā vienoties",
      items: [
        "Salīdzinot piedāvājumus, runājiet par gada vai stundas bruto un neto summām: mēneša skaitļi starpību paslēpj.",
        "Lūdziet arī to, kas nav alga: papildu atvaļinājumu, darbu no mājām, apmācības vai prēmijas.",
        "Ierodieties ar konkrētu skaitli un tā pamatojumu: jūsu pieredzi, tirgus datus vai to, kas mainījies jūsu darbā.",
      ],
    },
    escenarios: CITAS_SUMMAS,
  },
  "kit-calculos": {
    nombre: "Aprēķins ar skaidrojumu soli pa solim",
    tituloCorto: "aprēķins ar skaidrojumu",
    paraQuien: "Lai būtu atrisināts un izskaidrots aprēķins, gatavs drukāšanai, mācībām vai nodošanai",
    descripcion: [
      "PDF atskaite ar jūsu aprēķinu, risinājuma gaitu un rezultātu, ar jūsu skaitļiem.",
      "Izmantojiet to mācībām, kā aprēķina pierakstu vai lai kādam parādītu bez papildu skaidrojumiem.",
    ],
    gancho: "Saņemiet aprēķinu ar skaidrojumu soli pa solim",
    incluye: [
      { titulo: "Atrisināts aprēķins", texto: "Ar jūsu datiem un rezultātu." },
      { titulo: "Kā tiek rēķināts", texto: "Lai redzētu, no kurienes rodas katrs skaitlis." },
      { titulo: "Gatavs drukāšanai", texto: "Vai saglabājams kā PDF, lai dalītos." },
    ],
    pasos: {
      titulo: "Kā pārbaudīt aprēķinu",
      items: ["Parēķiniet atpakaļ: no rezultāta atgriezieties pie sākotnējās vērtības.", "Noapaļojiet tikai beigās: noapaļošana katrā solī maina rezultātu."],
    },
    escenarios: CITAS_SUMMAS,
  },
  "kit-gastos-grupo": {
    nombre: "Kopīgo izdevumu kopsavilkums",
    tituloCorto: "izdevumu kopsavilkums",
    paraQuien: "Lai katrs zinātu, cik jāsamaksā, bez strīdiem un aprēķiniem uz salvetes",
    descripcion: [
      "PDF kopīgā rēķina kopsavilkums: visa summa, cik maksā katrs un, ja vajag, kurš kuram jāsamaksā.",
      "Nosūtiet to grupas sarunā vai izdrukājiet, lai nevienam nebūtu jāpārrēķina.",
    ],
    gancho: "Sadaliet rēķinu ar citiem skaidri un bez strīdiem",
    incluye: [
      { titulo: "Cik maksā katrs", texto: "Ar visu summu un redzamām detaļām." },
      { titulo: "Gatavs kopīgošanai", texto: "PDF formātā, lai nosūtītu citiem." },
      { titulo: "Ar citām kopsummām", texto: "Ja rēķinam kāds pievienotos." },
    ],
    pasos: {
      titulo: "Kā norēķināties",
      items: ["Nosūtiet kopsavilkumu citiem, kamēr vēl neviens nav samaksājis: izvairīsieties no pārpratumiem.", "Vienojieties par maksājuma veidu un datumu, līdz kuram norēķināsieties."],
    },
    escenarios: { titulo: "Ar citām kopsummām", explica: "Tā pati sadale, kad kopsumma ir nedaudz mazāka vai lielāka." },
  },
  "kit-estudio": {
    nombre: "Vidējās atzīmes atskaite",
    tituloCorto: "vidējās atzīmes atskaite",
    paraQuien: "Lai savu vidējo atzīmi redzētu skaidri un rakstiski, ar katras atzīmes svaru",
    descripcion: [
      "PDF atskaite ar jūsu vidējo atzīmi: katra atzīme, tās svars un kā iegūts rezultāts.",
      "Izmantojiet to atzīmes pārbaudei, nākamā eksāmena plānošanai vai lai aprēķinu parādītu tam, kam tas vajadzīgs.",
    ],
    gancho: "Saņemiet savas vidējās atzīmes skaidrojumu rakstiski",
    incluye: [
      { titulo: "Katra atzīme ar svaru", texto: "Lai redzētu, kurai ir vislielākā ietekme." },
      { titulo: "Aprēķins soli pa solim", texto: "Lai to varētu pārbaudīt vai parādīt." },
      { titulo: "Idejas nākamajam eksāmenam", texto: "Kā izmantot vidējo atzīmi, lai labāk organizētos." },
    ],
    pasos: {
      titulo: "Nākamajam eksāmenam",
      items: ["Paskatieties, kurai atzīmei ir vislielākais svars, un šim priekšmetam vai eksāmenam veltiet vairāk laika.", "Ja šķiet, ka atzīme aprēķināta nepareizi, parādiet šo atskaiti pasniedzējam."],
    },
  },
  "kit-fechas": {
    nombre: "Datumu un termiņu atskaite",
    tituloCorto: "datumu atskaite",
    paraQuien: "Lai aprēķināto datumu vai termiņu saņemtu rakstiski, gatavu iesniegšanai, un to neaizmirstu",
    descripcion: [
      "PDF atskaite ar datuma aprēķinu: jūsu ievadītie datumi, rezultāts un kā tas aprēķināts.",
      "Izmantojiet to pie dokumentiem, līguma, maksājuma termiņa vai vienkārši kā pierakstu.",
    ],
    gancho: "Saņemiet šo datumu rakstiski, gatavu iesniegšanai",
    incluye: [
      { titulo: "Izskaidrots aprēķins", texto: "Ar datumiem un to, kā tiek skaitītas dienas." },
      { titulo: "Gatavs iesniegšanai", texto: "Pie dokumentiem vai kā līguma pielikums." },
      { titulo: "Jūsu dokumentiem", texto: "Ar sagatavošanas datumu." },
    ],
    pasos: {
      titulo: "Pirms datuma izmantošanas dokumentos",
      items: [
        "Noskaidrojiet, vai termiņu skaita kalendārajās vai darba dienās: no tā atkarīgs rezultāts.",
        "Paskatieties, vai pēdējā diena nav svētku diena vai brīvdiena.",
        "Galīgo datumu ierakstiet kalendārā ar atgādinājumu dažas dienas iepriekš.",
      ],
    },
  },
  "plan-salud": {
    nombre: "ĶMI un kaloriju atskaite",
    tituloCorto: "ĶMI un kaloriju atskaite",
    paraQuien: "Lai savus svara un enerģijas rādītājus saņemtu rakstiski un varētu parādīt ārstam",
    descripcion: [
      "PDF atskaite, kas izskaidro jūsu rezultātu: ko tas mēra, kā aprēķināts un kurā intervālā iekļaujas, ar jūsu datiem.",
      "Tā ir vispārīga informācija sarunai ar veselības speciālistu. Tā nav diagnoze un neaizstāj ārsta apmeklējumu.",
    ],
    gancho: "Parādiet savus rādītājus ārstam, izskaidrotus un rakstiski",
    incluye: [
      { titulo: "Jūsu rezultāts ar skaidrojumu", texto: "Ko tas mēra un kā aprēķināts." },
      { titulo: "Jautājumi ārstam", texto: "Lai no apmeklējuma iegūtu vairāk." },
      { titulo: "Izmaiņu vērošanai", texto: "Saglabājiet katru atskaiti un salīdziniet laika gaitā." },
    ],
    pasos: {
      titulo: "Kā par to runāt ar speciālistu",
      items: [
        "Paņemiet līdzi šo atskaiti un pajautājiet, kurš intervāls ir veselīgs tieši jums, ņemot vērā vecumu un veselības vēsturi.",
        "Pastāstiet, kā ēdat, cik kustaties un kā guļat: skaitļi vien visu neparāda.",
        "Lielas uztura vai fiziskās aktivitātes izmaiņas neveiciet, nekonsultējoties ar speciālistu.",
      ],
    },
    aviso: "Vispārīga informācija. Neaizstāj veselības speciālista konsultāciju.",
  },
  "plan-embarazo": {
    nombre: "Auglības un grūtniecības atskaite",
    tituloCorto: "auglības un grūtniecības atskaite",
    paraQuien: "Lai orientējošos datumus saņemtu rakstiski un varētu paņemt līdzi uz nākamo vizīti",
    descripcion: [
      "PDF atskaite ar orientējošiem datumiem un to, kā katrs aprēķināts pēc jūsu ievadītajiem datiem.",
      "Datumi ir orientējoši: katrs ķermenis un katra grūtniecība ir citāda. Tie palīdz plānot un runāt ar veselības speciālistu, bet vizīti neaizstāj.",
    ],
    gancho: "Saņemiet savus datumus rakstiski līdz nākamajai vizītei",
    incluye: [
      { titulo: "Jūsu orientējošie datumi", texto: "Ar to, kā katrs aprēķināts." },
      { titulo: "Jautājumi vizītei", texto: "Lai no apmeklējuma iegūtu pēc iespējas vairāk." },
      { titulo: "Jūsu dokumentiem", texto: "Ar izmantotajiem datiem." },
    ],
    pasos: {
      titulo: "Nākamajai vizītei",
      items: [
        "Paņemiet līdzi šo atskaiti un pēdējo mēnešreižu pirmās dienas datumu.",
        "Pajautājiet, kādi izmeklējumi vajadzīgi jūsu grūtniecības nedēļā un kad ir nākamā vizīte.",
        "Ja satrauc kāds simptoms, vērsieties pie ārsta un negaidiet atskaitē norādītos datumus.",
      ],
    },
    aviso: "Vispārīga informācija. Datumi ir orientējoši un neaizstāj veselības speciālista aprūpi.",
  },
  "plan-entrenamiento": {
    nombre: "Skriešanas tempa atskaite",
    tituloCorto: "tempa atskaite",
    paraQuien: "Lai pirms treniņa zinātu mērķa tempu un prastu sadalīt spēkus",
    descripcion: [
      "PDF atskaite, kas izskaidro jūsu tempu, laiku un ātrumu pēc jūsu ievadītajiem datiem.",
      "Tajā ir visas aprēķina tabulas un padomi, kā tempu izmantot treniņos.",
    ],
    gancho: "Saņemiet savu tempu rakstiski sacensību dienai",
    incluye: [
      { titulo: "Jūsu temps ar skaidrojumu", texto: "Ar laiku un ātrumu." },
      { titulo: "Izdrukāt un paņemt līdzi", texto: "Kabatā vai uz ledusskapja." },
      { titulo: "Padomi treniņiem", texto: "Kā izmantot tempu un netraumēties." },
    ],
    pasos: {
      titulo: "Kā izmantot tempu",
      items: [
        "Pirmās minūtes skrieniet nedaudz lēnāk par mērķa tempu: finišā to sajutīsiet.",
        "Lielāko daļu nedēļas treniņu skrieniet vieglā tempā, kurā vēl var sarunāties.",
        "Ja kaut kas sāp, apstājieties un konsultējieties ar speciālistu: temps pagaidīs.",
      ],
    },
    aviso: "Vispārīga informācija. Neaizstāj veselības vai sporta speciālista konsultāciju.",
  },
  "kit-viaje": {
    nombre: "Ceļojuma degvielas tāme",
    tituloCorto: "degvielas tāme",
    paraQuien: "Lai zinātu, cik iztērēsiet degvielai, un sadalītu summu starp visiem ceļojuma dalībniekiem",
    descripcion: [
      "PDF atskaite ar jūsu ceļojuma degvielas izmaksām, ar jūsu skaitļiem: attālums, patēriņš un cena.",
      "Atradīsiet arī tabulu ar citām degvielas cenām, ja līdz izbraukšanai tās mainītos, un citu ceļojuma izdevumu sarakstu.",
    ],
    gancho: "Saņemiet ceļojuma izmaksas rakstiski vēl pirms izbraukšanas",
    incluye: [
      { titulo: "Ceļojuma izmaksas", texto: "Ar attālumu, patēriņu un cenu." },
      { titulo: "Ar citām cenām", texto: "Ja degviela līdz izbraukšanai sadārdzinātos." },
      { titulo: "Pārējā ceļojuma saraksts", texto: "Ceļu maksas, stāvvieta un ēdiens." },
    ],
    pasos: {
      titulo: "Kā sastādīt ceļojuma budžetu",
      items: [
        "Degvielas izmaksām pieskaitiet ceļu maksas, stāvvietu un ēdienu.",
        "Ja brauc vairāk cilvēku, sadaliet visu summu un paziņojiet visiem vēl pirms izbraukšanas.",
        "Pārbaudiet riepu spiedienu: ar nepiepumpētām riepām auto patērē vairāk degvielas.",
      ],
    },
    escenarios: { titulo: "Ar citām cenām", explica: "Tas pats ceļojums ar nedaudz lētāku un nedaudz dārgāku degvielu." },
  },
  "kit-hogar": {
    nombre: "Elektrības izmaksu atskaite",
    tituloCorto: "elektrības izmaksu atskaite",
    paraQuien: "Lai zinātu, cik izmaksā katra ierīce un kur var ietaupīt, maksājot par elektrību",
    descripcion: [
      "PDF atskaite, cik izmaksā jūsu ierīce, ar jūsu lietošanas datiem un elektrības cenu.",
      "Atradīsiet arī tabulu ar citām elektrības cenām un ideju sarakstu, kā samazināt rēķinu.",
    ],
    gancho: "Uzziniet, cik izmaksā šī ierīce un kā to samazināt",
    incluye: [
      { titulo: "Izmaksas pēc jūsu lietojuma", texto: "Ar skaidrojumu soli pa solim." },
      { titulo: "Ar citām cenām", texto: "Ja tarifs sadārdzinātos." },
      { titulo: "Idejas ietaupījumam", texto: "Tās, kas rēķinā redzamas visvairāk." },
    ],
    pasos: {
      titulo: "Kā samazināt rēķinu",
      items: [
        "Gaidīšanas režīmā atstātās ierīces atvienojiet no kontaktligzdas: tās patērē elektrību arī izslēgtas.",
        "Jaudīgākās ierīces ieslēdziet zemāka tarifa laikā, ja jums tāds ir.",
        "Salīdziniet šo atskaiti ar elektrības rēķinu, lai redzētu, kādu daļu no visas summas veido šī ierīce.",
      ],
    },
    escenarios: { titulo: "Ar citām cenām", explica: "Tas pats lietojums ar nedaudz lētāku un nedaudz dārgāku elektrību." },
  },
  "kit-obra": {
    nombre: "Būvmateriālu saraksts",
    tituloCorto: "materiālu saraksts",
    paraQuien: "Lai materiālus pirktu tik, cik vajag: lai nekā netrūktu un nekas nepaliktu pāri",
    descripcion: [
      "PDF atskaite ar materiālu aprēķinu: izmēri, daudzumi un kā tie aprēķināti, gatava ņemšanai līdzi uz veikalu.",
      "Atradīsiet arī sarakstu, kā iepirkties pareizi: rezerve atgriezumiem, ko pajautāt un ko pārbaudīt pirms darbu sākšanas.",
    ],
    gancho: "Ierodieties veikalā ar materiālu sarakstu",
    incluye: [
      { titulo: "Izmēri un daudzumi", texto: "Viss, ko aprēķinājāt, vienā lapā." },
      { titulo: "Parādīt veikalā", texto: "Lai jums sarēķinātu tieši to, kas vajadzīgs." },
      { titulo: "Pareizas iepirkšanās saraksts", texto: "Rezerve atgriezumiem un ko pārbaudīt." },
    ],
    pasos: {
      titulo: "Pirms pirkšanas",
      items: [
        "Pieskaitiet no 5 līdz 10% atgriezumiem un plīsumiem, sarežģītām formām vairāk.",
        "Pērciet visu no vienas ražošanas partijas: krāsa un tonis starp partijām var atšķirties.",
        "Pajautājiet, kāds ir izvēlētā materiāla patēriņš: dažādiem ražotājiem tas atšķiras.",
        "Saglabājiet čeku un neatvērtos iepakojumus: daudzi veikali tos pieņem atpakaļ.",
      ],
    },
  },
  "kit-facturacion": {
    nombre: "PVN un pārdošanas nodokļa atskaite",
    tituloCorto: "PVN atskaite",
    paraQuien: "Lai varētu izrakstīt rēķinu vai pārbaudīt cenu ar skaidri atdalītu PVN, gatavu jūsu dokumentiem vai grāmatvedim",
    descripcion: [
      "PDF atskaite ar jūsu aprēķinu: cena bez nodokļa, nodoklis un visa summa, ar piemēroto likmi un tās avotu.",
      "Atradīsiet arī tabulu ar citām summām, kas noder, sastādot cenrādi ar nodokli un bez tā.",
    ],
    gancho: "Saņemiet cenu ar nodokli un bez tā rakstiski",
    incluye: [
      { titulo: "Nodoklis atsevišķi", texto: "Summa bez nodokļa, nodoklis un visa summa pēc spēkā esošās likmes." },
      { titulo: "Ar citām summām", texto: "Lai cenrādi sastādītu uzreiz." },
      { titulo: "Jūsu grāmatvedim", texto: "Ar likmes avotu un datumu." },
    ],
    pasos: {
      titulo: "Pirms rēķina izrakstīšanas",
      items: [
        "Noskaidrojiet, vai jūsu precei vai pakalpojumam piemēro standarta vai samazināto likmi.",
        "Pārliecinieties, ka rēķinā atsevišķi norādīta ar nodokli apliekamā vērtība un nodoklis, ja tas tiek prasīts.",
        "Šo atskaiti saglabājiet kopā ar rēķinu savos dokumentos.",
      ],
    },
    escenarios: CITAS_SUMMAS,
  },
  "informe-calculo": {
    nombre: "Aprēķina atskaite",
    tituloCorto: "aprēķina atskaite",
    paraQuien: "Lai šo aprēķinu saņemtu rakstiski, ar saviem skaitļiem, pieņēmumiem un katras oficiālās vērtības avotu",
    descripcion: [
      "PDF atskaite par tikko veikto aprēķinu, soli pa solim ar jūsu datiem: rezultāts, pieņēmumi, uz kuriem tas balstās, un katra oficiālā vērtība ar avotu un pārbaudes datumu.",
      "Saglabājiet to savos dokumentos vai nododiet grāmatvedim, darba devējam vai citam pārbaudītājam, un katrs skaitlis nebūs jāskaidro no jauna.",
    ],
    gancho: "Saņemiet šo aprēķinu rakstiski, ar avotiem",
    incluye: [
      { titulo: "Jūsu rezultāts", texto: "Tieši tāds, kādu aprēķinājāt, gatavs drukāšanai." },
      { titulo: "Kā tas iegūts", texto: "Soļi un pieņēmumi, lai varētu izsekot katram skaitlim." },
      { titulo: "Oficiālie avoti", texto: "Katra vērtība ar iestādi, saiti un pārbaudes datumu." },
    ],
    pasos: {
      titulo: "Pirms izmantošanas",
      items: [
        "Pārbaudiet, vai augšā norādītie dati ir jūsu: no tiem atkarīgs rezultāts.",
        "Ja oficiālā vērtība ir mainījusies, aprēķiniet no jauna: atskaitē izmantotas pirkuma dienā spēkā esošās vērtības.",
      ],
    },
  },
};

export const lv: DiccionarioVenta = {
  familias,
  general: { si: "Jā", no: "Nē" },
  tarjeta: {
    cejaInforme: "PDF atskaite",
    cejaPlanilla: "Excel tabula",
    pagoUnico: "vienreizējs maksājums",
    comprarInforme: "Pirkt atskaiti",
    comprarPlanilla: "Pirkt tabulu",
    confianza: "Maksājums ar PayPal vai karti. Ja atskaite nenoderēs, 7 dienu laikā atmaksāsim naudu.",
    verDetalle: "Kas ietilpst",
    tambien: "Jums var noderēt arī:",
    tablasOficiales: "Oficiālās tabulas",
    bajadaInforme: "Atskaitē aprēķins izklāstīts soli pa solim ar jūsu skaitļiem un katras vērtības avotu. To var izdrukāt vai saglabāt kā PDF.",
    bajadaPlanilla: "Tabulā ir šis aprēķins ar jūsu skaitļiem un redzamām formulām, tāpēc varat mainīt jebko.",
    bajadaPlanillaHoja: "Tabulas lapā „{hoja}“ ir šis aprēķins ar jūsu skaitļiem un redzamām formulām, tāpēc varat mainīt jebko.",
    equivale: "Aptuveni {monto} pēc šodienas kursa.",
    cobroDolares: "Maksājums ASV dolāros.",
  },
  aviso: {
    pronto: "Gatavojam",
    titulo: "Paziņojiet man, kad varēs pirkt",
    ayuda: "Rakstīsim tikai vienreiz, kad sāksim pārdošanu.",
    boton: "Paziņot man",
    listo: "Gatavs. Tiklīdz sāksim pārdošanu, nosūtīsim jums e-pastu.",
    error: "Jūsu adresi saglabāt neizdevās. Pārbaudiet, vai tā uzrakstīta pareizi, un mēģiniet vēlreiz.",
    correo: "Jūsu e-pasts",
  },
  planilla: {
    gancho: "Pārnesiet šo aprēķinu uz Excel ar jau ierakstītiem datiem",
    incluye: [
      { titulo: "Jūsu dati jau ierakstīti", texto: "Nomainiet dzelteno šūnu, un viss tiks pārrēķināts." },
      { titulo: "Alga, prēmija un gala norēķins", texto: "Vienā failā, ko varat izmantot visu gadu." },
      { titulo: "Atjauninājumi pēc katrām oficiālām izmaiņām", texto: "Tā pati saite, jauna versija, papildu maksas nav." },
    ],
  },
  informe: {
    tusDatos: "Jūsu dati",
    resultado: "Rezultāts",
    corregir: "Labot manus datus",
    actualizar: "Atjaunināt atskaiti",
    imprimir: "Drukāt vai saglabāt kā PDF",
    imprimirAyuda: "Drukāšanas logā izvēlieties „Saglabāt kā PDF“, un saņemsiet failu.",
    sinResultado: "Ievadiet savus datus sadaļā „Labot manus datus“, un atskaite būs gatava.",
    lugar: "Vieta un datums",
    destinatario: "Kam",
    firma: "Paraksts",
    nombre: "Vārds un uzvārds",
    documento: "Dokumenta numurs",
    etiquetaEnMinuscula: true,
    comoSeCalcula: "Kā tiek rēķināts",
    fuentes: "Oficiālie avoti",
    verificado: "pārbaudīts",
    emitido: "Izdošanas datums",
    valores: "Oficiālās vērtības, spēkā:",
    numero: "Atskaite",
    elegir: "Izvēlieties aprēķinu atskaitei:",
    legal:
      "Šī atskaite ir aptuvens aprēķins pēc norādītajiem noteikumiem un oficiālajām vērtībām norādītajā dienā. Tā neaizstāj speciālista padomu vai kompetentas iestādes lēmumu. Ja kāds no jūsu datiem atšķiras, mainās arī rezultāts: izlabojiet to un izdrukājiet atskaiti no jauna.",
    legalSinFuentes: "Šī atskaite ir aptuvens aprēķins pēc jūsu ievadītajiem datiem norādītajā dienā. Tā neaizstāj speciālista padomu. Ja kāds no datiem mainās, mainās arī rezultāts: izlabojiet to un izdrukājiet atskaiti no jauna.",
    errorTitulo: "Šo atskaiti atvērt neizdevās",
    error: "Neizdevās apstiprināt ar šo saiti saistīto maksājumu. Ja nauda ir noņemta, rakstiet mums, un visu sakārtosim. Ja pirkums nenotika, varat to atkārtot.",
    verificar: "Maksājumu pašlaik pārbaudīt neizdevās. Mēģiniet pēc dažām minūtēm: maksāt vēlreiz nav vajadzīgs.",
    cupo: "Pārāk daudz mēģinājumu pēc kārtas. Pagaidiet dažas minūtes un atveriet saiti no jauna.",
  },
  // {normas} va tras «saskaņā ar» y {incluye} tras «Ietver», los dos con acusativo («Darba likumu», «neto algu,
  // prēmiju un...»).
  catalogo: {
    tituloProducto: "{nombre} ({pais})",
    disparadorInforme: "Katru reizi, kad mainās aprēķinā izmantotā oficiālā vērtība",
    planillaDescripcion: "Gatava Excel tabula: ievadiet savus datus dzeltenajās šūnās, un viss tiek aprēķināts pats, ar formulām saskaņā ar {normas}.",
    planillaIncluye: "Ietver {incluye}. Katrā lapā redzami soļi, un oficiālo tabulu lapā katra vērtība sniegta ar avotu un mūsu pārbaudes datumu.",
  },
  planillas: {
    migaPlanillas: "Tabulas un atskaites",
    catalogoTitulo: "Tabulas un atskaites ({pais})",
    catalogoBajada: "Excel tabulas un PDF atskaites ar jūsu skaitļiem un valsts oficiālajiem datiem. Vienreizējs maksājums, bez abonementa.",
    seccionPlanillas: "Excel tabulas",
    seccionInformes: "PDF atskaites",
    catalogoVacio: "Šīs valsts ({pais}) tabulas vēl gatavojam. Pagaidām kalkulatori ir bez maksas.",
    verCalculadoras: "Skatīt kalkulatorus",
    comprar: "Pirkt par {precio}",
    pronto: "Gatavojam",
    incluye: "Kas ietilpst",
    incluyeInforme: [
      "Atskaite ar jūsu skaitļiem lapā, ko varat izdrukāt vai saglabāt kā PDF.",
      "Saite bez termiņa: datus varat jebkurā laikā izlabot un atskaiti izdrukāt no jauna.",
      "Ja atskaite nenoderēs, 7 dienu laikā atmaksāsim naudu.",
    ],
    incluyePlanilla: [
      "Fails .xlsx, ko atvērsiet Excel un Google Sheets programmās.",
      "Atjauninājumi: {disparador}, tabulu atjauninām, un tajā pašā saitē varat lejupielādēt jauno versiju.",
      "Ja tabula nenoderēs, 7 dienu laikā atmaksāsim naudu.",
    ],
    pagoUnico: "Vienreizējs maksājums ar PayPal. Maksāt varat no konta vai ar karti.",
    comprarPlanilla: "Pirkt: {titulo}",
    comprarBajadaInforme: "Kad maksājums būs apstiprināts, uz šo adresi nosūtīsim saiti uz jūsu atskaiti.",
    comprarBajadaPlanilla: "Kad maksājums būs apstiprināts, uz šo adresi nosūtīsim tabulu.",
    etiquetaEmail: "Jūsu e-pasts",
    seguirPago: "Turpināt maksājumu",
    privacidad: "Jūsu adresi izmantosim tikai pirkuma un tā atjauninājumu nosūtīšanai.",
    datosTitulo: "Ar jūsu aprēķina skaitļiem",
    datosUsar: "Izmantot šos skaitļus manā pirkumā. Tie tiek glabāti tikai pirkuma sagatavošanai.",
    errores: {
      email: "Pārbaudiet e-pasta adresi: šķiet, ka tajā kaut kā trūkst.",
      error: "Maksājumu sākt neizdevās. Nauda nav noņemta. Mēģiniet pēc dažām minūtēm.",
      cancelado: "Maksājumu atcēlāt. Nauda nav noņemta.",
      fallido: "PayPal maksājumu neapstiprināja. Varat mēģināt ar citu karti.",
      pronto: "Pārdošana vēl nav sākusies.",
    },
    graciasTitulo: "Paldies par pirkumu",
    graciasListoInforme: "Maksājums apstiprināts. Pirkumu jau varat atvērt: {titulo}. Saiti nosūtījām arī uz e-pastu, tai nav termiņa.",
    graciasListoPlanilla: "Maksājums apstiprināts. Pirkumu jau varat lejupielādēt: {titulo}. To nosūtījām arī uz e-pastu ar saiti bez termiņa.",
    graciasPendiente: "Gaidām PayPal apstiprinājumu. Tiklīdz to saņemsim, pirkumu nosūtīsim uz e-pastu.",
    muestraIntro: "Šī ir lapa „{hoja}“ ar parauga datiem, ar kuriem tā atveras. Aprēķins ir šodienas, ar spēkā esošajām oficiālajām vērtībām.",
    muestraLeyenda: ["aizpildāt jūs", "rēķina tabula"],
    comprobar: "Pārbaudiet pirms maksāšanas: bezmaksas kalkulators dod tos pašus skaitļus. Izmēģiniet to pašu gadījumu un salīdziniet.",
    comprobarEnlace: "Pāriet uz bezmaksas kalkulatoru",
    faqTitulo: "Biežāk uzdotie jautājumi",
    faq: {
      sheets: {
        pregunta: "Vai darbojas Google Sheets un Excel programmās?",
        respuesta: "Jā. Tas ir .xlsx fails: to atvērsiet Excel un Google Sheets programmās (augšupielādējiet savā Diskā un atveriet tur). Aprēķins notiek ar parastām formulām, bez makrokomandām.",
      },
      recibo: {
        pregunta: "Kā to saņemšu?",
        respuesta: "Kad maksājums būs apstiprināts, nosūtīsim to uz e-pastu ar lejupielādes saiti bez termiņa. Lejupielādēt varat arī lapā, kas atveras pēc maksājuma.",
      },
      dolares: {
        pregunta: "Vai maksājums ir ASV dolāros?",
        respuesta: "Jā. Cena norādīta ASV dolāros (USD), un maksājat ar PayPal, no konta vai ar karti.",
        conReferencia: "Augšā rādām aptuveno summu jūsu valūtā pēc šodienas kursa, tikai orientācijai: galīgā summa ir atkarīga no jūsu bankas vai kartes kursa.",
        sinReferencia: "Ja jūsu karte ir citā valūtā, summu konvertēs jūsu banka.",
      },
      devolucion: { pregunta: "Vai varu atgūt naudu?", respuesta: "Jā. Ja tabula nenoderēs, 7 dienu laikā atbildiet uz pirkuma e-pastu, un atmaksāsim naudu." },
      actualiza: { pregunta: "Vai tā tiek atjaunināta, kad mainās oficiālās vērtības?", respuesta: "Jā. {disparador}, tabulu atjauninām, un tajā pašā saitē varat lejupielādēt jauno versiju." },
    },
    descargar: "Lejupielādēt tabulu (.xlsx)",
    abrirInforme: "Atvērt manu atskaiti",
    fuentes: "Izmantotie oficiālie avoti",
    calculadoras: "Darbojas ar šiem kalkulatoriem",
    muestra: "Kā izskatās",
  },
  correo: {
    asuntoInforme: "Jūsu pirkums CalcularYa vietnē: {titulo}",
    asuntoPlanilla: "{titulo}: lejupielāde un atjauninājumi",
    mismosNumeros: "Skaitļi ir tādi paši kā {enlace}, ar oficiālajiem datiem.",
    enlaceCalculadora: "bezmaksas CalcularYa kalkulatorā",
    comprobante: "Šis ir jūsu pirkuma apstiprinājums ({marca}).",
    informe: {
      encabezado: "Atskaiti jau varat atvērt",
      intro: "Paldies par pirkumu ({titulo}). Atveriet to šeit:",
      boton: "Atvērt manu atskaiti",
      abre: "Atskaite atvērsies pārlūkprogrammā. No turienes varat to izdrukāt vai saglabāt kā PDF.",
      guarda: "Saglabājiet šo e-pastu",
      vence: "Saite pieder jums, un tai nav termiņa. Atskaitē izmantotas pirkuma dienā spēkā esošās oficiālās vērtības, un datus varat jebkurā laikā izlabot un atskaiti izdrukāt no jauna.",
      devolucion: "Ja atskaite nenoderēs, 7 dienu laikā atbildiet uz šo e-pastu, un atmaksāsim naudu.",
      ayuda: "Radās problēmas? Atbildiet uz šo e-pastu vai rakstiet mums: {contacto}.",
    },
    planilla: {
      encabezado: "Tabulu jau varat lejupielādēt",
      intro: "Paldies par pirkumu ({titulo}). Lejupielādējiet to šeit:",
      boton: "Lejupielādēt tabulu (.xlsx)",
      abre: "To atvērsiet Excel un Google Sheets programmās.",
      guarda: "Saglabājiet šo e-pastu",
      vence: "Saite pieder jums, un tai nav termiņa. {disparador}, tabulu atjauninām, un tajā pašā saitē saņemsiet jaunāko versiju. Maksāt vēlreiz nav vajadzīgs.",
      devolucion: "Ja tabula nenoderēs, 7 dienu laikā atbildiet uz šo e-pastu, un atmaksāsim naudu.",
      ayuda: "Radās problēmas? Atbildiet uz šo e-pastu vai rakstiet mums: {contacto}.",
    },
  },
};
