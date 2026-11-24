import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import kalkulatorZaPlata from "./calculadoras/kalkulator-za-plata";
import contenidoKalkulatorZaPlata from "./contenido/kalkulator-za-plata";
import kalkulatorNetoVoBruto from "./calculadoras/kalkulator-neto-vo-bruto";
import contenidoKalkulatorNetoVoBruto from "./contenido/kalkulator-neto-vo-bruto";
import trosokNaRabotodavach from "./calculadoras/trosok-na-rabotodavach";
import contenidoTrosokNaRabotodavach from "./contenido/trosok-na-rabotodavach";
import kalkulatorZaPridonesi from "./calculadoras/kalkulator-za-pridonesi";
import contenidoKalkulatorZaPridonesi from "./contenido/kalkulator-za-pridonesi";
import kalkulatorZaPersonalenDanok from "./calculadoras/kalkulator-za-personalen-danok";
import contenidoKalkulatorZaPersonalenDanok from "./contenido/kalkulator-za-personalen-danok";
import minimalnaPlata from "./calculadoras/minimalna-plata";
import contenidoMinimalnaPlata from "./contenido/minimalna-plata";
import prosechnaPlata from "./calculadoras/prosechna-plata";
import contenidoProsechnaPlata from "./contenido/prosechna-plata";
import ddvKalkulator from "./calculadoras/ddv-kalkulator";
import contenidoDdvKalkulator from "./contenido/ddv-kalkulator";
import mojDdvPovrat from "./calculadoras/moj-ddv-povrat";
import contenidoMojDdvPovrat from "./contenido/moj-ddv-povrat";
import kalkulatorZaDanokNaDobivka from "./calculadoras/kalkulator-za-danok-na-dobivka";
import contenidoKalkulatorZaDanokNaDobivka from "./contenido/kalkulator-za-danok-na-dobivka";
import kalkulatorZaGodishenOdmor from "./calculadoras/kalkulator-za-godishen-odmor";
import contenidoKalkulatorZaGodishenOdmor from "./contenido/kalkulator-za-godishen-odmor";
import kalkulatorZaRegres from "./calculadoras/kalkulator-za-regres";
import contenidoKalkulatorZaRegres from "./contenido/kalkulator-za-regres";
import kalkulatorZaOtpremnina from "./calculadoras/kalkulator-za-otpremnina";
import contenidoKalkulatorZaOtpremnina from "./contenido/kalkulator-za-otpremnina";
import otkazenRok from "./calculadoras/otkazen-rok";
import contenidoOtkazenRok from "./contenido/otkazen-rok";
import prekuvremenaRabota from "./calculadoras/prekuvremena-rabota";
import contenidoPrekuvremenaRabota from "./contenido/prekuvremena-rabota";
import kalkulatorZaBoleduvanje from "./calculadoras/kalkulator-za-boleduvanje";
import contenidoKalkulatorZaBoleduvanje from "./contenido/kalkulator-za-boleduvanje";
import porodilnoOtsustvo from "./calculadoras/porodilno-otsustvo";
import contenidoPorodilnoOtsustvo from "./contenido/porodilno-otsustvo";
import danokNaPrometNaNedvizhnosti from "./calculadoras/danok-na-promet-na-nedvizhnosti";
import contenidoDanokNaPrometNaNedvizhnosti from "./contenido/danok-na-promet-na-nedvizhnosti";
import danokNaImot from "./calculadoras/danok-na-imot";
import contenidoDanokNaImot from "./contenido/danok-na-imot";
import danokNaNasledstvoIPodarok from "./calculadoras/danok-na-nasledstvo-i-podarok";
import contenidoDanokNaNasledstvoIPodarok from "./contenido/danok-na-nasledstvo-i-podarok";
import kalkulatorZaInflacija from "./calculadoras/kalkulator-za-inflacija";
import contenidoKalkulatorZaInflacija from "./contenido/kalkulator-za-inflacija";
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
    { definicion: kalkulatorZaPlata, contenido: contenidoKalkulatorZaPlata, cliente: () => import("./calculadoras/kalkulator-za-plata.cliente") },
    { definicion: kalkulatorNetoVoBruto, contenido: contenidoKalkulatorNetoVoBruto, cliente: () => import("./calculadoras/kalkulator-neto-vo-bruto.cliente") },
    { definicion: trosokNaRabotodavach, contenido: contenidoTrosokNaRabotodavach, cliente: () => import("./calculadoras/trosok-na-rabotodavach.cliente") },
    { definicion: kalkulatorZaPridonesi, contenido: contenidoKalkulatorZaPridonesi, cliente: () => import("./calculadoras/kalkulator-za-pridonesi.cliente") },
    { definicion: kalkulatorZaPersonalenDanok, contenido: contenidoKalkulatorZaPersonalenDanok, cliente: () => import("./calculadoras/kalkulator-za-personalen-danok.cliente") },
    { definicion: minimalnaPlata, contenido: contenidoMinimalnaPlata, cliente: () => import("./calculadoras/minimalna-plata.cliente") },
    { definicion: prosechnaPlata, contenido: contenidoProsechnaPlata, cliente: () => import("./calculadoras/prosechna-plata.cliente") },
    { definicion: ddvKalkulator, contenido: contenidoDdvKalkulator, cliente: () => import("./calculadoras/ddv-kalkulator.cliente") },
    { definicion: mojDdvPovrat, contenido: contenidoMojDdvPovrat, cliente: () => import("./calculadoras/moj-ddv-povrat.cliente") },
    { definicion: kalkulatorZaDanokNaDobivka, contenido: contenidoKalkulatorZaDanokNaDobivka, cliente: () => import("./calculadoras/kalkulator-za-danok-na-dobivka.cliente") },
    { definicion: kalkulatorZaGodishenOdmor, contenido: contenidoKalkulatorZaGodishenOdmor, cliente: () => import("./calculadoras/kalkulator-za-godishen-odmor.cliente") },
    { definicion: kalkulatorZaRegres, contenido: contenidoKalkulatorZaRegres, cliente: () => import("./calculadoras/kalkulator-za-regres.cliente") },
    { definicion: kalkulatorZaOtpremnina, contenido: contenidoKalkulatorZaOtpremnina, cliente: () => import("./calculadoras/kalkulator-za-otpremnina.cliente") },
    { definicion: otkazenRok, contenido: contenidoOtkazenRok, cliente: () => import("./calculadoras/otkazen-rok.cliente") },
    { definicion: prekuvremenaRabota, contenido: contenidoPrekuvremenaRabota, cliente: () => import("./calculadoras/prekuvremena-rabota.cliente") },
    { definicion: kalkulatorZaBoleduvanje, contenido: contenidoKalkulatorZaBoleduvanje, cliente: () => import("./calculadoras/kalkulator-za-boleduvanje.cliente") },
    { definicion: porodilnoOtsustvo, contenido: contenidoPorodilnoOtsustvo, cliente: () => import("./calculadoras/porodilno-otsustvo.cliente") },
    { definicion: danokNaPrometNaNedvizhnosti, contenido: contenidoDanokNaPrometNaNedvizhnosti, cliente: () => import("./calculadoras/danok-na-promet-na-nedvizhnosti.cliente") },
    { definicion: danokNaImot, contenido: contenidoDanokNaImot, cliente: () => import("./calculadoras/danok-na-imot.cliente") },
    { definicion: danokNaNasledstvoIPodarok, contenido: contenidoDanokNaNasledstvoIPodarok, cliente: () => import("./calculadoras/danok-na-nasledstvo-i-podarok.cliente") },
    { definicion: kalkulatorZaInflacija, contenido: contenidoKalkulatorZaInflacija, cliente: () => import("./calculadoras/kalkulator-za-inflacija.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
