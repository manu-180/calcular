import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosVi: TextosUi<UiTasaEfectiva> = {
  slug: "tinh-lai-suat-thuc",
  ui: () => ({
    direccion: "Bạn đang có lãi suất nào?",
    nominalAEfectiva: "Lãi suất danh nghĩa (đổi sang lãi suất thực theo năm)",
    efectivaANominal: "Lãi suất thực theo năm (đổi sang lãi suất danh nghĩa)",
    tasa: "Lãi suất mỗi năm (%)",
    tasaAyuda: "Nhập đúng như ghi trong đề nghị hoặc hợp đồng.",
    capitalizacion: "Kỳ ghép lãi",
    capitalizacionAyuda: "Tần suất cộng tiền lãi vào số dư. Khoản vay và thẻ tín dụng thường ghép lãi hằng tháng.",
    mensual: "Hằng tháng (12 lần mỗi năm)",
    trimestral: "Hằng quý (4 lần mỗi năm)",
    semestral: "Mỗi 6 tháng (2 lần mỗi năm)",
    diaria: "Hằng ngày (365 lần mỗi năm)",
    efectiva: "Lãi suất thực theo năm",
    nominal: "Lãi suất danh nghĩa theo năm",
    periodica: "Lãi suất mỗi kỳ",
    errorNegativa: "Lãi suất không được âm. Nhập số từ 0 trở lên.",
    observacionDiferencia: (puntos) => `Lãi suất thực cao hơn lãi suất danh nghĩa ${puntos} điểm vì tiền lãi cũng sinh lãi.`,
  }),
};
