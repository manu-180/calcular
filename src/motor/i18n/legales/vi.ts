import type { DiccionarioLegal } from "./tipos";

// Vietnamita con «bạn» (ADR 0002, D37). Texto propio, frases cortas, sin jerga legal copiada.
export const vi: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "Giới thiệu | CalcularYa",
      description: "CalcularYa xây dựng công cụ tính cho công việc, tài chính và đời sống hằng ngày ở từng quốc gia, với số liệu từ nguồn chính thức.",
      h1: "Giới thiệu",
      bajada: "Công cụ tính cho từng quốc gia, mỗi nơi có dữ liệu chính thức riêng.",
      bloques: [
        {
          parrafos: [
            "CalcularYa là trang công cụ tính cho các phép tính hằng ngày: lương, khoản vay, thuế, ngày tháng và nhiều hơn nữa.",
            "Trang do Manuel Navarro xây dựng, người cũng quản lý calcular.ar, trang công cụ tính dành cho Argentina.",
          ],
        },
        {
          titulo: "Cách chúng tôi làm việc",
          parrafos: [
            "Khi một phép tính phụ thuộc vào quy định (lương tối thiểu, mức đóng hoặc một ngưỡng nào đó), chúng tôi đọc giá trị đó trên nguồn chính thức của quốc gia: công báo, bộ ngành, ngân hàng trung ương hoặc cơ quan thuế.",
            "Chúng tôi lưu liên kết và ngày kiểm tra, rồi hiển thị cả hai bên cạnh mỗi công cụ tính.",
            "Nếu một giá trị không thể xác nhận trên nguồn chính thức, công cụ tính dùng giá trị đó sẽ không được đăng.",
            "Khi quy định thay đổi, công cụ tính cũng thay đổi theo, và thay đổi đó được ghi lại ở trang cập nhật của từng quốc gia.",
          ],
        },
        { titulo: "Miễn phí", parrafos: ["Tất cả công cụ tính đều miễn phí và không cần tài khoản."] },
      ],
    },
    contacto: {
      title: "Liên hệ | CalcularYa",
      description: "Liên hệ với chúng tôi nếu có con số đã hết hiệu lực, kết quả không như mong đợi, hoặc nếu bạn muốn có công cụ tính hay quốc gia mới.",
      h1: "Liên hệ",
      bajada: `Email của chúng tôi: ${mail}.`,
      bloques: [
        {
          parrafos: [
            "Bạn sẽ giúp ích nhiều cho chúng tôi nếu báo về con số đã hết hiệu lực, kết quả không như mong đợi, hoặc công cụ tính và quốc gia chưa có.",
            "Nếu liên quan đến một con số, hãy cho biết quốc gia và trang bạn đã thấy con số đó.",
            "Thư trả lời do người thật viết. Có thể mất vài ngày.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Chính sách bảo mật | CalcularYa",
      description: "Dữ liệu nào CalcularYa sử dụng: thông tin bạn nhập vào công cụ tính được xử lý trên trình duyệt của bạn và chúng tôi không lưu lại.",
      h1: "Chính sách bảo mật",
      bajada: `Cập nhật lần cuối: ${actualizado}.`,
      bloques: [
        {
          titulo: "Thông tin bạn nhập vào công cụ tính",
          parrafos: ["Phép tính chạy trên trình duyệt của bạn. Thông tin bạn nhập không được gửi đến máy chủ nào và chúng tôi không lưu lại."],
        },
        {
          titulo: "Quốc gia của bạn",
          parrafos: [
            "Để gợi ý công cụ tính của đúng quốc gia, chúng tôi xem lượt truy cập của bạn đến từ quốc gia nào. Nhà cung cấp dịch vụ lưu trữ của chúng tôi ước tính thông tin này từ địa chỉ IP của bạn.",
            "Chúng tôi không lưu địa chỉ IP của bạn. Kết quả chỉ được lưu trên trình duyệt của bạn trong thời gian truy cập.",
          ],
        },
        {
          titulo: "Những gì trình duyệt của bạn lưu",
          parrafos: [
            "Bộ nhớ phiên của trình duyệt, bị xóa khi đóng thẻ, ghi nhớ quốc gia của lượt truy cập, việc bạn đã đóng thông báo gợi ý quốc gia đó hay chưa, và mã liên kết nếu bạn đến qua một liên kết được chia sẻ.",
            "Bộ nhớ cục bộ, được giữ lại cho đến khi bạn xóa trong trình duyệt, lưu quốc gia bạn tự chọn, một số ngẫu nhiên để đếm lượt truy cập và phiên bản thử nghiệm thiết kế đang hiển thị cho bạn, để trang trông giống nhau mỗi lần bạn quay lại. Không dữ liệu nào trong số đó cho biết bạn là ai.",
            "Chúng tôi không dùng cookie quảng cáo hoặc cookie theo dõi.",
          ],
        },
        {
          titulo: "Máy chủ của trang",
          parrafos: ["Trang được lưu trữ trên Vercel. Như mọi máy chủ khác, Vercel ghi lại dữ liệu kỹ thuật của mỗi lượt truy cập (địa chỉ IP và trình duyệt) để trang hoạt động và giữ an toàn."],
        },
        {
          titulo: "Cách chúng tôi đếm lượt truy cập",
          parrafos: [
            "Chúng tôi đo lường việc sử dụng trang bằng công cụ của riêng mình: trang được mở và tần suất sử dụng, trang bạn đến từ đó, loại thiết bị và quốc gia của bạn. Số ngẫu nhiên do trình duyệt của bạn lưu giúp phân biệt lượt truy cập mới với lượt quay lại. Chúng tôi không lưu địa chỉ IP của bạn hoặc thông tin bạn nhập vào công cụ tính.",
            "Liên kết được chia sẻ từ trang này mang một mã ngẫu nhiên khác nhau mỗi lần chia sẻ, để chúng tôi đếm được số lượt truy cập đến từ mỗi liên kết. Mã đó không nhận dạng bất kỳ ai.",
            "Số tiền bạn nhập vào công cụ tính không bao giờ rời khỏi trình duyệt của bạn qua liên kết.",
          ],
        },
        {
          titulo: "Thay đổi và câu hỏi",
          parrafos: [
            "Nếu có gì thay đổi (ví dụ chúng tôi thêm quảng cáo), chúng tôi sẽ thông báo trên trang này trước khi áp dụng.",
            `Nếu có câu hỏi về dữ liệu của bạn, hãy gửi email đến ${mail}.`,
          ],
        },
      ],
    },
    terminos: {
      title: "Điều khoản sử dụng | CalcularYa",
      description: "Công cụ tính của CalcularYa đưa ra ước tính theo dữ liệu chính thức đang áp dụng. Kết quả chỉ để tham khảo, không phải tư vấn chuyên môn.",
      h1: "Điều khoản sử dụng",
      bajada: `Cập nhật lần cuối: ${actualizado}.`,
      bloques: [
        {
          titulo: "Công dụng của công cụ tính",
          parrafos: [
            "Kết quả tính là ước tính dựa trên dữ liệu chính thức đang áp dụng. Hãy dùng để tham khảo.",
            "Kết quả này không thay thế phép tính của người sử dụng lao động, kế toán hoặc luật sư, cũng như quy định của cơ quan nhà nước.",
          ],
        },
        {
          titulo: "Nguồn gốc dữ liệu",
          parrafos: [
            "Mỗi công cụ tính hiển thị nguồn chính thức của giá trị và ngày chúng tôi kiểm tra.",
            "Chúng tôi cố gắng giữ dữ liệu luôn mới, nhưng quy định có thể thay đổi trước khi chúng tôi kịp cập nhật.",
          ],
        },
        {
          titulo: "Sử dụng trang",
          parrafos: ["Trang này miễn phí. Bạn được phép sử dụng trang và chia sẻ liên kết. Không được sao chép nội dung với số lượng lớn hoặc mạo danh CalcularYa."],
        },
        {
          titulo: "Trách nhiệm",
          parrafos: ["Chúng tôi không chịu trách nhiệm về các quyết định chỉ dựa trên kết quả từ trang này. Trước khi ký, thanh toán hoặc khiếu nại, hãy xác nhận con số với người hoặc cơ quan có thẩm quyền."],
        },
        { titulo: "Liên hệ", parrafos: [`Email của chúng tôi: ${mail}.`] },
      ],
    },
  },
});
