import { TestBed } from '@angular/core/testing';

import { LinkResolver } from './link.resolver';

describe('LinkResolver', () => {
  let resolver: LinkResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(LinkResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
