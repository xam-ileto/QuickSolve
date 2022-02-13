$(document).ready(() => {
  console.log('in post-page.js');
  //   console.log(window.location.href);

  $('#addComment').click(() => {
    console.log('in fx');
    currentUsername = $('#currentUser').text();

    var commentDiv = document.createElement('div');
    $(commentDiv).addClass('individual-comment');

    // create comment text
    // for username
    var username = document.createElement('h1');
    $(username).attr('class', 'posted-by');
    $(username).text(currentUsername);
    $(commentDiv).append(username);
    // for 'answers: '
    var usernameLink = document.createElement('a');
    $(usernameLink).attr('class', 'posted-by');
    $(usernameLink).attr('title', 'View Account Details');
    // TO DO: add account details
    $(usernameLink).attr('href', '/acct details');
    $(usernameLink).text(' answers: ');
    $(commentDiv).append(usernameLink);
    // for content
    console.log($('textarea#commentContent'));
    console.log($('textarea#commentContent').text());
    var content = document.createElement('p');
    $(content).attr('class', 'posted-by');
    $(content).text($('textarea#commentContent').val());
    $(commentDiv).append(content);
    // for edit button
    var edit = document.createElement('a');
    $(edit).attr('title', 'Edit Comment');
    // TO DO: change href
    $(edit).attr('href', '/temp');
    var editPic = document.createElement('i');
    $(editPic).attr('class', 'far fa-edit');
    $(edit).append(editPic);
    $(commentDiv).append(edit);
    // for delete button
    var deleteComment = document.createElement('a');
    $(deleteComment).attr('title', 'Delete Comment');
    // TO DO: change href
    $(deleteComment).attr('href', '/temp');
    var deletePic = document.createElement('i');
    $(deletePic).attr('class', 'fas fa-trash-alt');
    $(deleteComment).append(deletePic);
    $(commentDiv).append(deleteComment);

    $('.post-comment').append(commentDiv);
  });

  $('.deleteComment').click((event) => {
    commentId = $(event.target).attr('class').split(' ').pop();
    console.log('commentId: ' + commentId);
    data = {
      commentId: commentId,
    };

    $.post('/post/comment/delete', data, (data, status) => {
      console.log($('.' + data));
      currentElement = $('.' + data);

      parent = currentElement.closest('.individual-comment');
      parent.remove();
    });
  });
});
