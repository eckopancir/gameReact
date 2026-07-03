const ENEMY_TYPES = {
  //...
  bandit1Img: {
    name: 'Бандиты',
    // ...
    expReward: 300,
  },
  //...
  robotsImg: {
    // 💡 Должен быть такой ключ, если вы используете его
    name: 'Роботы',
    // ...
    expReward: 300,
  },
  militaryImg: {
    // 💡 Должен быть такой ключ
    name: 'Военные',
    // ...
    expReward: 300,
  },
  // 🔑 Добавьте "заглушку" (или другой ключ, используемый по умолчанию)
  default: {
    // Если нет изображения, используем это
    name: 'Неизвестный враг',
    expReward: 300,
  },
};
const COLOR_MAP = {
  white: '255, 255, 255',
  lime: '0, 255, 0',
  deepskyblue: '0, 191, 255',
  mediumpurple: '147, 112, 219',
  red: '255, 0, 0',
  gold: '255, 215, 0',
  cyan: '0, 255, 255',
  // Серый цвет по умолчанию для пустых слотов
  default: '170, 170, 170', // #aaa
};
const MAP_ZONES = [
  { name: 'Наша база', difficulty: 0, className: 'zone-base', allowedFactions: [] },
  { name: 'Болото', difficulty: 60, className: 'zone-swamp', allowedFactions: ['Мутанты'] },
  { name: 'Военная база', difficulty: 75, className: 'zone-factory', allowedFactions: ['Военные'] },
  {
    name: 'Свалка мусора',
    difficulty: 35,
    className: 'zone-forest',
    allowedFactions: ['Бандиты', 'Мутанты', 'Роботы'],
  },
  {
    name: 'Темный лес',
    difficulty: 90,
    className: 'zone-military',
    allowedFactions: ['Мутанты', 'Роботы'],
  },
  { name: 'Базар', difficulty: 20, className: 'zone-market', allowedFactions: [] },
  { name: 'База бандитов', difficulty: 65, className: 'zone-cars', allowedFactions: ['Бандиты'] },
  {
    name: 'Роботы',
    difficulty: 50,
    className: 'zone-dump',
    allowedFactions: ['Мутанты', 'Бандиты'],
  },
  {
    name: 'Старый завод',
    difficulty: 70,
    className: 'zone-village',
    allowedFactions: ['Бандиты', 'Военные', 'Роботы'],
  },
];

const BASE_POINTS = [
  { name: 'Верстаки', level: 1, className: 'base-workbench', upgrading: false, timer: 0 },
  { name: 'Огород', level: 1, className: 'base-garden', upgrading: false, timer: 0 },
  { name: 'Теплица', level: 1, className: 'base-greenhouse', upgrading: false, timer: 0 },
  { name: 'Зона сна', level: 1, className: 'base-sleep', upgrading: false, timer: 0 },
  { name: 'Оружейная', level: 1, className: 'base-weapons', upgrading: false, timer: 0 },
  { name: 'Броня', level: 1, className: 'base-armor', upgrading: false, timer: 0 },
  { name: 'Дом. скот', level: 1, className: 'base-livestock', upgrading: false, timer: 0 },
  { name: 'Медицина', level: 20, className: 'base-medbay', upgrading: false, timer: 0 },
  { name: 'Развлечения', level: 1, className: 'base-fun', upgrading: false, timer: 0 },
  { name: 'Склад', level: 1, className: 'base-gym', upgrading: false, timer: 0 },
  { name: 'Вышка', level: 1, className: 'base-watchtower', upgrading: false, timer: 0 },
];

const factions = ['Мутанты', 'Военные', 'Бандиты', 'Роботы'];
const ITEMS_PER_PAGE = 300;
const TIME_STEP = 10;
const ATTACKS_PER_STEP = 10;
const BLOCK_REDUCTION = 0.9;
const STAMINA_BASE_REGEN_RATE = 0.01; // 1% (0.01)
const STAMINA_HOME_REGEN_RATE = 0.01;
const STAMINA_DRAIN_RATE = 0.01; // 1% (0.01)
const ENCOUNTERS_PER_ZONE = 8; // Всего карточек в зоне
const TIME_PER_CARD = 3; // Время в секундах до встречи
const TIME_TO_RETURN_HOME = 20; // 🆕 НОВАЯ КОНСТАНТА: 20 секунд на возврат
const DEFAULT_ENEMY_STATS = {
  name: 'Враг не найден',
  health: 0,
  stamina: 1,
  armor: 0,
  damage: 0,
  speed: 0,
  regen: 0,
  crit: 0,
  dps: 0,
  evasion: 0,
  block: 0,
  vampir: 0,
  punching: 0,
  accuracy: 1,
  faction: 'None',
};

const AMMO_BONUSES = {
  // Бонус против Мутантов
  toxis: { target: 'Мутанты', multiplier: 0.25, dpsStat: 'dpsToxis' },
  // Бонус против Роботов
  emi: { target: 'Роботы', multiplier: 0.25, dpsStat: 'dpsEmi' },
  // Бонусы против Бандитов и Военных
  normal: { target: ['Бандиты', 'Военные'], multiplier: 0.05, dpsStat: 'dpsExtro' },
  extro: { target: ['Бандиты', 'Военные'], multiplier: 0.1, dpsStat: 'dpsFire' },
};

module.exports = {
  TIME_STEP,
  ATTACKS_PER_STEP,
  BLOCK_REDUCTION,
  STAMINA_BASE_REGEN_RATE,
  STAMINA_HOME_REGEN_RATE,
  STAMINA_DRAIN_RATE,
  ENCOUNTERS_PER_ZONE,
  TIME_PER_CARD,
  TIME_TO_RETURN_HOME,
  factions,
  DEFAULT_ENEMY_STATS,
  ENEMY_TYPES,
  MAP_ZONES,
};
