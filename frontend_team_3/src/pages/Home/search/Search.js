import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchResult from '../../../components/homepage/SearchResult';
import { Link } from 'react-router-dom';

function Search({ details }) {

  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false);

  const filteredPersons = details.filter(
    person => {
      return (
        person.name.toLowerCase().includes(searchField.toLowerCase()) ||
        person.specific.toLowerCase().includes(searchField.toLowerCase())
      );
    }
  );

  const handleChange = e => {
    setSearchField(e.target.value);
    if (e.target.value === "") {
      setSearchShow(false);
    }
    else {
      setSearchShow(true);
    }
  };

  const searchList = function () {
    if (searchShow) {
      return (
        <div className='hy'>
          <SearchResult filteredPersons={filteredPersons} />
        </div>
      );
    }
  }

  return (
    <section className="garamond">
      <div className='best-ment-search-form d-flex'>
        <Form.Select className='me-1 bg-light selectpicker'>
          <option>UX Designer</option>
          <option>FrontEnd Engineer</option>
          <option>Backend Developer</option>
          <option>System Adminstrator</option>
          <option>Fullstack Developer</option>
        </Form.Select>
        <div className='search-bar-parent'>
          <Form.Control type="search" placeholder="Normal text" className='bg-light' onChange={handleChange} />
          <Link to='/mentor'>
            <FontAwesomeIcon icon={faSearch} size="lg" style={{ color: "#ffffff", }} />
          </Link>
        </div>
      </div>
      {searchList()}
    </section>
  );
}

export default Search;