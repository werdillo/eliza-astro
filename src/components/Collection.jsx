import { For, createSignal, onMount } from "solid-js";
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
      const res = await client.collection("products").getList(1, 50, {
        filter: `collection="${brand}"`,
        fields:
          "id, collectionId, collection, path, images, type, name:excerpt(200, true)",
      });

      const grouped = res.items.reduce((acc, item) => {
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

  if (loading()) {
    return (
      <div>
        <div class="container">
          <div class="skeleton text title" />
        </div>
        <div class="product-list">
          {Array(8)
            .fill(0)
            .map(() => (
              <div class="skeleton" />
            ))}
        </div>
      </div>
    );
  }

  return (
    <For each={Object.entries(groupedItems())}>
      {([type, items]) => (
        <div>
          <div class="container">
            <div class="title">
              {translate[lang]?.[type.toLowerCase()] || type}
            </div>
          </div>
          <div class="product-list">
            <For each={items}>
              {(item) => (
                <a href={`/${lang}/product?name=${item.path}`}>
                  <div class="product-landing">
                    <img
                      src={getImage(item, item.images?.[0])}
                      alt={item.name}
                      class="-img"
                      loading="lazy"
                    />
                    <p class="-text">{item.name.toUpperCase()}</p>
                  </div>
                </a>
              )}
            </For>
          </div>
        </div>
      )}
    </For>
  );
}
