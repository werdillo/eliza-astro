import { For, Show } from "solid-js";
import type { JSX } from "solid-js";
import type { ProductKind } from "#/catalog/shared/product";
import { Skeleton, type SkeletonShape } from "#/components/skeleton";

const renderSkeleton = (shape: SkeletonShape, count = 1): JSX.Element => (
  <For each={Array(count).fill(undefined)}>{() => <Skeleton shape={shape} />}</For>
);

export default function SkeletonLoader(props: { type: ProductKind }) {
  return (
    <>
      <div class="product-item">
        <Skeleton shape="slider" />
        <div class="product-right">
          {renderSkeleton("title")}
          {renderSkeleton("button")}
        </div>
      </div>
      <Show when={props.type !== "mattress"}>
        <div class="product-item">
          <div class="product-card">
            {renderSkeleton("title")}
            <div>{renderSkeleton("row", 4)}</div>
            {renderSkeleton("title")}
          </div>
          <div class="product-card">
            {renderSkeleton("title")}
            <div class="product-textile">{renderSkeleton("textile", 3)}</div>
            {renderSkeleton("title")}
          </div>
        </div>
      </Show>
    </>
  );
}
