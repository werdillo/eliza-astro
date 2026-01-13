# Constants & Configuration

Эта папка содержит централизованную конфигурацию и переводы для всего сайта.

## Структура

### 📄 `translations.ts`
Централизованная система переводов для всех языков (lv, en, ru).

**Использование:**
```typescript
import { t, type Language } from "../constants/translations";

const currentLang = "lv" as Language;
const text = t("horeca.hotels", currentLang); // "Viesnīcas"
```

**Секции переводов:**
- `common` - общие переводы (кнопки, метки и т.д.)
- `horeca` - переводы для HoReCa секции
- `collections` - названия коллекций
- `comingSoon` - тексты для страницы "Coming Soon"
- `slider` - тексты для слайдера главной страницы

### 📄 `horeca.ts`
Конфигурация для HoReCa секции (отели, кафе, рестораны).

**Структура:**
```typescript
{
  id: string;           // уникальный идентификатор
  image: ImageMetadata; // импортированное изображение
  url: string;          // ссылка на проект
  translationKey: string; // ключ перевода из translations.ts
}
```

**Использование:**
```astro
import { horecaItems } from "../constants/horeca";
import { t } from "../constants/translations";

horecaItems.map((item) => {
  const text = t(item.translationKey, lang);
  // ...
});
```

### 📄 `collections.ts`
Конфигурация коллекций для главной страницы.

**Структура:**
```typescript
{
  id: string;                      // уникальный идентификатор
  image: ImageMetadata;            // импортированное изображение
  url: string | ((lang) => string); // ссылка или функция генерации ссылки
  translationKey: string;          // ключ перевода
  external?: boolean;              // открывать в новой вкладке
}
```

**Использование:**
```astro
import { collectionCards } from "../constants/collections";

collectionCards.map((card) => {
  const url = typeof card.url === "function" ? card.url(lang) : card.url;
  // ...
});
```

## Преимущества централизации

✅ **Один источник правды** - все переводы и конфигурации в одном месте  
✅ **Легче поддерживать** - изменения в одном файле применяются везде  
✅ **Меньше дублирования** - код переиспользуется  
✅ **Type-safe** - TypeScript проверяет типы  
✅ **Проще добавлять новые языки** - достаточно добавить в translations.ts  

## Добавление нового языка

1. Добавьте язык в тип `Language`:
```typescript
export type Language = "lv" | "en" | "ru" | "de"; // добавили немецкий
```

2. Добавьте переводы во все секции:
```typescript
export const translations = {
  common: {
    readMore: {
      en: "Read More",
      lv: "Lasīt vairāk",
      ru: "Читать далее",
      de: "Mehr lesen", // новый перевод
    },
    // ...
  },
  // ...
}
```

## Добавление новой секции переводов

```typescript
export const translations = {
  // ... существующие секции
  
  newSection: {
    someKey: {
      en: "English text",
      lv: "Latviešu teksts",
      ru: "Русский текст",
    },
  },
} as const;
```

Использование:
```astro
const text = t("newSection.someKey", currentLang);
```

## Добавление новой коллекции

1. Импортируйте изображение в `collections.ts`:
```typescript
import newImage from "../assets/images/collection/new.jpg";
```

2. Добавьте в массив:
```typescript
export const collectionCards: CollectionCard[] = [
  // ... существующие
  {
    id: "new-collection",
    image: newImage,
    url: (lang: string) => `/${lang}/collection/new`,
    translationKey: "collections.newCollection",
    external: false,
  },
];
```

3. Добавьте перевод в `translations.ts`:
```typescript
collections: {
  // ... существующие
  newCollection: {
    en: "New Collection",
    lv: "Jauna kolekcija",
    ru: "Новая коллекция",
  },
}
```
