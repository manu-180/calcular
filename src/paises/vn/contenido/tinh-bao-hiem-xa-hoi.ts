import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "vn.tinh-bao-hiem-xa-hoi",
  h1: "Tính tiền đóng bảo hiểm xã hội {{anio}}",
  title: "Tính bảo hiểm xã hội {{anio}}: BHXH, BHYT, BHTN bắt buộc",
  description: "Tính phần bạn và doanh nghiệp đóng BHXH, BHYT, BHTN. Trần đóng BHXH bằng {{vn.he-so-tran-bhxh}} lần mức tham chiếu {{vn.muc-tham-chieu}}.",
  intro: [
    "Mỗi tháng bạn đóng {{vn.bhxh-nld}} BHXH, {{vn.bhyt-nld}} BHYT và {{vn.bhtn-nld}} BHTN. Doanh nghiệp đóng phần lớn hơn, nên tổng số nộp cao hơn nhiều so với dòng trừ trên phiếu lương.",
    "Mức tham chiếu hiện là {{vn.muc-tham-chieu}} (từ {{vn.muc-tham-chieu#desde}}), nên trần đóng BHXH đã tăng so với trước.",
  ],
  comoSeCalcula: [
    "Căn cứ đóng BHXH và BHYT là lương đóng bảo hiểm, tối đa {{vn.he-so-tran-bhxh}} lần mức tham chiếu.",
    "Căn cứ đóng BHTN là lương tháng, tối đa {{vn.he-so-tran-bhtn}} lần lương tối thiểu tháng của vùng, ví dụ {{vn.lttv-thang@vung-1}} ở vùng I.",
    "Phần của bạn: {{vn.bhxh-nld}} + {{vn.bhyt-nld}} + {{vn.bhtn-nld}}. Phần doanh nghiệp: {{vn.bhxh-huu-tri-dn}} + {{vn.bhxh-om-dau-dn}} + {{vn.tnld-dn}} + {{vn.bhyt-dn}} + {{vn.bhtn-dn}}.",
  ],
  ejemplo: [
    "Lương đóng 20.000.000 ₫ ở vùng I. Bạn đóng 2.100.000 ₫. Doanh nghiệp đóng 4.300.000 ₫. Tổng số nộp cho cơ quan bảo hiểm là 6.400.000 ₫ mỗi tháng.",
  ],
  faq: [
    {
      pregunta: "Lương đóng BHXH gồm những khoản nào?",
      respuesta: "Theo điểm b khoản 1 Điều 31 Luật số 41/2024/QH15, gồm mức lương theo công việc hoặc chức danh, phụ cấp lương và các khoản bổ sung được thỏa thuận trả thường xuyên, ổn định trong mỗi kỳ trả lương.",
    },
    {
      pregunta: "Mức đóng BHTN năm nay có đổi không?",
      respuesta: "Luật Việc làm số 74/2025/QH15 quy định tối đa 1%. Điều 4 Nghị định số 374/2025/NĐ-CP đặt mức {{vn.bhtn-nld}} cho người lao động và {{vn.bhtn-dn}} cho doanh nghiệp từ {{vn.bhtn-nld#desde}}.",
    },
    {
      pregunta: "Mức tham chiếu là bao nhiêu?",
      respuesta: "Khoản 13 Điều 141 Luật Bảo hiểm xã hội quy định khi chưa bãi bỏ lương cơ sở thì mức tham chiếu bằng lương cơ sở. Điều 3 Nghị định số 161/2026/NĐ-CP đặt lương cơ sở {{vn.muc-tham-chieu}} từ {{vn.muc-tham-chieu#desde}}.",
    },
  ],
  glosario: [
    { termino: "BHXH", definicion: "Bảo hiểm xã hội, gồm quỹ ốm đau và thai sản, quỹ hưu trí và tử tuất." },
    { termino: "BHYT", definicion: "Bảo hiểm y tế." },
    { termino: "BHTN", definicion: "Bảo hiểm thất nghiệp." },
  ],
});
