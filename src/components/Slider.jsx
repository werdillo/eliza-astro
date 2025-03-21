import { For, createSignal, onMount } from "solid-js";
import { register } from "swiper/element/bundle";
register();

export default function Slider() {
  const [items, setItems] = createSignal([
    {
      images: [
        "/slider/Pic6.jpg",
        "/slider/Pic1.jpg",
        "/slider/Pic7.jpg",
        "/slider/Pic3.jpg",
      ],
    },
  ]);
  return (
    <swiper-container
        slides-per-view="1"
        navigation="true"
        pagination="false"
        speed="500"
        loop="true"
        autoplay-delay="10000"
    >
    <For each={items()[0].images}>
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
            ></div>
        </swiper-slide>
        )}
    </For>
    </swiper-container>
  );
}