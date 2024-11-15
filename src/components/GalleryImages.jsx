import { For, createSignal, onMount } from "solid-js";
import { client } from '../lib/pocketbase';

export default function GalleryImages() {
	const [items, setItems] = createSignal([]);
	const [loading, setLoading] = createSignal(true);
	const [collectionId, setCollectionId] = createSignal();
	const [fileId, setFileId] = createSignal();
	const url = 'https://eliza.pockethost.io/';
	const getImage = (img) => {
		return `${url}/api/files/${collectionId()}/${fileId()}/${img}`;
	};
	onMount(async () => {
		try {
			const res = await client.collection('gallery').getList(1, 50);
			setCollectionId(res.items[0].collectionId)
			setFileId(res.items[0].id)
			setItems(res.items[0].image);
			setLoading(false);
		} catch (err) {
			console.error('Error fetching items:', err);
		}
	});
	return <>
		<div class="gallery">
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
					{(item) => <img class="-img" src={getImage(item)} />}
				</For>
			</Show>
		</div>
	</>
}