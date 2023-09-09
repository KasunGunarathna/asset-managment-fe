import React from "react";
import Grid from "@mui/material/Grid";
import { Box, Button } from "@mui/material";
import { FormField as FormFields } from "../../types/types";
import FormField from "./FormField";

interface FormGeneratorProps {
  fields: FormFields[];
  formik: any;
  goBack: any;
  view?: any;
  name: any;
  onSubmit: any;
  password?: any;
  showPassword?:any;
  setShowPassword?: any;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({
  fields,
  formik,
  goBack,
  view,
  name,
  password,
  showPassword,
  setShowPassword,
}) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        {fields.map((field) => (
          <Grid item xs={12} md={6} key={field.name}>
            <FormField
              name={field.name}
              view={view}
              label={field.label}
              type={field.type}
              select={field.select}
              options={field.options}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched[field.name] && Boolean(formik.errors[field.name])
              }
              helperText={
                formik.touched[field.name] && formik.errors[field.name]
              }
              password={field.password}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </Grid>
        ))}

        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between">
            <Button onClick={goBack} variant="outlined" color="primary">
              Cancel
            </Button>
            {view ? (
              <></>
            ) : (
              <Button type="submit" variant="contained" color="primary">
                {name}
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormGenerator;
