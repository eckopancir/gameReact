import React, { useState, useEffect, useMemo, useRef } from 'react';
import './BattleArena.css';
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
import MapBattleImg from './assets/Images/map/mapbattle.png';
import o1 from './assets/Images/battle/o1.png';
import o2 from './assets/Images/battle/o2.png';
import o3 from './assets/Images/battle/o3.png';
import o4 from './assets/Images/battle/o4.png';
import o5 from './assets/Images/battle/o5.png';
import o6 from './assets/Images/battle/o6.png';
import o7 from './assets/Images/battle/o7.png';
import o8 from './assets/Images/battle/o8.png';
import o9 from './assets/Images/battle/o9.png';
import o10 from './assets/Images/battle/o10.png';
import o11 from './assets/Images/battle/o11.png';
import o12 from './assets/Images/battle/o12.png';
import o13 from './assets/Images/battle/o13.png';
import o14 from './assets/Images/battle/o14.png';
import o15 from './assets/Images/battle/o15.png';
import o16 from './assets/Images/battle/o16.png';
import o18 from './assets/Images/battle/o18.png';
import o17 from './assets/Images/battle/o17.png';
import o19 from './assets/Images/battle/o19.png';
import o20 from './assets/Images/battle/o20.png';
import o21 from './assets/Images/battle/o21.png';
import o22 from './assets/Images/battle/o22.png';
import mainImg from './assets/Images/ui/main.png';
import o23 from './assets/Images/battle/o23.png';
import o24 from './assets/Images/battle/o24.png';
import o25 from './assets/Images/battle/o25.png';
import o26 from './assets/Images/battle/o26.png';
import o27 from './assets/Images/battle/o27.png';
import EnemyImg from './assets/Images/characters/hero.png';
import critSnd from './assets/audio/effects/crit.mp3';
import aimShot from './assets/audio/effects/aimShot.mp3';
import defSnd from './assets/audio/effects/def.mp3';
import blockSnd from './assets/audio/effects/block.mp3';
import evasionSnd from './assets/audio/effects/evasion.mp3';
import runSnd from './assets/audio/effects/run.mp3';
import hero from './assets/Images/characters/hero.png';
import grenadeBoom from './assets/audio/effects/grenadeBoom.mp3';
import shot1 from './assets/audio/effects/shot1.mp3';
import shot2 from './assets/audio/effects/shot2.mp3';
import shotenemy from './assets/audio/effects/shotenemy.mp3';
import invis from './assets/audio/effects/invis.mp3';
import reload from './assets/audio/effects/reload.mp3';
import reloading from './assets/audio/effects/reloading.mp3';
import tank from './assets/Images/characters/tank.png';
import medic from './assets/Images/characters/medic.png';
import melee from './assets/Images/characters/melee.png';
import baseMilitary from './assets/Images/battle/baseMilitary.png';
import m134Snd from './assets/audio/effects/m134.mp3';
import drobSnd from './assets/audio/effects/drob.mp3';
import meleeSnd from './assets/audio/effects/melee.mp3';
import healerSnd from './assets/audio/effects/healer.mp3';
import sniperSnd from './assets/audio/effects/sniper.mp3';
import pistolSnd from './assets/audio/effects/pistol.mp3';
import sniperImg from './assets/Images/characters/sniperImg.png';
import military20 from './assets/Images/characters/military20.png';
import military21 from './assets/Images/characters/military20.png';
import military22 from './assets/Images/characters/military20.png';
import wilhelm_scream from './assets/audio/effects/wilhelm_scream.mp3';
import wilhelm_scream2 from './assets/audio/effects/wilhelm_scream2.mp3';
import wilhelm_scream3 from './assets/audio/effects/wilhelm_scream3.mp3';
import wilhelm_scream4 from './assets/audio/effects/wilhelm_scream4.mp3';
import wilhelm_scream5 from './assets/audio/effects/wilhelm_scream5.mp3';

const deathSounds = [
  wilhelm_scream,
  wilhelm_scream2,
  wilhelm_scream3,
  wilhelm_scream4,
  wilhelm_scream5,
];
const currentHour = new Date().getHours();
const isNightTime = currentHour >= 0 && currentHour < 6;

const CLEAR_SIGHT_RANGE = 811;
const totalGridSize = 32;
const ATTACK_RANGE = 10;
const VISIBILITY_RANGE = 1112;
const smallObstacles = [o1, o2, o19, o20, o21];
const carImages = [o6, o7, o22, o23, o24];
const woodImages = [o3, o4, o26, o25];
const bigBuildingImages = [o8, o10, o11, o12, o13, o14, o15, o16, o17, o18, o27];
const BLOCK_REDUCTION = 0.5;
//Считает расстояние между точками.
const getDist = (p1, p2) => Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
//Вычисляет угол поворота персонажа.
const getAngle = (from, to) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  return Math.atan2(dy, dx) * (180 / Math.PI);
};
//Проверяет, не выходит ли координата за карту.
const isValidCell = (x, y) => x >= 0 && x < totalGridSize && y >= 0 && y < totalGridSize;
//Проверяет, не выходит ли координата за карту.
const checkVisibility = (viewerPos, viewerRotation, targetPos, obstacles, config = {}) => {
  const { range = 14, fov = 120, clearRange = 8, clearFov = 130, isShallowCheck = false } = config;

  const dist = getDist(viewerPos, targetPos);
  if (dist > range) return false;
  if (dist <= 1) return true;

  const angleToTarget = getAngle(viewerPos, targetPos);
  let diff = Math.abs(angleToTarget - viewerRotation);
  if (diff > 180) diff = 360 - diff;

  if (dist <= clearRange && diff <= clearFov / 2) {
    return true;
  }

  if (diff > fov / 2) return false;

  if (isShallowCheck) return true;

  const dx = targetPos.x - viewerPos.x;
  const dy = targetPos.y - viewerPos.y;
  const steps = Math.max(Math.abs(dx), Math.abs(dy)) * 2;

  for (let i = 1; i < steps; i++) {
    const checkX = Math.round(viewerPos.x + (dx * i) / steps);
    const checkY = Math.round(viewerPos.y + (dy * i) / steps);

    if (!isValidCell(checkX, checkY)) continue;

    const isBlocking = obstacles.some(
      (obs) =>
        obs.isHigh &&
        obs.x === checkX &&
        obs.y === checkY &&
        !(checkX === viewerPos.x && checkY === viewerPos.y) &&
        !(checkX === targetPos.x && checkY === targetPos.y),
    );

    if (isBlocking) return false;
  }

  return true;
};
const BattleArena = ({
  player,
  playerCurrentHp,
  setPlayerCurrentHp,
  enemy,
  enemyCurrentHp,
  setEnemyCurrentHp,
  isFighting,
  log,
  setPlayerTotalDamage,
  setEnemyTotalDamage,
  enemies,
  setEnemies,
  endBattle,
  enemyReserve = [],
  onTakeItem, // Передаем из App.jsx
  generateItem,
  generateEnemy,
  playerLevel,
}) => {
  const [turn, setTurn] = useState('PLAYERBATTLE');
  const [playerPos, setPlayerPos] = useState({ x: 2, y: 2 });
  const [ap, setAp] = useState(5);
  const [ammo, setAmmo] = useState(30);
  const [isDefensiveMode, setIsDefensiveMode] = useState(false);
  const [isRightMouseDown, setIsRightMouseDown] = useState(false);
  const currentRangeBonus = isDefensiveMode ? 2 : 0;
  const currentAttackRange = ATTACK_RANGE + currentRangeBonus;

  const [isSelected, setIsSelected] = useState(false);
  const [hoverPos, setHoverPos] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [playerRotation, setPlayerRotation] = useState(90);
  const [waypoints, setWaypoints] = useState([]);
  const [plannedPath, setPlannedPath] = useState([]);
  const [isVictory, setIsVictory] = useState(false);
  const [isPlayerHit, setIsPlayerHit] = useState(false);
  const [globalEffects, setGlobalEffects] = useState([]);
  const isEnemyThinking = useRef(false);
  const [battlePopups, setBattlePopups] = useState([]);
  const [shotLine, setShotLine] = useState(null);
  const [mapData, setMapData] = useState({
    small: [],
    medium: [],
    big: [],
    house: { x: -10, y: -10 },
  });
  const [visualExplosions, setVisualExplosions] = useState([]);
  const [isShaking, setIsShaking] = useState(false);
  const [lastPlayerPos, setLastPlayerPos] = useState({ x: 0, y: 0 });
  const [hoveredEnemyId, setHoveredEnemyId] = useState(null);
  const [roundCount, setRoundCount] = useState(1);
  const [reserve, setReserve] = useState(enemyReserve);
  const [targetEnemyId, setTargetEnemyId] = useState(null);
  const [flyingGrenade, setFlyingGrenade] = useState(null);
  const [lootingEnemy, setLootingEnemy] = useState(null);
  const [enemiesData, setEnemiesData] = useState(
    enemies.map((e, i) => ({
      ...e,
      id: i,
      currentHp: e.health,
      // Разносим по вертикали на 6 клеток друг от друга
      pos: e.pos && e.pos.y < totalGridSize ? e.pos : { x: 31 - (i % 2), y: 22 + (i % 3) * 3 },
      isHit: false,
    })),
  );

  const playerXpct = (playerPos.x / 31) * 100;
  const playerYpct = (playerPos.y / 31) * 100;
  const dynamicFogStyle = {
    background: `radial-gradient(
      circle 202px at ${playerXpct}% ${playerYpct}%, 
      transparent 2220%,  //было 22
      rgba(0, 10, 0, 0.7) 60%, 
      rgba(0, 0, 0, 0.95) 120%
    )`,
  };
  // Теперь панель будет реагировать на изменение HP внутри enemiesData
  const hoveredEnemy = useMemo(
    () => enemiesData.find((e) => e.id === hoveredEnemyId),
    [enemiesData, hoveredEnemyId],
  );

  //БОЕВВЫЕ ФУНКЦИИ.........................................

  //Рассчитывает урон, криты и увороты
  const calculateCombatResult = (attacker, target) => {
    let dmg = attacker.dps;
    let text = '';
    let type = 'NORMAL';
    let sound = null;

    // --- 1. ПРОВЕРКА НА ПРОМАХ (МЕТКОСТЬ) ---
    const currentHour = new Date().getHours();
    const isNightTime = currentHour >= 0 && currentHour < 6;
    const nightPenalty = isNightTime && !attacker.isPlayer ? 0.2 : 0;
    const finalAccuracy = Math.max(0, (attacker.accuracy || 0) - nightPenalty);

    if (Math.random() > finalAccuracy && finalAccuracy < 1) {
      return { damage: 0, type: 'MISS', text: 'ПРОМАХ', sound: null };
    }

    // --- 2. РАСЧЕТ БРОНИ (С УЧЕТОМ ПРОБИТИЯ) ---
    const effectiveArmor = target.armor * (1 - (attacker.punching || 0));
    dmg = Math.max(0, dmg - effectiveArmor);

    // --- 3. ПРОВЕРКА НА УВОРОТ ---
    let evasionChance = target.evasion || 0;
    if (finalAccuracy > 1) {
      const overAcc = finalAccuracy - 1;
      if (Math.random() < overAcc) evasionChance = 0;
    }
    if (Math.random() < evasionChance) {
      return { damage: 0, type: 'EVASION', text: 'УВОРОТ', sound: evasionSnd };
    }

    // --- 4. КРИТИЧЕСКИЙ УРОН (ПРОГРЕССИВНЫЕ ТИРЫ) ---
    const critVal = attacker.crit || 0;
    let critMultiplier = 1;
    let isCrit = false;

    // Если шанс > 0, проверяем, сработал ли крит (капим шанс на 100%)
    if (critVal > 0 && Math.random() < Math.min(1, critVal)) {
      isCrit = true;
      if (critVal >= 3.0) critMultiplier = 5; // 300%+ -> x5
      else if (critVal >= 1.0) critMultiplier = 3; // 100-299% -> x3
      else critMultiplier = 2; // 1-99% -> x2

      dmg *= critMultiplier;
      type = 'CRIT';
      sound = critSnd;
    }

    // --- 5. БЛОК (ПРОГРЕССИВНЫЕ ТИРЫ) ---
    const blockVal = target.block || 0;
    let isBlocked = false;
    let currentBlockReduction = 0.5; // Дефолтный блок 50%

    // Проверяем шанс блока (капим шанс на 100%)
    if (blockVal > 0 && Math.random() < Math.min(1, blockVal)) {
      isBlocked = true;

      // Определяем силу поглощения урона
      if (blockVal >= 3.0) currentBlockReduction = 0.9; // 300%+ -> режет 90%
      else if (blockVal >= 2.0) currentBlockReduction = 0.8; // 200-299% -> режет 80%
      else currentBlockReduction = 0.5; // 1-199% -> режет 50%

      dmg *= 1 - currentBlockReduction;
      // Звук блока ставим только если он не перекрывает что-то более важное
      if (!sound) sound = blockSnd;
    }

    // --- 6. ФОРМИРОВАНИЕ ТЕКСТА И ВИЗУАЛА ---
    if (isCrit && isBlocked) {
      text = `💥 КРИТ ЗАБЛОКИРОВАН! -${dmg.toFixed(1)}`;
      type = 'BLOCK'; // Используем тип блока для цвета попапа
      sound = blockSnd; // При блоке крита звук удара по броне логичнее
    } else if (isCrit) {
      text = `🔥 КРИТ x${critMultiplier}! -${dmg.toFixed(1)}`;
    } else if (isBlocked) {
      text = `🛡️ БЛОК -${(currentBlockReduction * 100).toFixed(0)}%! -${dmg.toFixed(1)}`;
      type = 'BLOCK';
    } else {
      text = `-${dmg.toFixed(1)}`;
    }

    return { damage: dmg, type, text, sound };
  };
  //Обрабатывает клик: атака или движение
  const handleCellClick = (index) => {
    if (turn !== 'PLAYERBATTLE' || isMoving || ap <= 0) return;

    const clickedCoord = { x: index % totalGridSize, y: Math.floor(index / totalGridSize) };

    // 1. Ищем живого врага для атаки (твой старый код)
    const clickedEnemy = enemiesData.find(
      (e) => e.pos.x === clickedCoord.x && e.pos.y === clickedCoord.y && e.currentHp > 0,
    );

    if (clickedEnemy) {
      setTargetEnemyId(clickedEnemy.id);
      handleAttack(clickedEnemy);
      return;
    }

    // 2. НОВОЕ: Проверяем наличие трупов на этой клетке
    const deadEnemiesOnCell = enemiesData.filter(
      (e) =>
        e.pos.x === clickedCoord.x &&
        e.pos.y === clickedCoord.y &&
        e.currentHp <= 0 &&
        e.loot &&
        e.loot.length > 0,
    );

    if (deadEnemiesOnCell.length > 0) {
      // Собираем весь лут в один массив, помечая, какому врагу принадлежит вещь
      const combinedLoot = deadEnemiesOnCell.flatMap((enemy) =>
        enemy.loot.map((item) => ({ ...item, parentEnemyId: enemy.id })),
      );

      // Открываем окно лута. Мы передаем специальный объект "сборного трупа"
      setLootingEnemy({
        id: 'combined-loot',
        name: 'Обыск тел',
        loot: combinedLoot,
      });
      return;
    }

    // 3. Если кликнули по пустой клетке — идем (твой старый код)
    if (!isSelected) return;
    const path = findPath(playerPos, clickedCoord, 20);
    if (path && path.length - 1 <= ap) {
      executeMove(path);
    }
  };
  //Пошагово перемещает игрока по пути
  const executeMove = async (path) => {
    setIsDefensiveMode(false);
    setIsMoving(true);
    setIsSelected(false);
    setWaypoints([]);
    setPlannedPath([]);

    const stepsTaken = path.length - 1;

    runAudio.play().catch(() => { });

    for (let i = 1; i < path.length; i++) {
      const currentStep = path[i];
      const previousStep = path[i - 1];
      setPlayerRotation(getAngle(previousStep, currentStep));
      setPlayerPos(currentStep);

      await new Promise((r) => setTimeout(r, 220));
    }

    runAudio.pause();
    runAudio.currentTime = 0;

    const newAp = ap - stepsTaken;
    setAp(newAp);
    setIsMoving(false);

    if (newAp <= 0) {
      endTurn();
    }
  };
  //Общий движок стрельбы, урона и звука
  const executeAttack = async (attackerObj, targetObj, shotType = 'normal') => {
    const isPlayerAttacking = attackerObj.isPlayer;
    const atk = isPlayerAttacking ? player : attackerObj;

    // 1. ОПРЕДЕЛЯЕМ ТИП ДЕЙСТВИЯ
    const isMedicHealing =
      !isPlayerAttacking && attackerObj.name === 'Военные (medic)' && !targetObj.isPlayer;

    // 2. ПОВОРОТ И ВИЗУАЛ (Общее для всех)
    attackerObj.rotationSetter(getAngle(attackerObj.pos, targetObj.pos));
    setShotLine({
      from: attackerObj.pos,
      to: targetObj.pos,
      type: shotType, // <--- Теперь линия знает, какая она
    });
    const lineDuration = shotType === 'aim' ? 800 : 40;
    setTimeout(() => setShotLine(null), lineDuration);

    // 3. ЗВУК (Медик использует свой healerSnd, остальные — стрельбу)
    const fireSound = isPlayerAttacking
      ? Math.random() > 0.5
        ? shot1
        : shot2
      : attackerObj.soundAttack || shotenemy;
    playCombatSound(fireSound);

    // --- ЛОГИКА АНИМАЦИИ МЕЧНИКА ---
    if (attackerObj.name === 'Военные (melle)') {
      setEnemiesData((prev) =>
        prev.map((e) => (e.id === attackerObj.id ? { ...e, isSpinning: true } : e)),
      );
      setTimeout(() => {
        setEnemiesData((prev) =>
          prev.map((e) => (e.id === attackerObj.id ? { ...e, isSpinning: false } : e)),
        );
      }, 300);
    }

    // --- ВЕТКА МЕДИКА (ЛЕЧЕНИЕ) ---
    if (isMedicHealing) {
      const healValue = atk.damage || 10; // Лечит на величину своего урона

      targetObj.hpSetter((prev) => Math.min(targetObj.health, prev + healValue));
      addPopup(targetObj.pos.x, targetObj.pos.y, `+${healValue.toFixed(1)} HP`, 'HEAL');

      return { damage: 0, type: 'HEAL' }; // Прерываем функцию, чтобы не наносить урон
    }

    // --- ВЕТКА ОБЫЧНОЙ АТАКИ (УРОН) ---

    // Расчет эффективного DPS игрока
    let effectiveDps = atk.dps;
    if (isPlayerAttacking) {
      const { faction } = targetObj; // Убедись, что 'enemy' доступен в области видимости или бери из targetObj
      if (faction === 'Мутанты') effectiveDps = Math.max(atk.dps, atk.dpsToxis);
      else if (faction === 'Роботы') effectiveDps = Math.max(atk.dps, atk.dpsEmi);
      else if (['Бандиты', 'Военные'].includes(faction)) {
        effectiveDps = Math.max(atk.dps, atk.dpsExtro, atk.dpsFire);
      }
      if (atk.stamina < 0.1) effectiveDps *= 0.5;
    }

    const attackerStats = {
      ...atk,
      dps: isPlayerAttacking ? effectiveDps : atk.dps,
      crit: atk.crit, // Явно прокидываем обновленный крит
      speed: atk.speed, // Явно прокидываем обновленную скорость
    };

    const result = calculateCombatResult(attackerStats, targetObj);

    if (result.sound) {
      setTimeout(() => playCombatSound(result.sound), 100);
    }

    if (result.damage > 0) {
      targetObj.hitSetter(true);
      setTimeout(() => targetObj.hitSetter(false), 300);
      targetObj.hpSetter((prev) => Math.max(0, prev - result.damage));

      // Вампиризм и Регенерация
      const healVamp = result.damage * (atk.vampir || 0);
      if (healVamp > 0) {
        attackerObj.hpSetter((prev) => Math.min(atk.health, prev + healVamp));
        addPopup(attackerObj.pos.x, attackerObj.pos.y, `+${healVamp.toFixed(1)} 🩸`, 'VAMP');
      }

      if (isPlayerAttacking) setPlayerTotalDamage((p) => p + result.damage);
      else setEnemyTotalDamage((p) => p + result.damage);
    }

    // Общий реген атакующего (если есть)
    if (atk.regen > 0) {
      attackerObj.hpSetter((prev) => Math.min(atk.health, prev + atk.regen));
      addPopup(attackerObj.pos.x, attackerObj.pos.y, `+${atk.regen.toFixed(1)} HP`, 'HEAL');
    }

    addPopup(targetObj.pos.x, targetObj.pos.y, result.text, result.type);

    return result;
  };
  //Запускает атаку игрока, тратит AP

  const handleAttack = (forcedEnemy = null) => {
    const shotCost = 1;
    // Находим данные о конкретном враге, в которого целимся
    const currentTarget = forcedEnemy || enemiesData.find((e) => e.id === targetEnemyId);
    // --- ЗАЩИТА ОТ СТРЕЛЬБЫ ПО ТРУПАМ ---
    // Если цель не найдена ИЛИ она уже мертва (HP <= 0)
    if (!currentTarget || currentTarget.currentHp <= 0) {
      // Если игрок пытался выстрелить в труп, сбрасываем таргет
      if (targetEnemyId) setTargetEnemyId(null);
      return; // Просто выходим, не тратя патроны и AP
    }
    // 1. Проверка условий возможности выстрела
    if (turn !== 'PLAYERBATTLE' || isMoving) return;
    const effectiveRange = isDefensiveMode ? currentAttackRange + 3 : currentAttackRange;
    if (ammo <= 0) {
      addPopup(playerPos.x, playerPos.y, 'НЕТ ПАТРОНОВ', 'ERROR');
      return;
    }

    if (ap < shotCost) {
      addPopup(playerPos.x, playerPos.y, 'МАЛО ОД', 'ERROR');
      return;
    }

    if (!currentTarget) {
      addPopup(playerPos.x, playerPos.y, 'ВЫБЕРИТЕ ЦЕЛЬ', 'ERROR');
      return;
    }

    // 2. Если все условия пройдены, проверяем дистанцию
    const dist = getDist(playerPos, currentTarget.pos);

    if (dist <= effectiveRange) {
      executeAttack(
        {
          pos: playerPos,
          rotationSetter: setPlayerRotation,
          hpSetter: setPlayerCurrentHp,
          isPlayer: true,
        },
        {
          pos: currentTarget.pos,
          hpSetter: (val) => updateSpecificEnemyHp(currentTarget.id, val),
          hitSetter: (val) => updateSpecificEnemyHit(currentTarget.id, val),
          ...currentTarget,
        },
      );

      setAmmo((prev) => prev - 1);
      const nextAp = ap - shotCost;
      setAp(nextAp);

      // Автоматическое завершение хода, если очки кончились
      if (nextAp < shotCost) {
        setTimeout(() => {
          if (nextAp <= 0) {
            // Проверяем, остались ли живые враги на поле ИЛИ в резерве
            const anyAlive = enemiesData.some((e) => e.currentHp > 0);
            const hasReserve = reserve && reserve.length > 0;

            if (anyAlive || hasReserve) {
              endTurn();
            } else {
              // РАСЧЕТ БОНУСА СКОРОСТИ
              const baseAp = 5;
              const speedBonus = player.speed > 1.0 ? Math.floor((player.speed - 1.0) / 0.2) : 0;
              setAp(baseAp + speedBonus);

              log('Поле зачищено. Очки хода обновлены с учетом скорости.');
            }
          }
        }, 800);
      }
    } else {
      // Если патроны есть, AP есть, но враг слишком далеко
      addPopup(playerPos.x, playerPos.y, 'ДАЛЕКО', 'ERROR');
    }
  };

  //конец боя
  useEffect(() => {
    const allDead = enemiesData.length > 0 && enemiesData.every((e) => e.currentHp <= 0);

    // Если все мертвы и мы еще не в режиме победы
    if (allDead && isFighting && !isVictory) {
      setIsVictory(true);
      log('✌️ Все враги повержены! Обыщите трупы и завершите вылазку.');
    }

    // Если умер игрок — тут оставляем как было (мгновенное поражение)
    if (playerCurrentHp <= 0 && isFighting) {
      const survivingEnemyHp = enemiesData.find((e) => e.currentHp > 0)?.currentHp || 0;
      endBattle(false, true, 0, survivingEnemyHp);
    }
  }, [enemiesData, playerCurrentHp, isFighting, isVictory]);
  //всю логику способностей
  const executeEnemySkill = async (skillName, enemy, pPos) => {
    if (enemy.cooldowns && enemy.cooldowns[skillName] > 0) {
      return null;
    }
    const dist = getDist(enemy.pos, pPos);
    console.log(`Проверка тарана: Дистанция ${dist}`);
    const range = enemy.rangeDistance || 7;

    // 1. Глобальная проверка дистанции для ВСЕХ боевых навыков
    // Навыки призыва или самолечения срабатывают всегда, остальные — только в радиусе атаки
    const combatSkills = [
      'aimShot',
      'madness',
      'grenade',
      'redZone',
      'suppression',
      'ram',
      'invisibility',
    ];
    if (combatSkills.includes(skillName)) {
      // ИНДИВИДУАЛЬНЫЕ ЛИМИТЫ ДЛЯ НАВЫКОВ
      let maxSkillRange = enemy.rangeDistance || 7;

      if (skillName === 'ram') {
        maxSkillRange = 8; // Таран можно начать даже если rangeDistance врага = 1
      }

      if (skillName === 'aimShot') {
        maxSkillRange = (enemy.rangeDistance || 7) + 3; // Снайпер видит чуть дальше обычного
      }

      // Если дистанция больше лимита конкретного скилла — выходим
      if (dist > maxSkillRange) return null;
    }

    const setCd = (name, turns) => {
      setEnemiesData((prev) =>
        prev.map((e) =>
          e.id === enemy.id ? { ...e, cooldowns: { ...e.cooldowns, [name]: turns } } : e,
        ),
      );
    };

    switch (skillName) {
      case 'rage':
        if (enemy.currentHp < enemy.health * 0.5 && !enemy.isEnraged) {
          addPopup(enemy.pos.x, enemy.pos.y, '💢 ЯРОСТЬ!', 'CRIT');

          // ЛОКАЛЬНАЯ ФИКСАЦИЯ (Чтобы цикл ИИ сразу увидел изменения)
          enemy.isEnraged = true;

          setEnemiesData((prev) =>
            prev.map((e) => {
              if (e.id === enemy.id) {
                const currentScale = parseInt(e.bigModel) || 100;
                const newScale = `${currentScale + 20}%`;
                return {
                  ...e,
                  isEnraged: true,
                  rageTurns: 4,
                  bigModel: newScale,
                  regen: (e.regen || 0) * 10,
                  runAp: (e.runAp || 5) * 2,
                };
              }
              return e;
            }),
          );
          return { costAp: 0, boostAp: true };
        }
        break;
      case 'aimShot':
        // 1. Проверка дистанции
        const aimRange = (enemy.rangeDistance || 7) + 2;
        if (dist > aimRange) return null;

        // 2. Анонс подготовки
        addPopup(enemy.pos.x, enemy.pos.y, '🎯 ПРИЦЕЛЬНЫЙ ВЫСТРЕЛ', 'CRIT');
        await new Promise((r) => setTimeout(r, 800));

        // 3. ПОДГОТОВКА СТАТОВ (Интеграция с твоей системой)
        const attackerStats = {
          ...enemy,
          // Снайперский выстрел имеет базу x2 от обычного урона
          dps: enemy.damage * 2.0,
          // Огромный бонус к меткости, подавляющий уворот игрока
          accuracy: (enemy.accuracy || 1) + 2.0,
          // Крит и Пробитие подтягиваются из объекта enemy автоматически
        };

        // 4. Визуал: Поворот
        const shootAngle = getAngle(enemy.pos, pPos);
        setEnemiesData((prev) =>
          prev.map((e) => (e.id === enemy.id ? { ...e, rotation: shootAngle } : e)),
        );

        // 5. ВЫСТРЕЛ
        setShotLine({ from: enemy.pos, to: pPos, type: 'aim' });
        playCombatSound(aimShot);
        triggerShake();

        // 6. РАСЧЕТ ЧЕРЕЗ ОБЩИЙ ДВИЖОК (calculateCombatResult)
        // Теперь здесь учитываются Твои Блок, Броня и Крит Тиры врага
        const result = calculateCombatResult(attackerStats, player);

        if (result.damage > 0) {
          setPlayerCurrentHp((p) => Math.max(0, p - result.damage));

          // Попап теперь пишет "КРИТ x5" или "БЛОК -90%", если они сработали
          addPopup(pPos.x, pPos.y, result.text, result.type);
        } else {
          addPopup(pPos.x, pPos.y, result.text, 'SPECIAL'); // Промах или Уворот
        }

        // 7. Очистка линии
        setTimeout(() => setShotLine(null), 400);

        // 8. Завершение
        setCd('aimShot', 5);
        return { spendAllAp: true };

      case 'invisibility':
        playCombatSound(invis);
        addPopup(enemy.pos.x, enemy.pos.y, '👤 ИНВИЗ', 'SPECIAL');
        setEnemiesData((prev) =>
          prev.map((e) =>
            e.id === enemy.id
              ? {
                ...e,
                isInvisible: true,
                invisTurns: 2,
                // Запоминаем текущий уворот перед баффом
                baseEvasion: e.evasion || 0,
                evasion: 1.0,
              }
              : e,
          ),
        );
        setCd('invisibility', 5);
        return { costAp: 1 };
      case 'ram':
        // Используем Math.round, чтобы убрать микро-дробь диагонали (5.09 -> 5)
        const checkDist = Math.round(dist);

        if (checkDist <= 8 && checkDist >= 2) {
          // ВАЖНО: разрешаем findPath проходить сквозь других врагов для тарана
          const path = findPath(enemy.pos, pPos, 20);

          if (path && path.length > 1) {
            addPopup(enemy.pos.x, enemy.pos.y, '🏃 ТАРАН!', 'CRIT');

            const finalStep = path[path.length - 2];

            // Логика анимации (оставляем твою, она ок)
            for (let i = 0; i < path.length - 1; i++) {
              const step = path[i];
              setEnemiesData((prev) =>
                prev.map((e) => (e.id === enemy.id ? { ...e, pos: step } : e)),
              );
              await new Promise((r) => setTimeout(r, 40));
            }

            const result = calculateCombatResult({ ...enemy, dps: enemy.damage * 2 }, player);
            setPlayerCurrentHp((p) => Math.max(0, p - result.damage));
            triggerShake();
            addPopup(pPos.x, pPos.y, `БА-БАХ! ${result.text}`, result.type);

            // ОБЯЗАТЕЛЬНО обновляем локальный объект врага
            enemy.pos = finalStep;
            setCd('ram', 8);

            // ВОЗВРАЩАЕМ forcedPos (как ждет твой useEffect!)
            return {
              costAp: 3,
              forcedPos: finalStep, // Ключ должен быть таким же, как в условии useEffect
              spendAllAp: false,
            };
          } else {
            console.log('Таран: путь не найден (возможно, заблокирован)');
          }
        }
        break;

      case 'madness':
        addPopup(enemy.pos.x, enemy.pos.y, '🌀 БЕЗУМИЕ!', 'CRIT');

        // Цикл на 20 выстрелов
        for (let i = 0; i < 50; i++) {
          const rndPos = {
            x: pPos.x + (Math.random() * 1.2 - 0.6), // Чуть кучнее разброс
            y: pPos.y + (Math.random() * 1.2 - 0.6),
          };

          setShotLine({ from: enemy.pos, to: rndPos });
          playCombatSound(enemy.soundAttack);

          // Поднимаем шанс попадания до 40% и урон до 80% от базового урона врага
          if (Math.random() < 0.25) {
            // Расчет урона: (База * 0.8)
            // Если хочешь, чтобы учитывалась броня игрока, нужно вычитать player.armor
            const basePartDmg = enemy.damage * 1;

            // Пример с учетом брони (минимум 1 урон):
            const finalDmg = Math.max(1, basePartDmg - player.armor * 0.2);

            setPlayerCurrentHp((p) => Math.max(0, p - finalDmg));

            // Выводим попап (над игроком)
            addPopup(pPos.x, pPos.y, `-${finalDmg.toFixed(1)}`, 'ERROR');
          }

          // Пауза между выстрелами (100мс — это очень быстро, 2 секунды на всю очередь)
          await new Promise((r) => setTimeout(r, 100));
        }

        setCd('madness', 5);
        return { costAp: 3 };
      case 'stimulant':
        if (enemy.currentHp < enemy.health * 0.5) {
          // 1. Проверка: если мы уже заюзали это в этом цикле
          if (enemy.cooldowns?.['stimulant'] > 0) return null;

          addPopup(enemy.pos.x, enemy.pos.y, '💉 СТИМУЛЯТОР', 'HEAL');
          const healAmount = enemy.health * 0.3;

          updateSpecificEnemyHp(enemy.id, (prevHp) => Math.min(enemy.health, prevHp + healAmount));
          enemy.currentHp = Math.min(enemy.health, enemy.currentHp + healAmount);

          // 2. СТАВИМ КД В ОБЪЕКТ (ДЛЯ ИИ)
          if (!enemy.cooldowns) enemy.cooldowns = {};
          enemy.cooldowns['stimulant'] = 10;

          // 3. СТАВИМ КД В СТЕЙТ (ДЛЯ СЛЕДУЮЩИХ ХОДОВ)
          setCd('stimulant', 10);

          return { costAp: 4 };
        }
        break;
      case 'summoner':
        if (enemy.currentHp < enemy.health * 0.6 && !enemy.hasSummoned) {
          addPopup(enemy.pos.x, enemy.pos.y, '👥 ПОДМОГА', 'SPECIAL');

          // 1. Генерируем "честного" врага через твою функцию
          // Передаем -80 как difficultyModifier, чтобы срезать статы до 20%
          const minionBase = generateEnemy({ allowedFactions: ['Военные'] }, -80);

          // 2. Добавляем уникальные свойства призыва
          const minion = {
            ...minionBase,
            id: `minion-${Date.now()}`,
            name: `${enemy.name} (помощник)`,

            // Позиция: рядом с хозяином
            pos: { x: enemy.pos.x + 1, y: enemy.pos.y },

            // Визуал: берем скин и размер от хозяина, но уменьшаем модельку
            nowModel: enemy.nowModel,
            dead: enemy.dead,
            bigModel: '65%',

            // Логика: миньоны обычно не должны использовать сложные скиллы
            skillUse: [],
            cooldowns: {},
            isMinion: true,

            // Важные параметры хода (наследуем от хозяина для баланса)
            runAp: enemy.runAp,
            rangeDistance: enemy.rangeDistance,
            shotPrice: enemy.shotPrice,
          };

          // 3. Спавним в массив врагов
          setEnemiesData((prev) => [
            ...prev.map((e) => (e.id === enemy.id ? { ...e, hasSummoned: true } : e)),
            minion,
          ]);

          return { costAp: 2 };
        }
        break;

      case 'grenade':
        // 1. ПРОВЕРКА: Если в локальном объекте уже есть КД (из этого же хода), выходим
        if (enemy.cooldowns?.['grenade'] > 0) return null;

        addPopup(enemy.pos.x, enemy.pos.y, '💣 ГРАНАТА!', 'ERROR');

        // 2. Анимация полета
        setFlyingGrenade({ from: enemy.pos, to: enemy.pos });
        await new Promise((r) => setTimeout(r, 20));
        setFlyingGrenade({ from: enemy.pos, to: { ...pPos } });
        await new Promise((r) => setTimeout(r, 800));
        setFlyingGrenade(null);

        // 3. Создаем зону взрыва
        setGlobalEffects((prev) => [
          ...prev,
          {
            type: 'GRENADE',
            pos: { ...pPos },
            damage: enemy.damage * 10,
            timer: 2,
          },
        ]);

        // 4. УСТАНОВКА КД (Двойная защита)

        // А) В стейт React для будущих ходов
        setCd('grenade', 8);

        // Б) В локальный объект для ТЕКУЩЕГО цикла ИИ (чтобы не спамил сейчас)
        if (!enemy.cooldowns) enemy.cooldowns = {};
        enemy.cooldowns['grenade'] = 8;

        // 5. Возвращаем 0 стоимости
        return { costAp: 0 };

      case 'redZone':
        // 1. Проверка локального КД
        if (enemy.cooldowns?.['redZone'] > 0) return null;

        addPopup(enemy.pos.x, enemy.pos.y, '🚨 ЗАРЯДКА ОРУДИЯ', 'ERROR');

        setGlobalEffects((prev) => [
          ...prev,
          {
            type: 'REDZONE',
            pos: { x: pPos.x, y: pPos.y },
            damage: enemy.damage * 10,
            ownerId: enemy.id,
            timer: 2,
          },
        ]);

        // 2. ФИКСИРУЕМ КД ЛОКАЛЬНО
        if (!enemy.cooldowns) enemy.cooldowns = {};
        enemy.cooldowns['redZone'] = 6;

        setCd('redZone', 6);

        return { spendAllAp: true };
      case 'suppression':
        const isTargetStill =
          enemy.lastSeenPlayerPos &&
          enemy.lastSeenPlayerPos.x === pPos.x &&
          enemy.lastSeenPlayerPos.y === pPos.y;

        if (isTargetStill) {
          addPopup(enemy.pos.x, enemy.pos.y, '🔥 ПОДАВЛЕНИЕ: +5% CRIT +SPD', 'CRIT');

          // 1. Устанавливаем шаг 0.02 (это и есть 2%)
          // Для Крита: +0.02
          const newCrit = Number(((enemy.crit || 0) + 0.02).toFixed(2));

          // Для Скорости: тоже +0.02
          const newSpeed = Number(((enemy.speed || 0) + 0.02).toFixed(2));

          // 2. Пересчитываем DPS с новым маленьким шагом
          const newDps = Number((enemy.damage * (1 + newSpeed)).toFixed(1));

          // 3. Обновляем локальный объект (для текущего цикла хода ИИ)
          enemy.crit = newCrit;
          enemy.speed = newSpeed;
          enemy.dps = newDps;

          // 4. Обновляем стейт (для рендера и будущих ходов)
          setEnemiesData((prev) =>
            prev.map((e) => {
              if (e.id === enemy.id) {
                return {
                  ...e,
                  crit: newCrit,
                  speed: newSpeed,
                  dps: newDps, // Теперь боевой движок увидит новый урон
                  lastSeenPlayerPos: { ...pPos },
                };
              }
              return e;
            }),
          );
        } else {
          setEnemiesData((prev) =>
            prev.map((e) => (e.id === enemy.id ? { ...e, lastSeenPlayerPos: { ...pPos } } : e)),
          );
        }

        return { costAp: 0 };
    }
  };
  //Обработка RedZone и Гренады
  const handleGlobalEffects = async () => {
    const activeEffects = [];

    for (let eff of globalEffects) {
      if (eff.type === 'GRENADE') {
        if (eff.timer <= 0) {
          // --- МОМЕНТ ВЗРЫВА ---

          // 1. Проигрываем звук взрыва
          playCombatSound(grenadeBoom);

          // 2. Визуальная тряска экрана
          triggerShake();
          triggerExplosionEffect(eff.pos);
          const d = getDist(playerPos, eff.pos);
          if (d <= 2) {
            const finalDmg = eff.damage;
            setPlayerCurrentHp((p) => Math.max(0, p - finalDmg));
            addPopup(playerPos.x, playerPos.y, `💥 ГРАНАТА! -${finalDmg.toFixed(1)}`, 'ERROR');
          } else {
            addPopup(eff.pos.x, eff.pos.y, `💥 БАМ!`, 'SPECIAL');
          }
          // Эффект не добавляем в activeEffects, он исчезает
        } else {
          // Уменьшаем таймер и оставляем на поле
          activeEffects.push({ ...eff, timer: eff.timer - 1 });
          addPopup(eff.pos.x, eff.pos.y, `⏲️ ${eff.timer}`, 'SPECIAL');
        }
      }

      // --- ОБРАБОТКА RED ZONE (ОРУДИЕ) ---ss
      // --- ОБРАБОТКА RED ZONE (ОРУДИЕ) ---
      if (eff.type === 'REDZONE') {
        if (eff.timer <= 0) {
          // 1. УБРАЛИ setShotLine (луча больше нет)

          // 2. Проигрываем звук взрыва вместо aimShot
          playCombatSound(grenadeBoom);

          // 3. Визуальный эффект взрыва на месте цели и тряска
          triggerExplosionEffect(eff.pos);
          triggerShake();

          // 4. Проверка попадания (как и была)
          const isHit = playerPos.x === eff.pos.x && playerPos.y === eff.pos.y;
          if (isHit) {
            setPlayerCurrentHp((p) => Math.max(0, p - eff.damage));
            addPopup(
              playerPos.x,
              playerPos.y,
              `☢️ ПРЯМОЕ ПОПАДАНИЕ! -${eff.damage.toFixed(1)}`,
              'ERROR',
            );
          } else {
            addPopup(eff.pos.x, eff.pos.y, `💨 МИМО!`, 'SPECIAL');
          }

          // Эффект удаляется сам (не пушим его в activeEffects)
        } else {
          // Если еще не бахнуло — уменьшаем таймер
          activeEffects.push({ ...eff, timer: eff.timer - 1 });
          addPopup(eff.pos.x, eff.pos.y, `⚠️ ЗАХВАТ ЦЕЛИ`, 'ERROR');
        }
      }
    }
    setGlobalEffects(activeEffects);
  };
  //Логика ИИ
  useEffect(() => {
    if (turn === 'ENEMY' && !isMoving && !isEnemyThinking.current) {
      const runEnemiesAI = async () => {
        isEnemyThinking.current = true;
        log('Ход противника...');
        await handleGlobalEffects();
        // Сначала уменьшаем КД и длительность эффектов

        // 1. Сначала рассчитываем обновленный список врагов (с учетом спада эффектов)
        const updatedEnemiesAfterEffects = enemiesData.map((e) => {
          const nextInvisTurns = e.isInvisible ? Math.max(0, e.invisTurns - 1) : 0;
          const losingInvis = e.isInvisible && nextInvisTurns === 0;

          return {
            ...e,
            cooldowns: Object.fromEntries(
              Object.entries(e.cooldowns || {}).map(([k, v]) => [k, Math.max(0, v - 1)]),
            ),
            rageTurns: e.isEnraged ? Math.max(0, e.rageTurns - 1) : 0,
            invisTurns: nextInvisTurns,
            isEnraged: e.isEnraged && e.rageTurns > 0,
            isInvisible: nextInvisTurns > 0,
            evasion: losingInvis ? e.baseEvasion || 0 : e.evasion,
          };
        });

        // 2. Обновляем визуальный стейт
        setEnemiesData(updatedEnemiesAfterEffects);

        // 3. Используем эти же свежие данные для логики ИИ
        let currentEnemiesState = [...updatedEnemiesAfterEffects];

        for (let i = 0; i < currentEnemiesState.length; i++) {
          let currentEnemy = currentEnemiesState[i];
          if (currentEnemy.currentHp <= 0) continue;

          let currentEnemyAp = currentEnemy.runAp || 5;

          // --- ПРОВЕРКА СПОСОБНОСТЕЙ ---
          if (currentEnemy.skillUse) {
            for (const skill of currentEnemy.skillUse) {
              const res = await executeEnemySkill(skill, currentEnemy, playerPos);
              if (res) {
                // 1. Фикс Rage: если активировали ярость, увеличиваем текущие AP в этом цикле
                if (res.boostAp) {
                  currentEnemyAp = (currentEnemy.runAp || 5) * 2;
                }

                // 2. Вычитаем стоимость
                if (res.costAp) currentEnemyAp -= res.costAp;
                if (res.spendAllAp) currentEnemyAp = 0;

                // 3. Фикс Тарана: принудительно обновляем позицию, чтобы враг не "возвращался"
                if (res.forcedPos) {
                  currentEnemy.pos = res.forcedPos;
                  currentEnemiesState[i].pos = res.forcedPos;
                }

                await new Promise((r) => setTimeout(r, 600));
                if (currentEnemyAp <= 0) break;
              }
            }
          }

          const isMedic = currentEnemy.name === 'Военные (medic)';
          console.log(`Враг ${currentEnemy.id} начинает ход`);

          while (currentEnemyAp > 0) {
            let woundedAlly = null;
            let currentTargetPos = { ...playerPos }; // Используем уникальное имя переменной

            // Логика поиска цели для медика
            if (isMedic) {
              woundedAlly = currentEnemiesState.find(
                (e) => e.id !== currentEnemy.id && e.currentHp > 0 && e.currentHp < e.health * 0.95,
              );

              if (woundedAlly) {
                currentTargetPos = { ...woundedAlly.pos };
              } else {
                const leader = currentEnemiesState.find(
                  (e) => e.id !== currentEnemy.id && e.currentHp > 0,
                );
                if (leader) currentTargetPos = { ...leader.pos };
              }
            }

            const dist = getDist(currentEnemy.pos, currentTargetPos);
            const inRange = dist <= (currentEnemy.rangeDistance || 7);
            const canSeeTarget = checkVisibility(currentEnemy.pos, 0, currentTargetPos, obstacles, {
              range: 15,
              fov: 360,
            });

            const currentShotPrice = currentEnemy.shotPrice || 1;

            // --- БЛОК ДЕЙСТВИЯ (Атака или Лечение) ---
            if (canSeeTarget && inRange && currentEnemyAp >= currentShotPrice) {
              let finalTarget = null;

              if (isMedic) {
                if (woundedAlly) {
                  finalTarget = {
                    pos: woundedAlly.pos,
                    hpSetter: (val) => updateSpecificEnemyHp(woundedAlly.id, val),
                    hitSetter: (val) => updateSpecificEnemyHit(woundedAlly.id, val),
                    ...woundedAlly,
                  };
                } else {
                  console.log('Медик: раненых нет, стрелять в игрока не буду.');
                  // Выходим из цикла стрельбы, но не из хода (может еще походить)
                  // Если нужно, чтобы он просто стоял, замените на break
                }
              } else {
                finalTarget = {
                  pos: playerPos,
                  hpSetter: setPlayerCurrentHp,
                  hitSetter: setIsPlayerHit,
                  ...player,
                };
              }

              if (finalTarget) {
                await executeAttack(
                  {
                    ...currentEnemy,
                    rotationSetter: (ang) => {
                      setEnemiesData((prev) =>
                        prev.map((e) => (e.id === currentEnemy.id ? { ...e, rotation: ang } : e)),
                      );
                    },
                    isPlayer: false,
                    hpSetter: (val) => updateSpecificEnemyHp(currentEnemy.id, val),
                  },
                  finalTarget,
                );
                currentEnemyAp -= currentShotPrice;
                await new Promise((r) => setTimeout(r, 400));
                continue; // Проверяем состояние целей заново после выстрела
              }
            }

            // --- БЛОК ДВИЖЕНИЯ ---
            if (currentEnemyAp > 0) {
              const path = findPath(currentEnemy.pos, currentTargetPos, 100, currentEnemy.id);

              if (path && path.length > 1) {
                const nextStep = path[1];
                const isCellOccupied = currentEnemiesState.some(
                  (e) =>
                    e.id !== currentEnemy.id &&
                    e.pos.x === nextStep.x &&
                    e.pos.y === nextStep.y &&
                    e.currentHp > 0,
                );

                if (!isCellOccupied) {
                  const moveAngle = getAngle(currentEnemy.pos, nextStep);
                  currentEnemiesState[i].pos = nextStep;
                  currentEnemiesState[i].rotation = moveAngle;

                  setEnemiesData((prev) =>
                    prev.map((e) =>
                      e.id === currentEnemy.id ? { ...e, pos: nextStep, rotation: moveAngle } : e,
                    ),
                  );

                  currentEnemyAp -= 1;
                  await new Promise((r) => setTimeout(r, 200));
                } else {
                  break; // Клетка занята союзником
                }
              } else {
                break; // Путь не найден
              }
            } else {
              break; // Очки действия закончились
            }
          }
        }

        isEnemyThinking.current = false;
        setTurn('PLAYERBATTLE');
        const baseAp = 5;
        const speedBonus = player.speed > 1.0 ? Math.floor((player.speed - 1.0) / 0.2) : 0;
        setAp(baseAp + speedBonus);
        log('Ваш ход!');
      };

      runEnemiesAI();
    }
  }, [turn]);
  //БОЕВВЫЕ ФУНКЦИИ.........................................

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500); // Тряска длится 500мс
  };
  const updateSpecificEnemyHp = (id, action) => {
    // Мы не ищем врага снаружи через enemiesData.find!
    // Мы сделаем всё внутри setEnemiesData.

    setEnemiesData((prev) => {
      // 1. Ищем актуального врага прямо в текущем стейте
      const currentEnemy = prev.find((e) => e.id === id);
      if (!currentEnemy) return prev;

      const oldHp = currentEnemy.currentHp;

      // 2. Считаем новое HP
      const newHpVal = typeof action === 'function' ? action(oldHp) : action;
      const finalHp = Math.max(0, newHpVal);

      // 3. Если ничего не изменилось (например, HP уже полное), возвращаем стейт как есть
      if (oldHp === finalHp) return prev;

      let lootArray = [];
      let isJustDied = finalHp === 0 && oldHp > 0;
      let finalPos = currentEnemy.pos;

      if (isJustDied) {
        const randomScream = deathSounds[Math.floor(Math.random() * deathSounds.length)];
        playCombatSound(randomScream);

        // Логика отлетания трупа (используем prev для проверки соседних клеток)
        const isCellOccupiedByCorpse = prev.some(
          (e) =>
            e.id !== id &&
            e.currentHp <= 0 &&
            e.pos.x === currentEnemy.pos.x &&
            e.pos.y === currentEnemy.pos.y,
        );

        if (isCellOccupiedByCorpse) {
          finalPos = findFreeSpotForCorpse(currentEnemy.pos);
        }

        // Генерация лута
        if (Math.random() < 1) {
          // 100% шанс как в твоем коде
          const drop = generateItem(items, playerLevel);
          if (drop) lootArray.push(drop);
        }
        // ... остальные шансы на лут ...
        lootArray = lootArray.flat();
      }

      // 4. Возвращаем обновленный массив
      return prev.map((e) => {
        if (e.id === id) {
          if (isJustDied) {
            return { ...e, currentHp: 0, loot: lootArray, looted: false, pos: finalPos };
          }
          return { ...e, currentHp: finalHp };
        }
        return e;
      });
    });
  };
  //Передает ход противнику, сбрасывает AP
  const endTurn = () => {
    // 1. ПРОВЕРКА ПОБЕДЫ
    // Если все враги на поле мертвы и в резерве никого нет — ход врага не наступает
    const allDead = enemiesData.length > 0 && enemiesData.every((e) => e.currentHp <= 0);
    const noReserve = !reserve || reserve.length === 0;

    if (allDead && noReserve) {
      // РАСЧЕТ БОНУСА СКОРОСТИ
      const baseAp = 5;
      const speedBonus = player.speed > 1.0 ? Math.floor((player.speed - 1.0) / 0.2) : 0;
      setAp(baseAp + speedBonus);

      log('🕊️ Бой окончен. Свободное перемещение.');
      return;
    }

    setLastPlayerPos({ ...playerPos }); // ЗАПОМИНАЕМ, где стоял игрок
    setTurn('ENEMY');
    setAp(0);
    setIsDefensiveMode(false);
    setWaypoints([]);
    setPlannedPath([]);
    setIsSelected(false);

    // Проверка подкреплений
    if (roundCount % 2 === 0 && reserve.length > 0) {
      spawnWave();
    }

    setRoundCount((prev) => prev + 1);
  };
  //Пополняет патроны игрока за 3 AP
  const handleReload = () => {
    if (turn === 'PLAYERBATTLE' && ap >= 3) {
      playCombatSound(reloading);
      playCombatSound(reload);
      setTimeout(() => playCombatSound(reloadVoice), 500);
      setAmmo(30);
      setAp((prev) => Math.max(0, prev - 3));
      addPopup(playerPos.x, playerPos.y, 'ПЕРЕЗАРЯДКА', 'RELOAD');
    }
  };
  //Дает бонус защиты и дальности
  const takePosition = () => {
    // Проверяем, что сейчас ход игрока, достаточно AP (2) и мы не в процессе движения
    if (turn === 'PLAYERBATTLE' && ap >= 2 && !isMoving) {
      playCombatSound(defSnd);
      setIsDefensiveMode(true);
      setAp((prev) => prev - 2); // Тратим ровно 2 AP
      addPopup(playerPos.x, playerPos.y, 'ПОЗИЦИЯ: ДАЛЬНОСТЬ +3', 'BUFF');
    }
  };
  //WASD
  const handleKeyboardMove = (dx, dy) => {
    // Базовые проверки: ход игрока, не в движении, есть AP
    if (turn !== 'PLAYERBATTLE' || isMoving || ap <= 0) return;

    const newPos = { x: playerPos.x + dx, y: playerPos.y + dy };

    // Проверяем границы карты
    if (newPos.x < 0 || newPos.x >= totalGridSize || newPos.y < 0 || newPos.y >= totalGridSize)
      return;

    // Проверяем препятствия и врагов (используем вашу функцию isObstacle)
    if (isObstacle(newPos.x, newPos.y)) {
      addPopup(playerPos.x, playerPos.y, 'ПУТЬ ЗАНЯТ', 'ERROR');
      return;
    }

    // Если всё ок, вызываем executeMove с путем из двух точек (текущая и новая)
    executeMove([playerPos, newPos]);
  };
  // Поиск свободной клетки для отлета трупа
  const findFreeSpotForCorpse = (startPos) => {
    // 8 соседних клеток (верх, низ, лево, право и диагонали)
    const offsets = [
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: -1 },
      { x: -1, y: 1 },
      { x: -1, y: -1 },
    ];

    for (let o of offsets) {
      const checkX = startPos.x + o.x;
      const checkY = startPos.y + o.y;

      // 1. Проверяем границы карты
      if (!isValidCell(checkX, checkY)) continue;

      // 2. Проверяем стены (используем твою функцию isObstacle)
      // true в конце значит "игнорировать живых врагов", нам важны только стены
      if (isObstacle(checkX, checkY, true)) continue;

      // 3. Проверяем, нет ли ТУТ уже другого ТРУПА
      const isCorpseHere = enemiesData.some(
        (e) => e.currentHp <= 0 && e.pos.x === checkX && e.pos.y === checkY,
      );

      if (!isCorpseHere) {
        return { x: checkX, y: checkY }; // Нашли место!
      }
    }

    return startPos; // Если совсем некуда падать, остается на месте (наслоение)
  };
  const updateSpecificEnemyHit = (id, isHit) => {
    setEnemiesData((prev) => prev.map((e) => (e.id === id ? { ...e, isHit } : e)));
  };

  // Функция для спавна новой волны
  const spawnWave = () => {
    // Используем функциональное обновление для reserve, чтобы всегда иметь актуальные данные
    if (reserve.length === 0) return;

    const nextWave = reserve.slice(0, 3).map((e, i) => ({
      ...e,
      // Генерируем новый ID, чтобы избежать конфликтов с уже убитыми врагами
      id: `wave-${roundCount}-${i}-${Date.now()}`,
      pos: { x: 31 - (i % 2), y: 22 + (i % 3) * 3 },
      isHit: false,
      currentHp: e.health || e.currentHp,
      rotation: 270, // Чтобы сразу смотрели в сторону игрока
    }));

    setEnemiesData((prev) => [...prev, ...nextWave]);
    setReserve((prev) => prev.slice(3));
    log(`🚨 Подкрепление! Прибыло юнитов: ${nextWave.length}`);
  };
  //Проверяет видимость клетки для игрока
  const isCellVisible = (targetX, targetY) => {
    return checkVisibility(playerPos, playerRotation, { x: targetX, y: targetY }, obstacles, {
      range: VISIBILITY_RANGE,
      clearRange: CLEAR_SIGHT_RANGE,
    });
  };
  //Создает всплывающий текст урона/эффектов
  const addPopup = (x, y, text, type) => {
    const id = `${Date.now()}-${Math.random()}`; // Добавляем рандом, чтобы ключ был уникальным
    const newPopup = { id, x, y, text, type };

    setBattlePopups((prev) => [...prev, newPopup]);
    setTimeout(() => {
      setBattlePopups((prev) => prev.filter((p) => p.id !== id));
    }, 3000);
  };
  //Воспроизводит звуковые эффекты боя
  const playCombatSound = (src) => {
    const audio = new Audio(src);
    audio.volume = 0.4;
    audio.play().catch((e) => console.log('Sound play prevented', e));
  };

  const runAudio = useMemo(() => {
    const audio = new Audio(runSnd);
    audio.volume = 0.3;
    audio.loop = true;
    return audio;
  }, []);

  //Отрисовка обьектов
  const obstacles = useMemo(() => {
    const obs = [];
    const { small = [], medium = [], big = [], woods = [] } = mapData;

    big.forEach((b) => {
      for (let dx = 0; dx < 6; dx++) {
        for (let dy = 0; dy < 5; dy++) {
          obs.push({
            x: b.x + dx,
            y: b.y + dy,
            isHigh: true,
            type: 'big',
            imgIndex: b.imgIndex,

            isAnchor: dx === 0 && dy === 0,
          });
        }
      }
    });

    woods.forEach((w) => {
      for (let dx = 0; dx < 2; dx++) {
        for (let dy = 0; dy < 2; dy++) {
          obs.push({
            x: w.x + dx,
            y: w.y + dy,

            treeOriginX: w.x,
            treeOriginY: w.y,
            isHigh: false,
            isWalkable: true,
            type: 'woods',
            imgIndex: w.imgIndex,
            isAnchor: dx === 0 && dy === 0,
          });
        }
      }
    });

    medium.forEach((m) => {
      if (m.type === 'car') {
        [0, -1].forEach((dy, idx) => {
          obs.push({
            x: m.x,
            y: m.y + dy,
            isHigh: false,
            type: 'car',
            imgIndex: m.imgIndex,
            isAnchor: idx === 0,
          });
        });
      } else {
        for (let i = 0; i < 5; i++) {
          const dx = m.isLshape && i > 2 ? 1 : i;
          const dy = m.isLshape && i > 2 ? i - 2 : 0;
          obs.push({ x: m.x + dx, y: m.y + dy, isHigh: true, imgCustom: o5, isAnchor: true });
        }
      }
    });

    small.forEach((s) => {
      obs.push({
        x: s.x,
        y: s.y,
        isHigh: false,
        type: 'small',
        imgIndex: s.imgIndex,
        isAnchor: true,
      });
    });

    return obs;
  }, [mapData]);
  //Проверяет, занята ли клетка препятствием
  const isObstacle = (x, y, ignoreEnemies = false, currentMovingEnemyId = null) => {
    // 1. Проверка стен (статичные объекты)
    const isWall = obstacles.some((o) => o.x === x && o.y === y && !o.isWalkable);
    if (isWall) return true;

    // 2. Проверка живых существ
    if (!ignoreEnemies) {
      // Игрок всегда препятствие для ИИ
      if (playerPos.x === x && playerPos.y === y) return true;

      // Враги
      const isOtherEnemyInWay = enemiesData.some((e) => {
        if (e.currentHp <= 0) return false;

        // Клетка занята, ЕСЛИ:
        // Координаты совпадают И это НЕ тот враг, который сейчас ходит
        return e.pos.x === x && e.pos.y === y && e.id !== currentMovingEnemyId;
      });

      if (isOtherEnemyInWay) return true;
    }

    return false;
  };

  //Ищет кратчайший путь (алгоритм BFS)
  const findPath = (start, end, maxSteps = 100, selfId = null) => {
    // Убираем лог, чтобы не спамить в консоль, или оставляем для отладки
    // console.log(`[PATH] Ищем путь от (${start.x},${start.y}) до (${end.x},${end.y})`);

    // 1. Предварительная проверка: если цель внутри СТЕНЫ, то пути нет
    // Обрати внимание: тут мы ставим true (игнорировать врагов), чтобы проверить только стены
    if (isObstacle(end.x, end.y, true)) {
      console.warn(`[PATH] Цель (${end.x},${end.y}) в стене!`);
      return null;
    }

    const queue = [[start]];
    const visited = new Set([`${start.x},${start.y}`]);
    let iterations = 0;

    while (queue.length > 0) {
      iterations++;
      // Защита от зависания, если карта слишком сложная
      if (iterations > 3000) break;

      const path = queue.shift();
      const curr = path[path.length - 1];

      // Если пришли в точку назначения
      if (curr.x === end.x && curr.y === end.y) {
        return path;
      }

      if (path.length > maxSteps + 1) continue;

      const neighbors = [
        { x: curr.x + 1, y: curr.y },
        { x: curr.x - 1, y: curr.y },
        { x: curr.x, y: curr.y + 1 },
        { x: curr.x, y: curr.y - 1 },
      ];

      for (let n of neighbors) {
        let key = `${n.x},${n.y}`;

        if (n.x >= 0 && n.x < totalGridSize && n.y >= 0 && n.y < totalGridSize) {
          // ВОТ ТУТ ГЛАВНОЕ ИСПРАВЛЕНИЕ:
          // Мы проверяем: является ли сосед (n) нашей конечной целью (end)?
          const isTargetCell = n.x === end.x && n.y === end.y;

          // Если это целевая клетка, мы передаем true в третий аргумент (ignoreEnemies),
          // чтобы 'isObstacle' не считал игрока за стену.
          const blocked = isObstacle(n.x, n.y, isTargetCell, selfId);

          if (!blocked && !visited.has(key)) {
            visited.add(key);
            queue.push([...path, n]);
          }
        }
      }
    }

    // console.log(`[PATH] Путь не найден. Итераций: ${iterations}`);
    return null;
  };
  //Активирует режим выбора пути игроком
  const selectMe = () => {
    if (isMoving || turn !== 'PLAYERBATTLE') return;
    setIsSelected(true);
    setWaypoints([]);
    setPlannedPath([]);
    setIsLocating(true);
    setTimeout(() => setIsLocating(false), 800);
  };
  //Включает поворот персонажа правой кнопкой
  const handleMouseDown = (e, index) => {
    if (e.button === 2) {
      e.preventDefault();
      setIsRightMouseDown(true);
      rotateToCell(index);
    }
  };
  //Поворачивает игрока в сторону клика
  const rotateToCell = (index) => {
    if (turn !== 'PLAYERBATTLE' || isMoving) return;

    const target = {
      x: index % totalGridSize,
      y: Math.floor(index / totalGridSize),
    };

    if (target.x === playerPos.x && target.y === playerPos.y) return;

    setPlayerRotation(getAngle(playerPos, target));
  };
  //эффект взрыва для гранаты
  const triggerExplosionEffect = (pos) => {
    const id = Date.now();
    setVisualExplosions((prev) => [...prev, { id, pos }]);
    setTimeout(() => {
      setVisualExplosions((prev) => prev.filter((ex) => ex.id !== id));
    }, 500); // Длительность анимации
  };
  //Генерация карты
  useEffect(() => {
    const generatedSmall = [];
    const generatedMedium = [];
    const generatedBig = [];
    const generatedWoods = [];
    const occupied = new Set();

    const isAreaFree = (startX, startY, width, height) => {
      for (let x = startX; x < startX + width; x++) {
        for (let y = startY; y < startY + height; y++) {
          if (x < 0 || x >= totalGridSize || y < 0 || y >= totalGridSize) return false;
          if (occupied.has(`${x},${y}`)) return false;
        }
      }
      return true;
    };

    const markAreaOccupied = (startX, startY, width, height) => {
      for (let x = startX; x < startX + width; x++) {
        for (let y = startY; y < startY + height; y++) {
          occupied.add(`${x},${y}`);
        }
      }
    };

    markAreaOccupied(playerPos.x - 1, playerPos.y - 1, 3, 3);
    enemiesData.forEach((enemy) => {
      markAreaOccupied(enemy.pos.x - 1, enemy.pos.y - 1, 3, 3);
    });

    const bigCount = Math.floor(Math.random() * 2) + 3;
    for (let i = 0; i < bigCount; i++) {
      let attempts = 0;
      while (attempts < 50) {
        const x = Math.floor(Math.random() * (totalGridSize - 6));
        const y = Math.floor(Math.random() * (totalGridSize - 5));
        if (isAreaFree(x, y, 6, 5)) {
          generatedBig.push({
            x,
            y,
            imgIndex: Math.floor(Math.random() * bigBuildingImages.length),
          });
          markAreaOccupied(x, y, 6, 5);
          break;
        }
        attempts++;
      }
    }

    const carCount = Math.floor(Math.random() * 5) + 3;
    for (let i = 0; i < carCount; i++) {
      let attempts = 0;
      while (attempts < 30) {
        const x = Math.floor(Math.random() * totalGridSize);
        const y = Math.floor(Math.random() * (totalGridSize - 1)) + 1;

        if (isAreaFree(x, y - 1, 1, 2)) {
          generatedMedium.push({
            x,
            y,
            type: 'car',
            imgIndex: Math.floor(Math.random() * carImages.length),
          });
          markAreaOccupied(x, y - 1, 1, 2);
          break;
        }
        attempts++;
      }
    }

    const woodsCount = Math.floor(Math.random() * 50) + 10;
    for (let i = 0; i < woodsCount; i++) {
      let attempts = 0;
      while (attempts < 50) {
        const x = Math.floor(Math.random() * (totalGridSize - 1));
        const y = Math.floor(Math.random() * (totalGridSize - 1));

        if (isAreaFree(x, y, 2, 2)) {
          generatedWoods.push({
            x,
            y,
            imgIndex: Math.floor(Math.random() * woodImages.length),
          });
          markAreaOccupied(x, y, 2, 2);
          break;
        }
        attempts++;
      }
    }

    for (let i = 0; i < 4; i++) {
      let attempts = 0;
      while (attempts < 20) {
        const x = Math.floor(Math.random() * (totalGridSize - 3));
        const y = Math.floor(Math.random() * (totalGridSize - 3));
        const isLshape = Math.random() > 0.5;

        if (isAreaFree(x, y, 3, 3)) {
          generatedMedium.push({ x, y, type: 'fence', isLshape });

          for (let j = 0; j < 5; j++) {
            const dx = isLshape && j > 2 ? 1 : j;
            const dy = isLshape && j > 2 ? j - 2 : 0;
            occupied.add(`${x + dx},${y + dy}`);
          }
          break;
        }
        attempts++;
      }
    }

    let smallCount = 0;
    let attempts = 0;
    while (smallCount < 50 && attempts < 70) {
      const x = Math.floor(Math.random() * totalGridSize);
      const y = Math.floor(Math.random() * totalGridSize);

      if (isAreaFree(x, y, 1, 1)) {
        generatedSmall.push({
          x,
          y,
          imgIndex: Math.floor(Math.random() * smallObstacles.length),
        });
        markAreaOccupied(x, y, 1, 1);
        smallCount++;
      }
      attempts++;
    }

    setMapData({
      small: generatedSmall,
      medium: generatedMedium,
      big: generatedBig,
      woods: generatedWoods,
    });
  }, []);
  //Управление клавишами
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Если игрок в движении или сейчас ход врага — блокируем ввод
      if (isMoving || turn !== 'PLAYERBATTLE') return;

      // Проверяем, не открыто ли модальное окно (например, лута)
      // Если у тебя есть стейт lootingEnemy, добавь проверку: if (lootingEnemy) return;

      switch (e.code) {
        // --- ДВИЖЕНИЕ (WASD + Стрелки) ---
        case 'KeyW':
        case 'ArrowUp':
          handleKeyboardMove(0, -1);
          break;
        case 'KeyS':
        case 'ArrowDown':
          handleKeyboardMove(0, 1);
          break;
        case 'KeyA':
        case 'ArrowLeft':
          handleKeyboardMove(-1, 0);
          break;
        case 'KeyD':
        case 'ArrowRight':
          handleKeyboardMove(1, 0);
          break;

        // --- ДЕЙСТВИЯ ---
        case 'Space':
          e.preventDefault();
          selectMe(); // Выбор себя / Подсветка пути
          break;
        case 'KeyR':
          handleReload(); // Перезарядка (3 AP)
          break;
        case 'KeyF':
          takePosition(); // Защитная стойка (2 AP)
          break;
        case 'Enter':
          if (isVictory) {
            endBattle(true, false, playerCurrentHp, 0); // Выход при победе
          } else {
            endTurn(); // Пропуск хода
          }
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);

    // Добавляем зависимости, чтобы функции внутри имели доступ к актуальным AP и Ammo
  }, [isMoving, turn, playerPos, ap, ammo, isVictory]);
  //Планирование пути
  useEffect(() => {
    if (isSelected && hoverPos && !isMoving && turn === 'PLAYERBATTLE' && ap > 0) {
      const path = findPath(playerPos, hoverPos, 15);

      if (path) {
        const markedPath = path.map((p, index) => ({
          ...p,
          isInvalid: index > ap,
        }));
        setPlannedPath(markedPath);
      } else {
        setPlannedPath([]);
      }
    }
  }, [hoverPos, isSelected, playerPos, turn, ap, isMoving]);
  //Сброс вращения
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsRightMouseDown(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div className="battle-overlay">
      {/* --- ОБНОВЛЕННАЯ ПАНЕЛЬ ИНТЕРФЕЙСА --- */}
      {/* 1. ПАНЕЛЬ УПРАВЛЕНИЯ ТЕПЕРЬ СЛЕВА */}
      <div className="ui-panel-container vertical-layout">
        <div className="pda-screen-overlay"></div>

        <div className="ui-panel-header">
          <span className="pda-status">SYSTEM ACTIVE</span>
          <span className="pda-model">MK-III TACTICAL INTERFACE</span>
        </div>

        <div className="ui-panel-content">
          {/* Блок статов */}
          <div className="info-block">
            <div className="stat-row">
              <span className="label">ОЧКИ ДЕЙСТВИЙ:</span>
              <span className="value ap-counter">{ap} / 5</span>
            </div>
            <div className="ap-bar-container vertical-ap">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`ap-segment ${i < ap ? 'active' : ''}`}></div>
              ))}
            </div>
            <div className="stat-row">
              <span className="label">БОЕЗАПАС:</span>
              <span className="value">{ammo} / 30</span>
            </div>
          </div>

          {/* Основные действия */}
          <div className="actions-block vertical-actions">
            <button className={`pda-btn ${isSelected ? 'active' : ''}`} onClick={selectMe}>
              ГЕРОЙ <span className="key-hint">SPACE</span>
            </button>

            <button className="pda-btn" onClick={handleReload} disabled={ap < 3}>
              ЗАРЯДКА (3) <span className="key-hint">R</span>
            </button>

            <button
              className={`pda-btn ${isDefensiveMode ? 'active-mode' : ''}`}
              onClick={takePosition}
              disabled={ap < 2 || isDefensiveMode}>
              ЗАЩИТА (2) <span className="key-hint">F</span>
            </button>

            <button
              className="pda-btn attack-btn"
              onClick={() => handleAttack()}
              disabled={
                turn !== 'PLAYERBATTLE' ||
                ap < 1 ||
                isMoving ||
                !targetEnemyId ||
                enemiesData.find((e) => e.id === targetEnemyId)?.currentHp <= 0 // Кнопка выключится, если цель мертва
              }>
              ОГОНЬ (1) <span className="key-hint">MOUSE1</span>
            </button>
          </div>

          {/* Кнопка завершения хода */}
          <div className="end-turn-block">
            <button
              className="pda-btn end-turn-btn"
              onClick={endTurn}
              disabled={turn !== 'PLAYERBATTLE'}>
              ЗАВЕРШИТЬ ХОД <span className="key-hint">ENTER</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`battle-screen ${isShaking ? 'arena-shake' : ''}`}
        style={{ backgroundImage: `url(${MapBattleImg})` }}>
        {shotLine && (
          <svg className="shot-svg">
            <line
              className={`tracer-line ${shotLine.type === 'aim' ? 'aim-shot' : ''}`}
              x1={`${(shotLine.from.x * 100) / 32 + 1.5}%`}
              y1={`${(shotLine.from.y * 100) / 32 + 1.5}%`}
              x2={`${(shotLine.to.x * 100) / 32 + 1.5}%`}
              y2={`${(shotLine.to.y * 100) / 32 + 1.5}%`}
            />
          </svg>
        )}
        {battlePopups.map((p) => (
          <div
            key={p.id}
            className={`battle-popup ${p.type.toLowerCase()}`}
            style={{
              left: `${(p.x * 100) / 32}%`,
              top: `${(p.y * 100) / 32}%`,
            }}>
            {p.text}
          </div>
        ))}
        <div className="grid-overlay" onMouseLeave={() => setHoverPos(null)}>
          {Array.from({ length: totalGridSize * totalGridSize }).map((_, i) => {
            const x = i % totalGridSize;
            const y = Math.floor(i / totalGridSize);
            const obstacleData = obstacles.find((o) => o.x === x && o.y === y);
            let visible = isCellVisible(x, y);

            let isPlayerInsideThisTree = false;
            if (obstacleData && obstacleData.type === 'woods') {
              isPlayerInsideThisTree =
                playerPos.x >= obstacleData.treeOriginX &&
                playerPos.x < obstacleData.treeOriginX + 2 &&
                playerPos.y >= obstacleData.treeOriginY &&
                playerPos.y < obstacleData.treeOriginY + 2;

              if (isPlayerInsideThisTree) {
                visible = true;
              }
            }
            const pathPoint = plannedPath.find((p) => p.x === x && p.y === y);

            const isWp = waypoints.some((wp) => wp.x === x && wp.y === y);
            return (
              <div
                key={i}
                className={`cell ${pathPoint ? 'path-active' : ''} ${obstacleData ? 'obstacle-cell' : ''
                  }`}
                data-invalid={pathPoint?.isInvalid}
                onClick={() => handleCellClick(i)}
                onMouseDown={(e) => handleMouseDown(e, i)}
                onContextMenu={(e) => e.preventDefault()}
                onMouseEnter={() => {
                  setHoverPos({ x, y });
                  if (isRightMouseDown) {
                    rotateToCell(i);
                  }
                }}>
                {!visible && <div className="fog-overlay" />}
                {obstacleData && (
                  <img
                    src={
                      obstacleData.imgCustom ||
                      (obstacleData.type === 'big'
                        ? bigBuildingImages[obstacleData.imgIndex]
                        : obstacleData.type === 'car'
                          ? carImages[obstacleData.imgIndex]
                          : obstacleData.type === 'woods'
                            ? woodImages[obstacleData.imgIndex]
                            : smallObstacles[obstacleData.imgIndex])
                    }
                    className={
                      obstacleData.type === 'woods'
                        ? 'obstacle-woods-img'
                        : obstacleData.type === 'car'
                          ? 'obstacleсar-img'
                          : obstacleData.type === 'big'
                            ? 'obstacle-big-img'
                            : 'obstacle-img'
                    }
                    style={
                      obstacleData.type === 'woods'
                        ? {
                          display: obstacleData.isAnchor ? 'block' : 'none',
                          position: 'absolute',

                          zIndex: obstacleData.treeOriginY + 2,

                          width: '244%',
                          height: '244%',
                          left: '-5%',
                          top: '-5%',
                          objectFit: 'fill',
                          pointerEvents: 'none',

                          opacity: 1,
                          transition: 'opacity 0.3s ease',
                        }
                        : obstacleData.type === 'car'
                          ? {
                            display: obstacleData.isAnchor ? 'block' : 'none',
                            width: '250%',
                            height: '280%',
                            position: 'absolute',
                            left: '-60%',
                            top: '-120%',
                            zIndex: 10,
                            objectFit: 'fill',
                            pointerEvents: 'none',
                            opacity: visible ? 1 : 0,
                          }
                          : obstacleData.type === 'big'
                            ? {
                              display: obstacleData.isAnchor ? 'block' : 'none',
                              position: 'absolute',

                              width: '770%',
                              height: '650%',
                              zIndex: 10,

                              left: '-40%',
                              top: '-50%',

                              objectFit: 'fill',

                              pointerEvents: 'none',
                              opacity: 1,
                              transform: 'none',
                            }
                            : {
                              display: obstacleData.isAnchor ? 'block' : 'none',
                              width: '130%',
                              height: '130%',
                              position: 'absolute',
                              left: '-14%',
                              top: '-14%',
                              zIndex: 10,
                              objectFit: 'fill',
                              pointerEvents: 'none',
                              opacity: visible ? 1 : 0,
                            }
                    }
                  />
                )}

                { }
                {isWp && <div className="waypoint-marker"></div>}
              </div>
            );
          })}
          {flyingGrenade && (
            <div
              className="grenade-fly"
              style={{
                position: 'absolute',
                left: `${(flyingGrenade.from.x * 100) / 32}%`,
                top: `${(flyingGrenade.from.y * 100) / 32}%`,
                zIndex: 200,
                fontSize: '1.5rem',
                transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)', // Плавная дуга создается через CSS
                transform: `translate(
      ${(flyingGrenade.to.x - flyingGrenade.from.x) * 100}%, 
      ${(flyingGrenade.to.y - flyingGrenade.from.y) * 100}%
    )`,
              }}>
              💣
            </div>
          )}
          {/* Отрисовка зон опасности */}
          {globalEffects.map((eff, idx) => {
            const isRedZone = eff.type === 'REDZONE';

            return (
              <div
                key={`eff-${idx}`}
                className={`danger-zone ${isRedZone ? 'red-zone-pulse' : 'grenade-zone'}`}
                style={{
                  left: `${(eff.pos.x * 100) / 32}%`,
                  top: `${(eff.pos.y * 100) / 32}%`,
                  // Красная зона — 1 клетка (3.125%), граната — большая (10%)
                  width: isRedZone ? '3.125%' : '10%',
                  height: isRedZone ? '3.125%' : '10%',
                  marginLeft: isRedZone ? '0%' : '-3.5%',
                  marginTop: isRedZone ? '0%' : '-3.5%',
                  backgroundColor: isRedZone ? 'rgba(255, 0, 0, 0.4)' : 'rgba(255, 165, 0, 0.4)',
                  border: isRedZone ? '1px solid red' : 'none',
                  zIndex: 50,
                }}>
                <span
                  style={{
                    color: 'white',
                    textShadow: '1px 1px 2px black',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    position: 'absolute',
                    top: '-25px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    whiteSpace: 'nowrap',
                    zIndex: 100,
                  }}>
                  {isRedZone ? '🎯 LOCK' : eff.timer > 0 ? `⌛${eff.timer}` : '💥'}
                </span>
              </div>
            );
          })}
          {/* Волна взрыва гранаты */}
          {visualExplosions.map((ex) => (
            <div
              key={ex.id}
              className="explosion-flash"
              style={{
                left: `${(ex.pos.x * 100) / 32}%`,
                top: `${(ex.pos.y * 100) / 32}%`,
              }}
            />
          ))}
          {enemiesData
            .filter((e) => e.chargingAt)
            .map((e) => (
              <div
                key={`charge-${e.id}`}
                className="danger-zone aim-zone"
                style={{
                  left: `${(e.chargingAt.x * 100) / 32}%`,
                  top: `${(e.chargingAt.y * 100) / 32}%`,
                  width: '3.125%',
                  height: '3.125%',
                  background: 'rgba(255, 0, 0, 0.5)',
                  position: 'absolute',
                  zIndex: 5,
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', // Треугольник прицела
                  animation: 'blink 0.5s infinite',
                }}
              />
            ))}
        </div>
        {isNightTime && <div className="fog-canvas-layer" style={dynamicFogStyle} />}
        { }
        <div
          className={`unit player ${isSelected ? 'selected' : ''} ${isLocating ? 'locating' : ''}${isPlayerHit ? 'hit-shake' : ''
            }`}
          style={{
            left: `${(playerPos.x * 100) / 32}%`,
            top: `${(playerPos.y * 100) / 32}%`,
            zIndex: 10,
            position: 'absolute',

            opacity: obstacles.some(
              (o) => o.x === playerPos.x && o.y === playerPos.y && o.type === 'woods',
            )
              ? 0.3
              : 1,
            transition: 'opacity 0.3s ease',
          }}
          onClick={() => !isMoving && turn === 'PLAYERBATTLE' && setIsSelected(!isSelected)}>
          <div className="hp-bar">
            <div
              className="hp-fill"
              style={{ width: `${(playerCurrentHp / player.health) * 100}%` }}></div>
          </div>
          <img
            src={hero}
            className="human-sprite"
            alt="P"
            style={{
              transform: `rotate(${playerRotation - 90}deg)`,
              transition: 'transform 0.3s ease, left 0.36s linear, top 0.36s linear',
            }}
          />
        </div>
        { }
        {/* --- НАЧАЛО НОВОГО БЛОКА ВРАГОВ --- */}
        {enemiesData.map((enemyItem) => {
          const visible = isCellVisible(enemyItem.pos.x, enemyItem.pos.y);
          if (!visible) return null; // Если не видим клетку, не рисуем ничего

          const isDead = enemyItem.currentHp <= 0;
          const dist = getDist(playerPos, enemyItem.pos);
          const inRange = !isDead && dist <= currentAttackRange; // В радиусе, только если жив
          const canLoot = isDead && dist <= 1;
          return (
            <div
              key={enemyItem.id}
              className={`unit enemy 
        ${inRange ? 'in-range' : ''} 
        ${enemyItem.isHit ? 'hit-shake' : ''} 
        ${targetEnemyId === enemyItem.id ? 'selected-target' : ''} 
        ${isDead ? 'unit-dead' : ''}`}
              style={{
                left: `${(enemyItem.pos.x * 100) / 32}%`,
                top: `${(enemyItem.pos.y * 100) / 32}%`,
                // Если мертв — курсор обычный, если жив и в радиусе — прицел

                // Трупы лежат под живыми (zIndex меньше)
                zIndex: isDead ? enemyItem.pos.y : enemyItem.pos.y + 10,
                position: 'absolute',
                transform: `scale(${enemyItem.bigModel || '100%'})`,
                transition: 'all 0.3s ease',
                // Отключаем клики на уровне CSS, если враг мертв
                pointerEvents: 'auto',
                cursor: canLoot ? 'help' : isDead ? 'default' : 'crosshair',
              }}
              onMouseEnter={() => !isDead && setHoveredEnemyId(enemyItem.id)}
              onMouseLeave={() => setHoveredEnemyId(null)}
              onClick={(e) => {
                e.stopPropagation();
                if (isDead) {
                  if (dist <= 1) {
                    setLootingEnemy(enemyItem); // Открываем окно лута
                  } else {
                    log('Слишком далеко, чтобы обыскать');
                  }
                  return;
                }

                handleCellClick(enemyItem.pos.y * totalGridSize + enemyItem.pos.x);
                setTargetEnemyId(enemyItem.id);
                handleAttack(enemyItem);
              }}>
              {/* Показываем полоску HP и прицел только если враг ЖИВ */}
              {!isDead && (
                <>
                  <div className="hp-bar">
                    <div
                      className="hp-fill enemy-hp"
                      style={{ width: `${(enemyItem.currentHp / enemyItem.health) * 100}%` }}></div>
                  </div>
                  {inRange && <div className="target-crosshair"></div>}
                </>
              )}

              <img
                src={isDead ? enemyItem.dead || enemyItem.nowModel : enemyItem.nowModel || EnemyImg}
                className={`human-sprite ${enemyItem.isSpinning ? 'melee-spin' : ''}`}
                alt="E"
                style={{
                  transform: isDead
                    ? 'rotate(0deg) scale(1.3)'
                    : `rotate(${(enemyItem.rotation || 0) - 90}deg)`,
                  transition: 'transform 0.3s ease, opacity 0.5s ease, filter 0.3s ease',
                  width: '100%',
                  height: '100%',
                  // Эффект невидимости и ярости (красный фильтр)
                  opacity: enemyItem.isInvisible ? 0.25 : 1,
                  filter: isDead
                    ? 'grayscale(0.5) brightness(0.7)'
                    : enemyItem.isEnraged
                      ? 'drop-shadow(0 0 10px red) sepia(1) hue-rotate(-50deg) saturate(5)'
                      : 'none',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* --- ПАНЕЛЬ СТАТУСА ВРАГА (ENEMY PANEL) --- */}
      <div className="side-panels-stack">
        <div className="side-intel-container">
          {hoveredEnemy ? (
            <div className="enemy-intel-panel">
              {/* Весь ваш остальной код панели остается прежним */}
              <div className="intel-header">SCANNING: {hoveredEnemy.name}</div>

              <div className="intel-content">
                <div className="intel-avatar-frame">
                  <img src={hoveredEnemy.avatar} alt="enemy avatar" className="intel-avatar" />
                </div>

                <div className="intel-stats">
                  <div className="intel-row main">
                    HP:{' '}
                    <span
                      className={
                        hoveredEnemy.currentHp < hoveredEnemy.health * 0.3 ? 'red' : 'white'
                      }>
                      {Math.round(hoveredEnemy.currentHp)}
                    </span>{' '}
                    / {Math.round(hoveredEnemy.health)}
                  </div>
                  <div className="intel-row">
                    AP: <span className="green">{hoveredEnemy.runAp || 5}</span> | ДИСТ:{' '}
                    <span className="green">{hoveredEnemy.rangeDistance || 0}</span>
                  </div>
                  <hr className="intel-divider" /> block
                  <div className="intel-grid">
                    <div className="intel-item">
                      🎯 Меткость:
                      <span className={isNightTime ? 'red' : ''}>
                        {/* Показываем уже вычтенный результат */}
                        {Math.max(
                          0,
                          ((hoveredEnemy.accuracy || 0) - (isNightTime ? 0.2 : 0)) * 100,
                        ).toFixed(0)}
                        %
                      </span>
                      {isNightTime && (
                        <span style={{ fontSize: '10px', color: '#ff4d4d', marginLeft: '5px' }}>
                          -20%
                        </span>
                      )}
                    </div>

                    <div className="intel-item">🛡️ Броня: {hoveredEnemy.armor || 0}</div>
                    <div className="intel-item">🔥 DPS: {hoveredEnemy.dps}</div>
                    <div className="intel-item">
                      🛡️ Блок: {((hoveredEnemy.block || 0) * 100).toFixed(0)}%
                    </div>
                    <div className="intel-item">
                      💥 Крит: {((hoveredEnemy.crit || 0) * 100).toFixed(0)}%
                    </div>
                    <div className="intel-item">
                      🌀 Уворот: {((hoveredEnemy.evasion || 0) * 100).toFixed(0)}%
                    </div>

                    <div className="intel-item">
                      ⚡ Скорость: {((hoveredEnemy.speed || 0) * 100).toFixed(0)}%
                    </div>
                    <div className="intel-item">♻️ Реген: {hoveredEnemy.regen?.toFixed(0)}</div>

                    <div className="intel-item">
                      🔨 Пробитие: {((hoveredEnemy.punching || 0) * 100).toFixed(0)}%
                    </div>
                    <div className="intel-item">
                      🩸 Вампир: {((hoveredEnemy.vampir || 0) * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div className="intel-row footer">
                    {`ФРАКЦИЯ: ${hoveredEnemy.faction} (LVL: ${hoveredEnemy.level})`}
                  </div>
                </div>
              </div>
              <div className="intel-scanline"></div>
            </div>
          ) : (
            <div className="intel-placeholder">
              <p>ОЖИДАНИЕ ДАННЫХ...</p>
              <div className="scanner-line-simple"></div>
            </div>
          )}
          {/* --- ВЫНОСНОЙ БЛОК СКИЛЛОВ: Позиционируем абсолютно ОТНОСИТЕЛЬНО контейнера --- */}
          {hoveredEnemy && hoveredEnemy.skillUse && hoveredEnemy.skillUse.length > 0 && (
            <div className="external-skills-sidebar">
              <div className="skills-sidebar-title">АНАЛИЗ ВООРУЖЕНИЯ</div>
              {hoveredEnemy.skillUse.map((skillKey) => {
                const skillMap = {
                  rage: { name: 'Ярость', icon: '💢' },
                  aimShot: { name: 'Прицельный выстрел', icon: '🎯' },
                  madness: { name: 'Безумие', icon: '🌀' },
                  grenade: { name: 'Осколочная граната', icon: '💣' },
                  redZone: { name: 'Орбитальный удар', icon: '🚨' },
                  suppression: { name: 'Подавление', icon: '🔥' },
                  ram: { name: 'Таран', icon: '🏃' },
                  invisibility: { name: 'Маскировка', icon: '👤' },
                  stimulant: { name: 'Стимулятор', icon: '💉' },
                  summoner: { name: 'Вызов подкрепления', icon: '👥' },
                };
                const skillInfo = skillMap[skillKey] || { name: skillKey, icon: '⚡' };
                const currentCd = hoveredEnemy.cooldowns?.[skillKey] || 0;

                return (
                  <div
                    key={skillKey}
                    className={`sidebar-skill-item ${currentCd > 0 ? 'is-cd' : ''}`}>
                    <span className="skill-ico">{skillInfo.icon}</span>
                    <div className="skill-det">
                      <div className="skill-nm">{skillInfo.name}</div>
                      <div className="skill-cd-st">
                        {currentCd > 0 ? `CD: ${currentCd}` : 'READY'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* --- КНОПКА ПОБЕДЫ --- */}
          {isVictory && (
            <div className="victory-panel">
              {/* Можно добавить полоску сканирования как в Intel панель */}
              <div className="intel-scanline"></div>

              <div className="victory-text">Сектор зачищен</div>

              <div
                className="intel-row footer"
                style={{ marginBottom: '15px', textAlign: 'center' }}>
                Все угрозы нейтрализованы. Соберите снаряжение.
              </div>

              <button
                className="finish-battle-btn"
                onClick={() => endBattle(true, false, playerCurrentHp, 0)}>
                Покинуть локацию
              </button>
            </div>
          )}
        </div>
        {/* ПАНЕЛЬ СТАТУСА ИГРОКА (PLAYER PANEL) */}
        <div className="side-intel-container player-border">
          <div className="scanner-line-simple fast-scan"></div>
          <div className="enemy-intel-panel">
            <div className="intel-header player-header">STATUS: OPERATOR (YOU)</div>
            <div className="intel-content">
              <div className="intel-avatar-frame">
                <img
                  src={mainImg} // Твоя импортированная переменная
                  alt="player avatar"
                  className="intel-avatar"
                />
              </div>

              <div className="intel-stats">
                {/* ЗДОРОВЬЕ */}
                <div className="intel-row main">
                  HP:{' '}
                  <span className={playerCurrentHp < player.health * 0.3 ? 'red' : 'white'}>
                    {Math.round(playerCurrentHp)}
                  </span>{' '}
                  / {Math.round(player.health)}
                </div>

                {/* ОЧКИ ДЕЙСТВИЯ И ПАТРОНЫ */}
                <div className="intel-row">
                  AP: <span className="green">{ap}</span> | AMMO:{' '}
                  <span className="green">{ammo} / 30</span>
                </div>

                <hr className="intel-divider" />

                {/* ГРИД СО СТАТИСТИКОЙ (ПОЛНЫЙ НАБОР) */}
                <div className="intel-grid">
                  <div className="intel-item">
                    🎯 Меткость: {((player.accuracy || 0) * 100).toFixed(0)}%
                  </div>

                  <div className="intel-item">🛡️ Броня: {player.armor || 0}</div>

                  <div className="intel-item">🔥 DPS: {player.dps}</div>

                  <div className="intel-item">
                    🛡️ Блок: {((player.block || 0) * 100).toFixed(0)}%
                  </div>

                  <div className="intel-item">
                    💥 Крит: {((player.crit || 0) * 100).toFixed(0)}%
                  </div>

                  <div className="intel-item">
                    🌀 Уворот: {((player.evasion || 0) * 100).toFixed(0)}%
                  </div>

                  <div className="intel-item">
                    ⚡ Скорость: {((player.speed || 0) * 100).toFixed(0)}%
                  </div>

                  <div className="intel-item">♻️ Реген: {player.regen?.toFixed(0) || 0}</div>

                  <div className="intel-item">
                    🔨 Пробитие: {((player.punching || 0) * 100).toFixed(0)}%
                  </div>

                  <div className="intel-item">
                    🩸 Вампир: {((player.vampir || 0) * 100).toFixed(0)}%
                  </div>
                </div>
                <div className="intel-row footer status-active">
                  {turn === 'PLAYERBATTLE' ? '>>> ВАШ ХОД <<<' : 'ОЖИДАНИЕ ХОДА...'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {lootingEnemy && (
        <div className="loot-modal-overlay" onClick={() => setLootingEnemy(null)}>
          <div className="loot-window" onClick={(e) => e.stopPropagation()}>
            <div className="loot-header">
              ИНВЕНТАРЬ ТРУПА: {lootingEnemy.name}
              <button className="close-btn" onClick={() => setLootingEnemy(null)}>
                X
              </button>
            </div>

            <div className="loot-list">
              {lootingEnemy.loot && lootingEnemy.loot.length > 0 ? (
                lootingEnemy.loot.map((item, index) => (
                  <div
                    key={item.id}
                    className="loot-item-card"
                    onClick={() => {
                      // 1. Отдаем вещь игроку
                      onTakeItem(item);

                      // 2. Находим реального владельца (врага)
                      const ownerId = item.parentEnemyId || lootingEnemy.id;

                      // 3. Удаляем предмет из общего состояния врагов
                      setEnemiesData((prev) =>
                        prev.map((en) => {
                          if (en.id === ownerId) {
                            return {
                              ...en,
                              loot: en.loot.filter((lootItem) => lootItem.id !== item.id),
                            };
                          }
                          return en;
                        }),
                      );

                      // 4. Удаляем предмет из текущего окна лута, чтобы он исчез визуально
                      const updatedWindowLoot = lootingEnemy.loot.filter((_, i) => i !== index);
                      setLootingEnemy({ ...lootingEnemy, loot: updatedWindowLoot });

                      addPopup(playerPos.x, playerPos.y, `ВЗЯТО: ${item.name}`, 'SUCCESS');
                    }}>
                    <div className="item-info">
                      <span style={{ color: item.qualityColor || '#fff' }}>
                        [{item.quality}] {item.displayName}
                      </span>
                    </div>
                    <button className="take-btn">ВЗЯТЬ</button>
                  </div>
                ))
              ) : (
                <div className="empty-text">ПУСТО</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BattleArena;
