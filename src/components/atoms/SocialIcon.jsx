export default function SocialIcon({ icon: Icon, href = "#" }) {
  return (
    <a
      href={href}
      target="blank"
      className="inline-flex justify-center items-center w-[4rem] h-[4rem] bg-transparent border-[0.2rem] border-[var(--color-primary)] rounded-full text-[2rem] text-[var(--color-primary)] transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-white hover:shadow-[0_0_1.5rem_var(--color-primary)] hover:scale-110"
    >
      <Icon />
    </a>
  );
}
