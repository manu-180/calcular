import type { ClaveFamilia } from "../ofertas-intl";
import type { DiccionarioVenta, TextosFamilia } from "./tipos";

// Rumano (ADR 0002, D18): un solo registro, el de ANAF SPV, BCR e ING Home'Bank. «Dumneavoastră»
// implícito, imperativo de 2.ª del plural en oraciones y botones («Descărcați», «Plătiți») y los
// clíticos «vă»/«-vă». Los mercados van con trato "usted" y todo se escribe en base. Textos neutrales
// entre Rumania y Moldavia: ningún organismo de un solo país, la moneda llega formateada.

const PENTRU_EVIDENTA = { titulo: "Pentru evidența dumneavoastră", texto: "Cu data valorilor folosite în calcul." };
const ALTE_SUME = { titulo: "Cu alte sume", explica: "Același calcul cu sume puțin mai mici și puțin mai mari." };
const ALTE_DOBANZI = { titulo: "Cu alte dobânzi", explica: "Aceleași cifre cu dobânzi puțin mai mici și puțin mai mari." };

const familias: Record<ClaveFamilia, TextosFamilia> = {
  liquidacion: {
    nombre: "Raport cu drepturile la încetarea contractului",
    tituloCorto: "raport cu drepturile la încetarea contractului",
    paraQuien: "Pentru a verifica sumele cuvenite la plecare înainte să semnați sau pentru a le cere, cu cifrele dumneavoastră și legea țării",
    descripcion: [
      "Un raport PDF cu drepturile de la încetarea contractului, defalcate pe fiecare element: cât primiți pentru fiecare, cum se calculează și ce valori oficiale folosește, fiecare cu sursa ei.",
      "Include o listă cu ce trebuie verificat înainte de semnare și o cerere, deja completată cu suma dumneavoastră, pentru a solicita plata în scris.",
    ],
    gancho: "Obțineți în scris sumele cuvenite la plecare, gata de verificat înainte să semnați",
    incluye: [
      { titulo: "Fiecare element cu calculul lui", texto: "Pentru a compara rând cu rând cu ce vă oferă angajatorul." },
      { titulo: "Surse oficiale la vedere", texto: "Fiecare valoare cu instituția care o publică și data la care am verificat-o." },
      { titulo: "Cerere de plată gata făcută", texto: "Completată cu suma dumneavoastră, pentru a cere plata în scris." },
    ],
    pasos: {
      titulo: "Înainte să semnați",
      items: [
        "Comparați fiecare element din acest raport cu documentul pe care vi se cere să îl semnați. Dacă lipsește unul, întrebați de ce înainte de semnare.",
        "Verificați dacă salariul și datele folosite de angajator sunt aceleași cu cele introduse aici. O altă dată de angajare schimbă aproape toate sumele.",
        "Cereți o copie a tot ce semnați și păstrați fluturașii de salariu din ultimele luni.",
        "Dacă diferența este mare sau ați fost concediat, duceți acest raport la inspecția muncii sau la un avocat specializat în dreptul muncii. Le economisește prima oră de calcule.",
      ],
    },
    nota: {
      titulo: "Cerere de plată",
      uso: "Completați-o, semnați-o și depuneți-o împreună cu o copie pentru dumneavoastră. Cereți să vi se semneze copia cu data primirii.",
      pedido: "Prin prezenta solicit plata drepturilor cuvenite la încetarea contractului de muncă, care, potrivit calculului din raportul atașat, se ridică la",
      cierre: "Detaliul atașat arată fiecare element, calculat cu valorile oficiale în vigoare la data indicată. Aștept să îmi comunicați data plății.",
    },
  },
  "pagos-laborales": {
    nombre: "Raport de plăți salariale",
    tituloCorto: "raport de plăți salariale",
    paraQuien: "Pentru a confirma că ați fost plătit corect pentru primă, concediu de odihnă, ore suplimentare sau participare la profit și, dacă nu, pentru a cere diferența",
    descripcion: [
      "Un raport PDF cu calculul făcut, pas cu pas și cu cifrele dumneavoastră: ce bază folosește, cum se socotește și ce valori oficiale se aplică, fiecare cu sursa ei.",
      "Funcționează pentru orice plată din listă. Arată cum o verificați pe fluturașul de salariu și include o cerere pentru a solicita diferența în scris.",
    ],
    gancho: "Obțineți acest calcul în scris, ca să îl comparați cu fluturașul de salariu",
    incluye: [
      { titulo: "Calculul pas cu pas", texto: "Cu datele dumneavoastră și fiecare valoare oficială folosită." },
      { titulo: "Ce căutați pe fluturaș", texto: "Ca să știți într-un minut dacă ați fost plătit corect." },
      { titulo: "Cerere pentru diferență", texto: "Completată cu suma dumneavoastră, gata de depus." },
    ],
    pasos: {
      titulo: "Pentru a verifica plata",
      items: [
        "Căutați acest element pe fluturașul de salariu și comparați-l cu suma din raport.",
        "Dacă nu se potrivește, confirmați mai întâi că datele introduse sunt aceleași pe care le folosește angajatorul.",
        "Dacă tot nu se potrivește, folosiți cererea de mai jos pentru a solicita diferența în scris și păstrați o copie.",
      ],
    },
    nota: {
      titulo: "Cerere de plată",
      uso: "Completați-o, semnați-o și depuneți-o împreună cu o copie pentru dumneavoastră.",
      pedido: "Prin prezenta solicit plata elementului detaliat în raportul atașat, care, potrivit calculului cu valorile oficiale în vigoare, se ridică la",
      cierre: "Dacă suma plătită a fost diferită, vă rog să îmi comunicați în scris cum a fost calculată.",
    },
    escenarios: { titulo: "Dacă se schimbă orele", explica: "Același calcul cu alt număr de ore, pentru a verifica fiecare lună fără să refaceți calculul." },
  },
  impuesto: {
    nombre: "Raport privind impozitul pe venit",
    tituloCorto: "raport privind impozitul pe venit",
    paraQuien: "Pentru a înțelege cât impozit vi se reține, a verifica fluturașul de salariu și a vedea ce se întâmplă dacă se schimbă venitul",
    descripcion: [
      "Un raport PDF cu impozitul calculat pas cu pas, cu baremul oficial care se aplică și sursa fiecărei valori.",
      "Adaugă un tabel cu impozitul la alte venituri, ca să știți dinainte cât vă rămâne după o mărire de salariu sau o schimbare de loc de muncă.",
    ],
    gancho: "Obțineți impozitul explicat în scris și ce se întâmplă dacă se schimbă venitul",
    incluye: [
      { titulo: "Calculul cu baremul oficial", texto: "Pas cu pas, cu sursa fiecărei valori." },
      { titulo: "Impozitul la alte venituri", texto: "Pentru a negocia o mărire știind cât vă rămâne." },
      { titulo: "Ce verificați pe fluturaș", texto: "Pentru a vorbi cu cifre cu angajatorul sau contabilul." },
    ],
    pasos: {
      titulo: "Pentru a verifica reținerea",
      items: [
        "Căutați impozitul reținut pe fluturașul de salariu și comparați-l cu cel din acest raport.",
        "Dacă nu se potrivește, întrebați angajatorul ce venit și ce deduceri folosește.",
        "Păstrați acest raport pentru declarația anuală, dacă trebuie să depuneți una.",
      ],
    },
    escenarios: { titulo: "Dacă se schimbă venitul", explica: "Același calcul cu un venit puțin mai mic și puțin mai mare, cu aceleași valori oficiale." },
  },
  contratacion: {
    nombre: "Buget pentru costul unei angajări",
    tituloCorto: "buget pentru costul angajării",
    paraQuien: "Pentru a ști cât costă cu adevărat o angajare, cu toate contribuțiile, înainte să stabiliți salariul",
    descripcion: [
      "Un buget PDF cu costul complet al angajării, defalcat: salariu, contribuțiile angajatului și ale angajatorului și provizioanele, fiecare valoare cu sursa ei oficială.",
      "Include un tabel cu costul la alte salarii, ca să faceți o ofertă știind cât costă de fapt fiecare unitate în plus, gata de arătat unui asociat sau contabilului.",
    ],
    gancho: "Transformați acest cost într-un buget pentru a decide angajarea",
    incluye: [
      { titulo: "Fiecare contribuție separat", texto: "Cu regula și sursa oficială a fiecăreia." },
      { titulo: "Costul la alte salarii", texto: "Pentru a negocia știind cât adaugă fiecare treaptă." },
      { titulo: "Gata de prezentat", texto: "Unui asociat, contabilului sau pentru evidența dumneavoastră." },
    ],
    pasos: {
      titulo: "Înainte de angajare",
      items: [
        "Verificați cu contabilul dacă domeniul dumneavoastră are un contract colectiv sau un salariu minim mai mare decât cel general.",
        "Puneți deoparte în fiecare lună provizioanele din acest buget: sunt plăți care vin toate odată la sfârșitul anului sau la încetarea contractului.",
        "Înregistrați persoana din prima zi: costul din acest buget include deja contribuțiile legale.",
      ],
    },
    escenarios: { titulo: "Costul la alte salarii", explica: "Același calcul cu salarii mai mici și mai mari, cu aceleași valori oficiale." },
  },
  "ajuste-inflacion": {
    nombre: "Scrisoare de actualizare cu inflația",
    tituloCorto: "scrisoare de actualizare cu inflația",
    paraQuien: "Pentru a cere sau a anunța actualizarea unei chirii, a unei rate, a unui onorariu sau a unui salariu după indicele oficial",
    descripcion: [
      "O scrisoare gata de trimis, completată cu suma actualizată, plus justificarea calculului: indicele oficial pentru fiecare dată, instituția care îl publică și linkul către sursă.",
      "Cu justificarea la vedere, cealaltă parte poate verifica cifra într-un minut, iar discuția se poartă despre indice, nu despre calcule.",
    ],
    gancho: "Transformați această actualizare într-o scrisoare gata de trimis, susținută de indicele oficial",
    incluye: [
      { titulo: "Scrisoarea completată", texto: "Cu suma actualizată, gata de tipărit sau de trimis." },
      { titulo: "Indicele oficial ca justificare", texto: "Cu instituția, data și linkul către sursă." },
      { titulo: "Calculul la vedere", texto: "Ca cealaltă parte să îl poată verifica singură." },
    ],
    nota: {
      titulo: "Scrisoare de actualizare",
      uso: "Completați-o cu datele înțelegerii și predați-o împreună cu detaliul calculului.",
      pedido: "Prin prezenta vă comunic actualizarea sumei convenite potrivit evoluției indicelui oficial al prețurilor de consum, conform calculului atașat. Suma actualizată este de",
      cierre: "Calculul folosește indicele publicat de instituția oficială indicată în detaliu, care poate fi verificat la sursa citată.",
    },
  },
  regimen: {
    nombre: "Raport privind regimul fiscal simplificat",
    tituloCorto: "raport privind regimul simplificat",
    paraQuien: "Pentru a ști cât plătiți în regimul fiscal simplificat și ce se întâmplă dacă venitul crește sau scade",
    descripcion: [
      "Un raport PDF cu impozitul sau cota din regimul simplificat, calculate pas cu pas cu baremul oficial și sursa fiecărei valori.",
      "Adaugă un tabel cu ce ați plăti la alte venituri, ca să vedeți din timp o schimbare de prag.",
    ],
    gancho: "Obțineți regimul în scris și vedeți ce se întâmplă dacă se schimbă venitul",
    incluye: [
      { titulo: "Calculul cu baremul oficial", texto: "Pas cu pas, cu sursa fiecărei valori." },
      { titulo: "Ce ați plăti la alte venituri", texto: "Pentru a vedea din timp o schimbare de prag." },
      PENTRU_EVIDENTA,
    ],
    escenarios: { titulo: "Dacă se schimbă venitul", explica: "Același calcul cu venituri mai mici și mai mari, cu aceleași valori oficiale." },
  },
  deposito: {
    nombre: "Comparație de depozite la termen",
    tituloCorto: "comparație de depozite",
    paraQuien: "Pentru a compara depozitul pe mai multe termene înainte să alegeți unde și pe cât timp economisiți",
    descripcion: ["Un raport PDF cu randamentul depozitului și un tabel cu același depozit pe alte termene, totul cu aceleași calcule ca în calculator."],
    gancho: "Comparați depozitul pe mai multe termene într-un singur raport",
    incluye: [
      { titulo: "Depozitul pe mai multe termene", texto: "Într-un singur tabel, ca să alegeți dintr-o privire." },
      { titulo: "Calculul pas cu pas", texto: "Cu sursa fiecărei valori folosite." },
      PENTRU_EVIDENTA,
    ],
    escenarios: { titulo: "Depozitul pe alte termene", explica: "Același calcul cu alte termene." },
  },
  alimentos: {
    nombre: "Raport privind pensia de întreținere",
    tituloCorto: "raport privind pensia de întreținere",
    paraQuien: "Pentru a ajunge la mediere sau la discuția despre pensia de întreținere cu o cifră bine argumentată",
    descripcion: ["Un raport PDF cu suma estimată a pensiei de întreținere, pas cu pas, cu valorile oficiale și sursa lor, plus un tabel cu suma la alte venituri."],
    gancho: "Mergeți la mediere cu acest calcul în scris",
    incluye: [
      { titulo: "Un calcul bine argumentat", texto: "Pas cu pas, cu sursa fiecărei valori." },
      { titulo: "Suma la alte venituri", texto: "Pentru a negocia cu scenariile la vedere." },
      { titulo: "Pentru avocat sau mediator", texto: "Le economisește prima oră de calcule." },
    ],
    escenarios: { titulo: "La alte venituri", explica: "Același calcul cu venituri mai mici și mai mari." },
  },
  jubilacion: {
    nombre: "Proiecție de pensie",
    tituloCorto: "proiecție de pensie",
    paraQuien: "Pentru a vă planifica pensionarea cu o proiecție în scris și a vedea ce se schimbă dacă contribuiți mai mult",
    descripcion: ["Un raport PDF cu pensia estimată pas cu pas, cu valorile oficiale și sursa lor, plus un tabel cu proiecția la alte salarii."],
    gancho: "Obțineți proiecția pensiei în scris",
    incluye: [
      { titulo: "Estimarea pas cu pas", texto: "Cu sursa fiecărei valori." },
      { titulo: "La alte salarii", texto: "Pentru a vedea ce se schimbă dacă contribuiți mai mult." },
      PENTRU_EVIDENTA,
    ],
    escenarios: { titulo: "La alte salarii", explica: "Același calcul cu salarii mai mici și mai mari." },
  },
  "plan-prestamo": {
    nombre: "Plan de credit",
    tituloCorto: "plan de credit",
    paraQuien: "Pentru a ști cât vă costă de fapt un credit și a compara ofertele înainte să semnați",
    descripcion: [
      "Un raport PDF cu tot creditul: rata lunară, totalul pe care îl veți returna și cât din el este dobândă.",
      "Dacă ați calculat rata, enumeră fiecare plată în parte. Rulează și aceleași cifre cu alte dobânzi, ca să comparați ofertele băncilor cu cifre reale.",
    ],
    gancho: "Comparați ofertele de credit cu cifrele dumneavoastră înainte să semnați",
    incluye: [
      { titulo: "Creditul cu alte dobânzi", texto: "Pentru a vedea cât schimbă un punct în plus sau în minus." },
      { titulo: "Costul total la vedere", texto: "Cât plătiți ca dobândă, fără litere mici." },
      { titulo: "Listă de verificat înainte de semnare", texto: "Întrebările care merită puse creditorului." },
    ],
    pasos: {
      titulo: "Înainte să semnați creditul",
      items: [
        "Cereți dobânda anuală efectivă (DAE), cu toate costurile incluse, nu doar dobânda nominală. Pe aceasta o comparați.",
        "Întrebați de comisionul de acordare, asigurările obligatorii și orice cost pentru rambursarea anticipată.",
        "Comparați cel puțin trei oferte cu tabelul cu alte dobânzi din acest raport.",
        "Alegeți o rată pe care o puteți plăti și într-o lună proastă. Ca regulă practică, să nu treacă de o treime din venit.",
      ],
    },
    escenarios: ALTE_DOBANZI,
  },
  "plan-hipoteca": {
    nombre: "Plan de credit ipotecar",
    tituloCorto: "plan de credit ipotecar",
    paraQuien: "Pentru a decide asupra unui credit ipotecar cu toate cifrele la vedere: rata, dobânda și ce se întâmplă dacă se schimbă dobânda",
    descripcion: [
      "Un raport PDF cu tot creditul ipotecar: rata lunară, totalul pe care îl veți plăti și cât merge la dobândă de-a lungul anilor.",
      "Include complet fiecare tabel din calcul (pagina gratuită arată doar primele rânduri) și aceleași cifre cu alte dobânzi. Dacă ați comparat chiria cu cumpărarea, pune comparația în scris, ca să decideți în familie.",
    ],
    gancho: "Mergeți la bancă cu tabelul complet și cu alte dobânzi",
    incluye: [
      { titulo: "Tabelul complet", texto: "Toate rândurile, nu doar primele." },
      { titulo: "Creditul cu alte dobânzi", texto: "Pentru a vedea cât schimbă rata un punct în plus sau în minus." },
      { titulo: "Întrebări pentru bancă", texto: "Ce confirmați înainte să semnați." },
    ],
    pasos: {
      titulo: "Înainte să semnați creditul ipotecar",
      items: [
        "Cereți oferta în scris, cu dobânda, perioada și costul total, inclusiv asigurările și comisioanele.",
        "Întrebați dacă dobânda este fixă sau variabilă și ce se întâmplă cu rata dacă dobânda crește.",
        "Verificați cât costă rambursarea anticipată și dacă puteți face plăți în plus fără penalități.",
        "Adunați la rată costurile locuinței (impozite, asigurare, întreținere) înainte să decideți cât vă permiteți.",
      ],
    },
    escenarios: ALTE_DOBANZI,
  },
  "plan-inversion": {
    nombre: "Plan de economii și investiții",
    tituloCorto: "plan de economii",
    paraQuien: "Pentru a vedea cum cresc economiile în timp și ce se schimbă dacă puneți mai mult deoparte sau obțineți altă dobândă",
    descripcion: [
      "Un raport PDF cu proiecția economiilor: cât depuneți, cât câștigați din dobândă și cu cât rămâneți la final.",
      "Include complet fiecare tabel din calcul și aceleași cifre cu alte dobânzi, ca să alegeți unde economisiți cu cifre reale.",
    ],
    gancho: "Obțineți planul de economii în scris, an cu an",
    incluye: [
      { titulo: "Proiecția completă", texto: "Toate rândurile tabelului, nu doar primele." },
      { titulo: "Cu alte dobânzi", texto: "Pentru a compara opțiunile înainte să alegeți." },
      { titulo: "Un plan pe care îl puteți respecta", texto: "Pașii care transformă intenția în economii." },
    ],
    pasos: {
      titulo: "Pentru ca planul să meargă",
      items: [
        "Programați transferul în ziua în care primiți salariul: ce nu vedeți nu cheltuiți.",
        "Comparați dobânda cu inflația: dacă dobânda e mai mică, banii pierd din valoare chiar dacă cifra crește.",
        "Deschideți din nou acest raport o dată pe an și actualizați-vă cifrele.",
      ],
    },
    escenarios: ALTE_DOBANZI,
  },
  "plan-deudas": {
    nombre: "Plan de rambursare a cardului de credit",
    tituloCorto: "plan de rambursare a cardului",
    paraQuien: "Pentru a ști când terminați de plătit cardul, cât vă costă dobânda și cum terminați mai repede",
    descripcion: [
      "Un raport PDF cu datoria lună de lună: cât plătiți, cât merge la dobândă și cât de repede scade soldul.",
      "Include tabelul complet până la ultima plată și aceleași cifre cu alte plăți, ca să vedeți cât economisiți plătind puțin mai mult în fiecare lună.",
    ],
    gancho: "Vedeți lună de lună când veți termina de plătit cardul",
    incluye: [
      { titulo: "Lună de lună până la ultima plată", texto: "Cu dobânda plătită în fiecare lună." },
      { titulo: "Cu alte plăți", texto: "Pentru a vedea cu cât terminați mai repede plătind puțin mai mult." },
      { titulo: "O cale de ieșire", texto: "Pașii pentru a rămâne fără datorii." },
    ],
    pasos: {
      titulo: "Pentru a ieși din datorii",
      items: [
        "Nu mai folosiți cardul cât timp îl rambursați: fiecare cumpărătură nouă lungește tabelul.",
        "Plătiți mereu mai mult decât suma minimă. Chiar și puțin ajută, iar tabelul cu alte plăți arată cât.",
        "Dacă aveți mai multe datorii, plătiți întâi dobânda cea mai mare și suma minimă la celelalte.",
        "Întrebați banca de un transfer de sold sau o refinanțare cu dobândă mai mică și comparați-le cu acest raport.",
      ],
    },
    escenarios: { titulo: "Cu alte plăți lunare", explica: "Aceeași datorie plătind puțin mai puțin și puțin mai mult în fiecare lună." },
  },
  "plan-presupuesto": {
    nombre: "Plan de buget",
    tituloCorto: "plan de buget",
    paraQuien: "Pentru a vă organiza luna cu un plan clar: cât merge la nevoi, la dorințe și la economii",
    descripcion: [
      "Un raport PDF care transformă calculul într-un plan: cât puneți deoparte pentru fiecare lucru, în moneda dumneavoastră și cu cifrele dumneavoastră.",
      "Include același plan cu alte sume, ca să știți dinainte ce se schimbă într-o lună cu mai mulți sau mai puțini bani, și pașii pentru a-l respecta.",
    ],
    gancho: "Transformați acest calcul într-un plan pentru luna dumneavoastră",
    incluye: [
      { titulo: "Planul cu cifrele dumneavoastră", texto: "Cât merge unde, gata de urmat." },
      { titulo: "Cu alte sume", texto: "Pentru a ajusta planul când se schimbă luna." },
      { titulo: "Pași pentru a-l respecta", texto: "Ce face ca un buget să reziste după prima lună." },
    ],
    pasos: {
      titulo: "Pentru ca bugetul să funcționeze",
      items: [
        "Mutați economiile în ziua salariului, înainte să cheltuiți. Ce rămâne este ce puteți cheltui.",
        "Notați-vă cheltuielile timp de o lună, chiar și pe telefon, și comparați-le cu acest plan.",
        "Construiți mai întâi un fond de urgență, ca o surpriză să nu ajungă pe cardul de credit.",
      ],
    },
    escenarios: ALTE_SUME,
  },
  "plan-negocio": {
    nombre: "Raport cu cifrele afacerii",
    tituloCorto: "raport cu cifrele afacerii",
    paraQuien: "Pentru a decide asupra prețurilor, marjelor sau unei investiții cu cifre clare, gata de arătat unui asociat",
    descripcion: [
      "Un raport PDF cu calculul explicat pas cu pas: ce date folosește, cum se calculează și ce rezultat dă.",
      "Adaugă un tabel cu același calcul la alte sume, ca să vedeți cum se schimbă rezultatul dacă un cost crește sau scădeți prețul.",
    ],
    gancho: "Transformați aceste cifre într-un raport pentru decizie sau pentru a-l împărtăși",
    incluye: [
      { titulo: "Calculul explicat", texto: "Ca să îl înțelegeți și să îl susțineți în fața unui asociat sau a unei bănci." },
      { titulo: "Cu alte sume", texto: "Pentru a vedea din timp efectul unei schimbări de preț sau de cost." },
      { titulo: "Întrebări înainte de decizie", texto: "Ce verificați înainte să schimbați un preț." },
    ],
    pasos: {
      titulo: "Înainte să decideți",
      items: [
        "Asigurați-vă că în costuri intră totul: transport, comisioane, taxe și propriul timp.",
        "Comparați prețul cu doi sau trei concurenți înainte să îl schimbați.",
        "Uitați-vă la cel mai rău caz din tabel: dacă afacerea rezistă acolo, decizia este mai sigură.",
      ],
    },
    escenarios: ALTE_SUME,
  },
  "kit-freelance": {
    nombre: "Kit de tarif pentru freelanceri",
    tituloCorto: "kit de tarif pentru freelanceri",
    paraQuien: "Pentru a cere cât valorează munca dumneavoastră și a vă prezenta tariful cu încredere",
    descripcion: [
      "Un raport PDF cu tariful orar explicat: venitul pe care îl urmăriți, orele pe care le puteți factura cu adevărat și costurile pe care le acoperă.",
      "Include tariful pentru alte ținte de venit și o scrisoare gata de trimis unui client, cu tariful orar.",
    ],
    gancho: "Prezentați tariful cu cifre, nu cu scuze",
    incluye: [
      { titulo: "Tariful explicat", texto: "Pentru când cineva întreabă de ce cereți atât." },
      { titulo: "Pentru alte ținte de venit", texto: "Tariful de care aveți nevoie pentru fiecare." },
      { titulo: "Scrisoare de tarif gata făcută", texto: "Completată cu cifra dumneavoastră, de trimis clienților." },
    ],
    pasos: {
      titulo: "Pentru a cere cât valorați",
      items: [
        "Socotiți doar orele facturabile: ședințele, ofertele și urmărirea facturilor sunt tot muncă.",
        "Când se poate, cereți un preț pe proiect: clientul cumpără un rezultat, nu ore.",
        "Revizuiți tariful o dată pe an sau mai devreme, dacă vă cresc costurile.",
      ],
    },
    nota: {
      titulo: "Scrisoare de tarif",
      uso: "Completați-o cu datele clientului și trimiteți-o împreună cu propunerea.",
      pedido: "În urma discuției noastre, vă transmit tariful pentru serviciile profesionale despre care am vorbit. Tariful meu orar este de",
      cierre: "Tariful acoperă timpul de lucru și costurile activității mele. Pot pregăti cu plăcere și o propunere pe proiect.",
    },
    escenarios: { titulo: "Pentru alte ținte de venit", explica: "Același calcul cu ținte de venit mai mici și mai mari." },
  },
  "plan-sueldo": {
    nombre: "Raport de salariu",
    tituloCorto: "raport de salariu",
    paraQuien: "Pentru a negocia un salariu, o ofertă sau o mărire știind cât înseamnă pe oră, pe lună și pe an",
    descripcion: [
      "Un raport PDF cu calculul salariului explicat, cu cifrele dumneavoastră și fiecare valoare folosită.",
      "Adaugă un tabel cu alte sume, ca să comparați oferte sau să cereți o mărire cu cifre clare.",
    ],
    gancho: "Negociați salariul cu cifrele în scris",
    incluye: [
      { titulo: "Calculul complet", texto: "Cu fiecare cifră introdusă." },
      { titulo: "Cu alte sume", texto: "Pentru a compara două oferte într-un minut." },
      { titulo: "Sfaturi de negociere", texto: "Ce să spuneți și ce să cereți pe lângă cifră." },
    ],
    pasos: {
      titulo: "Pentru a negocia",
      items: [
        "Vorbiți în sume anuale sau orare când comparați oferte: cifrele lunare ascund diferențe.",
        "Cereți și ce nu este salariu: zile libere, muncă de acasă, cursuri sau o primă.",
        "Veniți cu o cifră concretă și motivul ei: experiența, piața sau ce s-a schimbat în rolul dumneavoastră.",
      ],
    },
    escenarios: ALTE_SUME,
  },
  "kit-calculos": {
    nombre: "Calcul explicat pas cu pas",
    tituloCorto: "calcul explicat",
    paraQuien: "Pentru a avea calculul rezolvat și explicat, gata de tipărit, de studiat sau de trimis",
    descripcion: [
      "Un raport PDF cu calculul, cum se rezolvă și rezultatul, cu cifrele dumneavoastră.",
      "Folosiți-l pentru a învăța, pentru a păstra evidența unui calcul sau pentru a-l arăta cuiva fără să mai explicați.",
    ],
    gancho: "Luați calculul cu dumneavoastră, explicat pas cu pas",
    incluye: [
      { titulo: "Calculul rezolvat", texto: "Cu datele dumneavoastră și rezultatul." },
      { titulo: "Cum se calculează", texto: "Pentru a vedea de unde vine fiecare cifră." },
      { titulo: "Gata de tipărit", texto: "Sau de salvat ca PDF și de trimis." },
    ],
    pasos: {
      titulo: "Pentru a-l verifica",
      items: ["Faceți calculul invers: plecați de la rezultat și ajungeți la valoarea de pornire.", "Rotunjiți doar la final: rotunjirea la fiecare pas schimbă rezultatul."],
    },
    escenarios: ALTE_SUME,
  },
  "kit-gastos-grupo": {
    nombre: "Rezumatul cheltuielilor de grup",
    tituloCorto: "rezumatul cheltuielilor",
    paraQuien: "Ca toată lumea să știe cât are de dat, fără discuții și fără socoteli pe un șervețel",
    descripcion: [
      "Un rezumat PDF al notei grupului: totalul, cât plătește fiecare persoană și, dacă e nevoie, cine cui datorează.",
      "Trimiteți-l prin mesaj sau tipăriți-l, ca nimeni să nu mai refacă socoteala.",
    ],
    gancho: "Împărțiți nota cu grupul, clar și fără discuții",
    incluye: [
      { titulo: "Cât plătește fiecare", texto: "Cu totalul și detaliul la vedere." },
      { titulo: "Gata de trimis", texto: "Ca PDF, pentru grup." },
      { titulo: "Cu alte totaluri", texto: "Pentru cazul în care se mai adaugă ceva la notă." },
    ],
    pasos: {
      titulo: "Pentru a vă achita",
      items: ["Trimiteți rezumatul grupului înainte să plătească cineva: evitați neînțelegerile.", "Stabiliți un mod de plată și o dată pentru decontare."],
    },
    escenarios: { titulo: "Cu alte totaluri", explica: "Aceeași împărțire dacă totalul este puțin mai mic sau puțin mai mare." },
  },
  "kit-estudio": {
    nombre: "Raport de medie a notelor",
    tituloCorto: "raport de medie",
    paraQuien: "Pentru a avea media clară și în scris, cu ponderea fiecărei note",
    descripcion: [
      "Un raport PDF cu media: fiecare notă, ponderea ei și cum se ajunge la rezultat.",
      "Folosiți-l pentru a verifica o notă, a planifica următorul examen sau a arăta calculul cui are nevoie.",
    ],
    gancho: "Obțineți media explicată în scris",
    incluye: [
      { titulo: "Fiecare notă cu ponderea ei", texto: "Pentru a vedea care contează cel mai mult." },
      { titulo: "Calculul pas cu pas", texto: "Pentru a-l verifica sau a-l arăta." },
      { titulo: "Idei pentru următorul examen", texto: "Cum folosiți media pentru a vă organiza." },
    ],
    pasos: {
      titulo: "Pentru următorul examen",
      items: ["Vedeți ce notă are ponderea cea mai mare și acordați mai mult timp acelei materii sau acelui examen.", "Dacă o notă pare calculată greșit, duceți acest raport profesorului."],
    },
  },
  "kit-fechas": {
    nombre: "Raport de date și termene",
    tituloCorto: "raport de date",
    paraQuien: "Pentru a avea o dată sau un termen calculat în scris, gata de depus sau ca să nu îl uitați",
    descripcion: [
      "Un raport PDF cu calculul datelor: datele introduse, rezultatul și cum se numără zilele.",
      "Folosiți-l pentru un dosar, un contract, un termen de plată sau pur și simplu pentru evidență.",
    ],
    gancho: "Puneți această dată în scris, gata de depus",
    incluye: [
      { titulo: "Calculul explicat", texto: "Cu datele și felul în care se numără zilele." },
      { titulo: "Gata de depus", texto: "La un dosar sau atașat unui contract." },
      { titulo: "Pentru evidența dumneavoastră", texto: "Cu data la care a fost făcut." },
    ],
    pasos: {
      titulo: "Înainte să folosiți o dată într-un dosar",
      items: [
        "Verificați dacă termenul se socotește în zile calendaristice sau lucrătoare: rezultatul se schimbă.",
        "Vedeți dacă ultima zi cade într-o zi de sărbătoare sau la sfârșit de săptămână.",
        "Treceți termenul în calendar, cu un memento cu câteva zile înainte.",
      ],
    },
  },
  "plan-salud": {
    nombre: "Raport IMC și calorii",
    tituloCorto: "raport IMC și calorii",
    paraQuien: "Pentru a avea în scris cifrele despre greutate și energie și a le duce la consultație",
    descripcion: [
      "Un raport PDF cu rezultatul explicat: ce măsoară, cum se calculează și în ce interval se încadrează, cu datele dumneavoastră.",
      "Este o informație generală, de discutat cu un specialist în sănătate. Nu este un diagnostic și nu înlocuiește consultația.",
    ],
    gancho: "Duceți cifrele la consultație, explicate și în scris",
    incluye: [
      { titulo: "Rezultatul explicat", texto: "Ce măsoară și cum se calculează." },
      { titulo: "Întrebări pentru consultație", texto: "Pentru a profita mai mult de vizită." },
      { titulo: "Pentru a urmări evoluția", texto: "Păstrați fiecare raport și comparați în timp." },
    ],
    pasos: {
      titulo: "Pentru discuția cu un specialist",
      items: [
        "Luați acest raport cu dumneavoastră și întrebați ce interval este sănătos în cazul dumneavoastră, după vârstă și istoric.",
        "Spuneți cum mâncați, cât vă mișcați și cum dormiți: cifrele singure nu spun toată povestea.",
        "Nu faceți schimbări mari în alimentație sau în exerciții fără să întrebați mai întâi.",
      ],
    },
    aviso: "Informație generală. Nu înlocuiește sfatul unui specialist în sănătate.",
  },
  "plan-embarazo": {
    nombre: "Raport de fertilitate și sarcină",
    tituloCorto: "raport de fertilitate și sarcină",
    paraQuien: "Pentru a avea datele estimate în scris și a le duce la următorul control",
    descripcion: [
      "Un raport PDF cu datele estimate și cum se calculează fiecare, cu datele introduse.",
      "Datele sunt estimări: fiecare corp și fiecare sarcină sunt diferite. Vă ajută să vă organizați și să vorbiți cu un specialist în sănătate și nu înlocuiesc un control.",
    ],
    gancho: "Aveți datele în scris pentru următorul control",
    incluye: [
      { titulo: "Datele estimate", texto: "Cu felul în care se calculează fiecare." },
      { titulo: "Întrebări pentru control", texto: "Pentru a profita cât mai mult de vizită." },
      { titulo: "Pentru evidența dumneavoastră", texto: "Cu datele folosite." },
    ],
    pasos: {
      titulo: "Pentru următorul control",
      items: [
        "Luați la consultație acest raport și data ultimei menstruații.",
        "Întrebați ce analize urmează în săptămâna în care sunteți și când este următorul control.",
        "Dacă un simptom vă îngrijorează, mergeți la medic fără să așteptați datele din raport.",
      ],
    },
    aviso: "Informație generală. Datele sunt estimări și nu înlocuiesc îngrijirea unui specialist în sănătate.",
  },
  "plan-entrenamiento": {
    nombre: "Raport de ritm de alergare",
    tituloCorto: "raport de ritm",
    paraQuien: "Pentru a ieși la alergat știind ritmul țintă și cum împărțiți efortul",
    descripcion: [
      "Un raport PDF cu ritmul, timpul și viteza explicate, cu datele introduse.",
      "Include complet fiecare tabel din calcul și sfaturi pentru a folosi ritmul la antrenament.",
    ],
    gancho: "Aveți ritmul în scris pentru ziua cursei",
    incluye: [
      { titulo: "Ritmul explicat", texto: "Cu timp și viteză." },
      { titulo: "De tipărit și de purtat", texto: "În buzunar sau pe frigider." },
      { titulo: "Sfaturi de antrenament", texto: "Cum folosiți ritmul fără să vă accidentați." },
    ],
    pasos: {
      titulo: "Pentru a folosi ritmul",
      items: [
        "Începeți primele minute puțin mai încet decât ritmul țintă: finalul vă va mulțumi.",
        "Faceți cea mai mare parte a antrenamentului săptămânal într-un ritm ușor, la care încă puteți vorbi.",
        "Dacă vă doare ceva, opriți-vă și mergeți la un control: ritmul poate aștepta.",
      ],
    },
    aviso: "Informație generală. Nu înlocuiește sfatul unui specialist în sănătate sau în sport.",
  },
  "kit-viaje": {
    nombre: "Bugetul de combustibil pentru călătorie",
    tituloCorto: "buget de combustibil",
    paraQuien: "Pentru a ști cât veți cheltui pe combustibil și a împărți suma între toți cei care călătoresc",
    descripcion: [
      "Un raport PDF cu costul combustibilului pentru călătorie, cu cifrele dumneavoastră: distanță, consum și preț.",
      "Adaugă un tabel cu alte prețuri ale combustibilului, pentru cazul în care se schimbă înainte de plecare, și o listă pentru bugetul restului călătoriei.",
    ],
    gancho: "Aveți costul călătoriei în scris înainte de plecare",
    incluye: [
      { titulo: "Costul călătoriei", texto: "Cu distanță, consum și preț." },
      { titulo: "La alte prețuri", texto: "Pentru cazul în care combustibilul se scumpește înainte de plecare." },
      { titulo: "Listă pentru restul călătoriei", texto: "Taxe de drum, parcare și mese." },
    ],
    pasos: {
      titulo: "Pentru bugetul călătoriei",
      items: [
        "Adunați la costul combustibilului taxele de drum, parcarea și mesele.",
        "Dacă merg mai multe persoane, împărțiți totalul și anunțați-i pe toți înainte de plecare.",
        "Verificați presiunea în pneuri: cu presiune mică, mașina consumă mai mult.",
      ],
    },
    escenarios: { titulo: "La alte prețuri", explica: "Aceeași călătorie cu combustibil puțin mai ieftin și puțin mai scump." },
  },
  "kit-hogar": {
    nombre: "Raport privind costul energiei electrice",
    tituloCorto: "raport privind costul energiei",
    paraQuien: "Pentru a ști cât vă costă fiecare aparat și unde puteți economisi la factura de energie",
    descripcion: [
      "Un raport PDF cu cât vă costă aparatul, cu cifrele de consum și prețul energiei electrice.",
      "Adaugă un tabel cu alte prețuri ale energiei și o listă de idei pentru a reduce factura.",
    ],
    gancho: "Aflați cât vă costă acest aparat și cum reduceți costul",
    incluye: [
      { titulo: "Costul cu consumul dumneavoastră", texto: "Explicat pas cu pas." },
      { titulo: "La alte prețuri", texto: "Pentru cazul în care tariful crește." },
      { titulo: "Idei de economisire", texto: "Cele care se simt cel mai mult pe factură." },
    ],
    pasos: {
      titulo: "Pentru a reduce factura",
      items: [
        "Scoateți din priză ce rămâne în modul de așteptare: aparatele oprite consumă în continuare.",
        "Porniți aparatele cele mai mari în orele cele mai ieftine, dacă tariful are astfel de ore.",
        "Comparați acest raport cu factura, ca să vedeți ce parte din total este acest aparat.",
      ],
    },
    escenarios: { titulo: "La alte prețuri", explica: "Același consum cu energie puțin mai ieftină și puțin mai scumpă." },
  },
  "kit-obra": {
    nombre: "Listă de materiale de construcție",
    tituloCorto: "listă de materiale",
    paraQuien: "Pentru a cumpăra materialele în cantitatea potrivită, fără să lipsească și fără să rămână",
    descripcion: [
      "Un raport PDF cu calculul materialelor: dimensiuni, cantități și cum se calculează, gata de dus la magazin.",
      "Vine cu o listă pentru o cumpărătură bună: marja pentru pierderi, ce să întrebați și ce să verificați înainte să începeți.",
    ],
    gancho: "Intrați în magazin cu lista de materiale în mână",
    incluye: [
      { titulo: "Dimensiuni și cantități", texto: "Tot ce ați calculat, pe o singură pagină." },
      { titulo: "De arătat la magazin", texto: "Ca să vi se dea o ofertă exact pentru ce aveți nevoie." },
      { titulo: "Listă pentru o cumpărătură bună", texto: "Marja pentru pierderi și ce să verificați." },
    ],
    pasos: {
      titulo: "Înainte să cumpărați",
      items: [
        "Adăugați între 5% și 10% pentru tăieturi și spărturi, sau mai mult dacă forma este neregulată.",
        "Cumpărați totul din același lot: culoarea și nuanța pot varia de la un lot la altul.",
        "Întrebați de randamentul produsului ales: diferă de la o marcă la alta.",
        "Păstrați bonul și ce rămâne nedesfăcut: multe magazine primesc produsele înapoi.",
      ],
    },
  },
  "kit-facturacion": {
    nombre: "Raport TVA",
    tituloCorto: "raport TVA",
    paraQuien: "Pentru a factura sau a verifica un preț cu taxa separată clar, gata pentru evidență sau pentru contabil",
    descripcion: [
      "Un raport PDF cu calculul: prețul fără TVA, TVA-ul și totalul, cu cota care se aplică și sursa ei.",
      "Adaugă un tabel cu alte sume, util pentru a face o listă de prețuri cu și fără TVA.",
    ],
    gancho: "Aveți prețul cu și fără TVA în scris",
    incluye: [
      { titulo: "Taxa separată", texto: "Suma netă, TVA-ul și totalul, cu cota în vigoare." },
      { titulo: "Cu alte sume", texto: "Pentru a face o listă de prețuri dintr-odată." },
      { titulo: "Pentru contabil", texto: "Cu sursa cotei și data." },
    ],
    pasos: {
      titulo: "Înainte să facturați",
      items: [
        "Verificați dacă produsul sau serviciul are cota standard sau una redusă.",
        "Asigurați-vă că factura arată separat suma netă și TVA-ul, acolo unde este obligatoriu.",
        "Păstrați acest raport împreună cu factura, pentru evidență.",
      ],
    },
    escenarios: ALTE_SUME,
  },
  "informe-calculo": {
    nombre: "Raport de calcul",
    tituloCorto: "raport de calcul",
    paraQuien: "Pentru a avea acest calcul în scris, cu cifrele dumneavoastră, ce presupune și de unde vine fiecare valoare oficială",
    descripcion: [
      "Un raport PDF al calculului pe care tocmai l-ați făcut, pas cu pas, cu datele dumneavoastră: rezultatul, ipotezele din spatele lui și fiecare valoare oficială cu sursa și data la care a fost verificată.",
      "Păstrați-l la dosar sau dați-l contabilului, angajatorului sau oricui trebuie să îl verifice, fără să mai explicați fiecare cifră.",
    ],
    gancho: "Obțineți acest calcul în scris, cu sursele lui",
    incluye: [
      { titulo: "Rezultatul", texto: "Exact cum l-ați calculat, gata de tipărit." },
      { titulo: "Cum se ajunge la el", texto: "Pașii și ipotezele, ca fiecare cifră să poată fi urmărită." },
      { titulo: "Sursele oficiale", texto: "Fiecare valoare cu instituția, linkul și data verificării." },
    ],
    pasos: {
      titulo: "Înainte să îl folosiți",
      items: [
        "Verificați dacă datele de sus sunt ale dumneavoastră: rezultatul depinde de ele.",
        "Dacă o valoare oficială s-a schimbat, refaceți calculul: raportul folosește valorile în vigoare în ziua cumpărării.",
      ],
    },
  },
};

export const ro: DiccionarioVenta = {
  familias,
  general: { si: "Da", no: "Nu" },
  tarjeta: {
    cejaInforme: "Raport PDF",
    cejaPlanilla: "Foaie de calcul Excel",
    pagoUnico: "plată unică",
    comprarInforme: "Obțineți raportul",
    comprarPlanilla: "Obțineți foaia de calcul",
    confianza: "Plătiți cu PayPal sau cu cardul. Dacă nu vă este de folos, vă returnăm banii în 7 zile.",
    verDetalle: "Vedeți ce conține",
    tambien: "V-ar putea fi util și:",
    tablasOficiales: "Tabele oficiale",
    bajadaInforme: "Raportul îl explică pas cu pas, cu cifrele dumneavoastră și sursa fiecărei valori, gata de tipărit sau de salvat ca PDF.",
    bajadaPlanilla: "Foaia de calcul îl conține cu cifrele dumneavoastră și formulele la vedere, ca să schimbați ce doriți.",
    bajadaPlanillaHoja: "Foaia de calcul îl conține în fila „{hoja}”, cu cifrele dumneavoastră și formulele la vedere, ca să schimbați ce doriți.",
    equivale: "Aproximativ {monto} la cursul de azi.",
    cobroDolares: "Plata se face în dolari americani.",
  },
  aviso: {
    pronto: "În curând",
    titulo: "Anunțați-mă când este disponibil",
    ayuda: "Vă scriem o singură dată, când intră în vânzare.",
    boton: "Anunțați-mă",
    listo: "Gata. Vă trimitem un e-mail imediat ce intră în vânzare.",
    error: "Nu am putut salva adresa de e-mail. Verificați dacă este scrisă corect și încercați din nou.",
    correo: "Adresa de e-mail",
  },
  planilla: {
    gancho: "Duceți acest calcul în Excel, cu datele deja completate",
    incluye: [
      { titulo: "Datele deja completate", texto: "Schimbați o celulă galbenă și totul se recalculează." },
      { titulo: "Salariu, prime și drepturi la plecare", texto: "Într-un singur fișier pe care îl folosiți tot anul." },
      { titulo: "Actualizată la fiecare schimbare oficială", texto: "Același link vă dă versiunea nouă, fără să plătiți din nou." },
    ],
  },
  informe: {
    tusDatos: "Datele dumneavoastră",
    resultado: "Rezultat",
    corregir: "Corectați datele",
    actualizar: "Actualizați raportul",
    imprimir: "Tipăriți sau salvați ca PDF",
    imprimirAyuda: "În fereastra de tipărire, alegeți „Salvare ca PDF” pentru a obține fișierul.",
    sinResultado: "Completați datele la „Corectați datele” pentru a genera raportul.",
    lugar: "Locul și data",
    destinatario: "Către",
    firma: "Semnătura",
    nombre: "Nume",
    documento: "Nr. actului de identitate",
    etiquetaEnMinuscula: true,
    comoSeCalcula: "Cum se calculează",
    fuentes: "Surse oficiale",
    verificado: "verificat la",
    emitido: "Emis la",
    valores: "Valori oficiale în vigoare la",
    numero: "Raport",
    elegir: "Alegeți calculul pentru raport:",
    legal:
      "Acest raport este o estimare pe baza regulilor și a valorilor oficiale indicate, la data indicată. Nu înlocuiește sfatul unui specialist sau decizia autorității competente. Dacă vreuna dintre date este diferită, rezultatul se schimbă: corectați-o și tipăriți din nou.",
    legalSinFuentes: "Acest raport este o estimare pe baza datelor introduse, la data indicată. Nu înlocuiește sfatul unui specialist. Dacă se schimbă vreo dată, se schimbă și rezultatul: corectați-o și tipăriți din nou.",
    errorTitulo: "Nu am putut deschide acest raport",
    error: "Nu am putut confirma plata pentru acest link. Dacă banii au fost retrași din cont, scrieți-ne și rezolvăm. Dacă plata nu s-a finalizat, o puteți face din nou.",
    verificar: "Nu am putut verifica plata în acest moment. Încercați din nou peste câteva minute: nu este nevoie să plătiți încă o dată.",
    cupo: "Prea multe încercări la rând. Așteptați câteva minute și deschideți din nou linkul.",
  },
  catalogo: {
    tituloProducto: "{nombre} ({pais})",
    disparadorInforme: "De fiecare dată când se schimbă o valoare oficială folosită în calcul",
    planillaDescripcion: "O foaie de calcul Excel gata de folosit: introduceți datele în celulele galbene și calculul se face singur, cu formule care urmează {normas}.",
    planillaIncluye: "Include {incluye}. Fiecare filă arată pașii, iar fila cu tabelele oficiale enumeră fiecare valoare cu sursa ei și data la care am verificat-o.",
  },
  planillas: {
    migaPlanillas: "Foi de calcul și rapoarte",
    catalogoTitulo: "Foi de calcul și rapoarte: {pais}",
    catalogoBajada: "Foi de calcul Excel și rapoarte PDF cu cifrele dumneavoastră și datele oficiale ale țării. Plătiți o singură dată, fără abonament.",
    seccionPlanillas: "Foi de calcul Excel",
    seccionInformes: "Rapoarte PDF",
    catalogoVacio: "Foile de calcul pentru {pais} vin în curând. Până atunci, calculatoarele sunt gratuite.",
    verCalculadoras: "Vedeți calculatoarele",
    comprar: "Cumpărați cu {precio}",
    pronto: "În curând",
    incluye: "Ce include",
    incluyeInforme: [
      "Raportul cu cifrele dumneavoastră, pe o pagină pe care o puteți tipări sau salva ca PDF.",
      "Un link care nu expiră niciodată: puteți corecta datele și tipări din nou oricând doriți.",
      "Dacă nu vă este de folos, vă returnăm banii în 7 zile.",
    ],
    incluyePlanilla: [
      "Fișierul .xlsx, care se deschide în Excel și în Google Sheets.",
      "Actualizări: {disparador}, o actualizăm, iar același link descarcă versiunea nouă.",
      "Dacă nu vă este de folos, vă returnăm banii în 7 zile.",
    ],
    pagoUnico: "Plată unică prin PayPal. Puteți plăti din contul PayPal sau cu cardul.",
    comprarPlanilla: "Cumpărați: {titulo}",
    comprarBajadaInforme: "Vă trimitem linkul către raport la această adresă imediat ce plata este confirmată.",
    comprarBajadaPlanilla: "Vă trimitem foaia de calcul la această adresă imediat ce plata este confirmată.",
    etiquetaEmail: "Adresa de e-mail",
    seguirPago: "Continuați spre plată",
    privacidad: "Folosim adresa de e-mail doar pentru a vă trimite cumpărătura și actualizările ei.",
    datosTitulo: "Cu cifrele din calculul dumneavoastră",
    datosUsar: "Folosiți aceste cifre în cumpărătura mea. Se păstrează doar pentru a pregăti cumpărătura.",
    errores: {
      email: "Verificați adresa de e-mail: pare să lipsească ceva.",
      error: "Nu am putut iniția plata. Nu vi s-a încasat nimic. Încercați din nou peste câteva minute.",
      cancelado: "Ați anulat plata. Nu vi s-a încasat nimic.",
      fallido: "PayPal nu a aprobat plata. Puteți încerca alt card.",
      pronto: "Nu este încă în vânzare.",
    },
    graciasTitulo: "Vă mulțumim pentru cumpărătură",
    graciasListoInforme: "Plata este confirmată. Puteți deschide acum produsul cumpărat: {titulo}. V-am trimis și linkul pe e-mail, iar acesta nu expiră niciodată.",
    graciasListoPlanilla: "Plata este confirmată. Puteți descărca acum produsul cumpărat: {titulo}. V-am trimis-o și pe e-mail, cu un link care nu expiră niciodată.",
    graciasPendiente: "Așteptăm confirmarea de la PayPal. Imediat ce sosește, vă trimitem cumpărătura pe e-mail.",
    muestraIntro: "Aceasta este fila „{hoja}” cu datele de exemplu cu care se deschide. Calculul este cel de azi, cu valorile oficiale în vigoare.",
    muestraLeyenda: ["completați dumneavoastră", "calculează foaia"],
    comprobar: "Verificați înainte să plătiți: calculatorul gratuit dă aceleași cifre. Încercați același caz și comparați.",
    comprobarEnlace: "Mergeți la calculatorul gratuit",
    faqTitulo: "Întrebări frecvente",
    faq: {
      sheets: {
        pregunta: "Funcționează în Google Sheets și în Excel?",
        respuesta: "Da. Este un fișier .xlsx: se deschide în Excel și în Google Sheets (îl încărcați în Drive și îl deschideți de acolo). Calculele folosesc formule obișnuite, fără macrocomenzi.",
      },
      recibo: {
        pregunta: "Cum o primesc?",
        respuesta: "Imediat ce plata este confirmată, v-o trimitem pe e-mail, cu un link de descărcare care nu expiră niciodată. O puteți descărca și din pagina care se deschide la finalul plății.",
      },
      dolares: {
        pregunta: "Plata se face în dolari americani?",
        respuesta: "Da. Prețul este în dolari americani (USD) și plătiți prin PayPal, din cont sau cu cardul.",
        conReferencia: "Mai sus afișăm o sumă aproximativă în moneda dumneavoastră la cursul de azi, doar ca reper: suma finală depinde de cursul folosit de bancă sau de card.",
        sinReferencia: "Dacă cardul este în altă monedă, conversia o face banca.",
      },
      devolucion: { pregunta: "Pot primi banii înapoi?", respuesta: "Da. Dacă foaia de calcul nu vă este de folos, răspundeți la e-mailul de livrare în 7 zile și vă returnăm banii." },
      actualiza: { pregunta: "Se actualizează când se schimbă valorile oficiale?", respuesta: "Da. {disparador}, o actualizăm, iar același link descarcă versiunea nouă." },
    },
    descargar: "Descărcați foaia de calcul (.xlsx)",
    abrirInforme: "Deschideți raportul",
    fuentes: "Surse oficiale folosite",
    calculadoras: "Funcționează cu aceste calculatoare",
    muestra: "Cum arată",
  },
  correo: {
    asuntoInforme: "Cumpărătura dumneavoastră pe CalcularYa: {titulo}",
    asuntoPlanilla: "{titulo}: descărcare și actualizări",
    mismosNumeros: "Cifrele sunt aceleași ca în {enlace}, cu datele oficiale.",
    enlaceCalculadora: "calculatorul gratuit CalcularYa",
    comprobante: "Aceasta este dovada cumpărăturii dumneavoastră pe {marca}.",
    informe: {
      encabezado: "Raportul este gata de deschis",
      intro: "Vă mulțumim pentru cumpărătură: {titulo}. Îl deschideți de aici:",
      boton: "Deschideți raportul",
      abre: "Se deschide în browser. De acolo îl puteți tipări sau salva ca PDF.",
      guarda: "Păstrați acest e-mail",
      vence: "Linkul este al dumneavoastră și nu expiră niciodată. Raportul folosește valorile oficiale în vigoare în ziua cumpărării, iar datele le puteți corecta și tipări din nou oricând doriți.",
      devolucion: "Dacă raportul nu vă este de folos, răspundeți la acest e-mail în 7 zile și vă returnăm banii.",
      ayuda: "Aveți vreo problemă? Răspundeți la acest e-mail sau scrieți-ne la {contacto}.",
    },
    planilla: {
      encabezado: "Foaia de calcul este gata",
      intro: "Vă mulțumim pentru cumpărătură: {titulo}. O descărcați de aici:",
      boton: "Descărcați foaia de calcul (.xlsx)",
      abre: "Se deschide în Excel și în Google Sheets.",
      guarda: "Păstrați acest e-mail",
      vence: "Linkul este al dumneavoastră și nu expiră niciodată. {disparador}, actualizăm foaia de calcul, iar același link vă dă versiunea curentă. Nu trebuie să plătiți din nou.",
      devolucion: "Dacă foaia de calcul nu vă este de folos, răspundeți la acest e-mail în 7 zile și vă returnăm banii.",
      ayuda: "Aveți vreo problemă? Răspundeți la acest e-mail sau scrieți-ne la {contacto}.",
    },
  },
};
