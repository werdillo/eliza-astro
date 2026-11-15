import { For, Show, createSignal, onMount } from "solid-js";
import { fileUrl } from "#/core/pocketbase";
import type { Language } from "#/features/i18n";
import type { Product } from "#/catalog/shared/product";
import { typeLabels } from "#/catalog/shared/typeLabels";
import { Skeleton } from "#/components/skeleton";
import { LandingTile } from "#/components/landing-tile";
import { getSalePage } from "./api";

interface Props {
  lang: Language;
}

export default function SaleCollection(props: Props) {
  const [groupedItems, setGroupedItems] = createSignal<Record<string, Product[]>>({});
  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    try {
      const items = await getSalePage();

      // Filter out hidden items
      const visibleItems = items.filter((item) => !item.hide);

      // Group by type and sort by index
      const grouped = visibleItems.reduce<Record<string, Product[]>>((acc, item) => {
        (acc[item.type] ||= []).push(item);
        return acc;
      }, {});

      // Sort each group by index
      Object.keys(grouped).forEach((type) => {
        grouped[type].sort((a, b) => (a.index || 0) - (b.index || 0));
      });

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
                  <LandingTile href={`/${props.lang}/sale-product?name=${item.path}`} src={fileUrl(item, item.images[0])} alt="">
                    <Show when={item.price} fallback={<p class="landing-name">{item.name.toUpperCase()}</p>}>
                      <div class="flex justify-between items-center mt-[4px] gap-[12px] p-[2px]">
                        <p class="sale-name">{item.name.toUpperCase()}</p>
                        <div class="landing-price-row m-0 shrink-0">
                          <Show when={item.oldPrice}>
                            <span class="landing-old-price">€{item.oldPrice}</span>
                          </Show>
                          <span class="landing-price">€{item.price}</span>
                        </div>
                      </div>
                    </Show>
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
