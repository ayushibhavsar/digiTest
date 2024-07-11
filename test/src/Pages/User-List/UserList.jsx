import React, { useEffect, useState,useCallback } from 'react';
import ListTable from './ListTable';
import axios from 'axios';
import FilterComponent from '../../Components/FilterComponent/FilterComponent';

const UserList = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [filters, setFilters] = useState({});
    const [filteredUsers, setFilteredUsers] = useState([]);


    const getUserList = (page, pageSize) => {
        setLoading(true)
        axios.get('https://mmfinfotech.co/machine_test/api/userList', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
            },
            params: {
                page,
                pageSize,
            },
        }).then((response) => {
            const { userList, currentPage, lastPage, total } = response.data;
            setUsers(userList);
            setFilteredUsers(userList);
            setCurrentPage(currentPage);
            setLastPage(lastPage);
            setTotal(total);

            setLoading(false);
        }).catch((error) => {
            console.log(error)
        });
    };

    useEffect(() => {
        getUserList(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (size) => {
        setPageSize(size);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
      };
    
      const applyFilters = useCallback((filters) => {
        let filteredData = users;
    
        if (filters.firstName) {
          filteredData = filteredData.filter(user =>
            user.first_name.toLowerCase().includes(filters.firstName.toLowerCase())
          );
        }
    
        if (filters.lastName) {
          filteredData = filteredData.filter(user =>
            user.last_name.toLowerCase().includes(filters.lastName.toLowerCase())
          );
        }
    
        if (filters.email) {
          filteredData = filteredData.filter(user =>
            user.email.toLowerCase().includes(filters.email.toLowerCase())
          );
        }
    
        setFilteredUsers(filteredData);
        setTotal(filteredData.length);
        setCurrentPage(1); // Reset to first page when filters are applied
      }, [users])


      useEffect(() => {
        applyFilters(filters);
      }, [filters]);

      const resetFilterData =()=>{
        getUserList(currentPage, pageSize)
      }

    return (
        <div>
            <h1>User List</h1>
            <FilterComponent onFilterChange={handleFilterChange} resetFilterData={resetFilterData}/>
            <ListTable
                data={filteredUsers}
                page={currentPage}
                pageSize={pageSize}
                handlePageSize={handlePageSizeChange}
                handlePage={handlePageChange}
                rowCount={total}
                loading={loading}
            />
        </div>
    );
}

export default UserList;
