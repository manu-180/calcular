# Google sacó calcularya.com del índice el 2/11/2026

Encontrado el 23/11/2026, tres semanas tarde: nadie lo vio porque el informe semanal mide fugas página
por página y no el total del sitio.

## Qué pasó (Search Console, `sc-domain:calcularya.com`)

| Día | Impresiones | Clics |
|---|---:|---:|
| 29/10 | 18.278 | 119 |
| 30/10 | 18.911 | 119 |
| 31/10 | 15.471 | 84 |
| 1/11 | 9.855 | 68 |
| 2/11 | 198 | 1 |
| 10/11 | 86 | 1 |
| 20/11 | 9 | 0 |

- Acciones manuales: ninguna. Problemas de seguridad: ninguno (consola, 23/11).
- Googlebot recibe 200, `index, follow`, canonical propio; rastreo estable (600 a 1.200 pedidos por día,
  100 % 200). No es técnico.
- Inspección de URL de páginas que traían tráfico (`/py/salario-por-hora`, `/bo/jubilacion`, `/mx`,
  `/cl/sueldo-liquido`, 30 más): todas «Rastreada: actualmente sin indexar». Indexación de páginas:
  7.229 «descubierta, sin indexar» y 2.541 «rastreada, sin indexar».
- calcular.ar no se movió (10.000 impresiones por día antes y después).

Una caída de 98 % de un día para el otro, en todo el dominio y sin acción manual, es una baja algorítmica
del sitio entero. La causa no la dice Google; lo que el sitio hizo justo antes sí se sabe.

## Qué se había hecho

- Dominio nuevo (16 países el 12/10). El 26 y 27/10 entraron 32 países; el 1/11, 10 más. En tres semanas:
  142 ediciones y 10.300 URLs en el sitemap. El estándar propio decía 1 a 3 países por semana.
- De esas URLs, 2.937 son calculadoras locales con datos del país. El resto se repite por edición: 5.666
  universales (41 por país, cambian moneda e idioma), 1.182 de rankings, horas, mundo, fuentes,
  novedades y quiénes somos, 426 legales y 142 portadas de país.
- Antes de la caída las locales traían 536 de los 728 clics; 4.408 universales no tuvieron nunca una
  impresión.

Es el patrón que Google llama contenido a escala: muchas páginas casi iguales, publicadas de golpe, en
un dominio sin historia. El estándar pedía menos del 7 % de páginas finas y el sitio tenía más del 70 %
de páginas repetidas.

## Qué se hizo el 23/11

1. **Poda de rescate** (`scripts/poda-universales.ts --rescate`): 5.017 universales con menos de 10
   impresiones en toda su historia pasan a `noindex, follow`, fuera del sitemap y de los clústeres
   hreflang. Quedan indexables 649. El sitemap bajó de 10.300 a 5.492 URLs (contado en producción el 23/11).
2. **Legales**: privacidad, términos y contacto se indexan solo en la edición global
   (`legalIndexable` en `src/motor/paginas.ts`). «Quiénes somos» sigue indexable en cada edición.
3. **Alarma**: `scripts/medicion/informe.ts` compara el total de impresiones de cada sitio contra el
   período anterior y abre el informe con el aviso si cae más de la mitad.
4. **Freno a países nuevos** (`.claude/rules/paises-freno.md`).

## 24/11: rankings, horas y mundo, una edición por idioma

Esas tres secciones muestran la misma tabla de países en las 142 ediciones (1.136 URLs, 611 impresiones
en total antes de la caída). Ahora se indexan solo en la edición de referencia de cada idioma
(`src/motor/referencia.ts`: inglés en global, español en México, portugués en Brasil, francés en
Francia; 40 ediciones). Las demás siguen vivas y enlazadas con `noindex, follow`, fuera del sitemap. El
clúster hreflang pasa a ser por idioma (`es`, `fr`), no por país. Un idioma nuevo entra solo.

## Qué falta y cómo se juzga

- Las locales sin impresiones (2.050 de 2.937) no se tocan: se arreglan, no se podan.
- La recuperación de una baja así tarda semanas o meses y no está garantizada. Se mira cada lunes en
  «Google, sitio entero» del informe. Señal de vuelta: más de 5.000 impresiones por día durante 14 días.
- Si al 1/2/2027 no hay señal, la decisión es de Manuel: seguir esperando, o concentrar las locales
  que funcionaban (Bolivia, Paraguay, Centroamérica) y soltar el resto.
