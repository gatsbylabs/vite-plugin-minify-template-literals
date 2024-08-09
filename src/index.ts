import { Plugin } from "vite";
import { minifyRaw } from "babel-plugin-styled-components/lib/minify";
import { stripIgnoredCharacters } from "graphql/utilities";
import MagicString from "magic-string";
import * as pl from "parse-literals";

export interface Options {
  css?: boolean;
  gql?: boolean;
}
function getMinifier(
  tag: string,
  opts: Options
): ((code: string) => string) | null {
  if (tag === "gql" && opts.gql) {
    return (code) => stripIgnoredCharacters(code);
  } else if (/^(styled|css)/.test(tag) && opts.css) {
    return (code) => {
      const [res] = minifyRaw(code);
      return res;
    };
  }
  return null;
}

export function plugin(opts: Options = { css: true, gql: true }): Plugin {
  if (!opts.css) opts.css = true;
  if (!opts.gql) opts.gql = true;

  return {
    name: "@gatsbylabs/vite-plugin-minify-template-literals",
    enforce: "pre",
    apply: "build",
    transform(code) {
      const templates = pl.parseLiterals(code);
      if (templates.length > 0) {
        const ms = new MagicString(code);
        templates.forEach((template) => {
          if (template.tag) {
            const minify = getMinifier(template.tag, opts);
            if (minify) {
              template.parts.forEach((part) => {
                if (part.start < part.end) {
                  const mini = minify(part.text);
                  ms.overwrite(part.start, part.end, mini);
                }
              });
            }
          }
        });

        const miniCode = ms.toString();
        return miniCode;
      }
    },
  };
}
