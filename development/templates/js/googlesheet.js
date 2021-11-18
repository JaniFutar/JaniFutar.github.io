
class GoogleSheet {
    constructor(sheet_id, api_key) {
        this.sheet_id = sheet_id;
        this.api_key = api_key;
    }

    static parse_raw_data(raw_sheets_data) {
        if (!raw_sheets_data.hasOwnProperty('values')) {
            console.log('Sheet data has no "values".')
            console.log(raw_sheets_data);
            return null;
        }

        try {
            let values = raw_sheets_data.values;
            if (values.length < 2) {
                console.log('Length of sheet data is too short.')
                console.log(raw_sheets_data);
                return null;
            }
            let headers = values[0];
            let results = [];

            for (let i = 1; i < values.length; i++) {
                let row = values[i];
                let result = {};
                for (let x = 0; x < row.length; x++) {
                    result[headers[x]] = row[x];
                }
                results.push(result);
            }
            return {
                'sheet_name': raw_sheets_data.range.split('!')[0].replaceAll("'", ''),
                'values': results
            }

        } catch (e) {
            console.log(`Something went wrong while parsing JSONP data: ${e}`)
            console.log(raw_sheets_data);
            return null;
        }

    }

    get_data_from_sheet(sheet_name, callback_function) {
        let url = `https://sheets.googleapis.com/v4/spreadsheets/${this.sheet_id}/values/${encodeURIComponent(sheet_name)}?alt=json&key=${this.api_key}&callback=${callback_function}`;
        var script = document.createElement('script');
        script.src = url;
        document.head.appendChild(script);
    }
}