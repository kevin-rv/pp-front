import csvToJson from 'convert-csv-to-json'
import axios from 'axios';

export default class publicHolidayApi {
    API_URL = 'https://etalab.github.io/jours-feries-france-data/csv/jours_feries.csv';

    getHolidays()
    {
        return axios
            .get(this.API_URL)
            .then(function (response) {
                let json = csvToJson.fieldDelimiter(',').csvStringToJson(response.data)
                for(let i = 0; i < json.length; ++i) {
                    json[i]['zones'] = json[i]['zones'].split('|')
                }

                return json
            })
            .catch(error => {
                throw error // todo gérer l'erreur ??
            })
    }
}
