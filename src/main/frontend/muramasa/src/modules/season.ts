export function getSeason(date: Date) {
    const m = date.getMonth();
    
    if(3 <= m && m <= 5) {
        return "spring";
    }else if(6 <= m && m <= 8) {
        return "summer";
    }else if(9 <= m && m <= 11) {
        return "fall";
    }else return "winter";
}

export function getSeasonStartingMonth(str: string) {
    switch(str) {
        case 'summer':
            return '06';
        case 'spring':
            return '03';
        case 'fall':
            return '09';
        case 'winter':
            return '12';
        default:
            return null;
    }
}

export function getNextSeason(str: string) {
    switch(str) {
        case 'spring':
            return 'summer';
        case 'summer':
            return 'fall';
        case 'fall':
            return 'winter';
        case 'winter':
            return 'spring';
        default:
            return null;
    }
}

export function getNextSeasonDate(year: string | number = new Date().getFullYear(), str: string) {
    return `${str === 'winter' ? Number(year) + 1 : year}-${getSeasonStartingMonth(getNextSeason(str) as string)}-01`;
}

export const currentSeason = getSeason(new Date());
export const currentYear = new Date().getFullYear() + "";
export const currentSeasonStartingMonth = getSeasonStartingMonth(currentSeason);


