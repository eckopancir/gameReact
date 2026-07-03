import React, { useState, useEffect } from 'react';

import military20 from './assets/Images/characters/military20.png';
import military21 from './assets/Images/characters/military20.png';
import military22 from './assets/Images/characters/military20.png';
import military1 from './assets/Images/characters/military1.png';
import military2 from './assets/Images/characters/military2.png';
import military3 from './assets/Images/characters/military3.png';
import military4 from './assets/Images/characters/military4.png';
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
export const ENEMY_BASE_STATS = {
  // --- Стандартные Враги ---

  // Бандиты (Теперь может быть несколько типов, если добавите bandit1, bandit2, bandit3)
  Бандиты: {
    // Используем пока 'bandit1Img' как общий ключ
    imageKey: 'bandit1Img', // Ключ для отображения в ENEMY_TYPES
    health: 500, // Базовое здоровье (пример)
    damage: 12, // Урон для 1 ур. (немного выше базового 5+1*5=10)
    speed: 0.1, // Скорость атаки для 1 ур.
    crit: 0.1,
    armor: 2,
    evasion: 0.05,
    block: 0,
    punching: 0,
    vampir: 0.001,
    accuracy: 0.95,
    expRewardMultiplier: 1.0, // Множитель для базового опыта
    dead: deadImg,
  },
  // Мутанты
  Мутанты: {
    imageKey: 'mutantImg',
    health: 500, // Базовое здоровье (пример)
    damage: 15, // Высокий урон
    speed: 0.08, // Средняя скорость
    crit: 0.1,
    armor: 0, // Мало брони
    evasion: 0.15, // Высокий уворот
    block: 0,
    punching: 0,
    vampir: 0.001,
    accuracy: 0.85,
    expRewardMultiplier: 1.2,
    dead: deadImg,
  },
  // Роботы
  Роботы: {
    imageKey: 'bandit1Img',
    health: 500, // Базовое здоровье (пример)
    damage: 10,
    speed: 0.12, // Высокая скорость
    crit: 0.05, // Низкий крит
    armor: 4, // Высокая броня
    evasion: 0.05,
    block: 0.15, // Есть блок
    punching: 0.1,
    vampir: 0.001,
    accuracy: 1.0,
    expRewardMultiplier: 1.1,
    dead: deadImg,
  },

  // --- Новые Враги (Военные) ---
  // Мы создадим 3 уникальных типа для фракции "Военные"
  'Военные (tank)': {
    imageKey: 'military7',
    health: 2500, // Базовое здоровье (пример)
    damage: 5,
    speed: 0, // Быстрый
    crit: 0,
    armor: 10,
    evasion: 0.02, // Уворот
    regen: 1,
    block: 0.04,
    punching: 0,
    accuracy: 1,
    vampir: 0,
    expRewardMultiplier: 2,
    rangeDistance: 5, // теперь отвечает за ATTACK_RANGE врага
    chance: '11%',
    runAp: 4,
    dead: deadImg, // теперь отвечает сколько он имеет очков действия

    shotPrice: 4,
    soundAttack: pistolSnd, // отвечает за музыкальный файл для стрельбы

    bigModel: '150%', // отвечает за размер модельки +20%

    nowModel: tank, // отвечает за его скин, какая будет моделька
    skillUse: ['ram'],
  },
  'Военные (melle)': {
    imageKey: 'military5',
    health: 600, // Базовое здоровье (пример)
    damage: 15,
    speed: 0.02, // Быстрый
    crit: 0,
    armor: 7,
    evasion: 0.01, // Уворот
    regen: 0,
    block: 0.01,
    chance: '11%',
    punching: 0,
    accuracy: 0.8,
    vampir: 1.5,
    expRewardMultiplier: 1.5,
    rangeDistance: 1, // теперь отвечает за ATTACK_RANGE врага
    shotPrice: 2,
    runAp: 4, // теперь отвечает сколько он имеет очков действия

    soundAttack: meleeSnd, // отвечает за музыкальный файл для стрельбы

    bigModel: '110%', // отвечает за размер модельки +20%

    nowModel: melee,
    dead: deadImg, // отвечает за его скин, какая будет моделька
    skillUse: ['ram'],
  },
  'Военные (sniper)': {
    imageKey: 'military2',
    health: 150, // Базовое здоровье (пример)
    damage: 40,
    speed: 0, // Быстрый
    crit: 0.032,
    armor: 1,
    evasion: 0, // Уворот
    regen: 0,
    block: 0,
    punching: 0.02,
    accuracy: 1.2,
    chance: '11%',
    vampir: 0,
    expRewardMultiplier: 2,
    rangeDistance: 18, // теперь отвечает за ATTACK_RANGE врага

    runAp: 3, // теперь отвечает сколько он имеет очков действия
    shotPrice: 3,
    soundAttack: sniperSnd, // отвечает за музыкальный файл для стрельбы

    bigModel: '130%', // отвечает за размер модельки +20%

    nowModel: sniperImg,
    dead: deadImg, // отвечает за его скин, какая будет моделька
    skillUse: ['redZone', 'suppression', 'aimShot'],
  },
  'Военные (drob)': {
    imageKey: 'military6',
    health: 450, // Базовое здоровье (пример)
    damage: 35,
    speed: 0.01, // Быстрый
    crit: 0.05,
    armor: 3,
    evasion: 0, // Уворот
    regen: 0,
    block: 0,
    punching: 0.01,
    chance: '11%',
    accuracy: 0.5,
    vampir: 0.01,
    expRewardMultiplier: 1.8,
    rangeDistance: 5, // теперь отвечает за ATTACK_RANGE врага
    shotPrice: 2,
    runAp: 4, // теперь отвечает сколько он имеет очков действия

    soundAttack: drobSnd, // отвечает за музыкальный файл для стрельбы

    bigModel: '100%', // отвечает за размер модельки +20%

    nowModel: baseMilitary,
    dead: deadImg, // отвечает за его скин, какая будет моделька
    skillUse: ['aimShot', 'invisibility'],
  },
  'Военные (original)': {
    imageKey: 'military1',
    health: 450, // Базовое здоровье (пример)
    damage: 12,
    speed: 0.01, // Быстрый
    crit: 0.01,
    armor: 5,
    chance: '22%',
    evasion: 0.005, // Уворот
    regen: 0,
    block: 0.02,
    punching: 0.01,
    accuracy: 0.9,
    vampir: 0.02,
    expRewardMultiplier: 1,
    rangeDistance: 9, // теперь отвечает за ATTACK_RANGE врага
    shotPrice: 2,
    runAp: 6, // теперь отвечает сколько он имеет очков действия

    soundAttack: shotenemy, // отвечает за музыкальный файл для стрельбы

    bigModel: '100%', // отвечает за размер модельки +20%

    nowModel: baseMilitary,
    dead: deadImg, // отвечает за его скин, какая будет моделька
    skillUse: ['grenade', 'stimulant'],
  },
  'Военные (medic)': {
    imageKey: 'military4',
    health: 350, // Базовое здоровье (пример)
    damage: 25,
    speed: 0, // Быстрый
    crit: 0,
    armor: 5,
    evasion: 0, // Уворот
    regen: 1,
    block: 0,
    punching: 0,
    chance: '11%',
    accuracy: 2,
    vampir: 0,
    expRewardMultiplier: 1.2,
    rangeDistance: 9, // теперь отвечает за ATTACK_RANGE врага
    shotPrice: 1,
    runAp: 4, // теперь отвечает сколько он имеет очков действия

    soundAttack: healerSnd, // отвечает за музыкальный файл для стрельбы

    bigModel: '100%', // отвечает за размер модельки +20%

    nowModel: medic,
    dead: deadImg, // отвечает за его скин, какая будет моделька
    skillUse: [''],
  },
  'Военные (boss)': {
    imageKey: 'military3',
    health: 3000, // Базовое здоровье (пример)
    damage: 5,
    speed: 0.01, // Быстрый
    crit: 0.05,
    armor: 8,
    evasion: 0, // Уворот
    regen: 1,
    block: 0,
    chance: '11%',
    punching: 0.01,
    accuracy: 0.7,
    vampir: 0.1,
    expRewardMultiplier: 5,
    rangeDistance: 8, // теперь отвечает за ATTACK_RANGE врага
    shotPrice: 1,
    runAp: 5, // теперь отвечает сколько он имеет очков действия

    soundAttack: m134Snd, // отвечает за музыкальный файл для стрельбы

    bigModel: '130%', // отвечает за размер модельки +20%

    nowModel: baseMilitary,
    dead: deadImg, // отвечает за его скин, какая будет моделька
    skillUse: ['madness', 'rage', 'summoner'],
  },
};
