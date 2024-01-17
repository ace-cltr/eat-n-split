import { useState } from 'react';
import Button from './Button';

export default function FormAddFriend({ handleAdd }) {
    const [name, setName] = useState('')
    const [image, setImage] = useState('https://i.pravatar.cc/48')

    function handleSubmit(e) {
        e.preventDefault(); // to prevent auto refresh
        if (!name || !image) return; // if there is no name and image then nothing passes down

        const id = crypto.randomUUID();// great way to generate random id

        const newFriend = {
            id,
            name,
            image: `${image}?=${id}`,
            balance: 0,
        }
        handleAdd(newFriend)

        setName('')
        setImage('https://i.pravatar.cc/48')
    }

    return (
        <form className='form-add-friend' onSubmit={handleSubmit}>      {/*every form needs on onSubmit handler*/}
            <label>🫂Friend name</label>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} />

            <label>🔗Image URL</label>
            <input type='text' value={image} onChange={(e) => setImage(e.target.value)} />

            <Button>Add</Button>
        </form>
    )
}