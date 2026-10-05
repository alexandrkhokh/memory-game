# Memory Game

## Требования

- [Node.js](https://nodejs.org/) версии 20.19+ (или 22.12+) — требование Vite 8
- npm (устанавливается вместе с Node.js)

Проверить версии:

```bash
node -v
npm -v
```

## Запуск

1. Клонировать репозиторий и перейти в папку проекта:

   ```bash
   git clone <URL-репозитория>
   cd memory-game
   ```

2. Переключиться на ветку с кодом (если нужно):

   ```bash
   git checkout memory-game
   ```

3. Установить зависимости:

   ```bash
   npm install
   ```

4. Запустить dev-сервер:

   ```bash
   npm run dev
   ```

5. Открыть в браузере адрес, который выведет Vite (по умолчанию <http://localhost:5173>).

## Другие команды

| Команда           | Описание                                              |
| ----------------- | ----------------------------------------------------- |
| `npm run dev`     | Dev-сервер с hot reload                               |
| `npm run build`   | Production-сборка в папку `dist/`                     |
| `npm run preview` | Локальный просмотр production-сборки (после `build`)  |

## Заметки

- Таблица рекордов хранится в `localStorage` браузера. Чтобы сбросить её, очистите данные сайта в DevTools (Application → Local Storage).
