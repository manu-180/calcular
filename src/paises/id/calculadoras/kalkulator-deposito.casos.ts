import { definirCasos } from "@/motor/calculo";
import calculadora from "./kalkulator-deposito";

export default definirCasos(calculadora, [
  {
    nombre: "Rp100 juta, 4,5%, 12 bulan",
    origen: { tipo: "recalculado", detalle: "PP 131/2000 Pasal 2: bunga 100.000.000 x 4,5% = 4.500.000; PPh final 20% = 900.000; bersih 3.600.000." },
    fecha: "2026-10-24",
    entrada: { nominal: 100000000, bunga: 4.5, tenor: 12, aro: false },
    esperado: { bersih: 3600000, bungaBruto: 4500000, pajak: 900000, total: 103600000, efektif: 3.6 },
  },
  {
    nombre: "Deposito Rp5 juta tidak dipotong pajak",
    origen: { tipo: "recalculado", detalle: "PP 131/2000 Pasal 3 ayat (1) huruf a: jumlah tidak melebihi 7.500.000. Bunga 225.000 tanpa PPh." },
    fecha: "2026-10-24",
    entrada: { nominal: 5000000, bunga: 4.5, tenor: 12, aro: false },
    esperado: { bersih: 225000, pajak: 0 },
  },
  {
    nombre: "ARO plus bulanan 12 kali",
    origen: { tipo: "recalculado", detalle: "Setiap bulan bunga = pokok x 4,5% / 12, dipotong 20%, sisanya ditambahkan ke pokok. Jumlah 12 bulan: bunga 4.574.996, PPh 914.999, bersih 3.659.997." },
    fecha: "2026-10-24",
    entrada: { nominal: 100000000, bunga: 4.5, tenor: 12, aro: true },
    esperado: { bersih: 3659997, bungaBruto: 4574996, pajak: 914999 },
  },
]);
