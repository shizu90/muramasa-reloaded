export function generatePages(current: number, last: number): Array<number> {
    let left = current - 3 <= 0 ? 1 : current - 3;
    let right = current + 3 > last ? last : current + 3;
    let pages = [];
    if(current <= 3) {
        right = last < 7 ? last : 7;
    }
    for(let i = left; i <= right; i++) {
        pages.push(i);
    }
    return pages;
}

export function redirectToPage(urlParams: URLSearchParams, page: number) {
    urlParams.set('page', String(page));
    window.location.href = window.location.href.split('?')[0] + '?' + urlParams.toString();
}