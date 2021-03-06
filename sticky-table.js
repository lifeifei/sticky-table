$(function() {
  var columnHeaders = _(_.range(10)).map(function(element) {
    return "column header" + element;
  });
  var rowHeaders =  _(_.range(2)).map(function(element) {
    return " row headerrow headerrow headerrow headerrow headerrow header" + element;
  });
  var rows = _(_.range(2)).map(function(value) {
    var rowValues = _(_.range(10)).map(function(element) {
      return "row value" + value + ":" + element;
    });
    return {rowValues: rowValues};
  });
  var data = { columnHeaders: columnHeaders, rowHeaders: rowHeaders, rows: rows};
  var source   = $("#table-template").html();
  var template = Handlebars.compile(source);
  $('#table-container').html(template(data));

  var setRowHeight =  function() {
      $(".row-headers").find("tr").each(function(trIndex, tr) {
        var headerTrHeight = $(tr).height();
        var mainTableTr = $(".main-table tr:eq('"+trIndex + "')");
        var mainTableTrHeight = mainTableTr.height();
        if(headerTrHeight > mainTableTrHeight) {
          mainTableTr.css('height', headerTrHeight + 'px');
        } else {
          headerTrHeight.css('height', mainTableTrHeight + 'px');
        }
      });
  };

  setRowHeight();

  var onMouseWheel = function(event) {
    event.preventDefault();
    var mouseWheelEvent = event.originalEvent;
    var horizontal = mouseWheelEvent.deltaX;
    var vertical = mouseWheelEvent.deltaY;
    if(Math.abs(horizontal) > Math.abs(vertical)) {
      $('.main-table').scrollLeft($('.main-table').scrollLeft() - horizontal * 30)
    } else {
      $('.main-table').scrollTop($('.main-table').scrollTop() - vertical * 30)
    }
  };

  $('.main-table').on('scroll', function () {
    $('.column-headers').scrollLeft($(this).scrollLeft());
    $('.row-headers').scrollTop($(this).scrollTop()) ;
  });


  $('.main-table').on('mousewheel', onMouseWheel);
});
