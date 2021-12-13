$(document).ready(function() {
  const table = $('#registros').DataTable({  
    pagingType: "numbers",
  });
  $('input[type="search"]').addClass('form-control mb-2');
  $('select').addClass('form-control mb-2');
  $('.paginate_button').addClass('btn btn-color mx-1');
  $('.paginate_button').removeClass('paginate_button');
  $('.current').removeClass('btn-color');
  $('.current').addClass('border border-color border-1');
  $('#registros_wrapper').on('DOMSubtreeModified', function(){
    $('input[type="search"]').addClass('form-control');
    $('select').addClass('form-control');
    $('.paginate_button').addClass('btn btn-color mx-1');
    $('.paginate_button').removeClass('paginate_button');
    $('.current').removeClass('btn-color');
    $('.current').addClass('border border-color border-1');
  });
  
  const querystring = window.location.search
  const urlparams = new URLSearchParams(querystring);
  if (urlparams && querystring) {
    window.history.pushState({}, document.title, "/registros");
    table.search(urlparams.get('archivo')).draw();
  }
});