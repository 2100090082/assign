import React from 'react';

const KanbanCard = ({ ticket }) => {
  return (
    <div className="kanban-card">
      <h3>{ticket.id}</h3>
      <p>{ticket.title}</p>
      {ticket.featureRequest && <p className="feature-request">! feature request</p>}
      <p>Priority: {ticket.priority}</p>
      <p>User: {ticket.user}</p>
    </div>
  );
};

export default KanbanCard;
