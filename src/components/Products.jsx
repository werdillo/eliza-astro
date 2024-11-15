import { For, Show, createSignal, onMount } from "solid-js";
import { client, getImage } from '../lib/pocketbase';

export default function Products({ type }) {
    const [groupedItems, setGroupedItems] = createSignal({});
    const [loading, setLoading] = createSignal(true);

    onMount(async () => {
        try {
            const res = await client.collection('products').getList(1, 50, {
                filter: `type="${type}"`,
            });
            const grouped = res.items.reduce((acc, item) => {
                if (!acc[item.collection]) acc[item.collection] = [];
                acc[item.collection].push(item);
                return acc;
            }, {});

            setGroupedItems(grouped);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching items:', err);
        }
    });

    return (
        <div>
            <Show when={loading()}>
                <div class="skeleton"></div>
                <div class="skeleton"></div>
                <div class="skeleton"></div>
                <div class="skeleton"></div>
                <div class="skeleton"></div>
                <div class="skeleton"></div>
            </Show>
            <Show when={!loading()}>
                <For each={Object.keys(groupedItems())}>
                    {(brand) => (
                        <div>
                            <h2>{brand.toUpperCase()}</h2>
                            <div class="textile">
                                <For each={groupedItems()[brand]}>
                                    {(item) => (
                                        <a href={"/collection?name=" + item.path}>
                                            <div class='product-landing'>
                                                <img src={getImage(item, item.images[0])} alt='' class='-img' />
                                                <p class='-text'>{item.name.toUpperCase()}</p>
                                            </div>
                                        </a>
                                    )}
                                </For>
                            </div>
                        </div>
                    )}
                </For>
            </Show>
        </div>
    );
}
