import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import kalkulatorGajiBersih from "./calculadoras/kalkulator-gaji-bersih";
import contenidoKalkulatorGajiBersih from "./contenido/kalkulator-gaji-bersih";
import kalkulatorPph21 from "./calculadoras/kalkulator-pph-21";
import contenidoKalkulatorPph21 from "./contenido/kalkulator-pph-21";
import kalkulatorPph21BukanPegawai from "./calculadoras/kalkulator-pph-21-bukan-pegawai";
import contenidoKalkulatorPph21BukanPegawai from "./contenido/kalkulator-pph-21-bukan-pegawai";
import kalkulatorTerPph21 from "./calculadoras/kalkulator-ter-pph-21";
import contenidoKalkulatorTerPph21 from "./contenido/kalkulator-ter-pph-21";
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
    { definicion: kalkulatorGajiBersih, contenido: contenidoKalkulatorGajiBersih, cliente: () => import("./calculadoras/kalkulator-gaji-bersih.cliente") },
    { definicion: kalkulatorPph21, contenido: contenidoKalkulatorPph21, cliente: () => import("./calculadoras/kalkulator-pph-21.cliente") },
    { definicion: kalkulatorPph21BukanPegawai, contenido: contenidoKalkulatorPph21BukanPegawai, cliente: () => import("./calculadoras/kalkulator-pph-21-bukan-pegawai.cliente") },
    { definicion: kalkulatorTerPph21, contenido: contenidoKalkulatorTerPph21, cliente: () => import("./calculadoras/kalkulator-ter-pph-21.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
