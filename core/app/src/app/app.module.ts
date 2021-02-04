import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {Apollo} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';
import {onError} from '@apollo/link-error';
import {FetchPolicy} from '@apollo/client/core/watchQueryOptions';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {NavbarUiModule} from '@components/navbar/navbar.module';
import {FooterUiModule} from '@components/footer/footer.module';
import {ClassicViewUiModule} from '@views/classic/components/classic-view/classic-view.module';
import {MessageUiModule} from '@components/message/message.module';
import {FilterUiModule} from '@components/filter/filter.module';
import {ColumnChooserModule} from '@components/columnchooser/columnchooser.module';
import {TableModule} from '@components/table/table.module';
import {ModuleTitleModule} from '@components/module-title/module-title.module';
import {ListHeaderModule} from '@views/list/components/list-header/list-header.module';
import {ListContainerModule} from '@views/list/components/list-container/list-container.module';
import {ListModule} from '@views/list/components/list-view/list.module';
import {RecordModule} from '@views/record/components/record-view/record.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ErrorInterceptor} from '@services/auth/error.interceptor';

import {AppManagerModule} from '../app-manager/app-manager.module';

import {environment} from '../environments/environment';
import {RouteReuseStrategy} from '@angular/router';
import {AppRouteReuseStrategy} from './app-router-reuse-strategy';
import {ImageModule} from '@components/image/image.module';
import {FullPageSpinnerModule} from '@components/full-page-spinner/full-page-spinner.module';
import {BnNgIdleService} from 'bn-ng-idle';
import {AppInit} from '@app/app-initializer';
import {AuthService} from '@services/auth/auth.service';
import {GraphQLError} from 'graphql';
import {MessageModalModule} from '@components/modal/components/message-modal/message-modal.module';
import {RecordListModalModule} from '@containers/record-list-modal/components/record-list-modal/record-list-modal.module';
import {AngularSvgIconModule} from 'angular-svg-icon';

export const initializeApp = (appInitService: AppInit) => (): Promise<any> => appInitService.init();

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppManagerModule,
        AppRoutingModule,
        FooterUiModule,
        NavbarUiModule,
        MessageUiModule,
        ClassicViewUiModule,
        FilterUiModule,
        ListModule,
        RecordModule,
        TableModule,
        ModuleTitleModule,
        ListHeaderModule,
        ListContainerModule,
        ColumnChooserModule,
        AngularSvgIconModule.forRoot(),
        ImageModule,
        BrowserAnimationsModule,
        NgbModule,
        FullPageSpinnerModule,
        MessageModalModule,
        RecordListModalModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        {provide: RouteReuseStrategy, useClass: AppRouteReuseStrategy},
        BnNgIdleService,
        AppInit,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            multi: true,
            deps: [AppInit]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(apollo: Apollo, httpLink: HttpLink, protected auth: AuthService) {

        const defaultOptions = {
            watchQuery: {
                fetchPolicy: 'no-cache' as FetchPolicy
            },
            query: {
                fetchPolicy: 'no-cache' as FetchPolicy
            },
        };

        const http = httpLink.create({
            uri: environment.graphqlApiUrl,
            withCredentials: true
        });

        const logoutLink = onError((err) => {
            if (err.graphQLErrors && err.graphQLErrors.length > 0) {
                err.graphQLErrors.forEach((value: GraphQLError) => {
                    if (this.auth.isUserLoggedIn.value === true && value.message.includes('Access Denied')) {
                        auth.logout('LBL_SESSION_EXPIRED');
                    }
                });
            }
        });

        apollo.create({
            defaultOptions,
            link: logoutLink.concat(http),
            cache: new InMemoryCache()
        });
    }
}
