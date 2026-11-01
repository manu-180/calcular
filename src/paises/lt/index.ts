import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import mma from "./calculadoras/mma";
import contenidoMma from "./contenido/mma";
import infliacijosSkaiciuokle from "./calculadoras/infliacijos-skaiciuokle";
import contenidoInfliacijosSkaiciuokle from "./contenido/infliacijos-skaiciuokle";
import valiutuSkaiciuokle from "./calculadoras/valiutu-skaiciuokle";
import contenidoValiutuSkaiciuokle from "./contenido/valiutu-skaiciuokle";
import atlyginimoSkaiciuokle from "./calculadoras/atlyginimo-skaiciuokle";
import contenidoAtlyginimoSkaiciuokle from "./contenido/atlyginimo-skaiciuokle";
import isRankuIPopieriu from "./calculadoras/is-ranku-i-popieriu";
import contenidoIsRankuIPopieriu from "./contenido/is-ranku-i-popieriu";
import darboVietosKaina from "./calculadoras/darbo-vietos-kaina";
import contenidoDarboVietosKaina from "./contenido/darbo-vietos-kaina";
import npdSkaiciuokle from "./calculadoras/npd-skaiciuokle";
import contenidoNpdSkaiciuokle from "./contenido/npd-skaiciuokle";
import gpmSkaiciuokle from "./calculadoras/gpm-skaiciuokle";
import contenidoGpmSkaiciuokle from "./contenido/gpm-skaiciuokle";
import sodraImokos from "./calculadoras/sodra-imokos";
import contenidoSodraImokos from "./contenido/sodra-imokos";
import individualiVeikla from "./calculadoras/individuali-veikla";
import contenidoIndividualiVeikla from "./contenido/individuali-veikla";
import versloLiudijimas from "./calculadoras/verslo-liudijimas";
import contenidoVersloLiudijimas from "./contenido/verslo-liudijimas";
import mbMokesciai from "./calculadoras/mb-mokesciai";
import contenidoMbMokesciai from "./contenido/mb-mokesciai";
import pvmSkaiciuokle from "./calculadoras/pvm-skaiciuokle";
import contenidoPvmSkaiciuokle from "./contenido/pvm-skaiciuokle";
import atostoginiuSkaiciuokle from "./calculadoras/atostoginiu-skaiciuokle";
import contenidoAtostoginiuSkaiciuokle from "./contenido/atostoginiu-skaiciuokle";
import kompensacijaUzAtostogas from "./calculadoras/kompensacija-uz-atostogas";
import contenidoKompensacijaUzAtostogas from "./contenido/kompensacija-uz-atostogas";
import iseitineIsmoka from "./calculadoras/iseitine-ismoka";
import contenidoIseitineIsmoka from "./contenido/iseitine-ismoka";
import ispejimoTerminas from "./calculadoras/ispejimo-terminas";
import contenidoIspejimoTerminas from "./contenido/ispejimo-terminas";
import virsvalandziai from "./calculadoras/virsvalandziai";
import contenidoVirsvalandziai from "./contenido/virsvalandziai";
import ligosPasalpa from "./calculadoras/ligos-pasalpa";
import contenidoLigosPasalpa from "./contenido/ligos-pasalpa";
import motinystesPasalpa from "./calculadoras/motinystes-pasalpa";
import contenidoMotinystesPasalpa from "./contenido/motinystes-pasalpa";
import tevystesPasalpa from "./calculadoras/tevystes-pasalpa";
import contenidoTevystesPasalpa from "./contenido/tevystes-pasalpa";
import vaikoPrieziurosPasalpa from "./calculadoras/vaiko-prieziuros-pasalpa";
import contenidoVaikoPrieziurosPasalpa from "./contenido/vaiko-prieziuros-pasalpa";
import nedarboIsmoka from "./calculadoras/nedarbo-ismoka";
import contenidoNedarboIsmoka from "./contenido/nedarbo-ismoka";
import ntMokestis from "./calculadoras/nt-mokestis";
import contenidoNtMokestis from "./contenido/nt-mokestis";
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
    { definicion: mma, contenido: contenidoMma, cliente: () => import("./calculadoras/mma.cliente") },
    { definicion: infliacijosSkaiciuokle, contenido: contenidoInfliacijosSkaiciuokle, cliente: () => import("./calculadoras/infliacijos-skaiciuokle.cliente") },
    { definicion: valiutuSkaiciuokle, contenido: contenidoValiutuSkaiciuokle, cliente: () => import("./calculadoras/valiutu-skaiciuokle.cliente") },
    { definicion: atlyginimoSkaiciuokle, contenido: contenidoAtlyginimoSkaiciuokle, cliente: () => import("./calculadoras/atlyginimo-skaiciuokle.cliente") },
    { definicion: isRankuIPopieriu, contenido: contenidoIsRankuIPopieriu, cliente: () => import("./calculadoras/is-ranku-i-popieriu.cliente") },
    { definicion: darboVietosKaina, contenido: contenidoDarboVietosKaina, cliente: () => import("./calculadoras/darbo-vietos-kaina.cliente") },
    { definicion: npdSkaiciuokle, contenido: contenidoNpdSkaiciuokle, cliente: () => import("./calculadoras/npd-skaiciuokle.cliente") },
    { definicion: gpmSkaiciuokle, contenido: contenidoGpmSkaiciuokle, cliente: () => import("./calculadoras/gpm-skaiciuokle.cliente") },
    { definicion: sodraImokos, contenido: contenidoSodraImokos, cliente: () => import("./calculadoras/sodra-imokos.cliente") },
    { definicion: individualiVeikla, contenido: contenidoIndividualiVeikla, cliente: () => import("./calculadoras/individuali-veikla.cliente") },
    { definicion: versloLiudijimas, contenido: contenidoVersloLiudijimas, cliente: () => import("./calculadoras/verslo-liudijimas.cliente") },
    { definicion: mbMokesciai, contenido: contenidoMbMokesciai, cliente: () => import("./calculadoras/mb-mokesciai.cliente") },
    { definicion: pvmSkaiciuokle, contenido: contenidoPvmSkaiciuokle, cliente: () => import("./calculadoras/pvm-skaiciuokle.cliente") },
    { definicion: atostoginiuSkaiciuokle, contenido: contenidoAtostoginiuSkaiciuokle, cliente: () => import("./calculadoras/atostoginiu-skaiciuokle.cliente") },
    { definicion: kompensacijaUzAtostogas, contenido: contenidoKompensacijaUzAtostogas, cliente: () => import("./calculadoras/kompensacija-uz-atostogas.cliente") },
    { definicion: iseitineIsmoka, contenido: contenidoIseitineIsmoka, cliente: () => import("./calculadoras/iseitine-ismoka.cliente") },
    { definicion: ispejimoTerminas, contenido: contenidoIspejimoTerminas, cliente: () => import("./calculadoras/ispejimo-terminas.cliente") },
    { definicion: virsvalandziai, contenido: contenidoVirsvalandziai, cliente: () => import("./calculadoras/virsvalandziai.cliente") },
    { definicion: ligosPasalpa, contenido: contenidoLigosPasalpa, cliente: () => import("./calculadoras/ligos-pasalpa.cliente") },
    { definicion: motinystesPasalpa, contenido: contenidoMotinystesPasalpa, cliente: () => import("./calculadoras/motinystes-pasalpa.cliente") },
    { definicion: tevystesPasalpa, contenido: contenidoTevystesPasalpa, cliente: () => import("./calculadoras/tevystes-pasalpa.cliente") },
    { definicion: vaikoPrieziurosPasalpa, contenido: contenidoVaikoPrieziurosPasalpa, cliente: () => import("./calculadoras/vaiko-prieziuros-pasalpa.cliente") },
    { definicion: nedarboIsmoka, contenido: contenidoNedarboIsmoka, cliente: () => import("./calculadoras/nedarbo-ismoka.cliente") },
    { definicion: ntMokestis, contenido: contenidoNtMokestis, cliente: () => import("./calculadoras/nt-mokestis.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
