import { definirCalculadora, ErrorEntrada } from "../../calculo";
import type { DefinicionCalculadora, TablaResultado } from "../../tipos";
import { cuotaFrancesa } from "../prestamo/definicion";
import { formatearMonto, montoEjemplo, type ContextoUniversal } from "../tipos";

export interface UiAlquilarOComprar {
  precio: string;
  entrada: string;
  gastosCompra: string;
  gastosCompraAyuda: string;
  tasa: string;
  aniosHipoteca: string;
  alquiler: string;
  aumentoAlquiler: string;
  gastosPropietario: string;
  gastosPropietarioAyuda: string;
  revalorizacion: string;
  rendimiento: string;
  rendimientoAyuda: string;
  horizonte: string;
  veredicto: string;
  patrimonioComprar: string;
  patrimonioAlquilar: string;
  diferencia: string;
  anioDesde: string;
  pagadoAlquilando: string;
  pagadoComprando: string;
  tabla: string;
  colAnio: string;
  colComprar: string;
  colAlquilar: string;
  colDiferencia: string;
  errorPrecio: string;
  errorAlquiler: string;
  convieneComprar: (anios: string, diferencia: string) => string;
  convieneAlquilar: (anios: string, diferencia: string) => string;
  empate: (anios: string) => string;
  observacionDesde: (anio: string) => string;
  observacionMetodo: string;
}

export interface EntradaAlquilarOComprar {
  precio: number;
  entrada: number;
  gastosCompra: number;
  tasa: number;
  aniosHipoteca: number;
  alquiler: number;
  aumentoAlquiler: number;
  gastosPropietario: number;
  revalorizacion: number;
  rendimiento: number;
  horizonte: number;
}

export interface AnioComparado {
  anio: number;
  comprar: number;
  alquilar: number;
}

// Compara patrimonio, no gastos: quien alquila invierte la entrada y los gastos de compra, y cada mes
// el que gasta menos invierte la diferencia al mismo rendimiento. Sin eso, alquilar parece gratis.
export function comparar(e: EntradaAlquilarOComprar): { anios: AnioComparado[]; pagadoAlquilando: number; pagadoComprando: number } {
  const inicial = (e.precio * e.entrada) / 100;
  const prestado = e.precio - inicial;
  const mesesHipoteca = e.aniosHipoteca * 12;
  const i = e.tasa / 100 / 12;
  const cuota = prestado > 0 ? cuotaFrancesa(prestado, e.tasa, mesesHipoteca) : 0;
  const g = Math.pow(1 + e.rendimiento / 100, 1 / 12) - 1;
  let saldo = prestado;
  let carteraInquilino = inicial + (e.precio * e.gastosCompra) / 100;
  let carteraPropietario = 0;
  let pagadoAlquilando = 0;
  let pagadoComprando = 0;
  const anios: AnioComparado[] = [];
  for (let mes = 1; mes <= e.horizonte * 12; mes++) {
    const anio = Math.floor((mes - 1) / 12);
    const alquiler = e.alquiler * Math.pow(1 + e.aumentoAlquiler / 100, anio);
    const valor = e.precio * Math.pow(1 + e.revalorizacion / 100, anio);
    let pagoHipoteca = 0;
    if (mes <= mesesHipoteca && saldo > 0) {
      pagoHipoteca = cuota;
      saldo = mes === mesesHipoteca ? 0 : saldo * (1 + i) - cuota;
    }
    const comprar = pagoHipoteca + (valor * e.gastosPropietario) / 100 / 12;
    pagadoAlquilando += alquiler;
    pagadoComprando += comprar;
    carteraInquilino = carteraInquilino * (1 + g) + Math.max(comprar - alquiler, 0);
    carteraPropietario = carteraPropietario * (1 + g) + Math.max(alquiler - comprar, 0);
    if (mes % 12 === 0) {
      const valorFinal = e.precio * Math.pow(1 + e.revalorizacion / 100, mes / 12);
      anios.push({ anio: mes / 12, comprar: valorFinal - Math.max(saldo, 0) + carteraPropietario, alquilar: carteraInquilino });
    }
  }
  return { anios, pagadoAlquilando, pagadoComprando };
}

export function definir(ctx: ContextoUniversal, ui: UiAlquilarOComprar): DefinicionCalculadora {
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "alquilar-o-comprar",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      { id: "precio", tipo: "moneda", etiqueta: ui.precio, min: 0, porDefecto: montoEjemplo(ctx, 200000) },
      { id: "entrada", tipo: "porcentaje", etiqueta: ui.entrada, min: 0, max: 100, porDefecto: 20 },
      { id: "gastosCompra", tipo: "porcentaje", etiqueta: ui.gastosCompra, ayuda: ui.gastosCompraAyuda, min: 0, max: 50, porDefecto: 4 },
      { id: "tasa", tipo: "porcentaje", etiqueta: ui.tasa, min: 0, max: 100, porDefecto: 7 },
      { id: "aniosHipoteca", tipo: "entero", etiqueta: ui.aniosHipoteca, min: 1, max: 50, porDefecto: 25 },
      { id: "alquiler", tipo: "moneda", etiqueta: ui.alquiler, min: 0, porDefecto: montoEjemplo(ctx, 1000) },
      { id: "aumentoAlquiler", tipo: "porcentaje", etiqueta: ui.aumentoAlquiler, min: 0, max: 200, porDefecto: 3 },
      { id: "gastosPropietario", tipo: "porcentaje", etiqueta: ui.gastosPropietario, ayuda: ui.gastosPropietarioAyuda, min: 0, max: 20, porDefecto: 1.5 },
      { id: "revalorizacion", tipo: "porcentaje", etiqueta: ui.revalorizacion, min: -20, max: 100, porDefecto: 3 },
      { id: "rendimiento", tipo: "porcentaje", etiqueta: ui.rendimiento, ayuda: ui.rendimientoAyuda, min: 0, max: 100, porDefecto: 5 },
      { id: "horizonte", tipo: "entero", etiqueta: ui.horizonte, min: 1, max: 50, porDefecto: 10 },
    ],
    calcular(entrada, _valores, { redondear }) {
      if (entrada.precio <= 0) throw new ErrorEntrada(ui.errorPrecio, "precio");
      if (entrada.alquiler <= 0) throw new ErrorEntrada(ui.errorAlquiler, "alquiler");
      const { anios, pagadoAlquilando, pagadoComprando } = comparar(entrada);
      const ultimo = anios[anios.length - 1];
      const diferencia = redondear(ultimo.comprar - ultimo.alquilar);
      let desde: number | null = null;
      for (let k = anios.length - 1; k >= 0 && anios[k].comprar >= anios[k].alquilar; k--) desde = anios[k].anio;
      const horizonte = String(entrada.horizonte);
      const dif = formatearMonto(ctx, Math.abs(diferencia));
      const veredicto =
        diferencia > 0 ? ui.convieneComprar(horizonte, dif) : diferencia < 0 ? ui.convieneAlquilar(horizonte, dif) : ui.empate(horizonte);
      const observaciones: string[] = [];
      if (desde !== null && diferencia > 0) observaciones.push(ui.observacionDesde(String(desde)));
      observaciones.push(ui.observacionMetodo);
      const tabla: TablaResultado = {
        tipo: "tabla",
        columnas: [
          { clave: "anio", etiqueta: ui.colAnio, formato: "numero" },
          { clave: "comprar", etiqueta: ui.colComprar, formato: "moneda" },
          { clave: "alquilar", etiqueta: ui.colAlquilar, formato: "moneda" },
          { clave: "diferencia", etiqueta: ui.colDiferencia, formato: "moneda" },
        ],
        filas: anios.map((a) => [a.anio, redondear(a.comprar), redondear(a.alquilar), redondear(a.comprar - a.alquilar)]),
      };
      return {
        veredicto,
        patrimonioComprar: redondear(ultimo.comprar),
        patrimonioAlquilar: redondear(ultimo.alquilar),
        diferencia: Math.abs(diferencia),
        anioDesde: diferencia > 0 ? desde : null,
        pagadoAlquilando: redondear(pagadoAlquilando),
        pagadoComprando: redondear(pagadoComprando),
        comparacion: tabla,
        observaciones,
      };
    },
    resultado: [
      { clave: "veredicto", etiqueta: ui.veredicto, formato: "texto", destacada: true },
      { clave: "patrimonioComprar", etiqueta: ui.patrimonioComprar, formato: "moneda" },
      { clave: "patrimonioAlquilar", etiqueta: ui.patrimonioAlquilar, formato: "moneda" },
      { clave: "diferencia", etiqueta: ui.diferencia, formato: "moneda" },
      { clave: "anioDesde", etiqueta: ui.anioDesde, formato: "numero", decimales: 0 },
      { clave: "pagadoAlquilando", etiqueta: ui.pagadoAlquilando, formato: "moneda" },
      { clave: "pagadoComprando", etiqueta: ui.pagadoComprando, formato: "moneda" },
    ],
    tablas: [{ clave: "comparacion", titulo: ui.tabla, filasVisibles: 12 }],
  });
}
