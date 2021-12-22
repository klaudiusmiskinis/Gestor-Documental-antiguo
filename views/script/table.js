$(document).ready(function() {
  
  const tableArchivos = $('#registros').DataTable({  
    pagingType: "numbers",
  });
  const tableVersiones = $('#versiones').DataTable({  
    pagingType: "numbers",
  });

  $('input[type="search"]').addClass('form-control mb-2');
  $('select').addClass('form-control mb-2');
  $('.paginate_button').addClass('btn btn-color mx-1');
  $('.paginate_button').removeClass('paginate_button');
  $('.current').removeClass('btn-color');
  $('.current').addClass('border border-color border-1');
  $('#registros_wrapper').on('DOMSubtreeModified', function(){
    dataTableStyle();
  });
  $('#archivos_wrapper').on('DOMSubtreeModified', function(){
    dataTableStyle();
  });

  function dataTableStyle() {
    $('input[type="search"]').addClass('form-control');
    $('select').addClass('form-control');
    $('.paginate_button').addClass('btn btn-color mx-1');
    $('.paginate_button').removeClass('paginate_button');
    $('.current').removeClass('btn-color');
    $('.current').addClass('border border-color border-1');
  }
  
  const querystring = window.location.search
  const urlparams = new URLSearchParams(querystring);
  if (urlparams && querystring) {
    window.history.pushState({}, document.title, "/registros");
    tableVersiones.search(urlparams.get('archivo')).draw();
    tableArchivos.search(urlparams.get('archivo')).draw();
  }
});