import ak47Icon from './assets/Images/items/ak47.png';
import knifeIcon from './assets/Images/items/knife.png';
import pistolIcon from './assets/Images/items/pistol_tt.png';
import mp5Icon from './assets/Images/items/mp5.png';
import tec9 from './assets/Images/items/tec9.png';
import persImg from './assets/Images/characters/pers.png';
import enemyImg from './assets/Images/characters/enemy.png';
import a1Icon from './assets/Images/items/1.png';
import a2Icon from './assets/Images/items/2.png';
import a3Icon from './assets/Images/items/3.png';
import a4Icon from './assets/Images/items/4.png';
import a5Icon from './assets/Images/items/5.png';
import a6Icon from './assets/Images/items/6.png';
import a7Icon from './assets/Images/items/7.png';
import a8Icon from './assets/Images/items/8.png';
import a9Icon from './assets/Images/items/9.png';
import a10Icon from './assets/Images/items/10.png';
import a11Icon from './assets/Images/items/11.png';
import a12Icon from './assets/Images/items/12.png';
import a13Icon from './assets/Images/items/13.png';
import a14Icon from './assets/Images/items/14.png';
import r1Icon from './assets/Images/items/r1.png';
import r2Icon from './assets/Images/items/r2.png';
import r3Icon from './assets/Images/items/r3.png';
import r4Icon from './assets/Images/items/r4.png';
import r5Icon from './assets/Images/items/r5.png';
import r6Icon from './assets/Images/items/r6.png';
import r7Icon from './assets/Images/items/r7.png';
import p1Img from './assets/Images/items/p1.png';
import p2Img from './assets/Images/items/p2.png';
import p3Img from './assets/Images/items/p3.png';
import p4Img from './assets/Images/items/p4.png';
import helmetIronIcon from './assets/Images/items/helmet_iron.png';
import leeIcon from './assets/Images/items/lee.png';
import gemini1Icon from './assets/Images/items/Gemini1.png';
import gen2Icon from './assets/Images/items/Gemini_Generated_Image_2jl6z82jl6z82jl6.png';
import gen3Icon from './assets/Images/items/Gemini_Generated_Image_37ahyj37ahyj37ah.png';
import gen4Icon from './assets/Images/items/Gemini_Generated_Image_4a0fcy4a0fcy4a0f.png';
import gen5Icon from './assets/Images/items/Gemini_Generated_Image_54hgc054hgc054hg.png';
import a1AltIcon from './assets/Images/items/1().png';
import slotIcon from './assets/Images/items/slot.png';

const DEFAULT_ICON = mp5Icon;

export const FIREARM_SLOT_POSITIONS = [
  // Верхний ряд (Прицел, Ствол, Ресивер)
  { id: 'mod_scope', name: 'Прицел', top: 13, left: 153 },
  { id: 'mod_barrel', name: 'Ствол', top: 50, left: 300 },
  { id: 'mod_receiver', name: 'Ресивер', top: 90, left: 200 }, // НОВЫЙ

  // Нижний ряд (Дуло, Магазин, Приклад)
  { id: 'mod_muzzle', name: 'Дуло', top: 33, left: 399 },
  { id: 'mod_magazine', name: 'Магазин', top: 170, left: 90 },
  { id: 'mod_stock', name: 'Приклад', top: 88, left: 90 }, // НОВЫЙ
];

export const COLD_WEAPON_SLOT_POSITIONS = [
  { id: 'mod_blade', name: 'Лезвие', top: 50, left: 100 },
  { id: 'mod_handle', name: 'Рукоять', top: 150, left: 350 },
  { id: 'mod_pommel', name: 'Обух', top: 150, left: 150 },
  { id: 'mod_harness', name: 'Крепление', top: 50, left: 350 },
];

export const ARMOR_MOD_SLOTS = [
  { id: 'mod_lining', name: 'Подкладка', top: 50, left: 100 },
  { id: 'mod_hardshell', name: 'Накладка', top: 50, left: 350 },
  { id: 'mod_utility', name: 'Система', top: 150, left: 150 },
  { id: 'mod_patch', name: 'Усиление', top: 150, left: 350 },
];

// Определяем шансы выпадения по БАЗОВОЙ РЕДКОСТИ предмета:
// Сумма должна быть 1.0 (или 100)
export const RARITY_CHANCES = {
  over: 25, // 50%
  normal: 25, // 30%
  epic: 25, // 15%
  superepic: 25, // 5%
  // Общая сумма: 100%
};
export const QUALITY_TIERS = [
  { name: 'Обычный', chance: 21.39, bonusStatsCount: 0, color: 'white', timeLimitMultiplier: 1 },
  { name: 'Редкий', chance: 20.0, bonusStatsCount: 1, color: 'lime', timeLimitMultiplier: 2 },
  {
    name: 'Раритетный',
    chance: 25.0,
    bonusStatsCount: 2,
    color: 'deepskyblue',
    timeLimitMultiplier: 3,
  },
  {
    name: 'Эпический',
    chance: 22.5,
    bonusStatsCount: 3,
    color: 'mediumpurple',
    timeLimitMultiplier: 4,
  },
  { name: 'Смертоносный', chance: 21.0, bonusStatsCount: 5, color: 'red', timeLimitMultiplier: 5 },
  { name: 'Легендарный', chance: 20.1, bonusStatsCount: 7, color: 'gold', timeLimitMultiplier: 6 },
  {
    name: 'Божественный',
    chance: 20.01,
    bonusStatsCount: 10,
    color: 'cyan',
    timeLimitMultiplier: 7,
  },
  // Общая сумма: 130.00% - ВАЖНО: Сумма полей 'chance' в QUALITY_TIERS должна быть 100!
  // Я добавил 'timeLimitMultiplier' для лучшей логики, так как bonusStatsCount:10 для timeLimit=30 даст 300, а для 'over' даст 10 шт.
];

// 🔑 БОНУСЫ ОТ КАЧЕСТВА:
export const QUALITY_BONUSES = {
  // Бонусы для оружия ближнего боя
  weapon1: { crit: 0.005, vampir: 0.005, punching: 0.005, accuracy: 0.005, damage: 2, armor: -2 },
  // Бонусы для огнестрельного оружия
  weapon2: {
    crit: 0.005,
    vampir: 0.005,
    punching: 0.005,
    accuracy: 0.005,
    dpsExtro: 2,
    dpsFire: 2,
    dpsEmi: 2,
    dpsToxis: 2,
    damage: 3,
    armor: -3,
  },
  // Бонусы для брони и аксессуаров (включая head, gloves, boots, armor, ammo)
  head: { regen: 0.005, block: 0.005, evasion: 0.005, armor: 0.005, health: 250, damage: -3 },
  armor: { regen: 0.005, block: 0.005, evasion: 0.005, armor: 0.005, health: 250, damage: -3 },
  gloves: { regen: 0.005, block: 0.005, evasion: 0.005, armor: 0.005, health: 250, damage: -3 },
  boots: { regen: 0.005, block: 0.005, evasion: 0.005, armor: 0.005, health: 250, damage: -3 },
  ammo: { regen: 0.005, block: 0.005, evasion: 0.005, armor: 0.005, health: 250, damage: -3 },

  // Бонусы для всех модификаций (mod_*)
  mod: {
    regen: 0.005,
    block: 0.005,
    evasion: 0.005,
    armor: 0.005,
    health: 250,
    damage: -3,
    crit: 0.005,
    vampir: 0.005,
    punching: 0.005,
    accuracy: 0.005,
    dpsExtro: 1,
    dpsFire: 1,
    dpsEmi: 1,
    dpsToxis: 1,
    damage: 2,
    armor: -2,
  },
};

// Чтобы покрыть все слоты модификаций, создаем массив ключей:
export const MOD_SLOTS = [
  'mod_barrel',
  'mod_scope',
  'mod_magazine',
  'mod_muzzle',
  'mod_receiver',
  'mod_stock',
  'mod_blade',
  'mod_handle',
  'mod_pommel',
  'mod_harness',
  'mod_lining',
  'mod_hardshell',
  'mod_utility',
  'mod_patch',
];

// Функция для случайного выбора из массива с учетом весов
const selectByChance = (chances) => {
  const total = Object.values(chances).reduce((sum, chance) => sum + chance, 0);
  let randomValue = Math.random() * total;

  for (const key in chances) {
    randomValue -= chances[key];
    if (randomValue <= 0) return key;
  }
  return Object.keys(chances)[0]; // Fallback
};

// Функция для случайного выбора качества предмета
const getItemQuality = () => {
  const totalChance = QUALITY_TIERS.reduce((sum, tier) => sum + tier.chance, 0);
  let randomValue = Math.random() * totalChance;

  for (const tier of QUALITY_TIERS) {
    randomValue -= tier.chance;
    if (randomValue <= 0) return tier;
  }
  return QUALITY_TIERS[0]; // Fallback (Обычный)
};

export const generateItem = (
  items,
  playerLevel,
  guaranteedRarity = null, // <--- НОВЫЙ ПАРАМЕТР
  guaranteedQualityName = null, // <--- НОВЫЙ ПАРАМЕТР
) => {
  // 1. Определение базовой редкости
  let selectedRarity;
  if (guaranteedRarity && RARITY_CHANCES.hasOwnProperty(guaranteedRarity)) {
    selectedRarity = guaranteedRarity; // Используем гарантированную редкость
  } else {
    selectedRarity = selectByChance(RARITY_CHANCES); // Стандартный случайный выбор
  }

  // 2. Фильтрация предметов и выбор базового предмета
  const filteredItems = items.filter((item) => item.rarity === selectedRarity);

  if (filteredItems.length === 0) {
    console.warn(`Нет предметов с редкостью: ${selectedRarity}. Возвращаем Нож.`);
    const fallbackItem = items.find((i) => i.name === 'Нож');
    if (selectedRarity === 'over') {
      // Если выпала rarity: 'over', которая требует массива
      return Array.from({ length: 1 }, () => ({ ...fallbackItem, id: Date.now() + Math.random() }));
    }

    return {
      ...fallbackItem,
      id: Date.now(),
      // Добавляем качество, чтобы не получить 'undefined' в выводе
      quality: 'Обычный',
      qualityColor: 'white',
    };
  }

  const randomIndex = Math.floor(Math.random() * filteredItems.length);
  const baseItem = filteredItems[randomIndex];

  let generatedItem = {
    ...baseItem,
    id: Date.now() + Math.random(),
    level: playerLevel,
  };

  //// 3. Определение качества предмета
  let quality;
  let qualityTier;

  if (guaranteedQualityName) {
    // Используем гарантированное качество, если оно задано
    qualityTier = QUALITY_TIERS.find((tier) => tier.name === guaranteedQualityName);
  }

  if (qualityTier) {
    quality = qualityTier;
  } else {
    // Стандартный случайный выбор
    quality = getItemQuality();
  }

  // Если гарантированное качество не найдено (или не задано), используем fallback
  if (!quality) {
    quality = QUALITY_TIERS[0]; // Обычный
  }

  generatedItem.quality = quality.name;
  generatedItem.qualityColor = quality.color;
  // 🔑 НОВОЕ: 3.5. Формирование отображаемого имени с качеством и уровнем
  let finalName;

  if (selectedRarity === 'over') {
    // Если rarity: 'over', оставляем только базовое имя
    finalName = baseItem.name;
  } else {
    // Для всех остальных: добавляем качество и уровень
    finalName = `${quality.name} ${baseItem.name} ${playerLevel} ур.`;
  }

  generatedItem.displayName = finalName;
  // 3.6. ПРИНУДИТЕЛЬНОЕ НАЗНАЧЕНИЕ КАРТИНКИ ДЛЯ СЛОТА slot.png
  if (baseItem.name === 'Слот') {
    generatedItem.image = slotIcon;
  }
  // 4. Логика для специальных предметов (rarity: 'over')
  if (selectedRarity === 'over') {
    // Возвращаем предмет N раз, где N = bonusStatsCount
    const count = Math.max(1, quality.bonusStatsCount);

    // Генерируем N копий предмета, каждая с уникальным ID
    const itemsArray = Array.from({ length: count }, (_, index) => ({
      ...generatedItem,
      id: Date.now() + Math.random() + index,
    }));
    return itemsArray;
  }

  // 5. Логика для расходуемых предметов с timeLimit
  if (generatedItem.timeLimit) {
    // timeLimit умножается на timeLimitMultiplier из quality
    const multiplier = quality.timeLimitMultiplier || 1; // Используем новый множитель
    generatedItem.timeLimit = generatedItem.timeLimit * multiplier;

    // Масштабирование базовых статов (шаг 6) все еще применяется
    let finalStats = { ...generatedItem.stats };

    // 6. Масштабирование БАЗОВЫХ статов под уровень игрока
    for (const statKey in finalStats) {
      const originalBaseStat = baseItem.stats[statKey] || 0;

      if (originalBaseStat !== 0) {
        // Упрощенный расчет: Базовый стат * (1 + 0.1 * (Уровень - 1))
        const levelMultiplier = 1 + (playerLevel - 1) * 0.1;
        finalStats[statKey] = originalBaseStat * levelMultiplier;
      }

      // Округляем
      finalStats[statKey] = parseFloat(finalStats[statKey].toFixed(3));
    }

    generatedItem.stats = finalStats;
    return generatedItem;
  }

  // 7. Стандартная логика (броня, оружие, моды) - Применение бонусов качества и масштабирование
  let finalStats = { ...generatedItem.stats };

  let slotKey;
  if (generatedItem.slot.startsWith('mod_')) {
    slotKey = 'mod';
  } else if (generatedItem.slot.startsWith('ammo')) {
    slotKey = 'ammo';
  } else {
    slotKey = generatedItem.slot;
  }

  const bonusSource = QUALITY_BONUSES[slotKey] || {};
  const bonusKeys = Object.keys(bonusSource);

  for (let i = 0; i < quality.bonusStatsCount; i++) {
    if (bonusKeys.length === 0) break;

    const randomStatKey = bonusKeys[Math.floor(Math.random() * bonusKeys.length)];
    const baseBonusValue = bonusSource[randomStatKey];

    // Масштабирование бонуса под уровень игрока
    const levelMultiplier = 1 + (playerLevel - 1) * 0.1;
    const totalBonus = baseBonusValue * levelMultiplier;

    // Суммируем бонус
    finalStats[randomStatKey] = (finalStats[randomStatKey] || 0) + totalBonus;
  }

  // 7b. Масштабирование БАЗОВЫХ статов под уровень игрока
  for (const statKey in finalStats) {
    const originalBaseStat = baseItem.stats[statKey] || 0;

    // Применяем масштабирование ТОЛЬКО к оригинальным базовым статам.
    // Статы, добавленные бонусами качества, уже масштабированы в п. 7а.
    if (originalBaseStat !== 0) {
      const levelMultiplier = 1 + (playerLevel - 1) * 0.1;

      // Вычисляем levelUpBonus (для чистоты)
      const scaledOriginalStat = originalBaseStat * levelMultiplier;
      const levelUpBonus = scaledOriginalStat - originalBaseStat;

      // Применяем levelUpBonus к текущему значению, которое уже включает бонусы качества.
      finalStats[statKey] += levelUpBonus;
    }

    // Округляем для финального предмета
    finalStats[statKey] = parseFloat(finalStats[statKey].toFixed(3));
  }

  // 8. Финальное обновление и возврат
  generatedItem.stats = finalStats;
  return generatedItem;
};

export const items = [
  {
    name: 'Обычные патроны',
    rarity: 'normal', // 👈 Исправлено
    slot: 'ammo',
    damage: 'normal',
    stats: {},
    timeLimit: 30,
    image: p2Img,
  },
  {
    name: 'Токсичные патроны',
    rarity: 'normal', // 👈 Исправлено
    slot: 'ammo',
    damage: 'toxis',
    stats: {},
    timeLimit: 30,
    image: p1Img,
  },
  {
    name: 'Разрывные патроны',
    rarity: 'normal', // 👈 Исправлено
    slot: 'ammo',
    damage: 'extro',
    stats: {},
    timeLimit: 30,
    image: p4Img,
  },
  { name: 'ЭМИ патроны', rarity: 'normal', slot: 'ammo', damage: 'emi', stats: {}, image: p3Img }, // 👈 Исправлено

  {
    name: 'Бинт из тряпки',
    rarity: 'normal', // 👈 Исправлено
    slot: 'ammo',
    type: 'consumable',
    stats: { regen: 1 },
    timeLimit: 30,
    image: a5Icon,
  },
  {
    name: 'Аптечка экстренная',
    rarity: 'superepic', // 👈 Исправлено
    slot: 'ammo',
    type: 'consumable',
    stats: { regen: 3 },
    timeLimit: 3,
    image: a5Icon,
  },
  {
    name: 'Аптечка экстренная',
    rarity: 'superepic', // 👈 Исправлено
    slot: 'ammo',
    type: 'consumable',
    stats: { regen: 3 },
    timeLimit: 3,
    image: a5Icon,
  },
  {
    name: 'Аптечка экстренная',
    rarity: 'superepic', // 👈 Исправлено
    slot: 'ammo',
    type: 'consumable',
    stats: { regen: 3 },
    timeLimit: 3,
    image: a5Icon,
  },
  {
    name: 'Аптечка экстренная',
    rarity: 'superepic', // 👈 Исправлено
    slot: 'ammo',
    type: 'consumable',
    stats: { regen: 3 },
    timeLimit: 3,
    image: a5Icon,
  },
  {
    name: 'Энергетический батончик',
    rarity: 'normal', // 👈 Исправлено
    slot: 'ammo',
    type: 'consumable',
    stats: { stamina: 0.01 },
    timeLimit: 20,
    image: DEFAULT_ICON,
  },
  {
    name: 'Рацион выжившего',
    rarity: 'epic', // 👈 Исправлено
    slot: 'ammo',
    type: 'consumable',
    stats: { regen: 2 },
    timeLimit: 30,
    image: DEFAULT_ICON,
  }, // 🔪 Оружие

  {
    name: 'Нож',
    rarity: 'normal', // 👈 Исправлено
    slot: 'weapon1',
    stats: { damage: 4, crit: 0.01 },
    image: knifeIcon,
    mods: {},
  },
  {
    name: 'Мачето',
    rarity: 'normal', // 👈 Исправлено
    slot: 'weapon1',
    stats: { damage: 5 },
    image: a7Icon,
    mods: {},
  },
  {
    name: 'Koch USP',
    rarity: 'normal', // 👈 Исправлено
    slot: 'weapon2',
    stats: { damage: 6 },
    image: a8Icon,
    mods: {},
  },
  {
    name: 'Пистолет Макарова',
    rarity: 'normal', // 👈 Исправлено
    slot: 'weapon2',
    stats: { damage: 5, crit: 0.01 },
    image: pistolIcon,
    mods: {},
  },
  {
    name: 'Автомат АК-74',
    rarity: 'epic', // 👈 Исправлено
    slot: 'weapon2',
    stats: { damage: 10, speed: 0.01, crit: 0.01 },
    image: ak47Icon,
    mods: {},
  },
  {
    name: 'ППС',
    rarity: 'normal', // 👈 Исправлено
    slot: 'weapon2',
    stats: { damage: 4, speed: 0.05, crit: -0.01 },
    image: leeIcon,
    mods: {},
  },
  {
    name: 'Узи',
    rarity: 'normal', // 👈 Исправлено
    slot: 'weapon2',
    stats: { damage: 3, speed: 0.05 },
    image: tec9,
    mods: {},
  },
  {
    name: 'РПГ',
    rarity: 'superepic', // 👈 Исправлено
    slot: 'weapon2',
    stats: { damage: 15, speed: -0.005 },
    image: gen5Icon,
    mods: {},
  }, // модификации

  {
    name: 'Улучшенный ствол',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_barrel', // 👈 Исправлено: убран лишний пробел
    type: 'mod',
    stats: { punching: 0.01 },
    image: a14Icon,
  },
  {
    name: 'Голографический прицел',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_scope', // 👈 Исправлено: убран лишний пробел
    type: 'mod',
    stats: { accuracy: 0.01 },
    image: a10Icon,
  },
  {
    name: 'Ускоренный магазин',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_magazine', // 👈 Исправлено: убран лишний пробел
    type: 'mod',
    stats: { speed: 0.01 },
    image: a9Icon,
  },
  {
    name: 'Пламегаситель',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_muzzle', // 👈 Исправлено: убран лишний пробел
    type: 'mod',
    stats: { damage: 1 },
    image: a11Icon,
  }, // Слот: Ресивер / Ствольная коробка (mod_receiver)
  {
    name: 'Улучшенный ресивер',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_receiver',
    type: 'mod',
    stats: { speed: 0.005, damage: 0.5 },
    image: a12Icon,
  },
  {
    name: 'Тактический механизм',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_receiver',
    type: 'mod',
    stats: { speed: 0.005, damage: 0.5 },
    image: DEFAULT_ICON,
  },
  {
    name: 'Усиленный затвор',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_receiver', // 👈 Исправлено: убран лишний пробел
    type: 'mod',
    stats: { speed: 0.005, damage: 0.5 },
    image: DEFAULT_ICON,
  }, // Слот: Приклад / Ложа (mod_stock)

  {
    name: 'Снайперский приклад',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_stock',
    type: 'mod',
    stats: { accuracy: 0.005, damage: 0.5 },
    image: DEFAULT_ICON,
  },
  {
    name: 'Демпфер отдачи',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_stock',
    type: 'mod',
    stats: { accuracy: 0.005, damage: 0.5 },
    image: DEFAULT_ICON,
  },
  {
    name: 'Легкий скелетный приклад',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_stock', // 👈 Исправлено: убран лишний пробел
    type: 'mod',
    stats: { accuracy: 0.005, damage: 0.5 },
    image: a13Icon,
  },

  { name: 'Вода', rarity: 'over', slot: 'ammo', type: 'resources', stats: {}, image: r1Icon },
  { name: 'Дерево', rarity: 'over', slot: 'ammo', type: 'resources', stats: {}, image: r4Icon },
  { name: 'Железо', rarity: 'over', slot: 'ammo', type: 'resources', stats: {}, image: r3Icon },
  { name: 'Инструмнты', rarity: 'over', slot: 'ammo', type: 'resources', stats: {}, image: r5Icon },
  { name: 'Гвозди', rarity: 'over', slot: 'ammo', type: 'resources', stats: {}, image: r6Icon },
  { name: 'Пластмасса', rarity: 'over', slot: 'ammo', type: 'resources', stats: {}, image: r7Icon },
  { name: 'Изолента', rarity: 'over', slot: 'ammo', type: 'resources', stats: {}, image: r2Icon }, // 👈 Исправлено
  { name: 'Дерево', rarity: 'over', slot: 'ammo', type: 'resources', stats: {}, image: r4Icon }, // 👈 Исправлено
  { name: 'Железо', rarity: 'over', slot: 'ammo', type: 'resources', stats: {}, image: r3Icon }, // 👈 Исправлено // Слот: Навершие / Лезвие (mod_blade)

  {
    name: 'Боковые шипы',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_blade',
    type: 'mod',
    stats: { damage: 2, block: 0.005 },
    image: DEFAULT_ICON,
  },
  {
    name: 'Скользящая лезвийная планка',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_blade',
    type: 'mod',
    stats: { damage: 2, block: 0.005 },
    image: DEFAULT_ICON,
  },
  {
    name: 'Ударный наконечник',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_blade',
    type: 'mod',
    stats: { damage: 2, block: 0.005 },
    image: DEFAULT_ICON,
  },
  {
    name: 'Серрейторная накладка',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_blade', // 👈 Исправлено: убран лишний пробел
    type: 'mod',
    stats: { damage: 2, block: 0.005 },
    image: DEFAULT_ICON,
  }, // Слот: Рукоять / Гарда (mod_handle)

  {
    name: 'Модуль захвата',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_handle',
    type: 'mod',
    stats: { block: 0.005 },
    image: DEFAULT_ICON,
  },
  {
    name: 'Тактическая гарда',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_handle',
    type: 'mod',
    stats: { block: 0.005 },
    image: DEFAULT_ICON,
  },
  {
    name: 'Амортизирующая рукоять',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_handle', // 👈 Исправлено: убран лишний пробел
    type: 'mod',
    stats: { block: 0.005 },
    image: DEFAULT_ICON,
  }, // Слот: Обух / Противовес (mod_pommel)

  {
    name: 'Противовес',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_pommel',
    type: 'mod',
    stats: { damage: 2, speed: -0.01 },
    image: DEFAULT_ICON,
  },
  {
    name: 'Утяжелённый обух',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_pommel',
    type: 'mod',
    stats: { damage: 2, speed: -0.01 },
    image: DEFAULT_ICON,
  },
  {
    name: 'Утяжелитель',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_pommel', // 👈 Исправлено: убран лишний пробел
    type: 'mod',
    stats: { damage: 2, speed: -0.01 },
    image: DEFAULT_ICON,
  }, // Слот: Крепление / Подвеска (mod_harness)

  {
    name: 'Гарпунная вставка',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_harness',
    type: 'mod',
    stats: { damage: 1 },
    image: DEFAULT_ICON,
  },
  {
    name: 'Цепной ремень',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_harness', // 👈 Исправлено: убран лишний пробел
    type: 'mod',
    stats: { damage: 1 },
    image: DEFAULT_ICON,
  }, // Слот: Подкладка / Слой (mod_lining)

  {
    name: 'Теплоизоляционная подкладка',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_lining',
    type: 'mod',
    stats: { armor: 1 },
    image: DEFAULT_ICON,
  },
  {
    name: 'Мягкий демпфер',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_lining', // 👈 Исправлено: убран лишний пробел
    type: 'mod',
    stats: { armor: 1 },
    image: DEFAULT_ICON,
  }, // Слот: Внешняя накладка (mod_hardshell)

  {
    name: 'Керамическая пластина',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_hardshell', // 👈 Исправлено: убран лишний пробел
    type: 'mod',
    stats: { evasion: 0.005 },
    image: DEFAULT_ICON,
  },
  {
    name: 'Композитная сетка',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_hardshell', // 👈 Исправлено: убран лишний пробел
    type: 'mod',
    stats: { evasion: 0.005 },
    image: DEFAULT_ICON,
  }, // Слот: Система / Гаджет (mod_utility)

  {
    name: 'Встроенный радар',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_utility',
    type: 'mod',
    stats: { regen: 0.01, speed: -0.01 },
    image: DEFAULT_ICON,
  },
  {
    name: 'Система рециркуляции',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_utility', // 👈 Исправлено: убран лишний пробел
    type: 'mod',
    stats: { regen: 0.01, speed: -0.01 },
    image: DEFAULT_ICON,
  }, // Слот: Усиление / Заклёпка (mod_patch)

  {
    name: 'Баллистическая заплатка',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_patch',
    type: 'mod',
    stats: { armor: 1.2 },
    image: DEFAULT_ICON,
  },
  {
    name: 'Облегченный каркас',
    rarity: 'epic', // 👈 Исправлено
    slot: 'mod_patch',
    type: 'mod',
    stats: { armor: 1.2 },
    image: DEFAULT_ICON,
  }, // 🛡️ Новая броня и аксессуары (по твоим параметрам)

  {
    name: 'Шлем стража',
    rarity: 'normal', // 👈 Исправлено
    slot: 'head',
    stats: { block: 0.005, armor: 2 },
    image: helmetIronIcon,
  },
  {
    name: 'Шлем агрессора',
    rarity: 'epic', // 👈 Исправлено
    slot: 'head',
    stats: { block: 0.005, armor: 2, damage: 1 },
    image: helmetIronIcon,
  },
  {
    name: 'Шлем меткого снайпера',
    rarity: 'epic', // 👈 Исправлено
    slot: 'head',
    stats: { block: 0.005, armor: 3 },
    image: helmetIronIcon,
  },

  { name: 'Кираса', rarity: 'normal', slot: 'armor', stats: { armor: 3 }, image: DEFAULT_ICON }, // 👈 Исправлено
  {
    name: 'Энергетическая броня',
    rarity: 'epic', // 👈 Исправлено
    slot: 'armor',
    stats: { evasion: 0.01, armor: 3 },
    image: a2Icon,
  },

  {
    name: 'Боевые перчатки',
    rarity: 'normal', // 👈 Исправлено
    slot: 'gloves',
    stats: { regen: 0.01, armor: 1 },
    image: a3Icon,
  },

  {
    name: 'Тяжёлые сапоги',
    rarity: 'normal', // 👈 Исправлено
    slot: 'boots',
    stats: { evasion: -0.1, armor: 5 },
    image: a4Icon,
  },

  {
    name: 'Пояс выжившего',
    rarity: 'normal', // 👈 Исправлено
    slot: 'ammo',
    stats: { regen: 0.01 },
    image: DEFAULT_ICON,
  },

  {
    name: 'Перчатки молнии',
    rarity: 'epic', // 👈 Исправлено
    slot: 'gloves',
    stats: { evasion: 0.005, armor: 1 },
    image: DEFAULT_ICON,
  },

  {
    name: 'Сапоги охотника',
    rarity: 'normal', // 👈 Исправлено
    slot: 'boots',
    stats: { block: 0.005, armor: 2 },
    image: DEFAULT_ICON,
  },

  {
    name: 'Амулет защиты',
    rarity: 'normal',
    slot: 'ammo',
    stats: { armor: 2 },
    image: DEFAULT_ICON,
  }, // 👈 Исправлено
  // 1. Костяной шлем (head)
  {
    name: 'Костяной шлем',
    rarity: 'epic',
    slot: 'head',
    // Дает много здоровья, но немного снижает меткость из-за неудобного обзора
    stats: { health: 15, accuracy: -0.005 },
    image: gemini1Icon,
    set: 'Кости мутантов', // Ключ для набора
  },
  // 2. Костяной нагрудник болотника (armor)
  {
    name: 'Костяной нагрудник болотника',
    rarity: 'epic',
    slot: 'armor',
    // Основной бонус к здоровью, но делает персонажа медленным и громоздким
    stats: { health: 35, speed: -0.02 },
    image: gen2Icon,
    set: 'Кости мутантов',
  },
  // 3. Ботинки из черепа (boots)
  {
    name: 'Ботинки из черепа',
    rarity: 'epic',
    slot: 'boots',
    // Здоровье и небольшой бонус к блоку, но тяжелые
    stats: { health: 10, block: 0.005 },
    image: DEFAULT_ICON,
    set: 'Кости мутантов',
  },
  // 4. Наручи из костей (gloves)
  {
    name: 'Наручи из костей',
    rarity: 'epic',
    slot: 'gloves',
    // Здоровье и хороший реген, но слегка мешают уклонению
    stats: { health: 5, regen: 0.01, evasion: -0.005 },
    image: DEFAULT_ICON,
    set: 'Кости мутантов',
  },

  // 5. Костяная булава (weapon1 - ближний бой)
  {
    name: 'Костяная булава',
    rarity: 'epic',
    slot: 'weapon1',
    // Высокий урон, вампиризм и яд (Toxis DPS), но низкая скорость удара
    stats: { damage: 9, dpsToxis: 0.5, vampir: 0.01, speed: -0.01 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Кости мутантов',
  },
  // 6. Костяной щит (ammo / utility slot)
  {
    name: 'Костяной щит',
    rarity: 'epic',
    slot: 'ammo', // Используем 'ammo' как временный слот для аксессуара/щита
    // Дает броню и блок (как у щита), но снижает скорость (тяжелый)
    stats: { armor: 5, block: 0.01, speed: -0.005 },
    image: DEFAULT_ICON,
    set: 'Кости мутантов',
  },
  // 7. Костяной талисман (ammo / utility slot)
  {
    name: 'Костяной талисман',
    rarity: 'epic',
    slot: 'ammo', // Используем 'ammo' как временный слот для аксессуара/амулета
    // Дает регенерацию и дополнительное здоровье
    stats: { regen: 0.015, health: 10 },
    image: gen4Icon,
    set: 'Кости мутантов',
  },
  // 8. Костяной лук (weapon2 - дальний бой)
  {
    name: 'Костяной лук',
    rarity: 'epic',
    slot: 'weapon2',
    // Урон, яд и крит, но медленная стрельба
    stats: { damage: 8, dpsToxis: 0.4, crit: 0.01, speed: -0.005 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Кости мутантов',
  },
  // 9. Костяной арбалет (weapon2 - дальний бой)
  {
    name: 'Костяной арбалет',
    rarity: 'epic',
    slot: 'weapon2',
    // Высокий урон и яд, но очень медленная перезарядка
    stats: { damage: 12, dpsToxis: 0.3, speed: -0.02 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Кости мутантов',
  },
  // 1. Костяной шлем (head)
  {
    name: 'Костяной шлем',
    rarity: 'normal',
    slot: 'head',
    // Только базовое здоровье
    stats: { health: 5 },
    image: DEFAULT_ICON,
    set: 'Кости мутантов',
  },
  // 2. Костяной нагрудник болотника (armor)
  {
    name: 'Костяной нагрудник болотника',
    rarity: 'normal',
    slot: 'armor',
    // Основной бонус к здоровью и небольшой штраф к скорости
    stats: { health: 15, speed: -0.005 },
    image: DEFAULT_ICON,
    set: 'Кости мутантов',
  },
  // 3. Ботинки из черепа (boots)
  {
    name: 'Ботинки из черепа',
    rarity: 'normal',
    slot: 'boots',
    // Базовое здоровье
    stats: { health: 5 },
    image: DEFAULT_ICON,
    set: 'Кости мутантов',
  },
  // 4. Наручи из костей (gloves)
  {
    name: 'Наручи из костей',
    rarity: 'normal',
    slot: 'gloves',
    // Здоровье и небольшой реген
    stats: { health: 2, regen: 0.005 },
    image: DEFAULT_ICON,
    set: 'Кости мутантов',
  },

  // 5. Костяная булава (weapon1 - ближний бой)
  {
    name: 'Костяная булава',
    rarity: 'normal',
    slot: 'weapon1',
    // Базовый урон и очень маленький DPS Toxis
    stats: { damage: 5, dpsToxis: 0.1, speed: -0.001 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Кости мутантов',
  },
  // 6. Костяной щит (ammo / utility slot)
  {
    name: 'Костяной щит',
    rarity: 'normal',
    slot: 'ammo',
    // Дает броню (поскольку вы просили, чтобы щит давал броню) и блок
    stats: { armor: 3, block: 0.005 },
    image: DEFAULT_ICON,
    set: 'Кости мутантов',
  },
  // 7. Костяной талисман (ammo / utility slot)
  {
    name: 'Костяной талисман',
    rarity: 'normal',
    slot: 'ammo',
    // Базовый реген
    stats: { regen: 0.01 },
    image: DEFAULT_ICON,
    set: 'Кости мутантов',
  },
  // 8. Костяной лук (weapon2 - дальний бой)
  {
    name: 'Костяной лук',
    rarity: 'normal',
    slot: 'weapon2',
    // Базовый урон и маленький крит
    stats: { damage: 6, crit: 0.005 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Кости мутантов',
  },
  // 9. Костяной арбалет (weapon2 - дальний бой)
  {
    name: 'Костяной арбалет',
    rarity: 'normal',
    slot: 'weapon2',
    // Хороший урон для Normal, но заметный штраф к скорости (медленное заряжание)
    stats: { damage: 8, speed: -0.015 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Кости мутантов',
  },

  // 1. Маска (head)
  {
    name: 'Маска бандита',
    rarity: 'normal',
    slot: 'head',
    // Небольшая броня и уклон
    stats: { armor: 1, evasion: 0.005 },
    image: DEFAULT_ICON,
    set: 'Бандиты', // Ключ для набора
  },
  // 2. Куртка (armor)
  {
    name: 'Куртка бандита',
    rarity: 'normal',
    slot: 'armor',
    // Основной уклон и небольшой бонус к здоровью
    stats: { evasion: 0.015, health: 10 },
    image: DEFAULT_ICON,
    set: 'Бандиты',
  },
  // 3. Берцы (boots)
  {
    name: 'Берцы бандита',
    rarity: 'normal',
    slot: 'boots',
    // Уклон и небольшой штраф к скорости (тяжелые ботинки)
    stats: { evasion: 0.005, speed: -0.005 },
    image: DEFAULT_ICON,
    set: 'Бандиты',
  },
  // 4. Перчатки (gloves)
  {
    name: 'Перчатки бандита',
    rarity: 'normal',
    slot: 'gloves',
    // Уклон и небольшой бонус к криту
    stats: { evasion: 0.005, crit: 0.005 },
    image: DEFAULT_ICON,
    set: 'Бандиты',
  },

  // --- Расходные материалы (consumables) ---

  // 5. Бутылка водки (ammo / consumable)
  {
    name: 'Бутылка водки',
    rarity: 'normal',
    slot: 'ammo',
    type: 'consumable',
    // Большой, но временный бонус к здоровью и блоку, и сильный штраф к точности
    stats: { health: 500, block: 0.1, accuracy: -0.1 }, // health/block — очень большие, но временные бонусы
    timeLimit: 30, // 30 секунд действия
    image: DEFAULT_ICON,
    set: 'Бандиты',
  },
  // 6. Гитара (ammo / utility slot)
  {
    name: 'Гитара',
    rarity: 'normal',
    slot: 'ammo',
    type: 'consumable',
    // Пассивный эффект (нет timeLimit) — увеличение пробивания
    stats: { punching: 0.01 },
    image: DEFAULT_ICON,
    set: 'Бандиты',
  },
  // 7. Сигареты (ammo / consumable)
  {
    name: 'Сигареты',
    rarity: 'normal',
    slot: 'ammo',
    type: 'consumable',
    // Увеличение урона на 20 (большой, но временный)
    stats: { damage: 20 },
    timeLimit: 30, // 30 секунд действия
    image: DEFAULT_ICON,
    set: 'Бандиты',
  },

  // --- Оружие ---

  // 8. Топор (weapon1 - ближний бой)
  {
    name: 'Топор бандита',
    rarity: 'normal',
    slot: 'weapon1',
    // Урон и пробивание (рубящий)
    stats: { damage: 6, punching: 0.005 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Бандиты',
  },
  // 9. Старый АК-47 (weapon2 - дальний бой)
  {
    name: 'Старый АК-47',
    rarity: 'normal',
    slot: 'weapon2',
    // Урон и штраф к точности (старый, изношенный)
    stats: { damage: 8, accuracy: -0.005 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Бандиты',
  },
  // 10. Старый пистолет Макарова (weapon2 - дальний бой)
  {
    name: 'Старый пистолет Макарова',
    rarity: 'normal',
    slot: 'weapon2',
    // Урон и уклон (легкий пистолет)
    stats: { damage: 5, evasion: 0.005 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Бандиты',
  },
  // 11. Обрез (дробовик) (weapon2 - дальний бой)
  {
    name: 'Обрез (дробовик)',
    rarity: 'normal',
    slot: 'weapon2',
    // Высокий урон, но сильный штраф к точности
    stats: { damage: 10, accuracy: -0.005 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Бандиты',
  },
  {
    name: 'Визор "Циклоп"',
    rarity: 'epic',
    slot: 'head',
    stats: { armor: 4, block: 0.005, speed: -0.005 },
    image: DEFAULT_ICON,
    set: 'Монолит',
  },
  {
    name: 'Тактический каркас',
    rarity: 'epic',
    slot: 'armor',
    stats: { armor: 10, block: 0.005, evasion: -0.002 },
    image: DEFAULT_ICON,
    set: 'Монолит',
  },
  {
    name: 'Утяжелённые ступни',
    rarity: 'epic',
    slot: 'boots',
    stats: { armor: 3, block: 0.001, speed: -0.001 },
    image: DEFAULT_ICON,
    set: 'Монолит',
  },
  {
    name: 'Захваты "Тиски"',
    rarity: 'epic',
    slot: 'gloves',
    stats: { armor: 2, block: 0.005, accuracy: -0.001 },
    image: DEFAULT_ICON,
    set: 'Монолит',
  },
  {
    name: 'Тяжёлый тесак',
    rarity: 'epic',
    slot: 'weapon1',
    stats: { damage: 10, block: 0.001, speed: -0.001 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Монолит',
  },
  {
    name: 'Штурмовая винтовка "Барьер"',
    rarity: 'epic',
    slot: 'weapon2',
    stats: { damage: 12, block: 0.005, accuracy: -0.002 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Монолит',
  },
  {
    name: 'Дробовик "Осада"',
    rarity: 'epic',
    slot: 'weapon2',
    stats: { damage: 15, speed: -0.002 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Монолит',
  },
  {
    name: 'Пистолет "Арбитр"',
    rarity: 'epic',
    slot: 'weapon2',
    stats: { damage: 7, block: 0.005, speed: -0.005 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Монолит',
  },
  // Ammo - 3 расходника (timeLimit: 30)
  {
    name: 'Паёк длительного хранения',
    rarity: 'epic',
    slot: 'ammo',
    type: 'consumable',
    stats: { regen: 1, speed: -0.007 },
    timeLimit: 600,
    image: DEFAULT_ICON,
    set: 'Монолит',
  },
  {
    name: 'Стимулятор "Форсаж"',
    rarity: 'epic',
    slot: 'ammo',
    type: 'consumable',
    stats: { block: 0.01, accuracy: -0.005 },
    timeLimit: 600,
    image: DEFAULT_ICON,
    set: 'Монолит',
  },
  {
    name: 'Медицинский наногель',
    rarity: 'epic',
    slot: 'ammo',
    type: 'consumable',
    stats: { armor: 5, health: 10 },
    timeLimit: 600,
    image: DEFAULT_ICON,
    set: 'Монолит',
  },
  // Ammo - 5 утилит (без timeLimit и без type)
  {
    name: 'Маяк для эвакуации',
    rarity: 'epic',
    slot: 'ammo',
    stats: { evasion: -0.005, block: 0.005 },
    image: DEFAULT_ICON,
    set: 'Монолит',
  },
  {
    name: 'Сигнальная ракета',
    rarity: 'epic',
    slot: 'ammo',
    stats: { accuracy: -0.01, crit: 0.01 },
    image: DEFAULT_ICON,
    set: 'Монолит',
  },
  {
    name: 'Усиленный бронелист',
    rarity: 'epic',
    slot: 'ammo',
    stats: { armor: 10, speed: -0.01 },
    image: DEFAULT_ICON,
    set: 'Монолит',
  },
  {
    name: 'Связка гранат',
    rarity: 'epic',
    slot: 'ammo',
    stats: { damage: 50, accuracy: -0.01 },
    type: 'consumable',
    timeLimit: 60,
    image: DEFAULT_ICON,
    set: 'Монолит',
  },
  {
    name: 'Маскировочная сеть',
    rarity: 'epic',
    slot: 'ammo',
    stats: { evasion: 0.01, speed: -0.005 },
    image: DEFAULT_ICON,
    set: 'Монолит',
  },

  // --- 🤖 2. СЕТ: Эхо (Робот) - RARITY: epic ---
  // Экипировка (type не нужен, так как не ammo)
  {
    name: 'Оптический узел',
    rarity: 'epic',
    slot: 'head',
    stats: { accuracy: 0.015, regen: 0.008, armor: 3 },
    image: DEFAULT_ICON,
    set: 'Эхо',
  },
  {
    name: 'Адаптивный контур',
    rarity: 'epic',
    slot: 'armor',
    stats: { armor: 3, regen: 0.02, accuracy: 0.01, block: -0.01 },
    image: DEFAULT_ICON,
    set: 'Эхо',
  },
  {
    name: 'Сервоприводы',
    rarity: 'epic',
    slot: 'boots',
    stats: { speed: 0.008, evasion: 0.005, armor: 1 },
    image: DEFAULT_ICON,
    set: 'Эхо',
  },
  {
    name: 'Тактильные сенсоры',
    rarity: 'epic',
    slot: 'gloves',
    stats: { accuracy: 0.005, crit: 0.008, regen: 0.005 },
    image: DEFAULT_ICON,
    set: 'Эхо',
  },
  {
    name: 'Электрический хлыст',
    rarity: 'epic',
    slot: 'weapon1',
    stats: { damage: 8, dpsEmi: 0.5, block: -0.005 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Эхо',
  },
  {
    name: 'Лазерный маркер',
    rarity: 'epic',
    slot: 'weapon2',
    stats: { damage: 10, dpsEmi: 0.3, accuracy: 0.01 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Эхо',
  },
  {
    name: 'Плазменный излучатель',
    rarity: 'epic',
    slot: 'weapon2',
    stats: { damage: 14, dpsFire: 0.4, speed: -0.008 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Эхо',
  },
  {
    name: 'Снайперская винтовка "Предел"',
    rarity: 'epic',
    slot: 'weapon2',
    stats: { damage: 16, accuracy: 0.02, speed: -0.008 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Эхо',
  },
  // Ammo - 2 расходника (timeLimit: 30)
  {
    name: 'Саморегенерирующий инъектор',
    rarity: 'epic',
    slot: 'ammo',
    type: 'consumable',
    stats: { regen: 5, armor: -5 },
    timeLimit: 180,
    image: DEFAULT_ICON,
    set: 'Эхо',
  },
  {
    name: 'Калибровочный раствор',
    rarity: 'epic',
    slot: 'ammo',
    type: 'consumable',
    stats: { accuracy: 0.01, evasion: -0.008 },
    timeLimit: 6000,
    image: DEFAULT_ICON,
    set: 'Эхо',
  },
  // Ammo - 10 утилит (без timeLimit и без type)
  {
    name: 'Антивирусный чип',
    rarity: 'epic',
    slot: 'ammo',
    stats: { regen: 0.02, accuracy: 0.01, armor: -1 },
    image: DEFAULT_ICON,
    set: 'Эхо',
  },
  {
    name: 'Ремонтный модуль',
    rarity: 'epic',
    slot: 'ammo',
    stats: { regen: 0.03, health: -5 },
    image: DEFAULT_ICON,
    set: 'Эхо',
  },
  {
    name: 'Комплект датчиков',
    rarity: 'epic',
    slot: 'ammo',
    stats: { accuracy: 0.02, crit: 0.005 },
    image: DEFAULT_ICON,
    set: 'Эхо',
  },
  {
    name: 'Батарея повышенной ёмкости',
    rarity: 'epic',
    slot: 'ammo',
    stats: { health: 10, speed: 0.005 },
    image: DEFAULT_ICON,
    set: 'Эхо',
  },
  {
    name: 'Термокатализатор',
    rarity: 'epic',
    slot: 'ammo',
    stats: { dpsFire: 5, speed: -0.005 },
    image: DEFAULT_ICON,
    set: 'Эхо',
  },
  {
    name: 'Мини-генератор ЭМИ',
    rarity: 'epic',
    slot: 'ammo',
    stats: { dpsEmi: 5, regen: -0.005 },
    image: DEFAULT_ICON,
    set: 'Эхо',
  },
  {
    name: 'Сканер уязвимостей',
    rarity: 'epic',
    slot: 'ammo',
    stats: { punching: 0.01, accuracy: 0.005 },
    image: DEFAULT_ICON,
    set: 'Эхо',
  },
  {
    name: 'Голографический приманка',
    rarity: 'epic',
    slot: 'ammo',
    stats: { evasion: 0.015, block: -0.005 },
    image: DEFAULT_ICON,
    set: 'Эхо',
  },
  {
    name: 'Усилитель сигнала',
    rarity: 'epic',
    slot: 'ammo',
    stats: { accuracy: 0.01, health: 5 },
    image: DEFAULT_ICON,
    set: 'Эхо',
  },
  {
    name: 'Магнитная ловушка',
    rarity: 'epic',
    slot: 'ammo',
    stats: { block: 0.01, speed: -0.005 },
    image: DEFAULT_ICON,
    set: 'Эхо',
  },
  {
    name: 'Шлем "Возрождение"',
    rarity: 'superepic',
    slot: 'head',
    stats: { armor: 6, regen: 0.025, accuracy: 0.01, speed: -0.01 },
    image: DEFAULT_ICON,
    set: 'Феникс',
  },
  {
    name: 'Кираса "Бессмертие"',
    rarity: 'superepic',
    slot: 'armor',
    stats: { armor: 15, block: 0.03, evasion: -0.03, health: 50 },
    image: DEFAULT_ICON,
    set: 'Феникс',
  },
  {
    name: 'Ботинки "Немезида"',
    rarity: 'superepic',
    slot: 'boots',
    stats: { armor: 4, block: 0.015, speed: -0.015, evasion: -0.01 },
    image: DEFAULT_ICON,
    set: 'Феникс',
  },
  {
    name: 'Наручи "Взрыв"',
    rarity: 'superepic',
    slot: 'gloves',
    stats: { armor: 3, crit: 0.02, damage: 3 },
    image: DEFAULT_ICON,
    set: 'Феникс',
  },

  // --- Оружие Ближнего Боя (weapon1) - 5 шт. ---
  {
    name: 'Катана "Резчик Душ"',
    rarity: 'superepic',
    slot: 'weapon1',
    stats: { damage: 15, crit: 0.03, speed: 0.005 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Феникс',
  },
  {
    name: 'Боевые когти "Грифон"',
    rarity: 'superepic',
    slot: 'weapon1',
    stats: { damage: 12, vampir: 0.015, evasion: 0.005 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Феникс',
  },
  {
    name: 'Цепной меч "Инквизитор"',
    rarity: 'superepic',
    slot: 'weapon1',
    stats: { damage: 18, punching: 0.02, speed: -0.01 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Феникс',
  },
  {
    name: 'Энергетическое копьё',
    rarity: 'superepic',
    slot: 'weapon1',
    stats: { damage: 20, block: 0.01, speed: -0.02 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Феникс',
  },
  {
    name: 'Клинки-бумеранги',
    rarity: 'superepic',
    slot: 'weapon1',
    stats: { damage: 10, accuracy: 0.02, crit: 0.015 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Феникс',
  },

  // --- Оружие Дальнего Боя (weapon2) - 10 шт. ---
  {
    name: 'Снайперская винтовка "Оракул"',
    rarity: 'superepic',
    slot: 'weapon2',
    stats: { damage: 25, accuracy: 0.03, speed: -0.03 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Феникс',
  },
  {
    name: 'Импульсный автомат "Заря"',
    rarity: 'superepic',
    slot: 'weapon2',
    stats: { damage: 18, speed: 0.01, crit: 0.01 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Феникс',
  },
  {
    name: 'Огнемет "Очиститель"',
    rarity: 'superepic',
    slot: 'weapon2',
    stats: { damage: 15, dpsFire: 1.0, speed: -0.01 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Феникс',
  },
  {
    name: 'Плазменная пушка "Квант"',
    rarity: 'superepic',
    slot: 'weapon2',
    stats: { damage: 22, dpsEmi: 0.8, accuracy: -0.01 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Феникс',
  },
  {
    name: 'ЭМ-Базука "Разрушитель"',
    rarity: 'superepic',
    slot: 'weapon2',
    stats: { damage: 30, dpsEmi: 0.5, block: -0.02 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Феникс',
  },
  {
    name: 'Мультилазер "Геенна"',
    rarity: 'superepic',
    slot: 'weapon2',
    stats: { damage: 16, accuracy: 0.01, speed: -0.01 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Феникс',
  },
  {
    name: 'Рельсовая винтовка',
    rarity: 'superepic',
    slot: 'weapon2',
    stats: { damage: 28, punching: 0.03, speed: -0.04 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Феникс',
  },
  {
    name: 'Автоматический гранатомет',
    rarity: 'superepic',
    slot: 'weapon2',
    stats: { damage: 20, block: 0.01, speed: -0.02 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Феникс',
  },
  {
    name: 'Миниган "Террор"',
    rarity: 'superepic',
    slot: 'weapon2',
    stats: { damage: 14, speed: 0.02, accuracy: -0.03 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Феникс',
  },
  {
    name: 'Дробовик "Аннигилятор"',
    rarity: 'superepic',
    slot: 'weapon2',
    stats: { damage: 24, crit: 0.01, accuracy: -0.01 },
    image: DEFAULT_ICON,
    mods: {},
    set: 'Феникс',
  },

  // --- Ammo - Расходники (timeLimit: 30) - 5 шт. ---
  {
    name: 'Сыворотка "Перегрузка"',
    rarity: 'superepic',
    slot: 'ammo',
    type: 'consumable',
    stats: { damage: 30, speed: -0.05, accuracy: -0.05 },
    timeLimit: 30,
    image: DEFAULT_ICON,
    set: 'Феникс',
  },
  {
    name: 'Наноботы-ремонтники',
    rarity: 'superepic',
    slot: 'ammo',
    type: 'consumable',
    stats: { regen: 0.15, armor: 10, evasion: -0.02 },
    timeLimit: 30,
    image: DEFAULT_ICON,
    set: 'Феникс',
  },
  {
    name: 'Капсула "Критикус"',
    rarity: 'superepic',
    slot: 'ammo',
    type: 'consumable',
    stats: { crit: 0.1, accuracy: 0.05 },
    timeLimit: 30,
    image: DEFAULT_ICON,
    set: 'Феникс',
  },
  {
    name: 'Экзотический паёк',
    rarity: 'superepic',
    slot: 'ammo',
    type: 'consumable',
    stats: { health: 100, block: 0.05 },
    timeLimit: 30,
    image: DEFAULT_ICON,
    set: 'Феникс',
  },
  {
    name: 'Активатор стамины',
    rarity: 'superepic',
    slot: 'ammo',
    type: 'consumable',
    stats: { stamina: 0.05, speed: 0.02, health: 10 },
    timeLimit: 30,
    image: DEFAULT_ICON,
    set: 'Феникс',
  },

  // --- Ammo - Утилиты (без timeLimit и без type) - 5 шт. ---
  {
    name: 'Генератор защитного поля',
    rarity: 'superepic',
    slot: 'ammo',
    stats: { armor: 12, block: 0.01, speed: -0.01 },
    image: DEFAULT_ICON,
    set: 'Феникс',
  },
  {
    name: 'Тактический сканер',
    rarity: 'superepic',
    slot: 'ammo',
    stats: { accuracy: 0.02, crit: 0.01, evasion: -0.005 },
    image: DEFAULT_ICON,
    set: 'Феникс',
  },
  {
    name: 'Модуль энергетической отдачи',
    rarity: 'superepic',
    slot: 'ammo',
    stats: { damage: 5, regen: 0.01 },
    image: DEFAULT_ICON,
    set: 'Феникс',
  },
  {
    name: 'Реактивный ранец (Активируемый)',
    rarity: 'superepic',
    slot: 'ammo',
    stats: { speed: 0.03, armor: -5 },
    image: DEFAULT_ICON,
    set: 'Феникс',
  },
  {
    name: 'Амулет удачи',
    rarity: 'superepic',
    slot: 'ammo',
    stats: { crit: 0.025, health: 25 },
    image: DEFAULT_ICON,
    set: 'Феникс',
  },
];
