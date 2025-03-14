import { For, createSignal, onMount } from "solid-js";
import { register } from "swiper/element/bundle";
register();

export default function Slider() {
  const [items, setItems] = createSignal([
    {
      images: [
        "/slider/Pic1.jpg",
        "/slider/Pic2.jpg",
        "/slider/Pic3.jpg",
        "/slider/Pic4.jpg",
        "/slider/Pic5.jpg",
        "/slider/Pic6.jpg",
        "/slider/Pic7.jpg",
        "/slider/Pic8.jpg",
      ],
    },
  ]);
  return (
    <swiper-container
        slides-per-view="1"
        navigation="true"
        pagination="true"
        speed="500"
        loop="true"
        autoplay-delay="5000"
    >
    <For each={items()[0].images}>
        {(image) => (
        <swiper-slide>
            <div
            style={{
                "background-image": `url(${image})`,
                "background-size": "cover",
                "background-position": "center",
                width: "100%",
                height: "600px",
            }}
            ></div>
        </swiper-slide>
        )}
    </For>
    </swiper-container>
  );
}