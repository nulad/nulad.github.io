import { initMarkdownSystem, getPostBySlugWithHtmlSync } from './lib/posts.js';
import fs from 'fs';

async function testBuildTimeProcessing() {
  try {
    console.log('🏗️  Testing build-time processing (no client-side JS)...\n');
    
    // Initialize the markdown system
    await initMarkdownSystem();
    console.log('✅ Shiki initialized for build-time processing\n');
    
    // Create a test markdown file with code
    const testMarkdown = `# Build Time Test

This code should be highlighted at build time:

\`\`\`javascript
function buildTimeTest() {
  console.log("No client-side JS needed!");
  return "highlighted at build time";
}
\`\`\`

The HTML above should contain inline styles, not require JavaScript.
`;
    
    // Process the markdown
    const { markdownToHtmlSync } = await import('./lib/renderer.js');
    const html = markdownToHtmlSync(testMarkdown);
    
    console.log('🎨 Generated HTML (build-time):');
    console.log('=' .repeat(60));
    console.log(html);
    console.log('=' .repeat(60));
    
    // Analyze the output
    const hasInlineStyles = html.includes('style="');
    const hasShikiClasses = html.includes('shiki');
    const hasPreTags = html.includes('<pre');
    const hasCodeTags = html.includes('<code');
    
    console.log('\n🔍 Build-time analysis:');
    console.log(`✅ Contains inline styles (no JS needed): ${hasInlineStyles}`);
    console.log(`✅ Contains shiki CSS classes: ${hasShikiClasses}`);
    console.log(`✅ Contains proper HTML structure: ${hasPreTags && hasCodeTags}`);
    
    // Check that there are no script tags or JavaScript dependencies
    const hasScriptTags = html.includes('<script');
    const hasJsReferences = html.includes('.js') || html.includes('javascript:');
    
    console.log(`✅ No script tags in output: ${!hasScriptTags}`);
    console.log(`✅ No JS references in output: ${!hasJsReferences}`);
    
    if (hasInlineStyles && hasShikiClasses && !hasScriptTags) {
      console.log('\n🎉 Perfect! Syntax highlighting happens at build time with zero client-side JavaScript!');
      console.log('📦 The highlighted code is pure HTML with inline CSS styles.');
    } else {
      console.log('\n⚠️  There may be issues with the build-time processing.');
    }
    
    // Save the output to a file for inspection
    fs.writeFileSync('test-output.html', html);
    console.log('\n📄 Full HTML saved to test-output.html for inspection');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testBuildTimeProcessing();
