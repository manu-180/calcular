export type Categoria =
  | "sueldo"
  | "fin"
  | "impuestos"
  | "dinero"
  | "finanzas"
  | "negocio"
  | "calculos"
  | "fechas"
  | "salud"
  | "hogar"
  | "familia"
  | "otras";

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
    irASeccion: string;
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
  // Candidatos en orden de preferencia: va el primero que entra en 60 caracteres (elegirTitulo).
  seo: {
    tituloGlobal: string;
    descripcionGlobal: string;
    tituloPais: (pais: string, anio: number) => readonly string[];
    tituloFuentes: (pais: string) => readonly string[];
    tituloNovedades: (pais: string, anio: number) => readonly string[];
  };
  og: { datosOficiales: string; actualizado: (fecha: string) => string; gratis: string; paises: (n: number) => string };
  shell: TextosShell;
}

// Header, cajón, buscador y footer (los mismos de calcular.ar). Las claves de encabezado y buscador
// tienen la forma que esperan SiteHeader y Buscador en src/components.
export interface TextosShell {
  irAlInicio: string;
  menu: { trabajo: string; impuestos: string; dinero: string; vida: string; novedades: string; planillas: string };
  encabezado: {
    principal: string;
    buscar: string;
    buscarCalculadora: string;
    abrirMenu: string;
    cerrarMenu: string;
    menu: string;
    todas: string;
    pieCajon: string;
  };
  buscador: {
    dialogo: string;
    pregunta: string;
    recientes: string;
    masUsado: string;
    sinResultados: string;
    sugerencia: string;
    verTodas: string;
    borrar: string;
    cerrar: string;
    cerrarBuscador: string;
    moverte: string;
    abrir: string;
    desdeCualquier: string;
    resultados: string;
    resultado: string;
    resultadosPlural: string;
    // Forma «few» de los idiomas eslavos (2 a 4: «3 výsledky»); sin ella, resultadosPlural.
    resultadosPocos?: string;
  };
  paises: { titulo: string; cambiar: string };
  pie: {
    bajada: (lugar: string) => string;
    todas: string;
    cuenta: string;
    cuentaNota: string;
    hecho: string;
    escrito: string;
  };
}
