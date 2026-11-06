import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosVi: TextosUi<UiPresupuesto> = {
  slug: "lap-ngan-sach",
  ui: () => ({
    ingreso: "Lương net hằng tháng",
    ingresoAyuda: "Số tiền về tài khoản của bạn mỗi tháng, sau thuế và các khoản khấu trừ.",
    pctNecesidades: "Thiết yếu (%)",
    pctNecesidadesAyuda: "Nhà ở, đi chợ, điện nước, đi lại, sức khỏe và khoản trả nợ tối thiểu.",
    pctGustos: "Mong muốn (%)",
    pctGustosAyuda: "Ăn ngoài, mua sắm không thiết yếu, đăng ký dịch vụ và du lịch.",
    pctAhorro: "Tiết kiệm (%)",
    pctAhorroAyuda: "Quỹ khẩn cấp, mục tiêu tiết kiệm, hưu trí và trả nợ sớm.",
    necesidades: "Cho thiết yếu",
    gustos: "Cho mong muốn",
    ahorro: "Cho tiết kiệm",
    ahorroAnual: "Tiết kiệm trong một năm",
    errorIngreso: "Nhập thu nhập hằng tháng của bạn.",
    errorSuma: (suma) => `Tổng ba tỷ lệ là ${suma}%. Tổng phải bằng 100%.`,
    observacionAhorroBajo: "Tiết kiệm dưới 10% để lại rất ít dư địa cho việc đột xuất. Nếu có thể, hãy giảm bớt phần mong muốn.",
  }),
};
