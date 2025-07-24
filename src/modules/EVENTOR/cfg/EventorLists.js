import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

    export const EVENT_STATUSES = [
        {
            id: 1,
            name: "await",
            icon: <ClockCircleOutlined />
        },
        {
            id: 2,
            name: "published",
            icon: <CheckCircleOutlined />
        },
        {
            id: 3,
            name: "archieved",
            icon: <CloseCircleOutlined />
        },
    ];


    export const EVENT_ACCESSES = [
        {
            id: 1,
            name: "private",
            icon: <ClockCircleOutlined />
        },
        {
            id: 2,
            name: "friends",
            icon: <CheckCircleOutlined />
        },
        {
            id: 3,
            name: "group",
            icon: <CloseCircleOutlined />
        },
        {
            id: 4,
            name: "public registered",
            icon: <CloseCircleOutlined />
        },
                {
            id: 5,
            name: "public global",
            icon: <CloseCircleOutlined />
        },
    ];


        export const EVENT_COMMENT_ACCESSES = [
        {
            id: null,
            name: "by section",
            description: 'Определено секцией',
            icon: <ClockCircleOutlined />
        },
        {
            id: 1,
            name: "Forbid all",
            description: 'Полный запрет',
            icon: <ClockCircleOutlined />
        },
        {
            id: 2,
            name: "Only me private",
            description: 'Пишу только я и вижу только я',
            icon: <CheckCircleOutlined />
        },
        {
            id: 3,
            name: "Only my show anybody",
            description: 'Пишу только я, видят все',
            icon: <CloseCircleOutlined />
        },
        {
            id: 4,
            name: "Only friends show friends",
            description: 'Только друзья, видят друзья',
            icon: <CloseCircleOutlined />
        },
        {
            id: 5,
            name: "Only friends show anybody",
            description: 'Только друзья, видно всем',
            icon: <CloseCircleOutlined />
        },
        {
            id: 6,
            name: "Only group show group",
            description: 'Только группа, видит группа',
            icon: <CloseCircleOutlined />
        },
        {
            id: 7,
            name: "Only group show anybody",
            description: 'Только группа, видят все',
            icon: <CloseCircleOutlined />
        },
        {
            id: 8,
            name: "Only registered show registered",
            description: 'Только зарегистрированные, видят зарегистрированные',
            icon: <CloseCircleOutlined />
        },
        {
            id: 9,
            name: "Only registered show anybody",
            description: 'Только зарегистрированные, видят все',
            icon: <CloseCircleOutlined />
        },
    ];