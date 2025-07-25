const EN_DAYS = [
    {d: 0, short: 'Sun', full: 'Sunday'},
    {d: 1, short: 'Mon', full: 'Monday'},
    {d: 2, short: 'Tue', full: 'Tuesday'},
    {d: 3, short: 'Wed', full: 'Wednesday'},
    {d: 4, short: 'Thu', full: 'Thursday'},
    {d: 5, short: 'Fri', full: 'Friday'},
    {d: 6, short: 'Sat', full: 'Saturday'}
];

const RU_DAYS = [
    {d: 0, short: 'Вс', full: 'Воскресенье'},
    {d: 1, short: 'Пн', full: 'Понедельник'},
    {d: 2, short: 'Вт', full: 'Вторник'},
    {d: 3, short: 'Ср', full: 'Среда'},
    {d: 4, short: 'Чт', full: 'Четверг'},
    {d: 5, short: 'Пт', full: 'Пятница'},
    {d: 6, short: 'Сб', full: 'Суббота'}
];

const ES_DAYS = [
    {d: 0, short: 'Dom', full: 'Domingo'},
    {d: 1, short: 'Lun', full: 'Lunes'},
    {d: 2, short: 'Mar', full: 'Martes'},
    {d: 3, short: 'Mié', full: 'Miércoles'},
    {d: 4, short: 'Jue', full: 'Jueves'},
    {d: 5, short: 'Vie', full: 'Viernes'},
    {d: 6, short: 'Sáb', full: 'Sábado'}
];

const CN_DAYS = [
    {d: 0, short: '周日', full: '星期日'},
    {d: 1, short: '周一', full: '星期一'},
    {d: 2, short: '周二', full: '星期二'},
    {d: 3, short: '周三', full: '星期三'},
    {d: 4, short: '周四', full: '星期四'},
    {d: 5, short: '周五', full: '星期五'},
    {d: 6, short: '周六', full: '星期六'}
];

const DE_DAYS = [
    {d: 0, short: 'So', full: 'Sonntag'},
    {d: 1, short: 'Mo', full: 'Montag'},
    {d: 2, short: 'Di', full: 'Dienstag'},
    {d: 3, short: 'Mi', full: 'Mittwoch'},
    {d: 4, short: 'Do', full: 'Donnerstag'},
    {d: 5, short: 'Fr', full: 'Freitag'},
    {d: 6, short: 'Sa', full: 'Samstag'}
];

const FR_DAYS = [
    {d: 0, short: 'Dim', full: 'Dimanche'},
    {d: 1, short: 'Lun', full: 'Lundi'},
    {d: 2, short: 'Mar', full: 'Mardi'},
    {d: 3, short: 'Mer', full: 'Mercredi'},
    {d: 4, short: 'Jeu', full: 'Jeudi'},
    {d: 5, short: 'Ven', full: 'Vendredi'},
    {d: 6, short: 'Sam', full: 'Samedi'}
];

const IT_DAYS = [
    {d: 0, short: 'Dom', full: 'Domenica'},
    {d: 1, short: 'Lun', full: 'Lunedì'},
    {d: 2, short: 'Mar', full: 'Martedì'},
    {d: 3, short: 'Mer', full: 'Mercoledì'},
    {d: 4, short: 'Gio', full: 'Giovedì'},
    {d: 5, short: 'Ven', full: 'Venerdì'},
    {d: 6, short: 'Sab', full: 'Sabato'}
];

const JP_DAYS = [
    {d: 0, short: '日', full: '日曜日'},
    {d: 1, short: '月', full: '月曜日'},
    {d: 2, short: '火', full: '火曜日'},
    {d: 3, short: '水', full: '水曜日'},
    {d: 4, short: '木', full: '木曜日'},
    {d: 5, short: '金', full: '金曜日'},
    {d: 6, short: '土', full: '土曜日'}
];

const KR_DAYS = [
    {d: 0, short: '일', full: '일요일'},
    {d: 1, short: '월', full: '월요일'},
    {d: 2, short: '화', full: '화요일'},
    {d: 3, short: '수', full: '수요일'},
    {d: 4, short: '목', full: '목요일'},
    {d: 5, short: '금', full: '금요일'},
    {d: 6, short: '토', full: '토요일'}
];

export const GetDayName = (day, lang = 'en', is_short = false) => {
    const targ_lang = lang.toUpperCase() + '_DAYS';
    const langMap = {
        EN_DAYS, RU_DAYS, ES_DAYS, CN_DAYS, 
        DE_DAYS, FR_DAYS, IT_DAYS, JP_DAYS, KR_DAYS
    };
    
    if (!langMap[targ_lang]) {
        return langMap.EN_DAYS[day][is_short ? 'short' : 'full'];
    }
    
    const dayData = langMap[targ_lang].find(item => item.d === day);
    return dayData ? dayData[is_short ? 'short' : 'full'] : '';
};