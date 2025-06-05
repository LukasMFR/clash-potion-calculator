// utils.js

// Convert days, hours, minutes to minutes
function toMinutes(days, hours, minutes) {
    return (parseInt(days, 10) || 0) * 24 * 60 +
        (parseInt(hours, 10) || 0) * 60 +
        (parseInt(minutes, 10) || 0);
}

// Convert minutes to {days, hours, minutes}
function fromMinutes(total) {
    const days = Math.floor(total / (24 * 60));
    const hours = Math.floor((total % (24 * 60)) / 60);
    const minutes = total % 60;
    return { days, hours, minutes };
}

// Format date in English: Friday 6 June 2025, 18:12
function formatDateHuman(date) {
    return date.toLocaleString('en-GB', {
        weekday: 'long', day: 'numeric', month: 'long',
        year: 'numeric', hour: '2-digit', minute: '2-digit',
        hour12: false
    });
}

// Format an array of [label, value] pairs into styled HTML
function formatResultList(items) {
    return '<div class="result__list">' + items.map(function (item) {
        var val = String(item[1]);
        var stack = val.length > 20 ? ' result__row--stack' : '';
        return '<div class="result__row' + stack + '"><span class="result__label">' + item[0] +
            '</span><span class="result__value">' + val + '</span></div>';
    }).join('') + '</div>';
}