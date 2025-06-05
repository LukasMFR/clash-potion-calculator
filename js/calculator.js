// calculator.js

// --- SIMPLE CALC --- //
document.addEventListener('DOMContentLoaded', function () {
    // Simple calc page
    const simpleForm = document.getElementById('simpleCalcForm');
    if (simpleForm) {
        simpleForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const days = simpleForm.days.value;
            const hours = simpleForm.hours.value;
            const minutes = simpleForm.minutes.value;
            const totalMinutes = toMinutes(days, hours, minutes);

            const now = new Date();
            const endDate = new Date(now.getTime() + totalMinutes * 60000);

            const result = document.getElementById('simpleCalcResult');
            result.innerHTML = formatResultList([
                ['Entered duration', `${days}d ${hours}h ${minutes}m`],
                ['End date', formatDateHuman(endDate)]
            ]);
            result.classList.remove('result--hidden');
        });
    }

    // --- BUILDER POTION --- //
    const builderPotionForm = document.getElementById('builderPotionForm');
    if (builderPotionForm) {
        builderPotionForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const days = builderPotionForm.days.value;
            const hours = builderPotionForm.hours.value;
            const minutes = builderPotionForm.minutes.value;
            const potions = builderPotionForm.potions.value;
            const totalNormalMinutes = toMinutes(days, hours, minutes);
            const coveredByPotions = (parseInt(potions, 10) || 0) * 600; // 1 potion = 600 normal min

            let realTimeMinutes, normalTimeLeft;
            if (coveredByPotions >= totalNormalMinutes) {
                realTimeMinutes = Math.ceil(totalNormalMinutes / 10);
                normalTimeLeft = 0;
            } else {
                realTimeMinutes = (parseInt(potions, 10) || 0) * 60;
                normalTimeLeft = totalNormalMinutes - coveredByPotions;
            }
            const totalRealMinutes = realTimeMinutes + normalTimeLeft;
            const now = new Date();
            const endDate = new Date(now.getTime() + totalRealMinutes * 60000);

            const realUnderPotion = fromMinutes(realTimeMinutes);
            const normalLeft = fromMinutes(normalTimeLeft);
            const totalLeft = fromMinutes(totalRealMinutes);

            const result = document.getElementById('builderPotionResult');
            result.innerHTML = formatResultList([
                ['Upgrade duration', `${days}d ${hours}h ${minutes}m`],
                ['Potions used', potions],
                ['Time under potion', `${realUnderPotion.hours}h ${realUnderPotion.minutes}m`],
                ['Normal time left', `${normalLeft.days}d ${normalLeft.hours}h ${normalLeft.minutes}m`],
                ['End date', formatDateHuman(endDate)],
                ['Total remaining', `${totalLeft.days}d ${totalLeft.hours}h ${totalLeft.minutes}m`]
            ]);
            result.classList.remove('result--hidden');
        });
    }

    // --- BUILDER BOOST --- //
    const builderBoostForm = document.getElementById('builderBoostForm');
    if (builderBoostForm) {
        builderBoostForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const boostHours = builderBoostForm.boost_hours.value;
            const boostMinutes = builderBoostForm.boost_minutes.value;
            const days = builderBoostForm.days.value;
            const hours = builderBoostForm.hours.value;
            const minutes = builderBoostForm.minutes.value;

            const boostRealMinutes = toMinutes(0, boostHours, boostMinutes);
            const coveredByBoost = boostRealMinutes * 10;
            const totalNormalMinutes = toMinutes(days, hours, minutes);

            let realTimeMinutes, normalTimeLeft, finishedWithBoost = false;
            if (coveredByBoost >= totalNormalMinutes) {
                realTimeMinutes = Math.ceil(totalNormalMinutes / 10);
                normalTimeLeft = 0;
                finishedWithBoost = true;
            } else {
                realTimeMinutes = boostRealMinutes;
                normalTimeLeft = totalNormalMinutes - coveredByBoost;
            }
            const totalRealMinutes = realTimeMinutes + normalTimeLeft;
            const now = new Date();
            const endDate = new Date(now.getTime() + totalRealMinutes * 60000);

            const realUnderBoost = fromMinutes(realTimeMinutes);
            const normalLeft = fromMinutes(normalTimeLeft);
            const totalLeft = fromMinutes(totalRealMinutes);

            const result = document.getElementById('builderPotionResult');
            result.innerHTML = formatResultList([
                ['Upgrade left', `${days}d ${hours}h ${minutes}m`],
                ['Boost left', `${boostHours}h ${boostMinutes}m`],
                ['Covered by boost', `${coveredByBoost}m`],
                [finishedWithBoost ? 'Finished entirely under boost!' : 'Time under boost', `${realUnderBoost.hours}h ${realUnderBoost.minutes}m`],
                ['Normal time left', `${normalLeft.days}d ${normalLeft.hours}h ${normalLeft.minutes}m`],
                ['End date', formatDateHuman(endDate)],
                ['Total remaining', `${totalLeft.days}d ${totalLeft.hours}h ${totalLeft.minutes}m`]
            ]);
            result.classList.remove('result--hidden');
        });
    }

    // --- RESEARCH POTION --- //
    const researchPotionForm = document.getElementById('researchPotionForm');
    if (researchPotionForm) {
        researchPotionForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const days = researchPotionForm.days.value;
            const hours = researchPotionForm.hours.value;
            const minutes = researchPotionForm.minutes.value;
            const potions = researchPotionForm.potions.value;
            const totalNormalMinutes = toMinutes(days, hours, minutes);
            const coveredByPotions = (parseInt(potions, 10) || 0) * 1440; // 1 potion = 1h x24 = 1440 normal min

            let realTimeMinutes, normalTimeLeft;
            if (coveredByPotions >= totalNormalMinutes) {
                realTimeMinutes = Math.ceil(totalNormalMinutes / 24);
                normalTimeLeft = 0;
            } else {
                realTimeMinutes = (parseInt(potions, 10) || 0) * 60;
                normalTimeLeft = totalNormalMinutes - coveredByPotions;
            }
            const totalRealMinutes = realTimeMinutes + normalTimeLeft;
            const now = new Date();
            const endDate = new Date(now.getTime() + totalRealMinutes * 60000);

            const realUnderPotion = fromMinutes(realTimeMinutes);
            const normalLeft = fromMinutes(normalTimeLeft);
            const totalLeft = fromMinutes(totalRealMinutes);

            const result = document.getElementById('researchPotionResult');
            result.innerHTML = formatResultList([
                ['Upgrade duration', `${days}d ${hours}h ${minutes}m`],
                ['Potions used', potions],
                ['Time under potion', `${realUnderPotion.hours}h ${realUnderPotion.minutes}m`],
                ['Normal time left', `${normalLeft.days}d ${normalLeft.hours}h ${normalLeft.minutes}m`],
                ['End date', formatDateHuman(endDate)],
                ['Total remaining', `${totalLeft.days}d ${totalLeft.hours}h ${totalLeft.minutes}m`]
            ]);
            result.classList.remove('result--hidden');
        });
    }

    // --- RESEARCH BOOST --- //
    const researchBoostForm = document.getElementById('researchBoostForm');
    if (researchBoostForm) {
        researchBoostForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const boostHours = researchBoostForm.boost_hours.value;
            const boostMinutes = researchBoostForm.boost_minutes.value;
            const days = researchBoostForm.days.value;
            const hours = researchBoostForm.hours.value;
            const minutes = researchBoostForm.minutes.value;

            const boostRealMinutes = toMinutes(0, boostHours, boostMinutes);
            const coveredByBoost = boostRealMinutes * 24;
            const totalNormalMinutes = toMinutes(days, hours, minutes);

            let realTimeMinutes, normalTimeLeft, finishedWithBoost = false;
            if (coveredByBoost >= totalNormalMinutes) {
                realTimeMinutes = Math.ceil(totalNormalMinutes / 24);
                normalTimeLeft = 0;
                finishedWithBoost = true;
            } else {
                realTimeMinutes = boostRealMinutes;
                normalTimeLeft = totalNormalMinutes - coveredByBoost;
            }
            const totalRealMinutes = realTimeMinutes + normalTimeLeft;
            const now = new Date();
            const endDate = new Date(now.getTime() + totalRealMinutes * 60000);

            const realUnderBoost = fromMinutes(realTimeMinutes);
            const normalLeft = fromMinutes(normalTimeLeft);
            const totalLeft = fromMinutes(totalRealMinutes);

            const result = document.getElementById('researchPotionResult');
            result.innerHTML = formatResultList([
                ['Upgrade left', `${days}d ${hours}h ${minutes}m`],
                ['Boost left', `${boostHours}h ${boostMinutes}m`],
                ['Covered by boost', `${coveredByBoost}m`],
                [finishedWithBoost ? 'Finished entirely under boost!' : 'Time under boost', `${realUnderBoost.hours}h ${realUnderBoost.minutes}m`],
                ['Normal time left', `${normalLeft.days}d ${normalLeft.hours}h ${normalLeft.minutes}m`],
                ['End date', formatDateHuman(endDate)],
                ['Total remaining', `${totalLeft.days}d ${totalLeft.hours}h ${totalLeft.minutes}m`]
            ]);
            result.classList.remove('result--hidden');
        });
    }

    // --- PET POTION --- //
    const petPotionForm = document.getElementById('petPotionForm');
    if (petPotionForm) {
        petPotionForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const days = petPotionForm.days.value;
            const hours = petPotionForm.hours.value;
            const minutes = petPotionForm.minutes.value;
            const potions = petPotionForm.potions.value;
            const totalNormalMinutes = toMinutes(days, hours, minutes);
            const coveredByPotions = (parseInt(potions, 10) || 0) * 1440; // 1 potion = 1h x24 = 1440 normal min

            let realTimeMinutes, normalTimeLeft;
            if (coveredByPotions >= totalNormalMinutes) {
                realTimeMinutes = Math.ceil(totalNormalMinutes / 24);
                normalTimeLeft = 0;
            } else {
                realTimeMinutes = (parseInt(potions, 10) || 0) * 60;
                normalTimeLeft = totalNormalMinutes - coveredByPotions;
            }
            const totalRealMinutes = realTimeMinutes + normalTimeLeft;
            const now = new Date();
            const endDate = new Date(now.getTime() + totalRealMinutes * 60000);

            const realUnderPotion = fromMinutes(realTimeMinutes);
            const normalLeft = fromMinutes(normalTimeLeft);
            const totalLeft = fromMinutes(totalRealMinutes);

            const result = document.getElementById('petPotionResult');
            result.innerHTML = formatResultList([
                ['Upgrade duration', `${days}d ${hours}h ${minutes}m`],
                ['Potions used', potions],
                ['Time under potion', `${realUnderPotion.hours}h ${realUnderPotion.minutes}m`],
                ['Normal time left', `${normalLeft.days}d ${normalLeft.hours}h ${normalLeft.minutes}m`],
                ['End date', formatDateHuman(endDate)],
                ['Total remaining', `${totalLeft.days}d ${totalLeft.hours}h ${totalLeft.minutes}m`]
            ]);
            result.classList.remove('result--hidden');
        });
    }

    // --- PET BOOST --- //
    const petBoostForm = document.getElementById('petBoostForm');
    if (petBoostForm) {
        petBoostForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const boostHours = petBoostForm.boost_hours.value;
            const boostMinutes = petBoostForm.boost_minutes.value;
            const days = petBoostForm.days.value;
            const hours = petBoostForm.hours.value;
            const minutes = petBoostForm.minutes.value;

            const boostRealMinutes = toMinutes(0, boostHours, boostMinutes);
            const coveredByBoost = boostRealMinutes * 24;
            const totalNormalMinutes = toMinutes(days, hours, minutes);

            let realTimeMinutes, normalTimeLeft, finishedWithBoost = false;
            if (coveredByBoost >= totalNormalMinutes) {
                realTimeMinutes = Math.ceil(totalNormalMinutes / 24);
                normalTimeLeft = 0;
                finishedWithBoost = true;
            } else {
                realTimeMinutes = boostRealMinutes;
                normalTimeLeft = totalNormalMinutes - coveredByBoost;
            }
            const totalRealMinutes = realTimeMinutes + normalTimeLeft;
            const now = new Date();
            const endDate = new Date(now.getTime() + totalRealMinutes * 60000);

            const realUnderBoost = fromMinutes(realTimeMinutes);
            const normalLeft = fromMinutes(normalTimeLeft);
            const totalLeft = fromMinutes(totalRealMinutes);

            const result = document.getElementById('petPotionResult');
            result.innerHTML = formatResultList([
                ['Upgrade left', `${days}d ${hours}h ${minutes}m`],
                ['Boost left', `${boostHours}h ${boostMinutes}m`],
                ['Covered by boost', `${coveredByBoost}m`],
                [finishedWithBoost ? 'Finished entirely under boost!' : 'Time under boost', `${realUnderBoost.hours}h ${realUnderBoost.minutes}m`],
                ['Normal time left', `${normalLeft.days}d ${normalLeft.hours}h ${normalLeft.minutes}m`],
                ['End date', formatDateHuman(endDate)],
                ['Total remaining', `${totalLeft.days}d ${totalLeft.hours}h ${totalLeft.minutes}m`]
            ]);
            result.classList.remove('result--hidden');
        });
    }
});