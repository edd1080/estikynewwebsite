# Estiky web — documento de contenido

## Stack y arranque
React + TypeScript + Vite. `npm i && npm run dev` · `npm run build`. Variables en `.env.example`.
Deploy en Vercel (`vercel.json` ya reescribe a `index.html`).

## Rutas
**Anunciantes (raíz):** `/`, `/formatos`, `/como-funciona`, `/medicion`, `/comparativa`, `/inversion`, `/casos-de-uso`, `/nosotros`, `/demo`, `/ayuda`, `/contacto`, `/legal/terminos`, `/legal/privacidad`, `/ingresar`, `/registro`
**Conductores:** `/conductores`, `/conductores/requisitos`, `/conductores/pagos`, `/conductores/seguridad`, `/conductores/ayuda`, `/conductores/ingresar`, `/conductores/registro`
**Otras:** 404.

## Reglas cumplidas
- Cero tarifas por km, ingresos o montos de pago al conductor. Q solo en rangos de presupuesto del formulario de demo.
- La superficie de anunciantes no habla de ganancias del conductor; la de conductores no habla de campañas de marca.
- Sin logos, testimonios, flota ni ROI inventados. Wraps ilustrativos con "TU MARCA".
- Burbujas de impresiones y contador del hero: **simulación ilustrativa**, rotulada como tal.
- Panel de ejemplo (sin reportes quincenales: todo se ve en tiempo real) marcado "Ejemplo de estructura" con valores XX,XXX.

## PENDIENTE — confirmar con producto (texto redactado de forma genérica)
1. Qué cubre exactamente cada formato (Full wrap / Panel+ / Panel) y qué vehículos admite.
2. Metodología real de impresiones estimadas (hoy descrita en general).
3. Tiempos aproximados por etapa (hoy "se indican en la propuesta").
4. Políticas de rechazo/pausa de campaña y reemplazo de vehículos.
5. Confirmar que el conductor no paga la instalación ni el retiro.
6. Fotos exactas requeridas al conductor y criterios de elegibilidad del vehículo (año, tipo).
7. Requisito de cuenta bancaria a nombre del conductor.
8. Plazo de respuesta a solicitudes (`RESPONSE_WINDOW`, hoy "2 días hábiles").
9. Correos de ventas/soporte/legal (hoy ventas@, soporte@, legal@estiky.com) y horario de atención.
10. Rangos de presupuesto del formulario de demo.
11. Textos legales: son borrador, marcados como sujetos a revisión legal.

## PENDIENTE — integración
- `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`: sin ellos, registro/login muestran aviso de "no conectado".
- `VITE_HANDOFF_ENDPOINT`: Edge Function que reciba el bearer y devuelva `{ code }` de un solo uso; la app debe canjearlo en `/auth/handoff`. Hoy el sitio nunca pasa tokens por URL; sin endpoint redirige a la app sin sesión.
- `VITE_DEMO_ENDPOINT`: destino real del formulario (POST JSON). Sin él, el formulario declara que no está conectado y ofrece envío por correo.
- Rol: se guarda en `user_metadata.role` (`advertiser` | `driver`); revisar contra el esquema real de roles.
- Analítica: `track()` usa `gtag`/`plausible` si existen; no envía datos personales.

## Imágenes necesarias (hoy son ilustraciones vectoriales / canvas)
- OG image 1200×630 definitiva (hay `og.svg` provisional; muchos scrapers piden PNG/JPG).
- Fotos reales de autos con wrap (campaña Testin 1) cuando existan y estén autorizadas.
- Capturas de la app del conductor y del dashboard del anunciante.

## Checklist
- [x] Build de producción sin errores; smoke test de 23 rutas en 1440 y 390 px sin errores de consola ni desborde horizontal.
- [x] SEO: título, descripción, canonical y OG por ruta; sitemap.xml; robots.txt; auth con noindex.
- [x] Accesibilidad: enlace "Saltar al contenido", foco visible, etiquetas en formularios, `details` para FAQ, `prefers-reduced-motion`, objetivos ≥44 px.
- [ ] Por medir: LCP < 2.5 s en 4G (fuentes self-hosted, rutas con lazy-load; falta Lighthouse en deploy), contraste AA con auditoría formal, `npm test` (no hay suite de pruebas).
