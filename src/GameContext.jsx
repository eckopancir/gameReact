import React, { useState, useEffect, useRef, useMemo, useCallback, createContext, useContext } from 'react';
import { items } from './items';
import {
  FIREARM_SLOT_POSITIONS,
  COLD_WEAPON_SLOT_POSITIONS,
  ARMOR_MOD_SLOTS,
  generateItem,
  QUALITY_TIERS,
  RARITY_CHANCES,
  QUALITY_BONUSES,
} from './items';
import { ENEMY_BASE_STATS } from './generateEnemy';

import persImg from './assets/Images/characters/pers.png';
import enemyImg from './assets/Images/characters/enemy.png';
import bandit1Img from './assets/Images/characters/bandit1.png';
import mutantImg from './assets/Images/characters/bandit1.png';
import mainImg from './assets/Images/ui/main.png';
import invnImg from './assets/Images/ui/inv.jpg';
import fonImg from './assets/Images/backgrounds/fon.jpg';
import modalImg from './assets/Images/ui/modal.png';
import offImg from './assets/audio/ui/off.mp3';
import onImg from './assets/audio/ui/on.mp3';
import craftImg from './assets/audio/ui/craft.mp3';
import bgMusicImg from './assets/audio/music/track.mp3';
import installImg from './assets/audio/ui/install.mp3';
import MapImg from './assets/Images/map/Map.png';
import military20 from './assets/Images/characters/military20.png';
import military1 from './assets/Images/characters/military1.png';
import military2 from './assets/Images/characters/military2.png';
import military3 from './assets/Images/characters/military3.png';
import military4 from './assets/Images/characters/military4.png';
import military5 from './assets/Images/characters/military5.png';
import military6 from './assets/Images/characters/military6.png';
import military7 from './assets/Images/characters/military7.png';
import bl2 from './assets/Images/battle/bl2.png';
import startbattle from './assets/audio/ui/startbattle.mp3';
import chips from './assets/audio/effects/chips.mp3';
import balans from './assets/Images/ui/balans.png';
import clickbutton from './assets/audio/ui/clickbutton.mp3';
import tooltip from './assets/Images/ui/tooltip.png';
import slotImage from './assets/Images/items/slot.png';
import statsimg from './assets/Images/ui/statsimg.png';
import tank from './assets/Images/characters/tank.png';
import medic from './assets/Images/characters/medic.png';
import melee from './assets/Images/characters/melee.png';
import baseMilitary from './assets/Images/battle/baseMilitary.png';
import scroll from './assets/audio/ui/scroll.mp3';
import arenabattle from './assets/Images/battle/arena.png';
import shotenemy from './assets/audio/effects/shotenemy.mp3';
import EnemyImg from './assets/Images/characters/hero.png';
import m134Snd from './assets/audio/effects/m134.mp3';
import drobSnd from './assets/audio/effects/drob.mp3';
import meleeSnd from './assets/audio/effects/melee.mp3';
import healerSnd from './assets/audio/effects/healer.mp3';
import sniperSnd from './assets/audio/effects/sniper.mp3';
import pistolSnd from './assets/audio/effects/pistol.mp3';
import sniperImg from './assets/Images/characters/sniperImg.png';
import deadImg from './assets/Images/characters/dead.png';

const ENEMY_IMAGES = {
  military1: military1,
  military2: military2,
  military3: military3,
  military4: military4,
  military5: military5,
  military6: military6,
  military7: military7,
};

const MILITARY_ENEMY_KEYS = [
  'Военные (tank)',
  'Военные (melle)',
  'Военные (sniper)',
  'Военные (drob)',
  'Военные (original)',
  'Военные (boss)',
  'Военные (medic)',
];

const ENEMY_TYPES = {
  bandit1Img: { name: 'Бандиты', expReward: 300 },
  robotsImg: { name: 'Роботы', expReward: 300 },
  militaryImg: { name: 'Военные', expReward: 300 },
  default: { name: 'Неизвестный враг', expReward: 300 },
};

const COLOR_MAP = {
  white: '255, 255, 255',
  lime: '0, 255, 0',
  deepskyblue: '0, 191, 255',
  mediumpurple: '147, 112, 219',
  red: '255, 0, 0',
  gold: '255, 215, 0',
  cyan: '0, 255, 255',
  default: '170, 170, 170',
};

const MAP_ZONES = [
  { name: 'Наша база', difficulty: 0, className: 'zone-base', allowedFactions: [] },
  { name: 'Болото', difficulty: 0, className: 'zone-swamp', allowedFactions: ['Мутанты'] },
  { name: 'Военная база', difficulty: 0, className: 'zone-factory', allowedFactions: ['Военные'] },
  { name: 'Свалка мусора', difficulty: 0, className: 'zone-forest', allowedFactions: ['Бандиты', 'Мутанты', 'Роботы'] },
  { name: 'Темный лес', difficulty: 0, className: 'zone-military', allowedFactions: ['Мутанты', 'Роботы'] },
  { name: 'Базар', difficulty: 0, className: 'zone-market', allowedFactions: [] },
  { name: 'База бандитов', difficulty: 0, className: 'zone-cars', allowedFactions: ['Бандиты'] },
  { name: 'Роботы', difficulty: 0, className: 'zone-dump', allowedFactions: ['Мутанты', 'Бандиты'] },
  { name: 'Старый завод', difficulty: 0, className: 'zone-village', allowedFactions: ['Бандиты', 'Военные', 'Роботы'] },
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

const SCROLL_SOUND_DELAY = 300;
const factions = ['Мутанты', 'Военные', 'Бандиты', 'Роботы'];
const ITEMS_PER_PAGE = 88;
const TIME_STEP = 10;
const ATTACKS_PER_STEP = 10;
const BLOCK_REDUCTION = 0.4;
const TIME_TO_REST = 15;
const TIMER_DURATION = 30;
const STAMINA_BASE_REGEN_RATE = 0.01;
const STAMINA_HOME_REGEN_RATE = 0.01;
const STAMINA_DRAIN_RATE = 0.01;
const ENCOUNTERS_PER_ZONE = 8;
const TIME_PER_CARD = 1;
const TOTAL_SLOTS = 11 * 15;
const TIME_TO_RETURN_HOME = 20;
const QUEUE_STORAGE_KEY = 'expeditionQueue';
const CHIPS_STORAGE_KEY = 'cyberpunk_game_data_chips';
const DEFAULT_STARTING_CHIPS = 1000;
const BASE_RARITY_PRICES = {
  over: 10, normal: 15, epic: 30, superepic: 50,
};
const QUALITY_MULTIPLIERS = {
  Обычный: 1, Редкий: 2, Раритетный: 3, Эпический: 5,
  Смертоносный: 8, Легендарный: 10, Божественный: 15,
};
const DEFAULT_ENEMY_STATS = {
  name: 'Враг не найден', health: 0, stamina: 1, armor: 0, damage: 0,
  speed: 0, regen: 0, crit: 0, dps: 0, evasion: 0, block: 0, vampir: 0,
  punching: 0, accuracy: 1, faction: 'None',
};
const AMMO_BONUSES = {
  toxis: { target: 'Мутанты', multiplier: 0.25, dpsStat: 'dpsToxis' },
  emi: { target: 'Роботы', multiplier: 0.25, dpsStat: 'dpsEmi' },
  normal: { target: ['Бандиты', 'Военные'], multiplier: 0.05, dpsStat: 'dpsExtro' },
  extro: { target: ['Бандиты', 'Военные'], multiplier: 0.1, dpsStat: 'dpsFire' },
};

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const loadFromLocalStorage = (key, defaultValue) => {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error(`Ошибка при парсинге ${key}:`, e);
        return defaultValue;
      }
    }
    return defaultValue;
  };

  const lastScrollTime = useRef(0);
  const [logs, setLogs] = useState(() => JSON.parse(localStorage.getItem('logs')) || []);
  const [zones, setZones] = useState(() => JSON.parse(localStorage.getItem('zones')) || []);
  const [currentZone, setCurrentZone] = useState(
    () => JSON.parse(localStorage.getItem('currentZone')) || null,
  );
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [baseHealth, setBaseHealth] = useState(
    () => JSON.parse(localStorage.getItem('baseHealth')) || 20000,
  );
  const [timer, setTimer] = useState(0);
  const [isTraveling, setIsTraveling] = useState(false);
  const [destinationZone, setDestinationZone] = useState(null);
  const [isAtLocation, setIsAtLocation] = useState(false);
  const [isFighting, setIsFighting] = useState(false);
  const [customizationItem, setCustomizationItem] = useState(null);
  const [filterModSlot, setFilterModSlot] = useState('');
  const activeSoundRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [closing, setClosing] = useState(false);
  const [playerCurrentHp, setPlayerCurrentHpState] = useState(() => {
    const storedHp = localStorage.getItem('playerCurrentHp');
    if (storedHp !== null) {
      return JSON.parse(storedHp);
    }
    const storedBaseHealth = localStorage.getItem('baseHealth');
    return storedBaseHealth !== null ? JSON.parse(storedBaseHealth) : 20000;
  });
  const [enemyCurrentHp, setEnemyCurrentHp] = useState(0);
  const [playerTotalDamage, setPlayerTotalDamage] = useState(0);
  const [enemyTotalDamage, setEnemyTotalDamage] = useState(0);
  const [enemy, setEnemy] = useState(
    () => JSON.parse(localStorage.getItem('enemy')) || DEFAULT_ENEMY_STATS,
  );
  const timerRef = useRef(null);
  const encounterRef = useRef(null);
  const battleMessageRef = useRef(null);
  const battleIntervalRef = useRef(null);
  const [player, setPlayer] = useState(() => {
    const stored = localStorage.getItem('player');
    if (!stored)
      return {
        health: 0, stamina: 1, armor: 20, damage: 3000, speed: 0, regen: 5,
        crit: 0.2, dps: 50, dpsToxis: 0, dpsEmi: 0, dpsFire: 0, dpsExtro: 0,
        evasion: 0.1, block: 0.1, vampir: 0.9, punching: 0, accuracy: 1,
        equipment: {
          head: null, armor: null, weapon1: null, weapon2: null,
          gloves: null, boots: null, ammo1: null, ammo2: null, ammo3: null, ammo4: null,
        },
      };
    let parsed = JSON.parse(stored);
    if (parsed.equipment) {
      Object.keys(parsed.equipment).forEach((slot) => {
        const item = parsed.equipment[slot];
        if (item && typeof item.image === 'string' && item.image.includes('/assets/images/')) {
          item.image = item.image.replace('/assets/images/', '/assets/Images/');
        }
      });
    }
    return parsed;
  });
  const [inventory, setInventory] = useState(() => {
    const stored = localStorage.getItem('inventory');
    if (!stored) return [];
    let parsed = JSON.parse(stored);
    return parsed.map((item) => {
      if (item && typeof item.image === 'string' && item.image.includes('/assets/images/')) {
        return { ...item, image: item.image.replace('/assets/images/', '/assets/Images/') };
      }
      return item;
    });
  });
  const [currentPage, setCurrentPage] = useState(
    () => JSON.parse(localStorage.getItem('currentPage')) || 0,
  );
  const [battleText, setBattleText] = useState('🔸 Мини-игра приключений 🔸');
  const [hoverItem, setHoverItem] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [filterSlot, setFilterSlot] = useState(
    () => JSON.parse(localStorage.getItem('filterSlot')) || '',
  );
  const [filterStat, setFilterStat] = useState(
    () => JSON.parse(localStorage.getItem('filterStat')) || '',
  );
  const [zonesModalOpen, setZonesModalOpen] = useState(false);
  const [readyZone, setReadyZone] = useState(false);
  const [closingZone, setClosingZone] = useState(false);
  const [baseModalOpen, setBaseModalOpen] = useState(false);
  const [selectedBasePoint, setSelectedBasePoint] = useState(null);
  const [upgradeResources, setUpgradeResources] = useState({ slot1: null, slot2: null });
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeTimer, setUpgradeTimer] = useState(0);
  const [basePoints, setBasePoints] = useState(
    () => JSON.parse(localStorage.getItem('basePoints')) || BASE_POINTS,
  );
  const [activeEffect, setActiveEffect] = useState(null);
  const [activeEffects, setActiveEffects] = useState([]);
  const [showDpsTooltip, setShowDpsTooltip] = useState(false);
  const [expeditionModalOpen, setExpeditionModalOpen] = useState(false);
  const [selectedEncounters, setSelectedEncounters] = useState([]);
  const [currentEncounterIndex, setCurrentEncounterIndex] = useState(0);
  const [totalExpeditionTime, setTotalExpeditionTime] = useState(0);
  const currentEnemy = enemy || DEFAULT_ENEMY_STATS;
  const [isReturningHome, setIsReturningHome] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [isAtBase, setIsAtBase] = useState(true);
  const [currentExp, setCurrentExp] = useState(() => loadFromLocalStorage('currentExp', 0));
  const [expToNextLevel, setExpToNextLevel] = useState(() =>
    loadFromLocalStorage('expToNextLevel', 1000),
  );
  const [isInventoryLevelHovered, setIsInventoryLevelHovered] = useState(false);
  const [playerLevel, setPlayerLevel] = useState(() => loadFromLocalStorage('playerLevel', 1));
  const getInitialQueue = () => {
    try {
      const savedQueue = localStorage.getItem(QUEUE_STORAGE_KEY);
      if (savedQueue) {
        return JSON.parse(savedQueue);
      }
      return [];
    } catch (error) {
      console.error('Ошибка при чтении очереди из Local Storage:', error);
      return [];
    }
  };
  const [activeEncountersQueue, setActiveEncountersQueue] = useState(getInitialQueue);
  const isAnyTimerCurrentlyActive = activeEncountersQueue.some(
    (item) => item && item.isTimerActive,
  );
  const activeEncounterIds = activeEncountersQueue.flatMap((item) =>
    item.encounters.map((e) => e.id),
  );
  const MAX_SELL_SLOTS = 10;
  const [dataChips, setDataChips] = useState(() => {
    const storedChips = localStorage.getItem(CHIPS_STORAGE_KEY);
    if (storedChips !== null) {
      try { return JSON.parse(storedChips); } catch (e) { console.error('Ошибка парсинга чипов из LocalStorage:', e); }
    }
    return DEFAULT_STARTING_CHIPS;
  });
  const [sellItems, setSellItems] = useState([]);
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [isBalanceClosing, setIsBalanceClosing] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [enemies, setEnemies] = useState([]);
  const [enemyReserve, setEnemyReserve] = useState([]);

  useEffect(() => localStorage.setItem('player', JSON.stringify(player)), [player]);
  useEffect(() => localStorage.setItem('inventory', JSON.stringify(inventory)), [inventory]);
  useEffect(() => localStorage.setItem('currentPage', JSON.stringify(currentPage)), [currentPage]);
  useEffect(() => localStorage.setItem('filterSlot', JSON.stringify(filterSlot)), [filterSlot]);
  useEffect(() => localStorage.setItem('filterStat', JSON.stringify(filterStat)), [filterStat]);
  useEffect(() => localStorage.setItem('logs', JSON.stringify(logs)), [logs]);
  useEffect(() => localStorage.setItem('enemy', JSON.stringify(enemy)), [enemy]);
  useEffect(() => localStorage.setItem('baseHealth', JSON.stringify(baseHealth)), [baseHealth]);
  useEffect(() => localStorage.setItem('zones', JSON.stringify(zones)), [zones]);
  useEffect(() => localStorage.setItem('currentZone', JSON.stringify(currentZone)), [currentZone]);
  useEffect(() => localStorage.setItem('basePoints', JSON.stringify(basePoints)), [basePoints]);
  useEffect(() => { localStorage.setItem('playerLevel', JSON.stringify(playerLevel)); }, [playerLevel]);
  useEffect(() => { localStorage.setItem('currentExp', JSON.stringify(currentExp)); }, [currentExp]);
  useEffect(() => { localStorage.setItem('expToNextLevel', JSON.stringify(expToNextLevel)); }, [expToNextLevel]);

  useEffect(() => {
    try { localStorage.setItem('playerCurrentHp', JSON.stringify(playerCurrentHp)); }
    catch (e) { console.error('Ошибка сохранения playerCurrentHp в localStorage', e); }
  }, [playerCurrentHp]);

  useEffect(() => {
    if (zonesModalOpen) {
      setTimeout(() => setReadyZone(true), 10);
    } else { setReadyZone(false); }
  }, [zonesModalOpen]);

  useEffect(() => {
    if (inventoryOpen) {
      setTimeout(() => setReady(true), 10);
    } else { setReady(false); }
  }, [inventoryOpen]);

  useEffect(() => {
    if (!isFighting) { updateStats(player.equipment, false); }
  }, [baseHealth, isFighting]);

  const log = (msg) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ru-RU', {
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    });
    setLogs((prev) => [...prev, `[${timeString}] ${msg}`]);
  };

  useEffect(() => {
    if (player.regen > 0 && !isFighting) {
      const regenInterval = setInterval(() => {
        setPlayerCurrentHp((prevHp) => {
          const newHp = prevHp + player.regen;
          return Math.min(newHp, player.health);
        });
      }, 1000);
      return () => clearInterval(regenInterval);
    }
  }, [player.regen, player.health, isFighting]);

  useEffect(() => {
    let effectTimeout;
    if (activeEffect && activeEffect.endTime) {
      const timeRemaining = activeEffect.endTime - Date.now();
      if (timeRemaining > 0) {
        effectTimeout = setTimeout(() => {
          setActiveEffect(null);
          if (activeEffect.type.includes('regen')) {
            log('⏳ Эффект регенерации от расходника завершен.');
          }
        }, timeRemaining);
      } else { setActiveEffect(null); }
    }
    return () => clearTimeout(effectTimeout);
  }, [activeEffect, log]);

  useEffect(() => {
    const currentCard = selectedEncounters[0];
    if (isTraveling && currentZone && currentCard && !isFighting) {
      setBattleText(
        `🗺️ Путь к точке: ${currentCard.name}. ` + `Ожидается врагов: ${currentCard.minBattles}.`,
      );
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          const newTimer = prev + 1;
          setPlayer((prevPlayer) => {
            const newStamina = Math.max(0, prevPlayer.stamina - STAMINA_DRAIN_RATE);
            return { ...prevPlayer, stamina: newStamina };
          });
          const isStaminaDepleted = player.stamina <= 0;
          const effectiveTimePerCard = isStaminaDepleted ? TIME_PER_CARD * 2 : TIME_PER_CARD;
          if (newTimer > 0 && newTimer % effectiveTimePerCard === 0) {
            checkEncounter(currentZone);
          }
          const remainingTime = effectiveTimePerCard - (newTimer % effectiveTimePerCard);
          const penaltyText = isStaminaDepleted ? ' (Штраф +100%)' : '';
          const currentBattleNum = currentEncounterIndex + 1;
          setBattleText(
            `🗺️ Путь к Бою ${currentBattleNum} из ${currentCard.minBattles}. ` +
            `Время до встречи: ${remainingTime} сек.${penaltyText}`,
          );
          return newTimer;
        });
      }, 1000);
    } else if (isTraveling && (!currentZone || !currentCard)) {
      endExpeditionFail();
      return;
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (encounterRef.current) clearInterval(encounterRef.current);
    };
  }, [isTraveling, currentZone, isFighting, selectedEncounters, currentEncounterIndex, player.stamina]);

  useEffect(() => {
    if (!isFighting && !isTraveling && !isReturningHome) {
      let regenRate = 0;
      let regenIntervalMs = 1000;
      if (isAtBase) { regenRate = STAMINA_HOME_REGEN_RATE; regenIntervalMs = 1000; }
      else if (isResting) { regenRate = 0.01; regenIntervalMs = 1000; }
      else { regenRate = STAMINA_BASE_REGEN_RATE; regenIntervalMs = 10000; }
      if (regenRate === 0) { return; }
      const regenInterval = setInterval(() => {
        setPlayer((prevPlayer) => {
          if (prevPlayer.stamina >= 1.0) { return prevPlayer; }
          const newStamina = Math.min(1.0, prevPlayer.stamina + regenRate);
          return { ...prevPlayer, stamina: newStamina };
        });
      }, regenIntervalMs);
      return () => clearInterval(regenInterval);
    }
  }, [isFighting, isTraveling, isReturningHome, isAtBase, isResting]);

  useEffect(() => {
    let homeTimerRef;
    if (isReturningHome) {
      homeTimerRef = setInterval(() => {
        setTimer((prev) => {
          const newTimer = prev + 1;
          const remainingTime = TIME_TO_RETURN_HOME - newTimer;
          if (remainingTime <= 0) {
            clearInterval(homeTimerRef);
            setIsReturningHome(false);
            setTimer(0);
            setBattleText('🏠 Ты на базе. Выносливость восстанавливается быстро.');
            log('✅ Прибытие на базу. Выносливость: +1% в секунду.');
            setIsAtBase(true);
            setCurrentZone(null);
            return TIME_TO_RETURN_HOME;
          }
          setBattleText(`🏠 Возвращение на базу: ${remainingTime} сек.`);
          return newTimer;
        });
      }, 1000);
    }
    return () => { if (homeTimerRef) clearInterval(homeTimerRef); };
  }, [isReturningHome, setIsAtBase, setCurrentZone, log]);

  useEffect(() => {
    try {
      localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(activeEncountersQueue));
    } catch (error) {
      console.error('Ошибка при записи очереди в Local Storage:', error);
    }
  }, [activeEncountersQueue]);

  useEffect(() => {
    const hasActiveTimer = activeEncountersQueue.some((item) => item.isTimerActive);
    if (!hasActiveTimer) { return; }
    const interval = setInterval(() => {
      let shouldUpdateState = false;
      const now = Date.now();
      setActiveEncountersQueue((prevQueue) => {
        const newQueue = prevQueue.map((item) => {
          if (!item.isTimerActive) { return item; }
          const elapsedSeconds = Math.floor((now - item.timerStartTime) / 1000);
          const remainingSeconds = item.timerDuration - elapsedSeconds;
          if (remainingSeconds <= 0) {
            shouldUpdateState = true;
            return { ...item, isTimerActive: false };
          }
          return item;
        });
        const isAnyActive = newQueue.some((item) => item && item.isTimerActive);
        if (shouldUpdateState) { return newQueue; }
        else if (isAnyActive) { return [...prevQueue]; }
        return prevQueue;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [activeEncountersQueue]);

  useEffect(() => {
    try { localStorage.setItem(CHIPS_STORAGE_KEY, JSON.stringify(dataChips)); }
    catch (e) { console.error('Ошибка сохранения чипов в LocalStorage:', e); }
  }, [dataChips]);

  const LOW_STAMINA_THRESHOLD = 0.1;
  const LOW_STAMINA_DAMAGE_PENALTY = 0.5;
  const isStaminaDepletedForPenalty = player.stamina < LOW_STAMINA_THRESHOLD;

  const generateZones = () => {
    return MAP_ZONES.map((zone) => ({ ...zone, difficulty: zone.difficulty }));
  };

  const enemyDisplayImage =
    currentEnemy.name !== DEFAULT_ENEMY_STATS.name
      ? currentEnemy.name.includes('Военные (military1)')
        ? military1
        : currentEnemy.name.includes('Военные (military2)')
          ? military2
          : currentEnemy.name.includes('Военные (military3)')
            ? military3
            : currentEnemy.name.includes('Бандиты')
              ? bandit1Img
              : currentEnemy.name.includes('Мутанты')
                ? mutantImg
                : currentEnemy.name.includes('Роботы')
                  ? bandit1Img
                  : enemyImg
      : enemyImg;

  const generateEnemy = (zone, difficultyModifier = 0) => {
    const availableFactions =
      zone.allowedFactions && zone.allowedFactions.length > 0 ? zone.allowedFactions : factions;
    const faction = availableFactions[Math.floor(Math.random() * availableFactions.length)];
    let enemyTypeKey = faction;
    if (faction === 'Военные') {
      const possibleKeys = MILITARY_ENEMY_KEYS;
      const pool = [];
      possibleKeys.forEach((key) => {
        const stats = ENEMY_BASE_STATS[key];
        const weight = stats ? parseInt(stats.chance) : 10;
        for (let i = 0; i < weight; i++) pool.push(key);
      });
      enemyTypeKey = pool[Math.floor(Math.random() * pool.length)];
    }
    const baseStats = ENEMY_BASE_STATS[enemyTypeKey];
    if (!baseStats) {
      console.error(`Ошибка: Не найдены базовые характеристики для ${enemyTypeKey}`);
      return DEFAULT_ENEMY_STATS;
    }
    const enemyLevel = playerLevel;
    const levelMultiplier = 1 + 0.1 * (enemyLevel - 1);
    const extraMultiplier = 1 + difficultyModifier / 100;
    const totalMult = levelMultiplier * extraMultiplier;
    const levelAdditiveBonus = (enemyLevel - 1) * 0.001;
    const calculatedHealth = parseFloat((baseStats.health * totalMult).toFixed(1));
    const finalDamage = parseFloat((baseStats.damage * totalMult).toFixed(1));
    const finalArmor = parseFloat((baseStats.armor * totalMult).toFixed(1));
    const finalRegen = parseFloat((baseStats.regen * totalMult).toFixed(4));
    const finalSpeed = baseStats.speed * totalMult;
    const finalCrit = baseStats.crit * totalMult;
    const finalPunching = baseStats.punching * totalMult;
    const finalVampir = baseStats.vampir * totalMult;
    const finalBlock = baseStats.block * totalMult;
    const finalAccuracy = baseStats.accuracy + levelAdditiveBonus;
    const finalEvasion = Math.min(1.0, baseStats.evasion * totalMult);
    const finalExpReward =
      (ENEMY_TYPES[baseStats.imageKey]?.expReward || 300) * baseStats.expRewardMultiplier * enemyLevel;
    const finalDps = (finalDamage * (1 + finalSpeed)).toFixed(1);
    return {
      level: enemyLevel, name: enemyTypeKey, faction: faction,
      health: calculatedHealth, currentHp: calculatedHealth, stamina: 1,
      armor: finalArmor, damage: finalDamage, dps: finalDps, speed: finalSpeed,
      regen: finalRegen, crit: finalCrit, evasion: finalEvasion, block: finalBlock,
      vampir: finalVampir, punching: finalPunching, accuracy: finalAccuracy,
      expReward: finalExpReward, rangeDistance: baseStats.rangeDistance || 7,
      runAp: baseStats.runAp || 5, soundAttack: baseStats.soundAttack || shotenemy,
      bigModel: baseStats.bigModel || '100%', nowModel: baseStats.nowModel || EnemyImg,
      shotPrice: baseStats.shotPrice || 1, imageKey: baseStats.imageKey,
      dead: baseStats.dead, avatar: ENEMY_IMAGES[baseStats.imageKey] || baseStats.nowModel,
      skillUse: baseStats.skillUse,
    };
  };

  const checkLevelUp = (currentExp, expToNextLevel, currentLevel) => {
    let newLevel = currentLevel;
    let newExp = currentExp;
    let newExpToNext = expToNextLevel;
    while (newExp >= newExpToNext) {
      newExp -= newExpToNext;
      newLevel++;
      newExpToNext = 1000 + (newLevel - 1) * 1000;
      log(`⭐⭐⭐ НОВЫЙ УРОВЕНЬ! Ты достиг ${newLevel} уровня! ⭐⭐⭐`);
    }
    return { newLevel, newExp, newExpToNext };
  };

  const endBattle = (playerWon, enemyWon, finalPlayerHP, finalEnemyHP) => {
    if (battleIntervalRef.current) clearInterval(battleIntervalRef.current);
    setIsFighting(false);
    let resultLog;
    if (playerWon) {
      const STAMINA_COST_ON_WIN = 0.1;
      setPlayer((prevPlayer) => {
        const newStamina = Math.max(0, prevPlayer.stamina - STAMINA_COST_ON_WIN);
        if (prevPlayer.stamina > newStamina) {
          log(`📉 Победа далась тяжело! Вы потеряли ${Math.round(STAMINA_COST_ON_WIN * 100)}% выносливости.`);
        }
        if (newStamina < 0.1 && prevPlayer.stamina >= 0.1) {
          log('⚠️ ВНИМАНИЕ! Выносливость ниже 10%. Наносимый урон СНИЖЕН на 50%!');
        }
        return { ...prevPlayer, stamina: newStamina };
      });
      setBaseHealth(finalPlayerHP);
      setPlayerCurrentHp(finalPlayerHP);
      setEnemyCurrentHp(0);
      const currentEncounter = selectedEncounters[0];
      if (Math.random() < 1) {
        const guaranteedRarity = currentEncounter?.drop?.rarity || null;
        const guaranteedQuality = currentEncounter?.drop?.quality || null;
        const droppedItemResult = generateItem(items, playerLevel, guaranteedRarity, guaranteedQuality);
        const itemsToAdd = Array.isArray(droppedItemResult) ? droppedItemResult : [droppedItemResult];
        const itemForDisplay = itemsToAdd[0];
        setInventory((prev) => [...prev, ...itemsToAdd]);
        if (itemForDisplay) {
          log(`🎁 Тебе выпал новый предмет: <span style="color: ${itemForDisplay.qualityColor || 'green'}; font-weight: bold;">[${itemForDisplay.quality}] ${itemForDisplay.displayName} (${itemsToAdd.length > 1 ? `x${itemsToAdd.length}` : ''})</span>!`);
        }
      }
      const expGained = enemy.expReward;
      setCurrentExp((prevExp) => {
        const totalExp = prevExp + expGained;
        const { newLevel, newExp, newExpToNext } = checkLevelUp(totalExp, expToNextLevel, playerLevel);
        if (newLevel !== playerLevel) { setPlayerLevel(newLevel); setExpToNextLevel(newExpToNext); }
        log(`🌟 Получено ${expGained} EXP. До следующего уровня: ${newExpToNext - newExp}.`);
        return newExp;
      });
      resultLog = `🏆 ПОБЕДА! Точка ${currentEncounter?.name || ''} полностью зачищена.`;
      endExpeditionPointSuccess();
    } else if (enemyWon) {
      resultLog = `💀 ПОРАЖЕНИЕ! Ты был одолен группой врагов.`;
      log(`❌ Итог: Поражение! Твое HP: ${finalPlayerHP.toFixed(1)}.`);
      setBaseHealth(Math.max(0, finalPlayerHP));
      setPlayerCurrentHp(finalPlayerHP);
      setEnemyCurrentHp(finalEnemyHP);
      log(`💀 Точка зачистки ${selectedEncounters[0]?.name || 'неизвестна'} провалена.`);
      endExpeditionFail();
    }
    setBattleText(resultLog);
  };

  const endExpeditionPointSuccess = () => {
    setCurrentEncounterIndex(0);
    log(`🏆 Точка зачистки успешно завершена! Возврат на базу.`);
    endExpeditionSuccess();
  };

  const endExpeditionFail = () => {
    setCurrentEncounterIndex(0);
    setSelectedEncounters([]);
    setTotalExpeditionTime(0);
    setCurrentZone(null);
    setEnemy(DEFAULT_ENEMY_STATS);
    setZones(generateZones());
    log(`🗺️ Доступны новые локации.`);
  };

  const endExpeditionSuccess = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsTraveling(false);
    const zoneName = currentZone?.name || 'неизвестной локации';
    log(`🏆 Экспедиция в ${zoneName} успешно завершена!`);
    setBattleText('🏆 ЭКСПЕДИЦИЯ ЗАВЕРШЕНА! Все точки зачищены.');
    setCurrentZone(null);
    setEnemy(DEFAULT_ENEMY_STATS);
    setZones(generateZones());
    setCurrentEncounterIndex(0);
    setSelectedEncounters([]);
    setTotalExpeditionTime(0);
    setIsAtBase(false);
  };

  const startGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (encounterRef.current) clearInterval(encounterRef.current);
    if (battleMessageRef.current) clearTimeout(battleMessageRef.current);
    if (battleIntervalRef.current) clearInterval(battleIntervalRef.current);
    setTimer(0);
    setIsTraveling(false);
    setIsFighting(false);
    setCurrentZone(null);
    setEnemy(DEFAULT_ENEMY_STATS);
    setLogs((prevLogs) => [...prevLogs, '']);
    setBattleText('⚔️ Ожидание выбора локации...');
    setZones(generateZones());
    setZonesModalOpen(true);
    playSound(onImg);
  };

  const checkEncounter = (zone) => {
    const currentEncounter = selectedEncounters[0];
    if (!currentEncounter) {
      log('❌ Ошибка: Текущая точка не найдена.');
      endExpeditionFail();
      return;
    }
    const totalCount = currentEncounter.minBattles || 1;
    const allGenerated = [];
    for (let i = 0; i < totalCount; i++) {
      const enemyData = generateEnemy(zone, currentEncounter.difficulty);
      allGenerated.push({
        ...enemyData,
        id: `enemy-${Date.now()}-${i}`,
        currentHp: enemyData.health,
        pos: { x: 31 - (i % 2), y: 22 + (i % 3) * 3 },
      });
    }
    const initialWave = allGenerated.slice(0, 3);
    const reserve = allGenerated.slice(3);
    setEnemies(initialWave);
    setEnemyReserve(reserve);
    setEnemy(allGenerated[0]);
    setPlayerTotalDamage(0);
    setEnemyTotalDamage(0);
    if (timerRef.current) clearInterval(timerRef.current);
    setIsTraveling(false);
    const timeToBattle = currentEncounter.time || 5;
    const reserveText = reserve.length > 0 ? ` (+${reserve.length} в резерве)` : '';
    setBattleText(`🚨 Враги обнаружены! На поле: ${initialWave.length}${reserveText}`);
    log(`🚨 На точке ${currentEncounter.name} замечена группа (${totalCount} ед.). Первая волна: ${initialWave.length} чел.`);
    battleMessageRef.current = setTimeout(() => {
      setBattleText('💥 ИДЕТ ГРУППОВОЙ БОЙ 💥');
      setIsFighting(true);
      log('🔥 Начало боя!');
      battleMessageRef.current = null;
    }, timeToBattle * 1000);
  };

  const startActiveExpedition = (startIndex) => {
    if (activeEncountersQueue.length === 0) {
      log('❌ Очередь экспедиций пуста!');
      return;
    }
    const expeditionToStart = activeEncountersQueue[startIndex];
    const singleEncounter = expeditionToStart.encounters[0];
    setActiveEncountersQueue((prev) => {
      const newQueue = [...prev];
      newQueue.splice(startIndex, 1);
      return newQueue;
    });
    setCurrentZone(expeditionToStart.zone);
    setSelectedEncounters([singleEncounter]);
    setTotalExpeditionTime(singleEncounter.time);
    setCurrentEncounterIndex(0);
    setIsTraveling(true);
    setIsFighting(false);
    setTimer(0);
    setEnemy(DEFAULT_ENEMY_STATS);
    log(`🚀 Начало зачистки точки: ${singleEncounter.name} в ${expeditionToStart.zone.name}.`);
    setBattleText(`🗺️ Путь к точке: ${singleEncounter.name}. Время до встречи: ${singleEncounter.time} сек.`);
  };

  const addEncountersToQueue = (encountersToAdd) => {
    const maxLimit = 8;
    const currentQueueLength = activeEncountersQueue.length;
    if (encountersToAdd.length === 0) {
      log('❌ Вы должны выбрать хотя бы одну точку для добавления в очередь.');
      return;
    }
    if (currentQueueLength >= maxLimit) {
      log(`❌ Все слоты карточек заняты (${currentQueueLength}/${maxLimit}). Добавление невозможно.`);
      return;
    }
    if (currentQueueLength + encountersToAdd.length > maxLimit) {
      const remainingSlots = maxLimit - currentQueueLength;
      log(`⚠️ В очереди осталось только ${remainingSlots} свободных слота. Выберите меньше точек для добавления.`);
      return;
    }
    const newQueueItems = encountersToAdd.map((encounter) => ({
      zone: currentZone, encounters: [encounter], time: encounter.time,
      id: Date.now() + Math.random(), isTimerActive: false, timerStartTime: null,
      timeAdded: Date.now(), baseDifficulty: currentZone.difficulty,
      drop: encounter.drop, timerDuration: encounter.selectionTimer,
    }));
    setActiveEncountersQueue((prev) => [...prev, ...newQueueItems]);
    log(`✅ В очередь добавлено ${encountersToAdd.length} точек из ${currentZone.name}.`);
    setExpeditionModalOpen(false);
    setZonesModalOpen(false);
  };

  const stopTravelOrGoHome = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (encounterRef.current) clearInterval(encounterRef.current);
    if (battleMessageRef.current) clearTimeout(battleMessageRef.current);
    if (battleIntervalRef.current) clearInterval(battleIntervalRef.current);
    if (isTraveling || isReturningHome || isResting) {
      if (isResting) {
        log('✅ Привал завершен. Регенерация остановлена.');
        setBattleText('⛺ Привал завершен.');
      } else { log('🟥 Операция прервана. Выбирайте новое направление.'); }
      setTimer(0);
      setIsTraveling(false);
      setIsFighting(false);
      setIsReturningHome(false);
      setIsResting(false);
      setCurrentZone(null);
      setEnemy(DEFAULT_ENEMY_STATS);
      setZones(generateZones());
      setBattleText('⏹️ Операция прервана. Вы на базе.');
      log('🟥 Операция прервана. Выбирайте новое направление.');
      setIsAtBase(true);
      return;
    }
    if (!isTraveling && !isFighting && !isResting) {
      if (isAtBase) {
        log('🏠 Ты уже на базе. Инициирована быстрая регенерация.');
        return;
      }
      setTimer(0);
      setIsTraveling(false);
      setIsReturningHome(true);
      setBattleText(`🏠 Возвращение на базу: ${TIME_TO_RETURN_HOME} сек.`);
      log(`🚶 Начато движение на базу. Время в пути: ${TIME_TO_RETURN_HOME} сек.`);
    }
  };

  const closeZoneModalAndStartPreparation = (zone) => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (encounterRef.current) clearInterval(encounterRef.current);
    if (battleMessageRef.current) clearTimeout(battleMessageRef.current);
    if (battleIntervalRef.current) clearInterval(battleIntervalRef.current);
    setCurrentZone(zone);
    setSelectedEncounters([]);
    setTotalExpeditionTime(0);
    setExpeditionModalOpen(true);
    log(`🌍 Выбрана зона ${zone.name}. Выберите точки для зачистки.`);
  };

  const closeExpeditionModal = () => {
    setExpeditionModalOpen(false);
    setCurrentZone(null);
    setSelectedEncounters([]);
    setTotalExpeditionTime(0);
    log('🚫 Подготовка к экспедиции отменена. Выберите другую зону.');
  };

  const updateStats = (equip = player.equipment, isPostBattleSync = false, newEffects = activeEffects) => {
    const oldMaxHealth = player.health;
    const base = {
      health: 20000000, armor: 0, damage: 500, dpsToxis: 0, dpsEmi: 0,
      dpsExtro: 0, dpsFire: 0, speed: 2, regen: 0, crit: 5, evasion: 0,
      block: 0, vampir: 0, punching: 0, accuracy: 2,
    };
    const BLOCKED_SLOTS = [];
    for (const slot in equip) {
      const item = equip[slot];
      if (item && item.isTimerActive) { BLOCKED_SLOTS.push(slot); }
      if (item?.stats) {
        for (const key in item.stats) {
          if (base[key] !== undefined) base[key] += item.stats[key];
        }
      }
      const isCustomizable = slot === 'weapon1' || slot === 'weapon2' || slot === 'head' || slot === 'armor' || slot === 'gloves' || slot === 'boots';
      if (item && isCustomizable && item.mods) {
        for (const modSlot in item.mods) {
          const mod = item.mods[modSlot];
          if (mod?.stats) {
            for (const key in mod.stats) {
              if (base[key] !== undefined) base[key] += mod.stats[key];
            }
          }
        }
      }
    }
    let tempArmorMultiplier = 1;
    let tempDamageMultiplier = 1;
    newEffects.forEach((effect) => {
      if (effect.type === 'regen' || effect.type === 'regen_buff') { base.regen += effect.value; }
      if (effect.type === 'damage_buff') { tempDamageMultiplier *= 1 + effect.value; }
      if (effect.type === 'armor_buff') { tempArmorMultiplier *= 1 + effect.value; }
    });
    base.damage *= tempDamageMultiplier;
    base.armor *= tempArmorMultiplier;
    const newMaxHealth = base.health;
    const healthDifference = newMaxHealth - oldMaxHealth;
    let newCurrentHp;
    const maxHealthChanged = healthDifference !== 0;
    const isFirstRun = playerCurrentHp === undefined;
    if (isPostBattleSync) { newCurrentHp = baseHealth; }
    else if (maxHealthChanged || isFirstRun) { newCurrentHp = playerCurrentHp + healthDifference; }
    else { newCurrentHp = playerCurrentHp; }
    newCurrentHp = Math.min(newCurrentHp, newMaxHealth);
    newCurrentHp = Math.max(0, newCurrentHp);
    const dps = base.damage * (1 + base.speed);
    let dpsToxis = dps + base.dpsToxis;
    let dpsEmi = dps + base.dpsEmi;
    let dpsExtro = dps + base.dpsExtro;
    let dpsFire = dps + base.dpsFire;
    for (let i = 1; i <= 4; i++) {
      const slot = `ammo${i}`;
      const ammo = equip[slot];
      if (ammo && ammo.damage && AMMO_BONUSES[ammo.damage]) {
        const bonus = AMMO_BONUSES[ammo.damage];
        if (bonus.dpsStat === 'dpsToxis') { dpsToxis = dps * (1 + bonus.multiplier); }
        else if (bonus.dpsStat === 'dpsEmi') { dpsEmi = dps * (1 + bonus.multiplier); }
        else if (bonus.dpsStat === 'dpsExtro') { dpsExtro = dps * (1 + bonus.multiplier); }
        else if (bonus.dpsStat === 'dpsFire') { dpsFire = dps * (1 + bonus.multiplier); }
      }
    }
    const finalDps = dps;
    const finalStats = {
      ...base, armor: parseFloat(base.armor.toFixed(1)),
      damage: parseFloat(base.damage.toFixed(1)), regen: parseFloat(base.regen.toFixed(4)),
    };
    setPlayer((prev) => ({
      ...prev, ...finalStats, dps: parseFloat(finalDps.toFixed(1)),
      dpsToxis: parseFloat(dpsToxis.toFixed(1)), dpsEmi: parseFloat(dpsEmi.toFixed(1)),
      dpsExtro: parseFloat(dpsExtro.toFixed(1)), dpsFire: parseFloat(dpsFire.toFixed(1)),
      equipment: equip, blockedSlots: BLOCKED_SLOTS,
    }));
    if (maxHealthChanged || isPostBattleSync) { setPlayerCurrentHp(newCurrentHp); }
  };

  const handleDrop = (slot) => (e) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    const itemIndex = inventory.findIndex((i) => String(i.id) === itemId);
    if (itemIndex === -1) {
      log('❌ Предмет не найден в инвентаре по ID.');
      return;
    }
    const item = inventory[itemIndex];
    const ammoSlots = ['ammo1', 'ammo2', 'ammo3', 'ammo4'];
    const isSlotOccupied = player.equipment[slot] !== null;
    if (isSlotOccupied) {
      log(`❌ Слот ${slot} уже занят. Сначала снимите предмет.`);
      return;
    }
    const isAmmoSlot = ammoSlots.includes(slot);
    const isAmmoItem = item.slot.startsWith('ammo');
    if (isAmmoSlot && !isAmmoItem) {
      log('❌ В слот амуниции можно помещать только патроны.');
      return;
    }
    if (!isAmmoSlot && item.slot !== slot) {
      log('❌ Этот предмет не подходит для этого слота.');
      return;
    }
    const TIMED_DISPOSABLE_ITEMS = ['Аптечка экстренная', 'Бинт медицинский', 'Анаболик', 'Стимулятор скорости'];
    const isTimedDisposable = TIMED_DISPOSABLE_ITEMS.includes(item.name) && item.timeLimit && item.timeLimit > 0;
    let itemToEquip = item;
    let finalEquip = { ...player.equipment, [slot]: isAmmoSlot ? { ...item, count: 1 } : item };
    if (isTimedDisposable) {
      itemToEquip = { ...item, isTimerActive: true };
      finalEquip = { ...player.equipment, [slot]: isAmmoSlot ? { ...itemToEquip, count: 1 } : itemToEquip };
      log(`⏳ Активирован ${item.displayName}. Эффект продлится ${item.timeLimit} секунд.`);
      setTimeout(() => {
        setPlayer((prev) => {
          if (prev.equipment[slot] && prev.equipment[slot].name === item.name) {
            const newEquip = { ...prev.equipment, [slot]: null };
            updateStats(newEquip);
            log(`🗑️ ${item.displayName} израсходован. Эффект завершен.`);
            return { ...prev, equipment: newEquip };
          }
          return prev;
        });
      }, item.timeLimit * 1000);
    }
    updateStats(finalEquip);
    log(`🧰 Экипировано: ${item.displayName}`);
    setInventory((prev) => {
      const newInv = [...prev];
      if (isAmmoSlot) {
        if (item.count && item.count > 1) { newInv[itemIndex] = { ...item, count: item.count - 1 }; }
        else { newInv.splice(itemIndex, 1); }
      } else { newInv.splice(itemIndex, 1); }
      return newInv;
    });
  };

  const handleDragStart = (item) => (e) => e.dataTransfer.setData('text/plain', item.id);

  const handleDropToGrid = (index) => (e) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    setInventory((prev) => {
      const draggedIndex = prev.findIndex((i) => String(i.id) === itemId);
      if (draggedIndex === -1) { return prev; }
      const newInventory = [...prev];
      const pageIndex = index + currentPage * ITEMS_PER_PAGE;
      if (pageIndex >= newInventory.length) { return prev; }
      [newInventory[draggedIndex], newInventory[pageIndex]] = [newInventory[pageIndex], newInventory[draggedIndex]];
      return newInventory;
    });
  };

  const stackInventory = (items) => {
    const stackMap = {};
    const result = [];
    items.forEach((item) => {
      const isStackable = item.rarity === 'over';
      const key = `${item.name}_${item.rarity}`;
      if (isStackable) {
        if (!stackMap[key]) {
          stackMap[key] = { ...item, count: 1, type: 'resources' };
        } else { stackMap[key].count += 1; }
      } else { result.push({ ...item, count: 1 }); }
    });
    return [...result, ...Object.values(stackMap)];
  };

  const finalInventoryList = useMemo(() => {
    let list = [...inventory];
    list = list.filter((item) => {
      if (!item || !item.slot) return false;
      let slotMatch = true;
      if (filterSlot) { slotMatch = filterSlot === 'ammo' ? item.slot.startsWith('ammo') : item.slot === filterSlot; }
      let statMatch = true;
      if (filterStat && filterStat !== 'newest_first') { statMatch = item.stats && item.stats[filterStat] !== undefined; }
      return slotMatch && statMatch;
    });
    if (filterStat === 'newest_first') {
      list.sort((a, b) => { const idA = parseFloat(a.id); const idB = parseFloat(b.id); return idB - idA; });
    }
    return stackInventory(list);
  }, [inventory, filterSlot, filterStat]);

  const currentInventoryPage = finalInventoryList.slice(
    currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE,
  );

  const unequipItem = (slot) => {
    const item = player.equipment[slot];
    if (!item) return;
    if (player.blockedSlots && player.blockedSlots.includes(slot)) {
      log(`❌ Нельзя снять ${item.displayName}, пока активен его временный эффект!`);
      return;
    }
    setInventory((prev) => [...prev, { ...item, count: 1 }]);
    setPlayer((prev) => {
      const newEquip = { ...prev.equipment, [slot]: null };
      updateStats(newEquip);
      log(`🧰 Снят предмет: ${item.displayName}`);
      return { ...prev, equipment: newEquip };
    });
  };

  const applyConsumableEffect = (effect) => {
    if (effect.type === 'health_burst') {
      setPlayerCurrentHp((prevHp) => Math.min(prevHp + effect.value, player.health));
      log(`💉 Лечение на ${effect.value} HP!`);
      return;
    }
    if (effect.duration > 0) {
      const effectId = `${effect.type}_${Date.now()}`;
      const newEffect = { id: effectId, ...effect, endTime: Date.now() + effect.duration * 1000 };
      setActiveEffects((prevEffects) => {
        if (prevEffects.find((e) => e.type === newEffect.type)) {
          log(`❌ Эффект ${newEffect.type} уже активен.`);
          return prevEffects;
        }
        const newEffectsList = [...prevEffects, newEffect];
        updateStats(player.equipment, false, newEffectsList);
        log(`✨ Активирован: ${newEffect.name || newEffect.type}. Реген ${newEffect.value} на ${newEffect.duration}с.`);
        return newEffectsList;
      });
      setTimeout(() => {
        setActiveEffects((prevEffects) => {
          const newEffectsList = prevEffects.filter((e) => e.id !== effectId);
          updateStats(player.equipment, false, newEffectsList);
          log(`💨 Эффект ${newEffect.type} завершился.`);
          return newEffectsList;
        });
      }, newEffect.duration * 1000);
    }
  };

  const handleModDrop = (slot) => (e) => {
    e.preventDefault();
    if (!customizationItem) return;
    const itemId = e.dataTransfer.getData('text/plain');
    const itemIndex = inventory.findIndex((i) => String(i.id) === itemId);
    if (itemIndex === -1) {
      log('❌ Модуль не найден в инвентаре для установки.');
      return;
    }
    const item = inventory[itemIndex];
    if (item.slot !== slot) {
      log(`❌ Предмет "${item.displayName}" не подходит для слота "${slot.replace('mod_', '')}".`);
      return;
    }
    const primaryItemSlot = customizationItem.slot;
    const primaryItem = player.equipment[primaryItemSlot];
    if (!primaryItem) {
      log('❌ Элемент, который вы кастомизируете, не экипирован.');
      return;
    }
    const currentMod = primaryItem.mods ? primaryItem.mods[slot] : null;
    if (currentMod) {
      setInventory((prev) => [...prev, currentMod]);
      log(`🧰 Снят старый модуль: ${currentMod.displayName} с ${primaryItem.displayName}`);
    }
    const newPrimaryItem = {
      ...primaryItem, mods: { ...(primaryItem.mods || {}), [slot]: item },
    };
    setPlayer((prev) => {
      const newEquip = { ...prev.equipment, [primaryItemSlot]: newPrimaryItem };
      updateStats(newEquip);
      log(`⚙️ Установлен модуль: ${item.displayName} на ${primaryItem.displayName}`);
      return { ...prev, equipment: newEquip };
    });
    setCustomizationItem(newPrimaryItem);
    setInventory((prev) => {
      const newInv = prev.filter((_, idx) => idx !== itemIndex);
      return newInv;
    });
    playSound(installImg);
    setHoverItem(null);
  };

  const unequipMod = (slot) => {
    if (!customizationItem) return;
    const primaryItemSlot = customizationItem.slot;
    const primaryItem = player.equipment[primaryItemSlot];
    if (!primaryItem || !primaryItem.mods || !primaryItem.mods[slot]) return;
    const item = primaryItem.mods[slot];
    setInventory((prev) => [...prev, item]);
    const newMods = { ...primaryItem.mods };
    delete newMods[slot];
    const newPrimaryItem = { ...primaryItem, mods: newMods };
    setPlayer((prev) => {
      const newEquip = { ...prev.equipment, [primaryItemSlot]: newPrimaryItem };
      updateStats(newEquip);
      log(`🛠️ Модуль снят: ${item.displayName} с ${primaryItem.name}`);
      return { ...prev, equipment: newEquip };
    });
    setCustomizationItem(newPrimaryItem);
  };

  const handleMouseMove = (e) => setHoverPosition({ x: e.clientX + 142, y: e.clientY - 340 });

  const getCombinedStats = (item) => {
    if (!item) return {};
    const detailedStats = {};
    for (const key in item.stats) {
      if (item.stats.hasOwnProperty(key)) {
        detailedStats[key] = { base: parseFloat(item.stats[key].toFixed(3)), modBonus: 0 };
      }
    }
    if (item.mods) {
      for (const modSlot in item.mods) {
        const mod = item.mods[modSlot];
        if (mod && mod.stats) {
          for (const key in mod.stats) {
            const modValue = parseFloat(mod.stats[key].toFixed(3));
            if (!detailedStats[key]) { detailedStats[key] = { base: 0, modBonus: 0 }; }
            detailedStats[key].modBonus += modValue;
          }
        }
      }
    }
    return detailedStats;
  };

  const handleDropToSellBlock = (e) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    const itemIndex = inventory.findIndex((i) => String(i.id) === itemId);
    if (itemIndex === -1) {
      log('❌ Предмет не найден в инвентаре для продажи.');
      return;
    }
    const itemToSell = inventory[itemIndex];
    if (sellItems.length >= MAX_SELL_SLOTS) {
      log(`❌ Слот продажи заполнен (${MAX_SELL_SLOTS} предметов).`);
      return;
    }
    setInventory((prevInv) => {
      const isStackable = itemToSell.rarity === 'over';
      const newInv = [...prevInv];
      if (isStackable && itemToSell.count > 1) {
        newInv[itemIndex] = { ...itemToSell, count: itemToSell.count - 1 };
      } else { newInv.splice(itemIndex, 1); }
      setSellItems((prevSell) => [...prevSell, {
        ...itemToSell, count: 1, id: Date.now() + prevSell.length + Math.random(),
      }]);
      log(`📤 Предмет "${itemToSell.displayName}" добавлен для продажи.`);
      return newInv;
    });
  };

  const handleRemoveFromSell = (sellItemIndex) => {
    const itemToReturn = sellItems[sellItemIndex];
    setInventory((prevInv) => {
      const isStackable = itemToReturn.rarity === 'over';
      let addedToStack = false;
      if (isStackable) {
        const existingStackIndex = prevInv.findIndex(
          (i) => i.name === itemToReturn.name && i.rarity === itemToReturn.rarity && i.rarity === 'over',
        );
        if (existingStackIndex !== -1) {
          prevInv[existingStackIndex].count += 1;
          addedToStack = true;
        }
      }
      if (!addedToStack) { prevInv.push({ ...itemToReturn, id: Date.now() + Math.random(), count: 1 }); }
      return [...prevInv];
    });
    setSellItems((prevSell) => prevSell.filter((_, index) => index !== sellItemIndex));
    log(`📥 Предмет "${itemToReturn.displayName}" возвращен в инвентарь.`);
  };

  const handleSell = () => {
    if (sellItems.length === 0) {
      log('❌ Нет предметов для продажи.');
      return;
    }
    let totalChipsEarned = 0;
    for (const item of sellItems) {
      const fullPrice = calculateItemPrice(item);
      const sellPrice = Math.round(fullPrice * 0.5);
      totalChipsEarned += sellPrice;
    }
    setDataChips((prevChips) => prevChips + totalChipsEarned);
    log(`💰 Продано ${sellItems.length} предметов. Получено ${totalChipsEarned} чипов!`);
    setSellItems([]);
  };

  const calculateItemPrice = (item) => {
    const basePrice = BASE_RARITY_PRICES[item.rarity] || 1;
    const qualityMultiplier = QUALITY_MULTIPLIERS[item.quality] || 1;
    return Math.round(basePrice * qualityMultiplier);
  };

  const getSellPrice = (item) => {
    if (!item) return 0;
    const fullPrice = calculateItemPrice(item);
    return Math.round(fullPrice * 0.5);
  };

  const paddedInventory = Array.from({ length: TOTAL_SLOTS }, (_, index) => {
    if (currentInventoryPage[index]) { return currentInventoryPage[index]; }
    return null;
  });

  const removeEncounterFromQueue = (index) => {
    if (isTraveling || isFighting) {
      log('❌ Нельзя удалить карточку, пока идет активная экспедиция!');
      return;
    }
    setActiveEncountersQueue((prevQueue) => {
      const newQueue = prevQueue.filter((_, i) => i !== index);
      log(`🗑️ Карточка ${prevQueue[index]?.encounters[0]?.name || 'неизвестна'} удалена из очереди.`);
      return newQueue;
    });
  };

  const startQueueItemTimer = (index) => {
    if (isAnyTimerCurrentlyActive) {
      log('🛑 Нельзя запустить таймер! Дождитесь завершения текущего таймера.');
      return;
    }
    setActiveEncountersQueue((prevQueue) => {
      if (!prevQueue[index]) return prevQueue;
      const itemToUpdate = prevQueue[index];
      if (!itemToUpdate.isTimerActive) {
        log(`⏱️ Таймер для карточки ${itemToUpdate.encounters[0]?.name || 'неизвестна'} запущен.`);
        return prevQueue.map((item, i) => {
          if (i === index) { return { ...item, isTimerActive: true, timerStartTime: Date.now() }; }
          return item;
        });
      }
      return prevQueue;
    });
  };

  const startResting = () => {
    if (!isFighting && !isTraveling && !isReturningHome && !isAtBase) {
      setIsResting(true);
      setBattleText('⛺ Привал (Регенерация): Активирован.');
      log('🌿 Вы обустроили лагерь для привала. Регенерация активна.');
    } else { log('❌ Нельзя начать привал в бою, в пути или на базе.'); }
  };

  const formatTime = (seconds) => {
    if (seconds < 0) seconds = 0;
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    const pad = (num) => (num < 10 ? '0' : '') + num;
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  const openZonesModal = () => {
    setBaseModalOpen(false);
    setZonesModalOpen(true);
    log('🗺️ Возврат к карте территорий.');
  };

  const setPlayerCurrentHp = (valueOrFn) => {
    if (typeof valueOrFn === 'number') {
      setPlayerCurrentHpState(valueOrFn);
    } else if (typeof valueOrFn === 'function') {
      setPlayerCurrentHpState((prev) => {
        const newValue = valueOrFn(prev);
        return newValue;
      });
    } else { setPlayerCurrentHpState(valueOrFn); }
  };

  const handleZoneModalClose = () => {
    setClosingZone(true);
    setReadyZone(false);
    playSound(offImg);
    setTimeout(() => {
      setZonesModalOpen(false);
      setClosingZone(false);
      setZones([]);
    }, 550);
  };

  const handleClose = () => {
    setClosing(true);
    setReady(false);
    setIsBalanceClosing(true);
    setIsBalanceVisible(false);
    playSound(offImg);
    setTimeout(() => {
      setInventoryOpen(false);
      setClosing(false);
      setIsBalanceClosing(false);
    }, 550);
  };

  const playSound = (src, isLooping = false) => {
    if (activeSoundRef.current) {
      activeSoundRef.current.pause();
      activeSoundRef.current.currentTime = 0;
      activeSoundRef.current = null;
    }
    if (!src) return;
    try {
      const audio = new Audio(src);
      audio.volume = 0.8;
      if (isLooping) { activeSoundRef.current = audio; }
      audio.play().catch((error) => { console.error('Audio playback failed:', error); });
    } catch (error) { console.error('Failed to play sound:', error); }
  };

  const handleScroll = useCallback(() => {
    const now = Date.now();
    if (now - lastScrollTime.current > SCROLL_SOUND_DELAY) {
      playSound(scroll);
      lastScrollTime.current = now;
    }
  }, [playSound, scroll]);

  const handleBalanceClick = () => {
    if (isShaking) return;
    playSound(chips);
    const cycles = 5;
    const duration = 100;
    let currentCycle = 0;
    const shakeInterval = setInterval(() => {
      if (currentCycle % 2 === 0) { setIsShaking(true); }
      else { setIsShaking(false); }
      currentCycle++;
      if (currentCycle > cycles * 2) { clearInterval(shakeInterval); setIsShaking(false); }
    }, duration);
  };

  const openBaseModal = (zone) => {
    setClosingZone(true);
    setReadyZone(false);
    setTimeout(() => {
      setZonesModalOpen(false);
      setClosingZone(false);
      setBaseModalOpen(true);
    }, 0);
  };

  const closeBaseModal = () => { setBaseModalOpen(false); };

  const value = {
    // state
    logs, setLogs, zones, setZones, currentZone, setCurrentZone,
    inventoryOpen, setInventoryOpen, baseHealth, setBaseHealth,
    timer, setTimer, isTraveling, setIsTraveling, destinationZone, setDestinationZone,
    isAtLocation, setIsAtLocation, isFighting, setIsFighting,
    customizationItem, setCustomizationItem, filterModSlot, setFilterModSlot,
    ready, setReady, closing, setClosing,
    playerCurrentHp, setPlayerCurrentHp, enemyCurrentHp, setEnemyCurrentHp,
    playerTotalDamage, setPlayerTotalDamage, enemyTotalDamage, setEnemyTotalDamage,
    enemy, setEnemy, player, setPlayer, inventory, setInventory,
    currentPage, setCurrentPage, battleText, setBattleText,
    hoverItem, setHoverItem, hoverPosition, setHoverPosition,
    filterSlot, setFilterSlot, filterStat, setFilterStat,
    zonesModalOpen, setZonesModalOpen, readyZone, setReadyZone, closingZone, setClosingZone,
    baseModalOpen, setBaseModalOpen, selectedBasePoint, setSelectedBasePoint,
    upgradeResources, setUpgradeResources, isUpgrading, setIsUpgrading,
    upgradeTimer, setUpgradeTimer, basePoints, setBasePoints,
    activeEffect, setActiveEffect, activeEffects, setActiveEffects,
    showDpsTooltip, setShowDpsTooltip, expeditionModalOpen, setExpeditionModalOpen,
    selectedEncounters, setSelectedEncounters,
    currentEncounterIndex, setCurrentEncounterIndex,
    totalExpeditionTime, setTotalExpeditionTime,
    isReturningHome, setIsReturningHome, isResting, setIsResting,
    isAtBase, setIsAtBase, currentExp, setCurrentExp,
    expToNextLevel, setExpToNextLevel,
    isInventoryLevelHovered, setIsInventoryLevelHovered,
    playerLevel, setPlayerLevel,
    activeEncountersQueue, setActiveEncountersQueue,
    dataChips, setDataChips, sellItems, setSellItems,
    isBalanceVisible, setIsBalanceVisible, isBalanceClosing, setIsBalanceClosing,
    isShaking, setIsShaking, enemies, setEnemies, enemyReserve, setEnemyReserve,
    // computed
    currentEnemy, isAnyTimerCurrentlyActive, activeEncounterIds,
    MAX_SELL_SLOTS, LOW_STAMINA_THRESHOLD, LOW_STAMINA_DAMAGE_PENALTY,
    isStaminaDepletedForPenalty, effectiveDps: isStaminaDepletedForPenalty
      ? player.dps * LOW_STAMINA_DAMAGE_PENALTY : player.dps,
    // derived data
    finalInventoryList, currentInventoryPage, paddedInventory,
    // functions
    log, playSound, generateEnemy, generateZones, checkLevelUp,
    endBattle, endExpeditionPointSuccess, endExpeditionFail, endExpeditionSuccess,
    startGame, checkEncounter, startActiveExpedition,
    addEncountersToQueue, stopTravelOrGoHome,
    closeZoneModalAndStartPreparation, closeExpeditionModal,
    updateStats, handleDrop, handleDragStart, handleDropToGrid,
    stackInventory, unequipItem, applyConsumableEffect,
    handleModDrop, unequipMod, handleMouseMove, getCombinedStats,
    handleDropToSellBlock, handleRemoveFromSell, handleSell,
    calculateItemPrice, getSellPrice,
    removeEncounterFromQueue, startQueueItemTimer,
    startResting, formatTime, openZonesModal,
    handleZoneModalClose, handleClose, handleScroll, handleBalanceClick,
    openBaseModal, closeBaseModal,
    activeSoundRef, timerRef, encounterRef, battleMessageRef, battleIntervalRef,
    // images
    persImg, enemyImg, bandit1Img, mutantImg, mainImg, invnImg, fonImg,
    modalImg, offImg, onImg, craftImg, bgMusicImg, installImg,
    MapImg, military20, military1, military2, military3, military4,
    military5, military6, military7, bl2, startbattle, chips, balans,
    clickbutton, tooltip, slotImage, statsimg, tank, medic, melee,
    baseMilitary, scroll, arenabattle, shotenemy, EnemyImg, m134Snd,
    drobSnd, meleeSnd, healerSnd, sniperSnd, pistolSnd, sniperImg,
    deadImg, enemyDisplayImage,
    // constants
    DEFAULT_ENEMY_STATS, COLOR_MAP, BASE_POINTS, MAP_ZONES,
    QUALITY_TIERS, QUALITY_MULTIPLIERS, ITEMS_PER_PAGE, TOTAL_SLOTS,
    TIME_TO_RETURN_HOME,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
}
