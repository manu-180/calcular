import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import calcularIrt from "./calculadoras/calcular-irt";
import custoDoTrabalhador from "./calculadoras/custo-do-trabalhador";
import diasDeFerias from "./calculadoras/dias-de-ferias";
import horasExtraordinarias from "./calculadoras/horas-extraordinarias";
import salarioLiquido from "./calculadoras/salario-liquido";
import salarioMinimo from "./calculadoras/salario-minimo";
import segurancaSocialInss from "./calculadoras/seguranca-social-inss";
import subsidioDeFerias from "./calculadoras/subsidio-de-ferias";
import subsidioDeNatal from "./calculadoras/subsidio-de-natal";
import contenidoCalcularIrt from "./contenido/calcular-irt";
import contenidoCustoDoTrabalhador from "./contenido/custo-do-trabalhador";
import contenidoDiasDeFerias from "./contenido/dias-de-ferias";
import contenidoHorasExtraordinarias from "./contenido/horas-extraordinarias";
import contenidoSalarioLiquido from "./contenido/salario-liquido";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoSegurancaSocialInss from "./contenido/seguranca-social-inss";
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
    { definicion: calcularIrt, contenido: contenidoCalcularIrt, cliente: () => import("./calculadoras/calcular-irt.cliente") },
    { definicion: custoDoTrabalhador, contenido: contenidoCustoDoTrabalhador, cliente: () => import("./calculadoras/custo-do-trabalhador.cliente") },
    { definicion: diasDeFerias, contenido: contenidoDiasDeFerias, cliente: () => import("./calculadoras/dias-de-ferias.cliente") },
    { definicion: horasExtraordinarias, contenido: contenidoHorasExtraordinarias, cliente: () => import("./calculadoras/horas-extraordinarias.cliente") },
    { definicion: salarioLiquido, contenido: contenidoSalarioLiquido, cliente: () => import("./calculadoras/salario-liquido.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: segurancaSocialInss, contenido: contenidoSegurancaSocialInss, cliente: () => import("./calculadoras/seguranca-social-inss.cliente") },
    { definicion: subsidioDeFerias, contenido: contenidoSubsidioDeFerias, cliente: () => import("./calculadoras/subsidio-de-ferias.cliente") },
    { definicion: subsidioDeNatal, contenido: contenidoSubsidioDeNatal, cliente: () => import("./calculadoras/subsidio-de-natal.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
