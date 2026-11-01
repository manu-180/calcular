import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import kalkulatorZaplataBrutoNeto from "./calculadoras/kalkulator-zaplata-bruto-neto";
import contenidoKalkulatorZaplataBrutoNeto from "./contenido/kalkulator-zaplata-bruto-neto";
import kalkulatorNetoBruto from "./calculadoras/kalkulator-neto-bruto";
import contenidoKalkulatorNetoBruto from "./contenido/kalkulator-neto-bruto";
import razhodiNaRabotodatelya from "./calculadoras/razhodi-na-rabotodatelya";
import contenidoRazhodiNaRabotodatelya from "./contenido/razhodi-na-rabotodatelya";
import minimalnaRabotnaZaplata from "./calculadoras/minimalna-rabotna-zaplata";
import contenidoMinimalnaRabotnaZaplata from "./contenido/minimalna-rabotna-zaplata";
import danakVarhuDohodite from "./calculadoras/danak-varhu-dohodite";
import contenidoDanakVarhuDohodite from "./contenido/danak-varhu-dohodite";
import osiguritelniVnoski from "./calculadoras/osiguritelni-vnoski";
import contenidoOsiguritelniVnoski from "./contenido/osiguritelni-vnoski";
import platenGodishenOtpusk from "./calculadoras/platen-godishen-otpusk";
import contenidoPlatenGodishenOtpusk from "./contenido/platen-godishen-otpusk";
import izchislyavaneNaBolnichni from "./calculadoras/izchislyavane-na-bolnichni";
import contenidoIzchislyavaneNaBolnichni from "./contenido/izchislyavane-na-bolnichni";
import obezshtenieZaMaychinstvo from "./calculadoras/obezshtenie-za-maychinstvo";
import contenidoObezshtenieZaMaychinstvo from "./contenido/obezshtenie-za-maychinstvo";
import obezshtenieZaOtglezhdaneNaDete from "./calculadoras/obezshtenie-za-otglezhdane-na-dete";
import contenidoObezshtenieZaOtglezhdaneNaDete from "./contenido/obezshtenie-za-otglezhdane-na-dete";
import obezshteniePriUvolnenie from "./calculadoras/obezshtenie-pri-uvolnenie";
import contenidoObezshteniePriUvolnenie from "./contenido/obezshtenie-pri-uvolnenie";
import predizvestiePriNapuskane from "./calculadoras/predizvestie-pri-napuskane";
import contenidoPredizvestiePriNapuskane from "./contenido/predizvestie-pri-napuskane";
import izvanredenTrud from "./calculadoras/izvanreden-trud";
import contenidoIzvanredenTrud from "./contenido/izvanreden-trud";
import obezshtenieZaBezrabotitsa from "./calculadoras/obezshtenie-za-bezrabotitsa";
import contenidoObezshtenieZaBezrabotitsa from "./contenido/obezshtenie-za-bezrabotitsa";
import samoosiguryavashtiSeLitsa from "./calculadoras/samoosiguryavashti-se-litsa";
import contenidoSamoosiguryavashtiSeLitsa from "./contenido/samoosiguryavashti-se-litsa";
import ddsKalkulator from "./calculadoras/dds-kalkulator";
import contenidoDdsKalkulator from "./contenido/dds-kalkulator";
import danakPriPokupkaNaImot from "./calculadoras/danak-pri-pokupka-na-imot";
import contenidoDanakPriPokupkaNaImot from "./contenido/danak-pri-pokupka-na-imot";
import kalkulatorZaInflatsia from "./calculadoras/kalkulator-za-inflatsia";
import contenidoKalkulatorZaInflatsia from "./contenido/kalkulator-za-inflatsia";
import danakDividenti from "./calculadoras/danak-dividenti";
import contenidoDanakDividenti from "./contenido/danak-dividenti";
import danakVarhuNedvizhimiImoti from "./calculadoras/danak-varhu-nedvizhimi-imoti";
import contenidoDanakVarhuNedvizhimiImoti from "./contenido/danak-varhu-nedvizhimi-imoti";
import zakonnaLihva from "./calculadoras/zakonna-lihva";
import contenidoZakonnaLihva from "./contenido/zakonna-lihva";
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
    { definicion: kalkulatorZaplataBrutoNeto, contenido: contenidoKalkulatorZaplataBrutoNeto, cliente: () => import("./calculadoras/kalkulator-zaplata-bruto-neto.cliente") },
    { definicion: kalkulatorNetoBruto, contenido: contenidoKalkulatorNetoBruto, cliente: () => import("./calculadoras/kalkulator-neto-bruto.cliente") },
    { definicion: razhodiNaRabotodatelya, contenido: contenidoRazhodiNaRabotodatelya, cliente: () => import("./calculadoras/razhodi-na-rabotodatelya.cliente") },
    { definicion: minimalnaRabotnaZaplata, contenido: contenidoMinimalnaRabotnaZaplata, cliente: () => import("./calculadoras/minimalna-rabotna-zaplata.cliente") },
    { definicion: danakVarhuDohodite, contenido: contenidoDanakVarhuDohodite, cliente: () => import("./calculadoras/danak-varhu-dohodite.cliente") },
    { definicion: osiguritelniVnoski, contenido: contenidoOsiguritelniVnoski, cliente: () => import("./calculadoras/osiguritelni-vnoski.cliente") },
    { definicion: platenGodishenOtpusk, contenido: contenidoPlatenGodishenOtpusk, cliente: () => import("./calculadoras/platen-godishen-otpusk.cliente") },
    { definicion: izchislyavaneNaBolnichni, contenido: contenidoIzchislyavaneNaBolnichni, cliente: () => import("./calculadoras/izchislyavane-na-bolnichni.cliente") },
    { definicion: obezshtenieZaMaychinstvo, contenido: contenidoObezshtenieZaMaychinstvo, cliente: () => import("./calculadoras/obezshtenie-za-maychinstvo.cliente") },
    { definicion: obezshtenieZaOtglezhdaneNaDete, contenido: contenidoObezshtenieZaOtglezhdaneNaDete, cliente: () => import("./calculadoras/obezshtenie-za-otglezhdane-na-dete.cliente") },
    { definicion: obezshteniePriUvolnenie, contenido: contenidoObezshteniePriUvolnenie, cliente: () => import("./calculadoras/obezshtenie-pri-uvolnenie.cliente") },
    { definicion: predizvestiePriNapuskane, contenido: contenidoPredizvestiePriNapuskane, cliente: () => import("./calculadoras/predizvestie-pri-napuskane.cliente") },
    { definicion: izvanredenTrud, contenido: contenidoIzvanredenTrud, cliente: () => import("./calculadoras/izvanreden-trud.cliente") },
    { definicion: obezshtenieZaBezrabotitsa, contenido: contenidoObezshtenieZaBezrabotitsa, cliente: () => import("./calculadoras/obezshtenie-za-bezrabotitsa.cliente") },
    { definicion: samoosiguryavashtiSeLitsa, contenido: contenidoSamoosiguryavashtiSeLitsa, cliente: () => import("./calculadoras/samoosiguryavashti-se-litsa.cliente") },
    { definicion: ddsKalkulator, contenido: contenidoDdsKalkulator, cliente: () => import("./calculadoras/dds-kalkulator.cliente") },
    { definicion: danakPriPokupkaNaImot, contenido: contenidoDanakPriPokupkaNaImot, cliente: () => import("./calculadoras/danak-pri-pokupka-na-imot.cliente") },
    { definicion: kalkulatorZaInflatsia, contenido: contenidoKalkulatorZaInflatsia, cliente: () => import("./calculadoras/kalkulator-za-inflatsia.cliente") },
    { definicion: danakDividenti, contenido: contenidoDanakDividenti, cliente: () => import("./calculadoras/danak-dividenti.cliente") },
    { definicion: danakVarhuNedvizhimiImoti, contenido: contenidoDanakVarhuNedvizhimiImoti, cliente: () => import("./calculadoras/danak-varhu-nedvizhimi-imoti.cliente") },
    { definicion: zakonnaLihva, contenido: contenidoZakonnaLihva, cliente: () => import("./calculadoras/zakonna-lihva.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
