const battleStep = () => {
  let effectiveDps = player.dps;
  let damageModifier = 1.0;
  const LOW_STAMINA_THRESHOLD = 0.1;
  const LOW_STAMINA_DAMAGE_PENALTY = 0.5;
  let totalPlayerDmgDealt = 0;
  let totalEnemyDmgDealt = 0;

  let playerEvasions = 0;
  let playerBlocks = 0;
  let playerDmgBlocked = 0;
  let playerArmorAbsorbed = 0;

  let enemyEvasions = 0;
  let enemyBlocks = 0;
  let enemyDmgBlocked = 0;
  let enemyArmorAbsorbed = 0;

  if (player.stamina < LOW_STAMINA_THRESHOLD) {
    damageModifier = LOW_STAMINA_DAMAGE_PENALTY;
    log('🔴 Штраф! Выносливость критически низка. Урон снижен на 50%.');
  }

  switch (enemy.faction) {
    case 'Мутанты':
      effectiveDps = Math.max(player.dps, player.dpsToxis);
      break;
    case 'Роботы':
      effectiveDps = Math.max(player.dps, player.dpsEmi);
      break;
    case 'Бандиты':
    case 'Военные':
      effectiveDps = Math.max(player.dps, player.dpsExtro, player.dpsFire);
      break;
    default:
      effectiveDps = player.dps;
      break;
  }
  effectiveDps *= damageModifier;
  log(
    `🎯 Игрок использует ${effectiveDps.toFixed(1)} DPS (${
      enemy.faction === 'Мутанты' && effectiveDps > player.dps
        ? 'Токсичный'
        : enemy.faction === 'Роботы' && effectiveDps > player.dps
        ? 'ЭМИ'
        : (enemy.faction === 'Бандиты' || enemy.faction === 'Военные') &&
          effectiveDps === player.dpsFire &&
          effectiveDps > player.dps
        ? 'Разрывной (Fire)'
        : (enemy.faction === 'Бандиты' || enemy.faction === 'Военные') &&
          effectiveDps === player.dpsExtro &&
          effectiveDps > player.dps
        ? 'Усиленный (Extro)'
        : 'Базовый/Физический'
    }) против ${enemy.faction || 'Неизвестный тип'}.`,
  );

  const playerRegenAmount = player.regen * TIME_STEP;
  const enemyRegenAmount = enemy.regen * TIME_STEP;

  for (let i = 0; i < ATTACKS_PER_STEP; i++) {
    let dmg = effectiveDps;

    if (Math.random() > player.accuracy && player.accuracy < 1) {
      log(`❌ Ты промахнулся (Меткость: ${Math.round(player.accuracy * 100)}%)`);
      continue;
    }

    const effectiveEnemyArmor = enemy.armor * (1 - player.punching);

    const actualArmorReduction = Math.min(dmg, effectiveEnemyArmor);

    dmg = Math.max(0, dmg - actualArmorReduction);

    enemyArmorAbsorbed += actualArmorReduction;

    let evasionSuccess = false;
    if (Math.random() < enemy.evasion) {
      evasionSuccess = true;
    }

    if (evasionSuccess && player.accuracy > 1) {
      const overAccuracy = player.accuracy - 1;
      if (Math.random() < overAccuracy) {
        evasionSuccess = false;
        log(`🎯 Твоя меткость (${Math.round(player.accuracy * 100)}%) отменила уворот врага!`);
      }
    }

    if (evasionSuccess) {
      enemyEvasions++;
      continue;
    }

    if (Math.random() < enemy.block) {
      enemyBlocks++;
      const blocked = dmg * BLOCK_REDUCTION;
      enemyDmgBlocked += blocked;
      dmg *= 1 - BLOCK_REDUCTION;
    }

    totalPlayerDmgDealt += dmg;
  }

  for (let i = 0; i < ATTACKS_PER_STEP; i++) {
    let dmg = enemy.dps;

    if (Math.random() > enemy.accuracy && enemy.accuracy < 1) {
      continue;
    }

    const effectivePlayerArmor = player.armor * (1 - enemy.punching);

    const actualArmorReduction = Math.min(dmg, effectivePlayerArmor);

    dmg = Math.max(0, dmg - actualArmorReduction);

    playerArmorAbsorbed += actualArmorReduction;
    let evasionSuccess = false;
    if (Math.random() < player.evasion) {
      evasionSuccess = true;
    }

    if (evasionSuccess && enemy.accuracy > 1) {
      const overAccuracy = enemy.accuracy - 1;
      if (Math.random() < overAccuracy) {
        evasionSuccess = false;
      }
    }

    if (evasionSuccess) {
      playerEvasions++;
      continue;
    }

    if (Math.random() < player.block) {
      playerBlocks++;
      const blocked = dmg * BLOCK_REDUCTION;
      playerDmgBlocked += blocked;
      dmg *= 1 - BLOCK_REDUCTION;
    }

    totalEnemyDmgDealt += dmg;
  }

  const playerVampHeal = totalPlayerDmgDealt * player.vampir;
  const enemyVampHeal = totalEnemyDmgDealt * enemy.vampir;

  const newEnemyHP = Math.min(
    enemy.health,
    Math.max(0, enemyCurrentHp - totalPlayerDmgDealt + enemyRegenAmount + enemyVampHeal),
  );

  const newPlayerHP = Math.min(
    player.health,
    Math.max(0, playerCurrentHp - totalEnemyDmgDealt + playerRegenAmount + playerVampHeal),
  );

  setPlayerTotalDamage((prev) => prev + totalPlayerDmgDealt);
  setEnemyTotalDamage((prev) => prev + totalEnemyDmgDealt);
  setEnemyCurrentHp(newEnemyHP);
  setPlayerCurrentHp(newPlayerHP);

  log(`--- БОЙ ЗА ${TIME_STEP} СЕК. ---`);
  log(
    `⚔️ Ты нанес ${totalPlayerDmgDealt.toFixed(1)} урона.💉 Реген ${playerRegenAmount.toFixed(
      1,
    )} HP.🩸 Вампиризм ${playerVampHeal.toFixed(1)} HP.`,
  );
  log(
    `🌀 Враг уклонился ${enemyEvasions} раз, 🛡️ броня выдержала ${playerArmorAbsorbed.toFixed(
      1,
    )}, заблокировала ${playerDmgBlocked.toFixed(1)} урона.`,
  );
  log(
    `⚔️ Враг нанес ${totalEnemyDmgDealt.toFixed(1)} урона.💉 Реген ${enemyRegenAmount.toFixed(
      1,
    )} HP.🩸 Вампиризм ${enemyVampHeal.toFixed(1)} HP.`,
  );
  log(
    `🌀 Ты уклонился ${playerEvasions} раз, 🛡️ броня выдержала ${enemyArmorAbsorbed.toFixed(
      1,
    )}, заблокировала ${enemyDmgBlocked.toFixed(1)} урона.`,
  );
  log(`❤️ Твое HP: ${newPlayerHP.toFixed(1)} / Врага HP: ${newEnemyHP.toFixed(1)}`);

  if (newEnemyHP <= 0 && newPlayerHP > 0) {
    endBattle(true, false, newPlayerHP, newEnemyHP);
  } else if (newPlayerHP <= 0 && newEnemyHP > 0) {
    endBattle(false, true, newPlayerHP, newEnemyHP);
  } else if (newPlayerHP <= 0 && newEnemyHP <= 0) {
    endBattle(false, false, newPlayerHP, newEnemyHP);
  }
};
