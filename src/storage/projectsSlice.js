import { createSlice } from '@reduxjs/toolkit';
import { createEntityAdapter } from '@reduxjs/toolkit';

const demoProjects = [
  {
    id: 1,
    parent_project_id: null,
    name: 'MimiTrack',
    text: `# MimiTrack\n\n**MimiTrack** — внутренний трекер задач и заявок.\n\n## Основные возможности\n- Заявки от клиентов\n- Отслеживание изменений\n- Таймлайн событий\n- Поддержка Markdown`,
    visible_rule: 0,
    project_link: '/projects/mimitrack',
    current_version: '0.0.11',
    sort_order: 1,
    public_access_key: null,
    deleted: 0
  },
  {
    id: 2,
    parent_project_id: null,
    name: 'ERP System',
    text: `# ERP System\n\n**ERP System** — корпоративная система управления ресурсами.\n\n## Модули\n- Финансы\n- Склад\n- Кадры\n- Проекты\n\n> Интеграция с MimiTrack для управления задачами.`,
    visible_rule: 0,
    project_link: '/projects/erp',
    current_version: '1.2.4',
    sort_order: 2,
    public_access_key: 'a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8',
    deleted: 0
  },
  {
    id: 3,
    parent_project_id: 2,
    name: 'ERP: HR',
    text: `# ERP: HR\n\nПодсистема управления кадрами.\n\n## Фичи\n- Учёт сотрудников\n- Отпуска\n- Оклады\n- Оценка эффективности`,
    visible_rule: 0,
    project_link: '/projects/erp/hr',
    current_version: '0.3.0',
    sort_order: 0,
    public_access_key: null,
    deleted: 0
  },
  {
    id: 4,
    parent_project_id: 2,
    name: 'ERP: Accounting',
    text: `# ERP: Accounting\n\nФинансовый модуль системы ERP.\n\n## Возможности\n- Учёт доходов/расходов\n- Отчёты\n- Интеграция с банками\n- Автоматизация проводок`,
    visible_rule: 0,
    project_link: '/projects/erp/accounting',
    current_version: '0.2.1',
    sort_order: 1,
    public_access_key: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7',
    deleted: 0
  },
  {
    id: 5,
    parent_project_id: null,
    name: 'Internal Tools',
    text: `# Internal Tools\n\nВнутренние инструменты компании.\n\n## Список:\n- MimiTrack\n- DevLogger\n- CodeReviewBot\n- CI/CD Pipeline`,
    visible_rule: 0,
    project_link: '/projects/internal-tools',
    current_version: '1.0.0',
    sort_order: 3,
    public_access_key: null,
    deleted: 0
  }
];



const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    list: demoProjects,
    loading: false,
    error: null
  },
  reducers: {
    fetchProjectsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProjectsSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchProjectsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addProject: (state, action) => {
      state.list.push(action.payload);
    },
    updateProject: (state, action) => {
      const index = state.list.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload.changes };
      }
    },
    deleteProject: (state, action) => {
      state.list = state.list.filter(p => p.id !== action.payload);
    }
  }
});

export const {
  fetchProjectsStart,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  addProject,
  updateProject,
  deleteProject
} = projectsSlice.actions;

export default projectsSlice.reducer;

