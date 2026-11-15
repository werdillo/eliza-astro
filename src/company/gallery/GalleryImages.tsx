import { For, createSignal, onMount, Show } from "solid-js";
import { pocketbaseUrl } from "#/core/pocketbase";
import { getGallery } from "./api";

export default function GalleryImages() {
  const [items, setItems] = createSignal<string[]>([]);
  const [loading, setLoading] = createSignal(true);
  const [galleryData, setGalleryData] = createSignal<{
    collectionId?: string;
    id?: string;
  }>({});

  const getImage = (img: string) => {
    const { collectionId, id } = galleryData();
    return `${pocketbaseUrl}/api/files/${collectionId}/${id}/${img}`;
  };

  onMount(async () => {
    try {
      const galleryItem = await getGallery();

      if (galleryItem) {
        setGalleryData({
          collectionId: galleryItem.collectionId,
          id: galleryItem.id,
        });
        setItems(galleryItem.image || []);
      }
    } catch (err) {
      console.error("Error fetching gallery items:", err);
    } finally {
      setLoading(false);
    }
  });

  return (
    <div class="gallery">
      <Show when={loading()}>
        <For each={Array(12).fill(undefined)}>{() => <div class="skeleton" />}</For>
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
