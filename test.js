var plugin = require('./index');
var transformContent = plugin.transformContent;

var green = '\x1b[32m';
var red = '\x1b[31m';
var reset = '\x1b[0m'

var assertEqual = function (expectation, result) {
  if (expectation !== result) {
    console.error(
      red + 'Expected:\n\n'
      + reset + expectation
      + red + '\n\ngot:\n\n'
      + reset + result);
    process.exit(1);
  }
  console.log(green + 'OK' + reset)
}

var transformationExpectations = [
  [
    '"""\na comment\n"""\ndef func(n):\n    pass\n',
    '\na comment\n```python\ndef func(n):\n    pass\n```'
  ],
  [
    'def func(n):\n    pass\n"""\na comment\n"""\n',
    '```python\ndef func(n):\n    pass\n```\na comment\n'
  ],
  [
    '\n"""\n1\n"""\n#2\n"""\n3\n"""',
    '\n1\n```python\n#2\n```\n3\n'
  ],
  [
    '\n"""\n1\n"""\n#2\n"""\n3\n"""\n#4\n',
    '\n1\n```python\n#2\n```\n3\n```python\n#4\n```'
  ],
  [
    '# -*- coding: utf-8 -*-\n"""\nfoo\n"""\n',
    '\nfoo\n'
  ]
];

transformationExpectations.forEach(function (testCase) {
  var input = testCase[0];
  var expectation = testCase[1];
  var output = transformContent(input);

  assertEqual(expectation, output)
})
