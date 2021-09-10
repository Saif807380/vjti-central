import {
    Button,
    Container,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import axios from "axios";
import { Form, Formik, useField } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { useAuthState } from "../../context/AuthContext";
/*{
studentID:
facultyID:
title:
description:
domainAchievement:

}*/
const MyTextField = ({
    placeholder,
    type = "text",
    fullWidth = true,
    multiline = false,
    ...props
}) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return (
        <TextField
            placeholder={placeholder}
            {...field}
            helperText={errorText}
            error={!!errorText}
            type={type}
            fullWidth={fullWidth}
            multiline={multiline}
        />
    );
};

export default function CreateApplication() {
    const { token } = useAuthState();
    const [productType, setProductType] = useState("course");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [product, setProduct] = useState({
        Title: "",
        Description: "",
        DomainofAchievement: "",
    });
    const [imageUrl, setImageUrl] = useState();
    const [file, setFile] = useState();
    const productId = useParams().productId;
    const isEditPage = !!productId;
    const [isLoading, setIsLoading] = useState(isEditPage);
    useEffect(() => {
        if (isEditPage) {
            axios
                .get(`/products/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((res) => {
                    console.log(res.data);
                    setProduct(res.data.data);
                    //  setProductType(checkType(res.data.data));
                })
                .catch((err) => console.log(err))
                .finally(() => setIsLoading(false));
        }
    }, [isEditPage]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleChange = (event) => {
        setProductType(event.target.value);
    };

    // Validator schema for Formik
    const validationSchema = yup.object({
        Title: yup.string().required(),
        Description: yup.string().required(),
    });

    return (
        <Container>
            <header>
                <div
                    className="heading"
                    style={{ textAlign: "center", padding: "15px" }}
                >
                    <Typography variant="h4" style={{ color: "black" }}>
                        <u>Add a New Application</u>
                    </Typography>
                </div>
            </header>

            <Formik
                validateOnChange={true}
                initialValues={product}
                validationSchema={validationSchema}
                onSubmit={async (data, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    let formData = new FormData();
                    let reqBody = { ...data };
                    formData.append("Title", reqBody["title"]);
                    formData.append("Description", reqBody["description"]);
                    formData.append("files", imageUrl);

                    // Finish preprocessing
                    let response;
                    if (isEditPage) {
                        response = await axios.put(
                            "/api/student/editApplication/" + productId,
                            {
                                ...reqBody
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        );
                    } else {
                        response = await axios.post(
                            "/api/applications/apply",
                            formData,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        );
                    }
                    console.log("submit: Done ", response.data);
                    setSubmitting(false);
                    resetForm();
                }}
            >
                {({ values, errors, isSubmitting }) => (
                    <Form>
                        <Container maxWidth="sm">
                            <Paper style={{ padding: 16 }} elevation={2}>
                                <Grid container alignItems="flex-start" spacing={4}>
                                    <Grid item xs={12}>
                                        <MyTextField placeholder="Title of Achievment" name="title" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MyTextField placeholder="Description" name="description" />
                                    </Grid>

                                </Grid>
                                <br></br>
                                <br></br>
                                <Grid item xs={12}>
                                    <InputLabel id="product-select-label">
                                        Domain of Achievement
                                    </InputLabel>
                                    <Select
                                        value={productType}
                                        defaultValue="Competition"
                                        onChange={handleChange}
                                        labelId="product-select-label"
                                        disabled={isEditPage}
                                    >
                                        <MenuItem value="hacakthon">Hacakathon</MenuItem>

                                        <MenuItem value="competition">Competition</MenuItem>
                                        <MenuItem value="research">Research</MenuItem>
                                    </Select>
                                </Grid>

                                <br></br>
                                <br></br>
                                <Grid item xs={12}>
                                    <input
                                        type="file"
                                        name="imageUrl"
                                        id="imageUrl"
                                        onChange={(e) => setImageUrl(e.target.files[0])}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="h5"
                                        style={{ color: "green", textAlign: "center" }}
                                    >

                                    </Typography>
                                </Grid>


                            </Paper>
                        </Container>
                    </Form>
                )}
            </Formik>

        </Container >
    );
}
