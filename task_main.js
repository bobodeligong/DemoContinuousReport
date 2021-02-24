var trialNumber = 4;

// define the site that hosts stimuli images
var repo_site = "https://bobodeligong.github.io/DemoContinuousReport/";

// location of the images.
var all_images = [repo_site + 'images/stim/1.svg',
repo_site + 'images/stim/2.svg',
repo_site + 'images/stim/3.svg',
repo_site + 'images/stim/4.svg',
repo_site + 'images/stim/emotion1.png'];

// randomize color index pairs
var colIndex=[];
      for (j = 0; j<trialNumber; j++){
      colIndex[j]=[Math.floor(Math.random()*360), Math.floor(Math.random()*360)]
      };

// Probably would want to randomize the stimuli, but for the demo, setting the stimulus order and the "correct" colors:
/*var color_study_order = {

    image: [1,2,3,4], // i.e. images/stim/1.svg, iamges/stim/2.svg, etc.
    //colIndex: [87,171,327,291],
    // colIndex: [[87,97], [171,181], [327,337], [291,301]], // these refer to the index of the "correct" color within colors.js, the first index means the left one, the second index means the right one
    colIndex: colIndex,
  };
  
  // Probably would want to randomize the stimuli, but for the demo, setting the stimulus order and the "correct" colors:
  var color_test_order = {
  
    image: [1,2,3,4], // i.e. images/stim/1.svg, iamges/stim/2.svg, etc.
    //colIndex: [87,171,327,291], // these refer to the index of the "correct" color within colors.js
    //colIndex: [[87,97], [171,181], [327,337], [291,301]], 
    colIndex: color_study_order.colIndex,
    probLocIndex: [0,1,0,1],
  };
  */

  var stimuliOrder = {
    image:[1,2,3,4],
    colIndex: colIndex,
    probLocIndex:[0,1,0,1],
  }

// study block stimuli
/*var studyStim = [];
	for (i = 0; i < color_study_order.image.length; i++) { //for each trial

		studyStim[i] = {
      stimulus: color_study_order.image[i],
      colIndex: color_study_order.colIndex[i],
    };
	};

// recall block stimuli
var testStim = [];
	for (i = 0; i < color_test_order.image.length; i++) { //for each trial within a block

		testStim[i] = {
      stimulus: color_test_order.image[i],
      colIndex: color_test_order.colIndex[i],
      probLocIndex: color_test_order.probLocIndex[i],
    };
  };
*/

var stimuliIndex =[];
  for (i = 0; i < trialNumber; i++) {
    stimuliIndex[i] = {
      stimulus: stimuliOrder.image[i],
      colIndex: stimuliOrder.colIndex[i],
      probLocIndex: stimuliOrder.probLocIndex[i],
    }
  }

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


/* var emotion_induction ={
  type: 'image-keyboard-response',
  // stimulus: jsPsych.timelineVariable('emotion_stimulus'),
  stimulus: repo_site +'images/stim/emotion1.png',
  choices: ['1','2','3','4'],
  prompt: "<p>Emotion rating from 1 to 4</p>",
  //trial_duration: 4000,
  //data: {
    //emotionIndex: jsPsych.timelineVariable('emotionIndex'),
    //mainExp_part:'emotionInduction'
  //}
};
timeline.push(emotion_induction);
*/

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
      trial_duration: 1000,
      choices: jsPsych.NO_KEYS,
      data: {
        stimulus: jsPsych.timelineVariable('stimulus'),
        colIndex: jsPsych.timelineVariable('colIndex'),
      }
  };

/*var study_procedure = {
    timeline: [fixationWhite, studyBlock],
    timeline_variables: studyStim

}
timeline.push(study_procedure);
*/

// Instructions for Recall Task

/*var instructions_test = {
	type : 'instructions',
	pages: ['DEMO RECALL TASK </br></br>Each image will appear one by one, in white. It will be surrounded by a black circle. ' +
  'The circle acts like a color wheel--move your cursor, and the central image will change color. When the color matches your memory, ' +
  'click the mouse to record your guess. Try to be as accurate as possible. </br></br>' +
'Ready? </br></br>'],
show_clickable_nav: true

}
timeline.push(instructions_test);
*/

/* test trials 
var fixationWhite = {
	type: 'html-keyboard-response',
	stimulus: '<div style="font-size:60px;">+</div>',
	data: {test_part: 'fixation'},
	choices: jsPsych.NO_KEYS,
	trial_duration: 1000

}
*/

var delay ={
  type: 'html-keyboard-response',
	stimulus: '<div style="font-size:60px;">+</div>',
	data: {mainExp_part: 'delay'},
	choices: jsPsych.NO_KEYS,
	trial_duration: 1000
}

var testBlock = {
    type: 'continuous_report',
    stimulus: jsPsych.timelineVariable('stimulus'),
    colIndex: jsPsych.timelineVariable('colIndex'),
    probLocIndex: jsPsych.timelineVariable('probLocIndex'),
    stim_duration: -1,
    data: {
      stimulus: jsPsych.timelineVariable('stimulus'),
      colIndex: jsPsych.timelineVariable('colIndex'),
      probLocIndex: jsPsych.timelineVariable('probLocIndex'),
    }
};

var doubleTestBlock = {
  type: 'continuous_report_double',
  stimulus: jsPsych.timelineVariable('stimulus'),
  colIndex: jsPsych.timelineVariable('colIndex'),
  probLocIndex: jsPsych.timelineVariable('probLocIndex'),
  stim_duration: -1,
  data: {
    stimulus: jsPsych.timelineVariable('stimulus'),
    colIndex: jsPsych.timelineVariable('colIndex'),
    probLocIndex: jsPsych.timelineVariable('probLocIndex'),
  }
};

var test_procedure = {
      timeline: [fixationWhite, studyBlock, delay, testBlock, doubleTestBlock],
      //timeline: [emotion_induction, fixationWhite, studyBlock, delay, testBlock],
	    timeline_variables: stimuliIndex,

}
timeline.push(test_procedure);
  /* var timeline = [instructions_study, study_procedure, instructions_test, test_procedure]; */
