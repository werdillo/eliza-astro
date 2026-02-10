import { For, Show } from "solid-js";
import { translations } from "./translations";

const fabricImages = [
  "/textile/matrix.jpeg",
  "/textile/falcone.jpeg",
  "/textile/salvador.jpeg",
];

export default function ProductFabrics({ item, type, lang }) {
  const t = translations[lang];

  return (
    <Show when={type !== "mattress" && item()?.[`description_${lang}`]}>
      <div className="-card">
        <div className="-text m bd">{t.fabrics}</div>
        <div className="-textile">
          <For each={fabricImages}>
            {(src) => <img src={src} alt="" className="-img" />}
          </For>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <a href="/files/cleaning.pdf" target="_blank">
            <button class="-button">{t.cleaning}</button>
          </a>
        </div>
      </div>
    </Show>
  );
}
