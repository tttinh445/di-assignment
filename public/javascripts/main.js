$(document).ready(() => {
  // logout
  $('#logout-btn').click((e) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('accessToken');
    window.location.href = '/auth/login';
  });

  // show user name
  if (localStorage.getItem('userInfo')) {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    $('#tag-user-name').text(userInfo.fullName)
  }

});
