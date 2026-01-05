export function renderMarkdown(markdown) {
  if (!markdown || typeof markdown !== 'string') {
    return '';
  }

  // Trim whitespace to handle edge cases
  const trimmed = markdown.trim();
  if (trimmed.length === 0) {
    return '';
  }

  if (/^<[^>]+>[\s\S]*<\/[^>]+>$/.test(trimmed)) {
    return trimmed;
  }

  const escapeHtml = (str) => str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const renderInline = (text) => {
    let out = text;

    out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
    out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    out = out.replace(/~~([^~]+)~~/g, '<del>$1</del>');
    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
    out = out.replace(/(?<!href=")(?<!href=')(?<!src=")(?<!src=')(https:\/\/[^\s<]+)(?![^<]*>)/g, '<a href="$1">$1</a>');

    return out;
  };

  const lines = trimmed.split(/\r?\n/);

  const blocks = [];
  let i = 0;

  const renderList = (startIndex, ordered) => {
    const items = [];
    let idx = startIndex;

    const itemRegex = ordered ? /^\d+\.\s+(.*)$/ : /^-\s+(.*)$/;

    while (idx < lines.length) {
      const line = lines[idx];
      const m = itemRegex.exec(line);
      if (!m) break;

      const itemText = m[1];

      if (!ordered && /^\[(x| )\]\s+/i.test(itemText)) {
        const task = /^\[(x| )\]\s+(.*)$/i.exec(itemText);
        if (task) {
          const checked = task[1].toLowerCase() === 'x';
          const label = task[2];
          if (checked) {
            items.push(`<li><input type="checkbox" checked="" disabled=""> ${renderInline(label)}</li>`);
          } else {
            items.push(`<li><input type="checkbox" disabled=""> ${renderInline(label)}</li>`);
          }
          idx += 1;
          continue;
        }
      }

      if (!ordered && idx + 1 < lines.length && /^\s{2}-\s+/.test(lines[idx + 1])) {
        const parent = renderInline(itemText);
        const nestedItems = [];
        idx += 1;
        while (idx < lines.length && /^\s{2}-\s+/.test(lines[idx])) {
          nestedItems.push(`<li>${renderInline(lines[idx].replace(/^\s{2}-\s+/, ''))}</li>`);
          idx += 1;
        }
        const nested = `<ul>\n${nestedItems.join('\n')}\n</ul>`;
        items.push(`<li>${parent}\n${nested}\n</li>`);
        continue;
      }

      items.push(`<li>${renderInline(itemText)}</li>`);
      idx += 1;
    }

    const tag = ordered ? 'ol' : 'ul';
    return {
      html: `<${tag}>\n${items.join('\n')}\n</${tag}>`,
      nextIndex: idx,
    };
  };

  const renderTable = (startIndex) => {
    const headerLine = lines[startIndex];
    const sepLine = lines[startIndex + 1];
    if (!headerLine || !sepLine) return null;
    if (!/^\|/.test(headerLine) || !/^\|?-{3,}/.test(sepLine.replace(/\s/g, ''))) return null;

    const splitRow = (row) => row
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((c) => c.trim());

    const headers = splitRow(headerLine);
    let idx = startIndex + 2;
    const bodyRows = [];
    while (idx < lines.length && /^\|/.test(lines[idx])) {
      bodyRows.push(splitRow(lines[idx]));
      idx += 1;
    }

    const thead = [
      '<thead>',
      '<tr>',
      ...headers.map((h) => `<th>${renderInline(h)}</th>`),
      '</tr>',
      '</thead>',
    ].join('\n');

    const tbodyRows = bodyRows.map((row) => [
      '<tr>',
      ...row.map((c) => `<td>${renderInline(c)}</td>`),
      '</tr>',
    ].join('\n'));

    const tbody = ['<tbody>', ...tbodyRows, '</tbody>'].join('\n');

    return {
      html: `<table>\n${thead}\n${tbody}\n</table>`,
      nextIndex: idx,
    };
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') {
      i += 1;
      continue;
    }

    const fence = /^```(\w+)?\s*$/.exec(line);
    if (fence) {
      const lang = fence[1];
      const codeLines = [];
      i += 1;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        codeLines.push(lines[i]);
        i += 1;
      }
      i += 1;
      const code = escapeHtml(codeLines.join('\n'));
      if (lang) {
        blocks.push(`<pre><code class="language-${lang}">${code}</code></pre>`);
      } else {
        blocks.push(`<pre><code>${code}</code></pre>`);
      }
      continue;
    }

    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      blocks.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      i += 1;
      continue;
    }

    const table = renderTable(i);
    if (table) {
      blocks.push(table.html);
      i = table.nextIndex;
      continue;
    }

    if (/^-\s+/.test(line)) {
      const list = renderList(i, false);
      blocks.push(list.html);
      i = list.nextIndex;
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const list = renderList(i, true);
      blocks.push(list.html);
      i = list.nextIndex;
      continue;
    }

    const paraLines = [];
    while (i < lines.length && lines[i].trim() !== '') {
      paraLines.push(lines[i]);
      i += 1;
    }
    blocks.push(`<p>${renderInline(paraLines.join(' '))}</p>`);
  }

  return blocks.join('\n');
}
