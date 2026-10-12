import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import aguinaldo from "./calculadoras/aguinaldo";
import cesantia from "./calculadoras/cesantia";
import horasExtra from "./calculadoras/horas-extra";
import impuestoAlSalario from "./calculadoras/impuesto-al-salario";
import inflacion from "./calculadoras/inflacion";
import iva from "./calculadoras/iva";
import liquidacion from "./calculadoras/liquidacion";
import preaviso from "./calculadoras/preaviso";
import salarioMinimo from "./calculadoras/salario-minimo";
import salarioNeto from "./calculadoras/salario-neto";
import tipoDeCambio from "./calculadoras/tipo-de-cambio";
import vacaciones from "./calculadoras/vacaciones";
import contenidoAguinaldo from "./contenido/aguinaldo";
import contenidoCesantia from "./contenido/cesantia";
import contenidoHorasExtra from "./contenido/horas-extra";
import contenidoImpuesto from "./contenido/impuesto-al-salario";
import contenidoInflacion from "./contenido/inflacion";
import contenidoIva from "./contenido/iva";
import contenidoLiquidacion from "./contenido/liquidacion";
import contenidoPreaviso from "./contenido/preaviso";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoSalarioNeto from "./contenido/salario-neto";
import contenidoTipoDeCambio from "./contenido/tipo-de-cambio";
import contenidoVacaciones from "./contenido/vacaciones";
import cargasSociales from "./calculadoras/cargas-sociales";
import contenidoCargasSociales from "./contenido/cargas-sociales";
import costoDeUnEmpleado from "./calculadoras/costo-de-un-empleado";
import contenidoCostoDeUnEmpleado from "./contenido/costo-de-un-empleado";
import renuncia from "./calculadoras/renuncia";
import contenidoRenuncia from "./contenido/renuncia";
import feriados from "./calculadoras/feriados";
import contenidoFeriados from "./contenido/feriados";
import incapacidad from "./calculadoras/incapacidad";
import contenidoIncapacidad from "./contenido/incapacidad";
import riesgosDelTrabajo from "./calculadoras/riesgos-del-trabajo";
import contenidoRiesgosDelTrabajo from "./contenido/riesgos-del-trabajo";
import embargoDeSalario from "./calculadoras/embargo-de-salario";
import contenidoEmbargoDeSalario from "./contenido/embargo-de-salario";
import rentaTrabajadorIndependiente from "./calculadoras/renta-trabajador-independiente";
import contenidoRentaTrabajadorIndependiente from "./contenido/renta-trabajador-independiente";
import rentaPersonasJuridicas from "./calculadoras/renta-personas-juridicas";
import contenidoRentaPersonasJuridicas from "./contenido/renta-personas-juridicas";
import certificadoDeDeposito from "./calculadoras/certificado-de-deposito";
import contenidoCertificadoDeDeposito from "./contenido/certificado-de-deposito";
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
    { definicion: liquidacion, contenido: contenidoLiquidacion, cliente: () => import("./calculadoras/liquidacion.cliente") },
    { definicion: salarioNeto, contenido: contenidoSalarioNeto, cliente: () => import("./calculadoras/salario-neto.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: cesantia, contenido: contenidoCesantia, cliente: () => import("./calculadoras/cesantia.cliente") },
    { definicion: impuestoAlSalario, contenido: contenidoImpuesto, cliente: () => import("./calculadoras/impuesto-al-salario.cliente") },
    { definicion: vacaciones, contenido: contenidoVacaciones, cliente: () => import("./calculadoras/vacaciones.cliente") },
    { definicion: preaviso, contenido: contenidoPreaviso, cliente: () => import("./calculadoras/preaviso.cliente") },
    { definicion: horasExtra, contenido: contenidoHorasExtra, cliente: () => import("./calculadoras/horas-extra.cliente") },
    { definicion: tipoDeCambio, contenido: contenidoTipoDeCambio, cliente: () => import("./calculadoras/tipo-de-cambio.cliente") },
    { definicion: iva, contenido: contenidoIva, cliente: () => import("./calculadoras/iva.cliente") },
    { definicion: inflacion, contenido: contenidoInflacion, cliente: () => import("./calculadoras/inflacion.cliente") },
    { definicion: cargasSociales, contenido: contenidoCargasSociales, cliente: () => import("./calculadoras/cargas-sociales.cliente") },
    { definicion: costoDeUnEmpleado, contenido: contenidoCostoDeUnEmpleado, cliente: () => import("./calculadoras/costo-de-un-empleado.cliente") },
    { definicion: renuncia, contenido: contenidoRenuncia, cliente: () => import("./calculadoras/renuncia.cliente") },
    { definicion: feriados, contenido: contenidoFeriados, cliente: () => import("./calculadoras/feriados.cliente") },
    { definicion: incapacidad, contenido: contenidoIncapacidad, cliente: () => import("./calculadoras/incapacidad.cliente") },
    { definicion: riesgosDelTrabajo, contenido: contenidoRiesgosDelTrabajo, cliente: () => import("./calculadoras/riesgos-del-trabajo.cliente") },
    { definicion: embargoDeSalario, contenido: contenidoEmbargoDeSalario, cliente: () => import("./calculadoras/embargo-de-salario.cliente") },
    { definicion: rentaTrabajadorIndependiente, contenido: contenidoRentaTrabajadorIndependiente, cliente: () => import("./calculadoras/renta-trabajador-independiente.cliente") },
    { definicion: rentaPersonasJuridicas, contenido: contenidoRentaPersonasJuridicas, cliente: () => import("./calculadoras/renta-personas-juridicas.cliente") },
    { definicion: certificadoDeDeposito, contenido: contenidoCertificadoDeDeposito, cliente: () => import("./calculadoras/certificado-de-deposito.cliente") },
  ],
  novedades,
  detectores,
});
