var Q = require('q');
var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var stylus = require('stylus');

// Compile a Stylus file into a css file
function renderStylus(input, output) {
    var d = Q.defer();

    fs.readFile(input, 'utf8', function (err, data) {
      if (err) {
        return book.log.error.ln(err);
      }

      stylus.render(data, {
        filename: input
      }, function (e, css) {
        if (e) return d.reject(e);

        fs.writeFileSync(output, css);
        d.resolve();
      });
    });

    return d.promise;
}

module.exports = {
    hooks: {
        // Compile stylus as CSS
        init: function() {
            var book = this;

            var styles = book.config.get('styles');

            return _.reduce(styles, function(prev, filename, type) {
                return prev.then(function() {
                    var extension = path.extname(filename).toLowerCase();
                    if (extension != '.styl') return;

                    book.log.info.ln('compile stylus file: ', filename);

                    // Temporary CSS file
                    var tmpfile = type + '-' + Date.now() + '.css';

                    // Replace config
                    book.config.set('styles.' + type, tmpfile);

                    return renderStylus(
                        book.resolve(filename),
                        path.resolve(book.output.root(), tmpfile)
                    );
                });
            }, Q());
        }
    }
};
