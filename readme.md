Gitbook plugin for literate Python
---

A quick and dirty plugin for writing executable Python files that can
also render to html, ebook etc by way of gitbook.

To use, name your files "foo.litpy.md" etc, then use module-level
docstrings for text and ordinary Python for Python code blocks, like so:

```python
"""
This will be parsed as *markdown* by gitbook
"""
def this_function_will_be_wrapped():
    # in ```python code blocks
```

Since the file has a non-".py" extension, you will need to use the `imp`
module to import it:

```python
my_module = imp.load_source('my_module', 'my_module.litpy.md')
```
