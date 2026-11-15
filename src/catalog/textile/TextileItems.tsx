import { For, createSignal, onMount, Show } from "solid-js";
import { fileUrl, type RecordModel } from "#/core/pocketbase";
import type { Language } from "#/features/i18n";
import { Skeleton } from "#/components/skeleton";
import { getTextileItems } from "./api";

interface Props {
  lang: Language;
}

export default function TextileItems(props: Props) {
  const [items, setItems] = createSignal<RecordModel[]>([]);
  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    try {
      const items = await getTextileItems();
      setItems(items);
    } catch (err) {
      console.error("Error fetching items:", err);
    } finally {
      setLoading(false);
    }
  });

  const renderTextileItem = (item: RecordModel, imageNum: number) => {
    const image = item[`image${imageNum}`];
    const text = item[`text${imageNum}`];

    if (!image) return null;

    return (
      <div class="textile-item">
        <div class="textile-label">{text}</div>
        <img class="textile-img" src={fileUrl(item, image)} alt={item.name} />
      </div>
    );
  };

  return (
    <>
      <Show when={loading()}>
        <For each={[1, 2]}>
          {() => (
            <>
              <div class="w-full">
                <Skeleton shape="title" />
              </div>
              <div class="w-full">
                <div class="textile-grid">
                  <For each={[1, 2, 3, 4]}>{() => <Skeleton shape="textile" />}</For>
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
              <div class="w-full">
                <div class="textile-title">{item[`title_${props.lang}`]}</div>
              </div>
              <div class="textile-grid">
                <For each={[1, 2, 3, 4]}>{(imageNum) => renderTextileItem(item, imageNum)}</For>
              </div>
            </>
          )}
        </For>
      </Show>
    </>
  );
}
