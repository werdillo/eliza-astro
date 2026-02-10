import { Show, createSignal, onMount } from "solid-js";
import {
  getProductByPath,
  getMatressByPath,
  getSaleProductByPath,
} from "../../../lib/api";
import ProductImageSlider from "./ProductImageSlider";
import ProductInfo from "./ProductInfo";
import ProductDescription from "./ProductDescription";
import ProductFabrics from "./ProductFabrics";
import SkeletonLoader from "./SkeletonLoader";

export default function ProductPage({ type = "def", lang }) {
  const [item, setItem] = createSignal({});
  const [loading, setLoading] = createSignal(true);
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  onMount(async () => {
    try {
      const product =
        type === "sale"
          ? await getSaleProductByPath(params.name)
          : type === "def"
            ? await getProductByPath(params.name)
            : await getMatressByPath(params.name);
      setItem(product);
    } catch (err) {
      console.error("Error fetching items:", err);
    } finally {
      setLoading(false);
    }
  });

  return (
    <div>
      <Show when={loading()}>
        <SkeletonLoader type={type} />
      </Show>

      <Show when={!loading()}>
        <div class="product-item">
          <ProductImageSlider item={item} type={type} />
          <ProductInfo item={item} type={type} lang={lang} />
        </div>

        <div class="product-item l">
          <ProductDescription item={item} lang={lang} />
          <ProductFabrics item={item} type={type} lang={lang} />
        </div>
      </Show>
    </div>
  );
}
