import { definirCasos } from "@/motor/calculo";
import yillikIzinHesaplama from "./yillik-izin-hesaplama";

const IK = "https://www.csgb.gov.tr/Media/crldhi51/4857-say%C4%B1l%C4%B1-i%C5%9F-kanunu.pdf";

export default definirCasos(yillikIzinHesaplama, [
  {
    nombre: "3 yıl: 14 gün",
    origen: { tipo: "recalculado", url: IK, detalle: "Bir yıldan beş yıla kadar (beş yıl dahil) 14 gün (md. 53/a). İzin ücreti 30.000 / 30 × 14 = 14.000." },
    fecha: "2026-10-24",
    entrada: { giris: "2023-05-10", cikis: "2026-10-24", yas: 30, yeralti: false, brut: 30000 },
    esperado: { gun: 14, kidemYili: 3, izinUcreti: 14000 },
  },
  {
    nombre: "6 yıl: 20 gün",
    origen: { tipo: "recalculado", url: IK, detalle: "Beş yıl dahil 14 gün; beş yıldan fazla 20 gün (md. 53/b)." },
    fecha: "2026-10-24",
    entrada: { giris: "2020-06-01", cikis: "2026-06-01", yas: null, yeralti: false, brut: null },
    esperado: { gun: 20, kidemYili: 6 },
  },
  {
    nombre: "15 yıl: 26 gün",
    origen: { tipo: "recalculado", url: IK, detalle: "Onbeş yıl (dahil) ve daha fazla 26 gün (md. 53/c)." },
    fecha: "2026-10-24",
    entrada: { giris: "2011-01-01", cikis: "2026-01-01", yas: 45, yeralti: false, brut: null },
    esperado: { gun: 26 },
  },
  {
    nombre: "50 yaş, 2 yıl: en az 20 gün; yer altı +4",
    origen: { tipo: "recalculado", url: IK, detalle: "50 ve daha yukarı yaştakilere 20 günden az izin verilemez; yer altı işlerinde dörder gün artırılır." },
    fecha: "2026-10-24",
    entrada: { giris: "2024-01-01", cikis: "2026-02-01", yas: 50, yeralti: true, brut: null },
    esperado: { gun: 24 },
  },
  {
    nombre: "Bir yıldan az: izin hakkı yok",
    origen: { tipo: "recalculado", url: IK, detalle: "En az bir yıl çalışmış olan işçilere yıllık ücretli izin verilir." },
    fecha: "2026-10-24",
    entrada: { giris: "2026-01-01", cikis: "2026-10-24", yas: 17, yeralti: false, brut: null },
    esperado: { gun: 0 },
  },
]);
