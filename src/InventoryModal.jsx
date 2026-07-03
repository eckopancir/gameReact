import React from 'react';
import { useGame } from './GameContext';

export default function InventoryModal() {
  const {
    ready, closing, handleClose, player, handleDrop, handleDragStart,
    handleDropToGrid, getCombinedStats, setHoverItem, hoverItem, hoverPosition,
    unequipItem, setCustomizationItem, playSound, filterSlot, setFilterSlot,
    filterStat, setFilterStat, paddedInventory, finalInventoryList, currentPage,
    setCurrentPage, playerLevel, currentExp, expToNextLevel,
    isInventoryLevelHovered, setIsInventoryLevelHovered, playerCurrentHp,
    isStaminaDepletedForPenalty, effectiveDps, showDpsTooltip, setShowDpsTooltip,
    slotImage, COLOR_MAP, mainImg, tooltip, modalImg, ITEMS_PER_PAGE,
    getSellPrice, handleMouseMove, craftImg, offImg,
  } = useGame();

  return (
    <div
      id="inventoryModal"
      className={`${ready ? 'open' : ''} ${closing ? 'closing' : ''}`}
      style={{ backgroundImage: `url(${modalImg})` }}
      onMouseMove={handleMouseMove}>
      <div className="close-btn" onClick={handleClose}>✖</div>
      <h3></h3>
      <div className="inv-container">
        <div className="equip-area">
          <div
            className="equip-figure"
            style={{
              backgroundImage: `url(${mainImg})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              borderRadius: '49px',
            }}>
            {['head','armor','weapon1','weapon2','gloves','boots','ammo1','ammo2','ammo3','ammo4'].map((slot) => {
              const item = player.equipment[slot];
              const isOverRarity = item && item.rarity === 'over';
              const finalEquipBorderColor = isOverRarity ? '#aaa' : item?.qualityColor || '#aaa';
              const equipColorRGB = isOverRarity ? '170, 170, 170' : COLOR_MAP[item?.qualityColor || 'default'] || COLOR_MAP['default'];
              const equipBackgroundColor = `rgba(${equipColorRGB}, 0.15)`;
              const finalEquipBackgroundColor = item ? equipBackgroundColor : '#f2f4f1';
              return (
                <div
                  key={slot}
                  className="equip-slot"
                  data-slot={slot}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop(slot)}
                  onMouseEnter={() => {
                    const equippedItem = player.equipment[slot];
                    if (equippedItem) {
                      const combinedStats = getCombinedStats(equippedItem);
                      setHoverItem({ ...equippedItem, stats: combinedStats });
                    }
                  }}
                  onMouseLeave={() => setHoverItem(null)}
                  onDoubleClick={() => item && unequipItem(slot)}
                  onClick={() => {
                    if (item && (slot === 'weapon1' || slot === 'weapon2' || slot === 'head' || slot === 'armor' || slot === 'gloves' || slot === 'boots')) {
                      setCustomizationItem(item);
                      playSound(craftImg, true);
                    }
                  }}
                  style={{
                    border: `2px solid ${finalEquipBorderColor}`,
                    background: `${finalEquipBackgroundColor} url(${slotImage}) no-repeat center / 100% 100%`,
                    boxShadow: `0 0 5px ${finalEquipBorderColor}, 0 0 8px ${finalEquipBorderColor}80`,
                    top: slot === 'head' ? 12 : slot === 'armor' ? 100 : slot === 'weapon1' ? 120 : slot === 'weapon2' ? 120 : slot === 'gloves' ? 60 : slot === 'boots' ? 170 : slot.startsWith('ammo') ? 220 : 45,
                    left: slot === 'weapon1' ? -35 : slot === 'weapon2' ? 125 : slot.startsWith('ammo') ? (slot === 'ammo1' ? 19 : slot === 'ammo2' ? 131 : slot === 'ammo3' ? -38 : 75) : slot === 'gloves' ? -20 : 45,
                  }}>
                  {item ? (
                    <img src={item.image} alt={item.name} style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
                  ) : (
                    slot.charAt(0).toUpperCase() + slot.slice(1)
                  )}
                  {item?.count > 1 && <span className="stack-count">{item.count}</span>}
                </div>
              );
            })}
          </div>
          <div className="stats">
            <div className="level-container" onMouseEnter={() => setIsInventoryLevelHovered(true)} onMouseLeave={() => setIsInventoryLevelHovered(false)}>
              <strong>✨ Уровень: {playerLevel}</strong>
              {isInventoryLevelHovered && (
                <div className="exp-tooltip">
                  Опыт: {currentExp} / {expToNextLevel} ({((currentExp / expToNextLevel) * 100).toFixed(1)}%)
                </div>
              )}
            </div>
            <br />
            ❤️ Здоровье: {playerCurrentHp.toFixed(3)}<br />
            🔋 Выносливость: {Math.round(player.stamina * 100)}%<br />
            🛡️ Броня: {player.armor} 🛡️ Блок: {Math.round(player.block * 100)}%<br />
            ⚡ Скорость: {Math.round(player.speed * 100)}% 💥 Крит: {Math.round(player.crit * 100)}%<br />
            ⚔️ Урон: {player.damage} (чистый)<br />
            <div style={{ position: 'relative', display: 'inline-block' }} onMouseEnter={() => setShowDpsTooltip(true)} onMouseLeave={() => setShowDpsTooltip(false)}>
              🏹 DPS: <span style={{ color: isStaminaDepletedForPenalty ? 'red' : 'inherit', fontWeight: isStaminaDepletedForPenalty ? 'bold' : 'normal' }}>{effectiveDps.toFixed(1)}</span>
              {isStaminaDepletedForPenalty && <span style={{ color: 'red', fontWeight: 'bold' }}> (Штраф -50%)</span>}
              (физ урон)<br />
              {showDpsTooltip && (
                <div className="dps-tooltip" style={{ position: 'absolute', top: 0, left: '105%', zIndex: 10, backgroundColor: 'rgba(30, 30, 30, 0.95)', border: '1px solid #666', padding: '8px 12px', borderRadius: '5px', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
                  <span style={{ color: 'lime' }}>✳️</span> DPS: {player.dpsToxis.toFixed(1)} (токсичный)<br />
                  <span style={{ color: 'deepskyblue' }}>🌌</span> DPS: {player.dpsEmi.toFixed(1)} (ЭМИ)<br />
                  <span style={{ color: 'orangered' }}>💣</span> DPS: {player.dpsFire.toFixed(1)} (разрывной)<br />
                  <span style={{ color: 'limegreen' }}>💥</span> DPS: {player.dpsExtro.toFixed(1)} (усиленный)
                </div>
              )}
            </div>
            <br />
            💉 Реген: {player.regen.toFixed(4)}/сек<br />
            🌀 Уворот: {Math.round(player.evasion * 100)}%<br />
            🩸 Вампиризм: {Math.round(player.vampir * 100)}%<br />
            🔨 Пробитие: {Math.round(player.punching * 100)}%<br />
            🎯 Меткость: {Math.round(player.accuracy * 100)}%<br />
          </div>
        </div>
        <div className="inventory-area">
          <h4></h4>
          <div style={{ marginBottom: '6px' }}>
            <select value={filterSlot} onChange={(e) => setFilterSlot(e.target.value)}>
              <option value="">📦 Все слоты</option>
              <optgroup label="Экипировка">
                <option value="head">🎩 Голова</option>
                <option value="armor">🧥 Броня</option>
                <option value="weapon1">🔪 Оружие 1</option>
                <option value="weapon2">🔫 Оружие 2</option>
                <option value="gloves">🧤 Перчатки</option>
                <option value="boots">👢 Ботинки</option>
                <option value="ammo">💣 Амуниция</option>
              </optgroup>
              <optgroup label="Холодное оружие">
                <option value="mod_blade">🗡️ Мод: Лезвие/Навершие</option>
                <option value="mod_handle">🔩 Мод: Рукоять/Гарда</option>
                <option value="mod_pommel">⚖️ Мод: Обух/Противовес</option>
                <option value="mod_harness">🔗 Мод: Крепление/Подвеска</option>
              </optgroup>
              <optgroup label="Огнестрельное оружие">
                <option value="mod_scope">🔭 Мод: Прицел</option>
                <option value="mod_barrel">💥 Мод: Ствол</option>
                <option value="mod_receiver">⚙️ Мод: Ресивер/Ствольная коробка</option>
                <option value="mod_magazine">🔋 Мод: Магазин</option>
                <option value="mod_muzzle">🎯 Мод: Дуло/Надульник</option>
                <option value="mod_stock">🪵 Мод: Приклад/Ложа</option>
              </optgroup>
              <optgroup label="Броня и Снаряжение">
                <option value="mod_lining">☁️ Мод: Подкладка/Слой</option>
                <option value="mod_hardshell">🧱 Мод: Накладка</option>
                <option value="mod_utility">🔧 Мод: Система/Гаджет</option>
                <option value="mod_patch">🩹 Мод: Усиление/Заклёпка</option>
              </optgroup>
            </select>
            <select value={filterStat} onChange={(e) => setFilterStat(e.target.value)}>
              <option value="">📈 Все параметры</option>
              <option value="newest_first">✨ Новые предметы</option>
              <option value="health">❤️ Здоровье</option>
              <option value="stamina">🔋 Выносливость</option>
              <option value="armor">🛡️ Броня</option>
              <option value="damage">⚔️ Урон</option>
              <option value="speed">⚡ Скорость</option>
              <option value="regen">💉 Реген</option>
              <option value="crit">💥 Крит</option>
              <option value="evasion">🌀 Уворот</option>
              <option value="block">🧱 Блок</option>
              <option value="vampir">🩸 Вампиризм</option>
              <option value="punching">🔨 Пробитие</option>
              <option value="accuracy">🎯 Меткость</option>
            </select>
          </div>
          <div className="inventory-grid">
            {paddedInventory.map((it, idx) => {
              const isItemPresent = it !== null;
              const isOverRarity = isItemPresent && it.rarity === 'over';
              const finalBorderColor = isItemPresent ? (isOverRarity ? '#aaa' : it.qualityColor || '#aaa') : '#555555';
              return (
                <div
                  key={idx}
                  className="slot"
                  draggable={isItemPresent}
                  onDragStart={isItemPresent ? handleDragStart(it) : null}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDropToGrid(idx)}
                  onMouseEnter={() => {
                    if (isItemPresent) {
                      const combinedStats = getCombinedStats(it);
                      setHoverItem({ ...it, stats: combinedStats });
                    }
                  }}
                  onMouseLeave={() => setHoverItem(null)}
                  style={{
                    boxShadow: `0 0 0 1.6px ${finalBorderColor}`,
                    border: 'none',
                    backgroundImage: `url(${slotImage})`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                  }}>
                  {isItemPresent && (
                    <img src={it.image} alt={it.name} style={{ width: '64px', height: '64px', objectFit: 'contain', borderRadius: '8px', filter: `drop-shadow(0 0 3px ${finalBorderColor}) drop-shadow(0 0 5px ${finalBorderColor}80)` }} />
                  )}
                  {isItemPresent && it.count > 1 && <span className="stack-count">{it.count}</span>}
                </div>
              );
            })}
          </div>
          <div className="pagination">
            <button onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))} disabled={currentPage === 0}>&lt;</button>
            <span>Стр. {currentPage + 1}</span>
            <button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={(currentPage + 1) * ITEMS_PER_PAGE >= finalInventoryList.length}>&gt;</button>
          </div>
        </div>
      </div>
      {hoverItem && hoverItem.stats && (
        <div
          className="item-hover-modal"
          style={{
            position: 'fixed',
            left: hoverPosition.x,
            top: hoverPosition.y,
            border: `2.5px solid ${hoverItem.qualityColor || '#aaa'}`,
            boxShadow: `0 0 8px ${hoverItem.qualityColor || '#aaa'}, 0 0 15px ${hoverItem.qualityColor || '#aaa'}40`,
            backgroundImage: `url(${tooltip})`,
          }}>
          <div style={{ color: 'red', fontSize: '10px' }}>DEBUG POS: {hoverPosition.x}, {hoverPosition.y}</div>
          <h4 className="hover-item-name" style={{ color: hoverItem.qualityColor || 'white', textShadow: `0 0 5px ${hoverItem.qualityColor || 'white'}` }}>
            {hoverItem.displayName}
          </h4>
          <div className="hover-content-grid">
            <ul className="hover-item-stats">
              {Object.entries(hoverItem.stats).map(([k, statDetail]) => {
                if (typeof statDetail === 'number') {
                  if (statDetail === 0) return null;
                  return (
                    <li key={k}>
                      <span className="stat-value">{statDetail >= 0 ? '+' : ''}{statDetail.toFixed(3)} {k}</span>
                    </li>
                  );
                }
                const baseValue = typeof statDetail?.base === 'number' ? statDetail.base : 0;
                const modBonus = typeof statDetail?.modBonus === 'number' ? statDetail.modBonus : 0;
                const totalValue = baseValue + modBonus;
                if (totalValue === 0) return null;
                return (
                  <li key={k}>
                    <span className="stat-value">{totalValue >= 0 ? '+' : ''}{totalValue.toFixed(3)} {k}</span>
                    {modBonus !== 0 && <span style={{ color: 'lime', marginLeft: '5px', fontSize: '10px', textShadow: 'none' }}>(мод: {modBonus > 0 ? '+' : ''}{modBonus.toFixed(0)})</span>}
                  </li>
                );
              })}
            </ul>
            {hoverItem.image && (
              <div className="hover-item-image-wrapper">
                <div className="hover-item-image-container">
                  <img src={hoverItem.image} alt={hoverItem.name} className="hover-item-image" />
                </div>
                {hoverItem.rarity && (
                  <div className="sell-price-inner">Стоимость: {getSellPrice(hoverItem)} 💾</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
