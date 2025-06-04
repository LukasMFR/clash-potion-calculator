// js/utils.js
/**
 * Converts days/hours/minutes into total minutes.
 */
function toMinutes(days, hours, minutes) {
    return (Number(days) || 0) * 24 * 60 + (Number(hours) || 0) * 60 + (Number(minutes) || 0);
}

/**
 * Converts total minutes into {days, hours, minutes}
 */
function fromMinutes(total) {
    let days = Math.floor(total / (24 * 60));
    let h = Math.floor((total % (24 * 60)) / 60);
    let m = total % 60;
    return { days, hours: h, minutes: m };
}

/**
 * Formats a JS Date to English: "Friday, 6 June 2025 at 18:12"
 */
function formatDateHuman(date) {
    const options = {
        weekday: 'long', day: 'numeric', month: 'long',
        year: 'numeric', hour: '2-digit', minute: '2-digit',
        hour12: false
    };
    // "Friday, 6 June 2025, 18:12"
    let str = date.toLocaleString('en-GB', options);
    str = str.replace(',', '').replace(' at', ',');
    str = str.replace(/(\d{2}):(\d{2})$/, (m, h, min) => `at ${h}:${min}`);
    return str;
}

/**
 * Pads number to 2 digits ("3" -> "03")
 */
function pad2(n) { return n < 10 ? "0" + n : n; }