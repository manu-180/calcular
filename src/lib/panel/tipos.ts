export type Preset = "hoy" | "7d" | "30d" | "90d";

// Un día elegido en el calendario ("2026-10-05") o un tramo de días ("2026-10-01_2026-10-15"),
// en fecha argentina y con los dos extremos incluidos.
export type Rango = Preset | `${number}-${number}-${number}` | `${number}-${number}-${number}_${number}-${number}-${number}`;

export const RANGOS: Preset[] = ["hoy", "7d", "30d", "90d"];

export type Punto = { t: string; v: number };

export type KpiClave =
  | "visitantes"
  | "usos"
  | "tiempo"
  | "interes"
  | "checkouts"
  | "ventas"
  | "ingresos";

export type Kpi = {
  clave: KpiClave;
  valor: number;
  anterior: number;
  serie: Punto[];
};

export type FilaPagina = {
  path: string;
  titulo: string;
  vistas: number;
  visitantes: number;
  usos: number;
  tasaUso: number;
  tiempoMedianoMs: number;
  compartidos: number;
  interesCompra: number;
  checkouts: number;
  ventas: number;
  // Vistas de la oferta en la página y plata de las ventas que se le atribuyen, en dólares.
  ofertas: number;
  ingresosUsd: number;
  producto: string | null;
  serieUsos: number[];
};

export type PasoEmbudo = {
  paso: "vio_oferta" | "abrio_compra" | "fue_a_pagar" | "pago";
  n: number;
};

export type EmbudoProducto = {
  producto: string;
  titulo: string;
  // null = calcular.ar; si no, el mercado de calcularya que vende el producto.
  mercado: string | null;
  // precio e ingresos van en esta moneda; ingresosUsd, en dólares.
  moneda: string;
  precio: number;
  pasos: PasoEmbudo[];
  ingresos: number;
  ingresosUsd: number;
};

export type FilaFuente = {
  fuente: string;
  visitantes: number;
  usos: number;
  ventas: number;
};

export type Reparto = { clave: string; n: number };

export type Busqueda = { q: string; n: number; sinResultados: boolean };

export type Compra = {
  id: string;
  fecha: string;
  producto: string;
  monto: number;
  moneda: string;
  montoUsd: number | null;
  // País real de quien compró (IP del checkout), no el mercado del contenido.
  pais: string | null;
  mercado: string | null;
  emailEnmascarado: string;
  conCuenta: boolean;
  desde: string | null;
  estado: "aprobado" | "reembolsado" | "contracargo";
};

export type Cuentas = {
  total: number;
  nuevas: number;
  verificadas: number;
  conCompras: number;
  perfiles: Reparto[];
};

export type EnVivo = { ahora: number; paginas: Reparto[] };

export type Importe = { moneda: string; monto: number };

export type FilaMercado = {
  mercado: string;
  visitantes: number;
  usos: number;
  ventas: number;
  ingresos: Importe[];
  ingresosUsd: number;
  // Pasos del embudo con una persona por día (ver ca_resumen_mercado). null = la base no los tiene.
  embudo: EmbudoMercado | null;
};

export type EmbudoMercado = {
  visitas: number;
  usaron: number;
  ofertas: number;
  clics: number;
  checkouts: number;
  ventas: number;
};

export type IngresoMoneda = { moneda: string; monto: number; montoUsd: number | null; ventas: number };

// moneda = en qué está el KPI de ingresos: USD con la migración de métricas del mundo, ARS antes.
export type Ingresos = { moneda: string; porMoneda: IngresoMoneda[]; sinCotizacion: number };

export type Lectura = {
  id: string;
  tono: "oportunidad" | "alerta" | "logro" | "dato";
  titulo: string;
  detalle: string;
  accion?: { texto: string; href?: string };
};

export type PanelDatos = {
  rango: Rango;
  // null = todos los sitios. Lo que de verdad filtró la base, no lo que se pidió.
  mercado: string | null;
  desde: string;
  hasta: string;
  generado: string;
  granularidad: "hora" | "dia";
  kpis: Kpi[];
  ingresos: Ingresos;
  paginas: FilaPagina[];
  embudos: EmbudoProducto[];
  fuentes: FilaFuente[];
  dispositivos: Reparto[];
  paises: Reparto[];
  // País real de quienes compraron. null = la base todavía no lo guarda.
  paisesCompra: Reparto[] | null;
  busquedas: Busqueda[];
  compras: Compra[];
  cuentas: Cuentas;
  vivo: EnVivo;
  // null = la base todavía no tiene la migración de mercado: sólo hay calcular.ar.
  mercados: FilaMercado[] | null;
  lecturas: Lectura[];
  // null = la base todavía no tiene ca_panel_boca (20261024200000).
  boca: BocaDatos | null;
  sinDatos: boolean;
};

// Boca en boca: lo que se comparte y la gente que eso trae. Todo agregado en ca_panel_boca.
export type Sitio = "ar" | "intl";

export type FilaBoca = {
  clave: string;
  compartidos: number;
  personas: number;
  // Llegadas por links compartidos, sin contar a quien abrió su propio link.
  llegadas: number;
  nuevas: number;
  usaron: number;
};

export type PaginaBoca = FilaBoca & { path: string; titulo: string; sitio: Sitio; mercado: string };

export type MercadoBoca = { mercado: string; sitio: Sitio; compartidos: number; personas: number; llegadas: number; nuevas: number };

export type CompartidoTop = {
  ref: string;
  path: string;
  titulo: string;
  sitio: Sitio;
  mercado: string;
  canal: string;
  origen: string;
  fecha: string | null;
  llegadas: number;
  nuevas: number;
  usaron: number;
};

export type BrazoPuente = {
  v: "con" | "sin";
  exposiciones: number;
  personas: number;
  clics: number;
  compartieron: number;
  // En la misma visita abrieron otra página y usaron una calculadora.
  siguieron: number;
};

export type Embebidos = {
  vistas: number;
  visitantes: number;
  usos: number;
  // host "" = el navegador no dijo desde dónde (referrer bloqueado).
  sitios: { host: string; vistas: number; visitantes: number; usos: number }[];
  calculadoras: { path: string; titulo: string; mercado: string; vistas: number; sitios: number; usos: number }[];
};

export type ClicAfiliado = { socio: string; pais: string | null; mercado: string; clics: number; personas: number };

export type SueldosBoca = {
  aportes: { mercado: string; aportes: number; pendientes: number }[];
  celdas: { mercado: string; publicadas: number; cerca: number; ocupaciones: number }[];
  publicadoEl: string | null;
};

export type SocialSinCodigo = { fuente: string; sesiones: number; personas: number; usaron: number };

export type ResumenBoca = {
  compartidos: number;
  compartidosAntes: number;
  personas: number;
  llegadas: number;
  nuevas: number;
  usaron: number;
  nuevasUsaron: number;
  propias: number;
  sinCompartido: number;
};

export type BocaDatos = {
  granularidad: "hora" | "dia";
  resumen: ResumenBoca;
  serie: { t: string; compartidos: number; llegadas: number; nuevas: number }[];
  canales: FilaBoca[];
  origenes: FilaBoca[];
  paginas: PaginaBoca[];
  mercados: MercadoBoca[];
  top: CompartidoTop[];
  puente: BrazoPuente[];
  embebidos: Embebidos;
  afiliados: ClicAfiliado[];
  // null = la base todavía no tiene la publicación de sueldos (20261024150000).
  sueldos: SueldosBoca | null;
  sociales: SocialSinCodigo[];
};
