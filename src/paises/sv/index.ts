import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import aguinaldo from "./calculadoras/aguinaldo";
import horasExtra from "./calculadoras/horas-extra";
import indemnizacion from "./calculadoras/indemnizacion";
import iva from "./calculadoras/iva";
import quincena25 from "./calculadoras/quincena-25";
import renunciaVoluntaria from "./calculadoras/renuncia-voluntaria";
import retencionDeRenta from "./calculadoras/retencion-de-renta";
import salarioLiquido from "./calculadoras/salario-liquido";
import salarioMinimo from "./calculadoras/salario-minimo";
import vacaciones from "./calculadoras/vacaciones";
import contenidoAguinaldo from "./contenido/aguinaldo";
import contenidoHorasExtra from "./contenido/horas-extra";
import contenidoIndemnizacion from "./contenido/indemnizacion";
import contenidoIva from "./contenido/iva";
import contenidoQuincena25 from "./contenido/quincena-25";
import contenidoRenunciaVoluntaria from "./contenido/renuncia-voluntaria";
import contenidoRetencionDeRenta from "./contenido/retencion-de-renta";
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
    { definicion: retencionDeRenta, contenido: contenidoRetencionDeRenta, cliente: () => import("./calculadoras/retencion-de-renta.cliente") },
    { definicion: indemnizacion, contenido: contenidoIndemnizacion, cliente: () => import("./calculadoras/indemnizacion.cliente") },
    { definicion: quincena25, contenido: contenidoQuincena25, cliente: () => import("./calculadoras/quincena-25.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: renunciaVoluntaria, contenido: contenidoRenunciaVoluntaria, cliente: () => import("./calculadoras/renuncia-voluntaria.cliente") },
    { definicion: vacaciones, contenido: contenidoVacaciones, cliente: () => import("./calculadoras/vacaciones.cliente") },
    { definicion: horasExtra, contenido: contenidoHorasExtra, cliente: () => import("./calculadoras/horas-extra.cliente") },
    { definicion: iva, contenido: contenidoIva, cliente: () => import("./calculadoras/iva.cliente") },
    { definicion: salarioLiquido, contenido: contenidoSalarioLiquido, cliente: () => import("./calculadoras/salario-liquido.cliente") },
  ],
  novedades,
  detectores,
});
