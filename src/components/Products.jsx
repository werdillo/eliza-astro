import { For, Show, createSignal, onMount } from "solid-js";
import { client, getImage } from '../lib/pocketbase';

export default function Products({ type, lang }) {
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

    return <>
        <Show when={loading()}>
            <div class="product-list">
                <div class="skeleton" />
                <div class="skeleton" />
                <div class="skeleton" />
                <div class="skeleton" />
                <div class="skeleton" />
                <div class="skeleton" />
                <div class="skeleton" />
                <div class="skeleton" />
            </div>
        </Show>
        <Show when={!loading()}>
            <For each={Object.keys(groupedItems())}>
                {(brand) => <>
					<div class="container">
						<div class="title">{type.toUpperCase()}</div>
					</div>
                    <div class="product-list">
                        <For each={groupedItems()[brand]}>
                            {(item) => (
                                <a href={ "/" + lang + "/product?name=" + item.path}>
                                    <div class='product-landing'>
                                        <img src={getImage(item, item.images[0])} alt='' class='-img' />
                                        <p class='-text'>{item.name.toUpperCase()}</p>
                                    </div>
                                </a>
                            )}
                        </For>
                    </div>
                </>}
            </For>
        </Show>
    </>
}
