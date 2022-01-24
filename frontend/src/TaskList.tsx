// @ts-ignore
import React, { useState, useEffect } from 'react';
import { Button, Container } from 'reactstrap';
import {toast} from "react-toastify";
import Task from './Task'

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [show, setShow] = useState();
    const loadTaskList = async () => {
        // event.preventDefault();
        fetch('/api/task/get-user-tasks/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error();
            }
            return response.json()
        })
        .then((data) => {
            setTasks(data);
        })
        .catch(() => {
            toast.error("Unable to load task list!", {
                toastId: "taskListError"
            });
        });
    }

    useEffect(() => {
        loadTaskList();
    }, [loadTaskList]);

    return (
        <div className='container-fluid scraper'>
            <Container className="row mh-100 h-100 p-0 scraper">
                <div className='col-sm-3 scraper bg-dark py-5 px-0 h-auto mh-100'>
                    {tasks.map((task) => {
                        return (
                            <Button
                                key={task.id}
                                className='mb-2 w-100'
                                onClick={() => {
                                    console.log(task.id)
                                    setShow(task.id)
                                }}>
                                {task.type} | {task.url}
                            </Button>
                        )
                    })}
                </div>
                <div id="showTask" className='col min-vh-100 scraper'>
                    {show &&
                        <Task show={show}/>
                    }
                </div>
            </Container>
        </div>
    )
}
export default TaskList;