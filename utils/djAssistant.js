var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appAnc9ynUzG3TMAd');

export async function getAirtableData() {

    // const allRecords = await base.select().all()
    const allRecords = await base('Songs for People').select({view: 'Prod'}).all().then(records => {
        // records array will contain every record in Main View.
        return records.map((record) => {
            return {...record.fields}
        });
    }).catch(err => {
        // Handle error.
        console.error(err); 
        return;
    })


    return allRecords;
}