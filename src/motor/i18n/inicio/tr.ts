import { GRAMATICA } from "../gramatica";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.tr;

// Turco con «siz», el registro de los bancos y de e-Devlet (ADR 0002, D12).
const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Şu an ${g.en(pais)} görünüyorsunuz`,
    resumen: (calculadoras) => `Güncel resmî değerlerle ${calculadoras}.`,
    ultimoDato: "Yüklenen son veri",
    ir: (pais) => `${pais} sayfasına gidin`,
    otro: "Başka bir ülke seçin",
    argentina: "Hesaplama araçlarınız calcular.ar adresinde, Arjantin'in resmî verileriyle.",
    argentinaIr: "calcular.ar'a gidin",
    neutroTitulo: (paises) => `Her biri kendi mevzuatı ve para birimiyle ${paises} ülke`,
    neutroTexto: "Resmî kaynakları her gün kontrol ediyoruz.",
    neutroIr: "Ülkeleri görün",
  },
  selector: {
    buscar: "Ülke arayın",
    sinResultados: (q) => `“${q}” ile eşleşen ülke yok`,
    ubicacion: "Bulunduğunuz yer",
    mismaCalculadora: "Aynı hesaplama aracı",
    paises: "Ülkeler",
  },
  aviso: { mismaCalculadora: (pais) => `${g.para(pais)} verilerle hesaplayın` },
  vivo: {
    titulo: "Otomatik güncellenen resmî veriler",
    vigilado: "Otomatik bir süreç resmî kaynakları her gün kontrol eder. Kural değişiklikleri biz doğruladıktan sonra yürürlüğe girer.",
    sinVigilar: "Her değerin resmî bir kaynağı ve kontrol ettiğimiz bir tarihi vardır.",
    verificado: "Son kural kontrolü",
    automatico: "Son otomatik veri",
    fuentes: "Resmî kaynaklar",
    nFuentes: (n) => `${n} resmî belge`,
    verFuentes: "Kaynakları görün",
    verNovedades: "Güncellemeleri görün",
    hoy: "bugün",
    ayer: "dün",
    elDia: (fecha) => fecha,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Veriler resmî kaynaklarla karşılaştırıldı. Kontrol tarihi: ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}: güncelleme ${cuando}, son veri kaynağı ${organismo}.`,
    diario: "Resmî kaynakları her gün otomatik olarak kontrol ediyoruz.",
    actualizado: "Güncellendi",
  },
  novedades: {
    pildora: "Güncellemeler",
    titulo: (pais) => `${g.para(pais)} resmî veri değişiklikleri`,
    acento: "değiştiği gün",
    bajada: "Hesaplama araçlarına giren her yeni rakam burada kayıtlıdır: ne değişti, ne zaman yürürlüğe girdi ve nereden geldi.",
    ultimoCambio: "Son değişiklik",
    revision: "Kaynak kontrolü",
    diaria: "Her gün",
    porNorma: "Her yeni düzenlemede",
    siguiendo: "Takip ettiğimiz kaynaklar",
    masOrganismos: (n) => `ve ${n} kurum daha`,
    proximos: "Açıklandı, yakında yürürlükte",
    proximosTexto: "Yüklenmiş olan ve önümüzdeki günlerde yürürlüğe girecek resmî değerler.",
    registro: "Değişiklik kaydı",
    rss: "RSS ile takip edin",
    vacio: "Bu ülke için henüz kayıtlı bir değişiklik yok.",
    etiqueta: { editorial: "Düzenleme", dato: "Yeni rakam", proximo: "Yakında", serie: "Otomatik", revision: "Kontrol" },
    rige: (fecha) => `Yürürlük: ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `Yürürlük: ${desde} ile ${hasta} arası`,
    antes: (valor, fecha) => `Önceki değer: ${valor} (${fecha})`,
    revisados: (n) => `${n} rakamı resmî kaynaklarla karşılaştırdık`,
    revisadosTexto: (organismos) => `Geçerli değerler şu kaynaklarla teyit edildi: ${organismos}.`,
    verDatos: (n) => (n === 1 ? "Rakamı görün" : `${n} rakamı görün`),
    calculadoras: "Kullanan araçlar",
    rango: (min, max, zonas) => `bölgeye göre ${min} ile ${max} arası (${zonas} bölge)`,
    tabla: (filas) => `${filas} dilimli tablo`,
    valores: (n) => `${n} değer`,
    pasosTitulo: "Veriler nasıl güncel kalıyor",
    pasos: [
      { titulo: "Kurum yayımlar", texto: "Düzenleme, endeks ya da kur resmî kaynakta yayımlanır." },
      { titulo: "Kullanmadan önce kontrol edilir", texto: "Endeks ve kurlar, değer aralığı kontrolüyle otomatik olarak gelir. Kurallar, resmî belgesi elimizdeyken yüklenir." },
      { titulo: "Hesaplama aracı güncellenir", texto: "Araç yeni rakama geçer ve değişiklik kaynağıyla birlikte burada kayıt altına alınır." },
    ],
    feedTitulo: (pais) => `CalcularYa'da ${g.para(pais)} güncellemeler`,
    feedSubtitulo: (pais) => `${g.para(pais)} hesaplama araçlarının kullandığı resmî verilerdeki değişiklikler; yürürlük tarihleri ve kaynaklarıyla.`,
  },
};

export const tr: Diccionario<TextosInicio> = { base };
