// @ts-ignore
import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import {toast} from "react-toastify";

export interface taskType {
    id: number;
    url: string;
    query: string;
    type: string;
    history: [];
}

const Task = ({show = undefined}: {show?: number}) => {
    const [task, setTask] = useState<taskType>();
    const [lastSeen, setLastSeen] = useState(-1);
    const loadTask = async () => {
        const fullUrl = '/api/task/get-user-task?id=' + encodeURIComponent(show);
        fetch(fullUrl, {
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
            console.log(data)
            setTask(data);
            setLastSeen(show);
        })
        .catch(() => {
            toast.error("Unable to load task!", {
                toastId: "tasksError"
            });
        });
    }

    useEffect(() => {
        if(lastSeen !== show) {
            console.log('loadTask')
            loadTask();
        }
    }, [lastSeen, show]);

    return (
        <div className='d-flex container-fluid scraper'>
            <Container className="row mh-100 h-100 p-0 mr-0 scraper">
                {task &&
                    <table className="table table-dark table-hover mx-0 w-100">
                        <tbody className="">
                            <tr>
                                <td>ID</td>
                                <td>{task?.id}</td>
                            </tr>
                            <tr>
                                <td>URL</td>
                                <td>{task?.url}</td>
                            </tr>
                            <tr>
                                <td>TYPE</td>
                                <td>{task?.type}</td>
                            </tr>
                            <tr>
                                <td>HISTORY</td>
                                <td><ol>{task?.history?.map((el, i) => (<li key={i}>{el}</li>))}</ol></td>
                            </tr>
                        </tbody>
                    </table>
                }
            </Container>
        </div>
    )
}
export default Task;