import Button from './Button';

export default function FriendsList({ friends, onSelection, selectedFriend }) {

    return (
        <ul>
            {friends.map((el) => <Friend key={el.id} friend={el} onSelection={onSelection} selectedFriend={selectedFriend} />)}
        </ul>
    )
}

function Friend({ friend, onSelection, selectedFriend }) {

    const isSelected = selectedFriend?.id === friend.id;  //cur?.id this '?' is optional chainging
    return (
        <li className={isSelected ? 'selected' : ''}>
            <img src={friend.img} alt={friend.name} />
            <h3>{friend.name}</h3>
            {friend.balance < 0 && (<p className='red'>You owe {friend.name} ₹{Math.abs(friend.balance)}</p>)}
            {friend.balance > 0 && (<p className='green'>{friend.name} owes you ₹{Math.abs(friend.balance)}</p>)}
            {friend.balance === 0 && (<p>You and {friend.name} are even</p>)}
            <Button onClick={() => onSelection(friend)}>{isSelected ? 'Close' : 'Select'}</Button>

        </li>
    )
}