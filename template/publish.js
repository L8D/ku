// this code is so rushed its not even funny

var fs = require('fs');

function makeParam(param) {
  if (param.type.names.length > 1) {
    return '(' + param.type.names.join('|') + ')';
  }

  return param.type.names[0];
}

exports.publish = function(data, options) {
  'use strict';

  data({undocumented: true}).remove();
  var docs = data().get().filter(function(doclet) {
    return doclet.memberof === 'ku';
  }).map(function(doclet) {
    return {
      name: doclet.name,
      returns: makeParam(doclet.returns[0]),
      description: doclet.description,
      example: doclet.examples && doclet.examples[0],
      params: doclet.params.map(function(param) {
        return {
          name: param.name,
          type: makeParam(param)
        };
      })
    };
  });

  docs.forEach(function(doc) {
    var s =
      '---' + '\n' +
      'title: ' + doc.name + '\n' +
      'params: ' + JSON.stringify(doc.params) + '\n' +
      'returns: ' + doc.returns + '\n' +
      '---' + '\n\n';

    s += doc.description + '\n';

    if (doc.example) s += '\n```javascript\n' + doc.example + '\n```';

    fs.writeFileSync('_posts/1-1-1-' + doc.name + '.md', s);
  });
};
