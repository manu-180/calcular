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
Cuando haya países con datos, sumarlas al sitemap leyendo `ca_sueldos_agregados` (pendiente).
