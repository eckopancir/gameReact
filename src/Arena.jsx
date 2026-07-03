<div className="arena-container" style={{ backgroundImage: `url(${arenabattle})` }}>
  <div className="arena">
    {/* Основное поле боя, где стоят персонажи друг против друга */}
    <div className="battlefield" style={{ borderColor: isFighting ? '#ff4444' : '#ccc' }}>
      {/* ПЕРСОНАЖ ИГРОКА */}
      <div className="character player-side">
        <img src={persImg} alt="Персонаж" className="character-img" />
        <div className="stats-bubble stats-left">
          <strong>Ты</strong>
          <div className="level-badge">✨ Уровень: {playerLevel}</div>
          <div className="hp-bar">❤️ Здоровье: {(Number(playerCurrentHp) || 0).toFixed(1)}</div>
          <div className="stamina-bar">🔋 Выносливость: {Math.round(player.stamina * 100)}%</div>

          <div className="detailed-stats">
            🛡️ Броня: {player.armor} <br />
            ⚔️ Урон: {player.damage}
            <br />
            <div onClick={() => setShowDpsTooltip((prev) => !prev)} className="dps-clickable">
              🏹 DPS:{' '}
              <span className={isStaminaDepletedForPenalty ? 'penalty-text' : ''}>
                {effectiveDps.toFixed(1)}
              </span>
              {isStaminaDepletedForPenalty && <span className="penalty-tag"> (Штраф -50%)</span>}
            </div>
            {showDpsTooltip && (
              <div className="dps-tooltip">
                <span className="tox-text">✳️ Токс: {(player.dpsToxis || 0).toFixed(1)}</span>
                <br />
                <span className="emi-text">🌌 ЭМИ: {(player.dpsEmi || 0).toFixed(1)}</span>
                <br />
                <span className="fire-text">💣 Разрыв: {(player.dpsFire || 0).toFixed(1)}</span>
                <br />
                <span className="extro-text">💥 Усил: {(player.dpsExtro || 0).toFixed(1)}</span>
              </div>
            )}
            ⚡ Скор: {Math.round(player.speed * 100)}% | 💉 Рег: {player.regen}
            <br />
            💥 Крит: {Math.round(player.crit * 100)}% | 🌀 Уворот:{' '}
            {Math.round(player.evasion * 100)}%<br />
            🛡️ Блок: {Math.round(player.block * 100)}% | 🩸 Вамп:{' '}
            {Math.round(player.vampir * 100).toFixed(2)}%<br />
            🔨 Проб: {Math.round(player.punching * 100)}% | 🎯 Метк:{' '}
            {Math.round(player.accuracy * 100)}%
          </div>
        </div>
      </div>

      {/* ПЕРСОНАЖ ВРАГА */}
      <div className="character enemy-side">
        <img src={enemyDisplayImage} alt="Враг" className="character-img" />
        <div className="stats-bubble stats-right">
          <strong>{currentEnemy.name}</strong>
          <div className="level-badge">✨ Уровень: {currentEnemy.level}</div>
          <div className="hp-bar">
            ❤️ Здоровье: {isFighting ? enemyCurrentHp.toFixed(1) : currentEnemy.health}
          </div>
          <div className="stamina-bar">
            🔋 Выносливость: {Math.round(currentEnemy.stamina * 100)}%
          </div>

          <div className="detailed-stats">
            🛡️ Броня: {currentEnemy.armor}
            <br /> ⚔️ Урон: {currentEnemy.damage}
            <br />
            🏹 DPS: {currentEnemy.dps}
            <br />⚡ Скор: {Math.round(currentEnemy.speed * 100)}% | 💉 Рег: {currentEnemy.regen}
            <br />
            💥 Крит: {Math.round(currentEnemy.crit * 100)}% | 🌀 Уворот:{' '}
            {Math.round(currentEnemy.evasion * 100)}%<br />
            🛡️ Блок: {Math.round(currentEnemy.block * 100)}% | 🩸 Вамп:{' '}
            {Math.round(currentEnemy.vampir * 100)}%<br />
            🔨 Проб: {Math.round(currentEnemy.punching * 100)}% | 🎯 Метк:{' '}
            {Math.round(currentEnemy.accuracy * 100)}%
          </div>
        </div>
      </div>
    </div>
  </div>
</div>;
