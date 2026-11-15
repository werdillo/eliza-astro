import { Show, type Accessor } from "solid-js";
import { fileUrl } from "#/core/pocketbase";
import type { Language } from "#/features/i18n";
import type { Product } from "#/catalog/shared/product";
import { translations } from "../data";

interface Props {
  item: Accessor<Partial<Product>>;
  lang: Language;
}

export default function ProductDescription(props: Props) {
  const t = () => translations[props.lang];

  return (
    <Show when={props.item()?.[`description_${props.lang}`]}>
      <div class="-card">
        <div class="-text m bd">{t().description}</div>
        <div
          class="-text"
          // Descriptions are HTML written in the CMS by the site owner.
          // oxlint-disable-next-line solid/no-innerhtml
          innerHTML={props.item()[`description_${props.lang}`]}
        />
        <Show when={props.item().schema}>
          <a
            href={fileUrl(props.item() as Product, props.item().schema)}
            target="_blank"
          >
            <button class="-button">{t().dimensions}</button>
          </a>
        </Show>
      </div>
    </Show>
  );
}
