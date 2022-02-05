function formAction() {
  url = window.location.href;
  form = $('#submit').get();

  if (url.includes('login')) {
    form.action = '/login/submit';
  } else {
    form.action = '/login/register';
  }
}

$(document).ready(() => {
  formAction();
});
