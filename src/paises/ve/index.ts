import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import cestaticket from "./calculadoras/cestaticket";
import dolarBcv from "./calculadoras/dolar-bcv";
import horasExtra from "./calculadoras/horas-extra";
import iva from "./calculadoras/iva";
import liquidacion from "./calculadoras/liquidacion";
import prestacionesSociales from "./calculadoras/prestaciones-sociales";
import salarioMinimo from "./calculadoras/salario-minimo";
import utilidades from "./calculadoras/utilidades";
import vacaciones from "./calculadoras/vacaciones";
import contenidoCestaticket from "./contenido/cestaticket";
import contenidoDolarBcv from "./contenido/dolar-bcv";
import contenidoHorasExtra from "./contenido/horas-extra";
import contenidoIva from "./contenido/iva";
import contenidoLiquidacion from "./contenido/liquidacion";
import contenidoPrestacionesSociales from "./contenido/prestaciones-sociales";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoUtilidades from "./contenido/utilidades";
import contenidoVacaciones from "./contenido/vacaciones";
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
    { definicion: dolarBcv, contenido: contenidoDolarBcv, cliente: () => import("./calculadoras/dolar-bcv.cliente") },
    { definicion: prestacionesSociales, contenido: contenidoPrestacionesSociales, cliente: () => import("./calculadoras/prestaciones-sociales.cliente") },
    { definicion: liquidacion, contenido: contenidoLiquidacion, cliente: () => import("./calculadoras/liquidacion.cliente") },
    { definicion: utilidades, contenido: contenidoUtilidades, cliente: () => import("./calculadoras/utilidades.cliente") },
    { definicion: vacaciones, contenido: contenidoVacaciones, cliente: () => import("./calculadoras/vacaciones.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: horasExtra, contenido: contenidoHorasExtra, cliente: () => import("./calculadoras/horas-extra.cliente") },
    { definicion: iva, contenido: contenidoIva, cliente: () => import("./calculadoras/iva.cliente") },
    { definicion: cestaticket, contenido: contenidoCestaticket, cliente: () => import("./calculadoras/cestaticket.cliente") },
  ],
  novedades,
  detectores,
});
