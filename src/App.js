// Imports
import React,{ useState, useEffect} from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SubmittedDetails from './SubmittedDetails';


const fetch = require("node-fetch");
function App() {
const [data, setData] = useState({
  username:'',
  firstname:'',
  lastname:'',
  email:'',
  description:'',
  password:'',

});
const [sucess, setSucess] = useState(false);

const {
  username,
  firstname,
  lastname,
  email,
  description,
   password} = data;

const handleChange = (e) =>{
  if(e.target.value !==''||e.target.value!==null){
    setData({...data, [e.target.name] :e.target.value});
  }
}
const DataHandlermain= () =>{
  setSucess(false);
}
const handleSubmit = async(e) =>{
e.preventDefault();
const spreadsheetId = '10naVDL4N3KeM1iuiY3SNOeut_JiITF5AwpUuG-X9-Pk'
const data = [[username,
firstname,
lastname,
email,
description,
 password]];
const baseUrl = "https://pushtogsheet.herokuapp.com";
const query = `valueInputOption=RAW&pizzly_pkey=pope8Qy8qfYyppnHRMgLMpQ8MuEUKDGeyhfGCj`;
const url = new URL(`/proxy/google-sheets/${spreadsheetId}/values/A1:append?${query}`, baseUrl);

//  Send data with a POST request
fetch(url.href, {
    method: "POST",
    body: JSON.stringify({ values: data }),
    headers: { 'Pizzly-Auth-Id': '1014f170-233c-11eb-a112-f70e69962033' }
  }).then((res) => {
    res.text();
    setSucess(true);
    }).then(console.log('then')).catch(console.log('catch'));
  }
  useEffect( ()=>{
      });
  return (
    <div className="App">
      <header className="App-header">
      <Paper elevation={3} className="App-main-container container">
      {sucess===true? <h3 className="sucess">Data Submitted</h3>:''}
      {sucess===false? <h4 className="heading">Welcome to Data Submissions</h4>:''}
      {!sucess===true?<div className="App-main-container">
          <TextField required label="User Name" name="username" value={username} onChange={handleChange} variant="outlined" size="small" />
          <br/>
          <TextField required label="First Name" name="firstname" value={firstname} onChange={handleChange} variant="outlined" size="small" />
          <br/>
          <TextField required label="Last Name" name="lastname" value={lastname} onChange={handleChange} variant="outlined" size="small" />
          <br/>
          <TextField type="email" required label="Email" name="email" value={email} onChange={handleChange} variant="outlined" size="small" />
          <br/>
          <TextField required label="Description" name="description" value={description} onChange={handleChange} variant="outlined" size="small" />
          <br/>
          <TextField required label="Password" type="password" name="password" variant="outlined" value={password} onChange={handleChange}  size="small" />
          <br/>
          <Button onClick={handleSubmit} variant="contained" color="primary" disabled={!username || !password}>Submit</Button>
        </div> :''}
        {sucess===true?
          <div>
<SubmittedDetails rows={data}/>
          <Button onClick={DataHandlermain} variant="contained" color="secondary">Submit New user Data</Button>
          </div>


          :''}
      </Paper>
      </header>
    </div>
  );
}

export default App;
