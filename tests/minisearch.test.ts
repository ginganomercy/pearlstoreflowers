import { describe, it, expect } from 'bun:test';
import rawCatalog from '../src/data/catalog.json';
import { createCatalogSearchEngine } from '../src/application/search-engine';
import { QUICK_SEARCH_SUGGESTIONS } from '../src/domain/constants';
import type { FlowerProduct } from '../src/domain/types';

describe('MiniSearch Powerful Search Engine', () => {
  const products: readonly FlowerProduct[] = rawCatalog.products as FlowerProduct[];
  const engine = createCatalogSearchEngine(products);

  it('should find product by exact SKU code', () => {
    const results = engine.search('PSF-WED-01');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]).toBe('prod-01');
  });

  it('should find product by partial SKU code without prefix', () => {
    const results = engine.search('WED-01');
    expect(results.length).toBeGreaterThan(0);
    expect(results).toContain('prod-01');
  });

  it('should find products by flower stem composition', () => {
    const results = engine.search('Baby\'s Breath');
    expect(results.length).toBeGreaterThan(0);
  });

  it('should match multi-token queries across different fields (title + colorTheme)', () => {
    // "mawar pink" has "Mawar" in title and "Pink" in colorTheme/composition
    const results = engine.search('mawar pink');
    expect(results.length).toBeGreaterThan(0);
  });

  it('should match multi-token queries for composite graduation terms', () => {
    const results = engine.search('wisuda mawar');
    expect(results.length).toBeGreaterThan(0);
  });

  it('should find products matching all quick-search suggestion queries', () => {
    for (const chip of QUICK_SEARCH_SUGGESTIONS) {
      const results = engine.search(chip.query);
      expect(results.length).toBeGreaterThan(0);
    }
  });

  it('should find products with fuzzy typo tolerance', () => {
    // "gerberash" instead of "gerberrash", or "mawr" instead of "mawar"
    const results = engine.search('gerberash');
    expect(results.length).toBeGreaterThan(0);
    const mawarResults = engine.search('mawr');
    expect(mawarResults.length).toBeGreaterThan(0);
  });

  it('should return search details including matched tokens', () => {
    const details = engine.searchWithDetails('mawar putih');
    expect(details.ids.length).toBeGreaterThan(0);
    expect(details.queryTokens).toEqual(['mawar', 'putih']);
  });

  it('should return empty results for queries shorter than minimum length', () => {
    expect(engine.search('').length).toBe(0);
    expect(engine.search('   ').length).toBe(0);
  });
});
