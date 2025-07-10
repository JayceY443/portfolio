#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';



const CONFIG = {
  sourceDir: './src',
  fontsDir: './public/fonts',
  subsetDir: './public/fonts/subset',
  charsFile: './chars.txt',
  fonts: [
    {
      input: 'SourceHanSerifCN-Medium.otf',
      output: 'SourceHanSerifCN-Medium-subset.woff2'
    },
    {
      input: 'SourceHanSerifCN-Bold.otf', 
      output: 'SourceHanSerifCN-Bold-subset.woff2'
    }
  ]
};

const allChars = new Set();

function readDirectory(dir) {
  try {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && !file.startsWith('.') && !['node_modules', 'out', '.next', 'dist'].includes(file)) {
        readDirectory(filePath);
      } else if (file.match(/\.(tsx?|jsx?|md|mdx)$/)) {
        const content = fs.readFileSync(filePath, 'utf8');
        for (const char of content) {
          const code = char.charCodeAt(0);
          if ((code >= 0x4e00 && code <= 0x9fff) || // 中文
              (code >= 0x3000 && code <= 0x303f) || // 标点符号
              (code >= 0xff00 && code <= 0xffef) || // 全角字符
              (code >= 0x20 && code <= 0x7e)) {     // 基本 ASCII
            allChars.add(char);
          }
        }
      }
    });
  } catch (error) {
    console.warn(`⚠️  警告: 无法读取目录 ${dir}:`, error.message);
  }
}

function extractChars() {
  console.log('[info] chars extracting...');
  readDirectory(CONFIG.sourceDir);
  
  const charsString = Array.from(allChars).sort().join('');
  fs.writeFileSync(CONFIG.charsFile, charsString);
  
  return charsString;
}

function createFontSubsets() {
  console.log('[info] font subset creating...');

  if (!fs.existsSync(CONFIG.subsetDir)) {
    fs.mkdirSync(CONFIG.subsetDir, { recursive: true });
    console.log(`[info] create directory: ${CONFIG.subsetDir}`);
  }
  
  CONFIG.fonts.forEach(font => {
    const inputPath = path.join(CONFIG.fontsDir, font.input);
    const outputPath = path.join(CONFIG.subsetDir, font.output);

    if (!fs.existsSync(inputPath)) {
      console.warn(`[warn] skip missing font file: ${inputPath}`);
      return;
    }
    
    try {
      const originalSize = fs.statSync(inputPath).size;
      
      console.log(`[info] process ${font.input} (${(originalSize / 1024 / 1024).toFixed(2)}MB)...`);
      
      const command = `python3 -m fontTools.subset "${inputPath}" --output-file="${outputPath}" --flavor=woff2 --text-file="${CONFIG.charsFile}"`;
      execSync(command, { stdio: 'pipe' });
      
      const newSize = fs.statSync(outputPath).size;
      const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(2);
      
      console.log(`[info] ${font.output} created successfully`);
      console.log(`[info] ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024).toFixed(2)}KB (reduce ${reduction}%)`);
      
    } catch (error) {
      console.error(`[error] process ${font.input} failed:`, error.message);
    }
  });
}

function main() {
  try {
    console.log('[info] font subset building...');
    extractChars();
    createFontSubsets();
    console.log('[info] font subset building completed!');
    
  } catch (error) {
    console.error('[error] font subset building failed:', error.message);
    process.exit(1);
  }
}

main(); 