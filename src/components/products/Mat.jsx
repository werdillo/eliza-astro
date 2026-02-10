import { For, createSignal, onMount, Show } from "solid-js";
import { getImage } from "../../lib/pocketbase";
import { getMatresses } from "../../lib/api";

export default function Mat({ lang }) {
  const getImageByLang = (item) => {
    // Try to get language-specific image first
    const langImage = item[`image_${lang}`];
    if (langImage) {
      return getImage(item, langImage);
    }
    // Fallback to default image
    return item.image ? getImage(item, item.image) : "";
  };
  const [items, setItems] = createSignal([]);
  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    try {
      const items = await getMatresses();
      // const sortedItems = items.sort((a, b) =>
      //   a.type.localeCompare(b.type),
      // );
      setItems(items);
    } catch (err) {
      console.error("Error fetching items:", err);
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
      <Show when={loading()}>
        <div class="product-list">
          <For each={Array(8).fill()}>{() => <div class="skeleton" />}</For>
        </div>
      </Show>

      <Show when={!loading()}>
        <div class="product-list">
          <For each={items()}>
            {(item) => (
              <a href={`/${lang}/mattress?name=${item.path}`}>
                <div class="product-landing">
                  <img
                    src={getImageByLang(item)}
                    alt={item.name}
                    class="-img"
                  />
                  <p class="-text">{item.name.toUpperCase()}</p>
                </div>
              </a>
            )}
          </For>
        </div>
      </Show>
    </>
  );
}
