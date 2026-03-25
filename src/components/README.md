# Components Guide

Этот файл сделан как личная шпаргалка по компонентам проекта.

## Основные компоненты

- `Header.astro`
  Главный липкий хедер. Собирает логотип, бейджи и dropdown локалей.

- `logotype.astro`
  SVG-логотип со ссылкой на главную.

## Подкомпоненты хедера

- `header/HeaderBadges.astro`
  Композит из бейджа версии и GitHub stars badge.

- `header/HeaderLocaleMenu.astro`
  Dropdown-переключатель языков.

- `header/HeaderBehavior.astro`
  Вся клиентская логика хедера:
  cookie для языка, поведение dropdown и скрытие/появление при скролле.

## Компоненты галереи

- `colors/ColorsGallery.astro`
  Верхнеуровневая сборка галереи. Готовит данные карточек, controls и grid.

- `colors/ColorsHeader.astro`
  Заголовок страницы галереи и summary по количеству блоков.

- `colors/ColorsControls.astro`
  Обёртка над поиском и фильтрами. Держит JS-логику поиска и тегов.

- `colors/ColorSearch.astro`
  Только строка поиска и shortcut UI.

- `colors/ColorTagFilters.astro`
  Только кнопки фильтров по тегам.

- `colors/ColorsGrid.astro`
  Сетка карточек и логика copy-to-clipboard.

- `colors/ColorCard.astro`
  Одна карточка градиента.

- `colors/GithubStarsBadge.astro`
  GitHub badge со звёздами и кешем в `localStorage`.

## Данные и утилиты

- `colors/constants.ts`
  Список цветов, locale options и общие константы.

- `colors/data.ts`
  Сборка карточек из списка цветов.

- `colors/css-snippets.ts`
  Snippets для кнопки копирования CSS.

- `colors/descriptions.ts`
  Генерация описаний и подписи последнего обновления.

- `colors/tags.ts`
  Категории и определение тегов карточек.

## Стили

- `colors/colors-gallery.css`
  Локальные стили filters/copy states.

## Как здесь лучше продолжать

- Новую UI-часть лучше выносить в маленький Astro-компонент, если она визуально самостоятельна.
- Данные держать отдельно от UI.
- Клиентский JS оставлять рядом с тем блоком, которым он управляет.
