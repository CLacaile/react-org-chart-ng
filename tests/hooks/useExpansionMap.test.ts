import { renderHook, act } from '@testing-library/react';
import { useExpansionMap } from '../../src/hooks/useExpansionMap';

describe('useExpansionMap', () => {
  it('initializes with an empty map by default', () => {
    const { result } = renderHook(() => useExpansionMap());
    expect(result.current.expansionMap.size).toBe(0);
  });

  it('initializes with a provided map', () => {
    const initialMap = new Map([[1, true], [2, false]]);
    const { result } = renderHook(() => useExpansionMap(initialMap));
    expect(result.current.expansionMap.get(1)).toBe(true);
    expect(result.current.expansionMap.get(2)).toBe(false);
  });

  it('toggles node expansion from false to true', () => {
    const { result } = renderHook(() => useExpansionMap(new Map([[1, false]])));

    act(() => {
      result.current.toggleNodeExpansion(1);
    });

    expect(result.current.expansionMap.get(1)).toBe(true);
  });

  it('toggles node expansion from true to false', () => {
    const { result } = renderHook(() => useExpansionMap(new Map([[1, true]])));

    act(() => {
      result.current.toggleNodeExpansion(1);
    });

    expect(result.current.expansionMap.get(1)).toBe(false);
  });

  it('adds a new node with expansion set to true if not initially present', () => {
    const { result } = renderHook(() => useExpansionMap());

    act(() => {
      result.current.toggleNodeExpansion(2);
    });

    expect(result.current.expansionMap.get(2)).toBe(true);
  });
});
