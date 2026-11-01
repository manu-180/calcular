import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosVi: TextosUi<UiRitmo> = {
  slug: "tinh-pace-chay-bo",
  ui: () => ({
    calcular: "Bạn muốn tính gì?",
    calcRitmo: "Pace (từ quãng đường và thời gian)",
    calcTiempo: "Thời gian (từ quãng đường và pace)",
    calcDistancia: "Quãng đường (từ thời gian và pace)",
    distancia: "Quãng đường",
    distanciaAyuda: "Chọn cự ly thi đấu, hoặc “Cự ly khác” để tự nhập.",
    otra: "Cự ly khác",
    cincoK: "5K",
    diezK: "10K",
    media: "Bán marathon",
    maraton: "Marathon",
    distanciaOtra: (u) => `Cự ly khác (${u})`,
    horas: "Thời gian: giờ",
    minutos: "Thời gian: phút",
    segundos: "Thời gian: giây",
    ritmoMin: (u) => `Pace: số phút mỗi ${u}`,
    ritmoSeg: "Pace: giây",
    ritmo: (u) => `Pace (phút/${u})`,
    tiempo: "Thời gian hoàn thành",
    distanciaRes: (u) => `Quãng đường (${u})`,
    velocidad: (u) => `Tốc độ trung bình (${u})`,
    errorDistancia: "Nhập quãng đường lớn hơn 0.",
    errorTiempo: "Nhập thời gian: giờ, phút hoặc giây.",
    errorRitmo: "Nhập pace: số phút và giây trên mỗi đơn vị quãng đường.",
  }),
};
