export enum ControlEdit {
    TextBox,
    DateTimePicker,
    DropDownBox,
    NumericTextBox,
    Checkbox,
    None
}

export enum TableStyle {
    Default,
    Green,
    Rose,
    Yellow,
    Purple
}

export enum AlignColumn {
    Left,
    Right,
    Center
}

export class DataTableCustomOption {
    Id: string;
    public DisplayLength: number;
    public EmptyTableMessage: string;
    public Columns: Array<DataTableCustomColumn>;
    public dataSource: any;
    public ValidateColumnRef: Array<string>;
    public ErrorMessageRequired: string;
    public TableStyle: TableStyle;
    public Paging: boolean;
    public ServerSide: boolean;
    public disabledAllCtrl: boolean;
    public HighlightControl: boolean;
    public ListDisplayLength: Array<number>;
    public MultiSelected: boolean;
    public SelectedColumn: boolean;
    public CanSelectAll?: () => boolean;
    public CanShowRowPerPage: boolean;

    constructor() {
        this.dataSource = [];
        this.DisplayLength = 20;
        this.EmptyTableMessage = 'There"s no record.';
        this.ValidateColumnRef = [];
        this.ErrorMessageRequired = '';
        this.TableStyle = TableStyle.Default;
        this.Paging = false;
        this.ServerSide = false;
        this.disabledAllCtrl = false;
        this.Id = '';
        this.HighlightControl = false;
        this.ListDisplayLength = [5, 10, 20, 50, 100];
        this.MultiSelected = false;
        this.SelectedColumn = false;
        this.Columns = [];
        this.CanSelectAll = () => false;
        this.CanShowRowPerPage = true;
    }
}

export class DataTableCustomColumn {
    public ColumnName: string;
    public PropertyName: string;
    public RenderFunction: Function;
    public SortOrder: number;
    public ColumnOrder: number;
    public Visible: boolean;
    public Sortable: boolean;
    public ControlEdit: ControlEdit;
    public AllowEdit: boolean;
    public isControl: boolean;
    public width: string;
    public Require: boolean;
    public MaxDate: Date;
    public ErrorMessage: string;
    public isDate: boolean;
    public PropertyHighlight: string;
    public HighlightCell: boolean;
    public PropertyClass: string;
    public TextAlign: AlignColumn;

    constructor(init: Partial<DataTableCustomColumn>) {
        this.SortOrder = 0;
        this.ColumnOrder = 0;
        this.ColumnName = '';
        this.PropertyName = '';
        this.Visible = true;
        this.Sortable = true;
        this.AllowEdit = false;
        this.ControlEdit = ControlEdit.None;
        this.isControl = false;
        this.width = '';
        this.Require = false;
        this.MaxDate = new Date('31 Dec 9999 23:59');
        this.ErrorMessage = '';
        this.isDate = false;
        this.PropertyHighlight = '';
        this.HighlightCell = false;
        this.PropertyClass = '';
        this.TextAlign = AlignColumn.Left;
        Object.assign(this, init);
    }
}

export class RowValidationArgs {
    public sender: any;
    public item: any;
    public index: number;
    public isValid = true;
    public isValidAll = true;
    public id: any;
    public column: DataTableCustomColumn;
    public dataSource: any[];
}
