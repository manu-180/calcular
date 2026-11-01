import { definirCasos } from "@/motor/calculo";
import calculadora from "./kalkulator-bphtb";

export default definirCasos(calculadora, [
  {
    nombre: "Jual beli Rp500 juta dengan batas undang-undang",
    origen: { tipo: "recalculado", detalle: "UU 1/2022 Pasal 46 dan 47: NPOP 500.000.000 (lebih besar dari NJOP), NPOPTKP 80.000.000, NPOPKP 420.000.000 x 5% = 21.000.000." },
    fecha: "2026-10-24",
    entrada: { harga: 500000000, njop: 450000000, perolehan: "jual-beli", npoptkp: null, tarif: null },
    esperado: { bphtb: 21000000, npop: 500000000, npopkp: 420000000 },
  },
  {
    nombre: "Waris dari orang tua",
    origen: { tipo: "recalculado", detalle: "Pasal 46 ayat (6): NPOPTKP paling sedikit 300.000.000. (1.000.000.000 - 300.000.000) x 5% = 35.000.000." },
    fecha: "2026-10-24",
    entrada: { harga: 0, njop: 1000000000, perolehan: "waris", npoptkp: null, tarif: null },
    esperado: { bphtb: 35000000, npoptkp: 300000000 },
  },
  {
    nombre: "Harga di bawah NJOP dengan NPOPTKP dan tarif daerah",
    origen: { tipo: "recalculado", detalle: "Pasal 46 ayat (3): dipakai NJOP 600.000.000. (600.000.000 - 100.000.000) x 4% = 20.000.000." },
    fecha: "2026-10-24",
    entrada: { harga: 550000000, njop: 600000000, perolehan: "jual-beli", npoptkp: 100000000, tarif: 4 },
    esperado: { bphtb: 20000000, npop: 600000000 },
  },
  {
    nombre: "Tarif di atas batas undang-undang",
    origen: { tipo: "recalculado", detalle: "Pasal 47 ayat (1): tarif paling tinggi 5%." },
    fecha: "2026-10-24",
    entrada: { harga: 500000000, njop: 450000000, perolehan: "jual-beli", npoptkp: null, tarif: 6 },
    esperaError: true,
  },
]);
