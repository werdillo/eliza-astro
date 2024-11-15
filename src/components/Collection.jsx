import { For, createSignal, onMount } from "solid-js";
import { client } from '../lib/pocketbase';


export default function Collections({brand}) {
	const [items, setItems] = createSignal([]);
	const [loading, setLoading] = createSignal(true);
	const url = 'https://eliza.pockethost.io/';
	const getImage = (item, fileName) => {
		const collectionId = item.collectionId || 'pmlzc10hatw7ufi';
		const fileId = item.id;
		return `${url}/api/files/${collectionId}/${fileId}/${fileName}`;
	};
	onMount(async () => {
		try {
			const res = await client.collection('products').getList(1, 50, {
				filter: `collection="${brand}"`,
			});
			setItems(res.items);
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
							<a href={"/collection?name=" + item.path}>
								<div className='product-landing'>
									<img src={getImage(item, item.images[0])} alt='' className='-img'></img>
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
