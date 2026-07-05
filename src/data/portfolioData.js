export const portfolios = [
  {
    id: "sayurpedia",
    title: "SayurPedia Platform",
    category: "B2C E-Commerce",
    status: "prototype", // Opsi: "live", "prototype", "archived"
    shortDesc: "Platform e-commerce B2C untuk produk agrikultur segar.",
    fullDesc:
      "SayurPedia dirancang untuk memangkas jalur distribusi sayuran segar dari petani langsung ke konsumen akhir. Fokus utama pada UI/UX adalah kemudahan navigasi katalog dan proses checkout yang intuitif, dilengkapi sistem verifikasi pembayaran transfer manual.",
    techStack: ["React", "Tailwind CSS", "Node.js", "Express"],
    images: [
      "/portfolio/sayurpedia-1.png", // Nanti buat folder portfolio di dalam public/
      "/portfolio/sayurpedia-2.png",
    ],
    liveLink: "",
    sourceLink: "https://github.com/username/sayurpedia",
    figmaLink: "",
  },
  {
    id: "only-phones",
    title: "Only Phones Store",
    category: "E-Commerce Prototype",
    status: "archived",
    shortDesc: "Prototipe toko online spesialis smartphone.",
    fullDesc:
      "Pengembangan antarmuka toko online yang responsif dan berfokus pada kecepatan muat halaman. Menampilkan katalog smartphone dengan fitur filter dasar dan keranjang belanja.",
    techStack: ["PHP Native", "Tailwind CSS", "MySQL"],
    images: ["/portfolio/onlyphones-1.png"],
    liveLink: "",
    sourceLink: "",
    figmaLink: "https://figma.com/...",
  },
];
