function initialiseClicks(){
  $( ".teach" ).click(function() {
    trainNetwork(100, 0.05);
  });

  $( ".import" ).click(function() {
    importNetwork();
  });

  $( ".export" ).click(function() {
    exportNetwork();
  });

  $(function() {
  $('#toggle-two').bootstrapToggle({
    on: 'Using network',
    off: 'Receiving data'
  });
})


}

jQuery(function ($) {
    $('.panel-heading span.clickable').on("click", function (e) {
        if ($(this).hasClass('panel-collapsed')) {
            // expand the panel
            $(this).parents('.panel').find('.panel-body').slideDown();
            $(this).removeClass('panel-collapsed');
            $(this).find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        }
        else {
            // collapse the panel
            $(this).parents('.panel').find('.panel-body').slideUp();
            $(this).addClass('panel-collapsed');
            $(this).find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        }
    });
});
