import { useState } from 'react';
import './index.css';
import FormAddFriend from './Components/FormAddFriend';
import FormSplitBill from './Components/FormSplitBill';
import FriendsList from './Components/FriendsList';
import Button from './Components/Button';

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
    setSelectedFriend((cur) => cur?.id === friend.id ? null : friend)  // cur?.id this '?' is optional chainging if the current property is null use this
    setAddFriend(false)                                               // wasted whole hour on this bug : can't read the property of null.
  }

  function handleSplitBill(value) {
    setFriends((friends) => friends.map((friends) => friends.id === selectedFriend.id ? { ...friends, balance: friends.balance + value } : friends))
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className='sidebar'>
        <FriendsList friends={friends} onSelection={handleSelection} selectedFriend={selectedFriend} />
        {addFriend && <FormAddFriend handleAdd={friendsList} />}

        <Button onClick={handleAddFriend}>{addFriend ? 'Close' : 'Add friend'}</Button>

      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} key={selectedFriend.id} onSplitBill={handleSplitBill} />}
    </div>
  );
}






