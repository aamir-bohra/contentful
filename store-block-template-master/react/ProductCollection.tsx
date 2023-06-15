// import React, { useEffect, useState } from 'react';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import 'whatwg-fetch';
// // import style from './emailInfo.css';
// // import GetProContent from './GetEditableProContent';

// function ProductCollection() {
//   const [productData, setProductData] = useState<any[]>([]);
//   const [isTriggered, setIsTriggered] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const itemsArr: any[] = [];
//   const Hostname = window?.location?.hostname;

//   // Getting products from VTEX
//   useEffect(() => {
//     const getAllProduct = async () => {
//       setIsLoading(true);

//       try {
//         const apiData = await fetch(`https://${Hostname}/api/catalog_system/pub/products/search?_from=1&_to=50`, {
//           method: 'GET',
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             'X-VTEX-API-AppKey': 'vtexappkey-skillnet-VOZXMR',
//             'X-VTEX-API-AppToken': 'RVXQMZYNRRZNTMEURBRBHPRCWYMITOEUNUPISMZTCCAGROZIUTHBZFUCZKIVIWSHJPAREKDSZSKDTFKGQZHNBKKXLIANVJLFBTJJBUWJJNDQTJVQKXLOKCMFYHWORAVT'
//           }
//         });

//         const apiResponse = await apiData.json();
//         console.log('allProductResponse-', apiResponse);

//         setProductData(apiResponse);
//       } catch (error) {
//         console.error('Error fetching product data:', error);
//       }

//       setIsLoading(false);
//     };

//     if (isTriggered) {
//       getAllProduct();
//       setIsTriggered(false);
//     }
//   }, [isTriggered, Hostname]);

//   // To get all Contentful data
//   useEffect(() => {
//     const getAllUpdatedContent = async () => {
//       try {
//         const response = await fetch(
//           'https://api.contentful.com/spaces/8m0ovx5oy7z6/environments/master-2023-05-17/entries',
//           {
//             method: 'GET',
//             headers: {
//               Authorization: 'Bearer CFPAT-9XiWbSspyWEO5ORP_vcD1AKy7guZqZAoZk0xdjEu7Qw'
//             }
//           }
//         );

//         const data = await response.json();

//         data.items.forEach((item: any) => {
//           if (item.sys.contentType.sys.id === 'vtexProducts') {
//             console.log(item, 'having vtexProducts');
//             itemsArr.push(item.fields.productId);
//           }
//         });
//       } catch (error) {
//         console.error('Error fetching blog data:', error);
//       }
//     };

//     getAllUpdatedContent();
//   }, []);

//   const handleTriggerClick = () => {
//     setIsTriggered(true);
//   };

//   useEffect(() => {
//     const uploadProductsToContentful = async () => {
//       if (productData.length > 0) {
//         setIsLoading(true);

//         for (let i = 0; i < productData.length; i++) {
//           const product = productData[i];

//           console.log(typeof product.productId, '--products');
//           const requestBody = {
//             fields: {
//               productId: {
//                 'en-US': parseInt(product.productId)
//               },
//               productName: {
//                 'en-US': product.productName
//               },
//               productDescription: {
//                 'en-US': product.description
//               },
//               categoryId: {
//                 'en-US': parseInt(product.categoryId)
//               },
//               brandId: {
//                 'en-US': parseInt(product.brandId)
//               },
//               productChanged: {
//                 'en-US': true
//               },
//               isActive: {
//                 'en-US': true
//               }
//             }
//           };

//           try {
//             const apiData = await fetch(
//               'https://api.contentful.com/spaces/8m0ovx5oy7z6/environments/master-2023-05-17/entries',
//               {
//                 method: 'POST',
//                 headers: {
//                   Authorization: 'Bearer CFPAT-9XiWbSspyWEO5ORP_vcD1AKy7guZqZAoZk0xdjEu7Qw',
//                   'Content-Type': 'application/vnd.contentful.management.v1+json',
//                   'X-Contentful-Content-Type': 'vtexProducts'
//                 },
//                 body: JSON.stringify(requestBody)
//               }
//             );

//             const contentResponse = await apiData.json();
//             console.log(contentResponse, 'productCreated in Contentful id-', product.productId);
//           } catch (error) {
//             console.error('Error creating product in Contentful:', error);
//           }
//         }

//         setIsLoading(false);
//       }
//     };

//     uploadProductsToContentful();
//   }, [productData]);

//   return (
//     <div style={{ marginTop: "10rem", textAlign:"center" }}>
//       <h1>Export and Import of products b/w Contentful  & Vtex</h1>
//       <button style={{ cursor:"progess", alignItems: "center", color: "white", backgroundColor: "#5dbea3",  padding: "1rem", border: "2px solid black", borderRadius: "10px" }} onClick={handleTriggerClick}>Upload product details from Vtex to Contentful</button>
//       {isLoading && (
//         <div className="lazy-loader-overlay">
//           <div className="lazy-loader">
//             <div className="loader" />
//             <div className="loader-text" style={{textAlign:"center"}}>Uploading data to Contentful.  <br /> Please wait do not refresh the page....... <br />
//             Indexing</div>
//           </div>
//         </div>
//       )}
//       {/* <div>
//         <GetProContent /><br />
//       </div> */}
//     </div>
//   );
// }

// export default ProductCollection;