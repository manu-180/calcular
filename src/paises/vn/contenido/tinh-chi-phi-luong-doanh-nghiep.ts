import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "vn.tinh-chi-phi-luong-doanh-nghiep",
  h1: "Tính chi phí lương doanh nghiệp phải trả {{anio}}",
  title: "Chi phí lương doanh nghiệp {{anio}}: BHXH, BHYT, công đoàn",
  description: "Một nhân viên tốn bao nhiêu mỗi tháng? Cộng BHXH, TNLĐ, BHYT {{vn.bhyt-dn}}, BHTN {{vn.bhtn-dn}} và công đoàn {{vn.cong-doan}} vào lương gross để biết tổng chi phí.",
  intro: [
    "Ngoài lương gross, doanh nghiệp đóng thêm {{vn.bhxh-huu-tri-dn}} vào quỹ hưu trí, {{vn.bhxh-om-dau-dn}} vào quỹ ốm đau và thai sản, {{vn.tnld-dn}} vào quỹ tai nạn lao động, {{vn.bhyt-dn}} bảo hiểm y tế, {{vn.bhtn-dn}} bảo hiểm thất nghiệp và {{vn.cong-doan}} kinh phí công đoàn.",
    "Nhập mức lương và số nhân viên để lập ngân sách nhân sự trước khi tuyển dụng.",
  ],
  comoSeCalcula: [
    "BHXH, TNLĐ, BHYT và công đoàn tính trên lương đóng bảo hiểm, tối đa {{vn.he-so-tran-bhxh}} lần mức tham chiếu {{vn.muc-tham-chieu}}.",
    "BHTN tính trên lương tháng, tối đa {{vn.he-so-tran-bhtn}} lần lương tối thiểu tháng của vùng.",
    "Tổng chi phí bằng lương gross cộng các khoản đóng thêm, rồi nhân với số nhân viên.",
    "Công cụ dùng mức đóng bình thường {{vn.tnld-dn}} cho quỹ tai nạn lao động. Doanh nghiệp ngành rủi ro cao đủ điều kiện có thể được áp dụng mức thấp hơn theo Nghị định số 58/2020/NĐ-CP.",
  ],
  ejemplo: [
    "Lương 30.000.000 ₫ ở vùng I. Doanh nghiệp đóng thêm 5.100.000 ₫ BHXH, 150.000 ₫ TNLĐ, 900.000 ₫ BHYT, 300.000 ₫ BHTN và 600.000 ₫ công đoàn, tổng cộng 7.050.000 ₫. Chi phí thực là 37.050.000 ₫ mỗi tháng.",
  ],
  faq: [
    {
      pregunta: "Doanh nghiệp đóng bao nhiêu phần trăm BHXH?",
      respuesta: "Điều 34 Luật Bảo hiểm xã hội số 41/2024/QH15 quy định {{vn.bhxh-om-dau-dn}} vào quỹ ốm đau và thai sản, {{vn.bhxh-huu-tri-dn}} vào quỹ hưu trí và tử tuất. Mức tai nạn lao động nằm ở Nghị định số 58/2020/NĐ-CP.",
    },
    {
      pregunta: "Kinh phí công đoàn có bắt buộc không?",
      respuesta: "Có. Điểm b khoản 1 Điều 29 Luật Công đoàn số 50/2024/QH15 quy định doanh nghiệp đóng {{vn.cong-doan}} quỹ tiền lương làm căn cứ đóng bảo hiểm xã hội bắt buộc.",
    },
    {
      pregunta: "BHYT doanh nghiệp đóng bao nhiêu?",
      respuesta: "Điểm a khoản 1 Điều 6 Nghị định số 188/2025/NĐ-CP quy định tổng mức 4,5%, trong đó doanh nghiệp đóng hai phần ba, tức {{vn.bhyt-dn}}, và người lao động đóng một phần ba.",
    },
  ],
  glosario: [
    { termino: "Quỹ lương đóng BHXH", definicion: "Tổng tiền lương làm căn cứ đóng bảo hiểm xã hội bắt buộc của toàn bộ người lao động." },
    { termino: "TNLĐ, BNN", definicion: "Tai nạn lao động, bệnh nghề nghiệp. Quỹ này do người sử dụng lao động đóng." },
  ],
});
