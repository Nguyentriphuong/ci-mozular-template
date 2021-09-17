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
                label: 'Theme: ',
                name: 'Color',
                type: 'selected',
                data: [
                { Name: 'theme 1', value: 1 },
                { Name: 'theme 2', value: 2 },
                { Name: 'theme 3', value: 3 },
                { Name: 'theme 4', value: 4 },
                { Name: 'theme 5', value: 5 },
                { Name: 'theme 6', value: 6 },
                { Name: 'theme 7', value: 7 },
              ]
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
