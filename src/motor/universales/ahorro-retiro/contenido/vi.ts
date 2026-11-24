import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 60, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 60, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  return {
    h1: "Công cụ tính tiết kiệm hưu trí",
    title: tituloQueEntre(`Tính tiết kiệm hưu trí ${ctx.nombrePais}`, "Công cụ tính tiết kiệm hưu trí", "Tính tiết kiệm hưu trí"),
    description:
      "Xem bạn có thể tích lũy bao nhiêu cho hưu trí với số tiền góp mỗi tháng và khoản đó mang lại thu nhập bao nhiêu mỗi tháng, theo giá trị tiền hôm nay.",
    intro: [
      "Lương hưu từ bảo hiểm xã hội hoặc nơi làm việc thường không đủ để giữ mức sống hiện tại. Tiết kiệm hưu trí cá nhân, dù nhỏ, tạo khác biệt lớn nếu bắt đầu sớm.",
      "Nhập tuổi của bạn, tuổi muốn nghỉ hưu, số tiền đã có và số tiền góp mỗi tháng. Bạn sẽ thấy số tiền khi nghỉ hưu và khoản có thể rút mỗi tháng.",
    ],
    comoSeCalcula: [
      "Số tiền tăng mỗi tháng theo lợi suất thực, tức lợi suất sau khi trừ lạm phát. Nhờ vậy kết quả luôn theo giá trị tiền hôm nay.",
      "Khi nghỉ hưu, số tiền được chia thành các khoản bằng nhau mỗi tháng trong số năm bạn chọn. Phần còn lại vẫn tiếp tục sinh lời trong thời gian đó.",
      "Chưa tính lương hưu từ bảo hiểm xã hội, thuế và chi phí đầu tư.",
    ],
    ejemplo: [
      `Với ${m(actual)} ở tuổi 30 và góp ${m(aporte)} mỗi tháng, lợi suất thực 4%, bạn có ${m(capital30)} ở tuổi 60. Khoản này mang lại ${m(rentaMensual(capital30, 4, 25))} mỗi tháng trong 25 năm.`,
      `Nếu đến tuổi 40 mới bắt đầu với cùng các con số, bạn chỉ có ${m(capital40)}. Chênh lệch mười năm tạo khác biệt rất lớn.`,
    ],
    faq: [
      {
        pregunta: "Lợi suất thực là gì?",
        respuesta: "Là lợi nhuận đầu tư sau khi trừ lạm phát. Nếu khoản đầu tư sinh lời 7% và lạm phát 3%, lợi suất thực khoảng 4%.",
      },
      {
        pregunta: "Khoản này có thay thế lương hưu từ bảo hiểm xã hội không?",
        respuesta: "Không. Đây là khoản tiền cá nhân, nằm ngoài lương hưu từ bảo hiểm xã hội hoặc chương trình hưu trí của công ty. Để ước tính lương hưu chính thức, hãy hỏi cơ quan quản lý chương trình đó.",
      },
      {
        pregunta: "Nên tiết kiệm bao nhiêu cho hưu trí?",
        respuesta: "Không có con số nào phù hợp với mọi người. Mức tham khảo phổ biến là từ 10% đến 15% thu nhập. Điều quan trọng nhất là bắt đầu càng sớm càng tốt.",
      },
    ],
    glosario: [
      { termino: "Lợi suất thực", definicion: "Lợi nhuận đầu tư sau khi trừ lạm phát." },
      { termino: "Giá trị tiền hôm nay", definicion: "Số tiền trong tương lai được quy về sức mua hiện tại." },
    ],
  };
};
