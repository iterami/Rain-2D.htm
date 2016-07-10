'use strict';

function draw_logic(){
    // Draw drops.
    buffer.fillStyle = '#aaf';
    for(var drop in drops){
        buffer.fillRect(
          drops[drop]['x'],
          drops[drop]['y'],
          2,
          7
        );
    }

    // Draw object.
    buffer.fillStyle = '#777';
    buffer.fillRect(
      object['x'],
      object['y'],
      200,
      -40
    );

    // Draw number of particles.
    buffer.fillStyle = '#fff';
    buffer.fillText(
      drops.length,
      object['x'],
      object['y']
    );
}

function logic(){
    // Add some randomly placed drops.
    var loop_counter = drop_counter;
    do{
        drops.push({
          'x': Math.floor(Math.random() * width),
          'y': -99,
        });
    }while(loop_counter--);

    // Update drop positions.
    for(var drop in drops){
        drops[drop]['y'] += Math.random() * 9 + 9;

        // Delete drops below bottom of screen
        //   or that collided with the object.
        if(drops[drop]['y'] > height
          || !(
            drops[drop]['x'] <= object['x']
            || drops[drop]['y'] + 40 <= object['y']
            || drops[drop]['x'] - 200 >= object['x']
            || drops[drop]['y'] >= object['y']
          )){
            drops.splice(
              drop,
              1
            );
        }
    }
}

var drop_counter = 1;
var drops = [];
var object = {
  'x': 0,
  'y': 0,
};

window.onload = function(e){
    init_canvas();
    input_init(
      {
        187: {
          'todo': function(){
              drop_counter++;
          },
        },
        189: {
          'todo': function(){
              drop_counter = drop_counter > 0
                ? drop_counter - 1
                : 0;
          },
        },
      },
      {
        'mousedown': {
          'todo': function(){
              object['x'] = input_mouse['x'] - 100;
              object['y'] = input_mouse['y'];
          },
        },
        'mousemove': {
          'todo': function(){
              if(!input_mouse['down']){
                  return;
              }

              object['x'] = input_mouse['x'] - 100;
              object['y'] = input_mouse['y'];
          },
        },
      }
    );

    object['x'] = width / 2 - 100;
    object['y'] = height / 2;
};
