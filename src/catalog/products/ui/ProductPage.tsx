import { Show, createSignal, onMount } from "solid-js";
import type { Language } from "#/features/i18n";
import type { Product, ProductKind } from "#/catalog/shared/product";
import {
  getMatressByPath,
  getProductByPath,
  getSaleProductByPath,
} from "../api";
import ProductImageSlider from "./ProductImageSlider";
import ProductInfo from "./ProductInfo";
import ProductDescription from "./ProductDescription";
import ProductFabrics from "./ProductFabrics";
import SkeletonLoader from "./SkeletonLoader";

interface Props {
  type?: ProductKind;
  lang: Language;
}

export default function ProductPage(props: Props) {
  const kind = (): ProductKind => props.type ?? "def";
  const [item, setItem] = createSignal<Partial<Product>>({});
  const [loading, setLoading] = createSignal(true);
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  onMount(async () => {
    try {
      const type = kind();
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
        <SkeletonLoader type={kind()} />
      </Show>

      <Show when={!loading()}>
        <div class="product-item">
          <ProductImageSlider item={item} type={kind()} />
          <ProductInfo item={item} type={kind()} lang={props.lang} />
        </div>

        <div class="product-item l">
          <ProductDescription item={item} lang={props.lang} />
          <ProductFabrics item={item} type={kind()} lang={props.lang} />
        </div>
      </Show>
    </div>
  );
}
