import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "tr.kidem-tavani-temmuz-2026",
    fecha: "2026-10-24",
    titulo: "Kıdem tazminatı tavanı yükseldi: 73.729,87 TL",
    texto: "1 Temmuz ile 31 Aralık 2026 arasında sona eren iş sözleşmelerinde bir hizmet yılı için ödenecek kıdem tazminatının üst sınırı: 73.729,87 TL. Ocak ile Haziran 2026 arasında tavan 64.948,77 TL idi.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["tr.kidem-tazminati-hesaplama"],
    fuente: {
      organismo: "Çalışma ve Sosyal Güvenlik Bakanlığı",
      titulo: "Kıdem tazminatı tavan miktarları (1980 - 2026)",
      url: "https://www.csgb.gov.tr/Media/ydelgoxf/kidem-tazminati-yillar-1980-2026.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "tr.sgk-2026",
    fecha: "2026-10-24",
    titulo: "SGK işveren payı ve prim tavanı 2026 yılında değişti",
    texto: "7566 sayılı Kanunla 2026 Ocak ayından itibaren malullük, yaşlılık ve ölüm sigortası işveren payı bir puan artarak %12 oldu. İmalat dışındaki sektörlerde Hazine indirimi 2 puana indi (önceden 4 puandı). Prime esas kazanç üst sınırı asgari ücretin 9 katına çıktı: aylık 297.270 TL.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["tr.isveren-maliyeti-hesaplama", "tr.sgk-prim-hesaplama", "tr.brutten-nete-maas-hesaplama"],
    fuente: {
      organismo: "Gelir İdaresi Başkanlığı (Resmî Gazete, 19 Aralık 2025, sayı 33112)",
      titulo: "7566 sayılı Vergi Kanunları ile Bazı Kanun ve Kanun Hükmünde Kararnamelerde Değişiklik Yapılmasına Dair Kanun",
      url: "https://cdn.gib.gov.tr/api/gibportal-file/file/getFile?objectKey=MEVZUAT_MADDE%2FUNIVERSAL%2F2025%2F7566.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "tr.asgari-ucret-2026",
    fecha: "2026-10-24",
    titulo: "2026 asgari ücreti: brüt 33.030 TL, net 28.075,50 TL",
    texto: "1 Ocak 2026 tarihinden itibaren aylık brüt asgari ücret: 33.030 TL. SGK ve işsizlik primi düşüldükten sonra elde kalan net tutar: 28.075,50 TL. Asgari ücrete isabet eden kısımdan gelir ve damga vergisi alınmaz.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["tr.asgari-ucret-hesaplama", "tr.brutten-nete-maas-hesaplama"],
    fuente: {
      organismo: "Çalışma ve Sosyal Güvenlik Bakanlığı",
      titulo: "Asgari ücretin net hesabı ve işverene maliyeti (01/01/2026 - 31/12/2026)",
      url: "https://www.csgb.gov.tr/poco-pages/asgari-ucret/",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "tr.gelir-vergisi-tarifesi-2026",
    fecha: "2026-10-24",
    titulo: "2026 gelir vergisi dilimleri",
    texto: "2026 gelirlerine uygulanan tarifede 190.000 TL'ye kadar olan kısma %15 oranı uygulanır. Ücretlerde %27 oranı 1.500.000 TL'ye, %35 oranı 5.300.000 TL'ye kadar geçerlidir. Bunun üstü için oran %40.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["tr.gelir-vergisi-hesaplama", "tr.brutten-nete-maas-hesaplama"],
    fuente: {
      organismo: "Gelir İdaresi Başkanlığı",
      titulo: "Gelir Vergisi Tarifesi 2026",
      url: "https://cdn.gib.gov.tr/api/gibportal-file/file/getFileResources?objectKey=arsiv%2Fyardim-kaynaklar%2Fyararli-bilgiler%2Fgelir-vergisi-tarifeleri%2Fgelir-vergisi-tarifesi-2026.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
];
