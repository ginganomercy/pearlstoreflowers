import { describe, it, expect } from 'bun:test';
import rawCatalog from '../src/data/catalog.json';
import { createCatalogSearchEngine } from '../src/application/search-engine';
import type { FlowerProduct } from '../src/domain/types';

describe('MiniSearch Fuzzy Search Engine', () => {
  const products: readonly FlowerProduct[] = rawCatalog.products as FlowerProduct[];
  const engine = createCatalogSearchEngine(products);

  it('should find product by exact SKU code', () => {
    const results = engine.search('PSF-WED-01');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]).toBe('prod-01');
  });

  it('should find products by flower stem composition', () => {
    const results = engine.search('Baby\'s Breath');
    expect(results.length).toBeGreaterThan(0);
  });

  it('should find products with fuzzy typo tolerance', () => {
    // "holand" instead of "holland", or "mawr" instead of "mawar"
    const results = engine.search('holand');
    expect(results.length).toBeGreaterThan(0);
    const mawarResults = engine.search('mawr');
    expect(mawarResults.length).toBeGreaterThan(0);
  });

  it('should return empty results for queries shorter than minimum length', () => {
    expect(engine.search('').length).toBe(0);
    expect(engine.search('   ').length).toBe(0);
  });
});
