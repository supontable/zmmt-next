import {API_HOST} from './const'

/**
 * Функция возвращает окончание для множественного числа слова на основании числа и массива окончаний
 * @param  iNumber Integer Число на основе которого нужно сформировать окончание
 * @param  aEndings Array Массив слов или окончаний для чисел (1, 4, 5),
 *         например ['яблоко', 'яблока', 'яблок']
 * @return String
 */
function getNumEnding(iNumber, aEndings)
{
    var sEnding, i;
    iNumber = iNumber % 100;
    if (iNumber>=11 && iNumber<=19) {
        sEnding=aEndings[2];
    }
    else {
        i = iNumber % 10;
        switch (i)
        {
            case (1): sEnding = aEndings[0]; break;
            case (2):
            case (3):
            case (4): sEnding = aEndings[1]; break;
            default: sEnding = aEndings[2];
        }
    }
    return sEnding;
}

function wrapApiUrl(url) {
    return API_HOST + url
}

function keysToObject(keys) {
    let result = {}
    for (let i=0; i<keys.lenght; i++) {
        result[keys[i]] = false
    }
    return result
}

export {keysToObject, getNumEnding, wrapApiUrl}