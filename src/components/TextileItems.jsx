import { For, createSignal, onMount, Show } from "solid-js";
import { client, getImage } from "../lib/pocketbase";

export default function TextileItems({ lang }) {
  const [items, setItems] = createSignal([]);
  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    try {
      const res = await client.collection("textile").getList(1, 50);
      setItems(res.items.sort((a, b) => a.order - b.order));
    } catch (err) {
      console.error("Error fetching items:", err);
    } finally {
      setLoading(false);
    }
  });

  const renderTextileItem = (item, imageNum) => {
    const image = item[`image${imageNum}`];
    const text = item[`text${imageNum}`];

    if (!image) return null;

    return (
      <div class="-item">
        <div class="-text">{text}</div>
        <img class="-img" src={getImage(item, image)} alt={item.name} />
      </div>
    );
  };

  return (
    <>
      <Show when={loading()}>
        <For each={[1, 2]}>
          {() => (
            <>
              <div class="container">
                <div class="skeleton text title margin-40" />
              </div>
              <div class="container">
                <div class="textile">
                  <For each={[1, 2, 3, 4]}>
                    {() => <div class="skeleton textile" />}
                  </For>
                </div>
              </div>
            </>
          )}
        </For>
      </Show>

      <Show when={!loading()}>
        <For each={items()}>
          {(item) => (
            <>
              <div class="container">
                <div class="textile-title">{item[`title_${lang}`]}</div>
              </div>
              <div class="textile">
                <For each={[1, 2, 3, 4]}>
                  {(imageNum) => renderTextileItem(item, imageNum)}
                </For>
              </div>
            </>
          )}
        </For>
      </Show>
    </>
  );
}
