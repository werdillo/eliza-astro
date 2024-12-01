import { For, createSignal, onMount } from "solid-js";
import { client } from '../lib/pocketbase';


export default function Contacts({lang}) {
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
	const title = {
		en: "Working time",
		ru: "Время работы",
		lv: "Darba laiks"
	};
	return <>
		<div class="contacts">
			<Show when={loading()}>
				<div class="skeleton"></div>
				<div class="skeleton"></div>
				<div class="skeleton"></div>
			</Show>
			<Show when={!loading()}>
				<For each={items()}>
					{(item) => (
						<div class='contacts-wrapper'>
							<p class='-text xl special'>{item['title_' + lang]}</p>
							<p class='-text'>{item.address}</p>
							<p class='-text'>{item.email}</p>
							<p class='-text'>{item.phone}</p>
							<p class='-text xl work-time'>{title[lang]}</p>
							<p class='-text'>{item['weekday_' + lang]}  </p>
							<p class='-text'>{item['break_' + lang]}    </p>
							<p class='-text'>{item['weeken_' + lang]}  </p>
						</div>
					)}
				</For>
			</Show>
		</div>
	</>
}