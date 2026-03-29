import { useEffect, useRef, useMemo } from "react";
import { renderMarkdown } from "~/lib/markdown";

let DOMPurify: typeof import("dompurify") | null = null;
if (typeof window !== "undefined") {
  DOMPurify = require("dompurify");
}

interface MarkdownContentProps {
  content?: string | null;
  className?: string;
}

export default function MarkdownContent({
  content,
  className = "",
}: MarkdownContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const trimmed =
    content && typeof content === "string" ? content.trim() : "";

  const taskListStates = useMemo(() => {
    if (!trimmed) return [];
    return Array.from(
      trimmed.matchAll(/^\s*[-*+]\s+\[(x| )\]\s+/gim)
    ).map((m) => m[1].toLowerCase() === "x");
  }, [trimmed]);

  const sanitizedHtml = useMemo(() => {
    if (!trimmed) return "";
    const html = renderMarkdown(trimmed);

    const htmlWithCheckboxState = html.replace(
      /<input([^>]*?)type=("|')checkbox\2([^>]*?)>/gi,
      (match) => {
        const hasChecked = /\schecked(\s|=|>)/i.test(match);
        if (!hasChecked) {
          return match;
        }

        if (/\sdata-checked(\s|=|>)/i.test(match)) {
          return match;
        }

        return match.replace(/>\s*$/i, ' data-checked="true">');
      }
    );

    if (DOMPurify) {
      return DOMPurify.sanitize(htmlWithCheckboxState, {
        ALLOWED_TAGS: [
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "p",
          "br",
          "strong",
          "em",
          "del",
          "ins",
          "ul",
          "ol",
          "li",
          "a",
          "img",
          "blockquote",
          "hr",
          "table",
          "thead",
          "tbody",
          "tr",
          "th",
          "td",
          "pre",
          "code",
          "div",
          "span",
          "input",
        ],
        ALLOWED_ATTR: [
          "href",
          "src",
          "alt",
          "title",
          "class",
          "disabled",
          "checked",
          "type",
          "value",
          "data-checked",
        ],
        ADD_ATTR: ["checked", "data-checked"],
        ALLOW_DATA_ATTR: true,
        KEEP_CONTENT: true,
        RETURN_DOM: false,
        RETURN_DOM_FRAGMENT: false,
        ALLOWED_URI_REGEXP:
          /^(?:(?:(?:https?|ftp):)?\/\/|mailto:|tel:|callto:|sms:|#|\/)/i,
        FORBID_ATTR: [
          "onclick",
          "onload",
          "onerror",
          "onmouseover",
          "onfocus",
          "onblur",
        ],
      });
    }

    return htmlWithCheckboxState;
  }, [trimmed]);

  useEffect(() => {
    if (containerRef.current) {
      const checkboxes = containerRef.current.querySelectorAll(
        'input[type="checkbox"]'
      );
      checkboxes.forEach((input, index) => {
        if (
          Number.isInteger(index) &&
          index >= 0 &&
          index < taskListStates.length
        ) {
          (input as HTMLInputElement).checked = taskListStates[index];
        }

        (input as HTMLInputElement).disabled = true;
      });
    }
  }, [sanitizedHtml, taskListStates]);

  if (!sanitizedHtml || sanitizedHtml.trim() === "") {
    return <div className={`prose prose-lg max-w-none ${className}`} />;
  }

  const hasMedia = /<(img|hr|br|input|table)/i.test(sanitizedHtml);
  const textOnly = sanitizedHtml.replace(/<[^>]*>/g, "");

  if (!hasMedia && (!textOnly || textOnly.trim().length === 0)) {
    return <div className={`prose prose-lg max-w-none ${className}`} />;
  }

  return (
    <div
      ref={containerRef}
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
