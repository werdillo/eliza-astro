import { For, createSignal, onMount } from "solid-js";
import { client } from '../lib/pocketbase';
import { getImageUrl } from '../lib/pocketbase';


export default function TextileItems() {
	const [items, setItems] = createSignal([]);
	const [loading, setLoading] = createSignal(true);
	const url = 'https://eliza.pockethost.io/';
	const getImageUrl = (item, fileName) => {
		const collectionId = item.collectionId || 'pmlzc10hatw7ufi';
		const fileId = item.id;
		return `${url}/api/files/${collectionId}/${fileId}/${fileName}`;
	};
	onMount(async () => {
		try {
			const res = await client.collection('textile').getList(1, 50);
			const sortedItems = res.items.sort((a, b) => a.order - b.order);
			setItems(sortedItems);
			
			console.log(res.items)
			setLoading(false);
		} catch (err) {
			console.error('Error fetching items:', err); 
		}
	});
	return <>
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
				<For each={items()}>
					{(item) => (
						<>
							<div className="textile-title">
								{item.title}
							</div>
							<div class="textile">
								{ item.image1 !== '' &&
									<div key={item.id} class="-item">
										<div class="-text">{item.text1}</div>
										<img class="-img" src={getImageUrl(item, item.image1)} alt={item.name} />
									</div>
								}
								{ item.image2 !== '' &&
									<div key={item.id} class="-item">
										<div class="-text">{item.text2}</div>
										<img class="-img" src={getImageUrl(item, item.image2)} alt={item.name} />
									</div>
								}
								{ item.image3 !== '' &&
									<div key={item.id} class="-item">
										<div class="-text">{item.text3}</div>
										<img class="-img" src={getImageUrl(item, item.image3)} alt={item.name} />
									</div>
								}
								{ item.image4 !== '' &&
									<div key={item.id} class="-item">
										<div class="-text">{item.text4}</div>
										<img class="-img" src={getImageUrl(item, item.image4)} alt={item.name} />
									</div>
								}
							</div>
						</>
					)}
				</For>	
			</Show>
		</div>
		{/* <Show when={!loading() && showEmail}>
			<EmailBottom />
		</Show> */}
	</>
}
