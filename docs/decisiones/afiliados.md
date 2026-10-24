# Afiliados en «Tu sueldo en el mundo»

2026-10-23. Rama `claude/fase2-ar`. Apagados hasta que Manuel abra las cuentas.

## Cómo se prenden

Variables de entorno de Vercel (Production y Preview), una por socio, con el link de afiliado completo
(`https://`; otro esquema se ignora):

| Variable | Socio | Qué se muestra |
|---|---|---|
| `NEXT_PUBLIC_AFILIADO_WISE_URL` | Wise | cuenta multimoneda, tipo de cambio medio y comisión a la vista |
| `NEXT_PUBLIC_AFILIADO_DEEL_URL` | Deel | contratos y cobros para quien trabaja para una empresa de otro país |

Son `NEXT_PUBLIC_`: entran en el build. Cambiarlas pide redeploy. Sin ninguna, el bloque no se pinta y
su JS (textos en diez idiomas y estilos, `AfiliadosBloque.tsx`) nunca se baja.

## Dónde y cuándo aparece

En la página del mundo de calcularya y de calcular.ar (`MundoCliente`), debajo del ranking, solo si la
persona cargó su sueldo (no con el de ejemplo) y el país donde más rinde no es el suyo. Es una nota
pegada a esa lista: nunca popup ni banner, con la etiqueta «Enlaces patrocinados» a la vista,
`rel="sponsored noopener"` y la aclaración de que el sitio puede cobrar una comisión.

## Textos

`src/motor/i18n/afiliados.ts`, en los diez idiomas y sin segunda persona (el bloque no recibe el trato
del mercado). Nada de «el mejor»: cada línea dice qué hace el servicio. Pasan las reglas de
`scripts/reglas_idioma.ts` (coreano en 해요체).

## Medición

Clic → `rastrear("afiliado_clic", { props: { socio, pais } })`, `pais` = ISO del mejor país. Hasta que
el tipo exista, `/api/e` lo descarta y el resto del lote entra. Falta, fuera de esta rama:

1. `src/lib/rastreo.ts`: sumar `"afiliado_clic"` a `TIPOS_EVENTO` y a `TIPOS_BOCA_A_BOCA` (o un set
   equivalente) para que `/api/e` lo saque del lote mientras la base no lo acepte.
2. `src/app/api/e/protocolo.ts`, en `ESQUEMAS`:
   `afiliado_clic: { requeridas: { socio: enLista(["wise", "deel"]) }, opcionales: { pais: conForma(/^[A-Z]{2}$/) } }`.
3. Migración: sumar `afiliado_clic` al CHECK de tipo de `ca_eventos`.
