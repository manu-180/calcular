import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import salarioLiquido from "./calculadoras/salario-liquido";
import contenidoSalarioLiquido from "./contenido/salario-liquido";
import calculoIrrf from "./calculadoras/calculo-irrf";
import contenidoCalculoIrrf from "./contenido/calculo-irrf";
import calculoInss from "./calculadoras/calculo-inss";
import contenidoCalculoInss from "./contenido/calculo-inss";
import decimoTerceiro from "./calculadoras/decimo-terceiro";
import contenidoDecimoTerceiro from "./contenido/decimo-terceiro";
import calculoDeFerias from "./calculadoras/calculo-de-ferias";
import contenidoCalculoDeFerias from "./contenido/calculo-de-ferias";
import avisoPrevio from "./calculadoras/aviso-previo";
import contenidoAvisoPrevio from "./contenido/aviso-previo";
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
    { definicion: salarioLiquido, contenido: contenidoSalarioLiquido, cliente: () => import("./calculadoras/salario-liquido.cliente") },
    { definicion: calculoIrrf, contenido: contenidoCalculoIrrf, cliente: () => import("./calculadoras/calculo-irrf.cliente") },
    { definicion: calculoInss, contenido: contenidoCalculoInss, cliente: () => import("./calculadoras/calculo-inss.cliente") },
    { definicion: decimoTerceiro, contenido: contenidoDecimoTerceiro, cliente: () => import("./calculadoras/decimo-terceiro.cliente") },
    { definicion: calculoDeFerias, contenido: contenidoCalculoDeFerias, cliente: () => import("./calculadoras/calculo-de-ferias.cliente") },
    { definicion: avisoPrevio, contenido: contenidoAvisoPrevio, cliente: () => import("./calculadoras/aviso-previo.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
