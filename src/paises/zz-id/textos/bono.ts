import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-id.bono",
  slug: "bonus-semesteran",
  campos: {
    sueldo: { etiqueta: "Gaji kotor per bulan" },
    meses: { etiqueta: "Bulan kerja dalam semester ini" },
    region: { etiqueta: "Zona tempat Anda bekerja" },
    regimen: { etiqueta: "Ukuran perusahaan", opciones: { general: "Perusahaan menengah atau besar", pequena: "Perusahaan kecil" } },
  },
  filas: {
    base: { etiqueta: "Gaji yang dipakai untuk menghitung" },
    bono: { etiqueta: "Bonus" },
    bonificacion: { etiqueta: "Tambahan" },
    total: { etiqueta: "Total yang Anda terima" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Jumlah bulan harus antara 1 dan 6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Gaji Anda di bawah upah minimum zona Anda, jadi bonus dihitung dari upah minimum.",
  },
});
