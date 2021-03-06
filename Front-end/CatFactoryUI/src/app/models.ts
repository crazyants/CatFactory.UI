export class ListResponse<TModel> {
    public message: string;
    public didError: boolean;
    public errorMessage: string;
    public model: TModel[];
}

export class SingleResponse<TModel> {
    public message: string;
    public didError: boolean;
    public errorMessage: string;
    public model: TModel;
}

export class ImportDatabaseResponse {
    public message: string;
    public didError: boolean;
    public errorMessage: string;
}

export class ImportedDatabase {
    public name: string;
    public tablesCount: number;
    public viewsCount: number;
    public details: string;
}

export class DatabaseTypeMap {
    public databaseType: string;
    public allowsLengthInDeclaration: boolean;
    public clrFullNameType: string;
}

export class DatabaseDetail {
    public name: string;
    public tables: TableDetail[];
    public views: ViewDetail[];
    public mappings: DatabaseTypeMap[];
}

export class TableDetail {
    public Schema: string;
    public Name: string;
    public ColumnsCount: number;
    public PrimaryKey: string;
    public Identity: string;
    public Details: string;
}

export class ViewDetail {
    public Schema: string;
    public Name: string;
    public ColumnsCount: number;
    public Identity: string;
    public Details: string;
}

export class ImportDatabaseRequest {
    public name: string;
    public connectionString: string;
    public importTables: boolean;
    public importViews: boolean;
}

export class DbRequest {
    public name: string;
    public connectionString: string;
    public type: string;
    public table: string;
    public view: string;
    public column: string;
    public description: string;
    public isTable(): boolean {
        return this.type === 'table';
    }
    public isView(): boolean {
        return this.type === 'view';
    }
    public isColumn(): boolean {
        return this.column ? true : false;
    }
    public getTableRoute(): string[] {
        return ['table-details', [this.name, this.type, this.table].join('|')];
    }
    public getViewRoute(): string[] {
        return ['view-details', [this.name, this.type, this.view].join('|')];
    }
}

export class DbRequestHelper {
    public static createFromId(id: string): DbRequest {
        const values = id.split('|');
        const request = new DbRequest();
        request.name = values[0];
        request.type = values[1];
        if (request.isTable()) {
            request.table = values[2];
        } else if (request.isView()) {
          request.view = values[2];
        }
        if (values.length === 4) {
            request.column = values[3];
        }
        return request;
    }

    public static getDbName(id: string): string {
        const values = id.split('|');
        return values[0];
    }
}
