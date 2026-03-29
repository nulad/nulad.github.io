import type { Config } from "@react-router/dev/config";
import fs from "fs";
import path from "path";

export default {
  ssr: true,
  async prerender() {
    // Static routes
    const paths = ["/", "/projects"];

    // Dynamic post routes — read content/posts/ at build time
    const postsDir = path.join(process.cwd(), "content/posts");
    const files = fs.readdirSync(postsDir);
    for (const file of files) {
      if (file.endsWith(".md") && file !== "README.md") {
        const slug = file.replace(/\.md$/, "");
        paths.push(`/posts/${slug}`);
      }
    }

    return paths;
  },
} satisfies Config;
