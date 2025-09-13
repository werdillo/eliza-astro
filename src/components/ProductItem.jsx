import { For, Show, createSignal, onMount } from "solid-js";
import { client, getImage, getShema, getMatressFile } from "../lib/pocketbase";
import { register } from "swiper/element/bundle";
register();

export default function ProductItem({ type = "def", lang }) {
  const [item, setItem] = createSignal({});
  const [loading, setLoading] = createSignal(true);
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const translate = {
    en: {
      sendEmail: "Send email",
      dimensions: "Dimensions",
      cleaning: "Cleaning",
      description: "Description",
      fabrics: "Fabrics",
    },
    ru: {
      sendEmail: "Отправить email",
      dimensions: "Размеры",
      cleaning: "Уход",
      description: "Описание",
      fabrics: "Ткани",
    },
    lv: {
      sendEmail: "Sūtīt e-pastu",
      dimensions: "Izmēri",
      cleaning: "Tīrīšana",
      description: "Apraksts",
      fabrics: "Audumi",
    },
  };

  onMount(async () => {
    try {
      const collectionName = type === "def" ? "products" : "mattresses";
      const res = await client.collection(collectionName).getList(1, 50, {
        filter: `path="${params.name}"`,
      });
      setItem(res.items[0]);
    } catch (err) {
      console.error("Error fetching items:", err);
    } finally {
      setLoading(false);
    }
  });

  const fabricImages = [
    "/textile/matrix.jpeg",
    "/textile/falcone.jpeg",
    "/textile/salvador.jpeg",
  ];

  const renderSkeleton = (className, count = 1) => (
    <For each={Array(count).fill()}>
      {() => <div class={`skeleton ${className}`} />}
    </For>
  );

  const SkeletonLoader = () => (
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

  return (
    <div>
      <Show when={loading()}>
        <SkeletonLoader />
      </Show>

      <Show when={!loading()}>
        <div class="product-item">
          <div>
            <Show
              when={item().images?.length > 1}
              fallback={
                <img
                  src={
                    type === "def"
                      ? getImage(item(), item().images?.[0])
                      : getImage(item(), item().image)
                  }
                  alt=""
                  class="-slider"
                />
              }
            >
              <swiper-container
                slides-per-view="1"
                navigation="true"
                pagination="true"
                pagination-type="fraction"
                speed="500"
                loop="true"
                autoplay-delay="5000"
                class="product-item-swiper"
              >
                <For each={item().images}>
                  {(image) => (
                    <swiper-slide>
                      <img
                        src={getImage(item(), image)}
                        alt=""
                        class="-slider"
                      />
                    </swiper-slide>
                  )}
                </For>
              </swiper-container>
            </Show>
          </div>
          <div className="-right">
            <div class="-title">{item().name}</div>
            <Show when={type === "mattress" && item()?.[`file_${lang}`]}>
              <div style={{ display: "flex", gap: "12px" }}>
                <a href={getMatressFile(item(), lang)} target="_blank">
                  <button class="-button">{translate[lang].dimensions}</button>
                </a>
                <a
                  href={`/files/cleaning-mattresses-${lang}.pdf`}
                  target="_blank"
                >
                  <button class="-button">{translate[lang].cleaning}</button>
                </a>
              </div>
            </Show>
            <a class="-text link" href="mailto:teika@eliza-k.lv">
              <button class="-button xl">{translate[lang].sendEmail}</button>
            </a>
          </div>
        </div>

        <div class="product-item l">
          <Show when={item()?.[`description_${lang}`]}>
            <div className="-card">
              <div className="-text m bd">{translate[lang].description}</div>
              <div
                class="-text"
                innerHTML={item()[`description_${lang}`]}
              ></div>
              <a href={getShema(item())} target="_blank">
                <button class="-button">{translate[lang].dimensions}</button>
              </a>
            </div>
          </Show>

          <Show when={type !== "mattress" && item()?.[`description_${lang}`]}>
            <div className="-card">
              <div className="-text m bd">{translate[lang].fabrics}</div>
              <div className="-textile">
                <For each={fabricImages}>
                  {(src) => <img src={src} alt="" className="-img" />}
                </For>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <a href="/files/cleaning.pdf" target="_blank">
                  <button class="-button">{translate[lang].cleaning}</button>
                </a>
              </div>
            </div>
          </Show>
        </div>
      </Show>
    </div>
  );
}
