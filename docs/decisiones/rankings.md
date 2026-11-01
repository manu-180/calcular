# Rankings de países y datos abiertos

2026-10-24. Rama `claude/fase2-rankings`. Contrato: `src/motor/rankings/{calculo,vista,rutas,urls}.ts`.

## Qué es

Tres rankings sobre la grilla de «Tu sueldo en el mundo», a sueldos brutos fijos en dólares
internacionales (12.000, 30.000 y 75.000 al año): dónde rinde más un mismo sueldo (neto mensual),
día de libertad tributaria y cuánto queda de un aumento (de bajo a medio, de medio a alto). Cada
edición destaca su país con una frase citable, guarda la variación contra una foto mensual y trae un
kit de prensa (cita copiable, compartir, PNG en 2400 x 1260). Más un JSON y un CSV CC BY 4.0.

## Por qué estos tres

- **Rinde**: la frase que levanta la prensa («México, puesto 27 de 41»).
- **Día de libertad**: concepto que la prensa ya conoce (Tax Freedom Day) y se busca por país.
- **Aumento**: es el único con orden propio (tasa marginal entre dos niveles, depende de la
  progresividad y de los escalones de la ley).
- **Carga sobre el sueldo** se descartó como ranking aparte: a un mismo bruto en PPA, el neto es
  bruto × (1 − tasa), así que ordenaría exactamente igual que «rinde». Va como columna.

## Decisiones

- **Rutas**: una ruta única `i/rankings/[seccion]` para todos los idiomas, a la que next.config reescribe cada slug de `SLUG_RANKINGS` (desde 2026-10-29, `src/motor/secciones.ts`), con `[ranking]` adentro (slugs de
  `SLUGS_RANKING`). Lista de params vacía: cada edición se pinta al primer pedido (ISR, revalidate de
  una hora por el layout intl). Grilla vacía o idioma ajeno: 404.
- **Global**: `/country-rankings` y `/data/*` llegan por reglas propias en `hosts.ts`.
- **Datos en el HTML**: el servidor manda las tres variantes ya formateadas (`vista.ts`); el cliente
  solo elige cuál mostrar y reordena las filas con FLIP (transform, sin movimiento con
  prefers-reduced-motion).
- **Insertar (iframe)**: no se hizo. `next.config.ts` pone `frame-ancestors 'self'` en todo salvo
  `/<m>/embed/<slug>`; habilitarlo pide un header nuevo para `/:mercado/<índice>/<ranking>/embed` en
  next.config.ts y una ruta compacta.
- **Compartir**: usa `origen: "mundo"`. Para medir aparte hace falta sumar `"ranking"` a
  `ORIGENES_COMPARTIR` (y su corto) en `src/motor/compartir/ref.ts` y en `/api/e`.

## Foto mensual

`npx tsx scripts/rankings/foto_mensual.ts` guarda `historial/AAAA-MM.json` y reescribe
`historial/indice.ts`; no pisa una foto existente sin `--forzar`. Desde el 24/10/2026 la corre la ronda
mensual (`scripts/cron/mensual.ts`: tarea programada `CalcularYa-Mensual` el día 1, y
`.github/workflows/mensual.yml` cuando vuelva Actions), que valida y pushea los dos archivos a main.
Detalle en `docs/decisiones/horas.md` § «Refresco automático». Sin la foto la página sigue andando, solo
sin variación.

## Fecha de actualización

La grilla se fecha con la zona más adelantada del planeta (`hoyMasAdelantado`), así que el 24 a la noche
en América la página decía «Actualizado el 25 de octubre». La vista muestra el día de la zona de la
edición (UTC en global), nunca posterior al de la grilla (`diaActualizacion` en vista.ts).

## CSV

Una celda de texto que empieza con `=`, `+`, `-` o `@` va con `'` adelante: si no, la planilla la toma
como fórmula. Los números no se tocan.

## Verificación

`scripts/check_rankings.ts`: orden, empates 1-2-2-4, presencia de cada país de la grilla, frase de
posición coherente en las 107 ediciones y en los 10 idiomas, rutas y carpetas, historial, datos
abiertos y grilla vacía.
