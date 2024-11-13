import { For, createSignal, onMount } from "solid-js";
import { client } from '../lib/pocketbase';


export default function Contacts() {
	const [items, setItems] = createSignal([]);
	const [loading, setLoading] = createSignal(true);

	onMount(async () => {
		try {
			const res = await client.collection('contacts').getList(1, 50);
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
				<Show when={!loading()}>
					<For each={items()}>
						{(item) => (
							<a href={"/collection?name=" + item.path}>
								<div key={item.id} class="-item">
									<div class="-text">{item.address}</div>
									<div class="-text">{item.email}</div>
									<div class="-text">{item.phone}</div>
								</div>
							</a>
						)}
					</For>
				</Show>
			</div>
		</div>
		{/* <Show when={!loading() && showEmail}>
			<EmailBottom />
		</Show> */}
	</>
}
