import {
    Component, AfterViewInit, Input, Output, OnInit, OnChanges,
    EventEmitter, OnDestroy, HostListener
} from '@angular/core';
import { DataTableCustomColumn, DataTableCustomOption, ControlEdit, RowValidationArgs, AlignColumn } from './datatable-custom.models';
import * as _ from 'underscore';
import * as $ from 'jquery';

@Component({
    selector: 'custom-datatables',
    templateUrl: 'datatable-custom.html',
    styleUrls: ['datatable-custom.css']
})

export class DataTablesCustomComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    selectAllDataRowsSub: any;
    selectAllWithPrefixDataRowsSub: any;
    setDataSourceEvent: any;

    @Input('option') option: DataTableCustomOption;
    @Input() id: any;
    @Output('dataOutput') dataOutput: EventEmitter<any> = new EventEmitter<any>();
    @Output() dataSelected: EventEmitter<any> = new EventEmitter<any>();
    columns: DataTableCustomColumn[];
    dataSource: any;
    columnRefs: Array<string>;
    actionList: any;
    hasData: boolean;
    colspanNodata: number;
    public ErrorObject = {
        hasError: false,
        ErrorMessage: ''
    };
    public focus = false;
    public pagingCount: Array<number> = new Array<number>();
    public pagingDisplay: Array<string> = new Array<string>();
    public currentPageItem = {
        firstitem: 0,
        lastitem: 0
    };
    currentPage: number;
    selectedDisplayLength: number;
    oldLengthDataSource = 0;
    canSelectedAll: boolean;
    windowResize: any;

    public get validationStatus(): any {
        return this.actionList;
    }

    @Input()
    public set validationStatus(status: any) {
        this.actionList = status;
    }

    @Output()
    public validationStatusChange: EventEmitter<any> = new EventEmitter<any>();

    selectedAllData = false;
    mobWidth: any;
    responsive = false;

    constructor(
    ) {
    }

    public ngOnInit() {
        if (this.option != null) {
            this.columns = this.option.Columns;
            this.dataSource = this.option.dataSource;
            this.columnRefs = this.option.ValidateColumnRef;
            this.canSelectedAll = false;

            if (this.option.dataSource && this.option.dataSource.length > 0) {
                this.hasData = true;
                this.buildShowHideControlEdit(this.actionList);
                this.oldLengthDataSource = this.dataSource.length;
            } else {
                this.hasData = false;
                if (this.columns != null) {
                    this.colspanNodata = this.columns.length;
                    if (this.option.SelectedColumn) {
                        this.colspanNodata += 1;
                    }
                }
            }

            if (this.option.Paging && !this.option.ServerSide) {
                this.selectedDisplayLength = this.option.DisplayLength;
                this.buildPagingCount();
            }
            this.resizeDataTable(window.innerWidth);
        }
    }

    public ngOnChanges(changes: any) {
        if (changes.option != null && changes.option.currentValue != null && this.option != null) {
            this.canSelectedAll = false;

            if ((this.dataSource != null &&
                this.option.dataSource != null &&
                this.dataSource.length !== this.option.dataSource.length)) {
                this.dataSource = this.option.dataSource;
            }

            if (this.dataSource == null || this.dataSource.length === 0) {
                this.selectedAllData = false;
                this.hasData = false;
            } else {this.hasData = true; }

            if ((this.columns == null && this.option.Columns != null)
                || (this.columns != null && this.columns.length !== this.option.Columns.length)) {
                this.columns = this.option.Columns;
            }

            if (this.dataSource != null &&
                this.dataSource.length > 0 &&
                this.dataSource.length !== this.oldLengthDataSource) {

                this.buildShowHideControlEdit();
                if (this.option.Paging && !this.option.ServerSide) {
                    this.buildPagingCount();
                }

                if (this.option.disabledAllCtrl && this.dataSource != null) {
                    this.disableAllControl();
                }

                this.oldLengthDataSource = this.dataSource.length;
            }
        }
    }

    public ngAfterViewInit() {
        if (this.option.disabledAllCtrl) {
            this.disableAllControl();
        }
    }

    public ngOnDestroy() {
        this.dataOutput.unsubscribe();
    }

    public valueChangeDate(val: any, column: DataTableCustomColumn, index: number) {
        this.dataSource[index][column.PropertyName] = val;
    }

    public convertDateValue(value: any) {
        if (value != null && typeof (value) === 'string') {
            return new Date(Date.parse(value));
        }
        return value;
    }

    buildShowHideControlEdit(status: any = null) {
        let arrayTemp = new Array<any>();
        const isCreatedNewStatus = !!status;
        status = status || { isValidAll: true };

        if (this.columns == null) { return; }

        this.columns.filter(x => x.AllowEdit || x.isControl).forEach(column => {
            if (this.actionList == null ||
                this.actionList[column.PropertyName] == null ||
                this.actionList[column.PropertyName].length !== this.dataSource.length) {
                for (let i = 0; i < this.dataSource.length; i++) {
                    if (!column.isControl) {
                        const item = {
                            'Index': i,
                            'ColumnName': column.PropertyName,
                            'showControl': false,
                            'OldValue': this.dataSource[i][column.PropertyName],
                            'Valid': true,
                            'focus': false,
                            'disabled': false
                        };

                        arrayTemp.push(item);
                    } else {
                        const item = {
                            'Index': i,
                            'ColumnName': column.PropertyName,
                            'showControl': !this.option.disabledAllCtrl,
                            'OldValue': this.dataSource[i][column.PropertyName],
                            'Valid': true,
                            'focus': false,
                            'disabled': false
                        };

                        arrayTemp.push(item);
                    }
                }

                status[column.PropertyName] = arrayTemp;
                arrayTemp = new Array<any>();
            } else {
                status[column.PropertyName] = this.actionList[column.PropertyName];
            }
        });
        this.actionList = status;
        if (!isCreatedNewStatus) {
            this.validationStatusChange.emit(this.actionList);
        }

        this.buildSelectedData();
    }

    buildSelectedData() {
        const arrayCheckbox = new Array<any>();
        const prefixArray: Array<string> = ['HI', 'MID', 'VOL', 'INT'];

        for (let i = 0; i < this.dataSource.length; i++) {
            let prefix = null;
            if (this.dataSource[i].JobTitleName) {
                const prefixTemp = this.dataSource[i].JobTitleName.split(' ', 1)[0];
                if (prefixArray.indexOf(prefixTemp) > -1) {
                    prefix = prefixTemp;
                }
            }

            const item = {
                'Index': i,
                'Checked': false,
                'Prefix': prefix
            };

            arrayCheckbox.push(item);
        }

        this.actionList['SelectedData'] = arrayCheckbox;
        this.dataSelected.emit(null); // reset data selected.
    }

    sortDatabutton(header: HTMLElement, columnName: string) {
        if (this.dataSource !== undefined && this.dataSource != null && this.dataSource.length > 0) {
            const th = $(header);
            const tr = th.closest('tr');

            const spanButtonTop = th.hasClass('sorting_asc');
            const spanButtonDown = th.hasClass('sorting_desc');

            if (!spanButtonTop && !spanButtonDown) {
                this.showSortButtonTop(spanButtonTop, spanButtonDown, header, tr, true);
                this.dataSource = _.sortBy(this.dataSource, columnName);
                if (this.ErrorObject.hasError) {
                    this.validateRequiredControlInGrid_ShowError();
                }
            }

            if (!spanButtonTop && spanButtonDown) {
                this.showSortButtonTop(spanButtonTop, spanButtonDown, header, tr, true);
                this.dataSource = _.sortBy(this.dataSource, columnName);
                if (this.ErrorObject.hasError) {
                    this.validateRequiredControlInGrid_ShowError();
                }
            }

            if (spanButtonTop && !spanButtonDown) {
                this.showSortButtonTop(spanButtonTop, spanButtonDown, header, tr, false);
                const oldRow = this.dataSource[0][columnName];
                const newData: any = _.sortBy(this.dataSource, columnName).reverse();
                if (oldRow !== newData[0][columnName]) {
                    this.dataSource = newData;
                    if (this.ErrorObject.hasError) {
                        this.validateRequiredControlInGrid_ShowError();
                    }
                }
            }

            if (!this.selectedAllData) {
                this.buildSelectedData();
            }
        }
    }

    showSortButtonTop(sortAsc: boolean, sortDesc: boolean, th: HTMLElement, tr: any, isShowTop: boolean) {
        tr.find('th').removeClass('sorting_asc')
            .removeClass('sorting_desc').removeClass('sorting').addClass('sorting');

        if (this.option.SelectedColumn) {
            tr.find('th').first().removeClass('sorting');
        }

        if (isShowTop) {
            $(th).removeClass('sorting').addClass('sorting_asc');
        } else {
            $(th).removeClass('sorting').addClass('sorting_desc');
        }
    }

    renderFunction(data: any, row: any, column: DataTableCustomColumn) {
        let returnValue = data;
        if (column.RenderFunction !== undefined && column.RenderFunction != null) {
            returnValue = column.RenderFunction(data, '', row, this.option);
        }

        return returnValue ? returnValue : '';
    }

    showSpanTextColumn(column: DataTableCustomColumn, index: number) {
        if (this.actionList != null && this.actionList[column.PropertyName] !== undefined
            && this.actionList[column.PropertyName] != null && this.actionList[column.PropertyName][index].showControl) {
            return false;
        }

        return true;
    }

    isShowControl(column: DataTableCustomColumn, index: number) {
        if ((column.AllowEdit || column.isControl) && this.actionList != null &&
            this.actionList[column.PropertyName][index].showControl) {
            return true;
        }

        return false;
    }

    showControlNumeric(column: DataTableCustomColumn, index: number) {
        if ((column.AllowEdit || column.isControl) &&
            (this.actionList != null &&
                this.actionList[column.PropertyName] !== undefined &&
                this.actionList[column.PropertyName] != null &&
                this.actionList[column.PropertyName][index].showControl) &&
            (column.ControlEdit === ControlEdit.NumericTextBox)) {
            return true;
        }
        return false;
    }

    showControlCheckbox(column: DataTableCustomColumn, index: number) {
        if ((column.AllowEdit || column.isControl) &&
            (this.actionList != null &&
                this.actionList[column.PropertyName] !== undefined &&
                this.actionList[column.PropertyName] != null &&
                this.actionList[column.PropertyName][index].showControl) &&
            (column.ControlEdit === ControlEdit.Checkbox)) {
            return true;
        }
        return false;
    }

    showControlDateTime(column: DataTableCustomColumn, index: number) {
        if ((column.AllowEdit || column.isControl) &&
            (this.actionList != null &&
                this.actionList[column.PropertyName] !== undefined &&
                this.actionList[column.PropertyName] != null &&
                this.actionList[column.PropertyName][index].showControl) &&
            (column.ControlEdit === ControlEdit.DateTimePicker)) {
            return true;
        }

        return false;
    }

    focusOutValueEdit(event: any, td: HTMLElement, data: any, column: DataTableCustomColumn, index: number, tdres: HTMLElement) {
        if (!column.isControl) {
            let isSave = false;
            if (this.actionList[column.PropertyName][index].showControl === true) {
                this.actionList[column.PropertyName][index].showControl = false;
                this.actionList[column.PropertyName][index].focus = false;

                if (column.AllowEdit && column.ControlEdit === ControlEdit.NumericTextBox) {
                    isSave = this.saveNumericTextBox(data[column.PropertyName], column, index);
                } else if (column.AllowEdit && column.ControlEdit === ControlEdit.DateTimePicker) {
                    isSave = this.saveDatePicker(data[column.PropertyName], column, index);
                }

                if (isSave) {
                    this.dataOutput.emit(data);
                }
            }
        } else {
            this.actionList[column.PropertyName][index].focus = false;
            this.dataOutput.emit(data);
        }
    }

    checkValidateColumnRequire() {
        this.ErrorObject.hasError = false;
        this.ErrorObject.ErrorMessage = '';

        this.columns.filter(x => x.Require && x.isControl).forEach(column => {
            if (this.ErrorObject.hasError === false) {
                for (let i = 0; i < this.dataSource.length; i++) {
                    if (this.dataSource[i][column.PropertyName] == null ||
                        this.dataSource[i][column.PropertyName] === 0 ||
                        this.dataSource[i][column.PropertyName] === '0' ||
                        this.dataSource[i][column.PropertyName] === '') {

                        this.ErrorObject.hasError = true;
                        this.ErrorObject.ErrorMessage = 'Error data';
                        break;
                    }
                }
            }
        });
    }

    enterValueEdit(event: any, td: HTMLElement, data: any, column: DataTableCustomColumn, index: number, tdres: HTMLElement) {
        if (event.keyCode === 13) // enter key value
        {
            if (!column.isControl) {
                let isSave = false;
                if (this.actionList[column.PropertyName][index].showControl === true) {
                    this.actionList[column.PropertyName][index].showControl = false;
                    this.actionList[column.PropertyName][index].focus = false;

                    if (column.AllowEdit && column.ControlEdit === ControlEdit.NumericTextBox) {
                        isSave = this.saveNumericTextBox(data[column.PropertyName], column, index);
                    } else if (column.AllowEdit && column.ControlEdit === ControlEdit.DateTimePicker) {
                        isSave = this.saveDatePicker(data[column.PropertyName], column, index);
                    }

                    if (isSave) {
                        this.dataOutput.emit(data);
                    }
                }
            }
        }
    }

    saveNumericTextBox(value: number, column: DataTableCustomColumn, index: number): boolean {
        if ((value === null || value <= 0) &&
            (this.dataSource[index][column.PropertyName] == null || this.dataSource[index][column.PropertyName] <= 0)) {
            // this.dataSource[index][column.PropertyName] = this.actionList[column.PropertyName][index].OldValue;
            return false;
        }

        if (value == null || value === 0 || parseFloat(this.actionList[column.PropertyName][index].OldValue) !== value) {
            // this.dataSource[index][column.PropertyName] = value;
            this.actionList[column.PropertyName][index].OldValue = value;
            return true;
        } else {
            return false;
        }
    }

    saveDatePicker(value: Date, column: DataTableCustomColumn, index: number): boolean {
        if (value == null && this.dataSource[index][column.PropertyName] == null) {
            return false;
        }

        if (value === null ||
            this.dataSource[index][column.PropertyName] == null) {
            // this.dataSource[index][column.PropertyName] = value;
            this.actionList[column.PropertyName][index].OldValue = value;
            return true;
        } else {
            return false;
        }
    }

    valueValidation(tdElement: any, column: DataTableCustomColumn, value: string): boolean {
        if (column.ControlEdit === ControlEdit.NumericTextBox) {
            if (value != null && value !== '' && isNaN(parseFloat(value))) {
                return false;
            }
        }

        if (column.ControlEdit === ControlEdit.DateTimePicker) {
            if (value != null && isNaN(Date.parse(value))) {
                return false;
            }
        }

        return true;
    }

    trackDataNgFor(index: any, item: any) {
        return index;
    }

    public validateDateControlInGrid() {
        let focusthis = false;

        if (!this.ErrorObject.hasError) {
            for (let i = 0; i < this.dataSource.length; i++) {
                this.columns.filter(x => x.isControl && x.MaxDate != null && x.MaxDate.getFullYear() < 9999).forEach(column => {
                    const date = this.dataSource[i][column.PropertyName];
                    if (date != null &&
                        this.convertDateValue(date) > column.MaxDate) {

                        this.actionList[column.PropertyName][i].Valid = false;

                        if (!focusthis) {
                            if (this.actionList[column.PropertyName][i].focus) {
                                this.actionList[column.PropertyName][i].focus = false;
                            }
                            this.actionList[column.PropertyName][i].focus = true;
                            focusthis = true;
                        }

                        this.ErrorObject.hasError = true;
                        this.ErrorObject.ErrorMessage = column.ErrorMessage;
                    }
                });
            }
        }
    }

    validateRequiredControlInGrid(showError: boolean = true) {
        this.ErrorObject.hasError = false;
        this.ErrorObject.ErrorMessage = '';
        let forcusthis = false;

        for (let i = 0; i < this.dataSource.length; i++) {
            this.columns.filter(x => x.isControl).forEach(column => {
                if (this.dataSource[i][column.PropertyName] == null ||
                    this.dataSource[i][column.PropertyName] === 0 ||
                    this.dataSource[i][column.PropertyName] === '0' ||
                    this.dataSource[i][column.PropertyName] === '') {

                    this.actionList[column.PropertyName][i].Valid = !showError;
                    if (!forcusthis) {
                        if (this.actionList[column.PropertyName][i].focus) {
                            this.actionList[column.PropertyName][i].focus = false;
                        }
                        this.actionList[column.PropertyName][i].focus = true;
                        forcusthis = true;
                    }

                    this.ErrorObject.hasError = true;
                    this.ErrorObject.ErrorMessage = this.option.ErrorMessageRequired;
                } else {
                    this.actionList[column.PropertyName][i].Valid = true;
                }
            });
        };
    }

    public validateRequiredControlInGrid_ShowError() {
        const showError = true;

        return this.validateRequiredControlInGrid(showError);
    }

    public validateRequiredControlInGrid_NotShowError() {
        const showError = false;

        return this.validateRequiredControlInGrid(showError);
    }

    buildPagingCount() {
        if (this.dataSource !== undefined) {
            const displayLength = this.selectedDisplayLength;
            this.pagingCount = new Array<number>();
            this.pagingDisplay = new Array<string>();
            this.currentPage = 1;
            if (this.dataSource === null) {
                 return;
            }
            if (this.dataSource.length > displayLength) {
                const count = this.dataSource.length / displayLength;
                this.pagingCount = new Array<number>();
                let i = 0;

                while (count - i > 0) {
                    this.pagingCount.push(i + 1);
                    i++;
                }

                this.currentPageItem.firstitem = 0;
                this.currentPageItem.lastitem = this.selectedDisplayLength - 1;

                this.buildPagingDisplay();
            } else {
                this.pagingCount.push(1);
                this.pagingDisplay.push('1');
                this.currentPageItem.firstitem = 0;
                this.currentPageItem.lastitem = this.dataSource.length - 1;
            }
        }
    }

    buildPagingDisplay() {
        this.pagingDisplay = new Array<string>();
        if (this.pagingCount.length > 10) {
            if (this.currentPage <= 4) {
                for (let i = 1; i <= 4; i++) {
                    this.pagingDisplay.push(i.toString());
                }

                this.pagingDisplay.push('...');
                this.pagingDisplay.push(this.pagingCount[this.pagingCount.length - 1].toString());
            } else if (this.pagingCount.length - +this.currentPage < 4) {
                this.pagingDisplay.push('1');
                this.pagingDisplay.push('...');
                for (let i = this.pagingCount.length - 4; i <= this.pagingCount.length; i++) {
                    this.pagingDisplay.push(i.toString());
                }
            } else {
                this.pagingDisplay.push('1');
                this.pagingDisplay.push('...');
                this.pagingDisplay.push((+this.currentPage - 1).toString());
                this.pagingDisplay.push(this.currentPage.toString());
                this.pagingDisplay.push((+this.currentPage + 1).toString());
                this.pagingDisplay.push('...');
                this.pagingDisplay.push(this.pagingCount.length.toString());
            }
        } else {
            this.pagingCount.forEach(x => {
                this.pagingDisplay.push(x.toString());
            });
        }
    }

    preventClickPage(currentPage: any) {
        if (currentPage === '...') {
             return true;
        }
        return false;
    }

    executeLinkPaging(currentPage: any) {
        if (currentPage === '...') {
            return;
        }
        this.currentPageItem.lastitem = (+currentPage * this.selectedDisplayLength) - 1;
        if (this.currentPageItem.lastitem > this.dataSource.length - 1) {
            this.currentPageItem.lastitem = this.dataSource.length - 1;
        }
        if (currentPage === 1) {
            this.currentPageItem.firstitem = 0;
        } else {
            this.currentPageItem.firstitem = (+currentPage * this.selectedDisplayLength) - this.selectedDisplayLength;
        }

        this.currentPage = +currentPage;

        this.buildPagingDisplay();
    }

    showItemForPaging(index: number) {
        if (this.option.Paging) {
            if (index >= this.currentPageItem.firstitem && index <= this.currentPageItem.lastitem) {
                return true;
            }
        } else {
            return true;
        }
        return false;
    }

    showBorderBottomGrid(index: number) {
        if (this.option.Paging) {
            if (index === this.currentPageItem.lastitem) {
                return true;
            }
        } else {
            if (index === (this.dataSource.length - 1)) {
                return true;
            }
        }

        return false;
    }

    executeNextPagingButton() {
        if (this.currentPage < this.pagingCount.length) {
            this.currentPage += 1;
            this.executeLinkPaging(this.currentPage);
        }
    }

    executePrePagingButton() {
        if (this.currentPage > 1) {
            this.currentPage -= 1;
            this.executeLinkPaging(this.currentPage);
        }
    }

    executeFirstPagingButton() {
        this.currentPage = 1;
        this.executeLinkPaging(this.currentPage);
    }

    executeLastPagingButton() {
        this.currentPage = this.pagingCount.length;
        this.executeLinkPaging(this.currentPage);
    }

    showErrorBorder(column: DataTableCustomColumn, index: number) {
        if (column.isControl &&
            this.actionList != null &&
            this.actionList[column.PropertyName] != null &&
            this.actionList[column.PropertyName][index] != null
        ) {
            return !this.actionList[column.PropertyName][index].Valid;
        }

        return false;
    }

    showErrorAt(propName: string, index: number) {
        if (this.actionList &&
            this.actionList[propName] &&
            this.actionList[propName][index]
        ) {
            this.actionList[propName][index].Valid = false;
        }
    }

    hideErrorAt(propName: string, index: number) {
        if (this.actionList &&
            this.actionList[propName] &&
            this.actionList[propName][index]
        ) {
            this.actionList[propName][index].Valid = true;
        }
    }

    public disableAllControl() {
        if (this.columns == null) {
            return;
        }

        for (let i = 0; i < this.dataSource.length; i++) {
            this.columns.filter(x => x.isControl).forEach(column => {
                if (this.actionList) {
                    this.actionList[column.PropertyName][i].showControl = false;
                }
            });
        }

        this.option.SelectedColumn = false;
    }

    public enableAllControl() {
        if (this.columns == null) {
            return;
        }

        for (let i = 0; i < this.dataSource.length; i++) {
            this.columns.filter(x => x.isControl).forEach(column => {
                if (this.actionList) {
                    this.actionList[column.PropertyName][i].showControl = true;
                }
            });
        }
        this.option.SelectedColumn = true;
    }

    highlightControl(column: DataTableCustomColumn, index: number) {
        if (this.option.HighlightControl &&
            this.dataSource != null && this.dataSource[index] != null &&
            this.dataSource[index][column.PropertyHighlight] === true &&
            !this.showErrorBorder(column, index)) {
            return true;
        }

        return false;
    }

    changeDisplayLength(val: number) {
        this.selectedDisplayLength = val;
        this.buildPagingCount();
    }

    showActivePage(page: number) {
        if (page == this.currentPage) {
            return true;
        }
        return false;
    }

    selectedCheckBox(index: number) {
        if (this.option.dataSource != null && this.option.dataSource.length > 0) {
            if (!this.option.MultiSelected) {
                this.actionList['SelectedData'].filter((x: any) => x.Checked && x.Index !== index).forEach((item: any) => {
                    item.Checked = false;
                });
            }

            this.actionList['SelectedData'][index].Checked =
                !this.actionList['SelectedData'][index].Checked;

            if (this.checkAllSelected()) {
                this.selectedAllData = true;
            } else {
                this.selectedAllData = false;
            }

            if (this.option.MultiSelected) {
                let listData = new Array<any>();
                this.actionList['SelectedData'].filter((x: any) => x.Checked).forEach((item: any) => {
                    listData.push(this.dataSource[item.Index]);
                });
                this.dataSelected.emit(listData);
            } else {
                const i = this.actionList['SelectedData'].indexOf((x: any) => x.Checked);
                if (i >= 0) {
                    const data = this.dataSource[this.actionList['SelectedData'][i].Index];
                    this.dataSelected.emit(data);
                }
            }
        }
    }

    selectedRow(index: number) {
            if (this.option.dataSource != null && this.option.dataSource.length > 0) {
                if (!this.option.MultiSelected) {
                    this.actionList['SelectedData'].filter((x: any) => x.Checked && x.Index !== index).forEach((item: any) => {
                        item.Checked = false;
                    });
                }

                this.actionList['SelectedData'][index].Checked =
                    !this.actionList['SelectedData'][index].Checked;

                if (this.option.MultiSelected) {
                    let listData = new Array<any>();
                    this.actionList['SelectedData'].filter((x: any) => x.Checked).forEach((item: any) => {
                        listData.push(this.dataSource[item.Index]);
                    });
                    this.dataSelected.emit(listData);
                } else {
                    const i = this.actionList['SelectedData'].indexOf((x: any) => x.Checked);
                    if (i >= 0) {
                        const data = this.dataSource[this.actionList['SelectedData'][i].Index];
                        this.dataSelected.emit(data);
                    }
                }

                if (this.option.SelectedColumn) {
                    if (this.checkAllSelected()) {
                        this.selectedAllData = true;
                    } else {
                        this.selectedAllData = false;
                    }
                }
            }
    }

    classSelectedData(index: number) {
        if (this.actionList['SelectedData'][index].Checked) {
            return true;
        }

        return false;
    }

    checkedAllData(checked?: boolean) {
        if (this.option.dataSource != null && this.option.dataSource.length > 0) {
            this.selectedAllData = typeof checked === 'undefined' ? !this.selectedAllData : checked;

            if (this.selectedAllData) {
                this.actionList['SelectedData'].filter((x: any) => !x.Checked).forEach((item: any) => {
                    item.Checked = true;
                });

                this.dataSelected.emit(this.dataSource);
            } else {
                this.actionList['SelectedData'].filter((x: any) => x.Checked).forEach((item: any) => {
                    item.Checked = false;
                });

                this.dataSelected.emit(null);
            }
        }
    }

    /*checkedAllWithPrefixData(data: SelectedAllWithPrefix) {
        if (this.option.dataSource != null && this.option.dataSource.length > 0) {
            this.actionList["SelectedData"].filter(x => x.Checked != data.Checked && x.Prefix == data.Prefix).forEach(item => {
                item.Checked = data.Checked;
            });

            var listData = new Array<any>();
            this.actionList["SelectedData"].filter(x => x.Checked).forEach(item => {
                listData.push(this.dataSource[item.Index]);
            });
            this.dataSelected.emit(listData);

            if (this.checkAllSelected()) this.selectedAllData = true;
            else this.selectedAllData = false;
        }
    }*/

    focusOutRow(trbody: HTMLElement) {
        if (!this.option.MultiSelected) {
            $(trbody).removeClass('selected');
        }
    }

    highlightCell(column: DataTableCustomColumn, index: number) {
        let cssReturn: any = {
            'table-td-nopadding': this.isShowControl(column, index)
        };
        if (column.HighlightCell && column.PropertyClass !== '') {
            const cssClass = this.dataSource[index][column.PropertyClass];
            cssReturn[cssClass] = true;
        }

        return cssReturn;
    }

    classNumericTextBox(column: DataTableCustomColumn, index: number) {
        const cssReturn: any = {
            'control-edit': this.showControlNumeric(column, index),
            'input-validation-error': this.showErrorBorder(column, index),
            'highlight-control': this.highlightControl(column, index)
        };

        return cssReturn;
    }

    classDatePicker(column: DataTableCustomColumn, index: number) {
        const cssReturn = {
            'control-edit': this.showControlDateTime(column, index),
            'input-validation-error': this.showErrorBorder(column, index),
            'highlight-control': this.highlightControl(column, index)
        };

        return cssReturn;
    }

    classAlignColumn(column: DataTableCustomColumn, index: number) {
        const cssReturn = {
            'spantext': column.TextAlign === AlignColumn.Left,
            'spantext-right': column.TextAlign === AlignColumn.Right,
            'spantext-center': column.TextAlign === AlignColumn.Center
        };

        return cssReturn;
    }

    checkAllSelected() {
        let checkAll = true;
        if (this.option.SelectedColumn) {
            if (this.actionList['SelectedData'].filter((x: any) => x.Checked).length !==
                this.actionList['SelectedData'].length) {
                checkAll = false;
            }
        }

        return checkAll;
    }

    public resetSelected() {
        if (this.actionList && this.actionList['SelectedData']) {
            this.actionList['SelectedData'].filter((x: any) => x.Checked).forEach((item: any) => {
                item.Checked = false;
            });
        }

        this.selectedAllData = false;

        this.dataSelected.emit(null);
    }

    setWindowResize(respon: boolean) {
        if (!this.windowResize) {
            this.windowResize = setTimeout(() => {
                this.responsive = respon;
                this.windowResize = null;
            },
                1000);
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        if (this.windowResize) {
            clearTimeout(this.windowResize);
            this.windowResize = null;
        }

        this.resizeDataTable(event.target.innerWidth);
    }

    resizeDataTable(windowSize: any) {
        if (windowSize <= 600 && !this.responsive) {
            this.setWindowResize(true);
        }

        if (windowSize > 600 && this.responsive) {
            this.setWindowResize(false);
        }
    }

    changeCheckBoxValue(index: number, column: DataTableCustomColumn) {
        if (column) {
            this.dataSource[index][column.PropertyName] = !this.dataSource[index][column.PropertyName];
            this.dataOutput.emit(this.dataSource[index]);
        }
    }
}
