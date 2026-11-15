import type { JSX } from "solid-js";

interface Props {
  href: string;
  src: string;
  alt: string;
  /** What sits under the picture: a name, or a name with its price. */
  children: JSX.Element;
}

/** A picture on a light card with its caption below, linking somewhere. */
export default function LandingTile(props: Props) {
  return (
    <a href={props.href}>
      <div class="landing">
        <img src={props.src} alt={props.alt} class="landing-img" />
        {props.children}
      </div>
    </a>
  );
}
