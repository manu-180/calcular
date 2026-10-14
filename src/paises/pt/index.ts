import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import calcularIva from "./calculadoras/calcular-iva";
import diasDeFerias from "./calculadoras/dias-de-ferias";
import retencaoNaFonte from "./calculadoras/retencao-na-fonte";
import salarioLiquido from "./calculadoras/salario-liquido";
import salarioMinimo from "./calculadoras/salario-minimo";
import simuladorIrs from "./calculadoras/simulador-irs";
import subsidioDeFerias from "./calculadoras/subsidio-de-ferias";
import subsidioDeNatal from "./calculadoras/subsidio-de-natal";
import contenidoCalcularIva from "./contenido/calcular-iva";
import contenidoDiasDeFerias from "./contenido/dias-de-ferias";
import contenidoRetencaoNaFonte from "./contenido/retencao-na-fonte";
import contenidoSalarioLiquido from "./contenido/salario-liquido";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoSimuladorIrs from "./contenido/simulador-irs";
import contenidoSubsidioDeFerias from "./contenido/subsidio-de-ferias";
import contenidoSubsidioDeNatal from "./contenido/subsidio-de-natal";
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
    { definicion: calcularIva, contenido: contenidoCalcularIva, cliente: () => import("./calculadoras/calcular-iva.cliente") },
    { definicion: diasDeFerias, contenido: contenidoDiasDeFerias, cliente: () => import("./calculadoras/dias-de-ferias.cliente") },
    { definicion: retencaoNaFonte, contenido: contenidoRetencaoNaFonte, cliente: () => import("./calculadoras/retencao-na-fonte.cliente") },
    { definicion: salarioLiquido, contenido: contenidoSalarioLiquido, cliente: () => import("./calculadoras/salario-liquido.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: simuladorIrs, contenido: contenidoSimuladorIrs, cliente: () => import("./calculadoras/simulador-irs.cliente") },
    { definicion: subsidioDeFerias, contenido: contenidoSubsidioDeFerias, cliente: () => import("./calculadoras/subsidio-de-ferias.cliente") },
    { definicion: subsidioDeNatal, contenido: contenidoSubsidioDeNatal, cliente: () => import("./calculadoras/subsidio-de-natal.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
