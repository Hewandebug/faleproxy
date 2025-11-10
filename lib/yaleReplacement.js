/**
 * Convert any casing of "Yale" into a matching casing of "Fale".
 */
function toFaleWithOriginalCase(match) {
  if (!match) return '';

  if (match === match.toUpperCase()) {
    return 'FALE';
  }

  if (match === match.toLowerCase()) {
    return 'fale';
  }

  if (match[0] === match[0].toUpperCase() && match.slice(1) === match.slice(1).toLowerCase()) {
    return 'Fale';
  }

  const target = 'Fale';
  return target
    .split('')
    .map((char, idx) =>
      match[idx] && match[idx] === match[idx].toUpperCase() ? char.toUpperCase() : char.toLowerCase()
    )
    .join('');
}

function replaceYaleText(input = '') {
  return input.replace(/yale/gi, toFaleWithOriginalCase);
}

function replaceYaleInDom($) {
  if (!$) {
    return $;
  }

  $('body *')
    .contents()
    .filter(function filterTextNodes() {
      return this.nodeType === 3;
    })
    .each(function replaceNodeText() {
      const originalText = $(this).text();
      const updatedText = replaceYaleText(originalText);

      if (originalText !== updatedText) {
        $(this).replaceWith(updatedText);
      }
    });

  const title = $('title');
  if (title.length) {
    title.text(replaceYaleText(title.text()));
  }

  return $;
}

module.exports = {
  replaceYaleText,
  replaceYaleInDom,
};
