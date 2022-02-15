createCommentDiv = (parentDiv, passedContent, author, authorId, commentId) => {
  currentUsername = $('#currentUser').text();

  var commentDiv = document.createElement('div');
  $(commentDiv).addClass('individual-comment');

  // create comment text
  // for username
  var username = document.createElement('a');
  $(username).attr('class', 'posted-by');
  $(username).attr('href', '/account/view/' + authorId);
  $(username).attr('title', 'View Account');
  $(username).text(author);
  $(commentDiv).append(username);
  // for 'answers: '
  var answers = document.createElement('h1');
  $(answers).attr('class', 'posted-by');
  $(answers).text(' answers: ');
  $(commentDiv).append(answers);
  // for content
  var content = document.createElement('p');
  $(content).attr('class', 'posted-by');
  $(content).text(passedContent);
  $(commentDiv).append(content);

  // for edit button
  var editForm = document.createElement('form');
  $(editForm).attr('action', '/post/edit-comment/' + commentId);
  $(editForm).attr('method', 'get');
  $(editForm).attr('id', commentId);

  var editButton = document.createElement('button');
  $(editButton).attr('type', 'submit');
  $(editButton).attr('form', commentId);

  var editIcon = document.createElement('i');
  $(editIcon).attr('class', 'far fa-edit');

  $(editButton).append(editIcon);
  $(editForm).append(editButton);
  $(commentDiv).append(editForm);

  // for delete button
  var deleteButton = document.createElement('button');
  $(deleteButton).attr('class', 'deleteComment ' + commentId);
  $(deleteButton).attr('type', 'button');

  var deleteIcon = document.createElement('i');
  $(deleteIcon).attr('class', 'fas fa-trash-alt ' + commentId);

  $(deleteButton).append(deleteIcon);
  $(commentDiv).append(deleteButton);

  // add on click for delete button
  $(deleteButton).on('click', deleteComment);

  // append comment to comment section
  $(parentDiv).append(commentDiv);
};

deleteComment = (event) => {
  console.log('delete comment');
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
};

$(document).ready(() => {
  $('#addComment').click(() => {
    postId = window.location.href.substring(
      window.location.href.lastIndexOf('/') + 1
    );
    content = $('textarea#commentContent').val();
    console.log(content);

    data = { content: content };

    $.post('submit/' + postId, data, (data, status) => {
      console.log('data received');
      console.log(data);

      // all important data needed for comment
      var functionData = {
        parentDiv: $('#comment-section'),
        passedContent: content,
        author: data.account,
        authorId: data.accountId,
        commentId: data.commentId,
      };

      // console.log(functionData);

      // dynamically add comment to page
      createCommentDiv(
        functionData.parentDiv,
        functionData.passedContent,
        functionData.author,
        functionData.authorId,
        functionData.commentId
      );
    });
  });

  $('.deleteComment').on('click', deleteComment);
});
