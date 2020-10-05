import {Observable, of} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {TableConfig} from '@components/table/table.model';
import {Record} from '@app-common/record/record.model';
import {DataSource} from '@angular/cdk/collections';
import {ColumnDefinition} from '@app-common/metadata/list.metadata.model';
import {LineAction} from '@app-common/actions/line-action.model';
import {
    BulkActionDataSource,
    SelectionDataSource,
    SelectionStatus
} from '@components/bulk-action-menu/bulk-action-menu.component';
import {RecordSelection} from '@app-common/views/list/record-selection.model';
import {SortDirection} from '@components/sort-button/sort-button.model';
import {SortingSelection} from '@app-common/views/list/list-navigation.model';
import {BulkAction, BulkActionsMap} from '@app-common/actions/bulk-action.model';
import {PaginationCount, PaginationDataSource} from '@components/pagination/pagination.model';

/* eslint-disable camelcase,@typescript-eslint/camelcase */
export const tableConfigMock: TableConfig = {
    showHeader: true,
    showFooter: true,

    dataSource: {

        connect: (): Observable<Record[] | ReadonlyArray<Record>> => of([
            {
                type: 'Account', module: 'accounts', id: 'b8ad5289-74da-7aee-60bc-5f76feb95252', attributes: {
                    name: 'V8 Api test Account &amp;',
                    date_entered: '2020-10-02 10:17:00',
                    date_modified: '2020-10-02 10:19:00',
                    modified_user_id: '1',
                    modified_by_name: {user_name: 'admin', id: '1'},
                    created_by: '1',
                    created_by_name: {user_name: 'admin', id: '1'},
                    description: 'aaaa',
                    deleted: '0',
                    assigned_user_id: '',
                    assigned_user_name: {user_name: '', id: ''},
                    account_type: '',
                    industry: '',
                    annual_revenue: '',
                    phone_fax: '',
                    billing_address_street: '',
                    billing_address_street_2: '',
                    billing_address_street_3: '',
                    billing_address_street_4: '',
                    billing_address_city: '',
                    billing_address_state: '',
                    billing_address_postalcode: '',
                    billing_address_country: '',
                    rating: '',
                    phone_office: ' &amp;',
                    phone_alternate: '',
                    website: 'WebSitelogic hook: website = name| V8 Api test Account &amp;',
                    ownership: '',
                    employees: '',
                    ticker_symbol: '',
                    shipping_address_street: '',
                    shipping_address_street_2: '',
                    shipping_address_street_3: '',
                    shipping_address_street_4: '',
                    shipping_address_city: '',
                    shipping_address_state: '',
                    shipping_address_postalcode: '',
                    shipping_address_country: '',
                    email1: '',
                    email_addresses_non_primary: '',
                    parent_id: '',
                    sic_code: '',
                    parent_name: {name: '', id: ''},
                    email_opt_out: '',
                    invalid_email: '',
                    email: '',
                    campaign_id: '',
                    campaign_name: {name: '', id: ''},
                    jjwg_maps_address_c: '',
                    jjwg_maps_geocode_status_c: '',
                    jjwg_maps_lat_c: '0.00000000',
                    jjwg_maps_lng_c: '0.00000000'
                }, relationships: []
            } as Record
        ]).pipe(shareReplay(1)),
        disconnect: (): void => {

        }
    } as DataSource<Record>,

    columns: of([
        {
            name: 'name',
            width: '20%',
            label: 'LBL_LIST_ACCOUNT_NAME',
            link: true,
            default: true,
            module: '',
            id: '',
            sortable: true,
            type: 'name',
            fieldDefinition: {
                name: 'name',
                type: 'name',
                dbType: 'varchar',
                vname: 'LBL_NAME',
                len: 150,
                comment: 'Name of the Company',
                unified_search: true,
                full_text_search: {boost: 3},
                audited: true,
                required: true,
                importable: 'required',
                merge_filter: 'selected'
            },
            translatedLabel: 'Name'
        } as ColumnDefinition
    ]),
    maxColumns$: of(4).pipe(shareReplay(1)),
    lineActions$: of([
        {} as LineAction
    ]).pipe(shareReplay(1)),
    selection$: of({
        all: false,
        status: SelectionStatus.NONE,
        selected: {},
        count: 0
    } as RecordSelection).pipe(shareReplay(1)),
    sort$: of({
        orderBy: 'name',
        sortOrder: SortDirection.ASC,
    } as SortingSelection).pipe(shareReplay(1)),

    selection: {
        getSelectionStatus: (): Observable<SelectionStatus> => of(SelectionStatus.NONE).pipe(shareReplay(1)),

        getSelectedCount: (): Observable<number> => of(0).pipe(shareReplay(1)),

        updateSelection: (): void => {
        }
    } as SelectionDataSource,
    bulkActions: {
        getBulkActions: (): Observable<BulkActionsMap> => of({
            delete: {
                key: 'delete',
                labelKey: 'LBL_DELETE',
                params: {},
                acl: []
            } as BulkAction
        }).pipe(shareReplay(1)),
        executeBulkAction: (): void => {
        }
    } as BulkActionDataSource,
    pagination: {
        getPaginationCount: (): Observable<PaginationCount> => of({
            pageFirst: 0,
            pageLast: 20,
            total: 20,
        } as PaginationCount).pipe(shareReplay(1)),
        changePage: (): void => {

        }
    } as PaginationDataSource,

    toggleRecordSelection: (): void => {

    },

    updateSorting: (): void => {

    }
};

/* eslint-enable camelcase,@typescript-eslint/camelcase */
