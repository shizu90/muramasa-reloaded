export function filterKeysAbout(about: string) {
    const numOfKeys = about.replace(/[^:]/g, "").length;
    let x = about;
    let i=0;let substring;let startingIndex=-1;
    while(i < numOfKeys) {
        const currentKeyIndex = x.substring(startingIndex+1).indexOf(':');
        substring = x.substring(startingIndex+1, currentKeyIndex).split(' ');
        substring = substring[substring.length - 1];
        console.log(substring);
        startingIndex=currentKeyIndex;
        i++;
    }
}