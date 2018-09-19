'use strict';

function load_data(){
    core_entity_create({
      'id': id_count,
      'properties': {
        'x': canvas_properties['width-half'],
        'y': canvas_properties['height-half'],
      },
      'types': [
        'object',
      ],
    });
    id_count++;
}
