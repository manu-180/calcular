import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Công cụ tính chia tiền",
    title: tituloQueEntre(`Công cụ tính chia tiền cho ${ctx.nombrePais}`, "Công cụ tính chia tiền, chia hóa đơn nhóm", "Công cụ tính chia tiền"),
    description: "Chia chi phí chung cho tối đa 8 người: phần của mỗi người và ai trả cho ai, với số lần chuyển khoản ít nhất.",
    intro: [
      "Dùng khi đi du lịch, ăn uống chung, tổ chức sự kiện hoặc thuê chỗ ở chung mà mỗi người trả một số tiền khác nhau.",
      "Nhập số tiền mỗi người đã trả. Bạn sẽ thấy phần của từng người và các khoản chuyển khoản để mọi người huề nhau.",
    ],
    comoSeCalcula: [
      "Phần của mỗi người = tổng chi phí ÷ số người.",
      "Ai trả ít hơn phần của mình thì trả thêm phần chênh lệch. Ai trả nhiều hơn thì nhận lại phần chênh lệch.",
      "Các khoản chuyển khoản đi từ người nợ nhiều nhất đến người được nhận lại nhiều nhất, nên không có lần chuyển nào thừa.",
    ],
    ejemplo: [
      `An trả ${m(a)}, Bình trả ${m(b)}, còn Chi chưa trả gì. Tổng là ${m(a + b)}, nên phần của mỗi người là ${m(cuota)}.`,
      `Chi chuyển ${m(cuota)} cho An, và Bình chuyển ${m(cuota - b)} cho An.`,
    ],
    faq: [
      {
        pregunta: "Cách chia hóa đơn khi mỗi người trả một số tiền khác nhau?",
        respuesta: "Cộng tất cả lại, chia cho số người, rồi so sánh với số tiền mỗi người đã trả. Phần chênh lệch là số tiền phải trả thêm hoặc được nhận lại.",
      },
      {
        pregunta: "Nếu có người chưa trả gì thì sao?",
        respuesta: "Nhập 0 cho người đó để vẫn được tính vào phần chia. Nếu để trống ô, người đó không được tính.",
      },
      {
        pregunta: "Vì sao số lần chuyển khoản ít hơn số người?",
        respuesta: "Các khoản nợ được gộp lại: người nợ nhiều nhất trả cho người đã trả nhiều nhất, và cứ thế tiếp tục. Số lần chuyển khoản không bao giờ vượt quá số người trừ một.",
      },
    ],
    glosario: [
      { termino: "Phần chia", definicion: "Số tiền mỗi người cần chịu trong tổng chi phí." },
      { termino: "Số dư", definicion: "Chênh lệch giữa số tiền một người đã trả và phần của người đó." },
    ],
  };
};
