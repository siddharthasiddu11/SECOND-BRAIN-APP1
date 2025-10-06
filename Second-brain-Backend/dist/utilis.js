export function random(len) {
    let options = "dhuihjbdnbnhuhkwbhhjbnnbh12345678";
    let length = options.length;
    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += options[Math.floor((Math.random() * length))]; //  gives an random no between o => length
        // Math.floor=> gives an integral num not decimal number
    }
    return ans;
}
//# sourceMappingURL=utilis.js.map