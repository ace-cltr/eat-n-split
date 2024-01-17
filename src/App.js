import { useState } from 'react';
import './index.css';

const initialFriends = [
  {
    id: 118836,
    name: "Akash",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -400,
  },
  {
    id: 933372,
    name: "Riya",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 2000,
  },
  {
    id: 499476,
    name: "Abhishek",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];


export default function App() {
  const [addFriend, setAddFriend] = useState(false)
  const [friends, setFriends] = useState(initialFriends)
  const [selectedFriend, setSelectedFriend] = useState(null)

  function handleAddFriend() {
    setAddFriend((show) => !show)
  }

  function friendsList(obj) {
    setFriends((fri) => [...fri, obj])
    setAddFriend(false)
  }

  function handleSelection(friend) {
    // setSelectedFriend(friend)
    setSelectedFriend((cur)=> cur?.id === friend.id ? null : friend)  // cur?.id this '?' is optional chainging if the current property is null use this
    setAddFriend(false)                                               // wasted whole hour on this bug : can't read the property of null.
  }

  function handleSplitBill(value){
    setFriends((friends)=> friends.map((friends)=> friends.id === selectedFriend.id ? {...friends, balance: friends.balance + value} : friends ))
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className='sidebar'>
        <FriendsList friends={friends} onSelection={handleSelection} selectedFriend={selectedFriend} />
        {addFriend && <FormAddFriend handleAdd={friendsList} />}

        <Button onClick={handleAddFriend}>{addFriend ? 'Close' : 'Add friend'}</Button>

      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill} />}
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className='button'>{children}</button>
  )
}

function FriendsList({ friends, onSelection, selectedFriend}) {

  return (
    <ul>
      {friends.map((el) => <Friend key={el.id} friend={el} onSelection={onSelection} selectedFriend={selectedFriend} />)}
    </ul>
  )
}

function Friend({ friend, onSelection, selectedFriend }) {

  const isSelected = selectedFriend?.id === friend.id;  //cur?.id this '?' is optional chainging
  return (
    <li className={isSelected ?'selected' : ''}>
      <img src={friend.img} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (<p className='red'>You owe {friend.name} ₹{Math.abs(friend.balance)}</p>)}
      {friend.balance > 0 && (<p className='green'>{friend.name} owes you ₹{Math.abs(friend.balance)}</p>)}
      {friend.balance === 0 && (<p>You and {friend.name} are even</p>)}
      <Button onClick={()=>onSelection(friend)}>{isSelected ? 'Close' : 'Select'}</Button>
      
    </li>
  )
}

function FormAddFriend({ handleAdd }) {
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

function FormSplitBill({selectedFriend, onSplitBill}) {
  const [bill, setBill] = useState('')
  const [paidByUser, setPaidByUser] = useState('')
  const friendsExpense = bill ? bill - paidByUser : ''
  const [whoIsPaying, setWhoIsPaying] = useState('user')

  function handleSubmit(e){
    e.preventDefault();
    if(!bill || !paidByUser)return;
    onSplitBill(whoIsPaying === 'user' ? friendsExpense : -paidByUser)
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit} >
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💸 Bill Amount</label>
      <input type="text" value={bill} onChange={(e)=>setBill(Number(e.target.value))} />

      <label>🫵 Your expense</label>
      <input type="text" value={paidByUser} onChange={(e)=>setPaidByUser(Number(e.target.value)> bill ? paidByUser : Number(e.target.value))} />

      <label>🫂 {selectedFriend.name}'s expense</label>
      <input disabled type="text" value={friendsExpense} />

      <label>🤑 Who is paying the bill</label>
      <select value={whoIsPaying} onChange={(e)=>setWhoIsPaying(e.target.value)}>
        <option value='user'>You</option>
        <option value='friend'>{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
