import React, { useEffect, useState, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Button,
  Paper,
  useMediaQuery
} from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import Spinner from "../../components/Spinner";
import { useHistory } from "react-router-dom";
import { SnackbarContext } from "../../context/SnackbarContext";
import OtherAchievementsForm from "./OtherAchievementsForm";
import ResearchPaperForm from "./ResearchPaperForm";
import constants from "../../constants";
import {
  createApplication,
  getFacultyList
} from "../../actions/applicationActions";
import { useAuthState } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "80vh",
    marginTop: theme.spacing(2)
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "50%"
    },
    [theme.breakpoints.up("md")]: {
      width: "40%"
    }
  },
  form: {
    width: "100%",
    justifyContent: "center"
  },
  formInner: {
    padding: "20px 30px"
  },
  formControl: {
    marginBottom: "10px",
    width: "100%"
  }
}));

const NewApplication = () => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { setOpen, setSeverity, setMessage } = useContext(SnackbarContext);
  const [loading, setLoading] = useState(false);
  const { token, userID } = useAuthState();

  const [application, setApplication] = useState({
    title: "",
    description: "",
    domainAchievement: "",
    faculty: "",
    startDate: new Date(),
    endDate: new Date(),
    organisedBy: "",
    doi: ""
  });

  const [file, setFile] = useState(null);
  const [facultyList, setFacultyList] = useState([]);

  const [errors, updateErrors] = useState({
    title: "",
    description: "",
    domainAchievement: "",
    faculty: "",
    startDate: "",
    endDate: "",
    organisedBy: "",
    doi: "",
    file: ""
  });

  const handleApplication = (e) => {
    setApplication((prevApplication) => ({
      ...prevApplication,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
    setLoading(true);
    getFacultyList({ token }).then((res) => {
      if (res.error) {
      } else {
        setFacultyList(res.data.data.faculties);
      }
      setLoading(false);
    });
  }, [token]);

  const isFormValid = () => {
    let formIsValid = true;
    updateErrors({
      title: "",
      description: "",
      domainAchievement: "",
      faculty: "",
      startDate: "",
      endDate: "",
      organisedBy: "",
      doi: "",
      file: ""
    });
    if (!application.title.length) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        title: "* Please enter a valid title"
      }));
      formIsValid = false;
    }
    if (!application.description.length) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        description: "* Please enter a valid description"
      }));
      formIsValid = false;
    }
    if (!application.domainAchievement.length) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        domainAchievement: "* Please select a domain"
      }));
      formIsValid = false;
    }
    if (!application.faculty.length) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        faculty: "* Please select a faculty"
      }));
      formIsValid = false;
    }
    if (!application.organisedBy.length) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        organisedBy: "* Please enter organiser name"
      }));
      formIsValid = false;
    }
    if (!application.startDate) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        startDate: "* Please select a date"
      }));
      formIsValid = false;
    }
    if (
      application.domainAchievement !== "Research Paper" &&
      !application.endDate
    ) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        endDate: "* Please select a date"
      }));
      formIsValid = false;
    }
    if (
      application.domainAchievement === "Research Paper" &&
      !application.doi
    ) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        doi: "* Please enter the DOI"
      }));
      formIsValid = false;
    }
    if (!file) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        file: "* Please select a file"
      }));
      formIsValid = false;
    }
    return formIsValid;
  };

  const handleFormSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    if (isFormValid()) {
      let formData = new FormData();
      formData.append("title", application.title);
      formData.append("description", application.description);
      formData.append("domainAchievement", application.domainAchievement);
      formData.append("file", file);
      formData.append("studentID", userID);
      formData.append("facultyID", application.faculty);
      formData.append("organisedBy", application.organisedBy);
      formData.append("startDate", application.startDate);
      formData.append("endDate", application.endDate);
      formData.append("doi", application.doi);
      createApplication({ body: formData, token }).then((res) => {
        setLoading(false);
        if (res.error) {
          setSeverity("error");
          setMessage(res.error);
          setOpen(true);
        } else {
          setSeverity("success");
          setMessage("Application submitted successfully");
          setOpen(true);
          history.push("/student/applications");
        }
      });
    }
    setLoading(false);
  };

  return loading ? (
    <Spinner />
  ) : (
    <Box
      className={classes.root}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Paper elevation={isSmallScreen ? 0 : 3} className={classes.paper}>
        {!application.domainAchievement && (
          <div style={{ marginTop: "24px" }}>
            <Typography variant="h5">New Achievement</Typography>
          </div>
        )}
        <form className={classes.form} noValidate>
          <div className={classes.formInner}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <FormControl
                  variant="outlined"
                  required
                  className={classes.formControl}
                  error={errors.faculty.length !== 0}
                >
                  <InputLabel id="faculty-label">Faculty</InputLabel>
                  <Select
                    labelId="faculty-label"
                    id="faculty"
                    name="faculty"
                    value={application.faculty}
                    onChange={handleApplication}
                    label="Faculty"
                  >
                    {facultyList.map((faculty) => (
                      <MenuItem key={faculty._id} value={faculty._id}>
                        {faculty.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.faculty}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  variant="outlined"
                  required
                  className={classes.formControl}
                  error={errors.domainAchievement.length !== 0}
                >
                  <InputLabel id="domain-label">Domain</InputLabel>
                  <Select
                    labelId="domain-label"
                    id="domain"
                    name="domainAchievement"
                    value={application.domainAchievement}
                    onChange={handleApplication}
                    label="Domain"
                  >
                    {constants.DOMAINS.map((domain) => (
                      <MenuItem key={domain} value={domain}>
                        {domain}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.domainAchievement}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Box style={{ marginBottom: "16px" }}>
              {
                {
                  Hackathon: (
                    <OtherAchievementsForm
                      labels={constants.LABELS.HACKATHON}
                      onFieldChange={handleApplication}
                      errors={errors}
                      domainAchievement={application.domainAchievement}
                      startDate={application.startDate}
                      endDate={application.endDate}
                    />
                  ),
                  Competition: (
                    <OtherAchievementsForm
                      labels={constants.LABELS.COMPETITION}
                      onFieldChange={handleApplication}
                      errors={errors}
                      domainAchievement={application.domainAchievement}
                      startDate={application.startDate}
                      endDate={application.endDate}
                    />
                  ),
                  "Research Paper": (
                    <ResearchPaperForm
                      labels={constants.LABELS.RESEARCH_PAPER}
                      onFieldChange={handleApplication}
                      errors={errors}
                      domainAchievement={application.domainAchievement}
                      startDate={application.startDate}
                    />
                  ),
                  Other: (
                    <OtherAchievementsForm
                      labels={constants.LABELS.OTHER}
                      onFieldChange={handleApplication}
                      errors={errors}
                      domainAchievement={application.domainAchievement}
                      startDate={application.startDate}
                      endDate={application.endDate}
                    />
                  )
                }[application.domainAchievement]
              }
            </Box>
            {application.domainAchievement && (
              <>
                <input
                  type="file"
                  name="file"
                  id="file"
                  accept="application/pdf"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <label htmlFor="file">
                  <Button
                    component="span"
                    variant="contained"
                    color="default"
                    style={{ marginRight: "8px", marginBottom: "8px" }}
                    startIcon={<CloudUpload />}
                  >
                    Choose File
                  </Button>
                  <span>{file ? file.name : "No file selected"}</span>
                </label>
              </>
            )}
            <Button
              onClick={handleFormSubmit}
              size="large"
              color="primary"
              type="submit"
              fullWidth
              variant="contained"
              style={{ marginTop: "16px" }}
              disabled={!application.domainAchievement}
            >
              Submit
            </Button>
          </div>
        </form>
      </Paper>
    </Box>
  );
};

export default NewApplication;
