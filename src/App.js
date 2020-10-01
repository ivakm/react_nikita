import React, {useState} from 'react';
import './App.css';
import {useForm} from 'react-hook-form';
import axios from 'axios';

function App() {
    const [isAccess, setAccess] = useState(true);
    const {register, handleSubmit} = useForm();

    //todo початок говна
    let today = new Date();
    let tomorrow = new Date();
    const dd = today.getDate().toString();
    const id = 12345;

    const mm = today.getMonth().toString();
    const yyyy = today.getFullYear().toString();

    today = dd.padStart(2, 0) + '/' + mm.padStart(2, 0) + '/' + yyyy.padStart(2, 0);
    tomorrow = dd.padStart(2, 0) + '/' + mm.padStart(2, 0) + '/' + yyyy.padStart(2, 0);
    //todo кінець говна

    const onSubmit = data => {
        if (data) {
            axios.post('url', data)
                .then(data => {
                    localStorage.setItem('form', data.data);
                    alert('Form was send')
                })
                .catch(error => {
                    console.log('Error: ', error);
                });
        }
    };

    return (
        <div className="wrapper">
            <form className="App" onSubmit={handleSubmit(onSubmit)}>
                <div className="arrival">
                    <h2>Office arrival declaration</h2>
                    <div className="arrival__content">
                        {today} | ID Number - {id}
                    </div>
                </div>

                <div className="accept">
                    <label>
                        <input
                            onClick={() => setAccess(!isAccess)}
                            type="checkbox"
                            ref={register} name="access"
                            required={isAccess}
                        />{`Do you plan to arrive to the office tomorrow ${tomorrow}?`}
                    </label>
                </div>

                <div className="describe">
                    <label>
                        Please provide any info or reason if possible
                        <textarea
                            ref={register}
                            name="isGoingToGoOffice"
                            disabled={isAccess}/>
                    </label>
                </div>

                <div className="submit">
                    <input type="submit"/>
                </div>
            </form>
        </div>
    );
}

export default App;
