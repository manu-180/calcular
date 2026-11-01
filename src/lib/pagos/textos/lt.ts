import type { ClaveFamilia } from "../ofertas-intl";
import type { DiccionarioVenta, TextosFamilia } from "./tipos";

// Lituano (ADR 0002, D29): un solo registro, el de VMI (Mano VMI), Swedbank, SEB y Sodra. «jūs» en
// minúscula y el imperativo de segunda del plural («įveskite», «atsisiųskite»), nunca «tu»; los botones
// cortos en infinitivo («Pirkti», «Atsisiųsti»). Sin participios ni adjetivos con género sobre la persona:
// «prieš pasirašant», no «prieš pasirašydami». Las cartas del informe van en primera persona, también sin
// género. Los textos de las familias sirven a cualquier país: nada de organismos de un solo país. El país
// llega en el marcador {pais} sin declinar, así que va en nominativo entre paréntesis. Comillas „ “.
const JUSU_DOKUMENTAMS = { titulo: "Jūsų dokumentams", texto: "Su skaičiavime naudotų dydžių data." };
const KITOS_SUMOS = { titulo: "Su kitomis sumomis", explica: "Tas pats skaičiavimas su šiek tiek mažesnėmis ir šiek tiek didesnėmis sumomis." };
const KITOS_NORMOS = { titulo: "Su kitomis palūkanų normomis", explica: "Tie patys skaičiai su šiek tiek mažesnėmis ir šiek tiek didesnėmis palūkanų normomis." };

const familias: Record<ClaveFamilia, TextosFamilia> = {
  liquidacion: {
    nombre: "Galutinio atsiskaitymo ataskaita",
    tituloCorto: "galutinio atsiskaitymo ataskaita",
    paraQuien: "Kad galėtumėte patikrinti galutinį atsiskaitymą išeinant iš darbo dar prieš pasirašant arba jo pareikalauti, su savo skaičiais ir pagal savo šalies taisykles",
    descripcion: [
      "PDF ataskaita, kurioje atsiskaitymas išskaidytas į atskiras dalis: kiek jums priklauso už kiekvieną, kaip tai apskaičiuota ir kokie oficialūs dydžiai naudoti. Prie kiekvieno dydžio nurodytas šaltinis.",
      "Taip pat rasite sąrašą, ką patikrinti prieš pasirašant, ir laišką su jau įrašyta suma, kuriuo mokėjimo galėsite paprašyti raštu.",
    ],
    gancho: "Turėkite galutinį atsiskaitymą raštu ir patikrinkite jį prieš pasirašant",
    incluye: [
      { titulo: "Kiekviena dalis su skaičiavimu", texto: "Kad galėtumėte eilutė po eilutės palyginti su tuo, ką siūlo darbdavys." },
      { titulo: "Oficialūs šaltiniai matomi", texto: "Kiekvienas dydis su jį skelbiančia institucija ir mūsų patikros data." },
      { titulo: "Paruoštas prašymas", texto: "Su įrašyta jūsų suma, kad mokėjimo galėtumėte prašyti raštu." },
    ],
    pasos: {
      titulo: "Prieš pasirašant",
      items: [
        "Palyginkite kiekvieną šios ataskaitos dalį su dokumentu, kurį turite pasirašyti. Jei ko nors trūksta, paklauskite kodėl, kol dar nepasirašėte.",
        "Patikrinkite, ar darbdavio naudojamas atlyginimas ir datos sutampa su tais, kuriuos įvedėte čia. Kita darbo pradžios data pakeičia beveik visas sumas.",
        "Paprašykite visko, ką pasirašote, kopijos ir pasilikite paskutinių mėnesių algalapius.",
        "Jei skirtumas didelis arba jus atleido, parodykite šią ataskaitą savo šalies darbo inspekcijai arba darbo teisės advokatui. Taip sutaupysite jiems pirmą skaičiavimo valandą.",
      ],
    },
    nota: {
      titulo: "Prašymas išmokėti sumas",
      uso: "Užpildykite, pasirašykite ir įteikite kartu su kopija sau. Paprašykite, kad kopijoje priėmimą patvirtintų parašu ir data.",
      pedido: "Prašau išmokėti man priklausančias sumas, susijusias su darbo santykių pabaiga. Pagal pridėtoje ataskaitoje pateiktą skaičiavimą jos sudaro",
      cierre: "Pridėtame skaičiavime kiekviena dalis apskaičiuota pagal nurodytą dieną galiojusius oficialius dydžius. Prašau nurodyti išmokėjimo datą.",
    },
  },
  "pagos-laborales": {
    nombre: "Darbo išmokų ataskaita",
    tituloCorto: "darbo išmokų ataskaita",
    paraQuien: "Kad žinotumėte, ar premija, atostoginiai, viršvalandžiai ar pelno dalis apskaičiuoti teisingai, o jei ne, galėtumėte prašyti skirtumo",
    descripcion: [
      "PDF ataskaita su jūsų skaičiavimu žingsnis po žingsnio ir jūsų skaičiais: koks pagrindas naudotas, kaip skaičiuojama ir kokie oficialūs dydžiai taikomi. Prie kiekvieno dydžio nurodytas šaltinis.",
      "Tinka bet kuriai sąrašo išmokai. Parodo, kaip ją patikrinti algalapyje, ir pateikia laišką, kuriuo skirtumo galėsite prašyti raštu.",
    ],
    gancho: "Turėkite šį skaičiavimą raštu ir palyginkite jį su algalapiu",
    incluye: [
      { titulo: "Skaičiavimas žingsnis po žingsnio", texto: "Su jūsų duomenimis ir kiekvienu naudojamu oficialiu dydžiu." },
      { titulo: "Ko ieškoti algalapyje", texto: "Kad per minutę matytumėte, ar sumokėta teisingai." },
      { titulo: "Laiškas dėl priemokos", texto: "Su įrašyta jūsų suma, paruoštas įteikti." },
    ],
    pasos: {
      titulo: "Kaip patikrinti išmoką",
      items: [
        "Raskite šią išmoką algalapyje ir palyginkite ją su šios ataskaitos suma.",
        "Jei nesutampa, pirmiausia patikrinkite, ar jūsų įvesti duomenys tokie patys kaip tie, kuriais remiasi darbdavys.",
        "Jei vis tiek nesutampa, pasinaudokite toliau pateiktu laišku ir prašykite skirtumo raštu. Kopiją pasilikite.",
      ],
    },
    nota: {
      titulo: "Prašymas dėl priemokos",
      uso: "Užpildykite, pasirašykite ir įteikite kartu su kopija sau.",
      pedido: "Prašau išmokėti pridėtoje ataskaitoje nurodytą sumą. Pagal skaičiavimą su galiojančiais oficialiais dydžiais ji sudaro",
      cierre: "Jei išmokėta suma buvo kitokia, prašau raštu paaiškinti, kaip ji apskaičiuota.",
    },
    escenarios: { titulo: "Kai keičiasi valandų skaičius", explica: "Tas pats skaičiavimas su kitu valandų skaičiumi, kad kas mėnesį galėtumėte tikrinti be naujo skaičiavimo." },
  },
  impuesto: {
    nombre: "Pajamų mokesčio ataskaita",
    tituloCorto: "pajamų mokesčio ataskaita",
    paraQuien: "Kad žinotumėte, kiek mokesčio išskaičiuojama, galėtumėte patikrinti algalapį ir matytumėte, kas nutinka pasikeitus pajamoms",
    descripcion: [
      "PDF ataskaita, kurioje jūsų mokestis apskaičiuotas žingsnis po žingsnio, su taikoma oficialia lentele ir kiekvieno dydžio šaltiniu.",
      "Taip pat rasite mokesčio lentelę su kitomis pajamomis, kad iš anksto žinotumėte, kiek liks „į rankas“ padidinus atlyginimą arba pakeitus darbą.",
    ],
    gancho: "Turėkite savo mokesčio paaiškinimą raštu ir pažiūrėkite, kas nutinka pasikeitus pajamoms",
    incluye: [
      { titulo: "Skaičiavimas pagal oficialią lentelę", texto: "Žingsnis po žingsnio, su kiekvieno dydžio šaltiniu." },
      { titulo: "Jūsų mokestis su kitomis pajamomis", texto: "Kad tariantis dėl didesnio atlyginimo žinotumėte, kiek liks." },
      { titulo: "Ką patikrinti algalapyje", texto: "Kad su darbdaviu ar buhalteriu kalbėtumėte skaičių kalba." },
    ],
    pasos: {
      titulo: "Kaip patikrinti išskaičiuotą mokestį",
      items: [
        "Raskite išskaičiuotą mokestį algalapyje ir palyginkite jį su šios ataskaitos suma.",
        "Jei nesutampa, paklauskite darbdavio, kokias pajamas ir lengvatas jis taiko.",
        "Išsaugokite šią ataskaitą metinei deklaracijai, jei jūsų šalyje ji teikiama.",
      ],
    },
    escenarios: { titulo: "Kai keičiasi pajamos", explica: "Tas pats skaičiavimas su šiek tiek mažesnėmis ir šiek tiek didesnėmis pajamomis, su tais pačiais oficialiais dydžiais." },
  },
  contratacion: {
    nombre: "Darbuotojo kaštų sąmata",
    tituloCorto: "darbuotojo kaštų sąmata",
    paraQuien: "Kad žinotumėte, kiek naujas darbuotojas iš tikrųjų kainuoja su visomis įmokomis, dar prieš susitariant dėl atlyginimo",
    descripcion: [
      "PDF sąmata, kurioje visi darbuotojo kaštai išskaidyti į dalis: atlyginimas „ant popieriaus“, darbuotojo ir darbdavio įmokos, atidėjiniai. Prie kiekvieno dydžio nurodytas oficialus šaltinis.",
      "Yra ir kaštų lentelė su kitais atlyginimais, kad prieš siūlant žinotumėte, kiek iš tikrųjų kainuoja kiekvienas padidinimas. Sąmatą galite iš karto perduoti partneriui ar buhalteriui.",
    ],
    gancho: "Paverskite šiuos kaštus sąmata ir priimkite sprendimą dėl darbuotojo",
    incluye: [
      { titulo: "Kiekviena įmoka atskirai", texto: "Su taisykle ir oficialiu šaltiniu." },
      { titulo: "Kaštai su kitais atlyginimais", texto: "Kad derantis žinotumėte, kiek prideda kiekvienas žingsnis aukštyn." },
      { titulo: "Paruošta perduoti", texto: "Partneriui, buhalteriui arba jūsų dokumentams." },
    ],
    pasos: {
      titulo: "Prieš priimant darbuotoją",
      items: [
        "Pasitarkite su buhalteriu, ar jūsų sektoriuje negalioja kolektyvinė sutartis arba už bendrąjį didesnis minimalus atlyginimas.",
        "Šios sąmatos atidėjinius atidėkite kas mėnesį: tai mokėjimai, kurie susikaupia metų pabaigoje arba baigiantis sutarčiai.",
        "Darbuotoją registruokite nuo pirmos dienos: šios sąmatos kaštai jau apima privalomas įmokas.",
      ],
    },
    escenarios: { titulo: "Kaštai su kitais atlyginimais", explica: "Tas pats skaičiavimas su mažesniais ir didesniais atlyginimais, su tais pačiais oficialiais dydžiais." },
  },
  "ajuste-inflacion": {
    nombre: "Laiškas dėl indeksavimo pagal infliaciją",
    tituloCorto: "indeksavimo laiškas",
    paraQuien: "Kad galėtumėte paprašyti indeksuoti arba pranešti apie indeksavimą nuomos, įmokos, honoraro ar atlyginimo sumai pagal oficialų indeksą",
    descripcion: [
      "Paruoštas įteikti laiškas su jūsų nauja suma ir skaičiavimo pagrindimu: oficialus indeksas kiekvienai datai, jį skelbianti institucija ir nuoroda į šaltinį.",
      "Kai pagrindimas matomas, kita šalis skaičių patikrina per minutę ir kalbama apie indeksą, o ne apie skaičiavimą.",
    ],
    gancho: "Paverskite šį indeksavimą paruoštu laišku su oficialiu indeksu kaip pagrindimu",
    incluye: [
      { titulo: "Užpildytas laiškas", texto: "Su jūsų nauja suma, paruoštas spausdinti arba siųsti." },
      { titulo: "Oficialus indeksas kaip pagrindimas", texto: "Su institucija, data ir nuoroda į šaltinį." },
      { titulo: "Matomas skaičiavimas", texto: "Kad kita šalis galėtų jį patikrinti pati." },
    ],
    nota: {
      titulo: "Pranešimas apie indeksavimą",
      uso: "Įrašykite sutarties duomenis ir įteikite kartu su skaičiavimu.",
      pedido: "Pranešu, kad sutarta suma keičiama pagal oficialaus kainų indekso pokytį, kaip nurodyta pridėtame skaičiavime. Pakeista suma sudaro",
      cierre: "Skaičiavime naudojamas priede nurodytos oficialios institucijos skelbiamas indeksas, kurį galima patikrinti nurodytame šaltinyje.",
    },
  },
  regimen: {
    nombre: "Supaprastinto apmokestinimo ataskaita",
    tituloCorto: "supaprastinto apmokestinimo ataskaita",
    paraQuien: "Kad žinotumėte, kiek mokate pagal supaprastintą apmokestinimą ir kas nutinka, kai pajamos didėja arba mažėja",
    descripcion: [
      "PDF ataskaita su jūsų avansiniu mokėjimu arba mokesčiu pagal supaprastintą apmokestinimą, apskaičiuotu žingsnis po žingsnio pagal oficialią lentelę ir su kiekvieno dydžio šaltiniu.",
      "Taip pat rasite lentelę, kiek mokėtumėte su kitomis pajamomis, kad perėjimą į kitą pakopą matytumėte iš anksto.",
    ],
    gancho: "Turėkite savo skaičiavimą raštu ir pažiūrėkite, kas nutinka pasikeitus pajamoms",
    incluye: [
      { titulo: "Jūsų skaičiavimas pagal oficialią lentelę", texto: "Žingsnis po žingsnio, su kiekvieno dydžio šaltiniu." },
      { titulo: "Kiek mokėtumėte su kitomis pajamomis", texto: "Kad perėjimą į kitą pakopą matytumėte iš anksto." },
      JUSU_DOKUMENTAMS,
    ],
    escenarios: { titulo: "Kai keičiasi pajamos", explica: "Tas pats skaičiavimas su mažesnėmis ir didesnėmis pajamomis, su tais pačiais oficialiais dydžiais." },
  },
  deposito: {
    nombre: "Terminuotųjų indėlių palyginimas",
    tituloCorto: "indėlių palyginimas",
    paraQuien: "Kad palygintumėte savo indėlį skirtingiems terminams, prieš nusprendžiant, kur ir kuriam laikui padėti pinigus",
    descripcion: ["PDF ataskaita su jūsų indėlio grąža ir to paties indėlio lentele kitiems terminams, viskas apskaičiuota taip pat kaip skaičiuoklėje."],
    gancho: "Palyginkite indėlį keliems terminams vienoje ataskaitoje",
    incluye: [
      { titulo: "Jūsų indėlis keliems terminams", texto: "Vienoje lentelėje, kad pasirinktumėte iš pirmo žvilgsnio." },
      { titulo: "Skaičiavimas žingsnis po žingsnio", texto: "Su kiekvieno naudojamo dydžio šaltiniu." },
      JUSU_DOKUMENTAMS,
    ],
    escenarios: { titulo: "Jūsų indėlis kitiems terminams", explica: "Tas pats skaičiavimas su kitais indėlio terminais." },
  },
  alimentos: {
    nombre: "Vaiko išlaikymo ataskaita",
    tituloCorto: "išlaikymo ataskaita",
    paraQuien: "Kad į mediaciją ar derybas dėl vaiko išlaikymo ateitumėte su pagrįsta suma",
    descripcion: ["PDF ataskaita su orientacine išlaikymo suma, žingsnis po žingsnio, su oficialiais dydžiais ir jų šaltiniais, taip pat su sumos lentele esant kitoms pajamoms."],
    gancho: "Ateikite į mediaciją su šiuo skaičiavimu raštu",
    incluye: [
      { titulo: "Pagrįstas skaičiavimas", texto: "Žingsnis po žingsnio, su kiekvieno dydžio šaltiniu." },
      { titulo: "Suma esant kitoms pajamoms", texto: "Kad derantis matytumėte skirtingas galimybes." },
      { titulo: "Jūsų advokatui ar mediatoriui", texto: "Taip sutaupysite jiems pirmą skaičiavimo valandą." },
    ],
    escenarios: { titulo: "Esant kitoms pajamoms", explica: "Tas pats skaičiavimas su mažesnėmis ir didesnėmis pajamomis." },
  },
  jubilacion: {
    nombre: "Pensijos prognozė",
    tituloCorto: "pensijos prognozė",
    paraQuien: "Kad pensiją planuotumėte pagal prognozę raštu ir matytumėte, kas pasikeistų mokant didesnes įmokas",
    descripcion: ["PDF ataskaita su orientacine pensijos suma žingsnis po žingsnio, su oficialiais dydžiais ir jų šaltiniais, taip pat su prognozės lentele esant kitiems atlyginimams."],
    gancho: "Turėkite savo pensijos prognozę raštu",
    incluye: [
      { titulo: "Prognozė žingsnis po žingsnio", texto: "Su kiekvieno dydžio šaltiniu." },
      { titulo: "Esant kitiems atlyginimams", texto: "Kad matytumėte, kas pasikeistų mokant didesnes įmokas." },
      JUSU_DOKUMENTAMS,
    ],
    escenarios: { titulo: "Esant kitiems atlyginimams", explica: "Tas pats skaičiavimas su mažesniais ir didesniais atlyginimais." },
  },
  "plan-prestamo": {
    nombre: "Paskolos planas",
    tituloCorto: "paskolos planas",
    paraQuien: "Kad žinotumėte, kiek paskola iš tikrųjų kainuoja, ir palygintumėte pasiūlymus dar prieš pasirašant",
    descripcion: [
      "PDF ataskaita su visa jūsų paskola: įmoka, visa suma, kurią sumokėsite, ir kiek iš jos sudaro palūkanos.",
      "Jei skaičiavote įmoką, ataskaitoje rasite kiekvieną įmoką atskirai. Tie patys skaičiai apskaičiuoti ir su kitomis palūkanų normomis, kad bankų pasiūlymus lygintumėte pagal tikrus skaičius.",
    ],
    gancho: "Palyginkite paskolos pasiūlymus pagal savo skaičius dar prieš pasirašant",
    incluye: [
      { titulo: "Jūsų paskola su kitomis palūkanų normomis", texto: "Kad matytumėte, ką keičia vienas procentinis punktas aukštyn ar žemyn." },
      { titulo: "Visa kaina matoma", texto: "Kiek sumokėsite palūkanų, be smulkaus šrifto." },
      { titulo: "Sąrašas prieš pasirašant", texto: "Klausimai, kuriuos verta užduoti kreditoriui." },
    ],
    pasos: {
      titulo: "Prieš pasirašant paskolos sutartį",
      items: [
        "Klauskite ne tik palūkanų normos, bet ir bendros vartojimo kredito kainos metinės normos (BVKKMN), kuri apima visus mokesčius. Lyginti verta būtent ją.",
        "Paklauskite apie sutarties sudarymo mokestį, privalomą draudimą ir mokestį už išankstinį grąžinimą.",
        "Palyginkite bent tris pasiūlymus pagal šios ataskaitos lentelę su kitomis palūkanų normomis.",
        "Pasirinkite įmoką, kurią galėsite mokėti ir per prastesnį mėnesį. Orientyras: mažiau nei trečdalis pajamų.",
      ],
    },
    escenarios: KITOS_NORMOS,
  },
  "plan-hipoteca": {
    nombre: "Būsto paskolos planas",
    tituloCorto: "būsto paskolos planas",
    paraQuien: "Kad dėl būsto paskolos spręstumėte su visais skaičiais prieš akis: įmoką, palūkanas ir kas nutinka pasikeitus palūkanų normai",
    descripcion: [
      "PDF ataskaita su visa jūsų būsto paskola: įmoka, visa suma, kurią sumokėsite, ir kiek iš jos per tuos metus teks palūkanoms.",
      "Joje yra visos jūsų skaičiavimo lentelės (nemokamame puslapyje rodomos tik pirmos eilutės) ir tie patys skaičiai su kitomis palūkanų normomis. Jei lyginote nuomą ir pirkimą, palyginimą turėsite raštu ir galėsite spręsti su visa šeima.",
    ],
    gancho: "Ateikite į banką su visa būsto paskolos lentele ir kitomis palūkanų normomis",
    incluye: [
      { titulo: "Visa lentelė", texto: "Visos eilutės, ne tik pirmosios." },
      { titulo: "Jūsų būsto paskola su kitomis palūkanų normomis", texto: "Kad matytumėte, ką įmokai reiškia vienas procentinis punktas aukštyn ar žemyn." },
      { titulo: "Klausimai bankui", texto: "Ką patikrinti prieš pasirašant." },
    ],
    pasos: {
      titulo: "Prieš pasirašant būsto paskolos sutartį",
      items: [
        "Paprašykite pasiūlymo raštu su palūkanų norma, grąžinimo terminu ir visomis išlaidomis, įskaitant draudimą ir mokesčius.",
        "Paklauskite, kuriam laikui palūkanų norma fiksuojama ir kas nutiks įmokai, jei pasibaigus šiam laikotarpiui norma pakils.",
        "Sužinokite, kiek kainuoja išankstinis grąžinimas ir ar galite grąžinti daugiau be baudos.",
        "Prie įmokos pridėkite būsto išlaidas (nekilnojamojo turto mokestį, draudimą, priežiūrą), prieš nusprendžiant, kokią paskolą galite sau leisti.",
      ],
    },
    escenarios: KITOS_NORMOS,
  },
  "plan-inversion": {
    nombre: "Taupymo ir investavimo planas",
    tituloCorto: "taupymo planas",
    paraQuien: "Kad matytumėte, kaip jūsų santaupos auga laikui bėgant ir kas pasikeičia atidedant daugiau arba esant kitai palūkanų normai",
    descripcion: [
      "PDF ataskaita su jūsų santaupų prognoze: kiek įnešite, kiek gausite palūkanų ir kiek turėsite pabaigoje.",
      "Joje yra visos jūsų skaičiavimo lentelės ir tie patys skaičiai su kitomis palūkanų normomis, kad kur taupyti rinktumėtės pagal tikrus skaičius.",
    ],
    gancho: "Turėkite taupymo planą raštu, metai po metų",
    incluye: [
      { titulo: "Visa prognozė", texto: "Visos lentelės eilutės, ne tik pirmosios." },
      { titulo: "Su kitomis palūkanų normomis", texto: "Kad palygintumėte galimybes prieš pasirenkant." },
      { titulo: "Planas, kurio įmanoma laikytis", texto: "Žingsniai, kurie ketinimą paverčia santaupomis." },
    ],
    pasos: {
      titulo: "Kad planas veiktų",
      items: [
        "Nustatykite periodinį pavedimą atlyginimo dienai: ko nematote, to neišleidžiate.",
        "Palyginkite palūkanų normą su infliacija: kai norma mažesnė, jūsų pinigai praranda vertę, net jei skaičius auga.",
        "Kartą per metus vėl atidarykite šią ataskaitą ir atnaujinkite savo skaičius.",
      ],
    },
    escenarios: KITOS_NORMOS,
  },
  "plan-deudas": {
    nombre: "Kredito kortelės skolos grąžinimo planas",
    tituloCorto: "kortelės skolos grąžinimo planas",
    paraQuien: "Kad žinotumėte, kada grąžinsite kortelės skolą, kiek tai kainuos palūkanomis ir kaip tai padaryti greičiau",
    descripcion: [
      "PDF ataskaita su jūsų skola mėnuo po mėnesio: kiek mokate, kiek tenka palūkanoms ir kaip greitai mažėja likutis.",
      "Joje yra visa lentelė iki paskutinės įmokos ir tie patys skaičiai su kitomis įmokomis, kad matytumėte, kiek sutaupysite, jei kas mėnesį mokėsite šiek tiek daugiau.",
    ],
    gancho: "Pažiūrėkite mėnuo po mėnesio, kada grąžinsite kortelės skolą",
    incluye: [
      { titulo: "Mėnuo po mėnesio iki paskutinės įmokos", texto: "Su palūkanomis, kurias sumokate kas mėnesį." },
      { titulo: "Su kitomis įmokomis", texto: "Kad matytumėte, kiek anksčiau baigsite, jei mokėsite šiek tiek daugiau." },
      { titulo: "Kelias iš skolų", texto: "Žingsniai, kad į skolas nepatektumėte vėl." },
    ],
    pasos: {
      titulo: "Kaip išbristi iš skolos",
      items: [
        "Grąžinimo metu kortele nesinaudokite: kiekvienas naujas pirkinys lentelę pailgina.",
        "Visada mokėkite daugiau nei minimalią įmoką. Padeda ir nedaug, o lentelė su kitomis įmokomis parodo kiek.",
        "Jei turite kelias skolas, pirmiausia grąžinkite tą, kurios palūkanų norma didžiausia, o kitoms mokėkite minimumą.",
        "Paklauskite savo banko apie skolų sujungimą su mažesne palūkanų norma ir palyginkite pasiūlymą su šia ataskaita.",
      ],
    },
    escenarios: { titulo: "Su kitomis mėnesio įmokomis", explica: "Ta pati skola, kas mėnesį mokant šiek tiek mažiau ir šiek tiek daugiau." },
  },
  "plan-presupuesto": {
    nombre: "Biudžeto planas",
    tituloCorto: "biudžeto planas",
    paraQuien: "Kad mėnesį susidėliotumėte pagal aiškų planą: kiek tenka poreikiams, norams ir santaupoms",
    descripcion: [
      "PDF ataskaita, kuri jūsų skaičiavimą paverčia planu: kiek atidėti kiekvienai sričiai, jūsų valiuta ir su jūsų skaičiais.",
      "Joje yra tas pats planas su kitomis sumomis, kad iš anksto žinotumėte, kas keičiasi mėnesį, kai pinigų daugiau ar mažiau, ir žingsniai, kaip jo laikytis.",
    ],
    gancho: "Paverskite šį skaičiavimą savo mėnesio planu",
    incluye: [
      { titulo: "Jūsų planas su jūsų skaičiais", texto: "Kiek kur tenka, paruošta naudoti." },
      { titulo: "Su kitomis sumomis", texto: "Kad planą pakoreguotumėte, kai mėnuo pasikeičia." },
      { titulo: "Žingsniai, kaip laikytis plano", texto: "Kas padeda, kad biudžetas išsilaikytų ilgiau nei pirmą mėnesį." },
    ],
    pasos: {
      titulo: "Kad biudžetas veiktų",
      items: [
        "Santaupas atidėkite atlyginimo dieną, dar prieš išlaidas. Tai, kas lieka, galite išleisti.",
        "Mėnesio metu užsirašykite išlaidas, kad ir telefone, ir palyginkite jas su šiuo planu.",
        "Pirmiausia susikurkite finansinį rezervą, kad netikėta išlaida neatsidurtų kredito kortelėje.",
      ],
    },
    escenarios: KITOS_SUMOS,
  },
  "plan-negocio": {
    nombre: "Verslo skaičių ataskaita",
    tituloCorto: "verslo ataskaita",
    paraQuien: "Kad dėl kainų, maržos ar investicijos spręstumėte pagal aiškius skaičius, paruoštus partneriui",
    descripcion: [
      "PDF ataskaita su jūsų skaičiavimu, paaiškintu žingsnis po žingsnio: kokie duomenys naudoti, kaip skaičiuojama ir koks rezultatas gaunamas.",
      "Taip pat rasite lentelę su tuo pačiu skaičiavimu kitoms sumoms, kad matytumėte, kaip keičiasi rezultatas, kai auga kaštai arba mažinate kainą.",
    ],
    gancho: "Paverskite šiuos skaičius ataskaita sprendimui arba partneriui",
    incluye: [
      { titulo: "Paaiškintas skaičiavimas", texto: "Kad jį suprastumėte ir pagrįstumėte partneriui ar bankui." },
      { titulo: "Su kitomis sumomis", texto: "Kad iš anksto matytumėte kainos ar kaštų pokyčio poveikį." },
      { titulo: "Klausimai prieš sprendimą", texto: "Ką patikrinti prieš keičiant kainą." },
    ],
    pasos: {
      titulo: "Prieš priimant sprendimą",
      items: [
        "Patikrinkite, ar kaštai apima viską: transportą, mokesčius, komisinius ir jūsų pačių laiką.",
        "Prieš keičiant kainą palyginkite ją su dviem ar trimis konkurentais.",
        "Pažiūrėkite į blogiausią lentelės variantą: jei verslas jį atlaiko, sprendimas saugesnis.",
      ],
    },
    escenarios: KITOS_SUMOS,
  },
  "kit-freelance": {
    nombre: "Savarankiškos veiklos valandinio įkainio rinkinys",
    tituloCorto: "valandinio įkainio rinkinys",
    paraQuien: "Kad už darbą prašytumėte tiek, kiek jis vertas, ir savo įkainį nurodytumėte užtikrintai",
    descripcion: [
      "PDF ataskaita, paaiškinanti jūsų valandinį įkainį: kokių pajamų siekiate, kiek valandų iš tikrųjų galima išrašyti sąskaitoje faktūroje ir kokias išlaidas įkainis padengia.",
      "Joje yra įkainis kitoms siekiamoms pajamoms ir paruoštas laiškas klientui su jūsų valandiniu įkainiu.",
    ],
    gancho: "Nurodykite savo įkainį su skaičiais, be atsiprašymų",
    incluye: [
      { titulo: "Jūsų įkainio paaiškinimas", texto: "Tai akimirkai, kai kas nors paklaus, kodėl būtent tiek." },
      { titulo: "Kitoms siekiamoms pajamoms", texto: "Įkainis, kurio reikia kiekvienam atvejui." },
      { titulo: "Paruoštas laiškas su įkainiu", texto: "Su jūsų skaičiumi, paruoštas siųsti klientams." },
    ],
    pasos: {
      titulo: "Kad prašytumėte tiek, kiek reikia",
      items: [
        "Skaičiuokite tik tas valandas, už kurias galite išrašyti sąskaitą: susitikimai, pasiūlymai ir priminimai apie mokėjimą irgi yra darbas.",
        "Kai įmanoma, siūlykite kainą už projektą: klientas perka rezultatą, ne valandas.",
        "Įkainį peržiūrėkite kartą per metus arba anksčiau, jei išaugo jūsų išlaidos.",
      ],
    },
    nota: {
      titulo: "Laiškas su įkainiu",
      uso: "Įrašykite kliento duomenis ir išsiųskite kartu su savo pasiūlymu.",
      pedido: "Remiantis mūsų pokalbiu siunčiu savo įkainį už sutartas profesines paslaugas. Mano valandinis įkainis sudaro",
      cierre: "Įkainis apima darbo laiką ir mano veiklos išlaidas. Jei pageidaujate, galiu parengti ir pasiūlymą su visos projekto kainos skaičiavimu.",
    },
    escenarios: { titulo: "Kitoms siekiamoms pajamoms", explica: "Tas pats skaičiavimas su mažesnėmis ir didesnėmis siekiamomis pajamomis." },
  },
  "plan-sueldo": {
    nombre: "Atlyginimo ataskaita",
    tituloCorto: "atlyginimo ataskaita",
    paraQuien: "Kad tariantis dėl atlyginimo, pasiūlymo ar padidinimo žinotumėte, kiek tai sudaro per valandą, per mėnesį ir per metus",
    descripcion: [
      "PDF ataskaita, paaiškinanti jūsų atlyginimo skaičiavimą, su jūsų skaičiais ir kiekvienu naudojamu dydžiu.",
      "Taip pat rasite lentelę su kitomis sumomis, kad galėtumėte lyginti pasiūlymus arba prašyti didesnio atlyginimo pagal aiškius skaičius.",
    ],
    gancho: "Derėkitės dėl atlyginimo su skaičiais rankose",
    incluye: [
      { titulo: "Visas jūsų skaičiavimas", texto: "Su kiekvienu įvestu dydžiu." },
      { titulo: "Su kitomis sumomis", texto: "Kad du pasiūlymus palygintumėte per minutę." },
      { titulo: "Patarimai deryboms", texto: "Ką sakyti ir ko prašyti be paties skaičiaus." },
    ],
    pasos: {
      titulo: "Kaip susitarti",
      items: [
        "Lyginant pasiūlymus kalbėkite apie metines arba valandines sumas „ant popieriaus“ ir „į rankas“: mėnesio skaičiai skirtumą paslepia.",
        "Prašykite ir to, kas nėra atlyginimas: papildomų atostogų, darbo iš namų, mokymų ar premijų.",
        "Ateikite su konkrečiu skaičiumi ir jo pagrindimu: jūsų patirtimi, rinkos duomenimis ar tuo, kas pasikeitė jūsų darbe.",
      ],
    },
    escenarios: KITOS_SUMOS,
  },
  "kit-calculos": {
    nombre: "Skaičiavimas su paaiškinimu žingsnis po žingsnio",
    tituloCorto: "skaičiavimas su paaiškinimu",
    paraQuien: "Kad turėtumėte išspręstą ir paaiškintą skaičiavimą, paruoštą spausdinti, mokytis ar perduoti",
    descripcion: [
      "PDF ataskaita su jūsų skaičiavimu, sprendimo eiga ir rezultatu, su jūsų skaičiais.",
      "Naudokite ją mokymuisi, kaip skaičiavimo įrašą arba kad galėtumėte kam nors parodyti be papildomų paaiškinimų.",
    ],
    gancho: "Pasiimkite skaičiavimą su paaiškinimu žingsnis po žingsnio",
    incluye: [
      { titulo: "Išspręstas skaičiavimas", texto: "Su jūsų duomenimis ir rezultatu." },
      { titulo: "Kaip skaičiuojama", texto: "Kad matytumėte, iš kur atsiranda kiekvienas skaičius." },
      { titulo: "Paruošta spausdinti", texto: "Arba išsaugoti kaip PDF ir pasidalyti." },
    ],
    pasos: {
      titulo: "Kaip patikrinti skaičiavimą",
      items: ["Paskaičiuokite atgal: nuo rezultato grįžkite prie pradinės reikšmės.", "Apvalinkite tik pabaigoje: apvalinimas kiekviename žingsnyje pakeičia rezultatą."],
    },
    escenarios: KITOS_SUMOS,
  },
  "kit-gastos-grupo": {
    nombre: "Bendrų išlaidų suvestinė",
    tituloCorto: "išlaidų suvestinė",
    paraQuien: "Kad kiekvienas žinotų, kiek turi sumokėti, be ginčų ir skaičiavimų ant servetėlės",
    descripcion: [
      "PDF bendros sąskaitos suvestinė: visa suma, kiek moka kiekvienas ir, jei reikia, kas kam turi sumokėti.",
      "Nusiųskite ją į grupės pokalbį arba išspausdinkite, kad niekam nereikėtų perskaičiuoti.",
    ],
    gancho: "Pasidalykite sąskaitą su kitais aiškiai ir be ginčų",
    incluye: [
      { titulo: "Kiek moka kiekvienas", texto: "Su visa suma ir matomomis detalėmis." },
      { titulo: "Paruošta dalytis", texto: "PDF formatu, kad nusiųstumėte kitiems." },
      { titulo: "Su kitomis visomis sumomis", texto: "Jei prie sąskaitos kas nors prisidėtų." },
    ],
    pasos: {
      titulo: "Kaip atsiskaityti",
      items: ["Nusiųskite suvestinę kitiems, kol dar niekas nesumokėjo: išvengsite nesusipratimų.", "Susitarkite dėl mokėjimo būdo ir datos, iki kurios atsiskaitysite."],
    },
    escenarios: { titulo: "Su kitomis visomis sumomis", explica: "Tas pats pasidalijimas, kai visa suma šiek tiek mažesnė arba didesnė." },
  },
  "kit-estudio": {
    nombre: "Pažymių vidurkio ataskaita",
    tituloCorto: "vidurkio ataskaita",
    paraQuien: "Kad savo vidurkį turėtumėte aiškiai ir raštu, su kiekvieno pažymio svoriu",
    descripcion: [
      "PDF ataskaita su jūsų vidurkiu: kiekvienas pažymys, jo svoris ir kaip gaunamas rezultatas.",
      "Naudokite ją pažymiui patikrinti, kitam egzaminui planuoti arba skaičiavimui parodyti tam, kam jo reikia.",
    ],
    gancho: "Turėkite savo vidurkio paaiškinimą raštu",
    incluye: [
      { titulo: "Kiekvienas pažymys su svoriu", texto: "Kad matytumėte, kuris turi didžiausią įtaką." },
      { titulo: "Skaičiavimas žingsnis po žingsnio", texto: "Kad galėtumėte jį patikrinti arba parodyti." },
      { titulo: "Mintys kitam egzaminui", texto: "Kaip vidurkį panaudoti geriau organizuojantis." },
    ],
    pasos: {
      titulo: "Kitam egzaminui",
      items: ["Pažiūrėkite, kurio pažymio svoris didžiausias, ir tam dalykui ar egzaminui skirkite daugiau laiko.", "Jei atrodo, kad pažymys apskaičiuotas neteisingai, parodykite šią ataskaitą dėstytojui."],
    },
  },
  "kit-fechas": {
    nombre: "Datų ir terminų ataskaita",
    tituloCorto: "datų ataskaita",
    paraQuien: "Kad apskaičiuotą datą ar terminą turėtumėte raštu, paruoštą pateikti, ir jo nepamirštumėte",
    descripcion: [
      "PDF ataskaita su datos skaičiavimu: jūsų įvestos datos, rezultatas ir kaip jis apskaičiuotas.",
      "Naudokite ją prie dokumentų, sutarties, mokėjimo termino arba tiesiog kaip įrašą.",
    ],
    gancho: "Turėkite šią datą raštu, paruoštą pateikti",
    incluye: [
      { titulo: "Paaiškintas skaičiavimas", texto: "Su datomis ir tuo, kaip skaičiuojamos dienos." },
      { titulo: "Paruošta pateikti", texto: "Prie dokumentų arba kaip sutarties priedas." },
      { titulo: "Jūsų dokumentams", texto: "Su parengimo data." },
    ],
    pasos: {
      titulo: "Prieš naudojant datą dokumentuose",
      items: [
        "Pasitikslinkite, ar terminas skaičiuojamas kalendorinėmis, ar darbo dienomis: nuo to priklauso rezultatas.",
        "Pažiūrėkite, ar paskutinė diena nepatenka į šventę ar savaitgalį.",
        "Galutinę datą įsirašykite į kalendorių su priminimu kelios dienos iš anksto.",
      ],
    },
  },
  "plan-salud": {
    nombre: "KMI ir kalorijų ataskaita",
    tituloCorto: "KMI ir kalorijų ataskaita",
    paraQuien: "Kad savo svorio ir energijos rodiklius turėtumėte raštu ir galėtumėte parodyti gydytojui",
    descripcion: [
      "PDF ataskaita, paaiškinanti jūsų rezultatą: ką jis matuoja, kaip apskaičiuotas ir į kokį intervalą patenka, su jūsų duomenimis.",
      "Tai bendra informacija pokalbiui su sveikatos specialistu. Tai nėra diagnozė ir nepakeičia apsilankymo pas gydytoją.",
    ],
    gancho: "Parodykite savo rodiklius gydytojui, paaiškintus ir raštu",
    incluye: [
      { titulo: "Jūsų rezultatas su paaiškinimu", texto: "Ką jis matuoja ir kaip apskaičiuotas." },
      { titulo: "Klausimai gydytojui", texto: "Kad iš apsilankymo gautumėte daugiau." },
      { titulo: "Pokyčiams stebėti", texto: "Kiekvieną ataskaitą išsaugokite ir lyginkite laikui bėgant." },
    ],
    pasos: {
      titulo: "Kaip apie tai kalbėti su specialistu",
      items: [
        "Pasiimkite šią ataskaitą ir paklauskite, koks intervalas sveikas būtent jums, atsižvelgiant į amžių ir sveikatos istoriją.",
        "Papasakokite, kaip maitinatės, kiek judate ir kaip miegate: vien skaičiai visko neparodo.",
        "Didelių mitybos ar fizinio aktyvumo pokyčių nedarykite nepasitarus su specialistu.",
      ],
    },
    aviso: "Bendra informacija. Nepakeičia sveikatos specialisto konsultacijos.",
  },
  "plan-embarazo": {
    nombre: "Vaisingumo ir nėštumo ataskaita",
    tituloCorto: "vaisingumo ir nėštumo ataskaita",
    paraQuien: "Kad orientacines datas turėtumėte raštu ir galėtumėte pasiimti į kitą vizitą",
    descripcion: [
      "PDF ataskaita su orientacinėmis datomis ir tuo, kaip kiekviena apskaičiuota pagal jūsų įvestus duomenis.",
      "Datos yra orientacinės: kiekvienas kūnas ir kiekvienas nėštumas skiriasi. Jos padeda planuoti ir kalbėtis su sveikatos specialistu, bet vizito nepakeičia.",
    ],
    gancho: "Turėkite savo datas raštu iki kito vizito",
    incluye: [
      { titulo: "Jūsų orientacinės datos", texto: "Su tuo, kaip kiekviena apskaičiuota." },
      { titulo: "Klausimai vizitui", texto: "Kad iš apsilankymo gautumėte kuo daugiau." },
      { titulo: "Jūsų dokumentams", texto: "Su naudotais duomenimis." },
    ],
    pasos: {
      titulo: "Kitam vizitui",
      items: [
        "Pasiimkite šią ataskaitą ir paskutinių mėnesinių pirmos dienos datą.",
        "Paklauskite, kokie tyrimai reikalingi jūsų nėštumo savaitę ir kada kitas vizitas.",
        "Jei neramina koks nors simptomas, kreipkitės į gydytoją ir nelaukite ataskaitoje nurodytų datų.",
      ],
    },
    aviso: "Bendra informacija. Datos yra orientacinės ir nepakeičia sveikatos specialisto priežiūros.",
  },
  "plan-entrenamiento": {
    nombre: "Bėgimo tempo ataskaita",
    tituloCorto: "tempo ataskaita",
    paraQuien: "Kad prieš treniruotę žinotumėte tikslinį tempą ir mokėtumėte paskirstyti jėgas",
    descripcion: [
      "PDF ataskaita, paaiškinanti jūsų tempą, laiką ir greitį pagal jūsų įvestus duomenis.",
      "Joje yra visos skaičiavimo lentelės ir patarimai, kaip tempą panaudoti treniruotėse.",
    ],
    gancho: "Turėkite savo tempą raštu varžybų dienai",
    incluye: [
      { titulo: "Jūsų tempas su paaiškinimu", texto: "Su laiku ir greičiu." },
      { titulo: "Išspausdinti ir pasiimti", texto: "Į kišenę arba ant šaldytuvo." },
      { titulo: "Patarimai treniruotėms", texto: "Kaip naudoti tempą ir nesusižeisti." },
    ],
    pasos: {
      titulo: "Kaip naudoti tempą",
      items: [
        "Pirmas minutes bėkite šiek tiek lėčiau nei tiksliniu tempu: finiše tai pajusite.",
        "Daugumą savaitės treniruočių bėkite lengvu tempu, kuriuo dar galima kalbėtis.",
        "Jei kas nors skauda, sustokite ir pasitarkite su specialistu: tempas palauks.",
      ],
    },
    aviso: "Bendra informacija. Nepakeičia sveikatos ar sporto specialisto konsultacijos.",
  },
  "kit-viaje": {
    nombre: "Kelionės degalų sąmata",
    tituloCorto: "degalų sąmata",
    paraQuien: "Kad žinotumėte, kiek išleisite degalams, ir padalytumėte sumą visiems kelionės dalyviams",
    descripcion: [
      "PDF ataskaita su jūsų kelionės degalų kaina, su jūsų skaičiais: atstumas, sąnaudos ir kaina.",
      "Taip pat rasite lentelę su kitomis degalų kainomis, jei iki išvykimo jos pasikeistų, ir kitų kelionės išlaidų sąrašą.",
    ],
    gancho: "Turėkite kelionės kainą raštu dar prieš išvykstant",
    incluye: [
      { titulo: "Kelionės kaina", texto: "Su atstumu, sąnaudomis ir kaina." },
      { titulo: "Su kitomis kainomis", texto: "Jei degalai iki išvykimo pabrangtų." },
      { titulo: "Likusios kelionės sąrašas", texto: "Kelių mokesčiai, stovėjimas ir maistas." },
    ],
    pasos: {
      titulo: "Kaip sudaryti kelionės biudžetą",
      items: [
        "Prie degalų kainos pridėkite kelių mokesčius, stovėjimą ir maistą.",
        "Jei keliauja daugiau žmonių, padalykite visą sumą ir praneškite visiems dar prieš išvykstant.",
        "Patikrinkite padangų slėgį: su nepripūstomis padangomis automobilis sunaudoja daugiau degalų.",
      ],
    },
    escenarios: { titulo: "Su kitomis kainomis", explica: "Ta pati kelionė su šiek tiek pigesniais ir šiek tiek brangesniais degalais." },
  },
  "kit-hogar": {
    nombre: "Elektros išlaidų ataskaita",
    tituloCorto: "elektros išlaidų ataskaita",
    paraQuien: "Kad žinotumėte, kiek kainuoja kiekvienas prietaisas ir kur galima sutaupyti mokant už elektrą",
    descripcion: [
      "PDF ataskaita, kiek kainuoja jūsų prietaisas, su jūsų naudojimo duomenimis ir elektros kaina.",
      "Taip pat rasite lentelę su kitomis elektros kainomis ir sąrašą minčių, kaip sumažinti sąskaitą.",
    ],
    gancho: "Sužinokite, kiek kainuoja šis prietaisas ir kaip tai sumažinti",
    incluye: [
      { titulo: "Išlaidos pagal jūsų naudojimą", texto: "Su paaiškinimu žingsnis po žingsnio." },
      { titulo: "Su kitomis kainomis", texto: "Jei tarifas pabrangtų." },
      { titulo: "Mintys, kaip sutaupyti", texto: "Tos, kurios sąskaitoje matyti labiausiai." },
    ],
    pasos: {
      titulo: "Kaip sumažinti sąskaitą",
      items: [
        "Budėjimo režimu paliktus prietaisus išjunkite iš lizdo: jie naudoja elektrą net išjungti.",
        "Galingiausius prietaisus junkite mažesnio tarifo metu, jei tokį turite.",
        "Palyginkite šią ataskaitą su sąskaita už elektrą, kad matytumėte, kokią visos sumos dalį sudaro šis prietaisas.",
      ],
    },
    escenarios: { titulo: "Su kitomis kainomis", explica: "Tas pats naudojimas su šiek tiek pigesne ir šiek tiek brangesne elektra." },
  },
  "kit-obra": {
    nombre: "Statybinių medžiagų sąrašas",
    tituloCorto: "medžiagų sąrašas",
    paraQuien: "Kad medžiagų pirktumėte tiek, kiek reikia: kad nieko netrūktų ir nieko neliktų",
    descripcion: [
      "PDF ataskaita su medžiagų skaičiavimu: matmenys, kiekiai ir kaip jie apskaičiuoti, paruošta nešti į parduotuvę.",
      "Taip pat rasite sąrašą, kaip pirkti teisingai: atsarga atliekoms, ko paklausti ir ką patikrinti prieš pradedant darbus.",
    ],
    gancho: "Ateikite į parduotuvę su medžiagų sąrašu",
    incluye: [
      { titulo: "Matmenys ir kiekiai", texto: "Viskas, ką apskaičiavote, viename puslapyje." },
      { titulo: "Parodyti parduotuvėje", texto: "Kad jums paskaičiuotų būtent tai, ko reikia." },
      { titulo: "Teisingo pirkimo sąrašas", texto: "Atsarga atliekoms ir ką patikrinti." },
    ],
    pasos: {
      titulo: "Prieš perkant",
      items: [
        "Pridėkite nuo 5 iki 10 % atraižoms ir dužimui, sudėtingoms formoms daugiau.",
        "Pirkite viską iš vienos gamybos partijos: spalva ir atspalvis tarp partijų gali skirtis.",
        "Paklauskite, kokios pasirinktos medžiagos sąnaudos: skirtingų gamintojų jos skiriasi.",
        "Išsaugokite kvitą ir neatidarytas pakuotes: daug parduotuvių jas priima atgal.",
      ],
    },
  },
  "kit-facturacion": {
    nombre: "PVM ir pardavimo mokesčio ataskaita",
    tituloCorto: "PVM ataskaita",
    paraQuien: "Kad galėtumėte išrašyti sąskaitą faktūrą arba patikrinti kainą su aiškiai atskirtu PVM, paruoštą jūsų dokumentams ar buhalteriui",
    descripcion: [
      "PDF ataskaita su jūsų skaičiavimu: kaina be mokesčio, mokestis ir visa suma, su taikomu tarifu ir jo šaltiniu.",
      "Taip pat rasite lentelę su kitomis sumomis, kuri praverčia sudarant kainyną su mokesčiu ir be jo.",
    ],
    gancho: "Turėkite kainą su mokesčiu ir be jo raštu",
    incluye: [
      { titulo: "Mokestis atskirai", texto: "Suma be mokesčio, mokestis ir visa suma pagal galiojantį tarifą." },
      { titulo: "Su kitomis sumomis", texto: "Kad kainyną sudarytumėte iš karto." },
      { titulo: "Jūsų buhalteriui", texto: "Su tarifo šaltiniu ir data." },
    ],
    pasos: {
      titulo: "Prieš išrašant sąskaitą faktūrą",
      items: [
        "Pasitikslinkite, ar jūsų prekei ar paslaugai taikomas standartinis, ar lengvatinis tarifas.",
        "Įsitikinkite, kad sąskaitoje faktūroje atskirai nurodyta apmokestinamoji vertė ir mokestis, jei to reikalaujama.",
        "Šią ataskaitą išsaugokite kartu su sąskaita faktūra savo dokumentuose.",
      ],
    },
    escenarios: KITOS_SUMOS,
  },
  "informe-calculo": {
    nombre: "Skaičiavimo ataskaita",
    tituloCorto: "skaičiavimo ataskaita",
    paraQuien: "Kad šį skaičiavimą turėtumėte raštu, su savo skaičiais, prielaidomis ir kiekvieno oficialaus dydžio šaltiniu",
    descripcion: [
      "PDF ataskaita apie ką tik atliktą skaičiavimą, žingsnis po žingsnio su jūsų duomenimis: rezultatas, prielaidos, kuriomis jis remiasi, ir kiekvienas oficialus dydis su šaltiniu bei patikros data.",
      "Išsaugokite ją savo dokumentuose arba perduokite buhalteriui, darbdaviui ar kitam tikrintojui, nereikės kiekvieno skaičiaus aiškinti iš naujo.",
    ],
    gancho: "Turėkite šį skaičiavimą raštu, su šaltiniais",
    incluye: [
      { titulo: "Jūsų rezultatas", texto: "Tiksliai toks, kokį apskaičiavote, paruoštas spausdinti." },
      { titulo: "Kaip jis gautas", texto: "Žingsniai ir prielaidos, kad būtų galima atsekti kiekvieną skaičių." },
      { titulo: "Oficialūs šaltiniai", texto: "Kiekvienas dydis su institucija, nuoroda ir patikros data." },
    ],
    pasos: {
      titulo: "Prieš naudojant",
      items: [
        "Patikrinkite, ar viršuje nurodyti duomenys yra jūsų: nuo jų priklauso rezultatas.",
        "Jei oficialus dydis pasikeitė, apskaičiuokite iš naujo: ataskaitoje naudojami pirkimo dieną galioję dydžiai.",
      ],
    },
  },
};

export const lt: DiccionarioVenta = {
  familias,
  general: { si: "Taip", no: "Ne" },
  tarjeta: {
    cejaInforme: "PDF ataskaita",
    cejaPlanilla: "Excel lentelė",
    pagoUnico: "vienkartinis mokėjimas",
    comprarInforme: "Pirkti ataskaitą",
    comprarPlanilla: "Pirkti lentelę",
    confianza: "Mokėjimas per PayPal arba kortele. Jei ataskaita nebus naudinga, per 7 dienas grąžinsime pinigus.",
    verDetalle: "Kas įeina",
    tambien: "Jums taip pat gali praversti:",
    tablasOficiales: "Oficialios lentelės",
    bajadaInforme: "Ataskaitoje skaičiavimas išdėstytas žingsnis po žingsnio su jūsų skaičiais ir kiekvieno dydžio šaltiniu. Ją galima spausdinti arba išsaugoti kaip PDF.",
    bajadaPlanilla: "Lentelėje yra šis skaičiavimas su jūsų skaičiais ir matomomis formulėmis, todėl galite pakeisti bet ką.",
    bajadaPlanillaHoja: "Lentelės lape „{hoja}“ yra šis skaičiavimas su jūsų skaičiais ir matomomis formulėmis, todėl galite pakeisti bet ką.",
    equivale: "Maždaug {monto} pagal šiandienos kursą.",
    cobroDolares: "Mokama JAV doleriais.",
  },
  aviso: {
    pronto: "Rengiame",
    titulo: "Praneškite man, kai bus galima pirkti",
    ayuda: "Parašysime tik kartą, kai pradėsime pardavimą.",
    boton: "Pranešti man",
    listo: "Atlikta. Kai tik pradėsime pardavimą, parašysime jums el. laišką.",
    error: "Jūsų adreso išsaugoti nepavyko. Patikrinkite, ar jis parašytas teisingai, ir bandykite dar kartą.",
    correo: "Jūsų el. paštas",
  },
  planilla: {
    gancho: "Perkelkite šį skaičiavimą į Excel su jau įrašytais duomenimis",
    incluye: [
      { titulo: "Jūsų duomenys jau įrašyti", texto: "Pakeiskite geltoną langelį ir viskas persiskaičiuos." },
      { titulo: "Atlyginimas, premija ir galutinis atsiskaitymas", texto: "Viename faile, kurį galite naudoti visus metus." },
      { titulo: "Atnaujinimai po kiekvieno oficialaus pakeitimo", texto: "Ta pati nuoroda, nauja versija, papildomai mokėti nereikia." },
    ],
  },
  informe: {
    tusDatos: "Jūsų duomenys",
    resultado: "Rezultatas",
    corregir: "Taisyti mano duomenis",
    actualizar: "Atnaujinti ataskaitą",
    imprimir: "Spausdinti arba išsaugoti kaip PDF",
    imprimirAyuda: "Spausdinimo lange pasirinkite „Išsaugoti kaip PDF“ ir gausite failą.",
    sinResultado: "Įveskite savo duomenis skiltyje „Taisyti mano duomenis“ ir ataskaita bus parengta.",
    lugar: "Vieta ir data",
    destinatario: "Kam",
    firma: "Parašas",
    nombre: "Vardas ir pavardė",
    documento: "Dokumento numeris",
    etiquetaEnMinuscula: true,
    comoSeCalcula: "Kaip skaičiuojama",
    fuentes: "Oficialūs šaltiniai",
    verificado: "patikrinta",
    emitido: "Išdavimo data",
    valores: "Oficialūs dydžiai, galiojantys",
    numero: "Ataskaita",
    elegir: "Pasirinkite skaičiavimą ataskaitai:",
    legal:
      "Ši ataskaita yra apytikslis skaičiavimas pagal nurodytas taisykles ir oficialius dydžius nurodytą dieną. Ji nepakeičia specialisto patarimo ar kompetentingos institucijos sprendimo. Jei kuris nors iš jūsų duomenų skiriasi, keičiasi ir rezultatas: pataisykite jį ir išspausdinkite ataskaitą iš naujo.",
    legalSinFuentes: "Ši ataskaita yra apytikslis skaičiavimas pagal jūsų įvestus duomenis nurodytą dieną. Ji nepakeičia specialisto patarimo. Jei kuris nors iš duomenų pasikeičia, keičiasi ir rezultatas: pataisykite jį ir išspausdinkite ataskaitą iš naujo.",
    errorTitulo: "Šios ataskaitos atidaryti nepavyko",
    error: "Nepavyko patvirtinti su šia nuoroda susijusio mokėjimo. Jei pinigai nuskaičiuoti, parašykite mums ir viską sutvarkysime. Jei pirkimas neįvyko, galite jį pakartoti.",
    verificar: "Mokėjimo dabar patikrinti nepavyko. Bandykite po kelių minučių: mokėti dar kartą nereikia.",
    cupo: "Per daug bandymų iš eilės. Palaukite kelias minutes ir nuorodą atidarykite iš naujo.",
  },
  // {normas} pagal + galininkas („pagal Darbo kodeksą“), {incluye} apima + galininkas („grynąjį
  // atlyginimą, premiją ir...“).
  catalogo: {
    tituloProducto: "{nombre} ({pais})",
    disparadorInforme: "Kiekvieną kartą, kai pasikeičia skaičiavime naudojamas oficialus dydis",
    planillaDescripcion: "Paruošta Excel lentelė: įveskite savo duomenis į geltonus langelius ir viskas apskaičiuojama savaime, formulėmis pagal {normas}.",
    planillaIncluye: "Apima {incluye}. Kiekviename lape matyti žingsniai, o oficialių lentelių lape kiekvienas dydis pateiktas su šaltiniu ir mūsų patikros data.",
  },
  planillas: {
    migaPlanillas: "Lentelės ir ataskaitos",
    catalogoTitulo: "Lentelės ir ataskaitos ({pais})",
    catalogoBajada: "Excel lentelės ir PDF ataskaitos su jūsų skaičiais ir oficialiais šalies duomenimis. Vienkartinis mokėjimas, be prenumeratos.",
    seccionPlanillas: "Excel lentelės",
    seccionInformes: "PDF ataskaitos",
    catalogoVacio: "Šios šalies ({pais}) lenteles dar rengiame. Kol kas skaičiuoklės nemokamos.",
    verCalculadoras: "Žiūrėti skaičiuokles",
    comprar: "Pirkti už {precio}",
    pronto: "Rengiame",
    incluye: "Kas įeina",
    incluyeInforme: [
      "Ataskaita su jūsų skaičiais puslapyje, kurį galite spausdinti arba išsaugoti kaip PDF.",
      "Neribotai galiojanti nuoroda: duomenis galite bet kada pataisyti ir ataskaitą išspausdinti iš naujo.",
      "Jei ataskaita nebus naudinga, per 7 dienas grąžinsime pinigus.",
    ],
    incluyePlanilla: [
      "Failas .xlsx, kurį atidarysite Excel ir Google Sheets programose.",
      "Atnaujinimai: {disparador}, lentelę atnaujiname ir toje pačioje nuorodoje galite atsisiųsti naują versiją.",
      "Jei lentelė nebus naudinga, per 7 dienas grąžinsime pinigus.",
    ],
    pagoUnico: "Vienkartinis mokėjimas per PayPal. Mokėti galite iš sąskaitos arba kortele.",
    comprarPlanilla: "Pirkti: {titulo}",
    comprarBajadaInforme: "Kai mokėjimas bus patvirtintas, šiuo adresu atsiųsime nuorodą į jūsų ataskaitą.",
    comprarBajadaPlanilla: "Kai mokėjimas bus patvirtintas, šiuo adresu atsiųsime lentelę.",
    etiquetaEmail: "Jūsų el. paštas",
    seguirPago: "Tęsti mokėjimą",
    privacidad: "Jūsų adresą naudosime tik pirkiniui ir jo atnaujinimams atsiųsti.",
    datosTitulo: "Su jūsų skaičiavimo skaičiais",
    datosUsar: "Naudoti šiuos skaičius mano pirkinyje. Jie saugomi tik pirkiniui parengti.",
    errores: {
      email: "Patikrinkite el. pašto adresą: atrodo, kad jame kažko trūksta.",
      error: "Mokėjimo pradėti nepavyko. Pinigų nenuskaičiavome. Bandykite po kelių minučių.",
      cancelado: "Mokėjimą atšaukėte. Pinigų nenuskaičiavome.",
      fallido: "PayPal mokėjimo nepatvirtino. Galite bandyti su kita kortele.",
      pronto: "Pardavimas dar neprasidėjo.",
    },
    graciasTitulo: "Ačiū už pirkinį",
    graciasListoInforme: "Mokėjimas patvirtintas. Pirkinį jau galite atidaryti: {titulo}. Nuorodą atsiuntėme ir el. paštu, ji galioja neribotai.",
    graciasListoPlanilla: "Mokėjimas patvirtintas. Pirkinį jau galite atsisiųsti: {titulo}. Jį atsiuntėme ir el. paštu su neribotai galiojančia nuoroda.",
    graciasPendiente: "Laukiame PayPal patvirtinimo. Kai tik jį gausime, pirkinį atsiųsime el. paštu.",
    muestraIntro: "Tai lapas „{hoja}“ su pavyzdiniais duomenimis, su kuriais jis atidaromas. Skaičiavimas šiandienos, su galiojančiais oficialiais dydžiais.",
    muestraLeyenda: ["pildote jūs", "skaičiuoja lentelė"],
    comprobar: "Patikrinkite prieš mokant: nemokama skaičiuoklė pateikia tuos pačius skaičius. Išbandykite tą patį atvejį ir palyginkite.",
    comprobarEnlace: "Eiti į nemokamą skaičiuoklę",
    faqTitulo: "Dažni klausimai",
    faq: {
      sheets: {
        pregunta: "Ar veikia Google Sheets ir Excel programose?",
        respuesta: "Taip. Tai .xlsx failas: atidarysite jį Excel ir Google Sheets programose (įkelkite į savo Diską ir atidarykite ten). Skaičiuojama įprastomis formulėmis, be makrokomandų.",
      },
      recibo: {
        pregunta: "Kaip ją gausiu?",
        respuesta: "Kai mokėjimas bus patvirtintas, atsiųsime ją el. paštu su neribotai galiojančia atsisiuntimo nuoroda. Atsisiųsti galite ir puslapyje, kuris atsidaro po mokėjimo.",
      },
      dolares: {
        pregunta: "Ar mokama JAV doleriais?",
        respuesta: "Taip. Kaina nurodyta JAV doleriais (USD), o mokate per PayPal, iš sąskaitos arba kortele.",
        conReferencia: "Aukščiau rodome apytikslę sumą jūsų valiuta pagal šiandienos kursą, tik orientacijai: galutinė suma priklauso nuo jūsų banko ar kortelės kurso.",
        sinReferencia: "Jei jūsų kortelė kita valiuta, sumą konvertuos jūsų bankas.",
      },
      devolucion: { pregunta: "Ar galiu susigrąžinti pinigus?", respuesta: "Taip. Jei lentelė nebus naudinga, per 7 dienas atsakykite į pirkimo el. laišką ir grąžinsime pinigus." },
      actualiza: { pregunta: "Ar ji atnaujinama, kai pasikeičia oficialūs dydžiai?", respuesta: "Taip. {disparador}, lentelę atnaujiname ir toje pačioje nuorodoje galite atsisiųsti naują versiją." },
    },
    descargar: "Atsisiųsti lentelę (.xlsx)",
    abrirInforme: "Atidaryti mano ataskaitą",
    fuentes: "Naudojami oficialūs šaltiniai",
    calculadoras: "Veikia su šiomis skaičiuoklėmis",
    muestra: "Kaip atrodo",
  },
  correo: {
    asuntoInforme: "Jūsų pirkinys CalcularYa svetainėje: {titulo}",
    asuntoPlanilla: "{titulo}: atsisiuntimas ir atnaujinimai",
    mismosNumeros: "Skaičiai tokie patys kaip {enlace}, su oficialiais duomenimis.",
    enlaceCalculadora: "nemokamoje CalcularYa skaičiuoklėje",
    comprobante: "Tai jūsų pirkinio patvirtinimas ({marca}).",
    informe: {
      encabezado: "Ataskaitą jau galite atidaryti",
      intro: "Ačiū už pirkinį ({titulo}). Atidarykite jį čia:",
      boton: "Atidaryti mano ataskaitą",
      abre: "Ataskaita atsidarys naršyklėje. Iš ten galite ją spausdinti arba išsaugoti kaip PDF.",
      guarda: "Išsaugokite šį el. laišką",
      vence: "Nuoroda priklauso jums ir galioja neribotai. Ataskaitoje naudojami pirkimo dieną galioję oficialūs dydžiai, o duomenis galite bet kada pataisyti ir ataskaitą išspausdinti iš naujo.",
      devolucion: "Jei ataskaita nebus naudinga, per 7 dienas atsakykite į šį el. laišką ir grąžinsime pinigus.",
      ayuda: "Kilo problemų? Atsakykite į šį el. laišką arba parašykite mums adresu {contacto}.",
    },
    planilla: {
      encabezado: "Lentelę jau galite atsisiųsti",
      intro: "Ačiū už pirkinį ({titulo}). Atsisiųskite jį čia:",
      boton: "Atsisiųsti lentelę (.xlsx)",
      abre: "Atidarysite ją Excel ir Google Sheets programose.",
      guarda: "Išsaugokite šį el. laišką",
      vence: "Nuoroda priklauso jums ir galioja neribotai. {disparador}, lentelę atnaujiname ir toje pačioje nuorodoje gausite naujausią versiją. Mokėti dar kartą nereikia.",
      devolucion: "Jei lentelė nebus naudinga, per 7 dienas atsakykite į šį el. laišką ir grąžinsime pinigus.",
      ayuda: "Kilo problemų? Atsakykite į šį el. laišką arba parašykite mums adresu {contacto}.",
    },
  },
};
