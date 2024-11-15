import { For, Show, createSignal, onMount } from "solid-js";
import { client } from '../lib/pocketbase';

export default function ProductsItimes({ type, brand }) {
    const [groupedItems, setGroupedItems] = createSignal({});
    const [loading, setLoading] = createSignal(true);
    const url = 'https://eliza.pockethost.io/';
    
    const getImage = (item, fileName) => {
        const collectionId = item.collectionId || 'pmlzc10hatw7ufi';
        const fileId = item.id;
        return `${url}/api/files/${collectionId}/${fileId}/${fileName}`;
    };

    onMount(async () => {
        try {
            // Формируем фильтр для запроса в зависимости от переданных параметров
            const filter = [
                type ? `type="${type}"` : null,
                brand ? `collection="${brand}"` : null,
            ].filter(Boolean).join(" && ");
            
            const res = await client.collection('products').getList(1, 50, { filter });

            // Группируем данные по коллекции или типу, в зависимости от переданных параметров
            const grouped = res.items.reduce((acc, item) => {
                const groupKey = `${item.collection} - ${item.type}`;
                if (!acc[groupKey]) acc[groupKey] = [];
                acc[groupKey].push(item);
                return acc;
            }, {});

            setGroupedItems(grouped);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching items:', err);
        }
    });

    return (
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
                <For each={Object.keys(groupedItems())}>
                    {(group) => (
                        <div>
                            <h2>{group.toUpperCase()}</h2>
                            <div class="textile">
                                <For each={groupedItems()[group]}>
                                    {(item) => (
                                        <a href={"/collection?name=" + item.path}>
                                            <div className='product-landing'>
                                                <img src={getImage(item, item.images[0])} alt='' className='-img' />
                                                <p className='-text'>{item.name.toUpperCase()}</p>
                                            </div>
                                        </a>
                                    )}
                                </For>
                            </div>
                        </div>
                    )}
                </For>
            </Show>
        </div>
    );
}
