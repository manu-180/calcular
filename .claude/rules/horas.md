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
  si quedan menos de 10 países.
- El monto del mínimo siempre sale del registro (dato verificado y vigente). `MINIMOS` (minimos.ts) solo
  dice qué dato, qué categoría y qué jornada; una jornada escrita a mano lleva su fuente oficial leída y,
  si ya hay una reforma publicada, `hasta` (México: 48 h hasta 2026-12-31, 46 h desde 2027).
- Un país sin declaración entra si su calculadora de salario mínimo pide un valor por hora; si no,
  queda excluido con motivo. Para sumarlo: su jornada semanal leída en la fuente oficial.
- El diccionario (`src/motor/i18n/horas.ts`) es impersonal a propósito (sin tú/vos/usted) y en
  plantillas `{marca}`: así no hace falta parche de trato y el cliente no recibe funciones.
- Compartir usa `origen: "horas"`: hasta que `ORIGENES_COMPARTIR` lo sume, /api/e descarta el evento
  (el link funciona igual).
