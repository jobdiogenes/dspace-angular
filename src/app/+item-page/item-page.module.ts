import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { ItemPageComponent } from './simple/item-page.component';
import { ItemPageRoutingModule } from './item-page-routing.module';
import { MetadataUriValuesComponent } from './field-components/metadata-uri-values/metadata-uri-values.component';
import { ItemPageAuthorFieldComponent } from './simple/field-components/specific-field/author/item-page-author-field.component';
import { ItemPageDateFieldComponent } from './simple/field-components/specific-field/date/item-page-date-field.component';
import { ItemPageAbstractFieldComponent } from './simple/field-components/specific-field/abstract/item-page-abstract-field.component';
import { ItemPageUriFieldComponent } from './simple/field-components/specific-field/uri/item-page-uri-field.component';
import { ItemPageTitleFieldComponent } from './simple/field-components/specific-field/title/item-page-title-field.component';
import { ItemPageFieldComponent } from './simple/field-components/specific-field/item-page-field.component';
import { CollectionsComponent } from './field-components/collections/collections.component';
import { FullItemPageComponent } from './full/full-item-page.component';
import { FullFileSectionComponent } from './full/field-components/file-section/full-file-section.component';
import { PublicationComponent } from './simple/item-types/publication/publication.component';
import { ItemComponent } from './simple/item-types/shared/item.component';
import { EditItemPageModule } from './edit-item-page/edit-item-page.module';
import { UploadBitstreamComponent } from './bitstreams/upload/upload-bitstream.component';
import { StatisticsModule } from '../statistics/statistics.module';
import { AbstractIncrementalListComponent } from './simple/abstract-incremental-list/abstract-incremental-list.component';
import { UntypedItemComponent } from './simple/item-types/untyped-item/untyped-item.component';
import { JournalEntitiesModule } from '../entity-groups/journal-entities/journal-entities.module';
import { ResearchEntitiesModule } from '../entity-groups/research-entities/research-entities.module';
import { ThemedItemPageComponent } from './simple/themed-item-page.component';
import { ThemedFullItemPageComponent } from './full/themed-full-item-page.component';
import { IIIFEntitiesModule } from '../entity-groups/iiif-entities/iiif-entities.module';

const ENTRY_COMPONENTS = [
  // put only entry components that use custom decorator
  PublicationComponent,
  UntypedItemComponent
];

const DECLARATIONS = [
  ItemPageComponent,
  ThemedItemPageComponent,
  FullItemPageComponent,
  ThemedFullItemPageComponent,
  MetadataUriValuesComponent,
  ItemPageAuthorFieldComponent,
  ItemPageDateFieldComponent,
  ItemPageAbstractFieldComponent,
  ItemPageUriFieldComponent,
  ItemPageTitleFieldComponent,
  ItemPageFieldComponent,
  CollectionsComponent,
  FullFileSectionComponent,
  PublicationComponent,
  UntypedItemComponent,
  ItemComponent,
  UploadBitstreamComponent,
  AbstractIncrementalListComponent,
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule.withEntryComponents(),
    ItemPageRoutingModule,
    EditItemPageModule,
    StatisticsModule.forRoot(),
    JournalEntitiesModule.withEntryComponents(),
    ResearchEntitiesModule.withEntryComponents(),
    IIIFEntitiesModule.withEntryComponents()
  ],
  declarations: [
    ...DECLARATIONS
  ],
  exports: [
    ...DECLARATIONS
  ]
})
export class ItemPageModule {
  /**
   * NOTE: this method allows to resolve issue with components that using a custom decorator
   * which are not loaded during CSR otherwise
   */
  static withEntryComponents() {
    return {
      ngModule: ItemPageModule,
      providers: ENTRY_COMPONENTS.map((component) => ({provide: component}))
    };
  }

}
