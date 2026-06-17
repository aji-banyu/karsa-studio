import { motion } from "framer-motion";
import { BiLinkExternal, BiCodeAlt } from "react-icons/bi";

export default function PortofolioCard({ project, index, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      // Perhatikan penambahan ${className} di bagian akhir
      className={`group relative w-full rounded-[1.5rem] overflow-hidden cursor-pointer shadow-lg border border-[var(--border-color)]/20 ${className}`}
    >
      <div
        className={`absolute inset-0 w-full h-full ${project.image} transition-transform duration-1000 ease-in-out group-hover:scale-110 group-hover:rotate-1`}
      >
        {/* <img src={project.image} alt={project.title} className="w-full h-full object-cover" /> */}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="absolute inset-0 flex flex-col justify-end p-[2.5rem] md:p-[3rem] z-10">
        <motion.div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[var(--color-primary)] text-[1.2rem] font-medium tracking-wide">
            <BiCodeAlt className="text-[1.6rem]" />
            <span>{project.category}</span>
          </div>

          <h3 className="text-white text-[2.4rem] md:text-[2.8rem] font-bold mb-2 leading-snug drop-shadow-md">
            {project.title}
          </h3>

          <p className="text-gray-300 text-[1.4rem] line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {project.desc}
          </p>

          <div className="flex items-center justify-between mt-4">
            <span className="text-[var(--color-primary)] text-[1.3rem] font-semibold tracking-wider uppercase">
              {project.tech}
            </span>
            <a
              href={project.link}
              className="flex items-center justify-center w-[4.5rem] h-[4.5rem] rounded-full bg-white text-black hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100"
            >
              <BiLinkExternal className="text-[2.2rem]" />
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
