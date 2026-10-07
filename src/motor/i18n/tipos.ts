export type Categoria = "sueldo" | "fin" | "impuestos" | "dinero" | "familia" | "otras";

export interface TextosSitio {
  marca: { nombre: string; lema: string };
  saltar: string;
  header: { inicio: string; elegirPais: string; paisActual: (pais: string) => string; cerrar: string; todos: string; latinoamerica: string };
  footer: {
    paises: string;
    sitio: string;
    fuentes: string;
    novedades: string;
    privacidad: string;
    terminos: string;
    contacto: string;
    sobre: string;
    argentina: string;
    descargo: string;
    derechos: (anio: number) => string;
  };
  sello: {
    titulo: string;
    verificado: (organismos: string, fecha: string) => string;
    serie: (nombre: string, organismo: string, fecha: string) => string;
    verTodas: string;
  };
  calculadora: {
    comoSeCalcula: string;
    ejemplo: string;
    faq: string;
    glosario: string;
    relacionadas: string;
    otrosPaises: string;
  };
  global: {
    eyebrow: string;
    titulo: string;
    bajada: string;
    elegir: string;
    calculadoras: (n: number) => string;
    vacio: string;
    promesaTitulo: string;
    promesas: readonly { titulo: string; texto: string }[];
  };
  pais: {
    eyebrow: string;
    titulo: (pais: string) => string;
    bajada: (pais: string) => string;
    novedades: string;
    verNovedades: string;
    sinCalculadoras: string;
    descripcion: (pais: string) => string;
  };
  fuentes: {
    titulo: (pais: string) => string;
    bajada: string;
    vigente: string;
    desde: string;
    hasta: string;
    fuente: string;
    verificado: string;
    region: string;
    series: string;
    ultimoDato: string;
    proximo: (valor: string, fecha: string) => string;
    sinVerificar: string;
    tramos: (n: number) => string;
    description: (pais: string) => string;
  };
  novedades: {
    titulo: (pais: string) => string;
    bajada: string;
    vigenteDesde: (fecha: string) => string;
    vacio: string;
    description: (pais: string) => string;
  };
  avisoPais: { texto: (pais: string) => string; ir: (pais: string) => string; cerrar: string };
  noEncontrada: { titulo: string; texto: string; volver: string; paises: string };
  categorias: Record<Categoria, string>;
  migas: { inicio: string; etiqueta: string };
}
