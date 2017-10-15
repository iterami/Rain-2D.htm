'use strict';

function load_data(){
    core_entity_create({
      'properties': {
        'x': canvas_properties['width-half'],
        'y': canvas_properties['height-half'],
      },
      'types': [
        'object',
      ],
    });
}

var drop_counter = 0;
