import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "bo.tco-mediana-ponderada",
    fecha: "2026-09-24",
    titulo: "El BCB cambia la forma de calcular el dólar oficial",
    texto:
      "Desde la R.D. N° 142/2026 el Tipo de Cambio Oficial es la mediana ponderada por monto de las compras de dólares de los bancos a sus clientes, sin operaciones entre bancos. Se publica a las 23:30 de cada día hábil y rige al día siguiente; el del viernes rige sábado, domingo y lunes. También deja sin efecto el tope de venta del TCO más 10 centavos.",
    vigenteDesde: "2026-09-24",
    calculadoras: ["bo.dolar-oficial", "bo.salario-minimo"],
    fuente: {
      organismo: "Banco Central de Bolivia (BCB)",
      titulo: "Resolución de Directorio N° 142/2026 de 24 de septiembre de 2026",
      url: "https://www.bcb.gob.bo/webdocs/01_resoluciones/RD%20N%C2%B0%20142-2026%20%2824-09-2026%29.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "bo.tipo-de-cambio-flexible",
    fecha: "2026-06-29",
    titulo: "Bolivia deja el dólar fijo",
    texto:
      "Con la Resolución Ministerial N° 245 del Ministerio de Economía y el nuevo reglamento del BCB (R.D. N° 88/2026), el Tipo de Cambio Oficial pasa a calcularse cada día con las operaciones de los bancos. La primera tabla del régimen flexible, del 29 de junio de 2026, dio Bs 9,73 por dólar.",
    vigenteDesde: "2026-06-29",
    calculadoras: ["bo.dolar-oficial", "bo.salario-minimo"],
    fuente: {
      organismo: "Banco Central de Bolivia (BCB)",
      titulo: "Resolución de Directorio N° 88/2026 de 26 de junio de 2026, Reglamento de Operaciones Cambiarias",
      url: "https://www.bcb.gob.bo/webdocs/01_resoluciones/RD%20N%C2%B0%2088-2026%20%2826-06-2026%29%20%283%29.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "bo.facturas-combustible-rc-iva",
    fecha: "2026-04-10",
    titulo: "Las facturas de gasolina y diésel cuentan completas",
    texto: "La Ley N° 1718 derogó la regla que solo dejaba computar el 70 % del crédito fiscal de las compras de gasolina y diésel, también en el RC-IVA. Desde el 10 de abril de 2026 esas facturas cuentan por su valor completo en el Formulario 110.",
    vigenteDesde: "2026-04-10",
    calculadoras: ["bo.rc-iva", "bo.sueldo-liquido"],
    fuente: {
      organismo: "Servicio de Impuestos Nacionales (SIN)",
      titulo: "Ley N° 843, texto ordenado actualizado al 31/08/2026, nota del editor sobre la Ley N° 1718 de 10/04/2026",
      url: "https://www.impuestos.gob.bo/wp-content/uploads/2026/09/1.-LEY-N%C2%B0-843-08-26.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "bo.salario-minimo-2026",
    fecha: "2026-01-13",
    titulo: "El salario mínimo sube 20 % y llega a Bs 3.300",
    texto:
      "El Decreto Supremo N° 5516 fijó el Salario Mínimo Nacional en Bs 3.300 (antes, Bs 2.750), con efecto desde el 1 de enero de 2026. Sube también el bono de antigüedad y cambian los montos del RC-IVA, que se miden en salarios mínimos.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["bo.salario-minimo", "bo.bono-de-antiguedad", "bo.sueldo-liquido", "bo.rc-iva"],
    fuente: {
      organismo: "Servicio de Impuestos Nacionales (SIN), texto de consulta de la Gaceta Oficial",
      titulo: "Decreto Supremo N° 5516 de 13 de enero de 2026, artículo 23",
      url: "https://www.impuestos.gob.bo/wp-content/uploads/2026/02/DS-5516.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "bo.ds-5563-gastos-independientes",
    fecha: "2026-03-02",
    titulo: "Más compras valen como crédito fiscal para profesionales independientes",
    texto:
      "El Decreto Supremo N° 5563 aclaró que, para quien ejerce una profesión u oficio por su cuenta, las compras de alimentos, vestimenta, capacitación, transporte, salud, seguros, combustible y servicios básicos cuentan como gastos de su actividad para el crédito fiscal del IVA, si las facturas están a su nombre.",
    vigenteDesde: "2026-03-02",
    calculadoras: ["bo.rc-iva-independientes"],
    fuente: {
      organismo: "Servicio de Impuestos Nacionales (SIN)",
      titulo: "Ley N° 843 y decretos reglamentarios, texto ordenado al 31/08/2026, D.S. N° 21530 art. 8 (párrafo incorporado por la Disposición Adicional Segunda del D.S. N° 5563 de 02/03/2026)",
      url: "https://www.impuestos.gob.bo/wp-content/uploads/2026/09/1.-LEY-N%C2%B0-843-08-26.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-12",
    },
  },
];
