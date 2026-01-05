import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MarkdownContent from '@/components/MarkdownContent';

describe('MarkdownContent component', () => {
  describe('Rendering HTML', () => {
    it('should render basic markdown content', () => {
      const content = '# Hello World\n\nThis is a paragraph.';
      render(<MarkdownContent content={content} />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Hello World');
      
      const paragraph = screen.getByText('This is a paragraph.');
      expect(paragraph).toBeInTheDocument();
    });

    it('should render multiple headings', () => {
      const content = '# Title\n## Section\n### Subsection';
      render(<MarkdownContent content={content} />);
      
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Title');
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Section');
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Subsection');
    });

    it('should render lists', () => {
      const content = '- Item 1\n- Item 2\n- Item 3';
      render(<MarkdownContent content={content} />);
      
      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(3);
      expect(listItems[0]).toHaveTextContent('Item 1');
      expect(listItems[1]).toHaveTextContent('Item 2');
      expect(listItems[2]).toHaveTextContent('Item 3');
    });

    it('should render links', () => {
      const content = '[Link text](https://example.com)';
      render(<MarkdownContent content={content} />);
      
      const link = screen.getByRole('link', { name: 'Link text' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://example.com');
    });

    it('should render images', () => {
      const content = '![Alt text](/image.jpg)';
      render(<MarkdownContent content={content} />);
      
      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('alt', 'Alt text');
      expect(image).toHaveAttribute('src', '/image.jpg');
    });

    it('should render emphasized text', () => {
      const content = 'This is **bold** and *italic* text';
      render(<MarkdownContent content={content} />);
      
      const container = screen.getByText(/This is/).parentElement;
      expect(container).toContainHTML('<strong>bold</strong>');
      expect(container).toContainHTML('<em>italic</em>');
    });

    it('should render tables', () => {
      const content = '| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |';
      render(<MarkdownContent content={content} />);
      
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      
      expect(screen.getByText('Header 1')).toBeInTheDocument();
      expect(screen.getByText('Header 2')).toBeInTheDocument();
      expect(screen.getByText('Cell 1')).toBeInTheDocument();
      expect(screen.getByText('Cell 2')).toBeInTheDocument();
    });

    it('should render task lists', () => {
      const content = '- [x] Completed task\n- [ ] Incomplete task';
      render(<MarkdownContent content={content} />);
      
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(2);
      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).not.toBeChecked();
    });
  });

  describe('Handling Code Blocks', () => {
    it('should render fenced code blocks with language', () => {
      const content = '```javascript\nconst x = 42;\nconsole.log(x);\n```';
      render(<MarkdownContent content={content} />);
      
      const codeBlock = screen.getByText(/const x = 42;/);
      expect(codeBlock).toBeInTheDocument();
      expect(codeBlock.parentElement).toHaveClass('language-javascript');
    });

    it('should render fenced code blocks without language', () => {
      const content = '```\nsome code\n```';
      render(<MarkdownContent content={content} />);
      
      const codeBlock = screen.getByText('some code');
      expect(codeBlock).toBeInTheDocument();
    });

    it('should render inline code', () => {
      const content = 'This is `inline code` in text';
      render(<MarkdownContent content={content} />);
      
      const inlineCode = screen.getByText('inline code');
      expect(inlineCode).toBeInTheDocument();
      expect(inlineCode.tagName).toBe('CODE');
    });

    it('should render multiple code blocks', () => {
      const content = '```javascript\nconst a = 1;\n```\n\n```python\nb = 2\n```';
      render(<MarkdownContent content={content} />);
      
      expect(screen.getByText(/const a = 1;/)).toBeInTheDocument();
      expect(screen.getByText(/b = 2/)).toBeInTheDocument();
    });

    it('should preserve code formatting and whitespace', () => {
      const content = '```javascript\nfunction hello() {\n    console.log("Hello");\n}\n```';
      render(<MarkdownContent content={content} />);
      
      const codeBlock = screen.getByText(/function hello/);
      expect(codeBlock).toBeInTheDocument();
      expect(codeBlock.textContent).toContain('    console.log("Hello");');
    });
  });

  describe('Sanitizing Dangerous HTML', () => {
    it('should remove script tags', () => {
      const content = '<script>alert("xss")</script><p>Safe content</p>';
      render(<MarkdownContent content={content} />);
      
      expect(screen.queryByText('alert("xss")')).not.toBeInTheDocument();
      expect(screen.getByText('Safe content')).toBeInTheDocument();
    });

    it('should remove onclick handlers', () => {
      const content = '<button onclick="alert(\'xss\')">Click me</button>';
      render(<MarkdownContent content={content} />);
      
      const button = screen.getByRole('button', { name: 'Click me' });
      expect(button).toBeInTheDocument();
      expect(button).not.toHaveAttribute('onclick');
    });

    it('should remove dangerous attributes', () => {
      const content = '<img src="image.jpg" onerror="alert(\'xss\')" alt="test">';
      render(<MarkdownContent content={content} />);
      
      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
      expect(image).not.toHaveAttribute('onerror');
      expect(image).toHaveAttribute('src', 'image.jpg');
      expect(image).toHaveAttribute('alt', 'test');
    });

    it('should allow safe HTML attributes', () => {
      const content = '<div class="safe" id="test">Content</div>';
      render(<MarkdownContent content={content} />);
      
      const div = screen.getByText('Content');
      expect(div).toBeInTheDocument();
      expect(div).toHaveClass('safe');
      expect(div).toHaveAttribute('id', 'test');
    });

    it('should remove iframe tags', () => {
      const content = '<iframe src="javascript:alert(\'xss\')"></iframe><p>Safe content</p>';
      render(<MarkdownContent content={content} />);
      
      expect(screen.queryByRole('application')).not.toBeInTheDocument();
      expect(screen.getByText('Safe content')).toBeInTheDocument();
    });

    it('should remove javascript: URLs', () => {
      const content = '<a href="javascript:alert(\'xss\')">Click me</a>';
      render(<MarkdownContent content={content} />);
      
      const link = screen.getByRole('link', { name: 'Click me' });
      expect(link).toBeInTheDocument();
      expect(link).not.toHaveAttribute('href', 'javascript:alert(\'xss\')');
    });

    it('should handle mixed safe and unsafe content', () => {
      const content = '# Safe Heading\n\n<script>alert("xss")</script>\n\n<p>Safe paragraph</p>';
      render(<MarkdownContent content={content} />);
      
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Safe Heading');
      expect(screen.queryByText('alert("xss")')).not.toBeInTheDocument();
      expect(screen.getByText('Safe paragraph')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty content', () => {
      render(<MarkdownContent content="" />);
      
      const container = screen.getByTestId('markdown-content');
      expect(container).toBeInTheDocument();
      expect(container).toBeEmptyDOMElement();
    });

    it('should handle null/undefined content', () => {
      render(<MarkdownContent content={null} />);
      
      const container = screen.getByTestId('markdown-content');
      expect(container).toBeInTheDocument();
      expect(container).toBeEmptyDOMElement();
    });

    it('should handle whitespace-only content', () => {
      render(<MarkdownContent content="   \n  \n   " />);
      
      const container = screen.getByTestId('markdown-content');
      expect(container).toBeInTheDocument();
      expect(container).toBeEmptyDOMElement();
    });

    it('should handle very long content', () => {
      const longContent = '# Long Content\n\n' + 'This is a paragraph. '.repeat(100);
      render(<MarkdownContent content={longContent} />);
      
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Long Content');
      expect(screen.getByText(/This is a paragraph./)).toBeInTheDocument();
    });
  });
});
