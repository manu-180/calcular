import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "pa.calculadoras-laborales-octubre-2026",
    fecha: "2026-10-12",
    titulo: "Nuevas calculadoras: renuncia, feriado, domingo, maternidad y más",
    texto: "Sumamos 18 calculadoras con el Código de Trabajo y las leyes fiscales vigentes: liquidación por renuncia, feriado y domingo trabajado, aviso de renuncia, licencia de maternidad, trabajo doméstico, fondo de cesantía, préstamo con FECI e impuesto de inmueble, entre otras.",
    calculadoras: [
      "pa.liquidacion-por-renuncia",
      "pa.feriado-trabajado",
      "pa.domingo-trabajado",
      "pa.preaviso",
      "pa.licencia-de-maternidad",
      "pa.trabajo-domestico",
      "pa.fondo-de-cesantia",
      "pa.prestamo-personal",
      "pa.impuesto-de-inmueble",
    ],
    fuente: {
      organismo: "Órgano Judicial",
      titulo: "Código de Trabajo (Decreto de Gabinete 252 de 1971, con las reformas de la Ley 44 de 1995)",
      url: "https://www.organojudicial.gob.pa/uploads/wp_repo/uploads/2016/11/c%C3%B3digo-detrabajo.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-12",
    },
  },
  {
    id: "pa.salario-minimo-2026",
    fecha: "2026-01-06",
    titulo: "Nuevos salarios mínimos para 2026 y 2027",
    texto: "Desde el 16 de enero de 2026 rigen las nuevas tasas de salario mínimo por hora, según región, actividad y tamaño de empresa. El trabajo doméstico queda en B/. 350 al mes en la Región 1 y B/. 320 en la Región 2.",
    vigenteDesde: "2026-01-16",
    calculadoras: ["pa.salario-minimo"],
    fuente: {
      organismo: "Ministerio de Trabajo y Desarrollo Laboral",
      titulo: "Decreto Ejecutivo 13 de 31 de diciembre de 2025 (Gaceta Oficial Digital 30438, 6/1/2026)",
      url: "https://www.mitradel.gob.pa/wp-content/uploads/2025/12/Decreto-Ejecutivo-No.13-del-31-de-diciembre-de-2025.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
];
