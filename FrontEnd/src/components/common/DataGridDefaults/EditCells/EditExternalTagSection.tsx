import {
    Grid2 as Grid,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Autocomplete,
    LinearProgress,
    TextField,
} from '@mui/material';
import { useGet } from 'hooks';
import { useGridApiContext } from '@mui/x-data-grid';
import { GirdSelector } from '../index';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { acceptExportNameExpression } from 'constants/Regex';

const EditExternalProductSection = ({ row }: GirdSelector) => {
    const apiRef = useGridApiContext();

    const {
        data: productsSectionOptions,
        isFetching,
        isLoading,
    } = useGet<string[]>({
        url: `${process.env.REACT_APP_EROTAS_CONSOLE_API}/productsSections/defaultProductSectionNames`,
        apiLabel: 'getAllDefaultProductSectionNames',
    });

    return isLoading || isFetching ? (
        <CircularProgress />
    ) : (
        <Formik
            initialValues={{
                externalProductsection: row.externalProductsection,
            }}
            onSubmit={async (values, { resetForm, setStatus, setSubmitting }): Promise<void> => {
                try {
                    apiRef.current.setEditCellValue({
                        id: row.productsCatalogEntryId,
                        field: 'externalProductsection',
                        value: values.externalProductsection,
                    });

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
                externalProductsection: Yup.string().matches(acceptExportNameExpression, 'Invalid charaters').required(),
            })}
        >
            {({ handleSubmit, setFieldValue, values }): JSX.Element => (
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Grid py={1}>
                        <Autocomplete
                            freeSolo
                            fullWidth
                            getOptionLabel={(option: any) => `${option}`}
                            loading={isLoading || isFetching}
                            noOptionsText="No Products Sections Available"
                            onChange={(e, value) => {
                                apiRef.current.setEditCellValue({
                                    id: row.productsCatalogEntryId,
                                    field: 'externalProductsection',
                                    value,
                                });
                                setFieldValue('externalProductsection', value);
                            }}
                            options={productsSectionOptions || []}
                            renderInput={(params) =>
                                isLoading || isFetching ? (
                                    <LinearProgress />
                                ) : (
                                    <TextField
                                        {...params}
                                        data-testid="extenalProductSectionEditCell"
                                        label="External Products Section"
                                        value={values.externalProductsection}
                                    />
                                )
                            }
                        />
                    </Grid>
                </form>
            )}
        </Formik>
    );
};

export default EditExternalProductSection;
