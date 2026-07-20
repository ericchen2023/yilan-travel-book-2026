(() => {
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('yilan-theme');

  if (storedTheme === 'dark') body.classList.add('dark');

  themeToggle?.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('yilan-theme', body.classList.contains('dark') ? 'dark' : 'light');
  });

  const exportPdf = () => window.print();
  document.getElementById('printButton')?.addEventListener('click', exportPdf);
  document.getElementById('mobilePrint')?.addEventListener('click', exportPdf);

  let deferredPrompt;
  const installButton = document.getElementById('installButton');
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredPrompt = event;
    if (installButton) installButton.hidden = false;
  });
  installButton?.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installButton.hidden = true;
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'));
  }
})();
