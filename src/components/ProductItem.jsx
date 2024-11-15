import { For, Show, createSignal, onMount } from "solid-js";
import { client, getImage } from '../lib/pocketbase';

export default function ProductItem({type='def'}) {
    const [item, setItem] = createSignal({});
    const [loading, setLoading] = createSignal(true);
	const urlSearchParams = new URLSearchParams(window.location.search);
	const params = Object.fromEntries(urlSearchParams.entries());
    onMount(async () => {
		const param = params.name;
        const collectionName = type === 'def' ? 'products' : 'mattresses'
        try {
            const res = await client.collection(collectionName).getList(1, 50, {
                filter: `path="${param}"`,
            });
            setItem(res.items[0]);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching items:', err);
        }
    });

    return (
        <div>
            <Show when={loading()}>
                <div class="skeleton"></div>
            </Show>
            <Show when={!loading()}>
                <div class='product-item'>
                    <div>
                        <img src={type==='def' ? getImage(item(), item().images[0]) : getImage(item(), item().image)} alt="" class="-slider" />
                        <p class='-text xl'>{item().name}</p>
                    </div>
                </div>
            </Show>
        </div>
    );
}
