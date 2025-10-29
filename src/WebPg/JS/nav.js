
document.addEventListener('DOMContentLoaded', () => {
  const navbarContainer = document.getElementById('navbar-container');
  const currentUser = localStorage.getItem('currentUser');

  if (!navbarContainer) return;

  navbarContainer.innerHTML = `
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
    <nav class="navbar">
        <button data-page="index.html" onclick="window.location.href='./index.html'">Home</button>
        <button data-page="todo.html" onclick="window.location.href='todo.html'">ToDo</button>
        <button data-page="Code.html" onclick="window.location.href='Code.html'">Chat</button>
        <button onclick="window.location.href='Code.html'">Editor</button>
        ${
          currentUser
            ? `<button id="logout-btn">Logout</button>`
            : `<button onclick="window.location.href='login.html'">Login</button>`
        }
      </nav>
  `;

  const navButtons = document.querySelectorAll('.navbar > button');

  const currentPage = window.location.pathname.split('/').pop();
  navButtons.forEach(btn => {
    if (btn.dataset.page === currentPage) {
      btn.classList.add('active');
    }
  });

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      localStorage.setItem('activeButton', btn.dataset.page);
    });
  });

  const savedActive = localStorage.getItem('activeButton');
  if (savedActive) {
    navButtons.forEach(btn => {
      if (btn.dataset.page === savedActive) {
        btn.classList.add('active');
      }
    });
  }

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('activeButton');
      window.location.href = 'login.html';
    });
  }
});
