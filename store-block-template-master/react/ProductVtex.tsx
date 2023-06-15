import  React, { useEffect, useState } from 'react'

import "whatwg-fetch";


function ProductCollection() {
    const [productId, setProductId] = useState([])
    const [productData, setproductData] = useState<any>()

  
    useEffect(() => {
        GetProductCollection()
    }, [])
    const GetProductCollection = async () => {

        const data = await fetch(`https://skillnet.vtexcommercestable.com.br/api/catalog/pvt/collection/143/products`, {
            method: "GET",
            headers: {
                "Accept": "application/vnd.vtex.ds.v10+json",
                "Content-Type": "application/json",
                "X-VTEX-API-AppKey": "vtexappkey-skillnet-VOZXMR",
                "X-VTEX-API-AppToken": "RVXQMZYNRRZNTMEURBRBHPRCWYMITOEUNUPISMZTCCAGROZIUTHBZFUCZKIVIWSHJPAREKDSZSKDTFKGQZHNBKKXLIANVJLFBTJJBUWJJNDQTJVQKXLOKCMFYHWORAVT"
            },
        })
        const response = await data.json();
        setProductId(response.Data);
        // GetProductDetails()
        console.log("api data", response)
    }
    useEffect(() => {
            GetProductDetails()
            GetPdpUrl()
    }, [productId])

    const GetProductDetails = async () => {
            const data = await fetch(`https://contentfulaamir--skillnet.myvtex.com/api/catalog/pvt/collection/143/products`, {
                method: "GET",
                headers: {
                    "Accept": "application/vnd.vtex.ds.v10+json",
                    "Content-Type": "application/json",
                    "X-VTEX-API-AppKey": "vtexappkey-skillnet-VOZXMR",
                    "X-VTEX-API-AppToken": "RVXQMZYNRRZNTMEURBRBHPRCWYMITOEUNUPISMZTCCAGROZIUTHBZFUCZKIVIWSHJPAREKDSZSKDTFKGQZHNBKKXLIANVJLFBTJJBUWJJNDQTJVQKXLOKCMFYHWORAVT"
                },
            })
            const response = await data.json();
            console.log(response,"response1")
            setproductData(response.Data)
        // });
    }
    const GetPdpUrl = async () => {
            const data = await fetch(`https://contentfulaamir--skillnet.myvtex.com/api/catalog_system/pub/products/variations/40000158`, {
                method: "GET",
                headers: {
                    "Accept": "application/vnd.vtex.ds.v10+json",
                    "Content-Type": "application/json",
                    "X-VTEX-API-AppKey": "vtexappkey-skillnet-VOZXMR",
                    "X-VTEX-API-AppToken": "RVXQMZYNRRZNTMEURBRBHPRCWYMITOEUNUPISMZTCCAGROZIUTHBZFUCZKIVIWSHJPAREKDSZSKDTFKGQZHNBKKXLIANVJLFBTJJBUWJJNDQTJVQKXLOKCMFYHWORAVT"
                },
            })
            const response = await data.json()
            console.log(response,"response2")

    }
    
   console.log(productData,'productData');
   
   

   return (
    <div>
      <h1>Product Collection</h1>
      {productData && productData.length > 0 ? (
        productData.map((product:any) => (
          <div key={product.ProductId}>
            <h2>{product.ProductName}</h2>
            <img src={product.SkuImageUrl} alt={product.ProductName} />
          </div>
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
  }

export default ProductCollection
