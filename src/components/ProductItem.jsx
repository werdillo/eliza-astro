import { For, Show, createSignal, onMount } from "solid-js";
import { client, getImage } from "../lib/pocketbase";
import { register } from 'swiper/element/bundle';
register();

export default function ProductItem({ type = "def" }) {
  const [item, setItem] = createSignal({});
  const [loading, setLoading] = createSignal(true);
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  onMount(async () => {
    const param = params.name;
    const collectionName = type === "def" ? "products" : "mattresses";

    try {
      const res = await client.collection(collectionName).getList(1, 50, {
        filter: `path="${param}"`,
      });
      setItem(res.items[0]);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  });

  return (
    <div>
      <Show when={loading()}>
        <div class="skeleton"></div>
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
                        <img src={getImage(item(), image)} alt="" class="-slider"/>
                    </swiper-slide>
                    )}
                </For>
              </swiper-container>
            </Show>
            </div>
                <div className="-right">
                <div class="-title">{item().name}</div>
                {/* <div className="-text">
                <b>Gulēšanas funkcija</b> - nav <br/>
                <b>Veļas kaste</b> - nav <br/>
                <b>Korpuss -</b> Dabīgskoks,  <br/>
                <b>Sēde/sēdes pilveni</b> - Porolons,  <br/>
                <b>Muguras spilveni -  </b>Sintepona vate + spalvas <br/>
                </div> */}
                  {/* <div class="-text" innerHTML={item().description}></div> */}

                <button class="-button xl">Send email</button>

            </div>
        </div>
        <div class="product-item l">
              <div className="-card">
                <div className="-text m bd">
                    Apraksts
                  </div> 
                
                  <div class="-text" innerHTML={item().description}></div>
                  <div>
                    <button class="-button">Dimensions</button>
                  </div>


            </div>
            <Show when={type !== "mattress"}>
              <div className="-card">
                  <div className="-text m bd">
                      Audumi
                  </div>
                  <div className="-textile">
                      <img src="https://eliza.pockethost.io/api/files/6mym3bbn87vzkzf/1n3lu4328dwqq97/matrix_28Pq5LpZ1J.jpeg?token=" alt="" className="-img" />
                      <img src="https://eliza.pockethost.io/api/files/6mym3bbn87vzkzf/vesgkd1c8ioj1u9/fusion_AL1Ad4TRpU.jpeg?token=" alt="" className="-img" />
                      <img src="https://eliza.pockethost.io/api/files/6mym3bbn87vzkzf/1n3lu4328dwqq97/trend_k3OnIQJG30.jpeg?token=" alt="" className="-img" />

                  </div>
                  <div>
                    <button class="-button">Cleaning</button>
                  </div>
              </div>
            </Show>
        </div>
      </Show>
    </div>
  );
}