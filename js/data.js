'use strict';

function load_data(){
    core_entity_create({
      'properties': {
        'x': canvas_x,
        'y': canvas_y,
      },
      'types': [
        'object',
      ],
    });
}
