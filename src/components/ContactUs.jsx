import React, { useState, useMemo } from 'react'
import { FixedSizeList as List } from 'react-window'

const ContactUs = () => {
  // Generate 1000 rows of dummy data
  const dummyData = useMemo(() => {
    const data = []
    for (let i = 1; i <= 1000; i++) {
      data.push({
        id: i,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        phone: `+1-555-${String(i).padStart(3, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
        company: `Company ${i % 50 + 1}`,
        department: ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance'][i % 5],
        status: ['Active', 'Inactive', 'Pending'][i % 3],
        lastContact: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: ['Low', 'Medium', 'High'][i % 3]
      })
    }
    return data
  }, [])

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [filterText, setFilterText] = useState('')

  // Sorting function
  const sortedData = useMemo(() => {
    let sortableData = [...dummyData]
    
    if (filterText) {
      sortableData = sortableData.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(filterText.toLowerCase())
        )
      )
    }
    
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    
    return sortableData
  }, [dummyData, sortConfig, filterText])

  const requestSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕️'
    return sortConfig.direction === 'asc' ? '↑' : '↓'
  }

  // Table header component
  const TableHeader = () => (
    <div className="grid grid-cols-9 gap-2 px-4 py-3 bg-gray-100 font-semibold text-sm text-gray-700 border-b border-gray-200">
      <div className="cursor-pointer hover:bg-gray-200 p-1 rounded" onClick={() => requestSort('id')}>
        ID {getSortIcon('id')}
      </div>
      <div className="cursor-pointer hover:bg-gray-200 p-1 rounded" onClick={() => requestSort('name')}>
        Name {getSortIcon('name')}
      </div>
      <div className="cursor-pointer hover:bg-gray-200 p-1 rounded" onClick={() => requestSort('email')}>
        Email {getSortIcon('email')}
      </div>
      <div className="cursor-pointer hover:bg-gray-200 p-1 rounded" onClick={() => requestSort('phone')}>
        Phone {getSortIcon('phone')}
      </div>
      <div className="cursor-pointer hover:bg-gray-200 p-1 rounded" onClick={() => requestSort('company')}>
        Company {getSortIcon('company')}
      </div>
      <div className="cursor-pointer hover:bg-gray-200 p-1 rounded" onClick={() => requestSort('department')}>
        Department {getSortIcon('department')}
      </div>
      <div className="cursor-pointer hover:bg-gray-200 p-1 rounded" onClick={() => requestSort('status')}>
        Status {getSortIcon('status')}
      </div>
      <div className="cursor-pointer hover:bg-gray-200 p-1 rounded" onClick={() => requestSort('lastContact')}>
        Last Contact {getSortIcon('lastContact')}
      </div>
      <div className="cursor-pointer hover:bg-gray-200 p-1 rounded" onClick={() => requestSort('priority')}>
        Priority {getSortIcon('priority')}
      </div>
    </div>
  )

  // Row component for virtualization
  const Row = ({ index, style }) => {
    const item = sortedData[index]
    if (!item) return null

    return (
      <div 
        style={style}
        className={`grid grid-cols-9 gap-2 px-4 py-3 text-sm border-b border-gray-100 hover:bg-gray-50 ${
          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
        }`}
      >
        <div className="font-mono text-gray-600">{item.id}</div>
        <div className="font-medium text-gray-900">{item.name}</div>
        <div className="text-blue-600 hover:underline cursor-pointer">{item.email}</div>
        <div className="text-gray-700">{item.phone}</div>
        <div className="text-gray-700">{item.company}</div>
        <div className="text-gray-700">{item.department}</div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.status === 'Active' ? 'bg-green-100 text-green-800' :
          item.status === 'Inactive' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {item.status}
        </div>
        <div className="text-gray-600">{item.lastContact}</div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.priority === 'High' ? 'bg-red-100 text-red-800' :
          item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {item.priority}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Contact Management</h1>
            <p className="text-gray-600 mt-1">Manage your contacts with efficient virtualization for large datasets</p>
          </div>
          
          {/* Search and Controls */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="text-sm text-gray-600">
                Showing {sortedData.length} of {dummyData.length} contacts
              </div>
            </div>
          </div>

          {/* Virtualized Table */}
          <div className="overflow-hidden">
            <TableHeader />
            <List
              height={600}
              itemCount={sortedData.length}
              itemSize={60}
              width="100%"
              className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            >
              {Row}
            </List>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="text-sm text-gray-600 text-center">
              Virtualized table with {dummyData.length.toLocaleString()} rows for optimal performance
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs