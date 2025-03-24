import { For, createSignal, onMount } from "solid-js";
import { client } from "../lib/pocketbase";
import { contacts, translations } from "../contacts";

export default function Contacts({ lang }) {
  const [items, setItems] = createSignal({});
  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    try {
			const res = await client.collection('contacts').getList(1, 50);
			setItems(res.items);
			console.log(res.items)
			setLoading(false);
		} catch (err) {
      console.error("Error fetching work times:", err);
    }
  });

  const title = {
    en: "Working time",
    ru: "Время работы",
    lv: "Darba laiks",
  };

  return (
    <div class="contacts">
      <For each={contacts}>
        {(contact, index) => 
            <div class="contacts-wrapper">
              <p class="-text xl special">{translations[lang][contact.key]}</p>
              <p class="-text">
				<a href={`https://maps.google.com/?q=${contact.address}`} target="_blank" class="contact-link">
					{contact.address}
				</a>
				</p>
			  <p class="-text">
				<a href={`mailto:${contact.mail}`}>{contact.mail}</a>
			  </p>
              <p class="-text">
				{contact.phone.map(phone => (
					<a href={`tel:+371${phone}`}>{phone}</a>
				)).reduce((prev, curr) => prev === null ? [curr] : [prev, ', ', curr], null)}
			  </p>
              <p class="-text xl work-time">{title[lang]}</p>
              <Show when={!loading()} fallback={<>
				<div class="skeleton text title wide"></div>
				<div class="skeleton text title wide"></div>
				<div class="skeleton text title wide"></div>
				</>
				}>
                <p class="-text">{items()[index()]["weekday_" + lang] || "—"}</p>
                <p class="-text">{items()[index()]["break_" + lang] || "—"}</p>
                <p class="-text">{items()[index()]["weeken_" + lang] || "—"}</p>
              </Show>
            </div>
          }
      </For>
    </div>
  );
}