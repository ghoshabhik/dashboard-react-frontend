import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const AddTask = ({ selectedDate, handleLoad }) => {
    const [name, setName] = React.useState('')
    const [category, setCategory] = React.useState('')
    const [plannedHours, setPlannedHours] = React.useState('')
    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
    }
    const handlePlannedHoursChange = (e) => {
        setPlannedHours(e.target.value)
    }
    const handleSave = async () => {
        console.log(name, category, plannedHours)
        const body = {
            taskName: name,
            taskCategory: category,
            plannedHours: plannedHours,
            taskDate: selectedDate

        }
        console.log(body)
        const response = await fetch(`https://todoapp-abhik.netlify.app/api/create-new-task`,
            {
                method: 'post',
                body: JSON.stringify(body)
            }
        );
        const content = await response.json();
        setName('')
        setCategory('')
        setPlannedHours('')
        console.log(content)
        handleLoad()
    }
    return (
        <form noValidate autoComplete="off" style={{ marginTop: "30px" }}>
            <TextField id="standard-basic" label="Task Name" value={name} onChange={handleNameChange} />
            <TextField id="filled-basic" label="Category" value={category} onChange={handleCategoryChange} />
            <TextField id="outlined-basic" label="Planned Hours" value={plannedHours} onChange={handlePlannedHoursChange} />
            <Button variant="contained" onClick={handleSave}>Save</Button>
        </form>
    )
}

export default AddTask
