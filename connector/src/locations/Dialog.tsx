import React, { useState, useEffect } from 'react';
import { Paragraph, Radio, Modal } from '@contentful/f36-components';
import { DialogAppSDK } from '@contentful/app-sdk';
import { useAutoResizer, useSDK } from '@contentful/react-apps-toolkit';
import axios from 'axios';

const Dialog = () => {
  const sdk = useSDK<DialogAppSDK>();
  useAutoResizer();

  const [productArray, setProductArray] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const itemsPerPage = 10;

  // Getting products from VTEX
  const getVtexProducts = async () => {
    const apiKey = 'vtexappkey-skillnet-VOZXMR';
    const apiSecret = 'RVXQMZYNRRZNTMEURBRBHPRCWYMITOEUNUPISMZTCCAGROZIUTHBZFUCZKIVIWSHJPAREKDSZSKDTFKGQZHNBKKXLIANVJLFBTJJBUWJJNDQTJVQKXLOKCMFYHWORAVT';
    const baseUrl = 'https://skillnet.vtexcommercestable.com.br/';
    const endpoint = '/api/catalog_system/pub/products/search?_from=1&_to=50';

    // Add authentication headers
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Basic ${btoa(`${apiKey}:${apiSecret}`)}`,
    };

    try {
      // Make the GET request to retrieve data
      const response = await axios.get(`${baseUrl}${endpoint}`, { headers });
      // Process the API response
      const data = response.data;
      const productArray: any[] = [];
      // Handle the retrieved data as needed

      data.forEach(function(item: any) {
        productArray.push({
          productId: item.productId,
          productName: item.productName,
          imageUrl: item.items?.[0]?.images?.[0]?.imageUrl,
        });
      });
      setProductArray(productArray);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  useEffect(() => {
    getVtexProducts();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset current page when searching
  };

  const handleRadioChange = (productId: string) => {
    setSelectedProduct(productId);
  };

  const filteredProducts = productArray.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(start, end);

  const renderPagination = () => {
    return (
      <div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={currentPage === page}
            style={{ marginRight: '8px' }}
          >
            {page}
          </button>
        ))}
      </div>
    );
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search Products"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '16px' }}
      />
      {paginatedProducts.map((item, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: '16px' }}>
            <img
              src={item.imageUrl}
              style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '10px' }}
            />
          </div>
          <Paragraph>
            <strong>Product ID:</strong> {item.productId}
            <br />
            <strong>Product Name:</strong> {item.productName}
          </Paragraph>
          <Radio
            isChecked={selectedProduct === item.productId}
            onChange={() => handleRadioChange(item.productId)}
            style={{ marginLeft: '16px' }}
          >
            Select
          </Radio>
        </div>
      ))}
      {renderPagination()}
      <button onClick={handleShowModal}>Open Modal</button>
      {selectedProduct && (
        <Paragraph style={{ marginTop: '16px' }}>
          Selected Product: {selectedProduct}
        </Paragraph>
      )}
      {showModal && (
       <Modal.Controls>
       <button onClick={handleCloseModal}>Close</button>
     </Modal.Controls>
      )}
    </>
  );
};

export default Dialog;
