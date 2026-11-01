import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import algasKalkulators from "./calculadoras/algas-kalkulators";
import contenidoAlgasKalkulators from "./contenido/algas-kalkulators";
import netoBrutoKalkulators from "./calculadoras/neto-bruto-kalkulators";
import contenidoNetoBrutoKalkulators from "./contenido/neto-bruto-kalkulators";
import darbaDevejaIzmaksas from "./calculadoras/darba-deveja-izmaksas";
import contenidoDarbaDevejaIzmaksas from "./contenido/darba-deveja-izmaksas";
import minimalaAlga from "./calculadoras/minimala-alga";
import contenidoMinimalaAlga from "./contenido/minimala-alga";
import iinKalkulators from "./calculadoras/iin-kalkulators";
import contenidoIinKalkulators from "./contenido/iin-kalkulators";
import neapliekamaisMinimums from "./calculadoras/neapliekamais-minimums";
import contenidoNeapliekamaisMinimums from "./contenido/neapliekamais-minimums";
import vsaoiKalkulators from "./calculadoras/vsaoi-kalkulators";
import contenidoVsaoiKalkulators from "./contenido/vsaoi-kalkulators";
import pasnodarbinataNodokli from "./calculadoras/pasnodarbinata-nodokli";
import contenidoPasnodarbinataNodokli from "./contenido/pasnodarbinata-nodokli";
import mikrouznemumaNodoklis from "./calculadoras/mikrouznemuma-nodoklis";
import contenidoMikrouznemumaNodoklis from "./contenido/mikrouznemuma-nodoklis";
import pvnKalkulators from "./calculadoras/pvn-kalkulators";
import contenidoPvnKalkulators from "./contenido/pvn-kalkulators";
import nekustamaIpasumaNodoklis from "./calculadoras/nekustama-ipasuma-nodoklis";
import contenidoNekustamaIpasumaNodoklis from "./contenido/nekustama-ipasuma-nodoklis";
import inflacijasKalkulators from "./calculadoras/inflacijas-kalkulators";
import contenidoInflacijasKalkulators from "./contenido/inflacijas-kalkulators";
import videjaAlga from "./calculadoras/videja-alga";
import contenidoVidejaAlga from "./contenido/videja-alga";
import atvalinajumaNaudasAprekins from "./calculadoras/atvalinajuma-naudas-aprekins";
import contenidoAtvalinajumaNaudasAprekins from "./contenido/atvalinajuma-naudas-aprekins";
import slimibasNaudasAprekins from "./calculadoras/slimibas-naudas-aprekins";
import contenidoSlimibasNaudasAprekins from "./contenido/slimibas-naudas-aprekins";
import maternitatesPabalsts from "./calculadoras/maternitates-pabalsts";
import contenidoMaternitatesPabalsts from "./contenido/maternitates-pabalsts";
import vecakuPabalsts from "./calculadoras/vecaku-pabalsts";
import contenidoVecakuPabalsts from "./contenido/vecaku-pabalsts";
import bezdarbniekaPabalsts from "./calculadoras/bezdarbnieka-pabalsts";
import contenidoBezdarbniekaPabalsts from "./contenido/bezdarbnieka-pabalsts";
import atlaisanasPabalsts from "./calculadoras/atlaisanas-pabalsts";
import contenidoAtlaisanasPabalsts from "./contenido/atlaisanas-pabalsts";
import uzteikumaTermins from "./calculadoras/uzteikuma-termins";
import contenidoUzteikumaTermins from "./contenido/uzteikuma-termins";
import virsstunduAprekins from "./calculadoras/virsstundu-aprekins";
import contenidoVirsstunduAprekins from "./contenido/virsstundu-aprekins";
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
    { definicion: algasKalkulators, contenido: contenidoAlgasKalkulators, cliente: () => import("./calculadoras/algas-kalkulators.cliente") },
    { definicion: netoBrutoKalkulators, contenido: contenidoNetoBrutoKalkulators, cliente: () => import("./calculadoras/neto-bruto-kalkulators.cliente") },
    { definicion: darbaDevejaIzmaksas, contenido: contenidoDarbaDevejaIzmaksas, cliente: () => import("./calculadoras/darba-deveja-izmaksas.cliente") },
    { definicion: minimalaAlga, contenido: contenidoMinimalaAlga, cliente: () => import("./calculadoras/minimala-alga.cliente") },
    { definicion: iinKalkulators, contenido: contenidoIinKalkulators, cliente: () => import("./calculadoras/iin-kalkulators.cliente") },
    { definicion: neapliekamaisMinimums, contenido: contenidoNeapliekamaisMinimums, cliente: () => import("./calculadoras/neapliekamais-minimums.cliente") },
    { definicion: vsaoiKalkulators, contenido: contenidoVsaoiKalkulators, cliente: () => import("./calculadoras/vsaoi-kalkulators.cliente") },
    { definicion: pasnodarbinataNodokli, contenido: contenidoPasnodarbinataNodokli, cliente: () => import("./calculadoras/pasnodarbinata-nodokli.cliente") },
    { definicion: mikrouznemumaNodoklis, contenido: contenidoMikrouznemumaNodoklis, cliente: () => import("./calculadoras/mikrouznemuma-nodoklis.cliente") },
    { definicion: pvnKalkulators, contenido: contenidoPvnKalkulators, cliente: () => import("./calculadoras/pvn-kalkulators.cliente") },
    { definicion: nekustamaIpasumaNodoklis, contenido: contenidoNekustamaIpasumaNodoklis, cliente: () => import("./calculadoras/nekustama-ipasuma-nodoklis.cliente") },
    { definicion: inflacijasKalkulators, contenido: contenidoInflacijasKalkulators, cliente: () => import("./calculadoras/inflacijas-kalkulators.cliente") },
    { definicion: videjaAlga, contenido: contenidoVidejaAlga, cliente: () => import("./calculadoras/videja-alga.cliente") },
    { definicion: atvalinajumaNaudasAprekins, contenido: contenidoAtvalinajumaNaudasAprekins, cliente: () => import("./calculadoras/atvalinajuma-naudas-aprekins.cliente") },
    { definicion: slimibasNaudasAprekins, contenido: contenidoSlimibasNaudasAprekins, cliente: () => import("./calculadoras/slimibas-naudas-aprekins.cliente") },
    { definicion: maternitatesPabalsts, contenido: contenidoMaternitatesPabalsts, cliente: () => import("./calculadoras/maternitates-pabalsts.cliente") },
    { definicion: vecakuPabalsts, contenido: contenidoVecakuPabalsts, cliente: () => import("./calculadoras/vecaku-pabalsts.cliente") },
    { definicion: bezdarbniekaPabalsts, contenido: contenidoBezdarbniekaPabalsts, cliente: () => import("./calculadoras/bezdarbnieka-pabalsts.cliente") },
    { definicion: atlaisanasPabalsts, contenido: contenidoAtlaisanasPabalsts, cliente: () => import("./calculadoras/atlaisanas-pabalsts.cliente") },
    { definicion: uzteikumaTermins, contenido: contenidoUzteikumaTermins, cliente: () => import("./calculadoras/uzteikuma-termins.cliente") },
    { definicion: virsstunduAprekins, contenido: contenidoVirsstunduAprekins, cliente: () => import("./calculadoras/virsstundu-aprekins.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
