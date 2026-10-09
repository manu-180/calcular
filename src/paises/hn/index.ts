import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import decimoCuartoMes from "./calculadoras/decimo-cuarto-mes";
import decimoTercerMes from "./calculadoras/decimo-tercer-mes";
import horasExtra from "./calculadoras/horas-extra";
import impuestoSobreLaRenta from "./calculadoras/impuesto-sobre-la-renta";
import inflacion from "./calculadoras/inflacion";
import isv from "./calculadoras/isv";
import prestacionesLaborales from "./calculadoras/prestaciones-laborales";
import salarioMinimo from "./calculadoras/salario-minimo";
import tipoDeCambio from "./calculadoras/tipo-de-cambio";
import vacaciones from "./calculadoras/vacaciones";
import contenidoDecimoCuartoMes from "./contenido/decimo-cuarto-mes";
import contenidoDecimoTercerMes from "./contenido/decimo-tercer-mes";
import contenidoHorasExtra from "./contenido/horas-extra";
import contenidoImpuestoSobreLaRenta from "./contenido/impuesto-sobre-la-renta";
import contenidoInflacion from "./contenido/inflacion";
import contenidoIsv from "./contenido/isv";
import contenidoPrestacionesLaborales from "./contenido/prestaciones-laborales";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoTipoDeCambio from "./contenido/tipo-de-cambio";
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
    { definicion: decimoCuartoMes, contenido: contenidoDecimoCuartoMes, cliente: () => import("./calculadoras/decimo-cuarto-mes.cliente") },
    { definicion: prestacionesLaborales, contenido: contenidoPrestacionesLaborales, cliente: () => import("./calculadoras/prestaciones-laborales.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: impuestoSobreLaRenta, contenido: contenidoImpuestoSobreLaRenta, cliente: () => import("./calculadoras/impuesto-sobre-la-renta.cliente") },
    { definicion: vacaciones, contenido: contenidoVacaciones, cliente: () => import("./calculadoras/vacaciones.cliente") },
    { definicion: horasExtra, contenido: contenidoHorasExtra, cliente: () => import("./calculadoras/horas-extra.cliente") },
    { definicion: isv, contenido: contenidoIsv, cliente: () => import("./calculadoras/isv.cliente") },
    { definicion: tipoDeCambio, contenido: contenidoTipoDeCambio, cliente: () => import("./calculadoras/tipo-de-cambio.cliente") },
    { definicion: decimoTercerMes, contenido: contenidoDecimoTercerMes, cliente: () => import("./calculadoras/decimo-tercer-mes.cliente") },
    { definicion: inflacion, contenido: contenidoInflacion, cliente: () => import("./calculadoras/inflacion.cliente") },
  ],
  novedades,
  detectores,
});
