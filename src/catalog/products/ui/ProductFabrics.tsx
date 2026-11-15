import { For, Show, type Accessor } from "solid-js";
import type { Language } from "#/features/i18n";
import type { Product, ProductKind } from "#/catalog/shared/product";
import { translations } from "../data";

const fabricImages = [
  "/textile/matrix.jpeg",
  "/textile/falcone.jpeg",
  "/textile/salvador.jpeg",
];

interface Props {
  item: Accessor<Partial<Product>>;
  type: ProductKind;
  lang: Language;
}

export default function ProductFabrics(props: Props) {
  const t = () => translations[props.lang];

  return (
    <Show
      when={
        props.type !== "mattress" &&
        props.item()?.[`description_${props.lang}`]
      }
    >
      <div class="-card">
        <div class="-text m bd">{t().fabrics}</div>
        <div class="-textile">
          <For each={fabricImages}>
            {(src) => <img src={src} alt="" class="-img" />}
          </For>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <a href="/files/cleaning.pdf" target="_blank">
            <button class="-button">{t().cleaning}</button>
          </a>
        </div>
      </div>
    </Show>
  );
}
