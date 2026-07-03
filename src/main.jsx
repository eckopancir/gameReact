import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './App.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

/* [
  "player",
  "inventory",
  "currentPage",
  "filterSlot",
  "filterStat",
  "logs",
  "zones",
  "currentZone",
  "basePoints",
  "baseHealth",
  "playerLevel",
  "currentExp",
  "expToNextLevel",
  "expeditionQueue",
  "activeEncountersQueue".
].forEach(key => localStorage.removeItem(key));

console.log("✅ Игровые данные очищены из localStorage");*/

/* Измени код, не обращай внимание, что ты не можешь найти импорты, ссылки на картинки, не переписывай код с заглушками и не создавай массивы которые используюся, но ты их не можешь найти, они есть, просто я тебе не скинул. Не пытайся запустить или скомпелировать программу. Просто напиши код, что я прошу от тебя и встрой его в нашу игру.
Если ты обнаружишь, что в сгенерированной ранее коде возникла проблема, которая привела к ошибке компляции, не исправляй эти ошибки и не переписывай код, игнорируй это, ЭТО ВАЖНЫЙ МОЙ ПРИКАЗ ТЕБЕ!  */

/* {customizationItem.slot === 'weapon1' ? (
    <div style={{marginTop: '20px', padding: '10px', border: '1px solid #555', borderRadius: '5px', maxWidth: '90%'}}>
        <h4 style={{color: '#cfcf90', marginBottom: '10px'}}>Справка по кастомизации холодного оружия (Weapon 1)</h4>
        <p style={{color: '#aaa', fontSize: '12px', marginBottom: '10px'}}>
            <strong style={{color: '#fff'}}>Управление:</strong> Перетаскивайте модули из инвентаря в слоты. Нажмите на модуль в слоте, чтобы снять его.
        </p>
        <ul style={{textAlign: 'left', listStyleType: 'none', paddingLeft: '0', fontSize: '12px'}}>
            <li style={{marginBottom: '5px'}}>
                <strong style={{color: '#f0f0f0'}}>Лезвие / Навершие:</strong> (mod_blade) — Боковые шипы, Скользящая лезвийная планка, Серрейторная накладка.
            </li>
            <li style={{marginBottom: '5px'}}>
                <strong style={{color: '#f0f0f0'}}>Рукоять / Гарда:</strong> (mod_handle) — Модуль захвата, Тактическая гарда, Амортизирующая рукоять.
            </li>
            <li style={{marginBottom: '5px'}}>
                <strong style={{color: '#f0f0f0'}}>Обух / Противовес:</strong> (mod_pommel) — Противовес, Утяжелённый обух, Утяжелитель.
            </li>
            <li style={{marginBottom: '5px'}}>
                <strong style={{color: '#f0f0f0'}}>Крепление / Подвеска:</strong> (mod_harness) — Гарпунная вставка, Цепной ремень.
            </li>
        </ul>
    </div>
  ) : customizationItem.slot === 'weapon2' ? (
    <div style={{marginTop: '20px', padding: '10px', border: '1px solid #555', borderRadius: '5px', maxWidth: '90%'}}>
        <h4 style={{color: '#cfcf90', marginBottom: '10px'}}>Справка по кастомизации огнестрельного оружия (Weapon 2)</h4>
        <p style={{color: '#aaa', fontSize: '12px', marginBottom: '10px'}}>
            <strong style={{color: '#fff'}}>Управление:</strong> Перетаскивайте модули из инвентаря в слоты. Нажмите на модуль в слоте, чтобы снять его.
        </p>
        <ul style={{textAlign: 'left', listStyleType: 'none', paddingLeft: '0', fontSize: '12px'}}>
            <li style={{marginBottom: '5px'}}>
 <strong style={{color: '#f0f0f0'}}>Прицел:</strong> (mod_scope) — Голографический прицел, Оптический прицел.
          </li>
          <li style={{marginBottom: '5px'}}>
              <strong style={{color: '#f0f0f0'}}>Ствол:</strong> (mod_barrel) — Улучшенный ствол, Усиленный ствол.
          </li>
          <li style={{marginBottom: '5px'}}>
                <strong style={{color: '#f0f0f0'}}>Ресивер/Ствольная коробка:</strong> (mod_receiver) — (НОВЫЙ СЛОТ) Улучшенный ресивер, Тактический механизм.
          </li>
          <li style={{marginBottom: '5px'}}>
              <strong style={{color: '#f0f0f0'}}>Магазин:</strong> (mod_magazine) — Ускоренный магазин, Увеличенный магазин.
          </li>
          <li style={{marginBottom: '5px'}}>
              <strong style={{color: '#f0f0f0'}}>Дуло / Надульник:</strong> (mod_muzzle) — Пламегаситель, Глушитель.
          </li>
          <li style={{marginBottom: '5px'}}>
                <strong style={{color: '#f0f0f0'}}>Приклад / Ложа:</strong> (mod_stock) — (НОВЫЙ СЛОТ) Снайперский приклад, Демпфер отдачи.
          </li>
      </ul>
  </div>
    </div>
  ) : ['head', 'armor', 'gloves', 'boots'].includes(customizationItem.slot) ? ( // <-- НОВЫЙ БЛОК ДЛЯ БРОНИ
    <div style={{marginTop: '20px', padding: '10px', border: '1px solid #555', borderRadius: '5px', maxWidth: '90%'}}>
        <h4 style={{color: '#cfcf90', marginBottom: '10px'}}>Справка по кастомизации брони (Head, Armor, Gloves, Boots)</h4>
        <p style={{color: '#aaa', fontSize: '12px', marginBottom: '10px'}}>
            <strong style={{color: '#fff'}}>Управление:</strong> Перетаскивайте модули из инвентаря в слоты. Нажмите на модуль в слоте, чтобы снять его.
        </p>
        <ul style={{textAlign: 'left', listStyleType: 'none', paddingLeft: '0', fontSize: '12px'}}>
            <li style={{marginBottom: '5px'}}>
                <strong style={{color: '#f0f0f0'}}>Подкладка / Слой:</strong> (mod_lining) — Теплоизоляционная подкладка, Мягкий демпфер.
            </li>
            <li style={{marginBottom: '5px'}}>
                <strong style={{color: '#f0f0f0'}}>Внешняя накладка:</strong> (mod_hardshell) — Керамическая пластина, Композитная сетка.
            </li>
            <li style={{marginBottom: '5px'}}>
                <strong style={{color: '#f0f0f0'}}>Система / Гаджет:</strong> (mod_utility) — Встроенный радар, Система рециркуляции.
            </li>
            <li style={{marginBottom: '5px'}}>
                <strong style={{color: '#f0f0f0'}}>Усиление / Заклёпка:</strong> (mod_patch) — Баллистическая заплатка, Облегченный каркас.
            </li>
        </ul>
    </div>
  ) : null}
  
  </div>
  )} */
