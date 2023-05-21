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

export const current_season = {
    
}


