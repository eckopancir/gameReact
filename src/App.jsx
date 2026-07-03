import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './App.css';
import { GameProvider, useGame } from './GameContext';
import BaseManagement from './BaseManagement';
import ZonesModal from './ZonesModal';
import BattleArena from './BattleArena';
import ExpeditionSelector from './ExpeditionSelector';
import InventoryModal from './InventoryModal';
import CustomizationModal from './CustomizationModal';
import QueueList from './QueueList';
import { items, generateItem } from './items';
import bl2 from './assets/Images/battle/bl2.png';

const ArenaComponent = React.memo(
  ({
    logs,
    isFighting,
    player,
    playerCurrentHp,
    enemy,
    enemyCurrentHp,
    playerTotalDamage,
    enemyDisplayImage,
    DEFAULT_ENEMY_STATS,
    playerLevel,
    currentExp,
    expToNextLevel,
    handleScroll,
    playSound,
  }) => {
    const LOW_STAMINA_THRESHOLD = 0.1;
    const LOW_STAMINA_DAMAGE_PENALTY = 0.5;
    const isStaminaDepletedForPenalty = player.stamina < LOW_STAMINA_THRESHOLD;
    const effectiveDps = isStaminaDepletedForPenalty
      ? player.dps * LOW_STAMINA_DAMAGE_PENALTY
      : player.dps;
    const logsEndRef = useRef(null);
    const [showDpsTooltip, setShowDpsTooltip] = useState(false);

    useEffect(() => {
      if (logsEndRef.current) {
        logsEndRef.current.scrollIntoView({
          behavior: 'auto',
          block: 'end',
        });
      }
    }, [logs]);

    const currentEnemy = enemy || DEFAULT_ENEMY_STATS;

    return (
      <>
        <div
          className="battle-logs"
          style={{
            backgroundImage: `url(${bl2})`,
          }}>
          <div
            className="log-content"
            onScroll={handleScroll}>
            <h4>Логи боя</h4>
            {logs.slice(-3000).map((l, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: l }} />
            ))}
            <div ref={logsEndRef} />
          </div>
        </div>
      </>
    );
  },
);

function AppContent() {
  const {
    logs, zones, setZones, currentZone, setCurrentZone,
    inventoryOpen, setInventoryOpen, baseHealth, setBaseHealth,
    log, timer, isTraveling, destinationZone,
    isAtLocation, isFighting,
    customizationItem,
    playerCurrentHp, setPlayerCurrentHp,
    enemyCurrentHp, setEnemyCurrentHp, playerTotalDamage, setPlayerTotalDamage,
    enemyTotalDamage, setEnemyTotalDamage,
    enemy, setEnemy, player, inventory, setInventory,
    currentPage,
    hoverItem, setHoverItem, hoverPosition,
    filterSlot, filterStat,
    zonesModalOpen, readyZone, closingZone,
    baseModalOpen, setBaseModalOpen, selectedBasePoint, setSelectedBasePoint,
    upgradeResources, setUpgradeResources, isUpgrading, upgradeTimer, basePoints, setBasePoints,
    activeEffect, activeEffects,
    showDpsTooltip, expeditionModalOpen,
    selectedEncounters, setSelectedEncounters, currentEncounterIndex, totalExpeditionTime, setTotalExpeditionTime,
    isReturningHome, isResting, isAtBase,
    currentExp, expToNextLevel,
    isInventoryLevelHovered, playerLevel,
    activeEncountersQueue, setActiveEncountersQueue,
    dataChips, setDataChips, sellItems, setSellItems,
    isBalanceVisible, setIsBalanceVisible, isBalanceClosing, isShaking,
    enemies, setEnemies, enemyReserve,
    currentEnemy, isAnyTimerCurrentlyActive, activeEncounterIds,
    MAX_SELL_SLOTS, effectiveDps,
    paddedInventory, finalInventoryList,
    playSound, generateEnemy, generateZones,
    endBattle, endExpeditionPointSuccess,
    startGame, checkEncounter, startActiveExpedition,
    addEncountersToQueue, stopTravelOrGoHome,
    closeZoneModalAndStartPreparation, closeExpeditionModal,
    updateStats, handleDrop, handleDragStart, handleDropToGrid,
    unequipItem, applyConsumableEffect,
    handleModDrop, unequipMod, handleMouseMove, getCombinedStats,
    handleDropToSellBlock, handleRemoveFromSell, handleSell,
    calculateItemPrice, getSellPrice,
    removeEncounterFromQueue, startQueueItemTimer,
    startResting, formatTime, openZonesModal,
    handleZoneModalClose, handleClose, handleScroll, handleBalanceClick,
    openBaseModal, closeBaseModal,
    isStaminaDepletedForPenalty,
    enemyDisplayImage, DEFAULT_ENEMY_STATS, COLOR_MAP, BASE_POINTS, MAP_ZONES,
    QUALITY_TIERS, QUALITY_MULTIPLIERS, ITEMS_PER_PAGE, TOTAL_SLOTS, TIME_TO_RETURN_HOME,
    offImg, onImg, balans, chips, scroll, clickbutton, startbattle, MapImg,
  } = useGame();

  return (
    <>
      <QueueList
        activeEncountersQueue={activeEncountersQueue}
        isTraveling={isTraveling}
        isFighting={isFighting}
        isAnyTimerCurrentlyActive={isAnyTimerCurrentlyActive}
        QUALITY_TIERS={QUALITY_TIERS}
        formatTime={formatTime}
        playSound={playSound}
        startbattle={startbattle}
        startQueueItemTimer={startQueueItemTimer}
        removeEncounterFromQueue={removeEncounterFromQueue}
        startActiveExpedition={startActiveExpedition}
      />
      <div id="controls-panel">
        <button id="start-btn" className="ctrl-button" onClick={startGame} onMouseEnter={() => playSound(clickbutton)} disabled={isTraveling || isFighting || isReturningHome || isResting}>
          <span className="button-label"></span>
        </button>
        <button id="base-btn" className="ctrl-button" onClick={stopTravelOrGoHome} onMouseEnter={() => playSound(clickbutton)} disabled={isFighting || isAtBase}>
          <span className="button-label">{isTraveling || isReturningHome || isResting ? '' : ''}</span>
        </button>
        <button id="rest-btn" className="ctrl-button" onClick={startResting} onMouseEnter={() => playSound(clickbutton)} disabled={isFighting || isTraveling || isReturningHome || isAtBase || isResting}>
          <span className="button-label"></span>
        </button>
        <button id="inventory-btn" className="ctrl-button" onClick={() => { setInventoryOpen(true); setIsBalanceVisible(true); playSound(onImg); }} onMouseEnter={() => playSound(clickbutton)} disabled={isFighting}>
          <span className="button-label"></span>
        </button>
      </div>
      {(isBalanceVisible || isBalanceClosing) && (
        <div id="player-balance-display" onClick={handleBalanceClick} className={`${isBalanceVisible ? 'visible' : ''} ${isBalanceClosing ? 'closing' : ''}`}>
          <div className={`balance-content ${isShaking ? 'shaking' : ''}`}>
            <img src={balans} alt="Баланс чипов данных" className="balance-bg-img" />
            <div className="balance-label-container">Чипов</div>
            <div className="balance-value-container">{dataChips}</div>
          </div>
        </div>
      )}
      
        <ArenaComponent
          logs={logs}
          isFighting={isFighting}
          player={player}
          playerCurrentHp={playerCurrentHp}
          enemy={currentEnemy}
          enemyCurrentHp={enemyCurrentHp}
          playerTotalDamage={playerTotalDamage}
          enemyDisplayImage={enemyDisplayImage}
          DEFAULT_ENEMY_STATS={DEFAULT_ENEMY_STATS}
          playerLevel={playerLevel}
          currentExp={currentExp}
          expToNextLevel={expToNextLevel}
          playSound={playSound}
          handleScroll={handleScroll}
        />
        {isFighting && (
          <BattleArena
            player={player}
            playerCurrentHp={playerCurrentHp}
            setPlayerCurrentHp={setPlayerCurrentHp}
            enemy={enemy}
            enemies={enemies}
            setEnemies={setEnemies}
            enemyCurrentHp={enemyCurrentHp}
            setEnemyCurrentHp={setEnemyCurrentHp}
            log={log}
            setPlayerTotalDamage={setPlayerTotalDamage}
            setEnemyTotalDamage={setEnemyTotalDamage}
            endBattle={endBattle}
            isFighting={isFighting}
            enemyReserve={enemyReserve}
            generateItem={generateItem}
            generateEnemy={generateEnemy}
            playerLevel={playerLevel}
            onTakeItem={(item) => { setInventory((prev) => [...prev, item]); }}
          />
        )}
        <BaseManagement
          basePoints={basePoints}
          setBasePoints={setBasePoints}
          inventory={inventory}
          setInventory={setInventory}
          log={log}
          formatTime={formatTime}
          baseModalOpen={baseModalOpen}
          closeBaseModal={closeBaseModal}
          selectedBasePoint={selectedBasePoint}
          setSelectedBasePoint={setSelectedBasePoint}
          upgradeResources={upgradeResources}
          setUpgradeResources={setUpgradeResources}
          applyConsumableEffect={applyConsumableEffect}
          openZonesModal={openZonesModal}
        />
        <ZonesModal
          zonesModalOpen={zonesModalOpen}
          readyZone={readyZone}
          closingZone={closingZone}
          zones={zones}
          isTraveling={isTraveling}
          log={log}
          isFighting={isFighting}
          MapImg={MapImg}
          openBaseModal={openBaseModal}
          closeZoneModalAndStartPreparation={closeZoneModalAndStartPreparation}
          handleZoneModalClose={handleZoneModalClose}
          isReturningHome={isReturningHome}
          isResting={isResting}
          isAtBase={isAtBase}
          items={items}
          playerLevel={playerLevel}
          setHoverItem={setHoverItem}
          handleMouseMove={handleMouseMove}
          getCombinedStats={getCombinedStats}
          hoverItem={hoverItem}
          hoverPosition={hoverPosition}
          dataChips={dataChips}
          setDataChips={setDataChips}
          inventory={inventory}
          setInventory={setInventory}
          setSellItems={setSellItems}
          sellItems={sellItems}
          MAX_SELL_SLOTS={MAX_SELL_SLOTS}
          handleDropToSellBlock={handleDropToSellBlock}
          handleRemoveFromSell={handleRemoveFromSell}
          handleSell={handleSell}
          calculateItemPrice={calculateItemPrice}
          QUALITY_MULTIPLIERS={QUALITY_MULTIPLIERS}
          DEFAULT_ENEMY_STATS={DEFAULT_ENEMY_STATS}
        />
        {expeditionModalOpen && (
          <ExpeditionSelector
            currentZone={currentZone}
            closeHandler={closeExpeditionModal}
            addEncountersToQueue={addEncountersToQueue}
            setSelectedEncounters={setSelectedEncounters}
            setTotalExpeditionTime={setTotalExpeditionTime}
            activeEncounterIds={activeEncounterIds}
          />
        )}
        {inventoryOpen && <InventoryModal />}
        {customizationItem && <CustomizationModal />}
    </>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
