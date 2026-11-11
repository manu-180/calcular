import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `Nam 35 tuổi, nặng 180 lb, cao 5 ft 10 in có tỷ lệ trao đổi chất cơ bản khoảng ${n(basal)} kcal.`,
          `Nếu ít vận động, người này giữ cân với khoảng ${n(basal * FACTORES.sedentaria)} kcal mỗi ngày.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `Nữ 30 tuổi, nặng 60 kg, cao 165 cm có tỷ lệ trao đổi chất cơ bản khoảng ${n(basal)} kcal.`,
          `Nếu vận động vừa, người này giữ cân với khoảng ${n(basal * FACTORES.moderada)} kcal mỗi ngày.`,
        ];
      })();
  return {
    h1: "Công cụ tính calo mỗi ngày",
    title: tituloQueEntre(`Công cụ tính calo mỗi ngày ${ctx.nombrePais}`, `Công cụ tính calo ${ctx.nombrePais}`, "Công cụ tính calo"),
    description: "Tính lượng calo cần mỗi ngày từ tuổi, cân nặng, chiều cao và mức vận động của bạn, để giữ cân, giảm cân hoặc tăng cân.",
    intro: [
      "Nhập thông tin và mức độ vận động của bạn. Bạn sẽ thấy tỷ lệ trao đổi chất cơ bản và lượng calo đốt trong một ngày bình thường.",
      "Đây chỉ là ước tính. Kết quả không thay thế việc khám với bác sĩ hoặc chuyên gia dinh dưỡng.",
    ],
    comoSeCalcula: [
      `Tỷ lệ trao đổi chất cơ bản (Mifflin-St Jeor): 10 × cân nặng theo kg + ${n(6.25, 2)} × chiều cao theo cm − 5 × tuổi, cộng 5 với nam hoặc trừ 161 với nữ.`,
      `Calo duy trì = trao đổi chất cơ bản × hệ số vận động, từ ${n(1.2, 1)} (ít vận động) đến ${n(1.9, 1)} (rất nhiều).`,
      `Để giảm cân, trừ ${DEFICIT} kcal mỗi ngày. Để tăng cân, cộng ${SUPERAVIT} kcal. Thay đổi này vừa phải và có thể duy trì lâu dài.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Tỷ lệ trao đổi chất cơ bản (BMR) là gì?",
        respuesta: "BMR là năng lượng cơ thể dùng khi nghỉ ngơi hoàn toàn, để thở, giữ thân nhiệt và duy trì hoạt động của các cơ quan.",
      },
      {
        pregunta: "Ăn kiêng cần nạp bao nhiêu calo?",
        respuesta: `Điểm khởi đầu phổ biến là khoảng ${DEFICIT} kcal mỗi ngày dưới mức calo duy trì. Bạn nên xác định con số này cùng bác sĩ hoặc chuyên gia dinh dưỡng.`,
      },
      {
        pregunta: "Công thức này chính xác đến đâu?",
        respuesta: "Mifflin-St Jeor là một trong những công thức được dùng nhiều nhất, nhưng kết quả chỉ là mức trung bình. Di truyền, khối cơ và tình trạng sức khỏe đều ảnh hưởng đến lượng calo thực tế được đốt.",
      },
    ],
    glosario: [
      { termino: "Calo (kcal)", definicion: "Đơn vị năng lượng trong thức ăn và trong năng lượng cơ thể đốt." },
      { termino: "Trao đổi chất cơ bản", definicion: "Lượng calo cơ thể đốt khi nghỉ ngơi hoàn toàn." },
    ],
  };
};
