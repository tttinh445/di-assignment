$(document).ready(() => {
  // logout
  $('#logout-btn').click((e) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('accessToken');
    window.location.href = '/auth/login';
  });
});
