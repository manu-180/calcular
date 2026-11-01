import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosVi: TextosUi<UiMetaDeAhorro> = {
  slug: "muc-tieu-tiet-kiem",
  ui: () => ({
    meta: "Mục tiêu tiết kiệm của bạn",
    actual: "Số tiền đã tiết kiệm (không bắt buộc)",
    meses: "Thời gian để đạt mục tiêu (tháng)",
    rendimiento: "Lãi suất hoặc lợi suất mỗi năm (%, không bắt buộc)",
    rendimientoAyuda: "Nếu tiền được gửi vào tài khoản hoặc khoản đầu tư có sinh lãi. Để trống nếu không có lãi.",
    aporteMensual: "Số tiền cần tiết kiệm mỗi tháng",
    aporteSemanal: "Hoặc mỗi tuần",
    totalAportado: "Tổng tiền bạn đã gửi",
    intereses: "Tiền lãi nhận được",
    errorMeta: "Nhập mục tiêu tiết kiệm của bạn.",
    yaLlegas: "Số tiền tiết kiệm hiện tại đã đủ để đạt mục tiêu trong thời gian đó mà không cần gửi thêm.",
  }),
};
