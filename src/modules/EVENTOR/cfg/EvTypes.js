const generateId = (prefix = '') => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = prefix;
  for (let i = 0; i < 26 - prefix.length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

export const BaseEventTypes = [
    {
    id: null,
    user_id: 'SYSTEM00000000000000000000',
    name: 'No type',
    color: "#999",
    bgcolor: "#ffffffff",
    sort_order: 0,
    icon: "", // Будем мапить на SVG-компонент
    is_default: true
  },
  {
    id: "SYSLWI7GB9DA6DIQKRNOGN843Y",
    user_id: 'SYSTEM00000000000000000000',
    name: 'Event',
    color: "#666",
    bgcolor: "#76c38530",
    sort_order: 1,
    icon: "event", // Будем мапить на SVG-компонент
    is_default: true
  },
  {
    id: "SYSGZUK78N5JMADYM5RZJTYABM",
    user_id: 'SYSTEM00000000000000000000',
    name: 'Action',
    color: "#666",
    bgcolor: "#d1b50030",
    sort_order: 2,
    icon: "action",
    is_default: true
  },
  {
    id: "SYS3THGLH8SI1XX5R3JV4FLUU2",
    user_id: 'SYSTEM00000000000000000000',
    name: 'Note',
    color: "#666",
    bgcolor: "#9c27b029",
    sort_order: 3,
    icon: "note",
    is_default: true
  },
  {
    id: "SYSKERK4XVKQ04CNS93331JUNH",
    user_id: 'SYSTEM00000000000000000000',
    name: 'Task',
    color: "#666",
    bgcolor: "#ff960036",
    sort_order: 4,
    icon: "task",
    is_default: true
  },
  {
    id: "SYSC571A0QCBW9VUNQKDIGQWLU",
    user_id: 'SYSTEM00000000000000000000',
    name: 'Synopsis',
    color: "#666",
    bgcolor: "#00abff3b",
    sort_order: 5,
    icon: "synopsis",
    is_default: true
  },
  {
    id: "SYSUMZRE5C7FD2LKLF8H09P460",
    user_id: 'SYSTEM00000000000000000000',
    name: 'Info',
    color: "#666",
    bgcolor: "#00d9cd54",
    sort_order: 6,
    icon: "info",
    is_default: true
  }
];