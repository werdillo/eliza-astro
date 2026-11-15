import { For, Show } from "solid-js";
import type { JSX } from "solid-js";
import type { ProductKind } from "#/catalog/shared/product";

const renderSkeleton = (className: string, count = 1): JSX.Element => (
  <For each={Array(count).fill(undefined)}>
    {() => <div class={`skeleton ${className}`} />}
  </For>
);

export default function SkeletonLoader(props: { type: ProductKind }) {
  return (
    <>
      <div class="product-item">
        <div class="skeleton slider" />
        <div class="-right">
          {renderSkeleton("text title")}
          {renderSkeleton("button")}
        </div>
      </div>
      <Show when={props.type !== "mattress"}>
        <div class="product-item l">
          <div class="-card">
            {renderSkeleton("text title")}
            <div>{renderSkeleton("text l", 4)}</div>
            {renderSkeleton("text title")}
          </div>
          <div class="-card">
            {renderSkeleton("text title")}
            <div class="-textile">{renderSkeleton("textile", 3)}</div>
            {renderSkeleton("text title")}
          </div>
        </div>
      </Show>
    </>
  );
}
