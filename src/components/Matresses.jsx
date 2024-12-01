import { For, createSignal, onMount } from "solid-js";
import { client, getImageUrl } from '../lib/pocketbase';


export default function Matresses({lang}) {
	const [items, setItems] = createSignal([]);
	const [loading, setLoading] = createSignal(true);
	onMount(async () => {
		try {
			const res = await client.collection('mattresses').getList(1, 50);
            const sortedItems = res.items.sort((a, b) => {
                if (a.type < b.type) return -1;
                if (a.type > b.type) return 1;
                return 0;
            });
			setItems(sortedItems);

			console.log(res.items)
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
			<div class="product-list">
				<For each={items()}>
					{(item) => (
						<a href={ "/" + lang + "/matress?name=" + item.path}>
							<div class='product-landing'>
								<img src={getImageUrl(item)} alt='' class='-img'></img>
								<p class='-text'>{item.name.toUpperCase()}</p>
							</div>
						</a>
					)}
				</For>	
			</div>
		</Show>
	</>
}
