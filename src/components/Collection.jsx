import { For, Show, createSignal, onMount } from "solid-js";
import { client, getImage } from "../lib/pocketbase";

export default function Collections({ brand, lang }) {
  const [groupedItems, setGroupedItems] = createSignal({});
  const [loading, setLoading] = createSignal(true);

  const translate = {
    en: { sofa: "Sofas", bed: "Beds" },
    ru: { sofa: "Диваны", bed: "Кровати" },
    lv: { sofa: "Dīvāni", bed: "Gultas" },
  };

  onMount(async () => {
    try {
      const res = await client.collection("products_eliza").getList(1, 50, {
        filter: `collection="${brand}"`,
        fields:
          "id, collectionId, collection, path, images, type, name:excerpt(200, true)",
      });

      const grouped = res.items.reduce((acc, item) => {
        (acc[item.type] ||= []).push(item);
        return acc;
      }, {});
      console.log(grouped);
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
                  <a href={`/${lang}/product?name=${item.path}`}>
                    <div class="product-landing">
                      <img
                        src={getImage(item, item.images[0])}
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
