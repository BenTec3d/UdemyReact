import React, { useState } from 'react';

import ErrorModal from './components/UI/ErrorModal';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();

  const addUserHandler = user => {
    setUsers((prevUsers) => {
      return [user, ...prevUsers]
    });
  };

  const openErrorModalHandler = (errorTitle, errorMessage) => {
    setError({
      title: errorTitle,
      message: errorMessage
    });
  };

  const closeErrorModalHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && <ErrorModal onClose={closeErrorModalHandler} title={error.title} message={error.message} />}
      <AddUser onError={openErrorModalHandler} onAddUser={addUserHandler} nextId={users.length} />
      <UsersList users={users} />
    </div>
  );
}

export default App;
