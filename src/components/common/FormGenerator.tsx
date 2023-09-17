import React from "react";
import Grid from "@mui/material/Grid";
import { Avatar, Box, Button, FormHelperText, InputLabel } from "@mui/material";
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
  showPassword?: any;
  setShowPassword?: any;
  onPhoto?: any;
  handleOpenModal?: any;
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
  onPhoto,
  handleOpenModal,
}) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        {fields.map((field) =>
          !field.photo ? (
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
                  formik.touched[field.name] &&
                  Boolean(formik.errors[field.name])
                }
                helperText={
                  formik.touched[field.name] && formik.errors[field.name]
                }
                password={field.password}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </Grid>
          ) : (
            <Grid item xs={12} md={6}>
              <InputLabel>{field.label}</InputLabel>
              <input
                type="file"
                id={field.name}
                disabled={view ? true : false}
                name={field.name}
                accept="image/*"
                style={{ margin: "10px" }}
                onChange={(event) => {
                  const selectedFile =
                    event.currentTarget.files?.[0] || formik.values[field.name];
                  onPhoto(field.name, selectedFile);
                }}
              />
              {formik.touched[field.name] &&
                formik.errors[field.name] && ( // Display error helper text
                  <FormHelperText error>
                    {formik.errors[field.name]}
                  </FormHelperText>
                )}
              <Avatar
                alt={field.name}
                src={formik.values[field.name]}
                sx={{
                  width: 50,
                  height: 50,
                  cursor: "pointer",
                  margin: "10px",
                }}
                onClick={() => handleOpenModal(formik.values[field.name])}
              />
            </Grid>
          ),
        )}

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
