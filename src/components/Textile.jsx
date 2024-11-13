import { For, createSignal, onMount } from "solid-js";
import { client } from '../lib/pocketbase';
import { getImageUrl } from '../lib/pocketbase';


export default function Textile() {
	const [items, setItems] = createSignal([]);
	const [loading, setLoading] = createSignal(true);

	onMount(async () => {
		try {
			const res = await client.collection('textile').getList(1, 50);
			setItems(res.items);
			console.log(res.items)
			setLoading(false);
		} catch (err) {
			console.error('Error fetching items:', err); 
		}
	});
	return <>
		<div class="container disable-top">
			<div class="product-list">
				<Show when={loading()}>
					<div class="skeleton"></div>
					<div class="skeleton"></div>
					<div class="skeleton"></div>
					<div class="skeleton"></div>
					<div class="skeleton"></div>
					<div class="skeleton"></div>
				</Show>
			</div>
		</div>
		{/* <Show when={!loading() && showEmail}>
			<EmailBottom />
		</Show> */}
	</>
}
