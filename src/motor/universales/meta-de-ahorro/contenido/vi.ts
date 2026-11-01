import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  return {
    h1: "Công cụ tính tiết kiệm",
    title: tituloQueEntre(`Công cụ tính mục tiêu tiết kiệm ${ctx.nombrePais}`, "Công cụ tính mục tiêu tiết kiệm", "Công cụ tính tiết kiệm"),
    description:
      "Biết cần tiết kiệm bao nhiêu mỗi tháng để đạt mục tiêu đúng hạn, có tính cả số tiền đã có và tiền lãi của bạn.",
    intro: [
      "Du lịch, mua xe, trả trước tiền nhà hay quỹ khẩn cấp. Mục tiêu có số tiền và thời hạn rõ ràng sẽ dễ đạt hơn nhiều.",
      "Nhập số tiền bạn muốn tích lũy và số tháng. Kết quả cho bạn biết cần để dành bao nhiêu mỗi tháng và mỗi tuần.",
    ],
    comoSeCalcula: [
      "Trước hết, tính mức tăng của số tiền bạn đang có đến cuối thời hạn.",
      "Phần còn thiếu được chia thành các khoản gửi hằng tháng bằng nhau.",
      "Nếu tiền tiết kiệm có sinh lãi, mỗi khoản gửi cũng sinh lãi, nên khoản gửi có thể nhỏ hơn một chút.",
    ],
    ejemplo: [
      `Để tích lũy ${m(meta)} trong 24 tháng không tính lãi, bạn cần tiết kiệm ${m(meta / 24)} mỗi tháng.`,
      `Nếu đã có ${m(actual)} và lợi suất 5% mỗi năm, bạn chỉ cần ${m(aporteNecesario(meta, actual, 24, 5))} mỗi tháng.`,
    ],
    faq: [
      {
        pregunta: "Làm sao để tiết kiệm đều đặn?",
        respuesta: "Chuyển tiền ngay khi nhận lương, trước khi chi cho việc khác. Nếu có thể, hãy đặt lệnh chuyển tiền tự động sang một tài khoản tiết kiệm riêng.",
      },
      {
        pregunta: "Nếu khoản gửi hằng tháng quá lớn thì sao?",
        respuesta: "Hãy kéo dài thời gian hoặc giảm mục tiêu. Bạn cũng có thể bắt đầu từ số tiền vừa sức, rồi tăng dần khi thu nhập tăng.",
      },
      {
        pregunta: "Có cần tính đến lạm phát không?",
        respuesta: "Nếu mục tiêu còn vài năm nữa, hãy cộng mức lạm phát ước tính vào số tiền mục tiêu. Món đồ hôm nay giá 100 về sau có thể đắt hơn nhiều.",
      },
    ],
    glosario: [
      { termino: "Khoản gửi", definicion: "Số tiền bạn để dành mỗi tháng cho mục tiêu." },
      { termino: "Lợi suất", definicion: "Phần sinh lời từ khoản tiết kiệm hoặc đầu tư của bạn." },
    ],
  };
};
