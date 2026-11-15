import { Show, type Accessor } from "solid-js";
import { fileUrl } from "#/core/pocketbase";
import type { Language } from "#/features/i18n";
import type { Product, ProductKind } from "#/catalog/shared/product";
import { translations } from "../data";

interface Props {
  item: Accessor<Partial<Product>>;
  type: ProductKind;
  lang: Language;
}

export default function ProductInfo(props: Props) {
  const t = () => translations[props.lang];

  return (
    <div class="product-right">
      <div class="product-title">{props.item().name}</div>

      <Show when={props.type === "sale" && (props.item().price || props.item().oldPrice)}>
        <div class="product-price-row">
          <Show when={props.item().price}>
            <span class="product-price">€{props.item().price}</span>
          </Show>
          <Show when={props.item().oldPrice}>
            <span class="product-old-price">€{props.item().oldPrice}</span>
          </Show>
        </div>
      </Show>

      <Show when={props.type === "mattress" && props.item()[`file_${props.lang}`]}>
        <div class="flex gap-[var(--space-12)]">
          <a href={fileUrl(props.item() as Product, props.item()[`file_${props.lang}`])} target="_blank">
            <button class="product-button">{t().dimensions}</button>
          </a>
          <a href={`/files/cleaning-mattresses-${props.lang}.pdf`} target="_blank">
            <button class="product-button">{t().cleaning}</button>
          </a>
        </div>
      </Show>

      <a class="product-text" href="mailto:teika@eliza-k.lv">
        <button class="product-button-xl">{t().sendEmail}</button>
      </a>
    </div>
  );
}
