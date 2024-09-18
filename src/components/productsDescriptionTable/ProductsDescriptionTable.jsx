import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

// Рендерер для стовбця Action
const ActionCellRenderer = ({ data, onActionClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  // Закриття віконця при кліку поза ним
  useEffect(() => {
    const handleClickOutside = event => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenuClick = action => {
    console.log('Clicked action:', action);
    setIsMenuOpen(false);
    onActionClick(action, data);
  };

  const toggleMenu = () => {
    const buttonRect = buttonRef.current.getBoundingClientRect();
    setMenuPosition({ top: buttonRect.bottom, left: buttonRect.left });
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div ref={buttonRef} style={{ position: 'relative' }}>
      <button onClick={toggleMenu}>...</button>
      {isMenuOpen &&
        ReactDOM.createPortal(
          <div
            style={{
              position: 'absolute',
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
              backgroundColor: '#fff',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              padding: '5px',
              zIndex: 1000,
              borderRadius: '5px',
              minWidth: '120px',
            }}
          >
            <div
              style={{ padding: '5px', cursor: 'pointer' }}
              onClick={() => handleMenuClick('view')}
            >
              View
            </div>
            <div
              style={{ padding: '5px', cursor: 'pointer' }}
              onClick={() => handleMenuClick('edit')}
            >
              Edit
            </div>
            <div
              style={{ padding: '5px', cursor: 'pointer' }}
              onClick={() => handleMenuClick('remove')}
            >
              Remove
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

const ProductsDescriptionTable = () => {
  const statsData = [
    {
      id: 1,
      productCode: 99000001,
      name: 'Potato',
      category: 'vegetables',
      availability: 'Out of stock',
      productQuantity: 1000,
      price: 10.5,
    },
    {
      id: 2,
      productCode: 99000002,
      name: 'Tomato',
      category: 'vegetables',
      availability: 'Out of stock',
      productQuantity: 500,
      price: 30,
    },
    {
      id: 3,
      productCode: 99000003,
      name: 'Milk',
      category: 'dairy',
      availability: 'Out of stock',
      productQuantity: 100,
      price: 42.4,
    },
    {
      id: 4,
      productCode: 99000004,
      name: 'Bread',
      category: 'bread',
      availability: 'Out of stock',
      productQuantity: 300,
      price: 18,
    },
    {
      id: 5,
      productCode: 99000005,
      name: 'Butter',
      category: 'dairy',
      availability: 'Out of stock',
      productQuantity: 240,
      price: 84.7,
    },
    {
      id: 6,
      productCode: 99000006,
      name: 'Cucumber',
      category: 'vegetables',
      availability: 'Out of stock',
      productQuantity: 50,
      price: 15,
    },
    {
      id: 7,
      productCode: 99000007,
      name: 'Cheese',
      category: 'dairy',
      availability: 'Available in stock',
      productQuantity: 0,
      price: 70,
    },
  ];

  const [columnDefs] = useState([
    {
      field: 'productCode',
      headerName: 'Product code',
      sortable: true,
      filter: true,
      checkboxSelection: true,
    },
    { field: 'name', headerName: 'Name', sortable: true, filter: true },
    {
      field: 'category',
      headerName: 'Category',
      sortable: true,
      filter: true,
    },
    {
      field: 'availability',
      headerName: 'Availability',
      sortable: true,
      filter: true,
    },
    {
      field: 'productQuantity',
      headerName: 'Product quantity',
      sortable: true,
      filter: true,
    },
    { field: 'price', headerName: 'Price', sortable: true, filter: true },
    {
      field: 'actions',
      headerName: 'Action',
      cellRenderer: params => (
        <ActionCellRenderer
          data={params.data}
          onActionClick={handleActionClick}
        />
      ),
      sortable: false,
      filter: false,
    },
  ]);

  const handleActionClick = (action, rowData) => {
    console.log(`Action: ${action}, Row Data:`, rowData);
    if (action === 'view') {
      alert(`View item ${rowData.name}`);
    } else if (action === 'edit') {
      alert(`Edit item: ${rowData.name}`);
    } else if (action === 'remove') {
      alert(`Remove item: ${rowData.name}`);
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        rowData={statsData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={20}
      />
    </div>
  );
};

export default ProductsDescriptionTable;
