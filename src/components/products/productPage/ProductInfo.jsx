import { Show } from "solid-js";
import { getMatressFile } from "../../../lib/pocketbase";
import { translations } from "./translations";

export default function ProductInfo({ item, type, lang }) {
  const t = translations[lang];

  return (
    <div className="-right">
      <div class="-title">{item().name}</div>

      <Show when={type === "sale" && (item().price || item().oldPrice)}>
        <div
          class="price-container"
          style={{
            "justify-content": "flex-start",
          }}
        >
          <Show when={item().price}>
            <span class="price">€{item().price}</span>
          </Show>
          <Show when={item().oldPrice}>
            <span class="old-price" style={{ "font-size": "24px" }}>
              €{item().oldPrice}
            </span>
          </Show>
        </div>
      </Show>

      <Show when={type === "mattress" && item()?.[`file_${lang}`]}>
        <div style={{ display: "flex", gap: "12px" }}>
          <a href={getMatressFile(item(), lang)} target="_blank">
            <button class="-button">{t.dimensions}</button>
          </a>
          <a
            href={`/files/cleaning-mattresses-${lang}.pdf`}
            target="_blank"
          >
            <button class="-button">{t.cleaning}</button>
          </a>
        </div>
      </Show>

      <a class="-text link" href="mailto:teika@eliza-k.lv">
        <button class="-button xl">{t.sendEmail}</button>
      </a>
    </div>
  );
}
