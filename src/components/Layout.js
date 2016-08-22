import React from 'react';

export default function Layout({ children }) {
  const h1Style = { textAlign: "center",
                    border: "5px"};
  return (
    <div>
      <h1 style={h1Style}>Thrash Dash</h1>
      {children}
    </div>
  )
}
