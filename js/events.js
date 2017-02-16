function initialiseClicks(){
  $( ".teach" ).click(function() {
    trainNetwork(100, 0.05);
  });
  $( ".training" ).click(function() {
    if($(".training").text() == "Receiving data..."){
      isTraining = false;
      $(".training").text("Utilising data...");
    } else {
      isTraining = true;
      $(".training").text("Receiving data...");
    }
  });
}
