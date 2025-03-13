import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = ['Account.SimetriaId__c', 'Account.SupplierId__c','Account.RecordType.Name'];

export default class AccountAlert extends LightningElement {
    @api recordId;
    showAlert = false;
    accountName = '';

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredAccount({ error, data }) {
        if (data) {
            const simetriaId = data.fields.SimetriaId__c.value;
            const supplierId = data.fields.SupplierId__c.value;
            let recordTypeDetails = data.fields['RecordType'];

            this.accountName = recordTypeDetails.displayValue;
            this.showAlert = !simetriaId && !supplierId;
        } else if (error) {
            console.error('Error fetching account data', error);
        }
    }
}