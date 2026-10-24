import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import calcularIrt from "./calculadoras/calcular-irt";
import custoDoTrabalhador from "./calculadoras/custo-do-trabalhador";
import salarioLiquido from "./calculadoras/salario-liquido";
import salarioMinimo from "./calculadoras/salario-minimo";
import segurancaSocialInss from "./calculadoras/seguranca-social-inss";
import contenidoCalcularIrt from "./contenido/calcular-irt";
import contenidoCustoDoTrabalhador from "./contenido/custo-do-trabalhador";
import contenidoSalarioLiquido from "./contenido/salario-liquido";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoSegurancaSocialInss from "./contenido/seguranca-social-inss";
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
    { definicion: salarioLiquido, contenido: contenidoSalarioLiquido, cliente: () => import("./calculadoras/salario-liquido.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: segurancaSocialInss, contenido: contenidoSegurancaSocialInss, cliente: () => import("./calculadoras/seguranca-social-inss.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
