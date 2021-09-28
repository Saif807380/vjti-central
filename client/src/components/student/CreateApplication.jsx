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
const BASE_URL = process.env.REACT_APP_API_URL;

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
    const [application, setApplication] = useState({
        title: "",
        description: "",
        domainAchievement: "",
        fileUrl: ""
    });
    const [applicationType, setApplicationType] = useState("Hackathon");
    var [faculty, setFaculty] = useState("61307e34e424192afc56a613");
    const [file, setFile] = useState();
    const { userID } = useAuthState();
    const isEditPage = false;
    const [isLoading, setIsLoading] = useState(isEditPage);
    // useEffect(() => {
    //     if (isEditPage) {
    //         axios
    //             .get(`/api/editApplication/${userID}`, {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             })
    //             .then((res) => {
    //                 console.log(res.data);
    //                 setApplication(res.data.data);
    //             })
    //             .catch((err) => console.log(err))
    //             .finally(() => setIsLoading(false));
    //     }
    // }, [isEditPage]);

    const fetchingFaculties = async () => {
        const fetchedFaculties = await axios.get(
            `${BASE_URL}/faculty`,
        );
        setValue(fetchedFaculties.data.data["faculties"]);
        [faculty, setFaculty] = fetchedFaculties.data.data["faculties"][0]["_id"];
        setIsLoading(false);
    };

    useEffect(() => {
        fetchingFaculties();
    }, []);

    const handleChange = (event) => {
        setApplicationType(event.target.value);
    };

    const handleFacultyChange = (event) => {
        setFaculty(event.target.value);
    };
    const [value, setValue] = useState([]);

    const validationSchema = yup.object({
        title: yup.string().required(),
        description: yup.string().required(),
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
                initialValues={application}
                validationSchema={validationSchema}
                onSubmit={async (data, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    let formData = new FormData();
                    let reqBody = { ...data };
                    formData.append("title", reqBody["title"]);
                    formData.append("description", reqBody["description"]);
                    formData.append("domainAchievement", applicationType);
                    formData.append("file", file);
                    formData.append("studentID", userID);
                    formData.append("facultyID", faculty);
                    let response;
                    if (isEditPage) {
                        response = await axios.put(
                            "/api/student/editApplication/" + userID,
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
                        console.log(formData)
                        console.log(file);
                        response = await axios.post(
                            BASE_URL + "/applications/apply",
                            formData,
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
                                    <InputLabel id="domainAchievement">
                                        Domain of Achievement
                                    </InputLabel>
                                    <Select
                                        value={applicationType}
                                        defaultValue="Hackathon"
                                        onChange={handleChange}
                                        labelId="domainAchievement"
                                        disabled={isEditPage}
                                    >
                                        <MenuItem value="Hackathon">Hackathon</MenuItem>
                                        <MenuItem value="Competition">Competition</MenuItem>
                                        <MenuItem value="Research Paper">Research Paper</MenuItem>
                                        <MenuItem value="Committee Position"> Committee Position</MenuItem>
                                    </Select>
                                </Grid>
                                <br></br>
                                <br></br>

                                <Grid item xs={12}>
                                    <InputLabel id="faculty">
                                        Select Faculty
                                    </InputLabel>
                                    <Select
                                        value={faculty}
                                        defaultValue="61307e34e424192afc56a613"
                                        onChange={handleFacultyChange}
                                        labelId="faculty"
                                        disabled={isEditPage}
                                    >
                                        {value.map((faculty) => (
                                            <MenuItem value={faculty._id}>{faculty.name}</MenuItem>
                                        ))}
                                    </Select>
                                </Grid>

                                <br></br>
                                <br></br>
                                <Grid item xs={12}>
                                    <input
                                        type="file"
                                        name="fileUrl"
                                        id="fileUrl"
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                </Grid>
                                <br></br>
                                <br></br>
                                <Grid item xs={12}>
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        disabled={isSubmitting}
                                        type="submit"
                                    >
                                        submit
                                    </Button>
                                </Grid>
                            </Paper>
                        </Container>
                    </Form>
                )}
            </Formik>
        </Container >
    );
}
