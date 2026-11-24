import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosVi: TextosUi<UiHormigon> = {
  slug: "tinh-be-tong",
  ui: () => ({
    largo: (u) => `Chiều dài (${u})`,
    ancho: (u) => `Chiều rộng (${u})`,
    espesor: (u) => `Độ dày (${u})`,
    espesorAyuda: "Sàn lót hoặc lối đi thường dày 10 cm (4 in). Nhà để xe hoặc đường xe vào, 12 đến 15 cm.",
    margen: "Hao hụt dự phòng (%)",
    margenAyuda: "Dành cho bề mặt không bằng phẳng và vữa rơi vãi. Thường từ 5% đến 10%.",
    bolsa: (u) => `Khối lượng xi măng mỗi bao (${u})`,
    volumen: (u) => `Thể tích chính xác (${u})`,
    volumenTotal: (u) => `Lượng bê tông cần dùng (${u})`,
    volumenPies: "Lượng bê tông cần dùng (ft³)",
    cemento: (u) => `Xi măng (${u})`,
    bolsas: "Số bao xi măng",
    arena: (u) => `Cát (${u})`,
    piedra: (u) => `Đá dăm hoặc sỏi (${u})`,
    agua: (u) => (u === "L" ? "Nước (lít)" : "Nước (gallon)"),
    errorMedida: "Kích thước này phải lớn hơn 0.",
    aviso: "Định mức vật liệu này chỉ để tham khảo cho cấp phối phổ biến 1:2:3 (khoảng 350 kg xi măng mỗi m³). Số liệu thay đổi theo mác bê tông, loại công trình và vật liệu tại chỗ. Hãy kiểm tra lại với thợ cả hoặc đơn vị thi công.",
  }),
};
