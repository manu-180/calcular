# Estado de calcularya.com (multi-país)

Última actualización: 2026-10-08 01:30. Pausa segura terminada (no quedó nada a medias, ningún agente
corriendo). Se retoma con todo y sin frenar a las ~05:36 del 8/10.

## Rama de integración

`claude/calcularya-intl` (pusheada). Todo lo integrado vive acá; `main` todavía no tiene nada de intl.

## Hecho e integrado

**Los 16 países publicados y registrados en `src/paises/index.ts`:**

| País | Calculadoras | Nota |
|---|---|---|
| Chile `cl` | 11 | todo verificado |
| Colombia `co` | 14 | FSP 2027 no verificado; detector UVR arreglado (Accept-Language sin región) |
| México `mx` | 14 | leyes de SEGOB/IMSS como primarias |
| Perú `pe` | 13 | RMA y UIT vencen 31/12/2026; sin detector SBS (CAPTCHA) |
| Uruguay `uy` | 11 | voseo |
| Ecuador `ec` | 11 | SBU, renta y canasta vencen 31/12/2026 |
| Costa Rica `cr` | 11 | usted |
| Guatemala `gt` | 8 (+3 borrador) | IVA, IGSS EMA y bonificación Q250 sin fuente legible |
| Paraguay `py` | 12 | voseo |
| República Dominicana `do` (importado como `rd`) | 11 | ISR 2027 no verificado |
| El Salvador `sv` | 9 (+1 borrador) | ISSS sin fuente primaria; reforma del aguinaldo 2026 pendiente de leer en el D.O. |
| Panamá `pa` | 11 | todo verificado |
| Honduras `hn` | 8 (+1 borrador) | décimo tercer mes sin fuente legible |
| Nicaragua `ni` | 10 | tipo de cambio sin detector (BCN: POST + TLS viejo + captcha); serie cargada hasta 31/12/2026 |
| Venezuela `ve` | 8 (+1 borrador) | solo tasa oficial BCV; salario mínimo Bs 130 con aviso; cestaticket en borrador |
| Bolivia `bo` | 12 (+1 borrador) | usted; TCO flotante (salto máx 12 %) |

**Plataforma y arreglos:**
- **Plataforma web (F3):** ruteo por host, SEO, hreflang, UI, aviso de país y partición del JS por calculadora.
- **Motor (F2):** decimales por moneda (enteros sin «,00»; hasta 6 decimales para datos como la UFV).
- **Pipeline de datos (F4):** runner, semáforo y workflow con un solo commit por corrida.
- **Fix A (pipeline):**
  - permisos mínimos;
  - parches validados (solo `series.json`);
  - TLS con intermedios versionados, sin `rejectUnauthorized: false`;
  - redirecciones seguras;
  - issues sin inyección y cerrados recién después de publicar;
  - `iguales()` en bandas;
  - `PAISES_TOLERANTE` ampliado;
  - `ci.yml` en cada PR.
- **Fix B (motor):**
  - el build falla si un país publicado tiene errores;
  - `hoyEn` usa la zona del mercado, con `revalidate` de 1 h;
  - «5.000» ambiguo se rechaza con un mensaje;
  - los gates de preview van por allowlist;
  - `/api` y `/og` de AR bloqueados en calcularya, con `llms.txt` propio;
  - 404 sin imports internos de Next;
  - `cargadores.ts` explícito (181 calculadoras; se regenera con `npx tsx scripts/check_motor.ts --generar-cargadores`);
  - tope en el finiquito de Chile.
- **Checks rápidos verdes después del último merge:** `tsc`, `check_paises`, `check_paises_casos`, `check_textos_paises`, `check_fronteras`, `check_motor`, `check_hreflang`, `check_routing_hosts`, `check_eol` y `check_datos_paises`.

## Al retomar (05:36), en orden y sin frenar

1. **Foto de calcular.ar bien hecha.**
   - Situación: la foto de `scripts/snapshots/rutas-ar.json` es vieja (de `9efc1f7`) y da 9 diferencias, que vienen de datos de AR actualizados después, no de intl.
   - Paso 1: hacer checkout de `origin/main` en un worktree aparte, `BUILD_CPUS=2 CALCULAR_HOY=2026-10-08 npm run build` y `check_rutas_ar --start --grabar`.
   - Paso 2: buildear `claude/calcularya-intl` con el mismo `CALCULAR_HOY` y comparar. Tiene que dar **idéntico**.
   - Paso 3: commitear la foto nueva.
2. `src/proxy.ts`: en el host intl, `/api/cuenta` hoy da el 404 con la marca de AR (el proxy corre antes de los rewrites). Hacer que en el host intl dé el 404 intl o un 404 sin marca, sin cambiar nada de AR.
3. En preview aparece el aviso «Parece que estás en Zetalandia»: el mercado `zz` no debe entrar nunca en el aviso de país.
4. `check-all` completo (unos 19 min), build sin la variable, build con la variable (`VERCEL_ENV=preview`) y `check_routing_hosts --start`.
5. ADR D2: documentar que se usa `global-not-found` (`experimental.globalNotFound`) con un 404 propio, y el plan B del 404 intl.
6. Abrir el PR de `claude/calcularya-intl` a `main`. Esperar el CI verde (`ci.yml`) y revisar el preview de Vercel con `/api/dev/sitio` (POST) para ver calcularya.
7. **Antes del merge a producción, confirmar con Manuel:** cambia la estructura de carpetas de calcular.ar, aunque la foto dé idéntico.
8. Activación después del merge:
   - `NEXT_PUBLIC_SITIO_INTL_URL=https://calcularya.com` en Vercel (production), que quita la redirección temporal;
   - redeploy;
   - smoke de calcularya.com/pe/gratificacion y del resto de los países;
   - Search Console (dominio y prefijos por país) y AdSense para calcularya.com.
9. Con aprobación de Manuel: hreflang desde calcular.ar con `NEXT_PUBLIC_HREFLANG_AR=1`.

## Pedidos al motor (no bloquean)

- Requisitos opcionales en una calculadora (zona franca de Nicaragua).
- `Http` con POST y TLS legado (BCN Nicaragua, Banguat SOAP).
- `opcion-dato` con `mapa-por-region` (Panamá).
- `aplicarEscala` "sobre el exceso de" el límite anterior (El Salvador lo resolvió con una función propia).
- `http.binario` para XLSX oficiales (BCRD, BCV).

## Decisiones tomadas

- Colombia en tú (la investigación decía usted).
- México: SEGOB (ordenjuridico.gob.mx) e IMSS como fuente primaria de leyes.
- Un país con todo verificado entra como `publicado`; lo no verificado no se publica.
- Nunca se salta un CAPTCHA, Cloudflare o Incapsula: el dato queda `no-verificado`.
- Mobbin y 21st no estaban conectados: el diseño de calcularya es criterio propio (`diseno-maestro`, `high-end-visual-design`).
