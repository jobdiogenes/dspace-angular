import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ItemDataService } from '../../../../core/data/item-data.service';
import { Item } from '../../../../core/shared/item.model';
import { rendersEntityType } from '../../../../shared/entities/entity-type-decorator';
import { ITEM } from '../../../../shared/entities/switcher/entity-type-switcher.component';
import { ElementViewMode } from '../../../../shared/view-mode';
import {
  EntityPageFieldsComponent, filterRelationsByTypeLabel,
  relationsToItems
} from '../shared/entity-page-fields.component';
import { SearchFixedFilterService } from '../../../../+search-page/search-filters/search-filter/search-fixed-filter.service';
import { isNotEmpty } from '../../../../shared/empty.util';

@rendersEntityType('Person', ElementViewMode.Full)
@Component({
  selector: 'ds-person-page-fields',
  styleUrls: ['./person-page-fields.component.scss'],
  templateUrl: './person-page-fields.component.html'
})
/**
 * The component for displaying metadata and relations of an item with entity type Person
 */
export class PersonPageFieldsComponent extends EntityPageFieldsComponent {
  /**
   * The publications related to this person
   */
  publications$: Observable<Item[]>;

  /**
   * The projects related to this person
   */
  projects$: Observable<Item[]>;

  /**
   * The organisation units related to this person
   */
  orgUnits$: Observable<Item[]>;

  /**
   * The applied fixed filter
   */
  fixedFilter$: Observable<string>;

  /**
   * The query used for applying the fixed filter
   */
  fixedFilterQuery: string;

  constructor(
    @Inject(ITEM) public item: Item,
    private ids: ItemDataService,
    private fixedFilterService: SearchFixedFilterService
  ) {
    super(item);
  }
  ngOnInit(): void {
    super.ngOnInit();

    if (isNotEmpty(this.resolvedRelsAndTypes$)) {
      this.publications$ = this.resolvedRelsAndTypes$.pipe(
        filterRelationsByTypeLabel('isPublicationOfAuthor'),
        relationsToItems(this.item.id, this.ids)
      );

      this.projects$ = this.resolvedRelsAndTypes$.pipe(
        filterRelationsByTypeLabel('isProjectOfPerson'),
        relationsToItems(this.item.id, this.ids)
      );

      this.orgUnits$ = this.resolvedRelsAndTypes$.pipe(
        filterRelationsByTypeLabel('isOrgUnitOfPerson'),
        relationsToItems(this.item.id, this.ids)
      );

      this.fixedFilterQuery = this.fixedFilterService.getQueryByRelations('isAuthorOfPublication', this.item.id);
      this.fixedFilter$ = Observable.of('publication');
    }
  }
}
