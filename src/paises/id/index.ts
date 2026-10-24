import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import kalkulatorBiayaKaryawan from "./calculadoras/kalkulator-biaya-karyawan";
import contenidoKalkulatorBiayaKaryawan from "./contenido/kalkulator-biaya-karyawan";
import kalkulatorBpjsKesehatan from "./calculadoras/kalkulator-bpjs-kesehatan";
import contenidoKalkulatorBpjsKesehatan from "./contenido/kalkulator-bpjs-kesehatan";
import kalkulatorBpjsKetenagakerjaan from "./calculadoras/kalkulator-bpjs-ketenagakerjaan";
import contenidoKalkulatorBpjsKetenagakerjaan from "./contenido/kalkulator-bpjs-ketenagakerjaan";
import kalkulatorGajiBersih from "./calculadoras/kalkulator-gaji-bersih";
import contenidoKalkulatorGajiBersih from "./contenido/kalkulator-gaji-bersih";
import kalkulatorLembur from "./calculadoras/kalkulator-lembur";
import contenidoKalkulatorLembur from "./contenido/kalkulator-lembur";
import kalkulatorPajakPesangon from "./calculadoras/kalkulator-pajak-pesangon";
import contenidoKalkulatorPajakPesangon from "./contenido/kalkulator-pajak-pesangon";
import kalkulatorPesangon from "./calculadoras/kalkulator-pesangon";
import contenidoKalkulatorPesangon from "./contenido/kalkulator-pesangon";
import kalkulatorPph21 from "./calculadoras/kalkulator-pph-21";
import contenidoKalkulatorPph21 from "./contenido/kalkulator-pph-21";
import kalkulatorPph21BukanPegawai from "./calculadoras/kalkulator-pph-21-bukan-pegawai";
import contenidoKalkulatorPph21BukanPegawai from "./contenido/kalkulator-pph-21-bukan-pegawai";
import kalkulatorTerPph21 from "./calculadoras/kalkulator-ter-pph-21";
import contenidoKalkulatorTerPph21 from "./contenido/kalkulator-ter-pph-21";
import kalkulatorThr from "./calculadoras/kalkulator-thr";
import contenidoKalkulatorThr from "./contenido/kalkulator-thr";
import upahMinimumProvinsi from "./calculadoras/upah-minimum-provinsi";
import contenidoUpahMinimumProvinsi from "./contenido/upah-minimum-provinsi";
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
    { definicion: kalkulatorBiayaKaryawan, contenido: contenidoKalkulatorBiayaKaryawan, cliente: () => import("./calculadoras/kalkulator-biaya-karyawan.cliente") },
    { definicion: kalkulatorBpjsKesehatan, contenido: contenidoKalkulatorBpjsKesehatan, cliente: () => import("./calculadoras/kalkulator-bpjs-kesehatan.cliente") },
    { definicion: kalkulatorBpjsKetenagakerjaan, contenido: contenidoKalkulatorBpjsKetenagakerjaan, cliente: () => import("./calculadoras/kalkulator-bpjs-ketenagakerjaan.cliente") },
    { definicion: kalkulatorGajiBersih, contenido: contenidoKalkulatorGajiBersih, cliente: () => import("./calculadoras/kalkulator-gaji-bersih.cliente") },
    { definicion: kalkulatorLembur, contenido: contenidoKalkulatorLembur, cliente: () => import("./calculadoras/kalkulator-lembur.cliente") },
    { definicion: kalkulatorPajakPesangon, contenido: contenidoKalkulatorPajakPesangon, cliente: () => import("./calculadoras/kalkulator-pajak-pesangon.cliente") },
    { definicion: kalkulatorPesangon, contenido: contenidoKalkulatorPesangon, cliente: () => import("./calculadoras/kalkulator-pesangon.cliente") },
    { definicion: kalkulatorPph21, contenido: contenidoKalkulatorPph21, cliente: () => import("./calculadoras/kalkulator-pph-21.cliente") },
    { definicion: kalkulatorPph21BukanPegawai, contenido: contenidoKalkulatorPph21BukanPegawai, cliente: () => import("./calculadoras/kalkulator-pph-21-bukan-pegawai.cliente") },
    { definicion: kalkulatorTerPph21, contenido: contenidoKalkulatorTerPph21, cliente: () => import("./calculadoras/kalkulator-ter-pph-21.cliente") },
    { definicion: kalkulatorThr, contenido: contenidoKalkulatorThr, cliente: () => import("./calculadoras/kalkulator-thr.cliente") },
    { definicion: upahMinimumProvinsi, contenido: contenidoUpahMinimumProvinsi, cliente: () => import("./calculadoras/upah-minimum-provinsi.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
