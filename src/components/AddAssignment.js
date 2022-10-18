import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import { TextField } from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {SERVER_URL} from '../constants.js';

class AddAssignment extends React.Component {
    constructor(props) {
      super(props);
      this.state = {assignmentName: "", assignmentDueDate: "", assignmentCourse: ""};
    };
 
   componentDidMount() {
    
    }

    handleNameChange = (event) => {
        this.setState({assignmentName: event.target.value})
    }

    handleDueDateChange = (event) => {
        this.setState({assignmentDueDate: event.target.value})
    }

    handleCourseChange = (event) => {
        this.setState({assignmentCourse: event.target.value})
    }

    handleSubmit = (event) => {
        let assignmentName = this.state.assignmentName;
        let assignmentDueDate = this.state.assignmentDueDate;
        let assignmentCourse = this.state.assignmentCourse;
        alert("DEBUG: " + assignmentName + ", " + assignmentDueDate + ", " + assignmentCourse);
        const token = Cookies.get('XSRF-TOKEN');
        const body = {assignmentName: this.state.assignmentName, dueDate: this.state.assignmentDueDate, courseTitle: this.state.assignmentCourse};
        console.log(body);
        fetch(`${SERVER_URL}/assignment`, 
        {  
            method: 'POST', 
            headers: { 
                'X-XSRF-TOKEN': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),

        } )
        .then((response) => console.log(response.json()))
        .catch(err => console.error(err)); 
    }

    render() {
        return (
            <div align="left" style={{ margin: "15px" }} >
                <h4>Add an Assignment:</h4>
                <TextField varint="standard" required label="Assignment Name" style={{display:"block", margin: "10px"}}
                    onChange={this.handleNameChange}> 
                </TextField>
                <TextField varint="standard" required label="Due Date" style={{ display: "block", margin: "10px" }}
                    onChange={this.handleDueDateChange}>
                </TextField>
                <TextField varint="standard" required label="Course" style={{ display: "block", margin: "10px" }}
                    onChange={this.handleCourseChange}>
                </TextField>
                <Button onClick={this.handleSubmit} variant="outlined" color="primary" style={{margin:10}}>Submit</Button>
            </div>
        )
    }
}
export default AddAssignment;