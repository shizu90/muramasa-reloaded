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
    if(str == 'summer') {
        return '06';
    }else if(str == 'spring') {
        return '03';
    }else if(str == 'fall') {
        return '09';
    }else if(str == 'winter') {
        return '12'
    }
}

export const currentSeason = getSeason(new Date());
export const currentYear = new Date().getFullYear() + "";
export const currentSeasonStartingMonth = getSeasonStartingMonth(currentSeason);


