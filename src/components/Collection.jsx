import { For, Show, createSignal, onMount } from "solid-js";
import { client, getImage } from '../lib/pocketbase';

export default function Collections({ brand, lang }) {
	const [groupedItems, setGroupedItems] = createSignal({});
	const [loading, setLoading] = createSignal(true);

	onMount(async () => {
		try {
			const res = await client.collection('products').getList(1, 50, {
				filter: `collection="${brand}"`,
				fields:
				  "id, collectionId, collection, path, images, type, name:excerpt(200, true)",
			});

			const grouped = res.items.reduce((acc, item) => {
				if (!acc[item.type]) acc[item.type] = [];
				acc[item.type].push(item);
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
			<div class="container">
				<div class="skeleton text title"></div>
			</div>
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
				{(type) => <>
					<div class="container">
						<div class="title">{type.toUpperCase()}</div>
					</div>
					<div class="product-list">
						<For each={groupedItems()[type]}>
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
