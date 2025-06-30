import { Affix, Button, Checkbox, Input } from "antd";
import React from "react";
import FilterRow from './../../../../Components/MimiTemplate/components/FORMS/FilterRow';

const QuestFilter = (props) => {

    return (
        
            <div className={'mi-extend-space-2'}>
                QuestFilter

                <FilterRow >
                    <Checkbox>Только мои заявки</Checkbox>    
                </FilterRow>

                <FilterRow label={'Название или текст'}>
                    <Input /> 
                </FilterRow>

                <FilterRow label={'Тип'}>
                    <Input /> 
                </FilterRow>

                <FilterRow label={'Приоритет'}>
                    <Input /> 
                </FilterRow>

                <FilterRow label={'Статус'}>
                    <Input /> 
                </FilterRow>

                <FilterRow label={'Проект'}>
                    <Input /> 
                </FilterRow>

                <FilterRow label={'Раздел'}>
                    <Input /> 
                </FilterRow>

                <FilterRow label={'Текст доп инфо'}>
                    <Input /> 
                </FilterRow>

                <FilterRow label={'Отдел-департамент'}>
                    <Input /> 
                </FilterRow>

                <FilterRow label={'Интервал выполнения'}>
                    <Input /> 
                </FilterRow>

                <FilterRow label={'Заблокирована'}>
                    <Input /> 
                </FilterRow>

                <FilterRow label={'Исполнитель'}>
                    <Input /> 
                </FilterRow>

                <FilterRow label={'Текст комментариев'}>
                    <Input /> 
                </FilterRow>

                <FilterRow label={'Текст задач'}>
                    <Input /> 
                </FilterRow>
            </div>

       
    )
}

export default QuestFilter;



// import React from "react";

// const QuestFilter = (props) => {

//     return (
//         <div>
//             QuestFilter
//         </div>
//     )
// }

// export default QuestFilter;