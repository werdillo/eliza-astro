import { For, Show } from "solid-js";
import { getImage } from "../../../lib/pocketbase";
import { register } from "swiper/element/bundle";
register();

export default function ProductImageSlider({ item, type }) {
  return (
    <Show
      when={item().images?.length > 1}
      fallback={
        <img
          src={
            type === "def" || type === "sale"
              ? getImage(item(), item().images?.[0])
              : getImage(item(), item().image)
          }
          alt=""
          class="-slider"
        />
      }
    >
      <swiper-container
        slides-per-view="1"
        navigation="true"
        pagination="true"
        pagination-type="fraction"
        speed="500"
        loop="true"
        autoplay-delay="5000"
        class="product-item-swiper"
      >
        <For each={item().images}>
          {(image) => (
            <swiper-slide>
              <img
                src={getImage(item(), image)}
                alt=""
                class="-slider"
              />
            </swiper-slide>
          )}
        </For>
      </swiper-container>
    </Show>
  );
}
