import React from 'react';
import { useGame } from './GameContext';
import { FIREARM_SLOT_POSITIONS, COLD_WEAPON_SLOT_POSITIONS, ARMOR_MOD_SLOTS } from './items';

export default function CustomizationModal() {
  const {
    customizationItem, setCustomizationItem, handleMouseMove, handleModDrop,
    unequipMod, getCombinedStats, setHoverItem, playSound, invnImg, offImg, installImg,
  } = useGame();

  if (!customizationItem) return null;

  return (
    <div
      className="customization-modal"
      style={{ backgroundImage: `url(${invnImg})` }}
      onMouseMove={handleMouseMove}>
      <div className="close-btn2" onClick={() => { setCustomizationItem(null); playSound(offImg); }}>✖</div>
      <h3>Кастомизация: {customizationItem.name}</h3>
      <div
        className="customization-display"
        style={{ backgroundImage: customizationItem.image ? `url(${customizationItem.image})` : 'none' }}>
        {(() => {
          let slotsArray = [];
          const weaponType = customizationItem?.slot;
          if (weaponType === 'weapon1') { slotsArray = COLD_WEAPON_SLOT_POSITIONS; }
          else if (weaponType === 'weapon2') { slotsArray = FIREARM_SLOT_POSITIONS; }
          else if (['head', 'armor', 'gloves', 'boots'].includes(weaponType)) { slotsArray = ARMOR_MOD_SLOTS; }
          else { return null; }
          return slotsArray.map(({ id, name, top, left }) => {
            const modItem = customizationItem.mods ? customizationItem.mods[id] : null;
            return (
              <div
                className="mod-slot"
                key={id}
                data-slot={id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleModDrop(id)}
                onClick={() => { unequipMod(id); playSound(installImg); }}
                onMouseEnter={() => {
                  if (modItem) {
                    const combinedStats = getCombinedStats(modItem);
                    setHoverItem({ ...modItem, stats: combinedStats });
                  } else { setHoverItem(null); }
                }}
                onMouseLeave={() => setHoverItem(null)}
                style={{
                  top: `${top}px`,
                  left: `${left}px`,
                  border: modItem ? '3px solid #50B550' : '2px solid rgba(170, 170, 170, 0.5)',
                  background: modItem ? 'rgba(50, 150, 70, 0.9)' : 'rgba(30, 30, 30, 0.7)',
                }}>
                {modItem ? (
                  <img src={modItem.image} alt={modItem.name} style={{ width: '35px', height: '35px', objectFit: 'contain' }} />
                ) : name}
                {modItem && <span style={{ fontSize: '10px', color: '#fff', fontWeight: 'bold' }}>{modItem.name}</span>}
              </div>
            );
          });
        })()}
      </div>
      <p style={{ marginTop: '20px', color: '#aaa' }}>
        Перетаскивайте модули из инвентаря в соответствующие слоты. Нажмите один раз, чтобы снять модуль.
      </p>
    </div>
  );
}
