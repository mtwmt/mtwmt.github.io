# 🐉 七龍珠風格設計系統備份

這是完整的七龍珠風格配色和樣式系統，保存起來以備將來使用。

## 📋 配色系統

### tailwind.css - Primary Colors

```css
/* 🐉 Primary color palette - 七龍珠橘黃色系 */
--color-primary-50: #fff8e1;
--color-primary-100: #ffecb3;
--color-primary-200: #ffe082;
--color-primary-300: #ffd54f;
--color-primary-400: #ffca28;
--color-primary-500: #ffc107;   /* 悟空戰衣金黃 */
--color-primary-600: #ffb300;
--color-primary-700: #ffa000;
--color-primary-800: #ff8f00;
--color-primary-900: #ff6f00;   /* 深橘戰鬥色 */
```

### global.css - Light Mode

```css
:root {
  /* 🐉 七龍珠風配色系統 */

  /* 中性色 - 高對比度黑白漫畫風格 */
  --color-default: #1a1a1a;       /* 主文字（深黑） */
  --color-light: #4a4a4a;         /* 次要文字（中灰） */
  --color-dark: #000000;          /* 強調文字（純黑） */
  --color-background: #ffffff;    /* 主背景（純白） */
  --color-light-background: #fef7e6;  /* 卡片背景（溫暖米黃） */
  --color-border: #2a2a2a;        /* 邊框（深灰黑） */

  /* 橘色系 - 悟空戰衣橘 */
  --color-accent: #ff6600;        /* 主橘色（悟空戰衣） */
  --color-accent-light: #ff8833;  /* 淺橘 */
  --color-accent-dark: #cc5200;   /* 深橘 */

  /* 藍色系 - 龜派氣功藍 */
  --color-energy: #0066cc;        /* 龜派氣功藍 */
  --color-energy-light: #3399ff;  /* 淺藍 */
  --color-energy-dark: #004499;   /* 深藍 */
}
```

### global.css - Dark Mode

```css
:root.dark {
  /* 🐉 七龍珠風暗黑模式 - 夜空中的戰鬥 */

  /* 中性色 - 保持高對比 */
  --color-default: #f5f5f5;       /* 主文字（亮白） */
  --color-light: #b0b0b0;         /* 次要文字（亮灰） */
  --color-dark: #ffffff;          /* 強調文字（純白） */
  --color-background: #0a0a0a;    /* 主背景（深黑夜空） */
  --color-light-background: #1a1a1a;  /* 卡片背景（深灰） */
  --color-border: #e0e0e0;        /* 邊框（亮灰白） */

  /* 橘色系 - 暗黑模式更鮮豔 */
  --color-accent: #ff8833;        /* 主橘色（更亮） */
  --color-accent-light: #ffaa55;  /* 淺橘 */
  --color-accent-dark: #ff6600;   /* 深橘 */

  /* 藍色系 - 能量波更強烈 */
  --color-energy: #3399ff;        /* 龜派氣功藍（發光感）*/
  --color-energy-light: #66b3ff;  /* 淺藍 */
  --color-energy-dark: #0066cc;   /* 深藍 */

  /* Override primary colors - 七龍珠橘黃藍配色 */
  --color-primary-50: #fff3e0;
  --color-primary-100: #ffe0b2;
  --color-primary-200: #ffcc80;
  --color-primary-300: #ffb74d;
  --color-primary-400: #ffa726;
  --color-primary-500: #ff9800;   /* 暗黑主色（橘黃） */
  --color-primary-600: #fb8c00;
  --color-primary-700: #f57c00;
  --color-primary-800: #ef6c00;
  --color-primary-900: #e65100;
  --color-primary-a100: #ffd180;
  --color-primary-a200: #ffab40;
  --color-primary-a400: #ff9100;
  --color-primary-a700: #ff6d00;
}
```

## 🎨 核心樣式類別

### global.css - 七龍珠風格樣式

```css
/* ========================================
   🐉 七龍珠風格核心樣式系統
   特色：粗黑線條 + 橘黃藍配色 + 星星元素
   ======================================== */

/* 七龍珠風陰影 - 粗黑硬陰影（模擬漫畫線條）*/
.dbz-shadow {
  box-shadow: 5px 5px 0 #000;
}

.dbz-shadow-sm {
  box-shadow: 3px 3px 0 #000;
}

.dbz-shadow-lg {
  box-shadow: 7px 7px 0 #000;
}

.dbz-shadow-xl {
  box-shadow: 10px 10px 0 #000;
}

/* 能量波紋效果（龜派氣功藍色）*/
.dbz-shadow-energy {
  box-shadow: 5px 5px 0 #0066cc, 0 0 20px rgba(0, 102, 204, 0.3);
}

/* 戰鬥橘黃色陰影（悟空戰衣色）*/
.dbz-shadow-orange {
  box-shadow: 5px 5px 0 #ff6600;
}

/* 粗黑邊框（模擬鳥山明的線條風格）*/
.dbz-border {
  @apply border-[3px] border-gray-900 dark:border-gray-100;
}

.dbz-border-thick {
  @apply border-[4px] border-gray-900 dark:border-gray-100;
}

/* 七龍珠風按鈕 */
.btn {
  @apply relative inline-block font-black uppercase tracking-wider
  border-[3px] border-gray-900 dark:border-gray-100
  transition-all duration-150 ease-out
  dbz-shadow;
}

.btn:hover:not(:disabled) {
  @apply translate-x-[3px] translate-y-[3px];
  box-shadow: 2px 2px 0 #000;
}

.btn:active:not(:disabled) {
  @apply translate-x-[5px] translate-y-[5px];
  box-shadow: 0 0 0 #000;
}

.btn--active {
  @apply translate-x-[5px] translate-y-[5px];
  box-shadow: 0 0 0 #000;
}

.btn.disabled {
  @apply opacity-50 cursor-not-allowed;
  box-shadow: 2px 2px 0 #666;
}

/* 七龍珠風卡片 */
.dbz-card {
  @apply bg-white dark:bg-gray-800 dbz-border dbz-shadow
  transition-all duration-200 rounded-lg;
  position: relative;
}

.dbz-card:hover {
  @apply -translate-y-2;
  box-shadow: 8px 8px 0 #000;
}

/* 能量卡片（藍色龜派氣功效果）*/
.dbz-card-energy {
  @apply bg-gradient-to-br from-blue-50 to-blue-100
  dark:from-blue-900 dark:to-blue-800
  dbz-border;
  box-shadow: 5px 5px 0 #0066cc, 0 0 25px rgba(0, 102, 204, 0.4);
}

.dbz-card-energy:hover {
  box-shadow: 8px 8px 0 #0066cc, 0 0 35px rgba(0, 102, 204, 0.6);
}

/* 龍珠星星裝飾元素 */
.dbz-star {
  position: relative;
}

.dbz-star::before {
  content: '⭐';
  position: absolute;
  font-size: 1.2rem;
  animation: star-twinkle 2s ease-in-out infinite;
}

@keyframes star-twinkle {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}

/* 速度線效果（戰鬥時的效果線）*/
.dbz-speed-lines {
  background-image:
    linear-gradient(90deg, transparent 0%, transparent 48%, rgba(0,0,0,0.1) 50%, transparent 52%, transparent 100%);
  background-size: 30px 100%;
}
```

## 🔘 組件樣式

### Button.astro

```typescript
// 🐉 七龍珠風按鈕樣式
const variantClasses = {
  primary: `btn bg-gradient-to-r from-orange-500 to-orange-600 text-white ${active ? 'btn--active' : ''}`,
  accent: 'btn bg-gradient-to-r from-blue-500 to-blue-600 text-white', // 龜派氣功藍
  outline: 'btn bg-transparent text-orange-600 dark:text-orange-400 border-orange-600 dark:border-orange-400',
  ghost: 'btn bg-yellow-100 dark:bg-yellow-900 text-gray-900 dark:text-gray-100',
  link: 'text-orange-600 dark:text-orange-400 hover:text-orange-700 transition-colors underline-offset-4 hover:underline font-black uppercase tracking-wider',
};
```

### Card.astro

```typescript
// 🐉 七龍珠風卡片基礎樣式
const baseClasses = 'relative p-6 md:p-8 rounded-lg dbz-card';
const energyClasses = 'relative p-6 md:p-8 rounded-lg dbz-card-energy';

// 星星裝飾
hasStar={true}  // 添加龍珠星星

// 能量卡片（variant="energy"）
<Card variant="energy" title="..." icon="..." />
```

### Badge.astro

```typescript
// 🐉 七龍珠風 Badge 樣式 - 粗邊框 + 粗體字
const variantClasses = {
  primary: outline
    ? 'border-2 border-orange-600 text-orange-700 dark:border-orange-400 dark:text-orange-300 bg-transparent'
    : 'bg-orange-500 text-white border-2 border-gray-900 dark:border-gray-100',
  accent: outline
    ? 'border-2 border-blue-600 text-blue-700 dark:border-blue-400 dark:text-blue-300 bg-transparent'
    : 'bg-blue-500 text-white border-2 border-gray-900 dark:border-gray-100',
  // ... 其他顏色
};

const baseClasses = 'inline-block font-bold rounded-full whitespace-nowrap uppercase tracking-wide';
```

### Alert.astro

```typescript
// 🐉 七龍珠風 Alert 樣式 - 粗邊框 + 鮮艷顏色
const variantConfig = {
  info: {
    container: 'bg-blue-100 border-[3px] border-blue-600 dark:bg-blue-900/30 dark:border-blue-400 dbz-shadow-sm',
    icon: 'text-blue-700 dark:text-blue-300',
    title: 'text-blue-900 dark:text-blue-200',
    text: 'text-blue-800 dark:text-blue-300',
    defaultIcon: 'ic:outline-info',
  },
  // ... 其他變體
};
```

## 📖 使用範例

```astro
<!-- 戰鬥按鈕 -->
<Button variant="primary" size="lg">開始戰鬥！</Button>

<!-- 龜派氣功按鈕 -->
<Button variant="accent" size="lg">龜派氣功波</Button>

<!-- 帶星星的專案卡片 -->
<Card variant="project" hasStar={true} title="我的專案" />

<!-- 能量卡片 -->
<Card variant="energy" title="強大能量" icon="ic:outline-bolt" />

<!-- 戰鬥力 Badge -->
<Badge variant="primary">戰鬥力 9000+</Badge>
```

## 🎯 設計理念

### 核心元素
1. **粗黑線條** - 模擬鳥山明漫畫風格
2. **橘黃配色** - 悟空經典戰衣
3. **藍色能量** - 龜派氣功光波
4. **星星元素** - 七龍珠標誌
5. **高對比度** - 黑白分明的漫畫感

### 特色
- 硬陰影（hard shadow）而非柔和陰影
- 粗體字（font-black）+ 大寫（uppercase）
- 高飽和度色彩
- 動態效果（星星閃爍、能量發光）

---

**保存日期**: 2025-01-XX
**用途**: 未來可能使用的七龍珠主題設計系統
