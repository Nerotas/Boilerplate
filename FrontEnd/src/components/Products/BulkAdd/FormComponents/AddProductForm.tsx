import {
    Box,
    Grid2 as Grid,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Autocomplete,
    Typography,
    LinearProgress,
    FormHelperText,
    Chip,
    InputAdornment,
    CircularProgress,
} from '@mui/material';
import { ActionButton } from 'components/common/Buttons/ActionButtons';
import { useDispatch } from 'redux-state/store';
import { Formik } from 'formik';
import { acceptExportNameExpression, acceptProductsExpression } from 'constants/Regex';
import { useCallback } from 'react';
import { stringToArrayHandler } from 'helpers/arrayToStringListHandler';
import { CreateProduct, ProductsAndSectionsForProducts } from 'models/Products/Products';
import { DisplayName } from 'models/common/DisplayName';
import { addProduct } from 'redux-state/bulkAddProducts/actions';
import * as Yup from 'yup';

interface AddProductModalProps {
    isFetchingPersons: boolean;
    isFetchingProducts: boolean;
    isFetchingProductSections: boolean;
    isLoadingPersons: boolean;
    isLoadingProducts: boolean;
    isLoadingProductSections: boolean;
    personTypes: DisplayName[];
    products: DisplayName[];
    productSections: ProductsAndSectionsForProducts[];
}

const AddProductModal = ({
    isFetchingPersons = false,
    isFetchingProducts = false,
    isFetchingProductSections = false,
    isLoadingPersons = false,
    isLoadingProducts = false,
    isLoadingProductSections = false,
    personTypes = [],
    products = [],
    productSections = [],
}: AddProductModalProps) => {
    const dispatch = useDispatch();

    const addRow = async (newProduct: CreateProduct) => {
        dispatch(addProduct(newProduct));
    };

    const OptionRender = useCallback((props: any, option: ProductsAndSectionsForProducts) => {
        const { key, ...optionProps } = props;
        return (
            <Box component="li" key={`${option.name}_${option.defaultClientName}`} {...optionProps}>
                <Typography>
                    {option.name} ({option.defaultClientName})
                </Typography>
            </Box>
        );
    }, []);

    const ProductOptionRender = useCallback((props: any, option: DisplayName) => {
        const { key, ...optionProps } = props;
        return (
            <Box component="li" key={`${option.name}_${option.displayName}_product`} {...optionProps}>
                <Typography>{option.displayName}</Typography>
            </Box>
        );
    }, []);

    const PersonOptionRender = useCallback((props: any, option: DisplayName) => {
        const { key, ...optionProps } = props;
        return (
            <Box component="li" key={`${option.name}_${option.displayName}_person`} {...optionProps}>
                <Typography>{option.displayName}</Typography>
            </Box>
        );
    }, []);

    return (
        <Formik
            initialValues={{
                productSection: { name: '', defaultClientName: '' },
                name: '',
                defaultClientName: '',
                objectivity: 'SUBJECTIVE',
                productTypes: [],
                personTypes: [],
                synonyms: '',
            }}
            onSubmit={async (values, { resetForm, setStatus, setSubmitting }): Promise<void> => {
                const sendProduct = { ...values, synonyms: stringToArrayHandler(values.synonyms) };
                try {
                    // NOTE: Make API request
                    addRow(sendProduct);
                    resetForm();
                    setStatus({ success: true });
                    setSubmitting(false);
                } catch (err) {
                    console.error(err);
                    setStatus({ success: false });
                    setSubmitting(false);
                }
            }}
            validationSchema={Yup.object().shape({
                productSection: Yup.object().shape({ name: Yup.string(), defaultClientName: Yup.string() }).required(),
                id: Yup.number(),
                name: Yup.string().max(255).matches(acceptProductsExpression, 'Invalid charaters'),
                defaultClientName: Yup.string().max(255).matches(acceptExportNameExpression, 'Invalid charaters'),
                objectivity: Yup.mixed().oneOf(['SUBJECTIVE', 'OBJECTIVE']),
                productTypes: Yup.array()
                    .of(Yup.object().shape({ name: Yup.string(), displayName: Yup.string() }))
                    .required(),
                personTypes: Yup.array()
                    .of(Yup.object().shape({ name: Yup.string(), displayName: Yup.string() }))
                    .required(),
                synonyms: Yup.string(),
            })}
        >
            {({ dirty, errors, handleBlur, handleChange, handleSubmit, isSubmitting, isValid, setFieldValue, touched, values }): JSX.Element =>
                isSubmitting ? (
                    <CircularProgress />
                ) : (
                    // re render required to clear fields
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ pt: 1, pb: 1, mr: 1 }}>
                            <Grid alignItems="center" container direction="row" spacing={1}>
                                <Grid container direction="row" size="grow" spacing={1}>
                                    <Grid container direction="row" size={12} spacing={2}>
                                        <Grid size={3}>
                                            <TextField
                                                error={Boolean(touched.name && errors.name)}
                                                fullWidth
                                                helperText={touched.name && errors.name}
                                                label="Product Name"
                                                name="name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                required
                                                slotProps={{
                                                    input: {
                                                        inputProps: {
                                                            'data-testid': 'addProductModalName',
                                                        },
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <Chip
                                                                    component="a"
                                                                    href="https://erotasai.atlassian.net/wiki/spaces/KB/pages/2948399314/Allowed+Characters+in+our+Registry"
                                                                    label="Best Practices"
                                                                    sx={{ cursor: 'pointer' }}
                                                                    target="_blank"
                                                                />
                                                            </InputAdornment>
                                                        ),
                                                    },
                                                }}
                                                value={values.name}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid size={3}>
                                            <TextField
                                                error={Boolean(touched.defaultClientName && errors.defaultClientName)}
                                                fullWidth
                                                helperText={
                                                    touched.defaultClientName && typeof errors.defaultClientName === 'string'
                                                        ? errors.defaultClientName
                                                        : undefined
                                                }
                                                label="Default Export Name"
                                                name="defaultClientName"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                required
                                                slotProps={{
                                                    input: {
                                                        inputProps: {
                                                            'data-testid': 'addProductModalDefaultClientName',
                                                        },
                                                    },
                                                }}
                                                value={values.defaultClientName}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid size={3}>
                                            <Autocomplete
                                                freeSolo
                                                fullWidth
                                                getOptionLabel={(option: any) => `${option.name} (${option.defaultClientName})`}
                                                loading={isLoadingProductSections || isFetchingProductSections}
                                                noOptionsText="No Products Available"
                                                onBlur={handleBlur}
                                                onChange={(e, value) => setFieldValue('productSection', value)}
                                                options={productSections || []}
                                                renderInput={(params) =>
                                                    isLoadingProductSections || isFetchingProductSections ? (
                                                        <LinearProgress />
                                                    ) : (
                                                        <TextField
                                                            {...params}
                                                            label="Product Section"
                                                            onBlur={handleBlur}
                                                            value={values.productSection}
                                                        />
                                                    )
                                                }
                                                renderOption={OptionRender}
                                            />
                                        </Grid>
                                        <Grid size={3}>
                                            <Autocomplete
                                                freeSolo
                                                fullWidth
                                                getOptionLabel={(option: any) => `${option.displayName}`}
                                                loading={isFetchingProducts}
                                                multiple
                                                noOptionsText="No Product Types Available"
                                                onBlur={handleBlur}
                                                onChange={(e, value) => setFieldValue('productTypes', value)}
                                                options={products || []}
                                                renderInput={(params) =>
                                                    isLoadingProducts || isFetchingProducts ? (
                                                        <LinearProgress />
                                                    ) : (
                                                        <TextField {...params} label="Product Type Section" value={values.productTypes} />
                                                    )
                                                }
                                                renderOption={ProductOptionRender}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row" size={12} spacing={2}>
                                        <Grid size={3}>
                                            <Autocomplete
                                                freeSolo
                                                fullWidth
                                                getOptionLabel={(option: any) => `${option.displayName}`}
                                                loading={isLoadingPersons || isFetchingPersons}
                                                multiple
                                                noOptionsText="No Person Types Available"
                                                onBlur={handleBlur}
                                                onChange={(e, value) => setFieldValue('personTypes', value)}
                                                options={personTypes || []}
                                                renderInput={(params) =>
                                                    isLoadingPersons || isFetchingPersons ? (
                                                        <LinearProgress />
                                                    ) : (
                                                        <TextField {...params} label="Person Type Section" value={values.personTypes} />
                                                    )
                                                }
                                                renderOption={PersonOptionRender}
                                            />
                                        </Grid>

                                        <Grid size={2}>
                                            <FormControl fullWidth>
                                                <InputLabel id="objectivity-label">Objectivity</InputLabel>
                                                <Select
                                                    error={Boolean(touched.objectivity && errors.objectivity)}
                                                    fullWidth
                                                    inputProps={{
                                                        input: {
                                                            'data-testid': 'addProductModalObjectivity',
                                                        },
                                                    }}
                                                    label="Objectivity"
                                                    name="objectivity"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.objectivity}
                                                    variant="outlined"
                                                >
                                                    <MenuItem value="SUBJECTIVE">Subjective</MenuItem>
                                                    <MenuItem value="OBJECTIVE">Objective</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid size="grow">
                                            <TextField
                                                error={Boolean(touched.synonyms && errors.synonyms)}
                                                fullWidth
                                                helperText={touched.synonyms && errors.synonyms}
                                                label="Synonyms (EN-US)"
                                                name="synonyms"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                slotProps={{
                                                    input: {
                                                        inputProps: {
                                                            'data-testid': 'addProductModalSynonyms',
                                                        },
                                                    },
                                                }}
                                                value={values.synonyms}
                                                variant="outlined"
                                            />
                                            <FormHelperText id="synonym-helper-text">Separate values with comma</FormHelperText>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid pb={3} size={1}>
                                    <ActionButton
                                        data-testid="SubmitAddProductModal"
                                        disabled={!(isValid && dirty)}
                                        type="submit"
                                        variant="contained"
                                    >
                                        ADD
                                    </ActionButton>
                                </Grid>
                            </Grid>
                        </Box>
                    </form>
                )
            }
        </Formik>
    );
};

export default AddProductModal;
