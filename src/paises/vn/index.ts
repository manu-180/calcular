import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import tinhLuongGrossNet from "./calculadoras/tinh-luong-gross-net";
import contenidoTinhLuongGrossNet from "./contenido/tinh-luong-gross-net";
import tinhLuongNetSangGross from "./calculadoras/tinh-luong-net-sang-gross";
import contenidoTinhLuongNetSangGross from "./contenido/tinh-luong-net-sang-gross";
import tinhThueTncn from "./calculadoras/tinh-thue-tncn";
import contenidoTinhThueTncn from "./contenido/tinh-thue-tncn";
import tinhGiamTruGiaCanh from "./calculadoras/tinh-giam-tru-gia-canh";
import contenidoTinhGiamTruGiaCanh from "./contenido/tinh-giam-tru-gia-canh";
import tinhBaoHiemXaHoi from "./calculadoras/tinh-bao-hiem-xa-hoi";
import contenidoTinhBaoHiemXaHoi from "./contenido/tinh-bao-hiem-xa-hoi";
import tinhChiPhiLuongDoanhNghiep from "./calculadoras/tinh-chi-phi-luong-doanh-nghiep";
import contenidoTinhChiPhiLuongDoanhNghiep from "./contenido/tinh-chi-phi-luong-doanh-nghiep";
import luongToiThieuVung from "./calculadoras/luong-toi-thieu-vung";
import contenidoLuongToiThieuVung from "./contenido/luong-toi-thieu-vung";
import tinhBaoHiemThatNghiep from "./calculadoras/tinh-bao-hiem-that-nghiep";
import contenidoTinhBaoHiemThatNghiep from "./contenido/tinh-bao-hiem-that-nghiep";
import tinhTroCapThoiViec from "./calculadoras/tinh-tro-cap-thoi-viec";
import contenidoTinhTroCapThoiViec from "./contenido/tinh-tro-cap-thoi-viec";
import tinhTroCapMatViec from "./calculadoras/tinh-tro-cap-mat-viec";
import contenidoTinhTroCapMatViec from "./contenido/tinh-tro-cap-mat-viec";
import tinhTienThaiSan from "./calculadoras/tinh-tien-thai-san";
import contenidoTinhTienThaiSan from "./contenido/tinh-tien-thai-san";
import tinhLuongHuu from "./calculadoras/tinh-luong-huu";
import contenidoTinhLuongHuu from "./contenido/tinh-luong-huu";
import tinhBhxhMotLan from "./calculadoras/tinh-bhxh-mot-lan";
import contenidoTinhBhxhMotLan from "./contenido/tinh-bhxh-mot-lan";
import tinhTienLamThemGio from "./calculadoras/tinh-tien-lam-them-gio";
import contenidoTinhTienLamThemGio from "./contenido/tinh-tien-lam-them-gio";
import tinhPhepNam from "./calculadoras/tinh-phep-nam";
import contenidoTinhPhepNam from "./contenido/tinh-phep-nam";
import thoiHanBaoTruocNghiViec from "./calculadoras/thoi-han-bao-truoc-nghi-viec";
import contenidoThoiHanBaoTruocNghiViec from "./contenido/thoi-han-bao-truoc-nghi-viec";
import tinhThueGtgt from "./calculadoras/tinh-thue-gtgt";
import contenidoTinhThueGtgt from "./contenido/tinh-thue-gtgt";
import tinhThueHoKinhDoanh from "./calculadoras/tinh-thue-ho-kinh-doanh";
import contenidoTinhThueHoKinhDoanh from "./contenido/tinh-thue-ho-kinh-doanh";
import tinhThueChoThueNha from "./calculadoras/tinh-thue-cho-thue-nha";
import contenidoTinhThueChoThueNha from "./contenido/tinh-thue-cho-thue-nha";
import tinhLePhiTruocBa from "./calculadoras/tinh-le-phi-truoc-ba";
import contenidoTinhLePhiTruocBa from "./contenido/tinh-le-phi-truoc-ba";
import tyGiaUsdVnd from "./calculadoras/ty-gia-usd-vnd";
import contenidoTyGiaUsdVnd from "./contenido/ty-gia-usd-vnd";
import tinhLamPhat from "./calculadoras/tinh-lam-phat";
import contenidoTinhLamPhat from "./contenido/tinh-lam-phat";
import datos from "./datos.json";
import { detectores } from "./fuentes";
import { mercado } from "./mercado";
import { novedades } from "./novedades";
import series from "./series.json";

export default definirPais({
  mercado,
  datos,
  series,
  avisos,
  calculadoras: [
    { definicion: tinhLuongGrossNet, contenido: contenidoTinhLuongGrossNet, cliente: () => import("./calculadoras/tinh-luong-gross-net.cliente") },
    { definicion: tinhLuongNetSangGross, contenido: contenidoTinhLuongNetSangGross, cliente: () => import("./calculadoras/tinh-luong-net-sang-gross.cliente") },
    { definicion: tinhThueTncn, contenido: contenidoTinhThueTncn, cliente: () => import("./calculadoras/tinh-thue-tncn.cliente") },
    { definicion: tinhGiamTruGiaCanh, contenido: contenidoTinhGiamTruGiaCanh, cliente: () => import("./calculadoras/tinh-giam-tru-gia-canh.cliente") },
    { definicion: tinhBaoHiemXaHoi, contenido: contenidoTinhBaoHiemXaHoi, cliente: () => import("./calculadoras/tinh-bao-hiem-xa-hoi.cliente") },
    { definicion: tinhChiPhiLuongDoanhNghiep, contenido: contenidoTinhChiPhiLuongDoanhNghiep, cliente: () => import("./calculadoras/tinh-chi-phi-luong-doanh-nghiep.cliente") },
    { definicion: luongToiThieuVung, contenido: contenidoLuongToiThieuVung, cliente: () => import("./calculadoras/luong-toi-thieu-vung.cliente") },
    { definicion: tinhBaoHiemThatNghiep, contenido: contenidoTinhBaoHiemThatNghiep, cliente: () => import("./calculadoras/tinh-bao-hiem-that-nghiep.cliente") },
    { definicion: tinhTroCapThoiViec, contenido: contenidoTinhTroCapThoiViec, cliente: () => import("./calculadoras/tinh-tro-cap-thoi-viec.cliente") },
    { definicion: tinhTroCapMatViec, contenido: contenidoTinhTroCapMatViec, cliente: () => import("./calculadoras/tinh-tro-cap-mat-viec.cliente") },
    { definicion: tinhTienThaiSan, contenido: contenidoTinhTienThaiSan, cliente: () => import("./calculadoras/tinh-tien-thai-san.cliente") },
    { definicion: tinhLuongHuu, contenido: contenidoTinhLuongHuu, cliente: () => import("./calculadoras/tinh-luong-huu.cliente") },
    { definicion: tinhBhxhMotLan, contenido: contenidoTinhBhxhMotLan, cliente: () => import("./calculadoras/tinh-bhxh-mot-lan.cliente") },
    { definicion: tinhTienLamThemGio, contenido: contenidoTinhTienLamThemGio, cliente: () => import("./calculadoras/tinh-tien-lam-them-gio.cliente") },
    { definicion: tinhPhepNam, contenido: contenidoTinhPhepNam, cliente: () => import("./calculadoras/tinh-phep-nam.cliente") },
    { definicion: thoiHanBaoTruocNghiViec, contenido: contenidoThoiHanBaoTruocNghiViec, cliente: () => import("./calculadoras/thoi-han-bao-truoc-nghi-viec.cliente") },
    { definicion: tinhThueGtgt, contenido: contenidoTinhThueGtgt, cliente: () => import("./calculadoras/tinh-thue-gtgt.cliente") },
    { definicion: tinhThueHoKinhDoanh, contenido: contenidoTinhThueHoKinhDoanh, cliente: () => import("./calculadoras/tinh-thue-ho-kinh-doanh.cliente") },
    { definicion: tinhThueChoThueNha, contenido: contenidoTinhThueChoThueNha, cliente: () => import("./calculadoras/tinh-thue-cho-thue-nha.cliente") },
    { definicion: tinhLePhiTruocBa, contenido: contenidoTinhLePhiTruocBa, cliente: () => import("./calculadoras/tinh-le-phi-truoc-ba.cliente") },
    { definicion: tyGiaUsdVnd, contenido: contenidoTyGiaUsdVnd, cliente: () => import("./calculadoras/ty-gia-usd-vnd.cliente") },
    { definicion: tinhLamPhat, contenido: contenidoTinhLamPhat, cliente: () => import("./calculadoras/tinh-lam-phat.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
