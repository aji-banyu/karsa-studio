import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function PortfolioGallery({ images, title }) {
  return (
    <Swiper
      modules={[Pagination, Navigation, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      // Aspect ratio diatur agar pas, dan warnanya menyatu dengan tema
      className="w-full aspect-video md:aspect-[16/9] bg-[var(--text-main)]/[0.02]"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <img
            src={img}
            alt={`${title} screenshot ${index + 1}`}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
