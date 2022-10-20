import react, { useState, useEffect } from 'react'
import './todo.css'

const localStorageItems = () => {
    let list = localStorage.getItem('mylist');
    if (list) {
        return JSON.parse(localStorage.getItem('mylist'));
    }
    else {
        return [];
    }
}
const Todo = () => {
    const [text, setText] = useState("");
    const [task, setTask] = useState(localStorageItems());
    const [editItem, seteditItem] = useState(true);
    const [finalItem, setfinalItem] = useState(null);

    //add items in list
    const addItems = () => {
        if (!text) {
            alert("please enter a value");
        } else if (text && !editItem) {
            setTask(
                task.map((element) => {
                    if (element.id === finalItem) {
                        return { ...element, name: text }
                    }
                    return element;
                })
            )
            seteditItem(true);
            setText('');
            setfinalItem(null);
        }
        else {
            const inputdata = { id: new Date().getTime().toString(), name: text }
            setTask([...task, inputdata]);
            setText('');
        }
    }
    //delete data from list
    const deleteItem = (index) => {
        const remainitem = task.filter((element) => {
            return index !== element.id;
        })
        setTask(remainitem);
    }

    //remove all in single click
    const removeAll = () => {
        setTask([]);
    }

    //create localstorage 

    useEffect(() => {
        localStorage.setItem('mylist', JSON.stringify(task))
    }, [task])


    //edit items in todo list

    const edititem = (id) => {
        let newedititem = task.find((element) => {
            return element.id === id
        })
        seteditItem(false);
        setText(newedititem.name);
        setfinalItem(id);
    }
    return (
        <>
            <div className="main-conatiner">
                <div className="container">
                    <h1 className="h1style">Todo list</h1>
                    <div className="main-items">
                        <input className='todo-input' placeholder='ENTER YOUR TASK HERE !!' type="text" name="text" id="text" value={text} onChange={(e) => setText(e.target.value)} />
                        {
                            editItem ? <button className='btn' onClick={addItems}>ADD</button> : <button className='btn' onClick={addItems}>OK</button>
                        }

                    </div>
                    <div className="task">
                        <div className="main-task">
                            {
                                task.map((element) => {
                                    return (<>
                                        <div className="todo-row" key={element.id}><span>{element.name}</span>
                                            <div className="btn-right">                                            <button className='btn' onClick={() => edititem(element.id)}>EDIT </button>
                                                <button className='btn' onClick={() => deleteItem(element.id)}>DELETE  </button>
                                            </div>
                                        </div>


                                    </>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="all">
                        <button className='btn' onClick={removeAll}>Remove All</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo