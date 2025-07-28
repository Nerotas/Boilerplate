const CSVProductsTemplate = {
    columns: [
        {
            name: 'Product Name',
            key: 'name',
            required: true,
            description: 'Technical name of the product, used for internal purposes.',
            data_type: 'string',
        },
        {
            name: 'Default Client Name',
            key: 'defaultClientName',
            required: true,
            description: 'Product Display Name, used for external purposes.',
            data_type: 'string',
        },
        {
            key: 'productSection',
            name: 'Product Section',
            required: true,
            data_type: 'string',
            description: 'Name of the product section. If it does not exist, it will be created.',
        },
        {
            key: 'defaultProductSection',
            name: 'Product Section Default client Name',
            required: true,
            data_type: 'string',
            description: 'Default Client Name for the Product Section, used for external purposes.',
        },
        {
            key: 'personTypes',
            name: 'Person Types',
            required: true,
            description: 'Separate multiple person types with commas. Example: "Person Type 1, Person Type 2"',
            data_type: 'string',
        },
        {
            key: 'productTypes',
            name: 'Product Types',
            required: true,
            description: 'Separate multiple product types with commas. Example: "Product Type 1, Product Type 2"',
            data_type: 'string',
        },
        {
            key: 'synonyms',
            name: 'Synonyms',
            data_type: 'string',
            description: 'Separate multiple synonyms with commas. Example: "Synonym 1, Synonym 2"',
        },
    ],
};

export default CSVProductsTemplate;
