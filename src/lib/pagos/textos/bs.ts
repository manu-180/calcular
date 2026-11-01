import type { ClaveFamilia } from "../ofertas-intl";
import type { DiccionarioVenta, TextosFamilia } from "./tipos";

// Bosnio (ADR 0002, D39): un solo registro, el de los bancos y la administración pública.
// Obraćanje na «vi» en minúscula y el imperativo de segunda del plural en la prosa («preuzmite»,
// «uporedite»), nunca «ti»; los botones en la forma corta de las interfaces croatas («Preuzmi»,
// «Kupi»). Las cartas del informe van en primera persona formal. Los textos de las familias sirven
// a cualquier país: nada de organismos de un solo país. El país llega en el marcador {pais} sin
// declinar, así que va en nominativo entre paréntesis. Comillas „ ”.
const ZA_VASU_EVIDENCIJU = { titulo: "Za vašu evidenciju", texto: "S datumom vrijednosti koje je izračun koristio." };
const DRUGI_IZNOSI = { titulo: "S drugim iznosima", explica: "Isti izračun s nešto manjim i nešto većim iznosima." };
const DRUGE_STOPE = { titulo: "S drugim kamatnim stopama", explica: "Iste brojke s nešto nižim i nešto višim kamatnim stopama." };

const familias: Record<ClaveFamilia, TextosFamilia> = {
  liquidacion: {
    nombre: "Izvještaj o konačnom obračunu pri prestanku radnog odnosa",
    tituloCorto: "izvještaj o konačnom obračunu",
    paraQuien: "Da biste provjerili konačni obračun pri odlasku s posla prije nego što ga potpišete ili zatražite, s vašim brojkama i prema propisima vaše zemlje",
    descripcion: [
      "PDF izvještaj s obračunom razloženim po stavkama: koliko vam pripada po svakoj, kako je izračunato i koje su službene vrijednosti primijenjene, svaka s izvorom.",
      "Uz to dobijate popis onoga što treba provjeriti prije potpisivanja i dopis s već upisanim iznosom, kojim isplatu tražite u pisanom obliku.",
    ],
    gancho: "Imajte konačni obračun u pisanom obliku i provjerite ga prije potpisivanja",
    incluye: [
      { titulo: "Svaka stavka s izračunom", texto: "Za poređenje, red po red, s ponudom poslodavca." },
      { titulo: "Službeni izvori na uvid", texto: "Svaka vrijednost s institucijom koja je objavljuje i datumom naše provjere." },
      { titulo: "Gotov dopis sa zahtjevom", texto: "S upisanim vašim iznosom, za pisani zahtjev za isplatu." },
    ],
    pasos: {
      titulo: "Prije potpisivanja",
      items: [
        "Uporedite svaku stavku iz ovog izvještaja s dokumentom koji trebate potpisati. Ako nešto nedostaje, pitajte zašto prije nego što potpišete.",
        "Provjerite slažu li se plaća i datumi s kojima računa poslodavac s onima koje ste ovdje unijeli. Drugi datum zaposlenja mijenja gotovo sve iznose.",
        "Zatražite primjerak svega što potpisujete i sačuvajte platne liste za posljednje mjesece.",
        "Ako je razlika velika ili ste dobili otkaz, pokažite ovaj izvještaj inspekciji rada u svojoj zemlji ili advokatu za radno pravo. Uštedjet ćete im prvi sat računanja.",
      ],
    },
    nota: {
      titulo: "Zahtjev za isplatu",
      uso: "Popunite, potpišite i predajte zajedno s primjerkom za sebe. Zatražite da vam na primjerku potpisom i datumom potvrde primitak.",
      pedido: "Molim isplatu iznosa koji mi pripadaju po osnovi prestanka radnog odnosa i koji prema izračunu u priloženom izvještaju iznose",
      cierre: "Priloženi izračun navodi svaku stavku izračunatu prema službenim vrijednostima važećima na navedeni datum. Molim da me obavijestite o datumu isplate.",
    },
  },
  "pagos-laborales": {
    nombre: "Izvještaj o isplatama iz radnog odnosa",
    tituloCorto: "izvještaj o isplatama",
    paraQuien: "Da biste bili sigurni da su vam bonus, regres, prekovremeni rad ili udio u dobiti dobro obračunati, a ako nisu, da zatražite razliku",
    descripcion: [
      "PDF izvještaj s vašim izračunom korak po korak i s vašim brojkama: koja je osnovica uzeta, kako se računa i koje službene vrijednosti vrijede, svaka s izvorom.",
      "Vrijedi za svaku isplatu s popisa. Pokazuje kako je provjeriti na platnoj listi i sadrži dopis kojim razliku tražite u pisanom obliku.",
    ],
    gancho: "Imajte ovaj izračun u pisanom obliku i uporedite ga s platnom listom",
    incluye: [
      { titulo: "Izračun korak po korak", texto: "S vašim podacima i svakom službenom vrijednošću koju primjenjuje." },
      { titulo: "Šta tražiti na platnoj listi", texto: "Da za minutu vidite da li ste dobro plaćeni." },
      { titulo: "Dopis sa zahtjevom za razliku", texto: "S upisanim vašim iznosom, spreman za predaju." },
    ],
    pasos: {
      titulo: "Kako provjeriti isplatu",
      items: [
        "Pronađite ovu isplatu na platnoj listi i uporedite je s iznosom iz ovog izvještaja.",
        "Ako se ne slaže, prvo provjerite slažu li se podaci koje ste unijeli s onima s kojima računa poslodavac.",
        "Ako se ni tada ne slaže, upotrijebite dopis u nastavku i zatražite razliku u pisanom obliku. Primjerak sačuvajte.",
      ],
    },
    nota: {
      titulo: "Zahtjev za isplatu razlike",
      uso: "Popunite, potpišite i predajte zajedno s primjerkom za sebe.",
      pedido: "Molim isplatu iznosa navedenog u priloženom izvještaju, koji prema izračunu s važećim službenim vrijednostima iznosi",
      cierre: "Ako je isplaćeni iznos bio drukčiji, molim pisano objašnjenje kako je obračunat.",
    },
    escenarios: { titulo: "Kada se broj sati mijenja", explica: "Isti izračun s drugim brojem sati, za provjeru svakog mjeseca bez novog računanja." },
  },
  impuesto: {
    nombre: "Izvještaj o porezu na dohodak",
    tituloCorto: "izvještaj o porezu",
    paraQuien: "Da biste znali koliko vam se poreza odbija, provjerili platnu listu i vidjeli što se događa kada se prihod promijeni",
    descripcion: [
      "PDF izvještaj s vašim porezom izračunatim korak po korak, sa službenom tabelom koja se primjenjuje i izvorom svake vrijednosti.",
      "Uz to dobijate tabelu poreza za druge iznose prihoda, da unaprijed znate koliko vam ostaje nakon povišice ili promjene posla.",
    ],
    gancho: "Imajte objašnjenje svojeg poreza u pisanom obliku i pogledajte što se događa kada se prihod promijeni",
    incluye: [
      { titulo: "Izračun po službenoj tabeli", texto: "Korak po korak, s izvorom svake vrijednosti." },
      { titulo: "Vaš porez za druge prihode", texto: "Da o povišici pregovarate znajući koliko vam ostaje." },
      { titulo: "Šta provjeriti na platnoj listi", texto: "Da s poslodavcem ili knjigovođom razgovarate jezikom brojki." },
    ],
    pasos: {
      titulo: "Kako provjeriti odbijeni porez",
      items: [
        "Pronađite odbijeni porez na platnoj listi i uporedite ga s iznosom iz ovog izvještaja.",
        "Ako se ne slaže, pitajte poslodavca s kojim prihodom i kojim olakšicama računa.",
        "Sačuvajte ovaj izvještaj za godišnju poreznu prijavu, ako se u vašoj zemlji podnosi.",
      ],
    },
    escenarios: { titulo: "Kada se prihod mijenja", explica: "Isti izračun s nešto manjim i nešto većim prihodom, s istim službenim vrijednostima." },
  },
  contratacion: {
    nombre: "Budžet troškova zaposlenika",
    tituloCorto: "budžet troškova zaposlenika",
    paraQuien: "Da biste znali koliko vas novi zaposlenik zaista košta, sa svim doprinosima, prije nego što dogovorite platu",
    descripcion: [
      "PDF budžet s ukupnim troškom zaposlenika razloženim po dijelovima: plata, doprinosi na teret zaposlenika i poslodavca i rezervacije, svaka vrijednost sa službenim izvorom.",
      "Sadrži tabelu troškova za druge iznose plate, da ponudu date znajući koliko vas svaka povišica zaista košta, i spreman je za slanje poslovnom partneru ili knjigovođi.",
    ],
    gancho: "Pretvorite ove troškove u budžet i odlučite o zapošljavanju",
    incluye: [
      { titulo: "Svaki doprinos posebno", texto: "S pravilom i službenim izvorom za svaki." },
      { titulo: "Troškovi za druge plate", texto: "Da pregovarate znajući koliko dodaje svaki korak naviše." },
      { titulo: "Spremno za slanje", texto: "Poslovnom partneru, knjigovođi ili za vašu evidenciju." },
    ],
    pasos: {
      titulo: "Prije nego što nekoga zaposlite",
      items: [
        "Provjerite s knjigovođom vrijedi li u vašoj djelatnosti kolektivni ugovor ili minimalna plata viša od opće.",
        "Rezervacije iz ovog budžeta odvajajte svakog mjeseca: to su isplate koje se skupe na kraju godine ili pri prestanku ugovora.",
        "Zaposlenika prijavite od prvog dana: troškovi u ovom budžetu već računaju s obaveznim doprinosima.",
      ],
    },
    escenarios: { titulo: "Troškovi za druge plate", explica: "Isti izračun s nižim i višim platama, s istim službenim vrijednostima." },
  },
  "ajuste-inflacion": {
    nombre: "Dopis o usklađivanju s inflacijom",
    tituloCorto: "dopis o usklađivanju",
    paraQuien: "Da biste zatražili ili najavili usklađivanje kirije, rate, honorara ili plate prema službenom indeksu",
    descripcion: [
      "Dopis spreman za predaju, s upisanim novim iznosom i dokazom izračuna: službeni indeks za svaki datum, institucija koja ga objavljuje i link na izvor.",
      "Kada je dokaz na uvidu, druga strana brojku potvrdi za minutu i razgovor se vodi o indeksu, a ne o računanju.",
    ],
    gancho: "Pretvorite ovo usklađivanje u gotov dopis sa službenim indeksom kao dokazom",
    incluye: [
      { titulo: "Popunjen dopis", texto: "S vašim novim iznosom, za štampu ili slanje." },
      { titulo: "Službeni indeks kao dokaz", texto: "S institucijom, datumom i linkom na izvor." },
      { titulo: "Izračun na uvid", texto: "Da druga strana sama dođe do iste brojke." },
    ],
    nota: {
      titulo: "Obavijest o usklađivanju",
      uso: "Popunite podacima iz ugovora i predajte zajedno s izračunom.",
      pedido: "Obavještavam vas o usklađivanju ugovorenog iznosa prema kretanju službenog indeksa potrošačkih cijena, kako navodi priloženi izračun. Usklađeni iznos je",
      cierre: "Izračun koristi indeks koji objavljuje službena institucija navedena u prilogu i može se provjeriti u navedenom izvoru.",
    },
  },
  regimen: {
    nombre: "Izvještaj o pojednostavljenom oporezivanju",
    tituloCorto: "izvještaj o pojednostavljenom oporezivanju",
    paraQuien: "Da biste znali koliko plaćate u sistemu pojednostavljenog oporezivanja i što se događa kada prihod raste ili pada",
    descripcion: [
      "PDF izvještaj s vašim avansom ili porezom u pojednostavljenom sistemu, izračunatim korak po korak po službenoj tabeli i s izvorom svake vrijednosti.",
      "Uz to dobijate tabelu s iznosima koje biste plaćali uz druge prihode, da unaprijed vidite prelazak u drugi razred.",
    ],
    gancho: "Imajte svoj izračun u pisanom obliku i pogledajte što se događa kada se prihod promijeni",
    incluye: [
      { titulo: "Vaš izračun po službenoj tabeli", texto: "Korak po korak, s izvorom svake vrijednosti." },
      { titulo: "Koliko biste plaćali uz druge prihode", texto: "Da prelazak u drugi razred vidite unaprijed." },
      ZA_VASU_EVIDENCIJU,
    ],
    escenarios: { titulo: "Kada se prihod mijenja", explica: "Isti izračun s nižim i višim prihodom, s istim službenim vrijednostima." },
  },
  deposito: {
    nombre: "Poređenje oročene štednje",
    tituloCorto: "poređenje štednje",
    paraQuien: "Da biste uporedili svoju oročenu štednju na različite rokove prije nego što odlučite gdje i na koliko dugo ostaviti novac",
    descripcion: ["PDF izvještaj s prinosom vaše oročene štednje i tabelom istog iznosa na druge rokove, sve istim izračunom kao u kalkulatoru."],
    gancho: "Uporedite štednju na više rokova u jednom izvještaju",
    incluye: [
      { titulo: "Vaša štednja na više rokova", texto: "U jednoj tabeli, da izaberete na prvi pogled." },
      { titulo: "Izračun korak po korak", texto: "S izvorom svake vrijednosti koju koristi." },
      ZA_VASU_EVIDENCIJU,
    ],
    escenarios: { titulo: "Vaša štednja na druge rokove", explica: "Isti izračun s drugim rokovima oročenja." },
  },
  alimentos: {
    nombre: "Izvještaj o uzdržavanju",
    tituloCorto: "izvještaj o uzdržavanju",
    paraQuien: "Da biste na medijaciju ili pregovore o uzdržavanju došli s obrazloženim iznosom",
    descripcion: ["PDF izvještaj s okvirnim iznosom uzdržavanja, korak po korak, sa službenim vrijednostima i njihovim izvorom te s tabelom iznosa uz druge prihode."],
    gancho: "Dođite na medijaciju s ovim izračunom u pisanom obliku",
    incluye: [
      { titulo: "Obrazložen izračun", texto: "Korak po korak, s izvorom svake vrijednosti." },
      { titulo: "Iznos uz druge prihode", texto: "Da pregovarate i vidite različite mogućnosti." },
      { titulo: "Za vašeg advokata ili medijatora", texto: "Uštedjet ćete im prvi sat računanja." },
    ],
    escenarios: { titulo: "Uz druge prihode", explica: "Isti izračun s nižim i višim prihodima." },
  },
  jubilacion: {
    nombre: "Procjena penzije",
    tituloCorto: "procjena penzije",
    paraQuien: "Da biste penziju planirali s pisanom procjenom i vidjeli što se mijenja ako plaćate veće doprinose",
    descripcion: ["PDF izvještaj s okvirnim iznosom penzije korak po korak, sa službenim vrijednostima i njihovim izvorom te s tabelom procjene za druge plate."],
    gancho: "Imajte procjenu svoje penzije u pisanom obliku",
    incluye: [
      { titulo: "Procjena korak po korak", texto: "S izvorom svake vrijednosti." },
      { titulo: "Za druge plate", texto: "Da vidite što se mijenja ako plaćate veće doprinose." },
      ZA_VASU_EVIDENCIJU,
    ],
    escenarios: { titulo: "Za druge plate", explica: "Isti izračun s nižim i višim platama." },
  },
  "plan-prestamo": {
    nombre: "Plan otplate kredita",
    tituloCorto: "plan otplate kredita",
    paraQuien: "Da biste znali koliko vas kredit zaista košta i uporedili ponude prije potpisivanja",
    descripcion: [
      "PDF izvještaj s cijelim vašim kreditom: rata, ukupan iznos koji ćete platiti i koliko od toga čini kamata.",
      "Ako ste računali ratu, izvještaj sadrži svaku ratu posebno. Iste su brojke izračunate i s drugim kamatnim stopama, da ponude banaka uporedite na stvarnim brojkama.",
    ],
    gancho: "Uporedite ponude kredita na svojim brojkama prije potpisivanja",
    incluye: [
      { titulo: "Vaš kredit s drugim stopama", texto: "Da vidite što mu čini jedan procentualni bod gore ili dolje." },
      { titulo: "Ukupna cijena na uvid", texto: "Koliko plaćate kamate, bez sitnih slova." },
      { titulo: "Popis prije potpisivanja", texto: "Pitanja koja vrijedi postaviti banci." },
    ],
    pasos: {
      titulo: "Prije nego što potpišete ugovor o kreditu",
      items: [
        "Pitajte za efektivnu kamatnu stopu (EKS), koja obuhvata sve troškove, a ne samo za nominalnu kamatnu stopu. Ponude vrijedi upoređivati upravo po njoj.",
        "Pitajte za naknadu za obradu kredita, obavezno osiguranje i naknadu za prijevremenu otplatu.",
        "Uporedite barem tri ponude prema tabeli s drugim stopama iz ovog izvještaja.",
        "Izaberite ratu koju možete plaćati i u lošijem mjesecu. Okvirno, manje od trećine prihoda.",
      ],
    },
    escenarios: DRUGE_STOPE,
  },
  "plan-hipoteca": {
    nombre: "Plan stambenog kredita",
    tituloCorto: "plan stambenog kredita",
    paraQuien: "Da biste o stambenom kreditu odlučili sa svim brojkama pred sobom: rata, kamata i što se događa kada se kamatna stopa promijeni",
    descripcion: [
      "PDF izvještaj s cijelim vašim stambenim kreditom: rata, ukupan iznos koji ćete platiti i koliko od toga tokom godina odlazi na kamatu.",
      "Sadrži potpune tabele vašeg izračuna (besplatna stranica prikazuje samo prve redove) i iste brojke s drugim kamatnim stopama. Ako ste upoređivali najam i kupovinu, poređenje imate u pisanom obliku i možete odlučiti s cijelom porodicom.",
    ],
    gancho: "Dođite u banku s potpunom tabelom stambenog kredita i drugim kamatnim stopama",
    incluye: [
      { titulo: "Potpuna tabela", texto: "Svi redovi, ne samo prvi." },
      { titulo: "Vaš stambeni kredit s drugim stopama", texto: "Da vidite što s ratom čini jedan procentualni bod gore ili dolje." },
      { titulo: "Pitanja za banku", texto: "Šta provjeriti prije potpisivanja." },
    ],
    pasos: {
      titulo: "Prije nego što potpišete ugovor o stambenom kreditu",
      items: [
        "Zatražite ponudu u pisanom obliku, s kamatnom stopom, rokom otplate i ukupnim troškom, zajedno s osiguranjem i naknadama.",
        "Pitajte da li je kamatna stopa fiksna ili promjenjiva i što se događa s ratom ako referentna stopa poraste.",
        "Raspitajte se koliko košta prijevremena otplata i možete li vanredno otplaćivati bez penala.",
        "Rati dodajte troškove stanovanja (porez na nekretnine, osiguranje, održavanje) prije nego što odlučite koliko si možete priuštiti.",
      ],
    },
    escenarios: DRUGE_STOPE,
  },
  "plan-inversion": {
    nombre: "Plan štednje i ulaganja",
    tituloCorto: "plan štednje",
    paraQuien: "Da biste vidjeli kako vaša ušteđevina raste s vremenom i što se mijenja ako odvajate više ili dobijete drugu kamatnu stopu",
    descripcion: [
      "PDF izvještaj s procjenom vaše ušteđevine: koliko uplaćujete, koliko dobijate od kamate i koliko ćete imati na kraju.",
      "Sadrži potpune tabele vašeg izračuna i iste brojke s drugim kamatnim stopama, da gdje štedjeti birate na stvarnim brojkama.",
    ],
    gancho: "Imajte plan štednje u pisanom obliku, godinu po godinu",
    incluye: [
      { titulo: "Potpuna procjena", texto: "Svi redovi tabele, ne samo prvi." },
      { titulo: "S drugim stopama", texto: "Da uporedite mogućnosti prije nego što izaberete." },
      { titulo: "Plan koji se može provesti", texto: "Koraci zahvaljujući kojima namjera postaje ušteđevina." },
    ],
    pasos: {
      titulo: "Da plan uspije",
      items: [
        "Postavite trajni nalog za dan isplate plate: ono što ne vidite, ne trošite.",
        "Uporedite kamatnu stopu s inflacijom: kada je stopa niža, vaš novac gubi vrijednost iako brojka raste.",
        "Jednom godišnje ponovno otvorite ovaj izvještaj i ažurirajte svoje brojke.",
      ],
    },
    escenarios: DRUGE_STOPE,
  },
  "plan-deudas": {
    nombre: "Plan otplate kreditne kartice",
    tituloCorto: "plan otplate kartice",
    paraQuien: "Da biste znali kada ćete otplatiti karticu, koliko će vas to stajati kamata i kako to učiniti ranije",
    descripcion: [
      "PDF izvještaj s vašim dugom mjesec po mjesec: koliko plaćate, koliko odlazi na kamatu i koliko brzo dug opada.",
      "Sadrži potpunu tabelu do posljednje uplate i iste brojke s drugim mjesečnim uplatama, da vidite koliko štedite ako svakog mjeseca platite malo više.",
    ],
    gancho: "Pogledajte mjesec po mjesec kada ćete otplatiti karticu",
    incluye: [
      { titulo: "Mjesec po mjesec do posljednje uplate", texto: "S kamatom koju plaćate svakog mjeseca." },
      { titulo: "S drugim uplatama", texto: "Da vidite koliko ranije završavate ako plaćate malo više." },
      { titulo: "Put iz duga", texto: "Koraci da ponovno ne upadnete u dugove." },
    ],
    pasos: {
      titulo: "Kako izaći iz duga",
      items: [
        "Dok otplaćujete, ne koristite karticu: svaka nova kupovina produžuje tabelu.",
        "Uvijek plaćajte više od minimalne uplate. Pomaže i malo, a tabela s drugim uplatama pokazuje koliko.",
        "Ako imate više dugova, prvo otplaćujte onaj s najvišom kamatnom stopom, a za ostale plaćajte minimum.",
        "Pitajte svoju banku za refinanciranje uz nižu kamatnu stopu i uporedite ga s ovim izvještajem.",
      ],
    },
    escenarios: { titulo: "S drugim mjesečnim uplatama", explica: "Isti dug ako svakog mjeseca platite malo manje i malo više." },
  },
  "plan-presupuesto": {
    nombre: "Plan kućnog budžeta",
    tituloCorto: "plan budžeta",
    paraQuien: "Da biste mjesec organizirali po jasnom planu: koliko ide na potrebe, želje i štednju",
    descripcion: [
      "PDF izvještaj koji od vašeg izračuna izrađuje plan: koliko odvojiti za svaku stavku, u vašoj valuti i s vašim brojkama.",
      "Sadrži isti plan s drugim iznosima, da unaprijed znate što se mijenja u mjesecu s više ili manje novca, i korake da ga se držite.",
    ],
    gancho: "Pretvorite ovaj izračun u plan svojeg mjeseca",
    incluye: [
      { titulo: "Vaš plan s vašim brojkama", texto: "Koliko gdje ide, spremno za upotrebu." },
      { titulo: "S drugim iznosima", texto: "Da plan prilagodite kada mjesec bude drukčiji." },
      { titulo: "Koraci da se plana držite", texto: "Šta pomaže da budžet traje duže od prvog mjeseca." },
    ],
    pasos: {
      titulo: "Da budžet uspije",
      items: [
        "Ušteđevinu odvojite na dan isplate plate, prije troškova. Ono što ostane, možete potrošiti.",
        "Tokom mjeseca zapisujte troškove, makar u telefonu, i uporedite ih s ovim planom.",
        "Prvo stvorite rezervu za hitne slučajeve, da neočekivani trošak ne završi na kreditnoj kartici.",
      ],
    },
    escenarios: DRUGI_IZNOSI,
  },
  "plan-negocio": {
    nombre: "Izvještaj s brojkama vašeg posla",
    tituloCorto: "izvještaj za vaš posao",
    paraQuien: "Da biste o cijenama, marži ili ulaganju odlučivali na temelju jasnih brojki, spremnih za poslovnog partnera",
    descripcion: [
      "PDF izvještaj s vašim izračunom objašnjenim korak po korak: koji su podaci korišteni, kako se računa i kakav je rezultat.",
      "Uz to dobijate tabelu s istim izračunom za druge iznose, da vidite kako se rezultat mijenja kada troškovi porastu ili kada spustite cijenu.",
    ],
    gancho: "Pretvorite ove brojke u izvještaj za odluku ili za poslovnog partnera",
    incluye: [
      { titulo: "Objašnjen izračun", texto: "Da ga razumijete i obranite pred partnerom ili bankom." },
      { titulo: "S drugim iznosima", texto: "Da unaprijed vidite uticaj promjene cijene ili troškova." },
      { titulo: "Pitanja prije odluke", texto: "Šta provjeriti prije nego što promijenite cijenu." },
    ],
    pasos: {
      titulo: "Prije odluke",
      items: [
        "Provjerite da li ste u troškove uključili sve: prevoz, provizije, poreze i vlastito vrijeme.",
        "Prije nego što promijenite cijenu, uporedite je s dva ili tri konkurenta.",
        "Pogledajte najgori scenarij u tabeli: ako ga posao izdrži, odluka je sigurnija.",
      ],
    },
    escenarios: DRUGI_IZNOSI,
  },
  "kit-freelance": {
    nombre: "Paket za satnicu freelancera",
    tituloCorto: "paket za satnicu",
    paraQuien: "Da biste za svoj rad tražili onoliko koliko vrijedi i satnicu navodili sa sigurnošću",
    descripcion: [
      "PDF izvještaj s objašnjenjem vaše satnice: prihod kojem težite, sati koji se zaista mogu naplatiti i troškovi koje satnica pokriva.",
      "Sadrži satnicu za druge ciljne prihode i gotov dopis za klijenta s vašom satnicom.",
    ],
    gancho: "Navodite svoju satnicu s brojkama, a ne s izgovorima",
    incluye: [
      { titulo: "Objašnjenje vaše satnice", texto: "Za trenutak kada neko pita zašto baš toliko." },
      { titulo: "Za druge ciljne prihode", texto: "Satnica koja vam je potrebna za svaki od njih." },
      { titulo: "Gotov dopis sa satnicom", texto: "S upisanom vašom brojkom, za slanje klijentima." },
    ],
    pasos: {
      titulo: "Da naplaćujete koliko treba",
      items: [
        "Računajte samo sate koje možete naplatiti: sastanci, ponude i podsjetnici na plaćanje također su posao.",
        "Kada je moguće, nudite cijenu po projektu: klijent kupuje rezultat, a ne sate.",
        "Satnicu preispitajte jednom godišnje, ili ranije ako vam troškovi porastu.",
      ],
    },
    nota: {
      titulo: "Dopis sa satnicom",
      uso: "Popunite podacima klijenta i pošaljite zajedno sa svojom ponudom.",
      pedido: "Na temelju našeg razgovora šaljem vam svoju cijenu za dogovorene stručne usluge. Moja satnica iznosi",
      cierre: "Satnica pokriva radno vrijeme i troškove obavljanja moje djelatnosti. Na zahtjev ću pripremiti i ponudu s cijenom za cijeli projekt.",
    },
    escenarios: { titulo: "Za druge ciljne prihode", explica: "Isti izračun s nižim i višim ciljnim prihodima." },
  },
  "plan-sueldo": {
    nombre: "Izvještaj o plati",
    tituloCorto: "izvještaj o plati",
    paraQuien: "Da biste o plati, ponudi ili povišici pregovarali znajući koliko to iznosi po satu, mjesečno i godišnje",
    descripcion: [
      "PDF izvještaj s objašnjenjem izračuna vaše plate, s vašim brojkama i svakom vrijednošću koju koristi.",
      "Uz to dobijate tabelu s drugim iznosima, da uporedite ponude ili tražite povišicu s jasnim brojkama.",
    ],
    gancho: "Pregovarajte o plati s brojkama u ruci",
    incluye: [
      { titulo: "Vaš potpuni izračun", texto: "Sa svakom vrijednošću koju ste unijeli." },
      { titulo: "S drugim iznosima", texto: "Da uporedite dvije ponude za minutu." },
      { titulo: "Savjeti za pregovore", texto: "Šta reći i što tražiti osim same brojke." },
    ],
    pasos: {
      titulo: "Kako se dogovoriti",
      items: [
        "Kada upoređujete ponude, govorite o godišnjim iznosima ili iznosima po satu: mjesečne brojke skrivaju razliku.",
        "Tražite i ono što nije plata: dodatne dane godišnjeg odmora, rad od kuće, edukacije ili bonuse.",
        "Dođite s konkretnom brojkom i obrazloženjem: vaše iskustvo, tržište ili ono što se promijenilo u vašem poslu.",
      ],
    },
    escenarios: DRUGI_IZNOSI,
  },
  "kit-calculos": {
    nombre: "Izračun s objašnjenjem korak po korak",
    tituloCorto: "izračun s objašnjenjem",
    paraQuien: "Da biste imali izračun riješen i objašnjen, spreman za štampu, učenje ili predaju",
    descripcion: [
      "PDF izvještaj s vašim izračunom, postupkom rješavanja i rezultatom, s vašim brojkama.",
      "Upotrijebite ga za učenje, kao zapis izračuna ili da ga nekome pokažete bez dodatnog objašnjavanja.",
    ],
    gancho: "Ponesite izračun sa sobom, s objašnjenjem korak po korak",
    incluye: [
      { titulo: "Riješen izračun", texto: "S vašim podacima i rezultatom." },
      { titulo: "Kako se računa", texto: "Da vidite odakle dolazi svaka brojka." },
      { titulo: "Spreman za štampu", texto: "Ili za čuvanje kao PDF i dijeljenje." },
    ],
    pasos: {
      titulo: "Kako provjeriti izračun",
      items: ["Izračunajte unatrag: od rezultata se vratite do početne vrijednosti.", "Zaokružujte tek na kraju: zaokruživanje u svakom koraku mijenja rezultat."],
    },
    escenarios: DRUGI_IZNOSI,
  },
  "kit-gastos-grupo": {
    nombre: "Pregled zajedničkih troškova",
    tituloCorto: "pregled troškova",
    paraQuien: "Da svako zna koliko duguje, bez rasprave i računanja na ubrusu",
    descripcion: [
      "PDF pregled zajedničkog računa: ukupan iznos, koliko plaća svako i, ako treba, ko komu duguje.",
      "Pošaljite ga u grupni razgovor ili ga odštampajte, da niko ne mora ponovno računati.",
    ],
    gancho: "Podijelite račun s ostalima jasno i bez rasprave",
    incluye: [
      { titulo: "Koliko plaća svako", texto: "S ukupnim iznosom i pojedinostima na uvid." },
      { titulo: "Spremno za dijeljenje", texto: "U PDF-u, za slanje ostalima." },
      { titulo: "S drugim ukupnim iznosima", texto: "Ako se na račun nešto doda." },
    ],
    pasos: {
      titulo: "Kako se poravnati",
      items: ["Pošaljite pregled ostalima prije nego što neko plati: izbjeći ćete nesporazume.", "Dogovorite način plaćanja i datum do kojeg se poravnavate."],
    },
    escenarios: { titulo: "S drugim ukupnim iznosima", explica: "Ista podjela kada je ukupan iznos malo manji ili veći." },
  },
  "kit-estudio": {
    nombre: "Izvještaj o prosjeku ocjena",
    tituloCorto: "izvještaj o prosjeku",
    paraQuien: "Da biste svoj prosjek imali jasno i u pisanom obliku, s težinom svake ocjene",
    descripcion: [
      "PDF izvještaj s vašim prosjekom: svaka ocjena, njena težina i kako se dolazi do rezultata.",
      "Upotrijebite ga da provjerite ocjenu, isplanirate sljedeći ispit ili pokažete izračun onome kome treba.",
    ],
    gancho: "Imajte objašnjenje svojeg prosjeka u pisanom obliku",
    incluye: [
      { titulo: "Svaka ocjena sa svojom težinom", texto: "Da vidite koja najviše utiče." },
      { titulo: "Izračun korak po korak", texto: "Za provjeru ili predočenje." },
      { titulo: "Ideje za sljedeći ispit", texto: "Kako prosjek iskoristiti za bolju organizaciju." },
    ],
    pasos: {
      titulo: "Za sljedeći ispit",
      items: ["Pogledajte koja ocjena ima najveću težinu i posvetite tom predmetu ili ispitu više vremena.", "Ako vam se čini da je ocjena pogrešno izračunata, pokažite ovaj izvještaj nastavniku."],
    },
  },
  "kit-fechas": {
    nombre: "Izvještaj o datumima i rokovima",
    tituloCorto: "izvještaj o datumima",
    paraQuien: "Da biste izračunati datum ili rok imali u pisanom obliku, spreman kao dokaz ili da ga ne zaboravite",
    descripcion: [
      "PDF izvještaj s izračunom datuma: datumi koje ste unijeli, rezultat i kako je izračunat.",
      "Upotrijebite ga uz dokumente, ugovor, rok dospijeća ili samo kao zapis.",
    ],
    gancho: "Imajte ovaj datum u pisanom obliku, spreman kao dokaz",
    incluye: [
      { titulo: "Objašnjen izračun", texto: "S datumima i načinom na koji se broje dani." },
      { titulo: "Spremno kao dokaz", texto: "Uz dokumente ili kao prilog ugovoru." },
      { titulo: "Za vašu evidenciju", texto: "S datumom kada je izrađen." },
    ],
    pasos: {
      titulo: "Prije nego što datum upotrijebite u dokumentima",
      items: [
        "Provjerite računa li se rok u kalendarskim ili radnim danima: o tome ovisi rezultat.",
        "Pogledajte pada li posljednji dan na praznik ili vikend.",
        "Upišite konačni datum u kalendar, s podsjetnikom nekoliko dana ranije.",
      ],
    },
  },
  "plan-salud": {
    nombre: "Izvještaj o BMI-ju i kalorijama",
    tituloCorto: "izvještaj o BMI-ju i kalorijama",
    paraQuien: "Da biste svoje vrijednosti tjelesne mase i energije imali u pisanom obliku i ponijeli ih ljekaru",
    descripcion: [
      "PDF izvještaj s objašnjenjem vašeg rezultata: što mjeri, kako je izračunat i u koji raspon spada, s vašim podacima.",
      "To su opće informacije za razgovor sa zdravstvenim djelatnikom. Nije dijagnoza i ne zamjenjuje pregled kod ljekara.",
    ],
    gancho: "Ponesite svoje vrijednosti ljekaru, objašnjene i u pisanom obliku",
    incluye: [
      { titulo: "Vaš rezultat s objašnjenjem", texto: "Šta mjeri i kako je izračunat." },
      { titulo: "Pitanja za ljekara", texto: "Da od pregleda dobijete više." },
      { titulo: "Za praćenje promjena", texto: "Sačuvajte svaki izvještaj i uporedite ih s vremenom." },
    ],
    pasos: {
      titulo: "Kako o tome razgovarati sa stručnjakom",
      items: [
        "Ponesite ovaj izvještaj i pitajte koji je raspon zdrav baš za vas, s obzirom na dob i historiju bolesti.",
        "Recite kako se hranite, koliko se krećete i kako spavate: same brojke ne pokazuju sve.",
        "Ne radite velike promjene u ishrani ili tjelesnoj aktivnosti dok se ne posavjetujete sa stručnjakom.",
      ],
    },
    aviso: "Opće informacije. Ne zamjenjuju savjet zdravstvenog radnika.",
  },
  "plan-embarazo": {
    nombre: "Izvještaj o plodnosti i trudnoći",
    tituloCorto: "izvještaj o plodnosti i trudnoći",
    paraQuien: "Da biste okvirne datume imali u pisanom obliku i ponijeli ih na sljedeći pregled",
    descripcion: [
      "PDF izvještaj s okvirnim datumima i načinom na koji je svaki izračunat, iz podataka koje ste unijeli.",
      "Datumi su okvirni: svako tijelo i svaka trudnoća su drukčiji. Pomažu u organizaciji i u razgovoru sa zdravstvenim djelatnikom, ali ne zamjenjuju pregled.",
    ],
    gancho: "Imajte svoje datume u pisanom obliku do sljedećeg pregleda",
    incluye: [
      { titulo: "Vaši okvirni datumi", texto: "S načinom na koji je svaki izračunat." },
      { titulo: "Pitanja za pregled", texto: "Da od posjeta dobijete što više." },
      { titulo: "Za vašu evidenciju", texto: "S podacima koje ste koristili." },
    ],
    pasos: {
      titulo: "Za sljedeći pregled",
      items: [
        "Ponesite ovaj izvještaj i datum prvog dana posljednje menstruacije.",
        "Pitajte koji su pregledi potrebni u vašoj sedmici trudnoće i kada je sljedeći pregled.",
        "Ako vas brine bilo koji simptom, javite se ljekaru i ne čekajte datume iz izvještaja.",
      ],
    },
    aviso: "Opće informacije. Datumi su okvirni i ne zamjenjuju pregled zdravstvenog radnika.",
  },
  "plan-entrenamiento": {
    nombre: "Izvještaj o tempu trčanja",
    tituloCorto: "izvještaj o tempu",
    paraQuien: "Da biste na trening izašli znajući ciljni tempo i kako rasporediti snagu",
    descripcion: [
      "PDF izvještaj s objašnjenjem vašeg tempa, vremena i brzine, iz podataka koje ste unijeli.",
      "Sadrži potpune tabele izračuna i savjete kako tempo upotrijebiti na treningu.",
    ],
    gancho: "Imajte svoj tempo u pisanom obliku za dan trke",
    incluye: [
      { titulo: "Vaš tempo s objašnjenjem", texto: "S vremenom i brzinom." },
      { titulo: "Za štampu i uz sebe", texto: "U džep ili na frižider." },
      { titulo: "Savjeti za trening", texto: "Kako tempo upotrijebiti bez povrede." },
    ],
    pasos: {
      titulo: "Kako upotrijebiti tempo",
      items: [
        "Prvih nekoliko minuta trčite malo sporije od ciljnog tempa: na cilju ćete to osjetiti.",
        "Većinu sedmičnih treninga trčite laganim tempom, uz koji još možete razgovarati.",
        "Ako vas nešto boli, stanite i posavjetujte se sa stručnjakom: tempo može pričekati.",
      ],
    },
    aviso: "Opće informacije. Ne zamjenjuju savjet zdravstvenog radnika ni sportskog stručnjaka.",
  },
  "kit-viaje": {
    nombre: "Budžet goriva za put",
    tituloCorto: "budžet goriva",
    paraQuien: "Da biste znali koliko ćete potrošiti na gorivo i podijelili iznos sa svima koji putuju",
    descripcion: [
      "PDF izvještaj s cijenom goriva za vaš put, s vašim brojkama: udaljenost, potrošnja i cijena.",
      "Uz to dobijate tabelu s drugim cijenama goriva, za slučaj da se do polaska promijene, i popis ostalih troškova puta.",
    ],
    gancho: "Imajte cijenu puta u pisanom obliku prije polaska",
    incluye: [
      { titulo: "Cijena puta", texto: "S udaljenošću, potrošnjom i cijenom." },
      { titulo: "Uz druge cijene", texto: "Za slučaj da gorivo do polaska poskupi." },
      { titulo: "Popis za ostatak puta", texto: "Putarina, parkiranje i hrana." },
    ],
    pasos: {
      titulo: "Kako izraditi budžet puta",
      items: [
        "Cijeni goriva dodajte putarinu, parkiranje i hranu.",
        "Ako putuje više ljudi, podijelite ukupan iznos i javite svima prije polaska.",
        "Provjerite pritisak u gumama: s ispuhanim gumama automobil troši više goriva.",
      ],
    },
    escenarios: { titulo: "Uz druge cijene", explica: "Isti put s malo jeftinijim i malo skupljim gorivom." },
  },
  "kit-hogar": {
    nombre: "Izvještaj o troškovima struje",
    tituloCorto: "izvještaj o troškovima struje",
    paraQuien: "Da biste znali koliko košta svaki uređaj i gdje na računu za struju možete uštedjeti",
    descripcion: [
      "PDF izvještaj s onim koliko vas stoji vaš uređaj, s vašim podacima o korištenju i cijenom struje.",
      "Uz to dobijate tabelu s drugim cijenama struje i popis ideja kako smanjiti račun.",
    ],
    gancho: "Saznajte koliko vas ovaj uređaj stoji i kako to smanjiti",
    incluye: [
      { titulo: "Trošak uz vaše korištenje", texto: "S objašnjenjem korak po korak." },
      { titulo: "Uz druge cijene", texto: "Za slučaj da struja poskupi." },
      { titulo: "Ideje za uštedu", texto: "One koje se na računu najviše vide." },
    ],
    pasos: {
      titulo: "Kako smanjiti račun",
      items: [
        "Uređaje u stanju pripravnosti isključite iz utičnice: troše struju i kada su ugašeni.",
        "Najjače uređaje uključujte u vrijeme niže tarife, ako je imate.",
        "Uporedite ovaj izvještaj sa svojim računom, da vidite koliki dio ukupnog iznosa čini ovaj uređaj.",
      ],
    },
    escenarios: { titulo: "Uz druge cijene", explica: "Isto korištenje s malo jeftinijom i malo skupljom strujom." },
  },
  "kit-obra": {
    nombre: "Popis građevinskog materijala",
    tituloCorto: "popis materijala",
    paraQuien: "Da biste materijal kupili u pravoj količini, da ništa ne nedostaje i ništa ne preostane",
    descripcion: [
      "PDF izvještaj s izračunom materijala: mjere, količine i kako je izračunato, spremno da ga ponesete u trgovinu.",
      "Uz to dobijate popis za pravilnu kupovinu: rezerva za otpad, što pitati i što provjeriti prije početka radova.",
    ],
    gancho: "Dođite u trgovinu s popisom materijala u ruci",
    incluye: [
      { titulo: "Mjere i količine", texto: "Sve što ste izračunali, na jednoj stranici." },
      { titulo: "Da pokažete u trgovini", texto: "Da vam izračunaju tačno ono što vam treba." },
      { titulo: "Popis za pravilnu kupovinu", texto: "Rezerva za otpad i što provjeriti." },
    ],
    pasos: {
      titulo: "Prije kupovine",
      items: [
        "Dodajte 5 do 10 % za rezanje i lom, a za složene oblike više.",
        "Kupite sve iz iste proizvodne serije: boja i nijansa mogu se razlikovati od serije do serije.",
        "Pitajte za potrošnju izabranog materijala: razlikuje se od proizvođača do proizvođača.",
        "Sačuvajte račun i neotvorena pakovanja: mnoge ih trgovine primaju natrag.",
      ],
    },
  },
  "kit-facturacion": {
    nombre: "Izvještaj o PDV-u i porezu na promet",
    tituloCorto: "izvještaj o PDV-u",
    paraQuien: "Da biste izdali račun ili provjerili cijenu s jasno izdvojenim PDV-om, spremno za vašu evidenciju ili knjigovođu",
    descripcion: [
      "PDF izvještaj s vašim izračunom: cijena bez poreza, porez i ukupan iznos, sa stopom koja se primjenjuje i njenim izvorom.",
      "Uz to dobijate tabelu s drugim iznosima, korisnu za cjenik s porezom i bez njega.",
    ],
    gancho: "Imajte cijenu s porezom i bez njega u pisanom obliku",
    incluye: [
      { titulo: "Porez posebno", texto: "Iznos bez poreza, porez i ukupan iznos prema važećoj stopi." },
      { titulo: "S drugim iznosima", texto: "Da cjenik izradite odjednom." },
      { titulo: "Za vašeg knjigovođu", texto: "S izvorom stope i datumom." },
    ],
    pasos: {
      titulo: "Prije nego što izdate račun",
      items: [
        "Provjerite primjenjuje li se na vaš proizvod ili uslugu opća ili snižena stopa.",
        "Provjerite navodi li račun posebno osnovicu i porez, ako se to zahtijeva.",
        "Sačuvajte ovaj izvještaj zajedno s računom u svojoj evidenciji.",
      ],
    },
    escenarios: DRUGI_IZNOSI,
  },
  "informe-calculo": {
    nombre: "Izvještaj o izračunu",
    tituloCorto: "izvještaj o izračunu",
    paraQuien: "Da biste ovaj izračun imali u pisanom obliku, s vašim brojkama, pretpostavkama i izvorom svake službene vrijednosti",
    descripcion: [
      "PDF izvještaj izračuna koji ste upravo napravili, korak po korak s vašim podacima: rezultat, pretpostavke na kojima počiva i svaka službena vrijednost s izvorom i datumom provjere.",
      "Sačuvajte ga u svoje dokumente ili ga predajte knjigovođi, poslodavcu ili bilo kome ko ga treba pregledati, a da ne morate ponovno objašnjavati svaku brojku.",
    ],
    gancho: "Imajte ovaj izračun u pisanom obliku, s izvorima",
    incluye: [
      { titulo: "Vaš rezultat", texto: "Tačno onako kako ste ga izračunali, spreman za štampu." },
      { titulo: "Kako je nastao", texto: "Koraci i pretpostavke, da se svaka brojka može provjeriti." },
      { titulo: "Službeni izvori", texto: "Svaka vrijednost s institucijom, linkom i datumom provjere." },
    ],
    pasos: {
      titulo: "Prije nego što ga upotrijebite",
      items: [
        "Provjerite da li su podaci na vrhu vaši: rezultat ovisi o njima.",
        "Ako se službena vrijednost u međuvremenu promijenila, izračunajte ponovno: izvještaj koristi vrijednosti važeće na dan kupovine.",
      ],
    },
  },
};

export const bs: DiccionarioVenta = {
  familias,
  general: { si: "Da", no: "Ne" },
  tarjeta: {
    cejaInforme: "PDF izvještaj",
    cejaPlanilla: "Excel tabela",
    pagoUnico: "jednokratno plaćanje",
    comprarInforme: "Preuzmi izvještaj",
    comprarPlanilla: "Preuzmi tabelu",
    confianza: "Plaćanje putem PayPala ili karticom. Ako vam izvještaj ne bude koristan, vraćamo novac u roku od 7 dana.",
    verDetalle: "Šta sadrži",
    tambien: "Moglo bi vam koristiti i:",
    tablasOficiales: "Službene tabele",
    bajadaInforme: "Izvještaj razlaže izračun korak po korak s vašim brojkama i izvorom svake vrijednosti, spreman za štampu ili čuvanje kao PDF.",
    bajadaPlanilla: "Tabela sadrži ovaj izračun s vašim brojkama i vidljivim formulama, pa možete izmijeniti što god želite.",
    bajadaPlanillaHoja: "Tabela sadrži ovaj izračun na listu „{hoja}” s vašim brojkama i vidljivim formulama, pa možete izmijeniti što god želite.",
    equivale: "Otprilike {monto} po današnjem kursu.",
    cobroDolares: "Plaća se u američkim dolarima.",
  },
  aviso: {
    pronto: "Uskoro",
    titulo: "Javite mi kada bude dostupno",
    ayuda: "Pisat ćemo vam samo jednom, kada počnemo prodavati.",
    boton: "Obavijesti me",
    listo: "Gotovo. Čim počnemo prodavati, poslat ćemo vam e-poruku.",
    error: "Vašu adresu nismo uspjeli sačuvati. Provjerite da li je dobro napisana i pokušajte ponovno.",
    correo: "Vaša e-pošta",
  },
  planilla: {
    gancho: "Prenesite ovaj izračun u Excel, s već upisanim podacima",
    incluye: [
      { titulo: "Vaši su podaci već upisani", texto: "Izmijenite žutu ćeliju i sve se ponovno izračuna." },
      { titulo: "Plata, bonusi i konačni obračun", texto: "U jednoj datoteci koju možete koristiti cijele godine." },
      { titulo: "Ažuriranje uz svaku službenu promjenu", texto: "Na istom linku nova verzija, bez novog plaćanja." },
    ],
  },
  informe: {
    tusDatos: "Vaši podaci",
    resultado: "Rezultat",
    corregir: "Ispravi moje podatke",
    actualizar: "Ažuriraj izvještaj",
    imprimir: "Štampaj ili sačuvaj kao PDF",
    imprimirAyuda: "U prozoru za štampu izaberite „Sačuvaj kao PDF” i dobit ćete datoteku.",
    sinResultado: "Unesite svoje podatke u dijelu „Ispravi moje podatke” i izvještaj će se izraditi.",
    lugar: "Mjesto i datum",
    destinatario: "Primalac",
    firma: "Potpis",
    nombre: "Ime i prezime",
    documento: "Broj lične isprave",
    etiquetaEnMinuscula: true,
    comoSeCalcula: "Kako se računa",
    fuentes: "Službeni izvori",
    verificado: "provjereno",
    emitido: "Datum izdavanja",
    valores: "Službene vrijednosti važeće na dan",
    numero: "Izvještaj",
    elegir: "Izaberite izračun za izvještaj:",
    legal:
      "Ovaj izvještaj je procjena prema navedenim pravilima i službenim vrijednostima na navedeni datum. Ne zamjenjuje savjet stručnjaka ni odluku nadležnog tijela. Ako se neki vaš podatak razlikuje, rezultat se mijenja: ispravite ga i ponovno odštampajte izvještaj.",
    legalSinFuentes: "Ovaj izvještaj je procjena prema podacima koje ste unijeli, na navedeni datum. Ne zamjenjuje savjet stručnjaka. Ako se neki podatak promijeni, mijenja se i rezultat: ispravite ga i ponovno odštampajte izvještaj.",
    errorTitulo: "Ovaj se izvještaj nije mogao otvoriti",
    error: "Nismo uspjeli potvrditi plaćanje za ovaj link. Ako je novac skinut s vašeg računa, pišite nam i sve ćemo riješiti. Ako kupovina nije uspjela, možete je ponoviti.",
    verificar: "Plaćanje trenutno ne možemo provjeriti. Pokušajte ponovno za nekoliko minuta: ne trebate ponovno plaćati.",
    cupo: "Previše pokušaja zaredom. Sačekajte nekoliko minuta i ponovno otvorite link.",
  },
  // {normas} lo completa cada país en dativo, después de «prema» («prema Zakonu o radu i Zakonu o
  // porezu na dohodak»), e {incluye} en acusativo, después de «Sadrži» («neto platu, bonus
  // i konačni obračun»).
  catalogo: {
    tituloProducto: "{nombre} ({pais})",
    disparadorInforme: "Svaki put kada se promijeni službena vrijednost koju izračun koristi",
    planillaDescripcion: "Gotova Excel tabela: unesite svoje podatke u žute ćelije i izračun ide sam, s formulama prema {normas}.",
    planillaIncluye: "Sadrži {incluye}. Na svakom listu vide se koraci, a na listu sa službenim tabelama svaka je vrijednost s izvorom i datumom naše provjere.",
  },
  planillas: {
    migaPlanillas: "Tabele i izvještaji",
    catalogoTitulo: "Tabele i izvještaji ({pais})",
    catalogoBajada: "Excel tabele i PDF izvještaji s vašim brojkama i službenim podacima zemlje. Jednokratno plaćanje, bez pretplate.",
    seccionPlanillas: "Excel tabele",
    seccionInformes: "PDF izvještaji",
    catalogoVacio: "Tabele za ovu zemlju ({pais}) pripremamo. Kalkulatori su zasad besplatni.",
    verCalculadoras: "Prikaži kalkulatore",
    comprar: "Kupi za {precio}",
    pronto: "Uskoro",
    incluye: "Šta sadrži",
    incluyeInforme: [
      "Izvještaj s vašim brojkama na stranici koju možete odštampati ili sačuvati kao PDF.",
      "Link bez roka važenja: podatke možete ispraviti kad god želite i ponovno odštampati izvještaj.",
      "Ako vam izvještaj ne bude koristan, vraćamo novac u roku od 7 dana.",
    ],
    incluyePlanilla: [
      "Datoteka .xlsx koja se otvara u Excelu i u Google tabelama.",
      "Ažuriranje: {disparador}, tabelu ažuriramo, a novu verziju preuzimate na istom linku.",
      "Ako vam tabela ne bude korisna, vraćamo novac u roku od 7 dana.",
    ],
    pagoUnico: "Jednokratno plaćanje putem PayPala. Možete platiti s PayPal računa ili karticom.",
    comprarPlanilla: "Kupovina: {titulo}",
    comprarBajadaInforme: "Čim se plaćanje potvrdi, na ovu adresu šaljemo link na vaš izvještaj.",
    comprarBajadaPlanilla: "Čim se plaćanje potvrdi, na ovu adresu šaljemo tabelu.",
    etiquetaEmail: "Vaša e-pošta",
    seguirPago: "Nastavi na plaćanje",
    privacidad: "Vašu adresu koristimo samo da vam pošaljemo kupljeno i njegova ažuriranja.",
    datosTitulo: "S brojkama iz vašeg izračuna",
    datosUsar: "Upotrijebi ove brojke u mojoj kupovini. Čuvaju se samo radi pripreme kupljenog.",
    errores: {
      email: "Provjerite adresu e-pošte: čini se da u njoj nešto nedostaje.",
      error: "Plaćanje nije moglo započeti. Ništa vam nije naplaćeno. Pokušajte ponovno za nekoliko minuta.",
      cancelado: "Otkazali ste plaćanje. Ništa vam nije naplaćeno.",
      fallido: "PayPal nije potvrdio plaćanje. Možete pokušati s drugom karticom.",
      pronto: "Prodaja još nije počela.",
    },
    graciasTitulo: "Hvala na kupovini",
    graciasListoInforme: "Plaćanje je potvrđeno. Svoju kupovinu već možete otvoriti: {titulo}. Link smo vam poslali i e-poštom i ne ističe.",
    graciasListoPlanilla: "Plaćanje je potvrđeno. Svoju kupovinu već možete preuzeti: {titulo}. Poslali smo vam je i e-poštom, s linkom koji ne ističe.",
    graciasPendiente: "Čekamo potvrdu PayPala. Čim stigne, kupljeno vam šaljemo e-poštom.",
    muestraIntro: "Ovo je list „{hoja}” s primjerom podataka s kojima se otvara. Izračun je današnji, s važećim službenim vrijednostima.",
    muestraLeyenda: ["unosite vi", "računa tabela"],
    comprobar: "Provjerite prije plaćanja: besplatni kalkulator daje iste brojke. Isprobajte isti slučaj i uporedite.",
    comprobarEnlace: "Idi na besplatni kalkulator",
    faqTitulo: "Česta pitanja",
    faq: {
      sheets: {
        pregunta: "Radi li u Google tabelama i u Excelu?",
        respuesta: "Da. To je datoteka .xlsx: otvara se u Excelu i u Google tabelama (prenesite je na svoj Disk i otvorite je tamo). Izračun koristi obične formule, bez makronaredbi.",
      },
      recibo: {
        pregunta: "Kako je dobijam?",
        respuesta: "Čim se plaćanje potvrdi, šaljemo vam je e-poštom s linkom za preuzimanje koji ne ističe. Možete je preuzeti i sa stranice koja se otvori nakon plaćanja.",
      },
      dolares: {
        pregunta: "Plaća li se u američkim dolarima?",
        respuesta: "Da. Cijena je u američkim dolarima (USD), a plaćate putem PayPala, s računa ili karticom.",
        conReferencia: "Iznad prikazujemo približan iznos u vašoj valuti po današnjem kursu, samo okvirno: konačan iznos ovisi o kursu vaše banke ili kartice.",
        sinReferencia: "Ako je vaša kartica u drugoj valuti, konverziju obavlja vaša banka.",
      },
      devolucion: { pregunta: "Mogu li dobiti novac natrag?", respuesta: "Da. Ako vam tabela ne bude korisna, odgovorite u roku od 7 dana na e-poruku o kupovini i vratit ćemo vam novac." },
      actualiza: { pregunta: "Ažurira li se kada se službene vrijednosti promijene?", respuesta: "Da. {disparador}, tabelu ažuriramo, a novu verziju preuzimate na istom linku." },
    },
    descargar: "Preuzmi tabelu (.xlsx)",
    abrirInforme: "Otvori moj izvještaj",
    fuentes: "Službeni izvori koje koristi",
    calculadoras: "Radi s ovim kalkulatorima",
    muestra: "Kako izgleda",
  },
  correo: {
    asuntoInforme: "Vaša kupovina na CalcularYa: {titulo}",
    asuntoPlanilla: "{titulo}: preuzimanje i ažuriranja",
    mismosNumeros: "Brojke su iste kao u {enlace}, sa službenim podacima.",
    enlaceCalculadora: "besplatnom kalkulatoru CalcularYa",
    comprobante: "Ovo je potvrda vaše kupovine na {marca}.",
    informe: {
      encabezado: "Izvještaj je spreman za otvaranje",
      intro: "Hvala na kupovini ({titulo}). Otvorite ga ovdje:",
      boton: "Otvori moj izvještaj",
      abre: "Izvještaj se otvara u pretraživaču. Odatle ga možete odštampati ili sačuvati kao PDF.",
      guarda: "Sačuvajte ovu poruku",
      vence: "Link je vaš i ne ističe. Izvještaj koristi službene vrijednosti važeće na dan kupovine, a podatke možete ispraviti kad god želite i ponovno odštampati izvještaj.",
      devolucion: "Ako vam izvještaj ne bude koristan, odgovorite na ovu poruku u roku od 7 dana i vratit ćemo vam novac.",
      ayuda: "Imate problem? Odgovorite na ovu poruku ili nam pišite na {contacto}.",
    },
    planilla: {
      encabezado: "Tabela je spremna za preuzimanje",
      intro: "Hvala na kupovini ({titulo}). Preuzmite je ovdje:",
      boton: "Preuzmi tabelu (.xlsx)",
      abre: "Otvara se u Excelu i u Google tabelama.",
      guarda: "Sačuvajte ovu poruku",
      vence: "Link je vaš i ne ističe. {disparador}, tabelu ažuriramo, a na istom linku dobijate najnoviju verziju. Ne trebate ponovno plaćati.",
      devolucion: "Ako vam tabela ne bude korisna, odgovorite na ovu poruku u roku od 7 dana i vratit ćemo vam novac.",
      ayuda: "Imate problem? Odgovorite na ovu poruku ili nam pišite na {contacto}.",
    },
  },
};
