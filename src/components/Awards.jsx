import { For } from "solid-js";
import { register } from "swiper/element/bundle";
register();

export default function Awards() {
  const awards = Array.from(
    { length: 12 },
    (_, index) => `award_${index + 1}.jpg`,
  );

  const breakpoints = {
    1400: { slidesPerView: 8, navigation: true },
    1200: { slidesPerView: 6, navigation: true },
    768: { slidesPerView: 4 },
    500: { slidesPerView: 3 },
    300: { slidesPerView: 3 },
  };

  return (
    <div class="awards">
      <swiper-container
        breakpoints={breakpoints}
        pagination="false"
        speed="500"
        loop="true"
        autoplay-delay="3000"
      >
        <For each={awards}>
          {(image) => (
            <swiper-slide>
              <div class="-wrapper">
                <img
                  src={`/awards/${image}`}
                  alt="Award certificate"
                  class="-img"
                  loading="lazy"
                />
              </div>
            </swiper-slide>
          )}
        </For>
      </swiper-container>
    </div>
  );
}
