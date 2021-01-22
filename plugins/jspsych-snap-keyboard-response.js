/**

* plugin for presenting svg images, using the snap.io plugin.
* written by Victoria J.H. Ritvo, 2019

 **/


jsPsych.plugins["snap-keyboard-response"] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'snap-keyboard-response',
    description: 'Uses Snap.io to present images.',
    parameters: {
      stimulus1: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stimulus1',
        default: undefined,
        description: 'The HTML string to be displayed'
      },
      stimulus2: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stimulus2',
        default: undefined,
        description: 'The HTML string to be displayed'
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        array: true,
        pretty_name: 'Choices',
        default: jsPsych.ALL_KEYS,
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show trial before it ends.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when subject makes a response.'
      },

    }
  }

  plugin.trial = function(display_element, trial) {

    var new_html = '<div id="jspsych-html-keyboard-response-stimulus">' + trial.stimulus + '</div>';

    // add prompt
    if (trial.prompt !== null) {
      new_html += trial.prompt;
    }

    // draw
    display_element.innerHTML = new_html;


    // get the current stimulus's file location
    var currStim1 = 'images/stim/' + trial.stimulus1 + '.svg';
    var currStim2 = 'images/stim/' + trial.stimulus2 + '.svg';

    var svgWidth = 200;
    var svgHeight = 200;

    // // create the svg object ? set for each picture?
    display_element.innerHTML = "<svg id='svg', width = '" + svgWidth.toString() + "', height = '" + svgWidth.toString() + "'/svg>" +
      '<div id="jspsych-html-keyboard-response-stimulus"></div>';

    // set the center points (relative to the SVG)
    var centerXSVG = svgWidth / 2;
    var centerYSVG = svgHeight / 2;

    rgbCol = colors.colors[trial.colIndex];
    var currHexColor = Snap.rgb(rgbCol[0], rgbCol[1], rgbCol[2]);


    // create the snap paper ? set for each pic?
    var paper = Snap("#svg");
   


    // // % set the image position based on svg paper dimensions.
    // this may have to be changed depending on the size of the image. The demo images are 100 x 100.

    var imageY1 = centerYSVG - 100;

    // // % set the image position based on svg paper dimensions.
    // this may have to be changed depending on the size of the image. The demo images are 100 x 100.

    var imageXLeft1 = centerXSVG - 100;

    // set the position of the second image
    var imageY2 = centerYSVG;
    var imageXLeft2 = centerXSVG;

    // load in the images
    var g = paper.group();


    Snap.load(currStim1, function(fragment) {
      var element1 = fragment.select('#Layer_1');
      g.add(element1);
      element1.attr({
        width: "100",
        height: "100",
        x: imageXLeft1.toString(), //position of the image, as a string
        y: imageY1.toString(), //position of the image, as a string
        //
      });

      Snap.load(currStim2, function(fragment) {
        var element2 = fragment.select('#Layer_1');
        g.add(element2);
        element2.attr({
          width: "100",
          height: "100",
          x: imageXLeft2.toString(), //position of the image, as a string
          y: imageY2.toString(), //position of the image, as a string
          //
        });

      // select the image itself within the svg
      var shape1 = element1.select('path');
      shape1.attr({
        "fill": currHexColor
      });

      // select the image itself within the svg
      var shape2 = element2.select('path');
      shape2.attr({
        "fill": currHexColor
      });


    });
    var presentation_start = new Date()



    // store response
    var response = {
      rt: null,
      key: null
    };

    // function to end trial when it is time
    var end_trial = function() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }

      // gather the data to store for the trial
      var trial_data = {
        "rt": response.rt,
        "stimulus": trial.stimulus,
        "key_press": response.key
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // function to handle responses by the subject
    var after_response = function(info) {

      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      display_element.querySelector('#jspsych-html-keyboard-response-stimulus').className += ' responded';

      // only record the first response
      if (response.key == null) {
        response = info;
      }

      if (trial.response_ends_trial) {
        end_trial();
      }
    };

    // start the response listener
    if (trial.choices != jsPsych.NO_KEYS) {
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'date',
        persist: false,
        allow_held_key: false
      });
    }

    // hide stimulus if stimulus_duration is set
    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-html-keyboard-response-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }

  }

  return plugin;

})();
