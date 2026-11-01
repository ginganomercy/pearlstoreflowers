import { describe, it, expect } from 'bun:test';
import {
  filterProducts,
  getCategoryCounts,
} from '../src/application/catalog-service';
import type { FlowerProduct } from '../src/domain/types';
import catalogData from '../src/data/catalog.json';

describe('Catalog Application Service', () => {
  const products: readonly FlowerProduct[] = catalogData.products as FlowerProduct[];

  it('should verify catalog has exact count of 38 products', () => {
    expect(products.length).toBe(38);
  });

  it('should return all 38 products when category is "Semua" and search is empty', () => {
    const result = filterProducts(products, 'Semua', '');
    expect(result.length).toBe(38);
  });

  it('should filter correctly when Wedding category is selected', () => {
    const result = filterProducts(products, 'Wedding', '');
    expect(result.length).toBe(10);
    expect(result.every((p) => p.category === 'Wedding')).toBe(true);
  });

  it('should filter correctly when Engagement category is selected', () => {
    const result = filterProducts(products, 'Engagement', '');
    expect(result.length).toBe(8);
    expect(result.every((p) => p.category === 'Engagement')).toBe(true);
  });

  it('should filter correctly when Graduation category is selected', () => {
    const result = filterProducts(products, 'Graduation', '');
    expect(result.length).toBe(12);
    expect(result.every((p) => p.category === 'Graduation')).toBe(true);
  });

  it('should filter correctly when Custom category is selected', () => {
    const result = filterProducts(products, 'Custom', '');
    expect(result.length).toBe(8);
    expect(result.every((p) => p.category === 'Custom')).toBe(true);
  });

  it('should search products across flower composition', () => {
    const result = filterProducts(products, 'Semua', 'Baby\'s Breath');
    expect(result.length).toBeGreaterThan(0);
    expect(
      result.some((p) =>
        p.flowerComposition.some((f) => f.toLowerCase().includes("baby's breath"))
      )
    ).toBe(true);
  });

  it('should search products by product code', () => {
    const result = filterProducts(products, 'Semua', 'SC-WED-01');
    expect(result.length).toBe(1);
    expect(result[0].code).toBe('SC-WED-01');
  });

  it('should calculate category counts matching product distribution', () => {
    const counts = getCategoryCounts(products);
    const countMap = Object.fromEntries(counts.map((c) => [c.category, c.count]));

    expect(countMap.Semua).toBe(38);
    expect(countMap.Wedding).toBe(10);
    expect(countMap.Engagement).toBe(8);
    expect(countMap.Graduation).toBe(12);
    expect(countMap.Custom).toBe(8);
  });
});

