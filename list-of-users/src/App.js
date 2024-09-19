import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './App.css';

//API link

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [tempList, setTempList] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // To track which user is being edited
  
  const [updateState, setUpdateState] = useState(-1); 
  const [editFormData, setEditFormData] = useState({
    name: '',
    username: '',
    email: '',
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    phone: '',
    website: '',
    companyname: '',
    catchphrase: '',
    bs: '',
  });

  //For adding a new user 

  const [isAdding, setIsAdding] = useState(false); 
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    phone: '',
    website: '',
    companyname: '',
    catchPhrase: '',
    bs: '',
  });





  // Fetch users from API and  displaying it on screen 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
        setTempList(data); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);



  // Ascending sort event

  const ascendingEvent = () => {
    let data = [...tempList]; 
    if (data.length > 0) {
      // Sort by username
      let result = [...data].sort((a, b) => a.username.localeCompare(b.username)); 
      setTempList(result); 
    }
  };


  // Descending sort event

  const descendingEvent = () => {
    let data = [...tempList]; 
    if (data.length > 0) {
      // Sort by username
      let result = [...data].sort((a, b) => b.username.localeCompare(a.username)); 
      setTempList(result); 
    }
  };


  // Handle form input changes for adding new user
  
  const handleNewUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };


  // Handle add user form submission
  
  const handleAddSubmit = (e) => {
    e.preventDefault();
    
    // Check if username or email already exists in the users list
  const isDuplicate = users.some(
    (user) =>
      user.username.toLowerCase() === newUser.username.toLowerCase() ||
      user.email.toLowerCase() === newUser.email.toLowerCase()
  );

  if (isDuplicate) {
    alert('Username or Email already exists! Please enter a unique username or email.');
    return;
  }



    const newUserWithId = {
      ...newUser,
      // Assign a new ID based on the current list length
      id: users.length + 1, 
      address: {
        street: newUser.street,
        suite: newUser.suite,
        city: newUser.city,
        zipcode: newUser.zipcode,
      },
      company: {
        name: newUser.companyname,
        catchPhrase: newUser.catchPhrase,
        bs: newUser.bs,
      },
    };

    const updatedUsers = [...users, newUserWithId];
    setUsers(updatedUsers);
    setTempList(updatedUsers); 
    setIsAdding(false); 

    setNewUser({
      name: '',
      username: '',
      email: '',
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      phone: '',
      website: '',
      companyname: '',
      catchPhrase: '',
      bs: '',
    });
  };


  // Handle form input changes for editing user

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };


  // Handle when "Update" button is clicked
  
  const handleEditClick = (user) => {
    setUpdateState(user.id);
    setEditFormData({
      name: user.name,
      username: user.username,
      email: user.email,
      street: user.address.street,
      suite: user.address.suite,
      city: user.address.city,
      zipcode: user.address.zipcode,
      phone: user.phone,
      website: user.website,
      companyname: user.company.name,
      catchPhrase: user.company.catchPhrase,
      bs: user.company.bs,
    });
  };

  
  // Handle form submission for updating user details
  
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedUsers = users.map((user) =>
      user.id === updateState ? { ...user, ...editFormData } : user
    );
    setUsers(updatedUsers);
    setTempList(updatedUsers); 
    setUpdateState(-1); 
  };


  // Delete a row from the list
  
  function handleDelete(id) {
    const newlist = users.filter(user => user.id !== id);
    setUsers(newlist);
    setTempList(newlist); 
  }


  // Loading spinner
  
  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  // if the data can't be shown diplay message 
  if (error) {
    return <div>Error: {error}</div>;
  }


  // Edit form for the user
  
  const EditForm = () => (
    <form onSubmit={handleEditSubmit} className="edit-form">
      <h2>Edit User Information</h2>
  
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={editFormData.name}
          onChange={handleInputChange}
          className="input-field"
        />
      </div>
  
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={editFormData.username}
          onChange={handleInputChange}
          className="input-field"
        />
      </div>
  
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={editFormData.email}
          onChange={handleInputChange}
          className="input-field"
        />
      </div>
  
      <h3>Address</h3>
      <div className="form-group">
        <label>Street</label>
        <input
          type="text"
          name="street"
          value={editFormData.street}
          onChange={handleInputChange}
          className="input-field"
        />
      </div>
  
      <div className="form-group">
        <label>Suite</label>
        <input
          type="text"
          name="suite"
          value={editFormData.suite}
          onChange={handleInputChange}
          className="input-field"
        />
      </div>
  
      <div className="form-group">
        <label>City</label>
        <input
          type="text"
          name="city"
          value={editFormData.city}
          onChange={handleInputChange}
          className="input-field"
        />
      </div>
  
      <div className="form-group">
        <label>Zipcode</label>
        <input
          type="text"
          name="zipcode"
          value={editFormData.zipcode}
          onChange={handleInputChange}
          className="input-field"
        />
      </div>
  
      <h3>Contact Details</h3>
      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={editFormData.phone}
          onChange={handleInputChange}
          className="input-field"
        />
      </div>
  
      <div className="form-group">
        <label>Website</label>
        <input
          type="text"
          name="website"
          value={editFormData.website}
          onChange={handleInputChange}
          className="input-field"
        />
      </div>
  
      <h3>Company</h3>
      <div className="form-group">
        <label>Company Name</label>
        <input
          type="text"
          name="companyname"
          value={editFormData.companyname}
          onChange={handleInputChange}
          className="input-field"
        />
      </div>
  
      <div className="form-group">
        <label>Catchphrase</label>
        <input
          type="text"
          name="catchPhrase"
          value={editFormData.catchPhrase}
          onChange={handleInputChange}
          className="input-field"
        />
      </div>
  
      <div className="form-group">
        <label>Company BS</label>
        <input
          type="text"
          name="bs"
          value={editFormData.bs}
          onChange={handleInputChange}
          className="input-field"
        />
      </div>

      {/* Save and Cancel buttons */}

      <div className="button-group">
        <button className="button save-button" type="submit">Save</button>
        <button className="button cancel-button" type="button" onClick={() => setUpdateState(-1)}>Cancel</button>
      </div>
    </form>
  );




  // Add user form

  const AddForm = () => (
    <form onSubmit={handleAddSubmit} className="edit-form">
      <h2>Add New User</h2>

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleNewUserInputChange}
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={newUser.username}
          onChange={handleNewUserInputChange}
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleNewUserInputChange}
          className="input-field"
        />
      </div>

      <h3>Address</h3>
      <div className="form-group">
        <label>Street</label>
        <input
          type="text"
          name="street"
          value={newUser.street}
          onChange={handleNewUserInputChange}
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label>Suite</label>
        <input
          type="text"
          name="suite"
          value={newUser.suite}
          onChange={handleNewUserInputChange}
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label>City</label>
        <input
          type="text"
          name="city"
          value={newUser.city}
          onChange={handleNewUserInputChange}
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label>Zipcode</label>
        <input
          type="text"
          name="zipcode"
          value={newUser.zipcode}
          onChange={handleNewUserInputChange}
          className="input-field"
        />
      </div>

      <h3>Company</h3>
      <div className="form-group">
        <label>Company Name</label>
        <input
          type="text"
          name="companyname"
          value={newUser.companyname}
          onChange={handleNewUserInputChange}
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label>Catchphrase</label>
        <input
          type="text"
          name="catchPhrase"
          value={newUser.catchPhrase}
          onChange={handleNewUserInputChange}
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label>Company BS</label>
        <input
          type="text"
          name="bs"
          value={newUser.bs}
          onChange={handleNewUserInputChange}
          className="input-field"
        />
      </div>

       {/* Save and Cancel buttons */}

      <div className="button-group">
        <button className="button save-button" type="submit">Save</button>
        <button className="button cancel-button" type="button" onClick={() => setIsAdding(false)}>Cancel</button>
      </div>
    </form>
  );

  return (
    <div className="Header">
      <h1>List of Users</h1>

      {/*Buttons for sorting and adding users  */}
      <div className='button_order'>
        <button className='ascending' onClick={ascendingEvent}>Ascending</button>
        <button className='ascending' onClick={() => setIsAdding(true)}>Add</button>
        <button className='descending' onClick={descendingEvent}>Descending</button>
      </div>

      {isAdding && <AddForm />} {/* Add user form */}

      <ul className="users">
        {tempList.map((user) => (
          <li key={user.id}>
            {updateState === user.id ? (
              <EditForm />
            ) : (
              <>
                <div className="section">
                  <h3>Users ID</h3>
                  <p>ID: {user.id}</p>
                  <p>Name: {user.name}</p>
                  <p>Username: {user.username}</p>
                  <p>Email: {user.email}</p>
                </div>

                <div className="section">
                  <h3>Users Address</h3>
                  <p>Street: {user.address.street}</p>
                  <p>Suite: {user.address.suite}</p>
                  <p>City: {user.address.city}</p>
                  <p>Zipcode: {user.address.zipcode}</p>
                </div>

                <div className="section">
                  <h3>Users Contact Details</h3>
                  <p>Number: {user.phone}</p>
                  <p>Website: {user.website}</p>
                </div>

                <div className="section">
                  <h3>Users Company</h3>
                  <p>Company Name: {user.company.name}</p>
                  <p>Company CatchPhrase: {user.company.catchPhrase}</p>
                  <p>Company BS: {user.company.bs}</p>
                </div>

                <button className="button1" onClick={() => handleEditClick(user)} type="button">Update</button>
                <button className="button2" onClick={() => handleDelete(user.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
