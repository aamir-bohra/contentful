import React, { useEffect, useState } from 'react';

import axios from 'axios';

// interface BlogPost {
//     articleHeading?: string,
//     publishDate?: string | undefined
//     // storeImage?: string | undefined
// }
const BlogPage: React.FC = () => {
// const BlogPage: StorefrontFunctionComponent<BlogPost> = ({articleHeading,publishDate}: BlogPost) => {

  const [blogData, setBlogData] = useState<any | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://graphql.contentful.com/content/v1/spaces/bwrd9037jvba/environments/master?access_token=j6Ykk_wq-RuMghKdIEms2yJE891gXmeyGaWV-N4Dptk',
          {
            query: `
            query aamirBohraEntryQuery {
                aamirBohra(id: "1BGQCcgEm6weGhm1FVQCjd") {
                  sys {
                    id
                }
                  # add the fields you want to query
                  newGroupCollection{
                   items{
                    url
                    description
                  }
                  }
                }
              }
            `,
          }
          );
          
          setBlogData(response.data.data.aamirBohra.newGroupCollection.items);
          console.log(response,"response222")
        } catch (error) {
            console.error('Error fetching blog data:', error);
        }
    };
    
    fetchData();
  }, []);

  console.log(blogData,"aamir hhh")
  return (
    <div style={{ marginLeft: '50px', marginRight: '50px' }}>
<div className="">
  {Array.isArray(blogData) ? (
      blogData.map((item: any, index: number) => (
          <img
          className="fl w-100"
          style={{ height: '500px' }}
          key={index}
          src={item.url}
          alt={`Banner ${index + 1}`}
          />
          ))
    ) : (
        <p>No blog data available</p>
        )}
</div>

        </div>

  );
};

export default BlogPage;

