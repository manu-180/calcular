import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-24";

const MESES: Readonly<Record<string, string>> = {
  jan: "01", januari: "01", feb: "02", februari: "02", mar: "03", maret: "03", apr: "04", april: "04",
  mei: "05", jun: "06", juni: "06", jul: "07", juli: "07", agu: "08", agt: "08", agustus: "08",
  sep: "09", september: "09", okt: "10", oktober: "10", nov: "11", november: "11", des: "12", desember: "12",
};

function fechaIndonesia(dia: string | null, mes: string, anio: string): FechaISO | null {
  const m = MESES[mes.toLowerCase()];
  if (!m) return null;
  const f = `${anio}-${m}-${(dia ?? "1").padStart(2, "0")}`;
  return esFechaISO(f) ? f : null;
}

function numeroIndonesia(s: string): number {
  return Number(s.replace(/\./g, "").replace(",", "."));
}

// La JDIH de Kemenkeu publica en cada ficha la «riwayat» de la norma (Diubah dengan, Dicabut dengan).
// Si aparece un número que no está en la lista conocida, la norma cambió y hay que volver a leerla.
async function riwayatKemenkeu(http: Http, url: string, titulo: string, conocidos: readonly string[]): Promise<readonly HallazgoNorma[] | null> {
  const html = (await http.texto(url, { userAgentNavegador: true })).replace(/\\"/g, '"');
  if (!/jdih/i.test(html) || !/Judul/.test(html)) return null;
  const nuevos = [...html.matchAll(/"(?:Diubah dengan|Dicabut dengan|Dicabut sebagian dengan|Diubah sebagian dengan)","IdPH":"[^"]*","TglMulaiBerlaku":"\$D(\d{4}-\d{2}-\d{2})[^"]*"(?:,"TglPutusan":"[^"]*")?,"Nomor":"([^"]+)"/g)]
    .filter((m) => !conocidos.includes(m[2].trim()));
  if (!nuevos.length) return [];
  const fecha = esFechaISO(nuevos[0][1]) ? nuevos[0][1] : VERIFICADO;
  return [{ titulo: `${titulo}: ${nuevos.map((m) => m[2].trim()).join(", ")}`, url, fecha }];
}

function kemenkeu(id: string, datos: readonly string[], dok: string, titulo: string, conocidos: readonly string[] = []): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url: `https://jdih.kemenkeu.go.id/dok/${dok}/overview`,
    userAgentNavegador: true,
    traer(http) {
      return riwayatKemenkeu(http, this.url, titulo, conocidos);
    },
  };
}

// La JDIH de Kemnaker muestra «Status Berlaku» en la ficha; si cambia, la norma fue modificada o
// revocada.
function kemnaker(id: string, datos: readonly string[], url: `https://${string}`, titulo: string): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url,
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const texto = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
      const m = /Status\s+(Berlaku|Tidak Berlaku|Dicabut|Diubah)/.exec(texto);
      if (!m) return null;
      return m[1] === "Berlaku" ? [] : [{ titulo: `${titulo}: status ${m[1]}`, url: this.url, fecha: VERIFICADO }];
    },
  };
}

export const detectores: readonly Detector[] = [
  {
    id: "id.jisdor-bi",
    carril: "serie",
    serie: "id.jisdor",
    metodo: "html",
    url: "https://www.bi.go.id/id/statistik/informasi-kurs/jisdor/default.aspx",
    userAgentNavegador: true,
    banda: { min: 12000, max: 25000, saltoRelativoMax: 0.05 },
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const puntos: PuntoSerie[] = [];
      for (const m of html.matchAll(/<td[^>]*>\s*(\d{1,2}) ([A-Za-z]+) (\d{4})\s*<\/td>\s*<td[^>]*>\s*Rp\s*([\d.]+,\d{2})\s*<\/td>/g)) {
        const fecha = fechaIndonesia(m[1], m[2], m[3]);
        const valor = numeroIndonesia(m[4]);
        if (!fecha || !Number.isFinite(valor)) return null;
        puntos.push({ fecha, valor });
      }
      puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
      return puntos.length ? puntos : null;
    },
  },
  {
    id: "id.inflasi-bi",
    carril: "serie",
    serie: "id.inflasi-tahunan",
    metodo: "html",
    url: "https://www.bi.go.id/id/statistik/indikator/data-inflasi.aspx",
    userAgentNavegador: true,
    // La inflación anual puede moverse más de un punto entre meses (febrero de 2026: de 3,55 a 4,76).
    banda: { min: -2, max: 15, saltoRelativoMax: 0.6 },
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const puntos: PuntoSerie[] = [];
      for (const m of html.matchAll(/<td[^>]*>\s*([A-Za-z]+) (\d{4})\s*<\/td>\s*<td[^>]*>\s*(-?[\d,]+)\s*%\s*<\/td>/g)) {
        const fecha = fechaIndonesia(null, m[1], m[2]);
        const valor = numeroIndonesia(m[3]);
        if (!fecha || !Number.isFinite(valor)) return null;
        puntos.push({ fecha, valor });
      }
      puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
      return puntos.length ? puntos : null;
    },
  },
  kemenkeu("id.pp-58-2023", ["id.ter-kategori-a", "id.ter-kategori-b", "id.ter-kategori-c"], "pp-58-tahun-2023", "PP 58/2023 (TER PPh 21) berubah"),
  kemenkeu("id.pmk-168-2023", ["id.biaya-jabatan-tarif", "id.biaya-jabatan-maks-tahun", "id.biaya-jabatan-maks-bulan", "id.dpp-bukan-pegawai"], "pmk-168-tahun-2023", "PMK 168/2023 (PPh 21) berubah"),
  kemenkeu("id.pmk-101-2016", ["id.ptkp-diri", "id.ptkp-kawin", "id.ptkp-tanggungan", "id.ptkp-tanggungan-maks"], "pmk-101-tahun-2016", "PMK 101/2016 (PTKP) berubah"),
  kemenkeu("id.uu-7-2021", ["id.tarif-pasal-17", "id.ppn-tarif"], "uu-7-tahun-2021", "UU HPP berubah"),
  kemenkeu("id.pmk-131-2024", ["id.ppn-tarif", "id.ppn-dpp-pembilang", "id.ppn-dpp-penyebut"], "pmk-131-tahun-2024", "PMK 131/2024 (PPN) berubah"),
  kemenkeu("id.pp-55-2022", ["id.pph-final-umkm", "id.umkm-batas-omzet", "id.umkm-omzet-tidak-kena-pajak"], "pp-55-tahun-2022", "PP 55/2022 (PPh final UMKM) berubah", ["PP 20 TAHUN 2026"]),
  kemenkeu("id.pp-68-2009", ["id.tarif-pph-pesangon", "id.tarif-pph-jht-sekaligus"], "pp-68-tahun-2009", "PP 68/2009 (PPh pesangon) berubah"),
  kemenkeu("id.pp-34-2017", ["id.pph-sewa"], "pp-34-tahun-2017", "PP 34/2017 (PPh sewa) berubah"),
  kemenkeu("id.uu-1-2022", ["id.bphtb-tarif-maks", "id.npoptkp-minimal", "id.npoptkp-waris-minimal", "id.pbb-tarif-maks", "id.njoptkp-minimal", "id.pbb-persen-njop-min"], "uu-1-tahun-2022", "UU HKPD (BPHTB dan PBB) berubah"),
  kemenkeu("id.perpres-64-2020", ["id.bpjs-kes-pekerja", "id.bpjs-kes-pemberi-kerja", "id.bpjs-kes-batas-upah", "id.bpjs-kes-mandiri", "id.bpjs-kes-bantuan-kelas-3"], "perpres-64-tahun-2020", "Perpres 64/2020 (iuran BPJS Kesehatan) berubah"),
  kemnaker("id.pp-35-2021", ["id.lembur-pembagi", "id.lembur-maks-hari", "id.lembur-maks-minggu", "id.lembur-pengali", "id.upah-sebulan-pengali-harian", "id.uang-pesangon", "id.uang-penghargaan-masa-kerja", "id.pesangon-pengali", "id.upmk-pengali"], "https://jdih.kemnaker.go.id/peraturan/detail/1723/peraturan-pemerintah-nomor-35-tahun-2021", "PP 35/2021 (lembur dan pesangon)"),
  kemnaker("id.permenaker-6-2016", ["id.thr-masa-kerja-penuh", "id.thr-masa-kerja-minimal"], "https://jdih.kemnaker.go.id/peraturan/detail/1207/peraturan-menteri-ketenagakerjaan-nomor-6-tahun-2016", "Permenaker 6/2016 (THR)"),
  kemnaker("id.pp-44-2015", ["id.jkk", "id.jkm"], "https://jdih.kemnaker.go.id/peraturan/detail/1200/peraturan-pemerintah-nomor-44-tahun-2015", "PP 44/2015 (JKK dan JKM)"),
  kemnaker("id.pp-45-2015", ["id.jp-pekerja", "id.jp-pemberi-kerja", "id.jp-batas-upah"], "https://jdih.kemnaker.go.id/peraturan/detail/607/peraturan-pemerintah-nomor-45-tahun-2015", "PP 45/2015 (Jaminan Pensiun)"),
  kemnaker("id.pp-46-2015", ["id.jht-pekerja", "id.jht-pemberi-kerja"], "https://jdih.kemnaker.go.id/peraturan/detail/608/peraturan-pemerintah-nomor-46-tahun-2015", "PP 46/2015 (Jaminan Hari Tua)"),
];
