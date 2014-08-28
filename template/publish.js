var fs = require('fs');

exports.publish = function(data, options) {
  data({undocumented: true}).remove();
  var docs = data().get().filter(function(doclet) {
    return doclet.memberof === 'ku';
  }).map(function(doclet) {
    return {
      name: doclet.name,
      returns: doclet.returns[0].type.names.join('|'),
      description: doclet.description,
      example: doclet.examples && doclet.examples[0],
      params: doclet.params.map(function(param) {
        return {
          name: param.name,
          type: param.type.names.join('|')
        };
      })
    };
  });

  fs.writeFileSync('docs.json', JSON.stringify(docs) + '\n');
};
