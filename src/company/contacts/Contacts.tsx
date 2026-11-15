import { For, createSignal, onMount, Show } from "solid-js";
import type { Language } from "#/features/i18n";
import type { RecordModel } from "#/core/pocketbase";
import { Skeleton } from "#/components/skeleton";
import { getContacts } from "./api";

interface Props {
  lang: Language;
}

const titles: Record<string, string> = {
  en: "Working time",
  ru: "Время работы",
  lv: "Darba laiks",
};

const skeletonRow = () => (
  <div class="contacts-wrapper">
    <Skeleton shape="title-wide" />
    <Skeleton shape="title-wide" />
    <Skeleton shape="title-wide" />
    <Skeleton shape="title-wide" />
  </div>
);

export default function Contacts(props: Props) {
  const [items, setItems] = createSignal<RecordModel[]>([]);
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

  return (
    <div class="contacts-grid">
      <Show
        when={!loading()}
        fallback={
          <>
            {skeletonRow()}
            {skeletonRow()}
            {skeletonRow()}
          </>
        }
      >
        <For each={items()}>
          {(contact) => {
            const lang = props.lang;
            // Проверяем наличие хотя бы одного из полей с временем работы
            const hasWorkingHours = () =>
              Boolean(contact[`weekday_${lang}`] || contact[`break_${lang}`] || contact[`weeken_${lang}`]);

            return (
              <div class="contacts-wrapper">
                <p class="contact-title h-[78px] max-1000:h-auto">{contact[`title_${lang}`]}</p>
                <p class="contact-text">
                  <a href={`https://maps.google.com/?q=${contact.address}`} target="_blank">
                    {contact.address}
                  </a>
                </p>
                <p class="contact-text">
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </p>
                <p class="contact-text">
                  <For each={(contact.phone?.split(",") ?? []).map((phone: string) => phone.trim())}>
                    {(phone, index) => (
                      <>
                        {index() > 0 ? ", " : null}
                        <a href={`tel:+371${phone}`}>{phone}</a>
                      </>
                    )}
                  </For>
                </p>

                <Show when={hasWorkingHours()}>
                  <p class="contact-title mt-[var(--space-30)]">{titles[lang]}</p>
                  <Show when={contact[`weekday_${lang}`]}>
                    <p class="contact-text">{contact[`weekday_${lang}`]}</p>
                  </Show>
                  <Show when={contact[`break_${lang}`]}>
                    <p class="contact-text">{contact[`break_${lang}`]}</p>
                  </Show>
                  <Show when={contact[`weeken_${lang}`]}>
                    <p class="contact-text">{contact[`weeken_${lang}`]}</p>
                  </Show>
                </Show>

                <Show when={contact.show_event}>
                  <p class="contact-event">{contact[`event_${lang}`] || ""}</p>
                </Show>
              </div>
            );
          }}
        </For>
      </Show>
    </div>
  );
}
