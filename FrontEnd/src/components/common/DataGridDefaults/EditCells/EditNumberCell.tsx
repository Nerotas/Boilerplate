import { Grid2 as Grid, TextField } from '@mui/material';
import { useGridApiContext } from '@mui/x-data-grid';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { GirdSelector } from '../index';

interface EditNumber extends GirdSelector {
    min?: number;
    max?: number;
}

const EditNumberCell = ({ fieldname, max = 1000, min = 0, row }: EditNumber) => {
    const apiRef = useGridApiContext();

    return (
        <Formik
            initialValues={{
                [fieldname]: row[fieldname],
            }}
            onSubmit={async (values, { resetForm, setStatus, setSubmitting }): Promise<void> => {
                try {
                    apiRef.current.setEditCellValue({ id: row.id, field: fieldname, value: values[fieldname] });
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
                [fieldname]: Yup.number().max(max).min(min).required(),
            })}
        >
            {({ errors, handleBlur, handleSubmit, touched, values }): JSX.Element => (
                <form onSubmit={handleSubmit}>
                    <Grid py={1}>
                        <TextField
                            error={Boolean(touched[fieldname] && errors[fieldname])}
                            fullWidth
                            helperText={Boolean(touched[fieldname] && errors[fieldname]) && `Value must be between ${min} and ${max}`}
                            label={fieldname}
                            name={fieldname}
                            onBlur={handleBlur}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                values[fieldname] = event.target.valueAsNumber;
                                apiRef.current.setEditCellValue({ id: row.id, field: fieldname, value: event.target.valueAsNumber });
                            }}
                            required
                            slotProps={{
                                htmlInput: {
                                    'data-testid': 'editNumberCell',
                                },
                            }}
                            type="number"
                            value={values[fieldname]}
                            variant="outlined"
                        />
                    </Grid>
                </form>
            )}
        </Formik>
    );
};

export default EditNumberCell;
