import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosVi: TextosUi<UiRendimientoInversion> = {
  slug: "tinh-roi",
  ui: () => ({
    inicial: "Tiền gốc đầu tư",
    final: "Giá trị cuối",
    finalAyuda: "Giá trị hiện tại của khoản đầu tư, hoặc số tiền bạn nhận được khi bán.",
    cobrado: "Khoản đã nhận trong thời gian đầu tư (không bắt buộc)",
    cobradoAyuda: "Cổ tức, tiền lãi hoặc tiền cho thuê bạn đã nhận và không tái đầu tư.",
    anios: "Thời gian đầu tư (năm)",
    aniosAyuda: "Có thể nhập số thập phân cho năm lẻ, ví dụ một năm rưỡi.",
    ganancia: "Lợi nhuận",
    roi: "Tỷ suất lợi nhuận tổng (ROI)",
    cagr: "Tỷ suất lợi nhuận mỗi năm (CAGR)",
    cagrAyuda: "Tỷ suất hằng năm cho cùng kết quả nếu được ghép lãi qua từng năm.",
    errorInicial: "Nhập số tiền gốc bạn đã đầu tư.",
    observacionCorto:
      "Với thời gian dưới một năm, tỷ suất hằng năm giả định kết quả ngắn hạn đó lặp lại suốt cả năm. Hãy đọc con số này thận trọng.",
    observacionInflacion: "Để biết sức mua của bạn có tăng hay không, hãy so sánh tỷ suất mỗi năm với lạm phát trong cùng giai đoạn.",
  }),
};
