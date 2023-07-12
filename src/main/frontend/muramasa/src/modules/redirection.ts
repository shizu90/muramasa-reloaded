export function redirect(urlParams: URLSearchParams) {
    const searchurl = urlParams.toString();
    window.location.href = window.location.href.split('?')[0] + '?' + searchurl;
}