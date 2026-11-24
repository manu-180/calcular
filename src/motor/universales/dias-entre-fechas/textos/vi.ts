import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

// El vietnamita no marca el plural después de un número: “1 ngày”, “3 ngày”.
function trongDanhSach(partes: readonly string[]): string {
  if (partes.length === 1) return partes[0];
  if (partes.length === 2) return `${partes[0]} và ${partes[1]}`;
  return `${partes.slice(0, -1).join(", ")} và ${partes[partes.length - 1]}`;
}

export function duracionVi(anios: number, meses: number, dias: number): string {
  const partes: string[] = [];
  if (anios) partes.push(`${anios} năm`);
  if (meses) partes.push(`${meses} tháng`);
  if (dias || !partes.length) partes.push(`${dias} ngày`);
  return trongDanhSach(partes);
}

export const textosVi: TextosUi<UiDiasEntreFechas> = {
  slug: "tinh-so-ngay",
  ui: () => ({
    desde: "Ngày bắt đầu",
    hasta: "Ngày kết thúc",
    incluir: "Tính cả ngày kết thúc",
    incluirAyuda: "Đánh dấu nếu ngày cuối cũng được tính, như khi đi du lịch hoặc nghỉ phép.",
    dias: "Ngày theo lịch",
    semanas: "Theo tuần",
    duracionFila: "Theo năm, tháng và ngày",
    habiles: "Ngày làm việc",
    habilesAyuda: "Từ thứ Hai đến thứ Sáu. Không trừ ngày nghỉ lễ.",
    duracion: duracionVi,
    semanasYDias: (semanas, _n, dias) => (dias ? `${semanas} tuần và ${dias} ngày` : `${semanas} tuần`),
    notaHabiles: "Ngày làm việc được tính từ thứ Hai đến thứ Sáu, không trừ ngày nghỉ lễ, vốn khác nhau theo quốc gia và địa phương.",
    notaInvertidas: "Ngày kết thúc sớm hơn ngày bắt đầu, nên hai ngày đã được đổi chỗ.",
  }),
};
