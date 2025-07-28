import { SelectChangeEvent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useGet } from 'hooks';
import { DisplayName } from 'models/common/DisplayName';
import qs from 'qs';
import { useSearchParams } from 'react-router-dom';
import { openInfoGlobalSnackbar } from 'redux-state/globalSnackbar/actions';
import { useDispatch } from 'redux-state/store';

interface IProductSelect {
    newProductSelect: (product: DisplayName) => void;
    productType: DisplayName;
}

const ProductSelect = ({ newProductSelect, productType }: IProductSelect) => {
    const [_searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { data: productTypeOptions } = useGet<DisplayName[]>({
        url: `${process.env.REACT_APP_EROTAS_CONSOLE_API}/productTypes/names`,
        apiLabel: 'getAllDisplayNameNames',
    });

    const handleChange = (event: SelectChangeEvent) => {
        const selectedIndex = productTypeOptions?.findIndex((product) => product.displayName === event.target.value);
        let newProduct: DisplayName;

        if (selectedIndex && productTypeOptions) {
            newProduct = productTypeOptions[selectedIndex];
        } else {
            newProduct = productType;
        }

        if (event.target.value === 'ALL') {
            newProduct = { displayName: 'ALL', name: '' };
            dispatch(
                openInfoGlobalSnackbar({
                    message: 'Selecting all products is currently exerimental. Users may experience long load times and/or timeouts.',
                })
            );
        }
        setSearchParams(qs.stringify({ displayName: newProduct.displayName, id: newProduct.name, name: newProduct.name }));
        newProductSelect(newProduct);
    };

    return (
        <FormControl data-testid="productSelectDropDown" sx={{ m: 1, minWidth: 100 }} variant="standard">
            <InputLabel id="productType-select-autowidth-label">Product Type</InputLabel>
            <Select autoWidth label="Product Type" onChange={handleChange} value={productType.displayName}>
                <MenuItem key="ALL_PRODUCTS_dropdown" value="ALL">
                    ALL
                </MenuItem>
                {productTypeOptions &&
                    productTypeOptions.map((productType) => (
                        <MenuItem
                            key={`${productType.displayName}_${productType.name}_dropdown`}
                            value={productType.displayName}
                        >{`${productType.displayName}`}</MenuItem>
                    ))}
            </Select>
        </FormControl>
    );
};

export default ProductSelect;
