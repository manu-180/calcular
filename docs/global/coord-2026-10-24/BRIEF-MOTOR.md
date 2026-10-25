# Brief de frente de motor de idioma (calcularya)

Leé primero `C:\MANU\coord\BRIEF-COMUN.md` (vale entero). Un idioma entra al sistema cuando tiene
todos sus diccionarios completos (lo obliga TypeScript). Un frente de motor deja el idioma listo para
que después un agente de país solo escriba el país.

## Qué incluye un idioma nuevo (modelos: rama `origin/claude/mundo-motor-eu` para pl/sv/da y
`origin/claude/mundo-motor-3`, ya en main, para ja/ko/zh; ADR 0002, D2 y D8)

1. `src/motor/tipos.ts`: el código en `IDIOMAS`.
2. Motor y formato: `src/motor/textos.ts` (textos del motor y mensajes de error), `src/motor/formato.ts`
   (parseo de números del locale), `src/motor/i18n/plural.ts`, `src/motor/i18n/unidades.ts` (plurales
   de unidades), `src/motor/i18n/gramatica.ts`, `src/motor/i18n/calculadora.ts`.
3. Sitio: `src/motor/i18n/<idioma>.ts`, `src/motor/i18n/index.ts`, `src/motor/i18n/inicio/<idioma>.ts`,
   `src/motor/i18n/legales/<idioma>.ts` y su `index.ts`, `src/motor/ui/textos-inicio.ts`.
4. Venta: `src/lib/pagos/textos/<idioma>.ts` (diccionario completo de venta: ofertas, informes,
   planillas, mails) y alta en `src/lib/pagos/textos/index.ts` (`IDIOMAS_VENTA`).
5. Reglas de texto del idioma en `scripts/reglas_idioma.ts`; casos de parseo y plurales en
   `scripts/check_motor.ts`; mercados de prueba del idioma en `scripts/check_universales.ts` y lo que
   pida `scripts/check_ofertas_intl.ts` y `scripts/check_i18n.ts`.
6. Las 41 universales en el idioma: `src/motor/universales/<id>/textos/<idioma>.ts` y
   `contenido/<idioma>.ts` (exportan `textos<Idioma>` y `contenido<Idioma>`); el cableado lo hace
   `npx tsx scripts/gen_idiomas_universales.ts`. Slugs: la palabra que busca la gente en ese idioma
   (kebab-case ASCII, transliterado si el alfabeto no es latino; para escrituras no latinas decidí
   entre el slug en inglés del catálogo, como hizo D8 con ja/ko/zh, o la transliteración estándar, y
   anotalo en el ADR).
7. Una edición interna de prueba `src/paises/zz-<idioma>/` como `zz-ja` o `zz-ar` (registrada en
   `PAISES` con `estado: "interno"`).
8. Una entrada nueva en `docs/adr/0002-mundo.md` (D-siguiente) con registro y trato elegidos (un solo
   registro por idioma, el de los sitios de servicio del país: por ejemplo tú/Ty informal o Pan/Pani
   formal en polaco), formato, slugs y reglas; y una entrada en `docs/global/ESTADO.md`.

Registro: un solo registro por idioma para la web, sin variantes por trato. Elegilo como lo usan los
bancos y las webs de servicios del país, justificalo en el ADR.

## Verificación antes de devolver

```
npx tsc --noEmit -p .
npx tsx scripts/check_i18n.ts
npx tsx scripts/check_motor.ts
npx tsx scripts/check_universales.ts
npx tsx scripts/check_ofertas_intl.ts
npx tsx scripts/check_textos_paises.ts zz-<idioma>
npx tsx scripts/gen_idiomas_universales.ts --check
npx tsx scripts/check_fronteras.ts
npx tsx scripts/check_eol.ts
```

Commiteá cada bloque (núcleo, sitio, venta, cada 8 a 10 universales). Al terminar, escribí el cuerpo
del PR en `C:\MANU\coord\prs\` como dice el brief común.
