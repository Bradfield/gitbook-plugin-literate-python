var flow = function() {
  var funcs = arguments;
  return function() {
    var args = arguments;
    for (var i = 0; i < funcs.length; i++) {
      args = [funcs[i].apply(this, args)];
    }
    return args[0];
  };
};

var invert = function (content) {
  return '```python\n'
    + content.replace(/^"""\n([\s\S]+?)\n^"""/gm, '```\n$1\n```python')
    + '\n```';
};

var removeEmptyCodeBlocks = function (content) {
  return content.replace(/```python\n+```/g, '');
};

var stripNewlinesInCodeBlocks = function (content) {
  return content
    .replace(/```python\n+/g, '```python\n')
    .replace(/\n+```/g, '\n```');
};

var removePragmas = function (content) {
  return content.replace(/# -\*-.+-\*-\n/g, '')
}

var transformContent = function (content) {
  return flow(
    removePragmas,
    invert,
    removeEmptyCodeBlocks,
    stripNewlinesInCodeBlocks
  )(content);
};

var isLitpyFile = function (content) {
  return content.search(/# -\*- litpy -\*-/) !== -1
};

module.exports = {

  hooks: {

    'page:before': function (page) {
      if (isLitpyFile(page.content)) {
        page.content = transformContent(page.content);
      }
      return page
    },

	},

  transformContent: transformContent,

};
