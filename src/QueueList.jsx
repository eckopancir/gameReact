import React from 'react';

const NEON_GREEN = '#39ff14';

const styles = {
  container: {
    width: '100%',
    padding: '6px 12px 8px',
    boxSizing: 'border-box',
    background: 'rgba(180, 175, 165, 0.3)',
    borderBottom: '1px solid #9a9a8a',
    position: 'relative',
    zIndex: 10,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px',
  },
  title: {
    margin: 0,
    fontSize: '13px',
    fontWeight: 'bold',
    color: NEON_GREEN,
    textShadow: `0 0 6px ${NEON_GREEN}50`,
    fontFamily: 'monospace',
    letterSpacing: '1px',
    userSelect: 'none',
  },
  slotCount: {
    fontSize: '11px',
    color: '#888',
    fontFamily: 'monospace',
  },
  grid: {
    display: 'flex',
    gap: '4px',
    overflowX: 'auto',
    flexWrap: 'nowrap',
    paddingBottom: '4px',
  },
  slot: (state) => ({
    flex: '0 0 210px',
    height: '140px',
    height: '140px',
    borderRadius: '5px',
    position: 'relative',
    overflow: 'hidden',
    cursor: state === 'filled' ? 'pointer' : 'default',
    border: state === 'filled'
      ? '1px solid #3a3a2a'
      : '1px dashed #333',
    boxShadow: state === 'filled'
      ? [
          '0 0 0 1px #4a3a2a inset',
          '0 0 0 2px #1a1a1a inset',
          '0 2px 8px rgba(0,0,0,0.5)',
        ].join(',')
      : '0 0 0 1px #1a1a1a inset',
    background: state === 'filled'
      ? 'linear-gradient(145deg, #1a1510, #0f0c08)'
      : 'linear-gradient(135deg, #0d0b08, #0a0806)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    userSelect: 'none',
  }),
  rivet: (position) => ({
    position: 'absolute',
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    background: 'radial-gradient(circle at 40% 35%, #666, #333)',
    boxShadow: '0 0 2px rgba(0,0,0,0.6)',
    zIndex: 3,
    ...(position === 'tl' ? { top: '3px', left: '3px' } : {}),
    ...(position === 'tr' ? { top: '3px', right: '3px' } : {}),
    ...(position === 'bl' ? { bottom: '3px', left: '3px' } : {}),
    ...(position === 'br' ? { bottom: '3px', right: '3px' } : {}),
  }),
  bgImage: {
    position: 'absolute',
    top: 0, left: 0,
    width: '100%', height: '100%',
    objectFit: 'cover',
    zIndex: 0,
    opacity: 0.5,
  },
  overlay: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    padding: '20px 5px 5px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0) 100%)',
    zIndex: 1,
  },
  name: {
    margin: 0,
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#ffd700',
    fontFamily: 'monospace',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: 1.2,
  },
  stat: {
    fontSize: '9px',
    color: '#aaa',
    margin: '1px 0',
    fontFamily: 'monospace',
    lineHeight: 1.2,
  },
  timerText: (isActive) => ({
    fontSize: '9px',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    margin: '1px 0',
    color: isActive ? '#ff9800' : '#aaa',
    textShadow: isActive ? '0 0 4px #ff980060' : 'none',
  }),
  removeBtn: {
    position: 'absolute',
    top: '4px',
    right: '4px',
    zIndex: 5,
    background: 'rgba(0,0,0,0.6)',
    border: '1px solid #555',
    borderRadius: '3px',
    color: '#fff',
    fontSize: '10px',
    width: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: 0,
    lineHeight: 1,
    fontFamily: 'monospace',
    transition: 'background 0.2s, border-color 0.2s',
  },
  goBtn: (enabled) => ({
    position: 'absolute',
    bottom: '4px',
    right: '4px',
    zIndex: 5,
    padding: '2px 6px',
    fontSize: '9px',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    borderRadius: '3px',
    cursor: enabled ? 'pointer' : 'default',
    background: enabled ? '#1a3a1a' : '#1a1a1a',
    color: enabled ? NEON_GREEN : '#555',
    border: `1px solid ${enabled ? NEON_GREEN : '#333'}`,
    boxShadow: enabled ? `0 0 6px ${NEON_GREEN}30` : 'none',
    opacity: enabled ? 1 : 0.4,
    transition: 'all 0.2s',
    textShadow: enabled ? `0 0 4px ${NEON_GREEN}` : 'none',
  }),
  emptyLabel: {
    color: '#444',
    fontSize: '10px',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    letterSpacing: '1px',
    userSelect: 'none',
  },
  timerBar: (ratio) => ({
    position: 'absolute',
    bottom: 0, left: 0,
    height: '2px',
    width: `${Math.min(100, ratio * 100)}%`,
    background: ratio > 0.5 ? NEON_GREEN : ratio > 0.25 ? '#ff9800' : '#ff4444',
    zIndex: 4,
    transition: 'width 1s linear',
    boxShadow: `0 0 4px ${
      ratio > 0.5 ? NEON_GREEN : ratio > 0.25 ? '#ff9800' : '#ff4444'
    }60`,
  }),
};

const SlotRivets = () => (
  <>
    <div style={styles.rivet('tl')} />
    <div style={styles.rivet('tr')} />
    <div style={styles.rivet('bl')} />
    <div style={styles.rivet('br')} />
  </>
);

const QueueSlot = ({
  encounter,
  isFilled,
  isCurrentExpedition,
  isAnyTimerActive,
  startTimer,
  removeSlot,
  startBattle,
  formatTime,
  QUALITY_TIERS,
  playSound,
  startbattle,
  index,
}) => {
  if (!isFilled) {
    return (
      <div style={styles.slot('empty')}>
        <SlotRivets />
        <span style={styles.emptyLabel}>СЛОТ {index + 1}</span>
      </div>
    );
  }

  const expItem = encounter;
  const mainImage = expItem.encounters.length > 0 ? expItem.encounters[0].image : null;
  let remainingSeconds = 0;
  let isTimerActiveForDisplay = false;
  let isTimerFinished = false;

  const wasTimerStarted = expItem.timerStartTime !== null;
  if (expItem.isTimerActive) {
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - expItem.timerStartTime) / 1000);
    remainingSeconds = Math.max(0, expItem.timerDuration - elapsedSeconds);
    if (remainingSeconds > 0) isTimerActiveForDisplay = true;
    else isTimerFinished = true;
  } else {
    if (wasTimerStarted) isTimerFinished = true;
    else isTimerFinished = false;
    remainingSeconds = expItem.timerDuration;
  }

  let calculatedDifficulty = 0;
  const ENCOUNTER_BASE_DIFFICULTY = expItem.encounters[0].difficulty;
  let baseTotalDifficulty = expItem.baseDifficulty + ENCOUNTER_BASE_DIFFICULTY;
  let difficultyDecrease = 0;
  if (!expItem.isTimerActive && !isTimerFinished) {
    const minutesInQueue = Math.floor((Date.now() - expItem.timeAdded) / (1000 * 60));
    difficultyDecrease = minutesInQueue;
    calculatedDifficulty = Math.max(1, baseTotalDifficulty - difficultyDecrease);
  } else {
    calculatedDifficulty = baseTotalDifficulty;
  }

  const isButtonEnabled = !isCurrentExpedition && isTimerFinished;
  const timerRatio = expItem.timerDuration > 0 ? remainingSeconds / expItem.timerDuration : 0;

  let dropQualityColor = 'white';
  if (expItem.drop?.quality) {
    const tier = QUALITY_TIERS.find((t) => t.name === expItem.drop.quality);
    if (tier) dropQualityColor = tier.color;
  }

  const canStartTimer = !expItem.isTimerActive && !isTimerFinished && !isCurrentExpedition && !isAnyTimerActive;

  const handleSlotClick = () => {
    if (canStartTimer) startTimer(index);
  };

  return (
    <div
      style={styles.slot('filled')}
      onClick={handleSlotClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = [
          '0 0 0 1px #4a3a2a inset',
          '0 0 0 2px #1a1a1a inset',
          `0 0 10px ${NEON_GREEN}30`,
          '0 4px 12px rgba(0,0,0,0.6)',
        ].join(',');
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = [
          '0 0 0 1px #4a3a2a inset',
          '0 0 0 2px #1a1a1a inset',
          '0 2px 8px rgba(0,0,0,0.5)',
        ].join(',');
      }}
    >
      <SlotRivets />

      <button
        style={styles.removeBtn}
        disabled={isCurrentExpedition}
        onClick={(e) => { e.stopPropagation(); if (!isCurrentExpedition) removeSlot(index); }}
        onMouseEnter={(e) => { if (!isCurrentExpedition) { e.target.style.background = '#ff444440'; e.target.style.borderColor = '#ff4444'; } }}
        onMouseLeave={(e) => { e.target.style.background = 'rgba(0,0,0,0.6)'; e.target.style.borderColor = '#555'; }}
      >
        ✕
      </button>

      {mainImage && <img src={mainImage} alt="" style={styles.bgImage} />}

      <div style={styles.overlay}>
        <h4 style={styles.name}>{expItem.encounters[0].name}</h4>
        <div style={styles.stat}>⚔️ {expItem.encounters[0].minBattles} · 💀 {calculatedDifficulty.toFixed(0)}%</div>
        <div style={styles.timerText(isTimerActiveForDisplay)}>
          ⏳ {formatTime(remainingSeconds)}
        </div>
        <div style={styles.stat}>
          💰 {expItem.drop?.rarity || 'Случ.'}
          {expItem.drop?.quality && <span style={{ color: dropQualityColor }}> +{expItem.drop.quality}</span>}
        </div>
      </div>

      <div style={styles.timerBar(timerRatio)} />

      <button
        style={styles.goBtn(isButtonEnabled)}
        disabled={!isButtonEnabled}
        onClick={(e) => { e.stopPropagation(); if (isButtonEnabled) { startBattle(index); playSound(startbattle); } }}
        onMouseEnter={(e) => {
          if (isButtonEnabled) {
            e.target.style.background = `${NEON_GREEN}20`;
            e.target.style.boxShadow = `0 0 10px ${NEON_GREEN}50`;
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.background = '#1a3a1a';
          e.target.style.boxShadow = `0 0 6px ${NEON_GREEN}30`;
        }}
      >
        В БОЙ
      </button>
    </div>
  );
};

const QueueList = ({
  activeEncountersQueue,
  isTraveling,
  isFighting,
  isAnyTimerCurrentlyActive,
  QUALITY_TIERS,
  formatTime,
  playSound,
  startbattle,
  startQueueItemTimer,
  removeEncounterFromQueue,
  startActiveExpedition,
}) => {
  const isCurrentExpedition = isTraveling || isFighting;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.title}>
          ⚙ ОЧЕРЕДЬ ЭКСПЕДИЦИЙ
        </span>
        <span style={styles.slotCount}>
          {activeEncountersQueue.length}/8
        </span>
      </div>
      <div style={styles.grid}>
        {Array(8).fill(null).map((_, index) => (
          <QueueSlot
            key={index}
            index={index}
            encounter={activeEncountersQueue[index]}
            isFilled={!!activeEncountersQueue[index]}
            isCurrentExpedition={isCurrentExpedition}
            isAnyTimerActive={isAnyTimerCurrentlyActive}
            startTimer={startQueueItemTimer}
            removeSlot={removeEncounterFromQueue}
            startBattle={startActiveExpedition}
            formatTime={formatTime}
            QUALITY_TIERS={QUALITY_TIERS}
            playSound={playSound}
            startbattle={startbattle}
          />
        ))}
      </div>
    </div>
  );
};

export default QueueList;
