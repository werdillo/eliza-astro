import { register } from "swiper/element/bundle";
register();

export default function Awards() {
    const awards = Array.from({ length: 12 }, (_, index) => `award_${index + 1}.jpg`);
    return <>
        <div class="awards">
            <swiper-container
                breakpoints={{
                    1400: {
                        slidesPerView: 8,
                        navigation: true
                    },
                    1200: {
                        slidesPerView: 6,
                        navigation: true
                    },
                    768: {
                        slidesPerView: 4,
                    },
                    500: {
                        slidesPerView: 3,
                    },
                    300: {
                        slidesPerView: 2,
                    },
                }}
                // slides-per-view="8"
                pagination="false"
                speed="500"
                loop="true"
                autoplay-delay="3000"
                >
                    <For each={awards}>
                        {(image) =>
                            <swiper-slide>
                                <div className="-wrapper">
                                  <img src={"/awards/" + image} alt="award" class="-img"/>
                                </div>
                            </swiper-slide>
                    }
                </For>
                </swiper-container>
        </div>
    </>
}