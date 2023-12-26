import React, { useState } from 'react';

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleAccordion() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="accordion">
      <b style={{fontSize:'20px'}} onClick={toggleAccordion}>
        {title}
        <span className={`arrow ${isOpen ? 'arrow-down' : ''}`}>▼</span>
      </b><br />
      {isOpen && <span className='mt-2'>{children}</span>}
    </div>
  );
}

export default Accordion;
