import { rendersBrowseBy } from './browse-by-decorator';
import { BrowseByDataType } from './browse-by-data-type';

describe('BrowseByDecorator', () => {
  const titleDecorator = rendersBrowseBy(BrowseByDataType.Title);
  const dateDecorator = rendersBrowseBy(BrowseByDataType.Date);
  const metadataDecorator = rendersBrowseBy(BrowseByDataType.Metadata);
  it('should have a decorator for all types', () => {
    expect(titleDecorator.length).not.toEqual(0);
    expect(dateDecorator.length).not.toEqual(0);
    expect(metadataDecorator.length).not.toEqual(0);
  });
});
