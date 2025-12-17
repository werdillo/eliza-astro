import { For, Show, createSignal, onMount } from "solid-js";
import { getImage } from "../lib/pocketbase";
import { getProducts, getSalePage } from "../lib/api";

export default function SaleCollection({ brand, lang }) {
  const [groupedItems, setGroupedItems] = createSignal({});
  const [loading, setLoading] = createSignal(true);

  const translate = {
    en: { sofa: "Sofas", bed: "Beds" },
    ru: { sofa: "Диваны", bed: "Кровати" },
    lv: { sofa: "Dīvāni", bed: "Gultas" },
  };

  onMount(async () => {
    try {
      const items = await getSalePage();

      // Filter out hidden items
      const visibleItems = items.filter((item) => !item.hide);

      // Group by type and sort by index
      const grouped = visibleItems.reduce((acc, item) => {
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
      <div class="container">
        <div class="skeleton text title"></div>
      </div>
      <div class="product-list">
        {Array(8)
          .fill()
          .map(() => (
            <div class="skeleton" />
          ))}
      </div>
    </>
  );

  return (
    <Show when={!loading()} fallback={<SkeletonLoader />}>
      <For each={Object.entries(groupedItems())}>
        {([type, items]) => (
          <>
            <div class="container">
              <div class="title">{translate[lang][type.toLowerCase()]}</div>
            </div>
            <div class="product-list">
              <For each={items}>
                {(item) => (
                  <a href={`/${lang}/sale-product?name=${item.path}`}>
                    <div class="product-landing">
                      <img
                        src={getImage(item, item.images[0])}
                        alt=""
                        class="-img"
                      />
                      <Show
                        when={item.price}
                        fallback={
                          <p class="-text">{item.name.toUpperCase()}</p>
                        }
                      >
                        <div
                          style={{
                            display: "flex",
                            "justify-content": "space-between",
                            "align-items": "center",
                            "margin-top": "5px",
                            gap: "10px",
                            padding: "2px",
                          }}
                        >
                          <p
                            class="-text"
                            style={{ margin: "0", "text-align": "left" }}
                          >
                            {item.name.toUpperCase()}
                          </p>
                          <div
                            class="price-container"
                            style={{ margin: "0", "flex-shrink": "0" }}
                          >
                            <Show when={item.oldPrice}>
                              <span class="old-price">€{item.oldPrice}</span>
                            </Show>
                            <span class="price">€{item.price}</span>
                          </div>
                        </div>
                      </Show>
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
