import { plata } from "@/lib/panel/formato";
import type { EmbudoProducto, FilaPagina, Kpi, KpiClave, Lectura, PanelDatos, Rango } from "@/lib/panel/tipos";

type Datos = Omit<PanelDatos, "lecturas">;

// `peso` estima la plata en juego si se actúa (compradores perdidos × precio, usos que podrían
// convertir al ~0,4 %, etc.). No es un pronóstico: sólo sirve para ordenar reglas distintas en
// una misma escala y que arriba quede lo que más mueve la aguja.
type Candidata = Lectura & { peso: number; familia: string };

const MAXIMO = 6;
const POR_FAMILIA = 2;
const PRECIO_REFERENCIA = 9900;
const CONVERSION_REFERENCIA = 0.004;
const ASISTENTES_IA = new Set(["ChatGPT", "Perplexity", "Gemini", "Claude", "Copilot"]);

const CONTRA: Record<Rango, string> = {
  hoy: "ayer a esta hora",
  "7d": "los 7 días anteriores",
  "30d": "los 30 días anteriores",
  "90d": "los 90 días anteriores",
};

const entero = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 });
// Sólo para ordenar lecturas por plata en juego: un producto en dólares se pesa en pesos con un cambio
// aproximado. No se muestra en ningún lado.
const ARS_POR_USD_APROX = 1500;

function n(valor: number): string {
  return entero.format(Math.round(valor));
}

function deCada100(fraccion: number): string {
  if (fraccion > 0 && fraccion < 0.01) return "menos de 1 de cada 100";
  return `${n(fraccion * 100)} de cada 100`;
}

function veces(cantidad: number): string {
  return cantidad === 1 ? "1 vez" : `${n(cantidad)} veces`;
}

function paso(e: EmbudoProducto, nombre: EmbudoProducto["pasos"][number]["paso"]): number {
  return e.pasos.find((p) => p.paso === nombre)?.n ?? 0;
}

function kpi(datos: Datos, clave: KpiClave): Kpi | undefined {
  return datos.kpis.find((k) => k.clave === clave);
}

function reglasEmbudo(datos: Datos): Candidata[] {
  const salida: Candidata[] = [];
  for (const e of datos.embudos) {
    const abrio = paso(e, "abrio_compra");
    const fue = paso(e, "fue_a_pagar");
    const pago = paso(e, "pago");
    const precio = (e.moneda === "USD" ? e.precio * ARS_POR_USD_APROX : e.precio) || PRECIO_REFERENCIA;
    if (abrio >= 10 && fue / abrio <= 0.5) {
      const perdidos = abrio - fue;
      salida.push({
        id: `embudo-antes-de-pagar-${e.producto}`,
        familia: "embudo",
        tono: "alerta",
        titulo: `${deCada100(perdidos / abrio)} que abren la compra de la ${e.titulo} no llegan a Mercado Pago`,
        detalle: `De ${n(abrio)} personas que abrieron la compra, ${n(fue)} siguieron hasta Mercado Pago. Se frenan en el paso del medio, el cuadro donde dejan el mail: vale revisarlo con ojos de alguien que llega por primera vez.`,
        accion: { texto: "Ver el embudo", href: "#embudo" },
        peso: perdidos * precio * 0.1,
      });
    }
    if (fue >= 8 && pago / fue <= 0.2) {
      const perdidos = fue - pago;
      salida.push({
        id: `embudo-en-el-pago-${e.producto}`,
        familia: "embudo",
        tono: "alerta",
        titulo: `De ${n(fue)} que fueron a pagar la ${e.titulo}, ${pago === 1 ? "pagó 1" : `pagaron ${n(pago)}`}`,
        detalle: `Llegan a Mercado Pago y ahí se van. Suele ser el medio de pago o la duda de qué reciben: sumar transferencia o dejar bien claro qué llega al mail puede destrabar ${perdidos === 1 ? "esa venta" : `parte de esas ${n(perdidos)} ventas`}.`,
        accion: { texto: "Ver el embudo", href: "#embudo" },
        peso: perdidos * precio * 0.3,
      });
    }
  }
  return salida;
}

function reglasPaginas(datos: Datos): Candidata[] {
  const salida: Candidata[] = [];
  const sinOferta = datos.paginas
    .filter((p) => p.usos >= 50 && !p.producto && p.interesCompra === 0 && p.ventas === 0)
    .sort((a, b) => b.usos - a.usos)
    .slice(0, 2);
  for (const p of sinOferta) {
    salida.push({
      id: `candidata-${p.path}`,
      familia: "candidata",
      tono: "oportunidad",
      titulo: `«${p.titulo}» se usa ${veces(p.usos)} y no vende nada`,
      detalle: `Tiene uso de sobra y no ofrece ningún producto. Es candidata a tener su propia planilla, o por lo menos a mostrar una de las que ya están a la venta.`,
      accion: { texto: "Abrir la calculadora", href: p.path },
      peso: p.usos * CONVERSION_REFERENCIA * PRECIO_REFERENCIA,
    });
  }

  const pocoUso = datos.paginas
    .filter((p) => p.vistas >= 300 && p.usos >= 5 && p.tasaUso < 0.08)
    .sort((a, b) => b.vistas - a.vistas)[0];
  if (pocoUso) {
    salida.push({
      id: `poco-uso-${pocoUso.path}`,
      familia: "poco-uso",
      tono: "alerta",
      titulo: `«${pocoUso.titulo}» tiene muchas visitas y casi nadie usa la calculadora`,
      detalle: `Solo ${deCada100(pocoUso.tasaUso)} visitas llegan a tocar un campo. Puede que la respuesta ya esté arriba y no haga falta calcular, o que el formulario asuste de entrada: vale la pena mirarla en el celular.`,
      accion: { texto: "Abrir la página", href: pocoUso.path },
      peso: pocoUso.vistas * 0.2 * CONVERSION_REFERENCIA * PRECIO_REFERENCIA,
    });
  }

  const ventas = kpi(datos, "ventas")?.valor ?? 0;
  const estrella = [...datos.paginas].sort((a, b) => b.ventas - a.ventas)[0] as FilaPagina | undefined;
  if (estrella && ventas >= 3 && estrella.ventas >= 2 && estrella.ventas / ventas >= 0.4) {
    salida.push({
      id: `vende-${estrella.path}`,
      familia: "vende",
      tono: "logro",
      titulo: `«${estrella.titulo}» es la página que más vende`,
      detalle: `De ahí salieron ${n(estrella.ventas)} de las ${n(ventas)} ventas del período. Llevarle más visitas rinde: enlazarla desde las calculadoras del mismo tema es lo más barato.`,
      accion: { texto: "Abrir la página", href: estrella.path },
      peso: estrella.ventas * PRECIO_REFERENCIA * 0.2,
    });
  }
  return salida;
}

function reglasFuentes(datos: Datos): Candidata[] {
  const salida: Candidata[] = [];
  // El denominador es la suma de las fuentes, no el KPI: las fuentes suman visitantes por día
  // y el KPI cuenta distintos en todo el rango, así que mezclarlos da "130 de cada 100".
  const total = datos.fuentes.reduce((a, f) => a + f.visitantes, 0);
  if (total < 100) return salida;
  const usosTotales = datos.fuentes.reduce((a, f) => a + f.usos, 0);
  const usoPromedio = usosTotales / total;

  const whatsapp = datos.fuentes.find((f) => f.fuente === "WhatsApp");
  if (whatsapp && whatsapp.visitantes / total >= 0.1) {
    salida.push({
      id: "fuente-whatsapp",
      familia: "fuente",
      tono: "logro",
      titulo: `WhatsApp trae ${deCada100(whatsapp.visitantes / total)} visitas`,
      detalle: `La gente se está pasando las calculadoras de mano en mano. El botón de compartir funciona: conviene que esté a la vista en todas.`,
      accion: { texto: "Ver de dónde llegan", href: "#fuentes" },
      peso: whatsapp.visitantes * 10,
    });
  }

  const ia = datos.fuentes.filter((f) => ASISTENTES_IA.has(f.fuente));
  const iaVisitas = ia.reduce((a, f) => a + f.visitantes, 0);
  const iaUsos = ia.reduce((a, f) => a + f.usos, 0);
  if (iaVisitas / total >= 0.03) {
    const usanMas = iaVisitas > 0 && usoPromedio > 0 && iaUsos / iaVisitas > usoPromedio * 1.2;
    salida.push({
      id: "fuente-ia",
      familia: "fuente",
      tono: "dato",
      titulo: `Los asistentes de IA ya mandan ${deCada100(iaVisitas / total)} visitas`,
      detalle: `ChatGPT y compañía están citando el sitio${usanMas ? ", y esa gente usa la calculadora más que el promedio: llega con la pregunta ya hecha" : ""}. Mantener las fuentes oficiales y la fecha de verificación a la vista es lo que los hace elegirte.`,
      accion: { texto: "Ver de dónde llegan", href: "#fuentes" },
      peso: iaVisitas * 8,
    });
  }
  return salida;
}

function reglasBusquedas(datos: Datos): Candidata[] {
  const sinResultado = datos.busquedas.filter((b) => b.sinResultados && b.n >= 3).sort((a, b) => b.n - a.n);
  const [primera, segunda] = sinResultado;
  if (!primera) return [];
  const extra = segunda ? ` También buscaron «${segunda.q}» (${veces(segunda.n)}) sin suerte.` : "";
  return [
    {
      id: `busqueda-${primera.q}`,
      familia: "busqueda",
      tono: "oportunidad",
      titulo: `Nadie encuentra «${primera.q}» en el buscador`,
      detalle: `Lo buscaron ${veces(primera.n)} y no apareció nada. Es demanda que ya existe: una página o una planilla para eso tiene gente esperándola.${extra}`,
      accion: { texto: "Ver qué buscan", href: "#busquedas" },
      peso: (primera.n + (segunda?.n ?? 0)) * 0.03 * PRECIO_REFERENCIA,
    },
  ];
}

function reglasVariacion(datos: Datos): Candidata[] {
  const salida: Candidata[] = [];
  const contra = CONTRA[datos.rango];
  const reglas: { clave: KpiClave; minimo: number; nombre: string; valorPeso: number }[] = [
    { clave: "ventas", minimo: 3, nombre: "Las ventas", valorPeso: PRECIO_REFERENCIA },
    { clave: "visitantes", minimo: 50, nombre: "Las visitas", valorPeso: CONVERSION_REFERENCIA * PRECIO_REFERENCIA },
    { clave: "usos", minimo: 50, nombre: "Los usos de las calculadoras", valorPeso: CONVERSION_REFERENCIA * PRECIO_REFERENCIA },
  ];
  for (const r of reglas) {
    const k = kpi(datos, r.clave);
    if (!k || k.anterior < r.minimo) continue;
    const cambio = (k.valor - k.anterior) / k.anterior;
    if (Math.abs(cambio) < 0.2) continue;
    const sube = cambio > 0;
    salida.push({
      id: `variacion-${r.clave}`,
      familia: "variacion",
      tono: sube ? "logro" : "alerta",
      titulo: `${r.nombre} ${sube ? "subieron" : "bajaron"} ${n(Math.abs(cambio) * 100)} % contra ${contra}`,
      detalle: sube
        ? `Pasaron de ${n(k.anterior)} a ${n(k.valor)}. Si fue por algo que cambiaste, es la pista de qué repetir.`
        : `Pasaron de ${n(k.anterior)} a ${n(k.valor)}. Si en el sitio no cambió nada, la tabla de páginas muestra dónde se cayó.`,
      accion: { texto: "Ver las páginas", href: "#paginas" },
      peso: Math.abs(k.valor - k.anterior) * r.valorPeso,
    });
  }
  const ingresos = kpi(datos, "ingresos");
  const ventas = kpi(datos, "ventas");
  if (ingresos && ventas && ventas.valor > 0 && ventas.anterior === 0) {
    salida.push({
      id: "primeras-ventas",
      familia: "variacion",
      tono: "logro",
      titulo: `Entraron ${ventas.valor === 1 ? "1 venta" : `${n(ventas.valor)} ventas`} por ${plata(ingresos.valor, datos.ingresos.moneda)}`,
      detalle: `En ${contra} no hubo ninguna. El embudo muestra por qué producto entraron.`,
      accion: { texto: "Ver el embudo", href: "#embudo" },
      peso: (datos.ingresos.moneda === "USD" ? ingresos.valor * ARS_POR_USD_APROX : ingresos.valor) * 0.5,
    });
  }
  return salida;
}

export function generarLecturas(datos: Datos): Lectura[] {
  if (datos.sinDatos) return [];
  const candidatas = [
    ...reglasEmbudo(datos),
    ...reglasPaginas(datos),
    ...reglasBusquedas(datos),
    ...reglasFuentes(datos),
    ...reglasVariacion(datos),
  ].sort((a, b) => b.peso - a.peso || a.id.localeCompare(b.id));

  const porFamilia = new Map<string, number>();
  const elegidas: Lectura[] = [];
  for (const c of candidatas) {
    const usadas = porFamilia.get(c.familia) ?? 0;
    if (usadas >= POR_FAMILIA) continue;
    porFamilia.set(c.familia, usadas + 1);
    const { peso, familia, ...lectura } = c;
    void peso;
    void familia;
    elegidas.push(lectura);
    if (elegidas.length === MAXIMO) break;
  }
  return elegidas;
}
