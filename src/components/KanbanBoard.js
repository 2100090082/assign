import React, { useState, useEffect } from 'react';
import KanbanColumn from './KanbanColumn';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState(''); // Empty initially
  const [sortOrder, setSortOrder] = useState('priority');
  const [displayOptionsVisible, setDisplayOptionsVisible] = useState(false);

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => response.json())
      .then((data) => setTickets(data.tickets))
      .catch((error) => console.error('Error fetching tickets:', error));
  }, []);

  const handleDisplayClick = () => {
    setDisplayOptionsVisible(!displayOptionsVisible);
  };

  const handleGroupingChange = (option) => {
    setGroupBy(option);
    setDisplayOptionsVisible(false); // Close the dropdown after selection
  };

  const handleSortChange = (e) => setSortOrder(e.target.value);

  const groupedTickets = groupBy
    ? tickets.reduce((acc, ticket) => {
        const key = ticket[groupBy];
        if (!acc[key]) acc[key] = [];
        acc[key].push(ticket);
        return acc;
      }, {})
    : {};

  const sortedTickets = Object.keys(groupedTickets).map((key) => {
    const sorted = [...groupedTickets[key]].sort((a, b) => {
      if (sortOrder === 'priority') return b.priority - a.priority;
      return a.title.localeCompare(b.title);
    });
    return { key, tickets: sorted };
  });

  return (
    <div className="kanban-board">
      <div className="kanban-controls">
        <button onClick={handleDisplayClick} className="display-button">
          Display
        </button>
        {displayOptionsVisible && (
          <div className="display-options">
            <button onClick={() => handleGroupingChange('status')}>Group by Status</button>
            <button onClick={() => handleGroupingChange('priority')}>Group by Priority</button>
          </div>
        )}
        <select onChange={handleSortChange}>
          <option value="priority">Sort by Priority</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>
      <div className="kanban-columns">
        {sortedTickets.length > 0 ? (
          sortedTickets.map((group) => (
            <KanbanColumn key={group.key} title={group.key} tickets={group.tickets} />
          ))
        ) : (
          <p>Select a display option to view tickets</p>
        )}
      </div>
    </div>
  );
};

export default KanbanBoard;
