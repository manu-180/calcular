import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import tsalingiinTootsooluur from "./calculadoras/tsalingiin-tootsooluur";
import contenidoTsalingiinTootsooluur from "./contenido/tsalingiin-tootsooluur";
import bokhirTseverTsalin from "./calculadoras/bokhir-tsever-tsalin";
import contenidoBokhirTseverTsalin from "./contenido/bokhir-tsever-tsalin";
import ajilOlgogchiinZardalTootsooluur from "./calculadoras/ajil-olgogchiin-zardal-tootsooluur";
import contenidoAjilOlgogchiinZardalTootsooluur from "./contenido/ajil-olgogchiin-zardal-tootsooluur";
import doodTsalin from "./calculadoras/dood-tsalin";
import contenidoDoodTsalin from "./contenido/dood-tsalin";
import khkhoatTootsooluur from "./calculadoras/khkhoat-tootsooluur";
import contenidoKhkhoatTootsooluur from "./contenido/khkhoat-tootsooluur";
import ndshTootsooluur from "./calculadoras/ndsh-tootsooluur";
import contenidoNdshTootsooluur from "./contenido/ndsh-tootsooluur";
import eeljiinAmraltynOlgovor from "./calculadoras/eeljiin-amraltyn-olgovor";
import contenidoEeljiinAmraltynOlgovor from "./contenido/eeljiin-amraltyn-olgovor";
import iluuTsagiinKhols from "./calculadoras/iluu-tsagiin-khols";
import contenidoIluuTsagiinKhols from "./contenido/iluu-tsagiin-khols";
import khalagdsanyTetgemj from "./calculadoras/khalagdsany-tetgemj";
import contenidoKhalagdsanyTetgemj from "./contenido/khalagdsany-tetgemj";
import ajlaasGarakhMedegdel from "./calculadoras/ajlaas-garakh-medegdel";
import contenidoAjlaasGarakhMedegdel from "./contenido/ajlaas-garakh-medegdel";
import jiremsniiTetgemj from "./calculadoras/jiremsnii-tetgemj";
import contenidoJiremsniiTetgemj from "./contenido/jiremsnii-tetgemj";
import ovchniiTetgemj from "./calculadoras/ovchnii-tetgemj";
import contenidoOvchniiTetgemj from "./contenido/ovchnii-tetgemj";
import valyutynKhansh from "./calculadoras/valyutyn-khansh";
import contenidoValyutynKhansh from "./contenido/valyutyn-khansh";
import inflyatsiinTootsooluur from "./calculadoras/inflyatsiin-tootsooluur";
import contenidoInflyatsiinTootsooluur from "./contenido/inflyatsiin-tootsooluur";
import tetgeverTootsooluur from "./calculadoras/tetgever-tootsooluur";
import contenidoTetgeverTootsooluur from "./contenido/tetgever-tootsooluur";
import ulKhodlokhKhorongiinTatvar from "./calculadoras/ul-khodlokh-khorongiin-tatvar";
import contenidoUlKhodlokhKhorongiinTatvar from "./contenido/ul-khodlokh-khorongiin-tatvar";
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
    { definicion: tsalingiinTootsooluur, contenido: contenidoTsalingiinTootsooluur, cliente: () => import("./calculadoras/tsalingiin-tootsooluur.cliente") },
    { definicion: bokhirTseverTsalin, contenido: contenidoBokhirTseverTsalin, cliente: () => import("./calculadoras/bokhir-tsever-tsalin.cliente") },
    { definicion: ajilOlgogchiinZardalTootsooluur, contenido: contenidoAjilOlgogchiinZardalTootsooluur, cliente: () => import("./calculadoras/ajil-olgogchiin-zardal-tootsooluur.cliente") },
    { definicion: doodTsalin, contenido: contenidoDoodTsalin, cliente: () => import("./calculadoras/dood-tsalin.cliente") },
    { definicion: khkhoatTootsooluur, contenido: contenidoKhkhoatTootsooluur, cliente: () => import("./calculadoras/khkhoat-tootsooluur.cliente") },
    { definicion: ndshTootsooluur, contenido: contenidoNdshTootsooluur, cliente: () => import("./calculadoras/ndsh-tootsooluur.cliente") },
    { definicion: eeljiinAmraltynOlgovor, contenido: contenidoEeljiinAmraltynOlgovor, cliente: () => import("./calculadoras/eeljiin-amraltyn-olgovor.cliente") },
    { definicion: iluuTsagiinKhols, contenido: contenidoIluuTsagiinKhols, cliente: () => import("./calculadoras/iluu-tsagiin-khols.cliente") },
    { definicion: khalagdsanyTetgemj, contenido: contenidoKhalagdsanyTetgemj, cliente: () => import("./calculadoras/khalagdsany-tetgemj.cliente") },
    { definicion: ajlaasGarakhMedegdel, contenido: contenidoAjlaasGarakhMedegdel, cliente: () => import("./calculadoras/ajlaas-garakh-medegdel.cliente") },
    { definicion: jiremsniiTetgemj, contenido: contenidoJiremsniiTetgemj, cliente: () => import("./calculadoras/jiremsnii-tetgemj.cliente") },
    { definicion: ovchniiTetgemj, contenido: contenidoOvchniiTetgemj, cliente: () => import("./calculadoras/ovchnii-tetgemj.cliente") },
    { definicion: valyutynKhansh, contenido: contenidoValyutynKhansh, cliente: () => import("./calculadoras/valyutyn-khansh.cliente") },
    { definicion: inflyatsiinTootsooluur, contenido: contenidoInflyatsiinTootsooluur, cliente: () => import("./calculadoras/inflyatsiin-tootsooluur.cliente") },
    { definicion: tetgeverTootsooluur, contenido: contenidoTetgeverTootsooluur, cliente: () => import("./calculadoras/tetgever-tootsooluur.cliente") },
    { definicion: ulKhodlokhKhorongiinTatvar, contenido: contenidoUlKhodlokhKhorongiinTatvar, cliente: () => import("./calculadoras/ul-khodlokh-khorongiin-tatvar.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
