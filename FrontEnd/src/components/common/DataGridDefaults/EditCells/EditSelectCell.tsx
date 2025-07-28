import { FormControl, Grid2 as Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useGridApiContext } from '@mui/x-data-grid';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { GirdSelector } from '../index';

interface StringCell extends GirdSelector {
    selection: string[];
}

export const EditSelectCell = ({ fieldname, row, selection }: StringCell) => {
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
                [fieldname]: Yup.string().max(255).min(3).required(),
            })}
        >
            {({ errors, handleBlur, handleSubmit, touched, values }): JSX.Element => (
                <form onSubmit={handleSubmit}>
                    <Grid py={1}>
                        <FormControl fullWidth>
                            <InputLabel id="common-edit-select">{fieldname}</InputLabel>
                            <Select
                                error={Boolean(touched[fieldname] && errors[fieldname])}
                                fullWidth
                                label={fieldname}
                                name={fieldname}
                                onBlur={handleBlur}
                                onChange={(event: SelectChangeEvent<string>) => {
                                    values[fieldname] = event.target.value;
                                    apiRef.current.setEditCellValue({ id: row.id, field: fieldname, value: event.target.value });
                                }}
                                required
                                value={values[fieldname]}
                                variant="outlined"
                            >
                                {selection.map((item) => (
                                    <MenuItem key={`edit-selection_${item}`} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </form>
            )}
        </Formik>
    );
};

export default EditSelectCell;
