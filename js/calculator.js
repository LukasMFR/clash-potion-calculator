// js/calculator.js

/**
 * Main calculation for all potions and simple calc.
 * @param {Object} params
 * @param {"simple"|"builder"|"research"|"pet"} params.mode
 * @param {number} params.days
 * @param {number} params.hours
 * @param {number} params.minutes
 * @param {number} [params.potions]   // builder mode only
 * @param {number} [params.boostHours] // for boost remaining
 * @param {number} [params.boostMinutes]
 * @returns {Object} { resultText, endDate }
 */
function calcPotion({ mode, days, hours, minutes, potions, boostHours, boostMinutes }) {
    let now = new Date();
    let totalMinutes = toMinutes(days, hours, minutes);
    let result = "";

    // Potion speed multipliers
    const speed = {
        builder: 10,
        research: 24,
        pet: 24
    };

    if (mode === "simple") {
        // Just add duration
        let end = new Date(now.getTime() + totalMinutes * 60 * 1000);
        let { days: j, hours: h, minutes: m } = fromMinutes(totalMinutes);
        result = `Remaining duration: ${j}d ${h}h ${m}m\n→ Estimated end: ${formatDateHuman(end)}`;
        return { resultText: result, endDate: end };
    }

    let potionType = mode;
    let speedup = speed[potionType];

    // Builder/Research/Pet potion - Full calculation
    if (boostHours !== undefined || boostMinutes !== undefined) {
        // Boost already in progress (Mode 3 in Python)
        let boostMinutesTotal = toMinutes(0, boostHours, boostMinutes);
        let coveredWork = boostMinutesTotal * speedup;
        if (coveredWork >= totalMinutes) {
            // Boost enough to finish everything
            let realTimeNeeded = Math.ceil(totalMinutes / speedup);
            let end = new Date(now.getTime() + realTimeNeeded * 60 * 1000);
            let { hours: h, minutes: m } = fromMinutes(realTimeNeeded);
            let boostLeft = boostMinutesTotal - realTimeNeeded;
            result = `Boost covers all work (${boostMinutesTotal} min real, ×${speedup})\n→ Needed under boost: ${h}h ${m}m\n→ Unused boost left: ${boostLeft} min\n→ Estimated end: ${formatDateHuman(end)}\n→ All remaining time under boost!`;
            return { resultText: result, endDate: end };
        } else {
            // Boost only partial
            let workAfterBoost = totalMinutes - coveredWork;
            let end = new Date(now.getTime() + (boostMinutesTotal + workAfterBoost) * 60 * 1000);
            let { hours: h1, minutes: m1 } = fromMinutes(boostMinutesTotal);
            let { days: d2, hours: h2, minutes: m2 } = fromMinutes(workAfterBoost);
            result =
                `Boost covers: ${coveredWork} min (${h1}h ${m1}m real)\n` +
                `Normal work left: ${workAfterBoost} min (${d2}d ${h2}h ${m2}m real)\n` +
                `→ Estimated end: ${formatDateHuman(end)}\n` +
                `→ Total remaining: ${(boostMinutesTotal + workAfterBoost)} min (${fromMinutes(boostMinutesTotal + workAfterBoost).days}d ${fromMinutes(boostMinutesTotal + workAfterBoost).hours}h ${fromMinutes(boostMinutesTotal + workAfterBoost).minutes}m)`;
            return { resultText: result, endDate: end };
        }
    } else if (potions !== undefined) {
        // Potions to be used (Mode 2 in Python)
        let potionTime = potions * 60; // in real minutes
        let coveredWork = potions * 60 * speedup;
        if (coveredWork >= totalMinutes) {
            // Potions cover all
            let realTime = Math.ceil(totalMinutes / speedup);
            let end = new Date(now.getTime() + realTime * 60 * 1000);
            let { hours: h, minutes: m } = fromMinutes(realTime);
            result = `Potions cover all work (${potions} potion${potions > 1 ? 's' : ''} = ${coveredWork} min normal)\n→ Time under potion: ${h}h ${m}m (${realTime} min real)\n→ Estimated end: ${formatDateHuman(end)}\n→ No normal time left.`;
            return { resultText: result, endDate: end };
        } else {
            let workAfter = totalMinutes - coveredWork;
            let end = new Date(now.getTime() + (potionTime + workAfter) * 60 * 1000);
            let { hours: h1, minutes: m1 } = fromMinutes(potionTime);
            let { days: d2, hours: h2, minutes: m2 } = fromMinutes(workAfter);
            result =
                `Potions cover: ${coveredWork} min normal (${potions} potion${potions > 1 ? 's' : ''}, ${h1}h ${m1}m real)\n` +
                `Normal work left: ${workAfter} min (${d2}d ${h2}h ${m2}m)\n` +
                `→ Estimated end: ${formatDateHuman(end)}\n` +
                `→ Total remaining: ${(potionTime + workAfter)} min (${fromMinutes(potionTime + workAfter).days}d ${fromMinutes(potionTime + workAfter).hours}h ${fromMinutes(potionTime + workAfter).minutes}m)`;
            return { resultText: result, endDate: end };
        }
    }
    return { resultText: "Invalid parameters.", endDate: now };
}