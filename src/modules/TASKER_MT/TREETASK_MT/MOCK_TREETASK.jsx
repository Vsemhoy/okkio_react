export const MOCK_TREETASK = {
  id: 123,
  parent_task_id: null,
  parent_section_id: null,
  executor_id: 377,
  creator_id: 46,
  okkio_request_id: null,
  okkio_release_id: null,
  title: 'Base task name',
  text: 'Here MD text',
  result: 'Md text what we got',
  status: 5, // in work
  visible_rule: 0, // visible everybody
  project_id: 0,
  priority: 4,
  locked: 0,
  starred: 0,
  block_change_source: 0, // nobody can change task title and text
  plan_date: null,
  executed_date: null,
  fact_time: 0, // time of execution in seconds
  plan_time: 0,
  okkio_release_sort_order: 0,
  sort_order: 1,
  boul: 0,
  created_at: '2025-03-01',
  updated_at: '2025-03-01',
}

export const MOCK_TREESECTION = {
  id: 113,
  parent_section_id: null,
  executor_id: 377,
  creator_id: 46,
  okkio_request_id: null,
  okkio_release_id: null,
  title: 'Base task name',
  text: 'Here MD text',
  status: 5, // in work
  project_id: 0,
  visible_rule: 0, // visible everybody
  priority: 4,
  locked: 0,
  starred: 0,
  block_change_source: 0, // nobody can change task title and text
  plan_date: null,
  executed_date: null,
  fact_time: 0, // time of execution in seconds
  plan_time: 0,
  okkio_release_sort_order: 0,
  sort_order: 1,
  created_at: '2025-03-01',
  updated_at: '2025-03-01',
}

const dt = [
  {
  "tree": [
    {
      "key": "s_113",
      "title": "Base section",
      "t": "section",
      "so": 1,
      "childrens": [
        {
          "key": "t_123",
          "title": "Base task",
          "t": "task",
          "s": 5,
          "p": 4,
          "v": 0,
          "cr": 46,
          "ex": 377,
          "pt": 113,
          "so": 1
        }
      ]
    }
  ]
}
]