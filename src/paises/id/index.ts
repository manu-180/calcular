import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import kalkulatorBiayaKaryawan from "./calculadoras/kalkulator-biaya-karyawan";
import contenidoKalkulatorBiayaKaryawan from "./contenido/kalkulator-biaya-karyawan";
import kalkulatorBphtb from "./calculadoras/kalkulator-bphtb";
import contenidoKalkulatorBphtb from "./contenido/kalkulator-bphtb";
import kalkulatorBpjsKesehatan from "./calculadoras/kalkulator-bpjs-kesehatan";
import contenidoKalkulatorBpjsKesehatan from "./contenido/kalkulator-bpjs-kesehatan";
import kalkulatorBpjsKetenagakerjaan from "./calculadoras/kalkulator-bpjs-ketenagakerjaan";
import contenidoKalkulatorBpjsKetenagakerjaan from "./contenido/kalkulator-bpjs-ketenagakerjaan";
import kalkulatorCutiTahunan from "./calculadoras/kalkulator-cuti-tahunan";
import contenidoKalkulatorCutiTahunan from "./contenido/kalkulator-cuti-tahunan";
import kalkulatorDeposito from "./calculadoras/kalkulator-deposito";
import contenidoKalkulatorDeposito from "./contenido/kalkulator-deposito";
import kalkulatorGajiBersih from "./calculadoras/kalkulator-gaji-bersih";
import contenidoKalkulatorGajiBersih from "./contenido/kalkulator-gaji-bersih";
import kalkulatorGrossUpPph21 from "./calculadoras/kalkulator-gross-up-pph-21";
import contenidoKalkulatorGrossUpPph21 from "./contenido/kalkulator-gross-up-pph-21";
import kalkulatorInflasi from "./calculadoras/kalkulator-inflasi";
import contenidoKalkulatorInflasi from "./contenido/kalkulator-inflasi";
import kalkulatorLembur from "./calculadoras/kalkulator-lembur";
import contenidoKalkulatorLembur from "./contenido/kalkulator-lembur";
import kalkulatorPajakPesangon from "./calculadoras/kalkulator-pajak-pesangon";
import contenidoKalkulatorPajakPesangon from "./contenido/kalkulator-pajak-pesangon";
import kalkulatorPajakSewa from "./calculadoras/kalkulator-pajak-sewa";
import contenidoKalkulatorPajakSewa from "./contenido/kalkulator-pajak-sewa";
import kalkulatorPbb from "./calculadoras/kalkulator-pbb";
import contenidoKalkulatorPbb from "./contenido/kalkulator-pbb";
import kalkulatorPesangon from "./calculadoras/kalkulator-pesangon";
import contenidoKalkulatorPesangon from "./contenido/kalkulator-pesangon";
import kalkulatorPph21 from "./calculadoras/kalkulator-pph-21";
import contenidoKalkulatorPph21 from "./contenido/kalkulator-pph-21";
import kalkulatorPph21BukanPegawai from "./calculadoras/kalkulator-pph-21-bukan-pegawai";
import contenidoKalkulatorPph21BukanPegawai from "./contenido/kalkulator-pph-21-bukan-pegawai";
import kalkulatorPphFinalUmkm from "./calculadoras/kalkulator-pph-final-umkm";
import contenidoKalkulatorPphFinalUmkm from "./contenido/kalkulator-pph-final-umkm";
import kalkulatorPpn from "./calculadoras/kalkulator-ppn";
import contenidoKalkulatorPpn from "./contenido/kalkulator-ppn";
import kalkulatorTerPph21 from "./calculadoras/kalkulator-ter-pph-21";
import contenidoKalkulatorTerPph21 from "./contenido/kalkulator-ter-pph-21";
import kalkulatorThr from "./calculadoras/kalkulator-thr";
import contenidoKalkulatorThr from "./contenido/kalkulator-thr";
import kalkulatorZakatPenghasilan from "./calculadoras/kalkulator-zakat-penghasilan";
import contenidoKalkulatorZakatPenghasilan from "./contenido/kalkulator-zakat-penghasilan";
import kursJisdor from "./calculadoras/kurs-jisdor";
import contenidoKursJisdor from "./contenido/kurs-jisdor";
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
    { definicion: kalkulatorBphtb, contenido: contenidoKalkulatorBphtb, cliente: () => import("./calculadoras/kalkulator-bphtb.cliente") },
    { definicion: kalkulatorBpjsKesehatan, contenido: contenidoKalkulatorBpjsKesehatan, cliente: () => import("./calculadoras/kalkulator-bpjs-kesehatan.cliente") },
    { definicion: kalkulatorBpjsKetenagakerjaan, contenido: contenidoKalkulatorBpjsKetenagakerjaan, cliente: () => import("./calculadoras/kalkulator-bpjs-ketenagakerjaan.cliente") },
    { definicion: kalkulatorCutiTahunan, contenido: contenidoKalkulatorCutiTahunan, cliente: () => import("./calculadoras/kalkulator-cuti-tahunan.cliente") },
    { definicion: kalkulatorDeposito, contenido: contenidoKalkulatorDeposito, cliente: () => import("./calculadoras/kalkulator-deposito.cliente") },
    { definicion: kalkulatorGajiBersih, contenido: contenidoKalkulatorGajiBersih, cliente: () => import("./calculadoras/kalkulator-gaji-bersih.cliente") },
    { definicion: kalkulatorGrossUpPph21, contenido: contenidoKalkulatorGrossUpPph21, cliente: () => import("./calculadoras/kalkulator-gross-up-pph-21.cliente") },
    { definicion: kalkulatorInflasi, contenido: contenidoKalkulatorInflasi, cliente: () => import("./calculadoras/kalkulator-inflasi.cliente") },
    { definicion: kalkulatorLembur, contenido: contenidoKalkulatorLembur, cliente: () => import("./calculadoras/kalkulator-lembur.cliente") },
    { definicion: kalkulatorPajakPesangon, contenido: contenidoKalkulatorPajakPesangon, cliente: () => import("./calculadoras/kalkulator-pajak-pesangon.cliente") },
    { definicion: kalkulatorPajakSewa, contenido: contenidoKalkulatorPajakSewa, cliente: () => import("./calculadoras/kalkulator-pajak-sewa.cliente") },
    { definicion: kalkulatorPbb, contenido: contenidoKalkulatorPbb, cliente: () => import("./calculadoras/kalkulator-pbb.cliente") },
    { definicion: kalkulatorPesangon, contenido: contenidoKalkulatorPesangon, cliente: () => import("./calculadoras/kalkulator-pesangon.cliente") },
    { definicion: kalkulatorPph21, contenido: contenidoKalkulatorPph21, cliente: () => import("./calculadoras/kalkulator-pph-21.cliente") },
    { definicion: kalkulatorPph21BukanPegawai, contenido: contenidoKalkulatorPph21BukanPegawai, cliente: () => import("./calculadoras/kalkulator-pph-21-bukan-pegawai.cliente") },
    { definicion: kalkulatorPphFinalUmkm, contenido: contenidoKalkulatorPphFinalUmkm, cliente: () => import("./calculadoras/kalkulator-pph-final-umkm.cliente") },
    { definicion: kalkulatorPpn, contenido: contenidoKalkulatorPpn, cliente: () => import("./calculadoras/kalkulator-ppn.cliente") },
    { definicion: kalkulatorTerPph21, contenido: contenidoKalkulatorTerPph21, cliente: () => import("./calculadoras/kalkulator-ter-pph-21.cliente") },
    { definicion: kalkulatorThr, contenido: contenidoKalkulatorThr, cliente: () => import("./calculadoras/kalkulator-thr.cliente") },
    { definicion: kalkulatorZakatPenghasilan, contenido: contenidoKalkulatorZakatPenghasilan, cliente: () => import("./calculadoras/kalkulator-zakat-penghasilan.cliente") },
    { definicion: kursJisdor, contenido: contenidoKursJisdor, cliente: () => import("./calculadoras/kurs-jisdor.cliente") },
    { definicion: upahMinimumProvinsi, contenido: contenidoUpahMinimumProvinsi, cliente: () => import("./calculadoras/upah-minimum-provinsi.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
