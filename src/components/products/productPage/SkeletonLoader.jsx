import { For, Show } from "solid-js";

const renderSkeleton = (className, count = 1) => (
  <For each={Array(count).fill()}>
    {() => <div class={`skeleton ${className}`} />}
  </For>
);

export default function SkeletonLoader({ type }) {
  return (
    <>
      <div class="product-item">
        <div class="skeleton slider" />
        <div className="-right">
          {renderSkeleton("text title")}
          {renderSkeleton("button")}
        </div>
      </div>
      <Show when={type !== "mattress"}>
        <div class="product-item l">
          <div class="-card">
            {renderSkeleton("text title")}
            <div>{renderSkeleton("text l", 4)}</div>
            {renderSkeleton("text title")}
          </div>
          <div class="-card">
            {renderSkeleton("text title")}
            <div className="-textile">{renderSkeleton("textile", 3)}</div>
            {renderSkeleton("text title")}
          </div>
        </div>
      </Show>
    </>
  );
}
