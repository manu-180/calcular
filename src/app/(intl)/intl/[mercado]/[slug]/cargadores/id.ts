// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "kalkulator-biaya-karyawan": () => import("@/paises/id/calculadoras/kalkulator-biaya-karyawan"),
  "kalkulator-bphtb": () => import("@/paises/id/calculadoras/kalkulator-bphtb"),
  "kalkulator-bpjs-kesehatan": () => import("@/paises/id/calculadoras/kalkulator-bpjs-kesehatan"),
  "kalkulator-bpjs-ketenagakerjaan": () => import("@/paises/id/calculadoras/kalkulator-bpjs-ketenagakerjaan"),
  "kalkulator-cuti-tahunan": () => import("@/paises/id/calculadoras/kalkulator-cuti-tahunan"),
  "kalkulator-deposito": () => import("@/paises/id/calculadoras/kalkulator-deposito"),
  "kalkulator-gaji-bersih": () => import("@/paises/id/calculadoras/kalkulator-gaji-bersih"),
  "kalkulator-gross-up-pph-21": () => import("@/paises/id/calculadoras/kalkulator-gross-up-pph-21"),
  "kalkulator-inflasi": () => import("@/paises/id/calculadoras/kalkulator-inflasi"),
  "kalkulator-lembur": () => import("@/paises/id/calculadoras/kalkulator-lembur"),
  "kalkulator-pajak-pesangon": () => import("@/paises/id/calculadoras/kalkulator-pajak-pesangon"),
  "kalkulator-pajak-sewa": () => import("@/paises/id/calculadoras/kalkulator-pajak-sewa"),
  "kalkulator-pbb": () => import("@/paises/id/calculadoras/kalkulator-pbb"),
  "kalkulator-pesangon": () => import("@/paises/id/calculadoras/kalkulator-pesangon"),
  "kalkulator-pph-21": () => import("@/paises/id/calculadoras/kalkulator-pph-21"),
  "kalkulator-pph-21-bukan-pegawai": () => import("@/paises/id/calculadoras/kalkulator-pph-21-bukan-pegawai"),
  "kalkulator-pph-final-umkm": () => import("@/paises/id/calculadoras/kalkulator-pph-final-umkm"),
  "kalkulator-ppn": () => import("@/paises/id/calculadoras/kalkulator-ppn"),
  "kalkulator-ter-pph-21": () => import("@/paises/id/calculadoras/kalkulator-ter-pph-21"),
  "kalkulator-thr": () => import("@/paises/id/calculadoras/kalkulator-thr"),
  "kalkulator-zakat-penghasilan": () => import("@/paises/id/calculadoras/kalkulator-zakat-penghasilan"),
  "kurs-jisdor": () => import("@/paises/id/calculadoras/kurs-jisdor"),
  "upah-minimum-provinsi": () => import("@/paises/id/calculadoras/upah-minimum-provinsi"),
};
