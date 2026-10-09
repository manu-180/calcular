import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import aportesTss from "./calculadoras/aportes-tss";
import bonificacion from "./calculadoras/bonificacion";
import horasExtra from "./calculadoras/horas-extra";
import isrAsalariados from "./calculadoras/isr-asalariados";
import itbis from "./calculadoras/itbis";
import prestacionesLaborales from "./calculadoras/prestaciones-laborales";
import regaliaPascual from "./calculadoras/regalia-pascual";
import salarioMinimo from "./calculadoras/salario-minimo";
import salarioNeto from "./calculadoras/salario-neto";
import tasaDelDolar from "./calculadoras/tasa-del-dolar";
import vacaciones from "./calculadoras/vacaciones";
import contenidoAportesTss from "./contenido/aportes-tss";
import contenidoBonificacion from "./contenido/bonificacion";
import contenidoHorasExtra from "./contenido/horas-extra";
import contenidoIsrAsalariados from "./contenido/isr-asalariados";
import contenidoItbis from "./contenido/itbis";
import contenidoPrestacionesLaborales from "./contenido/prestaciones-laborales";
import contenidoRegaliaPascual from "./contenido/regalia-pascual";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoSalarioNeto from "./contenido/salario-neto";
import contenidoTasaDelDolar from "./contenido/tasa-del-dolar";
import contenidoVacaciones from "./contenido/vacaciones";
import inflacion from "./calculadoras/inflacion";
import contenidoInflacion from "./contenido/inflacion";
import rst from "./calculadoras/rst";
import contenidoRst from "./contenido/rst";
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
    { definicion: regaliaPascual, contenido: contenidoRegaliaPascual, cliente: () => import("./calculadoras/regalia-pascual.cliente") },
    { definicion: prestacionesLaborales, contenido: contenidoPrestacionesLaborales, cliente: () => import("./calculadoras/prestaciones-laborales.cliente") },
    { definicion: salarioNeto, contenido: contenidoSalarioNeto, cliente: () => import("./calculadoras/salario-neto.cliente") },
    { definicion: isrAsalariados, contenido: contenidoIsrAsalariados, cliente: () => import("./calculadoras/isr-asalariados.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: vacaciones, contenido: contenidoVacaciones, cliente: () => import("./calculadoras/vacaciones.cliente") },
    { definicion: horasExtra, contenido: contenidoHorasExtra, cliente: () => import("./calculadoras/horas-extra.cliente") },
    { definicion: bonificacion, contenido: contenidoBonificacion, cliente: () => import("./calculadoras/bonificacion.cliente") },
    { definicion: itbis, contenido: contenidoItbis, cliente: () => import("./calculadoras/itbis.cliente") },
    { definicion: tasaDelDolar, contenido: contenidoTasaDelDolar, cliente: () => import("./calculadoras/tasa-del-dolar.cliente") },
    { definicion: aportesTss, contenido: contenidoAportesTss, cliente: () => import("./calculadoras/aportes-tss.cliente") },
    { definicion: inflacion, contenido: contenidoInflacion, cliente: () => import("./calculadoras/inflacion.cliente") },
    { definicion: rst, contenido: contenidoRst, cliente: () => import("./calculadoras/rst.cliente") },
  ],
  novedades,
  detectores,
});
