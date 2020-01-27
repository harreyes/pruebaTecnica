export class AppConfig {

    static get CreateTable() {
        return {
            /**
    * Table ActividadComercial
    */
            addressesTable: 'CREATE TABLE IF NOT EXISTS AddressesTable (addID integer primary key autoincrement, add_name text, add_addresses text)'

        };
    }
}



