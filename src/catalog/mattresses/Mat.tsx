import { For, Show, createSignal, onMount } from "solid-js";
import { fileUrl } from "#/core/pocketbase";
import type { Language } from "#/features/i18n";
import type { Product } from "#/catalog/shared/product";
import { Skeleton } from "#/components/skeleton";
import { LandingTile } from "#/components/landing-tile";
import { getMatresses } from "./api";

interface Props {
  lang: Language;
}

export default function Mat(props: Props) {
  const getImageByLang = (item: Product) => {
    // Try to get language-specific image first
    const langImage = item[`image_${props.lang}`];
    if (langImage) {
      return fileUrl(item, langImage);
    }
    // Fallback to default image
    return item.image ? fileUrl(item, item.image) : "";
  };
  const [items, setItems] = createSignal<Product[]>([]);
  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    try {
      const items = await getMatresses();
      setItems(items);
    } catch (err) {
      console.error("Error fetching items:", err);
    } finally {
      setLoading(false);
    }
  });

  return (
    <Show
      when={!loading()}
      fallback={
        <div class="product-list">
          <For each={Array(8).fill(undefined)}>{() => <Skeleton />}</For>
        </div>
      }
    >
      <div class="product-list">
        <For each={items()}>
          {(item) => (
            <LandingTile href={`/${props.lang}/mattress?name=${item.path}`} src={getImageByLang(item)} alt={item.name}>
              <p class="landing-name">{item.name.toUpperCase()}</p>
            </LandingTile>
          )}
        </For>
      </div>
    </Show>
  );
}
