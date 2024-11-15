import { For, createSignal, onMount } from "solid-js";
import { client, getImageUrl } from '../lib/pocketbase';


export default function Matresses() {
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
		<div class="texitle">
			<Show when={loading()}>
				<div class="skeleton"></div>
				<div class="skeleton"></div>
				<div class="skeleton"></div>
				<div class="skeleton"></div>
				<div class="skeleton"></div>
				<div class="skeleton"></div>
			</Show>
			<Show when={!loading()}>
				<div class="textile">
					<For each={items()}>
						{(item) => (
							<a href={"/product?name=" + item.path}>
								<div className='product-landing'>
									<img src={getImageUrl(item)} alt='' className='-img'></img>
									<p className='-text'>{item.name.toUpperCase()}</p>
								</div>
							</a>
						)}
					</For>	
				</div>
			</Show>
		</div>
	</>
}
