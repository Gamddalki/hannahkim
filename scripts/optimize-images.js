const fs = require("fs");
const path = require("path");

const inputDir = "public/img";
const outputDir = "public/img"; // 원본 폴더에 직접 저장

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImages() {
  try {
    console.log("Starting image optimization...");

    // Dynamic import로 ES Module 패키지들 로드
    const imagemin = (await import("imagemin")).default;
    const imageminPngquant = (await import("imagemin-pngquant")).default;
    const imageminMozjpeg = (await import("imagemin-mozjpeg")).default;

    // Optimize PNG files
    const pngFiles = await imagemin([`${inputDir}/**/*.png`], {
      destination: outputDir,
      plugins: [
        imageminPngquant({
          quality: [0.7, 0.9], // 더 높은 품질 (60-80% → 70-90%)
          speed: 1,
        }),
      ],
    });
    console.log(`Optimized ${pngFiles.length} PNG files`);

    // Optimize JPG files
    const jpgFiles = await imagemin([`${inputDir}/**/*.jpg`], {
      destination: outputDir,
      plugins: [
        imageminMozjpeg({
          quality: 85, // 더 높은 품질 (80 → 85)
          progressive: true,
        }),
      ],
    });
    console.log(`Optimized ${jpgFiles.length} JPG files`);

    // WebP 변환 제거됨

    // Copy GIF files as-is (they're already optimized)
    const gifFiles = await imagemin([`${inputDir}/**/*.gif`], {
      destination: outputDir,
    });
    console.log(`Copied ${gifFiles.length} GIF files`);

    console.log("Image optimization completed!");
    console.log(`Optimized images saved directly to: ${outputDir}`);
    console.log("원본 이미지들이 압축된 버전으로 교체되었습니다!");
  } catch (error) {
    console.error("Error optimizing images:", error);
  }
}

optimizeImages();
