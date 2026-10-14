# Receta para sumar un país a CalcularYa

Esta receta es para el agente de **un** país. Seguila al pie de la letra: no vas a poder preguntar
nada y los checks están hechos para atrapar los errores de abajo. El ejemplo completo y funcionando
es el mercado ficticio `zz` (`src/paises/zz/`): copiá su forma, nunca sus valores.

Leé antes, en este orden:

1. `docs/research/paises/<m>.md` (tu país: valores, fuentes, tono, vocabulario, calculadoras top).
2. `docs/GUIA-REDACCION.md` (sin rayas, breve, humano).
3. `docs/adr/0001-multi-pais.md` (D3 a D6) y `docs/adr/0001-enmienda-2026-10-07.md`.
4. `src/motor/tipos.ts` y `src/motor/conceptos.ts` (el contrato, en código).
5. `src/paises/zz/` entero.

## 1. Qué podés tocar

| Podés crear y editar | No tocás nunca |
|---|---|
| `src/paises/<m>/**` | `src/motor/**`, `src/paises/index.ts` (lo edita el coordinador), otros países |
| `scripts/paises/<m>/**` (scripts propios, opcional) | `src/app/**`, `src/lib/**`, `src/data/**`, `src/components/**`, `scripts/check_*.ts`, `next.config.ts`, `.github/**`, `supabase/**` |

`<m>` es el código del mercado en minúsculas: `uy py bo ve mx pe co cl ec cr pa ni do gt sv hn`.
Tu país no importa nada de otro país ni de Argentina: solo de su carpeta, de `@/motor/*` y de
`react` (en el cliente). Lo controla `scripts/check_fronteras.ts`.

Si el motor no te alcanza (un tipo de campo que falta, un concepto que no está), **no lo
rodees**: resolvé con lo que hay (concepto `"propio"`, una calculadora en `borrador`) y anotalo en
tu informe final como pedido al motor.

## 2. Archivos de un país

```
src/paises/<m>/
  index.ts                       registro del país (export default definirPais({...}))
  mercado.ts                     locale, trato, monedas, zona horaria, regiones, redondeo
  datos.json                     normas con tramos de vigencia (salario mínimo, tasas, escalas...)
  series.json                    series que se actualizan solas (UF, UDIS, tipo de cambio...)
  avisos.json                    avisos legales (norma suspendida, reforma no vigente)
  novedades.ts                   cambios normativos publicados en /<m>/novedades
  fuentes.ts                     detectores de normas y series para el cron
  calculadoras/<slug>.ts         definición y función pura de cálculo
  calculadoras/<slug>.casos.ts   casos con resultado conocido
  calculadoras/<slug>.cliente.tsx   cliente de 4 líneas (siempre igual)
  contenido/<slug>.ts            textos de la página (h1, title, description, FAQ...)
```

Si tu país no tiene series o avisos, igual creá `series.json` con `"series": []` y `avisos.json`
con `"avisos": []`.

## 3. `mercado.ts`

```ts
import type { Mercado } from "@/motor/tipos";

export const mercado: Mercado = {
  codigo: "mx",
  pais: "MX",
  nombre: "México",
  locale: "es-MX",
  idioma: "es",
  trato: "tu",
  monedas: ["MXN"],
  zonaHoraria: "America/Mexico_City",
  estado: "interno",
  regiones: [
    { id: "general", nombre: "Zona general" },
    { id: "frontera-norte", nombre: "Zona Libre de la Frontera Norte" },
  ],
  redondeo: { decimales: 2, modo: "mitad-arriba" },
};
```

- `estado`: dejalo en `"interno"`. El coordinador lo pasa a `"publicado"`.
- `monedas`: la primera es la principal. Bolivia y Venezuela suman `"USD"` como segunda.
- `regiones`: solo si alguna norma cambia por región (México frontera norte, Ecuador Costa y Sierra).
  Mínimo dos. Ids en kebab-case.
- `redondeo`: el que usa la norma o el organismo en sus ejemplos. Si no dice nada, los decimales
  de la moneda (CLP y PYG: 0) y `"mitad-arriba"`. Una calculadora puede pisarlo con su propio
  `redondeo` si su norma dice otra cosa.
- `simbolos` (opcional): si el símbolo que pone `Intl` no es el que se usa en el país. Panamá:
  `simbolos: { USD: "B/." }` (Intl muestra `USD 1,250.50`).

Valores de partida por país (confirmalos con tu research; el trato marcado como estimación hay que
validarlo antes de redactar):

| m | locale | trato | monedas | zonaHoraria | regiones sugeridas |
|---|---|---|---|---|---|
| uy | es-UY | vos | UYU | America/Montevideo | |
| py | es-PY | vos (estimación) | PYG | America/Asuncion | |
| bo | es-BO | usted | BOB, USD | America/La_Paz | |
| ve | es-VE | tu | VES, USD | America/Caracas | |
| mx | es-MX | tu | MXN | America/Mexico_City | general, frontera-norte |
| pe | es-PE | tu | PEN | America/Lima | |
| co | es-CO | usted | COP | America/Bogota | |
| cl | es-CL | tu | CLP | America/Santiago | |
| ec | es-EC | tu | USD | America/Guayaquil | costa, sierra (décimo cuarto) |
| cr | es-CR | usted | CRC | America/Costa_Rica | |
| pa | es-PA | tu | USD | America/Panama | |
| ni | es-NI | vos | NIO | America/Managua | |
| do | es-DO | tu | DOP | America/Santo_Domingo | |
| gt | es-GT | usted | GTQ | America/Guatemala | |
| sv | es-SV | usted | USD | America/El_Salvador | |
| hn | es-HN | usted | HNL | America/Tegucigalpa | |

## 4. `datos.json`: normas con vigencia

```json
{
  "mercado": "mx",
  "datos": [
    {
      "id": "mx.salario-minimo",
      "nombre": "Salario mínimo diario",
      "tipo": "numero",
      "unidad": "MXN",
      "regiones": ["general", "frontera-norte"],
      "proximaRevision": "2027-01-01",
      "tramos": [
        {
          "estado": "verificado",
          "region": "general",
          "desde": "2026-01-01",
          "hasta": "2026-12-31",
          "valor": 315.04,
          "fuente": {
            "organismo": "DOF",
            "titulo": "Resolución CONASAMI publicada el 9/12/2025",
            "url": "https://dof.gob.mx/nota_detalle.php?codigo=5775534&fecha=09/12/2025",
            "tipo": "primaria",
            "verificadoEl": "2026-10-07"
          }
        },
        {
          "estado": "verificado",
          "region": "frontera-norte",
          "desde": "2026-01-01",
          "hasta": "2026-12-31",
          "valor": 440.87,
          "fuente": { "...": "igual que arriba" }
        }
      ]
    },
    {
      "id": "mx.tope-deducciones",
      "nombre": "Tope de deducciones personales",
      "tipo": "numero",
      "unidad": "UMA",
      "tramos": [
        {
          "estado": "no-verificado",
          "desde": "2026-01-01",
          "valor": 5,
          "motivo": "Solo lo vimos en un portal contable; falta leerlo en la LISR."
        }
      ]
    }
  ]
}
```

Los números de este ejemplo son ilustrativos. **Nunca copies un valor de esta receta ni del
research sin abrir la fuente.**

### Campos de un dato

| Campo | Regla |
|---|---|
| `id` | `"<m>.<kebab-case>"`, único en el país |
| `tipo` | `"numero"` (un valor), `"mapa"` (`{ "clave": número }`, por ejemplo comisiones por AFP), `"escala"` (tabla por tramos de ingreso) |
| `unidad` | una moneda (`"PEN"`), `"%"`, `"dias"`, `"semanas"`, `"horas"`, `"meses"`, `"anios"`, `"numero"`, `"factor"` o una unidad de referencia (`UIT UF UTM UTA UMA UDI BPC UI UR UVT UVR SBU SMMLV IMM RMV`) |
| `regiones` | opcional. Si está, **cada** tramo lleva `region` y tiene que haber tramo verificado para **todas** las regiones para poder publicar |
| `etiquetas` | opcional, solo en `mapa`: nombre visible de cada clave (`{ "habitat": "AFP Habitat" }`) |
| `proximaRevision` | opcional: cuándo se espera el próximo cambio (alimenta el semáforo) |
| `tramos` | ordenados por `desde`; sin solapes dentro de cada región |

**Porcentajes: se escriben como en la norma.** 9 % es `9`, no `0.09`. 1,37 % es `1.37`. En el
cálculo se usa `porcentaje(base, tasa)` del motor, que divide por 100.

**Escalas:** cada fila es `{ "desde", "hasta" (null en la última), "tasa" (en %), "cuotaFija" (opcional) }`.
La fila siguiente empieza donde termina la anterior o un centavo después (`844.59` → `844.60`).
Los límites pueden estar en moneda o en unidad de referencia (Perú: en UIT); lo dice `unidad`.

```json
{ "desde": 0.01, "hasta": 844.59, "tasa": 1.92, "cuotaFija": 0 },
{ "desde": 844.60, "hasta": 7168.51, "tasa": 6.40, "cuotaFija": 16.22 }
```

### Verificado o no verificado (la regla más importante)

Un tramo es `"verificado"` **solo** si leíste el valor con tus ojos en la **fuente primaria
oficial**: diario oficial (El Peruano, DOF, IMPO, La Gaceta, Diario Oficial), ministerio de trabajo,
banco central o ente recaudador (SUNAT, SAT, DIAN, SII, DGI). Entonces:

- `fuente.tipo` = `"primaria"`, `fuente.url` = la URL `https` exacta donde lo leíste.
- `fuente.verificadoEl` = la fecha de hoy (`AAAA-MM-DD`), el día en que lo leíste.

Todo lo demás es `"no-verificado"` con `motivo` (por qué no se pudo confirmar): prensa, blogs,
portales contables, el research marcado "Secundaria", una fuente oficial que no abrió. Puede llevar
`valor` y una `fuente` secundaria como pista. **Un tramo no verificado nunca llega a una página:**
`vigente()` lo ignora y la calculadora que lo necesita no se publica. Eso es lo correcto, no un
problema a esquivar.

Los valores futuros ya anunciados se cargan como tramo nuevo con su `desde` (y al anterior se le
pone `hasta`). Si el decreto ya salió, verificado; si es un anuncio, no verificado.

## 5. `series.json`: valores que se actualizan solos

Para valores diarios o mensuales que publica una API oficial (UF, UDIS, UVR, UI, tipo de cambio,
IPC). Las escribe el cron (`datos-paises.yml`) si pasan las bandas del detector. Vos cargás la
serie con los últimos puntos que leíste.

```json
{
  "mercado": "cl",
  "series": [
    {
      "id": "cl.uf",
      "nombre": "Unidad de Fomento",
      "unidad": "CLP",
      "frecuencia": "diaria",
      "maxAntiguedadDias": 10,
      "fuente": {
        "organismo": "SII",
        "titulo": "Valores UF 2026",
        "url": "https://www.sii.cl/valores_y_fechas/uf/uf2026.htm",
        "tipo": "primaria",
        "verificadoEl": "2026-10-07"
      },
      "puntos": [["2026-10-06", 41106.35], ["2026-10-07", 41110.12]]
    }
  ]
}
```

- `puntos`: `["AAAA-MM-DD", valor]`, ordenados y sin fechas repetidas. Mensual: el día 1 del mes.
- `maxAntiguedadDias`: si el último punto es más viejo que esto, la serie no se usa (la
  calculadora sale de lo publicable). Diaria: 7 a 10. Mensual: 45 a 70.
- Solo fuente primaria.

## 6. `avisos.json`

```json
{
  "mercado": "co",
  "avisos": [
    {
      "id": "co.reforma-pensional",
      "nivel": "cautela",
      "desde": "2026-08-26",
      "hasta": "2027-03-31",
      "aplicaA": ["co.aportes"],
      "texto": "La reforma pensional rige desde el 1 de abril de 2027. Hasta entonces se calcula con la regla actual.",
      "fuente": { "organismo": "Corte Constitucional", "titulo": "Sentencia C-264 de 2026", "url": "https://...", "tipo": "primaria", "verificadoEl": "2026-10-07" }
    }
  ]
}
```

`nivel`: `"info"`, `"cautela"` o `"bloquea"` (oculta el resultado y muestra el texto: usalo cuando
calcular sería engañar, por ejemplo una norma suspendida). `aplicaA`: ids de calculadora, conceptos
o `"*"`.

## 7. Calculadora: `calculadoras/<slug>.ts`

```ts
import { definirCalculadora, ErrorEntrada, porcentaje, porRegion } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.gratificacion",
  mercado: "pe",
  concepto: "bono-semestral",
  slug: "gratificacion",
  estado: "publicado",
  requiere: {
    "pe.bonificacion-extraordinaria": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo mensual", min: 0 },
    { id: "asignacionFamiliar", tipo: "si-no", etiqueta: "Cobras asignación familiar" },
    { id: "meses", tipo: "entero", etiqueta: "Meses completos trabajados en el semestre", min: 0, max: 6, porDefecto: 6 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.meses > 6) throw new ErrorEntrada("Un semestre tiene 6 meses como máximo.", "meses");
    const gratificacion = redondear((entrada.sueldo * entrada.meses) / 6);
    const bonificacion = redondear(porcentaje(gratificacion, valores["pe.bonificacion-extraordinaria"]));
    return { gratificacion, bonificacion, total: redondear(gratificacion + bonificacion) };
  },
  resultado: [
    { clave: "gratificacion", etiqueta: "Gratificación", formato: "moneda" },
    { clave: "bonificacion", etiqueta: "Bonificación extraordinaria", formato: "moneda" },
    { clave: "total", etiqueta: "Total a cobrar", formato: "moneda", destacada: true },
  ],
});
```

(Ejemplo de forma: la fórmula real sale de la norma de tu país.)

### `requiere`: qué datos usa

| Valor | Lo que llega en `valores["id"]` |
|---|---|
| `"numero"` | `number` |
| `"mapa"` | `{ clave: number }` (usá `enMapa(mapa, clave)`) |
| `"escala"` | lista de filas (usá `aplicarEscala` o `aplicarEscalaMarginal`) |
| `"numero-por-region"`, `"mapa-por-region"`, `"escala-por-region"` | `{ region: valor }` (usá `porRegion(mapa, entrada.region)`) |
| `"serie"` | `{ fecha, valor }` (el último punto a la fecha de referencia) |

Si un dato tiene `regiones`, se pide con `-por-region`; si no, sin. Si algún requisito no tiene
tramo verificado a la fecha, la calculadora no se publica.

### `campos`

| tipo | Llega a `calcular` como | Notas |
|---|---|---|
| `moneda`, `numero`, `porcentaje` | `number` | `min`, `max`, `porDefecto`. El porcentaje llega como lo escribió la persona (9 = 9 %) |
| `entero` | `number` entero | |
| `fecha` | `"AAAA-MM-DD"` | `porDefecto: "hoy"` usa la fecha del servidor en la zona del mercado |
| `opcion` | el `valor` elegido (tipado) | `opciones: [{ valor, etiqueta }]`, al menos dos |
| `si-no` | `boolean` | |
| `region` | id de región | las opciones salen de `mercado.regiones`; `regiones: ["on", "bc"]` deja solo esas (un impuesto que no aplica en una provincia) |
| `opcion-dato` | clave del mapa | `dato: "<id>"`, que tiene que estar en `requiere` como `"mapa"`; las opciones salen del mapa y sus `etiquetas` |

`id` del campo en camelCase. `requerido: false` hace que llegue `null` si está vacío. El parseo de
números por locale (`1,474.77` en Perú, `1.750.905` en Colombia) lo hace el motor.

### `calcular`: reglas

- **Pura.** Nada de `Date`, `fetch`, `Math.random`, `process.env` ni lecturas de archivos. La fecha
  de referencia llega en el tercer argumento (`contexto.fecha`) y los valores en el segundo.
- **Redondeo:** usá `contexto.redondear(x)` en cada paso donde la norma redondea (o al final si
  la norma no dice). No uses `toFixed` ni `Math.round(x * 100) / 100`.
- Entrada imposible: `throw new ErrorEntrada("Texto en el tono del país.", "idDelCampo")`. Para
  errores genéricos, `new ErrorEntrada({ codigo: "opcion-invalida" })` y el motor pone el texto.
- Devuelve un objeto con números, textos, `null` (la fila no se muestra) y opcionalmente
  `observaciones: string[]` (notas debajo del resultado, en el tono del país).

### `resultado`

Cada fila: `clave` (una clave de lo que devuelve `calcular`), `etiqueta`, `formato`
(`moneda numero porcentaje dias semanas meses horas anios texto fecha`), y opcionales `moneda` (para
mostrar en la segunda moneda), `decimales`, `destacada`, `ocultarSiCero`, `ayuda`.
Si una clave no existe o es de otro tipo, TypeScript marca un error que dice
`error: estas claves de resultado no salen de calcular() o tienen otro tipo` (aparece donde se usa
la definición: `index.ts`, el cliente o los casos).

### `estado` de la calculadora

- `"publicado"`: todos sus `requiere` tienen tramo verificado **hoy** y tiene casos que dan.
- `"borrador"`: falta verificar algún dato. No se publica, no se le exigen casos ni FAQ, pero
  igual tiene que compilar.

`check_paises.ts` falla si una calculadora `publicado` no se puede publicar hoy.

## 8. Cliente: `calculadoras/<slug>.cliente.tsx`

Siempre estas cuatro líneas, cambiando solo el nombre:

```tsx
"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import gratificacion from "./gratificacion";
export default crearCalculadoraCliente(gratificacion);
```

## 9. Contenido: `contenido/<slug>.ts`

```ts
import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.gratificacion",
  h1: "Calculadora de gratificación",
  title: "Gratificación de diciembre 2026: calcula cuánto te toca",
  description: "Calcula tu gratificación con la bonificación extraordinaria del {{pe.bonificacion-extraordinaria}}. Datos oficiales con fecha y fuente.",
  intro: ["...", "..."],
  comoSeCalcula: ["Paso 1...", "Paso 2..."],
  ejemplo: ["..."],
  faq: [{ pregunta: "...", respuesta: "..." }],
  glosario: [{ termino: "...", definicion: "..." }],
});
```

- `title` hasta 60 caracteres y `description` hasta 160, contados con los marcadores ya resueltos.
- Al menos 3 preguntas en `faq` si la calculadora no es borrador.
- **Marcadores**: nunca escribas a mano un valor que vive en `datos.json`; usá un marcador y el
  motor pone el valor vigente, formateado:

| Marcador | Muestra |
|---|---|
| `{{pe.rmv}}` | el valor (`S/ 1,230.00`, `9 %`, `90 UF`) |
| `{{mx.salario-minimo@frontera-norte}}` | el valor de esa región (obligatorio en datos por región) |
| `{{pe.comision-afp[habitat]}}` | una clave de un mapa |
| `{{pe.rmv#desde}}` | la fecha desde la que rige (`1 de octubre de 2026`); también en escalas |
| `{{cl.uf}}` (una serie) | el punto vigente a la fecha (con `maxAntiguedadDias`); `{{cl.uf#desde}}` da su fecha |
| `{{de.einkommensteuer[2].tasa}}` | la tasa de la fila 2 de una escala (la primera es 0) |
| `{{de.einkommensteuer[2].desde}}` | el límite inferior de esa fila; también `.hasta` y `.cuotaFija` |
| `{{de.einkommensteuer[-1].tasa}}` | la última fila (`-2` la anteúltima) |
| `{{ca.impuesto[0].tasa@on}}` | una fila de una escala por región |

  Solo podés usar ids que estén en `requiere` de esa calculadora. Los tramos de una escala no se
  escriben a mano: con `[n].tasa` y `[n].desde` el texto cambia solo cuando cambia el año. Si al
  año siguiente la escala tiene menos filas y un índice queda afuera, `check_paises` lo marca como
  error (un marcador que hoy no se resuelve nunca llega a la página).

## 10. Casos: `calculadoras/<slug>.casos.ts`

```ts
import { definirCasos } from "@/motor/calculo";
import gratificacion from "./gratificacion";

export default definirCasos(gratificacion, [
  {
    nombre: "Diciembre 2026 con RMV y asignación familiar",
    origen: { tipo: "oficial", url: "https://...", detalle: "Ejemplo de la nota oficial: (1230 + 123) × 1,09 = 1474,77" },
    fecha: "2026-12-15",
    entrada: { sueldo: 1353, asignacionFamiliar: false, meses: 6 },
    esperado: { total: 1474.77 },
  },
]);
```

- Al menos un caso por calculadora que no sea borrador, tomado de un **ejemplo oficial**
  (`tipo: "oficial"` con la URL `https`) o **recalculado a mano con la norma**
  (`tipo: "recalculado"`, con la cuenta escrita en `detalle`).
- `fecha` fija (nunca "hoy"): el caso resuelve los datos de `datos.json` a esa fecha, así prueba
  la fórmula **y** los valores cargados. Al menos un caso por calculadora sin `valores`.
- `valores` (opcional) pisa datos para probar solo la fórmula.
- Probá los bordes: el día anterior y el día que empieza un tramo nuevo, cada región, cada opción.
- `esperaError: true` para entradas que tienen que tirar `ErrorEntrada`.
- Tolerancia por defecto: medio centavo (0,005). Si hace falta otra, `tolerancia` explícita.

## 11. Novedades: `novedades.ts`

```ts
import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "pe.rmv-octubre-2026",
    fecha: "2026-10-07",
    titulo: "Sube la remuneración mínima a S/ 1,230",
    texto: "Desde el 1 de octubre de 2026 la RMV es S/ 1,230. Ya la usan las calculadoras de gratificación y CTS.",
    vigenteDesde: "2026-10-01",
    calculadoras: ["pe.gratificacion"],
    fuente: { organismo: "El Peruano", titulo: "DS 015-2026-TR", url: "https://...", tipo: "primaria", verificadoEl: "2026-10-07" },
  },
];
```

Una novedad por cambio normativo reciente que afecte a tus calculadoras. Puede quedar vacía (`[]`).
Las series no generan novedad.

## 12. Detectores: `fuentes.ts`

El cron los corre; los checks solo validan su forma. Dos carriles:

```ts
import { esFechaISO } from "@/motor/vigencia";
import type { Detector, PuntoSerie } from "@/motor/tipos";

export const detectores: readonly Detector[] = [
  {
    id: "mx.udis-sidof",
    carril: "serie",
    serie: "mx.udis",
    metodo: "api-json",
    url: "https://sidofqa.segob.gob.mx/dof/sidof/indicadores/",
    banda: { min: 7, max: 12, saltoRelativoMax: 0.005 },
    async traer(http) {
      const json = await http.json(this.url);
      // convertir la respuesta a [{ fecha, valor }]; si la forma no es la esperada, return null
      return null;
    },
  },
  {
    id: "mx.dof-salarios",
    carril: "norma",
    datos: ["mx.salario-minimo"],
    metodo: "api-json",
    url: "https://sidofqa.segob.gob.mx/dof/sidof/notas/",
    async traer(http) {
      return [];
    },
  },
];
```

- `traer(http)` usa **solo** el `http` que recibe (`http.json`, `http.texto`, con
  `{ userAgentNavegador: true }` o `{ tlsTolerante: true }` si la fuente lo pide). Nunca `fetch`.
- Si la respuesta no tiene la forma esperada, `return null` (fuente caída o cambiada). Nunca
  inventes un valor.
- **Serie**: devuelve puntos `{ fecha, valor }`. La `banda` frena valores absurdos: `min` y `max`
  cubren lo plausible para dos o tres años; `saltoRelativoMax` es el salto máximo contra el último
  valor (UF o UDIS diarias: 0.005; tipo de cambio en economía estable: 0.05; Venezuela y Bolivia:
  más amplio, justificalo en tu informe).
- **Norma**: devuelve hallazgos `{ titulo, url, fecha }` de normas nuevas que podrían cambiar los
  `datos` que vigila. El cron abre un PR borrador; nunca se publica solo.
- Los comentarios en el código solo explican por qué (por ejemplo, por qué hace falta
  `userAgentNavegador`).

## 13. `index.ts`

```ts
import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import gratificacion from "./calculadoras/gratificacion";
import contenidoGratificacion from "./contenido/gratificacion";
import datos from "./datos.json";
import { detectores } from "./fuentes";
import { mercado } from "./mercado";
import { novedades } from "./novedades";
import series from "./series.json";

export default definirPais({
  mercado,
  datos,
  series,
  avisos,
  calculadoras: [
    { definicion: gratificacion, contenido: contenidoGratificacion, cliente: () => import("./calculadoras/gratificacion.cliente") },
  ],
  novedades,
  detectores,
});
```

Los checks descubren tu país por la carpeta, aunque todavía no esté en `src/paises/index.ts`.

## 14. Slugs y conceptos

**Slug:** la palabra que busca la gente de tu país, en kebab-case, sin tildes ni eñes
(`gratificacion`, `finiquito`, `prima-de-servicios`, `decimo-cuarto`, `sueldo-liquido`). Único en el
país. Reservados: `fuentes novedades calculadoras sitemap.xml robots.txt privacidad terminos
contacto sobre api intl og`.

**Concepto:** une páginas equivalentes entre países para hreflang. Una sola calculadora por
concepto en cada país. Si no tiene equivalente, `"propio"`. Lista canónica (`src/motor/conceptos.ts`):

| concepto | qué es | ejemplos |
|---|---|---|
| `sueldo-neto` | neto en mano desde el bruto | sueldo líquido, salario neto |
| `bono-semestral` | sueldo adicional obligatorio, una o dos veces por año | aguinaldo, gratificación (PE), prima de servicios (CO), décimo tercero (EC) |
| `decimo-cuarto` | bono anual de un salario básico, aparte del aguinaldo | décimo cuarto (EC, HN) |
| `liquidacion-final` | todo lo que se cobra al terminar la relación | finiquito, liquidación de beneficios sociales |
| `indemnizacion-despido` | solo la indemnización por despido | despido arbitrario (PE), años de servicio (CL), cesantía (CR) |
| `fondo-cesantia` | depósito periódico del empleador | CTS (PE), cesantías (CO), fondo de reserva (EC) |
| `vacaciones` | días y pago de vacaciones | vacaciones truncas, prima vacacional |
| `horas-extra` | horas por encima de la jornada | horas extraordinarias, sobretiempo |
| `salario-minimo` | mínimo vigente y equivalentes | RMV, SMMLV, ingreso mínimo |
| `reparto-utilidades` | participación en las ganancias | PTU (MX), utilidades (PE, EC, VE) |
| `aportes-seguridad-social` | descuentos y contribuciones sobre el sueldo | IMSS, BPS, AFP u ONP, IPS |
| `costo-empleador` | costo total de un sueldo para la empresa | costo empresa |
| `preaviso` | preaviso o su pago | desahucio |
| `trabajo-domestico` | trabajo en casas particulares | trabajadoras del hogar |
| `impuesto-renta` | impuesto o retención sobre sueldos | ISR, quinta categoría, IRPF, impuesto único |
| `retencion-honorarios` | impuesto sobre honorarios | cuarta categoría, boleta de honorarios |
| `regimen-simplificado` | régimen para pequeños contribuyentes | RESICO, Nuevo RUS, Régimen Simple |
| `iva` | sumar o quitar el impuesto al consumo | IVA, IGV, ITBIS, ITBMS |
| `conversor-unidad` | unidad de referencia principal a moneda | UF, UMA, UIT, UVT, BPC |
| `tipo-de-cambio` | tipo de cambio oficial | dólar BCV, SUNAT, FIX |
| `inflacion` | actualizar un monto por IPC | INPC, IPC |
| `plazo-fijo` | rendimiento de un depósito | CDT, CETES |
| `pension-alimentos` | cuota de alimentos orientativa | pensión alimenticia |
| `jubilacion` | estimación de la jubilación | pensión por vejez |
| `propio` | sin equivalente en otro país | prima de antigüedad (MX) |

`conversor-unidad` es para la unidad principal del país; las demás unidades van como `"propio"`.

## 15. Textos

| Regla | Detalle |
|---|---|
| Trato | el de `mercado.trato`. Tú: «calcula», «tienes», «puedes». Usted: «calcule», «tiene», «su». Vos: «calculá», «tenés». El check rechaza voseo en un mercado de tú o usted, formas de tú en uno de usted y el vosotros |
| Vocabulario | el del research de tu país (remuneración, planilla, quincena, finiquito...), nunca traducido del texto argentino |
| Sin rayas | ni «—» ni «–» ni « - » como pausa. Aclaraciones entre paréntesis o en otra oración |
| Breve y humano | una idea por oración, primero la respuesta, el término legal una vez y explicado |
| Prohibido | emojis, muletillas («cabe destacar», «a continuación», «asimismo», «no obstante», «en resumen»...), signos de exclamación de vendedor |
| Datos | los números vienen de `datos.json` con marcadores; no los copies en el texto |

Vale para todo lo que ve una persona: contenido, etiquetas de campos y filas, opciones,
observaciones, mensajes de `ErrorEntrada`, avisos y novedades.

## 16. Verificación antes de devolver

Desde la raíz del repo, todos en verde:

```
npx tsc --noEmit
npx tsx scripts/check_paises.ts <m>
npx tsx scripts/check_paises_casos.ts <m>
npx tsx scripts/check_textos_paises.ts <m>
npx tsx scripts/check_fronteras.ts
npx tsx scripts/check_motor.ts
```

Los avisos (⚠️) no fallan pero leelos: un tramo que vence en menos de 30 días, una serie vieja.

## 17. Errores comunes

| Síntoma | Causa | Arreglo |
|---|---|---|
| `se solapa con el que empieza` | dos tramos de la misma región cubren el mismo día | poné `hasta` al anterior (el día antes del nuevo `desde`) |
| `verificado exige fuente primaria` | marcaste verificado algo leído en prensa | pasalo a `no-verificado` con `motivo` |
| `la url tiene que ser https` | `http://` o URL vacía | la URL `https` exacta de la fuente |
| `tiene regiones: pedilo como numero-por-region` | `requiere` sin `-por-region` | corregí el requisito y usá `porRegion` |
| `está en estado publicado pero hoy no se puede publicar` | falta un tramo verificado hoy | verificalo en la fuente o pasá la calculadora a `borrador` |
| `al menos un caso tiene que usar los datos del repo` | todos los casos pisan `valores` | agregá un caso sin `valores` |
| `voseo «tenés» en un mercado de tu` | texto en el tono argentino | reescribí en el trato del país |
| `error: estas claves de resultado no salen de calcular()` | una fila pide una clave que no existe | corregí la `clave` o lo que devuelve `calcular` |
| un porcentaje da 100 veces menos | cargaste `0.09` en vez de `9` | los porcentajes van como en la norma |

## 18. Qué devolver

En tu informe final: rama y commit; lista de calculadoras con su estado y por qué las que quedaron
en borrador; tabla de datos con estado (verificado con URL, o no verificado con motivo); resultado
de los seis comandos con números; pedidos al motor si hubo.
