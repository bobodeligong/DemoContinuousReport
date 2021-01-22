jsPsych.plugins['study-color-square'] = (function(){

  var plugin = {};

  plugin.info = {
    name: 'study-color-square',
    description:'Present color squares simultaneously',
    parameters: {
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show trial before it ends.'
      }
    }
  }


  plugin.trial = function(display_element, trial){
    var s=Snap("#svg");
    var colorSquare1 = s.rect(10,10,50,50);
    colorSquare1.attr({
      fill:"#ffebee"
    });
    var colorSuare1 = s.rect(60,60,50,50);
    colorSquare2.attr({
      fill:"#E3F2FD"
    })

    // clear the display
    display_element.innerHTML = '';

    
    jsPsych.finishTrial();
  }

  return plugin;

})();