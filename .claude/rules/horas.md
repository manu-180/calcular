---
paths:
  - "src/motor/horas/**"
  - "src/lib/horas/**"
  - "src/motor/i18n/horas.ts"
  - "scripts/horas/**"
  - "scripts/check_horas.ts"
---

# «¿Cuántas horas de trabajo cuesta?»

Historia y porqués: `docs/decisiones/horas.md`.

- `src/motor/horas/**` no importa el registro, `src/lib` ni `server-only` (check_fronteras). La entrada
  para páginas y checks es `informeHoras()`/`indiceHoras()` de `src/lib/horas/indice.ts`, que nunca tira.
- `precios.json` sale solo de `npx tsx scripts/horas/actualizar_precios.ts` (tienda oficial, robots.txt,
  una lectura por producto y país con pausa). No se edita a mano. Nunca un precio de revendedor.
- Un precio con más de 120 días (`VIGENCIA_PRECIO_DIAS`) no se publica. Un salario o una jornada fuera de
  vigencia tampoco: el país sale solo del índice ese día. check_horas falla si algo vencido se publica o
  si con los precios al día quedarían menos de 10 países; que venzan por tiempo es solo aviso.
- Qué páginas existen lo decide `publicacionDe()` (publicacion.ts) y nada más: página, OG, sitemap
  (`entradasDelMercado(..., { horas })`), hreflang y llms.txt. Sin `horas`, mapa.ts no lista horas.
- La página del producto inicial lleva canonical al índice y no va al sitemap (son la misma página).
- Los precios los renueva la ronda mensual (`scripts/cron/mensual.ts`, tarea `CalcularYa-Mensual`).
- El monto del mínimo siempre sale del registro (dato verificado y vigente). `MINIMOS` (minimos.ts) solo
  dice qué dato, qué categoría y qué jornada; una jornada escrita a mano lleva su fuente oficial leída y,
  si ya hay una reforma publicada, `hasta` (México: 48 h hasta 2026-12-31, 46 h desde 2027).
- Un país sin declaración entra si su calculadora de salario mínimo pide un valor por hora; si no,
  queda excluido con motivo. Para sumarlo: su jornada semanal leída en la fuente oficial.
- El diccionario (`src/motor/i18n/horas.ts`) es impersonal a propósito (sin tú/vos/usted) y en
  plantillas `{marca}`: así no hace falta parche de trato y el cliente no recibe funciones.
- «Con un sueldo real» (`Propio` en HorasCliente): el sueldo se escribe o llega del traspaso del mundo
  (sessionStorage) y nunca sale del navegador. La tarjeta recibe `h` = horas propias en décimas; la OG
  deduce la proporción sobre el mínimo (horas del mínimo ÷ h) y con eso arma el resto de los países. El
  link compartido es el de la página pública, sin `h`.
- `horasMes` (datos-cliente.ts) es `porHoraDe` dado vuelta: si cambia la conversión, cambian las dos.
