function remark() {
  return {
    use: function(plugin) {
      return this;
    },
    processSync: function(markdown) {
      return {
        toString: function() {
          // Simple markdown to HTML conversion for tests
          return markdown
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^\* (.*$)/gim, '<li>$1</li>')
            .replace(/^- \[x\] (.*$)/gim, '<li><input type="checkbox" checked disabled /> $1</li>')
            .replace(/^- \[ \] (.*$)/gim, '<li><input type="checkbox" disabled /> $1</li>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/^(.+)$/gm, function(match) {
              if (!match.startsWith('<')) {
                return '<p>' + match + '</p>';
              }
              return match;
            })
            .replace(/\n/g, '<br>');
        }
      };
    }
  };
}

module.exports = remark;
