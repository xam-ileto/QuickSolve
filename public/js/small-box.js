function formAction() {
  url = window.location.href;
  form = $('#submit');

  if (url.includes('ask')) {
    form.attr('action', 'post/ask');
  } else if (url.includes('edit-post')) {
    form.attr('action', 'post/edit-post');
  } else if (url.includes('edit-comment')) {
    form.attr('action', 'post/edit-comment');
  } else {
    //if searching
    form.attr('action', 'post/search');
  }
}

$(document).ready(() => {
  formAction();
});
