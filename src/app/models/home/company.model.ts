export class CompanyModel {
    username: string;
    password: string;
    public get create(): Array<any> {
        return [
            {
                id: 'MediaURL',
                label: 'MediaURL',
                name: 'MediaURL',
                type: 'link'
            },
            {
                id: 'Color',
                label: 'Color (vd: #ffffff):',
                name: 'Color',
                type: 'text'
            }
            ,
            {
                id: 'Nav',
                label: 'Narbar:',
                name: 'Nav',
                type: 'selected',
                data: [{ Name: 'not change', value: 1 },
                { Name: 'change', value: 2 }]
            }
        ];
    }
}
