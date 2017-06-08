'use strict';

function draw_logic(){
    // Draw drops.
    canvas_buffer.fillStyle = '#aaf';
    for(var drop in drops){
        canvas_buffer.fillRect(
          drops[drop]['x'],
          drops[drop]['y'],
          2,
          7
        );
    }

    // Draw object.
    canvas_buffer.fillStyle = '#777';
    canvas_buffer.fillRect(
      object['x'],
      object['y'],
      object['width'],
      object['height']
    );

    // Draw number of particles.
    canvas_buffer.fillStyle = '#fff';
    canvas_buffer.fillText(
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
          'x': core_random_integer({
            'max': canvas_width,
          }),
          'y': -99,
        });
    }while(loop_counter--);

    // Update drop positions.
    for(var drop in drops){
        drops[drop]['y'] += core_random_integer({
          'max': 9,
        }) + 9;

        // Delete drops below bottom of screen
        //   or that collided with the object.
        if(drops[drop]['y'] > canvas_height
          || !(
            drops[drop]['x'] <= object['x']
            || drops[drop]['y'] - object['height'] <= object['y']
            || drops[drop]['x'] - object['width'] >= object['x']
            || drops[drop]['y'] >= object['y']
          )){
            drops.splice(
              drop,
              1
            );
        }
    }
}

function repo_init(){
    core_repo_init({
      'title': 'Rain-2D.htm',
    });
    core_events_bind({
      'keybinds': {
        83: {
          'todo': function(){
              drop_counter = Math.max(
                drop_counter - 1,
                0
              );
          },
        },
        87: {
          'todo': function(){
              drop_counter++;
          },
        },
      },
      'mousebinds': {
        'mousedown': {
          'todo': function(){
              object['x'] = core_mouse['x'];
              object['y'] = core_mouse['y'];
          },
        },
        'mousemove': {
          'todo': function(){
              if(core_mouse['down']){
                  object['x'] = core_mouse['x'];
                  object['y'] = core_mouse['y'];
              }
          },
        },
      },
    });
    canvas_init();

    drops.length = 0;
    drop_counter = 0;
    object = {
      'height': -40,
      'width': 200,
      'x': canvas_width / 2,
      'y': canvas_height / 2,
    };
}

var drop_counter = 0;
var drops = [];
var object = {};
