import React, { useState, useEffect, useMemo } from 'react';
import military20 from './assets/Images/characters/military20.png';
import military21 from './assets/Images/characters/military2.png';
import military22 from './assets/Images/characters/military3.png';

import slotImage from './assets/Images/items/slot.png';
import start1 from './assets/Images/ui/start1.png';
import start11 from './assets/Images/ui/start11.png';
import start2 from './assets/Images/ui/start2.png';
import start22 from './assets/Images/ui/start22.png';
import start3 from './assets/Images/ui/start3.png';
import start33 from './assets/Images/ui/start33.png';
import start4 from './assets/Images/ui/start4.png';
import start44 from './assets/Images/ui/start44.png';

import { QUALITY_TIERS } from './items';

const ENCOUNTERS_PER_ZONE = 8;
const TIME_PER_CARD = 20;
const REFRESH_DURATION_MS = 6000;
const LS_REFRESH_KEY = 'expeditionRefreshTime';
const LS_ENCOUNTERS_KEY = 'currentAvailableEncounters';
const LS_BLOCKED_CARDS_KEY = 'expeditionBlockedCards';
const ENCOUNTER_POOL = [
  {
    id: 1,
    name: 'Заброшенный Военный Блокпост',
    image: start1,
    time: 1,
    selectionTimer: 1,
    minBattles: 2,
    factions: ['Военные'],
    enemyTypes: ['Военные (military1)'],
    difficulty: 0,
    drop: { rarity: '', quality: null },
  },
  {
    id: 2,
    name: 'Секретный Арсенал',
    image: start2,
    time: 1,
    selectionTimer: 1,
    minBattles: 12,
    factions: ['Военные'],
    enemyTypes: ['Военные (military1)'],
    difficulty: 0,
    drop: { rarity: 'over', quality: 'Раритетный' },
  },
  {
    id: 3,
    name: 'Позиция Снайпера',
    image: start3,
    time: 1,
    selectionTimer: 11,
    minBattles: 3,
    factions: ['Военные'],
    enemyTypes: ['Военные (military1)'],
    difficulty: 0,
    drop: { rarity: '', quality: 'Легендарный' },
  },
  {
    id: 4,
    name: 'Секретный Арсенал',
    image: start4,
    time: 1,
    selectionTimer: 2,
    minBattles: 3,
    factions: ['Военные'],
    enemyTypes: ['Военные (military1)'],
    difficulty: 0,
    drop: { rarity: 'over', quality: 'Легендарный' },
  },
  {
    id: 5,
    name: 'Хим лаба',
    image: start11,
    time: 1,
    selectionTimer: 33,
    minBattles: 2,
    factions: ['Военные'],
    enemyTypes: ['Военные (military1)'],
    difficulty: 0,
    drop: { rarity: 'normal', quality: null },
  },
  {
    id: 6,
    name: 'Босс КРЭНГ',
    image: start22,
    time: 1,
    selectionTimer: 1,
    minBattles: 12,
    factions: ['Военные'],
    enemyTypes: ['Военные (military1)'],
    difficulty: 0,
    drop: { rarity: 'epic', quality: 'Раритетный' },
  },
  {
    id: 7,
    name: 'БОСС разрушитель',
    image: start33,
    time: 1,
    selectionTimer: 11,
    minBattles: 3,
    factions: ['Военные'],
    enemyTypes: ['Военные (military1)'],
    difficulty: 0,
    drop: { rarity: 'superepic', quality: 'Легендарный' },
  },
  {
    id: 8,
    name: 'Секретный дом',
    image: start44,
    time: 1,
    selectionTimer: 2,
    minBattles: 3,
    factions: ['Военные'],
    enemyTypes: ['Военные (military1)'],
    difficulty: 0,
    drop: { rarity: 'over', quality: 'Легендарный' },
  },
  {
    id: 9,
    name: 'военные ящики',
    image: start1,
    time: 1,
    selectionTimer: 33,
    minBattles: 200,
    factions: ['Военные'],
    enemyTypes: ['Военные (military1)'],
    difficulty: 0,
    drop: { rarity: 'over', quality: null },
  },
  {
    id: 10,
    name: 'палатки',
    image: start2,
    time: 1,
    selectionTimer: 1,
    minBattles: 12,
    factions: ['Военные'],
    enemyTypes: ['Военные (military1)'],
    difficulty: 0,
    drop: { rarity: 'epic', quality: 'Раритетный' },
  },
  {
    id: 11,
    name: 'вышка',
    image: start3,
    time: 1,
    selectionTimer: 11,
    minBattles: 3,
    factions: ['Военные'],
    enemyTypes: ['Военные (military1)'],
    difficulty: 0,
    drop: { rarity: 'superepic', quality: 'Легендарный' },
  },
  {
    id: 12,
    name: 'мед пункт',
    image: start4,
    time: 1,
    selectionTimer: 2,
    minBattles: 3,
    factions: ['Военные'],
    enemyTypes: ['Военные (military1)'],
    difficulty: 0,
    drop: { rarity: 'over', quality: 'Легендарный' },
  },
  {
    id: 13,
    name: 'Модифиаторы',
    image: start11,
    time: 1,
    selectionTimer: 2,
    minBattles: 30,
    factions: ['Военные'],
    enemyTypes: ['Военные (military1)'],
    difficulty: 0,
    drop: { rarity: 'epic', quality: 'Легендарный' },
  },
];

const useBlockedCards = () => {
  // Хранит { id: expiryTimestampMs, ... }
  const [blockedMap, setBlockedMap] = useState({});

  // 1. Загрузка из LocalStorage при монтировании
  useEffect(() => {
    const stored = localStorage.getItem(LS_BLOCKED_CARDS_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Фильтруем просроченные записи сразу при загрузке
        const now = Date.now();
        const activeBlocked = Object.entries(parsed).reduce((acc, [id, expiryTime]) => {
          if (expiryTime > now) {
            acc[id] = expiryTime;
          }
          return acc;
        }, {});

        setBlockedMap(activeBlocked);
      } catch (e) {
        console.error('Failed to parse blocked cards from LS:', e);
        localStorage.removeItem(LS_BLOCKED_CARDS_KEY);
      }
    }
  }, []);

  // 2. Функция для блокировки карт на 24 часа
  const blockCards = (encounterIds) => {
    const now = Date.now();
    const newExpiryTime = now + REFRESH_DURATION_MS; // Блокируем до следующего обновления

    setBlockedMap((prev) => {
      const newMap = { ...prev };
      encounterIds.forEach((id) => {
        newMap[id] = newExpiryTime;
      });
      // Сохраняем в LocalStorage
      localStorage.setItem(LS_BLOCKED_CARDS_KEY, JSON.stringify(newMap));
      return newMap;
    });
  };

  // 3. Функция проверки статуса блокировки
  const isCardBlocked = (id) => {
    const expiryTime = blockedMap[id];
    return expiryTime && expiryTime > Date.now();
  };

  return { isCardBlocked, blockCards };
};

const getQualityColor = (qualityName) => {
  const tier = QUALITY_TIERS.find((t) => t.name === qualityName);
  return tier ? tier.color : 'white';
};
const useEncounters = (pool, currentZone) => {
  const [nextRefreshTime, setNextRefreshTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentEncounters, setCurrentEncounters] = useState([]);

  const generateRandomEncounters = (currentPool, zone) => {
    if (!zone || zone.allowedFactions.length === 0) {
      return [];
    }

    const allowedFactions = zone.allowedFactions;

    const filteredByZone = currentPool.filter((encounter) =>
      encounter.factions.some((f) => allowedFactions.includes(f)),
    );

    if (filteredByZone.length <= ENCOUNTERS_PER_ZONE) {
      return filteredByZone;
    }

    const shuffled = [...filteredByZone].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, ENCOUNTERS_PER_ZONE);
  };

  const checkAndRefresh = (zone) => {
    const now = Date.now();
    let storedRefreshTime = localStorage.getItem(LS_REFRESH_KEY);
    let storedEncounters = localStorage.getItem(LS_ENCOUNTERS_KEY);
    let calculatedNextRefreshTime;
    let shouldRefresh = false;

    if (storedRefreshTime) {
      calculatedNextRefreshTime = parseInt(storedRefreshTime, 10);

      if (now >= calculatedNextRefreshTime) {
        shouldRefresh = true;
      }
    } else {
      shouldRefresh = true;
    }

    if (shouldRefresh) {
      const newEncounters = generateRandomEncounters(pool, zone);
      setCurrentEncounters(newEncounters);

      const newRefreshTime = now + REFRESH_DURATION_MS;
      localStorage.setItem(LS_REFRESH_KEY, newRefreshTime);
      localStorage.removeItem(LS_BLOCKED_CARDS_KEY);
      localStorage.setItem(LS_ENCOUNTERS_KEY, JSON.stringify(newEncounters));

      setNextRefreshTime(newRefreshTime);
      setTimeLeft(REFRESH_DURATION_MS / 1000);
    } else {
      if (storedEncounters) {
        try {
          const loadedEncounters = JSON.parse(storedEncounters);
          // !!! НОВАЯ ПРОВЕРКА: Проверяем, что загруженные карты соответствуют ТЕКУЩЕЙ ЗОНЕ
          // Если currentZone меняется, мы должны обновить карты, даже если время не вышло.
          const isCorrectZone = loadedEncounters.every((e) =>
            e.factions.some((f) => zone.allowedFactions.includes(f)),
          );

          if (!isCorrectZone) {
            shouldRefresh = true; // Заставляем обновить витрину для новой зоны
          } else {
            setCurrentEncounters(loadedEncounters);
          }
        } catch (e) {
          // ... (обработка ошибки)
        }
      } else {
        shouldRefresh = true;
      }

      setNextRefreshTime(calculatedNextRefreshTime);

      const remaining = Math.max(0, calculatedNextRefreshTime - now);
      setTimeLeft(Math.ceil(remaining / 1000));
    }
  };
  // НОВАЯ ФУНКЦИЯ: Удаляет выбранные карты из пула и localStorage

  useEffect(() => {
    checkAndRefresh(currentZone);
  }, [currentZone]);

  useEffect(() => {
    if (nextRefreshTime === null) return;

    const countdownId = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, nextRefreshTime - now);
      const remainingSeconds = Math.ceil(remaining / 1000);

      setTimeLeft(remainingSeconds);

      if (remaining <= 0) {
        clearInterval(countdownId);
        checkAndRefresh(currentZone);
      }
    }, 1000);

    return () => clearInterval(countdownId);
  }, [nextRefreshTime, currentZone]);

  return { availableEncounters: currentEncounters, timeLeft };
};

const ExpeditionSelector = ({
  currentZone,
  closeHandler,
  addEncountersToQueue,
  setSelectedEncounters,
  setTotalExpeditionTime,
  activeEncounterIds = [],
}) => {
  const { availableEncounters: dynamicEncounters, timeLeft } = useEncounters(
    ENCOUNTER_POOL,
    currentZone,
  );

  const [selectedCards, setSelectedCards] = useState({});
  const { isCardBlocked, blockCards } = useBlockedCards();
  const finalEncounters = useMemo(() => {
    const baseEncounters = [...dynamicEncounters];
    while (baseEncounters.length < ENCOUNTERS_PER_ZONE) {
      baseEncounters.push({
        id: `placeholder-${baseEncounters.length}`,
        name: 'Пустая Точка',
        image: start1,
        time: TIME_PER_CARD,
        selectionTimer: 0,
        minBattles: 1,
        factions: [],
        difficulty: 0,
        isPlaceholder: true,
        drop: { rarity: null, quality: null },
      });
    }
    return baseEncounters;
  }, [dynamicEncounters]);

  const handleAddEncountersToQueue = () => {
    const takenIds = Object.keys(selectedCards); // 1. Вызываем функцию добавления в очередь (из App.jsx)

    addEncountersToQueue(selectedEncountersArray); // 2. Сохраняем ID выбранных карт в список блокировок (на 24 часа)

    blockCards(takenIds); // <-- ВЫЗЫВАЕМ НОВУЮ ФУНКЦИЮ // 3. Очищаем текущие выбранные карточки

    setSelectedCards({}); // markEncountersAsTaken() - УДАЛЕНО
  };

  useEffect(() => {
    setSelectedCards({});
  }, [dynamicEncounters]);

  const toggleCard = (encounter) => {
    if (encounter.isPlaceholder) return;

    setSelectedCards((prev) => {
      const newCards = { ...prev };
      const cardKey = encounter.id;
      if (newCards[cardKey]) {
        delete newCards[cardKey];
      } else {
        newCards[cardKey] = encounter;
      }
      return newCards;
    });
  };
  // Новая функция-обертка для добавления в очередь

  const selectedEncountersArray = useMemo(() => {
    return Object.values(selectedCards);
  }, [selectedCards]);
  useEffect(() => {
    const totalTime = selectedEncountersArray.reduce((sum, e) => sum + e.time, 0);
    setSelectedEncounters(selectedEncountersArray);
    setTotalExpeditionTime(totalTime);
  }, [selectedEncountersArray, setSelectedEncounters, setTotalExpeditionTime]);

  const totalSelected = selectedEncountersArray.length;
  const totalTime = selectedEncountersArray.reduce((sum, e) => sum + e.time, 0);
  const totalTimeFormatted = `${Math.floor(totalTime / 60)} мин. ${totalTime % 60} сек.`;

  const formatRemainingTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    let remainingSeconds = totalSeconds % 3600;

    const minutes = Math.floor(remainingSeconds / 60);

    const seconds = remainingSeconds % 60;

    const parts = [];

    if (hours > 0) {
      parts.push(`${hours} ч.`);
    }

    if (minutes > 0 || hours > 0) {
      const minutesDisplay =
        hours > 0 || minutes >= 10 ? minutes : minutes.toString().padStart(2, '0');

      parts.push(`${minutesDisplay} мин.`);
    } else if (hours === 0 && minutes === 0) {
    }

    const secondsDisplay = seconds.toString().padStart(2, '0');
    parts.push(`${secondsDisplay} сек.`);

    if (parts.length === 0) return '00 сек.';

    return parts.join(' ');
  };

  const timeLeftFormatted = formatRemainingTime(timeLeft);
  return (
    <div className="expedition-modal-overlay">
      <div className="expedition-modal">
        <h2>Подготовка к экспедиции в {currentZone?.name || 'зону'}</h2>
        <p>
          Фракции в зоне: **{currentZone.allowedFactions.join(', ') || 'Нет'}** | Сложность: **
          {currentZone.difficulty}%**
        </p>
        <p>
          Выбрано точек: **{totalSelected}** / {ENCOUNTERS_PER_ZONE} | Общее время в пути: **{' '}
          {totalTimeFormatted}**
        </p>
        <p className="refresh-timer">🔄 До обновления карт: **{timeLeftFormatted}**</p>
        <div className="cards-grid">
          {finalEncounters.map((encounter) => {
            const isSelected = selectedCards.hasOwnProperty(encounter.id);
            const isPlaceholder = encounter.isPlaceholder;

            // 1. Сначала проверяем, находится ли карта в очереди (СТАРАЯ ЛОГИКА)
            const isAlreadyTaken = activeEncounterIds.includes(encounter.id);

            // 2. Затем проверяем, заблокирована ли карта по таймеру (НОВАЯ ЛОГИКА)
            const isTimeBlocked = isCardBlocked(encounter.id);

            // 3. Итоговая блокировка
            const isBlocked = isAlreadyTaken || isTimeBlocked;
            const dropRarity = encounter.drop?.rarity;
            const dropQuality = encounter.drop?.quality;
            const dropQualityColor = getQualityColor(dropQuality);

            return (
              <div
                key={encounter.id}
                className={`expedition-card 
                ${isSelected ? 'selected' : ''} 
                ${isPlaceholder ? 'placeholder' : ''}
                ${isBlocked ? 'disabled-in-queue' : ''} `}
                onClick={() => (isPlaceholder || isBlocked ? null : toggleCard(encounter))}>
                <img src={encounter.image} alt={encounter.name} />
                <div className="card-info">
                  <h4>{encounter.name}</h4>
                  {isPlaceholder || isBlocked ? (
                    <p>{isPlaceholder ? 'Пустой слот.' : '🔒 Заблокировано на 24 часа.'}</p>
                  ) : (
                    <>
                      <p>💂 Враги: {encounter.factions.join(', ')}</p>
                      <p>⚔️ Боев: {encounter.minBattles}</p>
                      <p>⏱️ В пути: {encounter.time} сек.</p>
                      <p>💀 Сложность: {currentZone.difficulty + encounter.difficulty}%</p>
                      <p>⏳ Таймер выбора: {encounter.selectionTimer} сек.</p>
                      <p>
                        💰 Лут:{dropRarity ? <span> {dropRarity}</span> : <span> Случайный</span>}
                        {dropQuality && (
                          <span style={{ color: dropQualityColor }}> + {dropQuality}</span>
                        )}
                      </p>
                    </>
                  )}
                </div>
                {!isPlaceholder && (
                  <span className="checkbox">{isBlocked ? '🔒' : isSelected ? '✅' : '⬜'}</span>
                )}
              </div>
            );
          })}
        </div>
        <div className="expedition-actions">
          <button className="btn-cancel" onClick={closeHandler}>
            {' '}
            Отмена
          </button>
          <button onClick={handleAddEncountersToQueue} disabled={totalSelected === 0}>
            В ПУТЬ ({totalSelected} {totalSelected === 1 ? 'точка' : 'точек'})
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpeditionSelector;
