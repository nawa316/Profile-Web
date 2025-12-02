// Dummy data untuk portfolio yang nantinya bisa disinkronkan ke database (PostgreSQL/MySQL)
export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  link?: string;
  github?: string;
  createdAt: string;
}

export const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: "E-Commerce Website",
    description: "Platform e-commerce lengkap dengan fitur keranjang belanja, pembayaran, dan manajemen produk. Dibangun dengan Next.js dan Tailwind CSS untuk performa optimal.",
    image: "/images/portfolio/ecommerce.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    category: "Web Development",
    link: "https://example.com/ecommerce",
    github: "https://github.com/example/ecommerce",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Mobile Banking App",
    description: "Aplikasi mobile banking dengan fitur transfer, pembayaran tagihan, dan monitoring transaksi secara real-time.",
    image: "/images/portfolio/banking.jpg",
    technologies: ["React Native", "Node.js", "MongoDB", "JWT"],
    category: "Mobile Development",
    link: "https://example.com/banking",
    createdAt: "2024-02-20"
  },
  {
    id: 3,
    title: "Dashboard Analytics",
    description: "Dashboard interaktif untuk visualisasi data bisnis dengan grafik dan laporan yang komprehensif.",
    image: "/images/portfolio/dashboard.jpg",
    technologies: ["React", "D3.js", "Express.js", "MySQL"],
    category: "Web Development",
    link: "https://example.com/dashboard",
    github: "https://github.com/example/dashboard",
    createdAt: "2024-03-10"
  },
  {
    id: 4,
    title: "Social Media Platform",
    description: "Platform media sosial dengan fitur posting, komentar, like, dan sistem pertemanan.",
    image: "/images/portfolio/social.jpg",
    technologies: ["Vue.js", "Laravel", "PostgreSQL", "Redis"],
    category: "Web Development",
    link: "https://example.com/social",
    createdAt: "2024-04-05"
  },
  {
    id: 5,
    title: "IoT Smart Home System",
    description: "Sistem smart home untuk mengontrol perangkat rumah secara otomatis melalui aplikasi mobile.",
    image: "/images/portfolio/smarthome.jpg",
    technologies: ["Python", "Arduino", "MQTT", "React Native"],
    category: "IoT",
    github: "https://github.com/example/smarthome",
    createdAt: "2024-05-18"
  },
  {
    id: 6,
    title: "Learning Management System",
    description: "Platform pembelajaran online dengan fitur kelas virtual, quiz, dan progress tracking.",
    image: "/images/portfolio/lms.jpg",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "WebRTC"],
    category: "Web Development",
    link: "https://example.com/lms",
    github: "https://github.com/example/lms",
    createdAt: "2024-06-22"
  }
];

// Fungsi helper untuk fetch data (bisa diubah untuk koneksi database)
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  // TODO: Ganti dengan query database
  // Contoh dengan PostgreSQL:
  // const result = await pool.query('SELECT * FROM portfolios ORDER BY created_at DESC');
  // return result.rows;
  return Promise.resolve(portfolioData);
}

export async function getPortfolioById(id: number): Promise<PortfolioItem | undefined> {
  // TODO: Ganti dengan query database
  // const result = await pool.query('SELECT * FROM portfolios WHERE id = $1', [id]);
  // return result.rows[0];
  return Promise.resolve(portfolioData.find(item => item.id === id));
}

export async function getPortfolioByCategory(category: string): Promise<PortfolioItem[]> {
  // TODO: Ganti dengan query database
  // const result = await pool.query('SELECT * FROM portfolios WHERE category = $1', [category]);
  // return result.rows;
  return Promise.resolve(portfolioData.filter(item => item.category === category));
}
