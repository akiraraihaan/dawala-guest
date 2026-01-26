# Dokumentasi (Teknis) Web Desa Wisata Dawala

## Sekilas Info

Web ini dikembangkan sebagai bagian dari kegiatan pengmas yang berjudul "Peningkatan Kapasitas Masyarakat melalui Transformasi Digital dalam Perintisan Wisata Halal Berbasis Rantai Pasok Hijau di Desa Alamendah".

## Arsitektur Sistem

Web ini dibangun menggunakan arsitektur modern berbasis Next.js 15.4.5 dengan pendekatan full-stack. Sistem menggunakan React 19.1.0 sebagai library frontend dan PostgreSQL sebagai database utama. Konfigurasi teknologi dipilih untuk memberikan performa optimal, skalabilitas yang baik, dan kemudahan maintenance.

Stack teknologi yang digunakan meliputi Next.js sebagai framework utama dengan fitur App Router, TypeScript untuk type safety, Tailwind CSS untuk styling, Prisma sebagai ORM database, PostgreSQL sebagai database relational, dan integrasi dengan Supabase untuk layanan backend tambahan. Arsitektur ini memungkinkan pengembangan yang cepat dengan code organization yang terstruktur.

## Struktur Database

Database dirancang menggunakan Prisma ORM dengan skema yang terdiri dari empat model utama yaitu User, PendingUser, JenisPaket, dan Makanan. Setiap model memiliki relasi dan constraint yang jelas untuk menjaga integritas data.

Model User menyimpan informasi pengguna sistem dengan field id sebagai identifier unik menggunakan CUID, email yang bersifat unique, role dengan enum UserRole yang membedakan SUPER_ADMIN dan ADMIN, isApproved untuk status persetujuan akses, serta createdAt dan updatedAt untuk tracking waktu. Model PendingUser menyimpan data pengguna yang menunggu approval dengan struktur serupa ditambah field name dan authProvider untuk mendukung login email dan Google.

Model JenisPaket merepresentasikan kategori paket makanan dengan field id sebagai auto-increment integer, namaPaket untuk nama kategori dalam bahasa Indonesia, namaPaketEn untuk versi bahasa Inggris yang bersifat opsional, serta timestamp createdAt dan updatedAt. Model ini memiliki relasi one-to-many dengan Makanan.

Model Makanan menyimpan data menu makanan dengan field id, namaMakanan, deskripsi untuk deskripsi dalam bahasa Indonesia, deskripsiEn untuk versi bahasa Inggris, foto yang menyimpan array URL gambar dalam format JSON string, harga sebagai integer, jenisPaketId sebagai foreign key ke JenisPaket dengan onDelete cascade, serta timestamp. Relasi many-to-one dengan JenisPaket memastikan setiap makanan terhubung dengan kategori paketnya.

Database menggunakan PostgreSQL dengan koneksi melalui environment variable DATABASE_URL untuk connection string dan DIRECT_URL untuk direct connection. Konfigurasi ini mendukung deployment di platform cloud seperti Supabase atau Railway.

## Sistem Routing dan Middleware

Aplikasi menggunakan routing berbasis locale dengan struktur path yang dimulai dari root kemudian locale id atau en, diikuti dengan path halaman seperti menu atau contact. Middleware berperan penting dalam mengelola routing ini dengan memeriksa setiap request dan memastikan semua path memiliki locale prefix.

Ketika user mengakses path tanpa locale, middleware akan melakukan redirect otomatis ke locale yang tepat berdasarkan cookie preferred-locale. Jika cookie tidak ada, sistem akan menggunakan bahasa Indonesia sebagai default. Middleware ini mengecualikan path internal seperti underscore next, api, favicon, images, dan file static lainnya untuk menghindari redirect yang tidak perlu.

Konfigurasi matcher pada middleware menggunakan regex pattern untuk menangkap semua path kecuali yang dikecualikan. Pendekatan ini memastikan setiap halaman publik selalu memiliki context locale yang jelas, baik untuk rendering content maupun untuk SEO optimization.

## Sistem Internasionalisasi

Sistem multibahasa diimplementasikan dengan pendekatan hybrid yang menggabungkan static translation files dan dynamic translation API. File messages berisi terjemahan static untuk UI elements yang tidak berubah seperti label, button, dan navigation. File en.json dan id.json menyediakan pasangan key-value untuk teks interface.

Dynamic content seperti nama paket dan deskripsi makanan disimpan dalam database dengan field terpisah untuk setiap bahasa. Model JenisPaket memiliki namaPaket dan namaPaketEn, sedangkan Makanan memiliki deskripsi dan deskripsiEn. Helper functions di database-i18n.ts seperti getPackageName dan getFoodDescription menghandle logic pemilihan field berdasarkan locale aktif dengan fallback ke bahasa Indonesia jika terjemahan tidak tersedia.

Google Translate API digunakan untuk kebutuhan translation on-demand melalui endpoint api/translate. API ini menerima text dan targetLang kemudian mengembalikan translated text menggunakan Google Translate free tier. Implementasi mencakup error handling yang robust dengan fallback ke original text jika translation gagal, timeout protection untuk mencegah request yang terlalu lama, dan batching support untuk efisiensi saat translate multiple texts.

Translation utility di lib/translate.ts menyediakan fungsi translateText untuk single translation dan translateBatch untuk multiple translations secara parallel. Sistem ini dirancang untuk mengatasi lag yang sempat terjadi selama development dengan mengurangi beban translation melalui caching dan batching strategy.

## Komponen Frontend Utama

Header component menyediakan navigation bar dengan logo Dawala, menu navigasi ke halaman Home, Menu, dan Contact, serta LanguageSwitcher component. Implementasi responsive dengan hamburger menu untuk mobile devices menggunakan state management untuk toggle menu visibility.

LanguageSwitcher component memungkinkan user beralih antara bahasa Indonesia dan Inggris dengan UI berupa dropdown yang menampilkan flag icon dan nama bahasa. Component ini mengelola locale preference dengan menyimpan pilihan user ke localStorage dan cookie untuk persistence, melakukan client-side navigation ke path dengan locale baru menggunakan next/navigation router, dan sinkronisasi state dengan pathname untuk memastikan UI selalu reflect locale aktif.

Footer component menampilkan informasi kontak Dawala termasuk alamat di Desa Alamendah, nomor WhatsApp untuk reservasi, email, dan Instagram handle. Design menggunakan Tailwind CSS dengan background gradient green dan layout responsive untuk berbagai screen size.

MakananCard component merepresentasikan individual menu item dalam grid layout. Component menerima props berupa data makanan dan locale untuk display nama, deskripsi localized, harga formatted sebagai currency, dan image gallery dengan support multiple photos. Interaction mencakup click handler untuk membuka detail modal dan hover effect untuk better user experience.

MakananModal component menampilkan detail lengkap makanan dalam modal overlay dengan image carousel untuk multiple photos, full description dalam bahasa sesuai locale, price information, dan WhatsApp button untuk direct order. Modal dapat ditutup dengan click outside atau tombol close dengan animation smooth menggunakan CSS transitions.

FilterPaket component menyediakan category filter untuk menu dengan list jenis paket yang clickable, active state indicator untuk selected category, dan all option untuk menampilkan semua menu. Component menggunakan callback prop untuk notify parent component tentang perubahan filter selection.

SearchBar component memungkinkan user mencari makanan berdasarkan nama atau deskripsi dengan debounced input untuk performance optimization, clear button untuk reset search, dan placeholder text yang localized. Search logic case-insensitive dan mencari di multiple fields.

## API Routes

API makanan di app/api/makanan/route.ts menghandle GET request untuk fetch semua data makanan dari database. Query menggunakan Prisma Client dengan include jenisPaket untuk eager loading relational data. Response berupa JSON array dengan struktur yang sesuai dengan type Makanan. Error handling mencakup database connection errors dan query failures dengan appropriate HTTP status codes.

API jenis-paket di app/api/jenis-paket/route.ts serupa dengan API makanan namun fokus pada category data. Query sederhana tanpa include karena model JenisPaket tidak memiliki nested relations yang perlu di-fetch. Response format konsisten dengan convention REST API.

API translate di app/api/translate/route.ts menghandle POST request dengan payload text dan targetLang. Implementation menggunakan Google Translate free API endpoint dengan fallback mechanism yang robust. Validation mencakup check untuk empty text, minimum length requirement, dan language code validity. Response always consistent format dengan success flag untuk error handling di client side.

API test-db di app/api/test-db/route.ts digunakan untuk testing database connectivity. Endpoint ini menjalankan simple query untuk verify connection pool working correctly dan return connection status beserta timestamp. Useful untuk debugging deployment issues atau database configuration problems.

## Halaman Utama

Homepage di app/[locale]/page.tsx menampilkan landing page dengan hero section yang berisi welcome message localized, deskripsi singkat tentang Dawala, dan call-to-action button ke menu page. Background menggunakan image dari folder public/images dengan overlay gradient untuk readability. Section features menampilkan keunggulan seperti wisata halal, makanan tradisional, dan pengalaman budaya dengan icon dan short description.

Menu page di app/[locale]/menu/page.tsx merupakan halaman utama untuk browsing makanan. Implementasi menggunakan client-side rendering dengan hooks untuk state management. UseEffect fetch data dari API makanan dan jenis-paket saat component mount. State meliputi makanan array, jenisPaket array, selectedPaket untuk active filter, searchQuery untuk search functionality, loading state, dan error state.

Filter logic menggabungkan category filter dan search query dengan fungsi filteredMakanan yang check kedua conditions. Display menggunakan grid layout responsive dengan MakananCard components. Loading state menampilkan skeleton LoadingCards untuk better UX. Error state menampilkan error message dengan retry option.

Contact page di app/[locale]/contact/page.tsx menyediakan informasi kontak dan form sederhana. Static content includes alamat lengkap Dawala, jam operasional, nomor WhatsApp clickable dengan wa.me link, email dengan mailto link, dan social media links. Map embed bisa ditambahkan jika koordinat tersedia.

Not-found page di app/[locale]/not-found.tsx menampilkan custom 404 error page dengan message localized, illustration atau icon, dan navigation links untuk kembali ke homepage atau menu. Styling consistent dengan theme aplikasi untuk maintain brand identity.

## Library dan Utilities

Database connection di lib/database.ts menggunakan pg Pool untuk connection pooling ke PostgreSQL. Configuration includes connectionString from environment variable, SSL setting conditional based on NODE_ENV, max connections set to 20 untuk concurrent requests, idle timeout 30 seconds, dan connection timeout 2 seconds. Test connection function untuk verify connectivity dengan SELECT NOW query.

Prisma client di lib/prisma.ts implements singleton pattern untuk prevent multiple instances di development. Global variable digunakan untuk store prisma instance dan reuse across hot reloads. Production environment selalu create new instance untuk isolation.

Locale utility di lib/locale.ts menyediakan helper functions seperti getCurrentLocale yang extract locale from pathname, isValidLocale untuk validation, dan getLocalizedPath untuk construct path dengan locale. Type safety dengan Locale type definition as union of id and en.

Texts utility di lib/texts.ts handles static translations dengan dynamic import dari messages folder. Function getTexts load appropriate JSON file based on locale parameter. Return type any untuk flexibility karena translation keys bisa vary.

Database i18n utility sudah dijelaskan sebelumnya dengan focus pada localized content extraction dari database models. Functions defensive dengan fallback untuk handle missing translations gracefully.

Config file di lib/config.ts stores application-wide constants seperti WhatsApp number untuk contact, default locale, supported locales array, dan API endpoints. Centralized configuration memudahkan maintenance dan changes.

## Types dan Interfaces

Type definitions di types/index.ts mencakup semua domain models dan utility types. JenisPaket interface dengan id number, namaPaket string, namaPaketEn optional string, dan timestamps. Makanan interface dengan id, namaMakanan, deskripsi, deskripsiEn optional, foto string array parsed dari JSON, harga number, jenisPaketId, optional jenisPaket relation, dan timestamps.

TranslationResult interface untuk API response dengan originalText, translatedText, targetLang, dan success boolean. Locale type as literal union untuk type safety. UserRole enum mirror dari Prisma schema. Additional utility types untuk form data, filter options, dan modal state sesuai kebutuhan components.

Type exports menggunakan named exports untuk tree-shaking optimization. Consistent naming convention dengan PascalCase untuk interfaces dan types, camelCase untuk field names. Proper use of optional fields dengan question mark dan union types dengan pipe operator.

## Styling dan Responsiveness

Tailwind CSS digunakan untuk semua styling dengan configuration di postcss.config.mjs dan integration dengan Next.js. Global styles di app/globals.css define base styles, typography scales, dan utility classes. Color palette menggunakan green theme sesuai dengan brand Dawala dengan shades dari 50 sampai 900.

Responsive design menggunakan Tailwind breakpoints mobile-first approach dengan sm untuk 640px, md untuk 768px, lg untuk 1024px, dan xl untuk 1280px. Grid layouts menggunakan responsive columns dengan grid-cols-1 default, sm:grid-cols-2, lg:grid-cols-3, xl:grid-cols-4. Spacing consistent menggunakan Tailwind spacing scale.

Component-specific styles menggunakan className composition dengan conditional classes untuk states seperti active, hover, dan disabled. Dark mode consideration dengan support untuk future implementation melalui Tailwind dark variant.

Animation dan transitions untuk smooth interactions menggunakan Tailwind transition utilities dan custom keyframes untuk loading spinners dan modals. Performance-conscious dengan prefer CSS transitions over JavaScript animations dan transform properties untuk hardware acceleration.

## Fitur WhatsApp Integration

Integrasi WhatsApp memungkinkan customer langsung order melalui WhatsApp dengan pre-filled message. Implementation menggunakan wa.me link format dengan phone number dan encoded text parameter. Message template includes greeting, nama makanan, quantity placeholder, dan additional notes section.

Link construction di MakananModal component dengan dynamic text berdasarkan selected food item dan current locale. Button styling prominent dengan WhatsApp green color dan icon. Click tracking bisa ditambahkan untuk analytics purposes melalui Google Analytics atau custom event logging.

Contact page juga menggunakan WhatsApp link untuk general inquiries dengan different message template. Number format mengikuti international standard tanpa plus symbol dan country code Indonesia 62. Link opens WhatsApp web di desktop atau WhatsApp app di mobile devices seamlessly.

## Performance Optimization

Image optimization menggunakan Next.js Image component dengan automatic sizing, lazy loading default, blur placeholder untuk better perceived performance, dan format optimization ke WebP di supported browsers. Images di folder public/images dengan proper naming convention dan organization.

Data fetching optimization dengan parallel fetching menggunakan Promise.all untuk multiple API calls, client-side caching dengan SWR atau React Query bisa ditambahkan untuk production, dan proper loading states untuk better UX. Error boundaries untuk graceful error handling.

Code splitting automatic oleh Next.js dengan route-based splitting, dynamic imports untuk heavy components, dan tree-shaking untuk remove unused code. Bundle analysis dengan next-bundle-analyzer untuk identify optimization opportunities.

Database query optimization dengan proper indexing di columns yang frequently queried, select only needed fields untuk reduce data transfer, dan pagination untuk large datasets. Connection pooling dengan pg Pool untuk reuse connections dan prevent connection exhaustion.

## Security Considerations

Database security dengan prepared statements via Prisma untuk prevent SQL injection, environment variables untuk sensitive data never committed to git, dan SSL connection untuk production databases. Input validation di API routes dengan Zod schema validation untuk type safety dan security.

Authentication dan authorization untuk admin panel menggunakan role-based access control dengan UserRole enum, approval workflow untuk new users, dan session management dengan secure cookies. Public pages tidak require authentication untuk guest access.

CORS configuration di Next.js API routes dengan proper origin checking, rate limiting bisa ditambahkan untuk prevent abuse, dan input sanitization untuk XSS prevention. Security headers configuration di next.config untuk CSP, X-Frame-Options, dan lainnya.

## Testing Strategy

Unit testing untuk utility functions dan helpers dengan Jest dan React Testing Library. Test coverage untuk critical paths seperti translation logic, locale switching, dan data fetching. Mock external dependencies seperti database dan API calls.

Integration testing untuk API routes dengan supertest untuk HTTP assertions, database integration testing dengan test database, dan end-to-end testing dengan Playwright atau Cypress untuk user flows. Test environment setup dengan separate test database dan environment variables.

Manual testing checklist mencakup cross-browser testing di Chrome, Firefox, Safari, dan Edge, responsive testing di berbagai screen sizes, locale switching verification, dan form submissions dengan different scenarios. Performance testing dengan Lighthouse untuk identify bottlenecks.

## Troubleshooting Common Issues

Database connection errors bisa disebabkan oleh wrong connection string format, firewall blocking database port, SSL configuration mismatch, atau database server tidak running. Solution adalah verify connection string format, check firewall rules, adjust SSL settings di database.ts, dan ensure database server active.

Translation API timeout bisa terjadi karena slow network connection atau Google API rate limiting. Mitigation dengan increase timeout duration di api/translate route, implement retry logic dengan exponential backoff, dan add caching layer untuk frequently translated texts.

Locale switching tidak working properly bisa karena middleware configuration issue, cookie not being set correctly, atau pathname parsing error. Debug dengan check middleware matcher pattern, verify cookie settings dengan proper domain dan path, dan validate locale extraction logic di utility functions.

Build errors sering disebabkan oleh TypeScript type errors, missing environment variables during build, atau dependency version conflicts. Resolution dengan fix type errors dengan proper typing, ensure build-time env vars available, dan use exact versions di package.json atau update dependencies carefully.

Performance issues pada production bisa dari unoptimized images, missing database indexes, atau inefficient queries. Optimization dengan use Next.js Image component properly, add indexes pada frequently queried columns, dan analyze dengan tools seperti Prisma query logging dan Next.js built-in performance metrics.

## Lain lain

Training materials dan user manual tersedia dalam bentuk modul terpisah untuk super admin, admin, dan end users.