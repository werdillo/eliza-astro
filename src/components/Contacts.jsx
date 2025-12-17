import { For, createSignal, onMount, Show } from "solid-js";
import { getContacts } from "../lib/api";

export default function Contacts({ lang }) {
  const [items, setItems] = createSignal([]);
  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    try {
      const contacts = await getContacts();
      setItems(contacts);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setLoading(false);
    }
  });

  const title = {
    en: "Working time",
    ru: "Время работы",
    lv: "Darba laiks",
  };

  return (
    <div class="contacts">
      <Show
        when={!loading()}
        fallback={
          <>
            <div class="contacts-wrapper">
              <div class="skeleton text title wide"></div>
              <div class="skeleton text title wide"></div>
              <div class="skeleton text title wide"></div>
              <div class="skeleton text title wide"></div>
            </div>
            <div class="contacts-wrapper">
              <div class="skeleton text title wide"></div>
              <div class="skeleton text title wide"></div>
              <div class="skeleton text title wide"></div>
              <div class="skeleton text title wide"></div>
            </div>
            <div class="contacts-wrapper">
              <div class="skeleton text title wide"></div>
              <div class="skeleton text title wide"></div>
              <div class="skeleton text title wide"></div>
              <div class="skeleton text title wide"></div>
            </div>
          </>
        }
      >
        <For each={items()}>
          {(contact) => (
            <div class="contacts-wrapper">
              <p class="-text xl special">{contact[`title_${lang}`]}</p>
              <p class="-text">
                <a
                  href={`https://maps.google.com/?q=${contact.address}`}
                  target="_blank"
                  class="contact-link"
                >
                  {contact.address}
                </a>
              </p>
              <p class="-text">
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
              <p class="-text">
                {contact.phone
                  .split(",")
                  .map((phone) => phone.trim())
                  .map((phone) => <a href={`tel:+371${phone}`}>{phone}</a>)
                  .reduce(
                    (prev, curr) =>
                      prev === null ? [curr] : [prev, ", ", curr],
                    null,
                  )}
              </p>
              <p class="-text xl work-time">{title[lang]}</p>
              <p class="-text">{contact[`weekday_${lang}`] || "—"}</p>
              <p class="-text">{contact[`break_${lang}`] || "—"}</p>
              <p class="-text">{contact[`weeken_${lang}`] || "—"}</p>
            </div>
          )}
        </For>
      </Show>
    </div>
  );
}
