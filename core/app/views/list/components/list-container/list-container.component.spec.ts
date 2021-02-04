import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ApolloTestingModule} from 'apollo-angular/testing';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {ListContainerComponent} from './list-container.component';
import {TableModule} from '@components/table/table.module';
import {WidgetPanelModule} from '@components/widget-panel/widget-panel.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ThemeImagesStore} from '@store/theme-images/theme-images.store';
import {themeImagesMockData} from '@store/theme-images/theme-images.store.spec.mock';
import {of} from 'rxjs';
import {take} from 'rxjs/operators';
import {ListViewStore} from '@views/list/store/list-view/list-view.store';
import {listviewStoreMock} from '@views/list/store/list-view/list-view.store.spec.mock';
import {LanguageStore} from '@store/language/language.store';
import {languageStoreMock} from '@store/language/language.store.spec.mock';
import {MetadataStore} from '@store/metadata/metadata.store.service';
import {metadataStoreMock} from '@store/metadata/metadata.store.spec.mock';
import {RouterTestingModule} from '@angular/router/testing';

describe('ListcontainerUiComponent', () => {
    let component: ListContainerComponent;
    let fixture: ComponentFixture<ListContainerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                TableModule,
                WidgetPanelModule,
                AngularSvgIconModule.forRoot(),
                HttpClientTestingModule,
                NoopAnimationsModule,
                ApolloTestingModule,
                RouterTestingModule
            ],
            providers: [
                {
                    provide: ListViewStore, useValue: listviewStoreMock
                },
                {
                    provide: ThemeImagesStore, useValue: {
                        images$: of(themeImagesMockData).pipe(take(1))
                    }
                },
                {
                    provide: LanguageStore, useValue: languageStoreMock
                },
                {provide: MetadataStore, useValue: metadataStoreMock},
            ],
            declarations: [ListContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
