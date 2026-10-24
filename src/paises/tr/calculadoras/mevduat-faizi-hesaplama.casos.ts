import { definirCasos } from "@/motor/calculo";
import mevduatFaiziHesaplama from "./mevduat-faizi-hesaplama";

const GIB = "https://cdn.gib.gov.tr/api/gibportal-file/file/getFile?objectKey=DUYURU%2FUNIVERSAL%2F2026%2F2026_Gecici67.pdf";

export default definirCasos(mevduatFaiziHesaplama, [
  {
    nombre: "32 gün, %40: stopaj %17,5",
    origen: { tipo: "recalculado", url: GIB, detalle: "100.000 × %40 × 32 / 365 = 3.506,85; stopaj %17,5 = 613,70; net 2.893,15." },
    fecha: "2026-10-24",
    entrada: { anapara: 100000, faiz: 40, gun: 32 },
    esperado: { brutFaiz: 3506.85, stopaj: 613.7, netFaiz: 2893.15, stopajOrani: 17.5, vadeSonu: 102893.15 },
  },
  {
    nombre: "200 gün: 1 yıla kadar %15",
    origen: { tipo: "recalculado", url: GIB, detalle: "100.000 × %40 × 200 / 365 = 21.917,81; stopaj %15 = 3.287,67; net 18.630,14." },
    fecha: "2026-10-24",
    entrada: { anapara: 100000, faiz: 40, gun: 200 },
    esperado: { brutFaiz: 21917.81, stopaj: 3287.67, netFaiz: 18630.14, stopajOrani: 15 },
  },
  {
    nombre: "400 gün: 1 yıldan uzun %10",
    origen: { tipo: "recalculado", url: GIB, detalle: "100.000 × %45 × 400 / 365 = 49.315,07; stopaj %10 = 4.931,51; net 44.383,56." },
    fecha: "2026-10-24",
    entrada: { anapara: 100000, faiz: 45, gun: 400 },
    esperado: { brutFaiz: 49315.07, stopaj: 4931.51, netFaiz: 44383.56, stopajOrani: 10 },
  },
]);
