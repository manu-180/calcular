import { GRAMATICA } from "../gramatica";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.vi;

// Vietnamita con «bạn», el registro de los servicios digitales del país (ADR 0002, D37).
const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Bạn đang ở ${g.nombre(pais)}`,
    resumen: (calculadoras) => `${calculadoras} với giá trị chính thức đang áp dụng.`,
    ultimoDato: "Dữ liệu mới nhất đã tải",
    ir: (pais) => `Đến ${g.nombre(pais)}`,
    otro: "Chọn quốc gia khác",
    argentina: "Công cụ tính dành cho bạn có tại calcular.ar, với dữ liệu chính thức của Argentina.",
    argentinaIr: "Mở calcular.ar",
    neutroTitulo: (paises) => `${paises} quốc gia, mỗi quốc gia có luật pháp và đơn vị tiền tệ riêng`,
    neutroTexto: "Chúng tôi kiểm tra nguồn chính thức hằng ngày.",
    neutroIr: "Xem các quốc gia",
  },
  selector: {
    buscar: "Tìm quốc gia",
    sinResultados: (q) => `Không có quốc gia nào khớp với “${q}”`,
    ubicacion: "Vị trí hiện tại",
    mismaCalculadora: "Cùng công cụ tính",
    paises: "Quốc gia",
  },
  aviso: { mismaCalculadora: (pais) => `Tính theo dữ liệu ${g.de(pais)}` },
  vivo: {
    titulo: "Dữ liệu chính thức, tự động cập nhật",
    vigilado: "Một quy trình tự động kiểm tra nguồn chính thức hằng ngày. Thay đổi về quy định chỉ được áp dụng sau khi chúng tôi xác minh.",
    sinVigilar: "Mỗi giá trị đều có nguồn chính thức và ngày chúng tôi kiểm tra.",
    verificado: "Lần kiểm tra quy định gần nhất",
    automatico: "Dữ liệu tự động gần nhất",
    fuentes: "Nguồn chính thức",
    nFuentes: (n) => `${n} văn bản chính thức`,
    verFuentes: "Xem nguồn",
    verNovedades: "Xem cập nhật",
    hoy: "hôm nay",
    ayer: "hôm qua",
    elDia: (fecha) => `vào ${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Dữ liệu được đối chiếu với nguồn chính thức vào ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}: cập nhật ${cuando}, với dữ liệu mới nhất từ ${organismo}.`,
    diario: "Chúng tôi tự động kiểm tra nguồn chính thức hằng ngày.",
    actualizado: "Cập nhật",
  },
  novedades: {
    pildora: "Cập nhật",
    titulo: (pais) => `Thay đổi về dữ liệu chính thức ${g.de(pais)}`,
    acento: "ngay trong ngày thay đổi",
    bajada: "Mỗi con số mới được đưa vào công cụ tính đều được ghi lại ở đây: thay đổi gì, áp dụng khi nào và đến từ đâu.",
    ultimoCambio: "Thay đổi gần nhất",
    revision: "Kiểm tra nguồn",
    diaria: "Hằng ngày",
    porNorma: "Mỗi khi có quy định mới",
    siguiendo: "Nguồn chúng tôi theo dõi",
    masOrganismos: (n) => `và ${n} cơ quan khác`,
    proximos: "Đã công bố, sắp áp dụng",
    proximosTexto: "Các giá trị chính thức đã được tải và sẽ áp dụng trong vài ngày tới.",
    registro: "Nhật ký thay đổi",
    rss: "Theo dõi qua RSS",
    vacio: "Chưa có thay đổi nào được ghi lại cho quốc gia này.",
    etiqueta: { editorial: "Quy định", dato: "Số mới", proximo: "Sắp áp dụng", serie: "Tự động", revision: "Kiểm tra" },
    rige: (fecha) => `Áp dụng từ ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `Áp dụng từ ${desde} đến ${hasta}`,
    antes: (valor, fecha) => `Trước đó: ${valor} (${fecha})`,
    revisados: (n) => `Chúng tôi đã kiểm tra ${n} con số với nguồn chính thức`,
    revisadosTexto: (organismos) => `Các giá trị đang áp dụng đã được xác nhận với ${organismos}.`,
    verDatos: (n) => (n === 1 ? "Xem con số" : `Xem ${n} con số`),
    calculadoras: "Được dùng bởi",
    rango: (min, max, zonas) => `từ ${min} đến ${max} tùy khu vực (${zonas} khu vực)`,
    tabla: (filas) => `bảng gồm ${filas} bậc`,
    valores: (n) => `${n} giá trị`,
    pasosTitulo: "Cách giữ dữ liệu luôn mới",
    pasos: [
      { titulo: "Cơ quan công bố", texto: "Quy định, chỉ số hoặc tỷ giá được đăng trên nguồn chính thức." },
      { titulo: "Kiểm tra trước khi dùng", texto: "Chỉ số và tỷ giá được đưa vào tự động, kèm kiểm tra khoảng giá trị. Quy định được nhập khi đã có văn bản chính thức trong tay." },
      { titulo: "Công cụ tính được cập nhật", texto: "Công cụ tính chuyển sang con số mới, và thay đổi được ghi lại ở đây kèm nguồn." },
    ],
    feedTitulo: (pais) => `Cập nhật dữ liệu ${g.de(pais)} trên CalcularYa`,
    feedSubtitulo: (pais) => `Thay đổi về dữ liệu chính thức mà công cụ tính ${g.para(pais)} sử dụng, kèm ngày áp dụng và nguồn.`,
  },
};

export const vi: Diccionario<TextosInicio> = { base };
