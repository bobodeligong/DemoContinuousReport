// define the site that hosts stimuli images
var repo_site = "https://bobodeligong.github.io/DemoContinuousReport/";

// location of the images.
var all_images = [repo_site + 'images/stim/1.svg',
repo_site + 'images/stim/2.svg',
repo_site + 'images/stim/3.svg',
repo_site + 'images/stim/4.svg'];

// Probably would want to randomize the stimuli, but for the demo, setting the stimulus order and the "correct" colors:
var color_study_order = {

    image: [1,2,3,4], // i.e. images/stim/1.svg, iamges/stim/2.svg, etc.
    colIndex: [87,171,327,291], // these refer to the index of the "correct" color within colors.js
    locationsIndex: [1,2,3,4]
  };
  
  // Probably would want to randomize the stimuli, but for the demo, setting the stimulus order and the "correct" colors:
  var color_test_order = {
  
    image: [1,2,3,4], // i.e. images/stim/1.svg, iamges/stim/2.svg, etc.
    colIndex: [87,171,327,291], // these refer to the index of the "correct" color within colors.js
  };

// study block stimuli
var studyStim = [];
	for (i = 0; i < color_study_order.image.length; i++) { //for each trial

		studyStim[i] = {
      stimulus: color_study_order.image[i],
      colIndex: color_study_order.colIndex[i],
      locationsIndex:color_study_order.locationsIndex[i],
    };
	};

// recall block stimuli
var testStim = [];
	for (i = 0; i < color_test_order.image.length; i++) { //for each trial within a block

		testStim[i] = {
      stimulus: color_test_order.image[i],
      colIndex: color_test_order.colIndex[i],
    };
	};

/* create timeline */
var timeline = [];

// Instructions for Study Task
var instructions_study = {
	type : 'instructions',
	pages: ['DEMO STUDY TASK </br></br> Each image will appear one by one. Study the color of each image. You will be asked to recall the colors later.</br></br>' +
'Ready? </br></br>'],
show_clickable_nav: true

};
timeline.push(instructions_study);

/* study trials */
var fixationWhite = {
	type: 'html-keyboard-response',
	stimulus: '<div style="font-size:60px;">+</div>',
	data: {test_part: 'fixation'},
	choices: jsPsych.NO_KEYS,
	trial_duration: 1000

}



var studyBlock = {
      type: 'snap-keyboard-response',
      stimulus: jsPsych.timelineVariable('stimulus'),
      colIndex: jsPsych.timelineVariable('colIndex'),
      locationsIndex:jsPsych.timelineVariable('locationsIndex'),
      trial_duration: 1000,
      choices: jsPsych.NO_KEYS,
      data: {
        stimulus: jsPsych.timelineVariable('stimulus'),
        colIndex: jsPsych.timelineVariable('colIndex'),
        locationsIndex:jsPsych.timelineVariable('locationsIndex'),
      }
  };

var study_procedure = {
    timeline: [fixationWhite, studyBlock],
    timeline_variables: studyStim

}
timeline.push(study_procedure);


// Instructions for Recall Task

var instructions_test = {
	type : 'instructions',
	pages: ['DEMO RECALL TASK </br></br>Each image will appear one by one, in white. It will be surrounded by a black circle. ' +
  'The circle acts like a color wheel--move your cursor, and the central image will change color. When the color matches your memory, ' +
  'click the mouse to record your guess. Try to be as accurate as possible. </br></br>' +
'Ready? </br></br>'],
show_clickable_nav: true

}
timeline.push(instructions_test);

/* test trials */
var fixationWhite = {
	type: 'html-keyboard-response',
	stimulus: '<div style="font-size:60px;">+</div>',
	data: {test_part: 'fixation'},
	choices: jsPsych.NO_KEYS,
	trial_duration: 1000

}

var testBlock = {
    type: 'continuous_report',
    stimulus: jsPsych.timelineVariable('stimulus'),
    colIndex: jsPsych.timelineVariable('colIndex'),
    stim_duration: -1,
    data: {
      stimulus: jsPsych.timelineVariable('stimulus'),
      colIndex: jsPsych.timelineVariable('colIndex'),
    }
};


var test_procedure = {
	    timeline: [fixationWhite, testBlock],
	    timeline_variables: testStim

}
timeline.push(test_procedure);
  /* var timeline = [instructions_study, study_procedure, instructions_test, test_procedure]; */