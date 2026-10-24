# «Sueldos reales»

Fecha: 2026-10-24. Pedido: un moat de datos propio que crece con el uso y que la prensa pueda citar.
La gente aporta su sueldo de forma anónima y opcional; publicamos mediana y rango por país y ocupación
solo cuando hay 10 aportes o más.

## Qué se guarda y qué no

Tabla `ca_sueldos_aportes` (migración `20261024120000_ca_sueldos.sql`): `id` (uuid de idempotencia),
`mercado`, `moneda`, `ocupacion` (lista cerrada de 35), `experiencia` (0-2, 3-5, 6-10, 11+),
`bruto_mensual` (redondeado a dos cifras significativas antes de guardar; un check lo exige) y `mes`
(AAAA-MM, lo pone el servidor). No hay IP, user agent, vid, texto libre, created_at ni identity: nada que
identifique ni que ordene los aportes en el tiempo. Por eso tampoco hay forma de borrar «mi» aporte, y la
política de privacidad lo dice.

Por qué el `id` del navegador como clave primaria: un reintento después de un timeout no suma un aporte
de más. Se genera al tocar «Sumar» y se descarta al guardarse; no queda en el navegador.

## k-anonimato y atípicos

- K = 10 por celda (país, ocupación) y también por (país, ocupación, experiencia).
- Antes de contar se sacan los atípicos de la celda con vallas de Tukey a 3 × IQR (con menos de 4
  aportes no se filtra). K se cuenta sobre lo que queda: 9 aportes buenos y 1 absurdo no publican.
- Se publica mediana, p25 y p75, redondeados a dos cifras, más la cuenta. Siempre se devuelve la cuenta
  (también debajo de K): «somos 6 de 10» no dice cuánto gana nadie.
- Ventana: los últimos 12 meses. Una sola moneda por país (la del aporte más nuevo), para que una
  redenominación no mezcle monedas.
- Tope de 5000 aportes por (país, ocupación, mes) en un trigger: frena una inundación desde muchas IP.

Riesgos que quedan, a propósito:

- Diferenciación: quien mire la celda justo antes y después de un aporte ve cómo se movió la mediana.
  Lo acotan el redondeo de las cifras, la caché de una hora (varios aportes entre lecturas) y que solo se
  publiquen cuartiles. La respuesta del POST devuelve la celda fresca, pero es la misma forma pública.
- Inflación alta (Argentina, Venezuela): 12 meses de sueldos nominales mezclan meses con precios muy
  distintos. Si la señal llega, el siguiente paso es indexar por IPC del mes o achicar la ventana por país.
- Una campaña coordinada de valores plausibles mueve la mediana. Atípicos, el límite por IP y el tope
  por celda la hacen cara; no imposible.

## Validación del aporte

`src/motor/sueldos/reglas.ts`, igual en el navegador y en `/api/sueldos`: claves exactas, `ok: true`
(consentimiento), uuid v4, país de la grilla del mundo, ocupación de la lista, rango de la lista y monto
entre 100 y 150.000 dólares PPA por mes (50 veces el sueldo de ejemplo de la página del mundo). El
salario mínimo como piso (0,3 veces) está soportado pero no se usa: ninguna calculadora del registro lo
tiene hoy en una forma mensual común. Todo rechazo es el mismo `{ ok: false }`, sin motivo. Además:
origen del propio sitio, `esBot`, `application/json`, cuerpo de 512 bytes y 6 aportes por IP cada 10
minutos (en memoria, IP hasheada con sal del proceso). En el navegador, un aporte por país y mes
(localStorage con país y mes, nunca el monto).

## Lectura

`GET /api/sueldos/<mercado>?e=<edición>`: `{ ok, k, datos, pagina, trato }`. CDN una hora más la caché de
datos de Next otra hora (`unstable_cache`, un error no se cachea). `trato` va porque el módulo vive dentro
de MundoCliente, que no sabe el trato de la edición. `ok: false` = sin base: el módulo no se muestra.

## UX

En la página del mundo, después del ranking, carga diferida (React.lazy + IntersectionObserver): la
carga inicial no paga los textos de diez idiomas. Elegir ocupación muestra al instante la celda del CDN;
con experiencia elegida y celda publicada, esa. El aporte es optimista (gracias y cuenta + 1 al tocar; si
el servidor dice que no, vuelve atrás). Debajo de K: puntos de progreso y compartir (origen `mundo`).

## Páginas

`/<m>/<slug por idioma>` (SLUG_SUELDOS) y `/sueldos-reales` en calcular.ar, con OG propia. `noindex`
hasta que haya una ocupación publicada, y fuera del sitemap por ahora: una página casi vacía no suma.
Desde el endurecimiento, el sitemap las suma solo cuando hay datos publicados (ver abajo).

## Endurecimiento (2026-10-24, migración `20261024150000_ca_sueldos_endurecer.sql`)

La auditoría encontró dos ataques confirmados antes de salir a producción:

- **Diferenciación con aportes falsos (alto).** Con 9 aportes armados se publicaba la celda de una sola
  persona real, y con la celda publicada alcanzaba comparar antes y después de un aporte (el POST además
  devolvía la celda recalculada al instante, y `total` iba exacto).
- **Envenenamiento de la mediana (medio).** Con muchos valores iguales el IQR daba 0 y las vallas de Tukey
  sacaban a todos los sueldos reales.

Qué cambió:

- **Publicación por foto diaria.** Los aportes del día van a `ca_sueldos_pendientes` (con el día UTC) y
  `ca_sueldos_publicar` los pasa a `ca_sueldos_aportes` (sin fecha) recién al día siguiente, y rehace
  `ca_sueldos_publicados`. Corre con pg_cron si el proyecto lo tiene (00:07 UTC) y, si no, la primera lectura
  del día. Se eligió así para no depender de infraestructura: la lectura publica sola si hace falta y, si la
  publicación falla, sirve la foto anterior. Un candado (exclusivo al publicar, compartido al sumar) evita
  que un aporte a medio guardar a medianoche cuente su día dos veces.
- **Diversidad.** Una celda se publica con 10 aportes limpios de al menos 3 días y 2 meses distintos. Los
  días se cuentan en `ca_sueldos_dias` (cuenta por celda y mes, ninguna fecha). Un ataque concentrado en
  minutos no completa nada.
- **Sin cuenta exacta.** Tramos `lejos` / `cerca` (7 o más) sin publicar y `10-19`, `20-49`, `50+` publicada.
- **Redondeo más grueso.** Múltiplo del 5 % de la mediana (el paso redondeado a una cifra: si no, la grilla
  misma se corría con la mediana) y dos cifras. Con la foto de antes y la de después, un aporte nuevo deja
  ver a lo sumo en qué cuarto cayó, nunca el monto (check_sueldos lo prueba).
- **El POST responde `{ ok }`.** La persona ve su posición contra la foto ya publicada (cacheada), calculada
  en el navegador, y el «gracias» dice que entra en la próxima actualización diaria.
- **Topes en la base** (`ca_sueldos_sumar`): 3 aportes por huella y día, 1 por huella y celda, 30 por celda y
  día. La huella es HMAC-SHA256 de la IP con una clave que deriva de `SUELDOS_SECRETO` (o de la clave de
  servicio si no existe) y del día UTC: cambia cada día, la base nunca ve la IP y la tabla se borra al
  cerrar el día. El tope de 5000 por celda y mes (trigger) se fue: con el lote de la publicación habría
  tirado abajo la foto entera si una celda se llenaba.
- **Piso del IQR** en 10 % de la mediana: 30 valores iguales ya no borran a los reales cercanos (±30 %).
- **Sin lectura con la anon key.** Se borraron `ca_sueldos_agregados` (lectura en vivo concedida a anon) y
  `ca_sueldos_aportar`; anon y authenticated no ejecutan ninguna función de sueldos. Lee el Route Handler con
  la service role.
- **`?e=`** solo con ediciones reales.
- **Sitemap.** Las páginas entran cuando su país tiene una ocupación publicada (`ca_sueldos_paises`, cacheado,
  3 s de tope; sin base, afuera). Hreflang solo entre ediciones del mismo país.

Riesgos que quedan, a propósito:

- Un atacante con muchas IP, paciencia (3 días y 2 meses) y 9 aportes falsos sigue pudiendo rodear a una
  sola persona real. Lo que saca es el cuarto en que cae su sueldo dentro de cifras redondeadas al 5 %, no el
  monto, y no sabe cuándo entró el aporte (la cuenta va en rangos).
- La ocupación entera y sus rangos de experiencia se publican por separado: comparar las dos da algo sobre
  el rango que no se publica. Con cuartiles redondeados (no promedios) es poco.
- En el borde de medianoche la huella del endpoint (día de Node) y el día de la base pueden no coincidir por
  segundos: como mucho un aporte de más por huella.
