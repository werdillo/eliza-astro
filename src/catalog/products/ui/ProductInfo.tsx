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
    <div class="-right">
      <div class="-title">{props.item().name}</div>

      <Show
        when={
          props.type === "sale" &&
          (props.item().price || props.item().oldPrice)
        }
      >
        <div
          class="price-container"
          style={{
            "justify-content": "flex-start",
          }}
        >
          <Show when={props.item().price}>
            <span class="price">€{props.item().price}</span>
          </Show>
          <Show when={props.item().oldPrice}>
            <span class="old-price" style={{ "font-size": "24px" }}>
              €{props.item().oldPrice}
            </span>
          </Show>
        </div>
      </Show>

      <Show
        when={props.type === "mattress" && props.item()[`file_${props.lang}`]}
      >
        <div style={{ display: "flex", gap: "12px" }}>
          <a
            href={fileUrl(
              props.item() as Product,
              props.item()[`file_${props.lang}`],
            )}
            target="_blank"
          >
            <button class="-button">{t().dimensions}</button>
          </a>
          <a
            href={`/files/cleaning-mattresses-${props.lang}.pdf`}
            target="_blank"
          >
            <button class="-button">{t().cleaning}</button>
          </a>
        </div>
      </Show>

      <a class="-text link" href="mailto:teika@eliza-k.lv">
        <button class="-button xl">{t().sendEmail}</button>
      </a>
    </div>
  );
}
