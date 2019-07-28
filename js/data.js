'use strict';

function load_data(){
    entity_create({
      'id': 'obstacle',
      'properties': {
        'x': canvas_properties['width-half'],
        'y': canvas_properties['height-half'],
      },
      'types': [
        'object',
      ],
    });
}
