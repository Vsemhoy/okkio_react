/** Count of sybols to trim text content */
export const EVENTOR_CARD_TRIM_LENGTH = 800;

export const eventCardTrimContent = (content) => {
    return content.length > EVENTOR_CARD_TRIM_LENGTH 
    ? `${content.substring(0, EVENTOR_CARD_TRIM_LENGTH)}...` 
    : content;
}