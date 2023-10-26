import React from "react";

interface SeenProps {
  seen: boolean;
}

function Seen({ seen }: SeenProps) {
   const seenStyle = {
    fontSize: '1rem',
    color: seen ? 'blue' : 'grey'
   }

  return (
      <i className="material-icons-outlined" style={seenStyle}>done_all</i>
  );
}

export default Seen;
