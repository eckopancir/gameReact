import { useState, useEffect, useRef } from 'react';
import bazaImg from './assets/Images/map/baza.png';
import a5Icon from './assets/Images/items/5.png';
import a6Icon from './assets/Images/items/6.png';

const UPGRADE_REQUIREMENTS = {
  // -----------------------------------------------------
  // Верстаки (Workbench) - Базовый: Железо. Вторичный: Инструмнты, Изолента, Гвозди
  // -----------------------------------------------------
  Верстаки: {
    2: { time: 60, slot1: { name: 'Железо', count: 2 }, slot2: { name: 'Инструмнты', count: 1 } },
    3: { time: 600, slot1: { name: 'Железо', count: 6 }, slot2: { name: 'Изолента', count: 2 } },
    4: { time: 3600, slot1: { name: 'Железо', count: 10 }, slot2: { name: 'Гвозди', count: 3 } },
    5: {
      time: 5400,
      slot1: { name: 'Железо', count: 14 },
      slot2: { name: 'Инструмнты', count: 4 },
    },
    6: { time: 7200, slot1: { name: 'Железо', count: 21 }, slot2: { name: 'Изолента', count: 6 } },
    7: { time: 10800, slot1: { name: 'Железо', count: 28 }, slot2: { name: 'Гвозди', count: 9 } },
    8: {
      time: 14400,
      slot1: { name: 'Железо', count: 36 },
      slot2: { name: 'Инструмнты', count: 11 },
    },
    9: {
      time: 21600,
      slot1: { name: 'Железо', count: 45 },
      slot2: { name: 'Изолента', count: 14 },
    },
    10: { time: 28800, slot1: { name: 'Железо', count: 54 }, slot2: { name: 'Гвозди', count: 16 } },
    11: {
      time: 36000,
      slot1: { name: 'Железо', count: 66 },
      slot2: { name: 'Инструмнты', count: 20 },
    },
    12: {
      time: 43200,
      slot1: { name: 'Железо', count: 78 },
      slot2: { name: 'Изолента', count: 23 },
    },
    13: { time: 57600, slot1: { name: 'Железо', count: 91 }, slot2: { name: 'Гвозди', count: 27 } },
    14: {
      time: 72000,
      slot1: { name: 'Железо', count: 106 },
      slot2: { name: 'Инструмнты', count: 32 },
    },
    15: {
      time: 86400,
      slot1: { name: 'Железо', count: 122 },
      slot2: { name: 'Изолента', count: 37 },
    },
    16: {
      time: 108000,
      slot1: { name: 'Железо', count: 139 },
      slot2: { name: 'Гвозди', count: 42 },
    },
    17: {
      time: 129600,
      slot1: { name: 'Железо', count: 158 },
      slot2: { name: 'Инструмнты', count: 47 },
    },
    18: {
      time: 172800,
      slot1: { name: 'Железо', count: 178 },
      slot2: { name: 'Изолента', count: 54 },
    },
    19: {
      time: 345600,
      slot1: { name: 'Железо', count: 199 },
      slot2: { name: 'Гвозди', count: 60 },
    },
    20: {
      time: 604800,
      slot1: { name: 'Железо', count: 222 },
      slot2: { name: 'Инструмнты', count: 66 },
    },
    21: {
      time: 864000,
      slot1: { name: 'Железо', count: 246 },
      slot2: { name: 'Изолента', count: 74 },
    },
    22: {
      time: 1036800,
      slot1: { name: 'Железо', count: 271 },
      slot2: { name: 'Гвозди', count: 82 },
    },
    23: {
      time: 1209600,
      slot1: { name: 'Железо', count: 298 },
      slot2: { name: 'Инструмнты', count: 90 },
    },
    24: {
      time: 1468800,
      slot1: { name: 'Железо', count: 326 },
      slot2: { name: 'Изолента', count: 98 },
    },
    25: {
      time: 1728000,
      slot1: { name: 'Железо', count: 356 },
      slot2: { name: 'Гвозди', count: 107 },
    },
    26: {
      time: 2592000,
      slot1: { name: 'Железо', count: 388 },
      slot2: { name: 'Инструмнты', count: 116 },
    },
    27: {
      time: 3456000,
      slot1: { name: 'Железо', count: 400 },
      slot2: { name: 'Изолента', count: 120 },
    }, // Слот 2: Пластмасса заменена на Изолента
    28: {
      time: 4320000,
      slot1: { name: 'Железо', count: 400 },
      slot2: { name: 'Гвозди', count: 120 },
    },
    29: {
      time: 6048000,
      slot1: { name: 'Железо', count: 400 },
      slot2: { name: 'Инструмнты', count: 120 },
    },
    30: {
      time: 7776000,
      slot1: { name: 'Железо', count: 400 },
      slot2: { name: 'Изолента', count: 120 },
    },
  },
  // -----------------------------------------------------
  // Огород (Garden) - Базовый: Дерево. Вторичный: Вода, Гвозди
  // -----------------------------------------------------
  Огород: {
    2: { time: 60, slot1: { name: 'Дерево', count: 2 }, slot2: { name: 'Вода', count: 2 } },
    3: { time: 600, slot1: { name: 'Дерево', count: 6 }, slot2: { name: 'Гвозди', count: 2 } },
    4: { time: 3600, slot1: { name: 'Дерево', count: 10 }, slot2: { name: 'Вода', count: 5 } },
    5: { time: 5400, slot1: { name: 'Дерево', count: 14 }, slot2: { name: 'Гвозди', count: 4 } },
    6: { time: 7200, slot1: { name: 'Дерево', count: 21 }, slot2: { name: 'Вода', count: 10 } },
    7: { time: 10800, slot1: { name: 'Дерево', count: 28 }, slot2: { name: 'Гвозди', count: 9 } },
    8: { time: 14400, slot1: { name: 'Дерево', count: 36 }, slot2: { name: 'Вода', count: 18 } },
    9: { time: 21600, slot1: { name: 'Дерево', count: 45 }, slot2: { name: 'Гвозди', count: 14 } },
    10: { time: 28800, slot1: { name: 'Дерево', count: 54 }, slot2: { name: 'Вода', count: 27 } },
    11: { time: 36000, slot1: { name: 'Дерево', count: 66 }, slot2: { name: 'Гвозди', count: 20 } },
    12: { time: 43200, slot1: { name: 'Дерево', count: 78 }, slot2: { name: 'Вода', count: 38 } },
    13: { time: 57600, slot1: { name: 'Дерево', count: 91 }, slot2: { name: 'Гвозди', count: 27 } },
    14: { time: 72000, slot1: { name: 'Дерево', count: 106 }, slot2: { name: 'Вода', count: 53 } },
    15: {
      time: 86400,
      slot1: { name: 'Дерево', count: 122 },
      slot2: { name: 'Гвозди', count: 37 },
    },
    16: { time: 108000, slot1: { name: 'Дерево', count: 139 }, slot2: { name: 'Вода', count: 70 } },
    17: {
      time: 129600,
      slot1: { name: 'Дерево', count: 158 },
      slot2: { name: 'Гвозди', count: 47 },
    },
    18: { time: 172800, slot1: { name: 'Дерево', count: 178 }, slot2: { name: 'Вода', count: 89 } },
    19: {
      time: 345600,
      slot1: { name: 'Дерево', count: 199 },
      slot2: { name: 'Гвозди', count: 60 },
    },
    20: {
      time: 604800,
      slot1: { name: 'Дерево', count: 222 },
      slot2: { name: 'Вода', count: 110 },
    },
    21: {
      time: 864000,
      slot1: { name: 'Дерево', count: 246 },
      slot2: { name: 'Гвозди', count: 74 },
    },
    22: {
      time: 1036800,
      slot1: { name: 'Дерево', count: 271 },
      slot2: { name: 'Вода', count: 135 },
    },
    23: {
      time: 1209600,
      slot1: { name: 'Дерево', count: 298 },
      slot2: { name: 'Гвозди', count: 90 },
    },
    24: {
      time: 1468800,
      slot1: { name: 'Дерево', count: 326 },
      slot2: { name: 'Вода', count: 163 },
    },
    25: {
      time: 1728000,
      slot1: { name: 'Дерево', count: 356 },
      slot2: { name: 'Гвозди', count: 107 },
    },
    26: {
      time: 2592000,
      slot1: { name: 'Дерево', count: 388 },
      slot2: { name: 'Вода', count: 194 },
    },
    27: {
      time: 3456000,
      slot1: { name: 'Дерево', count: 400 },
      slot2: { name: 'Гвозди', count: 120 },
    },
    28: {
      time: 4320000,
      slot1: { name: 'Дерево', count: 400 },
      slot2: { name: 'Вода', count: 200 },
    },
    29: {
      time: 6048000,
      slot1: { name: 'Дерево', count: 400 },
      slot2: { name: 'Гвозди', count: 120 },
    },
    30: {
      time: 7776000,
      slot1: { name: 'Дерево', count: 400 },
      slot2: { name: 'Вода', count: 200 },
    },
  },
  // -----------------------------------------------------
  // Теплица (Greenhouse) - Базовый: Пластмасса. Вторичный: Изолента, Инструмнты, Вода
  // -----------------------------------------------------
  Теплица: {
    2: { time: 60, slot1: { name: 'Пластмасса', count: 2 }, slot2: { name: 'Изолента', count: 1 } },
    3: {
      time: 600,
      slot1: { name: 'Пластмасса', count: 6 },
      slot2: { name: 'Инструмнты', count: 2 },
    }, // Слот 2: Железо заменено на Инструмнты
    4: { time: 3600, slot1: { name: 'Пластмасса', count: 10 }, slot2: { name: 'Вода', count: 3 } },
    5: {
      time: 5400,
      slot1: { name: 'Пластмасса', count: 14 },
      slot2: { name: 'Изолента', count: 4 },
    },
    6: {
      time: 7200,
      slot1: { name: 'Пластмасса', count: 21 },
      slot2: { name: 'Инструмнты', count: 6 },
    }, // Слот 2: Железо заменено на Инструмнты
    7: { time: 10800, slot1: { name: 'Пластмасса', count: 28 }, slot2: { name: 'Вода', count: 9 } },
    8: {
      time: 14400,
      slot1: { name: 'Пластмасса', count: 36 },
      slot2: { name: 'Изолента', count: 11 },
    },
    9: {
      time: 21600,
      slot1: { name: 'Пластмасса', count: 45 },
      slot2: { name: 'Инструмнты', count: 14 },
    }, // Слот 2: Железо заменено на Инструмнты
    10: {
      time: 28800,
      slot1: { name: 'Пластмасса', count: 54 },
      slot2: { name: 'Вода', count: 16 },
    },
    11: {
      time: 36000,
      slot1: { name: 'Пластмасса', count: 66 },
      slot2: { name: 'Изолента', count: 20 },
    },
    12: {
      time: 43200,
      slot1: { name: 'Пластмасса', count: 78 },
      slot2: { name: 'Инструмнты', count: 23 },
    }, // Слот 2: Железо заменено на Инструмнты
    13: {
      time: 57600,
      slot1: { name: 'Пластмасса', count: 91 },
      slot2: { name: 'Вода', count: 27 },
    },
    14: {
      time: 72000,
      slot1: { name: 'Пластмасса', count: 106 },
      slot2: { name: 'Изолента', count: 32 },
    }, // Слот 2: Железо заменено на Изолента
    15: {
      time: 86400,
      slot1: { name: 'Пластмасса', count: 122 },
      slot2: { name: 'Инструмнты', count: 37 },
    },
    16: {
      time: 108000,
      slot1: { name: 'Пластмасса', count: 139 },
      slot2: { name: 'Вода', count: 42 },
    },
    17: {
      time: 129600,
      slot1: { name: 'Пластмасса', count: 158 },
      slot2: { name: 'Изолента', count: 47 },
    }, // Слот 2: Железо заменено на Изолента
    18: {
      time: 172800,
      slot1: { name: 'Пластмасса', count: 178 },
      slot2: { name: 'Инструмнты', count: 54 },
    },
    19: {
      time: 345600,
      slot1: { name: 'Пластмасса', count: 199 },
      slot2: { name: 'Вода', count: 60 },
    },
    20: {
      time: 604800,
      slot1: { name: 'Пластмасса', count: 222 },
      slot2: { name: 'Изолента', count: 66 },
    }, // Слот 2: Железо заменено на Изолента
    21: {
      time: 864000,
      slot1: { name: 'Пластмасса', count: 246 },
      slot2: { name: 'Инструмнты', count: 74 },
    },
    22: {
      time: 1036800,
      slot1: { name: 'Пластмасса', count: 271 },
      slot2: { name: 'Вода', count: 82 },
    },
    23: {
      time: 1209600,
      slot1: { name: 'Пластмасса', count: 298 },
      slot2: { name: 'Изолента', count: 90 },
    }, // Слот 2: Железо заменено на Изолента
    24: {
      time: 1468800,
      slot1: { name: 'Пластмасса', count: 326 },
      slot2: { name: 'Инструмнты', count: 98 },
    },
    25: {
      time: 1728000,
      slot1: { name: 'Пластмасса', count: 356 },
      slot2: { name: 'Вода', count: 107 },
    },
    26: {
      time: 2592000,
      slot1: { name: 'Пластмасса', count: 388 },
      slot2: { name: 'Изолента', count: 116 },
    }, // Слот 2: Железо заменено на Изолента
    27: {
      time: 3456000,
      slot1: { name: 'Пластмасса', count: 400 },
      slot2: { name: 'Инструмнты', count: 120 },
    },
    28: {
      time: 4320000,
      slot1: { name: 'Пластмасса', count: 400 },
      slot2: { name: 'Вода', count: 120 },
    }, // Слот 2: Инструмнты заменен на Вода
    29: {
      time: 6048000,
      slot1: { name: 'Пластмасса', count: 400 },
      slot2: { name: 'Изолента', count: 120 },
    },
    30: {
      time: 7776000,
      slot1: { name: 'Пластмасса', count: 400 },
      slot2: { name: 'Инструмнты', count: 120 },
    }, // Слот 2: Железо заменено на Инструмнты
  },
  // -----------------------------------------------------
  // Зона сна (Sleep) - Базовый: Дерево. Вторичный: Изолента, Гвозди, Вода
  // -----------------------------------------------------
  'Зона сна': {
    2: { time: 60, slot1: { name: 'Дерево', count: 2 }, slot2: { name: 'Изолента', count: 1 } },
    3: { time: 600, slot1: { name: 'Дерево', count: 6 }, slot2: { name: 'Гвозди', count: 2 } }, // Слот 2: Пластмасса заменена на Гвозди
    4: { time: 3600, slot1: { name: 'Дерево', count: 10 }, slot2: { name: 'Вода', count: 3 } },
    5: { time: 5400, slot1: { name: 'Дерево', count: 14 }, slot2: { name: 'Изолента', count: 4 } },
    6: { time: 7200, slot1: { name: 'Дерево', count: 21 }, slot2: { name: 'Гвозди', count: 6 } }, // Слот 2: Пластмасса заменена на Гвозди
    7: { time: 10800, slot1: { name: 'Дерево', count: 28 }, slot2: { name: 'Вода', count: 9 } },
    8: {
      time: 14400,
      slot1: { name: 'Дерево', count: 36 },
      slot2: { name: 'Изолента', count: 11 },
    },
    9: { time: 21600, slot1: { name: 'Дерево', count: 45 }, slot2: { name: 'Гвозди', count: 14 } }, // Слот 2: Пластмасса заменена на Гвозди
    10: { time: 28800, slot1: { name: 'Дерево', count: 54 }, slot2: { name: 'Вода', count: 16 } },
    11: {
      time: 36000,
      slot1: { name: 'Дерево', count: 66 },
      slot2: { name: 'Изолента', count: 20 },
    },
    12: { time: 43200, slot1: { name: 'Дерево', count: 78 }, slot2: { name: 'Гвозди', count: 23 } }, // Слот 2: Пластмасса заменена на Гвозди
    13: { time: 57600, slot1: { name: 'Дерево', count: 91 }, slot2: { name: 'Вода', count: 27 } },
    14: {
      time: 72000,
      slot1: { name: 'Дерево', count: 106 },
      slot2: { name: 'Изолента', count: 32 },
    },
    15: {
      time: 86400,
      slot1: { name: 'Дерево', count: 122 },
      slot2: { name: 'Гвозди', count: 37 },
    }, // Слот 2: Пластмасса заменена на Гвозди
    16: { time: 108000, slot1: { name: 'Дерево', count: 139 }, slot2: { name: 'Вода', count: 42 } },
    17: {
      time: 129600,
      slot1: { name: 'Дерево', count: 158 },
      slot2: { name: 'Изолента', count: 47 },
    },
    18: {
      time: 172800,
      slot1: { name: 'Дерево', count: 178 },
      slot2: { name: 'Гвозди', count: 54 },
    }, // Слот 2: Пластмасса заменена на Гвозди
    19: { time: 345600, slot1: { name: 'Дерево', count: 199 }, slot2: { name: 'Вода', count: 60 } },
    20: {
      time: 604800,
      slot1: { name: 'Дерево', count: 222 },
      slot2: { name: 'Изолента', count: 66 },
    },
    21: {
      time: 864000,
      slot1: { name: 'Дерево', count: 246 },
      slot2: { name: 'Гвозди', count: 74 },
    }, // Слот 2: Пластмасса заменена на Гвозди
    22: {
      time: 1036800,
      slot1: { name: 'Дерево', count: 271 },
      slot2: { name: 'Вода', count: 82 },
    },
    23: {
      time: 1209600,
      slot1: { name: 'Дерево', count: 298 },
      slot2: { name: 'Изолента', count: 90 },
    },
    24: {
      time: 1468800,
      slot1: { name: 'Дерево', count: 326 },
      slot2: { name: 'Гвозди', count: 98 },
    }, // Слот 2: Пластмасса заменена на Гвозди
    25: {
      time: 1728000,
      slot1: { name: 'Дерево', count: 356 },
      slot2: { name: 'Вода', count: 107 },
    },
    26: {
      time: 2592000,
      slot1: { name: 'Дерево', count: 388 },
      slot2: { name: 'Изолента', count: 116 },
    },
    27: {
      time: 3456000,
      slot1: { name: 'Дерево', count: 400 },
      slot2: { name: 'Гвозди', count: 120 },
    }, // Слот 2: Пластмасса заменена на Гвозди
    28: {
      time: 4320000,
      slot1: { name: 'Дерево', count: 400 },
      slot2: { name: 'Вода', count: 120 },
    },
    29: {
      time: 6048000,
      slot1: { name: 'Дерево', count: 400 },
      slot2: { name: 'Изолента', count: 120 },
    },
    30: {
      time: 7776000,
      slot1: { name: 'Дерево', count: 400 },
      slot2: { name: 'Гвозди', count: 120 },
    }, // Слот 2: Пластмасса заменена на Гвозди
  },
  // -----------------------------------------------------
  // Оружейная (Weapons) - Базовый: Железо. Вторичный: Гвозди, Инструмнты, Изолента, Вода
  // -----------------------------------------------------
  Оружейная: {
    2: { time: 60, slot1: { name: 'Железо', count: 2 }, slot2: { name: 'Гвозди', count: 1 } },
    3: { time: 600, slot1: { name: 'Железо', count: 6 }, slot2: { name: 'Инструмнты', count: 2 } },
    4: { time: 3600, slot1: { name: 'Железо', count: 10 }, slot2: { name: 'Изолента', count: 3 } },
    5: { time: 5400, slot1: { name: 'Железо', count: 14 }, slot2: { name: 'Вода', count: 4 } }, // Слот 2: Пластмасса заменена на Вода
    6: { time: 7200, slot1: { name: 'Железо', count: 21 }, slot2: { name: 'Гвозди', count: 6 } },
    7: {
      time: 10800,
      slot1: { name: 'Железо', count: 28 },
      slot2: { name: 'Инструмнты', count: 9 },
    },
    8: {
      time: 14400,
      slot1: { name: 'Железо', count: 36 },
      slot2: { name: 'Изолента', count: 11 },
    },
    9: { time: 21600, slot1: { name: 'Железо', count: 45 }, slot2: { name: 'Вода', count: 14 } }, // Слот 2: Пластмасса заменена на Вода
    10: { time: 28800, slot1: { name: 'Железо', count: 54 }, slot2: { name: 'Гвозди', count: 16 } },
    11: {
      time: 36000,
      slot1: { name: 'Железо', count: 66 },
      slot2: { name: 'Инструмнты', count: 20 },
    },
    12: {
      time: 43200,
      slot1: { name: 'Железо', count: 78 },
      slot2: { name: 'Изолента', count: 23 },
    },
    13: { time: 57600, slot1: { name: 'Железо', count: 91 }, slot2: { name: 'Вода', count: 27 } }, // Слот 2: Пластмасса заменена на Вода
    14: {
      time: 72000,
      slot1: { name: 'Железо', count: 106 },
      slot2: { name: 'Гвозди', count: 32 },
    },
    15: {
      time: 86400,
      slot1: { name: 'Железо', count: 122 },
      slot2: { name: 'Инструмнты', count: 37 },
    },
    16: {
      time: 108000,
      slot1: { name: 'Железо', count: 139 },
      slot2: { name: 'Изолента', count: 42 },
    },
    17: { time: 129600, slot1: { name: 'Железо', count: 158 }, slot2: { name: 'Вода', count: 47 } }, // Слот 2: Пластмасса заменена на Вода
    18: {
      time: 172800,
      slot1: { name: 'Железо', count: 178 },
      slot2: { name: 'Гвозди', count: 54 },
    },
    19: {
      time: 345600,
      slot1: { name: 'Железо', count: 199 },
      slot2: { name: 'Инструмнты', count: 60 },
    },
    20: {
      time: 604800,
      slot1: { name: 'Железо', count: 222 },
      slot2: { name: 'Изолента', count: 66 },
    },
    21: { time: 864000, slot1: { name: 'Железо', count: 246 }, slot2: { name: 'Вода', count: 74 } }, // Слот 2: Пластмасса заменена на Вода
    22: {
      time: 1036800,
      slot1: { name: 'Железо', count: 271 },
      slot2: { name: 'Гвозди', count: 82 },
    },
    23: {
      time: 1209600,
      slot1: { name: 'Железо', count: 298 },
      slot2: { name: 'Инструмнты', count: 90 },
    },
    24: {
      time: 1468800,
      slot1: { name: 'Железо', count: 326 },
      slot2: { name: 'Изолента', count: 98 },
    },
    25: {
      time: 1728000,
      slot1: { name: 'Железо', count: 356 },
      slot2: { name: 'Вода', count: 107 },
    }, // Слот 2: Пластмасса заменена на Вода
    26: {
      time: 2592000,
      slot1: { name: 'Железо', count: 388 },
      slot2: { name: 'Гвозди', count: 116 },
    },
    27: {
      time: 3456000,
      slot1: { name: 'Железо', count: 400 },
      slot2: { name: 'Инструмнты', count: 120 },
    },
    28: {
      time: 4320000,
      slot1: { name: 'Железо', count: 400 },
      slot2: { name: 'Изолента', count: 120 },
    },
    29: {
      time: 6048000,
      slot1: { name: 'Железо', count: 400 },
      slot2: { name: 'Вода', count: 120 },
    }, // Слот 2: Пластмасса заменена на Вода
    30: {
      time: 7776000,
      slot1: { name: 'Железо', count: 400 },
      slot2: { name: 'Гвозди', count: 120 },
    },
  },
  // -----------------------------------------------------
  // Броня (Armor) - Базовый: Пластмасса. Вторичный: Изолента, Инструмнты, Гвозди
  // -----------------------------------------------------
  Броня: {
    2: { time: 60, slot1: { name: 'Пластмасса', count: 2 }, slot2: { name: 'Изолента', count: 1 } },
    3: {
      time: 600,
      slot1: { name: 'Пластмасса', count: 6 },
      slot2: { name: 'Инструмнты', count: 2 },
    }, // Слот 2: Железо заменено на Инструмнты
    4: {
      time: 3600,
      slot1: { name: 'Пластмасса', count: 10 },
      slot2: { name: 'Гвозди', count: 3 },
    },
    5: {
      time: 5400,
      slot1: { name: 'Пластмасса', count: 14 },
      slot2: { name: 'Изолента', count: 4 },
    }, // Слот 2: Железо заменено на Изолента
    6: {
      time: 7200,
      slot1: { name: 'Пластмасса', count: 21 },
      slot2: { name: 'Инструмнты', count: 6 },
    },
    7: {
      time: 10800,
      slot1: { name: 'Пластмасса', count: 28 },
      slot2: { name: 'Гвозди', count: 9 },
    }, // Слот 2: Железо заменено на Гвозди
    8: {
      time: 14400,
      slot1: { name: 'Пластмасса', count: 36 },
      slot2: { name: 'Изолента', count: 11 },
    },
    9: {
      time: 21600,
      slot1: { name: 'Пластмасса', count: 45 },
      slot2: { name: 'Инструмнты', count: 14 },
    },
    10: {
      time: 28800,
      slot1: { name: 'Пластмасса', count: 54 },
      slot2: { name: 'Гвозди', count: 16 },
    }, // Слот 2: Железо заменено на Гвозди
    11: {
      time: 36000,
      slot1: { name: 'Пластмасса', count: 66 },
      slot2: { name: 'Изолента', count: 20 },
    },
    12: {
      time: 43200,
      slot1: { name: 'Пластмасса', count: 78 },
      slot2: { name: 'Инструмнты', count: 23 },
    }, // Слот 2: Железо заменено на Инструмнты
    13: {
      time: 57600,
      slot1: { name: 'Пластмасса', count: 91 },
      slot2: { name: 'Гвозди', count: 27 },
    },
    14: {
      time: 72000,
      slot1: { name: 'Пластмасса', count: 106 },
      slot2: { name: 'Изолента', count: 32 },
    }, // Слот 2: Железо заменено на Изолента
    15: {
      time: 86400,
      slot1: { name: 'Пластмасса', count: 122 },
      slot2: { name: 'Инструмнты', count: 37 },
    },
    16: {
      time: 108000,
      slot1: { name: 'Пластмасса', count: 139 },
      slot2: { name: 'Гвозди', count: 42 },
    }, // Слот 2: Железо заменено на Гвозди
    17: {
      time: 129600,
      slot1: { name: 'Пластмасса', count: 158 },
      slot2: { name: 'Изолента', count: 47 },
    },
    18: {
      time: 172800,
      slot1: { name: 'Пластмасса', count: 178 },
      slot2: { name: 'Инструмнты', count: 54 },
    }, // Слот 2: Железо заменено на Инструмнты
    19: {
      time: 345600,
      slot1: { name: 'Пластмасса', count: 199 },
      slot2: { name: 'Гвозди', count: 60 },
    },
    20: {
      time: 604800,
      slot1: { name: 'Пластмасса', count: 222 },
      slot2: { name: 'Изолента', count: 66 },
    }, // Слот 2: Железо заменено на Изолента
    21: {
      time: 864000,
      slot1: { name: 'Пластмасса', count: 246 },
      slot2: { name: 'Инструмнты', count: 74 },
    },
    22: {
      time: 1036800,
      slot1: { name: 'Пластмасса', count: 271 },
      slot2: { name: 'Гвозди', count: 82 },
    }, // Слот 2: Железо заменено на Гвозди
    23: {
      time: 1209600,
      slot1: { name: 'Пластмасса', count: 298 },
      slot2: { name: 'Изолента', count: 90 },
    },
    24: {
      time: 1468800,
      slot1: { name: 'Пластмасса', count: 326 },
      slot2: { name: 'Инструмнты', count: 98 },
    }, // Слот 2: Железо заменено на Инструмнты
    25: {
      time: 1728000,
      slot1: { name: 'Пластмасса', count: 356 },
      slot2: { name: 'Гвозди', count: 107 },
    },
    26: {
      time: 2592000,
      slot1: { name: 'Пластмасса', count: 388 },
      slot2: { name: 'Изолента', count: 116 },
    }, // Слот 2: Железо заменено на Изолента
    27: {
      time: 3456000,
      slot1: { name: 'Пластмасса', count: 400 },
      slot2: { name: 'Инструмнты', count: 120 },
    },
    28: {
      time: 4320000,
      slot1: { name: 'Пластмасса', count: 400 },
      slot2: { name: 'Гвозди', count: 120 },
    }, // Слот 2: Инструмнты заменен на Гвозди
    29: {
      time: 6048000,
      slot1: { name: 'Пластмасса', count: 400 },
      slot2: { name: 'Изолента', count: 120 },
    }, // Слот 2: Железо заменено на Изолента
    30: {
      time: 7776000,
      slot1: { name: 'Пластмасса', count: 400 },
      slot2: { name: 'Инструмнты', count: 120 },
    },
  },
  // -----------------------------------------------------
  // Дом. скот (Livestock) - Базовый: Дерево. Вторичный: Вода, Изолента, Инструмнты
  // -----------------------------------------------------
  'Дом. скот': {
    2: { time: 60, slot1: { name: 'Дерево', count: 2 }, slot2: { name: 'Вода', count: 2 } },
    3: { time: 600, slot1: { name: 'Дерево', count: 6 }, slot2: { name: 'Изолента', count: 2 } }, // Слот 2: Пластмасса заменена на Изолента
    4: {
      time: 3600,
      slot1: { name: 'Дерево', count: 10 },
      slot2: { name: 'Инструмнты', count: 3 },
    }, // Слот 2: Железо заменено на Инструмнты
    5: { time: 5400, slot1: { name: 'Дерево', count: 14 }, slot2: { name: 'Вода', count: 7 } },
    6: { time: 7200, slot1: { name: 'Дерево', count: 21 }, slot2: { name: 'Изолента', count: 6 } }, // Слот 2: Пластмасса заменена на Изолента
    7: {
      time: 10800,
      slot1: { name: 'Дерево', count: 28 },
      slot2: { name: 'Инструмнты', count: 9 },
    }, // Слот 2: Железо заменено на Инструмнты
    8: { time: 14400, slot1: { name: 'Дерево', count: 36 }, slot2: { name: 'Вода', count: 18 } },
    9: {
      time: 21600,
      slot1: { name: 'Дерево', count: 45 },
      slot2: { name: 'Изолента', count: 14 },
    }, // Слот 2: Пластмасса заменена на Изолента
    10: {
      time: 28800,
      slot1: { name: 'Дерево', count: 54 },
      slot2: { name: 'Инструмнты', count: 16 },
    }, // Слот 2: Железо заменено на Инструмнты
    11: { time: 36000, slot1: { name: 'Дерево', count: 66 }, slot2: { name: 'Вода', count: 33 } },
    12: {
      time: 43200,
      slot1: { name: 'Дерево', count: 78 },
      slot2: { name: 'Изолента', count: 23 },
    }, // Слот 2: Пластмасса заменена на Изолента
    13: {
      time: 57600,
      slot1: { name: 'Дерево', count: 91 },
      slot2: { name: 'Инструмнты', count: 27 },
    }, // Слот 2: Железо заменено на Инструмнты
    14: { time: 72000, slot1: { name: 'Дерево', count: 106 }, slot2: { name: 'Вода', count: 53 } },
    15: {
      time: 86400,
      slot1: { name: 'Дерево', count: 122 },
      slot2: { name: 'Изолента', count: 37 },
    }, // Слот 2: Пластмасса заменена на Изолента
    16: {
      time: 108000,
      slot1: { name: 'Дерево', count: 139 },
      slot2: { name: 'Инструмнты', count: 42 },
    }, // Слот 2: Железо заменено на Инструмнты
    17: { time: 129600, slot1: { name: 'Дерево', count: 158 }, slot2: { name: 'Вода', count: 78 } },
    18: {
      time: 172800,
      slot1: { name: 'Дерево', count: 178 },
      slot2: { name: 'Изолента', count: 54 },
    }, // Слот 2: Пластмасса заменена на Изолента
    19: {
      time: 345600,
      slot1: { name: 'Дерево', count: 199 },
      slot2: { name: 'Инструмнты', count: 60 },
    }, // Слот 2: Железо заменено на Инструмнты
    20: {
      time: 604800,
      slot1: { name: 'Дерево', count: 222 },
      slot2: { name: 'Вода', count: 110 },
    },
    21: {
      time: 864000,
      slot1: { name: 'Дерево', count: 246 },
      slot2: { name: 'Изолента', count: 74 },
    }, // Слот 2: Пластмасса заменена на Изолента
    22: {
      time: 1036800,
      slot1: { name: 'Дерево', count: 271 },
      slot2: { name: 'Инструмнты', count: 82 },
    }, // Слот 2: Железо заменено на Инструмнты
    23: {
      time: 1209600,
      slot1: { name: 'Дерево', count: 298 },
      slot2: { name: 'Вода', count: 149 },
    },
    24: {
      time: 1468800,
      slot1: { name: 'Дерево', count: 326 },
      slot2: { name: 'Изолента', count: 98 },
    }, // Слот 2: Пластмасса заменена на Изолента
    25: {
      time: 1728000,
      slot1: { name: 'Дерево', count: 356 },
      slot2: { name: 'Инструмнты', count: 107 },
    }, // Слот 2: Железо заменено на Инструмнты
    26: {
      time: 2592000,
      slot1: { name: 'Дерево', count: 388 },
      slot2: { name: 'Вода', count: 194 },
    },
    27: {
      time: 3456000,
      slot1: { name: 'Дерево', count: 400 },
      slot2: { name: 'Изолента', count: 120 },
    }, // Слот 2: Пластмасса заменена на Изолента
    28: {
      time: 4320000,
      slot1: { name: 'Дерево', count: 400 },
      slot2: { name: 'Инструмнты', count: 120 },
    }, // Слот 2: Железо заменено на Инструмнты
    29: {
      time: 6048000,
      slot1: { name: 'Дерево', count: 400 },
      slot2: { name: 'Вода', count: 200 },
    },
    30: {
      time: 7776000,
      slot1: { name: 'Дерево', count: 400 },
      slot2: { name: 'Изолента', count: 120 },
    }, // Слот 2: Пластмасса заменена на Изолента
  },
  // -----------------------------------------------------
  // Медицина (Medbay) - Базовый: Пластмасса. Вторичный: Изолента, Вода, Инструмнты
  // -----------------------------------------------------
  Медицина: {
    2: { time: 60, slot1: { name: 'Пластмасса', count: 2 }, slot2: { name: 'Изолента', count: 1 } },
    3: { time: 600, slot1: { name: 'Пластмасса', count: 6 }, slot2: { name: 'Вода', count: 3 } },
    4: {
      time: 3600,
      slot1: { name: 'Пластмасса', count: 10 },
      slot2: { name: 'Инструмнты', count: 3 },
    },
    5: {
      time: 5400,
      slot1: { name: 'Пластмасса', count: 14 },
      slot2: { name: 'Изолента', count: 4 },
    },
    6: { time: 7200, slot1: { name: 'Пластмасса', count: 21 }, slot2: { name: 'Вода', count: 10 } },
    7: {
      time: 10800,
      slot1: { name: 'Пластмасса', count: 28 },
      slot2: { name: 'Инструмнты', count: 9 },
    },
    8: {
      time: 14400,
      slot1: { name: 'Пластмасса', count: 36 },
      slot2: { name: 'Изолента', count: 11 },
    },
    9: {
      time: 21600,
      slot1: { name: 'Пластмасса', count: 45 },
      slot2: { name: 'Вода', count: 22 },
    },
    10: {
      time: 28800,
      slot1: { name: 'Пластмасса', count: 54 },
      slot2: { name: 'Инструмнты', count: 16 },
    },
    11: {
      time: 36000,
      slot1: { name: 'Пластмасса', count: 66 },
      slot2: { name: 'Изолента', count: 20 },
    },
    12: {
      time: 43200,
      slot1: { name: 'Пластмасса', count: 78 },
      slot2: { name: 'Вода', count: 38 },
    },
    13: {
      time: 57600,
      slot1: { name: 'Пластмасса', count: 91 },
      slot2: { name: 'Инструмнты', count: 27 },
    },
    14: {
      time: 72000,
      slot1: { name: 'Пластмасса', count: 106 },
      slot2: { name: 'Изолента', count: 32 },
    },
    15: {
      time: 86400,
      slot1: { name: 'Пластмасса', count: 122 },
      slot2: { name: 'Вода', count: 61 },
    },
    16: {
      time: 108000,
      slot1: { name: 'Пластмасса', count: 139 },
      slot2: { name: 'Инструмнты', count: 42 },
    },
    17: {
      time: 129600,
      slot1: { name: 'Пластмасса', count: 158 },
      slot2: { name: 'Изолента', count: 47 },
    },
    18: {
      time: 172800,
      slot1: { name: 'Пластмасса', count: 178 },
      slot2: { name: 'Вода', count: 89 },
    },
    19: {
      time: 345600,
      slot1: { name: 'Пластмасса', count: 199 },
      slot2: { name: 'Инструмнты', count: 60 },
    },
    20: {
      time: 604800,
      slot1: { name: 'Пластмасса', count: 222 },
      slot2: { name: 'Изолента', count: 66 },
    },
    21: {
      time: 864000,
      slot1: { name: 'Пластмасса', count: 246 },
      slot2: { name: 'Вода', count: 122 },
    },
    22: {
      time: 1036800,
      slot1: { name: 'Пластмасса', count: 271 },
      slot2: { name: 'Инструмнты', count: 82 },
    },
    23: {
      time: 1209600,
      slot1: { name: 'Пластмасса', count: 298 },
      slot2: { name: 'Изолента', count: 90 },
    },
    24: {
      time: 1468800,
      slot1: { name: 'Пластмасса', count: 326 },
      slot2: { name: 'Вода', count: 163 },
    },
    25: {
      time: 1728000,
      slot1: { name: 'Пластмасса', count: 356 },
      slot2: { name: 'Инструмнты', count: 107 },
    },
    26: {
      time: 2592000,
      slot1: { name: 'Пластмасса', count: 388 },
      slot2: { name: 'Изолента', count: 116 },
    },
    27: {
      time: 3456000,
      slot1: { name: 'Пластмасса', count: 400 },
      slot2: { name: 'Вода', count: 200 },
    },
    28: {
      time: 4320000,
      slot1: { name: 'Пластмасса', count: 400 },
      slot2: { name: 'Инструмнты', count: 120 },
    },
    29: {
      time: 6048000,
      slot1: { name: 'Пластмасса', count: 400 },
      slot2: { name: 'Изолента', count: 120 },
    },
    30: {
      time: 7776000,
      slot1: { name: 'Пластмасса', count: 400 },
      slot2: { name: 'Вода', count: 200 },
    },
  },
  // -----------------------------------------------------
  // Развлечения (Fun) - Базовый: Дерево. Вторичный: Изолента, Инструмнты, Гвозди
  // -----------------------------------------------------
  Развлечения: {
    2: { time: 60, slot1: { name: 'Дерево', count: 2 }, slot2: { name: 'Изолента', count: 1 } }, // Слот 2: Пластмасса заменена на Изолента
    3: { time: 600, slot1: { name: 'Дерево', count: 6 }, slot2: { name: 'Инструмнты', count: 2 } }, // Слот 2: Изолента заменен на Инструмнты
    4: { time: 3600, slot1: { name: 'Дерево', count: 10 }, slot2: { name: 'Гвозди', count: 3 } },
    5: { time: 5400, slot1: { name: 'Дерево', count: 14 }, slot2: { name: 'Изолента', count: 4 } }, // Слот 2: Пластмасса заменена на Изолента
    6: {
      time: 7200,
      slot1: { name: 'Дерево', count: 21 },
      slot2: { name: 'Инструмнты', count: 6 },
    }, // Слот 2: Изолента заменен на Инструмнты
    7: { time: 10800, slot1: { name: 'Дерево', count: 28 }, slot2: { name: 'Гвозди', count: 9 } },
    8: {
      time: 14400,
      slot1: { name: 'Дерево', count: 36 },
      slot2: { name: 'Изолента', count: 11 },
    }, // Слот 2: Пластмасса заменена на Изолента
    9: {
      time: 21600,
      slot1: { name: 'Дерево', count: 45 },
      slot2: { name: 'Инструмнты', count: 14 },
    }, // Слот 2: Изолента заменен на Инструмнты
    10: { time: 28800, slot1: { name: 'Дерево', count: 54 }, slot2: { name: 'Гвозди', count: 16 } },
    11: {
      time: 36000,
      slot1: { name: 'Дерево', count: 66 },
      slot2: { name: 'Изолента', count: 20 },
    }, // Слот 2: Пластмасса заменена на Изолента
    12: {
      time: 43200,
      slot1: { name: 'Дерево', count: 78 },
      slot2: { name: 'Инструмнты', count: 23 },
    }, // Слот 2: Изолента заменен на Инструмнты
    13: { time: 57600, slot1: { name: 'Дерево', count: 91 }, slot2: { name: 'Гвозди', count: 27 } },
    14: {
      time: 72000,
      slot1: { name: 'Дерево', count: 106 },
      slot2: { name: 'Изолента', count: 32 },
    }, // Слот 2: Пластмасса заменена на Изолента
    15: {
      time: 86400,
      slot1: { name: 'Дерево', count: 122 },
      slot2: { name: 'Инструмнты', count: 37 },
    }, // Слот 2: Изолента заменен на Инструмнты
    16: {
      time: 108000,
      slot1: { name: 'Дерево', count: 139 },
      slot2: { name: 'Гвозди', count: 42 },
    },
    17: {
      time: 129600,
      slot1: { name: 'Дерево', count: 158 },
      slot2: { name: 'Изолента', count: 47 },
    }, // Слот 2: Пластмасса заменена на Изолента
    18: {
      time: 172800,
      slot1: { name: 'Дерево', count: 178 },
      slot2: { name: 'Инструмнты', count: 54 },
    }, // Слот 2: Изолента заменен на Инструмнты
    19: {
      time: 345600,
      slot1: { name: 'Дерево', count: 199 },
      slot2: { name: 'Гвозди', count: 60 },
    },
    20: {
      time: 604800,
      slot1: { name: 'Дерево', count: 222 },
      slot2: { name: 'Изолента', count: 66 },
    }, // Слот 2: Пластмасса заменена на Изолента
    21: {
      time: 864000,
      slot1: { name: 'Дерево', count: 246 },
      slot2: { name: 'Инструмнты', count: 74 },
    }, // Слот 2: Изолента заменен на Инструмнты
    22: {
      time: 1036800,
      slot1: { name: 'Дерево', count: 271 },
      slot2: { name: 'Гвозди', count: 82 },
    },
    23: {
      time: 1209600,
      slot1: { name: 'Дерево', count: 298 },
      slot2: { name: 'Изолента', count: 90 },
    }, // Слот 2: Пластмасса заменена на Изолента
    24: {
      time: 1468800,
      slot1: { name: 'Дерево', count: 326 },
      slot2: { name: 'Инструмнты', count: 98 },
    }, // Слот 2: Изолента заменен на Инструмнты
    25: {
      time: 1728000,
      slot1: { name: 'Дерево', count: 356 },
      slot2: { name: 'Гвозди', count: 107 },
    },
    26: {
      time: 2592000,
      slot1: { name: 'Дерево', count: 388 },
      slot2: { name: 'Изолента', count: 116 },
    }, // Слот 2: Пластмасса заменена на Изолента
    27: {
      time: 3456000,
      slot1: { name: 'Дерево', count: 400 },
      slot2: { name: 'Инструмнты', count: 120 },
    },
    28: {
      time: 4320000,
      slot1: { name: 'Дерево', count: 400 },
      slot2: { name: 'Гвозди', count: 120 },
    }, // Слот 2: Инструмнты заменен на Гвозди
    29: {
      time: 6048000,
      slot1: { name: 'Дерево', count: 400 },
      slot2: { name: 'Изолента', count: 120 },
    }, // Слот 2: Пластмасса заменена на Изолента
    30: {
      time: 7776000,
      slot1: { name: 'Дерево', count: 400 },
      slot2: { name: 'Инструмнты', count: 120 },
    }, // Слот 2: Изолента заменен на Инструмнты
  },
  // -----------------------------------------------------
  // Склад (Storage) - Базовый: Железо. Вторичный: Гвозди, Инструмнты, Изолента
  // -----------------------------------------------------
  Склад: {
    2: { time: 60, slot1: { name: 'Железо', count: 2 }, slot2: { name: 'Гвозди', count: 1 } }, // Слот 2: Дерево заменено на Гвозди
    3: { time: 600, slot1: { name: 'Железо', count: 6 }, slot2: { name: 'Инструмнты', count: 2 } }, // Слот 2: Гвозди заменен на Инструмнты
    4: { time: 3600, slot1: { name: 'Железо', count: 10 }, slot2: { name: 'Изолента', count: 3 } },
    5: { time: 5400, slot1: { name: 'Железо', count: 14 }, slot2: { name: 'Гвозди', count: 4 } }, // Слот 2: Дерево заменено на Гвозди
    6: {
      time: 7200,
      slot1: { name: 'Железо', count: 21 },
      slot2: { name: 'Инструмнты', count: 6 },
    }, // Слот 2: Гвозди заменен на Инструмнты
    7: { time: 10800, slot1: { name: 'Железо', count: 28 }, slot2: { name: 'Изолента', count: 9 } },
    8: { time: 14400, slot1: { name: 'Железо', count: 36 }, slot2: { name: 'Гвозди', count: 11 } }, // Слот 2: Дерево заменено на Гвозди
    9: {
      time: 21600,
      slot1: { name: 'Железо', count: 45 },
      slot2: { name: 'Инструмнты', count: 14 },
    }, // Слот 2: Гвозди заменен на Инструмнты
    10: {
      time: 28800,
      slot1: { name: 'Железо', count: 54 },
      slot2: { name: 'Изолента', count: 16 },
    },
    11: { time: 36000, slot1: { name: 'Железо', count: 66 }, slot2: { name: 'Гвозди', count: 20 } }, // Слот 2: Дерево заменено на Гвозди
    12: {
      time: 43200,
      slot1: { name: 'Железо', count: 78 },
      slot2: { name: 'Инструмнты', count: 23 },
    }, // Слот 2: Гвозди заменен на Инструмнты
    13: {
      time: 57600,
      slot1: { name: 'Железо', count: 91 },
      slot2: { name: 'Изолента', count: 27 },
    },
    14: {
      time: 72000,
      slot1: { name: 'Железо', count: 106 },
      slot2: { name: 'Гвозди', count: 32 },
    }, // Слот 2: Дерево заменено на Гвозди
    15: {
      time: 86400,
      slot1: { name: 'Железо', count: 122 },
      slot2: { name: 'Инструмнты', count: 37 },
    }, // Слот 2: Гвозди заменен на Инструмнты
    16: {
      time: 108000,
      slot1: { name: 'Железо', count: 139 },
      slot2: { name: 'Изолента', count: 42 },
    },
    17: {
      time: 129600,
      slot1: { name: 'Железо', count: 158 },
      slot2: { name: 'Гвозди', count: 47 },
    }, // Слот 2: Дерево заменено на Гвозди
    18: {
      time: 172800,
      slot1: { name: 'Железо', count: 178 },
      slot2: { name: 'Инструмнты', count: 54 },
    }, // Слот 2: Гвозди заменен на Инструмнты
    19: {
      time: 345600,
      slot1: { name: 'Железо', count: 199 },
      slot2: { name: 'Изолента', count: 60 },
    },
    20: {
      time: 604800,
      slot1: { name: 'Железо', count: 222 },
      slot2: { name: 'Гвозди', count: 66 },
    }, // Слот 2: Дерево заменено на Гвозди
    21: {
      time: 864000,
      slot1: { name: 'Железо', count: 246 },
      slot2: { name: 'Инструмнты', count: 74 },
    }, // Слот 2: Гвозди заменен на Инструмнты
    22: {
      time: 1036800,
      slot1: { name: 'Железо', count: 271 },
      slot2: { name: 'Изолента', count: 82 },
    },
    23: {
      time: 1209600,
      slot1: { name: 'Железо', count: 298 },
      slot2: { name: 'Гвозди', count: 90 },
    }, // Слот 2: Дерево заменено на Гвозди
    24: {
      time: 1468800,
      slot1: { name: 'Железо', count: 326 },
      slot2: { name: 'Инструмнты', count: 98 },
    }, // Слот 2: Гвозди заменен на Инструмнты
    25: {
      time: 1728000,
      slot1: { name: 'Железо', count: 356 },
      slot2: { name: 'Изолента', count: 107 },
    },
    26: {
      time: 2592000,
      slot1: { name: 'Железо', count: 388 },
      slot2: { name: 'Гвозди', count: 116 },
    }, // Слот 2: Дерево заменено на Гвозди
    27: {
      time: 3456000,
      slot1: { name: 'Железо', count: 400 },
      slot2: { name: 'Инструмнты', count: 120 },
    },
    28: {
      time: 4320000,
      slot1: { name: 'Железо', count: 400 },
      slot2: { name: 'Изолента', count: 120 },
    }, // Слот 2: Инструмнты заменен на Изолента
    29: {
      time: 6048000,
      slot1: { name: 'Железо', count: 400 },
      slot2: { name: 'Гвозди', count: 120 },
    }, // Слот 2: Дерево заменено на Гвозди
    30: {
      time: 7776000,
      slot1: { name: 'Железо', count: 400 },
      slot2: { name: 'Инструмнты', count: 120 },
    }, // Слот 2: Гвозди заменен на Инструмнты
  },
  // -----------------------------------------------------
  // Вышка (Watchtower) - Базовый: Дерево. Вторичный: Гвозди, Инструмнты, Изолента
  // -----------------------------------------------------
  Вышка: {
    2: { time: 60, slot1: { name: 'Дерево', count: 2 }, slot2: { name: 'Гвозди', count: 1 } },
    3: { time: 600, slot1: { name: 'Дерево', count: 6 }, slot2: { name: 'Инструмнты', count: 2 } }, // Слот 2: Железо заменено на Инструмнты
    4: { time: 3600, slot1: { name: 'Дерево', count: 10 }, slot2: { name: 'Изолента', count: 3 } },
    5: { time: 5400, slot1: { name: 'Дерево', count: 14 }, slot2: { name: 'Гвозди', count: 4 } },
    6: {
      time: 7200,
      slot1: { name: 'Дерево', count: 21 },
      slot2: { name: 'Инструмнты', count: 6 },
    }, // Слот 2: Железо заменено на Инструмнты
    7: { time: 10800, slot1: { name: 'Дерево', count: 28 }, slot2: { name: 'Изолента', count: 9 } },
    8: { time: 14400, slot1: { name: 'Дерево', count: 36 }, slot2: { name: 'Гвозди', count: 11 } },
    9: {
      time: 21600,
      slot1: { name: 'Дерево', count: 45 },
      slot2: { name: 'Инструмнты', count: 14 },
    }, // Слот 2: Железо заменено на Инструмнты
    10: {
      time: 28800,
      slot1: { name: 'Дерево', count: 54 },
      slot2: { name: 'Изолента', count: 16 },
    },
    11: { time: 36000, slot1: { name: 'Дерево', count: 66 }, slot2: { name: 'Гвозди', count: 20 } },
    12: {
      time: 43200,
      slot1: { name: 'Дерево', count: 78 },
      slot2: { name: 'Инструмнты', count: 23 },
    }, // Слот 2: Железо заменено на Инструмнты
    13: {
      time: 57600,
      slot1: { name: 'Дерево', count: 91 },
      slot2: { name: 'Изолента', count: 27 },
    },
    14: {
      time: 72000,
      slot1: { name: 'Дерево', count: 106 },
      slot2: { name: 'Гвозди', count: 32 },
    },
    15: {
      time: 86400,
      slot1: { name: 'Дерево', count: 122 },
      slot2: { name: 'Инструмнты', count: 37 },
    }, // Слот 2: Железо заменено на Инструмнты
    16: {
      time: 108000,
      slot1: { name: 'Дерево', count: 139 },
      slot2: { name: 'Изолента', count: 42 },
    },
    17: {
      time: 129600,
      slot1: { name: 'Дерево', count: 158 },
      slot2: { name: 'Гвозди', count: 47 },
    },
    18: {
      time: 172800,
      slot1: { name: 'Дерево', count: 178 },
      slot2: { name: 'Инструмнты', count: 54 },
    }, // Слот 2: Железо заменено на Инструмнты
    19: {
      time: 345600,
      slot1: { name: 'Дерево', count: 199 },
      slot2: { name: 'Изолента', count: 60 },
    },
    20: {
      time: 604800,
      slot1: { name: 'Дерево', count: 222 },
      slot2: { name: 'Гвозди', count: 66 },
    },
    21: {
      time: 864000,
      slot1: { name: 'Дерево', count: 246 },
      slot2: { name: 'Инструмнты', count: 74 },
    }, // Слот 2: Железо заменено на Инструмнты
    22: {
      time: 1036800,
      slot1: { name: 'Дерево', count: 271 },
      slot2: { name: 'Изолента', count: 82 },
    },
    23: {
      time: 1209600,
      slot1: { name: 'Дерево', count: 298 },
      slot2: { name: 'Гвозди', count: 90 },
    },
    24: {
      time: 1468800,
      slot1: { name: 'Дерево', count: 326 },
      slot2: { name: 'Инструмнты', count: 98 },
    }, // Слот 2: Железо заменено на Инструмнты
    25: {
      time: 1728000,
      slot1: { name: 'Дерево', count: 356 },
      slot2: { name: 'Изолента', count: 107 },
    },
    26: {
      time: 2592000,
      slot1: { name: 'Дерево', count: 388 },
      slot2: { name: 'Гвозди', count: 116 },
    },
    27: {
      time: 3456000,
      slot1: { name: 'Дерево', count: 400 },
      slot2: { name: 'Инструмнты', count: 120 },
    }, // Слот 2: Железо заменено на Инструмнты
    28: {
      time: 4320000,
      slot1: { name: 'Дерево', count: 400 },
      slot2: { name: 'Изолента', count: 120 },
    },
    29: {
      time: 6048000,
      slot1: { name: 'Дерево', count: 400 },
      slot2: { name: 'Гвозди', count: 120 },
    },
    30: {
      time: 7776000,
      slot1: { name: 'Дерево', count: 400 },
      slot2: { name: 'Инструмнты', count: 120 },
    }, // Слот 2: Железо заменено на Инструмнты
  },
};
const BASE_BONUSES = {
  Медицина: {
    title: 'Медицинские расходники',
    consumables: [
      {
        id: 1,
        name: 'Бинт из тряпки',
        image: a6Icon,
        requiredLevel: 1, // Ур. 1
        effect: { type: 'regen', value: 1, duration: 3 },
        cooldown: 10,
        description: 'Мгновенно активирует регенерацию +1 на 3 секунды.',
      },
      {
        id: 2,
        name: 'Малая аптечка',
        image: a6Icon, // Временно
        requiredLevel: 5, // Ур. 5
        effect: { type: 'health_burst', value: 1000, duration: 0 },
        cooldown: 30,
        description: 'Восстанавливает 1000 единиц здоровья.',
      },
      {
        id: 3,
        name: 'Стимулятор',
        image: a6Icon, // Временно
        requiredLevel: 10, // Ур. 10
        effect: { type: 'damage_buff', value: 0.1, duration: 15 },
        cooldown: 60,
        description: 'Повышает урон на 10% на 15 секунд.',
      },
      {
        id: 4,
        name: 'Тактическая аптечка',
        image: a6Icon, // Временно
        requiredLevel: 15, // Ур. 15
        effect: { type: 'health_burst', value: 3500, duration: 0 },
        cooldown: 45,
        description: 'Восстанавливает 3500 единиц здоровья.',
      },
      {
        id: 5,
        name: 'Военный набор медика',
        image: a5Icon,
        requiredLevel: 20, // Ур. 20
        effect: { type: 'regen_buff', value: 5, duration: 5 },
        cooldown: 90,
        description: 'Активирует мощную регенерацию +5 на 5 секунд.',
      },
    ],
  },
  Оружейная: {
    title: 'Боевые стимуляторы',
    consumables: [
      {
        id: 6,
        name: 'Слабый порох',
        image: a5Icon,
        requiredLevel: 1, // Ур. 1
        effect: { type: 'damage_buff', value: 0.05, duration: 15 },
        cooldown: 30,
        description: 'Повышает урон на 5% на 15 секунд.',
      },
      {
        id: 7,
        name: 'Ускоритель затвора',
        image: a5Icon,
        requiredLevel: 5, // Ур. 5
        effect: { type: 'damage_buff', value: 0.1, duration: 15 },
        cooldown: 45,
        description: 'Повышает урон на 10% на 15 секунд.',
      },
      {
        id: 8,
        name: 'Энергетический патрон',
        image: a5Icon,
        requiredLevel: 10, // Ур. 10
        effect: { type: 'damage_buff', value: 0.15, duration: 20 },
        cooldown: 60,
        description: 'Повышает урон на 15% на 20 секунд.',
      },
      {
        id: 9,
        name: 'Тактический боезапас',
        image: a5Icon,
        requiredLevel: 15, // Ур. 15
        effect: { type: 'damage_buff', value: 0.2, duration: 20 },
        cooldown: 75,
        description: 'Повышает урон на 20% на 20 секунд.',
      },
      {
        id: 10,
        name: 'Протокольный усилитель',
        image: a5Icon,
        requiredLevel: 20, // Ур. 20
        effect: { type: 'damage_buff', value: 0.25, duration: 25 },
        cooldown: 90,
        description: 'Повышает урон на 25% на 25 секунд.',
      },
    ],
  },

  // 🔑 НОВАЯ ЗОНА: БРОНЯ (Броня)
  Броня: {
    title: 'Защитные средства',
    consumables: [
      {
        id: 11,
        name: 'Укрепляющий спрей',
        image: a6Icon,
        requiredLevel: 1, // Ур. 1
        effect: { type: 'armor_buff', value: 0.1, duration: 15 },
        cooldown: 30,
        description: 'Повышает броню на 10% на 15 секунд.',
      },
      {
        id: 12,
        name: 'Керамические пластины',
        image: a6Icon,
        requiredLevel: 5, // Ур. 5
        effect: { type: 'armor_buff', value: 0.15, duration: 15 },
        cooldown: 45,
        description: 'Повышает броню на 15% на 15 секунд.',
      },
      {
        id: 13,
        name: 'Композитное покрытие',
        image: a6Icon,
        requiredLevel: 10, // Ур. 10
        effect: { type: 'armor_buff', value: 0.2, duration: 20 },
        cooldown: 60,
        description: 'Повышает броню на 20% на 20 секунд.',
      },
      {
        id: 14,
        name: 'Реактивная защита',
        image: a6Icon,
        requiredLevel: 15, // Ур. 15
        effect: { type: 'armor_buff', value: 0.25, duration: 20 },
        cooldown: 75,
        description: 'Повышает броню на 25% на 20 секунд.',
      },
      {
        id: 15,
        name: 'Полевой генератор',
        image: a6Icon,
        requiredLevel: 20, // Ур. 20
        effect: { type: 'armor_buff', value: 0.3, duration: 25 },
        cooldown: 90,
        description: 'Повышает броню на 30% на 25 секунд.',
      },
    ],
  },
};

// 2. КОМПОНЕНТ: Слот для ресурсов прокачки
const UpgradeSlot = ({ slotName, resource, required, onDrop, onRemove }) => {
  const isReady = resource && resource.name === required.name && resource.count >= required.count;
  const displayImage = resource ? resource.image : required.image;
  return (
    <div
      onDrop={onDrop(slotName)}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => onRemove(slotName)} // Клик для снятия ресурса
      style={{
        width: '150px',
        height: '80px',
        border: `2px dashed ${isReady ? 'green' : 'red'}`,
        textAlign: 'center',
        padding: '5px',
        cursor: 'pointer',
        borderRadius: '5px',
      }}>
      {resource ? (
        // 🔑 Если ресурс вложен, показываем его
        <>
          {/* ДОБАВЛЯЕМ ИКОНКУ ВЛОЖЕННОГО РЕСУРСА */}
          {resource.image && (
            <img
              src={resource.image}
              alt={resource.name}
              style={{ width: '40px', height: '40px', marginRight: '5px' }}
            />
          )}
          <p style={{ margin: 0, fontWeight: 'bold' }}>{resource.name}</p>
          <p style={{ margin: 0 }}>Вложено: {resource.count}</p>
          <p style={{ margin: 0, color: isReady ? 'lightgreen' : 'red' }}>
            Требуется: {required.count}
          </p>
        </>
      ) : (
        <>
          {/* ДОБАВЛЯЕМ ИКОНКУ ТРЕБУЕМОГО РЕСУРСА */}
          {required.image && (
            <img
              src={required.image}
              alt={required.name}
              style={{ width: '40px', height: '40px', marginRight: '5px' }}
            />
          )}
          <p style={{ margin: 0, fontWeight: 'bold', color: 'gray' }}>Перетащите ресурс</p>
          <p style={{ margin: 0 }}>
            ({required.name} x{required.count})
          </p>
        </>
      )}
    </div>
  );
};

// BaseManagement.jsx (перед компонентом BaseManagement)

// 2. КОМПОНЕНТ: Слот для расходника
const ConsumableSlot = ({ consumable, currentLevel, cooldown, onClick }) => {
  // Разблокировка каждые 5 уровней, начиная с 1.
  // Пример: 1 ур. для первого слота, 5 ур. для второго, 10 для третьего и т.д.
  const isUnlocked = currentLevel >= consumable.requiredLevel;
  const isReady = cooldown === 0;

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14px',
    borderRadius: '4px',
  };

  return (
    <div
      onClick={() => isUnlocked && isReady && onClick(consumable)}
      title={
        isUnlocked ? consumable.description : `Разблокируется на Ур. ${consumable.requiredLevel}`
      }
      style={{
        width: '65px',
        height: '65px',
        margin: '5px',
        border: `2px solid ${isReady && isUnlocked ? 'gold' : isUnlocked ? 'gray' : 'darkred'}`,
        backgroundColor: isUnlocked ? '#222' : '#111',
        borderRadius: '4px',
        cursor: isUnlocked && isReady ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
      <img
        src={consumable.image}
        alt={consumable.name}
        style={{ width: '100%', height: '100%', opacity: isUnlocked ? 1 : 0.3 }}
      />

      {/* Оверлей блокировки */}
      {!isUnlocked && <div style={{ ...overlayStyle }}>Ур. {consumable.requiredLevel}</div>}

      {/* Оверлей кулдауна */}
      {isUnlocked && cooldown > 0 && (
        <div style={{ ...overlayStyle, backgroundColor: 'rgba(50, 0, 0, 0.8)' }}>{cooldown}с</div>
      )}
    </div>
  );
};

// 3. ОСНОВНОЙ КОМПОНЕНТ
const BaseManagement = ({
  basePoints,
  setBasePoints,
  inventory,
  setInventory,
  log,
  formatTime,
  baseModalOpen,
  closeBaseModal,
  selectedBasePoint,
  setSelectedBasePoint,
  upgradeResources,
  setUpgradeResources,
  DEFAULT_ICON,
  applyConsumableEffect,
  openZonesModal,
}) => {
  const consumableTimersRef = useRef({});
  const upgradeTimerRef = useRef(null);
  const [consumableCooldowns, setConsumableCooldowns] = useState({});

  // BaseManagement.jsx (внутри компонента BaseManagement)

  // Функция: Активация расходника
  const handleConsumableClick = (consumable) => {
    // Проверка на кулдаун (двойная проверка)
    if (consumableCooldowns[consumable.id] > 0) {
      log(`❌ ${consumable.name} на кулдауне. Осталось ${consumableCooldowns[consumable.id]}с.`);
      return;
    }

    log(`✨ Активирован: ${consumable.name}. Эффект: ${consumable.effect.type}.`);

    // 1. Применяем эффект (эта функция будет в App.jsx)
    applyConsumableEffect(consumable.effect);

    // 2. Устанавливаем кулдаун
    setConsumableCooldowns((prev) => ({
      ...prev,
      [consumable.id]: consumable.cooldown,
    }));

    // 3. Запускаем таймер кулдауна
    let currentCooldown = consumable.cooldown;
    const timer = setInterval(() => {
      currentCooldown -= 1;
      setConsumableCooldowns((prev) => ({
        ...prev,
        [consumable.id]: currentCooldown,
      }));

      if (currentCooldown <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    // Сохраняем ссылку на таймер для очистки при размонтировании
    consumableTimersRef.current[consumable.id] = timer;
  };

  // Переносим сюда ВСЕ ФУНКЦИИ ПРОКАЧКИ
  const completeUpgrade = (pointName) => {
    setBasePoints((prevPoints) =>
      prevPoints.map((p) => {
        if (p.name === pointName) {
          log(`✅ Зона "${p.name}" прокачана до Уровня ${p.level + 1}!`);
          return { ...p, level: p.level + 1, upgrading: false, timer: 0 };
        }
        return p;
      }),
    );
  };
  // 1. Функция: Открыть модальное окно прокачки
  const openUpgradeModal = (point) => {
    const nextLevel = point.level + 1;
    if (!UPGRADE_REQUIREMENTS[point.name] || !UPGRADE_REQUIREMENTS[point.name][nextLevel]) {
      log(`⭐ Зона "${point.name}" достигла максимального уровня (${point.level})!`);
      return;
    }
    if (point.upgrading) {
      log(`🚧 Зона "${point.name}" уже прокачивается! Осталось ${formatTime(point.timer)}.`);
      return;
    }
    // Проверяем, есть ли требования для следующего уровня

    setSelectedBasePoint(point);
    setUpgradeResources({ slot1: null, slot2: null }); // Сбрасываем ресурсы
  };

  // 2. Функция: Закрыть модальное окно прокачки
  const closeUpgradeModal = () => {
    setSelectedBasePoint(null);
    setUpgradeResources({ slot1: null, slot2: null });
  };
  const canStartUpgrade = (point, resources) => {
    if (!point) return false;
    const nextLevel = point.level + 1;
    const required = UPGRADE_REQUIREMENTS[point.name]
      ? UPGRADE_REQUIREMENTS[point.name][nextLevel]
      : null;
    if (!required) return false;

    const res1 = resources.slot1;
    const res2 = resources.slot2;

    const match1 = res1 && res1.name === required.slot1.name && res1.count >= required.slot1.count;
    const match2 = res2 && res2.name === required.slot2.name && res2.count >= required.slot2.count;

    return match1 && match2;
  };

  // Функция: Удалить ресурс из слота прокачки
  const handleResourceRemove = (slotName) => {
    const resource = upgradeResources[slotName];
    if (!resource) return;

    // Возвращаем ресурс в инвентарь
    setInventory((prev) => {
      const newInv = [...prev];
      // Находим существующий стак ресурса в инвентаре
      const existingStackIndex = newInv.findIndex(
        (i) => i.name === resource.name && i.slot.startsWith('ammo'),
      );

      if (existingStackIndex !== -1) {
        // Если стак существует, увеличиваем его счетчик
        newInv[existingStackIndex].count += resource.count;
      } else {
        // Если стака нет, добавляем новый элемент
        newInv.push({
          name: resource.name,
          slot: 'ammo', // Ресурсы имеют тип ammo
          rarity: 'over', // ⬅️ ДОБАВЛЕНО: Для универсальности
          type: 'resources',
          stats: {},
          image: DEFAULT_ICON,
          count: resource.count,
        });
      }
      return newInv;
    });

    // Очищаем слот
    setUpgradeResources((prev) => ({ ...prev, [slotName]: null }));
    log(`↩️ Возвращен ${resource.name} x${resource.count} в инвентарь.`);
  };

  // Функция: Обработка броска ресурса в слот прокачки
  const handleUpgradeDrop = (slotName) => (e) => {
    e.preventDefault();
    const droppedId = e.dataTransfer.getData('text/plain');
    const point = selectedBasePoint;
    const nextLevel = point.level + 1;
    const required = UPGRADE_REQUIREMENTS[point.name][nextLevel][slotName];

    // Проверяем, что слот пуст
    if (upgradeResources[slotName]) {
      log('❌ Слот уже занят. Сначала снимите ресурс.');
      return;
    }

    // Ищем предмет в инвентаре (стаки)
    const itemIndex = inventory.findIndex((i) => String(i.id) === droppedId);

    if (itemIndex === -1) {
      log('❌ Предмет не найден в инвентаре по ID.');
      return;
    }

    const item = inventory[itemIndex];

    // 🛑 ШАГ 2: Проверяем, что это ресурс 'over' (поскольку мы теперь ищем по ID,
    // нужно добавить проверку на тип, чтобы не бросить оружие)
    const isResource =
      item.rarity === 'over' || item.slot?.startsWith('ammo') || item.type === 'resources';

    if (!isResource) {
      log('❌ Вы можете использовать для прокачки только ресурсы.');
      return;
    }

    // Проверка на соответствие ресурсу (теперь item.name - это "Железо")
    if (item.name !== required.name) {
      log(`❌ Для этого слота требуется: ${required.name}.`);
      return;
    }

    // Проверка на соответствие ресурсу
    if (item.name !== required.name) {
      log(`❌ Для этого слота требуется: ${required.name}.`);
      return;
    }

    // Проверка на количество
    if (item.count < required.count) {
      log(`❌ Недостаточно ${item.name}. Требуется x${required.count}, у вас x${item.count}.`);
      return;
    }

    // Если все проверки пройдены:

    // 1. Устанавливаем ресурс в слот
    setUpgradeResources((prev) => ({
      ...prev,
      [slotName]: { name: item.name, count: required.count, image: item.image }, // Занимаем только требуемое количество
    }));

    // 2. Визуально удаляем требуемое количество из инвентаря
    setInventory((prev) => {
      const newInv = [...prev];
      const remainingCount = item.count - required.count;

      if (remainingCount > 0) {
        newInv[itemIndex] = { ...item, count: remainingCount };
      } else {
        newInv.splice(itemIndex, 1);
      }
      log(`➡️ ${item.name} x${required.count} добавлен в слот.`);
      return newInv;
    });
  };

  const startUpgrade = () => {
    // 1. Получаем данные о текущей выбранной точке и требованиях
    const point = selectedBasePoint;
    const nextLevel = point.level + 1;
    const required = UPGRADE_REQUIREMENTS[point.name][nextLevel];

    // Проверка наличия требований для следующего уровня (для двойной безопасности)
    if (!required) {
      log(`❌ Не удалось найти требования для Уровня ${nextLevel}.`);
      return;
    }

    // 2. Получаем ресурсы, которые находятся в слотах модального окна прокачки
    const res1 = upgradeResources.slot1;
    const res2 = upgradeResources.slot2;

    // 3. Проверка соответствия ресурсов требованиям
    if (!res1 || res1.name !== required.slot1.name || res1.count < required.slot1.count) {
      log(`❌ Не хватает ${required.slot1.name} в первом слоте.`);
      return;
    }
    if (!res2 || res2.name !== required.slot2.name || res2.count < required.slot2.count) {
      log(`❌ Не хватает ${required.slot2.name} во втором слоте.`);
      return;
    }

    // 4. Логика снятия ресурсов из инвентаря (функция removeResource остается прежней,
    // она должна быть определена ранее в вашем коде)
    const removeResource = (resource) => {
      setInventory((prev) => {
        const newInv = [...prev];
        // Логика поиска и уменьшения счетчика/удаления стака ресурса
        const index = newInv.findIndex(
          (i) => i.name === resource.name && i.slot.startsWith('ammo'),
        );
        if (index !== -1) {
          if (newInv[index].count > resource.count) {
            newInv[index] = { ...newInv[index], count: newInv[index].count - resource.count };
          } else {
            newInv.splice(index, 1);
          }
        }
        return newInv;
      });
    };

    removeResource(required.slot1);
    removeResource(required.slot2);

    // 5. Обновляем состояние **конкретной точки** в массиве basePoints
    setBasePoints((prevPoints) =>
      prevPoints.map((p) =>
        p.name === point.name
          ? {
              ...p,
              upgrading: true, // Устанавливаем флаг прокачки
              timer: required.time, // Устанавливаем начальное время таймера
            }
          : p,
      ),
    );

    // ❌ УДАЛЕНЫ: setIsUpgrading(true); и setUpgradeTimer(required.time);
    // Теперь таймер и флаг контролируются только через basePoints.

    // 6. Закрываем модальное окно и логируем событие
    closeUpgradeModal();
    log(`🚀 Начата прокачка "${point.name}" до Ур. ${nextLevel}. Время: ${required.time} сек.`);
  };

  useEffect(() => {
    // Находим точку, которая в данный момент прокачивается
    const upgradingPoint = basePoints.find((p) => p.upgrading && p.timer > 0);

    // Проверка, есть ли активная прокачка
    if (upgradingPoint) {
      // Устанавливаем интервал
      upgradeTimerRef.current = setInterval(() => {
        setBasePoints((prevPoints) =>
          prevPoints.map((p) => {
            // Идентифицируем точку и уменьшаем ее таймер
            if (p.name === upgradingPoint.name && p.timer > 0) {
              const newTimer = p.timer - 1;

              // Если таймер достиг 0, завершаем прокачку
              if (newTimer <= 0) {
                clearInterval(upgradeTimerRef.current);
                completeUpgrade(p.name); // Вызываем функцию завершения
                return { ...p, upgrading: false, timer: 0 }; // Возвращаем завершенное состояние
              }

              // Иначе просто уменьшаем время
              return { ...p, timer: newTimer };
            }
            return p;
          }),
        );
      }, 1000);
    } else {
      // Если нет активной точки, убеждаемся, что интервал остановлен
      if (upgradeTimerRef.current) clearInterval(upgradeTimerRef.current);
    }

    // Очистка при размонтировании или изменении зависимостей
    return () => {
      if (upgradeTimerRef.current) clearInterval(upgradeTimerRef.current);
    };
  }, [basePoints]); // ⬅️ Теперь зависимость от basePoints

  // 4. Разметка (JSX)
  return (
    <>
      {/* 🔑 МОДАЛЬНОЕ ОКНО БАЗЫ */}
      {baseModalOpen && (
        <div
          id="baseModal"
          className="modal open"
          style={{
            backgroundImage: `url(${bazaImg})`, // ⬅️ Ваша картинка базы
            backgroundSize: '100%',
            backgroundRepeat: 'no-repeat',
            zIndex: 1001, // Выше, чем zonesModal
            width: '700px',
            height: '700px',
            top: '48.5%',
            left: '64%',
            transform: 'translate(-50%, -50%)',
            position: 'fixed',
            padding: '20px',
          }}>
          {/* Кнопка закрытия */}
          <div className="close-btn2" onClick={closeBaseModal}>
            ✖
          </div>
          {/* ⏪ КНОПКА НАЗАД */}
          <div
            onClick={openZonesModal} // ⬅️ Вызываем функцию для возврата
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              padding: '5px 10px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'gold',
              border: '1px solid gold',
              borderRadius: '4px',
              cursor: 'pointer',
              zIndex: 1002, // Поверх других элементов карты
              userSelect: 'none',
              fontWeight: 'bold',
            }}>
            {'<'} Назад (Карта) 🗺️
          </div>
          {basePoints.map((point, idx) => (
            <div
              key={idx}
              className={`base-point ${point.className} ${point.upgrading ? 'upgrading' : ''}`}
              onClick={() => openUpgradeModal(point)} // ⬅️ Открываем модалку прокачки
            >
              {point.name} (Ур. {point.level})
              {point.upgrading && (
                <div className="upgrade-timer-display">⏳ {formatTime(point.timer)}</div>
              )}
            </div>
          ))}

          {/*  */}
        </div>
      )}

      {/* 🔑 МОДАЛЬНОЕ ОКНО ПРОКАЧКИ */}
      {selectedBasePoint && (
        <div
          id="basePointOptionsModal"
          className="modal open"
          style={{
            zIndex: 1003,
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '450px',
            minHeight: '600px', // Увеличиваем высоту для нового функционала
            backgroundColor: '#333',
            border: '2px solid gold',
            borderRadius: '8px',
            padding: '15px',
            color: 'white',
          }}>
          <div className="close-btn" onClick={closeUpgradeModal}>
            ✖
          </div>

          <h3>
            {selectedBasePoint.name} (Ур. {selectedBasePoint.level})
          </h3>
          <hr />

          {/* 1. БЛОК ПРОКАЧКИ */}
          {UPGRADE_REQUIREMENTS[selectedBasePoint.name]?.[selectedBasePoint.level + 1] && (
            // ... (ВЕСЬ ВАШ СТАВШИЙ БЛОК ПРОКАЧКИ UpgradeSlot остается здесь) ...
            <div
              style={{
                padding: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                marginBottom: '15px',
                border: '1px solid #444',
                borderRadius: '4px',
              }}>
              <h4>Прокачка ➡️ Ур. {selectedBasePoint.level + 1}</h4>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginBottom: '15px',
                }}>
                {/* Слот 1 */}
                <UpgradeSlot
                  slotName="slot1"
                  resource={upgradeResources.slot1}
                  required={
                    UPGRADE_REQUIREMENTS[selectedBasePoint.name][selectedBasePoint.level + 1].slot1
                  }
                  onDrop={handleUpgradeDrop}
                  onRemove={handleResourceRemove}
                />

                {/* Слот 2 */}
                <UpgradeSlot
                  slotName="slot2"
                  resource={upgradeResources.slot2}
                  required={
                    UPGRADE_REQUIREMENTS[selectedBasePoint.name][selectedBasePoint.level + 1].slot2
                  }
                  onDrop={handleUpgradeDrop}
                  onRemove={handleResourceRemove}
                />
              </div>
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={startUpgrade}
                  disabled={!canStartUpgrade(selectedBasePoint, upgradeResources)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: 'darkgreen',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                  }}>
                  Начать прокачку (
                  {formatTime(
                    UPGRADE_REQUIREMENTS[selectedBasePoint.name][selectedBasePoint.level + 1].time,
                  )}
                  )
                </button>
              </div>
            </div>
          )}

          {/* Если нет следующего уровня */}
          {!UPGRADE_REQUIREMENTS[selectedBasePoint.name]?.[selectedBasePoint.level + 1] && (
            <p style={{ textAlign: 'center', color: 'gold' }}>
              ⭐ Зона достигла максимального уровня!
            </p>
          )}

          <hr />

          {/* 2. НОВЫЙ БЛОК ФУНКЦИОНАЛА (Расхoдники) */}
          {BASE_BONUSES[selectedBasePoint.name] && (
            <div>
              {/* 🔑 Условный заголовок: */}
              <h4>⚡ Функционал: {BASE_BONUSES[selectedBasePoint.name].title}</h4>

              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {BASE_BONUSES[selectedBasePoint.name].consumables.map((c) => (
                  <ConsumableSlot
                    key={c.id}
                    consumable={c}
                    currentLevel={selectedBasePoint.level}
                    cooldown={consumableCooldowns[c.id] || 0}
                    onClick={handleConsumableClick}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BaseManagement;
