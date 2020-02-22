import React from 'react';

const Dashboard = () => {
  if(!sessionStorage.getItem('firstName')) {
    location.href = '/login';
  } 
  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard;
