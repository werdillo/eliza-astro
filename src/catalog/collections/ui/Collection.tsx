import { For, Show, createSignal, onMount } from "solid-js";
import { fileUrl } from "#/core/pocketbase";
import type { Language } from "#/features/i18n";
import type { Product } from "#/catalog/shared/product";
import { typeLabels } from "#/catalog/shared/typeLabels";
import { getProducts } from "../api";

interface Props {
  brand: string;
  lang: Language;
}

export default function Collections(props: Props) {
  const [groupedItems, setGroupedItems] = createSignal<Record<string, Product[]>>({});
  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    try {
      const items = await getProducts(props.brand);

      const grouped = items.reduce<Record<string, Product[]>>((acc, item) => {
        (acc[item.type] ||= []).push(item);
        return acc;
      }, {});
      setGroupedItems(grouped);
    } catch (err) {
      console.error("Error fetching items:", err);
    } finally {
      setLoading(false);
    }
  });

  const SkeletonLoader = () => (
    <>
      <div class="container">
        <div class="skeleton text title" />
      </div>
      <div class="product-list">
        <For each={Array(8).fill(undefined)}>
          {() => <div class="skeleton" />}
        </For>
      </div>
    </>
  );

  return (
    <Show when={!loading()} fallback={<SkeletonLoader />}>
      <For each={Object.entries(groupedItems())}>
        {([type, items]) => (
          <>
            <div class="container">
              <div class="title">
                {typeLabels[props.lang][type.toLowerCase()]}
              </div>
            </div>
            <div class="product-list">
              <For each={items}>
                {(item) => (
                  <a href={`/${props.lang}/product?name=${item.path}`}>
                    <div class="product-landing">
                      <img
                        src={fileUrl(item, item.images[0])}
                        alt=""
                        class="-img"
                      />
                      <p class="-text">{item.name.toUpperCase()}</p>
                    </div>
                  </a>
                )}
              </For>
            </div>
          </>
        )}
      </For>
    </Show>
  );
}
