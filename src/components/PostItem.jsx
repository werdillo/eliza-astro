import { createResource, Suspense, For } from "solid-js";
import { client, getImageUrl } from "../lib/pocketbase";

const fetchPostItem = async (name) => {
  const res = await client.collection("blog").getList(1, 50, {
    filter: `path="${name}"`,
  });
  if (res.items.length === 0) {
    throw new Error("Post not found");
  }
  return res.items[0];
};

const SkeletonLoader = () => (
  <div class="container">
    <div class="skeleton post" />
    <div class="post">
      <div class="skeleton text title" />
      <For each={Array(7).fill()}>
        {() => <div class="skeleton text wide" />}
      </For>
    </div>
  </div>
);

export default function PostItem({ lang }) {
  const params = Object.fromEntries(
    new URLSearchParams(window.location.search).entries(),
  );

  const [item] = createResource(() => params.name, fetchPostItem);

  return (
    <Suspense fallback={<SkeletonLoader />}>
      {item() && (
        <>
          <img
            src={getImageUrl(item())}
            class="post-image"
            alt={item().name || item().title}
          />
          <div class="container">
            <div class="post">
              <div class="-title">{item().title}</div>
              <div class="-text" innerHTML={item().content} />
            </div>
          </div>
        </>
      )}
    </Suspense>
  );
}
