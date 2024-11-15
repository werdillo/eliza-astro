import { For, Show, createSignal, onMount } from "solid-js";
import { client, getImage } from '../lib/pocketbase';

export default function ProductItem() {
    const [item, setItem] = createSignal({});
    const [loading, setLoading] = createSignal(true);
	const urlSearchParams = new URLSearchParams(window.location.search);
	const params = Object.fromEntries(urlSearchParams.entries());
    onMount(async () => {
		const param = params.name;
        try {
            const res = await client.collection('products').getList(1, 50, {
                filter: `path="${param}"`,
            });

            setItem(res.items[0]);
            console.log(res.items[0])
            console.log(res.items[0].name)
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
                <div class='product-item'>
                    <div>
                        <img src={getImage(item(), item().images[0])} alt="" class="-slider" />
                        <p class='-text xl'>{item().name}</p>
                        
                    </div>
                </div>
            </Show>
        </div>
    );
}
