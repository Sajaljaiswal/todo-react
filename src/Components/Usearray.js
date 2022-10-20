import react, { useState } from 'react'

const Usearray = () => {

    const myListarray = [
        {
            id: 0, name: "sajal", age: 22
        },
        {
            id: 1, name: "sujal", age: 12
        },
        {
            id: 2, name: "sonal", age: 27
        }, {
            id: 3, name: "shagun", age: 22
        }
    ]

    const [myarray, setarray] = useState(myListarray);

    const cleararray = () => {
        setarray([]);
    }
    return (
        <>
            {
                myarray.map((ele) => <h1 key={ele.id}> Name:{ele.name} & Age:{ele.age} </h1>)
            }
            <button onClick={cleararray}>clear</button>
        </>
    )
}

export default Usearray