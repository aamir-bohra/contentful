import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContentfulToCms: React.FC = () => {
  const [allcontent, setAllcontent] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [skuData, setSkuData] = useState<{ skuId: string; imageUrl: string; brandId: string; categoryId: string }[]>([]);

  console.log(skuData, 'skuData');

  // Get contentful product data
  useEffect(() => {
    const getContentById = async () => {
      try {
        const response = await axios.post(
          'https://graphql.contentful.com/content/v1/spaces/5otptayivfvi/environments/master?access_token=U9-gR7JYR8FuL32S0pr8KADHRNdfSWKL80cr4Hmtbts',
          {
            query: `
              query {
                vtexConnectorCollection {
                  items {
                    skuIdConfirm,
                    brandId,
                    categoryId,
                    skuImageCollection {
                      items {
                        url
                      }
                    }
                  }
                }
              }
            `,
          }
        );

        const items = response.data.data.vtexConnectorCollection.items;
        const skuData = items.map((item: any) => ({
          skuId: item.skuIdConfirm,
          brandId: item.brandId,
          categoryId: item.categoryId,
          imageUrl: item.skuImageCollection.items[0].url,
        }));

        
        setAllcontent(items);
        setSkuData(skuData);
        console.log(skuData,"sallo");
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    getContentById();
  }, []);

  // Update VTEX product in back office from Contentful
  const updateVtexProduct = async (skuData: { skuId: string; imageUrl: string; brandId: string; categoryId: string }[]) => {
    setIsLoading(true);
    console.log(skuData, '11skuData');

    try {
      await Promise.all(
        allcontent.map(async (product: any, index: number) => {
          const requestBody = {
            skuId: product.skuId,
            categoryId: product.categoryId,
            brandId: product.brandId,
            productId: product.productId,
            Name:product.productName,
            Videos: product.imageUrl,
            IsActive: product.isActive,
            SkuData: skuData[index],
          };

          await fetch(`https://${window.location.hostname}/api/catalog/pvt/product/${product.skuId}`, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'X-VTEX-API-AppKey': 'vtexappkey-skillnet-VOZXMR',
              'X-VTEX-API-AppToken': 'RVXQMZYNRRZNTMEURBRBHPRCWYMITOEUNUPISMZTCCAGROZIUTHBZFUCZKIVIWSHJPAREKDSZSKDTFKGQZHNBKKXLIANVJLFBTJJBUWJJNDQTJVQKXLOKCMFYHWORAVT',
            },
            body: JSON.stringify(requestBody),
          });

          console.log('Product updated:', product.skuId);
        })
      );
    } catch (error) {
      console.error('Error updating product on VTEX:', error);
    }

    setIsLoading(false);
  };

  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          style={{
            color: 'white',
            backgroundColor: '#4681f4',
            padding: '1rem',
            border: '2px solid black',
            borderRadius: '10px',
          }}
          onClick={() => updateVtexProduct(skuData)} // Pass skuData to the function
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? 'Updating Products...' : 'Update products details from Contentful to VTEX'}
        </button>
        {isLoading && (
          <div className="spinner-overlay">
            <div className="spinner" />
          </div>
        )}
      </div>
      <br />

      <div>
        <h2>SKU Data:</h2>
        <ul>
          {skuData.map((sku: { skuId: string; imageUrl: string; brandId: string; categoryId: string }, index: number) => (
            <li key={index}>
              <strong>SKU ID:</strong> {sku.skuId} | <strong>Image URL:</strong>
              <img style={{ height: '300px', width: '400px' }} src={sku.imageUrl} alt={sku.skuId} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ContentfulToCms;