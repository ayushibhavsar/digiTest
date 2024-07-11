import * as React from 'react'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'

import { DataGrid } from '@mui/x-data-grid'

const headCells = [
    {
        field: 'id',
        sortable: true,
        width: 80,
        headerName: 'S.no',
        renderCell: params => {
            return <span>{params?.row?.id || 'N/A'}</span>
        }
    },
    {
        field: 'first_name',
        sortable: true,
        width: 150,
        headerName: 'First Name',
        renderCell: params => {
            return <span>{params?.row?.first_name || 'N/A'}</span>
        }
    },
    {
        field: 'last_name',
        sortable: true,
        width: 250,
        headerName: 'Last Name',
        renderCell: params => {
            return <span>{params?.row?.last_name || 'N/A'}</span>
        }
    },
    {
        field: 'email',
        sortable: true,
        width: 150,
        headerName: 'Email',
        renderCell: params => {
            return <span>{params?.row?.email || 'N/A'}</span>
        }
    },
    {
        field: 'phone_no',
        sortable: true,
        width: 180,
        headerName: 'Phone_Number',
        renderCell: (params) => {
            return params.row?.phone_no
                ? `${params.row?.country_code} ${params.row?.phone_no}`
                : "N/A";
        },
    },
]

export default function ListTable({
    loader,
    data,
    page,
    pageSize,
    handlePageSize,
    handlePage,
    rowCount,
    filterModel,
    handleFilterChange
}) {
    const handlePageChange = newPage => {
        handlePage(newPage + 1)
    }

    const handlePageSizeData = val => {
        handlePageSize(val)
    }

    return (
        <>
            <TableContainer
                component={Paper}
                sx={{ my: 2, overflowX: 'auto', }}
            >
                <DataGrid
                    loader={loader}
                    disableSelectionOnClick
                    disableColumnFilter
                    disableColumnSelector
                    rowHeight={35}
                    headerHeight={20}
                    sx={{
                        '& .MuiDataGrid-columnHeaderTitle': {
                            fontWeight: '600',
                            fontSize: '14px',
                            textTransform: 'capitalize',
                            backgroundColor: '#F9FAFB'
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            border: 'none',
                            backgroundColor: '#F9FAFB'
                        },
                        '& .MuiDataGrid-columnHeader': {
                            height: '20px'
                        },
                        '& .MuiDataGrid-columnHeader:focus-within': {
                            outline: 'none !important'
                        }

                    }}
                    rows={data}
                    columns={headCells}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: pageSize
                            }
                        }
                    }}
                    paginationMode='sever'
                    rowCount={rowCount}
                    page={page - 1}
                    onPaginationModelChange={val => {
                        handlePageChange(val.page)
                        handlePageSizeData(val.pageSize)
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={handleFilterChange}


                />
            </TableContainer>
        </>
    )
}
