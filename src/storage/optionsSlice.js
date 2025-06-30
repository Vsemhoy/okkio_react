import { createSlice } from '@reduxjs/toolkit';

// =============================
// Константы
// =============================

const PRIORITIES = [
  {
    id: 1,
    name: 'нет', // Краткое имя (например, для API)
    title: 'без приоритета', // Полное название (для UI)
    icon: '💤',    // Иконка (например, эмодзи или SVG)
    color: '#8c8c8c' // Серый
  },
  {
    id: 2,
    name: 'не срочн',
    title: 'не срочно',
    icon: '💭',
    color: '#595959' // Темно-серый
  },
  {
    id: 3,
    name: 'очередь',
    title: 'выполнить в порядке очереди',
    icon: '⌚',
    color: '#1890ff' // Синий
  },
  {
    id: 4,
    name: 'высокий',
    title: 'высокий приоритет',
    icon: '💣',
    color: '#faad14' // Оранжевый
  },
  {
    id: 5,
    name: 'ультра',
    title: 'наивысший приоритет',
    icon: '🚨',
    color: '#ff4d4f' // Красный
  }
];

const STATUSES = [
  {
    id: 1,
    name: 'Создаётся',
    title: 'Создаётся', // Дублируется, если нужно позже разнести
    icon: '',
    color: '',
    sort_order: 0,
    is_for_task: 1,
    is_for_request: 1,
    hidden: 0
  },
  {
    id: 2,
    name: 'Отправлена',
    title: 'Отправлена',
    icon: '',
    color: '',
    sort_order: 0,
    is_for_task: 0,
    is_for_request: 1,
    hidden: 0
  },
  {
    id: 3,
    name: 'В очереди',
    title: 'В очереди',
    icon: '',
    color: '',
    sort_order: 0,
    is_for_task: 1,
    is_for_request: 1,
    hidden: 0
  },
  {
    id: 4,
    name: 'Рассматривается',
    title: 'Рассматривается',
    icon: '',
    color: '',
    sort_order: 0,
    is_for_task: 0,
    is_for_request: 1,
    hidden: 0
  },
  {
    id: 5,
    name: 'В работе',
    title: 'В работе',
    icon: '',
    color: '',
    sort_order: 0,
    is_for_task: 1,
    is_for_request: 1,
    hidden: 0
  },
  {
    id: 6,
    name: 'Тестирование',
    title: 'Тестирование',
    icon: '',
    color: '',
    sort_order: 0,
    is_for_task: 1,
    is_for_request: 1,
    hidden: 0
  },
  {
    id: 7,
    name: 'Не актуально',
    title: 'Не актуально',
    icon: '',
    color: '',
    sort_order: 0,
    is_for_task: 1,
    is_for_request: 1,
    hidden: 0
  },
  {
    id: 8,
    name: 'Отклонено',
    title: 'Отклонено',
    icon: '',
    color: '',
    sort_order: 0,
    is_for_task: 1,
    is_for_request: 1,
    hidden: 0
  },
  {
    id: 9,
    name: 'Завершено',
    title: 'Завершено',
    icon: '',
    color: '',
    sort_order: 0,
    is_for_task: 1,
    is_for_request: 1,
    hidden: 0
  }
];

const VISIBLE_RULES = [
    {
        id: 0,
        title: 'Для всех'
    },
    {
        id: -1,
        title: 'Только разработчкикам'
    },
        {
        id: -2,
        title: 'Только создателю'
    },
    {
        id: -3,
        title: 'Только отдел создателя'
    },
        {
        id: -4,
        title: 'И подчиненным создателя'
    }
];

const CLAIM_TYPES = [
  {
    id: 1,
    name: 'Bug',
    text: 'found bug',
    icon: '',
    color: ''
  }
];

const DOCUMENT_TYPES = [
  {
    id: 1,
    name: 'Памятка',
    sort_order: 0,
    icon: '',
    color: ''
  }
];

const RESOURCE_TYPES = [
  {
    id: 1,
    name: 'Link',
    sort_order: 0,
    title: 'Внешняя ссылка',
    icon: '',
    color: ''
  }
];

// =============================
// Начальное состояние
// =============================
const initialState = {
  priorities: PRIORITIES,
  statuses: STATUSES,
  claimTypes: CLAIM_TYPES,
  documentTypes: DOCUMENT_TYPES,
  resourceTypes: RESOURCE_TYPES,
  visibleRules: VISIBLE_RULES,
};

// =============================
// Slice
// =============================
const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    // Обновление всех опций
    setOptions: (state, action) => ({
      ...state,
      ...action.payload
    }),

    // Обновление конкретных опций
    setPriorities: (state, action) => {
      state.priorities = action.payload;
    },
    setStatuses: (state, action) => {
      state.statuses = action.payload;
    },
    setClaimTypes: (state, action) => {
      state.claimTypes = action.payload;
    },
    setDocumentTypes: (state, action) => {
      state.documentTypes = action.payload;
    },
    setResourceTypes: (state, action) => {
      state.resourceTypes = action.payload;
    }
  }
});

// =============================
// Экспорт действий и редьюсера
// =============================
export const {
  setOptions,
  setPriorities,
  setStatuses,
  setClaimTypes,
  setDocumentTypes,
  setResourceTypes
} = optionsSlice.actions;

export default optionsSlice.reducer;