import type { Novedad } from "@/motor/tipos";

const GACETA_229 = { tipo: "primaria", verificadoEl: "2026-10-07" } as const;

export const novedades: readonly Novedad[] = [
  {
    id: "cr.salario-minimo-2026",
    fecha: "2025-12-05",
    titulo: "Los salarios mínimos suben 1,63 % en 2026",
    texto: "Desde el 1 de enero de 2026 los salarios mínimos del sector privado suben 1,63 %. El trabajo doméstico, la ocupación especializada y el técnico medio tienen un aumento adicional. La ocupación no calificada queda en ₡373.092,30 al mes.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["cr.salario-minimo"],
    fuente: {
      ...GACETA_229,
      organismo: "Poder Ejecutivo y Ministerio de Trabajo y Seguridad Social",
      titulo: "Decreto Ejecutivo 45303-MTSS (La Gaceta 229, Alcance 156)",
      url: "https://sinalevi.go.cr/ResultadosNormativa/Informacion?param1=105838&param2=148681&param3=1",
    },
  },
  {
    id: "cr.tramos-renta-2026",
    fecha: "2025-12-05",
    titulo: "El impuesto al salario empieza en ₡918.000",
    texto: "Desde el 1 de enero de 2026 los salarios de hasta ₡918.000 al mes no pagan renta. Los tramos y los créditos por hijo y cónyuge bajaron 0,38 % porque la inflación fue negativa.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["cr.impuesto-al-salario", "cr.salario-neto"],
    fuente: {
      ...GACETA_229,
      organismo: "Poder Ejecutivo y Ministerio de Hacienda",
      titulo: "Decreto Ejecutivo 45333-H (La Gaceta 229)",
      url: "https://sinalevi.go.cr/ResultadosNormativa/Informacion?param1=105834&param2=148657&param3=1",
    },
  },
  {
    id: "cr.ivm-4-33",
    fecha: "2026-01-01",
    titulo: "La cuota del IVM sube a 4,33 %",
    texto: "Desde el 1 de enero de 2026 la persona trabajadora aporta 4,33 % de su salario al IVM, antes 4,17 %. Con la salud y el Banco Popular, los rebajos suman 10,83 %.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["cr.salario-neto"],
    fuente: {
      organismo: "Caja Costarricense de Seguro Social",
      titulo: "Reglamento del Seguro de IVM, Transitorio XI (La Gaceta 161, Alcance 191 del 28/8/2019)",
      url: "https://www.imprentanacional.go.cr/pub/2019/08/28/ALCA191_28_08_2019.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "cr.cargas-patronales-2026",
    fecha: "2026-01-01",
    titulo: "Las cargas sociales del patrono suben a 26,83 %",
    texto: "Desde el 1 de enero de 2026 el patrono aporta 5,58 % al IVM, antes 5,42 %. Con los demás aportes, las cargas patronales suman 26,83 % del salario si la empresa paga INA.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["cr.cargas-sociales", "cr.costo-de-un-empleado"],
    fuente: {
      organismo: "Caja Costarricense de Seguro Social",
      titulo: "Reglamento del Seguro de IVM, Transitorio XI (La Gaceta 161, Alcance 191 del 28/8/2019)",
      url: "https://www.imprentanacional.go.cr/pub/2019/08/28/ALCA191_28_08_2019.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-12",
    },
  },
  {
    id: "cr.renta-independientes-2026",
    fecha: "2025-12-05",
    titulo: "Los independientes no pagan renta hasta ₡6.244.000 al año",
    texto: "Desde el 1 de enero de 2026 las personas con actividad lucrativa no pagan renta sobre los primeros ₡6.244.000 anuales. El tramo exento lo amplió la Ley 10667.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["cr.renta-trabajador-independiente"],
    fuente: {
      ...GACETA_229,
      organismo: "Poder Ejecutivo y Ministerio de Hacienda",
      titulo: "Decreto Ejecutivo 45333-H, artículo 4 (La Gaceta 229)",
      url: "https://sinalevi.go.cr/ResultadosNormativa/Informacion?param1=105834&param2=148657&param3=1",
      verificadoEl: "2026-10-12",
    },
  },
];
