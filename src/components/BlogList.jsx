import { For, createSignal, onMount } from "solid-js";
import { getImageUrl } from "../lib/pocketbase";
import { getBlogPosts } from "../lib/api";

export default function BlogList({ lang, type }) {
  const [items, setItems] = createSignal([]);

  onMount(async () => {
    try {
      const posts = await getBlogPosts(type);
      setItems(posts);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  });
  return (
    <>
      <div class="blog">
        <For
          each={items()}
          fallback={
            <>
              <div class="skeleton blog"></div>
              <div class="skeleton blog"></div>
              <div class="skeleton blog"></div>
              <div class="skeleton blog"></div>
              <div class="skeleton blog"></div>
              <div class="skeleton blog"></div>
            </>
          }
        >
          {(item) => (
            <a href={"/" + lang + "/post?name=" + item.path}>
              <img src={getImageUrl(item)} class="-img" alt={item.title} />
              <div class="-title">{item.title}</div>
              <div class="-description">{item.description}</div>
            </a>
          )}
        </For>
      </div>
    </>
  );
}
