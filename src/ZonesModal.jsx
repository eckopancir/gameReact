import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  FIREARM_SLOT_POSITIONS,
  COLD_WEAPON_SLOT_POSITIONS,
  ARMOR_MOD_SLOTS,
  generateItem,
  QUALITY_TIERS,
  RARITY_CHANCES,
  QUALITY_BONUSES,
} from './items';
import MapNight from './assets/Images/map/MapNight.png';
import bazar from './assets/Images/map/bazar.png';
// Импорты картинок для ключевых точек
import g1 from './assets/Images/characters/g1.png'; // Продуктовый Магазин
import g2 from './assets/Images/characters/g2.png'; // Кузня
import g3 from './assets/Images/characters/g3.png'; // Магазин Оружия
import g4 from './assets/Images/characters/g4.png'; // Мастерская Модификаций
import mp5Icon from './assets/Images/items/mp5.png';
// const DEFAULT_ICON = mp5Icon; // Удалено для чистоты
// 🔑 КОНФИГУРАЦИЯ ВНУТРЕННИХ ТОЧЕК БАЗАРА
const BAZAR_POINTS = [
  { name: 'Кузня', className: 'bazar-forge', image: g2 },
  { name: 'Магазин Оружия', className: 'bazar-weapons-shop', image: g3 },
  { name: 'Продуктовый Магазин', className: 'bazar-grocery-shop', image: g1 },
  { name: 'Мастерская Модификаций', className: 'bazar-mod-workshop', image: g4 },
];
const SHOP_REFRESH_INTERVAL = 6000000; // 100 минут (ваше текущее значение)
const SHOP_ITEMS_KEY = 'bazarShopItems';
const LAST_REFRESH_KEY = 'bazarLastRefresh';

const ZonesModal = ({
  zonesModalOpen,
  readyZone,
  closingZone,
  zones,
  isTraveling,
  isFighting,
  MapImg,
  openBaseModal,
  isReturningHome,
  isResting,
  isAtBase,
  closeZoneModalAndStartPreparation,
  handleZoneModalClose,
  log,
  items,
  playerLevel = 1,
  setHoverItem,
  handleMouseMove,
  getCombinedStats,
  hoverPosition,
  hoverItem,
  dataChips,
  setDataChips,
  inventory,
  setInventory,
  setSellItems,
  sellItems,
  MAX_SELL_SLOTS,
  handleDropToSellBlock,
  handleRemoveFromSell,
  handleSell,
  calculateItemPrice,
  QUALITY_MULTIPLIERS,
  DEFAULT_ENEMY_STATS,
}) => {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [bazarOpen, setBazarOpen] = useState(false);
  const [activeBazarPoint, setActiveBazarPoint] = useState(null);
  const [shopItems, setShopItems] = useState(() => {
    const lastRefresh = localStorage.getItem(LAST_REFRESH_KEY);
    const savedItems = localStorage.getItem(SHOP_ITEMS_KEY);
    const now = Date.now();

    // Проверяем, есть ли сохраненные предметы И не истекло ли время обновления
    if (savedItems && lastRefresh) {
      const lastRefreshTime = parseInt(lastRefresh, 10);

      // Если время еще не истекло, загружаем сохраненные предметы
      if (now - lastRefreshTime < SHOP_REFRESH_INTERVAL) {
        try {
          return JSON.parse(savedItems);
        } catch (e) {
          console.error('Ошибка парсинга сохраненных предметов Базара:', e);
        }
      }
    }

    // Если ничего нет или время истекло, возвращаем пустой массив.
    // Генерация произойдет в useEffect ниже.
    return [];
  });

  // 1. ЛОГИКА ТАЙМЕРА ДЛЯ СМЕНЫ ВРЕМЕНИ СУТОК
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // 2. ФУНКЦИЯ ДЛЯ ГЕНЕРАЦИИ 25 ПРЕДМЕТОВ (зависит от нестабильных пропсов)
  const generateNewShopItems = useCallback(() => {
    if (!items || items.length === 0) {
      console.warn('Массив предметов для генерации пуст.');
      return;
    }

    const newItems = Array.from({ length: 25 }, () => {
      const item = generateItem(items, playerLevel);

      // 1. Извлекаем предмет, независимо от того, был ли он обернут
      const generatedItem = Array.isArray(item) ? item[0] : item;

      // 2. Рассчитываем динамическую цену
      const price = calculateItemPrice(generatedItem);

      // 3. Возвращаем предмет с рассчитанной ценой
      return {
        ...generatedItem,
        price: price, // Включаем цену
      };
    });

    setShopItems(newItems);
    log('🛒 Ассортимент магазина на Базаре обновлен.');
    try {
      localStorage.setItem(SHOP_ITEMS_KEY, JSON.stringify(newItems));
      localStorage.setItem(LAST_REFRESH_KEY, Date.now().toString());
    } catch (e) {
      console.error('Не удалось сохранить состояние магазина:', e);
    }
  }, [items, playerLevel, log, calculateItemPrice]);
  // 🆕 Хранилище для актуальной функции.
  // 🆕 Хранилище для актуальной функции.
  const generateNewShopItemsRef = useRef(generateNewShopItems);

  // 🆕 Обновляем ref при каждом рендере, когда функция пересоздается.
  useEffect(() => {
    generateNewShopItemsRef.current = generateNewShopItems;
  }, [generateNewShopItems]);

  // 3. EFFECT ДЛЯ НАЧАЛЬНОЙ ГЕНЕРАЦИИ (запускается 1 раз при монтировании)
  useEffect(() => {
    const lastRefresh = localStorage.getItem(LAST_REFRESH_KEY);
    const now = Date.now();

    // Условие запуска:
    // 1. Если магазин пуст (т.е. ничего не было найдено в localStorage)
    // ИЛИ
    // 2. Время обновления истекло
    if (
      shopItems.length === 0 ||
      !lastRefresh ||
      now - parseInt(lastRefresh, 10) >= SHOP_REFRESH_INTERVAL
    ) {
      // Запускаем генерацию и сохранение
      generateNewShopItemsRef.current();
    }
    // Если shopItems.length > 0 и время не истекло, мы используем сохраненные данные
    // и ничего не делаем, предотвращая лог обновления.
  }, [shopItems.length]); // Добавляем shopItems.length для корректного запуска

  // 4. EFFECT ДЛЯ АВТОМАТИЧЕСКОЙ ГЕНЕРАЦИИ КАЖДУЮ МИНУТУ (СТАБИЛЬНЫЙ ТАЙМЕР)
  useEffect(() => {
    // Таймер теперь всегда вызывает актуальную функцию через ref
    const generationTimer = setInterval(() => {
      generateNewShopItemsRef.current();
    }, SHOP_REFRESH_INTERVAL); // Используем константу

    return () => clearInterval(generationTimer);
  }, []);

  const isDayTime = currentHour >= 8 && currentHour < 24;
  const currentMapImage = isDayTime ? MapImg : MapNight;

  const openBazar = (zone) => {
    setBazarOpen(true);
  };

  const closeBazar = () => {
    setActiveBazarPoint(null);
    setBazarOpen(false);
  };

  const openBazarPoint = (point) => {
    setActiveBazarPoint(point);
    log(`🏢 Открываем ${point.name} на Базаре...`);
  };

  const closeBazarPoint = () => {
    setActiveBazarPoint(null);
  };

  if (!zonesModalOpen) {
    return null;
  }

  const BazarPointModal = () => {
    if (!activeBazarPoint) return null;

    // 💡 ФУНКЦИЯ ПОКУПКИ
    const handleBuyItem = (item) => {
      // 🛑 ИСПРАВЛЕНИЕ 3: Гарантируем, что цена — это число.
      const itemPrice = item.price || 1;

      if (dataChips >= itemPrice) {
        // 1. Списание валюты
        setDataChips((prev) => prev - itemPrice);

        // 2. Добавление предмета в инвентарь
        // Мы создаем полную копию, чтобы избежать мутаций
        const itemToInventory = { ...item };

        setInventory((prevInventory) => {
          // Добавляем новый предмет в конец массива
          return [...prevInventory, itemToInventory];
        }); // <--- ГАРАНТИРОВАННОЕ ОБНОВЛЕНИЕ ИНВЕНТАРЯ

        // 3. Удаление предмета из магазина
        setShopItems((prev) => prev.filter((i) => i.id !== item.id));

        log(`🎉 Куплено: ${item.displayName} за ${itemPrice} Чипов данных!`);
      } else {
        log(
          `❌ Недостаточно Чипов данных для покупки. Требуется: ${itemPrice}, Доступно: ${dataChips}.`,
        ); // <--- ДОБАВИМ ЛОГ ДЛЯ ДЕБАГА
      }
    };
    const handleMouseEnter = (item) => () => {
      // Рассчитываем объединенные статы, чтобы тултип знал, что показывать
      const detailedStats = getCombinedStats(item);
      // 🎯 ВАЖНО: Добавляем цену в hoverItem для отображения в тултипе (если нужно)
      setHoverItem({ ...item, stats: detailedStats, price: item.price });
    };
    const handleMouseLeave = () => {
      setHoverItem(null);
    };
    const totalSellPrice = sellItems.reduce((sum, item) => {
      const fullPrice = calculateItemPrice(item);
      return sum + Math.round(fullPrice * 0.5);
    }, 0);
    return (
      <div
        id="bazarPointModal"
        className="bazar-point-modal"
        style={{
          backgroundImage: `url(${activeBazarPoint.image})`,
          position: 'relative',

          // 🚀 ИСПРАВЛЕНИЕ: Масштабирование, чтобы изображение полностью заполнило
          // модальное окно (которое, вероятно, 700x700, как и zoneModal)
          backgroundSize: '100% 100%', // ⬅️ Растягиваем, чтобы заполнить ровно 100% ширины и 100% высоты
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          // ----------------------------------------------------
        }}
        // onMouseMove={handleMouseMove} УДАЛЕН, так как тултип больше не следует за курсором
      >
        {/* ⏪ КНОПКА НАЗАД */}
        <div onClick={closeBazarPoint} className="bazar-back-btn bazar-point-back-btn">
          {'<'} Назад (Базар) 🛒
        </div>
        {/* 💵 МОДУЛЬ ОТОБРАЖЕНИЯ ВАЛЮТЫ */}
        <div
          className="bazar-currency-display"
          style={{
            position: 'absolute',
            top: '10px',
            right: '-10px',

            padding: '8px 15px',
            borderRadius: '5px',
            color: 'gold',
            fontWeight: 'bold',
            zIndex: 10,
          }}>
          Чипы данных: {dataChips} 💾
        </div>

        {/* 📦 БЛОК ИНВЕНТАРЯ И ПРОДАЖИ (СПРАВА СВЕРХУ) */}
        <div className="trade-inventory-block">
          <div className="trade-inventory-title">Продать предметы (50% от 💰)</div>

          {/* Статистика продажи */}
          <div className="sell-stats">
            <div>Баланс: **{dataChips}** чипов</div>
            <div>
              Выставлено: **{sellItems.length} / {MAX_SELL_SLOTS}**
            </div>
          </div>

          {/* Сетка слотов для перетаскивания */}
          <div
            className="trade-inventory-slots"
            onDragOver={(e) => e.preventDefault()} // Разрешает перетаскивание
            onDrop={handleDropToSellBlock} // Обработка сброса предмета из инвентаря
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '5px',
              minHeight: '120px', // Убедитесь, что блок имеет высоту
              border: '2px dashed #3a3a3a',
              padding: '5px',
            }}>
            {/* Отображение слотов продажи */}
            {Array(MAX_SELL_SLOTS)
              .fill(null)
              .map((_, index) => {
                const item = sellItems[index];

                return (
                  <div
                    key={index}
                    className={`sell-slot ${item ? 'occupied' : 'empty'}`}
                    // Стиль для пустых/занятых слотов. Вы можете перенести это в CSS.
                    style={{
                      width: '100%',
                      height: '50px',
                      backgroundColor: item ? '#2c2c2c' : '#1e1e1e',
                      border: item
                        ? `1px solid ${item.qualityColor || '#ffaa00'}`
                        : '1px solid #444',
                      cursor: item ? 'pointer' : 'default',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                    onClick={() => {
                      if (item) handleRemoveFromSell(index); // Клик для возврата в инвентарь
                    }}
                    onMouseEnter={() => item && setHoverItem(item)}
                    onMouseLeave={() => setHoverItem(null)}>
                    {item && (
                      <>
                        {/* Предполагаем, что у предмета есть свойство image */}
                        <img
                          src={item.image}
                          alt={item.displayName}
                          style={{ maxWidth: '80%', maxHeight: '80%' }}
                        />
                        {/* <span>{item.displayName}</span> - можно убрать, чтобы не загромождать */}
                      </>
                    )}
                    {!item && <span style={{ color: '#555', fontSize: '10px' }}>Slot</span>}
                  </div>
                );
              })}
          </div>

          {/* Кнопка продажи */}
          <button
            onClick={handleSell}
            disabled={sellItems.length === 0}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: sellItems.length > 0 ? '#ff4d4d' : '#333',
              color: 'white',
              border: 'none',
              width: '100%',
              cursor: sellItems.length > 0 ? 'pointer' : 'not-allowed',
            }}>
            Продать все ({sellItems.length}) за {totalSellPrice} 💰
          </button>
        </div>

        {/* 💰 БЛОК СЛОТОВ ПРОДАЖИ (СПРАВА СНИЗУ) */}
        <div className="trade-shop-block">
          <div className="trade-shop-title">Купить предметы</div>
          <div className="trade-shop-grid">
            {/* 🆕 ОТОБРАЖАЕМ СГЕНЕРИРОВАННЫЕ ПРЕДМЕТЫ */}
            {shopItems.map((item, i) => (
              <div
                key={item.id}
                className="trade-shop-slot"
                style={{
                  // Динамическая граница по цвету качества
                  border: `1px solid ${item.qualityColor || '#ааа'}`,
                  // ИСПРАВЛЕНО: Используем mp5Icon
                  backgroundImage: `url(${item.icon || mp5Icon})`,
                  backgroundSize: '80%',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  cursor: 'pointer',
                }}
                title={`${item.displayName} (Цена: ${item.price} Чипов данных)`}
                onMouseEnter={handleMouseEnter(item)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleBuyItem(item)} // 🚀 ИЗМЕНЕНО: Вызываем handleBuyItem
              ></div>
            ))}

            {/* Если сгенерировано меньше 5 слотов, заполняем пустыми */}
            {Array.from({ length: 5 - shopItems.length }).map((_, i) => (
              <div key={`empty-${i}`} className="trade-shop-slot">
                Слот
              </div>
            ))}
          </div>
        </div>

        {/* 🎯 ТУЛТИП ЗАКРЕПЛЕН ВНУТРИ BazarPointModal */}
        {hoverItem && hoverItem.stats && (
          <div
            className="item-hover-modal bazar-fixed-tooltip"
            style={{
              position: 'absolute', // Позиция относительно родителя (BazarPointModal)
              top: '220px', // Жесткая позиция сверху
              right: '5px', // Жесткая позиция справа
              zIndex: 99999,
              pointerEvents: 'none',
              width: '311px', // Рекомендуемая ширина для отображения статов
              backgroundColor: 'rgba(30, 30, 30, 0.95)',
              border: `2px solid ${hoverItem.qualityColor || '#aaa'}`, // Добавляем цветную рамку
              padding: '10px',
              borderRadius: '5px',
            }}>
            <h4 className="hover-item-name">
              {hoverItem.displayName}

              {/* 🚀 ИСПРАВЛЕНИЕ: Добавляем цену рядом с названием */}
              {hoverItem.price !== undefined && (
                <div
                  style={{
                    color: 'gold',
                    marginBottom: '5px',
                    borderBottom: '1px solid #555', // Небольшой разделитель
                    paddingBottom: '5px',
                    fontSize: '13px',
                  }}>
                  (Цена : {hoverItem.price} 💾)
                </div>
              )}
            </h4>

            {/* Линия-разделитель (опционально) */}
            <hr style={{ borderTop: '1px solid #444', margin: '5px 0' }} />
            <ul className="hover-item-stats">
              {Object.entries(hoverItem.stats).map(([k, statDetail]) => {
                const baseValue = statDetail.base;
                const modBonus = statDetail.modBonus;
                const totalValue = baseValue + modBonus;

                if (totalValue === 0) return null;

                return (
                  <li key={k}>
                    {/* Базовый стат (включая знак +) */}+{baseValue} {k}
                    {/* Бонус от модов (зеленым) */}
                    {modBonus !== 0 && (
                      <span style={{ color: 'lime', marginLeft: '5px' }}>
                        ({modBonus > 0 ? '+' : ''}
                        {modBonus} {k} от модов)
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
            {/* 💡 Альтернативное место для цены: под статами */}
            {/* {hoverItem.price !== undefined && (
           <div style={{ marginTop: '10px', color: 'gold', fontWeight: 'bold' }}>
               Цена: {hoverItem.price} 💾
           </div>
       )} */}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      id="zoneModal"
      className={`modal ${readyZone ? 'open' : ''} ${closingZone ? 'closing' : ''}`}
      style={{
        backgroundImage: `url(${currentMapImage})`,
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
        zIndex: 1000,
        width: '700px',
        height: '700px',
        top: '48.5%',
        left: '64%',
        transform: 'translate(-50%, -50%)',
        position: 'fixed',
        padding: '20px',
      }}>
      {/* 1. ТОЧКИ ЗОН НА КАРТЕ */}
      {!bazarOpen &&
        zones.map((z, idx) => (
          <div
            key={idx}
            className={`zone-point ${z.className} ${
              isTraveling || isFighting || isReturningHome || isResting ? 'disabled' : ''
            }`}
            onClick={() => {
              if (isTraveling || isFighting || isReturningHome || isResting) return;

              if (z.name === 'Наша база') {
                openBaseModal(z);
              } else if (z.name === 'Базар') {
                openBazar(z);
              } else {
                closeZoneModalAndStartPreparation(z);
              }
            }}
            style={{ pointerEvents: isTraveling || isFighting ? 'none' : 'auto' }}>
            {z.name}
            {z.difficulty > 0 && <span className="zone-difficulty-label"> ({z.difficulty}%)</span>}
          </div>
        ))}

      {/* 2. МОДАЛЬНОЕ ОКНО БАЗАРА */}
      {bazarOpen && (
        <div
          id="bazarModal"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${bazar})`,
            backgroundSize: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 1001,
            borderRadius: '8px',
          }}>
          {/* ⏪ КНОПКА НАЗАД */}
          <div
            onClick={closeBazar}
            className="bazar-back-btn"
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              zIndex: 1002,
              userSelect: 'none',
              cursor: 'pointer',
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '5px 10px',
              borderRadius: '5px',
            }}>
            {'<'} Назад (Карта) 🗺️
          </div>

          {/* 🔑 ТОЧКИ ИНТЕРЕСА НА БАЗАРЕ */}
          {!activeBazarPoint &&
            BAZAR_POINTS.map((point, idx) => (
              <div
                key={idx}
                className={`bazar-point-style ${point.className}`}
                onClick={() => openBazarPoint(point)}
                style={{
                  position: 'absolute',
                  zIndex: 1002,
                  cursor: 'pointer',
                }}>
                {point.name}
              </div>
            ))}

          {/* 3. ОТКРЫТОЕ ОКНО КЛЮЧЕВОЙ ТОЧКИ */}
          <BazarPointModal />
        </div>
      )}
      {/* 🚀 ВСТРОЕННЫЙ ТУЛТИП ДЛЯ ZonesModal (КОПИЯ ИНВЕНТАРЯ) */}

      {/* Кнопка закрытия всего модального окна */}
      {!bazarOpen && (
        <div className="close-btn2" onClick={handleZoneModalClose}>
          ✖
        </div>
      )}
    </div>
  );
};

export default ZonesModal;
