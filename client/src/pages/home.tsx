import { useList } from '@pankod/refine-core';
import { Typography, Box, Stack } from '@pankod/refine-mui';

import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard,
  TopAgent,
} from 'components';

const Home = () => {
  // Fetching list of properties
  const { data, isLoading, isError } = useList({
    resource: 'properties',
    config: {
      pagination: {
        pageSize: 3,
      },
    },
  });

  const latestProperties = data?.data ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <Box>
      {/* Dashboard title */}
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Dashboard
      </Typography>

      {/* Pie charts section */}
      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart
          title="Properties for Sale"
          value={684}
          series={[75, 25]}
          colors={['#475BE8', '#E4E8EF']}
        />
        <PieChart
          title="Properties for Rent"
          value={546}
          series={[60, 40]}
          colors={['#FD8539', '#E4E8EF']}
        />
        <PieChart
          title="Total Customer"
          value={5732}
          series={[75, 25]}
          colors={['#2ED480', '#E4E8EF']}
        />
        <PieChart
          title="Total City"
          value={90}
          series={[80, 20]}
          colors={['#FE6D8E', '#E4E8EF']}
        />
      </Box>

      {/* Total Revenue and Property Referrals */}
      <Stack
        mt="25px"
        width="100%"
        direction={{ xs: 'column', lg: 'row' }}
        gap={4}
      >
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>

      {/* Top Agent and Latest Properties */}
      <Stack mt="25px" width="100%" flexWrap="wrap" direction="row" gap={4}>
        <TopAgent />

        <Box
          flex={1}
          borderRadius="15px"
          padding="20px"
          bgcolor="#FCFCFC"
          display="flex"
          flexDirection="column"
          minWidth={{ xs: '100%', sm: 450 }}
        >
          {/* Latest Properties section */}
          <Typography fontSize={18} fontWeight={600} color="#11142D">
            Latest Properties
          </Typography>

          <Box mt={2.5} sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {/* Rendering each property card */}
            {latestProperties.map((property) => (
              <PropertyCard
                key={property._id}
                id={property._id}
                title={property.title}
                location={property.location}
                price={property.price}
                photo={property.photo}
              />
            ))}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Home;
