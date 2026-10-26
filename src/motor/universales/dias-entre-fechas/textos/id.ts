import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

// El indonesio no marca el plural después de un número: «1 hari», «3 hari».
function dalamDaftar(partes: readonly string[]): string {
  if (partes.length === 1) return partes[0];
  if (partes.length === 2) return `${partes[0]} dan ${partes[1]}`;
  return `${partes.slice(0, -1).join(", ")}, dan ${partes[partes.length - 1]}`;
}

export function duracionId(anios: number, meses: number, dias: number): string {
  const partes: string[] = [];
  if (anios) partes.push(`${anios} tahun`);
  if (meses) partes.push(`${meses} bulan`);
  if (dias || !partes.length) partes.push(`${dias} hari`);
  return dalamDaftar(partes);
}

export const textosId: TextosUi<UiDiasEntreFechas> = {
  slug: "selisih-tanggal",
  ui: () => ({
    desde: "Tanggal mulai",
    hasta: "Tanggal akhir",
    incluir: "Hitung juga tanggal akhir",
    incluirAyuda: "Centang jika hari terakhir ikut dihitung, seperti pada perjalanan atau cuti.",
    dias: "Hari kalender",
    semanas: "Dalam minggu",
    duracionFila: "Dalam tahun, bulan, dan hari",
    habiles: "Hari kerja",
    habilesAyuda: "Senin sampai Jumat. Hari libur nasional tidak dikurangkan.",
    duracion: duracionId,
    semanasYDias: (semanas, _n, dias) => (dias ? `${semanas} minggu dan ${dias} hari` : `${semanas} minggu`),
    notaHabiles: "Hari kerja dihitung dari Senin sampai Jumat, tanpa mengurangi hari libur nasional, yang berbeda di tiap negara dan daerah.",
    notaInvertidas: "Tanggal akhir lebih awal daripada tanggal mulai, jadi keduanya ditukar.",
  }),
};
