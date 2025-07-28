import { Grid2 as Grid, TextField } from '@mui/material';
import { useGridApiContext } from '@mui/x-data-grid';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { GirdSelector } from '../index';

interface StringCell extends GirdSelector {
    regex?: RegExp;
}

export const EditStringCell = ({ fieldname, regex = /^[a-zA-Z0-9]/, row }: StringCell) => {
    const apiRef = useGridApiContext();

    return (
        <Formik
            initialValues={{
                [fieldname]: row[fieldname as keyof typeof row],
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
                [fieldname]: Yup.string().max(255).min(3).required().matches(regex),
            })}
        >
            {({ errors, handleBlur, handleSubmit, touched, values }): JSX.Element => (
                <form onSubmit={handleSubmit}>
                    <Grid py={1}>
                        <TextField
                            error={Boolean(touched[fieldname] && errors[fieldname])}
                            fullWidth
                            helperText={Boolean(touched[fieldname] && errors[fieldname]) && `Unaccepted format`}
                            label={fieldname}
                            name={fieldname}
                            onBlur={handleBlur}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                values[fieldname] = event.target.value;
                                apiRef.current.setEditCellValue({ id: row.id, field: fieldname, value: event.target.value });
                            }}
                            required
                            slotProps={{
                                htmlInput: {
                                    'data-testid': 'commonStringEditor',
                                },
                            }}
                            value={values[fieldname]}
                            variant="outlined"
                        />
                    </Grid>
                </form>
            )}
        </Formik>
    );
};

export default EditStringCell;
