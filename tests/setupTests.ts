import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { jest } from '@jest/globals';
configure({ testIdAttribute: 'data-testid' });

class MockResizeObserver {
  callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element) {
    // jsdom never lays out elements, so real dimensions are always 0. Report a
    // generous fixed size so components that size themselves off ResizeObserver
    // (e.g. virtualized lists) behave as they would in a browser with real layout.
    const contentRect = {
      width: 1000,
      height: 1000,
      top: 0,
      left: 0,
      bottom: 1000,
      right: 1000,
      x: 0,
      y: 0,
      toJSON() {
        return this;
      },
    } as DOMRectReadOnly;
    this.callback([{ target, contentRect } as ResizeObserverEntry], this as unknown as ResizeObserver);
  }

  unobserve() {}
  disconnect() {}
}

if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;
}

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
  root = null;
  rootMargin = '';
  thresholds: number[] = [];
}

if (typeof globalThis.IntersectionObserver === 'undefined') {
  globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
}

// jsdom doesn't implement canvas 2D rendering without the optional `canvas`
// native package; stub the methods components actually call so canvas-based
// components can mount in tests without console noise or crashes.
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    clearRect: jest.fn(),
    fillRect: jest.fn(),
    strokeRect: jest.fn(),
    beginPath: jest.fn(),
    closePath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    stroke: jest.fn(),
    save: jest.fn(),
    restore: jest.fn(),
    translate: jest.fn(),
    scale: jest.fn(),
    rotate: jest.fn(),
    drawImage: jest.fn(),
    createRadialGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
    createLinearGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
    measureText: jest.fn(() => ({ width: 0 })),
    fillText: jest.fn(),
    strokeText: jest.fn(),
  })) as unknown as typeof HTMLCanvasElement.prototype.getContext;
}
