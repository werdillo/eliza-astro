import { For, Show, createSignal, onMount } from "solid-js";
import { fileUrl } from "#/core/pocketbase";
import type { Language } from "#/features/i18n";
import type { Product } from "#/catalog/shared/product";
import { typeLabels } from "#/catalog/shared/typeLabels";
import { Skeleton } from "#/components/skeleton";
import { LandingTile } from "#/components/landing-tile";
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
      <div class="w-full">
        <Skeleton shape="title" />
      </div>
      <div class="product-list">
        <For each={Array(8).fill(undefined)}>{() => <Skeleton />}</For>
      </div>
    </>
  );

  return (
    <Show when={!loading()} fallback={<SkeletonLoader />}>
      <For each={Object.entries(groupedItems())}>
        {([type, items]) => (
          <>
            <div class="w-full">
              <div class="list-title">{typeLabels[props.lang][type.toLowerCase()]}</div>
            </div>
            <div class="product-list">
              <For each={items}>
                {(item) => (
                  <LandingTile href={`/${props.lang}/product?name=${item.path}`} src={fileUrl(item, item.images[0])} alt="">
                    <p class="landing-name">{item.name.toUpperCase()}</p>
                  </LandingTile>
                )}
              </For>
            </div>
          </>
        )}
      </For>
    </Show>
  );
}
