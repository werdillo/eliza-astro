import { For, Show, type Accessor } from "solid-js";
import type { Language } from "#/features/i18n";
import type { Product, ProductKind } from "#/catalog/shared/product";
import { translations } from "../data";

const fabricImages = ["/textile/matrix.jpeg", "/textile/falcone.jpeg", "/textile/salvador.jpeg"];

interface Props {
  item: Accessor<Partial<Product>>;
  type: ProductKind;
  lang: Language;
}

export default function ProductFabrics(props: Props) {
  const t = () => translations[props.lang];

  return (
    <Show when={props.type !== "mattress" && props.item()?.[`description_${props.lang}`]}>
      <div class="product-card">
        <div class="product-heading">{t().fabrics}</div>
        <div class="product-textile">
          <For each={fabricImages}>{(src) => <img src={src} alt="" class="w-full h-auto" />}</For>
        </div>
        <div class="flex gap-[var(--space-12)]">
          <a href="/files/cleaning.pdf" target="_blank">
            <button class="product-button">{t().cleaning}</button>
          </a>
        </div>
      </div>
    </Show>
  );
}
