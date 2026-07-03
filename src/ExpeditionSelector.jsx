import React, { useState, useEffect, useMemo } from 'react';
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
const REFRESH_DURATION_MS = 60000;
const LS_REFRESH_KEY = 'expeditionRefreshTime';
const LS_ENCOUNTERS_KEY = 'currentAvailableEncounters';
const LS_BLOCKED_CARDS_KEY = 'expeditionBlockedCards';
const NEON_GREEN = '#39ff14';

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
  const [blockedMap, setBlockedMap] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem(LS_BLOCKED_CARDS_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const now = Date.now();
        const activeBlocked = Object.entries(parsed).reduce((acc, [id, expiryTime]) => {
          if (expiryTime > now) { acc[id] = expiryTime; }
          return acc;
        }, {});
        setBlockedMap(activeBlocked);
      } catch (e) {
        console.error('Failed to parse blocked cards from LS:', e);
        localStorage.removeItem(LS_BLOCKED_CARDS_KEY);
      }
    }
  }, []);

  const blockCards = (encounterIds) => {
    const now = Date.now();
    const newExpiryTime = now + REFRESH_DURATION_MS;
    setBlockedMap((prev) => {
      const newMap = { ...prev };
      encounterIds.forEach((id) => { newMap[id] = newExpiryTime; });
      localStorage.setItem(LS_BLOCKED_CARDS_KEY, JSON.stringify(newMap));
      return newMap;
    });
  };

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
    if (!zone || zone.allowedFactions.length === 0) return [];
    const allowedFactions = zone.allowedFactions;
    const filteredByZone = currentPool.filter((encounter) =>
      encounter.factions.some((f) => allowedFactions.includes(f)),
    );
    if (filteredByZone.length <= ENCOUNTERS_PER_ZONE) return filteredByZone;
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
      if (now >= calculatedNextRefreshTime) { shouldRefresh = true; }
    } else { shouldRefresh = true; }

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
          const isCorrectZone = loadedEncounters.every((e) =>
            e.factions.some((f) => zone.allowedFactions.includes(f)),
          );
          if (!isCorrectZone) { shouldRefresh = true; }
          else { setCurrentEncounters(loadedEncounters); }
        } catch (e) { /* ignore parse error */ }
      } else { shouldRefresh = true; }
      setNextRefreshTime(calculatedNextRefreshTime);
      const remaining = Math.max(0, calculatedNextRefreshTime - now);
      setTimeLeft(Math.ceil(remaining / 1000));
    }
  };

  useEffect(() => { checkAndRefresh(currentZone); }, [currentZone]);

  useEffect(() => {
    if (nextRefreshTime === null) return;
    const countdownId = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, nextRefreshTime - now);
      setTimeLeft(Math.ceil(remaining / 1000));
      if (remaining <= 0) { clearInterval(countdownId); checkAndRefresh(currentZone); }
    }, 1000);
    return () => clearInterval(countdownId);
  }, [nextRefreshTime, currentZone]);

  return { availableEncounters: currentEncounters, timeLeft };
};

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: 1001,
    display: 'flex', justifyContent: 'center', alignItems: 'center',
  },
  modal: {
    width: '880px', maxWidth: '95%', maxHeight: '90vh',
    background: 'linear-gradient(145deg, #1a1a1a, #0d0d0d)',
    border: `2px solid ${NEON_GREEN}`,
    borderRadius: '12px', padding: '24px',
    boxShadow: `0 0 30px ${NEON_GREEN}40, 0 0 60px ${NEON_GREEN}20`,
    color: '#f0f0f0', fontFamily: 'monospace',
    display: 'flex', flexDirection: 'column', overflow: 'hidden',
  },
  header: {
    borderBottom: `1px solid ${NEON_GREEN}60`, paddingBottom: '12px', marginBottom: '12px',
  },
  zoneTitle: {
    fontSize: '20px', fontWeight: 'bold', color: NEON_GREEN,
    textShadow: `0 0 10px ${NEON_GREEN}`,
    margin: '0 0 4px 0',
  },
  infoBar: {
    display: 'flex', gap: '16px', fontSize: '12px', color: '#aaa', flexWrap: 'wrap',
  },
  infoItem: {
    display: 'flex', alignItems: 'center', gap: '4px',
  },
  refreshTimer: {
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    padding: '6px 14px', borderRadius: '6px',
    border: `1px solid ${NEON_GREEN}60`,
    color: NEON_GREEN, fontSize: '13px', fontWeight: 'bold',
    textShadow: `0 0 6px ${NEON_GREEN}`,
  },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px', marginTop: '12px', overflowY: 'auto',
    flex: 1, minHeight: 0, paddingBottom: '4px',
  },
  card: (state) => ({
    background: state === 'placeholder'
      ? '#111'
      : state === 'blocked'
        ? 'linear-gradient(145deg, #1a1010, #0d0808)'
        : state === 'selected'
          ? 'linear-gradient(145deg, #0a1a0a, #050d05)'
          : 'linear-gradient(145deg, #1a1a1a, #111)',
    border: `2px solid ${
      state === 'selected' ? NEON_GREEN
        : state === 'blocked' ? '#ff4444'
          : state === 'placeholder' ? '#333'
            : '#333'
    }`,
    borderRadius: '8px', padding: '10px', cursor: state === 'available' ? 'pointer' : 'default',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    position: 'relative', overflow: 'hidden',
    opacity: state === 'placeholder' ? 0.4 : 1,
    boxShadow: state === 'selected'
      ? `0 0 12px ${NEON_GREEN}60`
      : state === 'blocked'
        ? '0 0 8px #ff444440'
        : 'none',
  }),
  cardImage: {
    width: '80px', height: '80px', objectFit: 'contain',
    borderRadius: '6px', marginBottom: '6px',
    border: '1px solid #444',
  },
  cardName: {
    fontSize: '13px', fontWeight: 'bold', color: '#fff',
    margin: '0 0 4px 0', textAlign: 'center', lineHeight: 1.2,
  },
  cardStat: {
    fontSize: '10.5px', color: '#aaa', margin: '1px 0',
    textAlign: 'center',
  },
  cardStatHighlight: {
    fontSize: '10.5px', color: NEON_GREEN, margin: '1px 0',
    textAlign: 'center',
  },
  checkbox: {
    position: 'absolute', top: '6px', right: '8px',
    fontSize: '16px', lineHeight: 1,
  },
  dropTag: {
    fontSize: '10px', padding: '2px 8px', borderRadius: '4px',
    marginTop: '4px', fontWeight: 'bold',
  },
  actions: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginTop: '16px', paddingTop: '12px',
    borderTop: `1px solid ${NEON_GREEN}40`,
  },
  summary: {
    color: '#aaa', fontSize: '13px',
  },
  summaryBold: {
    color: NEON_GREEN, fontWeight: 'bold',
    textShadow: `0 0 6px ${NEON_GREEN}`,
  },
  btnCancel: {
    padding: '10px 24px', borderRadius: '6px', cursor: 'pointer',
    background: 'transparent', color: '#aaa',
    border: '1px solid #555', fontSize: '14px', fontWeight: 'bold',
    fontFamily: 'monospace', transition: 'all 0.2s',
  },
  btnGo: (disabled) => ({
    padding: '10px 28px', borderRadius: '6px', cursor: disabled ? 'default' : 'pointer',
    background: disabled ? '#222' : '#000',
    color: disabled ? '#555' : NEON_GREEN,
    border: `1px solid ${disabled ? '#333' : NEON_GREEN}`,
    boxShadow: disabled ? 'none' : `0 0 15px ${NEON_GREEN}40`,
    fontSize: '15px', fontWeight: 'bold',
    fontFamily: 'monospace', transition: 'all 0.2s',
    textShadow: disabled ? 'none' : `0 0 8px ${NEON_GREEN}`,
    opacity: disabled ? 0.5 : 1,
  }),
  factionTag: (factions) => ({
    display: 'inline-block', padding: '1px 8px', borderRadius: '3px',
    fontSize: '10px', fontWeight: 'bold',
    background: factions.includes('Военные') ? '#2a4a2a' : '#3a2a1a',
    color: factions.includes('Военные') ? '#7dff69' : '#ffb347',
    border: `1px solid ${
      factions.includes('Военные') ? NEON_GREEN : '#ffb347'
    }40`,
  }),
};

const ExpeditionSelector = ({
  currentZone,
  closeHandler,
  addEncountersToQueue,
  setSelectedEncounters,
  setTotalExpeditionTime,
  activeEncounterIds = [],
}) => {
  const { availableEncounters: dynamicEncounters, timeLeft } = useEncounters(ENCOUNTER_POOL, currentZone);
  const [selectedCards, setSelectedCards] = useState({});
  const { isCardBlocked, blockCards } = useBlockedCards();

  const finalEncounters = useMemo(() => {
    const base = [...dynamicEncounters];
    while (base.length < ENCOUNTERS_PER_ZONE) {
      base.push({
        id: `placeholder-${base.length}`, name: '---',
        image: start1, time: 0, selectionTimer: 0, minBattles: 0,
        factions: [], difficulty: 0, isPlaceholder: true, drop: { rarity: null, quality: null },
      });
    }
    return base;
  }, [dynamicEncounters]);

  const handleAddEncountersToQueue = () => {
    const takenIds = Object.keys(selectedCards);
    addEncountersToQueue(selectedEncountersArray);
    blockCards(takenIds);
    setSelectedCards({});
  };

  useEffect(() => { setSelectedCards({}); }, [dynamicEncounters]);

  const toggleCard = (encounter) => {
    if (encounter.isPlaceholder) return;
    setSelectedCards((prev) => {
      const newCards = { ...prev };
      if (newCards[encounter.id]) { delete newCards[encounter.id]; }
      else { newCards[encounter.id] = encounter; }
      return newCards;
    });
  };

  const selectedEncountersArray = useMemo(() => Object.values(selectedCards), [selectedCards]);

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
    const remainingSeconds = totalSeconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    const parts = [];
    if (hours > 0) parts.push(`${hours} ч.`);
    if (minutes > 0 || hours > 0) parts.push(`${minutes} мин.`);
    if (seconds >= 0) parts.push(`${seconds.toString().padStart(2, '0')} сек.`);
    return parts.join(' ');
  };

  const timeLeftFormatted = formatRemainingTime(timeLeft);

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.zoneTitle}>
            ⚔ ПОДГОТОВКА К ЭКСПЕДИЦИИ: {currentZone?.name || 'ЗОНА'}
          </h2>
          <div style={styles.infoBar}>
            <span style={styles.infoItem}>
              🎯 Фракции: <span style={styles.factionTag(currentZone?.allowedFactions || [])}>
                {currentZone?.allowedFactions?.join(', ') || 'Нет'}
              </span>
            </span>
            <span style={styles.infoItem}>💀 Сложность: <b style={{ color: NEON_GREEN }}>{currentZone?.difficulty || 0}%</b></span>
            <span style={styles.infoItem}>📦 Выбрано: <b style={{ color: NEON_GREEN }}>{totalSelected}</b>/{ENCOUNTERS_PER_ZONE}</span>
            <span style={styles.infoItem}>⏱ В пути: <b style={{ color: NEON_GREEN }}>{totalTimeFormatted}</b></span>
            <span style={{ ...styles.refreshTimer, marginLeft: 'auto' }}>
              🔄 {timeLeftFormatted}
            </span>
          </div>
        </div>

        <div style={styles.grid}>
          {finalEncounters.map((encounter) => {
            const isSelected = selectedCards.hasOwnProperty(encounter.id);
            const isPlaceholder = encounter.isPlaceholder;
            const isAlreadyTaken = activeEncounterIds.includes(encounter.id);
            const isTimeBlocked = isCardBlocked(encounter.id);
            const isBlocked = isAlreadyTaken || isTimeBlocked;

            const cardState = isPlaceholder ? 'placeholder' : isBlocked ? 'blocked' : isSelected ? 'selected' : 'available';

            const dropRarity = encounter.drop?.rarity;
            const dropQuality = encounter.drop?.quality;
            const dropQualityColor = getQualityColor(dropQuality);

            return (
              <div
                key={encounter.id}
                style={styles.card(cardState)}
                onMouseEnter={(e) => {
                  if (cardState === 'available') {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = `0 0 15px ${NEON_GREEN}50`;
                  } else if (cardState === 'selected') {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = `0 0 20px ${NEON_GREEN}80`;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = cardState === 'selected'
                    ? `0 0 12px ${NEON_GREEN}60`
                    : cardState === 'blocked'
                      ? '0 0 8px #ff444440'
                      : 'none';
                }}
                onClick={() => (isPlaceholder || isBlocked ? null : toggleCard(encounter))}
              >
                <div style={styles.checkbox}>
                  {isPlaceholder ? '' : isBlocked ? '🔒' : isSelected ? '✅' : '⬜'}
                </div>
                <img src={encounter.image} alt={encounter.name} style={styles.cardImage} />
                <h4 style={styles.cardName}>
                  {isPlaceholder ? 'ПУСТОЙ СЛОТ' : encounter.name}
                </h4>

                {isPlaceholder ? (
                  <p style={{ ...styles.cardStat, color: '#555', fontStyle: 'italic' }}>Нет данных</p>
                ) : isBlocked ? (
                  <p style={{ ...styles.cardStat, color: '#ff6666' }}>🔒 Заблокировано (таймер)</p>
                ) : (
                  <>
                    <p style={styles.cardStat}>💂 {encounter.factions.join(', ')}</p>
                    <p style={styles.cardStat}>⚔️ {encounter.minBattles} боев</p>
                    <p style={styles.cardStat}>⏱ {encounter.time} сек.</p>
                    <p style={styles.cardStat}>
                      💀 Сложность: {(currentZone?.difficulty || 0) + encounter.difficulty}%
                    </p>
                    <p style={styles.cardStat}>⏳ Таймер: {encounter.selectionTimer} сек.</p>
                    <p style={styles.cardStat}>
                      💰 Лут: {dropRarity ? <span>{dropRarity}</span> : <span style={{ color: '#888' }}>Случ.</span>}
                      {dropQuality && (
                        <span style={{ color: dropQualityColor, fontWeight: 'bold' }}> + {dropQuality}</span>
                      )}
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div style={styles.actions}>
          <div style={styles.summary}>
            {totalSelected > 0 ? (
              <>Готовится: <span style={styles.summaryBold}>{totalSelected}</span> точка(и) · Общее время: <span style={styles.summaryBold}>{totalTimeFormatted}</span></>
            ) : (
              'Выберите точки для зачистки'
            )}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={styles.btnCancel} onClick={closeHandler}
              onMouseEnter={(e) => { e.target.style.color = '#fff'; e.target.style.borderColor = '#fff'; }}
              onMouseLeave={(e) => { e.target.style.color = '#aaa'; e.target.style.borderColor = '#555'; }}>
              ОТМЕНА
            </button>
            <button
              style={styles.btnGo(totalSelected === 0)}
              disabled={totalSelected === 0}
              onClick={handleAddEncountersToQueue}
              onMouseEnter={(e) => {
                if (totalSelected > 0) {
                  e.target.style.background = `${NEON_GREEN}20`;
                  e.target.style.boxShadow = `0 0 25px ${NEON_GREEN}60`;
                }
              }}
              onMouseLeave={(e) => {
                if (totalSelected > 0) {
                  e.target.style.background = '#000';
                  e.target.style.boxShadow = `0 0 15px ${NEON_GREEN}40`;
                }
              }}>
              В ПУТЬ ({totalSelected})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpeditionSelector;
