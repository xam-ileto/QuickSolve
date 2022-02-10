$(document).ready(() => {
  url = window.location.href;
  form = $('#submit');

  postId = url.substring(url.lastIndexOf('/') + 1);

  if (url.includes('ask')) {
    // if posting a question
    form.attr('action', '/post/question');
  } else if (url.includes('edit-post')) {
    // if editing a post
    form.attr('action', '/post/edit-post/' + postId);
  } else if (url.includes('edit-comment')) {
    // if editing a comment
    form.attr('action', '/edit-comment');
  } else {
    //if searching
    form.attr('action', '/search');
  }
});
