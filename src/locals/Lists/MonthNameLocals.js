const EN = [
    {m: 1, short: 'Jan', full: 'January'},
    {m: 2, short: 'Feb', full: 'February'},
    {m: 3, short: 'Mar', full: 'March'},
    {m: 4, short: 'Apr', full: 'April'},
    {m: 5, short: 'May', full: 'May'},
    {m: 6, short: 'Jun', full: 'June'},
    {m: 7, short: 'Jul', full: 'July'},
    {m: 8, short: 'Aug', full: 'August'},
    {m: 9, short: 'Sep', full: 'September'},
    {m: 10, short: 'Oct', full: 'October'},
    {m: 11, short: 'Nov', full: 'November'},
    {m: 12, short: 'Dec', full: 'December'}
];

const RU = [
    {m: 1, short: 'Янв', full: 'Январь'},
    {m: 2, short: 'Фев', full: 'Февраль'},
    {m: 3, short: 'Мар', full: 'Март'},
    {m: 4, short: 'Апр', full: 'Апрель'},
    {m: 5, short: 'Май', full: 'Май'},
    {m: 6, short: 'Июн', full: 'Июнь'},
    {m: 7, short: 'Июл', full: 'Июль'},
    {m: 8, short: 'Авг', full: 'Август'},
    {m: 9, short: 'Сен', full: 'Сентябрь'},
    {m: 10, short: 'Окт', full: 'Октябрь'},
    {m: 11, short: 'Ноя', full: 'Ноябрь'},
    {m: 12, short: 'Дек', full: 'Декабрь'}
];

const ES = [
    {m: 1, short: 'Ene', full: 'Enero'},
    {m: 2, short: 'Feb', full: 'Febrero'},
    {m: 3, short: 'Mar', full: 'Marzo'},
    {m: 4, short: 'Abr', full: 'Abril'},
    {m: 5, short: 'May', full: 'Mayo'},
    {m: 6, short: 'Jun', full: 'Junio'},
    {m: 7, short: 'Jul', full: 'Julio'},
    {m: 8, short: 'Ago', full: 'Agosto'},
    {m: 9, short: 'Sep', full: 'Septiembre'},
    {m: 10, short: 'Oct', full: 'Octubre'},
    {m: 11, short: 'Nov', full: 'Noviembre'},
    {m: 12, short: 'Dic', full: 'Diciembre'}
];

const CN = [
    {m: 1, short: '1月', full: '一月'},
    {m: 2, short: '2月', full: '二月'},
    {m: 3, short: '3月', full: '三月'},
    {m: 4, short: '4月', full: '四月'},
    {m: 5, short: '5月', full: '五月'},
    {m: 6, short: '6月', full: '六月'},
    {m: 7, short: '7月', full: '七月'},
    {m: 8, short: '8月', full: '八月'},
    {m: 9, short: '9月', full: '九月'},
    {m: 10, short: '10月', full: '十月'},
    {m: 11, short: '11月', full: '十一月'},
    {m: 12, short: '12月', full: '十二月'}
];

const DE = [
    {m: 1, short: 'Jan', full: 'Januar'},
    {m: 2, short: 'Feb', full: 'Februar'},
    {m: 3, short: 'Mär', full: 'März'},
    {m: 4, short: 'Apr', full: 'April'},
    {m: 5, short: 'Mai', full: 'Mai'},
    {m: 6, short: 'Jun', full: 'Juni'},
    {m: 7, short: 'Jul', full: 'Juli'},
    {m: 8, short: 'Aug', full: 'August'},
    {m: 9, short: 'Sep', full: 'September'},
    {m: 10, short: 'Okt', full: 'Oktober'},
    {m: 11, short: 'Nov', full: 'November'},
    {m: 12, short: 'Dez', full: 'Dezember'}
];

const FR = [
    {m: 1, short: 'Jan', full: 'Janvier'},
    {m: 2, short: 'Fév', full: 'Février'},
    {m: 3, short: 'Mar', full: 'Mars'},
    {m: 4, short: 'Avr', full: 'Avril'},
    {m: 5, short: 'Mai', full: 'Mai'},
    {m: 6, short: 'Juin', full: 'Juin'},
    {m: 7, short: 'Juil', full: 'Juillet'},
    {m: 8, short: 'Aoû', full: 'Août'},
    {m: 9, short: 'Sep', full: 'Septembre'},
    {m: 10, short: 'Oct', full: 'Octobre'},
    {m: 11, short: 'Nov', full: 'Novembre'},
    {m: 12, short: 'Déc', full: 'Décembre'}
];

const IT = [
    {m: 1, short: 'Gen', full: 'Gennaio'},
    {m: 2, short: 'Feb', full: 'Febbraio'},
    {m: 3, short: 'Mar', full: 'Marzo'},
    {m: 4, short: 'Apr', full: 'Aprile'},
    {m: 5, short: 'Mag', full: 'Maggio'},
    {m: 6, short: 'Giu', full: 'Giugno'},
    {m: 7, short: 'Lug', full: 'Luglio'},
    {m: 8, short: 'Ago', full: 'Agosto'},
    {m: 9, short: 'Set', full: 'Settembre'},
    {m: 10, short: 'Ott', full: 'Ottobre'},
    {m: 11, short: 'Nov', full: 'Novembre'},
    {m: 12, short: 'Dic', full: 'Dicembre'}
];

const JP = [
    {m: 1, short: '1月', full: '一月'},
    {m: 2, short: '2月', full: '二月'},
    {m: 3, short: '3月', full: '三月'},
    {m: 4, short: '4月', full: '四月'},
    {m: 5, short: '5月', full: '五月'},
    {m: 6, short: '6月', full: '六月'},
    {m: 7, short: '7月', full: '七月'},
    {m: 8, short: '8月', full: '八月'},
    {m: 9, short: '9月', full: '九月'},
    {m: 10, short: '10月', full: '十月'},
    {m: 11, short: '11月', full: '十一月'},
    {m: 12, short: '12月', full: '十二月'}
];

const KR = [
    {m: 1, short: '1월', full: '일월'},
    {m: 2, short: '2월', full: '이월'},
    {m: 3, short: '3월', full: '삼월'},
    {m: 4, short: '4월', full: '사월'},
    {m: 5, short: '5월', full: '오월'},
    {m: 6, short: '6월', full: '유월'},
    {m: 7, short: '7월', full: '칠월'},
    {m: 8, short: '8월', full: '팔월'},
    {m: 9, short: '9월', full: '구월'},
    {m: 10, short: '10월', full: '시월'},
    {m: 11, short: '11월', full: '십일월'},
    {m: 12, short: '12월', full: '십이월'}
];

export const GetMonthName = (month, lang = 'en', is_short = false) => {
    const targ_lang = lang.toUpperCase();
    const langMap = {
        EN, RU, ES, CN, DE, FR, IT, JP, KR
    };
    
    if (!langMap[targ_lang]) {
        return langMap.EN[month - 1][is_short ? 'short' : 'full'];
    }
    
    const monthData = langMap[targ_lang].find(item => item.m === month);
    return monthData ? monthData[is_short ? 'short' : 'full'] : '';
};