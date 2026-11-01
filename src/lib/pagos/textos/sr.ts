import type { ClaveFamilia } from "../ofertas-intl";
import type { DiccionarioVenta, TextosFamilia } from "./tipos";

// Serbio en latinica y ekavski (ADR 0002, D23): un solo registro, el de los bancos y eUprava.
// Obraćanje na «vi» en minúscula y el imperativo de segunda del plural en la prosa («preuzmite»,
// «uporedite»), nunca «ti»; los botones en la forma corta de las interfaces serbias («Preuzmi»,
// «Kupi»). Las cartas del informe van en primera persona formal. Los textos de las familias sirven
// a cualquier país (Serbia y Montenegro incluidos): nada de organismos de un solo país. El país llega
// en el marcador {pais} sin declinar, así que va en nominativo entre paréntesis. Comillas „ “.
const ZA_VASU_EVIDENCIJU = { titulo: "Za vašu evidenciju", texto: "Sa datumom vrednosti koje je obračun upotrebio." };
const DRUGI_IZNOSI = { titulo: "Sa drugim iznosima", explica: "Isti obračun sa nešto manjim i nešto većim iznosima." };
const DRUGE_STOPE = { titulo: "Sa drugim kamatnim stopama", explica: "Isti brojevi sa nešto nižim i nešto višim kamatnim stopama." };

const familias: Record<ClaveFamilia, TextosFamilia> = {
  liquidacion: {
    nombre: "Izveštaj o konačnom obračunu pri prestanku radnog odnosa",
    tituloCorto: "izveštaj o konačnom obračunu",
    paraQuien: "Da proverite konačni obračun pri odlasku sa posla pre nego što ga potpišete ili da ga zatražite, sa vašim brojevima i prema propisima vaše zemlje",
    descripcion: [
      "PDF izveštaj sa obračunom razloženim po stavkama: koliko vam pripada po svakoj, kako je izračunato i koje su zvanične vrednosti primenjene, svaka sa izvorom.",
      "Uz to dobijate spisak onoga što treba proveriti pre potpisivanja i dopis sa već upisanim iznosom, kojim isplatu tražite pismeno.",
    ],
    gancho: "Imajte konačni obračun napismeno i proverite ga pre nego što potpišete",
    incluye: [
      { titulo: "Svaka stavka sa obračunom", texto: "Da je red po red uporedite sa onim što nudi poslodavac." },
      { titulo: "Zvanični izvori na uvid", texto: "Svaka vrednost sa institucijom koja je objavljuje i datumom naše provere." },
      { titulo: "Gotov dopis sa zahtevom", texto: "Sa upisanim vašim iznosom, da isplatu zatražite pismeno." },
    ],
    pasos: {
      titulo: "Pre potpisivanja",
      items: [
        "Uporedite svaku stavku iz ovog izveštaja sa dokumentom koji treba da potpišete. Ako nešto nedostaje, pitajte zašto, pre nego što potpišete.",
        "Proverite da li se zarada i datumi sa kojima računa poslodavac slažu sa onima koje ste ovde uneli. Drugi datum zaposlenja menja skoro sve iznose.",
        "Tražite primerak svega što potpisujete i sačuvajte platne listiće za poslednje mesece.",
        "Ako je razlika velika ili ste dobili otkaz, pokažite ovaj izveštaj inspekciji rada u vašoj zemlji ili advokatu za radno pravo. Uštedećete im prvi sat računanja.",
      ],
    },
    nota: {
      titulo: "Zahtev za isplatu",
      uso: "Popunite, potpišite i predajte zajedno sa primerkom za sebe. Zatražite da vam na primerku potpisom i datumom potvrde prijem.",
      pedido: "Molim za isplatu iznosa koji mi pripadaju po osnovu prestanka radnog odnosa i koji prema obračunu u priloženom izveštaju iznose",
      cierre: "Priloženi obračun navodi svaku stavku izračunatu prema zvaničnim vrednostima važećim na navedeni datum. Molim da me obavestite o datumu isplate.",
    },
  },
  "pagos-laborales": {
    nombre: "Izveštaj o isplatama iz radnog odnosa",
    tituloCorto: "izveštaj o isplatama",
    paraQuien: "Da budete sigurni da su vam bonus, naknada za godišnji odmor, prekovremeni rad ili učešće u dobiti dobro obračunati, a ako nisu, da razliku zatražite",
    descripcion: [
      "PDF izveštaj sa vašim obračunom korak po korak i sa vašim brojevima: koja je osnovica uzeta, kako se računa i koje zvanične vrednosti važe, svaka sa izvorom.",
      "Važi za svaku isplatu sa spiska. Pokazuje kako da je proverite na platnom listiću i sadrži dopis kojim razliku tražite pismeno.",
    ],
    gancho: "Imajte ovaj obračun napismeno i uporedite ga sa platnim listićem",
    incluye: [
      { titulo: "Obračun korak po korak", texto: "Sa vašim podacima i svakom zvaničnom vrednošću koju primenjuje." },
      { titulo: "Šta tražiti na platnom listiću", texto: "Da za minut vidite da li ste dobro plaćeni." },
      { titulo: "Dopis sa zahtevom za razliku", texto: "Sa upisanim vašim iznosom, spreman za predaju." },
    ],
    pasos: {
      titulo: "Kako da proverite isplatu",
      items: [
        "Pronađite ovu isplatu na platnom listiću i uporedite je sa iznosom iz ovog izveštaja.",
        "Ako se ne slaže, prvo proverite da li se podaci koje ste uneli slažu sa onima sa kojima računa poslodavac.",
        "Ako se ni tada ne slaže, upotrebite dopis ispod i zatražite razliku pismeno. Primerak sačuvajte.",
      ],
    },
    nota: {
      titulo: "Zahtev za isplatu razlike",
      uso: "Popunite, potpišite i predajte zajedno sa primerkom za sebe.",
      pedido: "Molim za isplatu iznosa navedenog u priloženom izveštaju, koji prema obračunu sa važećim zvaničnim vrednostima iznosi",
      cierre: "Ako je isplaćeni iznos bio drugačiji, molim za pismeno objašnjenje kako je obračunat.",
    },
    escenarios: { titulo: "Kada se broj sati menja", explica: "Isti obračun sa drugim brojem sati, da proveravate svakog meseca bez novog računanja." },
  },
  impuesto: {
    nombre: "Izveštaj o porezu na dohodak",
    tituloCorto: "izveštaj o porezu",
    paraQuien: "Da znate koliko vam poreza obustavljaju, da proverite platni listić i vidite šta se dešava kada se prihod menja",
    descripcion: [
      "PDF izveštaj sa vašim porezom izračunatim korak po korak, sa zvaničnom tabelom koja se primenjuje i izvorom svake vrednosti.",
      "Uz to dobijate tabelu poreza za druge iznose prihoda, da unapred znate koliko vam ostaje posle povišice ili promene posla.",
    ],
    gancho: "Imajte objašnjenje svog poreza napismeno i pogledajte šta se dešava kada se prihod menja",
    incluye: [
      { titulo: "Obračun po zvaničnoj tabeli", texto: "Korak po korak, sa izvorom svake vrednosti." },
      { titulo: "Vaš porez za druge prihode", texto: "Da o povišici pregovarate znajući koliko vam ostaje." },
      { titulo: "Šta proveriti na platnom listiću", texto: "Da sa poslodavcem ili knjigovođom razgovarate jezikom brojeva." },
    ],
    pasos: {
      titulo: "Kako da proverite obustavljeni porez",
      items: [
        "Pronađite obustavljeni porez na platnom listiću i uporedite ga sa iznosom iz ovog izveštaja.",
        "Ako se ne slaže, pitajte poslodavca sa kojim prihodom i kojim olakšicama računa.",
        "Sačuvajte ovaj izveštaj za godišnju poresku prijavu, ako se u vašoj zemlji podnosi.",
      ],
    },
    escenarios: { titulo: "Kada se prihod menja", explica: "Isti obračun sa nešto manjim i nešto većim prihodom, sa istim zvaničnim vrednostima." },
  },
  contratacion: {
    nombre: "Budžet troškova zaposlenog",
    tituloCorto: "budžet troškova zaposlenog",
    paraQuien: "Da znate koliko vas novi zaposleni zaista košta, sa svim doprinosima, pre nego što se dogovorite oko zarade",
    descripcion: [
      "PDF budžet sa ukupnim troškom zaposlenog razloženim po delovima: zarada, doprinosi na teret zaposlenog i poslodavca i rezervacije, svaka vrednost sa zvaničnim izvorom.",
      "Sadrži tabelu troškova za druge iznose zarade, da ponudu date znajući koliko vas svaka povišica zaista košta, i spreman je da ga pošaljete ortaku ili knjigovođi.",
    ],
    gancho: "Pretvorite ove troškove u budžet i odlučite o zapošljavanju",
    incluye: [
      { titulo: "Svaki doprinos posebno", texto: "Sa pravilom i zvaničnim izvorom za svaki." },
      { titulo: "Troškovi za druge zarade", texto: "Da pregovarate znajući koliko dodaje svaki korak naviše." },
      { titulo: "Spremno za slanje", texto: "Ortaku, knjigovođi ili za vašu evidenciju." },
    ],
    pasos: {
      titulo: "Pre nego što nekoga zaposlite",
      items: [
        "Proverite sa knjigovođom da li u vašoj delatnosti važi kolektivni ugovor ili minimalna zarada viša od opšte.",
        "Rezervacije iz ovog budžeta odvajajte svakog meseca: to su isplate koje se skupe na kraju godine ili pri prestanku ugovora.",
        "Zaposlenog prijavite od prvog dana: troškovi u ovom budžetu već računaju sa obaveznim doprinosima.",
      ],
    },
    escenarios: { titulo: "Troškovi za druge zarade", explica: "Isti obračun sa nižim i višim zaradama, sa istim zvaničnim vrednostima." },
  },
  "ajuste-inflacion": {
    nombre: "Dopis o usklađivanju sa inflacijom",
    tituloCorto: "dopis o usklađivanju",
    paraQuien: "Da zatražite ili najavite usklađivanje kirije, rate, honorara ili zarade prema zvaničnom indeksu",
    descripcion: [
      "Dopis spreman za predaju, sa upisanim novim iznosom i dokazom obračuna: zvanični indeks za svaki datum, institucija koja ga objavljuje i link ka izvoru.",
      "Kada je dokaz na uvid, druga strana broj potvrdi za minut i razgovor ide o indeksu, a ne o računanju.",
    ],
    gancho: "Pretvorite ovo usklađivanje u gotov dopis sa zvaničnim indeksom kao dokazom",
    incluye: [
      { titulo: "Popunjen dopis", texto: "Sa vašim novim iznosom, za štampu ili slanje." },
      { titulo: "Zvanični indeks kao dokaz", texto: "Sa institucijom, datumom i linkom ka izvoru." },
      { titulo: "Obračun na uvid", texto: "Da druga strana sama dođe do istog broja." },
    ],
    nota: {
      titulo: "Obaveštenje o usklađivanju",
      uso: "Popunite podacima iz ugovora i predajte zajedno sa obračunom.",
      pedido: "Obaveštavam vas o usklađivanju ugovorenog iznosa prema kretanju zvaničnog indeksa potrošačkih cena, kako navodi priloženi obračun. Usklađeni iznos je",
      cierre: "Obračun upotrebljava indeks koji objavljuje zvanična institucija navedena u prilogu i može se proveriti u navedenom izvoru.",
    },
  },
  regimen: {
    nombre: "Izveštaj o pojednostavljenom poreskom režimu",
    tituloCorto: "izveštaj o pojednostavljenom režimu",
    paraQuien: "Da znate koliko plaćate u pojednostavljenom režimu i šta se dešava kada prihod raste ili pada",
    descripcion: [
      "PDF izveštaj sa vašom akontacijom ili porezom u pojednostavljenom režimu, izračunatim korak po korak po zvaničnoj tabeli i sa izvorom svake vrednosti.",
      "Uz to dobijate tabelu koliko biste plaćali uz druge prihode, da unapred vidite prelazak u drugi razred.",
    ],
    gancho: "Imajte svoj obračun napismeno i pogledajte šta se dešava kada se prihod menja",
    incluye: [
      { titulo: "Vaš obračun po zvaničnoj tabeli", texto: "Korak po korak, sa izvorom svake vrednosti." },
      { titulo: "Koliko biste plaćali uz druge prihode", texto: "Da prelazak u drugi razred vidite unapred." },
      ZA_VASU_EVIDENCIJU,
    ],
    escenarios: { titulo: "Kada se prihod menja", explica: "Isti obračun sa nižim i višim prihodom, sa istim zvaničnim vrednostima." },
  },
  deposito: {
    nombre: "Poređenje oročene štednje",
    tituloCorto: "poređenje štednje",
    paraQuien: "Da uporedite svoju oročenu štednju na različite rokove pre nego što odlučite gde i na koliko dugo da ostavite novac",
    descripcion: ["PDF izveštaj sa prinosom vaše oročene štednje i tabelom istog iznosa na druge rokove, sve istim obračunom kao u kalkulatoru."],
    gancho: "Uporedite štednju na više rokova u jednom izveštaju",
    incluye: [
      { titulo: "Vaša štednja na više rokova", texto: "U jednoj tabeli, da izaberete na prvi pogled." },
      { titulo: "Obračun korak po korak", texto: "Sa izvorom svake vrednosti koju upotrebljava." },
      ZA_VASU_EVIDENCIJU,
    ],
    escenarios: { titulo: "Vaša štednja na druge rokove", explica: "Isti obračun sa drugim rokovima oročenja." },
  },
  alimentos: {
    nombre: "Izveštaj o izdržavanju",
    tituloCorto: "izveštaj o izdržavanju",
    paraQuien: "Da na medijaciju ili pregovore o izdržavanju dođete sa obrazloženim iznosom",
    descripcion: ["PDF izveštaj sa okvirnim iznosom izdržavanja, korak po korak, sa zvaničnim vrednostima i njihovim izvorom i sa tabelom iznosa uz druge prihode."],
    gancho: "Dođite na medijaciju sa ovim obračunom napismeno",
    incluye: [
      { titulo: "Obrazložen obračun", texto: "Korak po korak, sa izvorom svake vrednosti." },
      { titulo: "Iznos uz druge prihode", texto: "Da pregovarate i vidite različite mogućnosti." },
      { titulo: "Za vašeg advokata ili medijatora", texto: "Uštedećete im prvi sat računanja." },
    ],
    escenarios: { titulo: "Uz druge prihode", explica: "Isti obračun sa nižim i višim prihodima." },
  },
  jubilacion: {
    nombre: "Procena penzije",
    tituloCorto: "procena penzije",
    paraQuien: "Da penziju planirate sa pisanom procenom i vidite šta se menja ako plaćate veće doprinose",
    descripcion: ["PDF izveštaj sa okvirnim iznosom penzije korak po korak, sa zvaničnim vrednostima i njihovim izvorom i sa tabelom procene za druge zarade."],
    gancho: "Imajte procenu svoje penzije napismeno",
    incluye: [
      { titulo: "Procena korak po korak", texto: "Sa izvorom svake vrednosti." },
      { titulo: "Za druge zarade", texto: "Da vidite šta se menja ako plaćate veće doprinose." },
      ZA_VASU_EVIDENCIJU,
    ],
    escenarios: { titulo: "Za druge zarade", explica: "Isti obračun sa nižim i višim zaradama." },
  },
  "plan-prestamo": {
    nombre: "Plan otplate kredita",
    tituloCorto: "plan otplate kredita",
    paraQuien: "Da znate koliko vas kredit zaista košta i da uporedite ponude pre potpisivanja",
    descripcion: [
      "PDF izveštaj sa celim vašim kreditom: rata, ukupan iznos koji ćete platiti i koliko od toga čini kamata.",
      "Ako ste računali ratu, izveštaj sadrži svaku ratu posebno. Isti brojevi su izračunati i sa drugim kamatnim stopama, da ponude banaka uporedite na stvarnim brojevima.",
    ],
    gancho: "Uporedite ponude kredita na svojim brojevima pre potpisivanja",
    incluye: [
      { titulo: "Vaš kredit sa drugim stopama", texto: "Da vidite šta mu radi jedan procentni poen gore ili dole." },
      { titulo: "Ukupna cena na uvid", texto: "Koliko plaćate kamate, bez sitnih slova." },
      { titulo: "Spisak pre potpisivanja", texto: "Pitanja koja vredi postaviti banci." },
    ],
    pasos: {
      titulo: "Pre nego što potpišete ugovor o kreditu",
      items: [
        "Pitajte za efektivnu kamatnu stopu (EKS), koja obuhvata sve troškove, a ne samo za nominalnu kamatnu stopu. Ponude vredi porediti upravo po njoj.",
        "Pitajte za naknadu za obradu kredita, obavezno osiguranje i naknadu za prevremenu otplatu.",
        "Uporedite bar tri ponude prema tabeli sa drugim stopama iz ovog izveštaja.",
        "Izaberite ratu koju možete da plaćate i u lošijem mesecu. Okvirno, manje od trećine prihoda.",
      ],
    },
    escenarios: DRUGE_STOPE,
  },
  "plan-hipoteca": {
    nombre: "Plan stambenog kredita",
    tituloCorto: "plan stambenog kredita",
    paraQuien: "Da o stambenom kreditu odlučite sa svim brojevima pred sobom: rata, kamata i šta se dešava kada se kamatna stopa menja",
    descripcion: [
      "PDF izveštaj sa celim vašim stambenim kreditom: rata, ukupan iznos koji ćete platiti i koliko od toga tokom godina odlazi na kamatu.",
      "Sadrži kompletne tabele vašeg obračuna (besplatna stranica pokazuje samo prve redove) i iste brojeve sa drugim kamatnim stopama. Ako ste poredili kiriju i kupovinu, poređenje imate napismeno i možete da odlučite sa celom porodicom.",
    ],
    gancho: "Dođite u banku sa kompletnom tabelom stambenog kredita i drugim kamatnim stopama",
    incluye: [
      { titulo: "Kompletna tabela", texto: "Svi redovi, ne samo prvi." },
      { titulo: "Vaš stambeni kredit sa drugim stopama", texto: "Da vidite šta sa ratom radi jedan procentni poen gore ili dole." },
      { titulo: "Pitanja za banku", texto: "Šta proveriti pre potpisivanja." },
    ],
    pasos: {
      titulo: "Pre nego što potpišete ugovor o stambenom kreditu",
      items: [
        "Tražite ponudu napismeno, sa kamatnom stopom, rokom otplate i ukupnim troškom, zajedno sa osiguranjem i naknadama.",
        "Pitajte da li je kamatna stopa fiksna ili promenljiva i šta se dešava sa ratom ako referentna stopa poraste.",
        "Raspitajte se koliko košta prevremena otplata i da li možete vanredno da otplaćujete bez penala.",
        "Rati dodajte troškove stanovanja (porez na imovinu, osiguranje, održavanje) pre nego što odlučite koliko možete da priuštite.",
      ],
    },
    escenarios: DRUGE_STOPE,
  },
  "plan-inversion": {
    nombre: "Plan štednje i ulaganja",
    tituloCorto: "plan štednje",
    paraQuien: "Da vidite kako vaša ušteđevina raste vremenom i šta se menja ako odvajate više ili dobijete drugu kamatnu stopu",
    descripcion: [
      "PDF izveštaj sa procenom vaše ušteđevine: koliko uplaćujete, koliko dobijate od kamate i koliko ćete imati na kraju.",
      "Sadrži kompletne tabele vašeg obračuna i iste brojeve sa drugim kamatnim stopama, da birate gde da štedite na stvarnim brojevima.",
    ],
    gancho: "Imajte plan štednje napismeno, godinu po godinu",
    incluye: [
      { titulo: "Kompletna procena", texto: "Svi redovi tabele, ne samo prvi." },
      { titulo: "Sa drugim stopama", texto: "Da uporedite mogućnosti pre nego što izaberete." },
      { titulo: "Plan koji se može ispuniti", texto: "Koraci zahvaljujući kojima namera postaje ušteđevina." },
    ],
    pasos: {
      titulo: "Da plan uspe",
      items: [
        "Podesite trajni nalog za dan isplate zarade: ono što ne vidite, ne trošite.",
        "Uporedite kamatnu stopu sa inflacijom: kada je stopa niža, vaš novac gubi vrednost iako broj raste.",
        "Jednom godišnje ponovo otvorite ovaj izveštaj i ažurirajte svoje brojeve.",
      ],
    },
    escenarios: DRUGE_STOPE,
  },
  "plan-deudas": {
    nombre: "Plan otplate kreditne kartice",
    tituloCorto: "plan otplate kartice",
    paraQuien: "Da znate kada ćete otplatiti karticu, koliko će vas to koštati kamate i kako da to bude ranije",
    descripcion: [
      "PDF izveštaj sa vašim dugom mesec po mesec: koliko plaćate, koliko odlazi na kamatu i koliko brzo dug opada.",
      "Sadrži kompletnu tabelu do poslednje uplate i iste brojeve sa drugim mesečnim uplatama, da vidite koliko štedite ako svakog meseca platite malo više.",
    ],
    gancho: "Pogledajte mesec po mesec kada ćete otplatiti karticu",
    incluye: [
      { titulo: "Mesec po mesec do poslednje uplate", texto: "Sa kamatom koju plaćate svakog meseca." },
      { titulo: "Sa drugim uplatama", texto: "Da vidite koliko ranije završavate ako plaćate malo više." },
      { titulo: "Put iz duga", texto: "Koraci da ponovo ne upadnete u dugove." },
    ],
    pasos: {
      titulo: "Kako da izađete iz duga",
      items: [
        "Dok otplaćujete, ne koristite karticu: svaka nova kupovina produžava tabelu.",
        "Uvek plaćajte više od minimalne uplate. Pomaže i malo, a tabela sa drugim uplatama pokazuje koliko.",
        "Ako imate više dugova, prvo otplaćujte onaj sa najvišom kamatnom stopom, a za ostale plaćajte minimum.",
        "Pitajte svoju banku za refinansiranje uz nižu kamatnu stopu i uporedite ga sa ovim izveštajem.",
      ],
    },
    escenarios: { titulo: "Sa drugim mesečnim uplatama", explica: "Isti dug ako svakog meseca platite malo manje i malo više." },
  },
  "plan-presupuesto": {
    nombre: "Plan kućnog budžeta",
    tituloCorto: "plan budžeta",
    paraQuien: "Da mesec organizujete po jasnom planu: koliko ide na potrebe, želje i štednju",
    descripcion: [
      "PDF izveštaj koji od vašeg obračuna pravi plan: koliko odvojiti za svaku stavku, u vašoj valuti i sa vašim brojevima.",
      "Sadrži isti plan sa drugim iznosima, da unapred znate šta se menja u mesecu sa više ili manje novca, i korake da ga se držite.",
    ],
    gancho: "Pretvorite ovaj obračun u plan svog meseca",
    incluye: [
      { titulo: "Vaš plan sa vašim brojevima", texto: "Koliko gde ide, spremno za upotrebu." },
      { titulo: "Sa drugim iznosima", texto: "Da plan prilagodite kada mesec bude drugačiji." },
      { titulo: "Koraci da se plana držite", texto: "Šta pomaže da budžet traje duže od prvog meseca." },
    ],
    pasos: {
      titulo: "Da budžet uspe",
      items: [
        "Ušteđevinu odvojite na dan isplate zarade, pre troškova. Ono što ostane, možete da potrošite.",
        "Tokom meseca zapisujte troškove, makar u telefonu, i uporedite ih sa ovim planom.",
        "Prvo napravite fond za hitne slučajeve, da neočekivani trošak ne završi na kreditnoj kartici.",
      ],
    },
    escenarios: DRUGI_IZNOSI,
  },
  "plan-negocio": {
    nombre: "Izveštaj sa brojevima vašeg posla",
    tituloCorto: "izveštaj za vaš posao",
    paraQuien: "Da o cenama, marži ili ulaganju odlučujete na osnovu jasnih brojeva, spremnih za ortaka",
    descripcion: [
      "PDF izveštaj sa vašim obračunom objašnjenim korak po korak: koji podaci su upotrebljeni, kako se računa i kakav je rezultat.",
      "Uz to dobijate tabelu sa istim obračunom za druge iznose, da vidite kako se rezultat menja kada troškovi porastu ili kada spustite cenu.",
    ],
    gancho: "Pretvorite ove brojeve u izveštaj za odluku ili za ortaka",
    incluye: [
      { titulo: "Objašnjen obračun", texto: "Da ga razumete i odbranite pred ortakom ili bankom." },
      { titulo: "Sa drugim iznosima", texto: "Da unapred vidite uticaj promene cene ili troškova." },
      { titulo: "Pitanja pre odluke", texto: "Šta proveriti pre nego što menjate cenu." },
    ],
    pasos: {
      titulo: "Pre odluke",
      items: [
        "Proverite da li ste u troškove uključili sve: prevoz, provizije, poreze i sopstveno vreme.",
        "Pre nego što menjate cenu, uporedite je sa dva ili tri konkurenta.",
        "Pogledajte najgori scenario u tabeli: ako ga posao izdrži, odluka je sigurnija.",
      ],
    },
    escenarios: DRUGI_IZNOSI,
  },
  "kit-freelance": {
    nombre: "Paket za satnicu frilensera",
    tituloCorto: "paket za satnicu",
    paraQuien: "Da za svoj rad tražite onoliko koliko vredi i da satnicu navodite sa sigurnošću",
    descripcion: [
      "PDF izveštaj sa objašnjenjem vaše satnice: prihod kojem težite, sati koji se zaista mogu naplatiti i troškovi koje satnica pokriva.",
      "Sadrži satnicu za druge ciljne prihode i gotov dopis za klijenta sa vašom satnicom.",
    ],
    gancho: "Navodite svoju satnicu sa brojevima, a ne sa izvinjenjima",
    incluye: [
      { titulo: "Objašnjenje vaše satnice", texto: "Za trenutak kada neko pita zašto baš toliko." },
      { titulo: "Za druge ciljne prihode", texto: "Satnica koja vam je potrebna za svaki od njih." },
      { titulo: "Gotov dopis sa satnicom", texto: "Sa upisanim vašim brojem, za slanje klijentima." },
    ],
    pasos: {
      titulo: "Da naplaćujete koliko treba",
      items: [
        "Računajte samo sate koje možete da naplatite: sastanci, ponude i podsećanja na plaćanje su takođe posao.",
        "Kada je moguće, nudite cenu po projektu: klijent kupuje rezultat, a ne sate.",
        "Satnicu preispitajte jednom godišnje, ili ranije ako vam troškovi porastu.",
      ],
    },
    nota: {
      titulo: "Dopis sa satnicom",
      uso: "Popunite podacima klijenta i pošaljite zajedno sa svojom ponudom.",
      pedido: "Na osnovu našeg razgovora šaljem vam svoju cenu za dogovorene stručne usluge. Moja satnica iznosi",
      cierre: "Satnica pokriva radno vreme i troškove obavljanja moje delatnosti. Na zahtev ću pripremiti i ponudu sa cenom za ceo projekat.",
    },
    escenarios: { titulo: "Za druge ciljne prihode", explica: "Isti obračun sa nižim i višim ciljnim prihodima." },
  },
  "plan-sueldo": {
    nombre: "Izveštaj o zaradi",
    tituloCorto: "izveštaj o zaradi",
    paraQuien: "Da o plati, ponudi ili povišici pregovarate znajući koliko to iznosi po satu, mesečno i godišnje",
    descripcion: [
      "PDF izveštaj sa objašnjenjem obračuna vaše zarade, sa vašim brojevima i svakom vrednošću koju upotrebljava.",
      "Uz to dobijate tabelu sa drugim iznosima, da poredite ponude ili tražite povišicu sa jasnim brojevima.",
    ],
    gancho: "Pregovarajte o plati sa brojevima u ruci",
    incluye: [
      { titulo: "Vaš kompletan obračun", texto: "Sa svakom vrednošću koju ste uneli." },
      { titulo: "Sa drugim iznosima", texto: "Da uporedite dve ponude za minut." },
      { titulo: "Saveti za pregovore", texto: "Šta reći i šta tražiti osim samog broja." },
    ],
    pasos: {
      titulo: "Kako da se dogovorite",
      items: [
        "Kada poredite ponude, govorite o godišnjim iznosima ili iznosima po satu: mesečni brojevi kriju razliku.",
        "Tražite i ono što nije plata: dodatne dane odmora, rad od kuće, obuke ili bonuse.",
        "Dođite sa konkretnim brojem i obrazloženjem: vaše iskustvo, tržište ili ono što se promenilo u vašem poslu.",
      ],
    },
    escenarios: DRUGI_IZNOSI,
  },
  "kit-calculos": {
    nombre: "Obračun sa objašnjenjem korak po korak",
    tituloCorto: "obračun sa objašnjenjem",
    paraQuien: "Da imate obračun rešen i objašnjen, spreman za štampu, učenje ili predaju",
    descripcion: [
      "PDF izveštaj sa vašim obračunom, postupkom rešavanja i rezultatom, sa vašim brojevima.",
      "Upotrebite ga za učenje, kao zapis obračuna ili da ga nekome pokažete bez dodatnog objašnjavanja.",
    ],
    gancho: "Ponesite obračun sa sobom, sa objašnjenjem korak po korak",
    incluye: [
      { titulo: "Rešen obračun", texto: "Sa vašim podacima i rezultatom." },
      { titulo: "Kako se računa", texto: "Da vidite odakle dolazi svaki broj." },
      { titulo: "Spremno za štampu", texto: "Ili za čuvanje kao PDF i deljenje." },
    ],
    pasos: {
      titulo: "Kako da proverite obračun",
      items: ["Izračunajte unazad: od rezultata se vratite do početne vrednosti.", "Zaokružujte tek na kraju: zaokruživanje u svakom koraku menja rezultat."],
    },
    escenarios: DRUGI_IZNOSI,
  },
  "kit-gastos-grupo": {
    nombre: "Pregled zajedničkih troškova",
    tituloCorto: "pregled troškova",
    paraQuien: "Da svako zna koliko duguje, bez rasprave i računanja na salveti",
    descripcion: [
      "PDF pregled zajedničkog računa: ukupan iznos, koliko plaća svako i, ako treba, ko kome duguje.",
      "Pošaljite ga u grupni čet ili ga odštampajte, da niko ne mora da preračunava.",
    ],
    gancho: "Podelite račun sa ostalima jasno i bez rasprave",
    incluye: [
      { titulo: "Koliko plaća svako", texto: "Sa ukupnim iznosom i detaljima na uvid." },
      { titulo: "Spremno za deljenje", texto: "U PDF-u, da ga pošaljete ostalima." },
      { titulo: "Sa drugim ukupnim iznosima", texto: "Ako se na račun nešto doda." },
    ],
    pasos: {
      titulo: "Kako da se poravnate",
      items: ["Pošaljite pregled ostalima pre nego što neko plati: izbeći ćete nesporazume.", "Dogovorite način plaćanja i datum do kada se poravnavate."],
    },
    escenarios: { titulo: "Sa drugim ukupnim iznosima", explica: "Ista podela kada je ukupan iznos malo manji ili veći." },
  },
  "kit-estudio": {
    nombre: "Izveštaj o proseku ocena",
    tituloCorto: "izveštaj o proseku",
    paraQuien: "Da svoj prosek imate jasno i napismeno, sa težinom svake ocene",
    descripcion: [
      "PDF izveštaj sa vašim prosekom: svaka ocena, njena težina i kako se dolazi do rezultata.",
      "Upotrebite ga da proverite ocenu, isplanirate sledeći ispit ili pokažete obračun onome kome treba.",
    ],
    gancho: "Imajte objašnjenje svog proseka napismeno",
    incluye: [
      { titulo: "Svaka ocena sa svojom težinom", texto: "Da vidite koja najviše utiče." },
      { titulo: "Obračun korak po korak", texto: "Da ga proverite ili pokažete." },
      { titulo: "Ideje za sledeći ispit", texto: "Kako da prosek iskoristite za bolju organizaciju." },
    ],
    pasos: {
      titulo: "Za sledeći ispit",
      items: ["Pogledajte koja ocena ima najveću težinu i posvetite tom predmetu ili ispitu više vremena.", "Ako vam se čini da je ocena pogrešno izračunata, pokažite ovaj izveštaj nastavniku."],
    },
  },
  "kit-fechas": {
    nombre: "Izveštaj o datumima i rokovima",
    tituloCorto: "izveštaj o datumima",
    paraQuien: "Da izračunati datum ili rok imate napismeno, spreman kao dokaz ili da ga ne zaboravite",
    descripcion: [
      "PDF izveštaj sa obračunom datuma: datumi koje ste uneli, rezultat i kako je izračunat.",
      "Upotrebite ga uz dokumente, ugovor, rok dospeća ili samo kao zapis.",
    ],
    gancho: "Imajte ovaj datum napismeno, spreman kao dokaz",
    incluye: [
      { titulo: "Objašnjen obračun", texto: "Sa datumima i načinom na koji se broje dani." },
      { titulo: "Spremno kao dokaz", texto: "Uz dokumente ili kao prilog ugovoru." },
      { titulo: "Za vašu evidenciju", texto: "Sa datumom kada je napravljen." },
    ],
    pasos: {
      titulo: "Pre nego što datum upotrebite u dokumentima",
      items: [
        "Proverite da li se rok računa u kalendarskim ili radnim danima: od toga zavisi rezultat.",
        "Pogledajte da li poslednji dan pada na praznik ili vikend.",
        "Upišite konačni datum u kalendar, sa podsetnikom nekoliko dana ranije.",
      ],
    },
  },
  "plan-salud": {
    nombre: "Izveštaj o BMI i kalorijama",
    tituloCorto: "izveštaj o BMI i kalorijama",
    paraQuien: "Da svoje vrednosti telesne mase i energije imate napismeno i ponesete ih lekaru",
    descripcion: [
      "PDF izveštaj sa objašnjenjem vašeg rezultata: šta meri, kako je izračunat i u koji raspon spada, sa vašim podacima.",
      "To su opšte informacije za razgovor sa zdravstvenim radnikom. Nije dijagnoza i ne zamenjuje pregled kod lekara.",
    ],
    gancho: "Ponesite svoje vrednosti lekaru, objašnjene i napismeno",
    incluye: [
      { titulo: "Vaš rezultat sa objašnjenjem", texto: "Šta meri i kako je izračunat." },
      { titulo: "Pitanja za lekara", texto: "Da iz pregleda izvučete više." },
      { titulo: "Za praćenje promena", texto: "Sačuvajte svaki izveštaj i poredite ih vremenom." },
    ],
    pasos: {
      titulo: "Kako da o tome razgovarate sa stručnjakom",
      items: [
        "Ponesite ovaj izveštaj i pitajte koji je raspon zdrav baš za vas, s obzirom na godine i zdravstvenu istoriju.",
        "Recite kako se hranite, koliko se krećete i kako spavate: sami brojevi ne pokazuju sve.",
        "Ne pravite velike promene u ishrani ili fizičkoj aktivnosti dok se ne posavetujete sa stručnjakom.",
      ],
    },
    aviso: "Opšte informacije. Ne zamenjuju savet zdravstvenog radnika.",
  },
  "plan-embarazo": {
    nombre: "Izveštaj o plodnosti i trudnoći",
    tituloCorto: "izveštaj o plodnosti i trudnoći",
    paraQuien: "Da okvirne datume imate napismeno i ponesete ih na sledeći pregled",
    descripcion: [
      "PDF izveštaj sa okvirnim datumima i načinom na koji je svaki izračunat, iz podataka koje ste uneli.",
      "Datumi su okvirni: svako telo i svaka trudnoća su drugačiji. Pomažu u organizaciji i u razgovoru sa zdravstvenim radnikom, ali ne zamenjuju pregled.",
    ],
    gancho: "Imajte svoje datume napismeno do sledećeg pregleda",
    incluye: [
      { titulo: "Vaši okvirni datumi", texto: "Sa načinom na koji je svaki izračunat." },
      { titulo: "Pitanja za pregled", texto: "Da iz posete izvučete što više." },
      { titulo: "Za vašu evidenciju", texto: "Sa podacima koje ste upotrebili." },
    ],
    pasos: {
      titulo: "Za sledeći pregled",
      items: [
        "Ponesite ovaj izveštaj i datum prvog dana poslednje menstruacije.",
        "Pitajte koji su pregledi potrebni u vašoj nedelji trudnoće i kada je sledeći pregled.",
        "Ako vas brine bilo koji simptom, javite se lekaru i ne čekajte datume iz izveštaja.",
      ],
    },
    aviso: "Opšte informacije. Datumi su okvirni i ne zamenjuju brigu zdravstvenog radnika.",
  },
  "plan-entrenamiento": {
    nombre: "Izveštaj o tempu trčanja",
    tituloCorto: "izveštaj o tempu",
    paraQuien: "Da na trening izađete znajući ciljni tempo i kako da rasporedite snagu",
    descripcion: [
      "PDF izveštaj sa objašnjenjem vašeg tempa, vremena i brzine, iz podataka koje ste uneli.",
      "Sadrži kompletne tabele obračuna i savete kako da tempo upotrebite na treningu.",
    ],
    gancho: "Imajte svoj tempo napismeno za dan trke",
    incluye: [
      { titulo: "Vaš tempo sa objašnjenjem", texto: "Sa vremenom i brzinom." },
      { titulo: "Za štampu i uz sebe", texto: "U džep ili na frižider." },
      { titulo: "Saveti za trening", texto: "Kako da tempo upotrebite bez povrede." },
    ],
    pasos: {
      titulo: "Kako da upotrebite tempo",
      items: [
        "Prve minute trčite malo sporije od ciljnog tempa: na cilju ćete to osetiti.",
        "Većinu nedeljnih treninga trčite laganim tempom, uz koji još možete da pričate.",
        "Ako vas nešto boli, stanite i posavetujte se sa stručnjakom: tempo može da sačeka.",
      ],
    },
    aviso: "Opšte informacije. Ne zamenjuju savet zdravstvenog radnika ni sportskog stručnjaka.",
  },
  "kit-viaje": {
    nombre: "Budžet goriva za put",
    tituloCorto: "budžet goriva",
    paraQuien: "Da znate koliko ćete potrošiti na gorivo i da iznos podelite sa svima koji putuju",
    descripcion: [
      "PDF izveštaj sa cenom goriva za vaš put, sa vašim brojevima: razdaljina, potrošnja i cena.",
      "Uz to dobijate tabelu sa drugim cenama goriva, za slučaj da se do polaska promene, i spisak ostalih troškova puta.",
    ],
    gancho: "Imajte cenu puta napismeno pre polaska",
    incluye: [
      { titulo: "Cena puta", texto: "Sa razdaljinom, potrošnjom i cenom." },
      { titulo: "Uz druge cene", texto: "Za slučaj da gorivo do polaska poskupi." },
      { titulo: "Spisak za ostatak puta", texto: "Putarina, parking i hrana." },
    ],
    pasos: {
      titulo: "Kako da napravite budžet puta",
      items: [
        "Ceni goriva dodajte putarinu, parking i hranu.",
        "Ako putuje više ljudi, podelite ukupan iznos i javite svima pre polaska.",
        "Proverite pritisak u gumama: sa izduvanim gumama auto troši više goriva.",
      ],
    },
    escenarios: { titulo: "Uz druge cene", explica: "Isti put sa malo jeftinijim i malo skupljim gorivom." },
  },
  "kit-hogar": {
    nombre: "Izveštaj o troškovima struje",
    tituloCorto: "izveštaj o troškovima struje",
    paraQuien: "Da znate koliko košta svaki uređaj i gde na računu za struju može da se uštedi",
    descripcion: [
      "PDF izveštaj sa onim koliko vas košta vaš uređaj, sa vašim podacima o korišćenju i cenom struje.",
      "Uz to dobijate tabelu sa drugim cenama struje i spisak ideja kako da smanjite račun.",
    ],
    gancho: "Saznajte koliko vas ovaj uređaj košta i kako da to smanjite",
    incluye: [
      { titulo: "Trošak uz vaše korišćenje", texto: "Sa objašnjenjem korak po korak." },
      { titulo: "Uz druge cene", texto: "Za slučaj da struja poskupi." },
      { titulo: "Ideje za uštedu", texto: "One koje se na računu najviše vide." },
    ],
    pasos: {
      titulo: "Kako da smanjite račun",
      items: [
        "Uređaje u stanju pripravnosti isključite iz utičnice: troše struju i kada su ugašeni.",
        "Najjače uređaje uključujte u vreme niže tarife, ako je imate.",
        "Uporedite ovaj izveštaj sa svojim računom, da vidite koliki deo ukupnog iznosa čini ovaj uređaj.",
      ],
    },
    escenarios: { titulo: "Uz druge cene", explica: "Isto korišćenje sa malo jeftinijom i malo skupljom strujom." },
  },
  "kit-obra": {
    nombre: "Spisak građevinskog materijala",
    tituloCorto: "spisak materijala",
    paraQuien: "Da materijal kupite u pravoj količini, da ništa ne nedostaje i ništa ne preostane",
    descripcion: [
      "PDF izveštaj sa obračunom materijala: mere, količine i kako je izračunato, spreman da ga ponesete u prodavnicu.",
      "Uz to dobijate spisak kako da kupite pravilno: rezerva za otpad, šta pitati i šta proveriti pre početka radova.",
    ],
    gancho: "Dođite u prodavnicu sa spiskom materijala u ruci",
    incluye: [
      { titulo: "Mere i količine", texto: "Sve što ste izračunali, na jednoj stranici." },
      { titulo: "Da pokažete u prodavnici", texto: "Da vam izračunaju tačno ono što vam treba." },
      { titulo: "Spisak za pravilnu kupovinu", texto: "Rezerva za otpad i šta proveriti." },
    ],
    pasos: {
      titulo: "Pre kupovine",
      items: [
        "Dodajte 5 do 10 % za sečenje i lom, a za složene oblike više.",
        "Kupite sve iz iste proizvodne serije: boja i nijansa mogu da se razlikuju od serije do serije.",
        "Pitajte za potrošnju izabranog materijala: razlikuje se od proizvođača do proizvođača.",
        "Sačuvajte račun i neotvorena pakovanja: mnoge prodavnice ih primaju nazad.",
      ],
    },
  },
  "kit-facturacion": {
    nombre: "Izveštaj o PDV-u i porezu na promet",
    tituloCorto: "izveštaj o PDV-u",
    paraQuien: "Da izdate račun ili proverite cenu sa jasno izdvojenim PDV-om, spremno za vašu evidenciju ili knjigovođu",
    descripcion: [
      "PDF izveštaj sa vašim obračunom: cena bez poreza, porez i ukupan iznos, sa stopom koja se primenjuje i njenim izvorom.",
      "Uz to dobijate tabelu sa drugim iznosima, korisnu za cenovnik sa porezom i bez njega.",
    ],
    gancho: "Imajte cenu sa porezom i bez njega napismeno",
    incluye: [
      { titulo: "Porez posebno", texto: "Iznos bez poreza, porez i ukupan iznos prema važećoj stopi." },
      { titulo: "Sa drugim iznosima", texto: "Da cenovnik napravite odjednom." },
      { titulo: "Za vašeg knjigovođu", texto: "Sa izvorom stope i datumom." },
    ],
    pasos: {
      titulo: "Pre nego što izdate račun",
      items: [
        "Proverite da li se na vaš proizvod ili uslugu primenjuje opšta ili posebna (niža) stopa.",
        "Proverite da li račun posebno navodi osnovicu i porez, ako se to zahteva.",
        "Sačuvajte ovaj izveštaj zajedno sa računom u svojoj evidenciji.",
      ],
    },
    escenarios: DRUGI_IZNOSI,
  },
  "informe-calculo": {
    nombre: "Izveštaj o obračunu",
    tituloCorto: "izveštaj o obračunu",
    paraQuien: "Da ovaj obračun imate napismeno, sa vašim brojevima, pretpostavkama i izvorom svake zvanične vrednosti",
    descripcion: [
      "PDF izveštaj obračuna koji ste upravo uradili, korak po korak sa vašim podacima: rezultat, pretpostavke na kojima počiva i svaka zvanična vrednost sa izvorom i datumom provere.",
      "Sačuvajte ga u svojim dokumentima ili ga predajte knjigovođi, poslodavcu ili bilo kome ko treba da ga pregleda, a da ne morate ponovo da objašnjavate svaki broj.",
    ],
    gancho: "Imajte ovaj obračun napismeno, sa izvorima",
    incluye: [
      { titulo: "Vaš rezultat", texto: "Tačno onako kako ste ga izračunali, spreman za štampu." },
      { titulo: "Kako je nastao", texto: "Koraci i pretpostavke, da se svaki broj može proveriti." },
      { titulo: "Zvanični izvori", texto: "Svaka vrednost sa institucijom, linkom i datumom provere." },
    ],
    pasos: {
      titulo: "Pre nego što ga upotrebite",
      items: [
        "Proverite da li su podaci na vrhu vaši: rezultat zavisi od njih.",
        "Ako se zvanična vrednost u međuvremenu izmenila, izračunajte ponovo: izveštaj upotrebljava vrednosti važeće na dan kupovine.",
      ],
    },
  },
};

export const sr: DiccionarioVenta = {
  familias,
  general: { si: "Da", no: "Ne" },
  tarjeta: {
    cejaInforme: "PDF izveštaj",
    cejaPlanilla: "Excel tabela",
    pagoUnico: "jednokratno plaćanje",
    comprarInforme: "Preuzmi izveštaj",
    comprarPlanilla: "Preuzmi tabelu",
    confianza: "Plaćanje preko PayPal-a ili karticom. Ako vam izveštaj ne bude koristan, vraćamo novac u roku od 7 dana.",
    verDetalle: "Šta sadrži",
    tambien: "Moglo bi vam koristiti i:",
    tablasOficiales: "Zvanične tabele",
    bajadaInforme: "Izveštaj razlaže obračun korak po korak sa vašim brojevima i izvorom svake vrednosti, spreman za štampu ili čuvanje kao PDF.",
    bajadaPlanilla: "Tabela sadrži ovaj obračun sa vašim brojevima i vidljivim formulama, pa možete da izmenite šta god želite.",
    bajadaPlanillaHoja: "Tabela sadrži ovaj obračun na listu „{hoja}“ sa vašim brojevima i vidljivim formulama, pa možete da izmenite šta god želite.",
    equivale: "Otprilike {monto} po današnjem kursu.",
    cobroDolares: "Plaća se u američkim dolarima.",
  },
  aviso: {
    pronto: "Uskoro",
    titulo: "Javite mi kada bude dostupno",
    ayuda: "Pisaćemo vam samo jednom, kada počnemo da prodajemo.",
    boton: "Obavesti me",
    listo: "Gotovo. Čim počnemo da prodajemo, poslaćemo vam imejl.",
    error: "Vašu adresu nismo uspeli da sačuvamo. Proverite da li je dobro napisana i pokušajte ponovo.",
    correo: "Vaš imejl",
  },
  planilla: {
    gancho: "Prenesite ovaj obračun u Excel, sa već upisanim podacima",
    incluye: [
      { titulo: "Vaši podaci su već upisani", texto: "Izmenite žutu ćeliju i sve se ponovo izračuna." },
      { titulo: "Zarada, bonusi i konačni obračun", texto: "U jednoj datoteci koju možete da koristite cele godine." },
      { titulo: "Ažuriranje uz svaku zvaničnu izmenu", texto: "Na istom linku nova verzija, bez novog plaćanja." },
    ],
  },
  informe: {
    tusDatos: "Vaši podaci",
    resultado: "Rezultat",
    corregir: "Ispravi moje podatke",
    actualizar: "Ažuriraj izveštaj",
    imprimir: "Odštampaj ili sačuvaj kao PDF",
    imprimirAyuda: "U prozoru za štampu izaberite „Sačuvaj kao PDF“ i dobićete datoteku.",
    sinResultado: "Unesite svoje podatke u delu „Ispravi moje podatke“ i izveštaj će se napraviti.",
    lugar: "Mesto i datum",
    destinatario: "Primalac",
    firma: "Potpis",
    nombre: "Ime i prezime",
    documento: "Broj lične isprave",
    etiquetaEnMinuscula: true,
    comoSeCalcula: "Kako se računa",
    fuentes: "Zvanični izvori",
    verificado: "provereno",
    emitido: "Datum izdavanja",
    valores: "Zvanične vrednosti važeće na dan",
    numero: "Izveštaj",
    elegir: "Izaberite obračun za izveštaj:",
    legal:
      "Ovaj izveštaj je procena prema navedenim pravilima i zvaničnim vrednostima na navedeni datum. Ne zamenjuje savet stručnjaka ni odluku nadležnog organa. Ako se neki vaš podatak razlikuje, rezultat se menja: ispravite ga i ponovo odštampajte izveštaj.",
    legalSinFuentes: "Ovaj izveštaj je procena prema podacima koje ste uneli, na navedeni datum. Ne zamenjuje savet stručnjaka. Ako se neki podatak izmeni, menja se i rezultat: ispravite ga i ponovo odštampajte izveštaj.",
    errorTitulo: "Ovaj izveštaj nije mogao da se otvori",
    error: "Nismo uspeli da potvrdimo plaćanje za ovaj link. Ako je novac skinut sa vašeg računa, pišite nam i sve ćemo rešiti. Ako kupovina nije prošla, možete da je ponovite.",
    verificar: "Plaćanje trenutno ne možemo da proverimo. Pokušajte ponovo za nekoliko minuta: ne morate ponovo da plaćate.",
    cupo: "Previše pokušaja zaredom. Sačekajte nekoliko minuta i ponovo otvorite link.",
  },
  // {normas} lo completa cada país en dativo, después de «prema» («prema Zakonu o radu i Zakonu o
  // porezu na dohodak građana»), e {incluye} en acusativo, después de «Sadrži» («neto zaradu, bonus
  // i konačni obračun»).
  catalogo: {
    tituloProducto: "{nombre} ({pais})",
    disparadorInforme: "Svaki put kada se izmeni zvanična vrednost koju obračun upotrebljava",
    planillaDescripcion: "Gotova Excel tabela: unesite svoje podatke u žute ćelije i obračun ide sam, sa formulama prema {normas}.",
    planillaIncluye: "Sadrži {incluye}. Na svakom listu se vide koraci, a na listu sa zvaničnim tabelama je svaka vrednost sa izvorom i datumom naše provere.",
  },
  planillas: {
    migaPlanillas: "Tabele i izveštaji",
    catalogoTitulo: "Tabele i izveštaji ({pais})",
    catalogoBajada: "Excel tabele i PDF izveštaji sa vašim brojevima i zvaničnim podacima zemlje. Jednokratno plaćanje, bez pretplate.",
    seccionPlanillas: "Excel tabele",
    seccionInformes: "PDF izveštaji",
    catalogoVacio: "Tabele za ovu zemlju ({pais}) pripremamo. Kalkulatori su za sada besplatni.",
    verCalculadoras: "Prikaži kalkulatore",
    comprar: "Kupi za {precio}",
    pronto: "Uskoro",
    incluye: "Šta sadrži",
    incluyeInforme: [
      "Izveštaj sa vašim brojevima na stranici koju možete da odštampate ili sačuvate kao PDF.",
      "Link bez roka važenja: podatke možete da ispravite kad god želite i ponovo odštampate izveštaj.",
      "Ako vam izveštaj ne bude koristan, vraćamo novac u roku od 7 dana.",
    ],
    incluyePlanilla: [
      "Datoteka .xlsx koja se otvara u Excelu i u Google tabelama.",
      "Ažuriranje: {disparador}, tabelu ažuriramo, a novu verziju preuzimate na istom linku.",
      "Ako vam tabela ne bude korisna, vraćamo novac u roku od 7 dana.",
    ],
    pagoUnico: "Jednokratno plaćanje preko PayPal-a. Možete da platite sa PayPal naloga ili karticom.",
    comprarPlanilla: "Kupovina: {titulo}",
    comprarBajadaInforme: "Čim se plaćanje potvrdi, na ovu adresu šaljemo link do vašeg izveštaja.",
    comprarBajadaPlanilla: "Čim se plaćanje potvrdi, na ovu adresu šaljemo tabelu.",
    etiquetaEmail: "Vaš imejl",
    seguirPago: "Nastavi na plaćanje",
    privacidad: "Vašu adresu koristimo samo da vam pošaljemo kupljeno i njegova ažuriranja.",
    datosTitulo: "Sa brojevima iz vašeg obračuna",
    datosUsar: "Upotrebi ove brojeve u mojoj kupovini. Čuvaju se samo radi pripreme kupljenog.",
    errores: {
      email: "Proverite imejl adresu: izgleda da u njoj nešto nedostaje.",
      error: "Plaćanje nije moglo da počne. Ništa vam nije naplaćeno. Pokušajte ponovo za nekoliko minuta.",
      cancelado: "Otkazali ste plaćanje. Ništa vam nije naplaćeno.",
      fallido: "PayPal nije potvrdio plaćanje. Možete da probate drugu karticu.",
      pronto: "Prodaja još nije počela.",
    },
    graciasTitulo: "Hvala na kupovini",
    graciasListoInforme: "Plaćanje je potvrđeno. Svoju kupovinu već možete da otvorite: {titulo}. Link smo vam poslali i imejlom i ne ističe.",
    graciasListoPlanilla: "Plaćanje je potvrđeno. Svoju kupovinu već možete da preuzmete: {titulo}. Poslali smo vam je i imejlom, sa linkom koji ne ističe.",
    graciasPendiente: "Čekamo potvrdu od PayPal-a. Čim stigne, kupljeno vam šaljemo imejlom.",
    muestraIntro: "Ovo je list „{hoja}“ sa primerom podataka sa kojima se otvara. Obračun je današnji, sa važećim zvaničnim vrednostima.",
    muestraLeyenda: ["unosite vi", "računa tabela"],
    comprobar: "Proverite pre plaćanja: besplatni kalkulator daje iste brojeve. Probajte isti slučaj i uporedite.",
    comprobarEnlace: "Idi na besplatni kalkulator",
    faqTitulo: "Česta pitanja",
    faq: {
      sheets: {
        pregunta: "Da li radi u Google tabelama i u Excelu?",
        respuesta: "Da. To je datoteka .xlsx: otvara se u Excelu i u Google tabelama (otpremite je na svoj Disk i otvorite je tamo). Obračun upotrebljava obične formule, bez makroa.",
      },
      recibo: {
        pregunta: "Kako je dobijam?",
        respuesta: "Čim se plaćanje potvrdi, šaljemo vam je imejlom sa linkom za preuzimanje koji ne ističe. Možete da je preuzmete i sa stranice koja se otvori posle plaćanja.",
      },
      dolares: {
        pregunta: "Da li se plaća u američkim dolarima?",
        respuesta: "Da. Cena je u američkim dolarima (USD), a plaćate preko PayPal-a, sa naloga ili karticom.",
        conReferencia: "Iznad prikazujemo približan iznos u vašoj valuti po današnjem kursu, samo okvirno: konačan iznos zavisi od kursa vaše banke ili kartice.",
        sinReferencia: "Ako je vaša kartica u drugoj valuti, konverziju radi vaša banka.",
      },
      devolucion: { pregunta: "Mogu li da dobijem novac nazad?", respuesta: "Da. Ako vam tabela ne bude korisna, odgovorite u roku od 7 dana na imejl sa kupovinom i vraćamo vam novac." },
      actualiza: { pregunta: "Da li se ažurira kada se zvanične vrednosti izmene?", respuesta: "Da. {disparador}, tabelu ažuriramo, a novu verziju preuzimate na istom linku." },
    },
    descargar: "Preuzmi tabelu (.xlsx)",
    abrirInforme: "Otvori moj izveštaj",
    fuentes: "Zvanični izvori koje upotrebljava",
    calculadoras: "Radi sa ovim kalkulatorima",
    muestra: "Kako izgleda",
  },
  correo: {
    asuntoInforme: "Vaša kupovina na CalcularYa: {titulo}",
    asuntoPlanilla: "{titulo}: preuzimanje i ažuriranja",
    mismosNumeros: "Brojevi su isti kao u {enlace}, sa zvaničnim podacima.",
    enlaceCalculadora: "besplatnom kalkulatoru CalcularYa",
    comprobante: "Ovo je potvrda vaše kupovine na {marca}.",
    informe: {
      encabezado: "Izveštaj je spreman za otvaranje",
      intro: "Hvala na kupovini ({titulo}). Otvorite ga ovde:",
      boton: "Otvori moj izveštaj",
      abre: "Izveštaj se otvara u pregledaču. Odatle ga možete odštampati ili sačuvati kao PDF.",
      guarda: "Sačuvajte ovaj imejl",
      vence: "Link je vaš i ne ističe. Izveštaj upotrebljava zvanične vrednosti važeće na dan kupovine, a podatke možete da ispravite kad god želite i ponovo odštampate izveštaj.",
      devolucion: "Ako vam izveštaj ne bude koristan, odgovorite na ovaj imejl u roku od 7 dana i vraćamo vam novac.",
      ayuda: "Imate problem? Odgovorite na ovaj imejl ili nam pišite na {contacto}.",
    },
    planilla: {
      encabezado: "Tabela je spremna za preuzimanje",
      intro: "Hvala na kupovini ({titulo}). Preuzmite je ovde:",
      boton: "Preuzmi tabelu (.xlsx)",
      abre: "Otvara se u Excelu i u Google tabelama.",
      guarda: "Sačuvajte ovaj imejl",
      vence: "Link je vaš i ne ističe. {disparador}, tabelu ažuriramo, a na istom linku dobijate najnoviju verziju. Ne morate ponovo da plaćate.",
      devolucion: "Ako vam tabela ne bude korisna, odgovorite na ovaj imejl u roku od 7 dana i vraćamo vam novac.",
      ayuda: "Imate problem? Odgovorite na ovaj imejl ili nam pišite na {contacto}.",
    },
  },
};
