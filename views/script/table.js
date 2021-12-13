$(document).ready(function() {
  $('table.data').DataTable();
  $('td').each(element => {
      console.log(element);
  })
});