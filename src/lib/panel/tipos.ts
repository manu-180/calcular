export type Rango = "hoy" | "7d" | "30d" | "90d";

export const RANGOS: Rango[] = ["hoy", "7d", "30d", "90d"];

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
  precio: number;
  pasos: PasoEmbudo[];
  ingresos: number;
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

export type Lectura = {
  id: string;
  tono: "oportunidad" | "alerta" | "logro" | "dato";
  titulo: string;
  detalle: string;
  accion?: { texto: string; href?: string };
};

export type PanelDatos = {
  rango: Rango;
  desde: string;
  hasta: string;
  generado: string;
  granularidad: "hora" | "dia";
  kpis: Kpi[];
  paginas: FilaPagina[];
  embudos: EmbudoProducto[];
  fuentes: FilaFuente[];
  dispositivos: Reparto[];
  paises: Reparto[];
  busquedas: Busqueda[];
  compras: Compra[];
  cuentas: Cuentas;
  vivo: EnVivo;
  lecturas: Lectura[];
  sinDatos: boolean;
};
