/** The loading placeholders. The shapes are the `skeleton-*` shortcuts in uno.config.ts. */
export type SkeletonShape = "block" | "slider" | "textile" | "title" | "title-wide" | "row" | "button";

const shapes: Record<SkeletonShape, string> = {
  block: "skeleton",
  slider: "skeleton-slider",
  textile: "skeleton-textile",
  title: "skeleton-title",
  "title-wide": "skeleton-title-wide",
  row: "skeleton-row",
  button: "skeleton-button",
};

export default function Skeleton(props: { shape?: SkeletonShape }) {
  return <div class={shapes[props.shape ?? "block"]} />;
}
