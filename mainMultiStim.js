<!DOCTYPE html>
<html>
    <head>
        <title>My experiment</title>

        <!-- load relevant libraries -->
        <script src="libraries/jspsych.js"></script>
        <script src="libraries/jquery-min.js" type="text/javascript"> </script>
        <script src="libraries/Snap.svg-0.5.1/dist/snap.svg.js"></script>

        

        <!-- load other jspsych plugins used in this demo.   -->
        <script src="plugins/jspsych-study-color-square.js"></script>
        

        

        <!-- load css files.   -->

        <link rel="stylesheet" href="css/jspsych.css" type="text/css" />
        <link rel="stylesheet" href="css/custom.css" type="text/css" />
       </head>

    <body></body>
</html>


<script>

var timeline = [];



 /*test*/
 var study ={
        type: 'study-color-square',
        trial_duration: 2000
 }
timeline.push(study);



/* start the experiment */
jsPsych.init({
    timeline: timeline,
    //preload_images: all_stimuli,
    on_finish: function(){
        jsPsych.data.displayData();
    }
})  

    </script>
