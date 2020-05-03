import React from 'react';
import { Redirect } from 'react-router-dom';

const Dashboard = () => {
  if (!sessionStorage.getItem('id')) {
    return <Redirect to='/login' />
  }
  return (
    <div>
      {sessionStorage.getItem('id')}
      Welcome {sessionStorage.getItem('firstName')}
    </div>
  )
}

export default Dashboard
