import { For } from "solid-js";
import { register } from "swiper/element/bundle";
register();

export default function Slider() {
  const images = [
    "/slider/Pic6.jpg",
    "/slider/Pic1.jpg",
    "/slider/Pic7.jpg",
    "/slider/Pic3.jpg",
  ];

  return (
    <swiper-container
      slides-per-view="1"
      navigation="true"
      pagination="false"
      speed="500"
      loop="true"
      autoplay-delay="10000"
    >
      <For each={images}>
        {(image) => (
          <swiper-slide>
            <div
              class="home-slider"
              style={{
                "background-image": `url(${image})`,
                "background-size": "cover",
                "background-position": "center",
                width: "100%",
              }}
            />
          </swiper-slide>
        )}
      </For>
    </swiper-container>
  );
}
