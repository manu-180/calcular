import type { ClaveFamilia } from "../ofertas-intl";
import type { DiccionarioVenta, TextosFamilia } from "./tipos";

// Albanés: un solo registro, el de bancos y servicios públicos en línea. «ju» en minúscula, 2.ª del
// plural en oraciones y botones («Shikoni», «Paguani») y posesivos «juaj», «tuaj», «tuaja». Los mercados
// van con trato "usted" y todo se escribe en base. Textos neutrales entre países: ningún organismo de un
// solo país, la moneda llega formateada. Planilla = «fletë llogaritëse»; pestaña = «skedë».

const PER_ARKIVIN = { titulo: "Për arkivin tuaj", texto: "Me datën e vlerave të përdorura në llogaritje." };
const SHUMA_TE_TJERA = { titulo: "Me shuma të tjera", explica: "E njëjta llogaritje me shuma pak më të ulëta dhe pak më të larta." };
const INTERESA_TE_TJERA = { titulo: "Me norma të tjera interesi", explica: "Të njëjtat shifra me norma interesi pak më të ulëta dhe pak më të larta." };

const familias: Record<ClaveFamilia, TextosFamilia> = {
  liquidacion: {
    nombre: "Raport me të drejtat në përfundim të kontratës",
    tituloCorto: "raport me të drejtat në përfundim të kontratës",
    paraQuien: "Për të kontrolluar shumat që ju takojnë në largim para se të nënshkruani ose për t'i kërkuar ato, me shifrat tuaja dhe ligjin e vendit",
    descripcion: [
      "Një raport PDF me të drejtat në përfundim të kontratës, të ndara zë për zë: sa merrni për secilin, si llogaritet dhe cilat vlera zyrtare përdor, secila me burimin e vet.",
      "Përfshin një listë me atë që duhet kontrolluar para nënshkrimit dhe një kërkesë, të plotësuar tashmë me shumën tuaj, për ta kërkuar pagesën me shkrim.",
    ],
    gancho: "Merrni me shkrim shumat që ju takojnë në largim, gati për t'u kontrolluar para nënshkrimit",
    incluye: [
      { titulo: "Çdo zë me llogaritjen e vet", texto: "Për t'i krahasuar rresht për rresht me atë që ju ofron punëdhënësi." },
      { titulo: "Burime zyrtare të dukshme", texto: "Çdo vlerë me institucionin që e publikon dhe datën kur e kemi verifikuar." },
      { titulo: "Kërkesë për pagesë e gatshme", texto: "E plotësuar me shumën tuaj, për ta kërkuar pagesën me shkrim." },
    ],
    pasos: {
      titulo: "Para se të nënshkruani",
      items: [
        "Krahasoni çdo zë të këtij raporti me dokumentin që ju kërkohet të nënshkruani. Nëse mungon ndonjë, pyetni përse para nënshkrimit.",
        "Kontrolloni nëse paga dhe datat që përdor punëdhënësi janë të njëjta me ato të vendosura këtu. Një datë tjetër punësimi ndryshon pothuajse të gjitha shumat.",
        "Kërkoni një kopje të gjithçkaje që nënshkruani dhe ruani fletëpagesat e muajve të fundit.",
        "Nëse diferenca është e madhe ose jeni pushuar nga puna, çojeni këtë raport te inspektorati i punës ose te një avokat i së drejtës së punës. Kështu kursehet ora e parë e llogaritjeve.",
      ],
    },
    nota: {
      titulo: "Kërkesë për pagesë",
      uso: "Plotësojeni, nënshkruajeni dhe dorëzojeni bashkë me një kopje për veten. Kërkoni që kopja t'ju nënshkruhet me datën e marrjes.",
      pedido: "Me anë të kësaj kërkoj pagesën e të drejtave që më takojnë në përfundim të kontratës së punës, të cilat, sipas llogaritjes në raportin bashkëlidhur, arrijnë shumën",
      cierre: "Detajet bashkëlidhur tregojnë çdo zë, të llogaritur me vlerat zyrtare në fuqi në datën e treguar. Pres të më njoftoni datën e pagesës.",
    },
  },
  "pagos-laborales": {
    nombre: "Raport i pagesave të pagës",
    tituloCorto: "raport i pagesave të pagës",
    paraQuien: "Për të konfirmuar se jeni paguar saktë për shpërblimin, pushimet vjetore, orët shtesë ose pjesëmarrjen në fitim dhe, nëse jo, për të kërkuar diferencën",
    descripcion: [
      "Një raport PDF me llogaritjen e bërë, hap pas hapi dhe me shifrat tuaja: çfarë baze përdor, si llogaritet dhe cilat vlera zyrtare zbatohen, secila me burimin e vet.",
      "Vlen për çdo pagesë në listë. Tregon si ta kontrolloni në fletëpagesë dhe përfshin një kërkesë për ta kërkuar diferencën me shkrim.",
    ],
    gancho: "Merrni këtë llogaritje me shkrim, për ta krahasuar me fletëpagesën",
    incluye: [
      { titulo: "Llogaritja hap pas hapi", texto: "Me të dhënat tuaja dhe çdo vlerë zyrtare të përdorur." },
      { titulo: "Çfarë të kërkoni në fletëpagesë", texto: "Që të dini brenda një minute nëse jeni paguar saktë." },
      { titulo: "Kërkesë për diferencën", texto: "E plotësuar me shumën tuaj, gati për t'u dorëzuar." },
    ],
    pasos: {
      titulo: "Për të kontrolluar pagesën",
      items: [
        "Gjeni këtë zë në fletëpagesë dhe krahasojeni me shumën në raport.",
        "Nëse nuk përputhet, konfirmoni së pari që të dhënat e vendosura janë të njëjta me ato që përdor punëdhënësi.",
        "Nëse përsëri nuk përputhet, përdorni kërkesën më poshtë për ta kërkuar diferencën me shkrim dhe ruani një kopje.",
      ],
    },
    nota: {
      titulo: "Kërkesë për pagesë",
      uso: "Plotësojeni, nënshkruajeni dhe dorëzojeni bashkë me një kopje për veten.",
      pedido: "Me anë të kësaj kërkoj pagesën e zërit të detajuar në raportin bashkëlidhur, i cili, sipas llogaritjes me vlerat zyrtare në fuqi, arrin shumën",
      cierre: "Nëse shuma e paguar ka qenë e ndryshme, ju lutem të më njoftoni me shkrim si është llogaritur.",
    },
    escenarios: { titulo: "Nëse ndryshojnë orët", explica: "E njëjta llogaritje me një numër tjetër orësh, për të kontrolluar çdo muaj pa e bërë llogaritjen nga e para." },
  },
  impuesto: {
    nombre: "Raport për tatimin mbi të ardhurat",
    tituloCorto: "raport për tatimin mbi të ardhurat",
    paraQuien: "Për të kuptuar sa tatim ju mbahet, për të kontrolluar fletëpagesën dhe për të parë çfarë ndodh nëse ndryshojnë të ardhurat",
    descripcion: [
      "Një raport PDF me tatimin e llogaritur hap pas hapi, me shkallët zyrtare që zbatohen dhe burimin e çdo vlere.",
      "Shton një tabelë me tatimin për të ardhura të tjera, që të dini paraprakisht sa ju mbetet pas një rritjeje page ose një ndërrimi pune.",
    ],
    gancho: "Merrni me shkrim tatimin e shpjeguar dhe çfarë ndodh nëse ndryshojnë të ardhurat",
    incluye: [
      { titulo: "Llogaritja me shkallët zyrtare", texto: "Hap pas hapi, me burimin e çdo vlere." },
      { titulo: "Tatimi për të ardhura të tjera", texto: "Për të negociuar një rritje duke ditur sa ju mbetet." },
      { titulo: "Çfarë të kontrolloni në fletëpagesë", texto: "Për të folur me shifra me punëdhënësin ose kontabilistin." },
    ],
    pasos: {
      titulo: "Për të kontrolluar mbajtjen",
      items: [
        "Gjeni tatimin e mbajtur në fletëpagesë dhe krahasojeni me atë në këtë raport.",
        "Nëse nuk përputhet, pyetni punëdhënësin çfarë të ardhurash dhe zbritjesh përdor.",
        "Ruajeni këtë raport për deklaratën vjetore, nëse duhet të dorëzoni një të tillë.",
      ],
    },
    escenarios: { titulo: "Nëse ndryshojnë të ardhurat", explica: "E njëjta llogaritje me të ardhura pak më të ulëta dhe pak më të larta, me të njëjtat vlera zyrtare." },
  },
  contratacion: {
    nombre: "Buxhet për koston e një punësimi",
    tituloCorto: "buxhet për koston e punësimit",
    paraQuien: "Për të ditur sa kushton me të vërtetë një punësim, me të gjitha kontributet, para se të caktoni pagën",
    descripcion: [
      "Një buxhet PDF me koston e plotë të punësimit, të ndarë në zëra: paga, kontributet e punëmarrësit dhe të punëdhënësit dhe provizionet, çdo vlerë me burimin e vet zyrtar.",
      "Përfshin një tabelë me koston për paga të tjera, që të bëni një ofertë duke ditur sa kushton në të vërtetë çdo njësi shtesë, gati për t'ia treguar një ortaku ose kontabilistit.",
    ],
    gancho: "Kthejeni këtë kosto në një buxhet për të vendosur për punësimin",
    incluye: [
      { titulo: "Çdo kontribut veçmas", texto: "Me rregullin dhe burimin zyrtar të secilit." },
      { titulo: "Kostoja për paga të tjera", texto: "Për të negociuar duke ditur sa shton çdo shkallë." },
      { titulo: "Gati për t'u paraqitur", texto: "Për një ortak, për kontabilistin ose për arkivin tuaj." },
    ],
    pasos: {
      titulo: "Para punësimit",
      items: [
        "Kontrolloni me kontabilistin nëse fusha juaj ka një kontratë kolektive ose një pagë minimale më të lartë se ajo e përgjithshme.",
        "Vini mënjanë çdo muaj provizionet e këtij buxheti: janë pagesa që vijnë të gjitha njëherësh në fund të vitit ose në përfundim të kontratës.",
        "Regjistrojeni personin që nga dita e parë: kostoja në këtë buxhet i përfshin tashmë kontributet ligjore.",
      ],
    },
    escenarios: { titulo: "Kostoja për paga të tjera", explica: "E njëjta llogaritje me paga më të ulëta dhe më të larta, me të njëjtat vlera zyrtare." },
  },
  "ajuste-inflacion": {
    nombre: "Letër përditësimi me inflacionin",
    tituloCorto: "letër përditësimi me inflacionin",
    paraQuien: "Për të kërkuar ose për të njoftuar përditësimin e një qiraje, një kësti, një honorari ose një page sipas indeksit zyrtar",
    descripcion: [
      "Një letër gati për t'u dërguar, e plotësuar me shumën e përditësuar, bashkë me arsyetimin e llogaritjes: indeksi zyrtar për çdo datë, institucioni që e publikon dhe lidhja te burimi.",
      "Me arsyetimin të dukshëm, pala tjetër mund ta kontrollojë shifrën brenda një minute dhe diskutimi bëhet për indeksin, jo për llogaritjet.",
    ],
    gancho: "Kthejeni këtë përditësim në një letër gati për t'u dërguar, të mbështetur nga indeksi zyrtar",
    incluye: [
      { titulo: "Letra e plotësuar", texto: "Me shumën e përditësuar, gati për printim ose për dërgim." },
      { titulo: "Indeksi zyrtar si arsyetim", texto: "Me institucionin, datën dhe lidhjen te burimi." },
      { titulo: "Llogaritja e dukshme", texto: "Që pala tjetër ta kontrollojë vetë." },
    ],
    nota: {
      titulo: "Letër përditësimi",
      uso: "Plotësojeni me të dhënat e marrëveshjes dhe dorëzojeni bashkë me detajet e llogaritjes.",
      pedido: "Me anë të kësaj ju njoftoj për përditësimin e shumës së rënë dakord sipas ecurisë së indeksit zyrtar të çmimeve të konsumit, në përputhje me llogaritjen bashkëlidhur. Shuma e përditësuar është",
      cierre: "Llogaritja përdor indeksin e publikuar nga institucioni zyrtar i treguar në detaje, i cili mund të verifikohet te burimi i cituar.",
    },
  },
  regimen: {
    nombre: "Raport për regjimin e thjeshtuar tatimor",
    tituloCorto: "raport për regjimin e thjeshtuar",
    paraQuien: "Për të ditur sa paguani në regjimin e thjeshtuar tatimor dhe çfarë ndodh nëse të ardhurat rriten ose ulen",
    descripcion: [
      "Një raport PDF me tatimin ose kuotën e regjimit të thjeshtuar, të llogaritura hap pas hapi me shkallët zyrtare dhe burimin e çdo vlere.",
      "Shton një tabelë me atë që do të paguanit me të ardhura të tjera, që ta shihni me kohë një ndryshim pragu.",
    ],
    gancho: "Merrni regjimin me shkrim dhe shikoni çfarë ndodh nëse ndryshojnë të ardhurat",
    incluye: [
      { titulo: "Llogaritja me shkallët zyrtare", texto: "Hap pas hapi, me burimin e çdo vlere." },
      { titulo: "Çfarë do të paguanit me të ardhura të tjera", texto: "Për ta parë me kohë një ndryshim pragu." },
      PER_ARKIVIN,
    ],
    escenarios: { titulo: "Nëse ndryshojnë të ardhurat", explica: "E njëjta llogaritje me të ardhura më të ulëta dhe më të larta, me të njëjtat vlera zyrtare." },
  },
  deposito: {
    nombre: "Krahasim depozitash me afat",
    tituloCorto: "krahasim depozitash",
    paraQuien: "Për ta krahasuar depozitën në disa afate para se të zgjidhni ku dhe për sa kohë kurseni",
    descripcion: ["Një raport PDF me fitimin e depozitës dhe një tabelë me të njëjtën depozitë në afate të tjera, të gjitha me të njëjtat llogaritje si në kalkulator."],
    gancho: "Krahasoni depozitën në disa afate në një raport të vetëm",
    incluye: [
      { titulo: "Depozita në disa afate", texto: "Në një tabelë të vetme, për të zgjedhur me një shikim." },
      { titulo: "Llogaritja hap pas hapi", texto: "Me burimin e çdo vlere të përdorur." },
      PER_ARKIVIN,
    ],
    escenarios: { titulo: "Depozita në afate të tjera", explica: "E njëjta llogaritje me afate të tjera." },
  },
  alimentos: {
    nombre: "Raport për detyrimin për ushqim",
    tituloCorto: "raport për detyrimin për ushqim",
    paraQuien: "Për të shkuar në ndërmjetësim ose në diskutimin për detyrimin për ushqim me një shifër të argumentuar mirë",
    descripcion: ["Një raport PDF me shumën e përllogaritur të detyrimit për ushqim, hap pas hapi, me vlerat zyrtare dhe burimin e tyre, bashkë me një tabelë me shumën për të ardhura të tjera."],
    gancho: "Shkoni në ndërmjetësim me këtë llogaritje me shkrim",
    incluye: [
      { titulo: "Një llogaritje e argumentuar mirë", texto: "Hap pas hapi, me burimin e çdo vlere." },
      { titulo: "Shuma për të ardhura të tjera", texto: "Për të negociuar me skenarët të dukshëm." },
      { titulo: "Për avokatin ose ndërmjetësin", texto: "Kështu kursehet ora e parë e llogaritjeve." },
    ],
    escenarios: { titulo: "Me të ardhura të tjera", explica: "E njëjta llogaritje me të ardhura më të ulëta dhe më të larta." },
  },
  jubilacion: {
    nombre: "Parashikim i pensionit",
    tituloCorto: "parashikim i pensionit",
    paraQuien: "Për ta planifikuar daljen në pension me një parashikim me shkrim dhe për të parë çfarë ndryshon nëse kontribuoni më shumë",
    descripcion: ["Një raport PDF me pensionin e përllogaritur hap pas hapi, me vlerat zyrtare dhe burimin e tyre, bashkë me një tabelë me parashikimin për paga të tjera."],
    gancho: "Merrni parashikimin e pensionit me shkrim",
    incluye: [
      { titulo: "Përllogaritja hap pas hapi", texto: "Me burimin e çdo vlere." },
      { titulo: "Me paga të tjera", texto: "Për të parë çfarë ndryshon nëse kontribuoni më shumë." },
      PER_ARKIVIN,
    ],
    escenarios: { titulo: "Me paga të tjera", explica: "E njëjta llogaritje me paga më të ulëta dhe më të larta." },
  },
  "plan-prestamo": {
    nombre: "Plan kredie",
    tituloCorto: "plan kredie",
    paraQuien: "Për të ditur sa ju kushton në të vërtetë një kredi dhe për të krahasuar ofertat para se të nënshkruani",
    descripcion: [
      "Një raport PDF me të gjithë kredinë: këstin mujor, totalin që do të ktheni dhe sa prej tij është interes.",
      "Nëse e keni llogaritur këstin, rendit çdo pagesë veç e veç. Llogarit edhe të njëjtat shifra me norma të tjera interesi, që t'i krahasoni ofertat e bankave me shifra reale.",
    ],
    gancho: "Krahasoni ofertat e kredisë me shifrat tuaja para se të nënshkruani",
    incluye: [
      { titulo: "Kredia me norma të tjera interesi", texto: "Për të parë sa ndryshon një pikë më shumë ose më pak." },
      { titulo: "Kostoja totale e dukshme", texto: "Sa paguani si interes, pa shkronja të vogla." },
      { titulo: "Listë kontrolli para nënshkrimit", texto: "Pyetjet që ia vlen t'i bëni kredidhënësit." },
    ],
    pasos: {
      titulo: "Para se të nënshkruani kredinë",
      items: [
        "Kërkoni normën efektive vjetore, me të gjitha kostot të përfshira, jo vetëm normën nominale. Këtë duhet të krahasoni.",
        "Pyetni për komisionin e dhënies, sigurimet e detyrueshme dhe çdo kosto për shlyerjen e parakohshme.",
        "Krahasoni të paktën tre oferta me tabelën e normave të tjera të interesit në këtë raport.",
        "Zgjidhni një këst që mund ta paguani edhe në një muaj të keq. Si rregull praktik, të mos kalojë një të tretën e të ardhurave.",
      ],
    },
    escenarios: INTERESA_TE_TJERA,
  },
  "plan-hipoteca": {
    nombre: "Plan kredie për shtëpi",
    tituloCorto: "plan kredie për shtëpi",
    paraQuien: "Për të vendosur për një kredi për shtëpi me të gjitha shifrat të dukshme: kësti, interesi dhe çfarë ndodh nëse ndryshon norma e interesit",
    descripcion: [
      "Një raport PDF me të gjithë kredinë për shtëpi: këstin mujor, totalin që do të paguani dhe sa shkon për interes gjatë viteve.",
      "Përfshin të plotë çdo tabelë të llogaritjes (faqja falas tregon vetëm rreshtat e parë) dhe të njëjtat shifra me norma të tjera interesi. Nëse e keni krahasuar qiranë me blerjen, e vë krahasimin me shkrim, që të vendosni në familje.",
    ],
    gancho: "Shkoni në bankë me tabelën e plotë dhe me norma të tjera interesi",
    incluye: [
      { titulo: "Tabela e plotë", texto: "Të gjithë rreshtat, jo vetëm të parët." },
      { titulo: "Kredia me norma të tjera interesi", texto: "Për të parë sa ndryshon kësti me një pikë më shumë ose më pak." },
      { titulo: "Pyetje për bankën", texto: "Çfarë të konfirmoni para se të nënshkruani." },
    ],
    pasos: {
      titulo: "Para se të nënshkruani kredinë për shtëpi",
      items: [
        "Kërkoni ofertën me shkrim, me normën e interesit, periudhën dhe koston totale, duke përfshirë sigurimet dhe komisionet.",
        "Pyetni nëse norma e interesit është fikse apo e ndryshueshme dhe çfarë ndodh me këstin nëse ajo rritet.",
        "Kontrolloni sa kushton shlyerja e parakohshme dhe nëse mund të bëni pagesa shtesë pa penalitete.",
        "Shtojini këstit kostot e banesës (tatime, sigurim, mirëmbajtje) para se të vendosni sa mund të përballoni.",
      ],
    },
    escenarios: INTERESA_TE_TJERA,
  },
  "plan-inversion": {
    nombre: "Plan kursimi dhe investimi",
    tituloCorto: "plan kursimi",
    paraQuien: "Për të parë si rriten kursimet me kalimin e kohës dhe çfarë ndryshon nëse vini mënjanë më shumë ose merrni një normë tjetër interesi",
    descripcion: [
      "Një raport PDF me parashikimin e kursimeve: sa depozitoni, sa fitoni nga interesi dhe sa keni në fund.",
      "Përfshin të plotë çdo tabelë të llogaritjes dhe të njëjtat shifra me norma të tjera interesi, që të zgjidhni ku të kurseni me shifra reale.",
    ],
    gancho: "Merrni planin e kursimit me shkrim, vit pas viti",
    incluye: [
      { titulo: "Parashikimi i plotë", texto: "Të gjithë rreshtat e tabelës, jo vetëm të parët." },
      { titulo: "Me norma të tjera interesi", texto: "Për të krahasuar mundësitë para se të zgjidhni." },
      { titulo: "Një plan që mund ta ndiqni", texto: "Hapat që e kthejnë qëllimin në kursime." },
    ],
    pasos: {
      titulo: "Që plani të funksionojë",
      items: [
        "Programoni transfertën në ditën kur merrni pagën: atë që nuk e shihni nuk e shpenzoni.",
        "Krahasoni normën e interesit me inflacionin: nëse norma është më e ulët, paratë humbin vlerë edhe pse shifra rritet.",
        "Hapeni përsëri këtë raport një herë në vit dhe përditësoni shifrat tuaja.",
      ],
    },
    escenarios: INTERESA_TE_TJERA,
  },
  "plan-deudas": {
    nombre: "Plan shlyerjeje i kartës së kreditit",
    tituloCorto: "plan shlyerjeje i kartës",
    paraQuien: "Për të ditur kur e përfundoni pagesën e kartës, sa ju kushton interesi dhe si ta përfundoni më shpejt",
    descripcion: [
      "Një raport PDF me borxhin muaj pas muaji: sa paguani, sa shkon për interes dhe sa shpejt ulet teprica.",
      "Përfshin tabelën e plotë deri në pagesën e fundit dhe të njëjtat shifra me pagesa të tjera, që të shihni sa kurseni duke paguar pak më shumë çdo muaj.",
    ],
    gancho: "Shikoni muaj pas muaji kur do ta përfundoni pagesën e kartës",
    incluye: [
      { titulo: "Muaj pas muaji deri në pagesën e fundit", texto: "Me interesin e paguar çdo muaj." },
      { titulo: "Me pagesa të tjera", texto: "Për të parë sa më shpejt përfundoni duke paguar pak më shumë." },
      { titulo: "Një rrugëdalje", texto: "Hapat për të mbetur pa borxhe." },
    ],
    pasos: {
      titulo: "Për të dalë nga borxhet",
      items: [
        "Mos e përdorni kartën sa kohë po e shlyeni: çdo blerje e re e zgjat tabelën.",
        "Paguani gjithmonë më shumë se shuma minimale. Edhe pak ndihmon, dhe tabela me pagesa të tjera tregon sa.",
        "Nëse keni disa borxhe, paguani së pari normën më të lartë të interesit dhe shumën minimale te të tjerat.",
        "Pyetni bankën për një transferim teprice ose një rifinancim me normë më të ulët interesi dhe krahasojini me këtë raport.",
      ],
    },
    escenarios: { titulo: "Me pagesa të tjera mujore", explica: "I njëjti borxh duke paguar pak më pak dhe pak më shumë çdo muaj." },
  },
  "plan-presupuesto": {
    nombre: "Plan buxheti",
    tituloCorto: "plan buxheti",
    paraQuien: "Për ta organizuar muajin me një plan të qartë: sa shkon për nevojat, për dëshirat dhe për kursimet",
    descripcion: [
      "Një raport PDF që e kthen llogaritjen në një plan: sa vini mënjanë për çdo gjë, në monedhën tuaj dhe me shifrat tuaja.",
      "Përfshin të njëjtin plan me shuma të tjera, që të dini paraprakisht çfarë ndryshon në një muaj me më shumë ose më pak para, dhe hapat për ta ndjekur.",
    ],
    gancho: "Kthejeni këtë llogaritje në një plan për muajin tuaj",
    incluye: [
      { titulo: "Plani me shifrat tuaja", texto: "Sa shkon ku, gati për t'u ndjekur." },
      { titulo: "Me shuma të tjera", texto: "Për ta përshtatur planin kur ndryshon muaji." },
      { titulo: "Hapat për ta ndjekur", texto: "Çfarë e bën një buxhet të qëndrojë pas muajit të parë." },
    ],
    pasos: {
      titulo: "Që buxheti të funksionojë",
      items: [
        "Kaloni kursimet në ditën e pagës, para se të shpenzoni. Ajo që mbetet është ajo që mund të shpenzoni.",
        "Shënoni shpenzimet për një muaj, qoftë edhe në telefon, dhe krahasojini me këtë plan.",
        "Krijoni së pari një fond emergjence, që një e papritur të mos përfundojë në kartën e kreditit.",
      ],
    },
    escenarios: SHUMA_TE_TJERA,
  },
  "plan-negocio": {
    nombre: "Raport me shifrat e biznesit",
    tituloCorto: "raport me shifrat e biznesit",
    paraQuien: "Për të vendosur për çmimet, marzhet ose një investim me shifra të qarta, gati për t'ia treguar një ortaku",
    descripcion: [
      "Një raport PDF me llogaritjen të shpjeguar hap pas hapi: çfarë të dhënash përdor, si llogaritet dhe çfarë rezultati jep.",
      "Shton një tabelë me të njëjtën llogaritje për shuma të tjera, që të shihni si ndryshon rezultati nëse rritet një kosto ose e ulni çmimin.",
    ],
    gancho: "Kthejini këto shifra në një raport për vendimin ose për ta shpërndarë",
    incluye: [
      { titulo: "Llogaritja e shpjeguar", texto: "Për ta kuptuar dhe për ta mbrojtur para një ortaku ose një banke." },
      { titulo: "Me shuma të tjera", texto: "Për ta parë me kohë efektin e një ndryshimi çmimi ose kostoje." },
      { titulo: "Pyetje para vendimit", texto: "Çfarë të kontrolloni para se të ndryshoni një çmim." },
    ],
    pasos: {
      titulo: "Para se të vendosni",
      items: [
        "Sigurohuni që në kosto të hyjë gjithçka: transporti, komisionet, tarifat dhe koha juaj.",
        "Krahasoni çmimin me dy ose tre konkurrentë para se ta ndryshoni.",
        "Shikoni rastin më të keq në tabelë: nëse biznesi qëndron aty, vendimi është më i sigurt.",
      ],
    },
    escenarios: SHUMA_TE_TJERA,
  },
  "kit-freelance": {
    nombre: "Paketë tarife për freelancerë",
    tituloCorto: "paketë tarife për freelancerë",
    paraQuien: "Për të kërkuar aq sa vlen puna juaj dhe për ta paraqitur tarifën me siguri",
    descripcion: [
      "Një raport PDF me tarifën për orë të shpjeguar: të ardhurat që synoni, orët që mund të faturoni me të vërtetë dhe kostot që mbulon.",
      "Përfshin tarifën për objektiva të tjerë të ardhurash dhe një letër gati për t'iu dërguar një klienti, me tarifën për orë.",
    ],
    gancho: "Paraqiteni tarifën me shifra, jo me justifikime",
    incluye: [
      { titulo: "Tarifa e shpjeguar", texto: "Për kur dikush pyet përse kërkoni kaq." },
      { titulo: "Për objektiva të tjerë të ardhurash", texto: "Tarifa që ju nevojitet për secilin." },
      { titulo: "Letër tarife e gatshme", texto: "E plotësuar me shifrën tuaj, për t'ua dërguar klientëve." },
    ],
    pasos: {
      titulo: "Për të kërkuar aq sa vleni",
      items: [
        "Numëroni vetëm orët e faturueshme: mbledhjet, ofertat dhe ndjekja e faturave janë gjithashtu punë.",
        "Kur është e mundur, kërkoni një çmim për projekt: klienti blen një rezultat, jo orë.",
        "Rishikojeni tarifën një herë në vit ose më herët, nëse ju rriten kostot.",
      ],
    },
    nota: {
      titulo: "Letër tarife",
      uso: "Plotësojeni me të dhënat e klientit dhe dërgojeni bashkë me propozimin.",
      pedido: "Pas bisedës sonë, po ju dërgoj tarifën për shërbimet profesionale për të cilat folëm. Tarifa ime për orë është",
      cierre: "Tarifa mbulon kohën e punës dhe kostot e veprimtarisë sime. Me kënaqësi mund të përgatis edhe një propozim për projekt.",
    },
    escenarios: { titulo: "Për objektiva të tjerë të ardhurash", explica: "E njëjta llogaritje me objektiva të ardhurash më të ulëta dhe më të larta." },
  },
  "plan-sueldo": {
    nombre: "Raport page",
    tituloCorto: "raport page",
    paraQuien: "Për të negociuar një pagë, një ofertë ose një rritje duke ditur sa është për orë, për muaj dhe për vit",
    descripcion: [
      "Një raport PDF me llogaritjen e pagës të shpjeguar, me shifrat tuaja dhe çdo vlerë të përdorur.",
      "Shton një tabelë me shuma të tjera, që të krahasoni oferta ose të kërkoni një rritje me shifra të qarta.",
    ],
    gancho: "Negocioni pagën me shifrat me shkrim",
    incluye: [
      { titulo: "Llogaritja e plotë", texto: "Me çdo shifër të vendosur." },
      { titulo: "Me shuma të tjera", texto: "Për të krahasuar dy oferta brenda një minute." },
      { titulo: "Këshilla për negocim", texto: "Çfarë të thoni dhe çfarë të kërkoni përveç shifrës." },
    ],
    pasos: {
      titulo: "Për të negociuar",
      items: [
        "Flisni me shuma vjetore ose për orë kur krahasoni oferta: shifrat mujore fshehin diferenca.",
        "Kërkoni edhe atë që nuk është pagë: ditë pushimi, punë nga shtëpia, kurse ose një shpërblim.",
        "Shkoni me një shifër konkrete dhe arsyen e saj: përvojën, tregun ose çfarë ka ndryshuar në rolin tuaj.",
      ],
    },
    escenarios: SHUMA_TE_TJERA,
  },
  "kit-calculos": {
    nombre: "Llogaritje e shpjeguar hap pas hapi",
    tituloCorto: "llogaritje e shpjeguar",
    paraQuien: "Për ta pasur llogaritjen të zgjidhur dhe të shpjeguar, gati për printim, për studim ose për dërgim",
    descripcion: [
      "Një raport PDF me llogaritjen, si zgjidhet dhe rezultatin, me shifrat tuaja.",
      "Përdoreni për të mësuar, për të ruajtur një llogaritje ose për t'ia treguar dikujt pa pasur nevojë ta shpjegoni.",
    ],
    gancho: "Merreni llogaritjen me vete, të shpjeguar hap pas hapi",
    incluye: [
      { titulo: "Llogaritja e zgjidhur", texto: "Me të dhënat tuaja dhe rezultatin." },
      { titulo: "Si llogaritet", texto: "Për të parë nga vjen çdo shifër." },
      { titulo: "Gati për printim", texto: "Ose për ta ruajtur si PDF dhe për ta dërguar." },
    ],
    pasos: {
      titulo: "Për ta kontrolluar",
      items: ["Bëni llogaritjen së prapthi: nisuni nga rezultati dhe arrini te vlera fillestare.", "Rrumbullakoni vetëm në fund: rrumbullakimi në çdo hap e ndryshon rezultatin."],
    },
    escenarios: SHUMA_TE_TJERA,
  },
  "kit-gastos-grupo": {
    nombre: "Përmbledhje e shpenzimeve të grupit",
    tituloCorto: "përmbledhje e shpenzimeve",
    paraQuien: "Që të gjithë të dinë sa kanë për të dhënë, pa diskutime dhe pa llogari në një pecetë",
    descripcion: [
      "Një përmbledhje PDF e faturës së grupit: totali, sa paguan secili person dhe, nëse duhet, kush i detyrohet kujt.",
      "Dërgojeni me mesazh ose printojeni, që askush të mos e bëjë llogarinë nga e para.",
    ],
    gancho: "Ndajeni faturën me grupin, qartë dhe pa diskutime",
    incluye: [
      { titulo: "Sa paguan secili", texto: "Me totalin dhe detajet të dukshme." },
      { titulo: "Gati për t'u dërguar", texto: "Si PDF, për grupin." },
      { titulo: "Me totale të tjera", texto: "Për rastin kur i shtohet diçka faturës." },
    ],
    pasos: {
      titulo: "Për t'i larë llogaritë",
      items: ["Dërgojani përmbledhjen grupit para se të paguajë dikush: shmangni keqkuptimet.", "Caktoni një mënyrë pagese dhe një datë për larjen e llogarive."],
    },
    escenarios: { titulo: "Me totale të tjera", explica: "E njëjta ndarje nëse totali është pak më i ulët ose pak më i lartë." },
  },
  "kit-estudio": {
    nombre: "Raport i mesatares së notave",
    tituloCorto: "raport i mesatares",
    paraQuien: "Për ta pasur mesataren të qartë dhe me shkrim, me peshën e çdo note",
    descripcion: [
      "Një raport PDF me mesataren: çdo notë, pesha e saj dhe si arrihet te rezultati.",
      "Përdoreni për të kontrolluar një notë, për të planifikuar provimin e radhës ose për t'ia treguar llogaritjen kujt i nevojitet.",
    ],
    gancho: "Merrni mesataren të shpjeguar me shkrim",
    incluye: [
      { titulo: "Çdo notë me peshën e saj", texto: "Për të parë cila ka më shumë rëndësi." },
      { titulo: "Llogaritja hap pas hapi", texto: "Për ta kontrolluar ose për ta treguar." },
      { titulo: "Ide për provimin e radhës", texto: "Si ta përdorni mesataren për t'u organizuar." },
    ],
    pasos: {
      titulo: "Për provimin e radhës",
      items: ["Shikoni cila notë ka peshën më të madhe dhe kushtojini më shumë kohë asaj lënde ose atij provimi.", "Nëse një notë duket e llogaritur gabim, çojani këtë raport mësuesit."],
    },
  },
  "kit-fechas": {
    nombre: "Raport datash dhe afatesh",
    tituloCorto: "raport datash",
    paraQuien: "Për ta pasur një datë ose një afat të llogaritur me shkrim, gati për t'u dorëzuar ose që të mos e harroni",
    descripcion: [
      "Një raport PDF me llogaritjen e datave: datat e vendosura, rezultati dhe si numërohen ditët.",
      "Përdoreni për një dosje, një kontratë, një afat pagese ose thjesht për arkivin tuaj.",
    ],
    gancho: "Vendoseni këtë datë me shkrim, gati për t'u dorëzuar",
    incluye: [
      { titulo: "Llogaritja e shpjeguar", texto: "Me datat dhe mënyrën si numërohen ditët." },
      { titulo: "Gati për t'u dorëzuar", texto: "Në një dosje ose bashkëlidhur një kontrate." },
      { titulo: "Për arkivin tuaj", texto: "Me datën kur është bërë." },
    ],
    pasos: {
      titulo: "Para se të përdorni një datë në një dosje",
      items: [
        "Kontrolloni nëse afati numërohet në ditë kalendarike apo në ditë pune: rezultati ndryshon.",
        "Shikoni nëse dita e fundit bie në një ditë feste ose në fundjavë.",
        "Shënojeni afatin në kalendar, me një kujtesë disa ditë më parë.",
      ],
    },
  },
  "plan-salud": {
    nombre: "Raport IMT dhe kalori",
    tituloCorto: "raport IMT dhe kalori",
    paraQuien: "Për t'i pasur me shkrim shifrat për peshën dhe energjinë dhe për t'i çuar në konsultë",
    descripcion: [
      "Një raport PDF me rezultatin të shpjeguar: çfarë mat, si llogaritet dhe në cilin interval bie, me të dhënat tuaja.",
      "Është informacion i përgjithshëm, për t'u diskutuar me një specialist shëndetësor. Nuk është diagnozë dhe nuk e zëvendëson konsultën.",
    ],
    gancho: "Çojini shifrat në konsultë, të shpjeguara dhe me shkrim",
    incluye: [
      { titulo: "Rezultati i shpjeguar", texto: "Çfarë mat dhe si llogaritet." },
      { titulo: "Pyetje për konsultën", texto: "Për ta shfrytëzuar më mirë vizitën." },
      { titulo: "Për të ndjekur ecurinë", texto: "Ruani çdo raport dhe krahasoni me kalimin e kohës." },
    ],
    pasos: {
      titulo: "Për bisedën me një specialist",
      items: [
        "Merreni këtë raport me vete dhe pyetni cili interval është i shëndetshëm në rastin tuaj, sipas moshës dhe historikut.",
        "Tregoni si ushqeheni, sa lëvizni dhe si flini: shifrat vetëm nuk e tregojnë gjithë historinë.",
        "Mos bëni ndryshime të mëdha në ushqim ose në ushtrime pa pyetur më parë.",
      ],
    },
    aviso: "Informacion i përgjithshëm. Nuk e zëvendëson këshillën e një specialisti shëndetësor.",
  },
  "plan-embarazo": {
    nombre: "Raport për pjellorinë dhe shtatzëninë",
    tituloCorto: "raport për pjellorinë dhe shtatzëninë",
    paraQuien: "Për t'i pasur datat e përllogaritura me shkrim dhe për t'i çuar në kontrollin e radhës",
    descripcion: [
      "Një raport PDF me datat e përllogaritura dhe si llogaritet secila, me të dhënat e vendosura.",
      "Datat janë përllogaritje: çdo trup dhe çdo shtatzëni janë të ndryshëm. Ju ndihmojnë të organizoheni dhe të flisni me një specialist shëndetësor dhe nuk e zëvendësojnë një kontroll.",
    ],
    gancho: "Kini datat me shkrim për kontrollin e radhës",
    incluye: [
      { titulo: "Datat e përllogaritura", texto: "Me mënyrën si llogaritet secila." },
      { titulo: "Pyetje për kontrollin", texto: "Për ta shfrytëzuar sa më mirë vizitën." },
      { titulo: "Për arkivin tuaj", texto: "Me të dhënat e përdorura." },
    ],
    pasos: {
      titulo: "Për kontrollin e radhës",
      items: [
        "Merrni në konsultë këtë raport dhe datën e menstruacioneve të fundit.",
        "Pyetni cilat analiza vijnë në javën ku ndodheni dhe kur është kontrolli i radhës.",
        "Nëse një simptomë ju shqetëson, shkoni te mjeku pa pritur datat e raportit.",
      ],
    },
    aviso: "Informacion i përgjithshëm. Datat janë përllogaritje dhe nuk e zëvendësojnë kujdesin e një specialisti shëndetësor.",
  },
  "plan-entrenamiento": {
    nombre: "Raport i ritmit të vrapimit",
    tituloCorto: "raport i ritmit",
    paraQuien: "Për të dalë për vrap duke ditur ritmin e synuar dhe si ta ndani përpjekjen",
    descripcion: [
      "Një raport PDF me ritmin, kohën dhe shpejtësinë të shpjeguara, me të dhënat e vendosura.",
      "Përfshin të plotë çdo tabelë të llogaritjes dhe këshilla për ta përdorur ritmin në stërvitje.",
    ],
    gancho: "Kini ritmin me shkrim për ditën e garës",
    incluye: [
      { titulo: "Ritmi i shpjeguar", texto: "Me kohën dhe shpejtësinë." },
      { titulo: "Për ta printuar dhe për ta mbajtur me vete", texto: "Në xhep ose në frigorifer." },
      { titulo: "Këshilla stërvitjeje", texto: "Si ta përdorni ritmin pa u lënduar." },
    ],
    pasos: {
      titulo: "Për ta përdorur ritmin",
      items: [
        "Filloni minutat e para pak më ngadalë se ritmi i synuar: fundi do t'ju falënderojë.",
        "Bëni pjesën më të madhe të stërvitjes javore me një ritëm të lehtë, në të cilin ende mund të flisni.",
        "Nëse ju dhemb diçka, ndaloni dhe shkoni për një kontroll: ritmi mund të presë.",
      ],
    },
    aviso: "Informacion i përgjithshëm. Nuk e zëvendëson këshillën e një specialisti shëndetësor ose sportiv.",
  },
  "kit-viaje": {
    nombre: "Buxheti i karburantit për udhëtimin",
    tituloCorto: "buxhet karburanti",
    paraQuien: "Për të ditur sa do të shpenzoni për karburant dhe për ta ndarë shumën mes të gjithë atyre që udhëtojnë",
    descripcion: [
      "Një raport PDF me koston e karburantit për udhëtimin, me shifrat tuaja: distancën, konsumin dhe çmimin.",
      "Shton një tabelë me çmime të tjera karburanti, për rastin kur ndryshojnë para nisjes, dhe një listë për buxhetin e pjesës tjetër të udhëtimit.",
    ],
    gancho: "Kini koston e udhëtimit me shkrim para nisjes",
    incluye: [
      { titulo: "Kostoja e udhëtimit", texto: "Me distancën, konsumin dhe çmimin." },
      { titulo: "Me çmime të tjera", texto: "Për rastin kur karburanti shtrenjtohet para nisjes." },
      { titulo: "Listë për pjesën tjetër të udhëtimit", texto: "Tarifa rrugore, parkim dhe ushqim." },
    ],
    pasos: {
      titulo: "Për buxhetin e udhëtimit",
      items: [
        "Shtojini kostos së karburantit tarifat rrugore, parkimin dhe ushqimin.",
        "Nëse shkojnë disa persona, ndajeni totalin dhe njoftoni të gjithë para nisjes.",
        "Kontrolloni presionin e gomave: me presion të ulët, makina konsumon më shumë.",
      ],
    },
    escenarios: { titulo: "Me çmime të tjera", explica: "I njëjti udhëtim me karburant pak më të lirë dhe pak më të shtrenjtë." },
  },
  "kit-hogar": {
    nombre: "Raport për koston e energjisë elektrike",
    tituloCorto: "raport për koston e energjisë",
    paraQuien: "Për të ditur sa ju kushton çdo pajisje dhe ku mund të kurseni në faturën e energjisë",
    descripcion: [
      "Një raport PDF me sa ju kushton pajisja, me shifrat e konsumit dhe çmimin e energjisë elektrike.",
      "Shton një tabelë me çmime të tjera të energjisë dhe një listë me ide për ta ulur faturën.",
    ],
    gancho: "Mësoni sa ju kushton kjo pajisje dhe si ta ulni koston",
    incluye: [
      { titulo: "Kostoja me konsumin tuaj", texto: "E shpjeguar hap pas hapi." },
      { titulo: "Me çmime të tjera", texto: "Për rastin kur tarifa rritet." },
      { titulo: "Ide për kursim", texto: "Ato që ndihen më shumë në faturë." },
    ],
    pasos: {
      titulo: "Për ta ulur faturën",
      items: [
        "Hiqni nga priza atë që mbetet në gjendje pritjeje: pajisjet e fikura vazhdojnë të konsumojnë.",
        "Ndizni pajisjet më të mëdha në orët më të lira, nëse tarifa ka orë të tilla.",
        "Krahasojeni këtë raport me faturën, për të parë çfarë pjese të totalit zë kjo pajisje.",
      ],
    },
    escenarios: { titulo: "Me çmime të tjera", explica: "I njëjti konsum me energji pak më të lirë dhe pak më të shtrenjtë." },
  },
  "kit-obra": {
    nombre: "Listë materialesh ndërtimi",
    tituloCorto: "listë materialesh",
    paraQuien: "Për t'i blerë materialet në sasinë e duhur, pa munguar dhe pa tepruar",
    descripcion: [
      "Një raport PDF me llogaritjen e materialeve: përmasat, sasitë dhe si llogariten, gati për ta çuar në dyqan.",
      "Vjen me një listë për një blerje të mirë: marzhi për humbjet, çfarë të pyetni dhe çfarë të kontrolloni para se të filloni.",
    ],
    gancho: "Hyni në dyqan me listën e materialeve në dorë",
    incluye: [
      { titulo: "Përmasat dhe sasitë", texto: "Gjithçka që keni llogaritur, në një faqe të vetme." },
      { titulo: "Për ta treguar në dyqan", texto: "Që t'ju japin një ofertë pikërisht për atë që ju nevojitet." },
      { titulo: "Listë për një blerje të mirë", texto: "Marzhi për humbjet dhe çfarë të kontrolloni." },
    ],
    pasos: {
      titulo: "Para se të blini",
      items: [
        "Shtoni midis 5% dhe 10% për prerje dhe thyerje, ose më shumë nëse forma është e parregullt.",
        "Blini gjithçka nga e njëjta seri: ngjyra dhe nuanca mund të ndryshojnë nga një seri te tjetra.",
        "Pyetni për rendimentin e produktit të zgjedhur: ndryshon nga një markë te tjetra.",
        "Ruani faturën dhe atë që mbetet e pahapur: shumë dyqane i marrin produktet mbrapsht.",
      ],
    },
  },
  "kit-facturacion": {
    nombre: "Raport TVSH",
    tituloCorto: "raport TVSH",
    paraQuien: "Për të faturuar ose për të kontrolluar një çmim me tatimin të ndarë qartë, gati për arkivin tuaj ose për kontabilistin",
    descripcion: [
      "Një raport PDF me llogaritjen: çmimi pa TVSH, TVSH-ja dhe totali, me normën që zbatohet dhe burimin e saj.",
      "Shton një tabelë me shuma të tjera, të dobishme për të bërë një listë çmimesh me dhe pa TVSH.",
    ],
    gancho: "Kini çmimin me dhe pa TVSH me shkrim",
    incluye: [
      { titulo: "Tatimi i ndarë", texto: "Shuma neto, TVSH-ja dhe totali, me normën në fuqi." },
      { titulo: "Me shuma të tjera", texto: "Për të bërë një listë çmimesh menjëherë." },
      { titulo: "Për kontabilistin", texto: "Me burimin e normës dhe datën." },
    ],
    pasos: {
      titulo: "Para se të faturoni",
      items: [
        "Kontrolloni nëse produkti ose shërbimi ka normën standarde apo një normë të reduktuar.",
        "Sigurohuni që fatura të tregojë veçmas shumën neto dhe TVSH-në, aty ku është e detyrueshme.",
        "Ruajeni këtë raport bashkë me faturën, për arkivin tuaj.",
      ],
    },
    escenarios: SHUMA_TE_TJERA,
  },
  "informe-calculo": {
    nombre: "Raport llogaritjeje",
    tituloCorto: "raport llogaritjeje",
    paraQuien: "Për ta pasur këtë llogaritje me shkrim, me shifrat tuaja, çfarë supozon dhe nga vjen çdo vlerë zyrtare",
    descripcion: [
      "Një raport PDF i llogaritjes që sapo keni bërë, hap pas hapi, me të dhënat tuaja: rezultati, supozimet pas tij dhe çdo vlerë zyrtare me burimin dhe datën kur është verifikuar.",
      "Ruajeni në dosje ose jepjani kontabilistit, punëdhënësit ose kujtdo që duhet ta kontrollojë, pa pasur nevojë të shpjegoni çdo shifër.",
    ],
    gancho: "Merrni këtë llogaritje me shkrim, me burimet e saj",
    incluye: [
      { titulo: "Rezultati", texto: "Pikërisht si e keni llogaritur, gati për printim." },
      { titulo: "Si arrihet te ai", texto: "Hapat dhe supozimet, që çdo shifër të mund të ndiqet." },
      { titulo: "Burimet zyrtare", texto: "Çdo vlerë me institucionin, lidhjen dhe datën e verifikimit." },
    ],
    pasos: {
      titulo: "Para se ta përdorni",
      items: [
        "Kontrolloni nëse të dhënat lart janë tuajat: rezultati varet prej tyre.",
        "Nëse një vlerë zyrtare ka ndryshuar, bëjeni përsëri llogaritjen: raporti përdor vlerat në fuqi në ditën e blerjes.",
      ],
    },
  },
};

export const sq: DiccionarioVenta = {
  familias,
  general: { si: "Po", no: "Jo" },
  tarjeta: {
    cejaInforme: "Raport PDF",
    cejaPlanilla: "Fletë llogaritëse Excel",
    pagoUnico: "pagesë e vetme",
    comprarInforme: "Merrni raportin",
    comprarPlanilla: "Merrni fletën llogaritëse",
    confianza: "Paguani me PayPal ose me kartë. Nëse nuk ju shërben, bëjmë rimbursimin brenda 7 ditëve.",
    verDetalle: "Shikoni çfarë përmban",
    tambien: "Mund t'ju shërbejë edhe:",
    tablasOficiales: "Tabela zyrtare",
    bajadaInforme: "Raporti e shpjegon llogaritjen hap pas hapi, me shifrat tuaja dhe burimin e çdo vlere, gati për ta printuar ose për ta ruajtur si PDF.",
    bajadaPlanilla: "Fleta llogaritëse e përmban llogaritjen me shifrat tuaja dhe formulat të dukshme, që të ndryshoni çfarë të doni.",
    bajadaPlanillaHoja: "Fleta llogaritëse e përmban llogaritjen në skedën “{hoja}”, me shifrat tuaja dhe formulat të dukshme, që të ndryshoni çfarë të doni.",
    equivale: "Përafërsisht {monto} me kursin e sotëm.",
    cobroDolares: "Pagesa bëhet në dollarë amerikanë.",
  },
  aviso: {
    pronto: "Së shpejti",
    titulo: "Njoftomëni kur të jetë në dispozicion",
    ayuda: "Ju shkruajmë vetëm një herë, kur të dalë në shitje.",
    boton: "Njoftomëni",
    listo: "Gati. Ju dërgojmë një e-mail sapo të dalë në shitje.",
    error: "Nuk arritëm ta ruajmë adresën e e-mailit. Kontrolloni nëse është shkruar saktë dhe provoni përsëri.",
    correo: "Adresa e e-mailit",
  },
  planilla: {
    gancho: "Çojeni këtë llogaritje në Excel, me të dhënat të plotësuara tashmë",
    incluye: [
      { titulo: "Të dhënat të plotësuara tashmë", texto: "Ndryshoni një qelizë të verdhë dhe gjithçka rillogaritet." },
      { titulo: "Paga, shpërblime dhe të drejtat në largim", texto: "Në një skedar të vetëm që e përdorni gjatë gjithë vitit." },
      { titulo: "E përditësuar me çdo ndryshim zyrtar", texto: "E njëjta lidhje ju jep versionin e ri, pa paguar përsëri." },
    ],
  },
  informe: {
    tusDatos: "Të dhënat tuaja",
    resultado: "Rezultati",
    corregir: "Korrigjoni të dhënat",
    actualizar: "Përditësoni raportin",
    imprimir: "Printoni ose ruajeni si PDF",
    imprimirAyuda: "Në dritaren e printimit, zgjidhni ruajtjen si PDF për të marrë skedarin.",
    sinResultado: "Plotësoni të dhënat te “Korrigjoni të dhënat” për të krijuar raportin.",
    lugar: "Vendi dhe data",
    destinatario: "Drejtuar",
    firma: "Nënshkrimi",
    nombre: "Emri",
    documento: "Nr. i dokumentit të identitetit",
    etiquetaEnMinuscula: true,
    comoSeCalcula: "Si llogaritet",
    fuentes: "Burime zyrtare",
    verificado: "verifikuar më",
    emitido: "Lëshuar më",
    valores: "Vlera zyrtare në fuqi më",
    numero: "Raport",
    elegir: "Zgjidhni llogaritjen për raportin:",
    legal:
      "Ky raport është një përllogaritje e bazuar në rregullat dhe vlerat zyrtare të treguara, në datën e treguar. Nuk e zëvendëson këshillën e një specialisti ose vendimin e autoritetit kompetent. Nëse ndonjë nga të dhënat është e ndryshme, rezultati ndryshon: korrigjojeni dhe printojeni përsëri.",
    legalSinFuentes: "Ky raport është një përllogaritje e bazuar në të dhënat e vendosura, në datën e treguar. Nuk e zëvendëson këshillën e një specialisti. Nëse ndryshon ndonjë e dhënë, ndryshon edhe rezultati: korrigjojeni dhe printojeni përsëri.",
    errorTitulo: "Nuk arritëm ta hapim këtë raport",
    error: "Nuk arritëm ta konfirmojmë pagesën për këtë lidhje. Nëse paratë janë tërhequr nga llogaria, na shkruani dhe e zgjidhim. Nëse pagesa nuk ka përfunduar, mund ta bëni përsëri.",
    verificar: "Nuk arritëm ta verifikojmë pagesën në këtë moment. Provoni përsëri pas disa minutash: nuk ka nevojë të paguani edhe një herë.",
    cupo: "Shumë përpjekje radhazi. Prisni disa minuta dhe hapeni përsëri lidhjen.",
  },
  catalogo: {
    tituloProducto: "{nombre} ({pais})",
    disparadorInforme: "Sa herë që ndryshon një vlerë zyrtare e përdorur në llogaritje",
    planillaDescripcion: "Një fletë llogaritëse Excel gati për përdorim: vendosni të dhënat në qelizat e verdha dhe llogaritja bëhet vetë, me formula që ndjekin {normas}.",
    planillaIncluye: "Përfshin {incluye}. Çdo skedë tregon hapat, ndërsa skeda me tabelat zyrtare rendit çdo vlerë me burimin e vet dhe datën kur e kemi verifikuar.",
  },
  planillas: {
    migaPlanillas: "Fletë llogaritëse dhe raporte",
    catalogoTitulo: "Fletë llogaritëse dhe raporte: {pais}",
    catalogoBajada: "Fletë llogaritëse Excel dhe raporte PDF me shifrat tuaja dhe të dhënat zyrtare të vendit. Paguani vetëm një herë, pa abonim.",
    seccionPlanillas: "Fletë llogaritëse Excel",
    seccionInformes: "Raporte PDF",
    catalogoVacio: "{pais}: fletët llogaritëse vijnë së shpejti. Deri atëherë, kalkulatorët janë falas.",
    verCalculadoras: "Shikoni kalkulatorët",
    comprar: "Blini: {precio}",
    pronto: "Së shpejti",
    incluye: "Çfarë përfshin",
    incluyeInforme: [
      "Raportin me shifrat tuaja, në një faqe që mund ta printoni ose ta ruani si PDF.",
      "Një lidhje që nuk skadon kurrë: mund t'i korrigjoni të dhënat dhe ta printoni përsëri kur të doni.",
      "Nëse nuk ju shërben, bëjmë rimbursimin brenda 7 ditëve.",
    ],
    incluyePlanilla: [
      "Skedarin .xlsx, që hapet në Excel dhe në Google Sheets.",
      "Përditësime: {disparador}, e përditësojmë dhe e njëjta lidhje shkarkon versionin e ri.",
      "Nëse nuk ju shërben, bëjmë rimbursimin brenda 7 ditëve.",
    ],
    pagoUnico: "Pagesë e vetme me PayPal. Mund të paguani nga llogaria PayPal ose me kartë.",
    comprarPlanilla: "Blini: {titulo}",
    comprarBajadaInforme: "Ju dërgojmë lidhjen e raportit në këtë adresë sapo të konfirmohet pagesa.",
    comprarBajadaPlanilla: "Ju dërgojmë fletën llogaritëse në këtë adresë sapo të konfirmohet pagesa.",
    etiquetaEmail: "Adresa e e-mailit",
    seguirPago: "Vazhdoni te pagesa",
    privacidad: "Adresën e e-mailit e përdorim vetëm për t'ju dërguar blerjen dhe përditësimet e saj.",
    datosTitulo: "Me shifrat e llogaritjes suaj",
    datosUsar: "Përdorini këto shifra në blerjen time. Ruhen vetëm për të përgatitur blerjen.",
    errores: {
      email: "Kontrolloni adresën e e-mailit: duket se mungon diçka.",
      error: "Nuk arritëm ta nisim pagesën. Nuk ju është tarifuar asgjë. Provoni përsëri pas disa minutash.",
      cancelado: "E keni anuluar pagesën. Nuk ju është tarifuar asgjë.",
      fallido: "PayPal nuk e miratoi pagesën. Mund të provoni një kartë tjetër.",
      pronto: "Nuk është ende në shitje.",
    },
    graciasTitulo: "Faleminderit për blerjen",
    graciasListoInforme: "Pagesa është konfirmuar. Tani mund ta hapni produktin e blerë: {titulo}. Lidhjen jua kemi dërguar edhe me e-mail dhe ajo nuk skadon kurrë.",
    graciasListoPlanilla: "Pagesa është konfirmuar. Tani mund ta shkarkoni produktin e blerë: {titulo}. Jua kemi dërguar edhe me e-mail, me një lidhje që nuk skadon kurrë.",
    graciasPendiente: "Po presim konfirmimin nga PayPal. Sapo të mbërrijë, ua dërgojmë blerjen me e-mail.",
    muestraIntro: "Kjo është skeda “{hoja}” me të dhënat shembull me të cilat hapet. Llogaritja është e sotme, me vlerat zyrtare në fuqi.",
    muestraLeyenda: ["plotësoni ju", "llogarit fleta"],
    comprobar: "Kontrolloni para se të paguani: kalkulatori falas jep të njëjtat shifra. Provoni të njëjtin rast dhe krahasoni.",
    comprobarEnlace: "Shkoni te kalkulatori falas",
    faqTitulo: "Pyetje të shpeshta",
    faq: {
      sheets: {
        pregunta: "A funksionon në Google Sheets dhe në Excel?",
        respuesta: "Po. Është një skedar .xlsx: hapet në Excel dhe në Google Sheets (e ngarkoni në Drive dhe e hapni prej andej). Llogaritjet përdorin formula të zakonshme, pa makro.",
      },
      recibo: {
        pregunta: "Si e marr?",
        respuesta: "Sapo të konfirmohet pagesa, jua dërgojmë me e-mail, me një lidhje shkarkimi që nuk skadon kurrë. Mund ta shkarkoni edhe nga faqja që hapet në fund të pagesës.",
      },
      dolares: {
        pregunta: "A bëhet pagesa në dollarë amerikanë?",
        respuesta: "Po. Çmimi është në dollarë amerikanë (USD) dhe paguani me PayPal, nga llogaria ose me kartë.",
        conReferencia: "Më lart tregojmë një shumë të përafërt në monedhën tuaj me kursin e sotëm, vetëm si orientim: shuma përfundimtare varet nga kursi që përdor banka ose karta.",
        sinReferencia: "Nëse karta është në një monedhë tjetër, konvertimin e bën banka.",
      },
      devolucion: { pregunta: "A mund të marr rimbursim?", respuesta: "Po. Nëse fleta llogaritëse nuk ju shërben, përgjigjuni e-mailit të dërgimit brenda 7 ditëve dhe bëjmë rimbursimin." },
      actualiza: { pregunta: "A përditësohet kur ndryshojnë vlerat zyrtare?", respuesta: "Po. {disparador}, e përditësojmë dhe e njëjta lidhje shkarkon versionin e ri." },
    },
    descargar: "Shkarkoni fletën llogaritëse (.xlsx)",
    abrirInforme: "Hapni raportin",
    fuentes: "Burime zyrtare të përdorura",
    calculadoras: "Funksionon me këta kalkulatorë",
    muestra: "Si duket",
  },
  correo: {
    asuntoInforme: "Blerja juaj në CalcularYa: {titulo}",
    asuntoPlanilla: "{titulo}: shkarkim dhe përditësime",
    mismosNumeros: "Shifrat janë të njëjta si në {enlace}, me të dhënat zyrtare.",
    enlaceCalculadora: "kalkulatori falas CalcularYa",
    comprobante: "Kjo është dëshmia e blerjes suaj në {marca}.",
    informe: {
      encabezado: "Raporti është gati për t'u hapur",
      intro: "Faleminderit për blerjen: {titulo}. E hapni këtu:",
      boton: "Hapni raportin",
      abre: "Hapet në shfletues. Prej andej mund ta printoni ose ta ruani si PDF.",
      guarda: "Ruajeni këtë e-mail",
      vence: "Lidhja është e juaja dhe nuk skadon kurrë. Raporti përdor vlerat zyrtare në fuqi në ditën e blerjes, ndërsa të dhënat mund t'i korrigjoni dhe ta printoni përsëri kur të doni.",
      devolucion: "Nëse raporti nuk ju shërben, përgjigjuni këtij e-maili brenda 7 ditëve dhe bëjmë rimbursimin.",
      ayuda: "Keni ndonjë problem? Përgjigjuni këtij e-maili ose na shkruani te {contacto}.",
    },
    planilla: {
      encabezado: "Fleta llogaritëse është gati",
      intro: "Faleminderit për blerjen: {titulo}. E shkarkoni këtu:",
      boton: "Shkarkoni fletën llogaritëse (.xlsx)",
      abre: "Hapet në Excel dhe në Google Sheets.",
      guarda: "Ruajeni këtë e-mail",
      vence: "Lidhja është e juaja dhe nuk skadon kurrë. {disparador}, e përditësojmë fletën llogaritëse dhe e njëjta lidhje ju jep versionin aktual. Nuk keni nevojë të paguani përsëri.",
      devolucion: "Nëse fleta llogaritëse nuk ju shërben, përgjigjuni këtij e-maili brenda 7 ditëve dhe bëjmë rimbursimin.",
      ayuda: "Keni ndonjë problem? Përgjigjuni këtij e-maili ose na shkruani te {contacto}.",
    },
  },
};
