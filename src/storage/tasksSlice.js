import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const generateShortId = (length = 25) => {
  // Удаляем дефисы и обрезаем до 25 символов
  return uuidv4().replace(/-/g, '').substring(0, 25);
}

export const fetchProjectTree = createAsyncThunk(
  'tasks/fetchProjectTree',
  async (projectId, { getState }) => {
    console.log('ffetchProjectTreeirst', projectId)
    const state = getState();
    const cachedTree = state.tasks.projects[projectId]?.tree;

    if (cachedTree && cachedTree.length > 0) return cachedTree;

    const res = await fetch(`/api/tree?projectId=${projectId}`);
    const data = await res.json();
    console.log('data', data)
    return data.tree;
  }
);


const createDefaultSection = (projectId) => ({
  key: `s_new_${generateShortId()}`,
  title: `Дефолтная секция`,
  t: 'section',
  so: 0,
  childrens: []
});

const initialState = {
  // Храним дерево и открытые документы по проектам
  projects: {
    // Пример:
    // 'p_1': {
    //   tree: [...], 
    //   tabbedNodes: { 't_123': {...} }, 
    //   activeDocument: { [sectionId]: 's_113', [taskId]: 't_123' }
    // }
  },
  loading: false,
  error: null
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Загрузка дерева проекта в хранилище
    loadTree: (state, action) => {
      const { projectId, tree } = action.payload;
      if (!state.projects[projectId]) {
        state.projects[projectId] = {
          tree: [],
          tabbedNodes: {},
          activeDocument: {}
        };
      }
      state.projects[projectId].tree = tree;
    },

    addTaskToRoot: (state, action) => {
      const { projectId, task } = action.payload;
      const project = state.projects[projectId];
      if (!project) return;

      // Если в корне нет секций — создаем дефолтную
      if (!project.tree.some(node => node.t === 'section')) {
        const defaultSection = createDefaultSection(projectId);
        project.tree.unshift(defaultSection);
      }

      // Добавляем задачу в дефолтную секцию
      const targetSection = project.tree.find(node => node.t === 'section');
      if (targetSection) {
        targetSection.ch.unshift(task);
      } else {
        project.tree.push(task);
      }
    },

    // Добавление таба с задачей/секцией
    addTabbedNode: (state, action) => {
      const { projectId, node } = action.payload;
      if (!state.projects[projectId]) return;

      // Добавляем в tabbedNodes
      state.projects[projectId].tabbedNodes[node.key] = node;
    },

    // Удаление таба
    removeTabbedNode: (state, action) => {
      const { projectId, key } = action.payload;
      const tabbed = state.projects[projectId]?.tabbedNodes || {};
      delete tabbed[key];
      state.projects[projectId].tabbedNodes = { ...tabbed };
    },

    // Установка активного документа с привязкой к разделу (tree/kanban)
    setActiveDocument: (state, action) => {
      const { projectId, sectionId, taskId, tab } = action.payload;

      if (!state.projects[projectId]) return;

      // Устанавливаем активный документ по текущему разделу (tab)
      state.projects[projectId].activeDocument[tab] = {
        section: sectionId || null,
        task: taskId || null
      };
    },

 // Для обновления существующих узлов
    updateTreeNode: (state, action) => {
      const { projectId, key, changes } = action.payload;
      const project = state.projects[projectId];
      if (!project) return;

      const updateNode = (nodes) => {
        return nodes.map(node => {
          if (node.key === key) {
            return { ...node, ...changes };
          }
          if (node.ch) {
            return { ...node, ch: updateNode(node.ch) };
          }
          return node;
        });
      };

      project.tree = updateNode(project.tree);
    },

    // Для добавления новых узлов
addTreeNode: (state, action) => {
  const { projectId, parentId, newNode } = action.payload;

  // 1. Если проекта нет в сторе — создаём его
  if (!state.projects[projectId]) {
    state.projects[projectId] = {
      tree: [],
      tabbedNodes: {},
      activeDocument: {}
    };
  }

  // 2. Добавляем узел
  const project = state.projects[projectId];
  if (!parentId) {
    // Добавляем в корень
    project.tree.push(newNode);
  } else {
    // Добавляем в дочерние узлы
    const insertNode = (nodes) => {
      return nodes.map(node => {
        if (node.key === parentId) {
          return {
            ...node,
            ch: [...(node.ch || []), newNode]
          };
        }
        if (node.ch) {
          return {
            ...node,
            ch: insertNode(node.ch)
          };
        }
        return node;
      });
    };

    project.tree = insertNode(project.tree);
  }
},

    // Установка дочерних узлов для конкретного узла
    setNodeChildren: (state, action) => {
      const { projectId, key, children } = action.payload;
      const project = state.projects[projectId];
      if (!project) return;

      const findAndSetChildren = (nodes) => {
        return nodes.map(node => {
          if (node.key === key) {
            return { ...node, ch: children };
          }
          if (node.ch) {
            return { ...node, ch: findAndSetChildren(node.ch) };
          }
          return node;
        });
      };

      project.tree = findAndSetChildren(project.tree);
    },

    // Очистка данных проекта (например, при смене проекта)
    clearProjectData: (state, action) => {
      const projectId = action.payload;
      if (state.projects[projectId]) {
        state.projects[projectId] = {
          tree: [],
          tabbedNodes: {},
          activeDocument: {}
        };
      }
    }
  }
});

export const {
  loadTree,
  addTabbedNode,
  addTreeNode,
  insertNode,
  removeTabbedNode,
  setActiveDocument,
  updateTreeNode,
  setNodeChildren,
  clearProjectData
} = taskSlice.actions;

export default taskSlice.reducer;