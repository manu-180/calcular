import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import aguinaldo from "./calculadoras/aguinaldo";
import costoEmpleador from "./calculadoras/costo-empleador";
import declaracionDeRenta from "./calculadoras/declaracion-de-renta";
import descuentosIsssAfp from "./calculadoras/descuentos-isss-afp";
import horasExtra from "./calculadoras/horas-extra";
import incapacidad from "./calculadoras/incapacidad";
import indemnizacion from "./calculadoras/indemnizacion";
import inflacion from "./calculadoras/inflacion";
import iva from "./calculadoras/iva";
import licenciaPorMaternidad from "./calculadoras/licencia-por-maternidad";
import liquidacion from "./calculadoras/liquidacion";
import quincena25 from "./calculadoras/quincena-25";
import renunciaVoluntaria from "./calculadoras/renuncia-voluntaria";
import retencionDeRenta from "./calculadoras/retencion-de-renta";
import retencionServiciosProfesionales from "./calculadoras/retencion-servicios-profesionales";
import salarioLiquido from "./calculadoras/salario-liquido";
import salarioMinimo from "./calculadoras/salario-minimo";
import vacaciones from "./calculadoras/vacaciones";
import contenidoAguinaldo from "./contenido/aguinaldo";
import contenidoCostoEmpleador from "./contenido/costo-empleador";
import contenidoDeclaracionDeRenta from "./contenido/declaracion-de-renta";
import contenidoDescuentosIsssAfp from "./contenido/descuentos-isss-afp";
import contenidoHorasExtra from "./contenido/horas-extra";
import contenidoIncapacidad from "./contenido/incapacidad";
import contenidoIndemnizacion from "./contenido/indemnizacion";
import contenidoInflacion from "./contenido/inflacion";
import contenidoIva from "./contenido/iva";
import contenidoLicenciaPorMaternidad from "./contenido/licencia-por-maternidad";
import contenidoLiquidacion from "./contenido/liquidacion";
import contenidoQuincena25 from "./contenido/quincena-25";
import contenidoRenunciaVoluntaria from "./contenido/renuncia-voluntaria";
import contenidoRetencionDeRenta from "./contenido/retencion-de-renta";
import contenidoRetencionServiciosProfesionales from "./contenido/retencion-servicios-profesionales";
import contenidoSalarioLiquido from "./contenido/salario-liquido";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
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
    { definicion: aguinaldo, contenido: contenidoAguinaldo, cliente: () => import("./calculadoras/aguinaldo.cliente") },
    { definicion: salarioLiquido, contenido: contenidoSalarioLiquido, cliente: () => import("./calculadoras/salario-liquido.cliente") },
    { definicion: retencionDeRenta, contenido: contenidoRetencionDeRenta, cliente: () => import("./calculadoras/retencion-de-renta.cliente") },
    { definicion: indemnizacion, contenido: contenidoIndemnizacion, cliente: () => import("./calculadoras/indemnizacion.cliente") },
    { definicion: liquidacion, contenido: contenidoLiquidacion, cliente: () => import("./calculadoras/liquidacion.cliente") },
    { definicion: quincena25, contenido: contenidoQuincena25, cliente: () => import("./calculadoras/quincena-25.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: renunciaVoluntaria, contenido: contenidoRenunciaVoluntaria, cliente: () => import("./calculadoras/renuncia-voluntaria.cliente") },
    { definicion: vacaciones, contenido: contenidoVacaciones, cliente: () => import("./calculadoras/vacaciones.cliente") },
    { definicion: horasExtra, contenido: contenidoHorasExtra, cliente: () => import("./calculadoras/horas-extra.cliente") },
    { definicion: descuentosIsssAfp, contenido: contenidoDescuentosIsssAfp, cliente: () => import("./calculadoras/descuentos-isss-afp.cliente") },
    { definicion: costoEmpleador, contenido: contenidoCostoEmpleador, cliente: () => import("./calculadoras/costo-empleador.cliente") },
    { definicion: declaracionDeRenta, contenido: contenidoDeclaracionDeRenta, cliente: () => import("./calculadoras/declaracion-de-renta.cliente") },
    { definicion: retencionServiciosProfesionales, contenido: contenidoRetencionServiciosProfesionales, cliente: () => import("./calculadoras/retencion-servicios-profesionales.cliente") },
    { definicion: incapacidad, contenido: contenidoIncapacidad, cliente: () => import("./calculadoras/incapacidad.cliente") },
    { definicion: licenciaPorMaternidad, contenido: contenidoLicenciaPorMaternidad, cliente: () => import("./calculadoras/licencia-por-maternidad.cliente") },
    { definicion: iva, contenido: contenidoIva, cliente: () => import("./calculadoras/iva.cliente") },
    { definicion: inflacion, contenido: contenidoInflacion, cliente: () => import("./calculadoras/inflacion.cliente") },
  ],
  novedades,
  detectores,
});
