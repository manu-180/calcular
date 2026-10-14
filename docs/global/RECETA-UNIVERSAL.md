# Receta: una calculadora universal

Una universal vive una sola vez en `src/motor/universales/<id>/` y la instancian todos los países.
El ejemplo completo y en verde es `src/motor/universales/descuento/`: copiá su forma.
El catálogo (id, concepto, slugs, categoría, familia de oferta) está en `docs/adr/0002-mundo.md` §3.

## Archivos

```
src/motor/universales/<id>/
  definicion.ts        export interface Ui<Id> { ... } y export function definir(ctx, ui): DefinicionCalculadora
  textos/<idioma>.ts   export const textos<Idioma>: TextosUi<Ui<Id>> = { slug, ui: (trato) => ({...}) }
  contenido/<idioma>.ts  export const contenido<Idioma>: ContenidoUniversal = (ctx) => ({ h1, title, ... })
  casos.ts             export const casos: readonly CasoUniversal[]
  index.ts             export default definirUniversal<Ui<Id>>({ id, concepto, definir, textos, contenido, casos })
```

y una línea en la lista de tu frente (`src/motor/universales/finanzas.ts` o `cotidianas.ts`).

## Reglas

**`definicion.ts`**
- Usa `definirCalculadora` de `../../calculo` con `id: ctx.id`, `mercado: ctx.mercado`,
  `slug: ctx.slug`, `estado: ctx.estado`, `concepto` fijo y `requiere: {}` (salvo `iva`, que pide
  `{ [ctx.datos.tasa]: "numero" }`).
- **Ningún texto visible** en este archivo: todo sale de `ui` (etiquetas, opciones, filas,
  observaciones, mensajes de `ErrorEntrada`). Las funciones de `ui` reciben números ya formateados
  como `string` si hace falta.
- `calcular` es pura: nada de `Date` con la hora local, `fetch`, `Math.random`. Las fechas llegan
  como `"AAAA-MM-DD"`; la fecha de hoy está en `contexto.fecha`. Para cuentas de fechas usá UTC
  (`Date.UTC`) sobre esos strings.
- Montos por defecto con `montoEjemplo(ctx, baseEnDolares)`: queda un número redondo en la moneda
  del país. Tasas y porcentajes por defecto, fijos y razonables (no son datos del país).
- Unidades: `ctx.unidades` es `"metrico"` o `"imperial"` (EE. UU.). Si la calculadora usa medidas
  (peso, altura, distancia, superficie, volumen, consumo), las etiquetas y la cuenta siguen ese
  sistema. Resultados con unidad física van con `formato: "numero"` y la unidad en la etiqueta.
- Tablas (amortización, plan año por año): devolvé un `TablaResultado`
  (`{ tipo: "tabla", columnas: [{ clave, etiqueta, formato }], filas: [[...], ...] }`) y declaralo en
  `tablas: [{ clave, titulo, filasVisibles: 12 }]`. La página muestra las primeras filas; el
  informe pago, la tabla entera. Máximo 600 filas.
- `redondear` del contexto en cada paso donde corresponda y al final. Nada de `toFixed`.
- Entrada imposible: `throw new ErrorEntrada(ui.errorX, "campo")`.

**`textos/<idioma>.ts`**
- `slug`: el del catálogo para ese idioma.
- En español, cada texto que se dirige a la persona tiene tres variantes con `segunTrato(trato, { tu,
  usted, vos })`: tú («calcula», «tienes»), usted («calcule», «tiene») y voseo («calculá», «tenés»).
  Lo impersonal («Precio final») va igual en los tres.
- Fuera del español el registro es fijo por idioma y no hay variantes (`ui: () => ({...})`):
  en neutro, pt-BR «você», fr «vous», de «Sie», it «tu», nl «je». El `trato` de cada mercado de esos
  idiomas se fija en consecuencia.
- `ui` recibe `(trato, locale)`. El locale es el del mercado (`de-CH`, `pt-PT`, `fr-CA`) y sirve para
  lo que cambia dentro de un mismo idioma: «ss» en vez de «ß» en de-CH, el vocabulario de pt-PT
  («ecrã», «facto») frente a pt-BR, o un separador decimal que el texto escribe a mano. Quien no lo
  necesita lo ignora: `ui: () =>` y `ui: (trato) =>` siguen valiendo. Ejemplo:
  `ui: (_trato, locale) => { const ss = (s: string) => (locale === "de-CH" ? s.replace(/ß/g, "ss") : s); ... }`.

**`contenido/<idioma>.ts`**
- `title` hasta 60 caracteres con el nombre del país (`ctx.nombrePais`), armado con
  `tituloQueEntre(...)` y candidatos de más a menos completos, porque hay países de nombre largo
  («Saint Vincent and the Grenadines»). `description` entre 70 y 160. Al menos 3 preguntas en `faq`; `intro` y `comoSeCalcula` con al menos una entrada.
- Los números de los ejemplos **se calculan**, no se tipean: usá `montoEjemplo` y la misma fórmula
  (o `definir(ctx, ui).calcular(...)`), y formateá con `formatearMonto(ctx, n)` y
  `formatearNumero(ctx, n, decimales)` para que salga con el separador del país.
- Sin rayas («—», «–», « - »), sin emojis, sin signos de exclamación de vendedor, sin muletillas
  («cabe destacar», «a continuación», «en resumen»). Una idea por oración, primero la respuesta.
  Ver `docs/GUIA-REDACCION.md`. Español neutro de cada trato (sin «vosotros»).
- Salud (IMC, calorías, embarazo, ovulación): informativo, con una oración que diga que no
  reemplaza la consulta con un profesional. Sin diagnósticos ni promesas.

**`casos.ts`**
- Al menos 2 casos, con la cuenta escrita en `detalle`: uno normal y uno de borde (cero, tope, error).
- `fecha` fija. `entrada` con todos los campos (los opcionales vacíos en `null`).
- Si el caso depende del sistema de unidades, `contexto: { unidades: "imperial" }` y otro métrico.

## Verificación

```
npx tsc --noEmit
npx tsx scripts/check_universales.ts <id>
```

El check arma la calculadora en mercados de prueba de cada idioma y trato (MXN tú, COP usted, UYU
vos, USD imperial, GBP métrico y nombres de país largos en cada idioma), corre los casos, formatea el resultado y revisa largos, rayas y
emojis.
