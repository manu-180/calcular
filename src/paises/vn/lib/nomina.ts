import { aplicarEscalaMarginal, porcentaje, porRegion } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

// Lo que comparten el paso de gross a net, el de net a gross, el costo de la empresa y el desglose de aportes.
export const REQUISITOS_BH = {
  "vn.muc-tham-chieu": "numero",
  "vn.he-so-tran-bhxh": "numero",
  "vn.he-so-tran-bhtn": "numero",
  "vn.lttv-thang": "numero-por-region",
  "vn.bhxh-nld": "numero",
  "vn.bhyt-nld": "numero",
  "vn.bhtn-nld": "numero",
} as const;

export const REQUISITOS_THUE = {
  "vn.bieu-tncn": "escala",
  "vn.giam-tru-ban-than": "numero",
  "vn.giam-tru-phu-thuoc": "numero",
} as const;

export interface ThamSoTran {
  "vn.muc-tham-chieu": number;
  "vn.he-so-tran-bhxh": number;
  "vn.he-so-tran-bhtn": number;
  "vn.lttv-thang": Readonly<Record<string, number>>;
}

export interface ThamSoBaoHiem extends ThamSoTran {
  "vn.bhxh-nld": number;
  "vn.bhyt-nld": number;
  "vn.bhtn-nld": number;
}

export interface ThamSoThue {
  "vn.bieu-tncn": readonly FilaEscala[];
  "vn.giam-tru-ban-than": number;
  "vn.giam-tru-phu-thuoc": number;
}

// Điều 31 Luật BHXH y khoản 2 Điều 34 Luật Việc làm: BHXH y BHYT topan en 20 veces el mức tham chiếu,
// BHTN en 20 veces el mínimo de la región. El piso del mức tham chiếu no se aplica acá: un sueldo menor
// no se puede pactar a jornada completa porque el mínimo regional es más alto.
export function canCuDong(luongDong: number, vung: string | null, v: ThamSoTran) {
  const tranBhxh = v["vn.muc-tham-chieu"] * v["vn.he-so-tran-bhxh"];
  const tranBhtn = porRegion(v["vn.lttv-thang"], vung) * v["vn.he-so-tran-bhtn"];
  return { canCuBhxh: Math.min(luongDong, tranBhxh), canCuBhtn: Math.min(luongDong, tranBhtn), tranBhxh, tranBhtn };
}

export function baoHiemNguoiLaoDong(luongDong: number, vung: string | null, v: ThamSoBaoHiem) {
  const { canCuBhxh, canCuBhtn, tranBhxh, tranBhtn } = canCuDong(luongDong, vung, v);
  const bhxh = porcentaje(canCuBhxh, v["vn.bhxh-nld"]);
  const bhyt = porcentaje(canCuBhxh, v["vn.bhyt-nld"]);
  const bhtn = porcentaje(canCuBhtn, v["vn.bhtn-nld"]);
  return { bhxh, bhyt, bhtn, tong: bhxh + bhyt + bhtn, canCuBhxh, canCuBhtn, tranBhxh, tranBhtn };
}

export function thueThang(thuNhapTruocGiamTru: number, phuThuoc: number, v: ThamSoThue) {
  const giamTru = v["vn.giam-tru-ban-than"] + phuThuoc * v["vn.giam-tru-phu-thuoc"];
  const tinhThue = Math.max(0, thuNhapTruocGiamTru - giamTru);
  return { giamTru, tinhThue, thue: aplicarEscalaMarginal(v["vn.bieu-tncn"], tinhThue) };
}

export function grossSangNet(gross: number, luongDong: number | null, vung: string | null, phuThuoc: number, v: ThamSoBaoHiem & ThamSoThue) {
  const bh = baoHiemNguoiLaoDong(luongDong ?? gross, vung, v);
  const t = thueThang(gross - bh.tong, phuThuoc, v);
  return { ...bh, ...t, net: gross - bh.tong - t.thue };
}

// El net sube siempre con el gross: alcanza con buscar por mitades hasta un centavo de đồng.
export function netSangGross(net: number, vung: string | null, phuThuoc: number, v: ThamSoBaoHiem & ThamSoThue): number {
  let bajo = net;
  let alto = net * 2 + 100000000;
  for (let i = 0; i < 80 && alto - bajo > 0.01; i++) {
    const medio = (bajo + alto) / 2;
    if (grossSangNet(medio, null, vung, phuThuoc, v).net < net) bajo = medio;
    else alto = medio;
  }
  return alto;
}
