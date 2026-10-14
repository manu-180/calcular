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
import calculoFgts from "./calculadoras/calculo-fgts";
import contenidoCalculoFgts from "./contenido/calculo-fgts";
import saqueAniversarioFgts from "./calculadoras/saque-aniversario-fgts";
import contenidoSaqueAniversarioFgts from "./contenido/saque-aniversario-fgts";
import horaExtra from "./calculadoras/hora-extra";
import contenidoHoraExtra from "./contenido/hora-extra";
import adicionalNoturno from "./calculadoras/adicional-noturno";
import contenidoAdicionalNoturno from "./contenido/adicional-noturno";
import salarioMinimo from "./calculadoras/salario-minimo";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import seguroDesemprego from "./calculadoras/seguro-desemprego";
import contenidoSeguroDesemprego from "./contenido/seguro-desemprego";
import abonoSalarial from "./calculadoras/abono-salarial";
import contenidoAbonoSalarial from "./contenido/abono-salarial";
import dasMei from "./calculadoras/das-mei";
import contenidoDasMei from "./contenido/das-mei";
import inssAutonomo from "./calculadoras/inss-autonomo";
import contenidoInssAutonomo from "./contenido/inss-autonomo";
import insalubridade from "./calculadoras/insalubridade";
import contenidoInsalubridade from "./contenido/insalubridade";
import periculosidade from "./calculadoras/periculosidade";
import contenidoPericulosidade from "./contenido/periculosidade";
import valeTransporte from "./calculadoras/vale-transporte";
import contenidoValeTransporte from "./contenido/vale-transporte";
import calculoRescisao from "./calculadoras/calculo-rescisao";
import contenidoCalculoRescisao from "./contenido/calculo-rescisao";
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
    { definicion: calculoFgts, contenido: contenidoCalculoFgts, cliente: () => import("./calculadoras/calculo-fgts.cliente") },
    { definicion: saqueAniversarioFgts, contenido: contenidoSaqueAniversarioFgts, cliente: () => import("./calculadoras/saque-aniversario-fgts.cliente") },
    { definicion: horaExtra, contenido: contenidoHoraExtra, cliente: () => import("./calculadoras/hora-extra.cliente") },
    { definicion: adicionalNoturno, contenido: contenidoAdicionalNoturno, cliente: () => import("./calculadoras/adicional-noturno.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: seguroDesemprego, contenido: contenidoSeguroDesemprego, cliente: () => import("./calculadoras/seguro-desemprego.cliente") },
    { definicion: abonoSalarial, contenido: contenidoAbonoSalarial, cliente: () => import("./calculadoras/abono-salarial.cliente") },
    { definicion: dasMei, contenido: contenidoDasMei, cliente: () => import("./calculadoras/das-mei.cliente") },
    { definicion: inssAutonomo, contenido: contenidoInssAutonomo, cliente: () => import("./calculadoras/inss-autonomo.cliente") },
    { definicion: insalubridade, contenido: contenidoInsalubridade, cliente: () => import("./calculadoras/insalubridade.cliente") },
    { definicion: periculosidade, contenido: contenidoPericulosidade, cliente: () => import("./calculadoras/periculosidade.cliente") },
    { definicion: valeTransporte, contenido: contenidoValeTransporte, cliente: () => import("./calculadoras/vale-transporte.cliente") },
    { definicion: calculoRescisao, contenido: contenidoCalculoRescisao, cliente: () => import("./calculadoras/calculo-rescisao.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
