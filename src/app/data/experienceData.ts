// Dummy data untuk experience yang nantinya bisa disinkronkan ke database (PostgreSQL/MySQL)
export interface ExperienceItem {
  id: number;
  organization: string;
  role: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string | null; // null means current/ongoing
  type: "organization" | "work" | "volunteer";
  skills: string[];
  location?: string;
}

export const experienceData: ExperienceItem[] = [
  {
    id: 1,
    organization: "FSLDK Surabaya Raya",
    role: "Staff Media & Informasi",
    description: "Berkontribusi dalam pengelolaan media sosial dan penyebaran informasi kegiatan dakwah kampus di wilayah Surabaya Raya.",
    image: "/images/FSLDK.jpeg",
    startDate: "2023-09",
    endDate: null,
    type: "organization",
    skills: ["Social Media Management", "Content Creation", "Public Relations"],
    location: "Surabaya"
  },
  {
    id: 2,
    organization: "Ini Lho ITS!",
    role: "Staff Divisi IT",
    description: "Berkontribusi dalam pengembangan sistem informasi dan website untuk kegiatan open campus terbesar di ITS.",
    image: "/images/Ini Lho ITS!.jpeg",
    startDate: "2024-01",
    endDate: "2024-06",
    type: "organization",
    skills: ["Web Development", "React", "Next.js", "Team Collaboration"],
    location: "Surabaya"
  },
  {
    id: 3,
    organization: "ISE! (Information Systems Expo)",
    role: "Staff Web Developer",
    description: "Mengembangkan website untuk acara expo tahunan departemen Sistem Informasi ITS.",
    image: "/images/ISE.jpeg",
    startDate: "2024-02",
    endDate: "2024-05",
    type: "organization",
    skills: ["Web Development", "UI/UX Design", "React", "Tailwind CSS"],
    location: "Surabaya"
  },
  {
    id: 4,
    organization: "PMII Komisariat Sepuluh Nopember",
    role: "Anggota Aktif",
    description: "Berpartisipasi aktif dalam kegiatan organisasi kemahasiswaan dan pengembangan diri.",
    image: "/images/Logo_PMII.png",
    startDate: "2023-10",
    endDate: null,
    type: "organization",
    skills: ["Leadership", "Public Speaking", "Team Work"],
    location: "Surabaya"
  },
  {
    id: 5,
    organization: "JMMI ITS",
    role: "Staff Departemen Syiar",
    description: "Berkontribusi dalam kegiatan dakwah dan syiar Islam di lingkungan kampus ITS.",
    image: "/images/Logo JMMI.png",
    startDate: "2023-09",
    endDate: null,
    type: "organization",
    skills: ["Event Organizing", "Public Speaking", "Content Creation"],
    location: "Surabaya"
  },
  {
    id: 6,
    organization: "Habits (Himpunan Mahasiswa Sistem Informasi)",
    role: "Anggota",
    description: "Berpartisipasi dalam kegiatan himpunan mahasiswa jurusan Sistem Informasi ITS.",
    image: "/images/Logo IMBS.png",
    startDate: "2023-08",
    endDate: null,
    type: "organization",
    skills: ["Networking", "Academic Support", "Community Engagement"],
    location: "Surabaya"
  },
  {
    id: 7,
    organization: "Remaja Masjid Baitul Makmur",
    role: "Anggota Aktif",
    description: "Berpartisipasi dalam kegiatan keagamaan dan sosial di lingkungan masjid.",
    image: "/images/pp.png",
    startDate: "2020-01",
    endDate: null,
    type: "volunteer",
    skills: ["Community Service", "Event Organizing", "Leadership"],
    location: "Bondowoso"
  },
  {
    id: 8,
    organization: "Ahbabur Rasul",
    role: "Anggota",
    description: "Berpartisipasi dalam kegiatan dakwah dan kajian Islam.",
    image: "/images/Logo Ahbabur Rasul.png",
    startDate: "2021-01",
    endDate: null,
    type: "volunteer",
    skills: ["Religious Studies", "Community Engagement", "Public Speaking"],
    location: "Bondowoso"
  }
];

// Fungsi helper untuk fetch data (bisa diubah untuk koneksi database)
export async function getExperienceItems(): Promise<ExperienceItem[]> {
  // TODO: Ganti dengan query database
  // Contoh dengan PostgreSQL:
  // const result = await pool.query('SELECT * FROM experiences ORDER BY start_date DESC');
  // return result.rows;
  return Promise.resolve(experienceData);
}

export async function getExperienceById(id: number): Promise<ExperienceItem | undefined> {
  // TODO: Ganti dengan query database
  // const result = await pool.query('SELECT * FROM experiences WHERE id = $1', [id]);
  // return result.rows[0];
  return Promise.resolve(experienceData.find(item => item.id === id));
}

export async function getExperienceByType(type: string): Promise<ExperienceItem[]> {
  // TODO: Ganti dengan query database
  // const result = await pool.query('SELECT * FROM experiences WHERE type = $1', [type]);
  // return result.rows;
  return Promise.resolve(experienceData.filter(item => item.type === type));
}
