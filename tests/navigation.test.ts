import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';

import Navigation from '@components/Navigation.svelte';

describe('Navigation', () => {
  it('does not mark utility links as the current page when no nav tabs are configured', () => {
    const { container } = render(Navigation, {
      pathname: '/components',
    });

    const currentLinks = [
      ...container.querySelectorAll<HTMLAnchorElement>(
        'a[aria-current="page"]',
      ),
    ];

    expect(currentLinks).toHaveLength(0);
    expect(
      container.querySelector('a[href="/"][aria-current="page"]'),
    ).toBeNull();
  });
});
