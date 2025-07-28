#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Функция для получения размера файла в МБ
function getFileSizeInMB(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / (1024 * 1024)).toFixed(2);
}

// Функция для анализа изображений
function analyzeImages() {
  const mockDir = path.join(__dirname, "src/assets/images/mock");

  if (!fs.existsSync(mockDir)) {
    console.log("Папка mock не найдена");
    return;
  }

  const files = fs.readdirSync(mockDir);
  const imageFiles = files.filter((file) =>
    /\.(jpg|jpeg|png|webp)$/i.test(file)
  );

  console.log("📊 Анализ изображений:");
  console.log("========================");

  let totalSize = 0;

  imageFiles.forEach((file) => {
    const filePath = path.join(mockDir, file);
    const size = getFileSizeInMB(filePath);
    totalSize += parseFloat(size);

    console.log(`${file}: ${size} MB`);
  });

  console.log("========================");
  console.log(`Общий размер: ${totalSize.toFixed(2)} MB`);
  console.log(`Количество файлов: ${imageFiles.length}`);

  // Рекомендации
  console.log("\n💡 Рекомендации для оптимизации:");
  console.log("1. Сожмите изображения до размера менее 1MB");
  console.log("2. Используйте формат WebP для лучшего сжатия");
  console.log("3. Оптимизируйте разрешение изображений");
  console.log("4. Рассмотрите использование CDN для изображений");
}

// Запуск анализа
analyzeImages();
