// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const BlogPage: React.FC = () => {
//   const [allcontent, setAllcontent] = useState<any | null>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // to get contentful product data
//   useEffect(() => {
//     const getContentById = async () => {
//       try {
//         const response = await axios.post(
//           'https://graphql.contentful.com/content/v1/spaces/8m0ovx5oy7z6/environments/master?access_token=y9d3K_fBoCbucpnpi1_tzqtlU8yctBW-ZPpOEscF8i4',
//           {
//             query: `
//             query vtexProductsCollectionQuery {
//                 vtexProductsCollection {
//                   items {
//                    productId
//                     productName
//                     productPrice
//                     productImage
//                     productDescription
//                     categoryId
//                     brandId
//                     isActive
//                   }
//                 }
//               }
//             `,
//           }
//         );

//         setAllcontent(response.data.data.vtexProductsCollection.items);
//         console.log(response.data.data.vtexProductsCollection.items, 'responseProduct-setAllcontent');
//       } catch (error) {
//         console.error('Error fetching blog data:', error);
//       }
//     };

//     getContentById();
//   }, []);

//   // updateVtexProduct in back office from contentful
//   const updateVtexProduct = async () => {
//     setIsLoading(true);

//     try {
//       await Promise.all(
//         allcontent.map(async (product: any) => {
//           const requestBody = {
//             Name: product.productName,
//             CategoryId: product.categoryId,
//             BrandId: product.brandId,
//             Description: product.productDescription,
//             IsActive: product.isActive,
//           };

//           await fetch(`https://${window.location.hostname}/api/catalog/pvt/product/${product.productId}`, {
//             method: 'PUT',
//             headers: {
//               Accept: 'application/json',
//               'Content-Type': 'application/json',
//               'X-VTEX-API-AppKey': 'vtexappkey-skillnet-VOZXMR',
//               'X-VTEX-API-AppToken': 'RVXQMZYNRRZNTMEURBRBHPRCWYMITOEUNUPISMZTCCAGROZIUTHBZFUCZKIVIWSHJPAREKDSZSKDTFKGQZHNBKKXLIANVJLFBTJJBUWJJNDQTJVQKXLOKCMFYHWORAVT',
//             },
//             body: JSON.stringify(requestBody),
//           });
//           console.log('Product updated:', product.productId);
//         })
//       );
//     } catch (error) {
//       console.error('Error updating product on VTEX:', error);
//     }

//     setIsLoading(false);
//   };

//   return (
//     <>
//       <div style={{ textAlign: 'center', marginTop: '2rem' }}>
//         <button
//           style={{
//             color: 'white',
//             backgroundColor: '#4681f4',
//             padding: '1rem',
//             border: '2px solid black',
//             borderRadius: '10px',
//           }}
//           onClick={updateVtexProduct}
//           disabled={isLoading} // Disable button while loading
//         >
//           {isLoading ? 'Updating Products...' : 'Update products details from Contentful to VTEX'}
//         </button>
//         {isLoading && (
//           <div className="spinner-overlay">
//             <div className="spinner" />
//           </div>
//         )}
//       </div>
//       <br />
//     </>
//   );
// };

// export default BlogPage;
