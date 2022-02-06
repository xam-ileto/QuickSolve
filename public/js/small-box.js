function formAction() {
  url = window.location.href;
  form = $('#submit');

  if (url.includes('ask')) {
    form.attr('action', '/post/question');
  } else if (url.includes('edit-post')) {
    form.attr('action', '/edit-post');
  } else if (url.includes('edit-comment')) {
    form.attr('action', '/edit-comment');
  } else {
    //if searching
    form.attr('action', '/search');
  }
}

$(document).ready(() => {
  formAction();
});
