#!/bin/bash

# 🚀 Быстрый деплой на Netlify
# Этот скрипт поможет задеплоить проект одной командой

echo "🎨 Scratch MVP - Деплой на Netlify"
echo "=================================="
echo ""

# Проверка установки Netlify CLI
if ! command -v netlify &> /dev/null
then
    echo "⚠️  Netlify CLI не установлен"
    echo "📦 Устанавливаю Netlify CLI..."
    npm install -g netlify-cli
    echo "✅ Netlify CLI установлен!"
    echo ""
fi

# Build проекта
echo "🔨 Создаю production build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build успешен!"
    echo ""
else
    echo "❌ Ошибка при build"
    exit 1
fi

# Проверка авторизации
echo "🔑 Проверяю авторизацию в Netlify..."
netlify status &> /dev/null

if [ $? -ne 0 ]; then
    echo "⚠️  Не авторизован в Netlify"
    echo "🌐 Открываю браузер для авторизации..."
    netlify login
    echo ""
fi

# Деплой
echo "🚀 Деплою на Netlify..."
echo ""
echo "Выберите вариант:"
echo "1) Draft deploy (предпросмотр)"
echo "2) Production deploy (публикация)"
read -p "Ваш выбор (1 или 2): " choice

case $choice in
    1)
        echo "📋 Создаю draft deploy..."
        netlify deploy
        ;;
    2)
        echo "🌍 Публикую в production..."
        netlify deploy --prod
        ;;
    *)
        echo "❌ Неверный выбор"
        exit 1
        ;;
esac

echo ""
echo "✨ Деплой завершён!"
echo ""
echo "📊 Полезные команды:"
echo "  netlify open         - Открыть dashboard сайта"
echo "  netlify status       - Проверить статус"
echo "  netlify deploy --prod - Production деплой"
echo ""
