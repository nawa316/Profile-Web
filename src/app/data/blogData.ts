// Dummy data untuk blog yang nantinya bisa disinkronkan ke database (PostgreSQL/MySQL)
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
}

export const blogData: BlogPost[] = [
  {
    id: 1,
    title: "Memulai Karir sebagai Web Developer di 2024",
    slug: "memulai-karir-web-developer-2024",
    excerpt: "Panduan lengkap untuk memulai karir sebagai web developer, dari belajar dasar-dasar hingga mendapatkan pekerjaan pertama.",
    content: `
      Web development adalah salah satu bidang yang paling diminati saat ini. Dengan semakin banyaknya bisnis yang beralih ke platform digital, kebutuhan akan web developer terus meningkat.

      ## Langkah Pertama: Pelajari Dasar-Dasar

      Mulailah dengan mempelajari HTML, CSS, dan JavaScript. Ketiga teknologi ini adalah fondasi dari web development.

      ## Framework Modern

      Setelah menguasai dasar-dasar, pelajari framework modern seperti React, Vue, atau Angular untuk frontend, dan Node.js, Express, atau Laravel untuk backend.

      ## Bangun Portfolio

      Buat proyek-proyek kecil untuk mengisi portfolio Anda. Ini akan membantu Anda mendapatkan pekerjaan pertama.
    `,
    image: "/images/blog/web-developer.jpg",
    author: "Muhammad Ade Dzakwan",
    category: "Career",
    tags: ["Web Development", "Career", "Programming"],
    publishedAt: "2024-01-10",
    readTime: 5
  },
  {
    id: 2,
    title: "Tips Optimasi Performa Website dengan Next.js",
    slug: "optimasi-performa-nextjs",
    excerpt: "Pelajari cara mengoptimalkan performa website Next.js Anda dengan teknik-teknik terbaik.",
    content: `
      Next.js adalah framework React yang powerful untuk membangun website dengan performa tinggi. Berikut adalah tips untuk mengoptimalkan website Next.js Anda.

      ## Image Optimization

      Gunakan komponen Image dari Next.js untuk mengoptimalkan gambar secara otomatis.

      ## Code Splitting

      Next.js secara otomatis melakukan code splitting, tetapi Anda bisa mengoptimalkannya lebih lanjut dengan dynamic imports.

      ## Caching Strategy

      Implementasikan strategi caching yang tepat untuk meningkatkan waktu loading.
    `,
    image: "/images/blog/nextjs-performance.jpg",
    author: "Muhammad Ade Dzakwan",
    category: "Technology",
    tags: ["Next.js", "Performance", "React"],
    publishedAt: "2024-02-15",
    readTime: 7
  },
  {
    id: 3,
    title: "Pentingnya UI/UX dalam Pengembangan Aplikasi",
    slug: "pentingnya-ui-ux-development",
    excerpt: "Mengapa UI/UX sangat penting dalam pengembangan aplikasi dan bagaimana cara menerapkannya dengan baik.",
    content: `
      UI/UX adalah aspek yang sering diabaikan dalam pengembangan aplikasi, padahal sangat penting untuk kesuksesan produk.

      ## Apa itu UI/UX?

      UI (User Interface) adalah tampilan visual dari aplikasi, sedangkan UX (User Experience) adalah pengalaman pengguna saat menggunakan aplikasi.

      ## Mengapa Penting?

      Aplikasi dengan UI/UX yang baik akan meningkatkan kepuasan pengguna dan retensi.

      ## Best Practices

      - Konsisten dalam desain
      - Fokus pada kebutuhan pengguna
      - Lakukan user testing
    `,
    image: "/images/blog/ui-ux.jpg",
    author: "Muhammad Ade Dzakwan",
    category: "Design",
    tags: ["UI/UX", "Design", "User Experience"],
    publishedAt: "2024-03-20",
    readTime: 6
  },
  {
    id: 4,
    title: "Mengenal Database PostgreSQL untuk Pemula",
    slug: "mengenal-postgresql-pemula",
    excerpt: "Panduan dasar PostgreSQL untuk pemula, dari instalasi hingga query dasar.",
    content: `
      PostgreSQL adalah database relasional open-source yang powerful dan populer di kalangan developer.

      ## Instalasi

      PostgreSQL dapat diinstal di berbagai sistem operasi dengan mudah.

      ## Query Dasar

      Pelajari query dasar seperti SELECT, INSERT, UPDATE, dan DELETE.

      ## Keunggulan PostgreSQL

      - ACID compliant
      - Extensible
      - Open source
      - Great performance
    `,
    image: "/images/blog/postgresql.jpg",
    author: "Muhammad Ade Dzakwan",
    category: "Database",
    tags: ["PostgreSQL", "Database", "Backend"],
    publishedAt: "2024-04-25",
    readTime: 8
  },
  {
    id: 5,
    title: "Membangun API RESTful dengan Node.js dan Express",
    slug: "api-restful-nodejs-express",
    excerpt: "Tutorial lengkap membangun API RESTful menggunakan Node.js dan Express framework.",
    content: `
      RESTful API adalah standar dalam pengembangan web modern. Mari pelajari cara membuatnya dengan Node.js dan Express.

      ## Setup Project

      Mulai dengan npm init dan install express.

      ## Struktur Folder

      Gunakan struktur folder yang terorganisir untuk maintainability.

      ## Implementasi CRUD

      Implementasikan operasi Create, Read, Update, Delete untuk resource Anda.

      ## Best Practices

      - Gunakan status code yang tepat
      - Validasi input
      - Handle errors dengan baik
    `,
    image: "/images/blog/nodejs-api.jpg",
    author: "Muhammad Ade Dzakwan",
    category: "Backend",
    tags: ["Node.js", "Express", "API", "Backend"],
    publishedAt: "2024-05-30",
    readTime: 10
  },
  {
    id: 6,
    title: "Trend Teknologi Web yang Harus Diketahui di 2024",
    slug: "trend-teknologi-web-2024",
    excerpt: "Jelajahi tren teknologi web terbaru yang akan mendominasi industri di tahun 2024.",
    content: `
      Industri web development terus berkembang dengan cepat. Berikut adalah tren yang harus Anda ketahui.

      ## AI dan Machine Learning

      Integrasi AI dalam web development semakin populer.

      ## Server Components

      React Server Components mengubah cara kita membangun aplikasi.

      ## Edge Computing

      Deployment di edge untuk performa yang lebih baik.

      ## Web3 dan Blockchain

      Teknologi terdesentralisasi mulai diadopsi lebih luas.
    `,
    image: "/images/blog/web-trends.jpg",
    author: "Muhammad Ade Dzakwan",
    category: "Technology",
    tags: ["Trends", "Technology", "Web Development"],
    publishedAt: "2024-06-15",
    readTime: 6
  }
];

// Fungsi helper untuk fetch data (bisa diubah untuk koneksi database)
export async function getBlogPosts(): Promise<BlogPost[]> {
  // TODO: Ganti dengan query database
  // Contoh dengan PostgreSQL:
  // const result = await pool.query('SELECT * FROM blog_posts ORDER BY published_at DESC');
  // return result.rows;
  return Promise.resolve(blogData);
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  // TODO: Ganti dengan query database
  // const result = await pool.query('SELECT * FROM blog_posts WHERE slug = $1', [slug]);
  // return result.rows[0];
  return Promise.resolve(blogData.find(post => post.slug === slug));
}

export async function getBlogByCategory(category: string): Promise<BlogPost[]> {
  // TODO: Ganti dengan query database
  // const result = await pool.query('SELECT * FROM blog_posts WHERE category = $1', [category]);
  // return result.rows;
  return Promise.resolve(blogData.filter(post => post.category === category));
}

export async function getBlogByTag(tag: string): Promise<BlogPost[]> {
  // TODO: Ganti dengan query database
  // const result = await pool.query('SELECT * FROM blog_posts WHERE $1 = ANY(tags)', [tag]);
  // return result.rows;
  return Promise.resolve(blogData.filter(post => post.tags.includes(tag)));
}
