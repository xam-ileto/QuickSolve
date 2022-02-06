function formAction() {
  url = window.location.href;
  form = $('#submit');

  if (url.includes('login')) {
    form.attr('action', 'login');
  } else {
    form.attr('action', 'register/submit');
  }
}

$(document).ready(() => {
  console.log('test');
  formAction();
});
