Gitbook plugin for literate Python
---

A quick and dirty plugin for writing executable Python files that can
also render to html, ebook etc by way of gitbook.

To use, add the "# -*- litpy -*-" pragma to your markdown file, then
write it as if it were an ordinary Python module. The plugin will
convert all module-level docstrings to text and wrap Python in Python
code blocks, so:

```python
# -*- litpy -*-
"""
This will be parsed as *markdown* by gitbook
"""
def this_function_will_be_wrapped():
    # in ```python code blocks
```

... will be converted to:

```html
<p>
  This will be parsed as *markdown* by gitbook
</p>
<pre><code>
def this_function_will_be_wrapped():
    # in ```python code blocks
</code></pre>
```

Since the file has a non-".py" extension, you will need to use the `imp`
module to import it elsewhere, for instance for testing purposes:

```python
import imp
import os

dirname = os.path.dirname(os.path.realpath(__file__))
source_file = os.path.join(dirname, 'knights-tour.md')
knights_tour = imp.load_source('knights_tour', source_file)
```

See [this gitbook page](https://github.com/Bradfield/algorithms-and-data-structures/blob/master/graphs/knights-tour.md) and [corresponding test](https://github.com/Bradfield/algorithms-and-data-structures/blob/master/graphs/knights_tour.test.py) for a full example.
