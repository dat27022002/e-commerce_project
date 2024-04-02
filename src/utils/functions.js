export function formatNumberWithCommas(number) {
    if (!number || number == 0) return 0;
    if (number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
}
export function calcDiff(targetDate) {
    var currentDate = new Date();
    var difference = currentDate.getTime() - targetDate.getTime();

    var seconds = Math.floor(difference / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    var months = Math.floor(days / 30);
    var years = Math.floor(months / 12);
    if (years > 0) {
        return years + ' years';
    } else if (months > 0) {
        return months + ' months';
    } else if (days > 0) {
        return days + ' days';
    } else if (hours > 0) {
        return hours + ' hours';
    } else if (minutes > 0) {
        return minutes + ' mins';
    } else {
        return seconds + ' secs';
    }
}
export const generateArray = (size) => {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(i + 1);
    }
    return arr;
};
