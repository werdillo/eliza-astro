import { For, Show } from "solid-js";
import type { Accessor } from "solid-js";
import { fileUrl } from "#/core/pocketbase";
import type { Product, ProductKind } from "#/catalog/shared/product";
import { register } from "swiper/element/bundle";
register();

interface Props {
  item: Accessor<Partial<Product>>;
  type: ProductKind;
}

export default function ProductImageSlider(props: Props) {
  return (
    <Show
      when={(props.item().images?.length ?? 0) > 1}
      fallback={
        <img
          src={
            props.type === "def" || props.type === "sale"
              ? fileUrl(props.item() as Product, props.item().images?.[0])
              : fileUrl(props.item() as Product, props.item().image)
          }
          alt=""
          class="product-slider"
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
        class="product-swiper"
      >
        <For each={props.item().images}>
          {(image) => (
            <swiper-slide>
              <img src={fileUrl(props.item() as Product, image)} alt="" class="product-slider" />
            </swiper-slide>
          )}
        </For>
      </swiper-container>
    </Show>
  );
}
