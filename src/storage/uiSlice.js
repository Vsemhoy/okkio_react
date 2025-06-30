import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Текущий проект
  currentProject: {
    id: 0,
    name: 'No projects'
  },

  // Состояние страниц
  pages: {
    treePage: {
      viewportMode: 'tree', // or editor
      activeNode: 'root',
      activeTab: 'tasks',
      expandedNodes: [],
      tabbedNodes: [],
      filters: {
        status: 'all',
        priority: 'all',
      }
    },
    kanbanPage: {
      viewportMode: 'kanban',
      targetClaim: null,
      visibleTabs: [3, 5, 6, 9],
      activeNode: 'root',
      activeTab: 'tasks',
    },
    flowPage: {
      filters: {
        status: 'all',
        priority: 'all',
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
      },
    },
    settingsPage: {
      currentTab: 0,
    },
    projectsPage: {
      filters: {
        status: 'all',
        priority: 'all',
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
      },
    },
    resourcePage: {
      viewportMode: 'tree',
      activeNode: 'root',
      activeTab: 'tasks',
      filters: {
        status: 'all',
        priority: 'all',
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
      },
    },
    documentPage: {
      viewportMode: 'tree',
      activeNode: 'root',
      activeTab: 'tasks',
      filters: {
        status: 'all',
        priority: 'all',
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
      },
    },
  },

  // Стеки для сохранения состояния
  pageStacks: {
    treePage: [], // [{ projectId: 1, state: { ... } }]
    kanbanPage: [], // [{ projectId: 1, state: { ... } }]
  }
};


const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Установка текущего проекта
    setCurrentProject: (state, action) => {
      // Сохраняем текущее состояние страницы, если это не первый проект
      const { id: prevProjectId } = state.currentProject;
      const { treePage, kanbanPage } = state.pages;

      if (prevProjectId && prevProjectId !== action.payload.id) {
        // Сохраняем состояние в стеки
        state.pageStacks.treePage.push({
          projectId: prevProjectId,
          state: { ...treePage }
        });
        state.pageStacks.kanbanPage.push({
          projectId: prevProjectId,
          state: { ...kanbanPage }
        });
      }

      // Обновляем текущий проект
      state.currentProject = action.payload;

      // Ищем сохраненное состояние для нового проекта
      const { id: newProjectId } = action.payload;
      const treeState = state.pageStacks.treePage.find(p => p.projectId === newProjectId)?.state;
      const kanbanState = state.pageStacks.kanbanPage.find(p => p.projectId === newProjectId)?.state;

      // Восстанавливаем состояние, если оно есть
      if (treeState) {
        state.pages.treePage = { ...state.pages.treePage, ...treeState };
      } else {
        // Сброс до дефолта
        state.pages.treePage = initialState.pages.treePage;
      }

      if (kanbanState) {
        state.pages.kanbanPage = { ...state.pages.kanbanPage, ...kanbanState };
      } else {
        state.pages.kanbanPage = initialState.pages.kanbanPage;
      }
    },

    // Обновление состояния treePage
    updateTreePageState: (state, action) => {
      state.pages.treePage = {
        ...state.pages.treePage,
        ...action.payload
      };
    },

    // Обновление состояния kanbanPage
    updateKanbanPageState: (state, action) => {
      state.pages.kanbanPage = {
        ...state.pages.kanbanPage,
        ...action.payload
      };
    },

    // Обновление фильтров для любой страницы
    updatePageFilters: (state, action) => {
      const { page, filters } = action.payload;
      state.pages[page].filters = {
        ...state.pages[page].filters,
        ...filters
      };
    },

    // Обновление пагинации для любой страницы
    updatePagePagination: (state, action) => {
      const { page, pagination } = action.payload;
      state.pages[page].pagination = {
        ...state.pages[page].pagination,
        ...pagination
      };
    },

    // Установка activeTab для любой страницы
    setPageActiveTab: (state, action) => {
      const { page, tab } = action.payload;
      state.pages[page].activeTab = tab;
    },

    // Раскрытие/сворачивание узлов в дереве
    toggleExpandedNode: (state, action) => {
      const nodeId = action.payload;
      const index = state.pages.treePage.expandedNodes.indexOf(nodeId);
      if (index > -1) {
        state.pages.treePage.expandedNodes = state.pages.treePage.expandedNodes.filter(id => id !== nodeId);
      } else {
        state.pages.treePage.expandedNodes = [...state.pages.treePage.expandedNodes, nodeId];
      }
    }
  }
});

export const { setCurrentProject } = uiSlice.actions;

export default uiSlice.reducer;
