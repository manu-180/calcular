import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import calcularIrps from "./calculadoras/calcular-irps";
import calcularIspc from "./calculadoras/calcular-ispc";
import calcularIva from "./calculadoras/calcular-iva";
import contribuicaoInss from "./calculadoras/contribuicao-inss";
import custoDoTrabalhador from "./calculadoras/custo-do-trabalhador";
import salarioLiquido from "./calculadoras/salario-liquido";
import contenidoCalcularIrps from "./contenido/calcular-irps";
import contenidoCalcularIspc from "./contenido/calcular-ispc";
import contenidoCalcularIva from "./contenido/calcular-iva";
import contenidoContribuicaoInss from "./contenido/contribuicao-inss";
import contenidoCustoDoTrabalhador from "./contenido/custo-do-trabalhador";
import contenidoSalarioLiquido from "./contenido/salario-liquido";
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
    { definicion: calcularIrps, contenido: contenidoCalcularIrps, cliente: () => import("./calculadoras/calcular-irps.cliente") },
    { definicion: calcularIspc, contenido: contenidoCalcularIspc, cliente: () => import("./calculadoras/calcular-ispc.cliente") },
    { definicion: calcularIva, contenido: contenidoCalcularIva, cliente: () => import("./calculadoras/calcular-iva.cliente") },
    { definicion: contribuicaoInss, contenido: contenidoContribuicaoInss, cliente: () => import("./calculadoras/contribuicao-inss.cliente") },
    { definicion: custoDoTrabalhador, contenido: contenidoCustoDoTrabalhador, cliente: () => import("./calculadoras/custo-do-trabalhador.cliente") },
    { definicion: salarioLiquido, contenido: contenidoSalarioLiquido, cliente: () => import("./calculadoras/salario-liquido.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
