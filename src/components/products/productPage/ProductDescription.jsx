import { Show } from "solid-js";
import { getShema } from "../../../lib/pocketbase";
import { translations } from "./translations";

export default function ProductDescription({ item, lang }) {
  const t = translations[lang];

  return (
    <Show when={item()?.[`description_${lang}`]}>
      <div className="-card">
        <div className="-text m bd">{t.description}</div>
        <div
          class="-text"
          innerHTML={item()[`description_${lang}`]}
        ></div>
        <Show when={item().schema}>
          <a href={getShema(item())} target="_blank">
            <button class="-button">{t.dimensions}</button>
          </a>
        </Show>
      </div>
    </Show>
  );
}
