import React from 'react';
import './paginated.scss';

const Paginated = ({ paginated, itemPerPage, items }) => {
    const pageNumber = [];
    for (let i= 0; i < Math.ceil(items/itemPerPage); i++) {
        pageNumber.push(i+1);
    };
  return (
    <nav className='nav-container'>
        <ul>
            {
                pageNumber && pageNumber.map((number) => (
                   <p key={number}>
                    <button onClick={() => paginated(number)}>{number}</button>
                   </p>
                ))
            }
        </ul>
    </nav>
  )
}

export default Paginated;