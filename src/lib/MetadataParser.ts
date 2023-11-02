import { logger } from "./logger";

/**
 * CURRENT METADATA FORMATE
 * {'source': 'documentDB/CONSTITUTION.pdf', 'page': 1} of array
 */

type ApiMetadata = {
  source: string;
  page: number;
};

export type SourceWithPages = {
  source: string;
  pages: number[];
};

class MetadataParser {
  private metadata: string | null;

  constructor(metadata: string | null) {
    this.metadata = metadata;
  }

  extractUniqueSourcesFromMetadata(): string[] {
    if (!this.metadata) return [];

    const sources: string[] = [];
    const set = new Set<string>();

    if (typeof this.metadata === "string") {
      const meta = JSON.parse(this.metadata);
      if (meta.length > 0) {
        for (var item of meta) {
          if (item["metadata"]) {
            if (item["metadata"]["source"]) set.add(item["metadata"]["source"]);
          }
          if (item["source"]) {
          }
        }
      }
    }

    return Array.from(set);
  }

  parseMetadata(): ApiMetadata[] | null {
    if (!this.metadata) return null;

    return JSON.parse(this.metadata);
  }

  extractSourceWithPageNumber(): SourceWithPages[] {
    if (!this.metadata) return [];

    const source: SourceWithPages[] = [];

    if (this.metadata.toLocaleLowerCase().includes("none")) return source;

    try {
      const obj = JSON.parse(this.metadata);
      if (obj.length === 0) return source;

      for (var meta of obj) {
        if ("source" in meta && "page" in meta) {
          const sourceIndex = source.findIndex((s) => s.source === meta.source);

          if (sourceIndex > -1) {
            source[sourceIndex].pages = Array.from(
              new Set([...source[sourceIndex].pages, meta.page + 1])
            );
          } else {
            source.push({ source: meta.source, pages: [meta.page + 1] });
          }
        }
      }
    } catch (error) {}

    return source;
  }

  extractOpenAIMetadata(): SourceWithPages[] {
    if (!this.metadata) return [];

    const source: SourceWithPages[] = [];

    try {
      const obj = JSON.parse(this.metadata);
      if (obj.length === 0) return source;

      for (var meta of obj) {
        const sourceIndex = source.findIndex((s) => s.source === meta.metadata.source);

        if (sourceIndex > -1) {
          source[sourceIndex].pages = Array.from(
            new Set([...source[sourceIndex].pages, meta.metadata.loc.pageNumber])
          );
        } else {
          source.push({ source: meta.metadata.source, pages: [meta.metadata.loc.pageNumber] });
        }
      }
    } catch (error) {}

    return source;
  }
}

export default MetadataParser;
