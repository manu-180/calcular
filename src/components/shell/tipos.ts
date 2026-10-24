import type { TipoPagina } from "@/data/navegacion";

export type PaginaMenu = {
  href: string;
  titulo: string;
  descripcion?: string;
  grupo: string;
  tipo: TipoPagina;
  corto?: string;
  claves?: string[];
  menu?: boolean;
};

export type SeccionMenuShell = { id: string; titulo: string; paginas: PaginaMenu[]; destacados: PaginaMenu[] };

export type NavegacionPrecargada = { columnas: Record<string, SeccionMenuShell[][]>; secciones: SeccionMenuShell[] };

export type MarcaSitio = { prefijo: string; acento: string; etiqueta: string; href: string };

export type TextosEncabezado = {
  principal: string;
  buscar: string;
  buscarCalculadora: string;
  abrirMenu: string;
  cerrarMenu: string;
  menu: string;
  todas: string;
  pieCajon: string;
};

export type TextosBuscador = {
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

export type FuenteBuscador = {
  paginas: PaginaMenu[];
  masUsadas: string[];
  opcionales?: string[];
  todas: string;
  textos: TextosBuscador;
};
