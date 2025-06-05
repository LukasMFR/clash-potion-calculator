// i18n.js - simple client-side translations
(function() {
  const translations = {
    en: {
      nav_home: 'Home',
      nav_simple: 'Simple Calc',
      nav_builder: 'Builder Potion',
      nav_research: 'Research Potion',
      nav_pet: 'Pet Potion',
      nav_about: 'About',
      lang_label: 'Language',
      simple_title: 'Simple Calculator',
      simple_placeholder: 'Enter a duration and click Calculate.\nThe result will appear here!',
      builder_title: 'Builder Potion Calculator',
      research_title: 'Research Potion Calculator',
      pet_title: 'Pet Potion Calculator',
      index_subtitle: 'Fast & easy upgrade time calculations for Clash of Clans!',
      by_potions: 'By Potions',
      by_boost: 'By Boost Time Left',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      builder_potions: 'Builder Potions',
      research_potions: 'Research Potions',
      pet_potions: 'Pet Potions',
      boost_hours_left: 'Boost Hours Left',
      boost_minutes_left: 'Boost Minutes Left',
      upgrade_days_left: 'Upgrade Days Left',
      upgrade_hours_left: 'Upgrade Hours Left',
      upgrade_minutes_left: 'Upgrade Minutes Left',
      calculate: 'Calculate',
      placeholder_upgrade: 'Enter an upgrade duration and number of potions,\nthen click <b>Calculate</b>.\nYour result will appear here!',
      about_intro: 'Clash Potion Calculator is a fan-made tool for Clash of Clans players, built to help you quickly and easily calculate upgrade or research finish times when using potions.<br><br>Created with ❤️ by <strong>Lukas Mauffré</strong> (<a href="https://github.com/LukasMFR/clash-potion-calculator" target="_blank" rel="noopener" class="about__link">view source on GitHub</a>).',
      about_disclaimer: 'This project is <strong>not affiliated with, endorsed, sponsored, or specifically approved by Supercell or Clash of Clans</strong>.<br>Clash of Clans and Supercell are trademarks or registered trademarks of Supercell Oy. For more information, see <a href="https://supercell.com/fan-content-policy" target="_blank" rel="noopener" class="about__link">Supercell’s Fan Content Policy</a>.',
      about_support_title: '☕ Support the Project',
      about_support_intro: 'If you found this tool helpful and want to support my work, you can buy me a coffee here:',
      about_support_thanks: 'Thank you so much!',
      about_meta: '<strong>Version:</strong> 1.0<br><strong>Source code:</strong> <a href="https://github.com/LukasMFR/clash-potion-calculator" target="_blank" rel="noopener" class="about__link">GitHub Repository</a>'
    },
    fr: {
      nav_home: 'Accueil',
      nav_simple: 'Calcul simple',
      nav_builder: 'Potion de constructeur',
      nav_research: 'Potion de recherche',
      nav_pet: 'Potion d\'animal',
      nav_about: 'À propos',
      lang_label: 'Langue',
      simple_title: 'Calculateur simple',
      simple_placeholder: 'Saisissez une durée puis cliquez sur Calculer.\nLe résultat apparaîtra ici !',
      builder_title: 'Calculateur de potion de constructeur',
      research_title: 'Calculateur de potion de recherche',
      pet_title: 'Calculateur de potion d\'animal',
      index_subtitle: 'Calculez facilement vos temps d\'amélioration sur Clash of Clans !',
      by_potions: 'Par potions',
      by_boost: 'Par temps de boost restant',
      days: 'Jours',
      hours: 'Heures',
      minutes: 'Minutes',
      builder_potions: 'Potions de constructeur',
      research_potions: 'Potions de recherche',
      pet_potions: 'Potions d\'animal',
      boost_hours_left: 'Heures de boost restantes',
      boost_minutes_left: 'Minutes de boost restantes',
      upgrade_days_left: 'Jours restants',
      upgrade_hours_left: 'Heures restantes',
      upgrade_minutes_left: 'Minutes restantes',
      calculate: 'Calculer',
      placeholder_upgrade: 'Saisissez une durée d\'amélioration et le nombre de potions,\npuis cliquez sur <b>Calculer</b>.\nVotre résultat apparaîtra ici !',
      about_intro: 'Clash Potion Calculator est un outil créé par un fan pour aider les joueurs de Clash of Clans à calculer facilement la fin de leurs améliorations ou recherches lorsqu\'ils utilisent des potions.<br><br>Créé avec ❤️ par <strong>Lukas Mauffré</strong> (<a href="https://github.com/LukasMFR/clash-potion-calculator" target="_blank" rel="noopener" class="about__link">voir le code sur GitHub</a>).',
      about_disclaimer: 'Ce projet n\'est <strong>pas affilié, approuvé ou sponsorisé par Supercell ou Clash of Clans</strong>.<br>Clash of Clans et Supercell sont des marques de Supercell Oy. Pour plus d\'informations, consultez <a href="https://supercell.com/fan-content-policy" target="_blank" rel="noopener" class="about__link">la politique Fan Content de Supercell</a>.',
      about_support_title: '☕ Soutenir le projet',
      about_support_intro: 'Si cet outil vous aide et que vous souhaitez soutenir mon travail, vous pouvez m\'offrir un café ici :',
      about_support_thanks: 'Merci beaucoup !',
      about_meta: '<strong>Version :</strong> 1.0<br><strong>Code source :</strong> <a href="https://github.com/LukasMFR/clash-potion-calculator" target="_blank" rel="noopener" class="about__link">Dépôt GitHub</a>'
    }
  };

  function applyTranslations(lang) {
    const t = translations[lang] || translations.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
          el.setAttribute('placeholder', t[key]);
        } else {
          el.innerHTML = t[key];
        }
      }
    });
  }

  function initLanguage() {
    const saved = localStorage.getItem('lang');
    let lang = saved || (navigator.language || 'en');
    if (lang.toLowerCase().startsWith('fr')) lang = 'fr';
    else lang = 'en';
    const select = document.getElementById('lang-select');
    if (select) {
      select.value = lang;
      select.addEventListener('change', () => {
        const l = select.value;
        localStorage.setItem('lang', l);
        applyTranslations(l);
      });
    }
    applyTranslations(lang);
  }

  document.addEventListener('DOMContentLoaded', initLanguage);
})();
