---
paths:
  - "src/motor/calendario/**"
  - "src/motor/i18n/calendario.ts"
  - "src/app/(intl)/intl/[mercado]/_calendario/**"
  - "src/app/(intl)/intl/[mercado]/i/calendario/**"
  - "scripts/check_calendario.ts"
---

# Calendario laboral y fiscal

Historia y porqués: `docs/decisiones/calendario.md`.

- Solo fechas del registro verificado (tramos con fuente primaria https, puntos de series de unidad
  de referencia, novedades con `vigenteDesde` y `Dato.calendario`). Nunca una fecha escrita en el
  motor ni en los textos: es dato YMYL.
- Un tramo sin tramo anterior entra solo si `desde > fuente.verificadoEl`: si no, su `desde` suele
  ser el día de carga (Ghana cargó 24 datos con desde = verificadoEl).
- Los avisos no son fechas: su `desde` es desde cuándo se muestran (pa.css-empleador se muestra en
  diciembre y la norma rige en marzo).
- Una serie entra solo si su id es una `UNIDADES_REFERENCIA` mensual o más lenta: el punto de un IPC
  es el mes medido, no el día de publicación.
- En una edición en otro idioma, un dato o serie con el nombre sin traducir se excluye (ca-fr hoy).
- Cada evento necesita una calculadora publicada que use el dato; sin eso se excluye con motivo.
- Una nota se funde con un tramo solo con candidato único: el dato lo pide la primera calculadora de la
  nota, es el único de esos que cambia ese día y ninguna otra nota lo tomó. Si no, va aparte (caso Suiza
  en check_calendario).
- El año del título es el período de la grilla de 12 meses (`anios` en presentar.ts), no el de las fechas.
- `calendarioDe` nunca tira: un país roto queda sin calendario. La página existe solo con al menos
  una fecha por delante (`esPublicable`); el sitemap, el hreflang, llms.txt y la tarjeta de la home
  usan la misma regla vía `calendarioPublicado`.
- Página, .ics y OG salen de `vistaCalendario` (presentar.ts): el archivo nunca dice otra cosa que la
  página. UID del .ics = `<edición>.<id del evento>@calcularya.com`; el id no puede cambiar de forma.
- Textos sin segunda persona a propósito: un solo texto sirve para tú/vos/usted, tu/vous, du/Sie.
