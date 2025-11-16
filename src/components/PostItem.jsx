import { createResource, Suspense, For } from "solid-js";
import { getImageUrl } from "../lib/pocketbase";
import { getBlogPostByPath } from "../lib/api";

const fetchPostItem = async (name) => {
  return await getBlogPostByPath(name);
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
