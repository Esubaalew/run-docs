# Piping Data

One of `run`'s most powerful features is seamless integration with Unix pipelines.

## Reading from stdin

Your code can read from stdin:

```bash
echo "hello world" | run python "
import sys
text = sys.stdin.read()
print(text.upper())
"
```

Output:
```
HELLO WORLD
```

!!! tip "Backslashes and multiline snippets"
    If your inline snippet contains backslashes (for example regex like `\w`) or lots of quotes, prefer `--code` with `$'...'`, or use a heredoc/pipe code via stdin. This avoids shell‑quoting issues and older `run` versions misreading backslashes as file paths.

## JSON Processing

### Python

```bash
echo '{"name":"Ada","age":30}' | run python "
import sys, json
data = json.load(sys.stdin)
print(f\"{data['name']} is {data['age']} years old\")
"
```

### JavaScript

```bash
echo '{"name":"Ada","age":30}' | run js "
const data = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
console.log(\`\${data.name} is \${data.age} years old\`);
"
```

## Multi-Language Pipelines

Chain different languages together:

```bash
# Python generates JSON
run python "import json; print(json.dumps({'numbers': [1,2,3,4,5]}))" | \
# JavaScript processes it
run js "
const data = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
const doubled = data.numbers.map(n => n * 2);
console.log(JSON.stringify({doubled}));
" | \
# Python displays it
run python "
import sys, json
result = json.load(sys.stdin)
print('Doubled:', result['doubled'])
"
```

Output:
```
Doubled: [2, 4, 6, 8, 10]
```

## Text Processing

```bash
# Count lines
cat file.txt | run python "import sys; print(len(sys.stdin.readlines()))"

# Extract emails
cat text.txt | run python "
import sys, re
text = sys.stdin.read()
emails = re.findall(r'[\w\.-]+@[\w\.-]+', text)
print('\n'.join(emails))
"

# Convert to uppercase
cat file.txt | run ruby "puts STDIN.read.upcase"
```

## CSV Processing

```bash
cat data.csv | run python "
import sys, csv
reader = csv.reader(sys.stdin)
for row in reader:
    print(','.join(row[:3]))  # First 3 columns
"
```

## Next Steps

[Language Detection →](language-detection.md){ .md-button .md-button--primary }
