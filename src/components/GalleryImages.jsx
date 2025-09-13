import { For, createSignal, onMount, Show } from "solid-js";
import { client } from "../lib/pocketbase";

export default function GalleryImages() {
  const [items, setItems] = createSignal([]);
  const [loading, setLoading] = createSignal(true);
  const [galleryData, setGalleryData] = createSignal({});

  const getImage = (img) => {
    const { collectionId, id } = galleryData();
    return `https://eliza.pockethost.io/api/files/${collectionId}/${id}/${img}`;
  };

  onMount(async () => {
    try {
      const res = await client.collection("gallery").getList(1, 50);
      const firstItem = res.items[0];

      setGalleryData({
        collectionId: firstItem.collectionId,
        id: firstItem.id,
      });
      setItems(firstItem.image || []);
    } catch (err) {
      console.error("Error fetching gallery items:", err);
    } finally {
      setLoading(false);
    }
  });

  const SkeletonLoader = () => (
    <For each={Array(12).fill()}>{() => <div class="skeleton" />}</For>
  );

  return (
    <div class="gallery">
      <Show when={loading()}>
        <SkeletonLoader />
      </Show>

      <Show when={!loading()}>
        <For each={items()}>
          {(item) => (
            <img
              class="-img"
              src={getImage(item)}
              alt="Gallery image"
              loading="lazy"
            />
          )}
        </For>
      </Show>
    </div>
  );
}
