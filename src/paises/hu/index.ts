import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import nettoberKalkulator from "./calculadoras/nettober-kalkulator";
import contenidoNettoberKalkulator from "./contenido/nettober-kalkulator";
import bruttoBerKalkulator from "./calculadoras/brutto-ber-kalkulator";
import contenidoBruttoBerKalkulator from "./contenido/brutto-ber-kalkulator";
import munkaltatoiKoltsegKalkulator from "./calculadoras/munkaltatoi-koltseg-kalkulator";
import contenidoMunkaltatoiKoltsegKalkulator from "./contenido/munkaltatoi-koltseg-kalkulator";
import minimalberKalkulator from "./calculadoras/minimalber-kalkulator";
import contenidoMinimalberKalkulator from "./contenido/minimalber-kalkulator";
import csaladiAdokedvezmenyKalkulator from "./calculadoras/csaladi-adokedvezmeny-kalkulator";
import contenidoCsaladiAdokedvezmenyKalkulator from "./contenido/csaladi-adokedvezmeny-kalkulator";
import jarulekKalkulator from "./calculadoras/jarulek-kalkulator";
import contenidoJarulekKalkulator from "./contenido/jarulek-kalkulator";
import atalanyadoKalkulator from "./calculadoras/atalanyado-kalkulator";
import contenidoAtalanyadoKalkulator from "./contenido/atalanyado-kalkulator";
import kataKalkulator from "./calculadoras/kata-kalkulator";
import contenidoKataKalkulator from "./contenido/kata-kalkulator";
import afaKalkulator from "./calculadoras/afa-kalkulator";
import contenidoAfaKalkulator from "./contenido/afa-kalkulator";
import szabadsagKalkulator from "./calculadoras/szabadsag-kalkulator";
import contenidoSzabadsagKalkulator from "./contenido/szabadsag-kalkulator";
import vegkielegitesSzamitas from "./calculadoras/vegkielegites-szamitas";
import contenidoVegkielegitesSzamitas from "./contenido/vegkielegites-szamitas";
import felmondasiIdoKalkulator from "./calculadoras/felmondasi-ido-kalkulator";
import contenidoFelmondasiIdoKalkulator from "./contenido/felmondasi-ido-kalkulator";
import tuloraKalkulator from "./calculadoras/tulora-kalkulator";
import contenidoTuloraKalkulator from "./contenido/tulora-kalkulator";
import tappenzKalkulator from "./calculadoras/tappenz-kalkulator";
import contenidoTappenzKalkulator from "./contenido/tappenz-kalkulator";
import csedKalkulator from "./calculadoras/csed-kalkulator";
import contenidoCsedKalkulator from "./contenido/csed-kalkulator";
import gyedKalkulator from "./calculadoras/gyed-kalkulator";
import contenidoGyedKalkulator from "./contenido/gyed-kalkulator";
import csaladiPotlekKalkulator from "./calculadoras/csaladi-potlek-kalkulator";
import contenidoCsaladiPotlekKalkulator from "./contenido/csaladi-potlek-kalkulator";
import illetekKalkulator from "./calculadoras/illetek-kalkulator";
import contenidoIlletekKalkulator from "./contenido/illetek-kalkulator";
import arfolyamKalkulator from "./calculadoras/arfolyam-kalkulator";
import contenidoArfolyamKalkulator from "./contenido/arfolyam-kalkulator";
import inflacioKalkulator from "./calculadoras/inflacio-kalkulator";
import contenidoInflacioKalkulator from "./contenido/inflacio-kalkulator";
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
    { definicion: nettoberKalkulator, contenido: contenidoNettoberKalkulator, cliente: () => import("./calculadoras/nettober-kalkulator.cliente") },
    { definicion: bruttoBerKalkulator, contenido: contenidoBruttoBerKalkulator, cliente: () => import("./calculadoras/brutto-ber-kalkulator.cliente") },
    { definicion: munkaltatoiKoltsegKalkulator, contenido: contenidoMunkaltatoiKoltsegKalkulator, cliente: () => import("./calculadoras/munkaltatoi-koltseg-kalkulator.cliente") },
    { definicion: minimalberKalkulator, contenido: contenidoMinimalberKalkulator, cliente: () => import("./calculadoras/minimalber-kalkulator.cliente") },
    { definicion: csaladiAdokedvezmenyKalkulator, contenido: contenidoCsaladiAdokedvezmenyKalkulator, cliente: () => import("./calculadoras/csaladi-adokedvezmeny-kalkulator.cliente") },
    { definicion: jarulekKalkulator, contenido: contenidoJarulekKalkulator, cliente: () => import("./calculadoras/jarulek-kalkulator.cliente") },
    { definicion: atalanyadoKalkulator, contenido: contenidoAtalanyadoKalkulator, cliente: () => import("./calculadoras/atalanyado-kalkulator.cliente") },
    { definicion: kataKalkulator, contenido: contenidoKataKalkulator, cliente: () => import("./calculadoras/kata-kalkulator.cliente") },
    { definicion: afaKalkulator, contenido: contenidoAfaKalkulator, cliente: () => import("./calculadoras/afa-kalkulator.cliente") },
    { definicion: szabadsagKalkulator, contenido: contenidoSzabadsagKalkulator, cliente: () => import("./calculadoras/szabadsag-kalkulator.cliente") },
    { definicion: vegkielegitesSzamitas, contenido: contenidoVegkielegitesSzamitas, cliente: () => import("./calculadoras/vegkielegites-szamitas.cliente") },
    { definicion: felmondasiIdoKalkulator, contenido: contenidoFelmondasiIdoKalkulator, cliente: () => import("./calculadoras/felmondasi-ido-kalkulator.cliente") },
    { definicion: tuloraKalkulator, contenido: contenidoTuloraKalkulator, cliente: () => import("./calculadoras/tulora-kalkulator.cliente") },
    { definicion: tappenzKalkulator, contenido: contenidoTappenzKalkulator, cliente: () => import("./calculadoras/tappenz-kalkulator.cliente") },
    { definicion: csedKalkulator, contenido: contenidoCsedKalkulator, cliente: () => import("./calculadoras/csed-kalkulator.cliente") },
    { definicion: gyedKalkulator, contenido: contenidoGyedKalkulator, cliente: () => import("./calculadoras/gyed-kalkulator.cliente") },
    { definicion: csaladiPotlekKalkulator, contenido: contenidoCsaladiPotlekKalkulator, cliente: () => import("./calculadoras/csaladi-potlek-kalkulator.cliente") },
    { definicion: illetekKalkulator, contenido: contenidoIlletekKalkulator, cliente: () => import("./calculadoras/illetek-kalkulator.cliente") },
    { definicion: arfolyamKalkulator, contenido: contenidoArfolyamKalkulator, cliente: () => import("./calculadoras/arfolyam-kalkulator.cliente") },
    { definicion: inflacioKalkulator, contenido: contenidoInflacioKalkulator, cliente: () => import("./calculadoras/inflacio-kalkulator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
