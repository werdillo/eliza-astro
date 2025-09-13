# SEO Guide для команды разработки Eliza-K

## 🚀 Быстрый старт

Этот гид поможет команде разработки поддерживать и улучшать SEO оптимизацию сайта Eliza-K.

## 📁 Структура SEO

### Layout.astro (Базовый SEO)
Файл: `src/layouts/Layout.astro`

**Что содержит:**
- Мета-теги (title, description, keywords)
- Open Graph теги для социальных сетей
- Twitter Cards
- Hreflang для многоязычности
- Structured Data (JSON-LD)
- Canonical URLs

**Никогда не изменяйте:**
- Базовую структуру мета-тегов
- Логику hreflang
- Structured Data схему

### Страничный SEO
Каждая страница в `src/pages/[lang]/` содержит свой SEO блок.

## ✅ Чек-лист для новой страницы

### 1. Создание SEO данных
```astro
---
// В начале файла .astro
const seoData = {
    lv: {
        title: "Заголовок на латышском - Eliza-K",
        description: "Описание страницы на латышском языке (150-160 символов)",
        keywords: "ключевые, слова, через, запятую"
    },
    en: {
        title: "Title in English - Eliza-K", 
        description: "Page description in English (150-160 characters)",
        keywords: "keywords, separated, by, commas"
    },
    ru: {
        title: "Заголовок на русском - Eliza-K",
        description: "Описание страницы на русском языке (150-160 символов)", 
        keywords: "ключевые, слова, через, запятую"
    }
};

const currentSeo = seoData[lang] || seoData.lv;
---
```

### 2. Передача данных в Layout
```astro
<Layout
    title={currentSeo.title}
    description={currentSeo.description}
    keywords={currentSeo.keywords}
    url={`/${lang}/your-page-name`}
    image="/og-image-your-page.jpg"
    type="website"
>
    <!-- Контент страницы -->
</Layout>
```

### 3. Обязательные параметры
- ✅ `title` - уникальный для каждой страницы
- ✅ `description` - уникальное описание
- ✅ `keywords` - релевантные ключевые слова
- ✅ `url` - правильный путь страницы
- ✅ `image` - OG изображение (создать или использовать общее)

## 🎯 Правила написания SEO контента

### Заголовки (Title)
- **Длина**: 50-60 символов
- **Формат**: "Название страницы - Eliza-K"
- **Уникальность**: Каждая страница должна иметь уникальный title
- **Ключевые слова**: Включать основные ключевые слова в начале

### Описания (Description)
- **Длина**: 150-160 символов
- **Стиль**: Призывающий к действию
- **Ключевые слова**: Естественное включение ключевых слов
- **Уникальность**: Без дублирования описаний

### Ключевые слова (Keywords)
- **Количество**: 5-8 ключевых фраз
- **Релевантность**: Соответствие содержанию страницы
- **Разделение**: Через запятую с пробелом

## 🌐 Многоязычный SEO

### Поддерживаемые языки
- `lv` - Латышский (основной рынок)
- `en` - Английский (международный рынок)
- `ru` - Русский (русскоязычные клиенты)

### Правила локализации
1. **Латышский**: Основной язык, приоритетные ключевые слова
2. **Английский**: Международные термины, профессиональная лексика
3. **Русский**: Адаптация для русскоязычной аудитории

### URL структура
```
https://eliza-k.lv/lv/page-name  (латышский)
https://eliza-k.lv/en/page-name  (английский)  
https://eliza-k.lv/ru/page-name  (русский)
```

## 🖼️ Open Graph изображения

### Требования к изображениям
- **Размер**: 1200x630 пикселей
- **Формат**: JPG (рекомендуется)
- **Размер файла**: < 1 МБ
- **Расположение**: `/public/og-image-name.jpg`

### Стандартные изображения
- `/og-image.jpg` - общее изображение
- `/og-image-home.jpg` - главная страница
- `/og-image-collections.jpg` - коллекции
- `/og-image-contact.jpg` - контакты
- (см. OG-IMAGES-README.md для полного списка)

## 🔧 Часто используемые шаблоны

### Новая продуктовая страница
```astro
const seoData = {
    lv: {
        title: "Продукт - Eliza-K | Premium mēbeles Latvijā",
        description: "Описание продукта. Высокое качество, индивидуальный дизайн. Премиум мебель от Eliza-K в Риге, Латвия.",
        keywords: "название продукта, premium mēbeles, kvalitāte, dizains, Eliza-K"
    },
    // ... другие языки
};
```

### Информационная страница
```astro
const seoData = {
    lv: {
        title: "Информация - Eliza-K",
        description: "Полезная информация о мебели от экспертов Eliza-K. Советы по выбору и уходу за премиум мебелью.",
        keywords: "информация, советы, мебель, уход, качество"
    },
    // ... другие языки
};
```

## ❌ Частые ошибки

### 1. Дублированный контент
```astro
// ❌ НЕПРАВИЛЬНО
const seoData = {
    lv: { title: "Eliza-K", description: "Мебель" },
    en: { title: "Eliza-K", description: "Furniture" },
    ru: { title: "Eliza-K", description: "Мебель" }
};

// ✅ ПРАВИЛЬНО  
const seoData = {
    lv: { 
        title: "Eliza-K - Premium mēbeles Latvijā",
        description: "Уникальное описание на латышском языке"
    },
    en: { 
        title: "Eliza-K - Premium Furniture in Latvia",
        description: "Unique description in English"
    }
};
```

### 2. Неправильный URL
```astro
// ❌ НЕПРАВИЛЬНО
<Layout url="/wrong-path">

// ✅ ПРАВИЛЬНО
<Layout url={`/${lang}/correct-path`}>
```

### 3. Отсутствующие мета-теги
```astro
// ❌ НЕПРАВИЛЬНО - без SEO данных
<Layout>

// ✅ ПРАВИЛЬНО - с полными SEO данными
<Layout
    title={currentSeo.title}
    description={currentSeo.description}
    keywords={currentSeo.keywords}
    url={`/${lang}/page`}
>
```

## 🔍 Тестирование SEO

### Инструменты для проверки
1. **Facebook Debugger**: https://developers.facebook.com/tools/debug/
2. **Twitter Validator**: https://cards-dev.twitter.com/validator
3. **Google Rich Results**: https://search.google.com/test/rich-results
4. **Lighthouse**: Встроен в Chrome DevTools

### Что проверять
- ✅ Отображение title и description в поисковой выдаче
- ✅ Корректность Open Graph изображений
- ✅ Работа hreflang переключения
- ✅ Валидность structured data

## 📊 Мониторинг

### Google Search Console
- Следить за ошибками индексации
- Проверять coverage отчеты
- Мониторить Core Web Vitals

### Регулярные проверки
- **Еженедельно**: Проверка новых страниц в Search Console
- **Ежемесячно**: Обновление мета-описаний по аналитике
- **Квартально**: Полный аудит всех SEO тегов

## 🚨 Критические правила

### НЕ ТРОГАЙТЕ:
1. Базовую структуру `Layout.astro`
2. Логику hreflang тегов
3. Structured Data схему Organization
4. Canonical URL логику

### ВСЕГДА ПРОВЕРЯЙТЕ:
1. Уникальность title на всех языках
2. Длину мета-описаний (150-160 символов)
3. Корректность URL в параметре `url`
4. Наличие соответствующего OG изображения

## 📞 Поддержка

При возникновении вопросов:
1. Проверьте этот гид
2. Используйте инструменты тестирования
3. Проверьте консоль браузера на ошибки
4. Обратитесь к команде за помощью

---

**Последнее обновление**: Январь 2025  
**Версия**: 1.0  
**Поддерживаемые технологии**: Astro 5.x, Multi-language support