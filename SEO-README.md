# SEO Optimization для Eliza-K

## Обзор
Этот документ описывает SEO оптимизацию, реализованную для сайта Eliza-K - производителя эксклюзивной премиум мебели в Латвии.

## Структура SEO

### 1. Layout.astro - Базовые SEO теги
В `src/layouts/Layout.astro` реализованы:

#### Основные мета-теги:
- `<title>` - динамический заголовок страницы
- `<meta name="description">` - описание страницы
- `<meta name="keywords">` - ключевые слова
- `<meta name="robots" content="index, follow">` - индексация поисковиками
- `<link rel="canonical">` - канонический URL

#### Open Graph (Facebook/социальные сети):
- `og:type` - тип контента
- `og:title` - заголовок для соц. сетей
- `og:description` - описание для соц. сетей
- `og:image` - изображение для превью
- `og:url` - URL страницы
- `og:locale` - локализация (lv_LV, en_US, ru_RU)

#### Twitter Cards:
- `twitter:card` - формат карточки
- `twitter:title` - заголовок для Twitter
- `twitter:description` - описание для Twitter
- `twitter:image` - изображение для Twitter

#### Hreflang (многоязычность):
- Альтернативные языковые версии
- Поддержка lv, en, ru языков
- `x-default` указывает на латышскую версию как основную

#### Structured Data (JSON-LD):
- Organization schema для компании
- WebSite schema для сайта
- WebPage schema для каждой страницы

### 2. Страничный SEO

Каждая страница в `src/pages/[lang]/` содержит:

```typescript
const seoData = {
    lv: {
        title: "SEO заголовок на латышском",
        description: "Описание на латышском",
        keywords: "ключевые, слова, через, запятую"
    },
    en: {
        title: "SEO title in English",
        description: "Description in English",
        keywords: "keywords, separated, by, commas"
    },
    ru: {
        title: "SEO заголовок на русском",
        description: "Описание на русском",
        keywords: "ключевые, слова, через, запятую"
    }
};
```

### 3. Реализованные страницы

#### Главная страница (`/[lang]/index.astro`):
- **Цель**: Представление бренда и основных коллекций
- **Keywords**: премиум мебель, Eliza-K, Латвия, Рига, коллекции
- **Structured data**: Главная страница организации

#### О нас (`/[lang]/about-us.astro`):
- **Цель**: Информация о компании
- **Keywords**: о компании, производитель мебели, история, ценности
- **Focus**: Доверие и экспертность бренда

#### Коллекции (`/[lang]/collections.astro`):
- **Цель**: Витрина всех коллекций мебели
- **Keywords**: Sophisticated Living, BBold, Basic, дизайнерская мебель
- **Focus**: Продуктовые запросы

#### Контакты (`/[lang]/contact.astro`):
- **Цель**: Контактная информация и локальный SEO
- **Keywords**: контакты, адрес Рига, телефон, местоположение
- **Focus**: Локальные запросы и связь с клиентами

#### Галерея (`/[lang]/gallery.astro`):
- **Цель**: Визуальное портфолио проектов
- **Keywords**: галерея, фото мебели, проекты, дизайн интерьера
- **Focus**: Визуальный контент и вдохновение

#### Матрасы (`/[lang]/matressess.astro`):
- **Цель**: Специализированная категория товаров
- **Keywords**: матрасы, ортопедические, комфорт, сон
- **Focus**: Специфические продуктовые запросы

#### Каталоги (`/[lang]/catalogs.astro`):
- **Цель**: Доступ к PDF каталогам
- **Keywords**: каталог, PDF, скачать, цены, спецификации
- **Focus**: Информационные запросы

### 4. Техническая реализация

#### Использование props в Layout:
```astro
<Layout
    title={currentSeo.title}
    description={currentSeo.description}
    keywords={currentSeo.keywords}
    url={`/${lang}/page-name`}
    image="/og-image-specific.jpg"
    type="website"
>
```

#### Мультиязычная поддержка:
- Автоматическое определение языка из параметра `[lang]`
- Fallback на латышский язык (основной рынок)
- Правильные hreflang теги для каждого языка

### 5. Open Graph изображения

Рекомендуемые изображения для создания:
- `/og-image.jpg` - общее (1200x630px)
- `/og-image-home.jpg` - главная страница
- `/og-image-collections.jpg` - коллекции
- `/og-image-about.jpg` - о нас
- `/og-image-contact.jpg` - контакты
- `/og-image-gallery.jpg` - галерея
- `/og-image-mattresses.jpg` - матрасы
- `/og-image-catalogs.jpg` - каталоги

### 6. Structured Data схема

Реализована схема Organization:
- Название компании: Eliza-K
- Сайт: https://eliza-k.lv
- Местоположение: Рига, Латвия
- Многоязычность: lv, en, ru

### 7. Рекомендации по контенту

#### Ключевые фразы для оптимизации:
**Латышский (основной рынок):**
- premium mēbeles Latvijā
- ekskluzīvas mēbeles Rīgā
- kvalitatīvas mēbeles
- mēbeļu dizains

**Английский:**
- premium furniture Latvia
- exclusive furniture Riga
- quality furniture
- furniture design

**Русский:**
- премиум мебель Латвия
- эксклюзивная мебель Рига
- качественная мебель
- мебельный дизайн

### 8. Мониторинг и аналитика

Рекомендуется добавить:
- Google Analytics 4
- Google Search Console
- Yandex.Metrica (для русскоязычной аудитории)

### 9. Дальнейшие улучшения

1. **Локальный SEO:**
   - Google My Business профиль
   - Локальные структурированные данные
   - Отзывы клиентов

2. **Техническое SEO:**
   - XML Sitemap (уже существует)
   - robots.txt оптимизация
   - Core Web Vitals оптимизация

3. **Контентная стратегия:**
   - Блог о дизайне интерьера
   - Кейсы реализованных проектов
   - Гиды по выбору мебели

### 10. Использование

Для добавления новой страницы с SEO:

1. Создайте объект seoData с переводами
2. Передайте данные в Layout компонент
3. Убедитесь в правильности URL структуры
4. Добавьте соответствующее OG изображение

Пример:
```astro
---
const seoData = {
    lv: { title: "...", description: "...", keywords: "..." },
    en: { title: "...", description: "...", keywords: "..." },
    ru: { title: "...", description: "...", keywords: "..." }
};
const currentSeo = seoData[lang] || seoData.lv;
---

<Layout
    title={currentSeo.title}
    description={currentSeo.description}
    keywords={currentSeo.keywords}
    url={`/${lang}/new-page`}
    image="/og-image-new-page.jpg"
>
    <!-- Контент страницы -->
</Layout>
```

---

**Статус**: ✅ Базовая SEO оптимизация реализована  
**Дата**: Январь 2025  
**Поддерживаемые языки**: lv (основной), en, ru