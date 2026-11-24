/* =========================================================
   SpendFlow — Google Analytics 4 helper
   Measurement ID: G-HHGRRJKB9T (set in index.html)
   Privacy: koi naam, password, amount ya reason GA ko nahi
   bheja jata — sirf anonymous events.
   ========================================================= */

// Safe wrapper: agar ad-blocker GA block kar de to bhi app crash nahi hoga
function trackEvent(name, params) {
  try {
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  } catch (e) { /* analytics kabhi app ko break na kare */ }
}

// Virtual page view (kyunke ye single-page app hai)
function trackScreen(screenName) {
  try {
    if (typeof window.gtag !== 'function') return;
    var slug = '#' + screenName.toLowerCase().replace(/\s+/g, '-');
    window.gtag('event', 'page_view', {
      page_title: screenName,
      page_location: location.origin + location.pathname + slug,
      page_path: location.pathname + slug
    });
  } catch (e) {}
}

// Pehli screen = Login
trackScreen('Login');

// Menu / button clicks -> screen views + button events (event delegation)
(function () {
  var SCREENS = {
    menuReceivablesBtn: 'Receivables',
    menuTasksBtn:       'Tasks',
    menuMainBtn:        'Main',
    menuMain1Btn:       'Main 1',
    menuMain2Btn:       'Main 2',
    menuNoteBtn:        'Note',
    menuAboutBtn:       'About',
    menuTrashBtn:       'Trash'
  };
  var CLICKS = {
    authCreateBtn:   'open_create_account',
    menuDotsBtn:     'open_menu',
    searchToggleBtn: 'open_search'
  };

  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('button') : null;
    if (!el || !el.id) return;
    if (SCREENS[el.id]) trackScreen(SCREENS[el.id]);
    else if (CLICKS[el.id]) trackEvent(CLICKS[el.id]);
  }, true);
})();
